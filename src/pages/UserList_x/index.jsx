import Button from 'antd/lib/button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Table, Icon, Divider } from 'antd';
import * as projectsListActions from 'src/actions/projectsListActions.js';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'created_at',
  dataIndex: 'created_at',
  key: 'created_at',
}, {
  title: 'token_name',
  dataIndex: 'token_name',
  key: 'token_name',
}, {
  title: 'status',
  dataIndex: 'status',
  key: 'status',
}, {
  title: 'current_base_token_count',
  dataIndex: 'current_base_token_count',
  key: 'current_base_token_count',
}, {
  title: 'current_user_count',
  dataIndex: 'current_user_count',
  key: 'current_user_count',
}, {
  title: 'start_at',
  dataIndex: 'start_at',
  key: 'start_at',
}, {
  title: 'end_at',
  dataIndex: 'end_at',
  key: 'end_at',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={`/projects/edit/${record.id}`}>Edit</Link>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
      <Divider type="vertical" />
      <Link to={`/projects/editusers/${record.id}`}>Users</Link>
    </span>
  ),
}];

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
      
    };
  }
  componentDidMount(){
    this.props.actions.getProjectsList();
  }


  
  render() {
    const data = this.props.data;
    data.forEach((e, i) => {
      e.key = `project${i}`;
    });
    console.log(data);
    return (
      <div className="page-in">
      123
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    ...state.listReducer
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(projectsListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageIn)