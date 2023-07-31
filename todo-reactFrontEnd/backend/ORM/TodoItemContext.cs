using Microsoft.EntityFrameworkCore;
using Todo.Models;

namespace Todo.ORM
{
    public class TodoItemContext : DbContext
    {
        public TodoItemContext(DbContextOptions<TodoItemContext> options) : base(options)
        {

        }

        public DbSet<TodoItem> Tasks { get; set; }
    }
}
