import React from 'react';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import Home from './pages/home';
import TripSummary from './pages/trip-snapshot';
import TripTodo from './pages/trip-todo';
import TripTravelers from './pages/trip-travelers';
import UserSignUp from './pages/user-signup';
import UserSignIn from './pages/user-signin';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null,
      token: null,
      isAuthorizing: true
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    let newRoute;
    window.addEventListener('hashchange', () => {
      newRoute = parseRoute(window.location.hash);
      this.setState(state => ({
        route: newRoute
      }));
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, token, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user, token });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null, token: null });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'signin') {
      return <UserSignIn />;
    }
    if (route.path === 'signup') {
      return <UserSignUp />;
    }
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
    if (route.path === 'travelers') {
      const tripId = route.params.get('tripId');
      return <TripTravelers tripId={tripId} />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route, token } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, token, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          { this.renderPage()}
        </>
      </AppContext.Provider>
    );
  }
}
