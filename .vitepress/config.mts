import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Linwang-l's blog",
  description: "just for fun",
  lastUpdated: true, // https://vitepress.dev/reference/default-theme-last-updated
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '个人主页', link: '/markdown-examples' }
    ],

      logo: {  // Or logo: "/favicon.svg" if you don't need dark mode support
      light: "/favicon.svg",
      dark: "/favicon-dark.svg"
    },
    sidebar: [
      {
        text: 'Linwang-l的个人主页喵',
        items: [
          { text: '有关我的', link: '/markdown-examples' },
          { text: '我都做什么', link: '/api-examples' },
          { text: '文字展示', link: '/hello-world' }
        ]
      }
    ],
   
    search: {        // https://vitepress.dev/reference/default-theme-search
      provider: 'local'
    },
    footer: {        // https://vitepress.dev/reference/default-theme-footer
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    }
  },
  
  
  head: [
    ["link",{rel:"icon",href:"/favicon.svg"}],
    ["link",{rel:"icon",href:"/favicon-dark.svg",media:"(prefers-color-scheme: dark)"}],
    ["link",{rel:"icon",href:"/favicon.svg",media:"(prefers-color-scheme: light)"}],
  ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/linwang-l' }
    ]
  }
)
