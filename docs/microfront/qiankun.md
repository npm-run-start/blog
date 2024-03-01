# qiankun

::: info [蚂蚁金服 qiankun 框架](https://qiankun.umijs.org/zh/guide)
主应用 main + 两个微应用 app-1、app-2，均基于 Vite + Vue3 + Element-plus
<br />
源码包含动态路由，结合 Apifox 进行 mock 数据 [源码已上传](https://github.com/npm-run-start/qiankun.git)
<br />
本博客代码，仅实现 qiankun 微前端路由访问功能，很简约
:::

## 效果

![](/qiankun.jpg)

## 主应用 main

```sh
yarn add qiankun
```

### 需要改造的文件

::: code-group

```ts [src/router/index.ts]
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      // history模式需要通配所有路由，详见vue-router文档 // [!code ++]
      path: '/app/app-1/:pathMatch(.*)*', // [!code ++]
      name: 'app-1', // [!code ++]
      component: () => import('@/components/SubContainer.vue'), // [!code ++]
    }, // [!code ++]
    {
      path: '/app/app-2/:pathMatch(.*)*', // [!code ++]
      name: 'app-2', // [!code ++]
      component: () => import('@/components/SubContainer.vue'), // [!code ++]
    },
  ],
})

export default router
```

```vue [src/components/SubContainer.vue]
<script setup lang="ts">
import { onMounted } from 'vue'
import { registerMicroApps, start } from 'qiankun'

onMounted(() => {
  if (!(window as any).qiankunStarted) {
    ;(window as any).qiankunStarted = true

    registerMicroApps([
      {
        name: 'app-1',
        entry: '//localhost:1111',
        container: '#sub-container',
        activeRule: '/app/app-1',
      },
      {
        name: 'app-2',
        entry: '//localhost:2222',
        container: '#sub-container',
        activeRule: '/app/app-2',
      },
    ])

    start({
      sandbox: {
        experimentalStyleIsolation: true, // 样式隔离
      },
    })
  }
})
</script>

<template>
  <div id="sub-container"></div>
</template>
```

:::

## 微应用 app-1 （app-2 同）

::: warning 注意
qiankun 官网告知 vue 3 版本等稳定后再补充支持，目前无法获取 window.`__POWERED_BY_QIANKUN__` 等，此处基于社区插件 vite-plugin-qiankun
:::

```sh
yarn add vite-plugin-qiankun
```

### 需要改造的文件

::: code-group

```ts [main.ts]
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {
  renderWithQiankun, // [!code ++]
  qiankunWindow, // [!code ++]
  type QiankunProps, // [!code ++]
} from 'vite-plugin-qiankun/dist/helper' // [!code ++]

/**
 * @description 注意！每次执行路由，都要createApp一次，否则警告：
 * @description [Vue warn]: App has already been mounted.
 * @description If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)
 * */
let app: any = null

const render = ({ container }: any) => {
  // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
  const appDom = container ? container : '#app'
  app = createApp(App)
  app.use(createPinia()).use(router)
  app.mount(appDom)
}

const initQiankun = () => {
  renderWithQiankun({
    // bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap
    bootstrap() {
      console.log('bootstrap')
    },
    // 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法，也可以接受主应用传来的参数
    mount(_props: any) {
      console.log(
        '%c%s',
        'padding: 2px 10px;color: #fff; background: #67C23A',
        'mount',
        _props
      )
      render(_props)
    },
    // 应用每次 切出/卸载 会调用的unmount方法，通常在这里我们会卸载微应用的应用实例
    unmount(_props: any) {
      console.log(
        '%c%s',
        'padding: 2px 10px;color: #fff; background: #F56C6C',
        'unmount',
        _props
      )
      const appDom = _props.container ? _props.container : '#app'
      app.unmount(appDom)
    },
    update: function (props: QiankunProps): void | Promise<void> {
      console.log('update')
    },
  })
}

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQiankun() : render({})
```

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import qiankun from 'vite-plugin-qiankun' // [!code ++]

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      qiankun('app-1', {
        useDevMode: true, // [!code ++]
      }), // [!code ++]
    ],

    // ...
  }
})
```

```ts [src/router/index.ts]
import { createRouter, createWebHistory } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper' // [!code ++]

const router = createRouter({
  history: createWebHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ // [!code ++]
      ? '/app/app-1' // [!code ++]
      : import.meta.env.BASE_URL // [!code ++]
  ),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
```

:::
