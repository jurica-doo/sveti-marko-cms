import type { Access, CollectionConfig, FieldAccess } from 'payload'

import { isAdmin } from '../access'

/**
 * An admin manages every account; anyone else only their own. Returning a
 * query rather than `false` lets an editor still open their own profile (to
 * change their password) while every other account stays invisible.
 */
const adminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (req.user.role === 'admin') return true
  return { id: { equals: req.user.id } }
}

/**
 * Only an admin may set or change a role. Without this an editor could
 * promote themselves to admin by saving their own profile with
 * `role: 'admin'` — field access is enforced on the server for every write,
 * whatever the request looks like.
 */
const adminOnlyField: FieldAccess = ({ req }) => req.user?.role === 'admin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: adminOrSelf,
    create: isAdmin,
    update: adminOrSelf,
    delete: isAdmin,
    // Clearing another account's lockout is an admin's call, not anyone's.
    unlock: isAdmin,
  },
  auth: {
    useAPIKey: true,
    // Five wrong passwords lock the account for fifteen minutes — the brake on
    // password guessing against the admin login.
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: {
      // Sent only over HTTPS once deployed; `Lax` keeps the cookie off
      // cross-site POSTs while still allowing ordinary links into the admin.
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      access: {
        create: adminOnlyField,
        update: adminOnlyField,
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}
