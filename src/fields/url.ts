import type { TextFieldSingleValidation } from 'payload'

/**
 * Accepts only absolute `http://` or `https://` URLs (or an empty value, so
 * optional fields stay optional).
 *
 * For fields whose value the website puts straight into a link or an iframe —
 * social profiles, the map embed, external links. Anything else, a
 * `javascript:` URL above all, would run on the website the moment it was
 * clicked or framed, so it is refused at the point of saving. The website
 * checks again before rendering (`safeHttpUrl`); this keeps a bad value from
 * being stored in the first place.
 */
export const validateHttpUrl: TextFieldSingleValidation = (value) => {
  if (!value) return true
  try {
    const { protocol } = new URL(value.trim())
    if (protocol === 'https:' || protocol === 'http:') return true
  } catch {
    // Falls through to the message below.
  }
  return 'Unesite punu adresu koja počinje s https:// (npr. https://www.primjer.hr).'
}
