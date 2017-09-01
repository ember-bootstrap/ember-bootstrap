import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { visit, currentURL, findAll } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | bs-nav-link');

test('active link marks nav item as active', async function(assert) {
  await visit('/acceptance/link/1');
  assert.ok(findAll('#nav-link-test li')[0].classList.contains('active'));
  assert.notOk(findAll('#nav-link-test li')[1].classList.contains('active'));
  assert.ok(findAll('#nav-link-test li')[2].classList.contains('active'));
  await visit('/acceptance/link/2');
  assert.notOk(findAll('#nav-link-test li')[0].classList.contains('active'));
  assert.ok(findAll('#nav-link-test li')[1].classList.contains('active'));
  assert.ok(findAll('#nav-link-test li')[2].classList.contains('active'));
});
