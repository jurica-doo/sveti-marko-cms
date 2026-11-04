/**
 * Parish news, from events reported publicly about the parish.
 *
 * Each item is retold in our own words from the source named in its last
 * paragraph (IKA — Informativna katolička agencija), not copied. Photos are
 * IKA's, credited in each image's caption.
 *
 * Shared by `seed.ts` and any one-off insert script, so the two can never drift
 * apart.
 */
import { richText } from './rich-text'

type CategoryIds = Record<string, number | string>
type ImageIds = Record<string, number | string>

export const parishNews = (categoryIds: CategoryIds, images: ImageIds) => [
  {
    title: 'Blagdan sv. Marka i 30 godina župe',
    slug: 'blagdan-sv-marka-i-30-godina-zupe',
    publishedAt: new Date('2025-04-25T18:00:00.000Z').toISOString(),
    category: categoryIds['Slavlja'],
    featured: true,
    coverImage: images.procesija,
    excerpt:
      'Na blagdan svoga zaštitnika župa je proslavila i trideset godina postojanja. Misu je predvodio nadbiskup Zdenko Križić, koji je blagoslovio i novi kip sv. Marka.',
    content: richText(
      'Na blagdan sv. Marka Evanđelista, 25. travnja 2025., naša je župa proslavila svoga nebeskog zaštitnika i trideset godina postojanja. Slavlje je započelo procesijom ulicama Neslanovca u kojoj je nošen novi kip sv. Marka.',
      'Svečanu svetu misu predvodio je splitsko-makarski nadbiskup Zdenko Križić. Suslavili su župnik don Roko Celent, don Ante Delić i nadbiskupov tajnik don Renato Pudar, a liturgijsko pjevanje predvodio je župni VIS Sveti Marko.',
      'U homiliji je nadbiskup govorio o susretu uskrsloga Isusa s učenicima: Krista prepoznajemo po ljubavi, a pravi učenik ne postoji bez poniznosti i služenja. Poruku sv. Marka sažeo je u poziv da upoznamo Isusa onakvoga kakvim ga prikazuje Evanđelje i da po tome živimo.',
      'Nakon homilije nadbiskup je blagoslovio novi kip sv. Marka. Don Roko zahvalio je svima koji su pripremili slavlje i pomogli da župa dobije kip, a nadbiskup je čestitao obljetnicu i potaknuo obitelji da i dalje dovode djecu na misu.',
      'Budući da se blagdan poklapa s Danom gradskoga kotara Neslanovac, druženje se nastavilo agapeom ispred crkve.',
      'Izvor: IKA. Fotografije: Danijela Musulin.',
    ),
    gallery: [
      { image: images.homilija2025 },
      { image: images.misa2025 },
      { image: images.freske2025 },
    ],
    author: 'Župni ured',
    _status: 'published',
  },
  {
    title: '25. obljetnica župe sv. Marka',
    slug: '25-obljetnica-zupe-sv-marka',
    publishedAt: new Date('2019-12-22T11:00:00.000Z').toISOString(),
    category: categoryIds['Slavlja'],
    featured: false,
    coverImage: images.misa2019,
    excerpt:
      'Na četvrtu nedjelju došašća 2019. župa je proslavila 25 godina postojanja euharistijskim slavljem koje je predvodio nadbiskup Marin Barišić.',
    content: richText(
      'Na četvrtu nedjelju došašća, 22. prosinca 2019., župa sv. Marka proslavila je 25. obljetnicu postojanja. Svečano euharistijsko slavlje predvodio je splitsko-makarski nadbiskup i metropolit Marin Barišić.',
      'Suslavili su tadašnji župnik don Šimun Doljanin, don Roko Celent i don Renato Mrčela, a za oltarom je služio đakon Nikola Šakić, nadbiskupov tajnik. Pjevao je župni zbor.',
      'Župa je osnovana u došašću 1994. i prve je godine živjela u montažnoj crkvi koju je darovao Caritas iz Venecije. Mise se u novoj crkvi slave od 2003., a crkva je posvećena 2005. godine.',
      'U homiliji je nadbiskup, polazeći od lika sv. Josipa, pozvao očeve da budu kršćani koji brinu za svoju djecu i obitelj. Tijekom mise krstio je četvrto dijete jedne župne obitelji, kojoj je nadbiskupija uručila i dar namijenjen obiteljima s četvero i više djece.',
      'Župa se za obljetnicu pripremila trodnevnicom koju su predvodili don Alojzije Bavčević, don Ivan Matković i don Carlos Taborda.',
      'Izvor: IKA. Fotografije: Slavko Blažić.',
    ),
    gallery: [
      { image: images.freske2019 },
      { image: images.oltar2019 },
      { image: images.krstenje2019 },
    ],
    author: 'Župni ured',
    _status: 'published',
  },
  {
    title: 'Posveta župne crkve sv. Marka',
    slug: 'posveta-zupne-crkve-sv-marka',
    publishedAt: new Date('2005-01-09T11:00:00.000Z').toISOString(),
    category: categoryIds['Slavlja'],
    featured: false,
    coverImage: images.freske2019,
    excerpt:
      'Na blagdan Krštenja Gospodinova 2005. nadbiskup Marin Barišić posvetio je novu župnu crkvu sv. Marka na Neslanovcu.',
    content: richText(
      'Na blagdan Krštenja Gospodinova, 9. siječnja 2005., splitsko-makarski nadbiskup Marin Barišić posvetio je župnu crkvu sv. Marka Evanđelista na Neslanovcu. Suslavilo je petnaest svećenika, među njima župnik don Šimun Doljanin, generalni vikar Ivan Ćubelić i pastoralni vikar Drago Šimundža. Vjernici su ispunili crkvu i njezino predvorje.',
      'Umjetnički projekt crkve djelo je Francisca Argüella, idejni nacrt izradio je arhitekt Maurizio Bergamo, a glavni i izvedbeni projekt arhitekt Damir Rako. Betonske radove izveo je „Konstruktor”, a glavninu završnih radova „Intergradnja” i tvrtka Stanka Galića. Dio posla odradili su sami župljani.',
      'Crkva je uređena prema smjernicama Drugoga vatikanskog sabora: oltar je u središtu, a prostor je raspoređen tako da svi vjernici mogu aktivno sudjelovati u slavlju. Svetohranište je u pokrajnjoj kapelici namijenjenoj klanjanju i molitvi.',
      'Mise se u novoj crkvi slave od prve nedjelje došašća 2003., a do tada se župa okupljala u montažnoj crkvi.',
      'Izvor: IKA i Splitsko-makarska nadbiskupija. Fotografija (2019.): Slavko Blažić.',
    ),
    author: 'Župni ured',
    _status: 'published',
  },
]
