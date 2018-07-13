import { connect } from 'react-redux';
import * as React from 'react';
import { Modal, Button, Select, Divider, Col, Row } from 'antd';
import { api_post } from 'src/utils/fetch.js';
const Option = Select.Option;
// import * as projectsListActions from 'src/actions/projectsListActions.js';

class PageIn extends React.Component {
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
    api_post("/api/v1/project/status",
      {
        "data":
        {
          "id": this.props.datas.id
        }
      }, true, (res) => {
        console.log(res)
        if (res.code == 0) {
          self.setState({ status: res.result })
        }
      })
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
    let out = Object.assign(this.state)
    delete out.visible
    this.props.cb && this.props.cb(this.props.datas, out)
  }
  handleCancel() {
    this.setState({
      visible: false
    })
  }
  componentWillReceiveProps(n) {

  }
  handleInput(key, e) {
    let cool = {}
    cool[key] = e.target.value
    this.setState(cool)
  }
  render() {
    let self = this
    function get_status_value(name) {
      if (self.state.status) {
        return self.state.status[name]
      }
    }
    return (
      <span span={3}>
        <a href="javascript:;" onClick={this.showModal.bind(this)}>状态</a>
        <Divider type="vertical" />
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Row>
            <span style={{ marginRight: "20px" }}>收钱人数</span><span>{get_status_value('ico_user_count')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>收到base</span><span>{get_status_value('base_received')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>市场量</span><span>{get_status_value('on_market')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>暂停发币</span><span>{get_status_value('stopped')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>发币人数</span><span>{get_status_value('ico_user_sent_count')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>用户申请数</span><span>{get_status_value('user_application_count')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>待退还币</span><span>{get_status_value('base_received_invalid')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>错误币种</span><span>{get_status_value('base_received_invalid_other')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>延迟发币</span><span>{get_status_value('delay')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>未确认</span><span>{get_status_value('freezing')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>暂停发币</span><span>{get_status_value('stopped')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>已发币</span><span>{get_status_value('sent')}</span>
          </Row>
          <Row>
            <span style={{ marginRight: "20px" }}>状态检验</span><span>{get_status_value('verify')}</span>
          </Row>
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
)(PageIn)