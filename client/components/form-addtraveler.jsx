import React from 'react';

export default class AddTraveler extends React.Component {
  render() {
    return (
      <div className="overlay d-flex justify-content-center align-items-center position-fixed w-100 h-100" onClick={this.handleClickOff}>
        <div className="d-flex flex-column justify-content-center w-75 bg-white rounded-lg py-4 px-4" onClick={this.stopPropagation}>
          <h2 className="text-center my-3">Add a traveler</h2>
          <form id="tripForm" className="d-flex flex-column" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="travelerName">Name</label>
              <input className="form-control" type="text" id="travelerName" name="name" required />
            </div>
            <div className="form-group">
              <label>Going</label>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="going" id="inlineRadio1" value="Yes" />
                <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="going" id="inlineRadio2" value="No" />
                <label className="form-check-label" htmlFor="inlineRadio2">No</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="going" id="inlineRadio3" value="Maybe" />
                <label className="form-check-label" htmlFor="inlineRadio3">Maybe</label>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
            </div>
            <button className="rounded-lg align-self-center my-3" type="submit" value="Submit">Add traveler</button>
          </form>
        </div>
      </div>
    );
  }
}
