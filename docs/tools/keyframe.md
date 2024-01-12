# 帧动画

:::info 需要引入的源码
[https://github.com/vmllab-js/FramePlayer](https://github.com/vmllab-js/FramePlayer)
:::

## 封装

```ts
// utils/VF.js
const vFramePlayer = require('./vframeplayer.js')

// 图片路径格式要统一
const vframePics = (file, length) => {
  return new Array(length)
    .fill()
    .map(
      (_, i) =>
        `images/player/${file}/${file}${i < 9 ? '000' : '00'}${i + 1}.png`
    )
}

export const vFramePlay = (dom, file, length, fps) => {
  const player = new vFramePlayer({
    dom, // dom节点
    imgArr: vframePics(file, length), // 图片序列数组
    fps: fps || 10, // 每秒显示帧数
    userCanvas: true, // 是否使用canvas播放
    loop: -1, // 循环次数，-1为无限循环
    // yoyo: true // loop为true时才生效，往回放
  })
  player.play()
}
```

## 使用

```ts
<div ref="k" class="k"></div>

import { vFramePlay } from '@utils/VF';

mounted() {
    vFramePlay(this.$refs.k, 'k', 10, 8);
}
```
