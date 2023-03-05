import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/button', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/button', async function (assert) {
    await visit('/components/button');

    assert.equal(currentURL(), '/components/button');
  });
});
