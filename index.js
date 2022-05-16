const inquirer = require('inquirer');
const generate = require("./src/page-template");
const { writeFile } = require("./util/generate-readme");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your README?",
      validate: (titleInput) => {
        if (titleInput) {
          return true;
        } else {
          console.log("Please enter title");
          return false;
        }
      },
    },
    {
        type: "input",
        name: "description",
        message: "What is the description of your README?",
        validate: (descriptionInput) => {
          if (descriptionInput) {
            return true;
          } else {
            console.log("Please enter title");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "Installation",
        message: "What will the installation instructions be?",
        validate: (installationInput) => {
          if (installationInput) {
            return true;
          } else {
            console.log("Please enter title");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "Usage",
        message: "What will the usage information be?",
        validate: (UsageInput) => {
          if (UsageInput) {
            return true;
          } else {
            console.log("Please enter title");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "Contributors",
        message: "Who are the contributors?",
        validate: (contributorInput) => {
          if (contributorInput) {
            return true;
          } else {
            console.log("Please enter title");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "Tests",
        message: "What are the included tests or test methods?",
        validate: (testInput) => {
          if (testInput) {
            return true;
          } else {
            console.log("Please enter title");
            return false;
          }
        },
      },

  ]);
};
const promptProject = readmeData => {
    if (!readmeData.info) {
        readmeData.info = []; 
    }
    return inquirer
        .prompt([
            {
                type: 'checkbox',
                name: 'license',
                message: 'Which license did you use with this project?',
                choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'LGPL 2.1', 'BSD 3', 'Microsoft Public' ]
              },
              {
                type: "input",
                name: "Github Username",
                message: "What is your Github username?",
                validate: (usernameInput) => {
                  if (usernameInput) {
                    return true;
                  } else {
                    console.log("Please enter username!");
                    return false;
                  }
                },
              },
              {
                type: "input",
                name: "Email",
                message: "What is your Email address?",
                validate: (emailInput) => {
                  if (emailInput) {
                    return true;
                  } else {
                    console.log("Please enter your email!");
                    return false;
                  }
                },
              }
        ])
        .then(badgeQData => {
            readmeData.info.push(badgeQData);
            if (badgeQData.choices) {
                return promptProject(readmeData);
            } else {
                return readmeData; 
            }
        }); 
}
promptUser()
    .then(promptProject)
    .then(readmeData => {
        return generate(readmeData);
    })
    .then(readmePage => {
        return writeFile(readmePage); 
    })
// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README