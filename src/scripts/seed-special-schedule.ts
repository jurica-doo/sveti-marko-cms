/**
 * One-off: fills in the Christmas example for the new "Posebno" (special
 * schedule) block on the `schedule` global, requested alongside the feature
 * itself. Safe to re-run — `updateGlobal` merges into the existing document,
 * and this only touches `specialSchedule`.
 *
 * Run with: `npm run payload run src/scripts/seed-special-schedule.ts`
 */
import { getPayload } from 'payload'
import config from '../payload.config'

const run = async () => {
  console.log('[seed-special-schedule] starting…')
  const payload = await getPayload({ config })
  console.log('[seed-special-schedule] payload ready, updating global…')

  const result = await payload.updateGlobal({
    slug: 'schedule',
    data: {
      specialSchedule: [
        {
          title: 'Božićna ispovijed',
          active: true,
          entries: [
            { day: '23.12. srijeda', times: '10h – 15h' },
            { day: '24.12. četvrtak', times: '10h – 13h' },
          ],
        },
        {
          title: 'Božićne mise',
          active: true,
          entries: [{ day: '25.12. petak · Božić', times: '9h, 10h, 12h i 17h' }],
        },
      ],
    },
  })

  console.log('[seed-special-schedule] done:', JSON.stringify(result.specialSchedule))
}

await run()

