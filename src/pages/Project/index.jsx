import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Table, Icon, Divider, Button, Row, Col, notification, Layout } from 'antd';
import * as lotteryListActions from 'src/actions/lotteryListActions.js';
import { deleteProjectServiece } from './service';
import { op_project } from 'src/constants/project_struct.js'
// import ConfirmModal from './modal'
import PermissionModel from 'src/pages/Permission/modal'
import { adminService } from 'src/pages/Permission/service.js'
import { controll_types } from 'src/pages/Permission/inputs.js'
import { api_post } from 'src/utils/fetch.js';
import { api_get } from 'src/utils/fetch.js';
import moment from 'moment';
// import EditModal from 'src/pages/EditModal';
import _ from 'lodash';
const { Header, Content, Footer, Sider } = Layout;
class Project extends React.Component {
  constructor(props) {
    super(props);

    const columns = [{
      title: '抽奖名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'ID',
      dataIndex: 'lotteryId',
      key: 'lotteryId',
    }, {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    }, {
      title: '奖品数量',
      dataIndex: 'rewardAccount',
      key: 'rewardAccount',
    }, {
      title: '赞助商名称',
      dataIndex: 'sponcerName',
      key: 'sponcerName',
    }, {
      title: '赞助商简介',
      dataIndex: 'sponcerDesc',
      key: 'sponcerDesc',
    }, {
      title: '开奖条件',
      dataIndex: 'openType',
      key: 'openType',
    }, {
      title: '开奖条件数量',
      dataIndex: 'openTypeAccount',
      key: 'openTypeAccount',
    }, {
      title: 'banner路径',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: (text, record) => (
        <span>
          <img src={`${record.imgUrl}`} width="100" />
        </span>
      )
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },{
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/projects/edit/${record.lotteryId}`}>编辑抽奖</Link>
          {/*<ConfirmModal
            name='编辑抽奖'
            id={record.lotteryId}
          />*/}
          <Divider type="vertical" />
          <a href="javascript:;" onClick={this.delLottery.bind(this, record.lotteryId)}>删除</a>
        </span>
      ),
    }];
    
    this.state = {
      columns: columns,
    };
  }
  
  componentDidMount() {
    this.props.actions.getLotteryList();
  }

  createLottery = () => {
    this.props.history.push('/projects/add')
  }
  deleteProject = (id) => {
    if (window.confirm('确认删除吗?')) {
      deleteProjectServiece({ id })
    }
  }

  delLottery = (id) => {
    this.props.actions.delLotteryByLotteryId(id);
  }
  // change_show() {
  //   this.setState({
  //     'columns': this.state.columns_2
  //   })
  // }
  // change_info() {
  //   this.setState({
  //     'columns': this.state.columns_1
  //   })
  // }
  // handleChange(pagination, filters, sorter) {
  //   console.log('Various parameters', pagination, filters, sorter);
  //   this.setState({
  //     filteredInfo: filters,
  //     sortedInfo: sorter,
  //   });
  // }
  // initialValue: moment(startTime).format("YYYY-MM-DD HH:mm:ss")
  render() {
    const data = this.props.data;
    data.forEach((e, i) => {
      e.key = `project${i}`;
      e.startTime = moment(e.startTime).format("YYYY-MM-DD HH:mm:ss");
      e.endTime = moment(e.endTime).format("YYYY-MM-DD HH:mm:ss")
    });
    console.log(data);
    return (
      <Content>

      <div className="page-in">
        <Row>
          <Col span={3}>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button" 
              onClick={this.createLottery}
            >Create</Button>
          </Col>
          {/*<Col span={3}>
            <Button htmlType="submit" className="login-form-button" onClick={this.change_info.bind(this)}>项目信息</Button>
          </Col>
          <Col span={3}>
            <Button htmlType="submit" className="login-form-button" onClick={this.change_show.bind(this)}>展示信息</Button>
          </Col>*/}
        </Row>
        <Table 
          columns={this.state.columns} 
          dataSource={data} 
          bordered 
          pagination={false} 
        />
        {/*<ConfirmModal
          name='编辑抽奖'
        />*/}
      </div>
      </Content>
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
    actions: bindActionCreators(lotteryListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project)