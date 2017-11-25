import { findAll } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-progress/bar', function(hooks) {
  setupRenderingTest(hooks);

  test('has correct markup', async function(assert) {
    await render(hbs`
      {{bs-progress/bar}}
    `);

    assert.equal(findAll('div.progress-bar').length, 1, 'Has progress-bar class');

  });
});