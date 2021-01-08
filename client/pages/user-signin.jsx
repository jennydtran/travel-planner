import React from 'react';
import Logo from '../components/logo';

export default class UserSignIn extends React.Component {
  render() {
    return (
        <>
          <Logo />
          <main className="fixed-bottom signup-in-container pb-4 pt-5 d-flex flex-column align-items-center justify-content-between">
            <div className="align-self-stretch pt-3">
              <form id="signin" className="px-3 d-flex flex-column" >
                <div className="form-group">
                  <label className="dark-teal mb-3" htmlFor="username">Username</label>
                  <input className="form-control form-control-lg mb-1" type="text" id="username" name="username" value="username" required />
                </div>
                <div className="form-group">
                  <label className="dark-teal mb-3" htmlFor="password">Password</label>
                  <input className="form-control form-control-lg mb-1" type="password" id="password" name="password" value="password" required />
                </div>
                <button className="w-100 rounded-lg align-self-center mb-3 mt-2">Login</button>
              </form>
            </div>
            <div className="text-center align-self-stretch">
              <p className="light-teal mb-1">Don&#39;t have an account?</p>
              <a href="" className="signin-up">Sign Up</a>
            </div>
          </main>
        </>
    );
  }
}
