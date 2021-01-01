import React from 'react';
import { ThreeDotNavIcon, BackLeftIcon, CameraIcon, ChecklistIcon, TravelerIcon, AirplaneIcon, MapIcon, ActivitiesIcon, PackingIcon, AccommodationIcon} from '../components/svg';

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
          <p className="h5 m-0 mx-2 mt-1 text-grey">Big Bear</p>
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
    <main className="bg-gradient d-flex flex-column align-items-center px-4 pt-3">
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
    <div className="d-flex flex-column rounded-lg bg-white w-100 border p-4">
      <div className="d-flex">
        <div className="flex-fill"><p className="font-weight-bold">Destination</p></div>
        <div className="flex-fill"><p className="light-teal">Big Bear, CA</p></div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="flex-fill"><p className="font-weight-bold">Departure Date</p></div>
        <div className="flex-fill"><p className="light-teal">01/01/1001</p></div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="flex-fill"><p className="font-weight-bold">Return Date</p></div>
        <div className="flex-fill"><p className="light-teal">01/01/1001</p></div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="flex-fill"><p className="font-weight-bold">Number of Days</p></div>
        <div className="flex-fill"><p className="light-teal">5 days</p></div>
      </div>
    </div>
  );
}

function ToDoReminder(props) {
  return (
    <div className="bg-white rounded-lg w-100 border p-4">
      <p className="font-weight-bold">Before leaving on your trip:</p>
      <div className="d-flex">
        <div className="small light-teal">
          <p>Looks like you don't have a checklist.</p>
          <p>Click on the icon to start prepping<br />for your trip!</p>
        </div>
        <div>
          <button className="bg-white rounded-lg p-2">
            <ChecklistIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav(props) {
  return (
    <div className="d-flex flex-wrap">
      <div >
        <button className="bg-white rounded-lg p-3">
          <TravelerIcon />
        </button>
        <p className="small">Travelers</p>
      </div>
      <div >
        <button className="bg-white rounded-lg p-3">
          <AirplaneIcon />
        </button>
        <p className="small">Transportation</p>
      </div>
      <div >
        <button className="bg-white rounded-lg p-3">
          <AccommodationIcon />
        </button>
        <p className="small">Accommodation</p>
      </div>
      <div >
        <button className="bg-white rounded-lg p-3">
          <ActivitiesIcon />
        </button>
        <p className="small">Activities</p>
      </div>
      <div >
        <button className="bg-white rounded-lg p-3">
          <MapIcon />
        </button>
        <p className="small">Places</p>
      </div>
      <div >
        <button className="bg-white rounded-lg p-3">
          <PackingIcon />
        </button>
        <p className="small">Packing List</p>
      </div>
    </div>
  );
}
