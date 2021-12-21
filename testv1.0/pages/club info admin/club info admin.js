const app=getApp()
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
    deleteflag:0,
    menuitems: [{
        text: '社团名称',
        url: '#',
        icon: '/images/club/1.png',
        info: ''
      },
      {
        text: '修改名称',
        url: '#',
        icon: '/images/club/4.png',
        info: ''
      },
      {
        text: '社团结构',
        url: '#',
        icon: '/images/club/2.png',
        info: ''
      },
      {
        text: '我的职务',
        url: '#',
        icon: '/images/club/3.png',
        info: ''
      }
    ],
  },

  deleteclub:function(e){
    let that=this
    let backend = app.globalData.backendip
    wx.showModal({
      title:"确定解散社团吗，确定后将无法撤销！",
      confirmText:"确定解散",
      cancelText:"取消",
      success:res=>{
        if(res.confirm){
          wx.request({
            url:'http://' + backend + '/api/delete/club',
            data:{
              'club_id':that.data.current_club_id
            },
            method:"POST",
            header :{
              'content-type': 'application/json'
            },
            success:res=>{
              console.log(res)
              wx.showModal({
                title:"",
                content:"已解散",
                showCancel:false,
                success:res=>{
                  wx.switchTab({
                    url: '../clubhome/clubhome',
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    let backend = app.globalData.backendip
    let that = this
    eventChannel.on('tomanagePage',(res)=>{
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
            current_club_name:res2.data['name'],
            current_club_discription:res2.data['discription'],
            current_club_rootid:res2.data['root_container_id'],
            current_club_id:res2.data.id
          })
          wx.request({
            url: 'http://'+backend+'/api/get/container',
            data:{
              id:res2.data['root_container_id']
            },
            method:"POST",
            header :{
              'content-type': 'application/json'
            },
            success:res3=>{
              console.log(res3)
              let tmpflag=0
              if(app.globalData.userID==res3.data.contains[0]){
                tmpflag=1
              }
              that.setData({
                deleteflag:tmpflag,
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
  deleteBtn: function (e) {
    let that=this
    wx.showModal({
      title:"确定删除所选成员吗，确定后将无法撤销！",
      confirmText:"确定删除",
      cancelText:"取消",
      success:res=>{
        if(res.confirm){
          let myComponent = this.selectComponent('#treenode') // 页面获取自定义组件实例
          myComponent.merge()
          console.log(myComponent.data) // 通过实例调用组件事件
          let backend = app.globalData.backendip
          let tosendmember=[]
          for(let i=0;i<myComponent.data.belowmember.length;i++)
          {
            if(myComponent.data.belowmember[i].checked==true)
            {
              tosendmember.push(myComponent.data.belowmember[i].id)
            }
          }
          console.log(tosendmember)
          if(tosendmember.length==0){
            wx.showModal({
              title: '',
              content: '没有选中成员，删除失败！',
              showCancel: false,
            })
          }else{
            wx.request({
              url: 'http://' + backend + '/api/remove/member',
              data: {
                members_id:tosendmember,
                club_id:that.data.current_club_id
              },
              method: "POST",
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                console.log(res.data)
                let tmp="您已被"+that.data.current_club_name+"删除"
                wx.request({
                  url: 'http://'+backend+'/api/create/notice',
                  data:{
                    'id':53252,
                    'name':"成员删除通知",
                    'club_id':that.data.current_club_id,
                    'post_date':util.formatTime(new Date()),
                    'content':tmp,
                    'from_member_id':app.globalData.userID,
                    'to_members_id':tosendmember,
                  },
                  method:"POST",
                  header :{
                    'content-type': 'application/json'
                  },
                })
                wx.showModal({
                  title: '',
                  content: '已删除',
                  showCancel: false,
                  success:res=>{
                    if(res.confirm){
                      wx.navigateBack({
                        delta: 1,
                      })
                    }
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