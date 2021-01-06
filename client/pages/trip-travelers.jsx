import React from 'react';
import * as Icons from '../components/svg';
import { TopNav, Footer } from '../components/navigation';

export default class TripTravelers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrip: null
    };
  }

  componentDidMount() {
    this.getSingleTrip();
  }

  getSingleTrip() {
    fetch(`/api/trip/${this.props.tripId}`)
      .then(response => response.json())
      .then(trips => {
        this.setState({ currentTrip: trips });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.currentTrip) return null;
    const { name } = this.state.currentTrip;
    return (
      <>
        <TopNav name={name} tripId={this.props.tripId} />
        <Footer />
      </>
    );
  }
}
