let op_project = {
  "name": {
    "op_required": true,
    "desc": "ieo项目名称",
    "eg": "",
    "display": "项目名称"
  },
  "token_name": {
    "op_required": true,
    "desc":"接受币的展示,如ABC",
    "display": "令牌符号"
  },
  "status": {
    "op": "R",
    "c_default": "pre",
    "display": "众筹状态"
  },
  "control_status": {
    "op": "RU",
    "check": ["control_status"],
    "c_default": "unstart",
    "display": "项目控制状态"
  },
  "adds_keyword": {
    "display": "优势关键词"
  },
  "adds_whitepaper": {
    "type":"url",
    "display": "白皮书"
  },
  "adds_advantage": {
    "display": "项目优势"
  },
  "adds_website": {
    "type":"url",
    "display": "官网"
  },
  "adds_detail": {
    "display": "项目详情"
  },
  "adds_banner": {
    "type":"url",
    "display": "项目banner"
  },
  "adds_logo": {
    "type":"url",
    "display": "项目logo"
  },
  "adds_token_total": {
    "display": "代币总量"
  },
  "adds_ico_total": {
    "display": "ICO总量"
  },
  "adds_kyc_require": {
    "display": "KYC要求"
  },
  "adds_erc20": {
    "display": "ERC-20令牌"
  },
  "adds_on_market_time": {
    "display": "上市时间"
  },
  "type": {
    "c_default": "nomal",
    "display": "项目类型"
  },
  "base_soft_cap": {
    "type":"number",
    "check": ["base_soft_cap"],
    "display": "软顶"
  },
  "receive_address":{
    "op":"R",
    "display": "收款地址"
  },
  token_count: {
    "op":"R",
    "display": "众筹token总数"
  },
  "base_token_count": {
    "op_required": true,
    "type":"number",
    "desc":"项目总融资额,单位base币",
    "check": ["start_not_change"], //开始后不可以变
    "display": "众筹总额度"
  },
  "created_at": {
    "op":"R",
    "display": "创建时间"
  },
  "start_at": {
    "op_required": true,
    "type":"string_date",
    "check": ["start_not_change", "time_limit"], //开始后不可以变
    "display": "开始时间"
  },
  "end_at": {
    "op_required": true,
    "type":"string_date",
    "check": ["start_not_change", "time_limit"], //开始后不可以变
    "display": "结束时间"
  },
  "rate": {
    "op_required": true,
    "type": "number",
    "desc": "1个base币兑换多少个token",
    "check": ["start_not_change"], //开始后不可以变
    "display": "兑换比例"
  },
  "base_token_name": {
    "desc":"比如ETH 展示用",
    "display": "使用币种"
  },
  "base_min_quota": {
    "op_required": true,
    "type":"number",
    "desc":"单人单次最低融资额,单位base",
    "display": "个人限额最低"
  },
  "base_max_quota": {
    "op_required": true,
    "type":"number",
    "desc":"单人最高融资额,单位base",
    "display": "个人限额最高"
  },
  "current_base_token_count": {
    "op": "R",
    "display": "当前募资"
  },
  "current_user_count": {
    "op": "R",
    "display": "参与人数"
  },
  "current_percent": {
    "op": "R",
    "display": "完成百分比"
  },
  "finish_at": { //后台计算
    "op": "R",
    "display": "融资完成时间"
  },
  "all_take_time": { //后台计算
    "op": "R",
    "display": "众筹总耗时"
  },
  "offer_at": {
    "display": "发币时间",
    "type":"string_date",
    "check": ["time_limit"]
  },
  "lock_time": {
    "type":"string_date",
    "display": "锁定到时间"
  },
  "close_at": {
    "type":"string_date",
    "display": "运营结束时间"
  },
  "token": {
    "op_required": true,
    "desc":"发出币的系统代号,如JADE.ABC",
    "display": "token系统代号"
  },
  "base_token": {
    "op_required": true,
    "desc":"接受币的系统内代号，如JADE.ETH",
    "display": "base系统代号"
  },
  "address_key": {
    "op_required": true,
    "desc": "项目seed key,由seed管理者提供",
    "display": "项目key"
  },
  "recieve_address": {
    "op": "R",
    "display": "众筹地址"
  },
  "base_accuracy": {
    "op_required": true,
    "type":"number",
    "desc":"接受众筹的最小精度,如0.1则填1",
    "display": "众筹精度"
  },
  "deleted":{
    "op":"RU",
    "display": "是否删除"
  },
  "update_at":{
    "op":"R",
    "display":"更新时间"
  }
}
module.exports = {
  op_project
}