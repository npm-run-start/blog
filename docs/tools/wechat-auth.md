# 微信授权

## 使用

```ts
<div @click="getWxToken"></div>
computed: {
  token() {
    return this.$route.query.token;
  }
},
methods: {
  // 按照规范，需要主动触发（点击等事件）授权
  getWxToken() {
    if (!this.token) {
      const appid = 'xxx';
      // 授权后重定向的地址
      const target_url = encodeURIComponent(location.origin + location.pathname);
      // 后台接口地址
      const redirect_uri = encodeURIComponent('xxx/wechat/wechatRedirect');
      window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}?target_url=${target_url}&response_type=code&scope=snsapi_userinfo#wechat_redirect`);
    } else {
      setUserToken(this.token);
      this.$router.replace('/page1');
    }
  },
}
```
