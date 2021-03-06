var app=getApp()
Page({
  data: {
    clubid:'',
    rootid:'',
    hideinput:true,
    tmpname:'',
    currentid:1,
    currentconstructid:'',
    value: [
      {
        id:1,
        title: '主席',
        constructid:'Containertest'
      },
    ],
    
  },
  rename(e){
    let backend=app.globalData.backendip
    let that=this
    console.log(e.detail)
    wx.showModal({
      title:"请输入要更改的名称",
      editable:true,
      placeholderText:"如：内联部部长或文艺部部员",
      confirmText:"确定提交",
      cancelText:"取消",
      success(res){
        let tmp=res
        if(res.confirm){
          wx.request({
            url: backend+'/api/get/container',
            data:{
              'id':e.detail['constructid'],
            },
            method:"POST",
            header :{
              'content-type': 'application/json'
            },
            success:res2=>{
              console.log(res2)
              wx.request({
                url: backend+'/api/update/container',
                data:{
                  'id':e.detail['constructid'],
                  'name':res.content,
                  'belongs_to_club_id':that.data.clubid,
                  'upper_container_id':res2.data['upper_container_id'],
                  'contains':res2.data['contains'],
                  'lower_containers_id':res2.data['lower_containers_id']
                },
                method:"POST",
                header :{
                  'content-type': 'application/json'
                },
                success:resu=>{
                  console.log(resu)
                  var tmpid=e.detail['id']-1
                  var tmpcontainer=that.data.value[tmpid]
                  tmpcontainer['title']=res.content
                  var tmplist=that.data.value
                  tmplist.splice(tmpid,1,tmpcontainer)
                  that.setData({
                    value:tmplist
                  })
                  console.log(that.data.value)
                }
              })
            }
          })
          console.log(that.data.value)
        }else if(res.cancel){
          console.log("...")
        }
      }
    })
  },
  showhelp(e){
    wx.showModal({
      title:"帮助",
      content:"您可以在本页面创建属于您的社团。\n点击创建子结构按钮可以新建当前职位的下属部门\n点击更改名称可以改变当前职位的名称\n上方的按钮可以帮助您快速回到上一层\n由于目前没有删除部门的功能，请您慎重创建",
      showCancel:false
    })
  },
  createchild(e){
    let backend=app.globalData.backendip
    let that=this
    console.log(e.detail)
    wx.showModal({
      title:"请输入子结构名称",
      editable:true,
      placeholderText:"如：内联部部长或文艺部部员",
      confirmText:"确定提交",
      cancelText:"取消",
      success(res){
        let tmp=res
        if(res.confirm){
          wx.request({
            url: backend+'/api/create/container',
            data:{
              'id':'1',
              'name':res.content,
              'belongs_to_club_id':that.data.clubid,
              'upper_container_id':e.detail['constructid'],
              'contains':[],
              'lower_containers_id':[]
            },
            method:"POST",
            header :{
              'content-type': 'application/json'
            },
            success:resu=>{
              console.log(resu)
              var tmpid=that.data.currentid+1
              that.setData({
                tmpname:tmp.content,
                currentid:tmpid,
                value:that.data.value.concat([
                  {
                    pid:e.detail.id,
                    id:tmpid,
                    title:tmp.content,
                    constructid:resu.data['container_id']
                  }
                ])
              })
            }
          })
          console.log(that.data.value)
        }else if(res.cancel){
          console.log("...")
        }
        
      }
    })
  },
  selThis(e) {
    console.log(e.detail);
  },
  getconfirm:function(e){
    wx.showModal({
      title:"创建完成！",
      confirmText:"确定",
      showCancel:false,
      success:res=>{
        wx.switchTab({
          url: '../clubhome/clubhome',
          success: function (e) {  
            var page = getCurrentPages().pop();  
            if (page == undefined || page == null) return;  
            //page.onShow();  
          } 
        })
      }
    })
  },
  onLoad() {
    let that=this
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('tostructPage',(res)=>{
      console.log(res)
      that.setData({
        clubid:res['curclubid'],
        rootid:res['currootid'],
        value:[{
          id:1,
          title:"主席",
          constructid:res['currootid']
        }]
      })
      console.log(that.data.value)
    })
  }
});
