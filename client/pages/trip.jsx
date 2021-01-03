import React from 'react';
import * as Icons from '../components/svg';
import dateReformat from '../components/date-reformat';

export default class TripSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrip: null
    };
  }

  componentDidMount() {
    fetch(`/api/trip/${this.props.tripId}`)
      .then(response => response.json())
      .then(trips => this.setState({
        currentTrip: trips
      }));
  }

  render() {
    if (!this.state.currentTrip) return null;
    const { name } = this.state.currentTrip;
    return (
      <>
        <TopNav name={name}/>
        <Body trip={this.state.currentTrip}/>
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
            <Icons.BackLeftIcon />
          </button>
        </a>
        <div>
          <p className="h5 m-0 mx-2 mt-1 text-grey">{props.name}</p>
        </div>
      </div>
      <button className="bg-transparent p-0 nav-item">
        <Icons.ThreeDotNavIcon />
      </button>
    </nav>
  );
}

function Body(props) {
  return (
    <main className="bg-gradient d-flex flex-column align-items-center px-4 pt-3">
      <div className="d-flex my-3">
        <Icons.CameraIcon />
        <h2 className="text-center text-white px-3 m-0">Snapshot</h2>
      </div>
      <Summary trip={props.trip}/>
      <ToDoReminder />
      <BottomNav />
    </main>
  );
}

function Summary(props) {
  const depart = dateReformat(props.trip.departureDate);
  const returnDate = dateReformat(props.trip.returnDate);

  return (
    <div className="d-flex flex-column rounded-lg bg-white w-100 border py-3 px-4">
      <div className="row row-cols-2">
        <div className="col"><p className="font-weight-bold mb-2">Destination</p></div>
        <div className="col"><p className="light-teal mb-2">{props.trip.destination}</p></div>
      </div>
      <div className="row">
        <div className="col"><p className="font-weight-bold mb-2">Departure Date</p></div>
        <div className="col"><p className="light-teal mb-2">{depart}</p></div>
      </div>
      <div className="row">
        <div className="col"><p className="font-weight-bold mb-2">Return Date</p></div>
        <div className="col"><p className="light-teal mb-2">{returnDate}</p></div>
      </div>
      <div className="row">
        <div className="col"><p className="font-weight-bold mb-2">Trip Duration</p></div>
        <div className="col"><p className="light-teal mb-2">{props.trip.numberOfDays + ' days'}</p></div>
      </div>
    </div>
  );
}

function ToDoReminder(props) {
  return (
    <div className="bg-white rounded-lg w-100 border mt-3 py-3 px-4">
      <div className="row justify-content-between w-100 m-0">
        <div className="col-9 p-0">
        <p className="font-weight-bold mb-2">Before leaving on your trip:</p>
        { /* Conditional here. Implement in next feature. */
          <>
            <p className="small light-teal mb-1">Looks like you don&#39;t have a checklist.</p>
            <p className="small light-teal m-0">Click on the icon to start prepping for your trip!</p>
          </>
        }
        </div>
        <div className="col-2 d-flex justify-content-end align-items-center p-0">
          <button className="bg-white rounded-lg p-2">
            <Icons.ChecklistIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav(props) {
  return (
    <div className="row rol-cols-3 mt-3">
      <div className="col d-flex flex-column align-items-center">
        <button className="bg-white rounded-lg p-3">
          <Icons.TravelerIcon />
        </button>
        <p className="mt-1 small">Travelers</p>
      </div>
      <div className="col d-flex flex-column align-items-center">
        <button className="bg-white rounded-lg p-3">
          <Icons.AirplaneIcon />
        </button>
        <p className="mt-1 small d-flex flex-column align-items-center">Transportation</p>
      </div>
      <div className="col d-flex flex-column align-items-center">
        <button className="bg-white rounded-lg p-3">
          <Icons.AccommodationIcon />
        </button>
        <p className="mt-1 small">Accommodation</p>
      </div>
      <div className="col d-flex flex-column align-items-center">
        <button className="bg-white rounded-lg p-3">
          <Icons.ActivitiesIcon />
        </button>
        <p className="mt-1 small">Activities</p>
      </div>
      <div className="col d-flex flex-column align-items-center">
        <button className="bg-white rounded-lg p-3">
          <Icons.MapIcon />
        </button>
        <p className="mt-1 small">Places</p>
      </div>
      <div className="col d-flex flex-column align-items-center">
        <button className="bg-white rounded-lg p-3">
          <Icons.PackingIcon />
        </button>
        <p className="mt-1 small">Packing List</p>
      </div>
    </div>
  );
}
