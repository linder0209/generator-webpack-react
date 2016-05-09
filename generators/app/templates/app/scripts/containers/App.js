import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as cacheActions from '../actions/caches';
import * as indexActions from '../actions/index';

class App extends Component {
  render() {
    const {
      children, location, caches, cacheActions, errorMessage, indexActions
    } = this.props;

    return (
      <div>
        {children && React.cloneElement(children, {
          key: location.pathname,
          caches,
          cacheActions,
          errorMessage, 
          indexActions
        })}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  cacheActions: PropTypes.object,
  caches: PropTypes.object,
  errorMessage: PropTypes.string,
  indexActions: PropTypes.object
};

function mapStateToProps(state) {
  const {caches, errorMessage} = state;
  return {
    caches,
    errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cacheActions: bindActionCreators(cacheActions, dispatch),
    indexActions: bindActionCreators(indexActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
