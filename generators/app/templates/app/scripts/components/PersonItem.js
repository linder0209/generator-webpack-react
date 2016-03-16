import React, {Component, PropTypes} from 'react';

class PersonItem extends Component {
  render() {
    const {person} = this.props;
    return (
      <tr>
        <th>{person.id}</th>
        <td>{person.name}</td>
      </tr>
    );
  }
}

PersonItem.propTypes = {
  person: PropTypes.object.isRequired
};

export default PersonItem;
