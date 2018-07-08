import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { notification,Table,Col,Row ,Button} from 'antd';
import { api_get,api_post } from 'src/utils/fetch.js';
import JSONModal from 'src/zujian/modal/jsonModal';
import { op_project } from 'src/constants/project_struct.js'

import _ from 'lodash'
class History extends React.Component {
  constructor(props) {
    super(props);
    let self = this
    let columns = [{name:"account",display:"账号"},{name:"type",display:"操作类"},{name:"timestamp",display:"时间"}].map(i=>self.map_field(i))
    this.state = {
      logs:[],
      columns:columns.concat([ {
      title: "操作",
      key: "action",
      width:100,
      render:(text,record)=> <JSONModal name="详细" json={record}></JSONModal>
    }])
    };
  }
  
  componentDidMount() {
     this.getLogsList();
  }
  getLogsList(){
    let self = this
    api_post("/api/v1/log/list",{data:{limit:100}},true,(res)=>{
      console.log(res)
      let logs = res.result.map(i=>{
        i.key = i._id
        return i
      })
      self.setState({logs:logs})
    })
  }
  online_pre(){
   if(window.confirm("你确定把预发布的项目发布吗？")){
      api_post("/api/v1/project/pre2online",{},true,(res)=>{
        if(res.code==0){
              notification.open({
              message: "发布成功",
              description: JSON.stringify(res.result),
            })
        }
      })
   }
  }
  map_field(config) {
    let name = config.name
    let display = config.display||config.name

    let return_obj =  {
      title: display,
      dataIndex: name,
      key: name,
      width:100,
    }
    return　return_obj
  }
  render() {
    return (
      <div className="page-in">
        <Table columns={this.state.columns}  dataSource={this.state.logs} />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}
function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History)