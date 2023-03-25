import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | addons', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /addons', async function (assert) {
    await visit('/addons');

    assert.equal(currentURL(), '/addons');
  });
});
