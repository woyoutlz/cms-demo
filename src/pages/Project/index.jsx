import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Table, Icon, Divider, Button, Row, Col, notification } from 'antd';
import * as projectsListActions from 'src/actions/projectsListActions.js';
import { deleteProjectServiece } from './service';
import { op_project } from 'src/constants/project_struct.js'
import ConfirmModal from './modal'
import PermissionModel from 'src/pages/Permission/modal'
import { adminService } from 'src/pages/Permission/service.js'
import { controll_types } from 'src/pages/Permission/inputs.js'
import { api_post } from 'src/utils/fetch.js';
import _ from 'lodash'
class Project extends React.Component {
  constructor(props) {
    super(props);
    let columns_start = [{
      title: op_project['name'].display,
      dataIndex: 'name',
      key: 'name',
      width: 150,
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
    let columns_end2 = [
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          let parent_action
          if (record.parent && parseInt(record.parent) > 0) {
            parent_action = <Button onClick={this.inherate_user.bind(this, record)}>继承用户</Button>
          }
          return (
            <span>
              <PermissionModel
                cb={this.modalok.bind(this, '/api/v1/project/changeshow', record.id)}
                name='web端修改'
                datas={this.mapper(["show_control", "show_banner", "show_score", "show_parent"])}
              />
              <Divider type="vertical" />
              <Link to={`/projects/copy/${record.id}`}>拷贝创建</Link>
              <Divider type="vertical" />
              {parent_action}
            </span>
          )
        },
      }
    ]
    let columns = _.concat(columns_start, columns_nomal, columns_end)
    let columns_2 = _.concat(columns_start, ['id', 'created_at', { name: 'score', type: 'control_sort' }, { name: "banner", type: "control_sort" },
      { name: 'control', 'type': 'filter_data', msg: ['online', 'offline', 'pre_online'] }, { name: "parent", type: "to_int_sort" }]
      .map(this.map_field),
      columns_end2)
    this.state = {
      columns: columns,
      columns_1: columns,
      columns_2: columns_2
    };
  }
  inherate_user(record) {
    console.log(record)
    let self = this
    api_post('/api/v1/project/user/copy', {
      data: {
        "from_id": record.parent,
        "to_id": record.project,
        "override": false
      }
    }, true, res => {
      console.log(res)
      if (res.code === 0) {
        notification.open({
          message: 'ok',
          description: "继承成功",
        })
      } else if (res.code === -1){
        notification['error']({
          message: 'error',
          description: JSON.stringify(res.result),
        })
      }
    })
  }
  modalok(url, id, datas, result) {
    console.log(id, datas, result)
    let args = {}
    for (let i of datas) {
      let rpath = i.path.join(".")
      _.set(args, rpath, result[i.key])
    }
    _.set(args, 'data.project', id)
    let self = this
    // console.log(url,args)
    adminService(url, args, res => {
      console.log(res)
      if (res.code == 0) {
        notification.open({
          message: url,
          description: "请求成功",
        })
      }
    })
  }
  mapper(data) {
    return data.map(i => {
      controll_types[i].key = i
      return controll_types[i]
    }).filter(i => !!i)
  }
  map_field(name) {
    let obj
    if (name.name) {
      obj = name
      name = name.name
    }
    let display = name
    if (op_project[name] && op_project[name].display) {
      display = op_project[name].display
    }
    let return_obj = {
      title: display,
      dataIndex: name,
      key: name,
      width: 100,
    }
    if (obj && obj.type === 'control_sort') {
      return_obj.sorter = (a, b) => a[name] - b[name]
    }
    if (obj && obj.type === 'to_int_sort') {
      return_obj.sorter = (a, b) => {
        let f1 = a[name] || 0
        let f2 = b[name] || 0
        return parseInt(f1) - parseInt(f2)
      }
    }
    if (obj && obj.type === 'filter_data') {
      Object.assign(return_obj, {
        filters: obj.msg.map(i => {
          return { text: i, value: i }
        }),
        onFilter: (v, r) => r.control === v

      })
      console.log(name, return_obj)
    }
    return return_obj
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
      'columns': this.state.columns_2
    })
  }
  change_info() {
    this.setState({
      'columns': this.state.columns_1
    })
  }
  handleChange(pagination, filters, sorter) {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
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
            <Button htmlType="submit" className="login-form-button" onClick={this.change_info.bind(this)}>项目信息</Button>
          </Col>
          <Col span={3}>
            <Button htmlType="submit" className="login-form-button" onClick={this.change_show.bind(this)}>展示信息</Button>
          </Col>
        </Row>
        <Table columns={this.state.columns} dataSource={data} onChange={this.handleChange.bind(this)} bordered pagination={{ pageSize: 10 }} scroll={{ y: "70vh" }} />
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