# VueRouter

## Router 的实现

### 文件结构

```sh
|——router
   |——user.js
   |——manage.js
   |——shop.js
   |——index.js
```

### index.js

```ts
import Vue from 'vue'
import Router from 'vue-router'
import user from './user'
import manage from './manage'

Vue.use(Router)

let routes = [...user, ...manage]

// 将路径注入到Router中
const router = new VueRouter({
  routes,
})

// 导出路由
export default router
```

### manage.js

```ts
const manage = [
  {
    path: '/Manage',
    name: 'Manage',
    component: () => import('@/views/manage/index.vue'),
    children: [
      {
        path: '/userList',
        meta: ['数据管理', '用户列表'],
        component: () => import('@/views/manage/userList.vue'),
      },
      {
        path: '/shopList',
        meta: ['数据管理', '商品列表'],
        component: () => import('@/views/manage/shopList.vue'),
      },
      {
        path: '/addUser',
        meta: ['添加数据', '添加用户'],
        component: () => import('@/views/manage/addUser.vue'),
      },
      {
        path: '/addShop',
        meta: ['添加数据', '添加商品'],
        component: () => import('@/views/manage/addShop.vue'),
      },
    ],
  },
]
export default manage
```

## 如何使用

### main.js

```ts
import Vue from 'vue'
import App from './App'
import router from './router/index.js'

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
```

### 组件使用

```ts
goShopList() {
  this.$router.push({ path: '/shopList', query: { tag: this.tag } })
  // or
  this.$router.push({ name: '/shopList', params: { tag: this.tag } })
}
```
