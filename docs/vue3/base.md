# 搭建基础框架

基于 Vite + Vue3 + Typescript + Pinia + Axios + Mock

## 初始化

```sh
npm create vue@latest
```

**依次选择需要的配置，也可以全 No，之后一个个扩展**

```ts
✔ Project name: … <your-project-name> // [!code focus]
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
```

## 环境变量

::: code-group

```ts [根目录下 .env.development]
NODE_ENV = 'development'

VITE_HOST_URL = '/api'

VITE_APP_BASE_URL = 'https://mock.apifox.com/m1/869889-0-default'
```

```ts [根目录下 .env.production]
NODE_ENV = 'production'

VITE_HOST_URL = '/api'

// 根据实际配置，此处 mock 同 dev
VITE_APP_BASE_URL = 'https://mock.apifox.com/m1/869889-0-default'
```

:::

## vite.config.ts

::: code-group

```ts [vite.config.ts]
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { getFileExtName } from './src/utils/index'

export default defineConfig(({ command, mode }) => {
  /**
   * @param { 通过该方式获取环境变量 }
   */
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      /**
       * @param { 定义全局常量替换方式 }
       * @param { 把env改为__APP_ENV_，需在 env.d.ts 中 declare }
       */
      __APP_ENV__: env,
    },
    /**
     * @param { 插件，同webpack 配置类似 }
     */
    plugins: [vue()],
    build: {
      /**
       * @param { 扩展 rollup 构建选项 }
       */
      rollupOptions: {
        output: {
          /**
           * @param { 该选项用于指定 chunks 的入口文件模式 }
           */
          entryFileNames: 'js/[name].js',
          /**
           * @param { 用于对代码分割中产生的 chunk 自定义命名 }
           */
          chunkFileNames: 'js/[name]-[hash].js',
          /**
           * @param { 用于自定义构建结果中的静态资源名称 }
           */
          assetFileNames: (assetInfo) => {
            const extName = getFileExtName(assetInfo.name as string)
            if (/\.(jpg|png|jpeg|webp)$/.test(extName)) {
              return 'assets/images/[name].[hash][extname]'
            }
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(extName)) {
              return 'assets/media/[name].[hash][extname]'
            }
            if (/\.css$/.test(extName)) {
              return 'css/[name].[hash][extname]'
            }
            return 'assets/[name].[hash][extname]'
          },
        },
      },
    },
    resolve: {
      /**
       * @param { 当使用文件系统路径的别名时，请始终使用绝对路径。 }
       * @param { 相对路径的别名值会原封不动地被使用，因此无法被正常解析。 }
       */
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@models': fileURLToPath(new URL('./src/models', import.meta.url)),
      },
      /**
       * @param { 导入时想要省略的扩展名列表 }
       * @param { 注意，不 建议忽略自定义导入类型的扩展名（例如：.vue）}
       * @param { 因为它会影响 IDE 和类型支持。}
       */
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    server: {
      /**
       * @param { dev环境启动端口 }
       */
      port: 8888,

      /**
       * @param { 代理 }
       */
      proxy: {
        /**
         * @param { 此处通过Apifox 进行 mock 真实请求 }
         */
        '/api': {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          /**
           * @param { 正则替换重定向 }
           * @param { 当需要重定向到别的域名时使用 }
           */
          // rewrite: path => path.replace(/^\/api/, '')
        },

        /**
         * @param { 例如多个模块区分 }
         */
        '/order': {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/order/, '/api/order'),
        },

        /**
         * @param { 例如多个模块区分 }
         */
        '/common': {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/common/, '/api/common'),
        },
      },
    },
  }
})
```

```ts [src/utils/index.ts]
import path from 'path-browserify'

/**
 * @desc 提取文件后缀
 * @param { fileUrl 文件路径 }
 */
export const getFileExtName = (fileUrl: string) => {
  return path.extname(fileUrl)
}
```

:::

## tsconfig 相关

::: code-group

```json [tsconfig.json]
// 主配置文件，引用另外的 config.xxx.json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.app.json"
    }
  ]
}
```

```json [tsconfig.app.json]
// 限制源码相关的配置文件
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      // 配合 alias 使用
      "@/*": ["./src/*"],
      "@utils/*": ["./src/utils/*"],
      "@models/*": ["./src/models/*"]
    }
  }
}
```

```json [tsconfig.node.json]
// 限制config相关的配置文件
{
  "extends": "@tsconfig/node18/tsconfig.json",
  "include": [
    "src/**/*.ts",
    "vite.config.*",
    "vitest.config.*",
    "cypress.config.*",
    "nightwatch.conf.*",
    "playwright.config.*"
  ],
  "compilerOptions": {
    "composite": true,
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "types": ["node"]
  }
}
```

:::

## env.d.ts

```ts
/**
 * @param { 告知 vite 这是一个声明文件 }
 */
/// <reference types="vite/client" />

// 声明供全局使用
declare const __APP_ENV__

declare module 'path-browserify'
```

## Pinia

::: code-group

```vue [src/views/AboutView.vue]
<script lang="ts" setup>
import { ref } from 'vue'
import { useCounterStore, useNameStore } from '@/stores/common'

let name = ref<string>('')
let text = ref<string>('')

const counter = useCounterStore()
const nameStore = useNameStore()

const sayClick = () => {
  nameStore.sayHello(name.value)
}
</script>

<template>
  <div class="about">
    <p><i>测试函数式 pinia</i></p>
    <h1 @click="counter.increment()">Count ++ {{ counter.count }}</h1>
    <h1>CountDouble {{ counter.doubleCount }}</h1>
    <br />
    <br />

    <p><i>测试组合式 pinia</i></p>
    <input v-model="name" type="text" />
    <button @click="sayClick">问好</button>
    <div>{{ nameStore.hello }}</div>
  </div>
</template>

<style></style>
```

```ts [src/stores/common.ts]
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * @param { 函数式 }
 */
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

/**
 * @param { 组合式 }
 */
export const useNameStore = defineStore('name', {
  state: () => ({
    name: '',
  }),
  getters: {
    hello: (state) => state.name && `你好！${state.name}`,
  },
  actions: {
    sayHello(val: string) {
      this.name = val
    },
  },
})
```

:::

## Axios + Mock（Apifox）

::: code-group

```vue [src/views/AboutView.vue]
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { UserInfo } from '@/models/instance'
import { IndexHttp } from '@/service/indexApi'
import TodoList from '@/components/TodoList.vue'
import { todoListStore } from '@/stores/common'

let user = ref<UserInfo>({} as UserInfo)
let list = ref<string[]>([])

const todoStore = todoListStore()

onMounted(() => {
  getUserInfo()
})

const addClick = () => {
  list.value.push(text.value)
  text.value = ''
  todoStore.updateList(list.value as [])
}

const delClick = (i: number) => {
  alert('子组建删除的！')
  list.value.splice(i, 1)
  todoStore.updateList(list.value as [])
}

const getUserInfo = () => {
  IndexHttp.getUserInfo({ id: 1 }).then((res: any) => {
    const { data } = res
    user.value = data
  })
}
</script>

<template>
  <div class="about">
    <p><i>测试父子传值 + pinia</i></p>
    <input v-model="text" type="text" />
    <button @click="addClick">新增</button>
    <todo-list :tag="'父组件新增的'" @delClick="delClick"></todo-list>
    <br />
    <br />

    <p><i>测试 axios + Apifox mock数据</i></p>
    <div>姓名：{{ user.name }}</div>
    <div>性别：{{ user.sex }}</div>
    <div>年龄：{{ user.age }}</div>
    <div>手机号：{{ user.phone }}</div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

p {
  color: coral;
}
</style>
```

```vue [src/components/TodoList.vue]
<script lang="ts" setup>
import { computed } from 'vue'
import { todoListStore } from '@/stores/common'

// const props = defineProps(['tag']) 或者定义类型：
const props = defineProps({
  tag: {
    type: String,
    default: '',
    required: true,
  },
})

const emit = defineEmits(['delClick'])

const todoStore = todoListStore()

const list = computed(() => {
  return todoStore.getList
})
</script>

<template>
  <ul class="todo-list">
    <li v-for="(item, i) of list" :key="i" @click="emit('delClick', i)">
      {{ item }} --- {{ props.tag }}
    </li>
  </ul>
</template>

<style>
.todo-list {
  li {
    cursor: pointer;
  }
}
</style>
```

```ts [src/stores/common.ts]
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * @param { todo-list }
 */
export const todoListStore = defineStore('todo-list', {
  state: () => ({
    list: [],
  }),
  getters: {
    getList: (state) => state.list,
  },
  actions: {
    updateList(list: []) {
      this.list = list
    },
  },
})
```

```ts [src/service/http.ts]
import axios, { isCancel, AxiosError, type AxiosRequestConfig } from 'axios'
import { RES_CODE_ERR, RES_CODE_OK } from './constant'

// console.log(isCancel('---something'), new AxiosError('---AxiosError'))

const instance = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

/**
 * @param { 请求拦截 }
 */
instance.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem('auth-token') || '{}')

    if (JSON.stringify(auth) !== '{}') {
      config.headers.Authorization = 'Bearer ' + auth.token
    }

    return Promise.resolve(config)
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @param { 响应拦截 }
 */
instance.interceptors.response.use(
  (response) => {
    const {
      data: { code, message },
    } = response

    switch (code) {
      case RES_CODE_OK:
        return Promise.resolve(response.data)

      case RES_CODE_ERR:
        alert(message)
        return Promise.reject(message)

      default:
        return Promise.resolve(response.data)
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @param { 定义请求方式 }
 */
const http = {
  get: <T, D>(api: string, data?: D, config?: AxiosRequestConfig): Promise<T> =>
    instance.get(api, { data, ...config }),
  post: <T, D>(
    api: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => instance.post(api, data, config),
}

export default http
```

```ts [src/service/idexApi.ts]
import http from './http'
import { type UserParams } from '@/models/instance'

const IndexHttp = {
  // 获取用户信息
  getUserInfo: (data: UserParams) => http.post(`/vue3/getUser`, data),
}

export { IndexHttp }
```

```ts [src/service/contant.ts]
export const RES_CODE_OK = '000000' // 成功 code

export const RES_CODE_ERR = '000021' // 跟后端约定的 xxx 错误code
```

```ts [src/models/interface.ts]
/**
 * @param { 规范入参格式 }
 */
export interface UserParams {
  id: number
}

/**
 * @param { 规范返回数据格式 }
 */
export interface UserInfo {
  name: string
  age: number
  sex: string
  phone: string
}
```

:::
