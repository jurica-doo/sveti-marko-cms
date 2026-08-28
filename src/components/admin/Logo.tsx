import React from 'react'

/**
 * The login-screen wordmark, built to read as the same signature as the
 * public site's header: the church mark, the parish name set in the display
 * face, and `Neslanovac` as a brass eyebrow beneath it.
 *
 * The mark is a CSS mask filled with `currentColor` rather than an `<img>`,
 * exactly as `.brand-mark` does on the web. The admin panel has a light and a
 * dark theme and the user can switch between them at runtime, so a coloured
 * file would need two variants and a swap; masking makes the outline inherit
 * whatever colour the wordmark beside it is already using, for free.
 */
export const Logo: React.FC = () => (
  <div className="parish-brand">
    <span aria-hidden="true" className="parish-brand__mark" />
    <span className="parish-brand__name">Župa sv. Marka</span>
    <span className="parish-brand__eyebrow">Neslanovac</span>
  </div>
)

export default Logo
