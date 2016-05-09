import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import PersonItem from './PersonItem';

class PersonList extends Component {

  componentDidMount() {
    // 如果 reducer 把 dispatch 放到了 props 中，可以采用以下方式调用
    // import {getPersonList} from '../actions/person';
    // const {dispatch} = this.props;
    // dispatch(getPersonList());
    // 直接用以下方式处理，效果和上面是一样的

    const {personActions, caches, cacheActions} = this.props;
    if (!caches.personLoaded) {
      personActions.getPersonList();
      cacheActions.addCache('personLoaded');
    }
  }

  loadMore() {
    const {personPagination, personActions} = this.props;
    const {isFetching, lastPage} = personPagination;
    if (!isFetching && !lastPage) {
      personActions.getPersonList();
    }
  }

  refresh() {
    const {personActions} = this.props;
    personActions.cleanPersonList();
    personActions.getPersonList();
  }

  render() {
    const {personPagination, personActions} = this.props;
    const {list, isFetching, lastPage} = personPagination;
    return (
      <div>
        <div className="m-b-1">
          <Link className="btn btn-primary" to="/example/person/create">Add Person</Link>
        </div>
        
        <table className="table">
          <thead className="thead-inverse">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {
            list.map((person) => {
              return (
                <PersonItem key={person.id} person={person} personActions={personActions}/>
              );
            })
          }
          </tbody>
        </table>
        <div className="examples-btn-group">
          <button type="button" className="btn btn-primary" disabled={lastPage}
                  onTouchTap={() => {this.loadMore()}}>Load More
          </button>
          <button type="button" className="btn btn-info"
                  onTouchTap={() => {this.refresh()}}>Refresh
          </button>
          <button type="button" className={classnames({btn: true, 'load-shim': true, loading: isFetching})}>Loading</button>
        </div>
      </div>
    );
  }
}

PersonList.propTypes = {
  personActions: PropTypes.object,
  personPagination: PropTypes.object,
  caches: PropTypes.object,
  cacheActions: PropTypes.object
};

export default PersonList;
