如果没有说明，method为post
除了member类之外的id应该都会自动分配，就暂定member的id是微信号吧
# 如果要求传入某个类json，按照接下来的json格式传入(xxx表示某个值)
## Club类json
{
    id:xxx,
    name:xxx,
    discription:xxx,
    containers_id:[xxx,xxx,xxx...], //列表元素为包含的container的id
    root_container_id:xxx//根container也就是只包含社长的那一个container
}
## Container类json
{
    id:xxx,
    name:xxx,
    belongs_to_club_id:xxx,//该container隶属的Club的id
    upper_container_id:xxx,//该container的上级container的id
    contains:[xxx,xxx,xxx...]//列表，内部元素为包含member的id
    lower_containers_id:[xxx,xxx,xxx...]//列表，内部元素为下层Container的id
}
## DDL类json
{
    id:xxx,
    name:xxx,//标题
    club_id:xxx,//填写社团id
    post_date:xxx,//发送时间
    end_date:xxx,//deadline
    content:xxx,//内容
    from_member_id:xxx//发出者id
    to_members_id:[xxx,xxx,xxx...]//接收者member id列表
    not_done_members_id:[xxx,xxx,xxx...]//没有完成的member id列表
}
## Member类json
{
    id:xxx,
    name:xxx,
    belongs_to_container_id = [xxx,xxx,xxx...],//这个人处于的container id列表
    ddls_received_id = [xxx,xxx,xxx...],//接收到了ddl id列表
    ddls_sent_id = [xxx,xxx,xxx...],//发送过的ddl id列表
    ddls_checked_id = [xxx,xxx,xxx...],//这个人自己check过的ddl id列表
    notices_received_id = [xxx,xxx,xxx...],//接收到的notice id列表
    notices_checked_id = [xxx,xxx,xxx...],//这个人check过的notice id列表
    notices_sent_id = [xxx,xxx,xxx...],//这个人发出的notice id列表
}
## Notice类json

{
    id:xxx,
    name:xxx,
    club_id:xxx,//社团id
    post_date:xxx,//发出日期
    content:xxx,//内容
    from_member_id:xxx,//发出member id
    to_members_id:[xxx,xxx,xxx...]//接收者member id列表
}

# 获取
## /api/get/container
{id:xxx}->一个Container的json
## /api/get/club
{id:xxx}->一个Club的json
## /api/get/member
{id:xxx}->一个Member的json
## /api/get/ddl
{id:xxx}->一个DDL的json
## /api/get/notice
{id:xxx}->一个Notice的json

# 更新数据
用于更新一个比如个人信息之类的东西，就像各种列表什么的就别用这几个更改
## /api/update/club
传入一个Club的json，内含club_id对应的club的新信息
## /api/update/container
传入一个Container的json，内含container_id对应的container的新信息
## /api/update/ddl
类似上面
## /api/update/member
类似上面
## /api/updata/notice
类似上面

# 创建新数据
## /api/create/club
传入Club json(id瞎填，会自动生成)，后台创建,返回json{"club_id":xxx,"root_container_id":xxx}
## /api/create/container
传入container json(id瞎填，会自动生成)，后台创建,返回json{"container_id":xxx}
会自动调整所在club和上级container
## /api/create/ddl
类似上面
会自动为调整发出者和接受者相关项返回json{"ddl_id":xxx}
## /api/create/notice
类似上面
会自动调整发出则和接受着相关项返回json{"notice_id":xxx}
## /api/create/member
传入Member json，id填微信id（吧）

# 打勾操作
## api/check/ddl
传入{ddl_id:xxx,checker_id:xxx}，为该条ddl打勾
## /api/check/notice
传入{notice_id:xxx,checker_id:xxx}，为该notice打勾

# 更改信息
## /api/modify/name
传入{member_id:xxx,new_name:xxx}，为member改名

# 操作
## /api/actions/join_container
传入{member_id,container_id}
将一位一个member加入到一个container中

# 搜索
## /api/search/club
传入{keyword:xxx}
返回一个{club_list:[club1,club2...]}
返回的json中club_list项的列表元素也为json表示的club