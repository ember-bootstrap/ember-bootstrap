const fs = require('fs-extra');
const resolve = require('path').resolve;
const join = require('path').join;
const chalk = require('chalk');
const rsvp = require('rsvp');
const ConfigBuilder = require('ember-cli-config-builder');

const wizard = require('./wizard');

const GEN_NAME = 'ember-bootstrap';
const BUILD_FILE = 'ember-cli-build.js';
const AVAILABLE_OPTIONS = [
  'bootstrapVersion',
  'importBootstrapTheme',
  'importBootstrapCSS',
  'importBootstrapFont',
  'insertEmberWormholeElementToDom',
  'whitelist'
];

function readConfig() {
  let configPath = resolve(BUILD_FILE);

  return ConfigBuilder.create(configPath).then(configBuilder => {
    let addonConfig = configBuilder.get(GEN_NAME);
    addonConfig = ConfigBuilder.parse(addonConfig);
    if (!addonConfig) {
      addonConfig = {};
    }

    return { addonConfig, configBuilder };
  });
}

function outputConfig(ui, config) {
  config = ConfigBuilder.stringify(config, null, '  ');
  ui.writeLine(
    chalk.red(
      `Configuration file could not be edited. Manually update your ${BUILD_FILE} to include '${GEN_NAME}': ${config}`
    )
  );
}

function normalizeOptions(options) {
  if (wizard.BS_VERSIONS.indexOf(options.bootstrapVersion) === -1) {
    options.bootstrapVersion = null;
  }

  if (wizard.PREPROCESSORS.indexOf(options.preprocessor) === -1) {
    options.preprocessor = null;
  }

  if (options.bootstrapVersion === 4 && options.preprocessor === 'less') {
    options.preprocessor = null;
  }
}

function normalizeConfig(config) {
  return Object.keys(config).reduce((acc, key) => {
    if (AVAILABLE_OPTIONS.indexOf(key) === -1) {
      return acc;
    }
    acc[key] = config[key];
    return acc;
  }, {});
}

function stringifyConfig(config) {
  return Object.keys(config).reduce((acc, key) => {
    acc[`${GEN_NAME}.${key}`] = ConfigBuilder.stringify(
      config[key],
      null,
      '  '
    );
    return acc;
  }, {});
}

module.exports = {
  name: GEN_NAME,

  description: 'Configure ember-bootstrap',

  works: 'insideProject',

  availableOptions: [
    { name: 'bootstrap-version', type: Number, aliases: ['bootstrap', 'bv'] },
    { name: 'preprocessor', type: String, aliases: ['pp'] }
  ],

  normalizeEntityName() {},

  addonConfig: {},
  configBuilder: null,

  beforeInstall(options) {
    normalizeOptions(options);
    // try to read config
    return (
      readConfig()
        .then(config => {
          // save config builder to use later
          this.configBuilder = config.configBuilder;
          // and pass addon config to the next chain
          return config.addonConfig;
        })
        // use empty object in case there are no way to read the current config
        .catch(() => ({}))
        .then(config => {
          config.bootstrapVersion = this._detectBootstrapVersion(
            options,
            config
          );
          config.preprocessor = this._detectPreprocessor(options);
          this.addonConfig = config;
          return this.ui.prompt(wizard.questions(options, config));
        })
        .then(answers => {
          this.addonConfig = Object.assign(
            wizard.defaults(answers),
            this.addonConfig,
            answers
          );
        })
    );
  },

  afterInstall() {
    return this.adjustPackages()
      .then(() => this.addStyleImport())
      .then(() => this.writeBuildConfig());
  },

  adjustPackages() {
    let packages = Object.assign(
      this._adjustBootstrapDependencies(),
      this._adjustPreprocessorDependencies()
    );
    let toRemove = [];
    let toAdd = [];

    for (let name in packages) {
      let pkg = packages[name];

      if (pkg[0] === 'remove') {
        toRemove.push({ name });
      } else if (pkg[0] === 'add') {
        toAdd.push({ name, target: pkg[1] });
      }
    }

    return this._removeBowerPackages()
      .then(() => {
        if (toRemove.length > 0) {
          return this.removePackagesFromProject(toRemove);
        }
      })
      .then(() => {
        if (toAdd.length > 0) {
          return this.addPackagesToProject(toAdd);
        }
      });
  },

  addStyleImport() {
    let preprocessor = this.addonConfig.preprocessor;
    if (preprocessor === 'none') {
      return;
    }

    let importStatement = '\n@import "ember-bootstrap/bootstrap";\n';
    let extension = preprocessor === 'sass' ? 'scss' : 'less';
    let stylesPath = join('app', 'styles');
    let filePath = join(stylesPath, `app.${extension}`);

    // Create styles folder if not exists
    if (!fs.existsSync(stylesPath)) {
      fs.mkdirSync(stylesPath);
    }

    let actionMessage = fs.existsSync(filePath)
      ? `Added import statement to ${filePath}`
      : `Created ${filePath}`;
    this.ui.writeLine(chalk.green(actionMessage));

    return this.insertIntoFile(filePath, importStatement);
  },

  writeBuildConfig() {
    let config = normalizeConfig(this.addonConfig);
    if (Object.keys(config).length === 0) {
      return;
    }
    let configBuilder = this.configBuilder;
    let ui = this.ui;

    if (configBuilder) {
      configBuilder.set(GEN_NAME, '{}');
      configBuilder.setProperties(stringifyConfig(config));
      return configBuilder
        .save()
        .then(() =>
          ui.writeLine(
            chalk.green(
              `Added ember-bootstrap configuration to '${BUILD_FILE}'.`
            )
          )
        )
        .catch(() => outputConfig(ui, config));
    }

    outputConfig(ui, config);
  },

  _removeBowerPackages() {
    let ui = this.ui;
    let packages = ['bootstrap', 'bootstrap-sass'];
    let dependencies = this.project.bowerDependencies();
    let bowerJSONPath = resolve('bower.json');

    let promises = packages.map(pkg => {
      if (pkg in dependencies) {
        ui.writeLine(
          chalk.green(`  uninstall bower package ${chalk.white(pkg)}`)
        );

        return fs.readJson(bowerJSONPath).then(bowerJSON => {
          delete bowerJSON.dependencies[pkg];
          return fs.writeJson(bowerJSONPath, bowerJSON, { spaces: 2 });
        });
      }
    });

    return rsvp.all(promises);
  },

  _adjustBootstrapDependencies() {
    let bs3Version = '^3.3.7';
    let bs4Version = '^4.0.0';
    let bootstrapVersion = this.addonConfig.bootstrapVersion;
    let preprocessor = this.addonConfig.preprocessor;
    let dependencies = this.project.dependencies();

    let packages = {};

    // We need bootstrap-sass package only for bs 3 and preprocessor sass
    // so in most cases we need to delete it if present
    if ('bootstrap-sass' in dependencies) {
      packages['bootstrap-sass'] = ['remove'];
    }

    // For BS 4 we need to install bootstrap package
    if (bootstrapVersion === 4) {
      packages.bootstrap = ['add', bs4Version];
    } else if (preprocessor === 'sass') {
      // For BS 3 and preprocessor sass we need install bootstrap-sass
      // and remove bootstrap if exists
      if ('bootstrap' in dependencies) {
        packages.bootstrap = ['remove'];
      }
      packages['bootstrap-sass'] = ['add', bs3Version];
    } else {
      // In any other case just install bootstrap package
      packages.bootstrap = ['add', bs3Version];
    }

    return packages;
  },

  _adjustPreprocessorDependencies() {
    let less = 'ember-cli-less';
    let sass = 'ember-cli-sass';
    let preprocessor = this.addonConfig.preprocessor;
    let dependencies = this.project.dependencies();
    let packages = {};

    if (preprocessor === 'less') {
      // remove sass if present
      if (sass in dependencies) packages[sass] = ['remove'];
      // install less if absent
      if (!(less in dependencies)) packages[less] = ['add'];
    } else if (preprocessor === 'sass') {
      // remove less if present
      if (less in dependencies) packages[less] = ['remove'];
      // install sass if absent
      if (!(sass in dependencies)) packages[sass] = ['add'];
    }

    return packages;
  },

  _detectPreprocessor(options) {
    let preprocessor = options.preprocessor;
    // if there is no preprocessor detect it by dependencies
    if (!preprocessor) {
      let dependencies = this.project.dependencies();

      if ('ember-cli-sass' in dependencies) {
        preprocessor = 'sass';
      } else if ('ember-cli-less' in dependencies) {
        preprocessor = 'less';
      } else {
        preprocessor = 'none';
      }
    }
    // set preprocessor to 'none' if BS4 is used with less
    if (options.bootstrapVersion === 4 && preprocessor === 'less') {
      preprocessor = 'none';
    }
    return preprocessor;
  },

  _detectBootstrapVersion(options, config) {
    let bootstrapVersion = options.bootstrapVersion;

    if (!bootstrapVersion) {
      bootstrapVersion = config.bootstrapVersion || 3;
    }

    return bootstrapVersion;
  }
};
