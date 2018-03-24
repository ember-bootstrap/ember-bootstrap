const chalk = require('chalk');
const path = require('path');
const fg = require('fast-glob');

const PREPROCESSORS = ['none', 'sass', 'less'];
const BS_VERSIONS = [3, 4];

const GUARD = {
  customInstall(config, answers) {
    return answers.customInstall;
  },
  bs3(config, answers) {
    return config.bootstrapVersion === 3 || answers.bootstrapVersion === 3;
  },
  noPreprocessor(config, answers) {
    return !config.preprocessor || config.preprocessor === 'none' || answers.preprocessor === 'none';
  }
};

function buildGuards(config) {
  return (...guards) => (answers) => guards.every((g) => g(config, answers));
}

function defaults(answers) {
  return ({
    bootstrapVersion: 3,
    preprocessor: 'none',
    importBootstrapTheme: false,
    importBootstrapCSS: answers.preprocessor === 'none',
    importBootstrapFont: answers.bootstrapVersion === 3,
    insertEmberWormholeElementToDom: true,
    whitelist: [],
    blacklist: []
  });
}

function getDefault(config, key, fallback) {
  if (config.hasOwnProperty(key)) {
    return config[key];
  }
  return fallback;
}

function buildComponentsChoices(answers) {
  let componentsPath = path.resolve('app', 'components', '*.js');
  return fg(componentsPath)
    .then((files) => files.map((file) => path.basename(file, '.js')))
    .then((components) => {
      return components.map((component) => ({
        name: component.replace('bs-', ''),
        value: component,
        checked: answers.indexOf(component) !== -1
      }));
    });
}

function questions(options, config) {
  let mergedConfig = Object.assign({}, config, options);
  let guards = buildGuards(mergedConfig);

  return [
    {
      name: 'customInstall',
      message: 'Do you want to customize installation of ember-bootstrap?',
      type: 'confirm',
      default: false,
    },
    {
      name: 'bootstrapVersion',
      message: 'Choose desired Bootstrap version:',
      type: 'list',
      default: BS_VERSIONS.indexOf(config.bootstrapVersion || 3),
      choices: BS_VERSIONS.map((v) => ({ name: 'v' + v, value: v })),
      when: !options.bootstrapVersion
    },
    {
      name: 'preprocessor',
      message: 'Choose your CSS preprocessor:',
      type: 'list',
      default: PREPROCESSORS.indexOf(config.preprocessor || 'none'),
      choices(answers) {
        let preprocessors = PREPROCESSORS;
        if (answers.bootstrapVersion === 4) {
          preprocessors = preprocessors.slice(0, -1);
        }
        return preprocessors;
      },
      when: !options.preprocessor
    },
    {
      name: 'importBootstrapTheme',
      message: 'Do you want to include the optional bootstrap-theme.css?',
      type: 'confirm',
      default: getDefault(config, 'importBootstrapTheme', false),
      when: guards(GUARD.customInstall, GUARD.bs3, GUARD.noPreprocessor)
    },
    {
      name: 'importBootstrapCSS',
      message: 'Do you want to include the default static bootstrap.css?',
      type: 'confirm',
      default: getDefault(config, 'importBootstrapCSS', true),
      when: guards(GUARD.customInstall, GUARD.noPreprocessor)
    },
    {
      name: 'importBootstrapFont',
      message: 'Do you want to include the Glyphicons font?',
      type: 'confirm',
      default: getDefault(config, 'importBootstrapFont', true),
      when: guards(GUARD.customInstall, GUARD.bs3)
    },
    {
      name: 'insertEmberWormholeElementToDom',
      message: 'Do you want to automatically insert a div into your index.html, where Bootstrap\'s modals and tooltips will be rendered to.\n' +
               chalk.red('If you set this to false, you will have to add an <div id="ember-bootstrap-wormhole"></div> element by yourself.'),
      type: 'confirm',
      default: getDefault(config, 'insertEmberWormholeElementToDom', true),
      when: guards(GUARD.customInstall)
    },
    {
      name: 'whitelist',
      message: 'Include only the chosen components into your build, to reduce your JavaScript bundle size.\n' +
               chalk.red('Excluded components will not be available.'),
      type: 'checkbox',
      choices: buildComponentsChoices,
      when: guards(GUARD.customInstall)
    }
  ];
}

module.exports = {
  questions,
  PREPROCESSORS,
  BS_VERSIONS,
  defaults
};
