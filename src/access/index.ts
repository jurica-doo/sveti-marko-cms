import type { Access } from 'payload'

import type { User } from '../payload-types'

const roleOf = (user: unknown): string =>
  ((user as User | null)?.role || '').toLowerCase()

/** Only `admin` users. */
export const isAdmin: Access = ({ req }) => roleOf(req.user) === 'admin'

/** `admin` or `editor` — the two roles that may manage parish content. */
export const isAdminOrEditor: Access = ({ req }) => {
  const role = roleOf(req.user)
  return role === 'admin' || role === 'editor'
}

/**
 * Anonymous visitors see published documents only; logged-in staff see
 * everything (needed for the admin list view and draft previews).
 */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  return {
    _status: { equals: 'published' },
  }
}
