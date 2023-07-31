import ApiHandler from "./ApiHandler";
// process base api url

const baseApiUrl = "https://localhost:7122";

class HttpTodo {
  getAll = () => {
    return ApiHandler.get(`${baseApiUrl}/api/TodoItem`);
  };
  getOne = (id) => {
    return ApiHandler.get(`${baseApiUrl}/api/TodoItem/one/${id}`);
  };
  findByName = (name) => {
    return ApiHandler.get(`${baseApiUrl}/api/TodoItem/find/${name}`);
  };
  delete = (id) => {
    return ApiHandler.delete(`${baseApiUrl}/api/TodoItem`, id);
  };
}

const httpTodo = new HttpTodo();
export default httpTodo;
