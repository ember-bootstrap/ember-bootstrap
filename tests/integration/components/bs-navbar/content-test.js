import { find, findAll } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-navbar/content', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{bs-navbar/content}}`);

    assert.equal(find('*').textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#bs-navbar/content}}
        template block text
      {{/bs-navbar/content}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`
      {{#bs-navbar/content}}
        Content
      {{/bs-navbar/content}}
    `);

    assert.equal(find('*').textContent.trim(), 'Content');
    assert.equal(findAll('.navbar-collapse').length, 1, 'there is only one element with the navbar-collapse class');
    assert.ok(find('.navbar-collapse').classList.contains('collapse'), 'it has the collapse class indicating it derives from bs-collapse');
  });
});
