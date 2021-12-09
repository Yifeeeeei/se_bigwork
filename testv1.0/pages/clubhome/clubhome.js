// pages/clubhome/clubhome.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerlist:[],
    clubIDlist:[],
    clubNamelist:[],
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
    let userid=app.globalData.userID
    let backend=app.globalData.backendip
    let that=this
    console.log(userid)
    wx.request({
      url: 'http://'+backend+'/api/get/member',
      data:{
        'id':userid
      },
      method:"POST",
      header :{
        'content-type': 'application/json'
      },
      success:res=>{
        console.log(res)
        that.setData({
          containerlist:res.data['belongs_to_container_id']
        })
        that.data.containerlist.forEach(tmp_container=>{
          wx.request({
            url: 'http://'+backend+'/api/get/container',
            data:{
              'id':tmp_container
            },
            method:"POST",
            header :{
              'content-type': 'application/json'
            },
            success:res2=>{
              console.log(res2)
              let clubid=res2.data['belongs_to_club_id']
              wx.request({
                url: 'http://'+backend+'/api/get/club',
                data:{
                  'id':clubid
                },
                method:"POST",
                header :{
                  'content-type': 'application/json'
                },
                success:res3=>{
                  that.setData({
                    clubNamelist:clubNamelist.append(res3['name']),
                    clubIDlist:clubIDlist.append(res3['id'])
                  })
                }
              })
            }
          })
        })
      }
    })
  },
  jumptocreate:function(){
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