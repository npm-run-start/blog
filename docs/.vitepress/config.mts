import { defineConfig } from 'vitepress'
import { navs } from './navs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Zhan's Blog",
  description: '学习总结',
  base: '/blog/',
  head: [['link', { rel: 'icon', href: '/blog/favicon.ico' }]],
  themeConfig: {
    logo: '/shield.png',
    nav: [{ text: '首页', link: '/' }, ...navs],
    sidebar: [
      ...navs.map((v) => ({
        ...v,
        collapsed: true,
      })),
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/npm-run-start' }],
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdated: {
      text: '最近更新时间',
      formatOptions: {
        // full, medium, short
        dateStyle: 'medium',
        timeStyle: 'medium',
      },
    },
    editLink: {
      pattern: 'https://github.com/npm-run-start/blog/tree/main/docs/:path',
      text: '在GitHub上编辑此页',
    },
    search: {
      provider: 'local',
    },
    returnToTopLabel: '回到顶部',
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
})
