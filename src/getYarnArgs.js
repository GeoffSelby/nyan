const minimist = require('minimist');
const { transformPackageString } = require('./util');

module.exports = (args) => {
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
};
