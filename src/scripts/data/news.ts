/**
 * Example parish news.
 *
 * These exist so the news listing, the home page selection and the category
 * filter all have enough to render against. They are written as ordinary parish
 * announcements — nothing here is a real event, and the office is meant to
 * replace or delete them before the site goes live.
 *
 * Times and office hours match the `schedule` global on purpose, so the example
 * copy never contradicts what the rest of the site shows.
 *
 * Shared by `seed.ts` and any one-off insert script, so the two can never drift
 * apart.
 */
import { richText } from './rich-text'

type CategoryIds = Record<string, number | string>

export const exampleNews = (categoryIds: CategoryIds) => [
  {
    title: 'Blagoslov obitelji i domova',
    slug: 'blagoslov-obitelji-i-domova',
    publishedAt: new Date('2026-01-07T09:00:00.000Z').toISOString(),
    category: categoryIds['Obavijesti'],
    featured: false,
    excerpt:
      'Kroz siječanj svećenik obilazi domove župljana. Raspored po ulicama objavljen je na oglasnoj ploči i najavljuje se nedjeljom na misama.',
    content: richText(
      'U vremenu po Bogojavljenju započinje blagoslov obitelji i domova. Svećenik obilazi domove župljana po ulicama, a raspored se objavljuje na oglasnoj ploči uz crkvu.',
      'Obitelji koje toga dana nisu kod kuće mogu se javiti u župni ured i dogovoriti drugi termin.',
    ),
    author: 'Župni ured',
    _status: 'published',
  },
  {
    title: 'Župni zbor poziva nove pjevače',
    slug: 'zupni-zbor-poziva-nove-pjevace',
    publishedAt: new Date('2026-02-05T09:00:00.000Z').toISOString(),
    category: categoryIds['Zajednice'],
    featured: false,
    excerpt:
      'Probe su četvrtkom nakon večernje mise u župnoj dvorani. Dobrodošli su svi koji rado pjevaju, bez obzira na glazbeno predznanje.',
    content: richText(
      'Župni zbor poziva nove članove. Probe se održavaju četvrtkom nakon večernje svete mise u župnoj dvorani uz crkvu.',
      'Nije potrebno glazbeno predznanje ni poznavanje nota — dovoljna je volja i redovitost dolaska. Zbor pjeva na nedjeljnoj misi u 11:00 te na većim blagdanima.',
      'Zainteresirani se mogu javiti voditelju zbora nakon mise ili u župnom uredu.',
    ),
    author: 'Župni ured',
    _status: 'published',
  },
  {
    title: 'Korizma: križni put petkom prije mise',
    slug: 'korizma-krizni-put-petkom',
    publishedAt: new Date('2026-02-18T09:00:00.000Z').toISOString(),
    category: categoryIds['Obavijesti'],
    featured: false,
    excerpt:
      'Kroz korizmu pobožnost križnoga puta molimo petkom u 18:30, neposredno prije večernje svete mise.',
    content: richText(
      'Čistom srijedom započinje korizmeno vrijeme. Kroz cijelu korizmu pobožnost križnoga puta molimo petkom u 18:30 sati, neposredno prije večernje svete mise.',
      'Pojedine postaje predvode župne zajednice — ministranti, zbor i vjeroučenici.',
      'Prilika za ispovijed je kao i inače, pola sata prije svake večernje mise.',
    ),
    author: 'Župni ured',
    _status: 'published',
  },
  {
    title: 'Uskrsno trodnevlje — raspored obreda',
    slug: 'uskrsno-trodnevlje-raspored-obreda',
    publishedAt: new Date('2026-04-02T09:00:00.000Z').toISOString(),
    category: categoryIds['Slavlja'],
    featured: false,
    excerpt:
      'Raspored obreda Velikoga četvrtka, Velikoga petka i Vazmenoga bdijenja objavljen je na oglasnoj ploči i u župnim obavijestima.',
    content: richText(
      'Uskrsno trodnevlje vrhunac je liturgijske godine. Raspored obreda za Veliki četvrtak, Veliki petak i Vazmeno bdijenje objavljen je na oglasnoj ploči uz crkvu.',
      'Na Veliki petak nema svete mise; toga je dana strogi post i nemrs.',
      'Prilika za ispovijed pred Uskrs bit će produžena, a termini se najavljuju nedjeljom na misama.',
    ),
    author: 'Župni ured',
    _status: 'published',
  },
  {
    title: 'Prva sveta pričest',
    slug: 'prva-sveta-pricest',
    publishedAt: new Date('2026-05-10T09:00:00.000Z').toISOString(),
    category: categoryIds['Slavlja'],
    featured: false,
    excerpt:
      'Prvopričesnici naše župe pristupaju prvoj svetoj pričesti na nedjeljnoj misi u 11:00, nakon višemjesečne priprave.',
    content: richText(
      'Nakon višemjesečne priprave na župnom vjeronauku, prvopričesnici naše župe pristupaju prvoj svetoj pričesti na nedjeljnoj svetoj misi u 11:00 sati.',
      'Ispovijed za prvopričesnike i njihove roditelje je u subotu prije slavlja, a proba u župnoj crkvi prema dogovoru s vjeroučiteljem.',
      'Molimo župnu zajednicu da djecu i njihove obitelji prati molitvom.',
    ),
    author: 'Župni ured',
    _status: 'published',
  },
  {
    title: 'Sveta potvrda u našoj župi',
    slug: 'sveta-potvrda-u-nasoj-zupi',
    publishedAt: new Date('2026-06-01T09:00:00.000Z').toISOString(),
    category: categoryIds['Slavlja'],
    featured: false,
    excerpt:
      'Krizmanici primaju sakrament svete potvrde na svečanoj misi. Ispovijed za krizmanike i kumove je dan ranije.',
    content: richText(
      'Krizmanici naše župe primaju sakrament svete potvrde na svečanoj svetoj misi u župnoj crkvi.',
      'Ispovijed za krizmanike, kumove i roditelje je dan ranije, prije večernje mise.',
      'Kumovi trebaju donijeti potvrdu o sposobnosti za kumstvo iz svoje župe. Sve ostalo dogovara se u župnom uredu.',
    ),
    author: 'Župni ured',
    _status: 'published',
  },
  {
    title: 'Hodočašće u Mariju Bistricu — prijave u uredu',
    slug: 'hodocasce-u-mariju-bistricu',
    publishedAt: new Date('2026-07-28T09:00:00.000Z').toISOString(),
    category: categoryIds['Zajednice'],
    featured: false,
    excerpt:
      'Župa organizira jednodnevno hodočašće u nacionalno svetište Majke Božje Bistričke. Broj mjesta je ograničen, prijave u župnom uredu.',
    content: richText(
      'Župa organizira jednodnevno hodočašće u nacionalno svetište Majke Božje Bistričke u Mariji Bistrici.',
      'Polazak je ispred crkve u ranim jutarnjim satima, a povratak isti dan u večernjim satima. U svetištu je predviđena zajednička sveta misa i vrijeme za osobnu molitvu.',
      'Broj mjesta je ograničen. Prijave i uplate primaju se u župnom uredu u radno vrijeme.',
    ),
    author: 'Župni ured',
    _status: 'published',
  },
  {
    title: 'Vjeronauk i susreti ministranata kroz tjedan',
    slug: 'vjeronauk-i-susreti-ministranata',
    publishedAt: new Date('2026-03-02T09:00:00.000Z').toISOString(),
    category: categoryIds['Zajednice'],
    featured: false,
    excerpt:
      'Župni vjeronauk za prvopričesnike i krizmanike te susreti ministranata održavaju se u župnoj dvorani.',
    content: richText(
      'Župni vjeronauk za prvopričesnike i krizmanike održava se tijekom tjedna u župnoj dvorani uz crkvu. Rasporedi po skupinama objavljeni su na oglasnoj ploči.',
      'Susreti ministranata su subotom prije večernje mise. Pozivamo dječake i djevojčice koji žele služiti kod oltara da se jave župniku.',
    ),
    author: 'Župni ured',
    _status: 'published',
  },
  {
    title: 'Blagdan sv. Marka Evanđelista — župno slavlje',
    slug: 'blagdan-sv-marka-zupno-slavlje',
    publishedAt: new Date('2026-04-20T09:00:00.000Z').toISOString(),
    category: categoryIds['Slavlja'],
    featured: true,
    excerpt:
      'Na blagdan našega nebeskog zaštitnika, 25. travnja, slavimo svetu misu u 19:00, a nakon mise druženje ispred crkve.',
    content: richText(
      'Na blagdan sv. Marka Evanđelista, 25. travnja, župna zajednica slavi svoga nebeskog zaštitnika.',
      'Svečana sveta misa je u 19:00 sati. Pjeva župni zbor, a nakon mise pozivamo sve župljane na druženje ispred crkve.',
      'Devetnica u pripravi za blagdan počinje devet dana ranije, svakodnevno pola sata prije večernje mise.',
    ),
    author: 'Župni ured',
    _status: 'published',
  },
  {
    title: 'Ljetni raspored svetih misa',
    slug: 'ljetni-raspored-svetih-misa',
    publishedAt: new Date('2026-06-15T09:00:00.000Z').toISOString(),
    category: categoryIds['Obavijesti'],
    featured: false,
    excerpt:
      'Kroz srpanj i kolovoz nedjeljne mise ostaju u 9:00, 11:00 i 20:00, a radnim danom misa je u 19:00.',
    content: richText(
      'Tijekom ljetnih mjeseci nedjeljni raspored ostaje nepromijenjen: svete mise su u 9:00, 11:00 i u 20:00 sati.',
      'Radnim danom sveta misa je u 19:00 sati, a prilika za ispovijed pola sata prije mise.',
      'Radno vrijeme župnog ureda kroz srpanj i kolovoz je radnim danom od 9:00 do 11:00.',
    ),
    author: 'Župni ured',
    _status: 'published',
  },
]
