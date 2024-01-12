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

  const jukebox = document.createElement('div')
  jukebox.classList.add('music')
  jukebox.appendChild(img)

  const audio = document.createElement('audio')
  audio.src = `media/${type}.mp3`
  audio.loop = true

  const section = document.createElement('section')
  // section.classList.add(`${type}Music`);
  section.appendChild(jukebox)
  section.appendChild(audio)

  playMusic(audio)

  jukebox.onclick = function () {
    jukebox.classList.contains('stop') ? audio.play() : audio.pause()
    jukebox.classList.contains('stop')
      ? jukebox.classList.remove('stop')
      : jukebox.classList.add('stop')
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
