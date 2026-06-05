import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "linwang-l's blog",
  description: "从来一事无成",
  lastUpdated: true, // https://vitepress.dev/reference/default-theme-last-updated
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

      logo: {  // Or logo: "/favicon.svg" if you don't need dark mode support
      light: "/favicon.svg",
      dark: "/favicon-dark.svg"
    },
   
    search: {        // https://vitepress.dev/reference/default-theme-search
      provider: 'local'
    },
    aside: 'left',
    outline: {
      label: 'Contents',
      level: [2, 3]
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
