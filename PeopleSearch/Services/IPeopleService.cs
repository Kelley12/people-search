using Microsoft.AspNetCore.Http;
using PeopleSearch.Models;
using System.Collections.Generic;

namespace PeopleSearch.Services
{
    public interface IPeopleService
    {
        IEnumerable<Person> GetPeople();
        IEnumerable<Person> SearchPeople(string searchString);
        Person GetPerson(int id);
        void EditPerson(Person person);
        Person AddPerson(Person person);
        string SavePicture(IFormFile file, string folder);
        Person DeletePerson(int id);
        bool PersonExists(int id);
    }
}
