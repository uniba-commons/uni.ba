import { createContentLoader } from 'vitepress'

export interface NewsItem {
  title: string
  date: string
  tag?: string
  url: string
}

export declare const data: NewsItem[]

export default createContentLoader('news/*.md', {
  transform(raw): NewsItem[] {
    return raw
      .filter((page) => page.frontmatter.title)
      .map((page) => ({
        title: page.frontmatter.title,
        date: toISODate(page.frontmatter.date),
        tag: page.frontmatter.tag,
        url: page.url,
      }))
      .sort((a, b) => b.date.localeCompare(a.date))
  },
})

// Normalize a frontmatter date to a YYYY-MM-DD string. Unquoted YAML dates are
// parsed as Date objects, so accept both Date and string forms.
function toISODate(value: unknown): string {
  if (!value) return ''
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value))
  return match ? `${match[1]}-${match[2]}-${match[3]}` : String(value)
}
