import React from 'react';
import * as Icons from '../components/svg';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import TripModal from '../components/form-addtrip';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      tripEntries: []
    };
    this.setState = this.setState.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }

  componentDidMount() {
    if (!this.context.user) return null;
    this.getAllTrips();
  }

  getAllTrips() {
    fetch('/api/trip', {
      headers: {
        'X-Access-Token': this.context.token
      }
    })
      .then(response => response.json())
      .then(trips => this.setState(state => ({
        tripEntries: trips
      }))
      );
  }

  handleClickAdd() {
    this.setState({
      modalView: true
    });
  }

  render() {
    if (!this.context.user) {
      return <Redirect to="signin" />;
    }

    const username = this.context.user.username;
    const { modalView, tripEntries } = this.state;
    const { handleClickAdd } = this;
    const signout = this.context.handleSignOut;
    return (
      <div className="py-5">
        <TopNav signout={signout}/>
        <HomeBody username={username} tripEntries={tripEntries} homeState={this.setState}/>
        <BottomNav onClick={handleClickAdd}/>
        { modalView &&
          <TripModal view={modalView} tripEntries={tripEntries} homeState={this.setState}/>
        }
      </div>
    );
  }
}

function TopNav(props) {
  return (
    <nav className="nav navbar-light fixed-top align-items-center px-2">
      <div className="navbar-brand mx-auto">
        <Icons.HomeIcon />
      </div>
      <button className="bg-transparent p-0 nav-item" onClick={props.signout}>
        <Icons.SignOut />
      </button>
    </nav>
  );
}

function HomeBody(props) {
  return (
    <main className="d-flex flex-column pt-3v">
      <div>
        <p className="h6 m-0 mt-3">Hello, <strong>{props.username}</strong></p>
        <p className="m-0 p-0 mt-2 small text-muted"><span>What are we planning today?</span></p>
        <hr className="dmx-2 my-4 d-block border-0" />
      </div>

      {props.tripEntries.length !== 0
        ? <div className="">
            <h1 className="text-center light-teal">Your Trips</h1>
            <TripEntries tripEntries={props.tripEntries}/>
          </div>
        : <>
            <div className="light-teal text-center d-flex justify-content-center align-items-center h-75">
              <h3>Looks like you don&#39;t<br />
              have any trips planned!</h3>
            </div>
            <div className="light-teal text-center">
              <p>Let&#39;s start planning!<br />
              Click the <strong>ADD</strong> button to add a trip.</p>
            </div>
          </>
      }
    </main>
  );
}

function TripEntries(props) {
  return (
    <ul className="home-list list-unstyled my-4">
      {
        props.tripEntries.map(trip => {
          return (
            <TripEntry
              key={trip.tripId}
              tripId={trip.tripId}
              name={trip.name}
              date={trip.departureDate}
              />
          );
        })
      }
    </ul>
  );
}

function TripEntry(props) {
  const { name, date, tripId } = props;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateConvert = new Date(date);
  dateConvert.setDate(dateConvert.getDate() + 1);
  let month = dateConvert.getMonth();
  month = monthNames[month];
  const year = dateConvert.getFullYear();

  return (
    <li className="flex-item">
      <div className="trip-entry d-flex border rounded-lg shadow-sm py-4 px-4 mb-2">
        <a href={`#tripsnapshot?tripId=${tripId}`} className="d-flex align-items-center">
          <div className="shadow-sm rounded-lg p-2 border">
            <Icons.TripEditIcon />
          </div>
        </a>
        <div className="d-flex flex-column justify-content-center flex-grow-1">
          <h4 className="ml-4 m-0">{name}</h4>
          <p className="text-muted small pt-1 ml-4 m-0">{`${month} ${year}`}</p>
        </div>
        <div className="d-flex align-items-center">
          <button className="hidden bg-transparent p-0">
            <Icons.DashDeleteIcon />
          </button>
        </div>
      </div>
    </li>
  );
}

function BottomNav(props) {
  return (
    <footer className="container-xl footer d-flex justify-content-center align-items-center fixed-bottom px-1 w-100">
      <div className="d-flex text-center">
        <button className="icon bg-white rounded-circle p-1" onClick={props.onClick}>
          <Icons.PlusIcon />
        </button>
      </div>
    </footer>
  );
}

Home.contextType = AppContext;
