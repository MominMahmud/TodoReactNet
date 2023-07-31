import React, { useState } from "react";
import Task from "./Task";
function AddTask({ setTaskList }) {
  const [uniTask, setUniTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleAdd(event) {
    event.preventDefault();
    setTaskList((prev) => [
      ...prev,
      { text: uniTask, status: "Ongoing", due: dueDate },
    ]);
    setUniTask("");
    setDueDate("");
  }

  function handleChange(event) {
    setUniTask(event.target.value);
  }

  return (
    <div>
      <form className="form-horizontal" onSubmit={handleAdd}>
        <fieldset>
          <legend>Task Details</legend>
          <br />
          <br />
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="textinput">
              Create new task
            </label>
            <div className="col-md-4  offset-md-4">
              <input
                id="textinput"
                name="textinput"
                type="text"
                placeholder="Enter task..."
                className="form-control input-md"
                value={uniTask}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="datetimeinput">
              Due Date and Time
            </label>
            <div className="col-md-4 offset-md-4">
              <input
                id="datetimeinput"
                name="datetimeinput"
                type="datetime-local"
                className="form-control input-md"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div style={{ position: "relative" }} className="form-group">
            <div className="col-md-4 offset-md-4">
              <button
                style={{
                  position: "absolute",
                  right: "725px",
                  top: "10px",
                  width: "100px",
                }}
                id="singlebutton"
                name="singlebutton"
                className="btn btn-success"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </fieldset>
      </form>
      <br />
      <br />
    </div>
  );
}
export default AddTask;
