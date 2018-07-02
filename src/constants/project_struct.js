let op_project = {
  "name": {
    "op_required": true,
    "display": "项目名称"
  },
  "token_name": {
    "op_required": true,
    "display": "令牌符号"
  },
  "status": {
    "op": "R",
    "c_default": "pre",
    "display": "众筹状态"
  },
  "control_status": {
    "op": "RU",
    "check":["control_status"],
    "c_default": "unstart",
    "display": "项目控制状态"
  },
  "adds_keyword": {
    "display": "优势关键词"
  },
  "adds_advantage": {
    "display": "项目优势"
  },
  "adds_website": {
    "display": "官网"
  },
  "adds_detail": {
    "display": "项目详情"
  },
  "adds_banner": {
    "display": "项目banner"
  },
  "adds_logo": {
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
    "check": ["base_soft_cap"],
    "display": "软顶"
  },
  token_count:{
    "display": "众筹token总数"
  },
  "base_token_count": {
    "op_required": true,
    "check": ["start_not_change"], //开始后不可以变
    "display": "众筹总额度"
  },
  "created_at":{
    "display": "创建时间"
  },
  "start_at": {
    "op_required": true,
    "check": ["start_not_change","time_limit"], //开始后不可以变
    "display": "开始时间"
  },
  "end_at": {
    "op_required": true,
    "check": ["start_not_change","time_limit"], //开始后不可以变
    "display": "结束时间"
  },
  "rate": {
    "op_required": true,
    "check": ["start_not_change"], //开始后不可以变
    "display": "兑换比例"
  },
  "base_token_name": {
    "display": "使用币种"
  },
  "base_min_quota": {
    "op_required": true,
    "display": "个人限额最低"
  },
  "base_max_quota": {
    "op_required": true,
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
    "check":["time_limit"]
  },
  "lock_time": {
    "display": "锁定到时间"
  },
  "close_at": { 
    "display": "项目结束时间"
  },
  "token": {
    "op_required": true,
    "display": "token系统代号"
  },
  "base_token": {
    "op_required": true,
    "display": "base系统代号"
  },
  "address_key": {
    "op_required": true,
    "display": "项目key"
  },
  "recieve_address": {
    "op": "R",
    "display": "众筹地址"
  },
  "base_accuracy": {
    "op_required": true,
    "display": "众筹精度"
  }
}
module.exports = {
  op_project
}