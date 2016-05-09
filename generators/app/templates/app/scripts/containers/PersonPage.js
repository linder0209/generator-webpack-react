import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import assign from 'lodash/assign'
import Person from '../components/example/person';
import * as personActions from '../actions/person';

function mapStateToProps(state, ownProps) {
  const {
    person: {personPagination}
  } = state;

  //此处 person 中的属性 personPagination 与 action 中的 entity 值对应, 即 action 中的 entity 也叫 personPagination
  let {ids, entity} = personPagination;
  let _personPagination = assign({}, personPagination);
  _personPagination.list = (ids || []).map(id => entity[id]);

  delete _personPagination.ids;
  delete _personPagination.entity;

  return {
    personPagination: _personPagination
  };

  // 对于一次性想从 entities 中取多个实体时,可以采用以下方式
  /*const {
    person
  } = state;

  const entitykeys = ['personPagination'];
  const lists = entitykeys.map(key => {
    // 把分页信息也放到 props 中，方便获取到分页状态
    const entityList = person[key];
    let entityPagination = assign({}, entityList);
    let {ids, entity} = entityList;
    entityPagination.list = (ids || []).map(id => entity[id]);

    delete entityPagination.ids;
    delete entityPagination.entity;
    return {
      [key]: entityPagination
    };
  });

  let objects = {};
  lists.forEach((item) => {
    assign(objects, item);
  });
  return objects;*/
}

function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators(personActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);


