import React from 'react';
import { BackLeftIcon, SignOut, ChevronUp } from './svg';

export function TopNav(props) {
  return (
    <nav className="nav navbar-light fixed-top align-items-center justify-content-between px-2">
      <div className="d-flex align-items-center">
        <a href={`#tripsnapshot?tripId=${props.tripId}`}>
          <button className="bg-transparent p-0 nav-link ">
            <BackLeftIcon />
          </button>
        </a>
        <div>
          <p className="h5 m-0 mx-2 mt-1 text-grey">{props.name}</p>
        </div>
      </div>
      <button className="bg-transparent p-0 nav-item" onClick={props.signout}>
        <SignOut />
      </button>
    </nav>
  );
}

export function Footer(props) {
  return (
    <footer className="d-none container-xl footer fixed-bottom bg-light d-flex justify-content-center align-items-center w-100">
      <div className="d-flex text-center">
        <button className="icon bg-transparent p-1">
          <ChevronUp />
        </button>
      </div>
    </footer>
  );
}
