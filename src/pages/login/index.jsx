import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import { login } from './service';
import './login.less';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    window.sessionStorage.clear();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        login(values.userName, values.password, (res) => {
          window.sessionStorage.setItem('token', res.token);
          this.props.history.push('/projects');
          // console.log(this.props.history.push('/projects'))
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="center-base">
        <Row>
          <Col span={8} offset={8}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
              </Button>
                {/* Or <a href="">register now!</a> */}
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

function mapStateToProps(state) {
  return {
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
)(WrappedNormalLoginForm)