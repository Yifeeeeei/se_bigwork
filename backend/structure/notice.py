# from member import Member
import functions


class Notice:
    def __init__(self):
        self.id = functions.generateRandomId(start="notice")
        self.name = ""
        self.club_id = ""
        self.post_date = ""
        self.content = ""
        self.from_member_id = ""
        
