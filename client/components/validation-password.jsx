import React from 'react';
import { EyeClosed, EyeOpen } from './svg';

export default class InputPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
      hidden: false
    };
    this.passwordToggle = this.passwordToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  passwordToggle(e) {
    e.preventDefault();
    const hidden = this.state.hidden;
    const type = hidden ? 'password' : 'text';
    this.setState({
      type: type,
      hidden: !hidden
    });
  }

  validatePassword(inputvalue) {
    const regexLowercase = /^(?=.*[a-z])/;
    const regexUppercase = /^(?=.*[A-Z])/;
    const regexNumber = /^(?=.*[0-9])/;
    const regexSpecial = /^(?=.*[!@#$%^&*()])/;
    const regexEight = /^(?=.{8,})/;

    if (inputvalue === '') {
      this.props.handlePassword(inputvalue, 'A password is required.');
    } else if (regexEight.test(inputvalue) === false) {
      this.props.handlePassword(inputvalue, 'Your password must be at least 8 characters long.');
    } else if (regexSpecial.test(inputvalue) === false) {
      this.props.handlePassword(inputvalue, 'Your password must contain at least one special character.');
    } else if (regexNumber.test(inputvalue) === false) {
      this.props.handlePassword(inputvalue, 'Your password must contain at least one number.');
    } else if (regexUppercase.test(inputvalue) === false) {
      this.props.handlePassword(inputvalue, 'Your password must contain at least one uppercase letter.');
    } else if (regexLowercase.test(inputvalue) === false) {
      this.props.handlePassword(inputvalue, 'Your password must contain at least one lowercase letter.');
    } else {
      this.props.handlePassword(inputvalue, '');
    }
  }

  handleChange(event) {
    this.validatePassword(event.target.value);
  }

  render() {
    return (
      <>
        <div className="form-group">
          <label className="dark-teal mb-3" htmlFor="password">Password</label>
          <div className="d-flex justify-content-end">
            <input className="form-control form-control-lg mb-2" type={this.state.type} id="password" name="password" value={this.props.password} onChange={this.handleChange} required />
            <button className="nofilter p-0 bg-transparent position-absolute mt-2 mr-3" onClick={this.passwordToggle}>
              {!this.state.hidden ? <EyeOpen /> : <EyeClosed />}
            </button>
          </div>
          <p className="text-center text-danger small">{this.props.error}</p>
        </div>
        <button className="w-100 rounded-lg align-self-center my-3 mt-5" type="submit" value="Submit">Create Account</button>
      </>
    );
  }
}
