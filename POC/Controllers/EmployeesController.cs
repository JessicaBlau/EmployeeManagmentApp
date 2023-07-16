using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using POC.Data;
using POC.Helpers;

namespace POC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeContext _context;
        private readonly JwtTokenGenerator _tokenGenerator;

        public EmployeesController(EmployeeContext context, JwtTokenGenerator tokenGenerator)
        {
            _context = context;
            _tokenGenerator = tokenGenerator;
        }

        #region API authentication
        // GET: api/employees/token
        [HttpGet("token")]
        public ActionResult<string> GenerateToken()
        {
            string token = _tokenGenerator.GenerateToken();

            return Ok(token);
        }

        #endregion


        // GET: api/employees
        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<Employee>> GetEmployees()
        {
            return Ok(_context.Employees.ToList());
        }

        // GET: api/employees/{id}
        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<Employee> GetEmployee(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        // POST: api/employees
        [HttpPost]
        [Authorize]
        public ActionResult<int> CreateEmployee(Employee employee)
        {
            if (employee.ID == 0)
            {
                // Generate a new ID if ID is not provided in the request body
                employee.ID = GenerateNewEmployeeID();
            }
            else
            {
                // If ID is provided, check if it already exists in the database
                var existingEmployee = _context.Employees.Find(employee.ID);
                if (existingEmployee != null)
                {
                    return BadRequest("Employee with the provided ID already exists.");
                }
            }

            _context.Employees.Add(employee);
            _context.SaveChanges();

            return Ok(employee.ID);
        }
        // PUT: api/employee/{id}
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult UpdateEmployee(int id, Employee employee)
        {
            if(employee.ID == 0)
            {
                employee.ID = id;
            }
            if (id != employee.ID)
            {
                return BadRequest("Employee ID and id do not match");
            }

            _context.Entry(employee).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(employee.ID);
        }

        // DELETE: api/employees/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            _context.SaveChanges();

            return Ok(employee.ID);
        }

        private int GenerateNewEmployeeID()
        {
            // Find the maximum ID in the Employees table
            int maxID = _context.Employees.Max(e => e.ID);

            // Increment the maximum ID by 1 to generate a new ID
            int newID = maxID + 1;

            return newID;
        }

    }
}