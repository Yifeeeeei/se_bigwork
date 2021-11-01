# 用来操作数据库
import MySQLdb
# 创建数据库


def createDataBase():
    mydb = MySQLdb.connect(host="localhost", user="root", passwd="root")
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABSE mydatabase")
    mydb.close()

# 返回数据库列表


def getDataBase():
    mydb = MySQLdb.connect(host="localhost", user="root",
                           passwd="root", database="mydatabase")
    mycursor = mydb.cursor()
    mycursor.execute("SHOW DATABSES")
    rt_list = []
    for x in mycursor:
        rt_list.append(x)
    mydb.close()
    return rt_list

# 创建新的数据表


def createDataSheet(name):
    name = name.upper()
    possible_names = ["CLUB", "CONTAINER", "DDL", "MEMBER", "NOTICE"]
    if name not in possible_names:
        return False  # 代表失败
    db = MySQLdb.connect(host="localhost", user="root",
                         passwd="root", database="mydatabase")
    cursor = db.cursor()
    cursor.execute("DROP TABLE IF EXISTS %s" % (name))
    sql = ""
    if name == "CLUB":
        sql = """CREATE TABLE CLUB(
            ID CHAR(64) NOT NULL,
            NAME CHAR(64),
            DISCRIPTION CHAR(256),
            CONTAINERS CHAR(1024)
            ROOT_CONTAINER CHAR(64))"""
    elif name == "CONTAINER":
        sql = """CREATE TABLE CONTAINER(
            ID CHAR(64) NOT NULL,
            NAME CHAR(64),
            BELONGS_TO_CLUB CHAR(64),
            UPPER_CONTAINER CHAR(64),
            CONTAINS CHAR(2048),
            LOWER_CONTAINERS CHAR(1024))
                """
    elif name == "DDL":
        sql="""CREATE TABLE DDL(
            ID CHAR(64) NOT NULL,
            NAME CHAR(64),
            CLUB CHAR(64),
            POST_DATE CHAR(64),
            END_DATE CHAR(64),
            CONTENT CHAR(1024),
            FROM_MEMBER CHAR(64),
            TO_MEMBERS CHAR(2048),
            NOT_DONE_MEMBERS CHAR(2048),
            )"""
    elif name == "NOTICE":
        sql = """CREATE TABLE NOTICE(
            ID CHAR(64) NOT NULL,
            NAME CHAR(64),
            CLUB CHAR(64),
            POST_DATE CHAR(64),
            CONTENT CHAR(1024),
            FROM_MEMBER CHAR(64)
            )"""
    elif name == "MEMBER":
        sql = """CREATE TABLE MEMBER(
            ID CHAR(64) NOT NULL,
            NAME CHAR(64),
            BELONGS_TO_CONTAINER CHAR(2048),
            DDLS_RECEIVED CHAR(2048),
            DDLS_SENT CHAR(2048),
            DDLS_CHECKED CHAR(2048),
            NOTICES_RECEIVED CHAR(2048),
            NOTICES_CHECKED CHAR(2048),
            NOTICES_SENT CHAR(2048)
            )"""
        
    cursor.execute(sql)
    db.close()
    return True  # 改变成功
