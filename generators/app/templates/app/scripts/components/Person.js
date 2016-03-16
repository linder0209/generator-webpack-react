import React, {Component, PropTypes} from 'react';
import PersonList from './PersonList';

class Person extends Component {
  render() {
    const {dispatch, persons} = this.props;
    const personListProps = {
      dispatch,
      persons
    };
    return (
      <PersonList {...personListProps}/>
    );
  }
}

Person.propTypes = {
  dispatch: PropTypes.func.isRequired,
  persons: PropTypes.array.isRequired
};

export default Person;