import React, {Component, PropTypes} from 'react';
import PersonItem from './PersonItem';
import * as Actions from '../actions';

class PersonList extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(Actions.loadPerson());
  }

  render() {
    const {persons} = this.props;
    return (
      <table className="table">
        <thead className="thead-inverse">
        <tr>
          <th>#</th>
          <th>姓名</th>
        </tr>
        </thead>
        <tbody>
        {
          persons.map((person, index) => {
            return (
              <PersonItem key={index} person={person}/>
            );
          })
        }
        </tbody>
      </table>
    );
  }
}

PersonList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  persons: PropTypes.array.isRequired
};

export default PersonList;
