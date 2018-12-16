import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Table, Icon, Divider, Button, Row, Col, notification, Layout } from 'antd';
import * as templateAction from 'src/actions/templateAction.js';
import { deleteProjectServiece } from './service';
import { op_project } from 'src/constants/project_struct.js'
// import ConfirmModal from './modal'
import PermissionModel from 'src/pages/Permission/modal'
import { adminService } from 'src/pages/Permission/service.js'
import { controll_types } from 'src/pages/Permission/inputs.js'
import { api_post } from 'src/utils/fetch.js';
import { api_get } from 'src/utils/fetch.js';

import { fetchJson } from 'src/utils/fetch.js';


import moment from 'moment';
// import EditModal from 'src/pages/EditModal';
import _ from 'lodash';
const { Header, Content, Footer, Sider } = Layout;
class Project extends React.Component {
  constructor(props) {
    super(props);

    const columns = [{
      title: 'templateId',
      dataIndex: 'templateId',
      key: 'templateId',
    }, {
      title: 'value1',
      dataIndex: 'value1',
      key: 'value1',
    }, {
      title: 'value2',
      dataIndex: 'value2',
      key: 'value2',
    }, {
      title: 'value3',
      dataIndex: 'value3',
      key: 'value3',
    },{
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/projects/editTemplate/${record.templateId}`}>edit</Link>
          <Divider type="vertical" />
          <a href='javascript:;' onClick={
            this.sendMsg.bind(this, record.templateId)
          }>send</a>
        </span>
      ),
    }];
    this.state = {
      columns: columns,
    };
  }
  
  componentDidMount() {
    this.props.actions.getTemplateList();
  }

  createTemplate = () => {
    this.props.history.push('/projects/addTemplate')
  }
  deleteProject = (id) => {
  //  if (window.confirm('确认删除吗?')) {
  //    deleteProjectServiece({ id })
  //  }
  }
  delRobort = (id) => {
  //  this.props.actions.delRobort(id);
  }

  createRobort = (id) => {
  //  this.props.actions.createRobort(id);
  }

  delLottery = (id) => {
  //  this.props.actions.delLotteryByLotteryId(id);
  }
  sendMsg = (templateId) => {
    console.log(templateId, 'tid') 
    fetchJson({
      success: (res) => {
        console.log(res);       
      },
      data: {
        templateId
      },
      type: 'POST',
      url: '/lotteryForAdmin/remindUsers'
    })
  }
  test4 = () => {
    fetchJson({
      success: (res) => {
        console.log(res);       
      },
      type: 'GET',
      url: '/api/profile/cashActions'
    })
  }
  test2 = () => {
    fetchJson({
      success: (res) => {
        console.log(res);       
      },
      type: 'GET',
      url: '/api/profile/lotteryCash'
    })
  }
  test3 = () => {
    fetchJson({
      success: (res) => {
        console.log(res);       
      },
      type: 'POST',
      data: {
        lotteryId: 291
      },
      url: '/api/playCard/shareSuccessful'
    })
  }
  test = () => {
    fetchJson({
      success: (res) => {
        console.log(res);       
      },
      type: 'GET',
      url: '/api/playCard/playCardStatus/291',
    })
  }
  getLotteryListTest = () => {
  }

  render() {
    const data = this.props.data;
    data.map((e, i)=>{
      e.key = i;
    })
    return (
      <Content>
      <div className="page-in">
        <Row>
          <Col span={3}>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button" 
              onClick={this.createTemplate}
            >Create</Button>
          </Col>
        </Row>
        <Table 
          columns={this.state.columns} 
          dataSource={data} 
          bordered 
          pagination={false} 
        />
      </div>
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.templateReducer
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(templateAction, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project)
