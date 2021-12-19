// pages/ddl.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ddlData: [{
        string: "123",
        outdate: 0,
        uid: 12341
      },
      {
        string: "456",
        outdate: 1,
        uid: 5421
      },
      {
        string: "789",
        outdate: 2,
        uid: 58172
      }
    ],
    checkedddl: [],
    notcheckedddl: [],
    outddl:[],
    menuTapCurrent: 0,
    inform:[],
    informData: [{
        string: "123",
        uid: 12341
      },
      {
        string: "456",
        uid: 5421
      },
      {
        string: "789",
        uid: 58172
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  menuTap: function (e) {
    var current = e.currentTarget.dataset.current; //获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
      menuTapCurrent: current
    });


  },
  toinform: function (e) {
    /*
    let a=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../informdetail/informdetail?id='+a,
    })*/
      if(e.currentTarget.dataset.clubid=="")
      {
        wx.showModal({
          title: e.currentTarget.dataset.name,
          content: '内容:' + e.currentTarget.dataset.content +
          '\n'+'发布日期:'+e.currentTarget.dataset.post_date,
          success: function (res) {
            if (res.confirm) {
              console.log('确')
              let backend=app.globalData.backendip
              let that=this
              wx.request({
                url: 'http://'+backend+'/api/create/notice',
                data:{
                  'id':53252,
                  'name':"加入申请",
                  'club_id':"",
                  'post_date':util.formatTime(new Date()),
                  'content':"加入申请",
                  'from_member_id':app.globalData.userID,
                  'to_members_id':[app.globalData.userID],
                },
                method:"POST",
                header :{
                  'content-type': 'application/json'
                },
                success(res){
                  console.log(res.data)
                }
              })
            } else {
              console.log('取消')
            }
          }
        })
      }
      else
      {
        wx.showModal({
          title: e.currentTarget.dataset.name,
          content: '内容:' + e.currentTarget.dataset.content +
          '\n'+'发布日期:'+e.currentTarget.dataset.post_date,
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
  tocreateddl: function (e) {
    wx.navigateTo({
      url: '../createddl/createddl'
    })
  },
  tocreateinform: function (e) {
    wx.navigateTo({
      url: '../createinform/createinform'
    })
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
              url: 'http://'+backend+'/api/check/ddl',
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
              inform.push(res1.data)
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
                checkedddllist.push(res1.data)
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
                if(endtimeTamp>nowtimeTamp)
                {
                  notcheckedddllist.push(res1.data)
                }
                else
                {
                  outddllist.push(res1.data)
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