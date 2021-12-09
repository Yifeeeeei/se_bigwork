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
        self.globalData.code=res.code
        console.log(res.code)
      }
    })
  },
  globalData: {
    userInfo: null,
    userID: null,
    backendip:'82.157.127.241:11452',
    code:null
  }
})
