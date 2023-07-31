import { useState } from "react";

import "./App.css";
import Task from "./Task";
import Navbar from "./Navbar";
import AddTask from "./AddTask";
import ApiHandler from "./http/ApiHandler";
import httpTodo from "./http/http.todo";

import ModalAdd from "./ModalAdd";
import axios from "axios";
const checkNav = false;
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
function App() {
  const [taskList, setTaskList] = useState([]);
  const [doneList, setdoneList] = useState([""]);
  const [FindSearch, setFindSearch] = useState("");
  console.log("In app" + checkNav);
  const handleDeleteTask = async (id) => {
    try {
      await httpTodo.delete(id);

      setTaskList((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const getPata = async () => {
    try {
      const updatedTaskList = await httpTodo.getAll();
      setTaskList(updatedTaskList);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

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
      <Navbar
        taskList={taskList}
        FindSearch={FindSearch}
        setFindSearch={setFindSearch}
        checkNav={checkNav}
      />
      <br />
      <br />
      <>
        {!FindSearch && (
          <Task
            taskList={taskList}
            setTaskList={setTaskList}
            doneList={doneList}
            setdoneList={setdoneList}
            getData={getData}
            handleDeleteTask={handleDeleteTask}
            getPata={getPata}
          />
        )}
      </>

      {/*  <Navbar /> */}
      <>
        <ModalAdd setTaskList={setTaskList} getData={getData} />
      </>
    </>
  );
}

export default App;
