from member import Member
import functions
import json


class DDL:
    def __init__(self):
        self.id = functions.generateRandomId(start="ddl")
        self.name = ""
        self.club_id = ""
        self.post_date = ""
        self.end_date = ""
        self.content = ""
        self.from_member_id = ""
        self.to_members_id = []
        self.not_done_members_id = []
        # self.setToMember(to_members_id)
    def generateRandomId(self):
        self.id = functions.generateRandomId(start="ddl")
    def toJson(self):
        ddl_dic = {}
        ddl_dic['id'] = self.id
        ddl_dic['name'] = self.name
        ddl_dic['club_id'] = self.club_id
        ddl_dic['post_date'] = self.post_date
        ddl_dic['end_date'] = self.end_date
        ddl_dic['content'] = self.content
        ddl_dic['from_member_id'] = self.from_member_id
        ddl_dic['to_members_id'] = self.to_members_id
        ddl_dic['not_done_members_id'] = self.not_done_members_id
        ddl_json = json.dumps(ddl_dic)
        return ddl_json

    def fromDic(self, ddl_dic):
        self.id = ddl_dic['id']
        self.name = ddl_dic['name']
        self.club_id = ddl_dic['club_id']
        self.post_date = ddl_dic['post_date']
        self.end_date = ddl_dic['end_date']
        self.content = ddl_dic['content']
        self.from_member_id = ddl_dic['from_member_id']
        self.to_members_id = ddl_dic['to_members_id']
        self.not_done_members_id = ddl_dic['not_done_members_id']

    # def setToMember(self, member_list_id: list):
    #     self.to_members = []
    #     for mem in member_list_id:
    #         self.to_members.append(mem)
    #         self.not_done_members_id.append(mem)

    # def memberDone(self, member_id):
    #     # 两种方式，还不知道用哪种
    #     self.not_done_members_id.remove(member_id)
    #     # 或者这一种
    #     # for mem in self.not_done_members:
    #     #     if member.equals(mem):
    #     #         self.not_done_members.remove(mem)
    #     #         break
