// link to page creation
const generateHTML = require("./src/generateHTML");

// team profiles
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// node modules
const fs = require("fs");
const inquirer = require("inquirer");


const teamArray = [];

const addManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Who is the manager of this team?",
        validate: (managerName) => {
          if (managerName) {
            return true;
          } else {
            console.log("Please enter the manager's name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the manager's ID.",
        validate: (managerIdInput) => {
          if (managerIdInput) {
            return true;
          } else {
            console.log("Please enter the manager's ID!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the manager's email.",
        validate: (managerEmail) => {
          if (managerEmail) {
            return true;
          } else {
            console.log("Please enter an email!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter the manager's office number",
        validate: (officeNumber) => {
          if (officeNumber) {
            return true;
          } else {
            console.log("Please enter an office number!");
            return false;
          }
        },
      },
    ])
    .then((managerInput) => {
      const { name, id, email, officeNumber } = managerInput;
      const manager = new Manager(name, id, email, officeNumber);

      teamArray.push(manager);
      console.log(manager);
    });
};

//This is to add employees
const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please choose your employee's role",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What's the name of the employee?",
        validate: (employeeName) => {
          if (employeeName) {
            return true;
          } else {
            console.log("Please enter an employee's name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the employee's ID.",
        validate: (employeeId) => {
          if (employeeId) {
            return true;
          } else {
            console.log("Please enter the employee's ID!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the employee's email.",
        validate: (employeeEmail) => {
          if (employeeEmail) {
            return true;
          } else {
            console.log("Please enter an email!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "github",
        message: "Please enter the employee's github username.",
        when: (input) => input.role === "Engineer",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the employee's github username!");
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the intern's school",
        when: (input) => input.role === "Intern",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the intern's school!");
          }
        },
      },
      {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "Would you like to add more team members?",
        default: false,
      },
    ])
    .then((employeeData) => {

      // this provides data for employee types

      let { name, id, email, role, github, school, confirmAddEmployee } =
        employeeData;
      let employee;

      if (role === "Engineer") {
        employee = new Engineer(name, id, email, github);

        console.log(employee);
      } else if (role === "Intern") {
        employee = new Intern(name, id, email, school);

        console.log(employee);
      }

      teamArray.push(employee);

      if (confirmAddEmployee) {
        return addEmployee(teamArray);
      } else {
        return teamArray;
      }
    });
};

// this is the function to generate HTML page file using file system
const writeFile = (data) => {
  fs.writeFile("./dist/index.html", data, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(
        "Your team profile has been successfully created! Please check out the index.html"
      );
    }
  });
};

addManager()
  .then(addEmployee)
  .then((teamArray) => {
    return generateHTML(teamArray);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });
