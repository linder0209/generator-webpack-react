import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import examples from '../../../json/examples';

class Example extends Component {

  componentWillMount() {
    const {
      location
    } = this.props;
    this.switchTab(location.pathname);
  }

  switchTab(router, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const {
      exampleActions, indexActions
    } = this.props;
    exampleActions.switchTab(router);
    this.context.router.push(router);
  }

  closeError() {
    const {
      indexActions
    } = this.props;
    indexActions.resetErrorMessage();
  }

  render() {
    const {
      children, location, activeTab, caches, cacheActions, errorMessage
    } = this.props;

    return (
      <div className="container-example">
        <div className="container">
          <ul className="nav nav-tabs">
            {
              examples.map((item) => {
                const {id, title, router, activePath} = item;
                const cls = classnames({
                  'nav-link': true,
                  active: activePath ? activePath.indexOf(activeTab) !== -1 : activeTab === router
                });

                return (
                  <li key={id} className="nav-item">
                    <a className={cls} onTouchTap={(event) => this.switchTab(router, event)}>{title}</a>
                  </li>
                );
              })
            }
          </ul>
          {
            errorMessage ?
              (<div className="row m-t-1">
                <div className="col-sm-offset-2 col-sm-8 alert alert-danger alert-dismissible">
                  <button type="button" className="close" onTouchTap={() => this.closeError()}>
                    <span>&times;</span>
                  </button>
                  <strong>{errorMessage}</strong>
                </div>
              </div>) : null
          }
          <div className="tab-content m-t-1">
            {children && React.cloneElement(children, {
              key: location.pathname,
              caches,
              cacheActions
            })}
          </div>
        </div>
      </div>
    );
  }
}

Example.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  activeTab: PropTypes.string,
  exampleActions: PropTypes.object,
  cacheActions: PropTypes.object,
  caches: PropTypes.object,
  errorMessage: PropTypes.string,
  indexActions: PropTypes.object
};

Example.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Example;
