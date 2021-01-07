import React from 'react';
import Logo from '../components/logo';
import { CircleFilled } from '../components/svg';

export default class UserSignUp extends React.Component {
  render() {
    return (
      <>
        <Logo />
        <main className="fixed-bottom signup-in-container px-4 d-flex flex-column align-items-center">
          <div>
            <ul className="list-unstyled d-flex">
              <li><CircleFilled /></li>
              <li><CircleFilled /></li>
              <li><CircleFilled /></li>
            </ul>
          </div>
          <div>

          </div>
          <div className="text-center">
            <p>Do you have an account?</p>
            <a><p>Sign In</p></a>
          </div>
        </main>
      </>
    );
  }
}
