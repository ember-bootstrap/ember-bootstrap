import { click, visit } from '@ember/test-helpers';
import { test, module } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | bs-modal', function (hooks) {
  setupApplicationTest(hooks);

  // Test for https://github.com/kaliber5/ember-bootstrap/issues/53
  test('Closing modal waits for transition to complete', async function (assert) {
    await visit('/acceptance/modal');
    await click('#openModal');
    await click('.modal .close');

    assert.dom('.modal').doesNotExist('Modal is removed, that means the fade transition has finished.');
  });
});
