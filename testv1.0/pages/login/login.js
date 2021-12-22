// pages/login/login.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
    },
    login: function(){
        console.log(app.globalData.code)
        let backend=app.globalData.backendip
        wx.getUserProfile({
          desc: 'desc',
          success: (res) => {
            app.globalData.userInfo=res.userInfo
            console.log(app.globalData.userInfo)
            if(app.globalData.code){
              let code = app.globalData.code
              let appid='wx8f6433359ab40480'
              let secret = 'a513154024c735fdf2d242469069c0c8'
              let tmp_url='http://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code'
              wx.request({
                url: 'http://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code',
                success :(res2) =>{
                  console.log(res2.data)
                  let sessionkey=res2.data.session_key
                  app.globalData.userID=res2.data.openid
                  wx.setStorageSync('sessionKey', sessionkey)
                  wx.request({
                    url:   backend+'/api/actions/login',
                    data:{
                      id:res2.data.openid,
                      KEY:""
                    },
                    method:"POST",
                    header :{
                      'content-type': 'application/json'
                    },
                    success:res3=>{
                      console.log(res3)
                      if(res3.data.result=="new"){
                        wx.request({
                          url:   backend+'/api/modify/name',
                          data:{
                            member_id:res2.data.openid,
                            new_name:res.userInfo.nickName
                          },
                          method:"POST",
                          header :{
                            'content-type': 'application/json'
                          },
                          success:res4=>{
                            console.log(res4)
                            wx.switchTab({  
                              url: '../user info/user info',  
                              success:res5=> {
                                var page = getCurrentPages().pop();  
                                if (page == undefined || page == null) return;  
                                page.onShow();  
                              }  
                            })
                          }
                        })
                      }else if(res3.data.result=="existed"){
                        wx.switchTab({  
                          url: '../user info/user info',  
                          success:res5=> {
                            var page = getCurrentPages().pop();  
                            if (page == undefined || page == null) return;  
                            page.onShow();  
                          }  
                        })
                      }
                    }
                  })
                }
              })
            }else{
              console.log('fail')
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