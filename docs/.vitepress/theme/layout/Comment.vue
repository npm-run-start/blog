<script lang="ts" setup>
import { onMounted } from 'vue'
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'

const init = () => {
  const gitalk = new Gitalk({
    clientID: 'eca57ce0d71548278034',
    clientSecret: '96cccf6bb26339b2ae5f389f086fb56d7e821b0d', // 只有在使用某些平台时需要
    repo: 'blog-comments', // The repository of store comments,
    owner: 'npm-run-start',
    admin: ['npm-run-start'],
    id: location.pathname,
    createIssueManually: true,
    distractionFreeMode: false,
  })

  gitalk.render('gitalk-container')
}

onMounted(() => {
  init()
})
</script>

<template>
  <div id="gitalk-container"></div>
</template>
