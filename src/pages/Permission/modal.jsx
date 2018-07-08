import { connect } from 'react-redux';
import * as React from 'react';
import { Modal, Button, Select, Input, Col, Row } from 'antd';
const Option = Select.Option;
// import * as projectsListActions from 'src/actions/projectsListActions.js';

class PermissionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  componentDidMount() {

  }
  showModal() {
    this.setState({
      visible: true
    });
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
    this.props.cb(this.props.datas,out)
  }
  handleCancel() {
    this.setState({
      visible: false
    })
  }
  componentWillReceiveProps(n) {

  }
  handleInput(key,e){
    let cool = {}
    cool[key] = e.target.value
    this.setState(cool)
  }
  handleSelect(key,v){
    let cool = {}
    cool[key] = v
    this.setState(cool)
  }
  render() {
    return (
      <Col span={3}>
        <Button type="primary" onClick={this.showModal.bind(this)}>{this.props.name}</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Row>
            {this.props.datas.map(x => {
              if (x.type == "input"){
                return <Col span={6} key={this.props.name+x.key}>
                  <Input  defaultValue="" placeholder={x.name} onChange={this.handleInput.bind(this,x.key)}  onBlur={this.getReason} />
                </Col>
              }
              if (x.type == "select"){
              return <Col span={6} key={this.props.name+x.key}>
                  <Select  style={{ width: 120 }} placeholder={x.name} onChange={this.handleSelect.bind(this,x.key)} >
                      {x.type_msg.map(s=><Option key={this.props.name+x.key+s} value={s}>{s}</Option>)}
                    </Select>
                </Col>
              }
            })}
          </Row>
        </Modal>
      </Col>
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
)(PermissionModal)