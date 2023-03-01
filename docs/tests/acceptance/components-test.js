import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components', async function (assert) {
    await visit('/components');

    assert.equal(currentURL(), '/components');
  });
});
