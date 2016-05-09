import React, {Component, PropTypes} from 'react';

class Index extends Component {
  render() {
    const {
      children, location, caches, cacheActions, personActions, personPagination
    } = this.props;

    return (
      <div>
        {children && React.cloneElement(children, {
          key: location.pathname,
          caches,
          cacheActions,
          personActions,
          personPagination
        })}
      </div>
    );
  }
}

Index.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  cacheActions: PropTypes.object,
  caches: PropTypes.object,
  personActions: PropTypes.object,
  personPagination: PropTypes.object
};

export default Index;
