# Employee Management System

This is a web application and RESTful API built using ASP.NET and C# to manage employee information. It provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on employee data stored in a database. The application includes user authentication, data security measures, and can be deployed to the AWS cloud platform.

## Features

- Database schema for storing employee information with fields like ID, Name, Job, Title, Age, Company, Workstation No., and Site.
- RESTful API with the following endpoints:
  - `GET /api/employees`: Retrieves a list of all employees in JSON format.
  - `POST /api/employees`: Adds a new employee to the database and returns the new employee ID.
  - `GET /api/employees/{id}`: Retrieves information about a single employee with the specified ID in JSON format.
  - `PUT /api/employees/{id}`: Updates information about a single employee with the specified ID.
  - `DELETE /api/employees/{id}`: Deletes a single employee with the specified ID.
- Front-end web application built using HTML, JavaScript, and AJAX.
  - Users can view a list of all employees, add a new employee, view information about a single employee, update information about a single employee, and delete a single employee.
  - The web application uses the Ext JS library for enhanced UI/UX.
- User authentication is implemented using ASP.NET Identity, ensuring secure access to the application.
- Authentication is also added to the RESTful API endpoints using ASP.NET Web API, ensuring secure access to the API.
- Measures are taken to secure the web application and API from Cross-site scripting (XSS) and SQL Injection attacks.
- The web application and API can be deployed to the AWS cloud platform for easy access and scalability.

## Prerequisites

Before running the application, ensure you have the following:

- ASP.NET and C# development environment set up.
- Database configured with the appropriate schema.
- AWS account for deployment (if applicable).

## Getting Started

1. Clone the repository to your local machine.
2. Set up the database with the required schema.
3. Update the database connection string in the application configuration.
4. Build and run the application using your preferred development environment.
5. Access the web application through the specified URL to start managing employees.

## Deployment to AWS

To deploy the web application and API to the AWS cloud platform, follow these steps:

1. Set up an AWS account if you haven't already.
2. Provision the necessary AWS resources such as EC2 instances, RDS database, etc.
3. Configure the deployment settings in your development environment to target the AWS environment.
4. Build the deployment package for the web application and API.
5. Deploy the application package to the AWS environment.
6. Set up appropriate security groups, load balancers, and DNS configuration for access.
7. Test the deployed application and API to ensure proper functionality.

For detailed instructions on deploying ASP.NET applications to AWS, refer to the official AWS documentation.

## Security Considerations

To ensure the security of the application and API, the following measures are implemented:

- User authentication using ASP.NET Identity to restrict unauthorized access to the application.
- Authentication mechanisms are added to the RESTful API endpoints to ensure only authenticated users can access the API.
- Security measures like input validation, parameterized queries, and stored procedures are implemented to prevent Cross-site scripting (XSS) and SQL Injection attacks.
- Regular security audits and code reviews should be conducted to identify and address any potential vulnerabilities.

Please note that while these measures provide a solid foundation for security, it's essential to continuously monitor and update the application's security practices to stay protected against evolving threats.

## Contributing

Contributions to this project are welcome. If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request on the project's GitHub repository.

## ScreenShot

![image](https://github.com/JessicaBlau/POC/assets/44636937/6fff4d89-5870-4ec9-96db-1db14b576168)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
