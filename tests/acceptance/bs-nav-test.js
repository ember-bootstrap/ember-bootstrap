import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | bs nav');

test('link-to still works after reopening', function(assert) {
  visit('/');
  click('.nav li a:contains("Navs")');

  andThen(function() {
    assert.equal(currentURL(), '/navs');
    assert.ok(find('.nav li a:contains("Navs")').hasClass('active'));
  });
});
