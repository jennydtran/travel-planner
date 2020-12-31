import React from 'react';
import { ThreeDotNavIcon, BackLeftIcon, CameraIcon } from '../components/svg';

export default class TripSummary extends React.Component {
  render() {
    return (
      <>
        <TopNav />
        <Body />

      </>
    );
  }
}

function TopNav(props) {
  return (
    <nav className="nav navbar-light fixed-top align-items-center justify-content-between px-2">
      <div className="d-flex align-items-center">
        <a href="#">
          <button className="bg-transparent p-0 nav-link ">
            <BackLeftIcon />
          </button>
        </a>
        <div>
          <p className="h4 m-0 mx-2 text-muted">Big Bear</p>
        </div>
      </div>
      <button className="bg-transparent p-0 nav-item">
        <ThreeDotNavIcon />
      </button>
    </nav>
  );
}

function Body(props) {
  return (
    <main className="bg-gradient d-flex flex-column align-items-center pt-3">
      <div className="d-flex my-3">
        <CameraIcon />
        <h2 className="text-center text-white px-3">Snapshot</h2>
      </div>
      <Summary />
      <ToDoReminder />
      <BottomNav />
    </main>
  );
}

function Summary(props) {
  return (
    <div />
  );
}

function ToDoReminder(props) {
  return (
    <div />
  );
}

function BottomNav(props) {
  return (
    <div>
      <ul>
      </ul>
    </div>
  );
}
