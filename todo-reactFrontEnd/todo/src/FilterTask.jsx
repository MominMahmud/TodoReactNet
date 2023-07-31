import React from "react";
import Navbar from "./Navbar";
import { Table, Button } from "react-bootstrap";
function FilterTask({ taskList, handleDeleteTask, FindSearch }) {
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
          {taskList
            .filter((task) => task.text.toLowerCase().includes(FindSearch))
            .map((task, index) => {
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
                      variant={
                        buttonStatus === "Done" ? "success" : colorvariant
                      }
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
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default FilterTask;
