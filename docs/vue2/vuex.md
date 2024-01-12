# vuex

## Store 的实现

### 文件结构

```sh
|——store
   |——modules
      |__mod1
         |___state.js
         |___getters.js
         |___mutations.js
         |___actions.js
         |___index.js
      |__mod2
         |___state.js
         |___getters.js
         |___mutations.js
         |___actions.js
         |___index.js
   |——index.js
```

### store 下的 index.js 对外暴露 store

```ts
import Vue from 'vue'
import Vuex from 'vuex'
import mod1 from './modules/mod1/index'

Vue.use(Vuex)

// 注册对应模块
const store = new Vuex.Store({
  modules: {
    mod1,
  },
})
```

### 模块 mod1 下的 index.js 对外暴露 4 大属性

```ts
import state from 'state'
import getters from 'getters'
import mutations from 'mutations'
import actions from 'actions'

export default {
  state,
  getters,
  mutations,
  actions,
}
```

### state.js

```ts
const state = {
  dataList: [],
  param: '',
  // ...
}
export default state
```

### getters.js

```ts
const getters = {
  getDataList: function (state) {
    return state.fileList.slice() // sclice防止严格模式下报错：mutations外要更改state
  },
}
export default getters
```

### mutations.js

```ts
const mutations = {
  handleDataList: function (state, dataList) {
    state.dataList = dataList
  },
}
export default mutations
```

### actions.js

```ts
const actions = {
  submitDataList: function (context, dataList) {
    context.commit('handleDataList', dataList)
  },
}
export default actions
```

## 如何使用(推荐辅助函数)

### main.js

```ts
import Vue from 'vue'
import App from './App'
import store from './store/index.js'

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
```

### mapGetters（获取）

```ts
import { mapGetters } from 'vuex'

// mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
        list: 'getDataList'
    ])
}

// 通过this.list从store中获取
console.log(this.list)
```

### mapActions（提交）

```ts
import { mapActions } from 'vuex'

// mapActions 把actions映射到方法中
methods: {
    ...mapActions([
        'submitDataList'
    ]),
    // 通过this.submitDataList()提交到store
    handleFunc () {
        const arr = [1, 2, 3]
        this.submitDataList(arr)
    }
}
```
