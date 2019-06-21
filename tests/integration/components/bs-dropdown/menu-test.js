import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS3, testBS4 } from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import { gte } from 'ember-compatibility-helpers';

module('Integration | Component | bs-dropdown/menu', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  testBS3('dropdown menu has correct markup', async function(assert) {
    await render(
      hbs`{{#bs-dropdown/menu align="right" isOpen=true toggleElement=this.element}}Something{{/bs-dropdown/menu}}`
    );

    assert.equal(
      this.element.querySelector('.dropdown-menu').tagName,
      'UL',
      'menu is an unordered list (<ul>) by default'
    );
    assert.dom('.dropdown-menu').exists('menu has dropdown-menu class');
    assert.dom('.dropdown-menu').exists('menu has dropdown-menu class');
    assert
      .dom('.dropdown-menu')
      .hasClass('dropdown-menu-right', 'menu has dropdown-menu-right class');
    assert.dom('.dropdown-menu').hasText('Something');
  });

  testBS4('dropdown menu has correct markup', async function(assert) {
    await render(
      hbs`{{#bs-dropdown/menu align="right" isOpen=true toggleElement=this.element}}Something{{/bs-dropdown/menu}}`
    );

    assert.equal(
      this.element.querySelector('.dropdown-menu').tagName,
      'DIV',
      'menu is a div (<div>) by default'
    );
    assert.dom('.dropdown-menu').exists('menu has dropdown-menu class');
    assert
      .dom('.dropdown-menu')
      .hasClass('dropdown-menu-right', 'menu has dropdown-menu-right class');
    assert.dom('.dropdown-menu').hasText('Something');
  });

  testBS3('dropdown menu yields item component', async function(assert) {
    await render(
      hbs`{{#bs-dropdown/menu toggleElement=this.element isOpen=true as |ddm|}}{{#ddm.item}}Dummy{{/ddm.item}}{{/bs-dropdown/menu}}`
    );

    assert.dom('li').exists({ count: 1 }, 'has item component');
  });

  testBS4('dropdown menu yields item component', async function(assert) {
    await render(
      hbs`{{#bs-dropdown/menu toggleElement=this.element isOpen=true as |ddm|}}{{#ddm.item}}Dummy{{/ddm.item}}{{/bs-dropdown/menu}}`
    );

    assert
      .dom('.dropdown-item')
      .doesNotExist('has item component with no markup');
  });

  test('dropdown menu propagates class names', async function(assert) {
    await render(
      hbs`{{#bs-dropdown/menu align="right" isOpen=true toggleElement=this.element class="custom-class-1 custom-class-2"}}Something{{/bs-dropdown/menu}}`
    );

    assert.dom('.dropdown-menu').exists('menu has dropdown-menu class');
    assert
      .dom('.dropdown-menu')
      .hasClass('custom-class-1', 'menu has custom-class-1 class');
    assert
      .dom('.dropdown-menu')
      .hasClass('custom-class-2', 'menu has custom-class-2 class');
  });

  (gte('3.4.0') ? test : skip)('dropdown menu supports arbitrary attributes w/ angle brackets', async function(assert) {
    await render(
      hbs`<BsDropdown::menu @isOpen={{true}} @toggleElement={{this.element}} class="custom-class-1" data-test-menu>Something</BsDropdown::menu>`
    );

    assert.dom('.dropdown-menu').exists('menu has dropdown-menu class');
    assert
      .dom('.dropdown-menu')
      .hasClass('custom-class-1', 'menu has custom-class-1 class');
    assert
      .dom('.dropdown-menu')
      .hasAttribute('data-test-menu');
  });
});
