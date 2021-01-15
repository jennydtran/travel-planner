import React from 'react';
import * as Icons from '../components/svg';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import ToDoForm from '../components/form-todo';
import { TopNav } from '../components/navigation';

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
    this.updateCompleted = this.updateCompleted.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    if (!this.context.user) return null;
    this.getSingleTrip();
    this.getTodoList();
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

  getTodoList() {
    fetch(`/api/triptodo/${this.props.tripId}`, {
      headers: {
        'X-Access-Token': this.context.token
      }
    })
      .then(response => response.json())
      .then(todoList => {
        this.setState({ todos: todoList });
      })
      .catch(err => console.error(err));
  }

  updateCompleted(todoId, status) {
    const newTodos = [];
    for (let i = 0; i < this.state.todos.length; i++) {
      const obj = Object.assign({}, this.state.todos[i]);
      newTodos.push(obj);
    }
    let index;
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].todoId === todoId) {
        index = i;
      }
    }

    newTodos[index].completed = status.completed;
    this.setState({ todos: newTodos });

    const req = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.context.token
      },
      body: JSON.stringify(status)
    };
    fetch(`/api/triptodo/${todoId}`, req)
      .then(response => response.json())
      .catch(err => console.error(err));
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
        'Content-Type': 'application/json',
        'X-Access-Token': this.context.token
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

  deleteTodo(todoId) {
    const newTodos = Array.from(this.state.todos);
    let index;
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].todoId === todoId) {
        index = i;
      }
    }

    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });

    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.context.token
      }
    };
    fetch(`/api/triptodo/${todoId}`, req)
      .catch(err => console.error(err));
  }

  render() {
    if (!this.context.user) {
      return <Redirect to="signin" />;
    }

    if (!this.state.currentTrip) return null;
    const { name } = this.state.currentTrip;
    const { handleChange, addTodo, deleteTodo, updateCompleted } = this;
    const signout = this.context.handleSignOut;
    return (
      <div className="py-5">
        <TopNav name={name} tripId={this.props.tripId} signout={signout}/>
        <Body todo={this.state.todos} deleteTodo={deleteTodo} updateCompleted={updateCompleted}/>
        <Footer item={this.state.item} onSubmit={addTodo} onChange={handleChange} />
      </div>
    );
  }
}

TripTodo.contextType = AppContext;

function Body(props) {
  return (
    <main className="d-flex flex-column pb-5">
      <div className="container-sm">
        <h2 className="text-center my-3">To-Do Before Trip</h2>
      </div>
      <hr className="w-100 my-3 d-block border-0" />
      <ToDoList todo={props.todo} deleteTodo={props.deleteTodo} updateCompleted={props.updateCompleted}/>
    </main>
  );
}

function ToDoList(props) {
  return (
    <div className="d-flex justify-content-center">
      <ul className="s-container list-unstyled my-1 px-3">
        {
          props.todo.map(todo => {
            return (
              <ToDoItem
                key={todo.todoId}
                todo={todo}
                updateCompleted={props.updateCompleted}
                deleteTodo={props.deleteTodo}
              />
            );
          })
        }
      </ul>
    </div>
  );
}

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completedStatus: props.todo.completed
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClick() {
    const completed = this.state.completedStatus;
    const newStatus = { completed: !completed };
    this.setState({ completedStatus: !completed }, this.props.updateCompleted(this.props.todo.todoId, newStatus));
  }

  handleClickDelete() {
    this.props.deleteTodo(this.props.todo.todoId);
  }

  render() {
    return (
      <li className="list-group-item border border-dark rounded-lg mb-2">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            {this.state.completedStatus
              ? <button onClick={this.handleClick} className="bg-transparent p-0"><Icons.Checkmark /></button>
              : <button onClick={this.handleClick} className="bg-transparent p-0"><Icons.Checkbox /></button>
            }
            <label className="m-0 ml-3 form-check-label">
              {this.props.todo.item}
            </label>
          </div>
          <button onClick={this.handleClickDelete} className="bg-transparent p-0">
            <Icons.DashDeleteIcon />
          </button>
        </div>
      </li>
    );
  }
}

function Footer(props) {
  return (
    <div className="fixed-bottom bg-white border-top d-flex justify-content-center">
      <ToDoForm item={props.item} onChange={props.onChange} onSubmit={props.onSubmit}/>
      <footer className="d-none container-xl footer bg-light d-flex justify-content-center align-items-center w-100">
        <div className="d-flex text-center">
          <button className="icon bg-transparent p-1">
            <Icons.ChevronUp />
          </button>
        </div>
      </footer>
    </div>
  );
}
