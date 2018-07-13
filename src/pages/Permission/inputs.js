export const controll_types = {
  "account": {
    "name": "账户名",
    "type": "input",
    "path": ["user"]
  },
  "password": {
    "name": "密码",
    "type": "input",
    "path": ["password"]
  },
  "pro_account": {
    "name": "账户名",
    "type": "input",
    "path": ["name"]
  },
  "project_id": {
    "name": "项目id",
    "type": "input",
    "path": ["project"]
  },
  "project_action": {
    "name": "项目行为",
    "type": "input",
    "path": ["action"]
  },
  "status": {
    "name": "状态",
    "type": "input",
    "path": ["status"]
  },
  "show_projectid": {
    "name": "项目",
    "type": "input",
    "path": ["data", "project"]
  },
  "show_control": {
    "name": "控制状态",
    "type": "select",
    "type_msg": ["pre_online", "offline", "online"],
    "path": ["data", "control"]
  },
  "show_banner": {
    "name": "banner",
    "type": "input",
    "path": ["data", "banner"]
  },
  "show_score": {
    "name": "score",
    "type": "input",
    "path": ["data", "score"]
  },  
  "show_parent": {
    "name": "parent",
    "type": "input",
    "path": ["data", "parent"]
  }

}