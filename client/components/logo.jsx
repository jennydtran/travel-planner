import React from 'react';
import logo from '../logo.png';

export default function Logo(props) {
  return (
    <div className="logo-outer-div w-100">
      <div className="logo-bg py-4 d-flex flex-column align-items-center justify-content-center">
        <div>
          <img src={logo} />
        </div>
        <h2 className="mt-2 text-white">Travel Planner</h2>
      </div>
    </div>
  );
}
