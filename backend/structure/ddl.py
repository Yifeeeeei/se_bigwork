from member import Member
import functions


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

    def setToMember(self, member_list_id: list):
        self.to_members = []
        for mem in member_list_id:
            self.to_members.append(mem)
            self.not_done_members_id.append(mem)

    def memberDone(self, member_id):
        # 两种方式，还不知道用哪种
        self.not_done_members_id.remove(member_id)
        # 或者这一种
        # for mem in self.not_done_members:
        #     if member.equals(mem):
        #         self.not_done_members.remove(mem)
        #         break
