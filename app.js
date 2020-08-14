const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
createEmployee();
function createEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the employee.'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter an ID for the Employee.'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the email of the employee.'
        },
        {
            type: 'list',
            name: 'role',
            message: 'Choose a role for the employee.',
            choices: ['Manager', 'Engineer', 'Intern']
        }
    ]).then(answers => {
        switch(answers.role) {
            case 'Manager':
                inquirer.prompt({
                    type: 'input', 
                    name: 'officeNumber', 
                    message: 'Enter the office number of the manager.'})
                    .then(role => {
                        const manager = new Manager(answers.name, answers.id, answers.email, role.officeNumber);
                        employees.push(manager);
                        addMore();
                    })
                break;
            case 'Engineer':
                inquirer.prompt({
                    type: 'input', 
                    name: 'github', 
                    message: 'Enter the github of the employee.'})
                    .then(role => {
                        const engineer = new Engineer(answers.name, answers.id, answers.email, role.github);
                        employees.push(engineer);
                        addMore();
                    })
                break;
            case 'Intern':
                inquirer.prompt({
                    type: 'input', 
                    name: 'school', 
                    message: 'Enter the school of the employee.'})
                    .then(role => {
                        const intern = new Intern(answers.name, answers.id, answers.email, role.school);
                        employees.push(intern);
                        addMore();
                    })
                break;
        }

    }); 
}

function addMore() {
    inquirer.prompt({
        type: 'list', 
        name: 'again', 
        message: 'Enter another employee?', 
        choices:['yes', 'no']})
    .then(confirmation => {
        if (confirmation.again === 'yes') createEmployee();
        else {
            fs.writeFile(outputPath, render(employees), function(err) {
                if(err) console.log(err);
            });
        }
    });
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
