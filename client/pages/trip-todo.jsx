import React from 'react';
import * as Icons from '../components/svg';
import ToDoForm from '../components/form-todo';

export default class TripTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrip: null,
      todos: [],
      item: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    this.getSingleTrip();
  }

  getSingleTrip() {
    fetch(`/api/trip/${this.props.tripId}`)
      .then(response => response.json())
      .then(trips => {
        this.setState({ currentTrip: trips });
      });
  }

  handleChange(event) {
    this.setState({
      item: event.target.value
    });
  }

  addTodo(event) {
    event.preventDefault();
    const newTodo = {
      item: this.state.item,
      completed: false
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    };
    fetch(`/api/triptodo/${this.props.tripId}`, req)
      .then(response => response.json())
      .then(newTrip => {
        const newTodosArray = this.state.todos.concat(newTrip);
        this.setState({ todos: newTodosArray, item: '' });
        event.target.reset();
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.currentTrip) return null;
    const { name } = this.state.currentTrip;
    const { handleChange, addTodo } = this;
    return (
      <>
        <TopNav name={name} tripId={this.props.tripId}/>
        <HomeBody />
        <Footer item={this.state.item} onSubmit={addTodo} onChange={handleChange} />
      </>
    );
  }
}

function HomeBody(props) {
  return (
    <main className="d-flex flex-column pt-3">
      <div className="container-sm">
        <h2 className="text-center my-3">To-Do Before Trip</h2>
      </div>
      <hr className="w-100 my-3 d-block border-0" />
      <ToDoList />
    </main>
  );
}

function ToDoList(props) {
  return (
    <div />
  );
}

function TopNav(props) {
  return (
    <nav className="nav navbar-light fixed-top align-items-center justify-content-between px-2">
      <div className="d-flex align-items-center">
        <a href={`#tripsnapshot?tripId=${props.tripId}`}>
          <button className="bg-transparent p-0 nav-link ">
            <Icons.BackLeftIcon />
          </button>
        </a>
        <div>
          <p className="h5 m-0 mx-2 mt-1 text-grey">{props.name}</p>
        </div>
      </div>
      <button className="bg-transparent p-0 nav-item">
        <Icons.ThreeDotNavIcon />
      </button>
    </nav>
  );
}

function Footer(props) {
  return (
    <div className="fixed-bottom">
      <ToDoForm item={props.item} onChange={props.onChange} onSubmit={props.onSubmit}/>
      <footer className="container-xl footer bg-light d-flex justify-content-center align-items-center w-100">
        <div className="d-flex text-center">
          <button className="icon bg-transparent p-1">
            <Icons.ChevronUp />
          </button>
        </div>
      </footer>
    </div>
  );
}
