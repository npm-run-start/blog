---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: '遥遥领先'
  # text: 'Bug终结者'
  image: /ultraman.png
  tagline: 立志成为全栈
  actions:
    - theme: brand
      text: VUE3 搭建
      link: /vue3/base
    - theme: alt
      text: 工具
      link: /tools/git

features:
  - title: Vue3 One Piece
    icon: { src: /piece.png, alt: 'piece' }
    details: 更快，更轻，易维护，更多的原生支持
    link: https://vue3js.cn/
  - title: 微信官方文档
    icon: { src: /wechat.png, alt: 'wechat' }
    details: 小程序、公众号、开放平台、小游戏等
    link: https://developers.weixin.qq.com/doc/
  - title: 生活
    icon: { src: /happy.png, alt: 'happy' }
    details: Life is a fucking movie
    link: '404'
---

<br>

**LINKS**

<br>

<script setup lang="ts">
import Icons from './components/Icons.vue'
</script>

<Icons />

<!-- 带图标的链接 -->
<!-- [![xx](icons/unocss.svg)](https://unocss.dev) -->
