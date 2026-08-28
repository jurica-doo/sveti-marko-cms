import React from 'react'

/**
 * The small mark Payload shows in the nav header and in browser-level
 * chrome. Same masked outline as `Logo`, without the wordmark — the space it
 * sits in is roughly square.
 */
export const Icon: React.FC = () => (
  <span aria-label="Župa sv. Marka" className="parish-icon" role="img" />
)

export default Icon
