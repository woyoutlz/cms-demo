import * as React from 'react';
import { Icon, DatePicker, Form, Layout, Input, Button, notification, BackTop, Select, Upload, Switch } from 'antd';
// import * as getTradingPairFormAction from 'src/actions/getTradingPairFormAction.js'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lotteryListActions from 'src/actions/lotteryListActions.js';

import { uploadImgArray } from './service';
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
      uploading: false,
      fileList: [],
      fileUrls: []
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
        // sendData.detailImg = this.state.fileUrls;
        // sendData.detailImg = this.props.detailImg.detailImg;
        console.log(sendData, 'ssssssssssssss');
        if (id) {
          sendData.lotteryId = id;
          this.props.actions.editLottery(sendData);

        } else {
          this.props.actions.createLottery(sendData);
        }
        this.props.history.push(`/projects`);
      }
    });
  }
  cancel = () => {
    this.props.history.push(`/projects`)
  }
  componentWillReceiveProps(n) {
  }

  handleOpenTypeChange = (value) => {
      // this.props.actions.changeOpenType(value);
  }
  
  normFileArray = (e) => {
     console.log('Upload event:', e);
     console.log(e);
     if (Array.isArray(e)) {
       console.log(e)
		return e;
     } 
  }


  normFile = (e) => {
    const res = e.file.response;
    if(res){
      return res.data;
    }
    
  }
  normFile2 = (e) => {
    let tempFilesArray = [];
      e.fileList.map((files)=>{
        console.log(files.response,'fffffffff')
        if(files.response){
          tempFilesArray.push(files.response.data);
        }
        
      })
    return tempFilesArray;
    // const res = e.file.response;
    // if(res){
    //   return res.data;
    // }
    
  }
 //  uploadImgArray = (e) => {
	// 	console.log(e);
	// }

  handleUploads = (e) => {

    e.preventDefault()
    const { fileList } = this.state;
    const formData = new FormData();
    console.log(formData, 'formData')
    fileList.forEach((file) => {
      console.log(file)
      formData.append('files', file);
    });
    this.setState({
      uploading: true,
    });
    this.props.actions.uploadImgArray(formData);
    // uploadImgArray(formData, this.resetForm);
  }

  resetForm = (e) => {
    let data = e.data;
    console.log(data, this);
    this.setState({
      fileUrls: e.data
    });
  }

  onChangeDemo = (e) => {
    console.log(e, 'eeeeeeeeee');
  }
  onChangeDemo2 = (e) => {
    console.log(e, 'eeeeeeeeee');
  }

  statusChange = (e) => {
    console.log(e);
  }

  render() {
    
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
      appId,
      path,
      // detailImg,
      touchPaste,
      rewardDesc,
			rewardImgDesc,
      templateId,
      value1,
      value2,
      value3
    } = this.props.lotteryDetail;
    // const needAccountForType = this.state.needAccountForType;
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
	const fileList = this.state.fileList || [];
  // const { detailImg } = this.props.detailImg;
  const uploading = this.state.uploading;
	const uploadImgArrayProps = {
		onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
	}
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
        {/*onChange={this.handleOpenTypeChange}*/}
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
            
          >
            <Option value={1} >按照时间开奖</Option>
            <Option value={2}>按照人数开奖</Option>
          </Select>
        )}
        </FormItem>

        <FormItem
          label="appId"
          {...formItemLayout}
        >
        {getFieldDecorator('appId', {
          rules: [{
            required: false, message: 'Please input appId',
          }],
          initialValue: appId
        })(
          <Input placeholder="appId" />
        )}
        </FormItem>

        <FormItem
          label="path"
          {...formItemLayout}
        >
        {getFieldDecorator('path', {
          rules: [{
            required: false, message: 'Please input path',
          }],
          initialValue: path
        })(
          <Input placeholder="path" />
        )}
        </FormItem>
        {/*
          needAccountForType?(*/}
            <FormItem
              label="达到人数开奖"
              {...formItemLayout}
            >
            {getFieldDecorator('countForType', {
              rules: [{
                required: false, message: 'Please input name',
              }],
              initialValue: countForType
            })(
              <Input placeholder="countForType" />
            )}
            </FormItem>
          {/*):null
        }*/}
         
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
          label="奖品说明"
          {...formItemLayout}
        >
        {getFieldDecorator('rewardDesc', {
          rules: [{
            required: false, message: 'Please input reward desc' 
          }],
          initialValue: rewardDesc
        })(
          <Input placeholder="rewardDesc" />
        )}
        </FormItem>

<FormItem
          label="奖品图片说明"
          {...formItemLayout}
        >
        {getFieldDecorator('rewardImgDesc', {
          rules: [{
            required: false, message: 'Please input reward img desc' 
          }],
          initialValue: rewardImgDesc
        })(
          <Input placeholder="rewardImgDesc" />
        )}
        </FormItem>

		<FormItem
          label="一键黏贴"
          {...formItemLayout}
        >
        {getFieldDecorator('touchPaste', {
          rules: [{
            required: false, message: 'Please input touch paste' 
          }],
          initialValue: touchPaste
        })(
          <Input placeholder="touchPaste" />
        )}
        </FormItem>
		{/*<FormItem
          {...formItemLayout}
          label="Dragger more images"
        >
          <div className="dropbox">
            {getFieldDecorator('detailImg', {
              valuePropName: 'file',
              getValueFromEvent: this.normFileArray,
              initialValue: detailImg            
            })(
              <div>
             		<Upload.Dragger 
      					 {...uploadImgArrayProps}
      			  	>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">点击或拖拽上传文件</p>
                  <p className="ant-upload-hint">支持多个文件上传</p>
                </Upload.Dragger>
                <Button
                  onClick={this.handleUploads}
                  disabled={fileList.length === 0}
                  loading={uploading}
                  style={{ marginTop: 16 }}
                >
                  {uploading ? 'Uploading' : 'Start Upload' }
                </Button>
              </div>
            )}
          </div>
        </FormItem>*/}
        <FormItem
          {...formItemLayout}
          label="Dragger"
        >
          <div className="dropbox">
            {getFieldDecorator('detailImg', {
              valuePropName: 'file2',
              getValueFromEvent: this.normFile2,
              initialValue: []
            })(
              <Upload.Dragger 
                name="avatar" 
                method="post" 
                action="/lotteryForAdmin/uploadImg" 
                onChange={this.onChangeDemo2}
              >
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
          {...formItemLayout}
          label="Dragger"
        >
          <div className="dropbox">
            {getFieldDecorator('imgUrl', {
              valuePropName: 'file',
              getValueFromEvent: this.normFile,
              initialValue: imgUrl
            })(
              <Upload.Dragger 
                name="avatar" 
                method="post" 
                action="/lotteryForAdmin/uploadImg" 
                onChange={this.onChangeDemo}
              >
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
  console.log(state, 'state');
  return {
    lotteryDetail: state.detailReducer.data,
    detailImg: state.uploadImgArrayReducer,
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
