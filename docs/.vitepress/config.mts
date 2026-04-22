import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "UNIBA",
  description: "A Bazaar of Creation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Auth Docs', link: 'https://auth.uni.ba/docs' }
    ],

    sidebar: [],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/gy2EZaWe2E' },
      { icon: 'github', link: 'https://github.com/uniba-commons' }
    ]
  }
})
