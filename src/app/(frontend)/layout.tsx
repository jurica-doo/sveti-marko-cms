import { Marcellus, Source_Sans_3 } from 'next/font/google'
import React from 'react'
import './styles.css'

/**
 * The same two faces the public site uses, so the one page served from this
 * app's root reads as part of the parish rather than as a scaffold.
 */
const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-marcellus',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-source-sans',
  display: 'swap',
})

export const metadata = {
  description:
    'Sustav za uređivanje sadržaja mrežne stranice Župe sv. Marka Evanđelista, Neslanovac.',
  title: 'Župa sv. Marka — CMS',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="hr" className={`${marcellus.variable} ${sourceSans.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
