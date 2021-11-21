// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    let self=this
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        if(res.code){
          let code = res.code
          let appid='wx8f6433359ab40480'
          let secret = 'a513154024c735fdf2d242469069c0c8'
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code',
            success :(res2) =>{
              console.log(res2.data)
              let sessionkey=res2.data.session_key
              self.globalData.userID=res2.data.openid
              wx.setStorageSync('sessionKey', sessionkey)
            }
          })
        }else{
          console.log('fail')
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userID: null,
    backendip:'82.157.127.241:11452'
  }
})
