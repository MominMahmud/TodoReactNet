using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Todo.Models;
using Todo.ORM;

namespace Todo.Services
{
    public class TodoItemService
    {
        private readonly TodoItemContext _todoItemContext;

        public TodoItemService(TodoItemContext todoItemContext)
        {
            _todoItemContext = todoItemContext;
        }

        public async Task<IEnumerable<TodoDTO>> GetTodos()
        {
            var tasks = await _todoItemContext.Tasks.ToListAsync();
            return ConvertToDTO(tasks);
        }

        public async Task<TodoDTO> GetTodobyId(string id)
        {
            var task = await _todoItemContext.Tasks.FindAsync(id);
            if (task == null)
            {
                return null;
            }
            return ConvertToDTO(task);
        }

        public async Task<TodoDTO> PostTodo(TodoDTO todoDTO)
        {
            var todo = ConvertToEntity(todoDTO);
            _todoItemContext.Tasks.Add(todo);
            await _todoItemContext.SaveChangesAsync();

            return ConvertToDTO(todo);
        }

        public async Task UpdateTask(string id, TodoDTO todoDTO)
        {
            var existingTask = await _todoItemContext.Tasks.FindAsync(id);
            if (existingTask == null)
            {
                throw new ArgumentException("Invalid ID provided.");
            }

            ConvertToEntity(todoDTO, existingTask);
            await _todoItemContext.SaveChangesAsync();
        }

        public async Task<bool> DeleteTask(string id)
        {
            var todo = await _todoItemContext.Tasks.FindAsync(id);
            if (todo == null)
            {
                return false;
            }

            _todoItemContext.Tasks.Remove(todo);
            await _todoItemContext.SaveChangesAsync();
            return true;
        }

        // Helper methods to convert between DTO and entity
        private TodoDTO ConvertToDTO(TodoItem entity)
        {
            return new TodoDTO
            {

                Id= entity.Id,
                Name = entity.Name,
                Status = entity.status,
                DueTime = entity.DueTime,
                
            };
        }

        private List<TodoDTO> ConvertToDTO(List<TodoItem> entities)
        {
            var dtos = new List<TodoDTO>();
            foreach (var entity in entities)
            {
                dtos.Add(ConvertToDTO(entity));
            }
            return dtos;
        }

        private TodoItem ConvertToEntity(TodoDTO dto, TodoItem existingEntity = null)
        {
            if (existingEntity == null)
            {
                existingEntity = new TodoItem();
            }
            existingEntity.Id = dto.Id;
           existingEntity.Name = dto.Name;
            existingEntity.status = dto.Status;
            existingEntity.DueTime = dto.DueTime;
           

            return existingEntity;
        }
    }
}