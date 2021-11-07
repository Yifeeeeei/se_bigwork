# from ddl import DDL
# from notice import Notice
import functions
import json
# 每一个member是一个社员
# 以学号为唯一标识


class Member:
    def __init__(self):
        self.id = ""
        self.name = ""
        # self.belongs_to_container   承载各种contaianer,如果要寻找组织的话可以由container继续向上查找
        self.belongs_to_container_id = []
        # 用于承载各种事件已经弃用
        # self.errands = []

        # 新的类型，ddl
        # 接收到的ddl
        self.ddls_received_id = []
        self.ddls_sent_id = []
        self.ddls_checked_id = []
        # 新的类型 通知
        self.notices_received_id = []
        self.notices_checked_id = []
        self.notices_sent_id = []

    def toJson(self):
        member_dic = {}
        member_dic['id'] = self.id
        member_dic['name'] = self.name
        member_dic['belongs_to_container_id'] = self.belongs_to_container_id
        member_dic['ddls_received_id'] = self.ddls_received_id
        member_dic['ddls_sent_id'] = self.ddls_sent_id
        member_dic['ddls_checked_id'] = self.ddls_checked_id
        member_dic['notices_received_id'] = self.notices_received_id
        member_dic['notices_checked_id'] = self.notices_checked_id
        member_dic['notices_sent_id'] = self.notices_sent_id
        member_json = json.dumps(member_dic)
        return member_json

    def fromDic(self, member_dic):
        self.id = member_dic['id']
        self.name = member_dic['name']
        self.belongs_to_container_id = member_dic['belongs_to_container_id']
        self.ddls_received_id = member_dic['ddls_received_id']
        self.ddls_sent_id = member_dic['ddls_sent_id']
        self.ddls_checked_id = member_dic['ddls_checked_id']
        self.notices_received_id = member_dic['notices_received_id']
        self.notices_checked_id = member_dic['notices_checked_id']
        self.notices_sent_id = member_dic['notices_sent_id']

    # def getName(self):
    #     return self.name

    # def getId(self):
    #     return self.id
    # # 用于判断两个member是否一样

    # def equals(self, other):
    #     if self.id != other.getId():
    #         return False
    #     return True

    # # ddl相关
    # def receiveDDL(self, ddl: DDL):
    #     self.ddls_received.append(ddl)

    # def createDDLAndSend(self, club, ddl_name: str, post_date, end_date, content: str, to_members: list):
    #     newDDL = DDL(club, ddl_name, post_date,
    #                  end_date, content, self, to_members)
    #     self.ddls_sent.append(newDDL)
    #     for member in to_members:
    #         member.receiveDDL(newDDL)

    # # 完成一个ddl
    # def checkDDL(self, ddl):
    #     if ddl not in self.ddls_received:
    #         return
    #     ddl.memberDone(self)
    #     self.ddls_received.remove(ddl)
    #     self.ddls_checked.append(ddl)

    # # notice 相关
    # def receiveNotice(self, notice: Notice):
    #     self.notices_received.append(notice)

    # def checkNotice(self, notice: Notice):
    #     if notice not in self.notices_received:
    #         return
    #     self.notices_received.remove(notice)
    #     self.notices_checked.append(notice)

    # def createNoticeAndSend(self, club, name, post_date, content, to_members):
    #     newNotice = Notice(club, name, post_date, content, self)
    #     self.notices_sent.append(newNotice)
    #     for mem in to_members:
    #         mem.receiveNotice(newNotice)
