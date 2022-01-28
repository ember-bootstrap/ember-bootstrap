import { bsContains } from 'dummy/helpers/bs-contains';
import { module, test } from 'qunit';

module('Unit | Helper | bs contains', function () {
  test('it works', function (assert) {
    assert.true(bsContains([[42, 3, 15], 3]));
    assert.false(bsContains([[42, 3, 15], 4]));
    assert.false(bsContains([4, 4]));
  });
});
