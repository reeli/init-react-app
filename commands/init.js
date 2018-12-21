#!/usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const download = require("download-git-repo");
const ora = require("ora");
const fs = require("fs");
const path = require("path");

program
  .version("0.0.0")
  .command("init")
  .description("init project by github template repo")
  .action(async () => {
    const choices = ["simple", "complete"];
    const questions = [
      {
        type: "list",
        name: "repo",
        message: "which repo do you want to install?",
        choices,
      },
      {
        type: "input",
        name: "name",
        message: "Please type the project name",
        validate: function(input) {
          const done = this.async();
          if (input.length === 0) {
            done("Must type the project name.");
            return;
          }
          if (fs.existsSync(input)) {
            done("The project name already exists, please type another one.");
            return;
          }
          done(null, true);
        },
      },
    ];

    const { repo, name } = await inquirer.prompt(questions);
    const spinner = ora(`Downloading ${repo}...`);

    spinner.start();
    download(`reeli/react-sample-repo#${repo}`, path.resolve(process.cwd(), name), { clone: true }, (error) => {
      error ? spinner.fail(`Downloaded ${repo} failed`) : spinner.succeed(`Downloaded ${repo} success`);
      spinner.stop();
    });
  });

// use parse method to invoking commands
program.parse(process.argv);
