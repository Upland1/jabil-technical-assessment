using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("Director")]
public class Director
{
    [Key]
    [Column("PKDirector")]
    public int PKDirector { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("Name")]
    public string Name { get; set; } = string.Empty;

    [Column("Age")]
    public int? Age { get; set; }

    [Column("Active")]
    public bool Active { get; set; } = true;
}