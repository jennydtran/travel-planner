import React from 'react';

export default class AddTraveler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      going: '',
      notes: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const traveler = this.state;
    this.props.onSubmit(traveler);

    event.target.reset();
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    return (
      <div className="overlay d-flex justify-content-center align-items-center position-fixed w-100 h-100" onClick={this.props.onClick}>
        <div className="form-container d-flex flex-column justify-content-center bg-white rounded-lg py-4 px-4" onClick={this.stopPropagation}>
          <form id="travelerForm" className="modal-guts f-container d-flex flex-column" onSubmit={this.handleSubmit}>
            <h2 className="text-center my-3">Add a traveler</h2>
            <div className="f form-group">
              <label htmlFor="travelerName">Name</label>
              <input className="modal form-control" type="text" id="travelerName" name="name" onChange={this.handleChange} value={this.state.name} required />
            </div>
            <div className="f form-group d-flex flex-wrap justify-content-between">
              <label className="m-0 mr-3">Going</label>
              <div className="form-check form-check-inline">
                <label className="form-check-label mr-1 text-grey" htmlFor="going-yes">Yes</label>
                <input className="form-check-input" type="radio" name="going" id="going-yes" value="Yes" onChange={this.handleChange} required/>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label mr-1 text-grey" htmlFor="going-no">No</label>
                <input className="form-check-input" type="radio" name="going" id="going-no" value="No" onChange={this.handleChange} required/>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label mr-1 text-grey" htmlFor="going-maybe">Maybe</label>
                <input className="form-check-input m-0" type="radio" name="going" id="going-maybe" value="Maybe" onChange={this.handleChange} required/>
              </div>
            </div>
            <div className="f form-group">
              <textarea className="f form-control" name="notes" id="travelerNotes" placeholder="Notes:" rows="5" onChange={this.handleChange} value={this.state.notes}></textarea>
            </div>
            <button className="rounded-lg align-self-center my-3" type="submit" value="Submit">Add traveler</button>
          </form>
        </div>
      </div>
    );
  }
}
