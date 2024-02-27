# 背景音乐

:::warning
安卓默认 dom 不会播放音视频，所以最好弹框按钮开始
:::

## JS

```ts
// utils/music.js
function playMusic(target) {
  const doc = document
  target.play()

  const wxReady = () => {
    target.play()
    doc.removeEventListener('WeixinJSBridgeReady', wxReady, false)
  }

  const touchend = () => {
    target.play()
    doc.removeEventListener('touchend', touchend, false)
  }

  doc.addEventListener('WeixinJSBridgeReady', wxReady, false)
  doc.addEventListener('touchend', touchend, false)
}

export function createMusic(type) {
  const img = new Image()
  img.src = `images/music.png`

  const box = document.createElement('div')
  box.classList.add('music')
  box.appendChild(img)

  const audio = document.createElement('audio')
  audio.src = `media/${type}.mp3`
  audio.loop = true

  const section = document.createElement('section')
  // section.classList.add(`${type}Music`);
  section.appendChild(box)
  section.appendChild(audio)

  playMusic(audio)

  box.onclick = function () {
    box.classList.contains('stop') ? audio.play() : audio.pause()
    box.classList.contains('stop')
      ? box.classList.remove('stop')
      : box.classList.add('stop')
  }
  document.body.appendChild(section)

  // return section;
}
```

## CSS

```scss
@keyframes spin {
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

.music {
  position: absolute;
  z-index: 1000;
  top: 3%;
  right: 3%;
  width: 0.72rem;
  overflow: hidden;
  border-radius: 100%;
  animation: spin 6s linear infinite;
}

.music.stop {
  animation-play-state: paused;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 52%;
    width: 2px;
    height: 100%;
    transform: rotate(-45deg);
    background-color: #313131;
  }
}
```

## 使用

```ts
import { createMusic } from '@utils/music';

mounted() {
    createMusic('game');
}
```
