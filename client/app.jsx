import React from 'react';
import Home from './pages/home';
import TripSummary from './pages/trip-snapshot';
import TripTodo from './pages/trip-todo';
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
    if (route.path === 'tripsnapshot') {
      const tripId = route.params.get('tripId');
      return <TripSummary tripId={tripId} />;
    }
    if (route.path === 'triptodo') {
      const tripId = route.params.get('tripId');
      return <TripTodo tripId={tripId} />;
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
