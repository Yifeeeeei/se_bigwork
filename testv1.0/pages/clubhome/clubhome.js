// pages/clubhome/clubhome.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    var tmplist1 = this.data.clubIDlist
    tmplist1.splice(0)
    var tmplist2 = this.data.clubNamelist
    tmplist2.splice(0)
    this.setData({
      clubIDlist:tmplist1,
      clubNamelist:tmplist2,
    })
    let userid=app.globalData.userID
    let backend=app.globalData.backendip
    let that=this
    console.log(userid)
    wx.request({
      url: 'http://'+backend+'/api/actions/inclub',
      data:{
        'member_id':userid
      },
      method:"POST",
      header :{
        'content-type': 'application/json'
      },
    
      success:res=>{
        console.log(res)
        that.setData({
          clubIDlist:res.data['club_id']
        })
        if(res.data['club_id'].length!=0){
          res.data['club_id'].forEach(tmp_club=>{
            wx.request({
              url: 'http://'+backend+'/api/get/club',
              data:{
                'id':tmp_club
              },
              method:"POST",
              header :{
                'content-type': 'application/json'
              },
              success:res2=>{
                console.log(res2)
                var tmpnamelist=that.data.clubNamelist
                tmpnamelist.push(res2.data['name'])
                that.setData({
                  clubNamelist:tmpnamelist
                  
                })
              }
            })
          })
        }
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
    var tmpidlist = this.data.clubIDlist
    tmpidlist.splice(0)
    var tmpnamelist = this.data.clubNamelist
    tmpnamelist.splice(0)
    this.setData({
      clubIDlist:tmpidlist,
      clubNamelist:tmpnamelist,
    })
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