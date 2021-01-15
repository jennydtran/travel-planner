import React from 'react';
import AppContext from '../lib/app-context';
import dateReformat from './date-reformat';

export default class TripModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: '',
      tripDestination: '',
      departureDate: '',
      returnDate: '',
      numberOfDays: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickOff = this.handleClickOff.bind(this);
    this.calculateDays = this.calculateDays.bind(this);
  }

  calculateDays() {
    const date1 = Date.parse(this.state.departureDate);
    const date2 = Date.parse(this.state.returnDate);
    const timeDiff = date2 - date1;
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    days += 1;
    this.setState(state => ({
      numberOfDays: days
    }));
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    }, this.calculateDays);
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.context.token
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
    let today = Date.now();
    today = dateReformat(today);
    const maxDate = today.format2;

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
        <div className="overlay d-flex align-items-center position-fixed w-100 h-100" onClick={this.handleClickOff}>
          <div className="form-container d-flex mx-auto flex-column justify-content-center bg-white rounded-lg py-4 px-4" onClick={this.stopPropagation}>
            <form id="tripForm" className="modal-guts f-container d-flex flex-column" onSubmit={this.handleSubmit}>
              <h2 className="text-center my-3">Add a trip</h2>
              <div className="f form-group">
                <label htmlFor="tripName">Name of trip</label>
                <input className="f form-control" type="text" id="tripName" name="tripName" onChange={this.handleChange} value={this.state.tripName} required />
              </div>
              <div className="f form-group">
                <label htmlFor="tripDestination">Destination</label>
                <input className="f form-control" type="text" id="tripDestination" name="tripDestination" onChange={this.handleChange} value={this.state.tripDestination} required />
              </div>
              <div className="f form-group">
                <label htmlFor="depatureDate">Depature Date</label>
                <input className="f form-control" type="date" id="departureDate" name="departureDate" min={maxDate} onChange={this.handleChange} value={this.state.departureDate} required />
              </div>
              <div className="f form-group">
                <label htmlFor="returnDate">Return Date</label>
                <input className="f form-control" disabled={disabled} type="date" id="returnDate" name="returnDate" min={returnMaxDate} onChange={this.handleChange} value={this.state.returnDate} required />
              </div>
              <button className="rounded-lg align-self-center my-3" type="submit" value="Submit">Add this trip</button>
            </form>
          </div>
        </div>
      );
    }
  }
}

TripModal.contextType = AppContext;
