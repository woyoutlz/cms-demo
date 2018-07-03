import * as React from 'react';
import { Form, Input, Button } from 'antd';
// import * as getTradingPairFormAction from 'src/actions/getTradingPairFormAction.js'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as projectsListActions from 'src/actions/projectsListActions.js';
import { createProject, editProject } from './service';
import { op_project } from 'src/constants/project_struct.js'
import { api_post } from 'src/utils/fetch.js';
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  componentDidMount() {
    if(this.props.match.params.id){
      //edit
      this.setState({type:"edit"})
      let self = this
      api_post('/api/v1/project/list',{
        data:{
          query:{
            id:this.props.match.params.id
          }
        }
      },true,res=>{
        let project_obj = res.result.data[0]
        self.setState({old_project:project_obj})
      })
    }else{
      this.setState({type:"add"})
    }
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
          editProject(values,res=>{
            if (res.code == 0) {
              this.props.history.push('/projects')
            };
          });
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
  componentWillReceiveProps(n) {

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
    let { tradingForm } = this.props;
    if (!tradingForm){
      tradingForm = {}
    }
    console.log(2,this.state.old_project)
    let self = this
    function get_project_value(name){
      if (!self.state.old_project || !self.state.old_project[name]){
        return name
      }
      return self.state.old_project[name]
    }
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
            <Input placeholder={get_project_value('name')}/>
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
            <Input placeholder={get_project_value('address_key')}/>
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
            <Input placeholder={get_project_value('rate')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="add start"
        >
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['adds_keyword'].display}
        >
          {getFieldDecorator('adds_keyword', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds_keyword
          })(
            <Input placeholder={get_project_value('adds_keyword')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['adds_advantage'].display}
        >
          {getFieldDecorator('adds_advantage', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds_advantage
          })(
            <Input placeholder={get_project_value('adds_advantage')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['adds_website'].display}
        >
          {getFieldDecorator('adds_website', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds_website
          })(
             <Input placeholder={get_project_value('adds_website')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['adds_detail'].display}
        >
          {getFieldDecorator('adds_detail', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds_detail
          })(
             <Input placeholder={get_project_value('adds_detail')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['adds_banner'].display}
        >
          {getFieldDecorator('adds_banner', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds_banner
          })(
             <Input placeholder={get_project_value('adds_banner')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['adds_logo'].display}
        >
          {getFieldDecorator('adds_logo', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds_logo
          })(
             <Input placeholder={get_project_value('adds_logo')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['adds_token_total'].display}
        >
          {getFieldDecorator('adds_token_total', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds_token_total
          })(
             <Input placeholder={get_project_value('adds_token_total')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['adds_ico_total'].display}
        >
          {getFieldDecorator('adds_ico_total', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds_ico_total
          })(
             <Input placeholder={get_project_value('adds_ico_total')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['adds_kyc_require'].display}
        >
          {getFieldDecorator('adds_kyc_require', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds_kyc_require
          })(
             <Input placeholder={get_project_value('adds_kyc_require')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['adds_erc20'].display}
        >
          {getFieldDecorator('adds_erc20', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds_erc20
          })(
             <Input placeholder={get_project_value('adds_erc20')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={op_project['adds_on_market_time'].display}
        >
          {getFieldDecorator('adds_on_market_time', {
            rules: [{
              // type: 'number', message: 'The input is not valid number!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: tradingForm.adds_on_market_time
          })(
             <Input placeholder={get_project_value('adds_on_market_time')}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="add end"
        >
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
             <Input placeholder={get_project_value('base_accuracy')}/>
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
             <Input placeholder={get_project_value('base_max_quota')}/>
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
            <Input placeholder={get_project_value('base_min_quota')}/>
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
              placeholder={get_project_value('base_soft_cap')}
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
            placeholder={get_project_value('base_token')}
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
            placeholder={get_project_value('base_token_count')}
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
            placeholder={get_project_value('base_token_name')}
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
            placeholder={get_project_value('close_at')}
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
            placeholder={get_project_value('control_status')}
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
            placeholder={get_project_value('end_at')}
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
            placeholder={get_project_value('finish_at')}
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
            placeholder={get_project_value('lock_time')}
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
            placeholder={get_project_value('offer_at')}
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
            placeholder={get_project_value('start_at')}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='status'
          extra = {get_project_value('status')}
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
            placeholder={get_project_value('token')}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={op_project['token_count'].display}
          extra = {get_project_value('token_count')}
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
            placeholder={get_project_value('token_name')}
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