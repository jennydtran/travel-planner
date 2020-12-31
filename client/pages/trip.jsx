import React from 'react';

export default class TripSummary extends React.Component {
  render() {
    return (
      <>
        <TopNav />
        <Summary />
        <ToDoReminder />
        <BottomNav />
      </>
    );
  }
}

function TopNav(props) {
  return (
    <nav className="nav navbar-light fixed-top align-items-center px-2">
      <div className="navbar-brand mx-auto">
        <svg className="icon" data-name="Livello 1" id="Livello_1" width="2rem" height="2rem" fill="000000" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <path d="M127.12,60.22,115.46,48.56h0L69,2.05a7,7,0,0,0-9.9,0L12.57,48.53h0L.88,60.22a3,3,0,0,0,4.24,4.24l6.57-6.57V121a7,7,0,0,0,7,7H46a7,7,0,0,0,7-7V81a1,1,0,0,1,1-1H74a1,1,0,0,1,1,1v40a7,7,0,0,0,7,7h27.34a7,7,0,0,0,7-7V57.92l6.54,6.54a3,3,0,0,0,4.24-4.24ZM110.34,121a1,1,0,0,1-1,1H82a1,1,0,0,1-1-1V81a7,7,0,0,0-7-7H54a7,7,0,0,0-7,7v40a1,1,0,0,1-1,1H18.69a1,1,0,0,1-1-1V51.9L63.29,6.29a1,1,0,0,1,1.41,0l45.63,45.63Z" />
        </svg>
      </div>
      <button className="bg-transparent p-0 nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="000000" className="icon bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </button>
    </nav>
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
