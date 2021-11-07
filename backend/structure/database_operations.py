# 用来操作数据库
import PyMySQL
# 创建数据库
# from member import Member
# from club import Club
# from container import Container
# from ddl import DDL
# from notice import Notice

def createDataBase():
    mydb = PyMySQL.connect(host="localhost", user="root", passwd="root",charset="utf8")
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABSE mydatabase")
    mydb.close()

def joinList(li):
    return ','.join(li)

# 返回数据库列表


def getDataBase():
    mydb = PyMySQL.connect(host="localhost", user="root",
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
    db = PyMySQL.connect(host="localhost", user="root",
                         passwd="root", database="mydatabase",charset="utf8")
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
            NOT_DONE_MEMBERS CHAR(2048)
            )"""
    elif name == "NOTICE":
        sql = """CREATE TABLE NOTICE(
            ID CHAR(64) NOT NULL,
            NAME CHAR(64),
            CLUB CHAR(64),
            POST_DATE CHAR(64),
            CONTENT CHAR(1024),
            FROM_MEMBER CHAR(64),
            TO_MEMBERS CHAR(2048)
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

def insertClub(id,name,discription,containerid_list,root_container_id):
    # 打开数据库连接
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )

    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    containerid_str = ','.join(containerid_list)

    # SQL 插入语句
    sql = "INSERT INTO CLUB ( ID,NAME,DISCRIPTION,CONTAINERS,ROOT_CONTAINER) \
        VALUES (%s, %s, %s, %s, %s,%s )" % \
        (id, name, discription, containerid_str, root_container_id)
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
    except:
   # 发生错误时回滚
        db.rollback()
# 关闭数据库连接
    db.close()
    
def insertMember(id,name,belongs_to_container_id,ddls_received_id_list,ddls_sent_id_list,ddls_checked_id_list,notices_received_id_list,notices_checked_id_list,notices_sent_id_list):
    # 打开数据库连接
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )

    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    ddls_received_id_str = ','.join(ddls_received_id_list)
    ddls_sent_id_str = ','.join(ddls_sent_id_list) 
    ddls_checked_id_str = ','.join(ddls_checked_id_list)
    
    notice_received_id_str = ','.join(notices_received_id_list)
    notices_checked_id_str = ','.join(notices_checked_id_list)
    notice_sent_id_str = ','.join(notices_sent_id_list)

    # SQL 插入语句
    sql = "INSERT INTO MEMBER ( ID,NAME,BELONGS_TO_CONTAINER,DDLS_RECEIVED,DDLS_SENT,DDLS_CHECKED,NOTICES_RECEIVED,NOTICES_CHECKED,NOTICES_SENT) \
        VALUES (%s, %s, %s, %s, %s,%s ,%s,%s,%s)" % \
        (id, name, belongs_to_container_id,ddls_received_id_str, ddls_sent_id_str,ddls_checked_id_str,notice_received_id_str,notices_checked_id_str,notice_sent_id_str)
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
    except:
   # 发生错误时回滚
        db.rollback()
# 关闭数据库连接
    db.close()
    
def insertContainer(id,name,belongs_to_club_id,upper_container_id,contains_idlist,lower_containers_idlist):
    
    # 打开数据库连接
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )

    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    containerid_str = ','.join(contains_idlist)
    lower_containers_idstr = ','.join(lower_containers_idlist)

    # SQL 插入语句
    sql = "INSERT INTO CONTAINER (ID,NAME,BELONGS_TO_CLUB,UPPER_CONTAINER,CONTAINS,LOWER_CONTAINERS) \
        VALUES (%s, %s, %s, %s, %s,%s )" % \
        (id,name,belongs_to_club_id,upper_container_id,containerid_str,lower_containers_idstr)
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
    except:
   # 发生错误时回滚
        db.rollback()
# 关闭数据库连接
    db.close()
    
def insertDDL(id,name,club_id,post_date,end_date,content,from_member_id,to_members_id_list,not_done_members_id_list):
    # 打开数据库连接
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )

    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    to_members_id_str = ','.join(to_members_id_list)
    not_done_members_id_str = ','.join(not_done_members_id_list)

    # SQL 插入语句
    sql = "INSERT INTO DDL (ID,NAME,CLUB,POST_DATE,END_DATE,CONTENT,FROM_MEMBER,TO_MEMBERS,NOT_DONE_MEMBERS) \
        VALUES (%s, %s, %s, %s, %s,%s,%s,%s )" % \
        (id,name,club_id,post_date,end_date,content,from_member_id,to_members_id_str,not_done_members_id_str)
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
    except:
   # 发生错误时回滚
        db.rollback()
# 关闭数据库连接
    db.close()
    
def insertNotice(id,name,club_id,post_date,content,from_member_id,to_members_id_list):
    # 打开数据库连接
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )
    to_members_id_str = ','.join(to_members_id_list)
    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    # SQL 插入语句
    sql = "INSERT INTO DDL (ID,NAME,CLUB,POST_DATE,CONTENT,FROM_MEMBER,TO_MEMBERS) \
        VALUES (%s, %s, %s, %s, %s,%s,%s)" % \
        (id,name,club_id,post_date,content,from_member_id,to_members_id_str)
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
    except:
   # 发生错误时回滚
        db.rollback()
# 关闭数据库连接
    db.close()

def saveContainer(id,name,belongs_to_club_id,upper_container_id,contains_idlist,lower_containers_idlist):
    contain_id_str = joinList(contains_idlist)
    lower_containers_id_str = joinList(lower_containers_idlist)
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )

    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    sql = "UPDATE CONTAINER SET NAME=%s,BELONGS_TO_CLUB=%s,UPPER_CONTAINER=%s,CONTAINS=%s,LOWER_CONTAINERS=%s WHERE ID=%s"% (name,belongs_to_club_id,upper_container_id,contain_id_str,lower_containers_id_str,id)
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
    except:
   # 发生错误时回滚
        db.rollback()
# 关闭数据库连接
    db.close()
    
def saveClub(id,name,discription,containers_idlist,root_container_id):
    contain_id_str = joinList(containers_idlist)
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )

    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    sql = "UPDATE CLUB SET NAME=%s,DISCRIPTION=%s,CONTAINERS=%s,ROOT_CONTAINER=%s WHERE ID=%s"% (name,discription,contain_id_str,root_container_id,id)
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
    except:
   # 发生错误时回滚
        db.rollback()
# 关闭数据库连接
    db.close()

def saveMember(id,name,belongs_to_container_id_list,ddls_received_id_list,ddls_sent_id_list,ddls_checked_id_list,notices_received_id_list,notices_checked_id_list,notices_sent_id_list):
    belongs_to_container_id_str = joinList(belongs_to_container_id_list)
    ddls_received_id_str = joinList(ddls_received_id_list)
    ddls_sent_id_str = joinList(ddls_sent_id_list)
    ddls_checked_id_str = joinList(ddls_checked_id_list)
    notices_received_id_str = joinList(notices_received_id_list)
    notices_checked_id_str = joinList(notices_checked_id_list)
    notices_sent_id_str  = joinList(notices_sent_id_list)
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )

    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    sql = "UPDATE MEMBER SET NAME=%s,BELONGS_TO_CONTAINER=%s,DDLS_RECEIVED=%s,DDLS_SENT=%s,DDLS_CHECKED=%s,NOTICES_RECEIVED=%s,NOTICES_CHECKED=%s,NOTICES_SENT=%s WHERE ID=%s"% (name,belongs_to_container_id_str,ddls_received_id_str,ddls_sent_id_str,ddls_checked_id_str,notices_received_id_str,notices_checked_id_str,notices_sent_id_str,id)
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
    except:
   # 发生错误时回滚
        db.rollback()
# 关闭数据库连接
    db.close()

def saveDDL(id,name,club_id,post_date,end_date,content,from_member_id,to_members_id_list,not_done_members_id_list):
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )
    to_members_id_str = joinList(to_members_id_list)
    not_done_members_id_str = joinList(not_done_members_id_list)
    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    sql = "UPDATE DDL SET NAME=%s,CLUB=%s,POST_DATE=%s,END_DATE=%s,CONTENT=%s,FROM_MEMBER=%s,TO_MEMBERS=%s,NOT_DONE_MEMBERS=%s WHERE ID=%s"% (name,club_id,post_date,end_date,content,from_member_id,to_members_id_str,not_done_members_id_str,id)
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
    except:
   # 发生错误时回滚
        db.rollback()
# 关闭数据库连接
    db.close()
    
def saveNotice(id,name,club_id,post_date,content,from_member_id,to_members_id_list):
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )
    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    to_members_id_str = joinList(to_members_id_list)
    sql = "UPDATE NOTICE SET NAME=%s,CLUB=%s,POST_DATE=%s,CONTENT=%s,FROM_MEMBER=%s,TO_MEMBERS=%s WHERE ID=%d"%(name,club_id,post_date,content,from_member_id,to_members_id_str,id)
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
    except:
   # 发生错误时回滚
        db.rollback()
# 关闭数据库连接
    db.close()
    
def fetchClub(id):
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )
    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    sql="SELECT * FROM CLUB WHERE ID=%s"%(id)
    result = None
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        result = cursor.fechone()
    except:
   # 发生错误时回滚
        db.rollback()
    return result

def fetchMember(id):
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )
    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    sql="SELECT * FROM Member WHERE ID=%s"%(id)
    result = None
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        result = cursor.fechone()
    except:
   # 发生错误时回滚
        db.rollback()
    return result

def fetchContainer(id):
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )
    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    sql="SELECT * FROM CONTAINER WHERE ID=%s"%(id)
    result = None
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        result = cursor.fechone()
    except:
   # 发生错误时回滚
        db.rollback()
    return result

def fetchDDL(id):
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )
    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    sql="SELECT * FROM DDL WHERE ID=%s"%(id)
    result = None
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        result = cursor.fechone()
    except:
   # 发生错误时回滚
        db.rollback()
    return result

def fetchNotice(id):
    db = PyMySQL.connect("localhost", "root", "root", "mydatabase", charset='utf8' )
    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
    sql="SELECT * FROM NOTICE WHERE ID=%s"%(id)
    result = None
    try:
    # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        result = cursor.fechone()
    except:
   # 发生错误时回滚
        db.rollback()
    return result