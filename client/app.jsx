import React from 'react';
import Home from './pages/home';
import TripSummary from './pages/trip';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null
    };
  }

  componentDidMount() {
    let newRoute;
    window.addEventListener('hashchange', () => {
      newRoute = parseRoute(window.location.hash);
      this.setState(state => ({
        route: newRoute
      }));
    });
  }

  renderPage() {
    const { route } = this.state;

    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'trips') {
      const tripId = route.params.get('tripId');
      // this.getSingleTrip(tripId);
      return <TripSummary tripId={tripId} />;
    }
  }

  render() {
    return (
      <>
        { this.renderPage()}
      </>
    );
  }
}
