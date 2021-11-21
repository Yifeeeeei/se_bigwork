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
            url: 'http://'+backend+'/api/create/container',
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
