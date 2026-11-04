/**
 * Minimal Lexical document builder for seeded copy. Payload stores rich text as
 * a Lexical tree, so plain strings have to be wrapped before they can be saved.
 */

type LexicalChild = { [key: string]: unknown; type?: string; version?: number }

export type Lexical = {
  root: {
    type: string
    children: LexicalChild[]
    direction: 'ltr'
    format: ''
    indent: number
    version: number
  }
}

/** Builds a Lexical document from plain paragraphs. */
export const richText = (...paragraphs: string[]): Lexical => ({
  root: {
    type: 'root',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      children: [
        {
          type: 'text',
          text,
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          version: 1,
        },
      ],
    })),
  },
})

/**
 * Like `richText`, but a `{ heading }` entry becomes an `h2` — for longer
 * documents split into sections, such as the privacy notice.
 */
export const richDocument = (...blocks: (string | { heading: string })[]): Lexical => {
  const doc = richText(...blocks.map((block) => (typeof block === 'string' ? block : block.heading)))
  doc.root.children = doc.root.children.map((node, index) => {
    const block = blocks[index]
    return typeof block === 'string' ? node : { ...node, type: 'heading', tag: 'h2' }
  })
  return doc
}
