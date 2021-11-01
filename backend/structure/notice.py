from member import Member
import functions


class Notice:
    def __init__(self, club, name: str, post_date, content: str, from_member: Member):
        self.id = functions.generateRandomId(start="notice")
        self.name = name
        self.club = club
        self.post_date = post_date
        self.content = content
        self.from_member = from_member
        
