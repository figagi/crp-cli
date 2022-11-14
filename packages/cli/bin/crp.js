#!/usr/bin/env node

/**
 * @author stark.wang
 * @contact me https://shudong.wang/about
 * The front-end architecture starts here
 */


const program = require('commander');
const chalk = require('chalk');
const minimist = require('minimist');
const { version, testName } = require('../package.json');
const privateName = '@crpjs'

program
  .command('create <app-name>')
  .description('create a new project powered by crp-cli')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .action((name, options) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.info(
        chalk.yellow(
          "\n Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored.",
        ),
      );
    }
    // --git makes commander to default git to true
    if (process.argv.includes('-g') || process.argv.includes('--git')) {
      options.forceGit = true;
    }
    require(`${privateName}/cli-create`)(name, options);
  });

program
  .command('run')
  .description('start project server')
  .option('-e, --env <env>', 'Overwrite target directory if it exists')
  .option('-m, --mode <mode>', 'Overwrite target directory if it exists')
  .action((...args) => require(`${privateName}/cli-run`)(...args));

// program
//   .command("init")
//   .description("init project config file")
//   .action(require("../lib/init"));

program.version(`v${version}`, '-v, --version');

program.on('command:*', ([cmd]) => {
  program.outputHelp();
  console.info(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.info();
  suggestCommands(cmd);
  process.exitCode = 1;
});

program.commands.forEach((c) => c.on('--help', () => console.info()));

program.on('--help', () => {
  console.info();
  console.info(`  Run ${chalk.cyan(`fig <command> --help`)} for detailed usage of given command.`);
  console.info();
});

program.parse(process.argv);
