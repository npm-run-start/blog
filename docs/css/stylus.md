# Stylus

## 特性

- 冒号可有可无
- 分号可有可无
- 逗号可有可无
- 括号可有可无
- 变量
- 插值（Interpolation）
- 混合（Mixin）
- 数学计算
- 强制类型转换
- 动态引入
- 条件表达式
- 迭代
- 嵌套选择器
- 父级引用
- Variable function calls
- 词法作用域
- 内置函数（超过 60 个）
- 语法内函数（In-language functions）
- 压缩可选
- 图像内联可选
- Stylus 可执行程序
- 健壮的错误报告
- 单行和多行注释
- CSS 字面量
- 字符转义
- TextMate 捆绑

## 安装

```ts
yarn global add stylus
```

## stylus 基本编译命令

```ts
//xxx是你创建的文件名  -o 的意思是-out 输出css文件
stylus xxx.styl -o xxx.css
//在原有的基础上加了-w  w的意思是watch，这样就可以实时监听修改，并实时编译
stylus -w xxx.styl -o xxx.css
```

## 选择器

### 缩进

```css
body
  color white
```

### 规则集

```css
textarea, input
  border 1px solid #eee
/* 或者 */
textarea
input
  border 1px solid #eee
```

### 父级引用

```css
textarea
input
  color #A7A7A7
  &:hover
    color #000
```

### 父级引用

```css
font-size = 14px
body
  font font-size Arial, sans-seri
/* 变量甚至可以组成一个表达式列表 */
font-size = 14px
font = font-size "Lucida Grande", Arial
body
  font font sans-serif
```

### 属性查找

#### Stylus 有另外一个很酷的独特功能，不需要分配值给变量就可以定义引用属性。下面是个很好的例子，元素水平垂直居中对齐（典型的方法是使用百分比和 margin 负值），如下

```css
#logo
  position: absolute
  top: 50%
  left: 50%
  width: w = 150px
  height: h = 80px
  margin-left: -(w / 2)
  margin-top: -(h / 2)
```

#### 我们不使用这里的变量 w 和 h, 而是简单地前置@字符在属性名前来访问该属性名对应的值

```css
#logo
  position: absolute
  top: 50%
  left: 50%
  width: 150px
  height: 80px
  margin-left: -(@width / 2)
  margin-top: -(@height / 2)
```

#### 默认指定 z-index 值为 1，但是，只有在 z-index 之前未指定的时候才这样

```css
position()
  position: arguments
  z-index: 1 unless @z-index
#logo
  z-index: 20
  position: absolute
#logo2
  position: absolute
```

#### 属性会“向上冒泡”查找堆栈直到被发现，或者返回 null（如果属性搞不定）。下面这个例子，@color 被弄成了 blue

```css
body
  color: red
  ul
    li
      color: blue
      a
        background-color: @color
```

### 混合书写

#### 混入

```css
border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n
/* 使用 */
form input[type=button]
  border-radius(5px)
```

#### 父级引用

```css
stripe(even = #fff, odd = #eee)
 tr
   background-color odd
   &.even
   &:nth-child(even)
       background-color even
/* 使用 */
table
  stripe()
  td
    padding 4px 10px
table#users
  stripe(#303030, #494848)
  td
    color white
```

#### 混合书写中的混合书写

```css
/* 我们创建内联comma-list()（通过inline-list()）以及逗号分隔的无序列表 */
inline-list()
  li
    display inline
comma-list()
  inline-list()
  li
    &:after
      content ', '
    &:last-child:after
      content ''
/* 使用 */
ul
  comma-list()
```

### 函数

##### Stylus 强大之处就在于其内置的语言函数定义。其定义与混入(mixins)一致；却可以返回值

#### 返回值

```ts
add(a, b)
  a + b
/* 使用 */
body
  padding add(10px, 5)
```

#### 默认参数

```ts
add(a, (b = a))
a + b
add(10, 5)
// => 15
add(10)
// => 20
```

#### 函数体

```ts
/* 通过内置unit()把单位都变成px, 因为赋值在每个参数上，因此，我们可以无视单位换算 */
add(a, b = a)
  a = unit(a, px)
  b = unit(b, px)
  a + b

add(15%, 10deg)
// => 25
```

#### 多个返回值

```ts
/* 变量赋多个值 */
sizes = 15px 10px
/* 使用 */
sizes[0]
// => 15px
/* 函数返回多个值 */
sizes()
 15px 10px
/* 使用 */
sizes()[0]
// => 15px
```

#### 条件

```ts
stringish(val)
  if val is a 'string' or val is a 'ident'
    yes
  else
    no
/* 使用 */
stringish('yay') == yes
// => true
stringish(yay) == yes
// => true
stringish(0) == no
// => true
```

#### 变量函数

```ts
// 我们可以把函数当作变量传递到新的函数中。例如，invoke()接受函数作为参数，因此，我们可以传递add()以及sub()
invoke(a, b, fn)
  fn(a, b)

add(a, b)
  a + b

sub(a, b)
  a - b

// 使用
body
  padding invoke(5, 10, add)
  padding invoke(5, 10, sub)
```

#### 参数

```ts
// arguments是所有函数体都有的局部变量，包含传递的所有参数
sum()
  n = 0
  for num in arguments
    n = n + num
// 使用
sum(1,2,3,4,5)
// => 15
```
