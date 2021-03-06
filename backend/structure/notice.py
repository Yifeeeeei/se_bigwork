# from member import Member
# import structure.functions
import json
import structure.genID as gi

class Notice:
    def __init__(self):
        self.id = gi.generateRandomId(start="notice")
        self.name = ""
        self.club_id = ""
        self.post_date = ""
        self.content = ""
        self.from_member_id = ""
        self.to_members_id = []
    def generateRandomId(self):
        self.id = gi.generateRandomId(start="notice")
    def toDic(self):
        notice_dic = {}
        notice_dic['id'] = self.id
        notice_dic['name'] = self.name
        notice_dic['club_id'] = self.club_id
        notice_dic['post_date'] = self.post_date
        notice_dic['content'] = self.content
        notice_dic['from_member_id'] = self.from_member_id
        notice_dic['to_members_id'] = self.to_members_id
        return notice_dic
    def toJson(self):
        notice_dic = {}
        notice_dic['id'] = self.id
        notice_dic['name'] = self.name
        notice_dic['club_id'] = self.club_id
        notice_dic['post_date'] = self.post_date
        notice_dic['content'] = self.content
        notice_dic['from_member_id'] = self.from_member_id
        notice_dic['to_members_id'] = self.to_members_id
        notice_json = json.dumps(notice_dic)
        print(notice_dic)
        return notice_json

    def fromDic(self, notice_dic):
        self.id = notice_dic['id']
        self.name = notice_dic['name']
        self.club_id = notice_dic['club_id']
        self.post_date = notice_dic['post_date']
        self.content = notice_dic['content']
        self.from_member_id = notice_dic['from_member_id']
        self.to_members_id = notice_dic['to_members_id']
