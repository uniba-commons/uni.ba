import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "UNIBA",
  description: "A Bazar of Creation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Manifesto', link: '/manifesto' }
    ],

    sidebar: [
      {
        text: 'Manifesto',
        items: [
          { text: 'Manifesto', link: '/manifesto' },
          { text: 'Roadmap', link: '/roadmap' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/uniba/' },
       { icon: 'discord', link: 'https://discord.gg/J7dqtvVC' }
    ]
  }
})
