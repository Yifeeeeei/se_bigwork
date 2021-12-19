// component/treenode/treenode.js
const app=getApp()
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
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        childdata:[],
        membersdata:[],
        showflag:false
    },
    observers:{
        'members':function(members){
            let backend=app.globalData.backendip
            let tmpmembers=[]
            for(let i=0;i<members.length;i++)
                {
                    let that=this
                    wx.request({
                        url: 'http://'+backend+'/api/get/member',
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
                            "id":res1.data.id
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
                    url: 'http://'+backend+'/api/get/container',
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
                        "child":res1.data.lower_containers_id
                    })
                    that.setData({
                        childdata:tmpchild
                    })
            }
        })
        }
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
    tapapplyBtn(e){
        let that=this
        let backend=app.globalData.backendip
        console.log(e.currentTarget.dataset.id)
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
                        url: 'http://'+backend+'/api/create/notice',
                        data:{
                          'id':53252,
                          'name':"加入申请",
                          'club_id':"club86217487",
                          'post_date':util.formatTime(new Date()),
                          'content':tmp_string,
                          'from_member_id':app.globalData.userID,
                          'to_members_id':["oBQMk5B3Qyyp3gWF2mwA7Gs49scs"],
                        },
                        method:"POST",
                        header :{
                          'content-type': 'application/json'
                        },
                        success(res){
                          wx.navigateTo({
                            url: '../../pages/createClub/createClub',
                          })
                        }
                    })
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
     }
    }
}
)
