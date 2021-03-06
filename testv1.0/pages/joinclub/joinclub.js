// pages/clubpage/clubpage.js
var app=getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_club_name:"",
    current_club_discription:"",
    current_club_structure:[],
    current_club_rootid:"",
    current_club_id:"",
    tree:{},
    menuitems: [{
      text: '社团名称',
      url: '#',
      icon: '/images/club/1.png',
      info: '',
      flag:0
    },
    {
      text: '社团简介',
      url: '#',
      icon: '/images/club/4.png',
      info: '',
      flag:1
    },
  ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let backend=app.globalData.backendip
    let that=this
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('toclubjoin',(res)=>{
      console.log(res.data)
      wx.request({
        url:   backend+'/api/get/club',
        data:{
          id:res.data
        },
        method:"POST",
        header :{
          'content-type': 'application/json'
        },
        success:res2=>{
          that.setData({
            current_club_name:res2.data['name'],
            current_club_discription:res2.data['discription'],
            current_club_rootid:res2.data['root_container_id'],
            current_club_id:res2.data.id
          })
          wx.request({
            url:   backend+'/api/get/container',
            data:{
              id:res2.data['root_container_id']
            },
            method:"POST",
            header :{
              'content-type': 'application/json'
            },
            success:res3=>{
              console.log(res3)
              that.setData({
                tree:{
                  name:res3.data['name'],
                  members: res3.data.contains,
                  child: res3.data.lower_containers_id,
                  container_id:res3.data.id,
                  rooter_id:res3.data.contains[0]
                }
              })
            }
          })
        }
      })
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