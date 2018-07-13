import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { notification } from 'antd';
import * as projectsListActions from 'src/actions/projectsListActions.js';
import { adminService } from './service';
import ConfirmModal from './modal';
import { op_project } from 'src/constants/project_struct.js'
import { controll_types } from './inputs.js'
import _ from 'lodash'
class Permission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    // this.props.actions.getProjectsList();
  }

  createProject = () => {
    this.props.history.push('/projects/add')
  }

  mapper(data) {
    return data.map(i => {
      controll_types[i].key = i
      return controll_types[i]
    }).filter(i => !!i)
  }
  modalok(url, datas, result) {
    // console.log(datas,result)
    let args = {}
    for (let i of datas) {
      let rpath = i.path.join(".")
      _.set(args, rpath, result[i.key])
    }
    let self = this
    // console.log(url,args)
    adminService(url, args, res => {
      console.log(res)
      if (res.code == 0) {
        self.openNotification(url, "请求成功")
      }
    })
  }
  openNotification(msg, des) {
    notification.open({
      message: msg,
      description: des,
    })
  }
  render() {
    return (
      <div className="page-in">
        <ConfirmModal
          cb={this.modalok.bind(this, '/api/admin/create_account')}
          name='创建用户'
          datas={this.mapper(["account", "password"])}
        />
        <ConfirmModal
          cb={this.modalok.bind(this, '/api/admin/permission/spe_project')}
          name='项目权限'
          datas={this.mapper(["pro_account", "project_id", "project_action"])}
        />
        <ConfirmModal
          cb={this.modalok.bind(this, '/api/admin/permission/project_show')}
          name='web端展示修改权限'
          datas={this.mapper(["pro_account", "status"])}
        />
        <ConfirmModal
          cb={this.modalok.bind(this, '/api/v1/project/changeshow')}
          name='web端修改'
          datas={this.mapper(["show_projectid", "show_control", "show_banner", "show_score"])}
        />
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
)(Permission)