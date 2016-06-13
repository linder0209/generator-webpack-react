import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import assign from 'lodash/assign';
import Film from '../components/example/film';
import * as filmActions from '../actions/film';

function mapStateToProps(state, ownProps) {
  const {
    film
  } = state;

  const entitykeys = ['allFilmList', 'popularityFilmList'];
  const lists = entitykeys.map(key => {
    // 把分页信息也放到 props 中，方便获取到分页状态
    const entityList = film[key];
    let entityPagination = assign({}, entityList);
    let {ids, entity} = entityList;
    if (ids) {
      entityPagination.list = ids.map(id => entity[id]);
    }

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
  return objects;
}

function mapDispatchToProps(dispatch) {
  return {
    filmActions: bindActionCreators(filmActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Film);
