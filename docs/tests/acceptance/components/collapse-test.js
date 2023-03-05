import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/collapse', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/collapse', async function (assert) {
    await visit('/components/collapse');

    assert.equal(currentURL(), '/components/collapse');
  });
});
