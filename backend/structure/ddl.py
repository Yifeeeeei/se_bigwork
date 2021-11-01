from member import Member
class DDL:
    def __init__(self,club,name:str,post_date,end_date,content:str,from_member,to_members):
        self.club = club
        self.name = name
        self.post_date = post_date
        self.end_date = end_date
        self.content = content
        self.from_member = from_member
        self.to_members = []
        self.not_done_members = []
        self.setToMember(to_members)        

    
    def setToMember(self,member_list:list):
        self.to_members = []
        for mem in member_list:
            self.to_members.append(mem)
            self.not_done_members.append(mem)
            
    def memberDone(self,member):
        #两种方式，还不知道用哪种
        self.not_done_members.remove(member)
        #或者这一种
        # for mem in self.not_done_members:
        #     if member.equals(mem):
        #         self.not_done_members.remove(mem)
        #         break
        
        
    