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
