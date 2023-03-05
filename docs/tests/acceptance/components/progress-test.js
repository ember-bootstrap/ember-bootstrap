import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/progress', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/progress', async function (assert) {
    await visit('/components/progress');

    assert.equal(currentURL(), '/components/progress');
  });
});
