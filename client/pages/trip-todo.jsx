import React from 'react';
import * as Icons from '../components/svg';

export default class TripTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  render() {
    return (
      <>
        <TopNav name={this.props.name} tripId={this.props.tripId}/>
        <HomeBody />
        <Footer />
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

function ToDoForm(props) {
  return (
    <>
      <hr className="w-100 my-3 d-block border-0"/>
      <form className="form-inline pb-3 px-3 d-flex align-items-center">
        <div className="col pl-0">
          <input type="text" placeholder="Type a task item here" className="form-control form-control-lg" />
        </div>
        <div className="">
          <button type="submit" value="Submit" className="rounded-lg">Add</button>
        </div>
      </form>
    </>
  );
}

function Footer(props) {
  return (
    <div className="fixed-bottom">
      <ToDoForm />
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
