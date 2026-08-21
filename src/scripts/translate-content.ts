/**
 * Fills in the hr/en/it/pl copy for every `localized: true` field.
 *
 * hr is included deliberately: converting an existing field to
 * `localized: true` moves its storage from a flat column to a per-locale
 * child table, and Payload's dev-mode schema push cannot carry old column
 * data across that shape change on its own — so this script re-writes the
 * original Croatian copy (captured from the live CMS before the migration)
 * alongside the new en/it/pl translations, restoring it in the same pass.
 *
 * Run with: `npm run translate` (or `payload run src/scripts/translate-content.ts`).
 * Safe to re-run — every write is a full overwrite of that locale's value,
 * matched against the same collection IDs / global slugs the seed script uses.
 */
import { getPayload } from 'payload'
import config from '../payload.config'
import { richText, type Lexical } from './data/rich-text'

type Locale = 'hr' | 'en' | 'it' | 'pl'
const LOCALES: Locale[] = ['hr', 'en', 'it', 'pl']

/* ------------------------------------------------------------- globals --- */

const settings: Record<Locale, Record<string, unknown>> = {
  hr: {
    siteName: 'Župa sv. Marka Evanđelista',
    shortName: 'Sv. Marko',
    tagline: 'Neslanovac, Split',
    diocese: 'Splitsko-makarska nadbiskupija',
    navigation: [
      { label: 'Naslovnica', href: '/' },
      { label: 'Vijesti', href: '/vijesti/' },
      { label: 'O nama', href: '/o-nama/' },
      { label: 'Kontakt', href: '/kontakt/' },
    ],
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
  },
  en: {
    siteName: 'Parish of St Mark the Evangelist',
    shortName: "St Mark's",
    tagline: 'Neslanovac, Split',
    diocese: 'Archdiocese of Split-Makarska',
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'News', href: '/vijesti/' },
      { label: 'About', href: '/o-nama/' },
      { label: 'Contact', href: '/kontakt/' },
    ],
    headerCta: { label: 'Mass schedule', href: '/#raspored' },
    footerColumns: [
      {
        title: 'Parish',
        links: [
          { label: 'About', href: '/o-nama/' },
          { label: 'News', href: '/vijesti/' },
          { label: 'Contact', href: '/kontakt/' },
        ],
      },
      {
        title: 'Schedule',
        links: [
          { label: 'Holy Mass', href: '/kontakt/' },
          { label: 'Confession', href: '/kontakt/' },
          { label: 'Parish office', href: '/kontakt/' },
        ],
      },
    ],
    copyright: 'Parish of St Mark the Evangelist, Split — Neslanovac',
  },
  it: {
    siteName: 'Parrocchia di San Marco Evangelista',
    shortName: 'San Marco',
    tagline: 'Neslanovac, Split',
    diocese: 'Arcidiocesi di Spalato-Macarsca',
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Notizie', href: '/vijesti/' },
      { label: 'Chi siamo', href: '/o-nama/' },
      { label: 'Contatti', href: '/kontakt/' },
    ],
    headerCta: { label: 'Orario delle Messe', href: '/#raspored' },
    footerColumns: [
      {
        title: 'Parrocchia',
        links: [
          { label: 'Chi siamo', href: '/o-nama/' },
          { label: 'Notizie', href: '/vijesti/' },
          { label: 'Contatti', href: '/kontakt/' },
        ],
      },
      {
        title: 'Orari',
        links: [
          { label: 'Sante Messe', href: '/kontakt/' },
          { label: 'Confessioni', href: '/kontakt/' },
          { label: 'Ufficio parrocchiale', href: '/kontakt/' },
        ],
      },
    ],
    copyright: 'Parrocchia di San Marco Evangelista, Spalato — Neslanovac',
  },
  pl: {
    siteName: 'Parafia św. Marka Ewangelisty',
    shortName: 'Św. Marek',
    tagline: 'Neslanovac, Split',
    diocese: 'Archidiecezja splicko-makarska',
    navigation: [
      { label: 'Strona główna', href: '/' },
      { label: 'Aktualności', href: '/vijesti/' },
      { label: 'O nas', href: '/o-nama/' },
      { label: 'Kontakt', href: '/kontakt/' },
    ],
    headerCta: { label: 'Harmonogram Mszy', href: '/#raspored' },
    footerColumns: [
      {
        title: 'Parafia',
        links: [
          { label: 'O nas', href: '/o-nama/' },
          { label: 'Aktualności', href: '/vijesti/' },
          { label: 'Kontakt', href: '/kontakt/' },
        ],
      },
      {
        title: 'Harmonogram',
        links: [
          { label: 'Msze Święte', href: '/kontakt/' },
          { label: 'Spowiedź', href: '/kontakt/' },
          { label: 'Biuro parafialne', href: '/kontakt/' },
        ],
      },
    ],
    copyright: 'Parafia św. Marka Ewangelisty, Split — Neslanovac',
  },
}

const schedule: Record<Locale, Record<string, unknown>> = {
  hr: {
    masses: [
      { day: 'Nedjeljom i blagdanom', times: '9:00, 11:00 i 20:00', note: 'Misa u 11:00 je pjevana' },
      { day: 'Radnim danom', times: '19:00', note: 'Od ponedjeljka do subote' },
    ],
    massesNote:
      'Na blagdane i u korizmeno te došašćansko vrijeme raspored može odstupati — najave su uvijek u župnim vijestima.',
    confessions: [
      { day: 'Radnim danom', times: '18:30 – 19:00', note: 'Pola sata prije svete mise' },
      { day: 'Nedjeljom', times: 'Prije svake mise', note: '' },
      { day: 'Prvi petak u mjesecu', times: '18:00 – 19:00', note: 'Ispovijed za bolesnike i starije po dogovoru' },
    ],
    confessionsNote:
      'Za ispovijed izvan navedenih termina slobodno se javite župniku prije ili poslije svete mise.',
    devotions: [
      { title: 'Klanjanje pred Presvetim', day: 'Četvrtkom', note: '' },
      { title: 'Krunica', day: 'Svakoga dana', note: '' },
      { title: 'Pobožnost prvih petaka', day: 'Prvi petak u mjesecu', note: 'Nakon mise pohod bolesnicima' },
    ],
    specialSchedule: [
      {
        title: 'Božićna ispovijed',
        entries: [
          { day: '23.12. srijeda', times: '10h – 15h', note: 'ispovijeda 5 svećenika' },
          { day: '24.12. četvrtak', times: '10h – 13h', note: null },
        ],
      },
      { title: 'Božićne mise', entries: [{ day: '25.12. petak · Božić', times: '9, 10, 12 i 17 sati', note: null }] },
      { title: 'blagoslov stanova', entries: [{ day: '12.5. - 12.8.', times: 'jutrom od 10 sati', note: null }] },
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
  en: {
    masses: [
      { day: 'Sundays and holy days', times: '9:00, 11:00 i 20:00', note: 'The 11:00 Mass is sung' },
      { day: 'Weekdays', times: '19:00', note: 'Monday to Saturday' },
    ],
    massesNote:
      'On holy days and during Lent and Advent the schedule may vary — announcements always appear in the parish news.',
    confessions: [
      { day: 'Weekdays', times: '18:30 – 19:00', note: 'Half an hour before Holy Mass' },
      { day: 'Sundays', times: 'Prije svake mise', note: '' },
      { day: 'First Friday of the month', times: '18:00 – 19:00', note: 'Confession for the sick and elderly by arrangement' },
    ],
    confessionsNote:
      'For confession outside these times, feel free to contact the parish priest before or after Mass.',
    devotions: [
      { title: 'Adoration of the Blessed Sacrament', day: 'Thursdays', note: '' },
      { title: 'Rosary', day: 'Every day', note: '' },
      { title: 'First Fridays devotion', day: 'First Friday of the month', note: 'Visits to the sick after Mass' },
    ],
    specialSchedule: [
      {
        title: 'Christmas confession',
        entries: [
          { day: '23 Dec, Wednesday', times: '10h – 15h', note: '5 priests hearing confession' },
          { day: '24 Dec, Thursday', times: '10h – 13h', note: null },
        ],
      },
      { title: 'Christmas Masses', entries: [{ day: '25 Dec, Friday · Christmas', times: '9, 10, 12 i 17 sati', note: null }] },
      { title: 'Blessing of homes', entries: [{ day: '12 May – 12 August', times: 'jutrom od 10 sati', note: null }] },
    ],
    officeHours: [
      { day: 'Monday – Friday', hours: '09:00 – 11:00', note: '' },
      { day: 'Tuesday and Thursday', hours: '17:30 – 18:30', note: 'Afternoon slot' },
      { day: 'Saturday', hours: '09:00 – 10:00', note: '' },
      { day: 'Sunday', hours: 'Closed', note: 'Except emergencies' },
    ],
    officeNotes: [
      {
        title: 'Baptism',
        text: "Register at least a month in advance. Bring the child's birth certificate and the godparents' details.",
      },
      {
        title: 'Marriage',
        text: 'Engaged couples should get in touch at least three months before the wedding for the marriage course and preparation.',
      },
      {
        title: 'The sick and funerals',
        text: 'For anointing of the sick or a funeral, contact us any time, day or night.',
      },
    ],
  },
  it: {
    masses: [
      { day: 'Domenica e giorni festivi', times: '9:00, 11:00 i 20:00', note: 'La Messa delle 11:00 è cantata' },
      { day: 'Nei giorni feriali', times: '19:00', note: 'Da lunedì a sabato' },
    ],
    massesNote:
      "Nei giorni festivi e durante la Quaresima e l'Avvento l'orario può variare — gli avvisi sono sempre pubblicati nelle notizie parrocchiali.",
    confessions: [
      { day: 'Nei giorni feriali', times: '18:30 – 19:00', note: 'Mezz\'ora prima della Santa Messa' },
      { day: 'Domenica', times: 'Prije svake mise', note: '' },
      { day: 'Primo venerdì del mese', times: '18:00 – 19:00', note: 'Confessioni per malati e anziani su appuntamento' },
    ],
    confessionsNote:
      'Per confessarsi al di fuori di questi orari, rivolgersi liberamente al parroco prima o dopo la Santa Messa.',
    devotions: [
      { title: 'Adorazione eucaristica', day: 'Il giovedì', note: '' },
      { title: 'Rosario', day: 'Ogni giorno', note: '' },
      { title: 'Devozione dei primi venerdì', day: 'Primo venerdì del mese', note: 'Visita ai malati dopo la Messa' },
    ],
    specialSchedule: [
      {
        title: 'Confessioni natalizie',
        entries: [
          { day: '23/12, mercoledì', times: '10h – 15h', note: 'confessano 5 sacerdoti' },
          { day: '24/12, giovedì', times: '10h – 13h', note: null },
        ],
      },
      { title: 'Sante Messe di Natale', entries: [{ day: '25/12, venerdì · Natale', times: '9, 10, 12 i 17 sati', note: null }] },
      { title: 'Benedizione delle case', entries: [{ day: '12/5 – 12/8', times: 'jutrom od 10 sati', note: null }] },
    ],
    officeHours: [
      { day: 'Lunedì – venerdì', hours: '09:00 – 11:00', note: '' },
      { day: 'Martedì e giovedì', hours: '17:30 – 18:30', note: 'Turno pomeridiano' },
      { day: 'Sabato', hours: '09:00 – 10:00', note: '' },
      { day: 'Domenica', hours: 'Chiuso', note: 'Salvo urgenze' },
    ],
    officeNotes: [
      {
        title: 'Battesimo',
        text: 'Da comunicare almeno un mese prima. Portare con sé il certificato di nascita del bambino e i dati dei padrini.',
      },
      {
        title: 'Matrimonio',
        text: "I fidanzati si rivolgono all'ufficio almeno tre mesi prima del matrimonio per il corso e la preparazione prematrimoniale.",
      },
      {
        title: 'Malati e funerali',
        text: "Per l'unzione degli infermi e per i funerali, contattateci a qualsiasi ora del giorno o della notte.",
      },
    ],
  },
  pl: {
    masses: [
      { day: 'W niedziele i święta', times: '9:00, 11:00 i 20:00', note: 'Msza o 11:00 jest śpiewana' },
      { day: 'W dni powszednie', times: '19:00', note: 'Od poniedziałku do soboty' },
    ],
    massesNote:
      'W święta oraz w okresie Wielkiego Postu i Adwentu harmonogram może się różnić — ogłoszenia zawsze znajdują się w aktualnościach parafialnych.',
    confessions: [
      { day: 'W dni powszednie', times: '18:30 – 19:00', note: 'Pół godziny przed Mszą Świętą' },
      { day: 'W niedzielę', times: 'Prije svake mise', note: '' },
      { day: 'Pierwszy piątek miesiąca', times: '18:00 – 19:00', note: 'Spowiedź dla chorych i starszych po uzgodnieniu' },
    ],
    confessionsNote:
      'Aby wyspowiadać się poza wymienionymi terminami, można zwrócić się do proboszcza przed lub po Mszy Świętej.',
    devotions: [
      { title: 'Adoracja Najświętszego Sakramentu', day: 'W czwartki', note: '' },
      { title: 'Różaniec', day: 'Codziennie', note: '' },
      { title: 'Nabożeństwo pierwszych piątków', day: 'Pierwszy piątek miesiąca', note: 'Odwiedziny chorych po Mszy' },
    ],
    specialSchedule: [
      {
        title: 'Spowiedź przed Bożym Narodzeniem',
        entries: [
          { day: '23.12, środa', times: '10h – 15h', note: 'spowiada 5 kapłanów' },
          { day: '24.12, czwartek', times: '10h – 13h', note: null },
        ],
      },
      { title: 'Msze Boże Narodzenie', entries: [{ day: '25.12, piątek · Boże Narodzenie', times: '9, 10, 12 i 17 sati', note: null }] },
      { title: 'Błogosławieństwo domów', entries: [{ day: '12.05 – 12.08', times: 'jutrom od 10 sati', note: null }] },
    ],
    officeHours: [
      { day: 'Poniedziałek – piątek', hours: '09:00 – 11:00', note: '' },
      { day: 'Wtorek i czwartek', hours: '17:30 – 18:30', note: 'Termin popołudniowy' },
      { day: 'Sobota', hours: '09:00 – 10:00', note: '' },
      { day: 'Niedziela', hours: 'Zamknięte', note: 'Poza sytuacjami nagłymi' },
    ],
    officeNotes: [
      {
        title: 'Chrzest',
        text: 'Zgłosić co najmniej miesiąc wcześniej. Prosimy przynieść akt urodzenia dziecka oraz dane rodziców chrzestnych.',
      },
      {
        title: 'Ślub',
        text: 'Narzeczeni zgłaszają się co najmniej trzy miesiące przed ślubem w celu odbycia kursu i przygotowania przedmałżeńskiego.',
      },
      {
        title: 'Chorzy i pogrzeby',
        text: 'W sprawie namaszczenia chorych i pogrzebu prosimy o kontakt o każdej porze dnia i nocy.',
      },
    ],
  },
}

const homePage: Record<Locale, Record<string, unknown>> = {
  hr: {
    hero: {
      eyebrow: 'Neslanovac · Split',
      title: 'Župa sv. Marka Evanđelista',
      subtitle:
        'Zajednica koja se okuplja oko oltara na splitskom Neslanovcu od 1994. godine. Dobro došli — na misu, na razgovor ili samo na tišinu pred Presvetim.',
      primaryCta: { label: 'Župne vijesti' },
      secondaryCta: { label: 'Kontakt' },
      massesTitle: 'Svete mise',
      confessionsTitle: 'Ispovijed',
    },
    officeSection: {
      eyebrow: 'Župni ured',
      title: 'Radno vrijeme i sakramenti',
      intro:
        'Sve što se tiče krštenja, vjenčanja, potvrda i misa zadušnica dogovara se u župnom uredu uz crkvu.',
      cards: [
        {
          title: 'Krštenje',
          text: 'Krštenja su nedjeljom nakon mise u 11:00. Roditelji se javljaju u ured najmanje mjesec dana ranije.',
        },
        {
          title: 'Vjenčanje',
          text: 'Zaručnici dolaze u ured tri mjeseca prije vjenčanja radi priprave i zaručničkog tečaja.',
        },
        {
          title: 'Bolesnici',
          text: 'Bolesnicima i starijima svećenik dolazi kući, redovito na prvi petak u mjesecu.',
        },
        {
          title: 'Sprovod i mise zadušnice',
          text: 'Za sprovod javite se odmah, u bilo koje doba. Mise zadušnice naručuju se u uredu.',
        },
      ],
    },
    newsSection: {
      eyebrow: 'Iz župe',
      title: 'Vijesti i obavijesti',
      intro: 'Najave slavlja, promjene u rasporedu i izvještaji iz života župne zajednice.',
      ctaLabel: 'Sve vijesti',
    },
    quote: {
      text: 'Pođite po svem svijetu, propovijedajte evanđelje svemu stvorenju.',
      source: 'Mk 16, 15',
    },
    linksSection: {
      eyebrow: 'Poveznice',
      title: 'Gdje dalje',
      intro: 'Stranice nadbiskupije, katolički mediji i zajednica u kojoj župa živi.',
    },
    metaTitle: 'Župa sv. Marka Evanđelista — Neslanovac, Split',
    metaDescription:
      'Raspored svetih misa, ispovijedi i radnog vremena župe sv. Marka Evanđelista na splitskom Neslanovcu, uz župne vijesti i kontakt.',
  },
  en: {
    hero: {
      eyebrow: 'Neslanovac · Split',
      title: 'Parish of St Mark the Evangelist',
      subtitle:
        'A community that has gathered around the altar in Neslanovac, Split, since 1994. Welcome — to Mass, for a conversation, or simply to sit in silence before the Blessed Sacrament.',
      primaryCta: { label: 'Parish news' },
      secondaryCta: { label: 'Contact' },
      massesTitle: 'Holy Mass',
      confessionsTitle: 'Confession',
    },
    officeSection: {
      eyebrow: 'Parish office',
      title: 'Office hours and sacraments',
      intro:
        'Everything to do with baptisms, weddings, confirmations and requiem Masses is arranged at the parish office by the church.',
      cards: [
        {
          title: 'Baptism',
          text: 'Baptisms take place on Sundays after the 11:00 Mass. Parents should contact the office at least a month in advance.',
        },
        {
          title: 'Marriage',
          text: 'Engaged couples come to the office three months before the wedding for preparation and the marriage course.',
        },
        {
          title: 'The sick',
          text: 'The priest visits the sick and elderly at home, regularly on the first Friday of the month.',
        },
        {
          title: 'Funerals and requiem Masses',
          text: 'For a funeral, contact us right away, at any time. Requiem Masses are arranged at the office.',
        },
      ],
    },
    newsSection: {
      eyebrow: 'From the parish',
      title: 'News and announcements',
      intro: 'Announcements of celebrations, schedule changes and reports from the life of the parish community.',
      ctaLabel: 'All news',
    },
    quote: {
      text: 'Go into all the world and proclaim the gospel to the whole creation.',
      source: 'Mk 16:15',
    },
    linksSection: {
      eyebrow: 'Links',
      title: 'Where to next',
      intro: "The archdiocese's pages, Catholic media, and the community the parish lives within.",
    },
    metaTitle: 'Parish of St Mark the Evangelist — Neslanovac, Split',
    metaDescription:
      'Mass, confession and office-hours schedule for the parish of St Mark the Evangelist in Neslanovac, Split, along with parish news and contact details.',
  },
  it: {
    hero: {
      eyebrow: 'Neslanovac · Spalato',
      title: 'Parrocchia di San Marco Evangelista',
      subtitle:
        'Una comunità che si raduna attorno all\'altare a Neslanovac, Spalato, dal 1994. Benvenuti — per la Messa, per una conversazione, o semplicemente per un momento di silenzio davanti al Santissimo.',
      primaryCta: { label: 'Notizie parrocchiali' },
      secondaryCta: { label: 'Contatti' },
      massesTitle: 'Sante Messe',
      confessionsTitle: 'Confessioni',
    },
    officeSection: {
      eyebrow: 'Ufficio parrocchiale',
      title: 'Orari e sacramenti',
      intro:
        "Tutto ciò che riguarda battesimi, matrimoni, cresime e messe di suffragio si concorda presso l'ufficio parrocchiale accanto alla chiesa.",
      cards: [
        {
          title: 'Battesimo',
          text: "I battesimi si celebrano la domenica dopo la Messa delle 11:00. I genitori si rivolgono all'ufficio almeno un mese prima.",
        },
        {
          title: 'Matrimonio',
          text: 'I fidanzati si presentano in ufficio tre mesi prima del matrimonio per la preparazione e il corso prematrimoniale.',
        },
        {
          title: 'Malati',
          text: 'Il sacerdote visita a domicilio i malati e gli anziani, regolarmente il primo venerdì del mese.',
        },
        {
          title: 'Funerali e messe di suffragio',
          text: 'Per un funerale, contattateci subito, a qualsiasi ora. Le messe di suffragio si prenotano in ufficio.',
        },
      ],
    },
    newsSection: {
      eyebrow: 'Dalla parrocchia',
      title: 'Notizie e avvisi',
      intro: 'Annunci di celebrazioni, variazioni di orario e resoconti dalla vita della comunità parrocchiale.',
      ctaLabel: 'Tutte le notizie',
    },
    quote: {
      text: 'Andate in tutto il mondo e proclamate il Vangelo a ogni creatura.',
      source: 'Mc 16,15',
    },
    linksSection: {
      eyebrow: 'Collegamenti',
      title: 'Dove andare ancora',
      intro: "Le pagine dell'arcidiocesi, i media cattolici e la comunità in cui vive la parrocchia.",
    },
    metaTitle: 'Parrocchia di San Marco Evangelista — Neslanovac, Spalato',
    metaDescription:
      "Orario delle Sante Messe, delle confessioni e dell'ufficio della parrocchia di San Marco Evangelista a Neslanovac, Spalato, con le notizie parrocchiali e i contatti.",
  },
  pl: {
    hero: {
      eyebrow: 'Neslanovac · Split',
      title: 'Parafia św. Marka Ewangelisty',
      subtitle:
        'Wspólnota, która od 1994 roku gromadzi się wokół ołtarza w Neslanovacu w Splicie. Zapraszamy — na Mszę Świętą, na rozmowę albo po prostu na chwilę ciszy przed Najświętszym Sakramentem.',
      primaryCta: { label: 'Aktualności parafialne' },
      secondaryCta: { label: 'Kontakt' },
      massesTitle: 'Msze Święte',
      confessionsTitle: 'Spowiedź',
    },
    officeSection: {
      eyebrow: 'Biuro parafialne',
      title: 'Godziny otwarcia i sakramenty',
      intro:
        'Wszystko, co dotyczy chrztów, ślubów, bierzmowania i mszy żałobnych, ustala się w biurze parafialnym przy kościele.',
      cards: [
        {
          title: 'Chrzest',
          text: 'Chrzty odbywają się w niedzielę po Mszy o 11:00. Rodzice zgłaszają się do biura co najmniej miesiąc wcześniej.',
        },
        {
          title: 'Ślub',
          text: 'Narzeczeni zgłaszają się do biura trzy miesiące przed ślubem w celu przygotowania i kursu przedmałżeńskiego.',
        },
        {
          title: 'Chorzy',
          text: 'Ksiądz odwiedza chorych i starszych w domu, regularnie w pierwszy piątek miesiąca.',
        },
        {
          title: 'Pogrzeby i msze żałobne',
          text: 'W sprawie pogrzebu prosimy o kontakt natychmiast, o każdej porze. Msze żałobne zamawia się w biurze.',
        },
      ],
    },
    newsSection: {
      eyebrow: 'Z życia parafii',
      title: 'Aktualności i ogłoszenia',
      intro: 'Zapowiedzi uroczystości, zmiany w harmonogramie i relacje z życia wspólnoty parafialnej.',
      ctaLabel: 'Wszystkie aktualności',
    },
    quote: {
      text: 'Idźcie na cały świat i głoście Ewangelię wszelkiemu stworzeniu.',
      source: 'Mk 16, 15',
    },
    linksSection: {
      eyebrow: 'Odnośniki',
      title: 'Co dalej',
      intro: 'Strony archidiecezji, media katolickie i wspólnota, w której żyje parafia.',
    },
    metaTitle: 'Parafia św. Marka Ewangelisty — Neslanovac, Split',
    metaDescription:
      'Harmonogram Mszy Świętych, spowiedzi i godzin otwarcia biura parafii św. Marka Ewangelisty w Neslanovacu w Splicie, wraz z aktualnościami i kontaktem.',
  },
}

const newsPage: Record<Locale, Record<string, unknown>> = {
  hr: {
    eyebrow: 'Iz župe',
    title: 'Župne vijesti',
    intro: 'Obavijesti, najave slavlja i izvještaji iz života župe sv. Marka na Neslanovcu.',
    emptyMessage: 'Trenutno nema objavljenih vijesti.',
    metaTitle: 'Župne vijesti — Župa sv. Marka, Neslanovac',
    metaDescription: 'Obavijesti i najave iz župe sv. Marka Evanđelista na splitskom Neslanovcu.',
  },
  en: {
    eyebrow: 'From the parish',
    title: 'Parish news',
    intro: 'Notices, announcements of celebrations and reports from the life of the parish of St Mark in Neslanovac.',
    emptyMessage: 'There is no news published yet.',
    metaTitle: 'Parish news — Parish of St Mark, Neslanovac',
    metaDescription: 'Notices and announcements from the parish of St Mark the Evangelist in Neslanovac, Split.',
  },
  it: {
    eyebrow: 'Dalla parrocchia',
    title: 'Notizie parrocchiali',
    intro: 'Avvisi, annunci di celebrazioni e resoconti dalla vita della parrocchia di San Marco a Neslanovac.',
    emptyMessage: 'Al momento non ci sono notizie pubblicate.',
    metaTitle: 'Notizie parrocchiali — Parrocchia di San Marco, Neslanovac',
    metaDescription: 'Avvisi e annunci dalla parrocchia di San Marco Evangelista a Neslanovac, Spalato.',
  },
  pl: {
    eyebrow: 'Z życia parafii',
    title: 'Aktualności parafialne',
    intro: 'Ogłoszenia, zapowiedzi uroczystości i relacje z życia parafii św. Marka w Neslanovacu.',
    emptyMessage: 'Obecnie nie ma opublikowanych aktualności.',
    metaTitle: 'Aktualności parafialne — Parafia św. Marka, Neslanovac',
    metaDescription: 'Ogłoszenia i zapowiedzi z parafii św. Marka Ewangelisty w Neslanovacu w Splicie.',
  },
}

const aboutPage: Record<Locale, Record<string, unknown>> = {
  hr: {
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
    church: {
      title: 'Crkva sv. Marka',
      body: richText(
        'Župna crkva posvećena je 2005. godine. Projektirao ju je talijanski arhitekt Maurizio Bergamo, a razradu projekta potpisuje arhitekt Damir Rako.',
        'Prostor je zamišljen kao mirna, svijetla dvorana okupljena oko oltara — bez raskoši, s naglaskom na svjetlu koje se kroz dan mijenja po zidovima. Uz crkvu su župni ured i dvorana u kojoj se održavaju susreti zajednica i vjeronauk.',
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
  en: {
    eyebrow: 'About',
    title: 'The Parish of St Mark the Evangelist in Neslanovac',
    intro:
      'A young city parish in the north-western part of Split, founded in 1994, with a church consecrated in 2005.',
    parish: {
      title: 'A community that grew with the neighbourhood',
      body: richText(
        'The Parish of St Mark the Evangelist was established on 12 September 1994, carved from the eastern part of the parish of the Nativity of the Blessed Virgin Mary, to which Neslanovac had belonged until then. Its first parish priest was Fr Šimun Doljanin.',
        'Today it is a living city parish: on Sundays the community gathers for three Holy Masses, and during the week for evening Mass, adoration and the rosary. Alongside the parish priest, catechists, the choir, altar servers and pastoral collaborators are all active.',
        'The parish office by the church is open on weekdays, and this is where baptisms, weddings, requiem Masses and all other needs of parishioners are arranged.',
      ),
    },
    church: {
      title: 'The Church of St Mark',
      body: richText(
        "The parish church was consecrated in 2005. It was designed by the Italian architect Maurizio Bergamo, with the detailed project signed by architect Damir Rako.",
        'The space was conceived as a calm, bright hall gathered around the altar — without ornament, with an emphasis on the light that shifts across the walls through the day. Alongside the church are the parish office and a hall used for community gatherings and catechism.',
      ),
    },
    patron: {
      title: 'Saint Mark the Evangelist',
      feastDay: '25 April',
      body: richText(
        "Saint Mark, author of the earliest of the four Gospels, was a companion of the apostles Peter and Paul. Tradition links him to Alexandria, where, according to early sources, he died a martyr's death.",
        'His symbol is the winged lion — which is why a lion appears in depictions of Saint Mark. The Gospel that bears his name is the shortest and swiftest: in it Jesus is constantly on the move, healing and calling, and it closes with the sending of the disciples to go into all the world and proclaim the gospel.',
        'The parish celebrates its heavenly patron on 25 April, when the parish feast is also held.',
      ),
    },
    metaTitle: 'About the Parish of St Mark — Neslanovac, Split',
    metaDescription:
      "History of the parish of St Mark the Evangelist in Neslanovac, the parish church consecrated in 2005, and Saint Mark the Evangelist, the parish's heavenly patron.",
  },
  it: {
    eyebrow: 'Chi siamo',
    title: 'La parrocchia di San Marco Evangelista a Neslanovac',
    intro:
      'Una giovane parrocchia cittadina nella zona nord-occidentale di Spalato, fondata nel 1994, con una chiesa consacrata nel 2005.',
    parish: {
      title: 'Una comunità cresciuta insieme al quartiere',
      body: richText(
        'La parrocchia di San Marco Evangelista è stata istituita il 12 settembre 1994, staccando la parte orientale della parrocchia della Natività della Beata Vergine Maria, a cui Neslanovac apparteneva fino ad allora. Il primo parroco fu don Šimun Doljanin.',
        "Oggi è una vivace parrocchia cittadina: la domenica la comunità si raduna per tre Sante Messe, e durante la settimana per la Messa serale, l'adorazione e il rosario. Accanto al parroco operano catechisti, il coro, i ministranti e i collaboratori pastorali.",
        "L'ufficio parrocchiale accanto alla chiesa è aperto nei giorni feriali, ed è lì che si concordano battesimi, matrimoni, messe di suffragio e ogni altra necessità dei parrocchiani.",
      ),
    },
    church: {
      title: 'La chiesa di San Marco',
      body: richText(
        "La chiesa parrocchiale è stata consacrata nel 2005. È stata progettata dall'architetto italiano Maurizio Bergamo, con lo sviluppo del progetto firmato dall'architetto Damir Rako.",
        "Lo spazio è concepito come un'aula calma e luminosa, raccolta attorno all'altare — senza sfarzo, con l'accento sulla luce che durante il giorno si sposta sulle pareti. Accanto alla chiesa si trovano l'ufficio parrocchiale e una sala dove si svolgono gli incontri delle comunità e il catechismo.",
      ),
    },
    patron: {
      title: 'San Marco Evangelista',
      feastDay: '25 aprile',
      body: richText(
        "San Marco, autore del più antico dei quattro Vangeli, fu collaboratore degli apostoli Pietro e Paolo. La tradizione lo lega ad Alessandria, dove, secondo fonti antiche, morì martire.",
        'Il suo simbolo è il leone alato — per questo il leone compare nelle raffigurazioni di San Marco. Il Vangelo che porta il suo nome è il più breve e il più rapido: in esso Gesù è costantemente in cammino, guarisce e chiama, e si conclude con l\'invio dei discepoli ad andare per tutto il mondo a proclamare il Vangelo.',
        'La parrocchia festeggia il suo patrono celeste il 25 aprile, quando si svolge anche la festa patronale.',
      ),
    },
    metaTitle: 'La parrocchia di San Marco — Neslanovac, Spalato',
    metaDescription:
      'Storia della parrocchia di San Marco Evangelista a Neslanovac, la chiesa parrocchiale consacrata nel 2005 e San Marco Evangelista, patrono celeste della parrocchia.',
  },
  pl: {
    eyebrow: 'O nas',
    title: 'Parafia św. Marka Ewangelisty w Neslanovacu',
    intro:
      'Młoda miejska parafia w północno-zachodniej części Splitu, założona w 1994 roku, z kościołem konsekrowanym w 2005 roku.',
    parish: {
      title: 'Wspólnota, która wyrosła razem z osiedlem',
      body: richText(
        'Parafia św. Marka Ewangelisty została erygowana 12 września 1994 roku poprzez wydzielenie wschodniej części parafii Narodzenia Najświętszej Maryi Panny, do której Neslanovac wcześniej należał. Pierwszym proboszczem był ks. Šimun Doljanin.',
        'Dziś jest to żywa miejska parafia: w niedziele wspólnota gromadzi się na trzech Mszach Świętych, a w tygodniu na Mszy wieczornej, adoracji i różańcu. Obok proboszcza działają katecheci, chór, ministranci i współpracownicy duszpasterscy.',
        'Biuro parafialne przy kościele jest otwarte w dni powszednie i to tam ustala się chrzty, śluby, msze żałobne oraz wszystkie inne potrzeby parafian.',
      ),
    },
    church: {
      title: 'Kościół św. Marka',
      body: richText(
        'Kościół parafialny został konsekrowany w 2005 roku. Zaprojektował go włoski architekt Maurizio Bergamo, a opracowanie projektu podpisuje architekt Damir Rako.',
        'Wnętrze zostało pomyślane jako spokojna, jasna sala skupiona wokół ołtarza — bez przepychu, z naciskiem na światło, które w ciągu dnia zmienia się na ścianach. Przy kościele znajdują się biuro parafialne oraz sala, w której odbywają się spotkania wspólnot i katecheza.',
      ),
    },
    patron: {
      title: 'Święty Marek Ewangelista',
      feastDay: '25 kwietnia',
      body: richText(
        'Święty Marek, autor najstarszej z czterech Ewangelii, był towarzyszem apostołów Piotra i Pawła. Tradycja łączy go z Aleksandrią, gdzie według dawnych źródeł poniósł śmierć męczeńską.',
        'Jego znakiem jest skrzydlaty lew — dlatego lew pojawia się na przedstawieniach świętego Marka. Ewangelia nosząca jego imię jest najkrótsza i najbardziej dynamiczna: Jezus nieustannie w niej wędruje, uzdrawia i wzywa, a kończy się posłaniem uczniów, by szli na cały świat i głosili Ewangelię.',
        'Parafia obchodzi święto swojego patrona 25 kwietnia, kiedy odbywa się także odpust parafialny.',
      ),
    },
    metaTitle: 'O parafii św. Marka — Neslanovac, Split',
    metaDescription:
      'Historia parafii św. Marka Ewangelisty w Neslanovacu, kościół parafialny konsekrowany w 2005 roku oraz święty Marek Ewangelista, patron parafii.',
  },
}

const contactPage: Record<Locale, Record<string, unknown>> = {
  hr: {
    eyebrow: 'Kontakt',
    title: 'Župni ured',
    intro: 'Crkva i župni ured nalaze se u Hercegovačkoj ulici na Neslanovcu, u sjeverozapadnom dijelu Splita.',
    contact: { parishOfficeName: 'Župni ured sv. Marka Evanđelista', country: 'Hrvatska' },
    metaTitle: 'Kontakt — Župa sv. Marka, Neslanovac, Split',
    metaDescription: 'Adresa, telefon, radno vrijeme župnog ureda i karta crkve sv. Marka na splitskom Neslanovcu.',
  },
  en: {
    eyebrow: 'Contact',
    title: 'Parish Office',
    intro: 'The church and parish office are on Hercegovačka Street in Neslanovac, in the north-western part of Split.',
    contact: { parishOfficeName: 'Parish Office of St Mark the Evangelist', country: 'Croatia' },
    metaTitle: 'Contact — Parish of St Mark, Neslanovac, Split',
    metaDescription: 'Address, phone number, parish office hours and map for the Church of St Mark in Neslanovac, Split.',
  },
  it: {
    eyebrow: 'Contatti',
    title: 'Ufficio parrocchiale',
    intro: "La chiesa e l'ufficio parrocchiale si trovano in via Hercegovačka a Neslanovac, nella zona nord-occidentale di Spalato.",
    contact: { parishOfficeName: 'Ufficio parrocchiale di San Marco Evangelista', country: 'Croazia' },
    metaTitle: 'Contatti — Parrocchia di San Marco, Neslanovac, Spalato',
    metaDescription: 'Indirizzo, telefono, orario dell\'ufficio parrocchiale e mappa della chiesa di San Marco a Neslanovac, Spalato.',
  },
  pl: {
    eyebrow: 'Kontakt',
    title: 'Biuro parafialne',
    intro: 'Kościół i biuro parafialne znajdują się przy ulicy Hercegovačkiej w Neslanovacu, w północno-zachodniej części Splitu.',
    contact: { parishOfficeName: 'Biuro parafialne św. Marka Ewangelisty', country: 'Chorwacja' },
    metaTitle: 'Kontakt — Parafia św. Marka, Neslanovac, Split',
    metaDescription: 'Adres, telefon, godziny otwarcia biura parafialnego i mapa kościoła św. Marka w Neslanovacu w Splicie.',
  },
}

/* -------------------------------------------------------- news-categories - */
// Keyed by the seeded collection id (see the fetched hr data).
const newsCategories: Record<number, Record<Locale, { title: string; description: string }>> = {
  3: {
    hr: { title: 'Zajednice', description: 'Vjeronauk, ministranti, zbor i župne zajednice.' },
    en: { title: 'Community groups', description: 'Catechism, altar servers, choir and parish communities.' },
    it: { title: 'Comunità', description: 'Catechismo, ministranti, coro e comunità parrocchiali.' },
    pl: { title: 'Wspólnoty', description: 'Katecheza, ministranci, chór i wspólnoty parafialne.' },
  },
  2: {
    hr: { title: 'Slavlja', description: 'Blagdani, župno slavlje i sakramentna slavlja.' },
    en: { title: 'Celebrations', description: 'Feast days, the parish feast and sacramental celebrations.' },
    it: { title: 'Celebrazioni', description: 'Festività, festa patronale e celebrazioni sacramentali.' },
    pl: { title: 'Uroczystości', description: 'Święta, odpust parafialny i uroczystości sakramentalne.' },
  },
  1: {
    hr: { title: 'Obavijesti', description: 'Promjene u rasporedu i kratke obavijesti župnog ureda.' },
    en: { title: 'Notices', description: 'Schedule changes and brief notices from the parish office.' },
    it: { title: 'Avvisi', description: "Variazioni di orario e brevi avvisi dell'ufficio parrocchiale." },
    pl: { title: 'Ogłoszenia', description: 'Zmiany w harmonogramie i krótkie ogłoszenia biura parafialnego.' },
  },
}

/* ------------------------------------------------------------ useful-links */
const usefulLinks: Record<number, Record<Locale, { title: string; description: string }>> = {
  1: {
    hr: {
      title: 'Splitsko-makarska nadbiskupija',
      description: 'Službene stranice nadbiskupije: vijesti, popis župa i dokumenti.',
    },
    en: {
      title: 'Archdiocese of Split-Makarska',
      description: "The archdiocese's official website: news, a list of parishes and documents.",
    },
    it: {
      title: 'Arcidiocesi di Spalato-Macarsca',
      description: "Il sito ufficiale dell'arcidiocesi: notizie, elenco delle parrocchie e documenti.",
    },
    pl: {
      title: 'Archidiecezja splicko-makarska',
      description: 'Oficjalna strona archidiecezji: aktualności, lista parafii i dokumenty.',
    },
  },
  2: {
    hr: {
      title: 'Hrvatska biskupska konferencija',
      description: 'Dokumenti, poruke biskupa i liturgijski kalendar.',
    },
    en: {
      title: "Croatian Bishops' Conference",
      description: 'Documents, messages from the bishops and the liturgical calendar.',
    },
    it: {
      title: 'Conferenza episcopale croata',
      description: 'Documenti, messaggi dei vescovi e calendario liturgico.',
    },
    pl: {
      title: 'Chorwacka Konferencja Episkopatu',
      description: 'Dokumenty, przesłania biskupów i kalendarz liturgiczny.',
    },
  },
  3: {
    hr: {
      title: 'Informativna katolička agencija (IKA)',
      description: 'Dnevne vijesti iz Crkve u Hrvatskoj.',
    },
    en: {
      title: 'Croatian Catholic Press Agency (IKA)',
      description: 'Daily news from the Church in Croatia.',
    },
    it: {
      title: 'Agenzia cattolica di informazione (IKA)',
      description: 'Notizie quotidiane dalla Chiesa in Croazia.',
    },
    pl: {
      title: 'Chorwacka Katolicka Agencja Informacyjna (IKA)',
      description: 'Codzienne wiadomości z Kościoła w Chorwacji.',
    },
  },
  4: {
    hr: { title: 'Vatican News — hrvatski', description: 'Papine kateheze, poruke i vijesti iz Svete Stolice.' },
    en: { title: 'Vatican News — Croatian', description: "The Pope's catecheses, messages and news from the Holy See." },
    it: { title: 'Vatican News — in croato', description: 'Catechesi, messaggi e notizie dalla Santa Sede.' },
    pl: { title: 'Vatican News — po chorwacku', description: 'Katechezy papieskie, przesłania i wiadomości ze Stolicy Apostolskiej.' },
  },
  5: {
    hr: { title: 'Bitno.net', description: 'Katolički portal: duhovnost, obitelj i kultura.' },
    en: { title: 'Bitno.net', description: 'A Catholic portal: spirituality, family and culture.' },
    it: { title: 'Bitno.net', description: 'Portale cattolico: spiritualità, famiglia e cultura.' },
    pl: { title: 'Bitno.net', description: 'Portal katolicki: duchowość, rodzina i kultura.' },
  },
  6: {
    hr: {
      title: 'Neslanovac — mjesni odbor',
      description: 'Stranica kotara: obavijesti, zapisnici i događanja u naselju.',
    },
    en: {
      title: 'Neslanovac — local council',
      description: "The district's website: notices, minutes and events in the neighbourhood.",
    },
    it: {
      title: 'Neslanovac — consiglio di quartiere',
      description: 'Il sito del quartiere: avvisi, verbali ed eventi locali.',
    },
    pl: {
      title: 'Neslanovac — rada osiedla',
      description: 'Strona osiedla: ogłoszenia, protokoły i wydarzenia lokalne.',
    },
  },
}

/* -------------------------------------------------------------- news ----- */
type NewsTranslation = { title: string; excerpt: string; content: Lexical }

const news: Record<number, Record<Locale, NewsTranslation>> = {
  10: {
    hr: {
      title: 'Hodočašće u Mariju Bistricu — prijave u uredu',
      excerpt:
        'Župa organizira jednodnevno hodočašće u nacionalno svetište Majke Božje Bistričke. Broj mjesta je ograničen, prijave u župnom uredu.',
      content: richText(
        'Župa organizira jednodnevno hodočašće u nacionalno svetište Majke Božje Bistričke u Mariji Bistrici.',
        'Polazak je ispred crkve u ranim jutarnjim satima, a povratak isti dan u večernjim satima. U svetištu je predviđena zajednička sveta misa i vrijeme za osobnu molitvu.',
        'Broj mjesta je ograničen. Prijave i uplate primaju se u župnom uredu u radno vrijeme.',
      ),
    },
    en: {
      title: 'Pilgrimage to Marija Bistrica — sign up at the office',
      excerpt:
        'The parish is organising a one-day pilgrimage to the national shrine of Our Lady of Bistrica. Places are limited — sign up at the parish office.',
      content: richText(
        'The parish is organising a one-day pilgrimage to the national shrine of Our Lady of Bistrica in Marija Bistrica.',
        'Departure is from in front of the church in the early morning, with return the same evening. The shrine visit includes a shared Holy Mass and time for personal prayer.',
        'Places are limited. Sign-ups and payments are taken at the parish office during office hours.',
      ),
    },
    it: {
      title: 'Pellegrinaggio a Marija Bistrica — iscrizioni in ufficio',
      excerpt:
        'La parrocchia organizza un pellegrinaggio di un giorno al santuario nazionale della Madonna di Bistrica. Posti limitati, iscrizioni presso l\'ufficio parrocchiale.',
      content: richText(
        'La parrocchia organizza un pellegrinaggio di un giorno al santuario nazionale della Madonna di Bistrica a Marija Bistrica.',
        'La partenza è davanti alla chiesa nelle prime ore del mattino, con rientro lo stesso giorno in serata. Al santuario è prevista una Santa Messa comunitaria e un momento per la preghiera personale.',
        "I posti sono limitati. Le iscrizioni e i versamenti si ricevono presso l'ufficio parrocchiale durante l'orario di apertura.",
      ),
    },
    pl: {
      title: 'Pielgrzymka do Mariji Bistricy — zapisy w biurze',
      excerpt:
        'Parafia organizuje jednodniową pielgrzymkę do narodowego sanktuarium Matki Bożej Bistrickiej. Liczba miejsc ograniczona, zapisy w biurze parafialnym.',
      content: richText(
        'Parafia organizuje jednodniową pielgrzymkę do narodowego sanktuarium Matki Bożej Bistrickiej w Mariji Bistricy.',
        'Wyjazd sprzed kościoła we wczesnych godzinach porannych, powrót tego samego dnia wieczorem. W sanktuarium przewidziana jest wspólna Msza Święta oraz czas na modlitwę osobistą.',
        'Liczba miejsc jest ograniczona. Zapisy i wpłaty przyjmowane są w biurze parafialnym w godzinach jego otwarcia.',
      ),
    },
  },
  3: {
    hr: {
      title: 'Ljetni raspored svetih misa',
      excerpt: 'Kroz srpanj i kolovoz nedjeljne mise ostaju u 9:00, 11:00 i 20:00, a radnim danom misa je u 19:00.',
      content: richText(
        'Tijekom ljetnih mjeseci nedjeljni raspored ostaje nepromijenjen: svete mise su u 9:00, 11:00 i u 20:00 sati.',
        'Radnim danom sveta misa je u 19:00 sati, a prilika za ispovijed pola sata prije mise.',
        'Radno vrijeme župnog ureda kroz srpanj i kolovoz je radnim danom od 9:00 do 11:00.',
      ),
    },
    en: {
      title: 'Summer Mass schedule',
      excerpt: 'Through July and August, Sunday Masses stay at 9:00, 11:00 and 20:00, and on weekdays Mass is at 19:00.',
      content: richText(
        'During the summer months the Sunday schedule stays unchanged: Holy Mass is at 9:00, 11:00 and 20:00.',
        'On weekdays Holy Mass is at 19:00, with the opportunity for confession half an hour beforehand.',
        'Through July and August the parish office is open on weekdays from 9:00 to 11:00.',
      ),
    },
    it: {
      title: 'Orario estivo delle Sante Messe',
      excerpt: 'Per luglio e agosto le Messe domenicali restano alle 9:00, 11:00 e 20:00, mentre nei giorni feriali la Messa è alle 19:00.',
      content: richText(
        "Durante i mesi estivi l'orario domenicale resta invariato: le Sante Messe sono alle 9:00, 11:00 e alle 20:00.",
        'Nei giorni feriali la Santa Messa è alle 19:00, con la possibilità di confessarsi mezz\'ora prima.',
        "L'orario dell'ufficio parrocchiale per luglio e agosto è nei giorni feriali dalle 9:00 alle 11:00.",
      ),
    },
    pl: {
      title: 'Letni harmonogram Mszy Świętych',
      excerpt: 'Przez lipiec i sierpień niedzielne Msze pozostają o 9:00, 11:00 i 20:00, a w dni powszednie Msza jest o 19:00.',
      content: richText(
        'W miesiącach letnich niedzielny harmonogram pozostaje bez zmian: Msze Święte są o 9:00, 11:00 i o 20:00.',
        'W dni powszednie Msza Święta jest o 19:00, a okazja do spowiedzi pół godziny wcześniej.',
        'Godziny otwarcia biura parafialnego przez lipiec i sierpień to dni powszednie od 9:00 do 11:00.',
      ),
    },
  },
  9: {
    hr: {
      title: 'Sveta potvrda u našoj župi',
      excerpt: 'Krizmanici primaju sakrament svete potvrde na svečanoj misi. Ispovijed za krizmanike i kumove je dan ranije.',
      content: richText(
        'Krizmanici naše župe primaju sakrament svete potvrde na svečanoj svetoj misi u župnoj crkvi.',
        'Ispovijed za krizmanike, kumove i roditelje je dan ranije, prije večernje mise.',
        'Kumovi trebaju donijeti potvrdu o sposobnosti za kumstvo iz svoje župe. Sve ostalo dogovara se u župnom uredu.',
      ),
    },
    en: {
      title: 'Confirmation in our parish',
      excerpt: 'Candidates receive the sacrament of Confirmation at a solemn Mass. Confession for candidates and sponsors is the day before.',
      content: richText(
        'The candidates of our parish receive the sacrament of Confirmation at a solemn Holy Mass in the parish church.',
        'Confession for the candidates, their sponsors and parents is the day before, ahead of the evening Mass.',
        'Sponsors need to bring a certificate of eligibility to sponsor from their own parish. Everything else is arranged at the parish office.',
      ),
    },
    it: {
      title: 'Cresima nella nostra parrocchia',
      excerpt: 'I cresimandi ricevono il sacramento della Cresima durante una Messa solenne. Le confessioni per cresimandi e padrini si tengono il giorno prima.',
      content: richText(
        'I cresimandi della nostra parrocchia ricevono il sacramento della Cresima durante una solenne Santa Messa nella chiesa parrocchiale.',
        'Le confessioni per i cresimandi, i padrini e i genitori si tengono il giorno prima, prima della Messa serale.',
        "I padrini devono portare un certificato di idoneità a fare da padrino/madrina dalla propria parrocchia. Tutto il resto si concorda presso l'ufficio parrocchiale.",
      ),
    },
    pl: {
      title: 'Bierzmowanie w naszej parafii',
      excerpt: 'Kandydaci przyjmują sakrament bierzmowania podczas uroczystej Mszy Świętej. Spowiedź dla kandydatów i świadków odbywa się dzień wcześniej.',
      content: richText(
        'Kandydaci naszej parafii przyjmują sakrament bierzmowania podczas uroczystej Mszy Świętej w kościele parafialnym.',
        'Spowiedź dla kandydatów, świadków bierzmowania i rodziców odbywa się dzień wcześniej, przed Mszą wieczorną.',
        'Świadkowie powinni przynieść zaświadczenie o zdolności do pełnienia funkcji świadka ze swojej parafii. Wszystko inne ustala się w biurze parafialnym.',
      ),
    },
  },
  8: {
    hr: {
      title: 'Prva sveta pričest',
      excerpt: 'Prvopričesnici naše župe pristupaju prvoj svetoj pričesti na nedjeljnoj misi u 11:00, nakon višemjesečne priprave.',
      content: richText(
        'Nakon višemjesečne priprave na župnom vjeronauku, prvopričesnici naše župe pristupaju prvoj svetoj pričesti na nedjeljnoj svetoj misi u 11:00 sati.',
        'Ispovijed za prvopričesnike i njihove roditelje je u subotu prije slavlja, a proba u župnoj crkvi prema dogovoru s vjeroučiteljem.',
        'Molimo župnu zajednicu da djecu i njihove obitelji prati molitvom.',
      ),
    },
    en: {
      title: 'First Holy Communion',
      excerpt: "This year's First Communicants receive their First Holy Communion at the 11:00 Sunday Mass, after months of preparation.",
      content: richText(
        "After months of preparation in parish catechism, this year's First Communicants receive their First Holy Communion at the 11:00 Sunday Mass.",
        'Confession for the First Communicants and their parents is on the Saturday before the celebration, with a rehearsal in the parish church arranged with the catechist.',
        'We ask the parish community to accompany the children and their families with prayer.',
      ),
    },
    it: {
      title: 'Prima Comunione',
      excerpt: 'I comunicandi della nostra parrocchia ricevono la Prima Comunione durante la Messa domenicale delle 11:00, dopo mesi di preparazione.',
      content: richText(
        'Dopo mesi di preparazione al catechismo parrocchiale, i comunicandi della nostra parrocchia ricevono la Prima Comunione durante la Santa Messa domenicale delle 11:00.',
        'Le confessioni per i comunicandi e i loro genitori si tengono il sabato prima della celebrazione, con una prova nella chiesa parrocchiale da concordare con il catechista.',
        'Chiediamo alla comunità parrocchiale di accompagnare con la preghiera i bambini e le loro famiglie.',
      ),
    },
    pl: {
      title: 'Pierwsza Komunia Święta',
      excerpt: 'Tegoroczni komunikanci przystępują do Pierwszej Komunii Świętej podczas niedzielnej Mszy o 11:00, po kilkumiesięcznym przygotowaniu.',
      content: richText(
        'Po kilkumiesięcznym przygotowaniu na parafialnej katechezie, tegoroczni komunikanci przystępują do Pierwszej Komunii Świętej podczas niedzielnej Mszy Świętej o 11:00.',
        'Spowiedź dla komunikantów i ich rodziców odbywa się w sobotę przed uroczystością, a próba w kościele parafialnym według ustaleń z katechetą.',
        'Prosimy wspólnotę parafialną o towarzyszenie dzieciom i ich rodzinom w modlitwie.',
      ),
    },
  },
  1: {
    hr: {
      title: 'Blagdan sv. Marka Evanđelista — župno slavlje',
      excerpt: 'Na blagdan našega nebeskog zaštitnika, 25. travnja, slavimo svetu misu u 19:00, a nakon mise druženje ispred crkve.',
      content: richText(
        'Na blagdan sv. Marka Evanđelista, 25. travnja, župna zajednica slavi svoga nebeskog zaštitnika.',
        'Svečana sveta misa je u 19:00 sati. Pjeva župni zbor, a nakon mise pozivamo sve župljane na druženje ispred crkve.',
        'Devetnica u pripravi za blagdan počinje devet dana ranije, svakodnevno pola sata prije večernje mise.',
      ),
    },
    en: {
      title: 'Feast of St Mark the Evangelist — parish feast',
      excerpt: 'On the feast of our heavenly patron, 25 April, we celebrate Holy Mass at 19:00, followed by a gathering in front of the church.',
      content: richText(
        'On the feast of St Mark the Evangelist, 25 April, the parish community celebrates its heavenly patron.',
        'The solemn Holy Mass is at 19:00. The parish choir sings, and after Mass we invite all parishioners to a gathering in front of the church.',
        'The novena in preparation for the feast begins nine days beforehand, each day half an hour before the evening Mass.',
      ),
    },
    it: {
      title: 'Festa di San Marco Evangelista — festa patronale',
      excerpt: 'Nella festa del nostro patrono celeste, il 25 aprile, celebriamo la Santa Messa alle 19:00, seguita da un momento di incontro davanti alla chiesa.',
      content: richText(
        'Nella festa di San Marco Evangelista, il 25 aprile, la comunità parrocchiale festeggia il proprio patrono celeste.',
        'La solenne Santa Messa è alle 19:00. Canta il coro parrocchiale, e dopo la Messa invitiamo tutti i parrocchiani a un momento di incontro davanti alla chiesa.',
        'La novena di preparazione alla festa inizia nove giorni prima, ogni giorno mezz\'ora prima della Messa serale.',
      ),
    },
    pl: {
      title: 'Święto św. Marka Ewangelisty — odpust parafialny',
      excerpt: 'W święto naszego patrona, 25 kwietnia, celebrujemy Mszę Świętą o 19:00, a po Mszy spotkanie przed kościołem.',
      content: richText(
        'W święto św. Marka Ewangelisty, 25 kwietnia, wspólnota parafialna świętuje swojego patrona.',
        'Uroczysta Msza Święta jest o 19:00. Śpiewa chór parafialny, a po Mszy zapraszamy wszystkich parafian na spotkanie przed kościołem.',
        'Nowenna przygotowująca do święta rozpoczyna się dziewięć dni wcześniej, codziennie pół godziny przed Mszą wieczorną.',
      ),
    },
  },
  7: {
    hr: {
      title: 'Uskrsno trodnevlje — raspored obreda',
      excerpt: 'Raspored obreda Velikoga četvrtka, Velikoga petka i Vazmenoga bdijenja objavljen je na oglasnoj ploči i u župnim obavijestima.',
      content: richText(
        'Uskrsno trodnevlje vrhunac je liturgijske godine. Raspored obreda za Veliki četvrtak, Veliki petak i Vazmeno bdijenje objavljen je na oglasnoj ploči uz crkvu.',
        'Na Veliki petak nema svete mise; toga je dana strogi post i nemrs.',
        'Prilika za ispovijed pred Uskrs bit će produžena, a termini se najavljuju nedjeljom na misama.',
      ),
    },
    en: {
      title: 'The Easter Triduum — schedule of services',
      excerpt: 'The schedule of services for Holy Thursday, Good Friday and the Easter Vigil is posted on the noticeboard and in the parish notices.',
      content: richText(
        'The Easter Triduum is the high point of the liturgical year. The schedule of services for Holy Thursday, Good Friday and the Easter Vigil is posted on the noticeboard by the church.',
        'There is no Holy Mass on Good Friday; it is a day of strict fasting and abstinence.',
        'Confession times before Easter will be extended, with times announced at the Sunday Masses.',
      ),
    },
    it: {
      title: 'Triduo pasquale — orario delle celebrazioni',
      excerpt: 'L\'orario delle celebrazioni del Giovedì Santo, del Venerdì Santo e della Veglia pasquale è pubblicato in bacheca e negli avvisi parrocchiali.',
      content: richText(
        "Il Triduo pasquale è il culmine dell'anno liturgico. L'orario delle celebrazioni per il Giovedì Santo, il Venerdì Santo e la Veglia pasquale è pubblicato in bacheca accanto alla chiesa.",
        'Il Venerdì Santo non si celebra la Santa Messa; è giorno di digiuno e astinenza rigorosi.',
        'Le occasioni per confessarsi prima di Pasqua saranno prolungate, con gli orari annunciati alle Messe domenicali.',
      ),
    },
    pl: {
      title: 'Triduum Paschalne — harmonogram nabożeństw',
      excerpt: 'Harmonogram nabożeństw Wielkiego Czwartku, Wielkiego Piątku i Wigilii Paschalnej jest ogłoszony na tablicy i w ogłoszeniach parafialnych.',
      content: richText(
        'Triduum Paschalne jest szczytem roku liturgicznego. Harmonogram nabożeństw na Wielki Czwartek, Wielki Piątek i Wigilię Paschalną jest ogłoszony na tablicy przy kościele.',
        'W Wielki Piątek nie ma Mszy Świętej; obowiązuje wtedy ścisły post i wstrzemięźliwość od pokarmów mięsnych.',
        'Okazja do spowiedzi przed Wielkanocą zostanie wydłużona, terminy będą ogłaszane na niedzielnych Mszach.',
      ),
    },
  },
  2: {
    hr: {
      title: 'Vjeronauk i susreti ministranata kroz tjedan',
      excerpt: 'Župni vjeronauk za prvopričesnike i krizmanike te susreti ministranata održavaju se u župnoj dvorani.',
      content: richText(
        'Župni vjeronauk za prvopričesnike i krizmanike održava se tijekom tjedna u župnoj dvorani uz crkvu. Rasporedi po skupinama objavljeni su na oglasnoj ploči.',
        'Susreti ministranata su subotom prije večernje mise. Pozivamo dječake i djevojčice koji žele služiti kod oltara da se jave župniku.',
      ),
    },
    en: {
      title: 'Catechism and altar-server meetings during the week',
      excerpt: 'Parish catechism for First Communicants and Confirmation candidates, along with altar-server meetings, is held in the parish hall.',
      content: richText(
        'Parish catechism for First Communicants and Confirmation candidates is held during the week in the parish hall by the church. Group schedules are posted on the noticeboard.',
        'Altar-server meetings are on Saturdays before the evening Mass. We invite boys and girls who would like to serve at the altar to contact the parish priest.',
      ),
    },
    it: {
      title: 'Catechismo e incontri dei ministranti durante la settimana',
      excerpt: 'Il catechismo parrocchiale per comunicandi e cresimandi, insieme agli incontri dei ministranti, si svolge nella sala parrocchiale.',
      content: richText(
        'Il catechismo parrocchiale per comunicandi e cresimandi si svolge durante la settimana nella sala parrocchiale accanto alla chiesa. Gli orari per gruppo sono pubblicati in bacheca.',
        'Gli incontri dei ministranti si tengono il sabato prima della Messa serale. Invitiamo i ragazzi e le ragazze che desiderano servire all\'altare a rivolgersi al parroco.',
      ),
    },
    pl: {
      title: 'Katecheza i spotkania ministrantów w tygodniu',
      excerpt: 'Katecheza parafialna dla komunikantów i kandydatów do bierzmowania oraz spotkania ministrantów odbywają się w sali parafialnej.',
      content: richText(
        'Katecheza parafialna dla komunikantów i kandydatów do bierzmowania odbywa się w tygodniu w sali parafialnej przy kościele. Harmonogramy grup są ogłoszone na tablicy.',
        'Spotkania ministrantów odbywają się w soboty przed Mszą wieczorną. Zapraszamy chłopców i dziewczęta, którzy chcieliby służyć przy ołtarzu, aby zgłosili się do proboszcza.',
      ),
    },
  },
  6: {
    hr: {
      title: 'Korizma: križni put petkom prije mise',
      excerpt: 'Kroz korizmu pobožnost križnoga puta molimo petkom u 18:30, neposredno prije večernje svete mise.',
      content: richText(
        'Čistom srijedom započinje korizmeno vrijeme. Kroz cijelu korizmu pobožnost križnoga puta molimo petkom u 18:30 sati, neposredno prije večernje svete mise.',
        'Pojedine postaje predvode župne zajednice — ministranti, zbor i vjeroučenici.',
        'Prilika za ispovijed je kao i inače, pola sata prije svake večernje mise.',
      ),
    },
    en: {
      title: 'Lent: the Way of the Cross on Fridays before Mass',
      excerpt: 'Throughout Lent, the Way of the Cross is prayed on Fridays at 18:30, just before the evening Holy Mass.',
      content: richText(
        'Lent begins on Ash Wednesday. Throughout Lent, the Way of the Cross is prayed on Fridays at 18:30, just before the evening Holy Mass.',
        'Individual stations are led by parish groups — altar servers, the choir and catechism students.',
        'The opportunity for confession is as usual, half an hour before every evening Mass.',
      ),
    },
    it: {
      title: 'Quaresima: Via Crucis il venerdì prima della Messa',
      excerpt: 'Per tutta la Quaresima la Via Crucis si prega il venerdì alle 18:30, subito prima della Santa Messa serale.',
      content: richText(
        'Il Mercoledì delle Ceneri dà inizio al tempo di Quaresima. Per tutta la Quaresima la Via Crucis si prega il venerdì alle 18:30, subito prima della Santa Messa serale.',
        'Le singole stazioni sono guidate dalle comunità parrocchiali — ministranti, coro e catechisti.',
        'La possibilità di confessarsi è come di consueto, mezz\'ora prima di ogni Messa serale.',
      ),
    },
    pl: {
      title: 'Wielki Post: droga krzyżowa w piątki przed Mszą',
      excerpt: 'Przez cały Wielki Post droga krzyżowa odprawiana jest w piątki o 18:30, tuż przed wieczorną Mszą Świętą.',
      content: richText(
        'Środa Popielcowa rozpoczyna okres Wielkiego Postu. Przez cały Wielki Post droga krzyżowa odprawiana jest w piątki o 18:30, tuż przed wieczorną Mszą Świętą.',
        'Poszczególne stacje prowadzą wspólnoty parafialne — ministranci, chór i uczniowie katechezy.',
        'Okazja do spowiedzi jest jak zwykle, pół godziny przed każdą Mszą wieczorną.',
      ),
    },
  },
  5: {
    hr: {
      title: 'Župni zbor poziva nove pjevače',
      excerpt: 'Probe su četvrtkom nakon večernje mise u župnoj dvorani. Dobrodošli su svi koji rado pjevaju, bez obzira na glazbeno predznanje.',
      content: richText(
        'Župni zbor poziva nove članove. Probe se održavaju četvrtkom nakon večernje svete mise u župnoj dvorani uz crkvu.',
        'Nije potrebno glazbeno predznanje ni poznavanje nota — dovoljna je volja i redovitost dolaska. Zbor pjeva na nedjeljnoj misi u 11:00 te na većim blagdanima.',
        'Zainteresirani se mogu javiti voditelju zbora nakon mise ili u župnom uredu.',
      ),
    },
    en: {
      title: 'The parish choir is looking for new singers',
      excerpt: 'Rehearsals are on Thursdays after the evening Mass in the parish hall. Everyone who enjoys singing is welcome, regardless of musical background.',
      content: richText(
        'The parish choir is inviting new members. Rehearsals are held on Thursdays after the evening Holy Mass in the parish hall by the church.',
        'No musical background or ability to read music is required — willingness and regular attendance are enough. The choir sings at the 11:00 Sunday Mass and on major feast days.',
        'Anyone interested can speak to the choir director after Mass or contact the parish office.',
      ),
    },
    it: {
      title: 'Il coro parrocchiale cerca nuovi cantori',
      excerpt: 'Le prove si tengono il giovedì dopo la Messa serale nella sala parrocchiale. Benvenuti tutti coloro a cui piace cantare, indipendentemente dalla preparazione musicale.',
      content: richText(
        'Il coro parrocchiale invita nuovi membri. Le prove si tengono il giovedì dopo la Santa Messa serale nella sala parrocchiale accanto alla chiesa.',
        "Non è richiesta alcuna preparazione musicale né la conoscenza del solfeggio — basta la buona volontà e la regolarità nella presenza. Il coro canta alla Messa domenicale delle 11:00 e nelle festività maggiori.",
        "Gli interessati possono rivolgersi al direttore del coro dopo la Messa oppure all'ufficio parrocchiale.",
      ),
    },
    pl: {
      title: 'Chór parafialny zaprasza nowych śpiewaków',
      excerpt: 'Próby odbywają się w czwartki po Mszy wieczornej w sali parafialnej. Zapraszamy wszystkich, którzy lubią śpiewać, niezależnie od przygotowania muzycznego.',
      content: richText(
        'Chór parafialny zaprasza nowych członków. Próby odbywają się w czwartki po wieczornej Mszy Świętej w sali parafialnej przy kościele.',
        'Nie jest wymagane przygotowanie muzyczne ani znajomość nut — wystarczy chęć i regularna obecność. Chór śpiewa na niedzielnej Mszy o 11:00 oraz w większe święta.',
        'Zainteresowani mogą zgłosić się do dyrygenta chóru po Mszy lub do biura parafialnego.',
      ),
    },
  },
  4: {
    hr: {
      title: 'Blagoslov obitelji i domova',
      excerpt: 'Kroz siječanj svećenik obilazi domove župljana. Raspored po ulicama objavljen je na oglasnoj ploči i najavljuje se nedjeljom na misama.',
      content: richText(
        'U vremenu po Bogojavljenju započinje blagoslov obitelji i domova. Svećenik obilazi domove župljana po ulicama, a raspored se objavljuje na oglasnoj ploči uz crkvu.',
        'Obitelji koje toga dana nisu kod kuće mogu se javiti u župni ured i dogovoriti drugi termin.',
      ),
    },
    en: {
      title: 'Blessing of families and homes',
      excerpt: "Through January the priest visits parishioners' homes. The street-by-street schedule is posted on the noticeboard and announced at the Sunday Masses.",
      content: richText(
        "In the period after Epiphany, the blessing of families and homes begins. The priest visits parishioners' homes street by street, with the schedule posted on the noticeboard by the church.",
        "Families who won't be home that day can contact the parish office to arrange another time.",
      ),
    },
    it: {
      title: 'Benedizione delle famiglie e delle case',
      excerpt: 'Durante gennaio il sacerdote visita le case dei parrocchiani. Il calendario per via è pubblicato in bacheca e annunciato alle Messe domenicali.',
      content: richText(
        "Nel periodo dopo l'Epifania inizia la benedizione delle famiglie e delle case. Il sacerdote visita le case dei parrocchiani via per via, con il calendario pubblicato in bacheca accanto alla chiesa.",
        "Le famiglie che quel giorno non sono in casa possono rivolgersi all'ufficio parrocchiale per concordare un altro momento.",
      ),
    },
    pl: {
      title: 'Błogosławieństwo rodzin i domów',
      excerpt: 'Przez styczeń ksiądz odwiedza domy parafian. Harmonogram według ulic jest ogłoszony na tablicy i zapowiadany na niedzielnych Mszach.',
      content: richText(
        'W okresie po Objawieniu Pańskim rozpoczyna się błogosławieństwo rodzin i domów. Ksiądz odwiedza domy parafian ulica po ulicy, a harmonogram jest ogłoszony na tablicy przy kościele.',
        'Rodziny, których danego dnia nie będzie w domu, mogą zgłosić się do biura parafialnego, aby ustalić inny termin.',
      ),
    },
  },
}

/* -------------------------------------------------------- media-images --- */
const mediaImages: Record<number, Record<Locale, string>> = {
  1: {
    hr: 'unutrasnjost crkve',
    en: 'Interior of the church',
    it: 'Interno della chiesa',
    pl: 'Wnętrze kościoła',
  },
  2: { hr: 'logo', en: 'Logo', it: 'Logo', pl: 'Logo' },
  3: {
    hr: 'Hodočašće u Mariju Bistricu — prijave u uredu',
    en: 'Pilgrimage to Marija Bistrica — sign up at the office',
    it: 'Pellegrinaggio a Marija Bistrica — iscrizioni in ufficio',
    pl: 'Pielgrzymka do Mariji Bistricy — zapisy w biurze',
  },
  4: {
    hr: 'Ljetni raspored svetih misa',
    en: 'Summer Mass schedule',
    it: 'Orario estivo delle Sante Messe',
    pl: 'Letni harmonogram Mszy Świętych',
  },
  5: {
    hr: 'Sveta potvrda u našoj župi',
    en: 'Confirmation in our parish',
    it: 'Cresima nella nostra parrocchia',
    pl: 'Bierzmowanie w naszej parafii',
  },
  6: {
    hr: 'Prva sveta pričest',
    en: 'First Holy Communion',
    it: 'Prima Comunione',
    pl: 'Pierwsza Komunia Święta',
  },
  7: {
    hr: 'Blagdan sv. Marka Evanđelista — župno slavlje',
    en: 'Feast of St Mark the Evangelist — parish feast',
    it: 'Festa di San Marco Evangelista — festa patronale',
    pl: 'Święto św. Marka Ewangelisty — odpust parafialny',
  },
  8: {
    hr: 'Uskrsno trodnevlje — raspored obreda',
    en: 'The Easter Triduum — schedule of services',
    it: 'Triduo pasquale — orario delle celebrazioni',
    pl: 'Triduum Paschalne — harmonogram nabożeństw',
  },
  9: {
    hr: 'Vjeronauk i susreti ministranata kroz tjedan',
    en: 'Catechism and altar-server meetings during the week',
    it: 'Catechismo e incontri dei ministranti durante la settimana',
    pl: 'Katecheza i spotkania ministrantów w tygodniu',
  },
  10: {
    hr: 'Korizma: križni put petkom prije mise',
    en: 'Lent: the Way of the Cross on Fridays before Mass',
    it: 'Quaresima: Via Crucis il venerdì prima della Messa',
    pl: 'Wielki Post: droga krzyżowa w piątki przed Mszą',
  },
  11: {
    hr: 'Župni zbor poziva nove pjevače',
    en: 'The parish choir is looking for new singers',
    it: 'Il coro parrocchiale cerca nuovi cantori',
    pl: 'Chór parafialny zaprasza nowych śpiewaków',
  },
  12: {
    hr: 'Blagoslov obitelji i domova',
    en: 'Blessing of families and homes',
    it: 'Benedizione delle famiglie e delle case',
    pl: 'Błogosławieństwo rodzin i domów',
  },
}

/* ------------------------------------------------------- stable row ids -- */

/**
 * Payload replaces (not merges) an array field's rows on every write. This
 * script writes each array once per locale in separate calls — without a
 * stable `id` on every row, each locale's write would look like a brand
 * new array to Payload, deleting the previous locale's rows (and the
 * `day`/`note`/`title`/`text` translations already saved on them) rather
 * than updating them in place. Assigning identical, position-based ids
 * across all four locale variants before anything is written makes every
 * later write an update of the same rows instead of a replacement.
 */
type ArraySpec = { field: string; children?: ArraySpec[] }

function assignStableIds(
  byLocale: Record<Locale, Record<string, unknown>>,
  root: (doc: Record<string, unknown>) => Record<string, unknown> | undefined,
  specs: ArraySpec[],
) {
  const walk = (nodesByLocale: (Record<string, unknown> | undefined)[], levels: ArraySpec[], prefix: string) => {
    for (const spec of levels) {
      const arrays = nodesByLocale.map((n) => n?.[spec.field]).map((a) => (Array.isArray(a) ? a : []));
      const maxLen = Math.max(0, ...arrays.map((a) => a.length));
      for (let i = 0; i < maxLen; i++) {
        const id = `${prefix}${spec.field}-${i}`;
        const rows = arrays.map((a) => a[i]).filter((row): row is Record<string, unknown> => Boolean(row));
        for (const row of rows) row.id = id;
        if (spec.children) walk(rows, spec.children, `${id}-`);
      }
    }
  };

  walk(
    LOCALES.map((locale) => root(byLocale[locale])),
    specs,
    '',
  );
}

assignStableIds(settings, (d) => d, [
  { field: 'navigation' },
  { field: 'footerColumns', children: [{ field: 'links' }] },
]);

assignStableIds(schedule, (d) => d, [
  { field: 'masses' },
  { field: 'confessions' },
  { field: 'devotions' },
  { field: 'specialSchedule', children: [{ field: 'entries' }] },
  { field: 'officeHours' },
  { field: 'officeNotes' },
]);

assignStableIds(
  homePage,
  (d) => d.officeSection as Record<string, unknown> | undefined,
  [{ field: 'cards' }],
);

/* ------------------------------------------------------------------ run -- */

const run = async () => {
  const payload = await getPayload({ config })

  for (const locale of LOCALES) {
    console.log(`\n=== ${locale} ===`)

    await payload.updateGlobal({ slug: 'settings', locale, data: settings[locale] as never })
    await payload.updateGlobal({ slug: 'schedule', locale, data: schedule[locale] as never })
    await payload.updateGlobal({ slug: 'home-page', locale, data: homePage[locale] as never })
    await payload.updateGlobal({ slug: 'news-page', locale, data: newsPage[locale] as never })
    await payload.updateGlobal({ slug: 'about-page', locale, data: aboutPage[locale] as never })
    await payload.updateGlobal({ slug: 'contact-page', locale, data: contactPage[locale] as never })
    console.log('  globals done')

    for (const [id, byLocale] of Object.entries(newsCategories)) {
      await payload.update({
        collection: 'news-categories',
        id: Number(id),
        locale,
        data: byLocale[locale],
      })
    }
    console.log('  news-categories done')

    for (const [id, byLocale] of Object.entries(usefulLinks)) {
      await payload.update({ collection: 'useful-links', id: Number(id), locale, data: byLocale[locale] })
    }
    console.log('  useful-links done')

    for (const [id, byLocale] of Object.entries(news)) {
      await payload.update({
        collection: 'news',
        id: Number(id),
        locale,
        data: byLocale[locale] as never,
        // Translating a published article's localized fields shouldn't spawn
        // a new draft version sitting on top of it.
        draft: false,
      })
    }
    console.log('  news done')

    for (const [id, byLocale] of Object.entries(mediaImages)) {
      await payload.update({
        collection: 'media-images',
        id: Number(id),
        locale,
        data: { alt: byLocale[locale] },
      })
    }
    console.log('  media-images done')
  }

  console.log('\nDone.')
  process.exit(0)
}

// `payload run` awaits a script's own top-level await — a fire-and-forget
// `run().catch(...)` promise chain lets the CLI's dynamic import resolve
// immediately and exit before any of this ever runs.
await run()
