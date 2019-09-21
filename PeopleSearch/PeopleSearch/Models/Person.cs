using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PeopleSearch.Models
{
    public class Person
    {
        [Key]
        public int PersonId { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string FirstName { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string LastName { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string address { get; set; }
        [Column(TypeName = "int")]
        public int Age { get; set; }
        [Column(TypeName = "varchar(max)")]
        public string Interests { get; set; }
        //TODO User Image
        //[Column(TypeName = "varbinary(max)")]
        //public int Image { get; set; }
    }
}
