import database_operations as dbop

# dbop.createDataBase()
possible_names = ["CLUB", "CONTAINER", "DDL", "MEMBER", "NOTICE"]
for name in possible_names:
    dbop.createDataSheet(name)


