const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const validateNpmPackageName = require('validate-npm-package-name');
const Configstore = require('configstore');

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json')),
);
const config = new Configstore(packageJson.name);

exports.getArgs = function getArgs(args, packageManager) {
  if (packageManager === 'npm') {
    return getNpmArgs(args);
  } else {
    return getYarnArgs(args);
  }
};

exports.detectPackageManager = async function detectPackageManager() {
  const isNpm = await detectNpm();
  const isYarn = await detectYarn();

  if (isNpm) {
    return 'npm';
  }

  if (isYarn) {
    return 'yarn';
  }

  return config.get('preferredManager');
};

function getNpmArgs(args) {
  const devArgs = minimist(args, { boolean: ['dev', 'D', 'save-dev'] });
  const commands = devArgs._;
  const target = commands.length > 0 ? commands[0] : 'install';
  const subCommands = commands.slice(1);
  let npmTarget;
  let npmArgs;
  let packages;
  let saveType;
  switch (target) {
    case 'install':
      npmTarget = 'install';
      if (subCommands.length > 0) {
        packages = subCommands.map(transformPackageString);
        saveType = devArgs['save-dev'] || devArgs.D ? '--save-dev' : '--save';
        npmArgs = [saveType, ...packages];
      } else {
        npmArgs = [];
      }
      break;
    case 'add':
      npmTarget = 'install';
      packages = subCommands.map(transformPackageString);
      saveType = devArgs.dev || devArgs.D ? '--save-dev' : '--save';
      npmArgs = [saveType, ...packages];
      break;
    case 'upgrade':
      npmTarget = 'update';
      npmArgs = subCommands;
      break;
    case 'update':
      npmTarget = 'update';
      npmArgs = subCommands;
      break;
    case 'uninstall':
      npmTarget = 'uninstall';
      npmArgs = subCommands;
      break;
    case 'remove':
      npmTarget = 'uninstall';
      npmArgs = subCommands;
      break;
    case 'init':
      npmTarget = 'init';
      npmArgs = [];
      break;
    case 'version':
      npmTarget = 'version';
      npmArgs = subCommands;
      break;
    case 'publish':
      npmTarget = 'publish';
      npmArgs = [];
      break;
    default:
      npmTarget = 'run';
      if (args.length > 1) {
        npmArgs = [args[0], ...args.slice(1)];

        if (args[0] === 'run') {
          npmTarget = null;
        }
      } else {
        npmArgs = args;
      }
      break;
  }

  if (npmTarget) {
    return [npmTarget, ...npmArgs];
  }

  return [...npmArgs];
}

function getYarnArgs(args) {
  const devArgs = minimist(args, { boolean: ['dev', 'D', 'save-dev'] });
  const commands = devArgs._;
  const target = commands.length > 0 ? commands[0] : 'yarn';
  const subCommands = commands.slice(1);
  let yarnTarget;
  let yarnArgs;
  let packages;
  let saveType;

  switch (target) {
    case 'yarn':
      yarnTarget = '';
      yarnArgs = [];
      break;
    case 'add':
      yarnTarget = 'add';
      packages = subCommands.map(transformPackageString);
      saveType = devArgs.dev || devArgs.D ? '-D' : null;
      if (saveType) {
        yarnArgs = [saveType, ...packages];
      } else {
        yarnArgs = [...packages];
      }
      break;
    case 'install':
      yarnTarget = 'add';
      packages = subCommands.map(transformPackageString);
      saveType = devArgs['save-dev'] || devArgs.D ? '-D' : null;
      if (saveType) {
        yarnArgs = [saveType, ...packages];
      } else {
        yarnArgs = [...packages];
      }
      break;
    case 'upgrade':
      yarnTarget = 'upgrade';
      yarnArgs = subCommands;
      break;
    case 'update':
      yarnTarget = 'upgrade';
      yarnArgs = subCommands;
      break;
    case 'remove':
      yarnTarget = 'remove';
      yarnArgs = subCommands;
      break;
    case 'uninstall':
      yarnTarget = 'remove';
      yarnArgs = subCommands;
      break;
    case 'init':
      yarnTarget = 'init';
      yarnArgs = [];
      break;
    case 'version':
      yarnTarget = 'version';
      yarnArgs = subCommands;
      break;
    case 'publish':
      yarnTarget = 'publish';
      yarnArgs = [];
      break;
    default:
      yarnTarget = null;
      if (args.length > 1) {
        if (args[0] === 'run') {
          yarnArgs = [...args.slice(1)];
        } else {
          yarnArgs = [args[0], ...args.slice(1)];
        }
      } else {
        yarnArgs = args;
      }
      break;
  }

  if (yarnTarget) {
    return [yarnTarget, ...yarnArgs];
  }

  return [...yarnArgs];
}

function transformPackageString(packageToAdd) {
  packageToAdd = packageToAdd.replace('file:', '');
  const packageNameWithoutVersion = packageToAdd.slice(
    0,
    packageToAdd.indexOf('@') > 0
      ? packageToAdd.lastIndexOf('@')
      : packageToAdd.length + 1,
  );

  const isValidPackageName = validateNpmPackageName(packageNameWithoutVersion)
    .validForNewPackages;

  if (isValidPackageName && packageNameWithoutVersion === packageToAdd) {
    return `${packageToAdd}@latest`;
  } else {
    return packageToAdd;
  }
}

function detectNpm() {
  return new Promise((resolve, reject) => {
    fs.access(
      path.resolve(process.cwd(), 'package-lock.json'),
      fs.constants.F_OK,
      noPackageLock => {
        resolve(noPackageLock ? false : true);
      },
    );
  });
}

function detectYarn() {
  return new Promise((resolve, reject) => {
    fs.access(
      path.resolve(process.cwd(), 'yarn.lock'),
      fs.constants.F_OK,
      noYarnLock => {
        resolve(noYarnLock ? false : true);
      },
    );
  });
}
