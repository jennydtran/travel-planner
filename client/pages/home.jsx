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
        <HomeBody />
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
    <nav className="nav static-fixed-top navbar-light align-items-center">
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

function HomeBody(props) {
  return (
    <main className="d-flex flex-column justify-content-between mh-100">
      <div>
        <p className="h6 m-0 mt-3">Hello, <strong>username</strong></p>
        <p className="m-0 p-0 mt-n1 small text-muted"><span>What are we planning today?</span></p>
        <hr className="dmx-2 my-4 d-block border-0" />
      </div>

      {/* <TripEntries /> */}

      {/* if no entries... render below */}
      <div className="light-teal text-center"><h3>Looks like you don&#39;t<br />have any trips planned!</h3></div>
      <div className="light-teal text-center"><p>Let&#39;s start planning!<br />Click the <strong>ADD</strong> button to add a trip.</p></div>
    </main>
  );
}

function BottomNav(props) {
  return (
    <footer className="footer fixed-bottom">
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
        <div className="overlay" onClick={this.handleClickOff}>
          <div className="d-flex flex-column justify-content-center w-75 bg-white rounded-lg py-3 px-4" onClick={this.stopPropagation}>
            <h2 className="text-center">Add a trip</h2>
            <form id="tripForm" className="d-flex flex-column" onSubmit={this.handleSubmit}>
              <label htmlFor="tripName">Name of trip</label>
              <input type="text" id="tripName" name="tripName" onChange={this.handleChange} value={this.state.tripName} required></input>
              <label htmlFor="tripDestination">Destination</label>
              <input type="text" id="tripDestination" name="tripDestination" onChange={this.handleChange} value={this.state.tripDestination} required></input>
              <label htmlFor="depatureDate">Depature Date</label>
              <input type="date" id="departureDate" name="departureDate" min={maxDate} onChange={this.handleChange} value={this.state.departureDate} required></input>
              <label htmlFor="returnDate">Return Date</label>
              <input disabled={disabled} type="date" id="returnDate" name="returnDate" min={returnMaxDate} onChange={this.handleChange} value={this.state.returnDate} required></input>
              <button className="rounded-lg my-3 align-self-center" type="submit" value="Submit">Add this trip</button>
            </form>
          </div>
        </div>
      );
    }
  }
}

// function TripEntries(props) {
//   return (
//     <div className="container">
//       <h1>Your Trips</h1>
//     </div>
//   );
// }
