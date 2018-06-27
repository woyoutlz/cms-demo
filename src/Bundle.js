import * as React from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      this.setState({
        component: await importComponent()
      });
    }

    render() {
      const C = (this.state.component && this.state.component.default) || null;
      return C ? (<C {...this.props} />) : null;
    }
  }
  return AsyncComponent;
}