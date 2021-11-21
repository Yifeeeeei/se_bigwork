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
    let backend=app.globalData.backendip
    wx.request({
      url: 'http://'+backend+'/api/create/club',
      data:{
        'id':'1',
        'name':'啦啦啦',
        'discription':'',
        'containers_id':[],
        'root_container_id':'lyqtest1'
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
  getclub(){
    let backend=app.globalData.backendip
    wx.request({
      url: 'http://'+backend+'/api/get/club',
      data:{
        'id':'club37983104'
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
  updateclub(){
    let backend=app.globalData.backendip
    wx.request({
      url: 'http://'+backend+'/api/update/club',
      data:{
        'id':'club37983104',
        'name':'lyqclub',
        'discription':'lalala',
        'containers_id':[],
        'root_container_id':'lyqtest1'
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
  createcontainer(){
    let backend=app.globalData.backendip
    wx.request({
      url: 'http://'+backend+'/api/create/container',
      data:{
        'id':'1',
        'name':'部长',
        'belongs_to_club_id':'club37983104',
        'upper_container_id':'Container18922408',
        'contains':[],
        'lower_containers_id':[],
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
  getcontainer(){
    let backend=app.globalData.backendip
    wx.request({
      url: 'http://'+backend+'/api/get/container',
      data:{
        'id':'Container55428184',
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
    this.getclubList()
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