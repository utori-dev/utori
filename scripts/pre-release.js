const fs = require('fs');
const path = require('path');

/**
 * Root directory of the package.
 * @type {string}
 */
const root = path.dirname(__dirname);

/**
 * Files from the root directory that will be copied to the `dist` directory.
 * @type {string[]}
 */
const includedRootFiles = ['README.md', 'LICENSE'];

/**
 * Directory containing files that will be copied to the `dist` directory.
 *
 * This is not the `src` directory, as those files have not been built.
 * Thereforre, they should not be included in the published package.
 *
 * @type {string}
 */
const src = path.join(root, 'build');

/**
 * Directory that will contain the assets that will be published.
 *
 * @type {string}
 */
const dist = path.join(root, 'dist');

/**
 * Synchronously copy the source path to the destination directory.
 *
 * @param {object} options Options for copying the asset.
 * @param {string} options.entry Name of the item to copy. If specified, `options.source` should be a directory.
 * @param {string} options.source Source path, this can be a file or directory. If `options.entry` is specified, this should be a directory.
 * @param {string} options.destination Destination path, this should be the same type or path as `source`.
 */
function copyDistributionAsset(options) {
  const { source: rawSource, entry = '', destination: rawDestination = dist } = options;

  const source = path.join(rawSource, entry);
  const destination = path.join(rawDestination, entry);

  if (!fs.existsSync(source)) throw new Error(`'${source}' does not exist.`);

  const isDirectory = fs.lstatSync(source).isDirectory();

  if (!isDirectory) {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
    return;
  }

  fs.readdirSync(source).forEach((entry) => {
    copyDistributionAsset({ source, destination, entry });
  });
}

/**
 * Write the `package.json` file for the package that will be published.
 *
 * @param {object} options Options for writing the `package.json` file.
 * @param {string} options.source Source directory for the `package.json` file. Defaults to `root`.
 * @param {string} options.destination Destination directory for the `package.json` file. Defaults to `dist`.
 * @param {string} options.file Name of the `package.json` file. Defaults to `'package.json'`.
 * @param {string[]} options.exclude Properties to exclude from the generated `package.json` file.
 * @param {Record<string, any>} options.override Properties to override in the generated `package.json` file.
 * @param {string[]} options.order Order of the properties.
 */
function writeDistributionPackageJson(options = {}) {
  const {
    source = root,
    destination = dist,
    file = 'package.json',
    exclude = ['devDependencies', 'prepublishOnly', 'private', 'scripts'],
    override = {
      main: 'index.js',
      types: 'index.d.ts',
    },
    order = [
      'name',
      'version',
      'description',
      'main',
      'types',
      'keywords',
      'homepage',
      'repository',
      'bugs',
      'license',
      'author',
      'dependencies',
    ],
  } = options;

  const getPropertyOrder = (property) => order.indexOf(property) + 1 || order.length;
  const comparePropertyOrder = (propertyA, propertyB) => getPropertyOrder(propertyA) - getPropertyOrder(propertyB);

  const sourcePath = path.join(source, file);
  const destinationPath = path.join(destination, file);

  const sourcePackageJson = require(sourcePath);
  const distributionPackageJson = {};

  const overrideProperties = Object.keys(override);
  const sourceProperties = Object.keys(sourcePackageJson);

  const properties = Array.from(new Set([...sourceProperties, ...overrideProperties])).sort(comparePropertyOrder);

  properties.forEach((property) => {
    if (exclude.includes(property)) return;
    if (override) distributionPackageJson[property] = sourcePackageJson[property];
  });

  const contents = JSON.stringify({ ...distributionPackageJson, ...override }, null, 2);

  fs.writeFileSync(destinationPath, contents);
}

/**
 * Create the package that will be published.
 */
function createDistributionPackage() {
  copyDistributionAsset({ source: src });

  includedRootFiles.forEach((entry) => {
    copyDistributionAsset({ entry, source: root });
  });

  writeDistributionPackageJson();
}

createDistributionPackage();
