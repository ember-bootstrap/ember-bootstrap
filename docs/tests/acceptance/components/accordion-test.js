import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | components/accordion', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/accordion', async function (assert) {
    await visit('/components/accordion');

    assert.equal(currentURL(), '/components/accordion');
  });
});
