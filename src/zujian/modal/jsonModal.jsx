import { connect } from 'react-redux';
import * as React from 'react';
import { Modal, Button, Select, Divider, Col, Row } from 'antd';

// import * as projectsListActions from 'src/actions/projectsListActions.js';

class JsonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  componentDidMount() {

  }
  showModal() {
    let self = this
    this.setState({
      visible: true
    });
    console.log(this.props.datas)
 
  }

  handleBlur() {
    console.log('blur');
  }

  handleFocus() {
    console.log('focus');
  }
  handleOk() {
    this.setState({
      visible: false
    })
  }
  handleCancel() {
    this.setState({
      visible: false
    })
  }
  componentWillReceiveProps(n) {

  }

  render() {
    let self = this
    function get_status_value(name){
      if (self.state.status){
        return self.state.status[name]
      }
    }
    return (
      <span span={3}>
        <a href="javascript:;" onClick={this.showModal.bind(this)}>{this.props.name}</a>
        <Divider type="vertical" />
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
         <pre>
            {JSON.stringify(this.props.json,null,2)}
         </pre>
        </Modal>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    // ...state.listReducer
  }
}
function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(projectsListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JsonModal)