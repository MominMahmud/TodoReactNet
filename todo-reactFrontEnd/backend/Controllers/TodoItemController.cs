using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Todo.Models;
using Todo.Services;

namespace Todo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemController : ControllerBase
    {
        private TodoItemService _todoItemService;

        public TodoItemController(TodoItemService todoItemService)
        {
            _todoItemService = todoItemService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoDTO>>> GetTodos()
        {
            var todos = await _todoItemService.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDTO>> GetTodobyId(string id)
        {
            var task = await _todoItemService.GetTodobyId(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost("add")]
        public async Task<ActionResult<TodoDTO>> PostTodo([FromBody] TodoDTO todoDTO)
        {
            var createdTodo = await _todoItemService.PostTodo(todoDTO);
            return Ok(createdTodo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutTask(string id, TodoDTO todoDTO)
        {
            try
            {
                await _todoItemService.UpdateTask(id, todoDTO);
                return Ok();
            }
            catch (ArgumentException)
            {
                return BadRequest("Invalid ID provided.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(string id)
        {
            var success = await _todoItemService.DeleteTask(id);
            if (success)
            {
                return Ok();
            }
            return NotFound();
        }
    }
}
