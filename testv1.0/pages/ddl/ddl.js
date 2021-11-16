// pages/ddl.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ddlData:[
            {
                string:"123",
                outdate:0,
                uid:12341
            },
            {
                string:"456",
                outdate:1,
                uid:5421
            },
            {
                string:"789",
                outdate:2,
                uid:58172
            }
        ],
        menuTapCurrent:0,
        informData:[
          {
              string:"123",
              uid:12341
          },
          {
              string:"456",
              uid:5421
          },
          {
              string:"789",
              uid:58172
          }
      ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    menuTap:function(e){
      var current=e.currentTarget.dataset.current;//获取到绑定的数据
      //改变menuTapCurrent的值为当前选中的menu所绑定的数据
      this.setData({
      menuTapCurrent:current
      });
       
       
    },
    toinform:function(e){
      let a=e.currentTarget.dataset.uid;
      wx.navigateTo({
        url: '../informdetail/informdetail?uid='+a,
      })
    },
    todetail:function(e){
        let a=e.currentTarget.dataset.uid;
        if(e.currentTarget.dataset.flag==1)
        {
            wx.showModal({
                title: '提示',
                content: '内容:'+e.currentTarget.dataset.string+'\n'+'状态:未完成',
                confirmText:'已完成',
                success: function (res) {
                  if (res.confirm) {
                    console.log('确')
                  } else {
                    console.log('取消')
                  }
                }
              })
        }
        else if(e.currentTarget.dataset.flag==0)
        {
            wx.showModal({
                title: '提示',
                content: '内容:'+e.currentTarget.dataset.string+'\n'+'状态:过期',
                success: function (res) {
                  if (res.confirm) {
                    console.log('确')
                  } else {
                    console.log('取消')
                  }
                }
              })
        }
        else
        {
            wx.showModal({
                title: '提示',
                content: '内容:'+e.currentTarget.dataset.string+'\n'+'状态:已完成',
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