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
    currentTab: 0,
    checkedddl: [],
    notcheckedddl: [],
    outddl:[],
    inform:[]
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ 
      currentTab: e.detail.current 
    });
  }, 

  /*点击tab切换*/
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } 
    else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      that.onShow()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let backend=app.globalData.backendip
    let that=this
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('toclubPage2',(res)=>{
      console.log(res.data)
      wx.request({
        url: 'http://'+backend+'/api/get/club',
        data:{
          id:res.data
        },
        method:"POST",
        header :{
          'content-type': 'application/json'
        },
        success:res2=>{
          that.setData({
            current_club_id:res2.data['id'],
            current_club_name:res2.data['name'],
            current_club_discription:res2.data['discription'],
            current_club_rootid:res2.data['root_container_id']
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
    let date = util.formatTime(new Date())
    console.log(date)
    let repTime = date.replace(/-/g, '/')
    let nowtimeTamp = Date.parse(repTime+":00")
    console.log(nowtimeTamp)
    let backend = app.globalData.backendip
    let that = this
    console.log(1)
    console.log(app.globalData.userID)
    wx.request({
      url: 'http://' + backend + '/api/get/member',
      data: {
        'id': app.globalData.userID,
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success:res=> {
        let inform=[]
        
        for(let i=0;i<res.data.notices_received_id.length;i++)
        {
          let backend = app.globalData.backendip
          let _that = that
        wx.request({
          url: 'http://' + backend + '/api/get/notice',
          data: {
            'id': res.data.notices_received_id[i],
          },
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          success:res1=> {
            console.log(res1.data)
            if(res1.data['club_id']==_that.data.current_club_id){
              inform.push(res1.data)
            }
            _that.setData({
              inform:inform
            })
          }
        })
          
        }
        let checkedddl = []
        let notcheckedddl = []
        for (let i=0;i<res.data.ddls_received_id.length;i++) {
          let flag = false
          for (let j=0;j<res.data.ddls_checked_id.length;j++) {
            if (res.data.ddls_checked_id[j] == res.data.ddls_received_id[i]) {
              flag = true
              checkedddl.push(res.data.ddls_checked_id[j])
              break
            }
          }
          if (flag == false) {
            notcheckedddl.push(res.data.ddls_received_id[i])
          }
        }
        console.log(notcheckedddl)
        let checkedddllist = []
        let notcheckedddllist = []
        let outddllist=[]
        for (let i=0;i<checkedddl.length ; i++) {
          let backend = app.globalData.backendip
          let _that = that
          wx.request({
            url: 'http://' + backend + '/api/get/ddl',
            data: {
              'id': checkedddl[i],
            },
            method: "POST",
            header: {
              'content-type': 'application/json'
            },
            success:res1=> {
              console.log(res1.data)
              if(res1.data['club_id']==_that.data.current_club_id){
                checkedddllist.push(res1.data)
              }
              _that.setData({
                checkedddl: checkedddllist,
                notcheckedddl: notcheckedddllist,
              })
            }
          })
        }
        for (let i=0;i<notcheckedddl.length;i++) {
          let backend = app.globalData.backendip
          let _that = that
          wx.request({
            url: 'http://' + backend + '/api/get/ddl',
            data: {
              'id': notcheckedddl[i],
            },
            method: "POST",
            header: {
              'content-type': 'application/json'
            },
            success:res1=> {
              console.log(res1.data)
              let date=res1.data.end_date
              let repTime = date.replace(/-/g, '/')
              let endtimeTamp = Date.parse(repTime+":00")
              if(res1.data['club_id']==_that.data.current_club_id){
                if(endtimeTamp>nowtimeTamp)
                {
                  notcheckedddllist.push(res1.data)
                }
                else
                {
                  outddllist.push(res1.data)
                }
              }
              _that.setData({
                checkedddl: checkedddllist,
                notcheckedddl: notcheckedddllist,
                outddl:outddllist
              })
            }
          })
        }
      }
    })     
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