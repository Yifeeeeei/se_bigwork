// pages/clubhome/clubhome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubIDlist:[],
    clubNum:0,
  },
  createTap:function(){
    console.log("trying to create a club.")
  },
  registerTap:function(){
    console.log("trying to get in a club.")
  },
  toClubpage:function(){
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  getclubList:function(){
    this.data.clubIDlist=['0','1','2','3'],
    this.setData({
      clubIDlist:this.data.clubIDlist,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getclubList()
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