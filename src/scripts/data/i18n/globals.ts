/**
 * Localized copy for every global, in all four site locales.
 *
 * Facts (address, phone, Sunday and weekday Mass times, history) come from the
 * archdiocese's parish page and IKA reports. Confession and devotion times,
 * office hours, the Advent/Christmas block and the office cards are
 * placeholders in the same style — the office should check and correct them
 * in the admin.
 *
 * Non-localized fields (images, hrefs, checkboxes) are included in every
 * locale too, so whichever locale is written last leaves them identical.
 */
import { richDocument, richText } from '../rich-text'

export type Locale = 'hr' | 'en' | 'it' | 'pl'
export const LOCALES: Locale[] = ['hr', 'en', 'it', 'pl']

export type ImageIds = Record<
  | 'procesija'
  | 'freske2025'
  | 'homilija2025'
  | 'misa2025'
  | 'misa2019'
  | 'freske2019'
  | 'oltar2019'
  | 'krstenje2019',
  number
>

type Doc = Record<string, unknown>

/* ------------------------------------------------------------ settings --- */

export const settings: Record<Locale, Doc> = {
  hr: {
    siteName: 'Župa sv. Marka Evanđelista',
    shortName: 'Sv. Marko',
    tagline: 'Neslanovac, Split',
    diocese: 'Splitsko-makarska nadbiskupija',
    navigation: [
      { label: 'Naslovnica', href: '/' },
      { label: 'Raspored', href: '/raspored/' },
      { label: 'Vijesti', href: '/vijesti/' },
      { label: 'O nama', href: '/o-nama/' },
      { label: 'Kontakt', href: '/kontakt/' },
    ],
    headerCta: { label: 'Raspored misa', href: '/#raspored' },
    footerIntro:
      'Župa sv. Marka Evanđelista na splitskom Neslanovcu, osnovana 1994. Hercegovačka 157, Split.',
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
          { label: 'Svete mise', href: '/raspored/#liturgija' },
          { label: 'Vjeronauk', href: '/raspored/#vjeronauk' },
          { label: 'Župni ured', href: '/kontakt/' },
        ],
      },
    ],
    copyright: 'Župa sv. Marka Evanđelista, Split — Neslanovac',
    social: [],
  },
  en: {
    siteName: 'Parish of St Mark the Evangelist',
    shortName: 'St Mark',
    tagline: 'Neslanovac, Split',
    diocese: 'Archdiocese of Split-Makarska',
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Schedule', href: '/raspored/' },
      { label: 'News', href: '/vijesti/' },
      { label: 'About', href: '/o-nama/' },
      { label: 'Contact', href: '/kontakt/' },
    ],
    headerCta: { label: 'Mass times', href: '/#raspored' },
    footerIntro:
      'The Parish of St Mark the Evangelist in Neslanovac, Split, founded in 1994. Hercegovačka 157, Split.',
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
          { label: 'Holy Mass', href: '/raspored/#liturgija' },
          { label: 'Catechesis', href: '/raspored/#vjeronauk' },
          { label: 'Parish office', href: '/kontakt/' },
        ],
      },
    ],
    copyright: 'Parish of St Mark the Evangelist, Split — Neslanovac',
    social: [],
  },
  it: {
    siteName: 'Parrocchia di San Marco Evangelista',
    shortName: 'San Marco',
    tagline: 'Neslanovac, Spalato',
    diocese: 'Arcidiocesi di Spalato-Macarsca',
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Orari', href: '/raspored/' },
      { label: 'Notizie', href: '/vijesti/' },
      { label: 'Chi siamo', href: '/o-nama/' },
      { label: 'Contatti', href: '/kontakt/' },
    ],
    headerCta: { label: 'Orari delle Messe', href: '/#raspored' },
    footerIntro:
      'La Parrocchia di San Marco Evangelista a Neslanovac, Spalato, fondata nel 1994. Hercegovačka 157, Spalato.',
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
          { label: 'Sante Messe', href: '/raspored/#liturgija' },
          { label: 'Catechesi', href: '/raspored/#vjeronauk' },
          { label: 'Ufficio parrocchiale', href: '/kontakt/' },
        ],
      },
    ],
    copyright: 'Parrocchia di San Marco Evangelista, Spalato — Neslanovac',
    social: [],
  },
  pl: {
    siteName: 'Parafia św. Marka Ewangelisty',
    shortName: 'Św. Marek',
    tagline: 'Neslanovac, Split',
    diocese: 'Archidiecezja splicko-makarska',
    navigation: [
      { label: 'Strona główna', href: '/' },
      { label: 'Harmonogram', href: '/raspored/' },
      { label: 'Aktualności', href: '/vijesti/' },
      { label: 'O nas', href: '/o-nama/' },
      { label: 'Kontakt', href: '/kontakt/' },
    ],
    headerCta: { label: 'Porządek Mszy', href: '/#raspored' },
    footerIntro:
      'Parafia św. Marka Ewangelisty w Neslanovcu w Splicie, założona w 1994 roku. Hercegovačka 157, Split.',
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
        title: 'Porządek',
        links: [
          { label: 'Msze święte', href: '/raspored/#liturgija' },
          { label: 'Katecheza', href: '/raspored/#vjeronauk' },
          { label: 'Kancelaria parafialna', href: '/kontakt/' },
        ],
      },
    ],
    copyright: 'Parafia św. Marka Ewangelisty, Split — Neslanovac',
    social: [],
  },
}

/* ------------------------------------------------------------ schedule --- */

export const schedule: Record<Locale, Doc> = {
  hr: {
    masses: [
      { day: 'Nedjeljom i blagdanom', times: '9:00, 11:00 i 20:00', note: 'Misa u 11:00 je pjevana', highlight: true },
      { day: 'Radnim danom', times: '19:00', note: 'Od ponedjeljka do subote', highlight: true },
    ],
    massesNote:
      'Na blagdane i u posebnim prigodama raspored se može promijeniti — promjene se najavljuju na misama i u župnim vijestima.',
    confessions: [
      { day: 'Radnim danom', times: '18:30 – 19:00', note: 'Pola sata prije svete mise', highlight: true },
      { day: 'Nedjeljom', times: 'Prije svake mise', note: '', highlight: true },
      { day: 'Prvi petak u mjesecu', times: '17:30 – 19:00', note: '', highlight: true },
    ],
    confessionsNote:
      'Za ispovijed izvan navedenih termina slobodno se javite svećeniku prije ili poslije svete mise.',
    devotions: [
      { title: 'Krunica', day: 'Svakoga dana', times: '18:30', note: 'Prije večernje mise' },
      { title: 'Klanjanje pred Presvetim', day: 'Četvrtkom', times: '19:30 – 20:30', note: 'Nakon večernje mise' },
      { title: 'Pobožnost prvih petaka', day: 'Prvi petak u mjesecu', times: '19:00', note: 'Prije podne pohod bolesnicima' },
    ],
    specialSchedule: [
      {
        title: 'Došašće i Božić 2026.',
        active: true,
        entries: [
          { day: 'Zornice, radnim danom od 30. studenoga', times: '6:30', note: 'Uz večernju misu u 19:00' },
          { day: 'Badnjak, 24. prosinca', times: '24:00', note: 'Polnoćka' },
          { day: 'Božić, 25. prosinca', times: '9:00, 11:00 i 20:00', note: '' },
          { day: 'Sv. Stjepan, 26. prosinca', times: '9:00 i 19:00', note: '' },
        ],
      },
    ],
    officeHours: [
      { day: 'Ponedjeljak – petak', hours: '9:00 – 11:00', note: '' },
      { day: 'Utorak i četvrtak', hours: '17:30 – 18:30', note: 'Popodnevni termin' },
      { day: 'Subota i nedjelja', hours: 'Zatvoreno', note: 'Osim hitnih slučajeva' },
    ],
    officeNotes: [
      {
        title: 'Krštenje',
        text: 'Krštenje djeteta najavite barem mjesec dana ranije. Ponesite rodni list djeteta i podatke o kumovima.',
      },
      {
        title: 'Vjenčanje',
        text: 'Zaručnici se javljaju najmanje tri mjeseca prije vjenčanja radi zaručničkog tečaja i potrebnih dokumenata.',
      },
      {
        title: 'Bolesnici i sprovodi',
        text: 'Za pohod bolesniku, bolesničko pomazanje ili sprovod nazovite župni ured na (021) 367-422 u bilo koje doba.',
      },
    ],
  },
  en: {
    masses: [
      { day: 'Sundays and holy days', times: '9:00, 11:00 and 20:00', note: 'The 11:00 Mass is sung', highlight: true },
      { day: 'Weekdays', times: '19:00', note: 'Monday to Saturday', highlight: true },
    ],
    massesNote:
      'On feast days and special occasions the schedule may change — changes are announced at Mass and in the parish news.',
    confessions: [
      { day: 'Weekdays', times: '18:30 – 19:00', note: 'Half an hour before Mass', highlight: true },
      { day: 'Sundays', times: 'Before every Mass', note: '', highlight: true },
      { day: 'First Friday of the month', times: '17:30 – 19:00', note: '', highlight: true },
    ],
    confessionsNote:
      'For confession at other times, feel free to speak to a priest before or after Mass.',
    devotions: [
      { title: 'Rosary', day: 'Every day', times: '18:30', note: 'Before the evening Mass' },
      { title: 'Eucharistic adoration', day: 'Thursdays', times: '19:30 – 20:30', note: 'After the evening Mass' },
      { title: 'First Friday devotion', day: 'First Friday of the month', times: '19:00', note: 'Visits to the sick in the morning' },
    ],
    specialSchedule: [
      {
        title: 'Advent and Christmas 2026',
        active: true,
        entries: [
          { day: 'Dawn Masses, weekdays from 30 November', times: '6:30', note: 'In addition to the 19:00 evening Mass' },
          { day: 'Christmas Eve, 24 December', times: '24:00', note: 'Midnight Mass' },
          { day: 'Christmas Day, 25 December', times: '9:00, 11:00 and 20:00', note: '' },
          { day: 'St Stephen, 26 December', times: '9:00 and 19:00', note: '' },
        ],
      },
    ],
    officeHours: [
      { day: 'Monday – Friday', hours: '9:00 – 11:00', note: '' },
      { day: 'Tuesday and Thursday', hours: '17:30 – 18:30', note: 'Afternoon hours' },
      { day: 'Saturday and Sunday', hours: 'Closed', note: 'Except emergencies' },
    ],
    officeNotes: [
      {
        title: 'Baptism',
        text: 'Please arrange a baptism at least a month in advance. Bring the child’s birth certificate and the godparents’ details.',
      },
      {
        title: 'Marriage',
        text: 'Engaged couples should contact the office at least three months before the wedding for the marriage preparation course and documents.',
      },
      {
        title: 'The sick and funerals',
        text: 'For a visit to the sick, anointing of the sick or a funeral, call the parish office on (021) 367-422 at any time.',
      },
    ],
  },
  it: {
    masses: [
      { day: 'Domenica e festivi', times: '9:00, 11:00 e 20:00', note: 'La Messa delle 11:00 è cantata', highlight: true },
      { day: 'Giorni feriali', times: '19:00', note: 'Dal lunedì al sabato', highlight: true },
    ],
    massesNote:
      'Nelle feste e in occasioni particolari l’orario può cambiare — le variazioni vengono annunciate durante la Messa e nelle notizie parrocchiali.',
    confessions: [
      { day: 'Giorni feriali', times: '18:30 – 19:00', note: 'Mezz’ora prima della Messa', highlight: true },
      { day: 'Domenica', times: 'Prima di ogni Messa', note: '', highlight: true },
      { day: 'Primo venerdì del mese', times: '17:30 – 19:00', note: '', highlight: true },
    ],
    confessionsNote:
      'Per confessarsi in altri orari, rivolgetevi pure a un sacerdote prima o dopo la Messa.',
    devotions: [
      { title: 'Rosario', day: 'Ogni giorno', times: '18:30', note: 'Prima della Messa vespertina' },
      { title: 'Adorazione eucaristica', day: 'Giovedì', times: '19:30 – 20:30', note: 'Dopo la Messa vespertina' },
      { title: 'Devozione dei primi venerdì', day: 'Primo venerdì del mese', times: '19:00', note: 'Visita ai malati in mattinata' },
    ],
    specialSchedule: [
      {
        title: 'Avvento e Natale 2026',
        active: true,
        entries: [
          { day: 'Messe dell’aurora, feriali dal 30 novembre', times: '6:30', note: 'Oltre alla Messa vespertina delle 19:00' },
          { day: 'Vigilia di Natale, 24 dicembre', times: '24:00', note: 'Messa di mezzanotte' },
          { day: 'Natale, 25 dicembre', times: '9:00, 11:00 e 20:00', note: '' },
          { day: 'Santo Stefano, 26 dicembre', times: '9:00 e 19:00', note: '' },
        ],
      },
    ],
    officeHours: [
      { day: 'Lunedì – venerdì', hours: '9:00 – 11:00', note: '' },
      { day: 'Martedì e giovedì', hours: '17:30 – 18:30', note: 'Orario pomeridiano' },
      { day: 'Sabato e domenica', hours: 'Chiuso', note: 'Salvo urgenze' },
    ],
    officeNotes: [
      {
        title: 'Battesimo',
        text: 'Il battesimo va prenotato almeno un mese prima. Portate il certificato di nascita del bambino e i dati dei padrini.',
      },
      {
        title: 'Matrimonio',
        text: 'I fidanzati si presentano almeno tre mesi prima delle nozze per il corso di preparazione e i documenti necessari.',
      },
      {
        title: 'Malati e funerali',
        text: 'Per una visita a un malato, l’unzione degli infermi o un funerale chiamate l’ufficio parrocchiale al (021) 367-422 a qualsiasi ora.',
      },
    ],
  },
  pl: {
    masses: [
      { day: 'Niedziele i święta', times: '9:00, 11:00 i 20:00', note: 'Msza o 11:00 jest śpiewana', highlight: true },
      { day: 'Dni powszednie', times: '19:00', note: 'Od poniedziałku do soboty', highlight: true },
    ],
    massesNote:
      'W święta i przy szczególnych okazjach porządek może się zmienić — zmiany ogłaszane są na Mszach i w aktualnościach parafii.',
    confessions: [
      { day: 'Dni powszednie', times: '18:30 – 19:00', note: 'Pół godziny przed Mszą', highlight: true },
      { day: 'Niedziele', times: 'Przed każdą Mszą', note: '', highlight: true },
      { day: 'Pierwszy piątek miesiąca', times: '17:30 – 19:00', note: '', highlight: true },
    ],
    confessionsNote:
      'Aby wyspowiadać się w innym terminie, zwróć się do kapłana przed Mszą lub po niej.',
    devotions: [
      { title: 'Różaniec', day: 'Codziennie', times: '18:30', note: 'Przed wieczorną Mszą' },
      { title: 'Adoracja Najświętszego Sakramentu', day: 'Czwartki', times: '19:30 – 20:30', note: 'Po wieczornej Mszy' },
      { title: 'Nabożeństwo pierwszych piątków', day: 'Pierwszy piątek miesiąca', times: '19:00', note: 'Rano odwiedziny chorych' },
    ],
    specialSchedule: [
      {
        title: 'Adwent i Boże Narodzenie 2026',
        active: true,
        entries: [
          { day: 'Roraty, w dni powszednie od 30 listopada', times: '6:30', note: 'Oprócz wieczornej Mszy o 19:00' },
          { day: 'Wigilia, 24 grudnia', times: '24:00', note: 'Pasterka' },
          { day: 'Boże Narodzenie, 25 grudnia', times: '9:00, 11:00 i 20:00', note: '' },
          { day: 'Św. Szczepana, 26 grudnia', times: '9:00 i 19:00', note: '' },
        ],
      },
    ],
    officeHours: [
      { day: 'Poniedziałek – piątek', hours: '9:00 – 11:00', note: '' },
      { day: 'Wtorek i czwartek', hours: '17:30 – 18:30', note: 'Godziny popołudniowe' },
      { day: 'Sobota i niedziela', hours: 'Nieczynne', note: 'Z wyjątkiem pilnych spraw' },
    ],
    officeNotes: [
      {
        title: 'Chrzest',
        text: 'Chrzest dziecka należy zgłosić co najmniej miesiąc wcześniej. Prosimy przynieść akt urodzenia dziecka i dane chrzestnych.',
      },
      {
        title: 'Ślub',
        text: 'Narzeczeni zgłaszają się co najmniej trzy miesiące przed ślubem na kurs przedmałżeński i w sprawie dokumentów.',
      },
      {
        title: 'Chorzy i pogrzeby',
        text: 'W sprawie odwiedzin chorego, sakramentu namaszczenia chorych lub pogrzebu prosimy dzwonić do kancelarii: (021) 367-422, o każdej porze.',
      },
    ],
  },
}

/* ----------------------------------------------------------- home page --- */

export const homePage = (img: ImageIds): Record<Locale, Doc> => ({
  hr: {
    hero: {
      image: img.freske2025,
      eyebrow: 'Neslanovac · Split',
      title: 'Župa sv. Marka Evanđelista',
      subtitle:
        'Župna zajednica na splitskom Neslanovcu od 1994. godine. Dobro došli na svetu misu — nedjeljom u 9, 11 i 20 sati, radnim danom u 19 sati.',
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
        'Krštenja, vjenčanja, mise za pokojne i sve ostale potrebe dogovaraju se u župnom uredu uz crkvu, osobno ili na telefon (021) 367-422.',
      cards: [
        { title: 'Mise za pokojne', text: 'Nakane za svete mise primaju se u župnom uredu u radno vrijeme ili u sakristiji nakon mise.', href: '' },
        { title: 'Potvrde i izvadci', text: 'Krsni list i ostale potvrde iz matičnih knjiga izdaju se u radno vrijeme ureda, uz osobnu iskaznicu.', href: '' },
        { title: 'Vjeronauk i sakramenti', text: 'Priprava za prvu pričest i krizmu održava se kroz školsku godinu. Upisi su u rujnu.', href: '/vijesti/' },
      ],
    },
    newsSection: {
      eyebrow: 'Iz župe',
      title: 'Vijesti i obavijesti',
      intro: 'Najave slavlja, promjene u rasporedu i događaji iz života župne zajednice.',
      count: 3,
      ctaLabel: 'Sve vijesti',
    },
    quote: {
      enabled: true,
      text: 'Pođite po svem svijetu, propovijedajte evanđelje svemu stvorenju.',
      source: 'Mk 16, 15',
      image: img.freske2019,
    },
    linksSection: {
      eyebrow: 'Poveznice',
      title: 'Gdje dalje',
      intro: 'Stranice nadbiskupije, katolički mediji i naselje u kojem župa živi.',
    },
    metaTitle: 'Župa sv. Marka Evanđelista — Neslanovac, Split',
    metaDescription:
      'Raspored svetih misa i ispovijedi, radno vrijeme župnog ureda i vijesti župe sv. Marka Evanđelista na splitskom Neslanovcu.',
  },
  en: {
    hero: {
      image: img.freske2025,
      eyebrow: 'Neslanovac · Split',
      title: 'Parish of St Mark the Evangelist',
      subtitle:
        'A parish community in Neslanovac, Split, since 1994. You are welcome at Holy Mass — on Sundays at 9, 11 and 20, on weekdays at 19.',
      primaryCta: { label: 'Parish news', href: '/vijesti/' },
      secondaryCta: { label: 'Contact', href: '/kontakt/' },
      showSchedule: true,
      massesTitle: 'Holy Mass',
      confessionsTitle: 'Confession',
    },
    officeSection: {
      eyebrow: 'Parish office',
      title: 'Office hours and sacraments',
      intro:
        'Baptisms, weddings, Masses for the deceased and all other needs are arranged at the parish office next to the church, in person or by phone on (021) 367-422.',
      cards: [
        { title: 'Masses for the deceased', text: 'Mass intentions are received at the parish office during office hours or in the sacristy after Mass.', href: '' },
        { title: 'Certificates', text: 'Baptismal certificates and other extracts from the parish registers are issued during office hours on presentation of an ID.', href: '' },
        { title: 'Catechesis and sacraments', text: 'Preparation for First Communion and Confirmation runs through the school year. Enrolment is in September.', href: '/vijesti/' },
      ],
    },
    newsSection: {
      eyebrow: 'From the parish',
      title: 'News and announcements',
      intro: 'Upcoming celebrations, schedule changes and events from the life of the parish.',
      count: 3,
      ctaLabel: 'All news',
    },
    quote: {
      enabled: true,
      text: 'Go into all the world and proclaim the gospel to the whole creation.',
      source: 'Mk 16:15',
      image: img.freske2019,
    },
    linksSection: {
      eyebrow: 'Links',
      title: 'Further reading',
      intro: 'The archdiocese, Catholic media and the neighbourhood the parish belongs to.',
    },
    metaTitle: 'Parish of St Mark the Evangelist — Neslanovac, Split',
    metaDescription:
      'Mass and confession times, parish office hours and news from the Parish of St Mark the Evangelist in Neslanovac, Split.',
  },
  it: {
    hero: {
      image: img.freske2025,
      eyebrow: 'Neslanovac · Spalato',
      title: 'Parrocchia di San Marco Evangelista',
      subtitle:
        'Una comunità parrocchiale a Neslanovac, Spalato, dal 1994. Benvenuti alla Santa Messa — la domenica alle 9, 11 e 20, nei giorni feriali alle 19.',
      primaryCta: { label: 'Notizie', href: '/vijesti/' },
      secondaryCta: { label: 'Contatti', href: '/kontakt/' },
      showSchedule: true,
      massesTitle: 'Sante Messe',
      confessionsTitle: 'Confessioni',
    },
    officeSection: {
      eyebrow: 'Ufficio parrocchiale',
      title: 'Orari e sacramenti',
      intro:
        'Battesimi, matrimoni, Messe per i defunti e ogni altra necessità si concordano all’ufficio parrocchiale accanto alla chiesa, di persona o al telefono (021) 367-422.',
      cards: [
        { title: 'Messe per i defunti', text: 'Le intenzioni delle Messe si ricevono all’ufficio parrocchiale negli orari di apertura o in sacrestia dopo la Messa.', href: '' },
        { title: 'Certificati', text: 'Il certificato di battesimo e gli altri estratti dei registri parrocchiali si rilasciano negli orari d’ufficio, con un documento d’identità.', href: '' },
        { title: 'Catechesi e sacramenti', text: 'La preparazione alla Prima Comunione e alla Cresima si svolge durante l’anno scolastico. Le iscrizioni sono a settembre.', href: '/vijesti/' },
      ],
    },
    newsSection: {
      eyebrow: 'Dalla parrocchia',
      title: 'Notizie e avvisi',
      intro: 'Celebrazioni in programma, variazioni d’orario ed eventi dalla vita della comunità parrocchiale.',
      count: 3,
      ctaLabel: 'Tutte le notizie',
    },
    quote: {
      enabled: true,
      text: 'Andate in tutto il mondo e proclamate il Vangelo a ogni creatura.',
      source: 'Mc 16, 15',
      image: img.freske2019,
    },
    linksSection: {
      eyebrow: 'Link',
      title: 'Per approfondire',
      intro: 'L’arcidiocesi, i media cattolici e il quartiere in cui vive la parrocchia.',
    },
    metaTitle: 'Parrocchia di San Marco Evangelista — Neslanovac, Spalato',
    metaDescription:
      'Orari delle Messe e delle confessioni, orari dell’ufficio parrocchiale e notizie della Parrocchia di San Marco Evangelista a Neslanovac, Spalato.',
  },
  pl: {
    hero: {
      image: img.freske2025,
      eyebrow: 'Neslanovac · Split',
      title: 'Parafia św. Marka Ewangelisty',
      subtitle:
        'Wspólnota parafialna w Neslanovcu w Splicie od 1994 roku. Zapraszamy na Mszę świętą — w niedziele o 9, 11 i 20, w dni powszednie o 19.',
      primaryCta: { label: 'Aktualności', href: '/vijesti/' },
      secondaryCta: { label: 'Kontakt', href: '/kontakt/' },
      showSchedule: true,
      massesTitle: 'Msze święte',
      confessionsTitle: 'Spowiedź',
    },
    officeSection: {
      eyebrow: 'Kancelaria parafialna',
      title: 'Godziny otwarcia i sakramenty',
      intro:
        'Chrzty, śluby, Msze za zmarłych i wszystkie inne sprawy załatwia się w kancelarii parafialnej przy kościele, osobiście lub telefonicznie: (021) 367-422.',
      cards: [
        { title: 'Msze za zmarłych', text: 'Intencje mszalne przyjmowane są w kancelarii w godzinach otwarcia lub w zakrystii po Mszy.', href: '' },
        { title: 'Zaświadczenia', text: 'Świadectwo chrztu i inne wypisy z ksiąg parafialnych wydawane są w godzinach pracy kancelarii, za okazaniem dowodu osobistego.', href: '' },
        { title: 'Katecheza i sakramenty', text: 'Przygotowanie do Pierwszej Komunii i bierzmowania trwa przez cały rok szkolny. Zapisy we wrześniu.', href: '/vijesti/' },
      ],
    },
    newsSection: {
      eyebrow: 'Z parafii',
      title: 'Aktualności i ogłoszenia',
      intro: 'Zapowiedzi uroczystości, zmiany w porządku i wydarzenia z życia wspólnoty parafialnej.',
      count: 3,
      ctaLabel: 'Wszystkie aktualności',
    },
    quote: {
      enabled: true,
      text: 'Idźcie na cały świat i głoście Ewangelię wszelkiemu stworzeniu.',
      source: 'Mk 16, 15',
      image: img.freske2019,
    },
    linksSection: {
      eyebrow: 'Linki',
      title: 'Warto zajrzeć',
      intro: 'Archidiecezja, media katolickie i dzielnica, w której żyje parafia.',
    },
    metaTitle: 'Parafia św. Marka Ewangelisty — Neslanovac, Split',
    metaDescription:
      'Porządek Mszy i spowiedzi, godziny pracy kancelarii i aktualności Parafii św. Marka Ewangelisty w Neslanovcu w Splicie.',
  },
})

/* ----------------------------------------------------------- news page --- */

export const newsPage: Record<Locale, Doc> = {
  hr: {
    eyebrow: 'Iz župe',
    title: 'Župne vijesti',
    intro: 'Obavijesti, najave slavlja i događaji iz života župe sv. Marka na Neslanovcu.',
    perPage: 9,
    emptyMessage: 'Trenutno nema objavljenih vijesti.',
    metaTitle: 'Župne vijesti — Župa sv. Marka, Neslanovac',
    metaDescription: 'Obavijesti i vijesti iz župe sv. Marka Evanđelista na splitskom Neslanovcu.',
  },
  en: {
    eyebrow: 'From the parish',
    title: 'Parish news',
    intro: 'Announcements, upcoming celebrations and events from the life of St Mark’s parish in Neslanovac.',
    perPage: 9,
    emptyMessage: 'There is no news at the moment.',
    metaTitle: 'Parish news — St Mark’s Parish, Neslanovac',
    metaDescription: 'Announcements and news from the Parish of St Mark the Evangelist in Neslanovac, Split.',
  },
  it: {
    eyebrow: 'Dalla parrocchia',
    title: 'Notizie parrocchiali',
    intro: 'Avvisi, celebrazioni in programma ed eventi dalla vita della parrocchia di San Marco a Neslanovac.',
    perPage: 9,
    emptyMessage: 'Al momento non ci sono notizie pubblicate.',
    metaTitle: 'Notizie parrocchiali — Parrocchia di San Marco, Neslanovac',
    metaDescription: 'Avvisi e notizie dalla Parrocchia di San Marco Evangelista a Neslanovac, Spalato.',
  },
  pl: {
    eyebrow: 'Z parafii',
    title: 'Aktualności parafialne',
    intro: 'Ogłoszenia, zapowiedzi uroczystości i wydarzenia z życia parafii św. Marka w Neslanovcu.',
    perPage: 9,
    emptyMessage: 'Obecnie brak opublikowanych aktualności.',
    metaTitle: 'Aktualności — Parafia św. Marka, Neslanovac',
    metaDescription: 'Ogłoszenia i aktualności z Parafii św. Marka Ewangelisty w Neslanovcu w Splicie.',
  },
}

/* ---------------------------------------------------------- about page --- */

export const aboutPage = (img: ImageIds): Record<Locale, Doc> => ({
  hr: {
    eyebrow: 'O nama',
    title: 'Župa sv. Marka Evanđelista na Neslanovcu',
    intro:
      'Gradska župa u Splitu, osnovana 1994. godine, s crkvom posvećenom 2005. Na njezinu području živi oko pet tisuća stanovnika.',
    heroImage: img.freske2025,
    parish: {
      title: 'Od montažne crkve do žive zajednice',
      body: richText(
        'Župa je osnovana 12. rujna 1994. godine na istočnom dijelu župe Materinstva Blažene Djevice Marije, kojoj je Neslanovac dotad pripadao. Povjerena je dijecezanskim svećenicima, a prvi župnik bio je don Šimun Doljanin.',
        'Na području nove župe bila je samo mala kapela sv. Dujma u Dujmovači, izvan naselja i premala za župnu crkvu. Zato je krajem srpnja 1994. u tri dana podignuta montažna aluminijska crkva od stotinjak četvornih metara, dar Caritasa iz Venecije, sa sakristijom, župnim uredom i stanom za župnika u dva manja montažna objekta.',
        'Župa je počela djelovati 15. prosinca 1994. U montažnoj se crkvi bogoslužje slavilo do došašća 2003., kada se zajednica preselila u novu župnu crkvu, a montažna je crkva ustupljena župi Gospina Pohođenja na Spinutu. Matične knjige vode se od osnutka župe.',
        'Danas župom upravlja don Roko Celent. Na području župe živi oko pet tisuća stanovnika, a u liturgiji sudjeluju ministranti i župni VIS Sveti Marko.',
      ),
      image: img.misa2019,
    },
    church: {
      title: 'Crkva sv. Marka i kapela sv. Dujma',
      body: richText(
        'Nova župna crkva otvorena je za bogoslužje na prvu nedjelju došašća 2003., a posvetio ju je nadbiskup Marin Barišić 9. siječnja 2005. Podignuta je u povodu jubileja mučeničke smrti sv. Marka. Idejni nacrt izradio je arhitekt Maurizio Bergamo, a glavni i izvedbeni projekt arhitekt Damir Rako; dio radova izveli su sami župljani.',
        'Crkva je uređena prema smjernicama Drugoga vatikanskog sabora. Oltar je u središtu i označava Krista raspetoga i uskrsloga, a prostor za vjernike raspoređen je tako da svi mogu aktivno sudjelovati u slavlju. Svetohranište od kamena smješteno je u pokrajnjoj kapelici za klanjanje i molitvu. Crkva je tradicionalno okrenuta prema istoku, a hrastova vrata gledaju na zapad.',
        'Središnju sliku izradio je Maksimilijan Ferlin. Krist u bijelome okružen je trima krugovima — zemljom, nebom i smrću koju on razbija — a prate ga sv. Ivan Krstitelj, Blažena Djevica Marija, arkanđeli Mihael i Gabriel te sv. Marko i sv. Dujam.',
        'U župi je i kapela sv. Dujma u Dujmovači, u današnjem obliku podignuta 1747. godine. Sagradio ju je Splićanin Petar Bakić, biskup bosanski i đakovački, kod izvora koji predaja povezuje s prijenosom tijela sv. Dujma. Kapela i okoliš uređeni su 1998. godine.',
      ),
      image: img.freske2019,
    },
    patron: {
      title: 'Sveti Marko Evanđelist',
      feastDay: '25. travnja',
      body: richText(
        'Sveti Marko, pisac najstarijeg od četiriju evanđelja, bio je suradnik apostola Petra i Pavla. Predaja ga povezuje s Aleksandrijom, gdje je, prema starim izvorima, umro mučeničkom smrću.',
        'Njegov je znak krilati lav — zato se lav pojavljuje na prikazima svetoga Marka. Evanđelje koje nosi njegovo ime najkraće je i najbrže: Isus u njemu neprestano ide, liječi i poziva, a zaključuje ga poslanje učenicima da idu po svem svijetu i propovijedaju evanđelje.',
        'Župa slavi svoga zaštitnika 25. travnja, a blagdan se poklapa s Danom gradskoga kotara Neslanovac. Za tridesetu obljetnicu župe 2025. godine nadbiskup Zdenko Križić blagoslovio je novi kip sv. Marka, nošen u procesiji ulicama naselja.',
      ),
      image: img.procesija,
    },
    metaTitle: 'O župi sv. Marka — Neslanovac, Split',
    metaDescription:
      'Povijest župe sv. Marka Evanđelista na Neslanovcu od 1994., župna crkva posvećena 2005., kapela sv. Dujma iz 1747. i sv. Marko, zaštitnik župe.',
  },
  en: {
    eyebrow: 'About',
    title: 'The Parish of St Mark the Evangelist in Neslanovac',
    intro:
      'A city parish in Split, founded in 1994, with a church consecrated in 2005. Around five thousand people live within its boundaries.',
    heroImage: img.freske2025,
    parish: {
      title: 'From a prefabricated chapel to a living community',
      body: richText(
        'The parish was founded on 12 September 1994 from the eastern part of the Parish of the Motherhood of the Blessed Virgin Mary, to which Neslanovac had belonged until then. It was entrusted to diocesan priests, and its first parish priest was Fr Šimun Doljanin.',
        'The only church within the new parish was the small Chapel of St Domnius in Dujmovača, outside the settlement and too small to serve as a parish church. So at the end of July 1994 a prefabricated aluminium church of about a hundred square metres was put up in three days — a gift from Caritas of Venice — with the sacristy, parish office and priest’s lodgings in two smaller prefabricated units.',
        'The parish began its work on 15 December 1994. Services were held in the prefabricated church until Advent 2003, when the community moved into the new parish church; the temporary church was then given to the Parish of the Visitation in Spinut. The parish registers have been kept since the parish was founded.',
        'Today the parish is led by Fr Roko Celent. Around five thousand people live in the parish, and altar servers and the parish youth band VIS Sveti Marko take part in the liturgy.',
      ),
      image: img.misa2019,
    },
    church: {
      title: 'St Mark’s Church and the Chapel of St Domnius',
      body: richText(
        'The new parish church opened for worship on the First Sunday of Advent 2003 and was consecrated by Archbishop Marin Barišić on 9 January 2005. It was built to mark the jubilee of St Mark’s martyrdom. The concept design is by architect Maurizio Bergamo and the main and detailed design by architect Damir Rako; parishioners carried out part of the work themselves.',
        'The church is arranged according to the guidelines of the Second Vatican Council. The altar stands at the centre as a sign of Christ crucified and risen, and the seating is laid out so that everyone can take an active part in the celebration. The stone tabernacle is in a side chapel set aside for adoration and prayer. The church traditionally faces east, and its oak doors face west.',
        'The central painting is the work of Maksimilijan Ferlin. Christ in white is surrounded by three circles — earth, heaven and the death he shatters — and accompanied by St John the Baptist, the Blessed Virgin Mary, the archangels Michael and Gabriel, and Saints Mark and Domnius.',
        'The parish also includes the Chapel of St Domnius in Dujmovača, built in its present form in 1747. It was erected by Petar Bakić, a native of Split and Bishop of Bosnia and Đakovo, beside a spring that tradition links with the translation of St Domnius’s body. The chapel and its surroundings were restored in 1998.',
      ),
      image: img.freske2019,
    },
    patron: {
      title: 'St Mark the Evangelist',
      feastDay: '25 April',
      body: richText(
        'St Mark, author of the oldest of the four Gospels, was a co-worker of the apostles Peter and Paul. Tradition links him with Alexandria, where, according to ancient sources, he died a martyr.',
        'His symbol is the winged lion, which is why a lion appears in images of St Mark. The Gospel that bears his name is the shortest and the swiftest: in it Jesus is always on the move, healing and calling, and it ends with the disciples being sent into the whole world to proclaim the Gospel.',
        'The parish celebrates its patron on 25 April, a feast that coincides with Neslanovac district day. For the parish’s thirtieth anniversary in 2025, Archbishop Zdenko Križić blessed a new statue of St Mark, which was carried in procession through the neighbourhood.',
      ),
      image: img.procesija,
    },
    metaTitle: 'About St Mark’s Parish — Neslanovac, Split',
    metaDescription:
      'History of the Parish of St Mark the Evangelist in Neslanovac since 1994, the parish church consecrated in 2005, the 1747 Chapel of St Domnius and St Mark, the parish patron.',
  },
  it: {
    eyebrow: 'Chi siamo',
    title: 'La Parrocchia di San Marco Evangelista a Neslanovac',
    intro:
      'Una parrocchia cittadina di Spalato, fondata nel 1994, con una chiesa consacrata nel 2005. Nel suo territorio vivono circa cinquemila abitanti.',
    heroImage: img.freske2025,
    parish: {
      title: 'Da una chiesa prefabbricata a una comunità viva',
      body: richText(
        'La parrocchia è stata fondata il 12 settembre 1994 dalla parte orientale della Parrocchia della Maternità della Beata Vergine Maria, alla quale fino ad allora apparteneva Neslanovac. È stata affidata al clero diocesano e il suo primo parroco è stato don Šimun Doljanin.',
        'Nel territorio della nuova parrocchia c’era soltanto la piccola cappella di San Doimo a Dujmovača, fuori dall’abitato e troppo piccola per essere chiesa parrocchiale. Per questo, alla fine di luglio del 1994, fu montata in tre giorni una chiesa prefabbricata in alluminio di circa cento metri quadrati, dono della Caritas di Venezia, con sacrestia, ufficio parrocchiale e alloggio del parroco in due moduli più piccoli.',
        'La parrocchia ha iniziato la sua attività il 15 dicembre 1994. Nella chiesa prefabbricata si è celebrato fino all’Avvento del 2003, quando la comunità si è trasferita nella nuova chiesa parrocchiale; la chiesa provvisoria è stata poi ceduta alla Parrocchia della Visitazione a Spinut. I registri parrocchiali sono tenuti dalla fondazione.',
        'Oggi la parrocchia è guidata da don Roko Celent. Nel territorio parrocchiale vivono circa cinquemila abitanti e alla liturgia partecipano i ministranti e il gruppo musicale giovanile VIS Sveti Marko.',
      ),
      image: img.misa2019,
    },
    church: {
      title: 'La chiesa di San Marco e la cappella di San Doimo',
      body: richText(
        'La nuova chiesa parrocchiale è stata aperta al culto la prima domenica di Avvento del 2003 e consacrata dall’arcivescovo Marin Barišić il 9 gennaio 2005. È stata costruita in occasione del giubileo del martirio di San Marco. Il progetto di massima è dell’architetto Maurizio Bergamo, quello definitivo ed esecutivo dell’architetto Damir Rako; una parte dei lavori è stata eseguita dagli stessi parrocchiani.',
        'La chiesa è sistemata secondo le indicazioni del Concilio Vaticano II. L’altare è al centro, segno di Cristo crocifisso e risorto, e lo spazio per i fedeli è disposto in modo che tutti possano partecipare attivamente alla celebrazione. Il tabernacolo in pietra si trova in una cappella laterale destinata all’adorazione e alla preghiera. La chiesa è orientata tradizionalmente verso est e le porte in rovere guardano a ovest.',
        'Il dipinto centrale è opera di Maksimilijan Ferlin. Cristo in bianco è circondato da tre cerchi — la terra, il cielo e la morte che egli spezza — ed è accompagnato da San Giovanni Battista, dalla Beata Vergine Maria, dagli arcangeli Michele e Gabriele e dai santi Marco e Doimo.',
        'Nella parrocchia si trova anche la cappella di San Doimo a Dujmovača, costruita nella forma attuale nel 1747. La fece erigere lo spalatino Petar Bakić, vescovo di Bosnia e Đakovo, accanto a una sorgente che la tradizione collega alla traslazione del corpo di San Doimo. La cappella e i dintorni sono stati sistemati nel 1998.',
      ),
      image: img.freske2019,
    },
    patron: {
      title: 'San Marco Evangelista',
      feastDay: '25 aprile',
      body: richText(
        'San Marco, autore del più antico dei quattro Vangeli, fu collaboratore degli apostoli Pietro e Paolo. La tradizione lo lega ad Alessandria, dove, secondo fonti antiche, morì martire.',
        'Il suo simbolo è il leone alato, per questo il leone compare nelle immagini di San Marco. Il Vangelo che porta il suo nome è il più breve e il più rapido: Gesù vi è sempre in cammino, guarisce e chiama, e si conclude con l’invio dei discepoli in tutto il mondo ad annunciare il Vangelo.',
        'La parrocchia festeggia il suo patrono il 25 aprile, festa che coincide con la giornata del quartiere di Neslanovac. Per il trentesimo anniversario della parrocchia, nel 2025, l’arcivescovo Zdenko Križić ha benedetto una nuova statua di San Marco, portata in processione per le vie del quartiere.',
      ),
      image: img.procesija,
    },
    metaTitle: 'La parrocchia di San Marco — Neslanovac, Spalato',
    metaDescription:
      'Storia della Parrocchia di San Marco Evangelista a Neslanovac dal 1994, la chiesa consacrata nel 2005, la cappella di San Doimo del 1747 e San Marco, patrono della parrocchia.',
  },
  pl: {
    eyebrow: 'O nas',
    title: 'Parafia św. Marka Ewangelisty w Neslanovcu',
    intro:
      'Miejska parafia w Splicie, założona w 1994 roku, z kościołem konsekrowanym w 2005 roku. Na jej terenie mieszka około pięciu tysięcy osób.',
    heroImage: img.freske2025,
    parish: {
      title: 'Od kościoła z prefabrykatów do żywej wspólnoty',
      body: richText(
        'Parafia została erygowana 12 września 1994 roku ze wschodniej części Parafii Macierzyństwa Najświętszej Maryi Panny, do której wcześniej należał Neslanovac. Powierzono ją kapłanom diecezjalnym, a pierwszym proboszczem był ks. Šimun Doljanin.',
        'Na terenie nowej parafii była tylko mała kaplica św. Domniusa w Dujmovačy, położona poza osiedlem i zbyt mała na kościół parafialny. Dlatego pod koniec lipca 1994 roku w trzy dni zmontowano aluminiowy kościół z prefabrykatów o powierzchni około stu metrów kwadratowych — dar Caritasu z Wenecji — z zakrystią, kancelarią i mieszkaniem proboszcza w dwóch mniejszych modułach.',
        'Parafia rozpoczęła działalność 15 grudnia 1994 roku. Nabożeństwa odprawiano w tymczasowym kościele do Adwentu 2003 roku, kiedy wspólnota przeniosła się do nowego kościoła; tymczasowy kościół przekazano Parafii Nawiedzenia NMP na Spinucie. Księgi parafialne prowadzone są od założenia parafii.',
        'Obecnie parafią kieruje ks. Roko Celent. Na terenie parafii mieszka około pięciu tysięcy osób, a w liturgii posługują ministranci i młodzieżowy zespół VIS Sveti Marko.',
      ),
      image: img.misa2019,
    },
    church: {
      title: 'Kościół św. Marka i kaplica św. Domniusa',
      body: richText(
        'Nowy kościół parafialny otwarto dla wiernych w pierwszą niedzielę Adwentu 2003 roku, a 9 stycznia 2005 roku konsekrował go arcybiskup Marin Barišić. Wzniesiono go z okazji jubileuszu męczeńskiej śmierci św. Marka. Koncepcję opracował architekt Maurizio Bergamo, a projekt główny i wykonawczy architekt Damir Rako; część prac wykonali sami parafianie.',
        'Kościół urządzono zgodnie z wytycznymi Soboru Watykańskiego II. Ołtarz stoi w centrum jako znak Chrystusa ukrzyżowanego i zmartwychwstałego, a miejsca dla wiernych rozmieszczono tak, by każdy mógł czynnie uczestniczyć w liturgii. Kamienne tabernakulum znajduje się w bocznej kaplicy przeznaczonej do adoracji i modlitwy. Kościół jest tradycyjnie zorientowany na wschód, a dębowe drzwi wychodzą na zachód.',
        'Centralny obraz namalował Maksimilijan Ferlin. Chrystusa w bieli otaczają trzy kręgi — ziemia, niebo i śmierć, którą On kruszy — a towarzyszą Mu św. Jan Chrzciciel, Najświętsza Maryja Panna, archaniołowie Michał i Gabriel oraz święci Marek i Domnius.',
        'Do parafii należy także kaplica św. Domniusa w Dujmovačy, zbudowana w obecnym kształcie w 1747 roku. Wzniósł ją pochodzący ze Splitu Petar Bakić, biskup bośniacki i diakowski, przy źródle, które tradycja łączy z przeniesieniem ciała św. Domniusa. Kaplicę i jej otoczenie odnowiono w 1998 roku.',
      ),
      image: img.freske2019,
    },
    patron: {
      title: 'Święty Marek Ewangelista',
      feastDay: '25 kwietnia',
      body: richText(
        'Święty Marek, autor najstarszej z czterech Ewangelii, był współpracownikiem apostołów Piotra i Pawła. Tradycja łączy go z Aleksandrią, gdzie według starożytnych źródeł poniósł śmierć męczeńską.',
        'Jego symbolem jest uskrzydlony lew i dlatego lew pojawia się na wizerunkach św. Marka. Ewangelia nosząca jego imię jest najkrótsza i najbardziej dynamiczna: Jezus nieustannie w niej wędruje, uzdrawia i powołuje, a kończy się ona posłaniem uczniów na cały świat, by głosili Ewangelię.',
        'Parafia obchodzi uroczystość patrona 25 kwietnia, w dniu, który jest też świętem dzielnicy Neslanovac. Na trzydziestolecie parafii w 2025 roku arcybiskup Zdenko Križić poświęcił nową figurę św. Marka, niesioną w procesji ulicami osiedla.',
      ),
      image: img.procesija,
    },
    metaTitle: 'O parafii św. Marka — Neslanovac, Split',
    metaDescription:
      'Historia Parafii św. Marka Ewangelisty w Neslanovcu od 1994 roku, kościół konsekrowany w 2005 roku, kaplica św. Domniusa z 1747 roku i św. Marek, patron parafii.',
  },
})

/* -------------------------------------------------------- contact page --- */

const contactBase = {
  parishOfficeName: '',
  street: 'Hercegovačka 157',
  postalCode: '21000',
  city: 'Split',
  phone: '(021) 367-422',
}

const map = {
  embedUrl: 'https://www.google.com/maps?q=Hercegova%C4%8Dka%20157%2C%2021000%20Split&output=embed',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Hercegova%C4%8Dka%20157%2C%2021000%20Split',
}

export const contactPage = (img: ImageIds): Record<Locale, Doc> => ({
  hr: {
    eyebrow: 'Kontakt',
    title: 'Župni ured',
    intro: 'Crkva i župni ured nalaze se u Hercegovačkoj ulici na Neslanovcu u Splitu.',
    heroImage: img.misa2025,
    contact: { ...contactBase, parishOfficeName: 'Župni ured sv. Marka Evanđelista', country: 'Hrvatska' },
    map,
    metaTitle: 'Kontakt — Župa sv. Marka, Neslanovac, Split',
    metaDescription: 'Adresa, telefon, radno vrijeme župnog ureda i karta crkve sv. Marka na splitskom Neslanovcu.',
  },
  en: {
    eyebrow: 'Contact',
    title: 'Parish office',
    intro: 'The church and the parish office are on Hercegovačka Street in Neslanovac, Split.',
    heroImage: img.misa2025,
    contact: { ...contactBase, parishOfficeName: 'Parish Office of St Mark the Evangelist', country: 'Croatia' },
    map,
    metaTitle: 'Contact — St Mark’s Parish, Neslanovac, Split',
    metaDescription: 'Address, phone, parish office hours and a map of St Mark’s Church in Neslanovac, Split.',
  },
  it: {
    eyebrow: 'Contatti',
    title: 'Ufficio parrocchiale',
    intro: 'La chiesa e l’ufficio parrocchiale si trovano in via Hercegovačka a Neslanovac, Spalato.',
    heroImage: img.misa2025,
    contact: { ...contactBase, parishOfficeName: 'Ufficio parrocchiale di San Marco Evangelista', country: 'Croazia' },
    map,
    metaTitle: 'Contatti — Parrocchia di San Marco, Neslanovac, Spalato',
    metaDescription: 'Indirizzo, telefono, orari dell’ufficio parrocchiale e mappa della chiesa di San Marco a Neslanovac, Spalato.',
  },
  pl: {
    eyebrow: 'Kontakt',
    title: 'Kancelaria parafialna',
    intro: 'Kościół i kancelaria parafialna znajdują się przy ulicy Hercegovačka w Neslanovcu w Splicie.',
    heroImage: img.misa2025,
    contact: { ...contactBase, parishOfficeName: 'Kancelaria Parafii św. Marka Ewangelisty', country: 'Chorwacja' },
    map,
    metaTitle: 'Kontakt — Parafia św. Marka, Neslanovac, Split',
    metaDescription: 'Adres, telefon, godziny pracy kancelarii i mapa dojazdu do kościoła św. Marka w Neslanovcu w Splicie.',
  },
})

/* ---------------------------------------------------- parish activities --- */

/*
 * Placeholder activities for the Raspored page — the office replaces them in
 * the admin. Kept apart from `schedule` above and merged in by the seed, so the
 * evergreen liturgy rows and these term-time ones can be read separately.
 *
 * Rows line up across locales by position (the seed gives row N the same id in
 * every language), so every locale must list the same activities in the same
 * order.
 */

type ActivityGroup = 'vjeronauk' | 'zborovi' | 'zajednice'
type Activity = {
  group: ActivityGroup
  title: string
  day: string
  times: string
  place: string
  note: string
  active: boolean
}

const act = (
  group: ActivityGroup,
  title: string,
  day: string,
  times: string,
  place: string,
  note = '',
): Activity => ({ group, title, day, times, place, note, active: true })

export const activities: Record<Locale, Activity[]> = {
  hr: [
    act('vjeronauk', 'Vjeronauk za prvopričesnike', 'Utorkom', '17:00 – 18:00', 'Župna dvorana', 'Djeca 3. razreda, od listopada do svibnja'),
    act('vjeronauk', 'Vjeronauk za krizmanike — 1. godina', 'Četvrtkom', '17:00 – 18:00', 'Župna dvorana', 'Učenici 7. razreda'),
    act('vjeronauk', 'Vjeronauk za krizmanike — 2. godina', 'Petkom', '17:00 – 18:00', 'Župna dvorana', 'Učenici 8. razreda'),
    act('vjeronauk', 'Susret roditelja prvopričesnika', 'Prvi ponedjeljak u mjesecu', '19:45', 'Crkva', 'Nakon večernje mise'),
    act('zborovi', 'Proba župnog zbora', 'Srijedom', '19:45 – 21:00', 'Župna dvorana', 'Zbor pjeva na misi u 11:00'),
    act('zborovi', 'Proba VIS-a Sveti Marko', 'Petkom', '19:45 – 21:00', 'Župna dvorana', 'VIS pjeva na misi u 20:00'),
    act('zborovi', 'Dječji zbor', 'Subotom', '10:00 – 11:00', 'Župna dvorana', 'Za djecu od 1. do 4. razreda'),
    act('zajednice', 'Ministranti', 'Subotom', '11:00 – 12:00', 'Sakristija', 'Susret i priprava za službu oltara'),
    act('zajednice', 'Molitvena zajednica', 'Ponedjeljkom', '19:45 – 20:45', 'Crkva', 'Molitva i razmatranje Božje riječi'),
    act('zajednice', 'Župni Caritas', 'Srijedom', '9:00 – 11:00', 'Župni ured', 'Prikupljanje i podjela pomoći potrebitima'),
    act('zajednice', 'Zaručnički tečaj', 'Prema dogovoru', '', 'Župna dvorana', 'Prijave u župnom uredu'),
  ],
  en: [
    act('vjeronauk', 'Catechesis for First Communion', 'Tuesdays', '17:00 – 18:00', 'Parish hall', 'Third-grade children, October to May'),
    act('vjeronauk', 'Confirmation catechesis — year 1', 'Thursdays', '17:00 – 18:00', 'Parish hall', 'Seventh-grade pupils'),
    act('vjeronauk', 'Confirmation catechesis — year 2', 'Fridays', '17:00 – 18:00', 'Parish hall', 'Eighth-grade pupils'),
    act('vjeronauk', 'Meeting for First Communion parents', 'First Monday of the month', '19:45', 'Church', 'After the evening Mass'),
    act('zborovi', 'Parish choir rehearsal', 'Wednesdays', '19:45 – 21:00', 'Parish hall', 'The choir sings at the 11:00 Mass'),
    act('zborovi', 'VIS Sveti Marko rehearsal', 'Fridays', '19:45 – 21:00', 'Parish hall', 'The band plays at the 20:00 Mass'),
    act('zborovi', 'Children’s choir', 'Saturdays', '10:00 – 11:00', 'Parish hall', 'For children in grades 1 to 4'),
    act('zajednice', 'Altar servers', 'Saturdays', '11:00 – 12:00', 'Sacristy', 'Meeting and preparation for serving at the altar'),
    act('zajednice', 'Prayer group', 'Mondays', '19:45 – 20:45', 'Church', 'Prayer and reflection on the Word of God'),
    act('zajednice', 'Parish Caritas', 'Wednesdays', '9:00 – 11:00', 'Parish office', 'Collecting and distributing aid to those in need'),
    act('zajednice', 'Marriage preparation course', 'By arrangement', '', 'Parish hall', 'Sign up at the parish office'),
  ],
  it: [
    act('vjeronauk', 'Catechesi per la Prima Comunione', 'Martedì', '17:00 – 18:00', 'Sala parrocchiale', 'Bambini della terza classe, da ottobre a maggio'),
    act('vjeronauk', 'Catechesi per la Cresima — 1° anno', 'Giovedì', '17:00 – 18:00', 'Sala parrocchiale', 'Alunni della settima classe'),
    act('vjeronauk', 'Catechesi per la Cresima — 2° anno', 'Venerdì', '17:00 – 18:00', 'Sala parrocchiale', 'Alunni dell’ottava classe'),
    act('vjeronauk', 'Incontro dei genitori della Prima Comunione', 'Primo lunedì del mese', '19:45', 'Chiesa', 'Dopo la Messa vespertina'),
    act('zborovi', 'Prove del coro parrocchiale', 'Mercoledì', '19:45 – 21:00', 'Sala parrocchiale', 'Il coro anima la Messa delle 11:00'),
    act('zborovi', 'Prove del VIS Sveti Marko', 'Venerdì', '19:45 – 21:00', 'Sala parrocchiale', 'Il gruppo anima la Messa delle 20:00'),
    act('zborovi', 'Coro dei bambini', 'Sabato', '10:00 – 11:00', 'Sala parrocchiale', 'Per i bambini dalla prima alla quarta classe'),
    act('zajednice', 'Ministranti', 'Sabato', '11:00 – 12:00', 'Sacrestia', 'Incontro e preparazione al servizio all’altare'),
    act('zajednice', 'Gruppo di preghiera', 'Lunedì', '19:45 – 20:45', 'Chiesa', 'Preghiera e meditazione della Parola di Dio'),
    act('zajednice', 'Caritas parrocchiale', 'Mercoledì', '9:00 – 11:00', 'Ufficio parrocchiale', 'Raccolta e distribuzione di aiuti ai bisognosi'),
    act('zajednice', 'Corso di preparazione al matrimonio', 'Su appuntamento', '', 'Sala parrocchiale', 'Iscrizioni all’ufficio parrocchiale'),
  ],
  pl: [
    act('vjeronauk', 'Katecheza przed Pierwszą Komunią', 'Wtorki', '17:00 – 18:00', 'Sala parafialna', 'Dzieci z 3. klasy, od października do maja'),
    act('vjeronauk', 'Katecheza przed bierzmowaniem — 1. rok', 'Czwartki', '17:00 – 18:00', 'Sala parafialna', 'Uczniowie 7. klasy'),
    act('vjeronauk', 'Katecheza przed bierzmowaniem — 2. rok', 'Piątki', '17:00 – 18:00', 'Sala parafialna', 'Uczniowie 8. klasy'),
    act('vjeronauk', 'Spotkanie rodziców dzieci pierwszokomunijnych', 'Pierwszy poniedziałek miesiąca', '19:45', 'Kościół', 'Po wieczornej Mszy'),
    act('zborovi', 'Próba chóru parafialnego', 'Środy', '19:45 – 21:00', 'Sala parafialna', 'Chór śpiewa na Mszy o 11:00'),
    act('zborovi', 'Próba zespołu VIS Sveti Marko', 'Piątki', '19:45 – 21:00', 'Sala parafialna', 'Zespół gra na Mszy o 20:00'),
    act('zborovi', 'Chór dziecięcy', 'Soboty', '10:00 – 11:00', 'Sala parafialna', 'Dla dzieci z klas 1–4'),
    act('zajednice', 'Ministranci', 'Soboty', '11:00 – 12:00', 'Zakrystia', 'Spotkanie i przygotowanie do służby przy ołtarzu'),
    act('zajednice', 'Grupa modlitewna', 'Poniedziałki', '19:45 – 20:45', 'Kościół', 'Modlitwa i rozważanie Słowa Bożego'),
    act('zajednice', 'Parafialny Caritas', 'Środy', '9:00 – 11:00', 'Kancelaria parafialna', 'Zbiórka i rozdawanie pomocy potrzebującym'),
    act('zajednice', 'Kurs przedmałżeński', 'Po uzgodnieniu', '', 'Sala parafialna', 'Zapisy w kancelarii parafialnej'),
  ],
}

/* ------------------------------------------------------- schedule page --- */

export const schedulePage = (img: ImageIds): Record<Locale, Doc> => ({
  hr: {
    eyebrow: 'Raspored',
    title: 'Raspored i župne aktivnosti',
    intro:
      'Svete mise, ispovijed i pobožnosti, vjeronauk, probe zborova i susreti župnih zajednica — sve na jednom mjestu.',
    heroImage: img.oltar2019,
    liturgy: {
      eyebrow: 'Liturgija',
      title: 'Mise, ispovijed i pobožnosti',
      intro: 'Raspored vrijedi kroz cijelu godinu, osim ako nije drukčije najavljeno u prigodnom rasporedu.',
    },
    groups: {
      vjeronauk: {
        title: 'Vjeronauk',
        intro: 'Župni vjeronauk prati školsku godinu, od listopada do svibnja. Upisi su u rujnu u župnom uredu.',
      },
      zborovi: {
        title: 'Zborovi i glazba',
        intro: 'Pjevači i svirači svih uzrasta dobrodošli su na probe — dovoljni su volja i redovitost.',
      },
      zajednice: {
        title: 'Župne zajednice',
        intro: 'Susreti, molitva i služenje — mjesta na kojima se župa okuplja i kroz tjedan.',
      },
    },
    metaTitle: 'Raspored misa i župnih aktivnosti — Župa sv. Marka, Neslanovac',
    metaDescription:
      'Raspored svetih misa, ispovijedi i pobožnosti te vjeronauka, proba zborova i župnih zajednica u župi sv. Marka na splitskom Neslanovcu.',
  },
  en: {
    eyebrow: 'Schedule',
    title: 'Schedule and parish activities',
    intro:
      'Holy Mass, confession and devotions, catechesis, choir rehearsals and parish group meetings — all in one place.',
    heroImage: img.oltar2019,
    liturgy: {
      eyebrow: 'Liturgy',
      title: 'Mass, confession and devotions',
      intro: 'This schedule applies all year round unless the seasonal schedule says otherwise.',
    },
    groups: {
      vjeronauk: {
        title: 'Catechesis',
        intro: 'Parish catechesis follows the school year, from October to May. Enrolment is in September at the parish office.',
      },
      zborovi: {
        title: 'Choirs and music',
        intro: 'Singers and musicians of all ages are welcome at rehearsals — all it takes is willingness and regular attendance.',
      },
      zajednice: {
        title: 'Parish groups',
        intro: 'Meetings, prayer and service — where the parish gathers during the week too.',
      },
    },
    metaTitle: 'Mass times and parish activities — St Mark’s Parish, Neslanovac',
    metaDescription:
      'Times of Mass, confession and devotions, plus catechesis, choir rehearsals and parish groups at St Mark’s Parish in Neslanovac, Split.',
  },
  it: {
    eyebrow: 'Orari',
    title: 'Orari e attività parrocchiali',
    intro:
      'Sante Messe, confessioni e devozioni, catechesi, prove dei cori e incontri dei gruppi parrocchiali — tutto in un unico posto.',
    heroImage: img.oltar2019,
    liturgy: {
      eyebrow: 'Liturgia',
      title: 'Messe, confessioni e devozioni',
      intro: 'L’orario vale per tutto l’anno, salvo diverse indicazioni nell’orario speciale.',
    },
    groups: {
      vjeronauk: {
        title: 'Catechesi',
        intro: 'La catechesi parrocchiale segue l’anno scolastico, da ottobre a maggio. Le iscrizioni sono a settembre all’ufficio parrocchiale.',
      },
      zborovi: {
        title: 'Cori e musica',
        intro: 'Cantanti e musicisti di ogni età sono benvenuti alle prove — bastano buona volontà e costanza.',
      },
      zajednice: {
        title: 'Gruppi parrocchiali',
        intro: 'Incontri, preghiera e servizio — i luoghi in cui la parrocchia si ritrova anche durante la settimana.',
      },
    },
    metaTitle: 'Orari delle Messe e attività parrocchiali — Parrocchia di San Marco, Neslanovac',
    metaDescription:
      'Orari delle Messe, delle confessioni e delle devozioni, della catechesi, delle prove dei cori e dei gruppi parrocchiali a San Marco, Neslanovac, Spalato.',
  },
  pl: {
    eyebrow: 'Harmonogram',
    title: 'Harmonogram i życie parafii',
    intro:
      'Msze święte, spowiedź i nabożeństwa, katecheza, próby chórów i spotkania wspólnot parafialnych — wszystko w jednym miejscu.',
    heroImage: img.oltar2019,
    liturgy: {
      eyebrow: 'Liturgia',
      title: 'Msze, spowiedź i nabożeństwa',
      intro: 'Porządek obowiązuje przez cały rok, chyba że porządek okolicznościowy stanowi inaczej.',
    },
    groups: {
      vjeronauk: {
        title: 'Katecheza',
        intro: 'Katecheza parafialna trwa przez rok szkolny, od października do maja. Zapisy we wrześniu w kancelarii parafialnej.',
      },
      zborovi: {
        title: 'Chóry i muzyka',
        intro: 'Śpiewacy i muzycy w każdym wieku są mile widziani na próbach — wystarczy chęć i regularność.',
      },
      zajednice: {
        title: 'Wspólnoty parafialne',
        intro: 'Spotkania, modlitwa i służba — miejsca, w których parafia gromadzi się także w ciągu tygodnia.',
      },
    },
    metaTitle: 'Porządek Mszy i życie parafii — Parafia św. Marka, Neslanovac',
    metaDescription:
      'Porządek Mszy, spowiedzi i nabożeństw oraz katecheza, próby chórów i wspólnoty parafialne w Parafii św. Marka w Neslanovcu w Splicie.',
  },
})

/* -------------------------------------------------------- privacy page --- */

/*
 * A factual draft: every statement describes what the website verifiably does
 * (see the privacy audit) — no analytics, no tracking cookies, the contact form
 * via Resend, WhatsApp on request, the map only on click, hosting logs. Points
 * that are the parish's own decision (how long messages are kept, the
 * supervisory authority under the Church's data-protection rules) are written
 * generically and must be confirmed by the parish before launch.
 */
const privacyBody = {
  hr: richDocument(
    { heading: 'Tko obrađuje podatke' },
    'Voditelj obrade je Župa sv. Marka Evanđelista, Hercegovačka 157, 21000 Split, telefon (021) 367-422. Za sva pitanja o vašim podacima obratite se župnom uredu.',
    { heading: 'Što ova stranica ne radi' },
    'Stranica ne koristi kolačiće za praćenje ni alate za analitiku, ne prikazuje oglase i ne bilježi kako se krećete po njoj. Sama stranica ne postavlja nikakve kolačiće.',
    { heading: 'Kada nam se sami javite' },
    'E-mail obrazac: prikupljamo ime i prezime, e-mail adresu i poruku koju napišete. Koristimo ih isključivo kako bismo vam odgovorili. Poruka se župnom uredu dostavlja e-poštom putem usluge Resend.',
    'WhatsApp: odaberete li WhatsApp, vaša se poruka otvara u aplikaciji WhatsApp, a daljnja komunikacija odvija se ondje, prema pravilima privatnosti WhatsAppa.',
    { heading: 'Karta' },
    'Karta na stranici Kontakt ne učitava se sama. Tek kad je odaberete prikazati, učitava se s usluge Google Maps; tada Google prima vašu IP adresu i može postaviti vlastite kolačiće prema svojim pravilima privatnosti.',
    { heading: 'Tehnički podaci' },
    'Kao i kod svake mrežne stranice, poslužitelji koji je isporučuju (Vercel i Supabase) pri posjetu bilježe tehničke podatke poput IP adrese i vremena pristupa, radi sigurnosti i ispravnog rada stranice.',
    { heading: 'Koliko dugo čuvamo podatke' },
    'Poruke koje nam pošaljete čuvamo onoliko dugo koliko je potrebno da vam odgovorimo i nastavimo započetu komunikaciju.',
    { heading: 'Vaša prava' },
    'Možete zatražiti uvid u svoje podatke, njihov ispravak ili brisanje, javljanjem župnom uredu. Imate i pravo podnijeti pritužbu nadležnom nadzornom tijelu za zaštitu osobnih podataka.',
  ),
  en: richDocument(
    { heading: 'Who processes your data' },
    'The controller is the Parish of St Mark the Evangelist, Hercegovačka 157, 21000 Split, Croatia, phone +385 21 367 422. For any question about your data, please contact the parish office.',
    { heading: 'What this website does not do' },
    'The website uses no tracking cookies or analytics tools, shows no advertising and does not record how you move around it. The website itself sets no cookies.',
    { heading: 'When you contact us' },
    'E-mail form: we collect your name, e-mail address and the message you write, and use them only to reply to you. The message is delivered to the parish office by e-mail through the Resend service.',
    'WhatsApp: if you choose WhatsApp, your message opens in the WhatsApp app and the conversation continues there, under WhatsApp\'s privacy policy.',
    { heading: 'The map' },
    'The map on the Contact page does not load by itself. Only when you choose to show it is it loaded from Google Maps; Google then receives your IP address and may set its own cookies under its privacy policy.',
    { heading: 'Technical data' },
    'As with any website, the servers that deliver it (Vercel and Supabase) record technical data such as your IP address and the time of access, for security and to keep the website running.',
    { heading: 'How long we keep data' },
    'We keep the messages you send us for as long as needed to reply to you and continue the conversation.',
    { heading: 'Your rights' },
    'You can ask to see, correct or delete your data by contacting the parish office. You also have the right to lodge a complaint with the competent data protection supervisory authority.',
  ),
  it: richDocument(
    { heading: 'Chi tratta i dati' },
    'Il titolare del trattamento è la Parrocchia di San Marco Evangelista, Hercegovačka 157, 21000 Spalato, Croazia, telefono +385 21 367 422. Per qualsiasi domanda sui vostri dati rivolgetevi all\'ufficio parrocchiale.',
    { heading: 'Che cosa questo sito non fa' },
    'Il sito non utilizza cookie di tracciamento né strumenti di analisi, non mostra pubblicità e non registra come vi muovete al suo interno. Il sito stesso non imposta alcun cookie.',
    { heading: 'Quando ci contattate' },
    'Modulo e-mail: raccogliamo nome e cognome, indirizzo e-mail e il messaggio che scrivete, e li usiamo solo per rispondervi. Il messaggio viene recapitato all\'ufficio parrocchiale via e-mail tramite il servizio Resend.',
    'WhatsApp: se scegliete WhatsApp, il vostro messaggio si apre nell\'app WhatsApp e la conversazione prosegue lì, secondo l\'informativa sulla privacy di WhatsApp.',
    { heading: 'La mappa' },
    'La mappa nella pagina Contatti non si carica da sola. Solo quando scegliete di visualizzarla viene caricata da Google Maps; Google riceve allora il vostro indirizzo IP e può impostare propri cookie secondo la sua informativa sulla privacy.',
    { heading: 'Dati tecnici' },
    'Come per qualsiasi sito web, i server che lo distribuiscono (Vercel e Supabase) registrano dati tecnici come l\'indirizzo IP e l\'ora di accesso, per la sicurezza e il corretto funzionamento del sito.',
    { heading: 'Per quanto tempo conserviamo i dati' },
    'Conserviamo i messaggi che ci inviate per il tempo necessario a rispondervi e a proseguire la comunicazione.',
    { heading: 'I vostri diritti' },
    'Potete chiedere di accedere ai vostri dati, di correggerli o di cancellarli rivolgendovi all\'ufficio parrocchiale. Avete inoltre il diritto di proporre reclamo all\'autorità di controllo competente per la protezione dei dati.',
  ),
  pl: richDocument(
    { heading: 'Kto przetwarza dane' },
    'Administratorem danych jest Parafia św. Marka Ewangelisty, Hercegovačka 157, 21000 Split, Chorwacja, telefon +385 21 367 422. W sprawie swoich danych prosimy kontaktować się z kancelarią parafialną.',
    { heading: 'Czego ta strona nie robi' },
    'Strona nie używa plików cookie śledzących ani narzędzi analitycznych, nie wyświetla reklam i nie rejestruje, jak się po niej poruszasz. Sama strona nie zapisuje żadnych plików cookie.',
    { heading: 'Gdy się z nami kontaktujesz' },
    'Formularz e-mail: zbieramy imię i nazwisko, adres e-mail oraz treść wiadomości i wykorzystujemy je wyłącznie po to, by odpowiedzieć. Wiadomość trafia do kancelarii parafialnej e-mailem za pośrednictwem usługi Resend.',
    'WhatsApp: jeśli wybierzesz WhatsApp, Twoja wiadomość otworzy się w aplikacji WhatsApp, a dalsza rozmowa toczy się tam, zgodnie z polityką prywatności WhatsApp.',
    { heading: 'Mapa' },
    'Mapa na stronie Kontakt nie ładuje się sama. Dopiero gdy zdecydujesz się ją wyświetlić, ładuje się z Map Google; Google otrzymuje wtedy Twój adres IP i może zapisać własne pliki cookie zgodnie ze swoją polityką prywatności.',
    { heading: 'Dane techniczne' },
    'Jak w przypadku każdej strony internetowej, serwery, które ją udostępniają (Vercel i Supabase), rejestrują dane techniczne, takie jak adres IP i czas dostępu, ze względów bezpieczeństwa i dla prawidłowego działania strony.',
    { heading: 'Jak długo przechowujemy dane' },
    'Wiadomości, które do nas wysyłasz, przechowujemy tak długo, jak to konieczne, by odpowiedzieć i kontynuować rozmowę.',
    { heading: 'Twoje prawa' },
    'Możesz zażądać dostępu do swoich danych, ich sprostowania lub usunięcia, kontaktując się z kancelarią parafialną. Masz też prawo wnieść skargę do właściwego organu nadzorczego ds. ochrony danych osobowych.',
  ),
}

export const privacyPage: Record<Locale, Doc> = {
  hr: {
    eyebrow: 'Privatnost',
    title: 'Zaštita osobnih podataka',
    intro: 'Kako ova mrežna stranica postupa s vašim podacima — kratko i bez sitnih slova.',
    body: privacyBody.hr,
    updatedAtLabel: '4. studenoga 2026.',
    metaTitle: 'Zaštita osobnih podataka — Župa sv. Marka, Neslanovac',
    metaDescription: 'Koje podatke prikuplja mrežna stranica župe sv. Marka, čemu služe i kome se prosljeđuju.',
  },
  en: {
    eyebrow: 'Privacy',
    title: 'Privacy notice',
    intro: 'How this website handles your data — short and without the small print.',
    body: privacyBody.en,
    updatedAtLabel: '4 November 2026',
    metaTitle: 'Privacy notice — St Mark’s Parish, Neslanovac',
    metaDescription: 'What data the St Mark’s Parish website collects, what it is used for and who it is passed to.',
  },
  it: {
    eyebrow: 'Privacy',
    title: 'Informativa sulla privacy',
    intro: 'Come questo sito tratta i vostri dati, in breve e senza clausole nascoste.',
    body: privacyBody.it,
    updatedAtLabel: '4 novembre 2026',
    metaTitle: 'Informativa sulla privacy — Parrocchia di San Marco, Neslanovac',
    metaDescription: 'Quali dati raccoglie il sito della Parrocchia di San Marco, a che cosa servono e a chi vengono trasmessi.',
  },
  pl: {
    eyebrow: 'Prywatność',
    title: 'Ochrona danych osobowych',
    intro: 'Jak ta strona postępuje z Twoimi danymi — krótko i bez drobnego druku.',
    body: privacyBody.pl,
    updatedAtLabel: '4 listopada 2026',
    metaTitle: 'Ochrona danych osobowych — Parafia św. Marka, Neslanovac',
    metaDescription: 'Jakie dane zbiera strona Parafii św. Marka, do czego służą i komu są przekazywane.',
  },
}
