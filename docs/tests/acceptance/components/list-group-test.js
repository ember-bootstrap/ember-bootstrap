import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/list group', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/list-group', async function (assert) {
    await visit('/components/list-group');

    assert.equal(currentURL(), '/components/list-group');
  });
});
