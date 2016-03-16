import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Person from '../components/Person';
import * as Action from '../actions';

function mapStateToProps(state) {
  return {
    persons: state.persons
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Action, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);
