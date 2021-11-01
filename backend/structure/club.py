from container import Container
class Club:
    def __init__(self, name, boss_member):
        self.name = name
        self.discription = ""
        self.root_container = Container("__root__",None,self)
        self.root_container.addMember(boss_member)
    pass