using System.ComponentModel.DataAnnotations.Schema;

namespace POC.Data
{
    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Job { get; set; }
        public string Title { get; set; }
        public int Age { get; set; }
        public string Company { get; set; }
        public string WorkstationNo { get; set; }
        public string Site { get; set; }

        public Employee()
        {
            // Set default values for non-nullable properties
            Name = string.Empty;
            Job = string.Empty;
            Title = string.Empty;
            Company = string.Empty;
            WorkstationNo = string.Empty;
            Site = string.Empty;
        }
    }
}
