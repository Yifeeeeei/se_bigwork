// pages/user info/user info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    menuitems: [{
        text: '昵称',
        url: '#',
        icon: '/images/user/1.png',
        info: ''
      },
      {
        text: '性别',
        url: '#',
        icon: '/images/user/2.png',
        info: ''
      },
      {
        text: '所在社团',
        url: '#',
        icon: '/images/user/3.png',
        info: ''
      }
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.getUserProfile({
      desc: 'desc',
    })
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          menuitems: [{
              text: '昵称',
              url: '#',
              icon: '/images/user/1.png',
              info: res.userInfo.nickName
            },
            {
              text: '性别',
              url: '#',
              icon: '/images/user/2.png',
              info: res.userInfo.gender
            },
            {
              text: '所在社团',
              url: '#',
              icon: '/images/user/3.png',
              info: '无'
            }
          ],
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})