import React, { useState } from "react";
import "./ModalAdd.css";

import axios from "axios";
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalAdd({ setTaskList, getData }) {
  const [uniTask, setUniTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!isModalOpen);
  };

  function handleAdd(event) {
    event.preventDefault();

    const url = "https://localhost:7122/api/TodoItem/add";

    // var dueDateTime = new Moment(dueDate);
    // const dueDateTimeAsDate = dueDateTime.toDate();
    // console.log(dueDateTimeAsDate);

    const dueDateTimeAsDate = moment.utc(dueDate).format(); // moment().toDate();

    axios
      .post(url, {
        name: uniTask,
        dueTime: dueDateTimeAsDate,
        status: "Ongoing",
      })
      .then((response) => {
        setTaskList((prev) => [
          ...prev,
          { name: uniTask, status: "Ongoing", dueTime: dueDateTimeAsDate },
        ]);
        toast.success("Task Added");
        console.log(dueDateTimeAsDate);
        setUniTask("");
        setDueDate("");

        toggleModal();
        getData();
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  }

  function handleChange(event) {
    setUniTask(event.target.value);
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <button
        style={{ position: "sticky", bottom: 10 }}
        onClick={toggleModal}
        type="button"
        className="btn btn-success btn-modal"
      >
        Add new task &nbsp;
        <i className="bi bi-plus-square"></i>
      </button>

      {isModalOpen && (
        <div
          style={{
            borderWidth: "100px",
            borderColor: "blueviolet",
            height: "1000px",
          }}
          className="modal"
        >
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <form className="form-horizontal" onSubmit={handleAdd}>
              <fieldset>
                <legend
                  style={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    color: "black",
                  }}
                >
                  Enter the details
                </legend>
                <br />

                <div className="form-group">
                  <label
                    style={{ fontSize: "20px", color: "black" }}
                    className="col-md-4 control-label"
                    htmlFor="textinput"
                  >
                    <br />
                    Create new task
                  </label>
                  <br />

                  <div
                    style={{
                      alignItems: "center",
                      width: "250px",
                      justifyContent: "center",
                    }}
                    className="col-md-4  offset-md-4"
                  >
                    <input
                      style={{
                        alignItems: "center",
                        width: "180px",
                        justifyContent: "center",
                      }}
                      id="textinput"
                      name="textinput"
                      type="text"
                      placeholder="Enter task name"
                      className="form-control input-md"
                      value={uniTask}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    style={{ fontSize: "20px", color: "black" }}
                    className="col-md-4 control-label"
                    htmlFor="datetimeinput"
                  >
                    <br />
                    Due Date and Time
                    {console.log(dueDate)}
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
                    <br />
                  </div>
                </div>

                <div style={{ position: "relative" }} className="form-group">
                  <div className="col-md-4 offset-md-4">
                    <button
                      style={{
                        position: "absolute",
                        right: "225px",
                        top: "30px",
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
            <button
              style={{
                borderColor: "red",

                backgroundColor: "white",
                color: "red",
              }}
              className="close-modal"
              onClick={toggleModal}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default ModalAdd;
