'use strict';

module.exports = {
  name: 'bootstrap:info',
  description: 'Print information on your Bootstrap environment',

  availableOptions: [],
  works: 'insideProject',

  run() {
    let InfoTask = require('../tasks/info');

    let testTask = new InfoTask({
      ui: this.ui
    });

    return testTask.run(this.project.root);
  }
};
