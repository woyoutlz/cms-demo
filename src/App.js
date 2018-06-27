import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import bundle from './Bundle';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const Deomo = bundle(() => import('./pages/PageIn'));
class App extends React.Component{
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <Router>
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/projects">Projects</Link>
              </Menu.Item>
              <Menu.Item key="9">
                <Link to="/users">Users</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '16px' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              
                <Route exact={true} path="/" component={Deomo} />
              
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Footer Infos
            </Footer>
          </Layout>
        </Layout>
        
      </div>
      </Router>
    );
  }
}
export default App;
