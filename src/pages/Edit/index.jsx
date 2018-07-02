import * as React from 'react';
import { Form, Input, Button } from 'antd';
// import * as getTradingPairFormAction from 'src/actions/getTradingPairFormAction.js'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as projectsListActions from 'src/actions/projectsListActions.js';
import { createProject, editProject } from './service';
import { op_project } from 'src/constants/project_struct.js'
// import { InputNumber, Checkbox } from 'antd';
const FormItem = Form.Item;
// const Option = Select.Option;
// const AutoCompleteOption = AutoComplete.Option;

// const residences = [{
//   value: 'zhejiang',
//   label: 'Zhejiang',
//   children: [{
//     value: 'hangzhou',
//     label: 'Hangzhou',
//     children: [{
//       value: 'xihu',
//       label: 'West Lake',
//     }],
//   }],
// }, {
//   value: 'jiangsu',
//   label: 'Jiangsu',
//   children: [{
//     value: 'nanjing',
//     label: 'Nanjing',
//     children: [{
//       value: 'zhonghuamen',
//       label: 'Zhong Hua Men',
//     }],
//   }],
// }];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  componentDidMount() {
    this.props.actions.getForm(this.props.match.params)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log(this.props.tradingForm)
        // values.id = this.props.tradingForm.id
        console.log(this.props.match.params.id);
        if (this.props.match.params.id) {
          values.id = this.props.match.params.id;
          delete values.status;
          delete values.recieve_address;
          editProject(values);
        } else {
          createProject(values, (res) => {
            console.log(res)
            if (res.code == 0) {
              this.props.history.push('/projects')
            };
          });
        }
        // console.log('Received values of form: ', values);
      }
    });
  }
  cancel = () => {
    this.props.history.push(`/projects`)
  }
  // public handleConfirmBlur = (e:any) => {
  //   const value = e.target.value;
  //   this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  // }
  // public compareToFirstPassword = (rule:any, value:any, callback:any) => {
  //   const form = this.props.form;
  //   if (value && value !== form.getFieldValue('password')) {
  //     callback('Two passwords that you enter is inconsistent!');
  //   } else {
  //     callback();
  //   }
  // }
  // public validateToNextPassword = (rule:any, value:any, callback:any) => {
  //   const form = this.props.form;
  //   if (value && this.state.confirmDirty) {
  //     form.validateFields(['confirm'], { force: true });
  //   }
  //   callback();
  // }
  // public handleWebsiteChange = (value:any) => {
  //   let autoCompleteResult:any;
  //   if (!value) {
  //     autoCompleteResult = [];
  //   } else {
  //     autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
  //   }
  //   this.setState({ autoCompleteResult });
  // }
  componentWillReceiveProps(n) {
    // if(n.success === 0){
    //   this.props.history.push(`/`);
    // }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // const { autoCompleteResult } = this.state;

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
    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0,
    //     },
    //     sm: {
    //       span: 16,
    //       offset: 8,
    //     },
    //   },
    // };
    const { tradingForm } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={op_project['name'].display}
        >
          {getFieldDecorator('name', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.name
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['address_key'].display}
        >
          {getFieldDecorator('address_key', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.address_key
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['rate'].display}
        >
          {getFieldDecorator('rate', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.rate
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="adds"
        >
          {getFieldDecorator('adds', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['base_accuracy'].display}
        >
          {getFieldDecorator('base_accuracy', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.base_accuracy
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['base_max_quota'].display}
        >
          {getFieldDecorator('base_max_quota', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.base_max_quota
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['base_min_quota'].display}
        >
          {getFieldDecorator('base_min_quota', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.base_min_quota
          })(
            <Input
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['base_soft_cap'].display}
        >
          {getFieldDecorator('base_soft_cap', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.base_soft_cap
          })(
            <Input
              onChange={(value) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['base_token'].display}
        >
          {getFieldDecorator('base_token', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.base_token
          })(
            <Input
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['base_token_count'].display}
        >
          {getFieldDecorator('base_token_count', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.base_token_count
          })(
            <Input
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['base_token_name'].display}
        >
          {getFieldDecorator('base_token_name', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.base_token_name
          })(
            <Input
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['close_at'].display}
        >
          {getFieldDecorator('close_at', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.close_at
          })(
            <Input
            // disabled={tradingForm.need_cancel}
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['control_status'].display}
        >
          {getFieldDecorator('control_status', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.control_status,
            // initialValue: tradingForm.upper
          })(
            <Input
            // disabled={tradingForm.need_cancel}
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['created_at'].display}
        >
          {/* {getFieldDecorator('created_at', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.created_at,
          })(
            <Input 
              // disabled={tradingForm.need_cancel}
              // onChange={(value:any) => `${value}%`}
            />
          )} */}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['current_base_token_count'].display}
        >
          {/* {getFieldDecorator('current_base_token_count', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.current_base_token_count,
          })(
            <Input
            // disabled={tradingForm.need_cancel}
            // onChange={(value:any) => `${value}%`}
            />
          )} */}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="deleted"
        >
          {/* {getFieldDecorator('deleted', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.deleted,
            // initialValue: tradingForm.upper
          })(
            <Input 
              // disabled={tradingForm.need_cancel}
              // onChange={(value:any) => `${value}%`}
            />
          )} */}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['end_at'].display}
        >
          {getFieldDecorator('end_at', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.end_at,
            // initialValue: tradingForm.upper
          })(
            <Input
            // disabled={tradingForm.need_cancel}
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['finish_at'].display}
        >
          {getFieldDecorator('finish_at', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.finish_at,
            // initialValue: tradingForm.upper
          })(
            <Input
            // disabled={tradingForm.need_cancel}
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['lock_time'].display}
        >
          {getFieldDecorator('lock_time', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.lock_time,
            // initialValue: tradingForm.upper
          })(
            <Input
            // disabled={tradingForm.need_cancel}
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['offer_at'].display}
        >
          {getFieldDecorator('offer_at', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.offer_at,
            // initialValue: tradingForm.upper
          })(
            <Input
            // disabled={tradingForm.need_cancel}
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        {/* <FormItem
          {...formItemLayout}
          label="recieve_address"
        >
          {getFieldDecorator('recieve_address', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.recieve_address,
            // initialValue: tradingForm.upper
          })(
            <Input 
              // disabled={tradingForm.need_cancel}
              // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem> */}

        <FormItem
          {...formItemLayout}
          label={op_project['start_at'].display}
        >
          {getFieldDecorator('start_at', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.start_at,
            // initialValue: tradingForm.upper
          })(
            <Input
            // disabled={tradingForm.need_cancel}
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="status"
        >
          {/* {getFieldDecorator('status', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.status,
            // initialValue: tradingForm.upper
          })(
            <Input 
              // disabled={tradingForm.need_cancel}
              // onChange={(value:any) => `${value}%`}
            />
          )} */}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['token'].display}
        >
          {getFieldDecorator('token', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.token,
            // initialValue: tradingForm.upper
          })(
            <Input
            // disabled={tradingForm.need_cancel}
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['token_count'].display}
        >
          {/* {getFieldDecorator('token_count', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.token_count,
            // initialValue: tradingForm.upper
          })(
            <Input
            // disabled={tradingForm.need_cancel}
            // onChange={(value:any) => `${value}%`}
            />
          )} */}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['token_name'].display}
        >
          {getFieldDecorator('token_name', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.token_name,
            // initialValue: tradingForm.upper
          })(
            <Input
            // disabled={tradingForm.need_cancel}
            // onChange={(value:any) => `${value}%`}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="type"
        >
          {/* {getFieldDecorator('type', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.type,
            // initialValue: tradingForm.upper
          })(
            <Input 
              // disabled={tradingForm.need_cancel}
              // onChange={(value:any) => `${value}%`}
            />
          )} */}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="update_at"
        >
          {/* {getFieldDecorator('update_at', {
            // rules: [{
            //   // type: 'number', message: 'The input is not valid number!',
            // }, {
            //   // required: true, message: 'Please input your E-mail!',
            // }],
            initialValue: tradingForm.update_at,
            // initialValue: tradingForm.upper
          })(
            <Input 
              // disabled={tradingForm.need_cancel}
              // onChange={(value:any) => `${value}%`}
            />
          )} */}
        </FormItem>

        {/* <FormItem
          {...formItemLayout}
          label="amount"
        >
          {getFieldDecorator('amount', {
            initialValue: '100'
          })(
            <InputNumber
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={(value:any) => value.replace('%', '')}
              // onChange={onChange}
            />
          )}
        </FormItem> */}

        {/* <FormItem {...formItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          )}
        </FormItem> */}
        {/* <FormItem {...formItemLayout}> */}
        <Button onClick={this.cancel}>Cancel</Button>
        <Button type="primary" htmlType="submit">submit</Button>
        {/* </FormItem> */}
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

// export default WrappedRegistrationForm;

function mapStateToProps(state) {
  return {
    // success: state.postTradingPairFormReducer.success,
    tradingForm: state.listReducer.data[0] || {}
  }
}
function mapDispatchToProps(dispatch) {
  // const actions = Object.assign(productAction, policyPlanAction)
  return {
    actions: bindActionCreators(projectsListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm)