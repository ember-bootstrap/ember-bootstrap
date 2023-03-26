import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/modal', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/modal', async function (assert) {
    await visit('/components/modal');

    assert.equal(currentURL(), '/components/modal');
  });
});
