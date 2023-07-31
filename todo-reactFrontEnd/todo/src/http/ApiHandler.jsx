import axios from "axios";

class ApiHandler {
  static async post(url, data) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  }

  static async get(url) {
    try {
      const result = await axios.get(url);
      const updatedTaskList = result.data.map((task) => ({
        id: task.id,
        text: task.name,
        due: new Date(task.dueTime),
        status: task.status,
      }));
      return updatedTaskList;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  static async delete(url, id) {
    try {
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}

export default ApiHandler;
