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
    this.handleChange = this.handleChange.bind(this);
    this.clickNext = this.clickNext.bind(this);
    this.handleUsernameError = this.handleUsernameError.bind(this);
    this.handlePasswordError = this.handlePasswordError.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
  }

  handleUsernameError(error) {
    console.log(error);
  }

  handlePasswordError(error) {
    console.log(error);
  }

  clickNext() {
    if (this.state.username === '') {
      return;
    }
    this.setState({ currentView: 'passwordInput' });
  }

  render() {
    const { username, password, currentView, usernameError, passwordError } = this.state;
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
              ? <InputUsername username={username} error={usernameError} handleError={this.handleUsernameError} onChange={this.handleChange} onClick={this.clickNext}/>
              : currentView === 'passwordInput'
                ? <InputPassword pw={password} error={passwordError} handleError={this.handlePasswordError} onChange={this.handleChange}/>
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

class InputUsername extends React.Component {

  
  render() {
    return (
      <>
        <div className="form-group">
          <label className="dark-teal mb-3" htmlFor="username">Username</label>
          <input className="form-control form-control-lg mb-2" type="text" id="username" name="username" value={this.props.username} onChange={this.props.onChange} required />
          <p className="text-center text-danger small">{this.props.error}</p>
        </div>
        <button className="w-100 rounded-lg align-self-center my-3 mt-5" onClick={this.props.onClick}>Next</button>
      </>
    );
  }
}

class InputPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
      hidden: false
    };
    this.passwordToggle = this.passwordToggle.bind(this);
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

  render() {
    const { pw } = this.props.pw;
    return (
      <>
        <div className="form-group">
          <label className="dark-teal mb-3" htmlFor="password">Password</label>
          <div className="d-flex justify-content-end">
            <input className="form-control form-control-lg mb-2" type={this.state.type} id="password" name="password" value={pw} onChange={this.props.onChange} required />
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
