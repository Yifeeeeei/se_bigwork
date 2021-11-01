from ddl import DDL
from notice import Notice
# 每一个member是一个社员
#以学号为唯一标识
class Member:
    def __init__(self, student_id, nickname):
        self.student_id = student_id
        self.nickname = nickname
        # self.belongs_to_container   承载各种contaianer,如果要寻找组织的话可以由container继续向上查找
        self.belongs_to_container = []
        #用于承载各种事件（还没定义好）
        # self.errands = []
        
        # 新的类型，ddl
        # 接收到的ddl
        self.ddls_received = []
        self.ddls_sent = []
        self.ddls_checked = []
        ## 新的类型 通知
        self.notices_received = []
        self.notices_check = []
        self.notices_sent = []
                
    def getNickname(self):
        return self.nickname
    
    def getStudentId(self):
        return self.student_id
    #用于判断两个member是否一样
    def equals(self,other):
        if self.student_id != other.student_id:
            return False
        return True
    
    
    #ddl相关
    def receiveDDL(self,ddl:DDL):
        self.ddls_received.append(ddl)
    
    def createDDLAndSend(self,club,ddl_name:str,post_date,end_date,content:str,to_members:list):
        newDDL = DDL(club,ddl_name,post_date,end_date,content,self,to_members)
        self.ddls_sent.append(newDDL)
        for member in to_members:
            member.receiveDDL(newDDL)
            
    #完成一个ddl
    def checkDDL(self,ddl):
        if ddl not in self.ddls_received:
            return
        ddl.memberDone(self)
        self.ddls_received.remove(ddl)
        self.ddls_checked.append(ddl)
        
    # notice 相关
    def receiveNotice(self,notice:Notice):
        self.notices_received.append(notice)
    def createNoticeAndSend(self,club,name,post_date,content,to_members):
        newNotice = Notice(club,name,post_date,content,self)
        self.notices_sent.append(newNotice)
        for mem in to_members:
            mem.receiveNotice(newNotice)
        
        
        
        
        