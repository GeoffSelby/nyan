const validateNpmPackageName = require('validate-npm-package-name');

exports.transformPackageString = function transformPackageString(packageToAdd) {
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
};
