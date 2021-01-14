import React from 'react';
import * as Icons from '../components/svg';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import { TopNav, Footer } from '../components/navigation';
import AddTraveler from '../components/form-addtraveler';

export default class TripTravelers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrip: null,
      modalView: null,
      travelers: []
    };
    this.setState = this.setState.bind(this);
    this.handleClickAddTraveler = this.handleClickAddTraveler.bind(this);
    this.handleTraveler = this.handleTraveler.bind(this);
    this.handleClickOff = this.handleClickOff.bind(this);
  }

  componentDidMount() {
    if (!this.context.user) return null;
    this.getSingleTrip();
    this.getTravelersList();
  }

  getSingleTrip() {
    fetch(`/api/trip/${this.props.tripId}`, {
      headers: {
        'X-Access-Token': this.context.token
      }
    })
      .then(response => response.json())
      .then(trips => {
        this.setState({ currentTrip: trips });
      })
      .catch(err => console.error(err));
  }

  getTravelersList() {
    fetch(`/api/travelers/${this.props.tripId}`, {
      headers: {
        'X-Access-Token': this.context.token
      }
    })
      .then(response => response.json())
      .then(travelersList => {
        this.setState({ travelers: travelersList });
      })
      .catch(err => console.error(err));
  }

  handleClickAddTraveler() {
    this.setState({
      modalView: true
    });
  }

  handleClickOff() {
    this.setState({
      modalView: false
    });
  }

  handleTraveler(travelerInfo) {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.context.token
      },
      body: JSON.stringify(travelerInfo)
    };
    fetch(`/api/travelers/${this.props.tripId}`, req)
      .then(response => response.json())
      .then(newTrip => {
        const newTravelers = this.state.travelers.concat(newTrip);
        this.setState({ travelers: newTravelers });
      })
      .catch(err => console.error(err));

    this.setState({
      modalView: false
    });
  }

  render() {
    if (!this.context.user) {
      return <Redirect to="signin" />;
    }

    if (!this.state.currentTrip) return null;
    const { handleClickOff, handleTraveler } = this;
    const { name } = this.state.currentTrip;
    const { modalView, travelers } = this.state;
    const renderModal = () => {
      if ((modalView === null && travelers.length === 0) || modalView) {
        return <AddTraveler view={modalView} tripId={this.props.tripId} travelers={travelers} onClick={handleClickOff} onSubmit={handleTraveler} />;
      }
    };
    const signout = this.context.handleSignOut;
    return (
      <div className="py-5">
        <TopNav name={name} tripId={this.props.tripId} signout={signout}/>
        <Body onClick={this.handleClickAddTraveler} travelers={travelers}/>
        <Footer />
        {renderModal()}
      </div>
    );
  }
}
TripTravelers.contextType = AppContext;

function Body(props) {
  return (
    <main className="d-flex flex-column pt-3">
      <div className="container-sm d-flex justify-content-between align-items-center">
        <button className="hidden bg-transparent p-0">
          <Icons.EditPencil />
        </button>
        <h2 className="text-center my-3">Travelers</h2>
        <button className="bg-transparent p-0" onClick={props.onClick}>
          <Icons.PlusIcon />
        </button>
      </div>
      <hr className="w-100 mt-2 mb-1 d-block border-0" />
      <div>
        <TravelersList travelers={props.travelers} />
      </div>
    </main>
  );
}

function TravelersList(props) {
  return (
    <table className="table">
      <thead>
        <tr className="d-flex">
          <th className="col-3">Name</th>
          <th className="col-7 px-4">Notes</th>
          <th className="col-2 text-center">Going</th>
        </tr>
      </thead>
      <tbody>
        {
          props.travelers.map(traveler => {
            return (
              <Traveler
                key={traveler.travelerId}
                traveler={traveler}
              />
            );
          })
        }
      </tbody>
    </table>
  );
}

function Traveler(props) {
  let goingIcon;
  if (props.traveler.going === 'Yes') {
    goingIcon = <Icons.Checkmark />;
  } else if (props.traveler.going === 'No') {
    goingIcon = <Icons.XIcon />;
  } else {
    goingIcon = <Icons.Question />;
  }

  return (
    <tr className="d-flex">
      <td className="col-3">{props.traveler.name}</td>
      <td className="col-7 px-4">{props.traveler.notes}</td>
      <td className="col-2 text-center">{goingIcon}</td>
    </tr>
  );
}
