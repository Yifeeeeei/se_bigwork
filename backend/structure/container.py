class Container:
    def __init__(self, name, upper_container, belongs_to_club):
        # 名字，上层容器（可以为None,如果为None，则代表是第一层，只能为社长）
        self.name = name

        self.upper_container = upper_container
        # 内部类型为club
        self.belongs_to_club = belongs_to_club
        # 包含哪些人，内部类型为Member
        self.contains = []
        # 标签
        self.tags = []

    # 添加Member，如果添加成功返回True，否则返回False +理由
    def addMember(self, member):
        # 如果是社长层，则无法容纳超过一个人
        if self.upper_container == None:
            if len(self.contains) > 1:
                return False, "not toppest container"
            else:
                # 依次检查，是否重复
                for m_member in self.contains:
                    if m_member.equals(member):
                        return False, "member already exists"
                self.contains.append(member)
                member.belongs_to_container.append(self)
                return True, "member added"
        
    # 从container中移出某一位社员        
    def rmoveMember(self, member):
        for m_member in self.contains:
            if m_member.equals (member):
                has_member = True
                self.contains.remove(m_member)
                m_member.belongs_to_container.remove(self)
                return True, "member removed"
        return False, "member does not exist"
        
        
                
        
    
    #判断是否是最顶层
    def isTop(self):
        if self.upper_container == None:
            return True
        return False
    
    
