const minimist = require('minimist');
const { transformPackageString } = require('./util');

module.exports = (args) => {
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
};
