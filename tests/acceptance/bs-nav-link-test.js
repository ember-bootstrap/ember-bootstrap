import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { visit, findAll } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | bs-nav-link');

test('active link marks nav item as active', async function(assert) {
  await visit('/acceptance/link/1');
  assert.dom(findAll('#nav-link-test li')[0]).hasClass('active');
  assert.dom(findAll('#nav-link-test li')[1]).hasNoClass('active');
  assert.dom(findAll('#nav-link-test li')[2]).hasClass('active');
  await visit('/acceptance/link/2');
  assert.dom(findAll('#nav-link-test li')[0]).hasNoClass('active');
  assert.dom(findAll('#nav-link-test li')[1]).hasClass('active');
  assert.dom(findAll('#nav-link-test li')[2]).hasClass('active');
});
