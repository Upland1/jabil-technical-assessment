using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Movie>>> GetAll()
    {
        return await context.Movies.Include(m => m.Director).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Movie>> GetById(int id)
    {
        var movie = await context.Movies.Include(m => m.Director)
                                       .FirstOrDefaultAsync(m => m.PKMovies == id);
        return movie == null ? NotFound() : movie;
    }

    [HttpPost]
    public async Task<ActionResult<Movie>> Create(Movie movie)
    {
        movie.Director = null; // Do not attempt to insert a duplicate Director entity
        context.Movies.Add(movie);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = movie.PKMovies }, movie);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Movie movie)
    {
        if (id != movie.PKMovies) return BadRequest();
        movie.Director = null;
        context.Entry(movie).State = EntityState.Modified;

        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!context.Movies.Any(e => e.PKMovies == id)) return NotFound();
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var movie = await context.Movies.FindAsync(id);
        if (movie == null) return NotFound();

        context.Movies.Remove(movie);
        await context.SaveChangesAsync();
        return NoContent();
    }
}