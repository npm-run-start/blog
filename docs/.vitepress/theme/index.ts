// https://vitepress.dev/guide/custom-theme
import Layout from './layout/Layout.vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    //
  },
} satisfies Theme
