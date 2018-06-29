import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Divider } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import * as projectsListActions from 'src/actions/projectsListActions.js';
import './DragTable.less';

function dragDirection(
  dragIndex,
  hoverIndex,
  initialClientOffset,
  clientOffset,
  sourceClientOffset,
) {
  const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
  const hoverClientY = clientOffset.y - sourceClientOffset.y;
  if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
    return 'downward';
  }
  if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
    return 'upward';
  }
}

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      dragRow,
      clientOffset,
      sourceClientOffset,
      initialClientOffset,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let className = restProps.className;
    if (isOver && initialClientOffset) {
      const direction = dragDirection(
        dragRow.index,
        restProps.index,
        initialClientOffset,
        clientOffset,
        sourceClientOffset
      );
      if (direction === 'downward') {
        className += ' drop-over-downward';
      }
      if (direction === 'upward') {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr
          {...restProps}
          className={className}
          style={style}
        />
      )
    );
  }
}

const rowSource = {
  beginDrag(props) {
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  sourceClientOffset: monitor.getSourceClientOffset(),
}))(
  DragSource('row', rowSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    dragRow: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
  }))(BodyRow)
);

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'created_at',
  dataIndex: 'created_at',
  key: 'created_at',
}, {
  title: 'token_name',
  dataIndex: 'token_name',
  key: 'token_name',
}, {
  title: 'status',
  dataIndex: 'status',
  key: 'status',
}, {
  title: 'current_base_token_count',
  dataIndex: 'current_base_token_count',
  key: 'current_base_token_count',
}, {
  title: 'current_user_count',
  dataIndex: 'current_user_count',
  key: 'current_user_count',
}, {
  title: 'start_at',
  dataIndex: 'start_at',
  key: 'start_at',
}, {
  title: 'end_at',
  dataIndex: 'end_at',
  key: 'end_at',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Edit</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
      <Divider type="vertical" />
      <a href="javascript:;" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

class DragSortingTable extends React.Component {
  state = {
    data: [],
  }

  components = {
    body: {
      row: DragableBodyRow,
    },
  }

  componentDidMount(){
    this.props.actions.getProjectsList();
  }

  componentWillReceiveProps(n){
    const data = n.data;
    data.forEach((e, i) => {
      e.key = `project${i}`;
    });
    console.log(data)
    this.setState({data: data});
  }
  
  // render() {
  //   return (
  //     <div className="page-in">
  //       <Table 
  //         columns={columns} 
  //         dataSource={this.state.data} 
  //         // components={this.components}
  //       />
  //     </div>
  //   );
  // }

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      }),() => {
        console.log(this.state)
      }
    );
  }

  render() {
    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow,
        })}
      />
    );
  }
}

const Demo = DragDropContext(HTML5Backend)(DragSortingTable);

function mapStateToProps (state) {
  return {
    ...state.listReducer
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(projectsListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo)
// export default Demo;
