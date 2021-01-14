import React from 'react';

export default class InputUsername extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }

  validateUsername(inputvalue) {
    const regexAlphaNumDash = /[^a-zA-Z0-9_]/;
    const regexFour = /^(?=.{4,})/;

    if (inputvalue === '') {
      this.props.handleUsername(inputvalue, 'A username is required.');
    } else if (regexFour.test(inputvalue) === false) {
      this.props.handleUsername(inputvalue, 'Your username must be at least 4 characters long.');
    } else if (regexAlphaNumDash.test(inputvalue) === true) {
      this.props.handleUsername(inputvalue, 'Your username can only contain letters, numbers, and underscore.');
    } else {
      this.props.handleUsername(inputvalue, '');
    }
  }

  handleChange(event) {
    this.validateUsername(event.target.value);
  }

  render() {
    return (
      <>
        <div className="form-group">
          <label className="dark-teal mb-3" htmlFor="username">Username</label>
          <input className="form-control form-control-lg mb-2" type="text" id="username" name="username" value={this.props.username} onChange={this.handleChange} autoFocus required />
          <p className="text-center text-danger small">{this.props.error}</p>
        </div>
        <button className="w-100 rounded-lg align-self-center my-3 mt-5" onClick={this.props.clickNext}>Next</button>
      </>
    );
  }
}
