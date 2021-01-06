import React from 'react';
import * as Icons from '../components/svg';
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
  }

  componentDidMount() {
    this.getSingleTrip();
    this.getTravelersList();
  }

  getSingleTrip() {
    fetch(`/api/trip/${this.props.tripId}`)
      .then(response => response.json())
      .then(trips => {
        this.setState({ currentTrip: trips });
      })
      .catch(err => console.error(err));
  }

  getTravelersList() {
    fetch(`/api/travelers/${this.props.tripId}`)
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

  render() {
    if (!this.state.currentTrip) return null;
    const { name } = this.state.currentTrip;
    const { modalView, travelers } = this.state;
    const renderModal = () => {
      if ((modalView === null && travelers.length === 0) || modalView) {
        return <AddTraveler view={modalView} tripId={this.props.tripId} travelers={travelers} TravelerSetState={this.setState} />;
      }
    };
    return (
      <>
        <TopNav name={name} tripId={this.props.tripId} />
        <Body onClick={this.handleClickAddTraveler}/>
        <Footer />
        {renderModal()}
      </>
    );
  }
}

function Body(props) {
  return (
    <main className="d-flex flex-column pt-3">
      <div className="container-sm d-flex justify-content-between align-items-center">
        <button className="bg-transparent p-0">
          <Icons.EditPencil />
        </button>
        <h2 className="text-center my-3">Travelers</h2>
        <button className="bg-transparent p-0" onClick={props.onClick}>
          <Icons.PlusIcon />
        </button>
      </div>
      <hr className="w-100 my-3 d-block border-0" />
    </main>
  );
}
