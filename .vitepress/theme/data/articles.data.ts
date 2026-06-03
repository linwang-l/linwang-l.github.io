import { statSync } from 'node:fs'
import { resolve } from 'node:path'

type Article = {
  title: string
  href: string
  source: string
  category: string
  kind: string
  description: string
  tags: string[]
  image?: string
}

const root = process.cwd()

const introArticle: Article = {
  title: '寻找着理由迷失了方向，在梦的渊底徘徊不前。',
  href: '/',
  source: 'index.md',
  category: 'Blog',
  kind: 'Site',
  description: '这里整理有关我的介绍、正在做的事情，以及一些文字展示。',
  tags: ['Blog', 'Life', 'Notes']
}

const articleDefinitions: Article[] = [
  {
    title: '有关我的',
    href: '/markdown-examples',
    source: 'markdown-examples.md',
    category: 'Profile',
    kind: '关于我',
    description: '从这里进入个人主页，查看更完整的自我介绍和站点信息。',
    tags: ['About', 'Profile', 'Blog']
  },
  {
    title: '我都做什么',
    href: '/api-examples',
    source: 'api-examples.md',
    category: 'Works',
    kind: '记录',
    description: '记录我支持、参与和关注的事情，也放一些之后会继续补充的内容。',
    tags: ['USTC', 'Linux', 'Notes']
  },
  {
    title: '文字展示',
    href: '/hello-world',
    source: 'hello-world.md',
    category: 'Words',
    kind: '随笔',
    description: '一些文本、段落和 Markdown 展示内容，用来承载更轻量的表达。',
    tags: ['Text', 'Markdown', 'Display']
  }
]

function modifiedTime(source: string) {
  return statSync(resolve(root, source)).mtime
}

function formatModifiedTime(source: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(modifiedTime(source))
}

function withModifiedTime(article: Article) {
  const modified = modifiedTime(article.source)

  return {
    ...article,
    date: formatModifiedTime(article.source),
    timestamp: modified.getTime()
  }
}

export default {
  watch: ['index.md', 'markdown-examples.md', 'api-examples.md', 'hello-world.md'],
  load() {
    return {
      introArticle: withModifiedTime(introArticle),
      articles: articleDefinitions
        .map(withModifiedTime)
        .sort((a, b) => b.timestamp - a.timestamp)
    }
  }
}
