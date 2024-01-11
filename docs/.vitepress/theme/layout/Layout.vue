<script setup>
import DefaultTheme from 'vitepress/theme'
import Comment from './Comment.vue'
import P404 from './P404.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <Comment />
    </template>
    <template #not-found> <P404 /> </template>
  </Layout>
</template>
