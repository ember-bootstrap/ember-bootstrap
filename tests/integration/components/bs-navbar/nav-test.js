import { find, findAll } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-navbar/nav', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{bs-navbar/nav}}`);

    assert.equal(find('*').textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#bs-navbar/nav}}
        template block text
      {{/bs-navbar/nav}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`
      {{#bs-navbar/nav}}
        Nav
      {{/bs-navbar/nav}}
    `);

    assert.equal(find('*').textContent.trim(), 'Nav');
    assert.equal(findAll('.navbar-nav').length, 1, 'there is only one element with the navbar-nav class');
    assert.ok(find('.navbar-nav').classList.contains('nav'), 'it has the nav class indicating it derives from bs-nav');
  });

  test('it no longer supports the justified option', async function(assert) {
    await render(hbs`{{bs-navbar/nav justified=true}}`);

    assert.equal(findAll('.navbar-justified').length, 0, 'the justified class was not applied');
  });
});
