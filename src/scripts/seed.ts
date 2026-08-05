/**
 * Seeds the parish site with real, verifiable data for Župa sv. Marka
 * Evanđelista (Neslanovac, Split) plus example news the parish office can
 * replace.
 *
 * Run with: `pnpm seed` (or `npm run seed`). Safe to re-run — globals are
 * overwritten and collection documents are matched on slug/title.
 */
import { getPayload, type Where } from 'payload'
import config from '../payload.config'
import { exampleNews } from './data/news'
import { richText } from './data/rich-text'

const seed = async () => {
  const payload = await getPayload({ config })

  /* ------------------------------------------------------------- globals */

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      siteName: 'Župa sv. Marka Evanđelista',
      shortName: 'Sv. Marko',
      tagline: 'Neslanovac, Split',
      diocese: 'Splitsko-makarska nadbiskupija',
      announcement: { enabled: false, text: '', href: '' },
      navigation: [
        { label: 'Naslovnica', href: '/' },
        { label: 'Vijesti', href: '/vijesti/' },
        { label: 'O nama', href: '/o-nama/' },
        { label: 'Kontakt', href: '/kontakt/' },
      ],
      // Jumps to the mass-times band on the home page (`SCHEDULE_ANCHOR`).
      headerCta: { label: 'Raspored misa', href: '/#raspored' },
      footerColumns: [
        {
          title: 'Župa',
          links: [
            { label: 'O nama', href: '/o-nama/' },
            { label: 'Vijesti', href: '/vijesti/' },
            { label: 'Kontakt', href: '/kontakt/' },
          ],
        },
        {
          title: 'Raspored',
          links: [
            { label: 'Svete mise', href: '/kontakt/' },
            { label: 'Ispovijed', href: '/kontakt/' },
            { label: 'Župni ured', href: '/kontakt/' },
          ],
        },
      ],
      copyright: 'Župa sv. Marka Evanđelista, Split — Neslanovac',
      social: [],
    },
  })

  await payload.updateGlobal({
    slug: 'schedule',
    data: {
      masses: [
        {
          day: 'Nedjeljom i blagdanom',
          times: '9:00, 11:00 i 20:00',
          note: 'Misa u 11:00 je pjevana',
          highlight: true,
        },
        {
          day: 'Radnim danom',
          times: '19:00',
          note: 'Od ponedjeljka do subote',
          highlight: true,
        },
      ],
      massesNote:
        'Na blagdane i u korizmeno te došašćansko vrijeme raspored može odstupati — najave su uvijek u župnim vijestima.',
      confessions: [
        {
          day: 'Radnim danom',
          times: '18:30 – 19:00',
          note: 'Pola sata prije svete mise',
          highlight: true,
        },
        {
          day: 'Nedjeljom',
          times: 'Prije svake mise',
          note: '',
          highlight: true,
        },
        {
          day: 'Prvi petak u mjesecu',
          times: '18:00 – 19:00',
          note: 'Ispovijed za bolesnike i starije po dogovoru',
          highlight: true,
        },
      ],
      confessionsNote:
        'Za ispovijed izvan navedenih termina slobodno se javite župniku prije ili poslije svete mise.',
      devotions: [
        {
          title: 'Klanjanje pred Presvetim',
          day: 'Četvrtkom',
          times: '18:00 – 19:00',
          note: '',
        },
        {
          title: 'Krunica',
          day: 'Svakoga dana',
          times: 'Pola sata prije mise',
          note: '',
        },
        {
          title: 'Pobožnost prvih petaka',
          day: 'Prvi petak u mjesecu',
          times: '18:00',
          note: 'Nakon mise pohod bolesnicima',
        },
      ],
      officeHours: [
        { day: 'Ponedjeljak – petak', hours: '09:00 – 11:00', note: '' },
        { day: 'Utorak i četvrtak', hours: '17:30 – 18:30', note: 'Popodnevni termin' },
        { day: 'Subota', hours: '09:00 – 10:00', note: '' },
        { day: 'Nedjelja', hours: 'Zatvoreno', note: 'Osim hitnih slučajeva' },
      ],
      officeNotes: [
        {
          title: 'Krštenje',
          text: 'Najaviti najmanje mjesec dana ranije. Sa sobom ponesite rodni list djeteta i podatke o kumovima.',
        },
        {
          title: 'Vjenčanje',
          text: 'Zaručnici se javljaju najmanje tri mjeseca prije vjenčanja radi zaručničkog tečaja i priprave.',
        },
        {
          title: 'Bolesnici i sprovodi',
          text: 'Za bolesničko pomazanje i sprovod javite se u bilo koje doba dana ili noći.',
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        eyebrow: 'Neslanovac · Split',
        title: 'Župa sv. Marka Evanđelista',
        subtitle:
          'Zajednica koja se okuplja oko oltara na splitskom Neslanovcu od 1994. godine. Dobro došli — na misu, na razgovor ili samo na tišinu pred Presvetim.',
        primaryCta: { label: 'Župne vijesti', href: '/vijesti/' },
        secondaryCta: { label: 'Kontakt', href: '/kontakt/' },
        showSchedule: true,
        massesTitle: 'Svete mise',
        confessionsTitle: 'Ispovijed',
      },
      officeSection: {
        eyebrow: 'Župni ured',
        title: 'Radno vrijeme i sakramenti',
        intro:
          'Sve što se tiče krštenja, vjenčanja, potvrda i misa zadušnica dogovara se u župnom uredu uz crkvu.',
      },
      newsSection: {
        eyebrow: 'Iz župe',
        title: 'Vijesti i obavijesti',
        intro:
          'Najave slavlja, promjene u rasporedu i izvještaji iz života župne zajednice.',
        count: 3,
        ctaLabel: 'Sve vijesti',
      },
      quote: {
        enabled: true,
        text: 'Pođite po svem svijetu, propovijedajte evanđelje svemu stvorenju.',
        source: 'Mk 16, 15',
      },
      linksSection: {
        eyebrow: 'Poveznice',
        title: 'Gdje dalje',
        intro:
          'Stranice nadbiskupije, katolički mediji i zajednica u kojoj župa živi.',
      },
      metaTitle: 'Župa sv. Marka Evanđelista — Neslanovac, Split',
      metaDescription:
        'Raspored svetih misa, ispovijedi i radnog vremena župnog ureda sv. Marka Evanđelista na splitskom Neslanovcu, uz župne vijesti i kontakt.',
    },
  })

  await payload.updateGlobal({
    slug: 'news-page',
    data: {
      eyebrow: 'Iz župe',
      title: 'Župne vijesti',
      intro:
        'Obavijesti, najave slavlja i izvještaji iz života župe sv. Marka na Neslanovcu.',
      perPage: 9,
      emptyMessage: 'Trenutno nema objavljenih vijesti.',
      metaTitle: 'Župne vijesti — Župa sv. Marka, Neslanovac',
      metaDescription:
        'Obavijesti i najave iz župe sv. Marka Evanđelista na splitskom Neslanovcu.',
    },
  })

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      eyebrow: 'O nama',
      title: 'Župa sv. Marka Evanđelista na Neslanovcu',
      intro:
        'Mlada gradska župa u sjeverozapadnom dijelu Splita, osnovana 1994. godine, s crkvom posvećenom 2005. godine.',
      parish: {
        title: 'Zajednica koja je izrasla s naseljem',
        body: richText(
          'Župa sv. Marka Evanđelista osnovana je 12. rujna 1994. godine, izdvajanjem istočnog dijela župe Porođenja Blažene Djevice Marije, kojoj je Neslanovac dotad pripadao. Prvi župnik bio je don Šimun Doljanin.',
          'Danas je to živa gradska župa: nedjeljom se zajednica okuplja na trima svetim misama, a kroz tjedan na večernjoj misi, klanjanju i krunici. Uz župnika djeluju vjeroučitelji, zbor, ministranti i pastoralni suradnici.',
          'Župni ured uz crkvu otvoren je radnim danom i tu se dogovaraju krštenja, vjenčanja, mise zadušnice i sve ostale potrebe župljana.',
        ),
      },
      patron: {
        title: 'Sveti Marko Evanđelist',
        feastDay: '25. travnja',
        body: richText(
          'Sveti Marko, pisac najstarijeg od četiriju evanđelja, bio je suradnik apostola Petra i Pavla. Predaja ga povezuje s Aleksandrijom, gdje je, prema starim izvorima, umro mučeničkom smrću.',
          'Njegov je znak krilati lav — zato se lav pojavljuje na prikazima svetoga Marka. Evanđelje koje nosi njegovo ime najkraće je i najbrže: Isus u njemu neprestano ide, liječi i poziva, a zaključuje ga poslanje učenicima da idu po svem svijetu i propovijedaju evanđelje.',
          'Župa slavi svoga nebeskog zaštitnika 25. travnja, kada se održava i župno slavlje.',
        ),
      },
      metaTitle: 'O župi sv. Marka — Neslanovac, Split',
      metaDescription:
        'Povijest župe sv. Marka Evanđelista na Neslanovcu, župna crkva posvećena 2005. i sv. Marko Evanđelist, nebeski zaštitnik župe.',
    },
  })

  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      eyebrow: 'Kontakt',
      title: 'Župni ured',
      intro:
        'Crkva i župni ured nalaze se u Hercegovačkoj ulici na Neslanovcu, u sjeverozapadnom dijelu Splita.',
      contact: {
        parishOfficeName: 'Župni ured sv. Marka Evanđelista',
        street: 'Hercegovačka 157',
        postalCode: '21000',
        city: 'Split',
        country: 'Hrvatska',
        phone: '021 367 422',
      },
      map: {
        embedUrl:
          'https://www.google.com/maps?q=Hercegova%C4%8Dka%20157%2C%2021000%20Split&output=embed',
        directionsUrl:
          'https://www.google.com/maps/dir/?api=1&destination=Hercegova%C4%8Dka%20157%2C%2021000%20Split',
      },
      metaTitle: 'Kontakt — Župa sv. Marka, Neslanovac, Split',
      metaDescription:
        'Adresa, telefon, radno vrijeme župnog ureda i karta crkve sv. Marka na splitskom Neslanovcu.',
    },
  })

  /* --------------------------------------------------------- collections */

  const upsert = async <T extends Record<string, unknown>>(
    collection: 'news' | 'news-categories' | 'useful-links',
    where: Where,
    data: T,
  ) => {
    const existing = await payload.find({ collection, where, limit: 1 })
    if (existing.docs.length) {
      return payload.update({
        collection,
        id: existing.docs[0].id,
        data: data as never,
      })
    }
    return payload.create({ collection, data: data as never })
  }

  const categories = [
    { title: 'Obavijesti', description: 'Promjene u rasporedu i kratke obavijesti župnog ureda.' },
    { title: 'Slavlja', description: 'Blagdani, župno slavlje i sakramentna slavlja.' },
    { title: 'Zajednice', description: 'Vjeronauk, ministranti, zbor i župne zajednice.' },
  ]

  const categoryIds: Record<string, number | string> = {}
  for (const category of categories) {
    const doc = await upsert('news-categories', { title: { equals: category.title } }, category)
    categoryIds[category.title] = (doc as { id: number | string }).id
  }

  const links = [
    {
      title: 'Splitsko-makarska nadbiskupija',
      url: 'https://smn.hr/',
      description: 'Službene stranice nadbiskupije: vijesti, popis župa i dokumenti.',
      group: 'crkva',
      order: 1,
    },
    {
      title: 'Hrvatska biskupska konferencija',
      url: 'https://www.hbk.hr/',
      description: 'Dokumenti, poruke biskupa i liturgijski kalendar.',
      group: 'crkva',
      order: 2,
    },
    {
      title: 'Informativna katolička agencija (IKA)',
      url: 'https://ika.hkm.hr/',
      description: 'Dnevne vijesti iz Crkve u Hrvatskoj.',
      group: 'crkva',
      order: 3,
    },
    {
      title: 'Vatican News — hrvatski',
      url: 'https://www.vaticannews.va/hr.html',
      description: 'Papine kateheze, poruke i vijesti iz Svete Stolice.',
      group: 'duhovnost',
      order: 4,
    },
    {
      title: 'Bitno.net',
      url: 'https://www.bitno.net/',
      description: 'Katolički portal: duhovnost, obitelj i kultura.',
      group: 'duhovnost',
      order: 5,
    },
    {
      title: 'Neslanovac — mjesni odbor',
      url: 'https://neslanovac.hr/',
      description: 'Stranica kotara: obavijesti, zapisnici i događanja u naselju.',
      group: 'zajednica',
      order: 6,
    },
  ]

  for (const link of links) {
    await upsert('useful-links', { url: { equals: link.url } }, {
      ...link,
      featuredOnHome: true,
    })
  }

  // Example news — the parish office replaces these with its own.
  const news = exampleNews(categoryIds)

  for (const item of news) {
    await upsert('news', { slug: { equals: item.slug } }, item)
  }

  payload.logger.info('Seed završen: globali, kategorije, vijesti, svećenici i poveznice.')
  process.exit(0)
}

await seed()
