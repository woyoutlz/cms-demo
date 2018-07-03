import Button from 'antd/lib/button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ConfirmModal from './UserEditModal';
import * as React from 'react';
import { Table, Icon, Divider } from 'antd';
import * as getUserListActions from 'src/actions/getUserListActions';
import { editUser } from './service'


// const data = [{
//   key: '1',
//   name: 'John Brown',
//   age: 32,
//   address: 'New York No. 1 Lake Park',
// }, {
//   key: '2',
//   name: 'Jim Green',
//   age: 42,
//   address: 'London No. 1 Lake Park',
// }, {
//   key: '3',
//   name: 'Joe Black',
//   age: 32,
//   address: 'Sidney No. 1 Lake Park',
// }];

class PageIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmModal: false
    };
  }

  componentDidMount() {
    this.props.actions.getUserList(this.props.match.params);
  }
  columns = [{
    title: 'ape_link',
    dataIndex: 'ape_link',
    key: 'ape_link',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'base_token_count',
    dataIndex: 'base_token_count',
    key: 'base_token_count',
  }, {
    title: 'deleted',
    dataIndex: 'deleted',
    key: 'deleted',
  }, {
    title: 'freezing_base_token_count',
    dataIndex: 'freezing_base_token_count',
    key: 'freezing_base_token_count',
  }, {
    title: 'is_ape_ok',
    dataIndex: 'is_ape_ok',
    key: 'is_ape_ok',
  }, {
    title: 'key',
    dataIndex: 'key',
    key: 'key',
  }, {
    title: 'memo',
    dataIndex: 'memo',
    key: 'memo',
  }, {
    title: 'project_id',
    dataIndex: 'project_id',
    key: 'project_id',
  }, {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: 'token_count',
    dataIndex: 'token_count',
    key: 'token_count',
  }, {
    title: 'update_at',
    dataIndex: 'update_at',
    key: 'update_at',
  }, {
    title: 'user_id',
    dataIndex: 'user_id',
    key: 'user_id',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        {/* <Link to={`/projects/edit/${record.id}`}>Edit</Link>
        <Divider type="vertical" /> */}
        {/* <a href="javascript:;" onClick={this.editUser.bind(this, record)}>Edit_User</a> */}
        <ConfirmModal
          // showConfirmModal={this.state.showConfirmModal}
          record={record}
          // confirmData={this.state.confirmData}
          // cancelCb={()=>{this.setState({
          //   showConfirmModal: false,
          // })}}
          // comfirmRecord={this.state.comfirmRecord}
          okCb={this.sendUserData}
        />
        {/* <Divider type="vertical" />
        <Link to={`/projects/editusers/${record.id}`}>Users</Link> */}
      </span>
    ),
  }];
  editUser(record, e) {
    this.setState({ showConfirmModal: true, record: record })
  }
  sendUserData = (data) => {
    let self = this
    console.log(data)
    editUser({
      "status": data.status,
      "user_id": data.record.user_id,
      "project_id": data.record.project_id,
      "memo": data.reason
    },res=>{
      if(res.code==0){
        self.props.actions.getUserList(self.props.match.params);
      }
    })
  }
  render() {
    const data = this.props.data;
    data.forEach((e, i) => {
      e.key = `user${i}`;
    });
    return (
      <div className="page-in">
        <Table columns={this.columns} dataSource={data} />
      </div>
    );
  }
}

function mapStateToProps(state, d, cao) {
  return {
    ...state.userListReducer
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(getUserListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageIn)