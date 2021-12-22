// pages/user info/user info.js
const app = getApp()
Page({


  data: {

    menuitems: [{
        text: '昵称',
        url: '#',
        icon: '/images/user/1.png',
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
  rename:function(e){
    let that=this
    let backend=app.globalData.backendip
    wx.showModal({
      title:"请输入要更改的昵称（不超过10个字）",
      editable:true,
      placeholderText:"请注意，该昵称将用于本小程序之后所有的申请、展示！",
      confirmText:"确定提交",
      cancelText:"取消",
      success:res=>{
        if(res.confirm){
          if(res.content.length==0){
            wx.showModal({
              title:'',
              content:"用户昵称不能为空！",
              showCancel:false
            })
          }else if(res.content.length>10){
            wx.showModal({
              title:'',
              content:"用户昵称长度不能超过10！",
              showCancel:false
            })
          }else{
            wx.request({
              url: 'http://'+backend+'/api/modify/name',
              data:{
                member_id:app.globalData.userID,
                new_name:res.content
              },
              method:"POST",
              header :{
                'content-type': 'application/json'
              },
              success:res2=>{
                console.log(res2)
                wx.showModal({
                  title:'',
                  content:"用户昵称修改成功！",
                  showCancel:false,
                  success:res3=>{
                    let tmp=that.data.menuitems
                    tmp[0].info=res.content
                    that.setData({
                      menuitems:tmp
                    })
                  }
                })
              }
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that=this
    let backend=app.globalData.backendip
    if (wx.getUserProfile) {
      wx.request({
        url: 'http://'+backend+'/api/get/member',
        data:{
          id:app.globalData.userID,
        },
        method:"POST",
        header :{
          'content-type': 'application/json'
        },
        success:res3=>{
          console.log(res3)
          let tmpmenu=[{
            text: '昵称',
            url: '#',
            icon: '/images/user/1.png',
            info: res3.data.name
          },{
            text: '所在社团数量',
            url: '#',
            icon: '/images/user/3.png',
            info: res3.data.belongs_to_container_id.length
          }]
          this.setData({
            canIUseGetUserProfile: true,
            menuitems:tmpmenu
          })
        }
      })
    }
    
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