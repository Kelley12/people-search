using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeopleSearch.Models;
using PeopleSearch.Services;
using System.Collections.Generic;
using System.IO;

namespace PeopleSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly IPeopleService _service;

        public PeopleController(IPeopleService service)
        {
            _service = service;
        }

        // GET: api/People
        [HttpGet]
        public IEnumerable<Person> GetPeople()
        {
            return _service.GetPeople();
        }

        // POST: api/People/Search
        [HttpPost("Search")]
        public IActionResult GetPeople([FromBody] string searchString)
        {
            return Ok(_service.SearchPeople(searchString));
        }

        // GET: api/People/5
        [HttpGet("{id}")]
        public IActionResult GetPerson([FromRoute] int id)
        {
            var person = _service.GetPerson(id);

            if (person == null)
            {
                return NotFound();
            }

            return Ok(person);
        }

        // PUT: api/People/5
        [HttpPut("{id}")]
        public IActionResult PutPerson([FromRoute] int id, [FromBody] Person person)
        {
            if (id != person.PersonId)
            {
                return BadRequest();
            }

            try
            {
                _service.AddPerson(person);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_service.PersonExists(id))
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

        // POST: api/People/Upload
        [HttpPost("Upload"), DisableRequestSizeLimit]
        public IActionResult UploadImage()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");

                if (file.Length > 0)
                {
                    var dbPath = _service.SavePicture(file, folderName);

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/People
        [HttpPost]
        public IActionResult PostPerson([FromBody] Person person)
        {
            _service.AddPerson(person);

            return CreatedAtAction("GetPerson", new { id = person.PersonId }, person);
        }

        // DELETE: api/People/5
        [HttpDelete("{id}")]
        public IActionResult DeletePerson([FromRoute] int id)
        {
            var person = _service.GetPerson(id);
            if (person == null)
            {
                return NotFound();
            }

            _service.DeletePerson(id);

            return Ok(person);
        }
    }
}