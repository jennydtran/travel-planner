import React from 'react';
import { HomeIcon, ThreeDotNavIcon, TripEditIcon, DashDeleteIcon, PlusIcon } from '../components/svg';

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
    this.getAllTrips();
  }

  getAllTrips() {
    fetch('/api/trip')
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
    const { modalView, tripEntries } = this.state;
    const { handleClickAdd } = this;
    return (
      <>
        <TopNav />
        <HomeBody tripEntries={tripEntries}/>
        <BottomNav onClick={handleClickAdd}/>
        { modalView &&
          <TripModal view={modalView} tripEntries={tripEntries} homeState={this.setState}/>
        }
      </>
    );
  }
}

function TopNav(props) {
  return (
    <nav className="nav navbar-light fixed-top align-items-center px-2">
      <div className="navbar-brand mx-auto">
        <HomeIcon />
      </div>
      <button className="bg-transparent p-0 nav-item">
        <ThreeDotNavIcon />
      </button>
    </nav>
  );
}

function HomeBody(props) {
  return (
    <main className="d-flex flex-column pt-3">
      <div>
        <p className="h6 m-0 mt-3">Hello, <strong>username</strong></p>
        <p className="m-0 p-0 mt-2 small text-muted"><span>What are we planning today?</span></p>
        <hr className="dmx-2 my-4 d-block border-0" />
      </div>

      {props.tripEntries.length !== 0
        ? <div className="container-sm">
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
    <ul className="list-unstyled my-4">
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

function TripEntry(trip) {
  const { name, date, tripId } = trip;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateConvert = new Date(date);
  dateConvert.setDate(dateConvert.getDate() + 1);
  let month = dateConvert.getMonth();
  month = monthNames[month];
  const year = dateConvert.getFullYear();

  return (
    <li>
      <div className="trip-entry d-flex border rounded-lg shadow-sm py-4 px-4 mb-2">
        <a href={`#trips?tripId=${tripId}`} className="d-flex align-items-center">
          <div className="shadow-sm rounded-lg p-2 border">
            <TripEditIcon />
          </div>
        </a>
        <div className="d-flex flex-column justify-content-center flex-grow-1">
          <h4 className="ml-4 m-0">{name}</h4>
          <p className="text-muted small pt-1 ml-4 m-0">{`${month} ${year}`}</p>
        </div>
        <div className="d-flex align-items-center">
          <button className="bg-transparent p-0">
            <DashDeleteIcon />
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
          <PlusIcon />
        </button>
      </div>
    </footer>
  );
}

class TripModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: '',
      tripDestination: '',
      departureDate: '',
      returnDate: '',
      numberOfNights: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickOff = this.handleClickOff.bind(this);
    this.calculateNights = this.calculateNights.bind(this);
  }

  calculateNights() {
    const date1 = Date.parse(this.state.departureDate);
    const date2 = Date.parse(this.state.returnDate);
    const timeDiff = date2 - date1;
    const nights = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    this.setState(state => ({
      numberOfNights: nights
    }));
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    }, this.calculateNights);
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/trip', req)
      .then(response => response.json())
      .then(newTrip => {
        const newTripEntriesArray = this.props.tripEntries.concat(newTrip);
        this.props.homeState({ tripEntries: newTripEntriesArray });
        event.target.reset();
      })
      .catch(err => console.error(err));

    this.props.homeState({
      modalView: false
    });
  }

  handleClickOff(e) {
    this.props.homeState({
      modalView: false
    });
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    const today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate() + 1;
    const year = today.getFullYear();
    if (month < 10) {
      month = '0' + month.toString();
    }
    if (day < 10) {
      day = '0' + day.toString();
    }
    const maxDate = `${year}-${month}-${day}`;

    let returnMaxDate;
    let disabled;
    if (!this.state.departureDate) {
      returnMaxDate = maxDate;
      disabled = true;
    } else {
      returnMaxDate = this.state.departureDate;
      disabled = false;
    }

    if (!this.props.view) {
      return null;
    } else {
      return (
        <div className="overlay d-flex justify-content-center align-items-center position-fixed w-100 h-100" onClick={this.handleClickOff}>
          <div className="d-flex flex-column justify-content-center w-75 bg-white rounded-lg py-4 px-4" onClick={this.stopPropagation}>
            <h2 className="text-center my-3">Add a trip</h2>
            <form id="tripForm" className="d-flex flex-column" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="tripName">Name of trip</label>
                <input className="form-control" type="text" id="tripName" name="tripName" onChange={this.handleChange} value={this.state.tripName} required />
              </div>
              <div className="form-group">
                <label htmlFor="tripDestination">Destination</label>
                <input className="form-control" type="text" id="tripDestination" name="tripDestination" onChange={this.handleChange} value={this.state.tripDestination} required />
              </div>
              <div className="form-group">
                <label htmlFor="depatureDate">Depature Date</label>
                <input className="form-control" type="date" id="departureDate" name="departureDate" min={maxDate} onChange={this.handleChange} value={this.state.departureDate} required />
              </div>
              <div className="form-group">
                <label htmlFor="returnDate">Return Date</label>
                <input className="form-control" disabled={disabled} type="date" id="returnDate" name="returnDate" min={returnMaxDate} onChange={this.handleChange} value={this.state.returnDate} required />
              </div>
              <button className="rounded-lg align-self-center my-3" type="submit" value="Submit">Add this trip</button>
            </form>
          </div>
        </div>
      );
    }
  }
}
