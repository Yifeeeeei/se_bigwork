// pages/createClub/createClub.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuTapCurrent:0,
    clubname:"",
    clubdescription:"暂无简介~",
    tmpdes:"",
    newclubid:"",
    newrootid:"",
    clubinput:null,
    disinput:null
  },
  menuTap:function(e){
    var current=e.currentTarget.dataset.current;//获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
    menuTapCurrent:current
    });
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
          content:'创建成功！',
          showCancel:false
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
          content:'创建成功！',
          showCancel:false,
          success(){
            that.createclub()
          }
        })
      }
    },
    createclub:function(){
      let backend=app.globalData.backendip
      let that=this
      wx.request({
        url: 'http://'+backend+'/api/create/club',
        data:{
          'id':'1',
          'name':that.data.clubname,
          'discription':that.data.clubdescription,
          'containers_id':[],
          'root_container_id':'lyqtest1'
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