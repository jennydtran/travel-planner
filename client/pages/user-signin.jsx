import React from 'react';
import Logo from '../components/logo';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class UserSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'lovetotravel_demo',
      password: 'password1'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          this.context.handleSignIn(result);
        }
      });
  }

  render() {
    if (this.context.user) return <Redirect to="" />;

    return (
      <>
          <Logo />
          <main className="signup-in-container pb-4 pt-2 d-flex flex-column align-items-center justify-content-between">
            <div className="d-flex justify-content-center align-self-stretch pt-3">
            <form id="signin" className="align-self-center px-3 d-flex flex-column" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="dark-teal mb-3" htmlFor="username">Username</label>
                  <input className="form-control form-control-lg mb-1" type="text" id="username" name="username" defaultValue="lovetotravel_demo" onChange={this.handleChange} required disabled/>
                </div>
                <div className="form-group">
                  <label className="dark-teal mb-3" htmlFor="password">Password</label>
                <input className="form-control form-control-lg mb-1" type="password" id="password" name="password" defaultValue="password1" onChange={this.handleChange} required disabled/>
                </div>
                <button className="w-100 rounded-lg align-self-center mb-3 mt-5">Login</button>
              </form>
            </div>
            <div className="text-center align-self-stretch">
              <p className="light-teal mb-1">Don&#39;t have an account?</p>
              <a href="#signup" className="signin-up">Sign Up</a>
            </div>
          </main>
        </>
    );
  }
}

UserSignIn.contextType = AppContext;
