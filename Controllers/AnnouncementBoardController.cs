using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementBoardController : ControllerBase
    {
        private readonly WebApiContext _context;

        public AnnouncementBoardController(WebApiContext context)
        {
            _context = context;
        }

        // GET: api/AnnouncementBoard
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnnouncementBoard>>> GetTodoItems()
        {
            return await _context.AnnouncementItems.ToListAsync();
        }

        // GET: api/AnnouncementBoard/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnnouncementBoard>> GetAnnouncementBoard(int id)
        {
            var announcementBoard = await _context.AnnouncementItems.FindAsync(id);

            if (announcementBoard == null)
            {
                return NotFound();
            }

            return announcementBoard;
        }

        // PUT: api/AnnouncementBoard/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnnouncementBoard(int id, AnnouncementBoard announcementBoard)
        {
            if (id != announcementBoard.Id)
            {
                return BadRequest();
            }

            _context.Entry(announcementBoard).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnnouncementBoardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AnnouncementBoard
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AnnouncementBoard>> PostAnnouncementBoard(AnnouncementBoard announcementBoard)
        {
            _context.AnnouncementItems.Add(announcementBoard);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnnouncementBoard", new { id = announcementBoard.Id }, announcementBoard);
        }

        // DELETE: api/AnnouncementBoard/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnnouncementBoard(int id)
        {
            var announcementBoard = await _context.AnnouncementItems.FindAsync(id);
            if (announcementBoard == null)
            {
                return NotFound();
            }

            _context.AnnouncementItems.Remove(announcementBoard);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnnouncementBoardExists(int id)
        {
            return _context.AnnouncementItems.Any(e => e.Id == id);
        }
    }
}
