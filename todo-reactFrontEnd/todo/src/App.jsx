import { useState } from "react";

import "./App.css";
import Task from "./Task";
import Navbar from "./Navbar";
import AddTask from "./AddTask";
import ModalAdd from "./ModalAdd";
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
function App() {
  const [taskList, setTaskList] = useState([]);
  const [doneList, setdoneList] = useState([""]);
  const getData = () => {
    axios
      .get("https://localhost:7122/api/TodoItem")
      .then((result) => {
        const updatedTaskList = result.data.map((task) => {
          const id = task.id;
          /* console.log(id); */
          const taskname = task.name;
          /* console.log(taskname); */
          const dueDate = new Date(task.dueTime);
          const taskstatus = task.status;

          return {
            id: id,
            text: taskname,
            due: dueDate,
            status: taskstatus,
          };
        });
        setTaskList(updatedTaskList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Task
                  taskList={taskList}
                  setTaskList={setTaskList}
                  doneList={doneList}
                  setdoneList={setdoneList}
                  getData={getData}
                />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      {/*  <Navbar /> */}
      <>
        <ModalAdd setTaskList={setTaskList} getData={getData} />
      </>
    </>
  );
}

export default App;
