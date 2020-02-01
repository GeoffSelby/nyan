#!/usr/bin/env node
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const Configstore = require('configstore');
const { detectPackageManager, getArgs } = require('../src');

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json')),
);
const config = new Configstore(packageJson.name);

async function run() {
  const args = process.argv.slice(2);
  let command;
  let commandArgs;

  if (!config.has('preferredManager')) {
    config.set('preferredManager', 'yarn');
  }

  const packageManager = await detectPackageManager();
  command = packageManager;

  const firstArg = args.length > 0 ? args[0] : null;
  if (firstArg === '--version' || firstArg === '-v') {
    console.info(packageJson.version);
    process.exit(0);
  } else if (firstArg === 'config') {
    if (args[1] === 'set') {
      config.set(args[2], args[3]);
      console.info(`${args[2]} is now set as ${args[3]}`);
      process.exit(0);
    }
  } else {
    commandArgs = getArgs(args, packageManager);
  }

  command = commandArgs.command || command;

  console.info(`${command} ${commandArgs.join(' ')}`);
  spawn(command, commandArgs, { stdio: 'inherit', shell: true });
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
