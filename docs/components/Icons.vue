<script setup lang="ts">
const list = [
  // { icon: 'icons/Vue.png', link: 'https://cn.vuejs.org', txt: 'VUE' },
  { icon: 'icons/UnoCSS.svg', link: 'https://unocss.dev', txt: 'UnoCSS' },
  {
    icon: 'icons/tailwindcss.png',
    link: 'https://www.tailwindcss.cn',
    txt: 'Tailwind',
  },
  {
    icon: 'icons/ionic.png',
    link: 'https://ionicframework.com/docs',
    txt: 'Ionic',
  },
  {
    icon: 'icons/capacitor.png',
    link: 'https://capacitorjs.com',
    txt: 'Capacitor',
  },
  {
    icon: 'icons/qiankun.png',
    link: 'https://qiankun.umijs.org/zh/guide',
    txt: 'Qiankun',
  },
]
</script>

<template>
  <ul>
    <li v-for="(item, i) of list" :key="i">
      <a :href="item.link">
        <img :src="item.icon" />
        <p>{{ item.txt }}</p>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  li {
    width: 20%;
    list-style: none;

    a {
      color: #ccc;
      text-decoration: none;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      img {
        width: 40px;
      }

      p {
        line-height: 1;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }
}
</style>
