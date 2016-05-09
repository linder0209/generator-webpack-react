import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Example from '../components/example';
import * as exampleActions from '../actions/example';

function mapStateToProps(state, ownProps) {
  const {example} = state;
  return {
    activeTab: example.activeTab
  };
}

function mapDispatchToProps(dispatch) {
  return {
    exampleActions: bindActionCreators(exampleActions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);
