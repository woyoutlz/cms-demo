import * as React from 'react';
import { Icon, DatePicker, Form, Layout, Input, Button, notification, BackTop, Select, Upload, Switch } from 'antd';
// import * as getTradingPairFormAction from 'src/actions/getTradingPairFormAction.js'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lotteryListActions from 'src/actions/lotteryListActions.js';

import { createProject, editProject, demoFunc } from './service';
import { api_post } from 'src/utils/fetch.js';

import moment from 'moment';
import _ from 'lodash'
const FormItem = Form.Item;
const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lotteryDetail: this.props.lotteryDetail,
      confirmDirty: false,
      autoCompleteResult: [],
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.props.actions.getLotteryDetail(id);
    }
    // if (this.props.match.params.id) {
    //   //edit
    //   this.setState({ type: "edit" })
    //   let self = this
    //   api_post('/api/v1/project/list', {
    //     data: {
    //       query: {
    //         id: this.props.match.params.id
    //       }
    //     }
    //   }, true, res => {
    //     let project_obj = res.result.data[0]
    //     self.setState({ old_project: project_obj })
    //   })
    // } else if (this.props.match.params.copy_from) {
    //   //edit
    //   this.setState({ type: "copy" })
    //   let self = this
    //   api_post('/api/v1/project/list', {
    //     data: {
    //       query: {
    //         id: this.props.match.params.copy_from
    //       }
    //     }
    //   }, true, res => {
    //     let project_obj = res.result.data[0]
    //     self.setState({ old_project: project_obj })
    //   })
    // } else {
    //   this.setState({ type: "add" })
    // }
  }

  demo = (e) => {
    this.props.closeModal();
    // demoFunc();
  }



  handleSubmit = (e) => {
    e.preventDefault();
    const self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // values = _.pickBy(values, (v) => {
        //   return v && v.length > 0
        // });
        const sendData = Object.assign({}, this.props.lotteryDetail, values);
        const id = this.props.match.params.id;
        const status = sendData.status ? 1: 0;
        sendData.startTime = sendData.startTime.format('YYYY-MM-DD HH:mm:ss');
        sendData.endTime = sendData.endTime.format('YYYY-MM-DD HH:mm:ss');
        sendData.status = status;
        if (id) {
          sendData.lotteryId = id;
          this.props.actions.editLottery(sendData);

        } else {
          this.props.actions.createLottery(sendData);
        }
        this.props.history.push(`/projects`);
        
        
        // console.log(this.props.match.params.id);
        // if (this.props.match.params.id) {
        //   values.id = this.props.match.params.id;
        //   delete values.status;
        //   delete values.recieve_address;
        //   editProject(values, res => {
        //     if (res.code == 0) {
        //       this.props.history.push('/projects')
        //     } else {
        //       notification["error"]({
        //         message: 'error',
        //         description: res.result,
        //       });
        //     }
        //   });
        // } else {
        //   createProject(values, (res) => {
        //     console.log(res)
        //     if (res.code == 0) {
        //       this.props.history.push('/projects')
        //     } else {
        //       notification["error"]({
        //         message: 'error',
        //         description: res.result,
        //       });
        //     }
        //   });
        // }
      }
    });
  }
  cancel = () => {
    this.props.history.push(`/projects`)
  }
  componentWillReceiveProps(n) {
    this.state.lotteryDetail = n.lotteryDetail;
    console.log(n.lotteryDetail.openType==2, 'fffffffff')
    this.state.needAccountForType = (n.lotteryDetail.openType==2)
  }

  handleOpenTypeChange = (value) => {
    if(value==1){
      this.setState({
        needAccountForType: false
      });
    }else{
      this.setState({
        needAccountForType: true
      });
    }
  }

  normFile = (e) => {
    // console.log('Upload event:', e);
    // console.log(e);
    // if (Array.isArray(e)) {
    //   return e;
    // }
    // return e && e.fileList;
    const res = e.file.response;
    if(res){
      return res.data;
    }
    
  }

  statusChange = (e) => {
    console.log(e);
  }

  render() {
    // const values = {
    //   ...fieldsValue,
    //   'startTime': fieldsValue['date-picker'].format('YYYY-MM-DD HH:mm:ss'),
    //   'endTime': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
    //   // 'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
    //   // 'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
    //   // 'range-time-picker': [
    //   //   rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
    //   //   rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
    //   // ],
    //   // 'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    // };


    const { getFieldDecorator } = this.props.form;
    const { 
      name, 
      lotteryOrder,
      rewardAccount,
      sponcerName,
      sponcerDesc,
      startTime,
      endTime,
      openType,
      countForType,
      imgUrl,
      status,
      sponcerId,
    } = this.state.lotteryDetail;
    console.log(imgUrl, 'iiiiiiiiiiiiii');
    const needAccountForType = this.state.needAccountForType;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 4},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
        md: {
          span: 8,
          offset: 8,
        },
      },
    };
    const timePickerLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 4},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 8},
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem
          label="奖品名称"
          {...formItemLayout}
        >
        {getFieldDecorator('name', {
          rules: [{
            required: true, message: 'Please input name',
          }],
          initialValue: name
        })(
          <Input placeholder="name" />
        )}
        </FormItem>

        

        <FormItem
          label="排序"
          {...formItemLayout}
        >
        {getFieldDecorator('lotteryOrder', {
          rules: [{
            required: true, message: 'Please input name',
          }],
          initialValue: lotteryOrder
        })(
          <Input placeholder="lotteryOrder" type="number" />
        )}
        </FormItem>

        <FormItem
          label="奖品数量"
          {...formItemLayout}
        >
        {getFieldDecorator('rewardAccount', {
          rules: [{
            required: true, message: 'Please input name',
          }],
          initialValue: rewardAccount
        })(
          <Input placeholder="rewardAccount" />
        )}
        </FormItem>

        <FormItem
          {...timePickerLayout}
          label="开始时间"
        >
          {getFieldDecorator('startTime', {
            rules: [{
              required: true, message: 'Please input startTime',
            }],
            initialValue: moment(startTime)
          })(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>

        <FormItem
          label="结束时间"
          {...timePickerLayout}
        >
          {getFieldDecorator('endTime', {
            rules: [{
              required: true, message: 'Please input endTime',
            }],
            initialValue: moment(endTime)
          })(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>

        <FormItem
          label="开奖条件"
          {...formItemLayout}
        >
        {getFieldDecorator('openType', {
          rules: [{
            required: true, message: 'Please input name',
          }],
          initialValue: openType
        })(
          <Select
            onChange={this.handleOpenTypeChange}
          >
            <Option value={1} >按照时间开奖</Option>
            <Option value={2}>按照人数开奖</Option>
          </Select>
        )}
        </FormItem>

        
        {
          needAccountForType?(
            <FormItem
              label="达到人数开奖"
              {...formItemLayout}
            >
            {getFieldDecorator('countForType', {
              rules: [{
                required: true, message: 'Please input name',
              }],
              initialValue: countForType
            })(
              <Input placeholder="countForType" />
            )}
            </FormItem>
          ):null
        }
         
        <FormItem
          label="赞助商编号"
          {...formItemLayout}
        >
        {getFieldDecorator('sponcerId', {
          rules: [{
            required: false, message: 'Please input sponcerId',
          }],
          initialValue: sponcerId
        })(
          <Input placeholder="sponcerId" />
        )}
        </FormItem>

        <FormItem
          label="赞助商名称"
          {...formItemLayout}
        >
        {getFieldDecorator('sponcerName', {
          rules: [{
            required: false, message: 'Please input name',
          }],
          initialValue: sponcerName
        })(
          <Input placeholder="sponcerName" />
        )}
        </FormItem>

        <FormItem
          label="赞助商说明"
          {...formItemLayout}
        >
        {getFieldDecorator('sponcerDesc', {
          rules: [{
            required: false, message: 'Please input name',
          }],
          initialValue: sponcerDesc
        })(
          <Input placeholder="sponcerDesc" />
        )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Dragger"
        >
          <div className="dropbox">
            {getFieldDecorator('imgUrl', {
              valuePropName: 'file',
              getValueFromEvent: this.normFile,
              initialValue: imgUrl
            })(
              <Upload.Dragger name="avatar" method="post" action="/lotteryForAdmin/uploadImg">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或拖拽上传文件</p>
                <p className="ant-upload-hint">支持单文件上传</p>
              </Upload.Dragger>
            )}
          </div>
        </FormItem>

        <FormItem
          {...tailFormItemLayout}
        >
        {getFieldDecorator('status', {
          rules: [{
            required: true, message: 'Please input name',
          }],
          initialValue: status
        })(
          <Switch defaultChecked={status==1} onChange={this.statusChange} />
        )}
          <Button onClick={this.cancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

// export default WrappedRegistrationForm;

function mapStateToProps(state) {
  return {
    lotteryDetail: state.detailReducer.data,
    // success: state.postTradingPairFormReducer.success,
    // tradingForm: state.listReducer.data[0] || {}
  }
}
function mapDispatchToProps(dispatch) {
  // const actions = Object.assign(productAction, policyPlanAction)
  return {
    actions: bindActionCreators(lotteryListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm)