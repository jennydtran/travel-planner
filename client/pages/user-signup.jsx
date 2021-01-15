import React from 'react';
import Logo from '../components/logo';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import InputUsername from '../components/validation-username';
import InputPassword from '../components/validation-password';
import { CircleInactive, CircleActive } from '../components/svg';

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
    this.createAccount = this.createAccount.bind(this);
  }

  handleUsername(value, error) {
    this.setState(state => ({
      username: value,
      usernameError: error
    }));
  }

  handlePassword(value, error) {
    this.setState(state => ({
      password: value,
      passwordError: error
    }));
  }

  clickNext(event) {
    if (this.state.username === '' || this.state.usernameError !== '') {
      event.preventDefault();
      this.setState({ usernameError: 'A username is required.' });
      return;
    }
    this.setState({ currentView: 'passwordInput' });
  }

  createAccount(event) {
    if (this.state.password === '' || this.state.passwordError !== '') {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const user = { username: this.state.username, password: this.state.password };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };
    fetch('/api/auth/sign-up', req)
      .then(response => response.json())
      .then(() => {
        this.setState({
          username: '',
          password: '',
          currentView: 'finished'
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.context.user) return <Redirect to="home" />;

    const { username, password, currentView, passwordError, usernameError } = this.state;
    return (
      <>
        <Logo />
        <div className="d-flex justify-content-center">
          <Indicators currentView={currentView} />
        </div>
        <main className="signup-in-container pb-4 pt-2 d-flex flex-column align-items-center justify-content-around">
          <div className="d-flex justify-content-center align-self-stretch">
            <form id="signup" className="px-3 d-flex flex-column" onSubmit={this.createAccount}>
            {currentView === 'usernameInput'
              ? <InputUsername username={username} error={usernameError} handleUsername={this.handleUsername} clickNext={this.clickNext}/>
              : currentView === 'passwordInput'
                ? <InputPassword password={password} error={passwordError} handlePassword={this.handlePassword} />
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
      <a href="#signin"><button className="w-100 rounded-lg align-self-center my-3 mt-4" type="button">Finish</button></a>
    </div>
  );
}

UserSignUp.contextType = AppContext;
