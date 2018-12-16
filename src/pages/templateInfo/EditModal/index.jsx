import * as React from 'react';
import { Icon, DatePicker, Form, Layout, Input, Button, notification, BackTop, Select, Upload, Switch } from 'antd';
// import * as getTradingPairFormAction from 'src/actions/getTradingPairFormAction.js'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as templateAction from 'src/actions/templateAction.js';

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
      templateDetail: this.props.templateDetail,
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id, 'ididididid')
    if (id) {
     this.props.actions.getTemplateDetail(id);
    }
  }

  demo = (e) => {
    this.props.closeModal();
  }



  handleSubmit = (e) => {
    e.preventDefault();
    const self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const sendData = Object.assign({}, this.props.templateDetail, values);
        const id = this.props.match.params.id;
        const status = sendData.status ? 1: 0;
        if (id) {
          sendData.lotteryId = id;
          this.props.actions.createTemplate(sendData);
          // this.props.actions.editTemplate(sendData);
        } else {
          this.props.actions.createTemplate(sendData);
        }
        this.props.history.push(`/projects/templateList`);
      }
    });
  }
  cancel = () => {
  }
  componentWillReceiveProps(n) {
  }

  handleOpenTypeChange = (value) => {
  }
  
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
      templateId,
      value1,
      value2,
      value3
    } = this.props.templateDetail;
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
	
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem
          label="templateId"
          {...formItemLayout}
        >
        {getFieldDecorator('templateId', {
          rules: [{
            required: true, message: 'Please input name',
          }],
          initialValue: templateId
        })(
          <Input placeholder="templateId" />
        )}
        </FormItem>
        <FormItem
          label="value1"
          {...formItemLayout}
        >
        {getFieldDecorator('value1', {
          rules: [{
            required: true, message: 'Please input name',
          }],
          initialValue: value1
        })(
          <Input placeholder="value1" />
        )}
        </FormItem>

        <FormItem
          label="value2"
          {...formItemLayout}
        >
        {getFieldDecorator('value2', {
          rules: [{
            required: true, message: 'Please input name',
          }],
          initialValue: value2
        })(
          <Input placeholder="value2" />
        )}
        </FormItem>
      <FormItem
          label="value3"
          {...formItemLayout}
        >
        {getFieldDecorator('value3', {
          rules: [{
            required: false, message: 'Please input value3',
          }],
          initialValue: value3
        })(
          <Input placeholder="value3" />
        )}
        </FormItem>
          <Button onClick={this.cancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">submit</Button>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

// export default WrappedRegistrationForm;

function mapStateToProps(state) {
  console.log(state, 'state');
  return {
    templateDetail: state.detailReducer.data,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(templateAction, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm)
