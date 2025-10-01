using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using ASP_NET_Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace ASP_NET_Core.Controllers
{
    [Route("api/[controller]/[action]")]
    public class DataGridEmployeesByStateController : Controller
    {
        [HttpGet]
        public object Get(DataSourceLoadOptions loadOptions)
        {
            return DataSourceLoader.Load(SampleData.DataGridEmployeesByState, loadOptions);
        }

        [HttpPost]
        public IActionResult Post(string values)
        {
            var newEmployee = JsonSerializer.Deserialize<EmployeeByState>(values);
            newEmployee.ID = SampleData.DataGridEmployeesByState.Max(a => a.ID) + 1;
            if (!TryValidateModel(newEmployee))
                return BadRequest("Failed to insert item");

            SampleData.DataGridEmployeesByState.Add(newEmployee);

            return Ok();
        }

        [HttpPut]
        public IActionResult Put(int key, string values)
        {
            var employee = SampleData.DataGridEmployeesByState.First(a => a.ID == key);

            PopulateModel(JsonSerializer.Deserialize<EmployeeByState>(values), employee);

            if (!TryValidateModel(employee))
                return BadRequest("Failed to update item");

            return Ok();
        }

        [HttpDelete]
        public void Delete(int key)
        {
            var employee = SampleData.DataGridEmployeesByState.First(a => a.ID == key);
            SampleData.DataGridEmployeesByState.Remove(employee);
        }

        private void PopulateModel(EmployeeByState values, EmployeeByState currEmployee)
        {
            if (!(values.StateID is null))
                currEmployee.StateID = values.StateID;

            if (!(values.CityID is null))
                currEmployee.CityID = values.CityID;
        }
    }
}
