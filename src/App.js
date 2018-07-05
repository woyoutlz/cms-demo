import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import bundle from './Bundle';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb } from 'antd';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { BigNumber } from 'bignumber.js';
import Login from './pages/login';
import User from './pages/user';
const history = createHistory();
const { Header, Content, Footer, Sider } = Layout;
const Demo = bundle(() => import('./pages/PageIn'));
const DragTable = bundle(() => import('./pages/DragTable'));
class App extends React.Component{
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  render() {
    
    return (
      <ConnectedRouter history={history}>
      <div className="App">
        <Route path="/" exact={true} component={Login} />
        <Route path="/projects" component={User} />
        {/* <Route exact={true} path="/home" component={Demo} />
        <Route exact={true} path="/projects" component={DragTable} /> */}
      </div>
      </ConnectedRouter>
    );
  }
}
// export default App;

function mapStateToProps (state) {
  return {
    location: state.routerReducer.location
  }
}
function mapDispatchToProps (dispatch) {
  return {
    // actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)