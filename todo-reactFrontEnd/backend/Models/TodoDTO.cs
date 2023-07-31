
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Todo.Models
{
    public class TodoDTO
    {
        public string? Id { get; set; }
        public string Name { get; set; }
        public DateTime DueTime { get; set; }
        public string Status { get; set; }


    }
}
