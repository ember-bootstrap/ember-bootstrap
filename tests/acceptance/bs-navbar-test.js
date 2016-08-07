import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

// TODO: Write this
moduleForAcceptance('Acceptance | bs navbar');

test('visiting /navbars', function(assert) {
  visit('/navbars');

  andThen(function() {
    assert.equal(currentURL(), '/navbars');
  });
});
