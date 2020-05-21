const fs = require('fs');
const path = require('path');
const Configstore = require('configstore');
const getNpmArgs = require('./getNpmArgs');
const getYarnArgs = require('./getYarnArgs');

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

function detectNpm() {
  return new Promise((resolve, reject) => {
    fs.access(
      path.resolve(process.cwd(), 'package-lock.json'),
      fs.constants.F_OK,
      (noPackageLock) => {
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
      (noYarnLock) => {
        resolve(noYarnLock ? false : true);
      },
    );
  });
}
