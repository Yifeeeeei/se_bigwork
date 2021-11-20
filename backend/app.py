from flask import Flask
from flask import request
from flask import render_template, redirect, url_for
import json
from structure import member
import structure.functions as func
from structure.member import Member
from structure.club import Club
from structure.container import Container
from structure.ddl import DDL
from structure.notice import Notice
app = Flask(__name__)


@app.route('/')
def hello_word():
    return 'Hello World'
# 获取


@app.route('/api/get/container', methods=['POST'])
def apiGetContainer():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    container_id = json_data['id']
    container = func.DBgetContainer(container_id)
    return container.toJson()


@app.route('/api/get/club', methods=['POST'])
def apiGetClub():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    club_id = json_data['id']
    club = func.DBgetClub(club_id)
    return club.toJson()


@app.route('/api/get/member', methods=['POST'])
def apiGetMember():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    member_id = json_data['id']
    member = func.DBgetMember(member_id)
    return member.toJson()


@app.route('/api/get/ddl', methods=['POST'])
def apiGetDDL():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    ddl_id = json_data['id']
    ddl = func.DBgetDDL(ddl_id)
    return ddl.toJson()


@app.route('/api/get/notice', methods=['POST'])
def apiGetNotice():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    notice_id = json_data['id']
    notice = func.DBgetNotice(notice_id)
    return notice.toJson()

# 更新一些数据，需要发送完整的包！


@app.route('/api/update/club', methods=['POST'])
def apiUpdateClub():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    club = Club()
    club.fromDic(json_data)
    func.DBupdateClub(club)
    return "OK"


@app.route('/api/update/container', methods=['POST'])
def apiUodateContainer():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    container = Container()
    container.fromDic(json_data)
    func.DBupdateContainer(container)
    return "OK"


@app.route('/api/update/ddl', methods=['POST'])
def apiUpdateDDL():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    ddl = DDL()
    ddl.fromDic(json_data)
    func.DBupdateDDL(ddl)
    return "OK"


@app.route('/api/update/member', methods=['POST'])
def apiUpdateMember():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    member = Member()
    member.fromDic(json_data)
    func.DBupdateMember(member)
    return "OK"


@app.route('/api/update/notice', methods=['POST'])
def apiUpdateNotice():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    notice = Notice()
    notice.fromDic(json_data)
    func.DBupdateMember(notice)
    return "OK"

#create
@app.route('/api/create/club', methods=['POST'])
def apiCreateClub():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))

    container = Container()
    container.generateRandomId()
    club = Club()
    club.fromDic(json_data)
    club.generateRandomId()
    container.belongs_to_club_id = club.id
    club.root_container_id = container.id
    container.upper_container_id = ""
    func.DBnewContainer(container)
    func.DBnewClub(club)
    dic = {}
    dic["club_id"] = club.id
    dic["root_container_id"] = container.id
    return json.dumps(dic)


@app.route('/api/create/container', methods=['POST'])
def apiCreateContainer():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    container = Container()
    container.fromDic(json_data)
    container.generateRandomId()
    func.DBnewContainer(container)
    dic = {}
    dic["container_id"] = container_id
    return json.dumps(dic)


@app.route('/api/create/ddl', methods=['POST'])
def apiCreateDDL():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    ddl = DDL()
    ddl.fromDic(json_data)
    ddl.generateRandomId()
    func.DBnewDDL(ddl)
    dic = {}
    dic["ddl_id"] = ddl.id
    return json.dumps(dic)


@app.route('/api/create/member', methods=['POST'])
def apiCreateMember():

    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    member = Member()
    print(json_data)
    member.fromDic(json_data)
    func.DBnewMember(member)
    dic = {}
    dic["member_id"] = member.id
    return json.dumps(dic)


@app.route('/api/create/notice', methods=['POST'])
def apiCreateNotice():
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    notice = Notice()
    notice.fromDic(json_data)
    notice.generateRandomId()
    func.DBnewNotice(notice)
    dic = {}
    dic["notice_id"] = notice.id
    return json.dumps(dic)


#check
@app.route('/api/check/ddl',methods=['POST']) 
def apiCheckDDL():
    #{ddl_id:xxx,checker_id:xxx}
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    func.checkDDL(json_data["ddl_id"],json_data["checker_id"])
    return "OK"
    
@app.route('/api/check/notice',methods=['POST']) 
def apiCheckNotice():
    #{notice_id:xxx,checker_id:xxx}
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    func.checkNotice(json_data["notice_id"],json_data["checker_id"])
    return "OK"
    
#modify
@app.route('/api/modify/name',methods=['POST'])
def apiModifyName():
    #{member_id:xxx,new_name:xxx}
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    func.changeName(json_data['member_id'],json_data['new_name'])
    return "OK"
    
#actions
@app.route('/api/actions/join_container',methods=['POST'])
def apiActionsJoinContainer():
    #{member_id,container_id}
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    func.joinContainer(json_data['member_id'],json_data['container_id'])
    return "OK"
    
#search
@app.route('/api/search/club',methods=['POST'])
def apiSearchClub():
    #->{keyword:xxx}
    #{club_list:[club1,club2,club3..]} 
    data = request.get_data()
    json_data = json.loads(data.decode("utf-8"))
    club_list = func.DBsearchClub(json_data['keyword'])
    return_data = {}
    return_data['club_list'] = []
    for club in club_list:
        return_data['club_list'].append(club.toDic())
    return json.dumps(return_data)
@app.route('/shutdown', methods=['POST'])
def shutdown():
    shutdown_server()
    return 'Server shutting down...'
if __name__ == "__main__":
    app.run(host='0.0.0.0',port=11452)