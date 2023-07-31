import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import done from "./done.wav";
import overdue from "./overdue.wav";

function Task({ taskList, setTaskList, doneList, setdoneList, getData }) {
  let timer;
  const [remainingTimes, setRemainingTimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  var isOverdue = false;
  useEffect(() => {
    getData();

    return () => clearInterval(timer);
  }, []);
  /*  function handleSearch(event) {
    setSearchQuery(event.target.value);
  } */
  function playDone() {
    new Audio(done).play();
  }
  function playOver() {
    new Audio(overdue).play();
  }
  function handleDelete(id) {
    axios
      .delete(`https://localhost:7122/api/TodoItem/${id}`)
      .then((response) => {
        // Remove the task from the taskList state
        setTaskList((prev) => prev.filter((task) => task.id !== id));
      })

      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  function handleDone(id) {
    const taskToMove = taskList.find((task) => task.id === id);
    setdoneList((prev) => [...prev, taskToMove]);
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        // If the task is being marked as done, update the status and variant
        return { ...task, status: "Done" };
      } else {
        return task;
      }
    });
    playDone();

    setTaskList(updatedTaskList);
    const taskToUpdate = updatedTaskList.find((task) => task.id === id);
    if (taskToUpdate.isOverdue) {
      playOver();
    }
  }

  function calculateRemainingTime(dueDate) {
    const now = new Date();
    const dueDateTime = new Date(dueDate);
    const remainingTimeInSeconds = Math.max((dueDateTime - now) / 1000, 0);
    const hours = Math.floor(remainingTimeInSeconds / 3600);
    const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
    const seconds = Math.floor(remainingTimeInSeconds % 60);
    isOverdue = remainingTimeInSeconds <= 0;

    if (isOverdue) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return { hours, minutes, seconds };
  }

  useEffect(() => {
    timer = setInterval(() => {
      const updatedTaskList = taskList.map((task) => {
        const remainingTime = calculateRemainingTime(task.due);
        const status = isOverdue ? "Overdue" : task.status;
        return { ...task, status };
      });
      const isAnyTaskDone = updatedTaskList.some(
        (task) => task.status === "Done"
      );

      setTaskList(updatedTaskList);
      setRemainingTimes(
        taskList.map((task) => calculateRemainingTime(task.due))
      );
      if (isAnyTaskDone) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [taskList]);
  let colorvariant;
  return (
    <div style={{ color: "#FF7133" }}>
      <br />
      <br />
      <br />
      <Table striped bordered hover>
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Remaining Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {taskList.map((task, index) => {
            const now = new Date();
            const dueDateTime = new Date(task.due);
            const remainingTimeInSeconds = Math.max(
              (dueDateTime - now) / 1000,
              0
            );
            const hours = Math.floor(remainingTimeInSeconds / 3600);
            const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
            const seconds = Math.floor(remainingTimeInSeconds % 60);
            const isOverdue = remainingTimeInSeconds <= 0;
            const buttonStatus = isOverdue ? "Overdue" : task.status;
            if (buttonStatus === "Done") {
              colorvariant = "success";
            } else if (buttonStatus === "Ongoing") {
              colorvariant = "warning";
            } else {
              colorvariant = "danger";
            }

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.text}</td>
                <td>
                  {/* Use Button instead of input */}
                  <Button
                    variant={buttonStatus === "Done" ? "success" : colorvariant}
                    onClick={() => handleDone(task.id)}
                    disabled={task.status === "Done"}
                  >
                    {buttonStatus}
                  </Button>
                </td>
                <td>{new Date(task.due).toLocaleString()}</td>
                <td>
                  {isOverdue ? (
                    <span>Overdue</span>
                  ) : (
                    <span>
                      {hours}h {minutes}m {seconds}s
                    </span>
                  )}
                </td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Table striped bordered hover>
        <thead className="thead-light">
          <tr>
            <th style={{ color: "greenyellow" }}>Done Tasks</th>
          </tr>
        </thead>
        <tbody>
          {doneList.map((task, index) => (
            <tr key={index}>
              <td>{task.text}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Task;
