import React from 'react';
import Home from './pages/home';
import TripSummary from './pages/trip-snapshot';
import TripTodo from './pages/trip-todo';
import TripTravelers from './pages/trip-travelers';
import UserSignUp from './pages/user-signup';
import UserSignIn from './pages/user-signin';
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
    const { route, user } = this.state;
    if (route.path === '' || user === null) {
      return <UserSignIn />;
    }
    if (route.path === 'signup') {
      return <UserSignUp />;
    }
    if (route.path === 'home') {
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
    if (route.path === 'travelers') {
      const tripId = route.params.get('tripId');
      return <TripTravelers tripId={tripId} />;
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
