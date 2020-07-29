using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DevExtremeAspNetCoreApp1.Models
{
    public class EmployeeByState
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
        public string Prefix { get; set; }

        [Display(Name = "State")]
        public List<int>  StateID { get; set; }

        [Display(Name = "City")]
        public List<int> CityID { get; set; }
    }
}
