from structure.container import Container
# import structure.functions
import json


class Club:
    def __init__(self):

        self.id = functions.generateRandomId(start="club")
        self.name = ""
        self.discription = ""
        self.containers_id = []
        self.root_container_id = ""
        # self.root_container.addMember(boss_member)
        # self.containers.append(self.root_container)
    def toDic(self):
        club_dic = {}
        club_dic['id'] = self.id
        club_dic['name'] = self.name
        club_dic['discription'] = self.discription
        club_dic['containers_id'] = self.containers_id
        club_dic['root_container_id'] = self.root_container_id
        return club_dic
    def toJson(self):
        club_dic = {}
        club_dic['id'] = self.id
        club_dic['name'] = self.name
        club_dic['discription'] = self.discription
        club_dic['containers_id'] = self.containers_id
        club_dic['root_container_id'] = self.root_container_id
        club_json = json.dumps(club_dic)
        return club_json
    def generateRandomId(self):
        self.id = functions.generateRandomId(start="club")
    def fromDic(self, club_dic):
        self.id = club_dic['id']
        self.name = club_dic['name']
        self.discription = club_dic['discription']
        self.containers_id = club_dic['containers_id']
        self.root_container_id = club_dic['root_container_id']

    # def createContainer(self, name, upper_container=None):
    #     if upper_container == None:
    #         upper_container = self.root_container
    #     newContainer = Container(name, upper_container, self)
    #     self.containers.append(newContainer)
