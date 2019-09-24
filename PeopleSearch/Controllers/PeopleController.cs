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
    }
}