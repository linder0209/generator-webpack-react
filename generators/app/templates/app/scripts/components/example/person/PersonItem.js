import React, {Component, PropTypes} from 'react';
import assign from 'lodash/assign';

class PersonItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      person: this.props.person
    };

    this.personDefault = assign({}, this.props.person);
  }

  handleEdit() {
    this.setState({
      editing: true
    });
  }

  handleCancel() {
    this.setState({
      editing: false,
      person: this.personDefault
    });
  }

  handleSave() {
    const {personActions} = this.props;
    personActions.updatePerson(this.state.person);
    this.setState({
      editing: false
    }, () => {
      this.personDefault = this.state.person;
    });
  }

  handleDelete(id) {
    const {personActions} = this.props;
    personActions.deletePerson(id);
  }

  textOrInput(field, val) {
    const editing = this.state.editing;
    if (editing) {
      // 这里使用可控输入框组件
      return (
        <input type="text" value={val} onChange={this.handleChange.bind(this, field)}/>
      );
    }
    return (
      <span>{val}</span>
    );
  }

  handleChange(field, event) {
    const person = this.state.person;
    const val = event.target.value;
    person[field] = val;
    this.setState({
      person
    });
  }

  render() {
    const {editing, person} = this.state;
    const {id, firstName, lastName} = person;
    return (
      <tr>
        <th>{id}</th>
        <td>{this.textOrInput('firstName', firstName)}</td>
        <td>{this.textOrInput('lastName', lastName)}</td>
        <td>{firstName + lastName}</td>
        <td className="link-group">
          <a style={{display: !editing ? 'inline' : 'none'}}
             onClick={this.handleEdit.bind(this)}>编辑</a>
          <a style={{display: editing ? 'inline' : 'none'}}
             onClick={this.handleCancel.bind(this)}>取消</a>
          <a style={{display: editing ? 'inline' : 'none'}}
             onClick={this.handleSave.bind(this)}>保存</a>
          <a onClick={this.handleDelete.bind(this, person.id)}>删除</a>
        </td>
      </tr>
    );
  }
}

PersonItem.propTypes = {
  personActions: PropTypes.object,
  person: PropTypes.object.isRequired
};

export default PersonItem;
