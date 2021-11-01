## 用来操作数据库
import mysql
#创建数据库
def createDataBase():
    mydb = mysql.connector.connect(host="localhost", user="root", passwd="root")
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABSE mydatabase")
    mydb.close()
    
#返回数据库列表
def getDataBase():
    mydb = mysql.connector.connect(host="localhost", user="root", passwd="root",database="mydatabase")
    mycursor = mydb.cursor()
    mycursor.execute("SHOW DATABSES")
    rt_list = []
    for x in mycursor:
        rt_list.append(x)
    mydb.close()
    return rt_list