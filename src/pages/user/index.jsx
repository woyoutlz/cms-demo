import Button from 'antd/lib/button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Table, Icon, Divider } from 'antd';
import { BrowserRouter as Router, Route, Link, ConnectedRouter } from "react-router-dom";
import bundle from '../../Bundle';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer, Sider } = Layout;
const Deomo = bundle(() => import('../PageIn/index'));
const Permission = bundle(() => import('../Permission/index'));
const Edit = bundle(() => import('../Edit/index'));
const EditUsers = bundle(() => import('../EditUsers/index'));
const DragTable = bundle(() => import('../DragTable'));
class PageIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
  }
  logout(){
    if(window.confirm("确认退出吗")){
      window.sessionStorage.setItem("token",null)
      this.props.history.push('/') 
    }
  }
  render() {
    const location = this.props.location || {};
    let pathname = location.pathname || '/user';
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" selectedKeys={[pathname]} mode="inline">
            <Menu.Item key="/projects">
              <Link to="/projects">Home</Link>
            </Menu.Item>
            <Menu.Item key="/permission">
              <Link to="/projects/permission" >permission</Link>
            </Menu.Item>
            <Menu.Item key="/logout">
              <a  onClick={this.logout.bind(this)}>退出</a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route exact={true} path="/projects" component={Deomo} />
              <Route exact={true} path="/projects/permission" component={Permission} />
              {/* <Route exact={true} path="/admin/create_account" component={Permission} /> */}
              <Route exact={true} path="/projects/edit/:id" component={Edit} />
              <Route exact={true} path="/projects/editusers/:id" component={EditUsers} />
              <Route exact={true} path="/projects/projects" component={DragTable} />
              <Route exact={true} path="/projects/add" component={Edit} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Footer Infos
            </Footer>
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