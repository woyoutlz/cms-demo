import * as React from 'react';
import { Form, Input, Button, notification, BackTop } from 'antd';
// import * as getTradingPairFormAction from 'src/actions/getTradingPairFormAction.js'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as projectsListActions from 'src/actions/projectsListActions.js';
import { createProject, editProject } from './service';
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
  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     values = _.pickBy(values, (v) => {
    //       return v && v.length > 0
    //     });
    //     console.log("submit", values)
    //     console.log(this.props.match.params.id);
    //     if (this.props.match.params.id) {
    //       values.id = this.props.match.params.id;
    //       delete values.status;
    //       delete values.recieve_address;
    //       editProject(values, res => {
    //         if (res.code == 0) {
    //           this.props.history.push('/projects')
    //         } else {
    //           notification["error"]({
    //             message: 'error',
    //             description: res.result,
    //           });
    //         }
    //       });
    //     } else {
    //       createProject(values, (res) => {
    //         console.log(res)
    //         if (res.code == 0) {
    //           this.props.history.push('/projects')
    //         } else {
    //           notification["error"]({
    //             message: 'error',
    //             description: res.result,
    //           });
    //         }
    //       });
    //     }
    //   }
    // });
  }
  cancel = () => {
    // this.props.history.push(`/projects`)
  }
  componentWillReceiveProps(n) {

  }
  render() {
    
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem
          label="add start"
        >
        </FormItem>
        
        <FormItem
          label="add end"
        >
        </FormItem>
        
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