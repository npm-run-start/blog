// https://vitepress.dev/guide/custom-theme
import VssueLayout from './VssueLayout.vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: VssueLayout,
  enhanceApp({ app, router, siteData }) {
    //
  },
} satisfies Theme
