import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { click, visit, find } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | bs-modal');

// Test for https://github.com/kaliber5/ember-bootstrap/issues/53
test('Closing modal waits for transition to complete', async function(assert) {

  await visit('/acceptance/modal');
  await click('#openModal');
  await click('#modal-modal .close');

  assert.notOk(find('#modal'), 'Modal is removed, that means the fade transition has finished.');
});
