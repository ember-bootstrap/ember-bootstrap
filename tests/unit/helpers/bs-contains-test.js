import { bsContains } from 'dummy/helpers/bs-contains';
import { module, test } from 'qunit';

module('Unit | Helper | bs contains', function() {
  test('it works', function(assert) {
    assert.equal(bsContains([[42, 3, 15], 3]), true);
    assert.equal(bsContains([[42, 3, 15], 4]), false);
    assert.equal(bsContains([4, 4]), false);
  });
});
