// component/treenode/treenode.js
const app=getApp()
const util = require('../../utils/util.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        name:{
            type:String,
            value:""
        },
        members:{
            type:Array,
            value:[]
        },
        child:{
            type:Array,
            value:[]
        },
        applyflag:{
            type:Number,
            value:0
        },
        renameflag:{
            type:Number,
            value:0
        },
        container_id:{
            type:String,
            value:""
        },
        club_id:{
            type:String,
            value:""
        },
        club_name:{
            type:String,
            value:""
        },
        rooter_id:{
            type:String,
            value:""
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        childdata:[],
        membersdata:[],
        showflag:true,
        belowmember:[]
    },
    observers:{
        'members':function(members){
            let backend=app.globalData.backendip
            let tmpmembers=[]
            for(let i=0;i<members.length;i++)
                {
                    let that=this
                    wx.request({
                        url: 'https://'+backend+'/api/get/member',
                        data:{
                          'id':members[i]
                        },
                        method:"POST",
                        header :{
                          'content-type': 'application/json'
                        },
                        success(res1){
                          console.log(res1.data)
                          tmpmembers.push({
                            "name":res1.data.name,
                            "id":res1.data.id,
                            "checked":false
                        })
                        that.setData({
                            membersdata:tmpmembers
                        })
                }
            })
            }
        },
        'child':function(child){
            let backend=app.globalData.backendip
            let tmpchild=[]
            for(let i=0;i<child.length;i++)
            {
                let that=this
                wx.request({
                    url: 'https://'+backend+'/api/get/container',
                    data:{
                      'id':child[i]
                    },
                    method:"POST",
                    header :{
                      'content-type': 'application/json'
                    },
                    success(res1){
                      console.log(res1.data)
                      tmpchild.push({
                        "name":res1.data.name,
                        "members":res1.data.contains,
                        "child":res1.data.lower_containers_id,
                        "container_id":res1.data.id,
                        "index":i
                    })
                    that.setData({
                        childdata:tmpchild
                    })
            }
        })
        }
        }
    },
    attached:function(){
        this.properties.pad=this.properties.pad+50
    },
    /**
     * 组件的方法列表
     */
    methods: {
    tapapplyBtn(e){
        let that=this
        let backend=app.globalData.backendip
        console.log(that.properties)
        wx.showModal({
            title:"请填写申请人姓名",
            editable:true,
            placeholderText:"如：张三",
            confirmText:"确定申请",
            cancelText:"取消",
            success:res=>{
                console.log(res)
                let tmp=res
                if(res.confirm){
                    var tmp_content={
                        'container_id':e.currentTarget.dataset.id,
                        'container_name':e.currentTarget.dataset.name,
                        'member_name':res.content,
                        'state':"apply"
                    }
                    
                    var tmp_string=JSON.stringify(tmp_content)
                    console.log(tmp_string)
                    wx.request({
                        url: 'https://'+backend+'/api/create/notice',
                        data:{
                          'id':53252,
                          'name':"加入申请",
                          'club_id':app.globalData.specialclubID,
                          'post_date':util.formatTime(new Date()),
                          'content':tmp_string,
                          'from_member_id':app.globalData.userID,
                          'to_members_id':[that.properties.rooter_id],
                        },
                        method:"POST",
                        header :{
                          'content-type': 'application/json'
                        },
                        success(res){
                          wx.navigateBack({
                            delta: 1,
                          })
                        }
                    })
                }
            }
        })
    },
    taprenameBtn(e){
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
                url: 'https://'+backend+'/api/get/container',
                data:{
                  'id':e.currentTarget.dataset.id,
                },
                method:"POST",
                header :{
                  'content-type': 'application/json'
                },
                success:res2=>{
                  console.log(res2)
                  wx.request({
                    url: 'https://'+backend+'/api/update/container',
                    data:{
                      'id':e.currentTarget.dataset.id,
                      'name':res.content,
                      'belongs_to_club_id':res2.data['belongs_to_club_id'],
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
                      wx.showModal({
                        title:"",
                        showCancel:false,
                        content:"更改成功，退出重进即可查看"
                      })
                    }
                  })
                }
              })
            }else if(res.cancel){
              console.log("...")
            }
          }
        })
      },
     setflag:function(event){
         if(this.data.showflag==false)
         {
            this.setData({
                showflag:true
             })
         }
         else{
            this.setData({
                showflag:false
             })
         }
     },
     checkboxChange:function(e){
         console.log(e)
         for(let i=0;i<this.data.membersdata.length;i++)
         {
             this.data.membersdata[i].checked=false
             for(let j=0;j<e.detail.value.length;j++)
             {
                 if(this.data.membersdata[i].id==e.detail.value[j])
                 {
                    this.data.membersdata[i].checked=true
                 }
             }
         }
         console.log(this.data.membersdata)
         
     },
     merge:function(){
         this.data.belowmember=this.data.belowmember.concat(this.data.membersdata)
        for(let i=0;i<this.data.childdata.length;i++)
        {
        let string='#treenode'+String(i)
           let myComponent = this.selectComponent(string) // 页面获取自定义组件实例
           console.log(myComponent.properties.name)
           myComponent.merge()
           this.data.belowmember=this.data.belowmember.concat(myComponent.data.belowmember)
        }
        console.log(this.data.belowmember)
     }
    }
}
)
