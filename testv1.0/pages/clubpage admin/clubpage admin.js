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
    current_container_name:"",
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
      
    }
  },
  createddl:function(e){
    let club_id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../createddl/createddl',
      success(res){
        res.eventChannel.emit('toddlPage',{data:club_id})
      }
    })
  },
  createinform:function(e){
    let club_id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../createinform/createinform',
      success(res){
        res.eventChannel.emit('toinformPage',{data:club_id})
      }
    })
  },
  tomanage:function(e){
    let club_id=e.currentTarget.dataset.id
    let that=this
    console.log(e)
    wx.navigateTo({
      url: '../club info admin/club info admin',
      success(res){
        console.log(res)
        res.eventChannel.emit('tomanagePage',{data:{
          "club_id":club_id,
          "containername":that.data.current_container_name
        }})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let backend=app.globalData.backendip
    let that=this
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('toclubPage1',(res)=>{
      console.log(res.data)
      wx.request({
        url: backend+'/api/get/club',
        data:{
          id:res.data.clubid
        },
        method:"POST",
        header :{
          'content-type': 'application/json'
        },
        success:res2=>{
          that.setData({
            current_container_name:res.data.containername,
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
  todetail: function (e) {
    let a = e.currentTarget.dataset.id;
    console.log(a)
    let backend = app.globalData.backendip
    let that = this
    
    
    if (e.currentTarget.dataset.flag == 1) {
      wx.showModal({
        title: e.currentTarget.dataset.name,
        content: '内容:' + e.currentTarget.dataset.content + '\n' + '状态:未完成'+
        '\n'+'发布日期:'+e.currentTarget.dataset.post_date+
        '\n'+'截止日期:'+e.currentTarget.dataset.end_date,
        confirmText: '已完成',
        success: res=> {
          let _that=that
          if (res.confirm) {
            console.log('确')
            wx.request({
              url:   backend+'/api/check/ddl',
              data:{
                'ddl_id':a,
                'checker_id':app.globalData.userID
              },
              method:"POST",
              header :{
                'content-type': 'application/json'
              },
              success(res1){
                console.log(res1.data)
                _that.onShow()
              }
            })
          } else {
            console.log('取消')
          }
        }
      })
    } else if (e.currentTarget.dataset.flag == 0) {
      wx.showModal({
        title: e.currentTarget.dataset.name,
        content: '内容:' + e.currentTarget.dataset.content + '\n' + '状态:过期'+
        '\n'+'发布日期:'+e.currentTarget.dataset.post_date+
        '\n'+'截止日期:'+e.currentTarget.dataset.end_date,
        success: function (res) {
          if (res.confirm) {
            console.log('确')
          } else {
            console.log('取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: e.currentTarget.dataset.name,
        content: '内容:' + e.currentTarget.dataset.content + '\n' + '状态:已完成'+
        '\n'+'发布日期:'+e.currentTarget.dataset.post_date+
        '\n'+'截止日期:'+e.currentTarget.dataset.end_date,
        success: function (res) {
          if (res.confirm) {
            console.log('确')
          } else {
            console.log('取消')
          }
        }
      })
    }

  },
  toinform: function (e) {
    /*
    let a=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../informdetail/informdetail?id='+a,
    })*/
    let nowshow=e.currentTarget.dataset
    console.log(nowshow)
      if(nowshow.clubid==app.globalData.specialclubID)
      {
        if(nowshow.information.state=="apply")
        {
          wx.showModal({
            title: nowshow.name,
            content: '内容:' + nowshow.content +
            '\n'+'发布日期:'+nowshow.post_date,
            confirmText:'接受',
            cancelText:'拒绝',
            success: function (res) {
              if (res.confirm) {
                console.log('que')
                let backend=app.globalData.backendip
                let that=this
                wx.request({
                  url:   backend+'/api/delete/notice',
                  data:{
                    'notice_id':nowshow.id
                  },
                  method:"POST",
                  header :{
                    'content-type': 'application/json'
                  },
                  success(res2){
                    console.log(res2.data)
                  }
                })
                wx.request({
                  url:   backend+'/api/actions/join_container',
                  data:{
                    'member_id':nowshow.member_id,
                    'container_id':nowshow.information.container_id
                  },
                  method:"POST",
                  header :{
                    'content-type': 'application/json'
                  },
                  success(res1){
                    console.log(res1)
                    wx.request({
                      url:   backend+'/api/create/notice',
                      data:{
                        'id':4125,
                        'name':'接受申请',
                        'club_id':app.globalData.specialclubID,
                        'post_date':util.formatTime(new Date()),
                        'content':JSON.stringify({state:"accept",
                        content:'您对'+nowshow.information.container_name+'的申请已被接受'}),
                        'from_member_id':app.globalData.userID,
                        'to_members_id':[nowshow.member_id]
                      },
                      method:"POST",
                      header :{
                        'content-type': 'application/json'
                      },
                      success(res2){
                        console.log(res2.data)
                      }
                    })
                  }
                })
              } else {
                console.log('取消')
                let backend=app.globalData.backendip
                wx.request({
                  url:   backend+'/api/delete/notice',
                  data:{
                    'notice_id':nowshow.id
                  },
                  method:"POST",
                  header :{
                    'content-type': 'application/json'
                  },
                  success(res2){
                    console.log(res2.data)
                  }
                })
                wx.request({
                  url:   backend+'/api/create/notice',
                  data:{
                    'id':4125,
                    'name':'拒绝申请',
                    'club_id':app.globalData.specialclubID,
                    'post_date':util.formatTime(new Date()),
                    'content':JSON.stringify({state:"reject",
                  content:'您对'+nowshow.information.container_name+'的申请已被拒绝'}),
                    'from_member_id':app.globalData.userID,
                    'to_members_id':[nowshow.member_id]
                  },
                  method:"POST",
                  header :{
                    'content-type': 'application/json'
                  },
                  success(res2){
                    console.log(res2.data)
                  }
                })
              }
            }
          })
        }
        else
        {
          wx.showModal({
            title: nowshow.name,
            content: '内容:' + nowshow.content +
            '\n'+'发布日期:'+nowshow.post_date,
            success: function (res) {
              if (res.confirm) {
                console.log('确定')
              } else {
                console.log('取消')
              }
            }
          })
        }
        
      }
      else
      {
        wx.showModal({
          title: nowshow.name,
          content: '内容:' + nowshow.content +
          '\n'+'发布日期:'+nowshow.post_date,
          success: function (res) {
            if (res.confirm) {
              console.log('确')
            } else {
              console.log('取消')
            }
          }
        })
      }
      
    
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
      url:  backend + '/api/get/member',
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
          url: backend + '/api/get/notice',
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
            url:  backend + '/api/get/ddl',
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
            url:  backend + '/api/get/ddl',
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