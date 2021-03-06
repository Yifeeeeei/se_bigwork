import random
import structure.database_operations as dbop

from structure.container import Container
from structure.club import Club
from structure.member import Member
from structure.notice import Notice
from structure.ddl import DDL

def stringToList(target_str):
    # [12,3434,3434]
    inner_string = target_str[1:-1]
    if len(inner_string) <= 0:
        return []
    return inner_string.split(",")

def DBgetContainer(container_id):
    print("container id:",container_id)
    if container_id == "":
        return None
    result = dbop.fetchContainer(container_id)
    container = Container()
    container.id = result[0]
    container.name = result[1]
    container.belongs_to_club_id = result[2]
    container.upper_container_id = result[3]
    container.contains = stringToList(result[4])
    container.lower_containers_id = stringToList(result[5])
    return container


def DBgetClub(club_id):
    if club_id == "":
        return
    result = dbop.fetchClub(club_id)
    club = Club()
    club.id = result[0]
    club.name = result[1]
    club.discription = result[2]
    club.containers_id = stringToList(result[3])
    club.root_container_id = result[4]
    return club


def DBgetMember(member_id):
    if member_id == "":
        return None
    result = dbop.fetchMember(member_id)
    try:    
        member = Member()
        member.id = result[0]
        member.name = result[1]
        member.belongs_to_container_id = stringToList(result[2])
        member.ddls_received_id = stringToList(result[3])
        member.ddls_sent_id = stringToList(result[4])
        member.ddls_checked_id = stringToList(result[5])
        member.notices_received_id = stringToList(result[6])
        member.notices_checked_id = stringToList(result[7])
        member.notices_sent_id = stringToList(result[8])
        return member
    except:
        print("unable to find memberid:",member_id)
        return None

def DBgetNotice(notice_id):
    if notice_id == "":
        return
    result = dbop.fetchNotice(notice_id)
    notice = Notice()
    notice.id = result[0]
    notice.name = result[1]
    notice.club_id = result[2]
    notice.post_date = result[3]
    notice.content = result[4]
    notice.from_member_id = result[5]
    notice.to_members_id = stringToList(result[6])
    return notice


def DBgetDDL(ddl_id):
    if ddl_id == "":
        return
    # print("try to get:",ddl_id)
    result = dbop.fetchDDL(ddl_id)
    ddl = DDL()
    ddl.id = result[0]
    ddl.name = result[1]
    ddl.club_id = result[2]
    ddl.post_date = result[3]
    ddl.end_date = result[4]
    ddl.content = result[5]
    ddl.from_member_id = result[6]
    ddl.to_members_id = stringToList(result[7])
    ddl.not_done_members_id = stringToList(result[8])
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
    #????????????????????????club
    if container.upper_container_id != "":
        upper_container = DBgetContainer(container.upper_container_id)
        upper_container.lower_containers_id.append(container.id)
        DBupdateContainer(upper_container)
        club = DBgetClub(container.belongs_to_club_id)
        club.containers_id.append(container.id)
        DBupdateClub(club)
    dbop.insertContainer(container.id,container.name,container.belongs_to_club_id,container.upper_container_id,container.contains,container.lower_containers_id)

def DBnewDDL(ddl:DDL):
    #?????????????????????????????????
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
    #????????????????????????
    dbop.insertNotice(notice.id,notice.name,notice.club_id,notice.post_date,notice.content,notice.from_member_id,notice.to_members_id)
    # print("DB NEW NOTICE", notice.to_members_id)
    sent_member = DBgetMember(notice.from_member_id)
    sent_member.notices_sent_id.append(notice.id)
    DBupdateMember(sent_member)
    for mem_id in notice.to_members_id:
        mem = DBgetMember(mem_id)
        mem.notices_received_id.append(notice.id)
        DBupdateMember(mem)
    
def checkDDL(ddl_id,checker_id):
    #?????? ddl,checker
    ddl = DBgetDDL(ddl_id)
    ddl.not_done_members_id.remove(checker_id)
    DBupdateDDL(ddl)
    checker = DBgetMember(checker_id)
    checker.ddls_checked_id.append(ddl.id)
    DBupdateMember(checker)
def checkNotice(notice_id,checker_id):
    #??????    checker
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
    
#search
def DBsearchClub(keyword):
    results = dbop.searchClub(keyword)
    club_list = []
    for result in results:
        club = Club()
        club.id = result[0]
        club.name = result[1]
        club.discription = result[2]
        club.containers_id = stringToList(result[3])
        club.root_container_id = result[4]
        club_list.append(club)
    return club_list

#delete 
def DBdeleteContainer(container_id):
    if container_id == "":
        return "top"
    container = None
    try:
        container = DBgetContainer(container_id)
    except:
        return "not exist"
    if container == None:
        return "not exist"
    # if len(container.lower_containers_id) != 0:
    #     return "not leaf"
    upper_container = None
    if container.upper_container_id != "":
        upper_container = DBgetContainer(container.upper_container_id)
    club = DBgetClub(container.belongs_to_club_id)
    if upper_container != None:
        upper_container.lower_containers_id.remove(container_id)
    club.containers_id.remove(container_id)
    member_id_list = container.contains
    for mem_id in member_id_list:
        mem = DBgetMember(mem_id)
        if container_id in mem.belongs_to_container_id:
            mem.belongs_to_container_id.remove(container_id)
        DBupdateMember(mem)
    DBupdateClub(club)
    if upper_container != None:
        DBupdateContainer(upper_container)
    dbop.deleteContainer(container_id)
    return "OK"

def DBdeleteClub(club_id):
    club = DBgetClub(club_id)
    for container_id in club.containers_id:
        
        container = DBgetContainer(container_id)
        for mem_id in container.contains:
            mem = DBgetMember(mem_id)
            mem.belongs_to_container_id.remove(container_id)
            DBupdateMember(mem)
        dbop.deleteContainer(container_id)
        
    dbop.deleteClub(club_id)
    return 'OK'

def DBdeleteNotice(notice_id):
    notice = DBgetNotice(notice_id)
    sender = DBgetMember(notice.from_member_id)
    if notice_id in sender.notices_sent_id:
        sender.notices_sent_id.remove(notice_id)
    DBupdateMember(sender)
    for member_id in notice.to_members_id:
        member = DBgetMember(member_id)
        if notice_id in member.notices_received_id:
            member.notices_received_id.remove(notice_id)
        if notice_id in member.notices_checked_id:
            member.notices_checked_id.remove(notice_id)
        DBupdateMember(member)
    dbop.deleteNotice(notice_id)
    
    