import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Table, Icon, Divider, Button, Row, Col } from 'antd';
import * as projectsListActions from 'src/actions/projectsListActions.js';
import { deleteProjectServiece } from './service';
import { op_project } from 'src/constants/project_struct.js'
import ConfirmModal from './modal'
import _ from 'lodash'
class Project extends React.Component {
  constructor(props) {
    super(props);
    let columns_start = [{
      title: op_project['name'].display,
      dataIndex: 'name',
      key: 'name',
      width:150,
      render: (text, record) => <Link to={`/projects/edit/${record.id}`}>{text}</Link>,
    }]
    let columns_nomal = ['created_at', 'token_name', 'status'
      , 'current_base_token_count', 'current_user_count', 'start_at',
      'end_at'].map(this.map_field)
    let columns_end = [
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <ConfirmModal
              datas={record}
            />
            <Link to={`/projects/edit/${record.id}`}>Edit</Link>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.deleteProject.bind(this, record.id)}>Delete</a>
            <Divider type="vertical" />
            <Link to={`/projects/userlist/${record.id}`}>Users</Link>
          </span>
        ),
      }
    ]
    let columns = _.concat(columns_start, columns_nomal, columns_end)
    let columns_2 =  _.concat(columns_start,['created_at','score','banner','control'].map(this.map_field),
    columns_end)
    this.state = {
      columns: columns,
      columns_1:columns,
      columns_2:columns_2
    };
  }
  map_field(name) {
    let display = name
    if (op_project[name] && op_project[name].display) {
      display = op_project[name].display
    }
    return {
      title: display,
      dataIndex: name,
      key: name,
      width:100,
    }
  }
  componentDidMount() {
    this.props.actions.getProjectsList();
  }

  createProject = () => {
    this.props.history.push('/projects/add')
  }
  deleteProject = (id) => {
    if (window.confirm('确认删除吗?')) {
      deleteProjectServiece({ id })
    }
  }
  change_show() {
    this.setState({
      'columns':this.state.columns_2
    })
  }
  change_info(){
    this.setState({
      'columns':this.state.columns_1
    })
  }
  render() {
    const data = this.props.data;
    data.forEach((e, i) => {
      e.key = `project${i}`;
    });
    console.log(data);
    return (
      <div className="page-in">
        <Row>
          <Col span={3}>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.createProject}>Create</Button>
          </Col>
          <Col span={3}>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.change_info.bind(this)}>项目信息</Button>
          </Col>
          <Col span={3}>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.change_show.bind(this)}>展示信息</Button>
          </Col>
        </Row>
        <Table columns={this.state.columns} dataSource={data}  bordered pagination={{ pageSize: 20 }} scroll={{ y: 400 }} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.listReducer
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectsListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project)