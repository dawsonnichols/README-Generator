const inquirer = require("inquirer");
// const generate = require("./src/page-template");
// const { writeFile } = require("./util/generateMarkdown");
const fs = require("fs");
const fetch = require("node-fetch"); 

inquirer
  .prompt([
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
      name: "installation",
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
      name: "usage",
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
      name: "contributors",
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
      name: "tests",
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
    {
      type: "list",
      name: "license",
      message: "Which license did you use with this project?",
      choices: [
        "MIT",
        "Apache",
        "GPL",
        "LGPL",
        "BSD",
        "Microsoft",
      ],
    },
    {
      type: "input",
      name: "github",
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
  .then((answers) => {
    console.log(answers);
    fetch(`https://api.github.com/users/${answers.github}`)
    .then( data => {
      console.log(data)
      return data.json(); 
    })
    
    

    
    .then( (githubResponse) => {
      let readmeFile = 
      ` ![badge](https://img.shields.io/badge/license-${answers.license}-orange.svg)
      # ${answers.title} 
      # Table of Contents
      1. [description](#description)
      2. [Installation](#installation) 
      3. [Usage](#usage)
      4. [Contributors](#contributors)
      5. [Tests](#tests)
      6. [Github](#github)
      7. [Email](#email)
      
      
      ## Description 
      ${answers.description}
      ### Installation
      ${answers.installation}
      ### Usage
      ${answers.usage} 
      ### Contributors
      ${answers.contributors}
      ### Tests
      ${answers.tests}
      ### Github
      ${githubResponse.html_url} 
      ### Email 
      ${answers.Email}
`

fs.writeFile("./dist/readme.md", readmeFile, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("you did it");
  }
});
    }) 
});

