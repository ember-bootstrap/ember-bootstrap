import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/alert', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/alert', async function (assert) {
    await visit('/components/alert');

    assert.equal(currentURL(), '/components/alert');
  });
});
