/**
 * Localized copy for every seeded collection document, in all four locales.
 *
 * Documents are keyed by something that does not change between locales — a
 * category key, a link URL, an image filename, a news slug — so the seed can
 * find each one again on re-runs without relying on database ids.
 *
 * The first three news items retell real events reported by IKA, in our own
 * words; the rest are placeholder announcements for the office to replace.
 */
import { richText } from '../rich-text'
import type { ImageIds, Locale } from './globals'

type Text = { title: string; description: string }

/* ---------------------------------------------------------- categories --- */

export const categories: Record<'obavijesti' | 'slavlja' | 'zajednice', Record<Locale, Text>> = {
  obavijesti: {
    hr: { title: 'Obavijesti', description: 'Promjene u rasporedu i kratke obavijesti župnog ureda.' },
    en: { title: 'Announcements', description: 'Schedule changes and short notices from the parish office.' },
    it: { title: 'Avvisi', description: 'Variazioni d’orario e brevi avvisi dell’ufficio parrocchiale.' },
    pl: { title: 'Ogłoszenia', description: 'Zmiany w porządku i krótkie ogłoszenia kancelarii parafialnej.' },
  },
  slavlja: {
    hr: { title: 'Slavlja', description: 'Blagdani, župno slavlje i sakramentna slavlja.' },
    en: { title: 'Celebrations', description: 'Feast days, the parish feast and sacramental celebrations.' },
    it: { title: 'Celebrazioni', description: 'Feste, festa patronale e celebrazioni dei sacramenti.' },
    pl: { title: 'Uroczystości', description: 'Święta, odpust parafialny i uroczystości sakramentalne.' },
  },
  zajednice: {
    hr: { title: 'Zajednice', description: 'Vjeronauk, ministranti, VIS i župne zajednice.' },
    en: { title: 'Groups', description: 'Catechesis, altar servers, the youth band and parish groups.' },
    it: { title: 'Gruppi', description: 'Catechesi, ministranti, gruppo musicale e gruppi parrocchiali.' },
    pl: { title: 'Wspólnoty', description: 'Katecheza, ministranci, zespół muzyczny i wspólnoty parafialne.' },
  },
}

export type CategoryKey = keyof typeof categories

/* --------------------------------------------------------------- links --- */

export const links: {
  url: string
  group: 'crkva' | 'duhovnost' | 'zajednica'
  order: number
  text: Record<Locale, Text>
}[] = [
  {
    url: 'https://smn.hr/',
    group: 'crkva',
    order: 1,
    text: {
      hr: { title: 'Splitsko-makarska nadbiskupija', description: 'Službene stranice nadbiskupije: vijesti, popis župa i dokumenti.' },
      en: { title: 'Archdiocese of Split-Makarska', description: 'Official archdiocese website: news, list of parishes and documents.' },
      it: { title: 'Arcidiocesi di Spalato-Macarsca', description: 'Sito ufficiale dell’arcidiocesi: notizie, elenco delle parrocchie e documenti.' },
      pl: { title: 'Archidiecezja splicko-makarska', description: 'Oficjalna strona archidiecezji: wiadomości, wykaz parafii i dokumenty.' },
    },
  },
  {
    url: 'https://smn.hr/split-neslanovac',
    group: 'crkva',
    order: 2,
    text: {
      hr: { title: 'Naša župa na stranicama nadbiskupije', description: 'Podaci o župi, povijest, crkve i popis ulica koje joj pripadaju.' },
      en: { title: 'Our parish on the archdiocese website', description: 'Parish details, history, churches and the list of streets it covers.' },
      it: { title: 'La nostra parrocchia sul sito dell’arcidiocesi', description: 'Dati sulla parrocchia, storia, chiese ed elenco delle vie che ne fanno parte.' },
      pl: { title: 'Nasza parafia na stronie archidiecezji', description: 'Dane parafii, historia, kościoły i wykaz należących do niej ulic.' },
    },
  },
  {
    url: 'https://www.hbk.hr/',
    group: 'crkva',
    order: 3,
    text: {
      hr: { title: 'Hrvatska biskupska konferencija', description: 'Dokumenti, poruke biskupa i liturgijski kalendar.' },
      en: { title: 'Croatian Bishops’ Conference', description: 'Documents, messages from the bishops and the liturgical calendar.' },
      it: { title: 'Conferenza episcopale croata', description: 'Documenti, messaggi dei vescovi e calendario liturgico.' },
      pl: { title: 'Konferencja Episkopatu Chorwacji', description: 'Dokumenty, listy biskupów i kalendarz liturgiczny.' },
    },
  },
  {
    url: 'https://ika.hkm.hr/',
    group: 'crkva',
    order: 4,
    text: {
      hr: { title: 'Informativna katolička agencija (IKA)', description: 'Dnevne vijesti iz Crkve u Hrvatskoj.' },
      en: { title: 'Catholic Information Agency (IKA)', description: 'Daily news from the Church in Croatia.' },
      it: { title: 'Agenzia d’informazione cattolica (IKA)', description: 'Notizie quotidiane dalla Chiesa in Croazia.' },
      pl: { title: 'Katolicka Agencja Informacyjna (IKA)', description: 'Codzienne wiadomości z Kościoła w Chorwacji.' },
    },
  },
  {
    url: 'https://www.vaticannews.va/hr.html',
    group: 'duhovnost',
    order: 5,
    text: {
      hr: { title: 'Vatican News — hrvatski', description: 'Papine kateheze, poruke i vijesti iz Svete Stolice.' },
      en: { title: 'Vatican News — Croatian', description: 'The Pope’s catecheses, messages and news from the Holy See.' },
      it: { title: 'Vatican News — croato', description: 'Catechesi e messaggi del Papa e notizie dalla Santa Sede.' },
      pl: { title: 'Vatican News — po chorwacku', description: 'Katechezy i orędzia papieża oraz wiadomości ze Stolicy Apostolskiej.' },
    },
  },
  {
    url: 'https://neslanovac.hr/',
    group: 'zajednica',
    order: 6,
    text: {
      hr: { title: 'Neslanovac.hr', description: 'Portal naselja s vijestima iz kotara i arhivom župnih poslanica.' },
      en: { title: 'Neslanovac.hr', description: 'Neighbourhood portal with local news and an archive of parish letters.' },
      it: { title: 'Neslanovac.hr', description: 'Portale del quartiere con notizie locali e un archivio delle lettere parrocchiali.' },
      pl: { title: 'Neslanovac.hr', description: 'Portal dzielnicy z wiadomościami lokalnymi i archiwum listów parafialnych.' },
    },
  },
]

/* -------------------------------------------------------------- images --- */

const IKA_2025 = 'Danijela Musulin / IKA'
const IKA_2019 = 'Slavko Blažić / IKA'
const photo: Record<Locale, string> = { hr: 'Foto', en: 'Photo', it: 'Foto', pl: 'Fot.' }

type ImageText = { alt: Record<Locale, string>; caption: Record<Locale, string>; credit: string }

export const images: Record<keyof ImageIds, { file: string } & ImageText> = {
  procesija: {
    file: 'procesija-kip-sv-marka-2025.jpg',
    credit: IKA_2025,
    alt: {
      hr: 'Novi kip sv. Marka na ulici ispred crkve prije procesije, uz svećenika i ministrante',
      en: 'The new statue of St Mark in the street outside the church before the procession, with a priest and altar servers',
      it: 'La nuova statua di San Marco in strada davanti alla chiesa prima della processione, con un sacerdote e i ministranti',
      pl: 'Nowa figura św. Marka na ulicy przed kościołem przed procesją, z kapłanem i ministrantami',
    },
    caption: {
      hr: 'Blagdan sv. Marka 2025. — novi kip prije procesije.',
      en: 'Feast of St Mark 2025 — the new statue before the procession.',
      it: 'Festa di San Marco 2025 — la nuova statua prima della processione.',
      pl: 'Uroczystość św. Marka 2025 — nowa figura przed procesją.',
    },
  },
  freske2025: {
    file: 'crkva-unutrasnjost-freske-2025.jpg',
    credit: IKA_2025,
    alt: {
      hr: 'Unutrašnjost crkve sv. Marka s oslikanim frizom iznad prezbiterija, puna vjernika',
      en: 'Interior of St Mark’s Church with the painted frieze above the sanctuary, full of worshippers',
      it: 'L’interno della chiesa di San Marco con il fregio dipinto sopra il presbiterio, gremito di fedeli',
      pl: 'Wnętrze kościoła św. Marka z malowanym fryzem nad prezbiterium, pełne wiernych',
    },
    caption: {
      hr: 'Unutrašnjost župne crkve.',
      en: 'Inside the parish church.',
      it: 'L’interno della chiesa parrocchiale.',
      pl: 'Wnętrze kościoła parafialnego.',
    },
  },
  homilija2025: {
    file: 'nadbiskup-krizic-homilija-2025.jpg',
    credit: IKA_2025,
    alt: {
      hr: 'Nadbiskup Zdenko Križić propovijeda s ambona pred okupljenim vjernicima',
      en: 'Archbishop Zdenko Križić preaching from the ambo to the congregation',
      it: 'L’arcivescovo Zdenko Križić predica dall’ambone ai fedeli riuniti',
      pl: 'Arcybiskup Zdenko Križić głosi homilię z ambony do zgromadzonych wiernych',
    },
    caption: {
      hr: 'Nadbiskup Zdenko Križić na blagdan sv. Marka 2025.',
      en: 'Archbishop Zdenko Križić on the feast of St Mark 2025.',
      it: 'L’arcivescovo Zdenko Križić nella festa di San Marco 2025.',
      pl: 'Arcybiskup Zdenko Križić w uroczystość św. Marka 2025.',
    },
  },
  misa2025: {
    file: 'misa-blagdan-sv-marka-2025.jpg',
    credit: IKA_2025,
    alt: {
      hr: 'Nadbiskup i svećenici za oltarom tijekom mise na blagdan sv. Marka',
      en: 'The archbishop and priests at the altar during Mass on the feast of St Mark',
      it: 'L’arcivescovo e i sacerdoti all’altare durante la Messa nella festa di San Marco',
      pl: 'Arcybiskup i kapłani przy ołtarzu podczas Mszy w uroczystość św. Marka',
    },
    caption: {
      hr: 'Misa na blagdan sv. Marka 2025.',
      en: 'Mass on the feast of St Mark 2025.',
      it: 'La Messa nella festa di San Marco 2025.',
      pl: 'Msza w uroczystość św. Marka 2025.',
    },
  },
  misa2019: {
    file: 'obljetnica-25-misa-2019.jpg',
    credit: IKA_2019,
    alt: {
      hr: 'Puna crkva sv. Marka tijekom mise za 25. obljetnicu župe',
      en: 'A full St Mark’s Church during the Mass for the parish’s 25th anniversary',
      it: 'La chiesa di San Marco gremita durante la Messa per il 25° anniversario della parrocchia',
      pl: 'Pełny kościół św. Marka podczas Mszy z okazji 25-lecia parafii',
    },
    caption: {
      hr: '25. obljetnica župe, prosinac 2019.',
      en: 'The parish’s 25th anniversary, December 2019.',
      it: '25° anniversario della parrocchia, dicembre 2019.',
      pl: '25-lecie parafii, grudzień 2019.',
    },
  },
  freske2019: {
    file: 'obljetnica-25-freske-2019.jpg',
    credit: IKA_2019,
    alt: {
      hr: 'Oslikani friz u crkvi sv. Marka s prizorima iz Kristova života',
      en: 'The painted frieze in St Mark’s Church with scenes from the life of Christ',
      it: 'Il fregio dipinto nella chiesa di San Marco con scene della vita di Cristo',
      pl: 'Malowany fryz w kościele św. Marka ze scenami z życia Chrystusa',
    },
    caption: {
      hr: 'Oslik crkve sv. Marka.',
      en: 'The paintings of St Mark’s Church.',
      it: 'Le pitture della chiesa di San Marco.',
      pl: 'Malowidła kościoła św. Marka.',
    },
  },
  oltar2019: {
    file: 'obljetnica-25-oltar-2019.jpg',
    credit: IKA_2019,
    alt: {
      hr: 'Nadbiskup Marin Barišić s ministrantima i svećenicima kod oltara',
      en: 'Archbishop Marin Barišić with altar servers and priests at the altar',
      it: 'L’arcivescovo Marin Barišić con i ministranti e i sacerdoti all’altare',
      pl: 'Arcybiskup Marin Barišić z ministrantami i kapłanami przy ołtarzu',
    },
    caption: {
      hr: '25. obljetnica župe, prosinac 2019.',
      en: 'The parish’s 25th anniversary, December 2019.',
      it: '25° anniversario della parrocchia, dicembre 2019.',
      pl: '25-lecie parafii, grudzień 2019.',
    },
  },
  krstenje2019: {
    file: 'obljetnica-25-krstenje-2019.jpg',
    credit: IKA_2019,
    alt: {
      hr: 'Nadbiskup Marin Barišić krsti dijete tijekom mise',
      en: 'Archbishop Marin Barišić baptising a child during Mass',
      it: 'L’arcivescovo Marin Barišić battezza un bambino durante la Messa',
      pl: 'Arcybiskup Marin Barišić chrzci dziecko podczas Mszy',
    },
    caption: {
      hr: 'Krštenje na 25. obljetnici župe.',
      en: 'A baptism at the parish’s 25th anniversary.',
      it: 'Un battesimo nel 25° anniversario della parrocchia.',
      pl: 'Chrzest w 25. rocznicę parafii.',
    },
  },
}

export const imageCaption = (image: ImageText, locale: Locale) =>
  `${image.caption[locale]} ${photo[locale]}: ${image.credit}`

/* ---------------------------------------------------------------- news --- */

type NewsText = { title: string; excerpt: string; body: string[] }

export const news: {
  slug: string
  category: CategoryKey
  publishedAt: string
  featured: boolean
  cover: keyof ImageIds
  gallery: (keyof ImageIds)[]
  text: Record<Locale, NewsText>
}[] = [
  {
    slug: 'blagdan-sv-marka-i-30-godina-zupe',
    category: 'slavlja',
    publishedAt: '2025-04-25T18:00:00.000Z',
    featured: true,
    cover: 'procesija',
    gallery: ['homilija2025', 'misa2025', 'freske2025'],
    text: {
      hr: {
        title: 'Blagdan sv. Marka i 30 godina župe',
        excerpt:
          'Na blagdan svoga zaštitnika župa je proslavila i trideset godina postojanja. Misu je predvodio nadbiskup Zdenko Križić, koji je blagoslovio i novi kip sv. Marka.',
        body: [
          'Na blagdan sv. Marka Evanđelista, 25. travnja 2025., naša je župa proslavila svoga nebeskog zaštitnika i trideset godina postojanja. Slavlje je započelo procesijom ulicama Neslanovca u kojoj je nošen novi kip sv. Marka.',
          'Svečanu svetu misu predvodio je splitsko-makarski nadbiskup Zdenko Križić. Suslavili su župnik don Roko Celent, don Ante Delić i nadbiskupov tajnik don Renato Pudar, a liturgijsko pjevanje predvodio je župni VIS Sveti Marko.',
          'U homiliji je nadbiskup govorio o susretu uskrsloga Isusa s učenicima: Krista prepoznajemo po ljubavi, a pravi učenik ne postoji bez poniznosti i služenja. Poruku sv. Marka sažeo je u poziv da upoznamo Isusa onakvoga kakvim ga prikazuje Evanđelje i da po tome živimo.',
          'Nakon homilije nadbiskup je blagoslovio novi kip sv. Marka. Don Roko zahvalio je svima koji su pripremili slavlje i pomogli da župa dobije kip, a nadbiskup je čestitao obljetnicu i potaknuo obitelji da i dalje dovode djecu na misu.',
          'Budući da se blagdan poklapa s Danom gradskoga kotara Neslanovac, druženje se nastavilo agapeom ispred crkve.',
          'Izvor: IKA. Fotografije: Danijela Musulin.',
        ],
      },
      en: {
        title: 'Feast of St Mark and 30 years of the parish',
        excerpt:
          'On the feast of its patron the parish also celebrated thirty years of existence. Archbishop Zdenko Križić presided at Mass and blessed a new statue of St Mark.',
        body: [
          'On the feast of St Mark the Evangelist, 25 April 2025, our parish celebrated its heavenly patron and thirty years of existence. The celebration began with a procession through the streets of Neslanovac carrying a new statue of St Mark.',
          'The solemn Mass was celebrated by Archbishop Zdenko Križić of Split-Makarska, with parish priest Fr Roko Celent, Fr Ante Delić and the archbishop’s secretary Fr Renato Pudar concelebrating. The singing was led by the parish youth band VIS Sveti Marko.',
          'In his homily the archbishop spoke about the risen Jesus meeting his disciples: we recognise Christ by love, and there is no true disciple without humility and service. He summed up St Mark’s message as a call to know Jesus as the Gospel presents him, and to live accordingly.',
          'After the homily the archbishop blessed the new statue. Fr Roko thanked everyone who prepared the feast and helped the parish acquire the statue, and the archbishop congratulated the parish on its anniversary and encouraged families to keep bringing their children to Mass.',
          'As the feast coincides with Neslanovac district day, the celebration continued with an agape outside the church.',
          'Source: IKA. Photos: Danijela Musulin.',
        ],
      },
      it: {
        title: 'Festa di San Marco e 30 anni della parrocchia',
        excerpt:
          'Nella festa del suo patrono la parrocchia ha celebrato anche trent’anni di vita. Ha presieduto la Messa l’arcivescovo Zdenko Križić, che ha benedetto una nuova statua di San Marco.',
        body: [
          'Nella festa di San Marco Evangelista, il 25 aprile 2025, la nostra parrocchia ha celebrato il suo patrono celeste e trent’anni di vita. La festa è iniziata con una processione per le vie di Neslanovac con la nuova statua di San Marco.',
          'La Messa solenne è stata presieduta dall’arcivescovo di Spalato-Macarsca Zdenko Križić. Hanno concelebrato il parroco don Roko Celent, don Ante Delić e il segretario dell’arcivescovo don Renato Pudar; il canto è stato animato dal gruppo musicale giovanile VIS Sveti Marko.',
          'Nell’omelia l’arcivescovo ha parlato dell’incontro di Gesù risorto con i discepoli: Cristo si riconosce dall’amore, e non c’è vero discepolo senza umiltà e servizio. Ha riassunto il messaggio di San Marco nell’invito a conoscere Gesù così come lo presenta il Vangelo e a vivere di conseguenza.',
          'Dopo l’omelia l’arcivescovo ha benedetto la nuova statua. Don Roko ha ringraziato quanti hanno preparato la festa e aiutato la parrocchia ad avere la statua; l’arcivescovo si è congratulato per l’anniversario e ha incoraggiato le famiglie a continuare a portare i bambini a Messa.',
          'Poiché la festa coincide con la giornata del quartiere di Neslanovac, si è proseguito con un’agape davanti alla chiesa.',
          'Fonte: IKA. Foto: Danijela Musulin.',
        ],
      },
      pl: {
        title: 'Uroczystość św. Marka i 30 lat parafii',
        excerpt:
          'W uroczystość swojego patrona parafia świętowała także trzydziestolecie istnienia. Mszy przewodniczył arcybiskup Zdenko Križić, który poświęcił nową figurę św. Marka.',
        body: [
          'W uroczystość św. Marka Ewangelisty, 25 kwietnia 2025 roku, nasza parafia świętowała swojego niebieskiego patrona i trzydziestolecie istnienia. Uroczystość rozpoczęła się procesją ulicami Neslanovca z nową figurą św. Marka.',
          'Uroczystej Mszy przewodniczył arcybiskup splicko-makarski Zdenko Križić. Koncelebrowali proboszcz ks. Roko Celent, ks. Ante Delić i sekretarz arcybiskupa ks. Renato Pudar, a śpiew prowadził parafialny zespół młodzieżowy VIS Sveti Marko.',
          'W homilii arcybiskup mówił o spotkaniu zmartwychwstałego Jezusa z uczniami: Chrystusa rozpoznajemy po miłości, a nie ma prawdziwego ucznia bez pokory i służby. Przesłanie św. Marka streścił jako wezwanie, by poznać Jezusa takim, jakim przedstawia Go Ewangelia, i według tego żyć.',
          'Po homilii arcybiskup poświęcił nową figurę. Ks. Roko podziękował wszystkim, którzy przygotowali uroczystość i pomogli parafii w nabyciu figury, a arcybiskup pogratulował jubileuszu i zachęcił rodziny, by nadal przyprowadzały dzieci na Mszę.',
          'Ponieważ uroczystość przypada w dniu święta dzielnicy Neslanovac, spotkanie trwało dalej przy agapie przed kościołem.',
          'Źródło: IKA. Zdjęcia: Danijela Musulin.',
        ],
      },
    },
  },
  {
    slug: '25-obljetnica-zupe-sv-marka',
    category: 'slavlja',
    publishedAt: '2019-12-22T11:00:00.000Z',
    featured: false,
    cover: 'misa2019',
    gallery: ['freske2019', 'oltar2019', 'krstenje2019'],
    text: {
      hr: {
        title: '25. obljetnica župe sv. Marka',
        excerpt:
          'Na četvrtu nedjelju došašća 2019. župa je proslavila 25 godina postojanja euharistijskim slavljem koje je predvodio nadbiskup Marin Barišić.',
        body: [
          'Na četvrtu nedjelju došašća, 22. prosinca 2019., župa sv. Marka proslavila je 25. obljetnicu postojanja. Svečano euharistijsko slavlje predvodio je splitsko-makarski nadbiskup i metropolit Marin Barišić.',
          'Suslavili su tadašnji župnik don Šimun Doljanin, don Roko Celent i don Renato Mrčela, a za oltarom je služio đakon Nikola Šakić, nadbiskupov tajnik. Pjevao je župni zbor.',
          'Župa je osnovana u došašću 1994. i prve je godine živjela u montažnoj crkvi koju je darovao Caritas iz Venecije. Mise se u novoj crkvi slave od 2003., a crkva je posvećena 2005. godine.',
          'U homiliji je nadbiskup, polazeći od lika sv. Josipa, pozvao očeve da budu kršćani koji brinu za svoju djecu i obitelj. Tijekom mise krstio je četvrto dijete jedne župne obitelji, kojoj je nadbiskupija uručila i dar namijenjen obiteljima s četvero i više djece.',
          'Župa se za obljetnicu pripremila trodnevnicom koju su predvodili don Alojzije Bavčević, don Ivan Matković i don Carlos Taborda.',
          'Izvor: IKA. Fotografije: Slavko Blažić.',
        ],
      },
      en: {
        title: '25th anniversary of St Mark’s Parish',
        excerpt:
          'On the Fourth Sunday of Advent 2019 the parish celebrated 25 years of existence with a Mass presided over by Archbishop Marin Barišić.',
        body: [
          'On the Fourth Sunday of Advent, 22 December 2019, St Mark’s Parish celebrated its 25th anniversary. The solemn Mass was presided over by Archbishop and Metropolitan Marin Barišić of Split-Makarska.',
          'Concelebrating were the then parish priest Fr Šimun Doljanin, Fr Roko Celent and Fr Renato Mrčela, with the archbishop’s secretary, Deacon Nikola Šakić, serving at the altar. The parish choir sang.',
          'The parish was founded in Advent 1994 and spent its first years in a prefabricated church donated by Caritas of Venice. Mass has been celebrated in the new church since 2003, and the church was consecrated in 2005.',
          'Taking St Joseph as his starting point, the archbishop called on fathers to be Christians who care for their children and families. During the Mass he baptised the fourth child of a parish family, who also received the archdiocese’s gift for families with four or more children.',
          'The parish prepared for the anniversary with a triduum led by Fr Alojzije Bavčević, Fr Ivan Matković and Fr Carlos Taborda.',
          'Source: IKA. Photos: Slavko Blažić.',
        ],
      },
      it: {
        title: '25° anniversario della Parrocchia di San Marco',
        excerpt:
          'Nella quarta domenica di Avvento del 2019 la parrocchia ha celebrato 25 anni di vita con la Messa presieduta dall’arcivescovo Marin Barišić.',
        body: [
          'Nella quarta domenica di Avvento, il 22 dicembre 2019, la Parrocchia di San Marco ha celebrato il 25° anniversario. La solenne celebrazione eucaristica è stata presieduta dall’arcivescovo metropolita di Spalato-Macarsca Marin Barišić.',
          'Hanno concelebrato l’allora parroco don Šimun Doljanin, don Roko Celent e don Renato Mrčela; all’altare ha servito il diacono Nikola Šakić, segretario dell’arcivescovo. Ha cantato il coro parrocchiale.',
          'La parrocchia è nata nell’Avvento del 1994 e nei primi anni si è riunita in una chiesa prefabbricata donata dalla Caritas di Venezia. Nella nuova chiesa si celebra dal 2003 e la chiesa è stata consacrata nel 2005.',
          'Partendo dalla figura di San Giuseppe, l’arcivescovo ha invitato i padri a essere cristiani che si prendono cura dei figli e della famiglia. Durante la Messa ha battezzato il quarto figlio di una famiglia della parrocchia, che ha ricevuto anche il dono dell’arcidiocesi per le famiglie con quattro o più figli.',
          'La parrocchia si è preparata all’anniversario con un triduo guidato da don Alojzije Bavčević, don Ivan Matković e don Carlos Taborda.',
          'Fonte: IKA. Foto: Slavko Blažić.',
        ],
      },
      pl: {
        title: '25-lecie Parafii św. Marka',
        excerpt:
          'W czwartą niedzielę Adwentu 2019 roku parafia świętowała 25 lat istnienia Mszą, której przewodniczył arcybiskup Marin Barišić.',
        body: [
          'W czwartą niedzielę Adwentu, 22 grudnia 2019 roku, Parafia św. Marka obchodziła 25. rocznicę istnienia. Uroczystej Eucharystii przewodniczył arcybiskup metropolita splicko-makarski Marin Barišić.',
          'Koncelebrowali ówczesny proboszcz ks. Šimun Doljanin, ks. Roko Celent i ks. Renato Mrčela, a przy ołtarzu posługiwał diakon Nikola Šakić, sekretarz arcybiskupa. Śpiewał chór parafialny.',
          'Parafia powstała w Adwencie 1994 roku i przez pierwsze lata gromadziła się w kościele z prefabrykatów, podarowanym przez Caritas z Wenecji. Msze w nowym kościele odprawiane są od 2003 roku, a kościół konsekrowano w 2005 roku.',
          'Wychodząc od postaci św. Józefa, arcybiskup wezwał ojców, by byli chrześcijanami troszczącymi się o dzieci i rodzinę. Podczas Mszy ochrzcił czwarte dziecko jednej z rodzin parafialnych, która otrzymała też dar archidiecezji dla rodzin z czworgiem i więcej dzieci.',
          'Parafia przygotowała się do jubileuszu triduum, które prowadzili ks. Alojzije Bavčević, ks. Ivan Matković i ks. Carlos Taborda.',
          'Źródło: IKA. Zdjęcia: Slavko Blažić.',
        ],
      },
    },
  },
  {
    slug: 'posveta-zupne-crkve-sv-marka',
    category: 'slavlja',
    publishedAt: '2005-01-09T11:00:00.000Z',
    featured: false,
    cover: 'freske2019',
    gallery: [],
    text: {
      hr: {
        title: 'Posveta župne crkve sv. Marka',
        excerpt:
          'Na blagdan Krštenja Gospodinova 2005. nadbiskup Marin Barišić posvetio je novu župnu crkvu sv. Marka na Neslanovcu.',
        body: [
          'Na blagdan Krštenja Gospodinova, 9. siječnja 2005., splitsko-makarski nadbiskup Marin Barišić posvetio je župnu crkvu sv. Marka Evanđelista na Neslanovcu. Suslavilo je petnaest svećenika, među njima župnik don Šimun Doljanin, generalni vikar Ivan Ćubelić i pastoralni vikar Drago Šimundža. Vjernici su ispunili crkvu i njezino predvorje.',
          'Umjetnički projekt crkve djelo je Francisca Argüella, idejni nacrt izradio je arhitekt Maurizio Bergamo, a glavni i izvedbeni projekt arhitekt Damir Rako. Betonske radove izveo je „Konstruktor”, a glavninu završnih radova „Intergradnja” i tvrtka Stanka Galića. Dio posla odradili su sami župljani.',
          'Crkva je uređena prema smjernicama Drugoga vatikanskog sabora: oltar je u središtu, a prostor je raspoređen tako da svi vjernici mogu aktivno sudjelovati u slavlju. Svetohranište je u pokrajnjoj kapelici namijenjenoj klanjanju i molitvi.',
          'Mise se u novoj crkvi slave od prve nedjelje došašća 2003., a do tada se župa okupljala u montažnoj crkvi.',
          'Izvor: IKA i Splitsko-makarska nadbiskupija. Fotografija (2019.): Slavko Blažić.',
        ],
      },
      en: {
        title: 'Consecration of St Mark’s parish church',
        excerpt:
          'On the feast of the Baptism of the Lord 2005, Archbishop Marin Barišić consecrated the new parish church of St Mark in Neslanovac.',
        body: [
          'On the feast of the Baptism of the Lord, 9 January 2005, Archbishop Marin Barišić of Split-Makarska consecrated the parish church of St Mark the Evangelist in Neslanovac. Fifteen priests concelebrated, among them parish priest Fr Šimun Doljanin, Vicar General Ivan Ćubelić and Pastoral Vicar Drago Šimundža. The faithful filled the church and its forecourt.',
          'The church’s artistic programme is the work of Francisco Argüello; the concept design is by architect Maurizio Bergamo and the main and detailed design by architect Damir Rako. The concrete work was done by Konstruktor and most of the finishing by Intergradnja and the firm of Stanko Galić. Parishioners did part of the work themselves.',
          'The church is arranged according to the guidelines of the Second Vatican Council: the altar stands at the centre and the space is laid out so that all the faithful can take an active part in the celebration. The tabernacle is in a side chapel set aside for adoration and prayer.',
          'Mass has been celebrated in the new church since the First Sunday of Advent 2003; before that the parish met in a prefabricated church.',
          'Source: IKA and the Archdiocese of Split-Makarska. Photo (2019): Slavko Blažić.',
        ],
      },
      it: {
        title: 'Consacrazione della chiesa parrocchiale di San Marco',
        excerpt:
          'Nella festa del Battesimo del Signore del 2005 l’arcivescovo Marin Barišić ha consacrato la nuova chiesa parrocchiale di San Marco a Neslanovac.',
        body: [
          'Nella festa del Battesimo del Signore, il 9 gennaio 2005, l’arcivescovo di Spalato-Macarsca Marin Barišić ha consacrato la chiesa parrocchiale di San Marco Evangelista a Neslanovac. Hanno concelebrato quindici sacerdoti, tra cui il parroco don Šimun Doljanin, il vicario generale Ivan Ćubelić e il vicario pastorale Drago Šimundža. I fedeli hanno riempito la chiesa e il sagrato.',
          'Il progetto artistico della chiesa è opera di Francisco Argüello; il progetto di massima è dell’architetto Maurizio Bergamo e quello definitivo ed esecutivo dell’architetto Damir Rako. Le opere in calcestruzzo sono state eseguite dalla Konstruktor e gran parte delle finiture dalla Intergradnja e dalla ditta di Stanko Galić. Una parte dei lavori l’hanno fatta gli stessi parrocchiani.',
          'La chiesa è sistemata secondo le indicazioni del Concilio Vaticano II: l’altare è al centro e lo spazio è disposto in modo che tutti i fedeli possano partecipare attivamente alla celebrazione. Il tabernacolo si trova in una cappella laterale destinata all’adorazione e alla preghiera.',
          'Nella nuova chiesa si celebra dalla prima domenica di Avvento del 2003; prima la parrocchia si riuniva in una chiesa prefabbricata.',
          'Fonte: IKA e Arcidiocesi di Spalato-Macarsca. Foto (2019): Slavko Blažić.',
        ],
      },
      pl: {
        title: 'Konsekracja kościoła parafialnego św. Marka',
        excerpt:
          'W święto Chrztu Pańskiego 2005 roku arcybiskup Marin Barišić konsekrował nowy kościół parafialny św. Marka w Neslanovcu.',
        body: [
          'W święto Chrztu Pańskiego, 9 stycznia 2005 roku, arcybiskup splicko-makarski Marin Barišić konsekrował kościół parafialny św. Marka Ewangelisty w Neslanovcu. Koncelebrowało piętnastu kapłanów, w tym proboszcz ks. Šimun Doljanin, wikariusz generalny Ivan Ćubelić i wikariusz ds. duszpasterstwa Drago Šimundža. Wierni wypełnili kościół i jego dziedziniec.',
          'Program artystyczny kościoła jest dziełem Francisca Argüella; koncepcję opracował architekt Maurizio Bergamo, a projekt główny i wykonawczy architekt Damir Rako. Prace betonowe wykonała firma Konstruktor, a większość prac wykończeniowych Intergradnja i firma Stanka Galicia. Część prac wykonali sami parafianie.',
          'Kościół urządzono zgodnie z wytycznymi Soboru Watykańskiego II: ołtarz stoi w centrum, a przestrzeń zaplanowano tak, by wszyscy wierni mogli czynnie uczestniczyć w liturgii. Tabernakulum znajduje się w bocznej kaplicy przeznaczonej do adoracji i modlitwy.',
          'Msze w nowym kościele odprawiane są od pierwszej niedzieli Adwentu 2003 roku; wcześniej parafia gromadziła się w kościele z prefabrykatów.',
          'Źródło: IKA i Archidiecezja splicko-makarska. Zdjęcie (2019): Slavko Blažić.',
        ],
      },
    },
  },
  {
    slug: 'dosasce-zornice-2026',
    category: 'obavijesti',
    publishedAt: '2026-11-02T09:00:00.000Z',
    featured: false,
    cover: 'freske2025',
    gallery: [],
    text: {
      hr: {
        title: 'Došašće: zornice svakog radnog dana u 6:30',
        excerpt:
          'Od ponedjeljka 30. studenoga zornice slavimo svakog radnog dana u 6:30. Večernja misa u 19:00 ostaje kao i inače.',
        body: [
          'Prva nedjelja došašća ove je godine 29. studenoga. Od sljedećeg dana, ponedjeljka 30. studenoga, pa sve do Badnjaka zornice slavimo svakog radnog dana u 6:30.',
          'Večernja sveta misa u 19:00 ostaje kao i inače, a ispovijed je pola sata prije svake mise. Pozivamo osobito obitelji s djecom i mlade da barem jednom tjedno dođu na zornicu.',
          'Božićni raspored misa objavljen je u prigodnom rasporedu na naslovnici.',
        ],
      },
      en: {
        title: 'Advent: dawn Masses every weekday at 6:30',
        excerpt:
          'From Monday 30 November we celebrate dawn Masses every weekday at 6:30. The 19:00 evening Mass continues as usual.',
        body: [
          'The First Sunday of Advent falls this year on 29 November. From the following day, Monday 30 November, until Christmas Eve we celebrate dawn Masses every weekday at 6:30.',
          'The 19:00 evening Mass continues as usual, and confession is available half an hour before every Mass. We especially invite families with children and young people to come to a dawn Mass at least once a week.',
          'The Christmas Mass times are listed in the seasonal schedule on the home page.',
        ],
      },
      it: {
        title: 'Avvento: Messe dell’aurora ogni giorno feriale alle 6:30',
        excerpt:
          'Da lunedì 30 novembre celebriamo le Messe dell’aurora ogni giorno feriale alle 6:30. La Messa vespertina delle 19:00 rimane invariata.',
        body: [
          'Quest’anno la prima domenica di Avvento cade il 29 novembre. Dal giorno successivo, lunedì 30 novembre, fino alla Vigilia di Natale celebriamo le Messe dell’aurora ogni giorno feriale alle 6:30.',
          'La Messa vespertina delle 19:00 rimane invariata e le confessioni sono mezz’ora prima di ogni Messa. Invitiamo in particolare le famiglie con bambini e i giovani a partecipare almeno una volta alla settimana.',
          'Gli orari delle Messe di Natale sono pubblicati nell’orario speciale in home page.',
        ],
      },
      pl: {
        title: 'Adwent: roraty w każdy dzień powszedni o 6:30',
        excerpt:
          'Od poniedziałku 30 listopada roraty odprawiamy w każdy dzień powszedni o 6:30. Wieczorna Msza o 19:00 bez zmian.',
        body: [
          'Pierwsza niedziela Adwentu przypada w tym roku 29 listopada. Od następnego dnia, poniedziałku 30 listopada, aż do Wigilii roraty odprawiamy w każdy dzień powszedni o 6:30.',
          'Wieczorna Msza o 19:00 pozostaje bez zmian, a spowiedź jest pół godziny przed każdą Mszą. Szczególnie zapraszamy rodziny z dziećmi i młodzież, by przynajmniej raz w tygodniu przyszli na roraty.',
          'Porządek Mszy w Boże Narodzenie znajduje się w porządku okolicznościowym na stronie głównej.',
        ],
      },
    },
  },
  {
    slug: 'vis-sveti-marko-poziva-nove-clanove',
    category: 'zajednice',
    publishedAt: '2026-10-06T09:00:00.000Z',
    featured: false,
    cover: 'misa2025',
    gallery: [],
    text: {
      hr: {
        title: 'VIS Sveti Marko poziva nove članove',
        excerpt:
          'Župni VIS traži nove pjevače i svirače. Probe su petkom nakon večernje mise, a dobrodošli su svi od osmog razreda naviše.',
        body: [
          'Župni vokalno-instrumentalni sastav Sveti Marko, koji pjeva na nedjeljnoj misi u 20:00 i na većim slavljima, poziva nove članove — pjevače i svirače gitare, klavijatura, bas-gitare i udaraljki.',
          'Probe se održavaju petkom nakon večernje svete mise u prostorijama uz crkvu. Dobrodošli su svi od osmog razreda osnovne škole naviše; dovoljna je volja i redovitost dolaska.',
          'Zainteresirani se mogu javiti nakon nedjeljne mise u 20:00 ili u župnom uredu.',
        ],
      },
      en: {
        title: 'VIS Sveti Marko welcomes new members',
        excerpt:
          'The parish youth band is looking for new singers and musicians. Rehearsals are on Fridays after the evening Mass, and everyone from eighth grade up is welcome.',
        body: [
          'The parish vocal and instrumental group VIS Sveti Marko, which sings at the Sunday 20:00 Mass and at major celebrations, is looking for new members — singers, and players of guitar, keyboards, bass and percussion.',
          'Rehearsals take place on Fridays after the evening Mass in the rooms next to the church. Everyone from the eighth grade of primary school upwards is welcome; all it takes is willingness and regular attendance.',
          'If you are interested, speak to us after the Sunday 20:00 Mass or contact the parish office.',
        ],
      },
      it: {
        title: 'Il VIS Sveti Marko cerca nuovi membri',
        excerpt:
          'Il gruppo musicale giovanile della parrocchia cerca nuovi cantanti e musicisti. Le prove sono il venerdì dopo la Messa vespertina; sono benvenuti tutti dall’ottava classe in su.',
        body: [
          'Il gruppo vocale e strumentale parrocchiale VIS Sveti Marko, che anima la Messa domenicale delle 20:00 e le celebrazioni più importanti, cerca nuovi membri: cantanti e musicisti di chitarra, tastiere, basso e percussioni.',
          'Le prove si tengono il venerdì dopo la Messa vespertina nei locali accanto alla chiesa. Sono benvenuti tutti dall’ottava classe della scuola elementare in su; bastano buona volontà e costanza.',
          'Chi è interessato può farsi avanti dopo la Messa domenicale delle 20:00 o rivolgersi all’ufficio parrocchiale.',
        ],
      },
      pl: {
        title: 'VIS Sveti Marko zaprasza nowych członków',
        excerpt:
          'Parafialny zespół młodzieżowy szuka nowych wokalistów i muzyków. Próby są w piątki po wieczornej Mszy, zapraszamy wszystkich od ósmej klasy wzwyż.',
        body: [
          'Parafialny zespół wokalno-instrumentalny VIS Sveti Marko, który śpiewa na niedzielnej Mszy o 20:00 i podczas większych uroczystości, zaprasza nowych członków — wokalistów oraz grających na gitarze, instrumentach klawiszowych, basie i perkusji.',
          'Próby odbywają się w piątki po wieczornej Mszy w salkach przy kościele. Zapraszamy wszystkich od ósmej klasy szkoły podstawowej wzwyż; wystarczy chęć i regularność.',
          'Zainteresowani mogą zgłosić się po niedzielnej Mszy o 20:00 lub w kancelarii parafialnej.',
        ],
      },
    },
  },
  {
    slug: 'upisi-na-vjeronauk-2026-2027',
    category: 'zajednice',
    publishedAt: '2026-09-08T09:00:00.000Z',
    featured: false,
    cover: 'oltar2019',
    gallery: [],
    text: {
      hr: {
        title: 'Upisi na župni vjeronauk 2026./2027.',
        excerpt:
          'Upisi za pripravu za prvu pričest i krizmu traju do kraja rujna u župnom uredu. Župni vjeronauk počinje u listopadu.',
        body: [
          'Roditelji djece koja ove školske godine pristupaju prvoj svetoj pričesti ili krizmi neka ih upišu u župnom uredu do 30. rujna, u radno vrijeme ureda.',
          'Za upis je potreban krsni list, ako dijete nije kršteno u našoj župi. Župni vjeronauk počinje u listopadu, a raspored susreta po skupinama bit će objavljen na misama i u župnim vijestima.',
          'Pozivamo i djecu koja žele postati ministranti da se jave nakon nedjeljne mise u 11:00.',
        ],
      },
      en: {
        title: 'Parish catechesis enrolment 2026/2027',
        excerpt:
          'Enrolment for First Communion and Confirmation preparation is open at the parish office until the end of September. Parish catechesis starts in October.',
        body: [
          'Parents of children receiving First Holy Communion or Confirmation this school year are asked to enrol them at the parish office by 30 September, during office hours.',
          'A baptismal certificate is needed if the child was not baptised in our parish. Parish catechesis begins in October, and the group timetable will be announced at Mass and in the parish news.',
          'Children who would like to become altar servers are also invited to come forward after the Sunday 11:00 Mass.',
        ],
      },
      it: {
        title: 'Iscrizioni alla catechesi parrocchiale 2026/2027',
        excerpt:
          'Le iscrizioni alla preparazione alla Prima Comunione e alla Cresima sono aperte all’ufficio parrocchiale fino alla fine di settembre. La catechesi inizia a ottobre.',
        body: [
          'I genitori dei bambini che quest’anno scolastico riceveranno la Prima Comunione o la Cresima sono pregati di iscriverli all’ufficio parrocchiale entro il 30 settembre, negli orari d’apertura.',
          'Se il bambino non è stato battezzato nella nostra parrocchia serve il certificato di battesimo. La catechesi parrocchiale inizia a ottobre e il calendario degli incontri per gruppi sarà annunciato durante le Messe e nelle notizie parrocchiali.',
          'Invitiamo anche i bambini che desiderano diventare ministranti a presentarsi dopo la Messa domenicale delle 11:00.',
        ],
      },
      pl: {
        title: 'Zapisy na katechezę parafialną 2026/2027',
        excerpt:
          'Zapisy na przygotowanie do Pierwszej Komunii i bierzmowania trwają w kancelarii do końca września. Katecheza parafialna rusza w październiku.',
        body: [
          'Rodzice dzieci, które w tym roku szkolnym przystąpią do Pierwszej Komunii Świętej lub bierzmowania, proszeni są o zapisanie ich w kancelarii parafialnej do 30 września, w godzinach jej pracy.',
          'Jeśli dziecko nie było ochrzczone w naszej parafii, potrzebne jest świadectwo chrztu. Katecheza parafialna rozpoczyna się w październiku, a plan spotkań grup zostanie ogłoszony na Mszach i w aktualnościach.',
          'Zapraszamy też dzieci, które chcą zostać ministrantami, by zgłosiły się po niedzielnej Mszy o 11:00.',
        ],
      },
    },
  },
  {
    slug: 'blagoslov-obitelji-i-domova-2026',
    category: 'obavijesti',
    publishedAt: '2026-01-07T09:00:00.000Z',
    featured: false,
    cover: 'krstenje2019',
    gallery: [],
    text: {
      hr: {
        title: 'Blagoslov obitelji i domova',
        excerpt:
          'Nakon Bogojavljenja svećenik obilazi domove župljana. Raspored po ulicama najavljuje se nedjeljom na misama.',
        body: [
          'U vremenu nakon Bogojavljenja započinje blagoslov obitelji i domova. Svećenik obilazi domove župljana po ulicama, prema rasporedu koji se najavljuje nedjeljom na misama i na oglasnoj ploči uz crkvu.',
          'Obitelji koje toga dana neće biti kod kuće mogu se javiti u župni ured i dogovoriti drugi termin.',
        ],
      },
      en: {
        title: 'Blessing of families and homes',
        excerpt:
          'After Epiphany the priest visits parishioners’ homes. The street-by-street schedule is announced at Sunday Masses.',
        body: [
          'In the weeks after Epiphany the blessing of families and homes begins. The priest visits parishioners street by street, following a schedule announced at Sunday Masses and on the noticeboard by the church.',
          'Families who will not be at home on their day can contact the parish office to arrange another time.',
        ],
      },
      it: {
        title: 'Benedizione delle famiglie e delle case',
        excerpt:
          'Dopo l’Epifania il sacerdote visita le case dei parrocchiani. Il calendario per vie viene annunciato durante le Messe domenicali.',
        body: [
          'Nelle settimane dopo l’Epifania inizia la benedizione delle famiglie e delle case. Il sacerdote visita i parrocchiani via per via, secondo un calendario annunciato durante le Messe domenicali e sulla bacheca accanto alla chiesa.',
          'Le famiglie che quel giorno non saranno in casa possono rivolgersi all’ufficio parrocchiale per fissare un altro momento.',
        ],
      },
      pl: {
        title: 'Błogosławieństwo rodzin i domów',
        excerpt:
          'Po Objawieniu Pańskim kapłan odwiedza domy parafian. Plan kolędy według ulic ogłaszany jest na niedzielnych Mszach.',
        body: [
          'W tygodniach po Objawieniu Pańskim rozpoczyna się błogosławieństwo rodzin i domów. Kapłan odwiedza parafian ulica po ulicy, według planu ogłaszanego na niedzielnych Mszach i na tablicy ogłoszeń przy kościele.',
          'Rodziny, których nie będzie w domu w wyznaczonym dniu, mogą umówić inny termin w kancelarii parafialnej.',
        ],
      },
    },
  },
]

export const newsContent = (text: NewsText) => ({
  title: text.title,
  excerpt: text.excerpt,
  content: richText(...text.body),
})
