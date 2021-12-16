// pages/createddl/createddl.js
const app=getApp()
const util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        time:"",
        date:"",
        content:"",
        name:"",
        ddlid:"",
        tree:{}
    },
    dateinput:function(e){
        this.setData({
            ddldate: e.detail.value
          })
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
    bindTimeChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        time: e.detail.value
      })
    },
    bindDateChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        date: e.detail.value
      })
    },
    sendddl:function(e){
        let backend=app.globalData.backendip
        let that=this
        console.log(1)
      wx.request({
        url: 'http://'+backend+'/api/create/ddl',
        data:{
          'id':53252,
          'name':this.data.name,
          'club_id':41241,
          'post_date':util.formatTime(new Date()),
          'end_date':this.data.date+" "+this.data.time,
          'content':this.data.content,
          'from_member_id':app.globalData.userID,
          'to_members_id':[app.globalData.userID],
          'not_done_members_id':[app.globalData.userID]
        },
        method:"POST",
        header :{
          'content-type': 'application/json'
        },
        success(res){
          console.log(res.data)
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let date = util.formatTime(new Date())
      this.setData({
        'date':date.split(" ")[0],
        'time':date.split(" ")[1]
      })
      let backend=app.globalData.backendip
      let that=this
      console.log(1)
      wx.request({
      url: 'http://'+backend+'/api/get/club',
      data:{
        'id':'club52355582'
      },
      method:"POST",
      header :{
        'content-type': 'application/json'
      },
      success(res){
        console.log(res.data)
        wx.request({
          url: 'http://'+backend+'/api/get/container',
          data:{
            'id':res.data.root_container_id
          },
          method:"POST",
          header :{
            'content-type': 'application/json'
          },
          success(res1){
            console.log(res1.data)
          that.setData({
              tree:{
                name:res1.data.name,
                members:res1.data.contains,
                child:res1.data.lower_containers_id
              }
          })
  }
})
        /*
        for(let i=0;i<res.data.containers_id.length;i++)
        {
          wx.request({
            url: 'http://'+backend+'/api/get/container',
            data:{
              'id':res.data.containers_id[i]
            },
            method:"POST",
            header :{
              'content-type': 'application/json'
            },
            success(res1){
              console.log(res1.data)
              tmpmembers.push({
                "name":res1.data.name,
                "member":[]
            })
            
              for(let j=0;j<res1.data.contains.length;j++)
              {
                console.log(res1.data.contains[j])
                
                wx.request({
                  url: 'http://'+backend+'/api/get/member',
                  data:{
                    'id':res1.data.contains[j]
                  },
                  method:"POST",
                  header :{
                    'content-type': 'application/json'
                  },
                  success(res2){
                    console.log(res2.data)
                    tmpmembers[i].member.push({'name':res2.data.name,'checked':false})
                    that.setData({
                      members:tmpmembers
                    }
                    )
                  }
                })
                
              }
            }
          })
        }*/
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