import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

/**
 * The root of the CMS app.
 *
 * Nobody browses here on purpose — the parish site is `sveti-marko-web`, which
 * reads this app's REST API — so this page exists to do two things for whoever
 * does land on it: say plainly which system they are looking at, and hand them
 * the door to the admin panel. It is dressed in the site's own material so
 * that answer is obvious before a word of it is read.
 */
export default async function HomePage() {
  // `getPayload()` throws — it doesn't reject into something a caller can
  // check — the moment the CMS can't come up: no `PAYLOAD_SECRET`, an
  // unreachable `DATABASE_URL`, whatever. Uncaught, that turns this page into
  // a hard 500 the instant someone opens the CMS root. Catching it here keeps
  // the failure local and says what's actually wrong instead of a raw stack
  // trace.
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

  return (
    <div className="home">
      <div className="home__panel">
        <span aria-hidden="true" className="home__mark" />

        <p className="eyebrow">Sustav za uređivanje sadržaja</p>
        <h1 className="home__title">Župa sv. Marka Evanđelista</h1>
        <p className="home__place">Neslanovac, Split</p>

        {initError ? (
          <>
            <p className="home__lede">
              Payload se nije uspio pokrenuti. Provjerite je li <code>.env</code> postavljen
              (<code>PAYLOAD_SECRET</code>, <code>DATABASE_URL</code> te S3/Supabase varijable) i je
              li baza podataka dostupna, pa ponovno pokrenite <code>npm run dev</code>.
            </p>
            <p className="home__error">{initError}</p>
          </>
        ) : (
          <p className="home__lede">
            {user ? (
              <>
                Prijavljeni ste kao <strong>{user.email}</strong>. Uredništvo stranice nalazi se u
                administratorskom sučelju.
              </>
            ) : (
              <>
                Ovdje se uređuju vijesti, raspored misa i sadržaj stranica župe. Za nastavak se
                prijavite u administratorsko sučelje.
              </>
            )}
          </p>
        )}

        <div className="home__actions">
          <a className="btn btn--solid" href="/admin">
            {user ? 'Otvori sučelje' : 'Prijava'}
          </a>
          <a
            className="btn btn--outline"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Dokumentacija
          </a>
        </div>
      </div>

      <p className="home__footer">
        Splitsko-makarska nadbiskupija · Sadržaj objavljen ovdje pojavljuje se na javnoj stranici
        župe.
      </p>
    </div>
  )
}
