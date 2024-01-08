<script lang="ts" setup>
import { onMounted } from 'vue'
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'

const init = () => {
  const gitalk = new Gitalk({
    clientID: 'eca57ce0d71548278034',
    clientSecret: '0c234122dc5e5e99c69d3c4805047eed8475f33e', // 只有在使用某些平台时需要
    repo: 'blog-comments', // The repository of store comments,
    owner: 'npm-run-start',
    admin: ['npm-run-start'],
    id: location.href,
    createIssueManually: true,
  })

  gitalk.render('commentRef')
}

onMounted(() => {
  init()
})
</script>

<template>
  <div id="commentRef"></div>
</template>
