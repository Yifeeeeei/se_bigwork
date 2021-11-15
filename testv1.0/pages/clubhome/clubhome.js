// pages/clubhome/clubhome.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubIDlist:[],
    clubNum:0
  },
  toClubpage:function(e){
    let clubname=e.currentTarget.dataset.name

    wx.navigateTo({
      url: '../clubpage/clubpage',
      success(res){
        res.eventChannel.emit('toclubPage',{data:clubname})
      }
    })
  },
  getclubList:function(){
    this.data.clubIDlist=['0','1','2','3'],
    this.setData({
      clubIDlist:this.data.clubIDlist,
    })
  },
  createmember:function(){
    let backend=app.globalData.backendip
    wx.request({
      url: 'http://'+backend+'/api/create/member',
      data:{
        'id':app.globalData.userID,
        'name':'lyqtest',
        'belongs_to_container_id' : [],//这个人处于的container id列表
        'ddls_received_id' : [],//接收到了ddl id列表
        'ddls_sent_id' : [],//发送过的ddl id列表
        'ddls_checked_id' : [],//这个人自己check过的ddl id列表
        'notices_received_id' : [],//接收到的notice id列表
        'notices_checked_id' : [],//这个人check过的notice id列表
        'notices_sent_id' : [],//这个人发出的notice id列表
      },
      method:"POST",
      header :{
        'content-type': 'application/json'
      },
      success(res){
        console.log(res)
      }
    })
  },
  createclub:function(){
    wx.navigateTo({
      url: '../createClub/createClub',
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