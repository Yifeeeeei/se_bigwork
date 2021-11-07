import random
import database_operations as dbop

from container import Container
from club import Club
from member import Member
from notice import Notice
from ddl import DDL

def generateRandomId(start="", end=""):
    return str(start) + str(random.randint(0, 99999999))+str(end)


def DBgetContainer(container_id):
    result = dbop.fetchContainer(container_id)
    container = Container()
    container.id = result[0]
    container.name = result[1]
    container.belongs_to_club_id = result[2]
    container.upper_container_id = result[3]
    container.contains = result[4].split(",")
    container.lower_containers_id = result[5].split(",")
    return container


def DBgetClub(club_id):
    result = dbop.fetchClub(club_id)
    club = Club()
    club.id = result[0]
    club.name = result[1]
    club.discription = result[2]
    club.containers_id = result[3].split(",")
    club.root_container_id = result[4]
    return club


def DBgetMember(member_id):
    result = dbop.fetchMember(member_id)
    member = Member()
    member.id = result[0]
    member.name = result[1]
    member.belongs_to_container_id = result[2].split(",")
    member.ddls_received_id = result[3].split(",")
    member.ddls_sent_id = result[4].split(",")
    member.ddls_checked_id = result[5].split(",")
    member.notices_received_id = result[6].split(",")
    member.notices_checked_id = result[7].split(",")
    member.notices_sent_id = result[8].split(",")
    return member

def DBgetNotice(notice_id):
    result = dbop.fetchNotice(notice_id)
    notice = Notice()
    notice.id = result[0]
    notice.name = result[1]
    notice.club_id = result[2]
    notice.post_date = result[3]
    notice.content = result[4]
    notice.from_member_id = result[5]
    notice.to_member_id = result[6]
    return notice


def DBgetDDL(ddl_id):
    result = dbop.fetchDDL(ddl_id)
    ddl = DDL()
    ddl.id = result[0]
    ddl.name = result[1]
    ddl.club_id = result[2]
    ddl.post_date = result[3]
    ddl.end_date = result[4]
    ddl.content = result[5]
    ddl.from_member_id = result[6]
    ddl.to_members_id = result[7].split(',')
    ddl.not_done_members_id = result[8].split(',')
    return ddl

def DBupdateClub(club:Club):
    dbop.saveClub(club.id,club.name,club.discription,club.containers_id,club.root_container_id)
    
def DBupdateContainer(container:Container):
    dbop.saveContainer(container.id,container.name,container.belongs_to_club_id,container.upper_container_id,container.contains,container.lower_containers_id)

def DBupdateDDL(ddl:DDL):
    dbop.saveDDL(ddl.id,ddl.name,ddl.club_id,ddl.post_date,ddl.end_date,ddl.content,ddl.from_member_id,ddl.to_members_id,ddl.not_done_members_id)

def DBupdateMember(member:Member):
    dbop.saveMember(member.id,member.name,member.belongs_to_container_id,member.ddls_received_id,member.ddls_sent_id,member.ddls_checked_id,member.notices_received_id,member.notices_checked_id,member.notices_sent_id)

def DBupdateNotice(notice:Notice):
    dbop.saveNotice(notice.id,notice.name,notice.club_id,notice.post_date,notice.content,notice.from_member_id,notice.to_members_id)


def DBnewClub(club:Club):
    dbop.insertClub(club.id,club.name,club.discription,club.containers_id,club.root_container_id)
    
def DBnewContainer(container:Container):
    #会影响上一级，和club
    upper_container = DBgetContainer(container.upper_container_id)
    upper_container.lower_containers_id.append(container.id)
    DBupdateContainer(upper_container)
    club = DBgetClub(container.belongs_to_club_id)
    club.containers_id.append(container.id)
    DBupdateClub(club)
    dbop.insertContainer(container.id,container.name,container.belongs_to_club_id,container.upper_container_id,container.contains,container.lower_containers_id)

def DBnewDDL(ddl:DDL):
    #会影响：发送者，接收者
    dbop.insertDDL(ddl.id,ddl.name,ddl.club_id,ddl.post_date,ddl.end_date,ddl.content,ddl.from_member_id,ddl.to_members_id,ddl.not_done_members_id)
    sent_member = DBgetMember(ddl.from_member_id)
    sent_member.ddls_sent_id.append(ddl.id)
    
    DBupdateMember(sent_member)
    for mem_id in ddl.to_members_id:
        mem = DBgetMember(mem_id)
        mem.ddls_received_id.append(ddl.id)
        DBupdateMember(mem)

def DBnewMember(member:Member):
    dbop.insertMember(member.id,member.name,member.belongs_to_container_id,member.ddls_received_id,member.ddls_sent_id,member.ddls_checked_id,member.notices_received_id,member.notices_checked_id,member.notices_sent_id)
    
def DBnewNotice(notice:Notice):
    #影响发送者接受者
    dbop.insertNotice(notice.id,notice.name,notice.club_id,notice.post_date,notice.content,notice.from_member_id,notice.to_members_id)
    sent_member = DBgetMember(notice.from_member_id)
    sent_member.notices_sent_id.append(notice.id)
    DBupdateMember(sent_member)
    for mem_id in notice.to_members_id:
        mem = DBgetMember(mem_id)
        mem.notices_received_id.append(notice.id)
        DBupdateMember(mem)
    
def checkDDL(ddl_id,checker_id):
    #影响 ddl,checker
    ddl = DBgetDDL(ddl_id)
    ddl.not_done_members_id.remove(checker_id)
    DBupdateDDL(ddl)
    checker = DBgetMember(checker_id)
    checker.ddls_checked_id.append(ddl.id)
    DBupdateMember(checker)
def checkNotice(notice_id,checker_id):
    #影响    checker
    checker = DBgetMember(checker_id)
    checker.notices_checked_id.append(notice_id)
    DBupdateMember(checker)
    
def changeName(id,new_name):
    member = DBgetMember(id)
    member.name = new_name
    DBupdateMember(member)
    
def joinContainer(member_id,container_id):
    member = DBgetMember(member_id)
    container = DBgetContainer(container_id)
    member.belongs_to_container_id.append(container_id)
    container.contains.append(member_id)
    DBupdateMember(member)
    DBupdateContainer(container)
    