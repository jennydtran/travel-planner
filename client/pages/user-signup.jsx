import React from 'react';
import Logo from '../components/logo';
import { CircleInactive, CircleActive, EyeClosed, EyeOpen } from '../components/svg';

export default class UserSignUp extends React.Component {
  render() {
    return (
      <>
        <Logo />
        <main className="fixed-bottom signup-in-container pb-4 pt-5 d-flex flex-column align-items-center justify-content-between">
          <div className="align-self-stretch d-flex justify-content-center">
            <ul className="list-unstyled d-flex mt-3">
              <li key="1"><CircleActive /></li>
              <li key="2" className="mx-1"><CircleInactive /></li>
              <li key="3"><CircleInactive /></li>
            </ul>
          </div>
          <div className="align-self-stretch">
            <form id="signup" className="px-3 d-flex flex-column">

              {/* <div className="form-group">
                <label className="dark-teal mb-3" htmlFor="username">Username</label>
                <input className="form-control form-control-lg mb-3" type="text" id="username" name="username" required />
              </div>
              <button className="w-100 rounded-lg align-self-center my-3 mt-5" type="submit" value="Submit">Next</button> */}

              <div className="form-group">
                <label className="dark-teal mb-3" htmlFor="password">Password</label>
                <div className="d-flex justify-content-end">
                  <input className="form-control form-control-lg mb-3" type="password" id="password" name="password" required />
                  <button className="nofilter p-0 bg-transparent position-absolute mt-2 mr-3">
                    <EyeClosed />
                    {/* <EyeOpen /> */}
                  </button>
                </div>
              </div>
              <button className="w-100 rounded-lg align-self-center my-3 mt-5" type="submit" value="Submit">Next</button>

            </form>

            {/* <div className="text-center dark-teal">
              <h5 className="dark-teal font-weight-bold mt-4">Thank you</h5>
              <p className="mt-3 mb-1">Account successfully created.</p>
              <p className="mt-2">Please sign in to start travel planning!</p>
              <button className="w-100 rounded-lg align-self-center my-3 mt-4" type="submit" value="Submit">Finish</button>
            </div> */}

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
