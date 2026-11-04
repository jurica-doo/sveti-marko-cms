import dns from 'node:dns/promises'
import net from 'node:net'

/**
 * TEMPORARY — remove once the production database connection works.
 *
 * Reports what the deployed CMS actually sees for `DATABASE_URL`, without the
 * password: host, port, user, whether the host resolves, and whether a plain
 * TCP connection to it opens. That separates "the stored value is wrong" from
 * "the network path from Vercel is blocked", which the Payload error
 * ("timeout exceeded when trying to connect") cannot tell apart.
 */
export const dynamic = 'force-dynamic'

export async function GET() {
  const raw = process.env.DATABASE_URL ?? ''
  let parsed: URL | null = null
  try {
    parsed = new URL(raw)
  } catch {
    parsed = null
  }

  const host = parsed?.hostname ?? null
  const port = parsed ? Number(parsed.port || 5432) : null

  const lookup = host
    ? await dns
        .lookup(host, { all: true })
        .then((addresses) => addresses.map((a) => `${a.address} (IPv${a.family})`))
        .catch((error: NodeJS.ErrnoException) => [`DNS error: ${error.code ?? error.message}`])
    : []

  const tcp =
    host && port
      ? await new Promise<{ ok: boolean; ms: number; error?: string }>((resolve) => {
          const started = Date.now()
          const socket = net.connect({ host, port })
          const done = (ok: boolean, error?: string) => {
            socket.destroy()
            resolve({ ok, ms: Date.now() - started, ...(error ? { error } : {}) })
          }
          socket.setTimeout(8000, () => done(false, 'timeout after 8s'))
          socket.once('connect', () => done(true))
          socket.once('error', (error: NodeJS.ErrnoException) => done(false, error.code ?? error.message))
        })
      : null

  return Response.json({
    region: process.env.VERCEL_REGION ?? null,
    databaseUrl: {
      present: raw.length > 0,
      length: raw.length,
      // Surrounding quotes or whitespace are the classic copy-paste slip.
      hasQuotesOrWhitespace: /^["'\s]|["'\s]$/.test(raw),
      parses: Boolean(parsed),
      protocol: parsed?.protocol ?? null,
      user: parsed ? decodeURIComponent(parsed.username) : null,
      passwordLength: parsed ? decodeURIComponent(parsed.password).length : null,
      host,
      port,
      database: parsed?.pathname.slice(1) || null,
      query: parsed?.search || null,
    },
    poolMax: process.env.DATABASE_POOL_MAX ?? null,
    dns: lookup,
    tcp,
  })
}
