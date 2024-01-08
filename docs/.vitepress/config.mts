import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Zhan's Blog",
  description: '学习总结',
  base: '/blog/',
  head: [['link', { rel: 'icon', href: '/blog/favicon.ico' }]],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: 'VUE3', link: '/vue3/base' },
    ],
    sidebar: [
      {
        text: 'VUE3',
        collapsed: true,
        items: [
          { text: '基础框架', link: '/vue3/base' },
          { text: '深入源码', link: '/vue3/source-code' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/npm-run-start' }],
    search: {
      provider: 'local',
    },
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
    returnToTopLabel: '回到顶部',
  },
  markdown: {
    // lineNumbers: true, // 行号
    image: {
      // image lazy loading is disabled by default
      lazyLoading: true,
    },
  },
})
