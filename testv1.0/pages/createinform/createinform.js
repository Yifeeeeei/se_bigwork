// pages/createinform/createinform.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content:"",
        name:"",
        tree:{},
        current_club_id:""
    },
    contentinput:function(e){
        this.setData({
            content: e.detail.value
          })
    },
    nameinput:function(e){
        this.setData({
            name: e.detail.value
          })
    },
    sendinform:function(e){
      let myComponent = this.selectComponent('#treenode') // 页面获取自定义组件实例

      myComponent.merge()
      console.log(myComponent.data) // 通过实例调用组件事件
      let tosendmember=[]
    for(let i=0;i<myComponent.data.belowmember.length;i++)
    {
      if(myComponent.data.belowmember[i].checked==true)
      {
        tosendmember.push(myComponent.data.belowmember[i].id)
      }
    }
        let backend=app.globalData.backendip
        let that=this
        console.log(1)
        if(tosendmember.length>0)
        {
          wx.request({
            url:   backend+'/api/create/notice',
            data:{
              'id':53252,
              'name':this.data.name,
              'club_id':this.data.current_club_id,
              'post_date':util.formatTime(new Date()),
              'content':this.data.content,
              'from_member_id':app.globalData.userID,
              'to_members_id':tosendmember,
            },
            method:"POST",
            header :{
              'content-type': 'application/json'
            },
            success(res){
              console.log(res.data)
            }
          })
        }
     
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let date = util.formatTime(new Date())
      const eventChannel = this.getOpenerEventChannel();
      let backend = app.globalData.backendip
      let that = this
      this.setData({
        'date': date.split(" ")[0],
        'time': date.split(" ")[1]
      })
      eventChannel.on('toinformPage',(tmp_res)=>{
        console.log(tmp_res.data)
        wx.request({
          url:  backend + '/api/get/club',
          data: {
            'id': tmp_res.data
          },
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            console.log(res.data)
            wx.request({
              url:  backend + '/api/get/container',
              data: {
                'id': res.data.root_container_id
              },
              method: "POST",
              header: {
                'content-type': 'application/json'
              },
              success(res1) {
                console.log(res1.data)
                that.setData({
                  tree: {
                    name: res1.data.name,
                    members: res1.data.contains,
                    child: res1.data.lower_containers_id
                  },
                  current_club_id:tmp_res.data
                })
              }
            })
          }
        })
      })
      console.log(1)
      
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