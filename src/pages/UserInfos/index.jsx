import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Menu, Badge, Dropdown, Table, Icon, Divider, Button, Row, Col, notification, Layout } from 'antd';
import * as userInfosActions from 'src/actions/userInfosActions.js';
import { deleteProjectServiece, sendRemindWinnerMsg } from './service';
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

    const columns = [
      { title: 'Name', dataIndex: 'phone', key: 'phone' },
      { title: 'Platform', dataIndex: 'lotteryName', key: 'lotteryName' },
      { title: 'Version', dataIndex: 'version', key: 'version' },
      { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      { title: 'Creator', dataIndex: 'creator', key: 'creator' },
      { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Action', key: 'operation', render: () => <a href="javascript:;">Publish</a> }
    ];
    
    this.state = {
      columns: columns,
    };
  }
  
  componentDidMount() {
    this.props.actions.getUserInfos();
  }
  NestedTable(props) {
    console.log(props)
    const userInfos = props.data 
    const menu = (//{{{
      <Menu>
      <Menu.Item>
      Action 1
      </Menu.Item>
      <Menu.Item>
      Action 2
      </Menu.Item>
      </Menu>
    );//}}}
 
    const expandedRowRender = (props) => {
      
      const remindWinner = (record) => {
        console.log(props)
        console.log(record, 'winner')
        sendRemindWinnerMsg(record.userid, props.lotteryId, ()=>{
        console.log('haha')
        })
      }
      console.log(props, 'ppppppppp')
      const columns = [//{{{
        { title: 'lgnickphone', dataIndex: 'lgnickphone', key: 'lgnickphone' },
        { title: 'phone', dataIndex: 'phone', key: 'phone' },
        { title: 'name', dataIndex: 'name', key: 'name' },
        { title: 'city', dataIndex: 'city', key: 'city' },
        { title: 'detail', dataIndex: 'detail', key: 'detail' },
        { title: 'postcode', dataIndex: 'postcode', key: 'postcode' },
        { 
          title: 'Action', 
          key: 'operation', 
          render: (text, record) => {
            return(
              <a href="javascript:;" onClick=
                { 
                ()=>{
                  remindWinner(record)
                } 
              }
              >Publish</a>
            )
          } 
        }
      ];//}}}
      const winners = props.winners;
      const data = [];
      winners.map((e,i)=>{
        data.push({
          ...e,
          key:i
        })
      })
      return (
        <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        />
      );
    };
    const columns = [
      { title: 'lotteryId', dataIndex: 'lotteryId', key: 'lotteryId' },
      { title: 'lotteryName', dataIndex: 'lotteryName', key: 'lotteryName' },
    ];

    const data = [];
    userInfos.map((e,i)=>{
      data.push({
        ...e,
        key:i
      })  
    })
//      for (let i = 0; i < 3; ++i) {
//        data.push({
//          key: i,
//          phone: 'Screem',
//          lotteryName: 'iOS',
//          version: '10.3.4.5654',
//          upgradeNum: 500,
//          creator: 'Jack',
//          createdAt: '2014-12-24 23:12:00',
//        });
//      }
//
    return (
      <Table
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
      />
    );
  }  
 

  render() {
    console.log(this.props)
    const NestedTable = this.NestedTable.bind(null, this.props.userInfos);
    return(
<div>
<NestedTable userInfos={this.props.userInfos} />
</div> )
  }
}

function mapStateToProps(state) {
  return {
    userInfos: state.getUserInfos
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userInfosActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project)
