import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/forms', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/forms', async function (assert) {
    await visit('/components/forms');

    assert.equal(currentURL(), '/components/forms');
  });
});
