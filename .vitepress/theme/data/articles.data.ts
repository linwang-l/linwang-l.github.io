import { statSync } from 'node:fs'
import { resolve } from 'node:path'

type Article = {
  title: string
  href: string
  source: string
  categoryId?: string
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

const homeEntries: Article[] = [
  {
    title: '有关linwang-l',
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
  }
]

const articleDefinitions: Article[] = [
  {
    title: '人物',
    href: '/articles/小说/人物',
    source: 'articles/小说/人物.md',
    categoryId: 'novels',
    category: '小说',
    kind: '设定',
    description: '整理林望、雷古勒斯等角色资料。',
    tags: ['小说', '人物', '设定']
  },
  {
    title: '时间线',
    href: '/articles/小说/时间线',
    source: 'articles/小说/时间线.md',
    categoryId: 'novels',
    category: '小说',
    kind: '设定',
    description: '记录救世主、灾变与影子诞生后的故事脉络。',
    tags: ['小说', '时间线', '世界观']
  },
  {
    title: '战斗相关设定',
    href: '/articles/小说/战斗相关设定',
    source: 'articles/小说/战斗相关设定.md',
    categoryId: 'novels',
    category: '小说',
    kind: '设定',
    description: '记录漫游者、法则、创世碎片与战斗表现。',
    tags: ['小说', '战斗', '设定']
  },
  {
    title: '设定集',
    href: '/articles/小说/设定集',
    source: 'articles/小说/设定集.md',
    categoryId: 'novels',
    category: '小说',
    kind: '设定',
    description: '整理世界、命运力、规则与漫游者的基础设定。',
    tags: ['小说', '设定集', '世界观']
  },
  {
    title: '2026愚人节',
    href: '/articles/分享/2026-april-fools',
    source: 'articles/分享/2026-april-fools.md',
    categoryId: 'shares',
    category: '分享',
    kind: '随笔',
    description: '谎言的日子中，用温柔的话语说出实话。',
    tags: ['分享', '文字', '愚人节']
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
  watch: [
    'index.md',
    'markdown-examples.md',
    'api-examples.md',
    'hello-world.md',
    'articles/小说/人物.md',
    'articles/小说/时间线.md',
    'articles/小说/战斗相关设定.md',
    'articles/小说/设定集.md',
    'articles/分享/2026-april-fools.md'
  ],
  load() {
    return {
      introArticle: withModifiedTime(introArticle),
      homeEntries: homeEntries
        .map(withModifiedTime)
        .sort((a, b) => b.timestamp - a.timestamp),
      articles: articleDefinitions
        .map(withModifiedTime)
        .sort((a, b) => b.timestamp - a.timestamp)
    }
  }
}
