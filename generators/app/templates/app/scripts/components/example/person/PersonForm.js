import React, {Component, PropTypes} from 'react';
import callApi from '../../../fetch';

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    };
  }

  addPerson() {
    const {firstName, lastName} = this.state;
    const person = {
      firstName,
      lastName
    };

    const url = 'path/person/create';
    const options = {body: {person}};

    //这里没有走 action, 直接发送 fetch 请求,对于不需要维护状态的请求,我们也可以直接调用 fetch
    callApi({url, options}).then(
      ({json, response}) => {
        if (json && json.success) {
          this.context.router.goBack();
        }
      },
      (error) => {
        this.context.router.goBack();
      }
    );
  }

  handleChange(field, event) {
    const val = event.target.value;
    this.setState({
      [field]: val
    });
  }

  render() {
    const {firstName, lastName} = this.state;
    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-2 form-control-label">First Name</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" placeholder="First Name"
                   value={firstName} onChange={this.handleChange.bind(this, 'firstName')}/>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 form-control-label">Last Name</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" placeholder="Last Name"
                   value={lastName} onChange={this.handleChange.bind(this, 'lastName')}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-offset-2 col-sm-4">
            <button type="button" className="btn btn-secondary" onClick={() => this.addPerson()}>Save</button>
          </div>
        </div>
      </form>
    );
  }
}

PersonForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default PersonForm;
