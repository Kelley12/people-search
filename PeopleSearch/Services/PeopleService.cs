using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PeopleSearch.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading;

namespace PeopleSearch.Services
{
    public class PeopleService : IPeopleService
    {
        private readonly PersonContext _context;

        public PeopleService(PersonContext context)
        {
            _context = context;
        }

        public IEnumerable<Person> GetPeople()
        {
            return _context.People;
        }

        public IEnumerable<Person> SearchPeople(string searchString)
        {
            var people = _context.People.AsQueryable();

            if (!string.IsNullOrEmpty(searchString))
            {
                people = people.Where(s => s.FirstName.Contains(searchString) || s.LastName.Contains(searchString));
            }

            // Simulate slow search results
            Random random = new Random();
            Thread.Sleep(random.Next(3000));

            return people.ToList();
        }

        public Person GetPerson(int id)
        {
            return _context.People.Find(id);
        }

        public void EditPerson(Person person)
        {
            _context.Entry(person).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public Person AddPerson(Person person)
        {
            _context.People.Add(person);
            _context.SaveChanges();

            return person;
        }

        public string SavePicture(IFormFile file, string folder)
        {
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folder);
            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            fileName = string.Concat(DateTime.Now.ToString("yyyyMMddHHmmss"), "_", fileName);
            var fullPath = Path.Combine(pathToSave, fileName);
            var dbPath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return dbPath;
        }

        public Person DeletePerson(int id)
        {
            var person = _context.People.Find(id);
            _context.People.Remove(person);
            _context.SaveChanges();
            return person;
        }

        public bool PersonExists(int id)
        {
            return _context.People.Any(e => e.PersonId == id);
        }
    }
}
