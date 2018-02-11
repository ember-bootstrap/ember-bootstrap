import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS3, testBS4 } from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-dropdown/menu', function(hooks) {
  setupRenderingTest(hooks);

  testBS3('dropdown menu has correct markup', async function(assert) {
    await render(hbs`{{#bs-dropdown/menu align="right"}}Something{{/bs-dropdown/menu}}`);

    assert.equal(this.element.querySelector(':first-child').tagName, 'UL', 'menu is an unordered list (<ul>) by default');
    assert.dom('ul').hasClass('dropdown-menu', 'menu has dropdown-menu class');
    assert.dom('ul').hasClass('dropdown-menu-right', 'menu has dropdown-menu-right class');
    assert.equal(this.element.querySelector('ul').innerHTML.trim(), 'Something', 'menu contains block contents');
  });

  testBS4('dropdown menu has correct markup', async function(assert) {
    await render(hbs`{{#bs-dropdown/menu align="right" toggleElement=null}}Something{{/bs-dropdown/menu}}`);

    assert.equal(this.element.querySelector(':first-child').tagName, 'DIV', 'menu is a div (<div>) by default');
    assert.dom('div').hasClass('dropdown-menu', 'menu has dropdown-menu class');
    assert.dom('div').hasClass('dropdown-menu-right', 'menu has dropdown-menu-right class');
    assert.equal(this.element.querySelector('div').innerHTML.trim(), 'Something', 'menu contains block contents');
  });

  testBS3('dropdown menu yields item component', async function(assert) {
    await render(hbs`{{#bs-dropdown/menu as |ddm|}}{{#ddm.item}}Dummy{{/ddm.item}}{{/bs-dropdown/menu}}`);

    assert.dom('li').exists({ count: 1 }, 'has item component');
  });

  testBS4('dropdown menu yields item component', async function(assert) {
    await render(
      hbs`{{#bs-dropdown/menu toggleElement=null as |ddm|}}{{#ddm.item}}Dummy{{/ddm.item}}{{/bs-dropdown/menu}}`
    );

    assert.dom('.dropdown-item').doesNotExist('has item component with no markup');
  });
});
