import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { notification,Table,Col,Row ,Button} from 'antd';
import { api_get,api_post } from 'src/utils/fetch.js';
import ConfirmModal from './modal';
import { op_project } from 'src/constants/project_struct.js'
import { controll_types } from './inputs.js'
import _ from 'lodash'
class UIShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects:[],
      banners:[]
    };
  }
  
  componentDidMount() {
     this.getProjectsList('pre_online,online');
  }
  getProjectsList(control){
    let self = this
    api_get("/api/cybex/projects/banner",{type:control},(res)=>{
      self.setState({banners:res.result})
    })
    api_get("/api/cybex/projects",{type:control},(res)=>{
      self.setState({projects:res.result})
    })
  }
  online_pre(){
   if(window.confirm("你确定把预发布的项目发布吗？")){
      api_post("/api/v1/project/pre2online",{},true,(res)=>{
        if(res.code==0){
              notification.open({
              message: "发布成功",
              description: JSON.stringify(res.result),
            })
        }
      })
   }
  }
  render() {
    return (
      <div className="page-in">
        <Row> 
        <Col span={3}>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.online_pre}>发布</Button>
          </Col>
        </Row>
        <Row><Col span={3}><h1>Banner</h1></Col></Row>
       <Row>
       {this.state.banners.map(i=> <Col span={4} key={i.id+'banner'}> 
            <Link to={`/projects/edit/${i.id}`}>{i.name}</Link>
            <span style={{margin:"10px"}}>{i.id}</span>
            <span style={{margin:"10px"}}>{i.control}</span>
              <span style={{margin:"10px"}}>banner:{i.banner}</span>
          </Col>)}
       </Row>
        <Row><Col span={3}><h1>List</h1></Col></Row>
       <Row>
          {this.state.projects.map(i=> <Col span={4} key={i.id+'socre'} style= {{"background":i.control=="pre_online"?"yellow":"white"}}> 
              <Link to={`/projects/edit/${i.id}`}>{i.name}</Link>
             <span style={{margin:"10px"}}>{i.id}</span>
             <span style={{margin:"10px"}}>{i.control}</span>
              <span style={{margin:"10px"}}>score:{i.score}</span>
          </Col>)}
       </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}
function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UIShow)