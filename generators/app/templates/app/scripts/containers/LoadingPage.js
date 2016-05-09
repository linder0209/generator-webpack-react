import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import * as loadingActions from '../actions/loading';

/**
 * 演示加载中的效果,以及加载失败的错误信息
 */
class Loading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  loadData() {
    this.setState({
      loading: true
    });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  }

  loadError() {
    const {loadingActions} = this.props;
    loadingActions.getLoading();
  }

  render() {
    const {loading} = this.state;
    return (
      <div>
        <div className="examples-btn-group">
          <button type="button" className="btn btn-primary"
                  onTouchTap={() => {this.loadData()}}>加载
          </button>
          <button type="button" className="btn btn-info"
                  onTouchTap={() => {this.loadError()}}>加载失败
          </button>
          <button type="button" className={classnames({btn: true, 'load-shim': true, loading})}>Loading
          </button>
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  loadingActions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    loadingActions: bindActionCreators(loadingActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Loading);
