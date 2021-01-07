import React from 'react';
import Logo from '../components/logo';
import { CircleInactive, CircleActive, EyeClosed, EyeOpen } from '../components/svg';

export default class UserSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      currentView: 'usernameInput',
      usernameError: '',
      passwordError: ''
    };
    this.clickNext = this.clickNext.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(value, error) {
    this.setState(state => ({
      username: value,
      usernameError: error
    }));
  }

  handlePassword(value) {
    this.setState(state => ({
      password: value
    }));
  }

  clickNext(e) {
    if (this.state.username === '' || this.state.usernameError !== '') {
      e.preventDefault();
      return;
    }
    this.setState({ currentView: 'passwordInput' });
  }

  render() {
    const { username, password, currentView, passwordError, usernameError } = this.state;
    return (
      <>
        <Logo />
        <main className="fixed-bottom signup-in-container pb-4 pt-5 d-flex flex-column align-items-center justify-content-between">
          <div className="align-self-stretch d-flex justify-content-center">
            <Indicators currentView={currentView}/>
          </div>
          <div className="align-self-stretch">
            <form id="signup" className="px-3 d-flex flex-column">
            {currentView === 'usernameInput'
              ? <InputUsername username={username} error={usernameError} handleUsername={this.handleUsername} clickNext={this.clickNext}/>
              : currentView === 'passwordInput'
                ? <InputPassword password={password} error={passwordError} handlePassword={this.handlePassword}/>
                : <FinishedMessage />
            }
            </form>
          </div>
          <div className="text-center align-self-stretch">
            <p className="light-teal mb-1">Do you have an account?</p>
            <a href="" className="signin-up">Sign In</a>
          </div>
        </main>
      </>
    );
  }
}

class InputUsername extends React.Component {
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
          <input className="form-control form-control-lg mb-2" type="text" id="username" name="username" value={this.props.username} onChange={this.handleChange} required />
          <p className="text-center text-danger small">{this.props.error}</p>
        </div>
        <button className="w-100 rounded-lg align-self-center my-3 mt-5" onClick={this.props.clickNext}>Next</button>
      </>
    );
  }
}

class InputPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      errorMessage: '',
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

  validatePassword(event) {
    const regexLowercase = /^(?=.*[a-z])/;
    const regexUppercase = /^(?=.*[A-Z])/;
    const regexNumber = /^(?=.*[0-9])/;
    const regexSpecial = /^(?=.*[!@#$%^&*()])/;
    const regexEight = /^(?=.{8,})/;

    if (event === '') {
      this.setState(state => ({
        errorMessage: 'A password is required.'
      }));
    } else if (regexEight.test(event) === false) {
      this.setState(state => ({
        errorMessage: 'Your password must be at least 8 characters long.'
      }));
    } else if (regexSpecial.test(event) === false) {
      this.setState(state => ({
        errorMessage: 'Your password must contain at least one special character.'
      }));
    } else if (regexNumber.test(event) === false) {
      this.setState(state => ({
        errorMessage: 'Your password must contain at least one number.'
      }));
    } else if (regexUppercase.test(event) === false) {
      this.setState(state => ({
        errorMessage: 'Your password must contain at least one uppercase letter.'
      }));
    } else if (regexLowercase.test(event) === false) {
      this.setState(state => ({
        errorMessage: 'Your password must contain at least one lowercase letter.'
      }));
    } else {
      this.setState(state => ({
        errorMessage: ''
      }));
    }
    this.props.handlePassword(this.state.password);
  }

  handleChange(event) {
    this.setState(state => ({
      password: event.target.value
    }));
    this.validatePassword(event.target.value);
  }

  render() {
    return (
      <>
        <div className="form-group">
          <label className="dark-teal mb-3" htmlFor="password">Password</label>
          <div className="d-flex justify-content-end">
            <input className="form-control form-control-lg mb-2" type={this.state.type} id="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <button className="nofilter p-0 bg-transparent position-absolute mt-2 mr-3" onClick={this.passwordToggle}>
              {!this.state.hidden ? <EyeOpen /> : <EyeClosed /> }
            </button>
          </div>
          <p className="text-center text-danger small">{this.props.error}</p>
        </div>
        <button className="w-100 rounded-lg align-self-center my-3 mt-5" type="submit" value="Submit">Create Account</button>
      </>
    );
  }
}

function Indicators(props) {
  return (
    <ul className="list-unstyled d-flex mt-3">
      <li>{props.currentView === 'usernameInput' ? <CircleActive /> : <CircleInactive />}</li>
      <li className="mx-1">{props.currentView === 'passwordInput' ? <CircleActive /> : <CircleInactive />}</li>
      <li>{props.currentView === 'finished' ? <CircleActive /> : <CircleInactive />}</li>
    </ul>
  );
}

function FinishedMessage(props) {
  return (
    <div className="text-center dark-teal">
      <h5 className="dark-teal font-weight-bold mt-4">Thank you</h5>
      <p className="mt-3 mb-1">Account successfully created.</p>
      <p className="mt-2">Please sign in to start travel planning!</p>
      <button className="w-100 rounded-lg align-self-center my-3 mt-4" type="button" href="#">Finish</button>
    </div>
  );
}
