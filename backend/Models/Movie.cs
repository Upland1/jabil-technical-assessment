using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("Movies")]
public class Movie
{
    [Key]
    [Column("PKMovies")]
    public int PKMovies { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("Name")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(50)]
    [Column("Gender")]
    public string? Gender { get; set; }

    [Column("Duration")]
    public TimeSpan? Duration { get; set; }

    [Column("FKDirector")]
    public int? FKDirector { get; set; }

    [ForeignKey("FKDirector")]
    public Director? Director { get; set; }
}