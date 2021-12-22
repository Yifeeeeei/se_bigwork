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
    wx.getSetting({
      success(res) {
        wx.authorize({
          scope:'scope.address',
          success() {

          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    userID: null,
    backendip:'https://sebigwork.whiteffire.cn',
    code:null,
    specialclubID:"club38935964"
  }
})
