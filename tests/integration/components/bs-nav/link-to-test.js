import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';

module('Integration | Component | bs nav/link to', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#bs-nav/link-to "application"}}
        template block text
      {{/bs-nav/link-to}}
    `);

    assert.dom('*').hasText('template block text');
    assert.deprecationsInclude('The link-to component yielded by bs-nav is deprecated. Use the linkTo property of the yielded item component instead!\n' +
      'Before: {{#nav.item}}{{#nav.link-to "index"}}foo{{/nav.link-to}}{{/nav.item}}\n' +
      'After: {{#nav.item linkTo="index"}}foo{{/nav.item}}');
  });
});
