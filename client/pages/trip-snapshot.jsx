import React from 'react';
import * as Icons from '../components/svg';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import dateReformat from '../components/date-reformat';

export default class TripSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrip: null,
      tripTodoList: []
    };
  }

  componentDidMount() {
    if (!this.context.user) return null;
    this.getSingleTrip();
    this.getTodoList();
  }

  getSingleTrip() {
    fetch(`/api/trip/${this.props.tripId}`, {
      headers: {
        'X-Access-Token': this.context.token
      }
    })
      .then(response => response.json())
      .then(trip => {
        this.setState({ currentTrip: trip });
      });
  }

  getTodoList() {
    fetch(`/api/triptodo/${this.props.tripId}`, {
      headers: {
        'X-Access-Token': this.context.token
      }
    })
      .then(response => response.json())
      .then(todoList => {
        this.setState({ tripTodoList: todoList });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.context.user) {
      return <Redirect to="signin" />;
    }

    if (!this.state.currentTrip) return null;
    const { name } = this.state.currentTrip;
    const todoLength = this.state.tripTodoList.length;
    const signout = this.context.handleSignOut;
    return (
      <div className="pt-5">
        <TopNav signout={signout} name={name} tripId={this.state.currentTrip.tripId}/>
        <Body trip={this.state.currentTrip} numberOfItems={todoLength} itemsCompleted={this.state.currentTrip.itemsCompleted} />
      </div>
    );
  }
}
TripSummary.contextType = AppContext;

function TopNav(props) {
  return (
    <nav className="nav navbar-light fixed-top align-items-center justify-content-between px-2">
      <div className="d-flex align-items-center">
        <a href='#'>
          <button className="bg-transparent p-0 nav-link ">
            <Icons.BackLeftIcon />
          </button>
        </a>
        <div>
          <p className="h5 m-0 mx-2 mt-1 text-grey">{props.name}</p>
        </div>
      </div>
      <button className="bg-transparent p-0 nav-item" onClick={props.signout}>
        <Icons.SignOut />
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
      <ToDoReminder trip={props.trip} numberOfItems={props.numberOfItems} itemsCompleted={props.itemsCompleted} />
      <BottomNav trip={props.trip}/>
    </main>
  );
}

function Summary(props) {
  const depart = dateReformat(props.trip.departureDate).format1;
  const returnDate = dateReformat(props.trip.returnDate).format1;

  return (
    <div className="s-container d-flex flex-column rounded-lg bg-white border py-3 px-4 mb-3">
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
  const { numberOfItems } = props;
  let itemsCompleted = props.itemsCompleted;
  itemsCompleted = Number.parseInt(itemsCompleted, 10);
  return (
    <div className="s-container bg-white rounded-lg border my-3 py-3 px-4">
      <div className="row justify-content-between w-100 m-0">
        <div className="col-9 p-0">
          <p className="font-weight-bold mb-2">Before leaving on your trip:</p>
          {numberOfItems === 0
            ? <>
              <p className="small light-teal mb-1">Looks like you don&#39;t have a checklist.</p>
              <p className="small light-teal m-0">Click on the icon to start prepping for your trip!</p>
            </>
            : itemsCompleted === numberOfItems
              ? <>
                <p className="small yellow mt-3">{itemsCompleted} out of {numberOfItems} completed! </p>
                <p className="small m-0">Preparations completed!</p>
              </>
              : <>
                <p className="small yellow mt-3">{itemsCompleted} out of {numberOfItems} completed! </p>
                <p className="small m-0">Continue prepping for your trip!</p>
              </>
          }
        </div>
        <div className="col-2 d-flex justify-content-end align-items-center p-0">
          <a href={`#triptodo?tripId=${props.trip.tripId}`}>
            <button className="bg-white rounded-lg p-2">
              <Icons.ChecklistIcon />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

function BottomNav(props) {
  return (
    <div className="row snapshot-icons my-3 justifty-content-center">
      <div className="col-4 d-flex flex-column align-items-center mb-2">
        <a href={`#travelers?tripId=${props.trip.tripId}`}><button className="bg-white rounded-lg p-3">
          <Icons.TravelerIcon />
        </button></a>
        <p className="mt-2 small">Travelers</p>
      </div>
      <div className="col-4 d-flex flex-column align-items-center mb-2">
        <button className="deactivate bg-white rounded-lg p-3" disabled>
          <Icons.AirplaneIcon />
        </button>
        <p className="deactivate mt-2 small d-flex flex-column align-items-center">Transportation</p>
      </div>
      <div className="col-4 d-flex flex-column align-items-center mb-2">
        <button className="deactivate bg-white rounded-lg p-3" disabled>
          <Icons.AccommodationIcon />
        </button>
        <p className="deactivate mt-2 small">Accommodation</p>
      </div>
      <div className="col-4 d-flex flex-column align-items-center mb-2">
        <button className="deactivate bg-white rounded-lg p-3" disabled>
          <Icons.ActivitiesIcon />
        </button>
        <p className="deactivate mt-2 small">Activities</p>
      </div>
      <div className="col-4 d-flex flex-column align-items-center mb-2">
        <button className="deactivate bg-white rounded-lg p-3" disabled>
          <Icons.MapIcon />
        </button>
        <p className="deactivate mt-2 small">Places</p>
      </div>
      <div className="col-4 d-flex flex-column align-items-center mb-2">
        <button className="deactivate bg-white rounded-lg p-3" disabled>
          <Icons.PackingIcon />
        </button>
        <p className="deactivate mt-2 small">Packing List</p>
      </div>
    </div>
  );
}
