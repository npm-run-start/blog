<script lang="ts" setup>
import { ref } from 'vue'
import { VssueComponent } from 'vssue'
import DefaultTheme from 'vitepress/theme'
import GithubV4 from '@vssue/api-github-v4'

const { Layout } = DefaultTheme
// 在这里设置当前页面的 Issue 标题
const title = ref<string>('Vssue Demo')

// 注意，这里的 options 会覆盖上面通过 `Vue.use()` 设置的默认 options
// 如果你不想改变它们，只需要传入 `title` prop 即可，不需要传入 `options` prop
const options = ref<object>({
  api: GithubV4,
  owner: 'npm-run-start',
  repo: 'https://github.com/npm-run-start/blog-Vssue',
  clientId: 'eca57ce0d71548278034',
  clientSecret: '0c234122dc5e5e99c69d3c4805047eed8475f33e', // 只有在使用某些平台时需要
})
</script>

<template>
  <Layout>
    <template #doc-after>
      <VssueComponent :title="title" :options="options" />
    </template>
  </Layout>
</template>

<style>
@import 'vssue/dist/vssue.css';
</style>
