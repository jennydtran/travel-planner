import React from 'react';

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
    <nav className="nav navbar-light static-fixed-top align-items-center px-2">
      <div className="navbar-brand mx-auto">
        <svg className="icon" data-name="Livello 1" id="Livello_1" width="2rem" height="2rem" fill="000000" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <path d="M127.12,60.22,115.46,48.56h0L69,2.05a7,7,0,0,0-9.9,0L12.57,48.53h0L.88,60.22a3,3,0,0,0,4.24,4.24l6.57-6.57V121a7,7,0,0,0,7,7H46a7,7,0,0,0,7-7V81a1,1,0,0,1,1-1H74a1,1,0,0,1,1,1v40a7,7,0,0,0,7,7h27.34a7,7,0,0,0,7-7V57.92l6.54,6.54a3,3,0,0,0,4.24-4.24ZM110.34,121a1,1,0,0,1-1,1H82a1,1,0,0,1-1-1V81a7,7,0,0,0-7-7H54a7,7,0,0,0-7,7v40a1,1,0,0,1-1,1H18.69a1,1,0,0,1-1-1V51.9L63.29,6.29a1,1,0,0,1,1.41,0l45.63,45.63Z" />
        </svg>
      </div>
      <a href="#" className="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="000000" className="icon bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </a>
    </nav>
  );
}

class HomeBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripEntries: this.props.tripEntries
    };
  }

  render() {
    return (
      <main className="d-flex flex-column">
        <div>
          <p className="h6 m-0 mt-3">Hello, <strong>username</strong></p>
          <p className="m-0 p-0 mt-2 small text-muted"><span>What are we planning today?</span></p>
          <hr className="dmx-2 my-4 d-block border-0" />
        </div>

        {this.props.tripEntries.length !== 0
          ? <div className="container">
              <h1 className="text-center light-teal">Your Trips</h1>
              <TripEntries tripEntries={this.props.tripEntries}/>
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
}

function TripEntries(props) {
  return (
    <ul className="list-unstyled my-4">
      <TripEntry />
    </ul>
  );
}

function TripEntry(props) {
  return (
    <li>
      <div className="trip-entry d-flex border rounded-lg shadow-sm py-4 px-4">
        <div className="d-flex align-items-center shadow-sm rounded-lg mr-4 px-2 border">
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="#FFAD0F" className="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
          </a>
        </div>
        <div className="d-flex flex-column justify-content-center flex-grow-1">
          <h4 className="m-0">Big Bear Trip</h4>
          <p className="text-muted m-0">January 2021</p>
        </div>
        <div className="d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="#dbdbdb" className="icon bi bi-dash" viewBox="0 0 16 16">
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
          </svg>
        </div>
      </div>
    </li>
  );
}

function BottomNav(props) {
  return (
    <footer className="container-xl footer d-flex justify-content-center align-items-center fixed-bottom px-1 w-100">
      <div className="text-center">
        <div className="icon bg-white rounded-circle" onClick={props.onClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </div>
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
