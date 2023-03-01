import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/button group', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/button-group', async function (assert) {
    await visit('/components/button-group');

    assert.equal(currentURL(), '/components/button-group');
  });
});
