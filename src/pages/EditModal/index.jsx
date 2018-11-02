import * as React from 'react';
import { Form, Input, Button, notification, BackTop } from 'antd';
// import * as getTradingPairFormAction from 'src/actions/getTradingPairFormAction.js'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as projectsListActions from 'src/actions/projectsListActions.js';
import { createProject, editProject } from './service';
import { op_project } from 'src/constants/project_struct.js'
import { api_post } from 'src/utils/fetch.js';
import moment from 'moment'
import _ from 'lodash'
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      //edit
      this.setState({ type: "edit" })
      let self = this
      api_post('/api/v1/project/list', {
        data: {
          query: {
            id: this.props.match.params.id
          }
        }
      }, true, res => {
        let project_obj = res.result.data[0]
        self.setState({ old_project: project_obj })
      })
    } else if (this.props.match.params.copy_from) {
      //edit
      this.setState({ type: "copy" })
      let self = this
      api_post('/api/v1/project/list', {
        data: {
          query: {
            id: this.props.match.params.copy_from
          }
        }
      }, true, res => {
        let project_obj = res.result.data[0]
        self.setState({ old_project: project_obj })
      })
    } else {
      this.setState({ type: "add" })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values = _.pickBy(values, (v) => {
          return v && v.length > 0
        });
        console.log("submit", values)
        console.log(this.props.match.params.id);
        if (this.props.match.params.id) {
          values.id = this.props.match.params.id;
          delete values.status;
          delete values.recieve_address;
          editProject(values, res => {
            if (res.code == 0) {
              this.props.history.push('/projects')
            } else {
              notification["error"]({
                message: 'error',
                description: res.result,
              });
            }
          });
        } else {
          createProject(values, (res) => {
            console.log(res)
            if (res.code == 0) {
              this.props.history.push('/projects')
            } else {
              notification["error"]({
                message: 'error',
                description: res.result,
              });
            }
          });
        }
      }
    });
  }
  cancel = () => {
    this.props.history.push(`/projects`)
  }
  componentWillReceiveProps(n) {

  }
  render() {
    let self = this
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    let { tradingForm } = this.props;
    if (!tradingForm) {
      tradingForm = {}
    }
    function get_project_value(name, is_use_desc = true) {
      if (!self.state.old_project || !self.state.old_project[name]) {
        // name + "," + 
        let typemsg = op_project[name].type || ''
        if (op_project[name].type === "string_date") {
          typemsg = 'YYYY-MM-DD HH:mm:ss'
        }
        let descmsg = op_project[name].desc || ''
        let msg_desc = _.filter([typemsg, descmsg], i => {
          return !!i
        }).join(",")
        if (is_use_desc){
          return msg_desc
        }else{
          return null
        }
      }
      return self.state.old_project[name].toString()
    }
    function item_func(name) {
      if (!op_project[name].display) {
        op_project[name].display = name
      }
      return <FormItem
        {...formItemLayout}
        hasFeedback
        label={op_project[name].display}
      >
        {fieldDecorator(name)}
      </FormItem>
    }
    function is_string_date(rule, value, callback) {
      if (value === 'Invalid date') {
        callback(value)
      } else {
        callback()
      }
    }
    function fieldDecorator(name) {
      let readonly = false
      if (op_project[name].op) {
        if (self.state.old_project && self.state.type == 'edit') {
          //edit
          if (op_project[name].op.indexOf('U') === -1) {
            readonly = true
          }
        } else {
          //create
          if (op_project[name].op.indexOf('C') === -1) {
            return
          }
        }
        // op_project[name].op.in
      }
      let rules = []
      if (op_project[name].op_required && self.state.type !== 'edit') {
        let required_msg = op_project[name].display + '必填'
        rules.push({
          required: true, message: required_msg
        })
      } else {
        rules.push({
          required: false
        })
      }
      if (op_project[name].type && op_project[name].type === "number") {
        let type_msg = op_project[name].display + '是数字'
        rules.push({
          type: 'number', message: type_msg, transform(value) {
            if (!value) {
              value = 1
            }
            return Number(value);
          }
        })
      }
      if (op_project[name].type && op_project[name].type === "url") {
        let type_msg = op_project[name].display + '是url'
        rules.push({
          type: 'url', message: type_msg
        })
      }
      if (op_project[name].type && op_project[name].type === "string_date") {
        let type_msg = op_project[name].display + '是YYYY-MM-DD HH:mm:ss格式,例:2018-05-08 20:00:00'
        rules.push({
          validator: is_string_date,
          message: type_msg,
          transform(value) {
            return moment(value).format("YYYY-MM-DD HH:mm:ss")
          }
        })
      }
      if (readonly) {
        return <span>{get_project_value(name)}</span>
      } else {
        let option = {
          rules: rules
        }
        if (self.state.type === "copy") {
          let init_value = get_project_value(name,false)
          if (init_value){
            option.initialValue = init_value
          }
        }
        return getFieldDecorator(name, option)(
          <Input placeholder={get_project_value(name)} />
        )
      }
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        {item_func('name')}
        {item_func('address_key')}
        {item_func('rate')}
        {item_func('base_accuracy')}
        {item_func('base_max_quota')}
        {item_func('base_min_quota')}
        {item_func('base_token')}
        {item_func('base_token_name')}
        {item_func('base_token_count')}
        {item_func('token')}
        {item_func('token_name')}
        {item_func('start_at')}
        {item_func('end_at')}
        <FormItem
          {...formItemLayout}
          label="add start"
        >
        </FormItem>
        {item_func('adds_keyword')}
        {item_func('adds_advantage')}
        {item_func('adds_website')}
        {item_func('adds_whitepaper')}
        {item_func('adds_detail')}
        {item_func('adds_banner')}
        {item_func('adds_logo')}
        {item_func('adds_token_total')}
        {item_func('adds_kyc_require')}
        {item_func('adds_erc20')}
        {item_func('adds_on_market_time')}
        <FormItem
          {...formItemLayout}
          label="add end"
        >
        </FormItem>
        {item_func('receive_address')}
        {item_func('base_soft_cap')}
        {item_func('close_at')}
        {item_func('control_status')}
        {item_func('created_at')}
        {item_func('current_base_token_count')}
        {item_func('deleted')}
        {item_func('finish_at')}
        {item_func('lock_time')}
        {item_func('offer_at')}
        {item_func('status')}
        {item_func('token_count')}
        {item_func('type')}
        {item_func('update_at')}
        <Button onClick={this.cancel}>Cancel</Button>
        <Button type="primary" htmlType="submit">submit</Button>
        {/* </FormItem> */}
        <BackTop />
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

// export default WrappedRegistrationForm;

function mapStateToProps(state) {
  return {
    // success: state.postTradingPairFormReducer.success,
    // tradingForm: state.listReducer.data[0] || {}
  }
}
function mapDispatchToProps(dispatch) {
  // const actions = Object.assign(productAction, policyPlanAction)
  return {
    // actions: bindActionCreators(projectsListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm)