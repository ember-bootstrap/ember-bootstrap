'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      plugins: [
        require.resolve('ember-concurrency/async-arrow-task-transform'),
      ],
    },
    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
    'ember-prism': {
      components: ['markup-templating', 'handlebars', 'javascript'],
      plugins: ['line-numbers'],
    },
    prember: {
      urls: [
        '/',
        '/components',
        '/components/accordion',
        '/components/alert',
        '/components/button',
        '/components/button-group',
        '/components/carousel',
        '/components/collapse',
        '/components/dropdown',
        '/components/forms',
        '/components/list-group',
        '/components/modal',
        '/components/navbars',
        '/components/navs',
        '/components/popover',
        '/components/progress',
        '/components/spinner',
        '/components/tabs',
        '/components/tabs/other',
        '/components/tooltip',
        '/getting-started',
        '/getting-started/setup',
        '/getting-started/assets',
        '/addons',
        '/license',
        '/changelog',
      ],
    },
  });

  return app.toTree();
};
