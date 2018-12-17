#!/usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const download = require("download-git-repo");
const ora = require('ora');

program
  .version("0.0.0")
  .command("init")
  .description("init project by github template repo")
  .action(async () => {
    const choices = ["puzzles", "react-rx-store", "react-rx-form", "react-ts-rx-infrastructure"];
    const questions = [{
      type: "list",
      name: "repo",
      message: "which repo do you want to install?",
      choices
    }];

    const answers = await inquirer.prompt(questions);
    const repo = answers.repo;
    const spinner = ora(`Downloading ${repo}...`);
    spinner.start();
    download(`reeli/${repo}`, "./test", {clone: true}, (error) => {
      error
        ? spinner.fail(`Downloaded ${repo} failed`)
        : spinner.succeed(`Downloaded ${repo} success`);
      spinner.stop();
    })
  });

// use parse method to invoking commands
program.parse(process.argv);
