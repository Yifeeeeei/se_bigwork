// pages/createClub/createClub.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuTapCurrent:0,
    clubname:"",
    tmpsearchname:"",
    clubdescription:"暂无简介~",
    tmpdes:"",
    newclubid:"",
    newrootid:"",
    clubinput:null,
    disinput:null,
    searchinput:null,
    foundlist:[],
    listshow:false
  },
  menuTap:function(e){
    var current=e.currentTarget.dataset.current;//获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
    menuTapCurrent:current
    });
    },
    searchinput:function(e){
      this.setData({
        tmpsearchname:e.detail.value
      })
    },
    searchBtnClick:function(){
      let that=this
      let backend=app.globalData.backendip
      console.log(that.data.tmpsearchname)
      if(this.data.tmpsearchname.length==0){
        wx.showModal({
          title:'提示',
          content:'搜索关键字不能为空！',
          showCancel:false
        })
      }else{
        wx.request({
          url: backend+'/api/search/club',
          data:{
            keyword:that.data.tmpsearchname
          },
          method:"POST",
          header :{
            'content-type': 'application/json'
          },
          success:res=>{
            console.log(res)
            that.setData({
              foundlist:res.data['club_list'],
              listshow:true
            })
          }
        })
      }
    },
    clubnameinput:function(e){
      this.setData({
        tmpname:e.detail.value
      })
    },
    descriptioninput:function(e){
      this.setData({
        tmpdes:e.detail.value
      })
    },
    loginBtnClick:function(){
      let that=this
      if(this.data.tmpname.length == 0){
        wx.showModal({
          title:'提示',
          content:'社团名称不能为空！',
          showCancel:false
        })
      }else if(this.data.tmpdes.length==0){
        this.setData({
          clubname:this.data.tmpname,
        })
        console.log(this.data.clubname)
        console.log(this.data.clubdescription)
        wx.showModal({
          title:'提示',
          content:'是否确定创建社团',
          confirmText:'确定',
          cancelText:'取消',
          success:res=>{
            wx.showModal({
              title:'提示',
              content:'创建成功！',
              showCancel:false,
              success:res=>{
                that.createclub()
              }
            })
          }
        })
      }else{
        this.setData({
          clubname:this.data.tmpname,
          clubdescription:this.data.tmpdes
        })
        console.log(this.data.clubname)
        console.log(this.data.clubdescription)
        wx.showModal({
          title:'提示',
          content:'是否确定创建社团',
          confirmText:'确定',
          cancelText:'取消',
          success:res=>{
            wx.showModal({
              title:'提示',
              content:'创建成功！',
              showCancel:false,
              success:res=>{
                that.createclub()
              }
            })
          }
        })
      }
    },
    createclub:function(){
      let backend=app.globalData.backendip
      let that=this
      wx.request({
        url: backend+'/api/create/club',
        data:{
          'id':'1',
          'name':that.data.clubname,
          'discription':that.data.clubdescription,
          'containers_id':[],
          'root_container_id':'lyqtest1',
          'member_id':app.globalData.userID
          
        },
        method:"POST",
        header :{
          'content-type': 'application/json'
        },
        success:res=>{
          console.log(res)
          let clubid=res.data['club_id']
          let rootid=res.data['root_container_id']
          that.setData({
            newclubid:clubid,
            newrootid:rootid
          }),
          that.eventChannel()
        }
      })
    },
    eventChannel(){
      let that=this
      wx.navigateTo({
        url: '../clubstructure/clubstructure',
        success(res){
          res.eventChannel.emit('tostructPage',{curclubid:that.data.newclubid,currootid:that.data.newrootid})
        }
      })
    },
    toClubjoin:function(e){
      let clubid=e.currentTarget.dataset.name
      wx.navigateTo({
        url: '../joinclub/joinclub',
        success(res){
          res.eventChannel.emit('toclubjoin',{data:clubid})
        }
      })
    },
  onLoad: function (options) {

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