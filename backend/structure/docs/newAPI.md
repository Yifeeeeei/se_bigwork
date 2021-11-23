# API

-------->所有api的接收值何返回值均为**json**

-------->除非特殊说明，所有方法均为**POST**

## 基本类json定义

​		在大部分Api中，返回值都会是这几类，所以将他们单独拿出来说明。这些json格式可以直接构建出一个有实际意义的数据结构。

### club_json

| key               | value_type    | a_must? | comment                                |
| ----------------- | ------------- | ------- | -------------------------------------- |
| id                | string        | y       | the id of the club                     |
| name              | string        | y       | the name of the club                   |
| discription       | string        | y       | the desciption of the club             |
| containers_id     | list\<string> | y       | the ids of the containers in that club |
| root_container_id | string        | y       | the root container's id                |

### container_json

| key                 | value_type    | a_must? | comment                                           |
| ------------------- | ------------- | ------- | ------------------------------------------------- |
| id                  | string        | y       | container's id                                    |
| name                | string        | y       | container's name                                  |
| belongs_to_club_id  | string        | y       | in which club                                     |
| upper_container_id  | string        | y       | the parent node container's in the tree structure |
| contains            | list\<string> | y       | members' ids in that container                    |
| lower_containers_id | list\<string> | y       | the child nodes' id in the tree structure         |

### member_json

| key                     | value_type    | a_must | comment                                                      |
| ----------------------- | ------------- | ------ | ------------------------------------------------------------ |
| id                      | string        | y      | member id (Wechat id)                                        |
| name                    | string        | y      | member's name                                                |
| belongs_to_container_id | list\<string> | y      | containers he belongs to (use this to find the clubs he's in) |
| ddls_received_id        | list\<string> | y      | ddls he received                                             |
| ddls_sent_id            | list\<string> | y      | ddls he sent                                                 |
| ddls_checked_id         | list\<string> | y      | ddls he checked                                              |
| notices_received_id     | list\<string> | y      | notices he received                                          |
| notices_checked_id      | list\<string> | y      | notices he checked                                           |
| notices_sent_id         | list\<string> | y      | notices he sent                                              |

### ddl_json

| key                 | value_type    | a_must? | comment                                      |
| ------------------- | ------------- | ------- | -------------------------------------------- |
| id                  | string        | y       | ddl's id                                     |
| name                | string        | y       | ddl's name/title                             |
| club_id             | string        | y       | in which club                                |
| post_date           | string        | y       | post data (format is decided by frontend)    |
| end_date            | string        | y       | deadline data(format is decided by frontend) |
| content             | string        | y       | the content                                  |
| from_member_id      | string        | y       | the sender's id                              |
| to_members_id       | list\<string> | y       | the receivers' ids                           |
| not_done_members_id | list\<string> | y       | members who haven't finished the ddl         |

### notice_json

| key            | value_type    | a_must? | comment               |
| -------------- | ------------- | ------- | --------------------- |
| id             | string        | y       | notice id             |
| name           | string        | y       | notice name/title     |
| club_id        | string        | y       | club id               |
| post_date      | string        | y       | format by front end   |
| content        | string        | y       | content of the notice |
| from_member_id | string        | y       | sender's id           |
| to_members_id  | list\<string> | y       | receivers' ids        |

## 正式接口

### /api/get/contianer 通过id获取完整container类

接收

| key  | value_type | a_must? | comment             |
| ---- | ---------- | ------- | ------------------- |
| id   | string     | y       | id of the container |

返回

要查询container的**container_json**

### /api/get/club 通过id获取完整的club类

接收

| key  | value_type | a_must? | comment        |
| ---- | ---------- | ------- | -------------- |
| id   | string     | y       | id of the club |

返回

要查询的club的**club_json**

### /api/get/member 通过id获取完整的member类

接收

| key  | value_type | a_must? | comment          |
| ---- | ---------- | ------- | ---------------- |
| id   | string     | y       | id of the member |

返回

要查询的member的**member_json**

### /api/get/ddl 通过id获取完整的ddl类

接收

| key  | value_type | a_must? | comment       |
| ---- | ---------- | ------- | ------------- |
| id   | string     | y       | id of the ddl |

返回

要查询的ddl的**ddl_json**

### /api/get/notice 通过id获取完整的notice类

接收

| key  | value_type | a_must? | comment          |
| ---- | ---------- | ------- | ---------------- |
| id   | string     | y       | id of the notice |

返回

要查询的notice的**notice_json**

### /api/create/club 将一个在后台新建一个club

接收

一个**club_json**，其中的id项可以随意填写

返回

| key               | value_type | a_must? | comment                                                      |
| ----------------- | ---------- | ------- | ------------------------------------------------------------ |
| club_id           | string     | y       | the id of the club you just created, you can use this to find it later |
| root_container_id | string     | y       | the root container of that club (already created)            |

### /api/create/container 将一个在后台新建一个container

接收

一个**container_json**，其中的id项可以随意填写

返回

| key          | value_type | a_must? | comment                                                      |
| ------------ | ---------- | ------- | ------------------------------------------------------------ |
| container_id | string     | y       | the id of the container you just created, you can use this to find it later |

comment: 注意，在创建club时，相应的root_container会自动创建，不需要再次调用这个api新建root_container。这个api的用途是创建其他的container

### /api/create/member 将一个在后台新建一个member

接收

一个**member_json**，其中的id项**不可以**随意填写（必须是微信的id）

返回

| key       | value_type | a_must? | comment              |
| --------- | ---------- | ------- | -------------------- |
| member_id | string     | y       | the id of the member |

### /api/create/ddl 将一个在后台新建一个ddl

接收

一个**ddl_json**，其中的id项可以随意填写

返回

| key    | value_type | a_must? | comment                                                      |
| ------ | ---------- | ------- | ------------------------------------------------------------ |
| ddl_id | string     | y       | the id of the ddl you just created, you can use this to find it later |

### /api/create/notice 将一个在后台新建一个notice

接收

一个**notice_json**，其中的id项可以随意填写

返回

| key       | value_type | a_must? | comment                                                      |
| --------- | ---------- | ------- | ------------------------------------------------------------ |
| notice_id | string     | y       | the id of the notice you just created, you can use this to find it later |

### /api/check/ddl 将一个ddl"打勾"

接收

| key        | value_type | a_must? | comment                            |
| ---------- | ---------- | ------- | ---------------------------------- |
| ddl_id     | string     | y       | the id of the ddl the user checked |
| checker_id | string     | y       | the id of the user                 |

返回

| key    | value_type | a_must? | comment |
| ------ | ---------- | ------- | ------- |
| result | string     | y       | OK      |

### /api/check/notice 将一个ddl"打勾"

接收

| key        | value_type | a_must? | comment                               |
| ---------- | ---------- | ------- | ------------------------------------- |
| notice_id  | string     | y       | the id of the notice the user checked |
| checker_id | string     | y       | the id of the user                    |

返回

| key    | value_type | a_must? | comment |
| ------ | ---------- | ------- | ------- |
| result | string     | y       | OK      |

### /api/modify/name 为一个用户更改名字

接收

| key       | value_type | a_must? | comment         |
| --------- | ---------- | ------- | --------------- |
| member_id | string     | y       | user id         |
| new_name  | string     | y       | user's new name |

返回

| key    | value_type | a_must? | comment |
| ------ | ---------- | ------- | ------- |
| result | string     | y       | OK      |

### /api/actions/join_container 向一个container中加入新用户（加入社团）

接收

| key          | value_type | a_must? | comment      |
| ------------ | ---------- | ------- | ------------ |
| member_id    | string     | y       | user id      |
| container_id | string     | y       | container id |

返回

| key    | value_type | a_must? | comment |
| ------ | ---------- | ------- | ------- |
| result | string     | y       | OK      |

### /api/search/club 按照关键字搜索社团

接收

| key     | value_type | a_must? | comment                  |
| ------- | ---------- | ------- | ------------------------ |
| keyword | string     | y       | some word in clubs' name |

返回

| key       | value_type           | a_must? | comment                                                      |
| --------- | -------------------- | ------- | ------------------------------------------------------------ |
| club_list | list\<**club_json**> | y       | 这是一个列表，里面的每一个元素都是一个club_json，每个club的名字中应该都包含传入的keyword |

### /api/actions/login 直接进行登入（11.22日）

接收

| key  | value_type | a_must? | comment   |
| ---- | ---------- | ------- | --------- |
| id   | string     | y       | user's id |

返回

| key    | value_type | a_must? | comment                              |
| ------ | ---------- | ------- | ------------------------------------ |
| result | string     | y       | 2 types of value: "existed" or "new" |

comment:如果返回的result值为existed，则代表该已经将该用户在后台记录过了

如果返回result值为new，则代表刚刚在后台为用户新建了member