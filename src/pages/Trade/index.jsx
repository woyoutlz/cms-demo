import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { notification, Table, Col, Row, Input, Button } from 'antd';
import { api_get, api_post } from 'src/utils/fetch.js';
import JSONModal from 'src/zujian/modal/jsonModal';
import _ from 'lodash'
class Trade extends React.Component {
  constructor(props) {
    super(props);
    let self = this
    let fields = ['id', 'project_id', 'user_id', 'block_num', 'token', 'token_count',
      'trade_num', 'ieo_type', 'ieo_status', 'reason',
      'created_at', 'update_at'].map(i => {
        return { name: i, display: i }
      })
    let columns = fields.map(i => self.map_field(i))
    this.state = {
      trades: [],
      columns: columns
    };
  }

  componentDidMount() {
    this.getTradesList();
  }
  getTradesList(project_id, user_id) {
    let self = this
    let query_obj = {}
    if (project_id && project_id !== "") {
      query_obj.project_id = project_id
    }
    if (user_id && user_id !== "") {
      query_obj.user_id = user_id
    }
    let find_obj = { limit: 100 }
    if (!_.isEmpty(query_obj)) {
      find_obj.query = query_obj
    }
    api_post("/api/v1/trade/list", { data: find_obj }, true, (res) => {
      console.log(res)
      let data = res.result.data.map(i=>{
        i.key = i.id + i.ieo_type
        return i
      })
      self.setState({ trades: data })
    })
  }
  online_pre() {
    if (window.confirm("你确定把预发布的项目发布吗？")) {
      api_post("/api/v1/project/pre2online", {}, true, (res) => {
        if (res.code == 0) {
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
    let display = config.display || config.name

    let return_obj = {
      title: display,
      dataIndex: name,
      key: name,
      width: 100,
    }
    return 　return_obj
  }
  projectInputValue(evt) {
    this.setState({
      project_id: evt.target.value
    })
  }
  userInputValue(evt) {
    this.setState({
      user_id: evt.target.value
    })
  }
  search() {
    // console.log(this.state.project_id,this.state.user_id)
    this.getTradesList(this.state.project_id, this.state.user_id)
  }
  render() {
    return (
      <div className="page-in">
        <Row >
          <Col span={3}><Input placeholder="project id" onChange={this.projectInputValue.bind(this)} /></Col>
          <Col span={3}><Input placeholder="user id" onChange={this.userInputValue.bind(this)} /></Col>
          <Col span={3}><Button onClick={this.search.bind(this)}>搜索</Button></Col>
        </Row>
        <Table columns={this.state.columns}  dataSource={this.state.trades} />

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
)(Trade)