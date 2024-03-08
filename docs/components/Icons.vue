<script setup lang="ts">
const list = [
  // { icon: 'icons/Vue.png', link: 'https://cn.vuejs.org', txt: 'VUE' },
  {
    icon: 'icons/creative.png',
    link: 'https://www.creative-tim.com',
    txt: 'Creative',
  },
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

const linkClick = (url: string) => {
  window.open(url)
}
</script>

<template>
  <ul>
    <li v-for="(item, i) of list" :key="i" @click="linkClick(item.link)">
      <img :src="item.icon" />
      <span>{{ item.txt }}</span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;

  li {
    width: 16.66%;
    height: 80px;
    margin-top: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;

    img {
      height: 50px;
    }

    span {
      color: #ccc;
      font-size: 12px;
      font-weight: bold;
    }
  }
}

@media only screen and (max-width: 800px) {
  ul {
    li {
      width: 20%;
    }
  }
}
</style>
