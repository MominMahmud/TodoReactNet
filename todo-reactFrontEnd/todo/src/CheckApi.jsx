import React, { useState, useEffect } from "react";
// import ApiHandler from "./http/ApiHandler";

import httpTodo from "./http/http.todo";

function CheckApi() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    // Fetch data on component mount
    getData();
  }, []);

  const getData = async () => {
    try {
      const updatedTaskList = httpTodo.getTaskList.getAll().then((res) => {
        console.log("Something", res);
      });
      setTaskList(updatedTaskList);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  const handleAddTask = async (uniTask, dueDateTimeAsDate) => {
    try {
      await ApiHandler.post("YOUR_POST_URL_HERE", {
        name: uniTask,
        dueTime: dueDateTimeAsDate,
        status: "Ongoing",
      });

      // Update the local taskList state
      setTaskList((prev) => [
        ...prev,
        { name: uniTask, status: "Ongoing", dueTime: dueDateTimeAsDate },
      ]);

      // Show success message, clear inputs, toggle modal, and fetch data again
      toast.success("Task Added");
      console.log(dueDateTimeAsDate);
      setUniTask("");
      setDueDate("");
      toggleModal();
      getData();
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await ApiHandler.delete("https://localhost:7122/api/TodoItem", id);
      // Remove the task from the taskList state
      setTaskList((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
}
