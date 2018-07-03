import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Modal, Button, Select, Input, Col, Row } from 'antd';
const Option = Select.Option;
// import * as projectsListActions from 'src/actions/projectsListActions.js';

class PageIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      status: null
    };
  }
  componentDidMount() {
  }
  showModal() {
    this.setState({
      visible: true,
      status: this.props.record.status,
      reason: this.props.record.memo
    });
  }
  handleChange(value) {
    console.log(`selected ${value}`);
    this.setState({ status: value })
  }

  handleBlur() {
    console.log('blur');
  }

  handleFocus() {
    console.log('focus');
  }

  componentWillReceiveProps(n) {
    this.setState({
      visible: n.showConfirmModal
    })
  }
  handleOk = () => {
    // const dateTime = new Date(`${this.state.date}T${this.state.time}`).getTime()/1000;
    // // console.log(dateTime);
    // this.props.cb(dateTime)
    // this.setState({ loading: true });
    console.log(this)
    let data = {
      record: this.props.record,
      status: this.state.status,
      reason: this.state.reason
    }
    // setTimeout(() => {
    this.setState({ loading: false, visible: false }, () => {
      this.props.okCb(data);
    });
    // }, 300);
  }
  getReason = (e) => {
    this.setState({ reason: e.target.value });
  }
  handleCancel = () => {
    this.setState({ visible: false });
    // this.props.cancelCb();
  }
  render() {
    return (
      <div>
        <a href="javascript:;" > <span type="primary" onClick={this.showModal.bind(this)}>Open</span> 
        </a>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={6}>
              <Select
                showSearch
                value={this.state.status}
                style={{ width: 200 }}
                placeholder="Select"
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="waiting">waiting</Option>
                <Option value="reject">reject</Option>
                <Option value="pending">pending</Option>
                <Option value="ok">ok</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Input defaultValue={this.state.reason} placeholder="Reason" onBlur={this.getReason} />
            </Col>
          </Row>
        </Modal>
      </div>
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
)(PageIn)