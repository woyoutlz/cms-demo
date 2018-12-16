import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as React from 'react';
import { Modal, Button, Select, Divider, Col, Row } from 'antd';
import { api_post } from 'src/utils/fetch.js';
import EditModal from 'src/pages/EditModal';
import * as lotteryListActions from 'src/actions/lotteryListActions.js';
const Option = Select.Option;


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
    if (this.props.id) {
      this.props.actions.getLotteryDetail(this.props.id);
    }

    // console.log(this.props.datas)
    // api_post("/api/v1/project/status",
    //   {
    //     "data":
    //     {
    //       "id": this.props.datas.id
    //     }
    //   }, true, (res) => {
    //     console.log(res)
    //     if (res.code == 0) {
    //       self.setState({ status: res.result })
    //     }
    //   })
  }

  handleBlur() {
    console.log('blur');
  }

  handleFocus() {
    console.log('focus');
  }
  handleOk() {
    console.log(this)
    this.setState({
      visible: false
    });
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
      <div>
        <a href="javascript:;" onClick={this.showModal.bind(this)}>状态</a>
        <Divider type="vertical" />
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          onOk={this.handleOk.bind(this)}
        >
        <EditModal
          ref="editModal"
          id={this.props.id}
        />
          
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
    actions: bindActionCreators(lotteryListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageIn)