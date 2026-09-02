using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DirectorsController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Director>>> GetAll()
    {
        return await context.Directors.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Director>> GetById(int id)
    {
        var director = await context.Directors.FindAsync(id);
        return director == null ? NotFound() : director;
    }

    [HttpPost]
    public async Task<ActionResult<Director>> Create(Director director)
    {
        context.Directors.Add(director);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = director.PKDirector }, director);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Director director)
    {
        if (id != director.PKDirector) return BadRequest();
        context.Entry(director).State = EntityState.Modified;

        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!context.Directors.Any(e => e.PKDirector == id)) return NotFound();
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var director = await context.Directors.FindAsync(id);
        if (director == null) return NotFound();

        context.Directors.Remove(director);
        await context.SaveChangesAsync();
        return NoContent();
    }
}