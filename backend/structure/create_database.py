import database_operations as dbop
import pymysql
# mydb = pymysql.connect(host="localhost", user="root", passwd="root",charset="utf8")
# mycursor = mydb.cursor()
# mycursor.execute('drop database mydatabase')

# dbop.createDataBase()
possible_names = ["CLUB", "CONTAINER", "DDL", "MEMBER", "NOTICE"]
for name in possible_names:
    dbop.createDataSheet(name)


