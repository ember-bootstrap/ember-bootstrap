import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS3, testBS4 } from '../../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-dropdown/menu/item', function(hooks) {
  setupRenderingTest(hooks);

  testBS3('it has correct markup', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#bs-dropdown/menu/item}}
        template block text
      {{/bs-dropdown/menu/item}}
    `);

    assert.dom('li').exists({ count: 1 }, 'renders as <li> element');
    assert.dom('*').hasText('template block text');
  });

  testBS4('it has correct markup', async function(assert) {
    // Template block usage:
    await render(hbs`
      <span>
      {{#bs-dropdown/menu/item}}
        template block text
      {{/bs-dropdown/menu/item}}
      </span>
    `);

    assert.dom('span > div').doesNotExist('renders as no element');
    assert.dom('*').hasText('template block text');
  });
});
