import { module, skip, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';
import { dependencySatisfies } from '@embroider/macros';

module('FastBoot | dropdown', function (hooks) {
  setup(hooks);

  // A regression in Ember.js >= 6.8.0 breaks Fastboot in some cases.
  // We need to disable the affected tests for now.
  // The issue is tracked here: https://github.com/emberjs/ember.js/issues/20984
  (dependencySatisfies('ember-source', '<= 6.7.0') ? test : skip)(
    'it renders',
    async function (assert) {
      await visit('/fastboot/dropdown');

      assert.dom('.dropdown').exists();
      assert.dom('.dropdown .dropdown-toggle').exists();
      assert.dom('.dropdown .dropdown-toggle').hasText('Dropdown');
    },
  );
});
