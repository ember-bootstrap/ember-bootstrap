import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | bs modal');

// Test for https://github.com/kaliber5/ember-bootstrap/issues/53
test('Closing modal waits for transition to complete', function(assert) {

  visit('/modal');
  click('#openModal3');
  click('#modal3-modal .close');

  andThen(function() {
    assert.equal(find('#modal3').length, 0, 'Modal is removed, that means the fade transition has finished.');
  });
});
