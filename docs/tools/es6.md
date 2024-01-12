# 新特性

0. let、const
1. 默认参数
2. forEach
3. for of
4. for in
5. filter
6. some
7. every
8. reduce
9. find
10. findIndex
11. 箭头函数
12. promise
13. async await
14. Object.keys
15. Object.values
16. 解构赋值
17. 剩余参数
18. ?? 仅判断 undefined 和 null 为 false
19. ?. 可选链
20. flat
21. includes
22. \*\* 求幂运算
23. 模板字符串

# Promise

## 什么是 Promise

- Promise 是异步编程的一种解决方案，其实是一个构造函数，自己身上有 all、reject、resolve 这几个方法，原型上有 then、catch 等方法

### Promise 有以下两个特点

- 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

## 如何使用

### 我们用 Promise 的时候一般是包在一个函数中，在需要的时候去运行这个函数，如：

```ts
function handleClick() {
  console.log('点击方法被调用')
  let p = new Promise(function (resolve, reject) {
    //做一些异步操作
    setTimeout(function () {
      console.log('执行完成Promise')
      resolve('要返回的数据可以任何数据例如接口返回数据')
    }, 2000)
  })
  return p
}
```

### Promise 的两个参数(resolve, reject)

- 首先两位都是函数
- resolve 是 Promise 执行成功时的回调，reject 是 Promise 执行失败时的回调

#### 同在.then()方法中捕获

```ts
handleClick().then(
  function (res) {
    // 成功回调
    console.log(res)
  },
  function (reason, res) {
    // 失败回调
    console.log('失败原因---' + reason)
  }
)
```

#### 分别在.then()和.catch()两个回调中捕获

```ts
handleClick()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log('失败原因---' + err)
  })
```

::: warning 注意
catch 和 then 中第二个参数捕获结果一样，区别在于：当 resolve 执行失败，不会卡死 js，继续执行
:::

### all 的用法

- 与 then 同级的另一个方法，all 方法，该方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后并且执行结果都是成功的时候才执行回调。

```ts
function handleClick() {
  let p = new Promise(function (resolve, reject) {
    setTimeout(() => {
      let num = Math.ceil(Math.random() * 20)
      if (num <= 10) {
        resolve(num)
      } else {
        reject('数字大于10，即将执行失败回调！')
      }
    }, 2000)
  })
  return p
}
function handleClick1() {
  let p = new Promise(function (resolve, reject) {
    setTimeout(() => {
      let num = Math.ceil(Math.random() * 20)
      if (num <= 10) {
        resolve(num)
      } else {
        reject('数字大于10，即将执行失败回调！')
      }
    }, 2000)
  })
  return p
}
function handleClick2() {
  let p = new Promise(function (resolve, reject) {
    setTimeout(() => {
      let num = Math.ceil(Math.random() * 20)
      if (num <= 10) {
        resolve(num)
      } else {
        reject('数字大于10，即将执行失败回调！')
      }
    }, 2000)
  })
  return p
}

Promise.all([handleClick(), handleClick1(), handleClick2()]).then((res) => {
  console.log(res) // (3)[1,5,8]
})
```

### race 的用法

- all 是等所有的异步操作都执行完了再执行 then 方法，那么 race 方法就是相反的，谁先执行完成就先执行回调。先执行完的不管是进行了 race 的成功回调还是失败回调，其余的将不会再进入 race 的任何回调

```ts
function handleClick() {
  let p = new Promise(function (resolve, reject) {
    setTimeout(() => {
      let num = Math.ceil(Math.random() * 20)
      console.log('2s执行得到的值：' + num)
      if (num <= 10) {
        resolve(num)
      } else {
        reject('2s数字大于10，即将执行失败回调！')
      }
    }, 2000)
  })
  return p
}
function handleClick1() {
  let p = new Promise(function (resolve, reject) {
    setTimeout(() => {
      let num = Math.ceil(Math.random() * 20)
      console.log('3s执行得到的值：' + num)
      if (num <= 10) {
        resolve(num)
      } else {
        reject('3s数字大于10，即将执行失败回调！')
      }
    }, 3000)
  })
  return p
}
function handleClick2() {
  let p = new Promise(function (resolve, reject) {
    setTimeout(() => {
      let num = Math.ceil(Math.random() * 20)
      console.log('4s执行得到的值：' + num)
      if (num <= 10) {
        resolve(num)
      } else {
        reject('4s数字大于10，即将执行失败回调！')
      }
    }, 4000)
  })
  return p
}

Promise.race([handleClick(), handleClick1(), handleClick2()]).then((res) => {
  console.log('race最快异步执行得到的值：' + res) // 2s执行得到的值：7
})
```

#### 如何实现一个请求在 10s 内请求成功的话就走 then 方法，如果 10s 内没有请求成功的话进入 reject 回调执行另一个操作

```ts
//请求某个table数据
function requestTableList() {
  var p = new Promise((resolve, reject) => {
    //去后台请求数据，这里可以是ajax,可以是axios,可以是fetch
    resolve(res)
  })
  return p
}
//延时函数，用于给请求计时 10s
function timeout() {
  var p = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求超时')
    }, 10000)
  })
  return p
}
Promise.race([requestTableList(), timeout()])
  .then((data) => {
    //进行成功回调处理
    console.log(data)
  })
  .catch((err) => {
    // 失败回调处理
    console.log(err)
  })
```

> 这里定义了两个 promise,一个去请求数据，一个记时 10s，把两个 promise 丢进 race 里面赛跑去，如果请求数据先跑完就直接进入.then 成功回调，将请求回来的数据进行展示；如果计时先跑完，也就是 10s 了数据请求还没有成功，就先进入 race 的失败回调，就提示用户数据请求失败进入.catch 回调，（ps:或者进入 reject 的失败回调，当.then 里面没有写 reject 回调的时候失败回调会直接进入.catch）

## 手动实现一个 promise

```ts
function myPromise(constructor) {
  let self = this
  self.status = 'pending'
  self.value = undefined
  self.reason = undefined
  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value
      self.status = 'resolved'
    }
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'rejected'
    }
  }
  // 捕获构造异常
  try {
    constructor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
let p1 = new myPromise((resolve, reject) => {
  resolve(1)
})
let p2 = new myPromise((resolve, reject) => {
  reject('new_error2')
})
let p3 = new myPromise((resolve, reject) => {
  resolve(3)
})
myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this
  switch (self.status) {
    case 'resolved':
      onFullfilled(self.value)
      break
    case 'rejected':
      onRejected(self.reason)
    default:
      break
  }
}
myPromise.prototype.all = function (promises) {
  if (!Array.isArray(promises)) {
    throw new Error('promises must be an array')
  }
  let results = new Array(promises.length)
  let promiseIndex = 0
  let promiseLength = promises.length
  return new Promise((resolve, reject) => {
    promises.forEach((ele) => {
      Promise.resolve(ele).then(
        (res) => {
          results[promiseIndex] = res
          promiseIndex++
          if (promiseIndex === promiseLength) {
            return resolve(results)
          }
        },
        (err) => {
          reject(err)
        }
      )
    })
  })
}
myPromise.prototype.race = function (promises) {
  if (!Array.isArray(promises)) {
    throw new Error('promises must be an array')
  }
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
    })
  })
}
let p = new myPromise()
// p.all([p1, p2, p3])
// .then(res => {
//     console.log(res, '---成功结果')
// }).catch(err => {
//     console.log(err, '---异常结果')
// })
p.race([p1, p2, p3])
  .then((res) => {
    console.log(res, '---成功结果')
  })
  .catch((err) => {
    console.log(err, '---异常结果')
  })
```

## async/await

> 在我们处理异步的时候，比起回调函数，Promise 的 then 方法会显得较为简洁和清晰，但是在处理多个彼此之间相互依赖的请求的时候，就会显的有些累赘。这时候，用 async 和 await 更加优雅，后面会详情说明。

### 规则一：凡是在前面添加了 async 的函数在执行后都会自动返回一个 Promise 对象

```ts
async function foo() {
  // ...
}

let result = foo()
// 即使无任何返回值，依然返回Promise
/* Promise
    __proto__: Promise
    [[PromiseStatus]]: "resolved"
    [[PromiseValue]]: undefined */
```

### 规则二：await 必须在 async 函数里使用，不能单独使用

```ts
function bar() {
  let res = await Promise.resolve('done')
  console.log(res)
} // Uncaught SyntaxError: await is only valid in async function
```

### 规则三：await 后面需要跟 Promise 对象，不然就没有意义，而且 await 后面的 Promise 对象不必写 then，因为 await 的作用之一就是获取后面 Promise 对象成功状态传递出来的参数。

```ts
// 正确的写法
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        })
    })
}

async test() {
    let res = await fn() //因为fn会返回一个Promise对象
    console.log(res)    //这里会打出Promise成功后传递过来的'success'
}

test()

// 无意义的写法
async test() {
    let res = await true
    console.log(res)
}

test()
```

### async/await 的错误处理方式

> 关于错误处理，如规则三所说，await 可以直接获取到后面 Promise 成功状态传递的参数，但是却捕捉不到失败状态

#### 第一种就利用 Promise 自带的 catch 异步捕获

```ts
function errFn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('get some error info')
    }, 0)
  })
}
async function test() {
  await errFn()
}
test().catch((err) => {
  console.log(err) // get some error info
})
```

#### 第二种 try/catch

```ts
function errFn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('get some error info')
    }, 0)
  })
}
async function test() {
  try {
    await errFn()
  } catch (error) {
    console.log(error) // get some error info
  }
}
test()
```

# 数组

## 扩展运算符

- 该运算符主要用于函数调用。

```ts
console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
function add(x, y) {
  return x + y
}
const numbers = [1, 2]
add(...numbers) // 3
```

- 扩展运算符与正常的函数参数可以结合使用

```ts
function f(v, w, x, y, z) {}
const args = [0, 1]
f(-1, ...args, 2, 3)
```

- 扩展运算符后面还可以放置表达式

```ts
const arr = [...(x > 0 ? ['a'] : []), 'b']
```

- 如果扩展运算符后面是一个空数组，则不产生任何效果

```ts
const a = [...[], 1] // [1]
```

## 替代函数的 apply 方法

- 由于扩展运算符可以展开数组，所以不再需要 apply 方法，将数组转为函数的参数了

```ts
// ES5写法
function fn(x, y, z) {}
var args = [1, 2, 3]
fn.apply(null, args)
// ES6
fn(...args)
```

- 应用 Math.max 方法

```ts
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])
```

- 通过 push 函数，将一个数组添加到另一个数组的尾部

```ts
// ES5的 写法
var arr1 = [0, 1, 2]
var arr2 = [3, 4, 5]
Array.prototype.push.apply(arr1, arr2)

// ES6 的写法
let arr1 = [0, 1, 2]
let arr2 = [3, 4, 5]
arr1.push(...arr2)
```

- 输出时间格式

```ts
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))()
// ES6
new Date(...[2015, 1, 1])
```

## 扩展运算符的应用

### 复制数组

```ts
// ES5
const a1 = [1, 2]
const a2 = a1.concat()
a2[0] = 2
a1 // [1, 2]

// ES6
const a1 = [1, 2]
// 写法一
const a2 = [...a1]
// 写法二
const [...a2] = a1
```

### 合并数组

```ts
const arr1 = ['a', 'b']
const arr2 = ['c']
const arr3 = ['d', 'e']

// ES5 的合并数组
arr1.concat(arr2, arr3)
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
const a = [...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

// 不过，这两种方法都是浅拷贝，使用的时候需要注意
const a1 = [{ foo: 1 }]
const a2 = [{ bar: 2 }]

const a3 = a1.concat(a2)
const a4 = [...a1, ...a2]

a3[0] === a1[0] // true
a4[0] === a1[0] // true
```

### 与解构赋值结合

```ts
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

const [first, ...rest] = [1, 2, 3, 4, 5]
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = []
first // undefined
rest  // []

const [first, ...rest] = ["foo"]
first  // "foo"
rest   // []

const [...butLast, last] = [1, 2, 3, 4, 5]
// 报错
const [first, ...middle, last] = [1, 2, 3, 4, 5]
// 报错
```

### 字符串

```ts
[...'hello']
// [ "h", "e", "l", "l", "o" ]
// 能够正确识别四个字节的 Unicode 字符
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
// 如果不用扩展运算符，字符串的reverse操作就不正确
let str = 'x\uD83D\uDE80y'
str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'
[...str].reverse().join('')
// 'y\uD83D\uDE80x'
```

### 实现了 Iterator 接口的对象

```ts
// 先定义了Number对象的遍历器接口，扩展运算符将5自动转成Number实例以后，就会调用这个接口，就会返回自定义的结果
Number.prototype[Symbol.iterator] = function* () {
  let i = 0
  let num = this.valueOf()
  while (i < num) {
    yield i++
  }
}
console.log([...5]) // [0, 1, 2, 3, 4]
// 对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组
let arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
}

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike]
```

### Map 和 Set 结构，Generator 函数

```ts
// Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
])
let arr = [...map.keys()] // [1, 2, 3]
// 变量go是一个 Generator 函数，执行后返回的是一个遍历器对象
const go = function* () {
  yield 1
  yield 2
  yield 3
}
const goN = [...go()] // [1, 2, 3]
// 如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错
const obj = { a: 1, b: 2 }
let arr = [...obj] // TypeError: Cannot spread non-iterable object
```

## Array.from()

> Array.from 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

### 类似数组的对象，Array.from 将它转为真正的数组

```ts
let arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
}
// ES5的写法
var arr1 = [].slice.call(arrayLike) // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike) // ['a', 'b', 'c']
```

### 只要是部署了 Iterator 接口的数据结构，Array.from 都能将其转为数组

```ts
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
```

### 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。Array.from 方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有 length 属性。因此，任何有 length 属性的对象，都可以通过 Array.from 方法转为数组，而此时扩展运算符就无法转换

```ts
Array.from({ length: 3 })
// [ undefined, undefined, undefined ]
```

### 对于还没有部署该方法的浏览器，可以用 Array.prototype.slice 方法替代

```ts
const toArray = (() =>
  Array.from ? Array.from : (obj) => [].slice.call(obj))()
```

### Array.from 还可以接受第二个参数，作用类似于数组的 map 方法，用来对每个元素进行处理，将处理后的值放入返回的数组

```ts
Array.from(arrayLike, (x) => x * x)
// 等同于
Array.from(arrayLike).map((x) => x * x)
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]
```

### 返回各种数据的类型

```ts
function typesOf() {
  return Array.from(arguments, (value) => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']
```

## Array.of()

### Array.of 方法用于将一组值，转换为数组

```ts
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

### 这个方法的主要目的，是弥补数组构造函数 Array()的不足。因为参数个数的不同，会导致 Array()的行为有差异

```ts
Array() // []
Array(3) // [empty × 3]
Array(3, 11, 8) // [3, 11, 8]

Array.of(3) // [3]
```

### Array.of 方法可以用下面的代码模拟实现

```ts
function ArrayOf() {
  return [].slice.call(arguments)
}
```

## 数组实例的 copyWithin()

> 数组实例的 copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
> 它接受三个参数。
> target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
> start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
> end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

```ts
Array.prototype.copyWithin(target, start = 0, end = this.length)
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]
// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]
// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}
// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5])
i32a.copyWithin(0, 2)
// Int32Array [3, 4, 5, 4, 5]
// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4)
// Int32Array [4, 2, 3, 4, 5]
```

## 数组实例的 find() 和 findIndex()

> 数组实例的 find 方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为 true 的成员，然后返回该成员。如果没有符合条件的成员，则返回 undefined

### find()

```ts
const arr = [1, 4, -5, 10]
arr
  .find((n) => n < 0)
  [
    // -5
    // find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组
    (1, 5, 10, 15)
  ].find(function (value, index, arr) {
    return value > 9
  }) // 10
```

### findIndex()

> 数组实例的 findIndex 方法的用法与 find 方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

```ts
const arr = [1, 5, 10, 15]
arr.findIndex(function (value, index, arr) {
  return value > 9
}) //
```

### 这两个方法都可以发现 NaN，弥补了数组的 indexOf 方法的不足

```ts
const n = [NaN]
n.indexOf(NaN)
// -1
n.findIndex((y) => Object.is(NaN, y))
// 0
```

## 数组实例的 fill()

### fill 方法使用给定值，填充一个数组，数组中已有的元素，会被全部抹去

```ts
const arr = ['a', 'b', 'c']
arr.fill(7)
// [7, 7, 7]
new Array(3).fill(7)
// [7, 7, 7]
```

### fill 方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置

```ts
const arr = ['a', 'b', 'c']
arr.fill(7, 1, 2)
// ['a', 7, 'c']
```

### 如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象

```ts
let arr = new Array(3).fill({ name: 'Mike' })
arr[0].name = 'Ben'
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([])
arr[0].push(5)
arr
// [[5], [5], [5]]
```

## 数组实例的 entries()，keys() 和 values()

> ES6 提供三个新的方法——entries()，keys()和 values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用 for...of 循环进行遍历，唯一的区别是 keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

```ts
for (let index of ['a', 'b'].keys()) {
  console.log(index)
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem)
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem)
}
// 0 "a"
// 1 "b"
```

### 如果不使用 for...of 循环，可以手动调用遍历器对象的 next 方法，进行遍历

```ts
let letter = ['a', 'b', 'c']
let entries = letter.entries()
console.log(entries.next().value) // [0, 'a']
console.log(entries.next().value) // [1, 'b']
console.log(entries.next().value) // [2, 'c']
```

## 数组实例的 includes()

> Array.prototype.includes 方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的 includes 方法类似。

### ES2016 引入了该方法

```ts
const arr = [1, 2, 3]
arr
  .includes(2) // true
  [(1, 2, 3)].includes(4) // false
  [(1, 2, NaN)].includes(NaN) // true
```

### 该方法的第二个参数表示搜索的起始位置，默认为 0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为 3），则会重置为从 0 开始

```ts
const arr = [1, 2, 3]
arr.includes(3, 3) // false
arr.includes(3, -1) // true
```

### indexOf 方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对 NaN 的误判

```ts
const n = [NaN]
n.indexOf(NaN)
// -1
n.includes(NaN)
// true
```

### 下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本

```ts
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some((el) => el === value))()
contains(['foo', 'bar'], 'baz') // => false
```

::: warning 另外，Map 和 Set 数据结构有一个 has 方法，需要注意与 includes 区分

- Map 结构的 has 方法，是用来查找键名的，比如 Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)
- Set 结构的 has 方法，是用来查找值的，比如 Set.prototype.has(value)、WeakSet.prototype.has(value)
  :::

## 数组实例的 flat()，flatMap()

### 数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响

```ts
const arr = [1, 2, [3, 4]]
arr.flat()
// [1, 2, 3, 4]
```

### 如果不管有多少层嵌套，都要转成一维数组，可以用 Infinity 关键字作为参数

```ts
const arr = [1, 2, [3, [4, 5]]]
// [1, 2, 3, 4, 5]
arr.flat(2)[(1, 2, [3, [4, 5]])].flat(Infinity)
// [1, 2, 3, 4, 5]
```

### 如果原数组有空位，flat()方法会跳过空位

```ts
const arr = [1, 2, , 4, 5]
arr.flat()
// [1, 2, 4, 5]
```

### flatMap()方法对原数组的每个成员执行一个函数（相当于执行 Array.prototype.map()），然后对返回值组成的数组执行 flat()方法。该方法返回一个新数组，不改变原数组

```ts
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
const arr = [2, 3, 4]
arr.flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

### flatMap()只能展开一层数组，遍历函数返回的是一个双层的数组，但是默认只能展开一层

```ts
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
const arr = [2, 3, 4]
arr.flatMap((x) => [[x * 2]])
// [[2], [4], [6], [8]]
```

### flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组

```ts
arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])
```

## 数组的空位

### 数组的空位指，数组的某一个位置没有任何值。比如，Array 构造函数返回的数组都是空位

```ts
Array(3) // [, , ,]
```

### 空位不是 undefined，一个位置的值等于 undefined，依然是有值的。空位是没有任何值，in 运算符可以说明这一点

```ts
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
```

::: warning ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位

- forEach(), filter(), reduce(), every() 和 some()都会跳过空位
- map()会跳过空位，但会保留这个值
- join()和 toString()会将空位视为 undefined，而 undefined 和 null 会被处理成空字符串
- ES6 则是明确将空位转为 undefined
  :::

```ts
// forEach方法
[,'a'].forEach((x,i) => console.log(i)) // 1
// filter方法
['a',,'b'].filter(x => true) // ['a','b']
// every方法
[,'a'].every(x => x==='a') // true
// reduce方法
[1,,2].reduce((x,y) => x+y) // 3
// some方法
[,'a'].some(x => x !== 'a') // false
// map方法
[,'a'].map(x => 1) // [,1]
// join方法
[,'a',undefined,null].join('#') // "#a##"
// toString方法
[,'a',undefined,null].toString() // ",a,,"
```

### Array.from 方法会将数组的空位，转为 undefined

```ts
Array.from(['a', , 'b'])
// [ "a", undefined, "b" ]
```

### 扩展运算符（...）也会将空位转为 undefined

```ts
const arr = [...['a', , 'b']]
// [ "a", undefined, "b" ]
```

### copyWithin()会连空位一起拷贝

```ts
const arr = [, 'a', 'b', ,]
arr.copyWithin(2, 0)
// [,"a",,"a"]
```

### fill()会将空位视为正常的数组位置

```ts
new Array(3).fill('a')
// ["a","a","a"]
```

### for...of 循环也会遍历空位

```ts
let arr = [, ,]
for (let i of arr) {
  console.log(1)
}
// 1
// 1
```

### entries()、keys()、values()、find()和 findIndex()会将空位处理成 undefined

```ts
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]
// keys()
[...[,'a'].keys()] // [0,1]
// values()
[...[,'a'].values()] // [undefined,"a"]
// find()
[,'a'].find(x => true) // undefined
// findIndex()
[,'a'].findIndex(x => true) // 0
```

## Array.prototype.sort() 的排序稳定性

> 排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变

### straw 在 spork 的前面，跟原始顺序一致，所以排序算法 stableSorting 是稳定排序

```ts
const arr = ['peach', 'straw', 'apple', 'spork']
const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1
  return 1
}
arr.sort(stableSorting)
// ["apple", "peach", "straw", "spork"]
```

### 排序结果是 spork 在 straw 前面，跟原始顺序相反，所以排序算法 unstableSorting 是不稳定的

```ts
const unstableSorting = (s1, s2) => {
  if (s1[0] <= s2[0]) return -1
  return 1
}
arr.sort(unstableSorting)
// ["apple", "peach", "spork", "straw"]
```

# Object

## Object.defineProperty

::: tip Object.defineProperty(obj, prop, descriptor)

- obj：要定义属性的对象。
- prop：要定义或修改的属性的名称或 Symbol 。
- descriptor：要定义或修改的属性描述符。
  :::

### 示例

```ts
const object1 = {}
Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false,
})
object1.property1 = 77
// throws an error in strict mode
console.log(object1.property1)
// expected output: 42
```

::: tip descriptor 当中的属性

- configurable：当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
- enumerable：当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。默认为 false。
- 数据描述符还具有以下可选键值：
- value：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
- writable：当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。默认为 false。
- 存取描述符还具有以下可选键值：
- get：属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
  默认为 undefined。
- set：属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
  默认为 undefined。
  :::

### 创建属性

```ts
var o = {} // 创建一个新对象
// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(o, 'a', {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true,
})
// 对象 o 拥有了属性 a，值为 37
// 在对象中添加一个设置了存取描述符属性的示例
var bValue = 38
Object.defineProperty(o, 'b', {
  // 使用了方法名称缩写（ES2015 特性）
  // 下面两个缩写等价于：
  // get : function() { return bValue },
  // set : function(newValue) { bValue = newValue },
  get() {
    return bValue
  },
  set(newValue) {
    bValue = newValue
  },
  enumerable: true,
  configurable: true,
})
o.b // 38
// 对象 o 拥有了属性 b，值为 38
// 现在，除非重新定义 o.b，o.b 的值总是与 bValue 相同
// 数据描述符和存取描述符不能混合使用
Object.defineProperty(o, 'conflict', {
  value: 0x9f91102,
  get() {
    return 0xdeadbeef
  },
})
// 抛出错误 TypeError: value appears only in data descriptors, get appears only in accessor descriptors
```

### 修改属性

```ts
var o = {} // 创建一个新对象
Object.defineProperty(o, 'a', {
  value: 37,
  writable: false,
})
console.log(o.a) // logs 37
o.a = 25 // No error thrown
// (it would throw in strict mode,
// even if the value had been the same)
console.log(o.a)(
  // logs 37. The assignment didn't work.
  // strict mode
  function () {
    'use strict'
    var o = {}
    Object.defineProperty(o, 'b', {
      value: 2,
      writable: false,
    })
    o.b = 3 // throws TypeError: "b" is read-only
    return o.b // returns 2 without the line above
  }
)()
```

### 添加多个属性和默认值

```ts
var o = {}
o.a = 1
// 等同于：
Object.defineProperty(o, 'a', {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true,
})
// 另一方面，
Object.defineProperty(o, 'a', { value: 1 })
// 等同于：
Object.defineProperty(o, 'a', {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false,
})
```

### 自定义 Setters 和 Getters

```ts
function Archiver() {
  var temperature = null
  var archive = []
  Object.defineProperty(this, 'temperature', {
    get: function () {
      console.log('get!')
      return temperature
    },
    set: function (value) {
      temperature = value
      archive.push({ val: temperature })
    },
  })
  this.getArchive = function () {
    return archive
  }
}
var arc = new Archiver()
arc.temperature // 'get!'
arc.temperature = 11
arc.temperature = 13
arc.getArchive() // [{ val: 11 }, { val: 13 }]
```

### 继承属性

```ts
function myclass() {}
var value
Object.defineProperty(myclass.prototype, 'x', {
  get() {
    return value
  },
  set(x) {
    value = x
  },
})
var a = new myclass()
var b = new myclass()
a.x = 1
console.log(b.x) // 1
```

## Proxy

> 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）

### const p = new Proxy(target, handler)

::: tip 参数

- target：要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
- handler：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。
  :::

### 创建一个可撤销的 Proxy 对象

```ts
Proxy.revocable()
```

### 基础示例

```ts
const handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : 37
  },
}
const p = new Proxy({}, handler)
p.a = 1
p.b = undefined
console.log(p.a, p.b) // 1, undefined
console.log('c' in p, p.c) // false, 37
```

### 无操作转发代理，我们使用了一个原生 JavaScript 对象，代理会将所有应用到它的操作转发到这个对象上

```ts
let target = {}
let p = new Proxy(target, {})
p.a = 37 // 操作转发到目标
console.log(target.a) // 37. 操作已经被正确地转发
```

### 验证，通过代理，你可以轻松地验证向一个对象的传值

```ts
let validator = {
  set: function (obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer')
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid')
      }
    }
    // The default behavior to store the value
    obj[prop] = value
    // 表示成功
    return true
  },
}
let person = new Proxy({}, validator)
person.age = 100
console.log(person.age)
// 100
person.age = 'young'
// 抛出异常: Uncaught TypeError: The age is not an integer
person.age = 300
// 抛出异常: Uncaught RangeError: The age seems invalid
```

### 扩展构造函数，方法代理可以轻松地通过一个新构造函数来扩展一个已有的构造函数

```ts
function extend(sup, base) {
  var descriptor = Object.getOwnPropertyDescriptor(
    base.prototype,
    'constructor'
  )
  base.prototype = Object.create(sup.prototype)
  var handler = {
    construct: function (target, args) {
      var obj = Object.create(base.prototype)
      this.apply(target, obj, args)
      return obj
    },
    apply: function (target, that, args) {
      sup.apply(that, args)
      base.apply(that, args)
    },
  }
  var proxy = new Proxy(base, handler)
  descriptor.value = proxy
  Object.defineProperty(base.prototype, 'constructor', descriptor)
  return proxy
}
var Person = function (name) {
  this.name = name
}
var Boy = extend(Person, function (name, age) {
  this.age = age
})
Boy.prototype.sex = 'M'
var Peter = new Boy('Peter', 13)
console.log(Peter.sex) // "M"
console.log(Peter.name) // "Peter"
console.log(Peter.age) // 13
```

# Set

::: tip 集合
集合是由一组无序且唯一（即不能重复）的项组成的
:::

```ts
const set = new Set()
set.add(1)
console.log(set.values) // 输出@Iterator
console.log(set.has(1)) // true
console.log(set.size) // 1
```

## 小例子

```ts
const setA = new Set()
const setB = new Set()
setA.add(1)
setA.add(2)
setA.add(3)
setB.add(2)
setB.add(3)
setB.add(4)
```

### 求并集

```ts
const newSet = new Set([...setA, ...setB])
console.log(newSet) // { 1,2,3,4 }
```

### 求交集

```ts
const newSet = new Set([...setA].filter((v) => setB.has(v)))
console.log(newSet) // { 2, 3 }
```

### 求差集

```ts
const newSet = new Set([...setA].filter((v) => !setB.has(v)))
console.log(newSet) // { 1 }
```
