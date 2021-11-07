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
