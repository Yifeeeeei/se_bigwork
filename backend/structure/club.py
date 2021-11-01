from container import Container
import functions


class Club:
    def __init__(self, name, boss_member):
        self.name = name
        self.id = functions.generateRandomId(start="club")
        self.discription = ""
        self.containers = []
        self.root_container = Container("__root__", None, self)
        self.root_container.addMember(boss_member)
        self.containers.append(self.root_container)

    def createContainer(self, name, upper_container=None):
        if upper_container == None:
            upper_container = self.root_container
        newContainer = Container(name, upper_container, self)
        self.containers.append(newContainer)
