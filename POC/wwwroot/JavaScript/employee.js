// To do: Take token out of client side 

// View a list of all employees
function loadEmployees() {
    var employeeList = document.getElementById('employeeItems');
    employeeList.innerHTML = ''; // Clear the employee list

    // Perform an AJAX request to retrieve the token from the API endpoint
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/employees/token', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var token = xhr.responseText;

            // Perform an AJAX request to retrieve the list of employees
            var employeesXhr = new XMLHttpRequest();
            employeesXhr.open('GET', '/api/employees', true);

            // Add the Authorization header with the token
            employeesXhr.setRequestHeader('Authorization', 'Bearer ' + token);

            employeesXhr.onload = function () {
                if (employeesXhr.status === 200) {
                    var employees = JSON.parse(employeesXhr.responseText);

                    // Populate the employee list container
                    employees.forEach(function (employee) {
                        var li = document.createElement('li');
                        li.textContent = employee.name;
                        li.addEventListener('click', function () {
                            loadEmployeeDetails(employee.id);
                        });
                        employeeList.appendChild(li);
                    });
                } else {
                    console.log('Failed to retrieve employees');
                }
            };
            employeesXhr.send();
        } else {
            console.log('Failed to retrieve token');
        }
    };
    xhr.send();
}



// Provide id for new employee 
function provideIdCheck() {
    var idLabel = document.getElementById('idLabel');
    var employeeId = document.getElementById('employeeId');
    if (employeeId.style.display === "none" && idLabel.style.display === "none") {
        employeeId.style.display = "block";
        idLabel.style.display = "block";
    } else {
        employeeId.style.display = "none";
        idLabel.style.display = "none";
    }
}


// Add a new employee
var addEmployeeForm = document.getElementById('addEmployeeForm');
var addForm = document.getElementById('employeeForm');
addForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    if (document.getElementById('employeeId').value <= 0) {
        document.getElementById('employeeId').value = 0;
    }

    var formValues = {
        id: document.getElementById('employeeId').value,
        name: document.getElementById('name').value,
        job: document.getElementById('job').value,
        title: document.getElementById('title').value,
        age: document.getElementById('age').value,
        company: document.getElementById('company').value,
        workstationNo: document.getElementById('workstationNo').value,
        site: document.getElementById('site').value
    };
    // Perform an AJAX request to add the new employee
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/employees', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Perform an AJAX request to retrieve the token from the server
    var tokenRequest = new XMLHttpRequest();
    tokenRequest.open('GET', '/api/employees/token', true);
    tokenRequest.onload = function () {
        if (tokenRequest.status === 200) {
            var token = tokenRequest.responseText;

            // Add the Authorization header with the retrieved token
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    var newEmployeeID = JSON.parse(xhr.responseText);
                    console.log('New employee ID:', newEmployeeID);
                    // Refresh the employee list and dropdown list
                    loadEmployees();
                    fetchEmployeeIds()
                } else {
                    console.log('Failed to add employee');
                }
            };
            xhr.send(JSON.stringify(formValues));
        } else {
            console.log('Failed to retrieve token');
        }
    };
    tokenRequest.send();

    // Clear the form inputs
    addForm.reset();
});

function loadEmployeeDetails(employeeId) {
    // Perform an AJAX request to retrieve the token from the server
    var tokenRequest = new XMLHttpRequest();
    tokenRequest.open('GET', '/api/employees/token', true);
    tokenRequest.onload = function () {
        if (tokenRequest.status === 200) {
            var token = tokenRequest.responseText;

            // Perform an AJAX request to retrieve the employee details
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/employees/' + employeeId, true);

            // Add the Authorization header with the retrieved token
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    var employee = JSON.parse(xhr.responseText);

                    // Populate the employee details container
                    var employeeDetails = document.getElementById('employeeInfo');
                    employeeDetails.innerHTML = '<p>Id: ' + employee.id + '</p>' +
                        '<p>Name: ' + employee.name + '</p>' +
                        '<p>Job: ' + employee.job + '</p>' +
                        '<p>Title: ' + employee.title + '</p>' +
                        '<p>Age: ' + employee.age + '</p>' +
                        '<p>Company: ' + employee.company + '</p>';
                } else {
                    console.log('Failed to retrieve employee details');
                }
            };
            xhr.send();
        } else {
            console.log('Failed to retrieve token');
        }
    };
    tokenRequest.send();
}


// Update information about a single employee
var updateEmployeeForm = document.getElementById('updateEmployeeForm');
var updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    var employeeId = document.getElementById('employeeId').value;
    var formValues = {
        name: document.getElementById('updateName').value,
        job: document.getElementById('updateJob').value,
        title: document.getElementById('updateTitle').value,
        age: document.getElementById('updateAge').value,
        company: document.getElementById('updateCompany').value,
        workstationNo: document.getElementById('updateWorkstationNo').value,
        site: document.getElementById('updateSite').value
    };

    // Perform an AJAX request to update the employee
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/api/employees/' + employeeId, true);

    // Perform an AJAX request to retrieve the token from the server
    var tokenRequest = new XMLHttpRequest();
    tokenRequest.open('GET', '/api/employees/token', true);
    tokenRequest.onload = function () {
        if (tokenRequest.status === 200) {
            var token = tokenRequest.responseText;

            // Add the Authorization header with the retrieved token
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log('Employee updated');
                    // Refresh the employee details
                    loadEmployeeDetails(employeeId);
                } else {
                    console.log('Failed to update employee');
                }
            };
            xhr.send(JSON.stringify(formValues));
        } else {
            console.log('Failed to retrieve token');
        }
    };
    tokenRequest.send();

});

// Get the select element
var select = document.getElementById('ids');

// Function to fetch the employee IDs from the API
function fetchEmployeeIds() {
    // Make an AJAX request to retrieve the token from the server
    $.ajax({
        url: '/api/employees/token',
        method: 'GET',
        success: function (token) {
            // Include the retrieved token in the headers of the subsequent request
            $.ajax({
                url: '/api/employees', // Replace with your API endpoint
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function (response) {
                    var employees = response;

                    select.innerHTML = "";

                    var option = document.createElement('option');
                    option.value = "-1";
                    option.textContent = "select";
                    select.appendChild(option);

                    // Loop through the employees and add options to the select dropdown
                    employees.forEach(function (employee) {
                        var option = document.createElement('option');
                        option.value = employee.id;
                        option.textContent = "Id: " + employee.id + "Name: " + employee.name;
                        select.appendChild(option);
                    });
                },
                error: function (error) {
                    console.log('Failed to fetch employee IDs');
                }
            });
        },
        error: function (error) {
            console.log('Failed to retrieve token');
        }
    });

}

// Call the fetchEmployeeIds function to populate the dropdown on page load
fetchEmployeeIds();

// Delete a single employee
var deleteEmployeeForm = document.getElementById('deleteEmployeeForm');
var deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', function () {
    var employeeId =  document.getElementById('ids').value;
    var confirmation = confirm('Are you sure you want to delete this employee?');
    if (confirmation) {
        deleteEmployee(employeeId);
    }
});

function deleteEmployee(employeeId) {
    // Retrieve the token from the cache
    var tokenXhr = new XMLHttpRequest();
    tokenXhr.open('GET', '/api/employees/token', true);
    tokenXhr.onload = function () {
        if (tokenXhr.status === 200) {
            var token = tokenXhr.responseText;

            // Perform an AJAX request to delete the employee
            var xhr = new XMLHttpRequest();
            xhr.open('DELETE', '/api/employees/' + employeeId, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + token); // Include the token in the request header
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log('Employee deleted successfully');
                    // Clear the employee details
                    var employeeInfo = document.getElementById('employeeInfo');
                    employeeInfo.innerHTML = '';
                    // Refresh the employee list
                    loadEmployees();
                } else {
                    console.log('Failed to delete employee');
                }
            };
            xhr.send();
            document.getElementById('ids').value = "-1";
        } else {
            console.log('Failed to retrieve token from cache');
        }
    };
    tokenXhr.send();
}



// Load employees on page load
loadEmployees();
