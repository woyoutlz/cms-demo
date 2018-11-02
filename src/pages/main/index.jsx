import Button from 'antd/lib/button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Table, Icon, Divider } from 'antd';
import { BrowserRouter as Router, Route, Link, ConnectedRouter } from "react-router-dom";
import bundle from '../../Bundle';
const { Header, Content, Footer, Sider } = Layout;
const Deomo = bundle(() => import('../Project/index'));
// const Permission = bundle(() => import('../Permission/index'));
// const UIShow = bundle(() => import('../UIShow/index'));
// const Edit = bundle(() => import('../Edit/index'));
// const UserList = bundle(() => import('../UserList/index'));
// const History = bundle(() => import('../History/index'));
// const Trade = bundle(() => import('../Trade/index'));
// const DragTable = bundle(() => import('../DragTable'));
class PageIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    console.log("aaa")
    let token = window.sessionStorage.getItem("token")
    if (!token) {
      console.log("aaa")
      this.props.history.push('/')
    }
  }
  logout() {
    if (window.confirm("确认退出吗")) {
      window.sessionStorage.setItem("token", null)
      this.props.history.push('/')
    }
  }
  render() {
    const location = this.props.location || {};
    let pathname = location.pathname || '/user';
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
        >
          <div className="logo" />
          <Menu theme="dark" selectedKeys={[pathname]} mode="inline">
            <Menu.Item key="/projects">
              <Link to="/projects">Home</Link>
            </Menu.Item>
            <Menu.Item key="/permission">
              <Link to="/projects/permission" >permission</Link>
            </Menu.Item>
            <Menu.Item key="/show">
              <Link to="/projects/show" >展示</Link>
            </Menu.Item>
            <Menu.Item key="/history">
              <Link to="/projects/history" >操作历史</Link>
            </Menu.Item>
            <Menu.Item key="/trade">
              <Link to="/projects/trade" >trade查询</Link>
            </Menu.Item>
            <Menu.Item key="/logout">
              <a onClick={this.logout.bind(this)}>退出</a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ marginLeft: 200 }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route exact={true} path="/projects" component={Deomo} />
              {/*<Route exact={true} path="/projects/permission" component={Permission} />
              <Route exact={true} path="/projects/show" component={UIShow} />
              <Route exact={true} path="/projects/history" component={History} />*/}
              {/*<Route exact={true} path="/projects/trade" component={Trade} />*/}
              {/*<Route exact={true} path="/projects/edit/:id" component={Edit} />*/}
              {/*<Route exact={true} path="/projects/userlist/:id" component={UserList} />*/}
              {/*<Route exact={true} path="/projects/projects" component={DragTable} />*/}
              {/*<Route exact={true} path="/projects/add" component={Edit} />*/}
              {/*<Route exact={true} path="/projects/copy/:copy_from" component={Edit} />*/}
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>
            Footer Infos
            </Footer> */}
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    location: state.routerReducer.location
  }
}
function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageIn)