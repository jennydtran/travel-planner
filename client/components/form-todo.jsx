import React from 'react';

export default function ToDoForm(props) {
  const value = props.item;
  return (
    <>
      <form className="form-inline py-3 px-3 d-flex align-items-center" onSubmit={props.onSubmit}>
        <div className="col pl-0">
          <input type="text" onChange={props.onChange} value={value} placeholder="Type a task item here" className="form-control form-control-lg w-100" required/>
        </div>
        <div>
          <button type="submit" value="Submit" className="rounded-lg">Add</button>
        </div>
      </form>
    </>
  );
}
