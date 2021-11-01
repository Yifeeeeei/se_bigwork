from member import Member
class Notice:
    def __init__(self,club,name:str,post_date,content:str,from_member:Member):
        self.club = club
        self.name = name
        self.post_date = post_date
        self.content = content
        self.from_member = from_member