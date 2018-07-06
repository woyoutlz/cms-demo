import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Table, Icon, Divider, Button, Row, Col } from 'antd';
import * as projectsListActions from 'src/actions/projectsListActions.js';
import { deleteProjectServiece } from './service';
import { op_project } from 'src/constants/project_struct.js'
import ConfirmModal from './modal'

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  columns = [{
    title: "id",
    dataIndex: 'id',
    key: 'id',
  },{
    title: op_project['name'].display,
    dataIndex: 'name',
    key: 'name',
    render: (text,record) =>  <Link to={`/projects/edit/${record.id}`}>{text}</Link>,
  }, {
    title: op_project['created_at'].display,
    dataIndex: 'created_at',
    key: 'created_at',
  }, {
    title: op_project['token_name'].display,
    dataIndex: 'token_name',
    key: 'token_name',
  }, {
    title:  op_project['status'].display,
    dataIndex: 'status',
    key: 'status',
  }, {
    title: op_project['current_base_token_count'].display,
    dataIndex: 'current_base_token_count',
    key: 'current_base_token_count',
  }, {
    title: op_project['current_user_count'].display,
    dataIndex: 'current_user_count',
    key: 'current_user_count',
  }, {
    title: op_project['start_at'].display,
    dataIndex: 'start_at',
    key: 'start_at',
  }, {
    title: op_project['end_at'].display,
    dataIndex: 'end_at',
    key: 'end_at',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
         <ConfirmModal
        datas={record}
        /> 
        <Link to={`/projects/edit/${record.id}`}>Edit</Link>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={this.deleteProject.bind(this,record.id)}>Delete</a>
        <Divider type="vertical" />
        <Link to={`/projects/editusers/${record.id}`}>Users</Link>
      </span>
    ),
  }];
  componentDidMount(){
    this.props.actions.getProjectsList();
  }

  createProject = () => {
    this.props.history.push('/projects/add')
  }
  deleteProject = (id) => {
    if (window.confirm('确认删除吗?')){
      deleteProjectServiece({id})
    }
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
        </Row>
        <Table columns={this.columns} dataSource={data} />
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
)(Project)