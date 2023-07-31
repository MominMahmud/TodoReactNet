using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Todo.Models
{
    public class TodoItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column, MaxLength(36)]
        public string Id { get; set; }
        public string? Name { get; set; }
        public DateTime DueTime { get; set; }
        public string? status { get; set; }
    }
}
