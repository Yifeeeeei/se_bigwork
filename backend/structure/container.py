# import structure.functions
import json
import structure.genID as gi

class Container:
    def __init__(self):
        # 名字，上层容器（可以为None,如果为None，则代表是第一层，只能为社长）
        # 要改
        self.id = gi.generateRandomId(start="Container")
        self.name = ""
        # 内部类型为club
        self.belongs_to_club_id = ""
        self.upper_container_id = ""
        # 包含哪些人，内部类型为id
        self.contains = []
        # 标签
        self.lower_containers_id = []
        # functions.getContainer(upper_container_id)
        # self.upper_container.addLowerContainer(self.id)
    # 类似于双向链表
    def generateRandomId(self):
        self.id = gi.generateRandomId(start="Container")
    def toDic(self):
        container_dic = {}
        container_dic['id'] = self.id
        container_dic['name'] = self.name
        container_dic['belongs_to_club_id'] = self.belongs_to_club_id
        container_dic['upper_container_id'] = self.upper_container_id
        container_dic['contains'] = self.contains
        container_dic['lower_containers_id'] = self.lower_containers_id
        return container_dic
    def toJson(self):
        container_dic = {}
        container_dic['id'] = self.id
        container_dic['name'] = self.name
        container_dic['belongs_to_club_id'] = self.belongs_to_club_id
        container_dic['upper_container_id'] = self.upper_container_id
        container_dic['contains'] = self.contains
        container_dic['lower_containers_id'] = self.lower_containers_id
        container_json = json.dumps(container_dic)
        return container_json

    def fromDic(self, container_dic):
        self.id = container_dic['id']
        self.name = container_dic['name']
        self.belongs_to_club_id = container_dic['belongs_to_club_id']
        self.upper_container_id = container_dic['upper_container_id']
        self.contains = container_dic['contains']
        self.lower_containers_id = container_dic['lower_containers_id']

    # def addLowerContainer(self, container):
    #     self.lower_containers.append(container)
    # # 返回全部人员

    # def getMembers(self):
    #     return self.contains
    # # 添加Member，如果添加成功返回True，否则返回False +理由

    # def addMember(self, member):
    #     # 如果是社长层，则无法容纳超过一个人
    #     if self.upper_container == None:
    #         if len(self.contains) > 1:
    #             return False, "not toppest container"
    #         else:
    #             # 依次检查，是否重复
    #             for m_member in self.contains:
    #                 if m_member.equals(member):
    #                     return False, "member already exists"
    #             self.contains.append(member)
    #             member.belongs_to_container.append(self)
    #             return True, "member added"

    # # 从container中移出某一位社员
    # def rmoveMember(self, member):
    #     for m_member in self.contains:
    #         if m_member.equals(member):
    #             has_member = True
    #             self.contains.remove(m_member)
    #             m_member.belongs_to_container.remove(self)
    #             return True, "member removed"
    #     return False, "member does not exist"

    # # 判断是否是最顶层

    # def isTop(self):
    #     if self.upper_container == None:
    #         return True
    #     return False
