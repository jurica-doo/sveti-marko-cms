import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  // `getPayload()` throws — it doesn't reject into something a caller can
  // check — the moment the CMS can't come up: no `PAYLOAD_SECRET`, an
  // unreachable `DATABASE_URL`, whatever. Uncaught, that turns this scaffold
  // page (nobody ships it — the real site is `sveti-marko-web`, which reads
  // the REST API instead) into a hard 500 the instant someone opens the CMS
  // root. Catching it here keeps the failure local and says what's actually
  // wrong instead of a raw stack trace.
  let user: { email: string } | undefined
  let initError: string | null = null

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const headers = await getHeaders()
    const auth = await payload.auth({ headers })
    user = auth.user ?? undefined
  } catch (error) {
    initError = error instanceof Error ? error.message : String(error)
    console.error('Payload failed to initialize:', error)
  }

  if (initError) {
    return (
      <div className="home">
        <div className="content">
          <h1>CMS nije pokrenut</h1>
          <p style={{ maxWidth: 560, textAlign: 'center', opacity: 0.75 }}>
            Payload se nije uspio inicijalizirati. Provjerite je li{' '}
            <code>.env</code> postavljen (<code>PAYLOAD_SECRET</code>,{' '}
            <code>DATABASE_URL</code> i S3/Supabase varijable) i je li baza
            podataka dostupna, pa ponovno pokrenite <code>npm run dev</code>.
          </p>
          <p
            style={{
              maxWidth: 560,
              textAlign: 'center',
              opacity: 0.5,
              fontSize: '0.8em',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {initError}
          </p>
        </div>
        <div className="footer">
          <p>Update this page by editing</p>
          <a className="codeLink" href={fileURL}>
            <code>app/(frontend)/page.tsx</code>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a className="admin" href="/admin" rel="noopener noreferrer" target="_blank">
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
