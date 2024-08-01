import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import { versionDependent } from '../../../helpers/bootstrap';

module('Integration | Component | bs-dropdown/menu', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('dropdown menu has correct markup', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.menu
    @isOpen={{true}}
    @toggleElement={{this.element}}
  >Something</dd.menu></BsDropdown>`,
    );

    assert
      .dom('.dropdown-menu')
      .exists('menu has dropdown-menu class')
      .hasTagName('DIV', 'menu is a div (<div>) by default')
      .hasClass('show', 'menu has show class when being open')
      .doesNotHaveClass('dropdown-menu-end', 'menu is left aligned (BS5)')
      .doesNotHaveClass('dropdown-menu-right', 'menu is left aligned (BS4)')
      .hasText('Something', 'renders text content');
  });

  test('dropdown has no align class for @align="left"', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.menu
    @align='left'
    @isOpen={{true}}
    @toggleElement={{this.element}}
  >Something</dd.menu></BsDropdown>`,
    );

    const element = document.querySelector('.dropdown-menu');
    assert.deepEqual([...element.classList], ['dropdown-menu', 'show']);
  });

  test('dropdown menu yields item component', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.menu
    @toggleElement={{this.element}}
    @isOpen={{true}}
    as |ddm|
  ><ddm.item>Dummy</ddm.item></dd.menu></BsDropdown>`,
    );

    assert
      .dom('.dropdown-item')
      .doesNotExist('has item component with no markup');
  });

  test('dropdown menu yields linkTo component', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|>
  <dd.menu @toggleElement={{this.element}} @isOpen={{true}} as |ddm|>
    <ddm.link-to @route='index'>Link</ddm.link-to>
    <ddm.linkTo @route='index'>Link</ddm.linkTo>
  </dd.menu>
</BsDropdown>`,
    );

    assert.dom('a').exists({ count: 2 });
  });

  test('dropdown menu propagates class names', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.menu
    @align='right'
    @isOpen={{true}}
    @toggleElement={{this.element}}
    class='custom-class-1 custom-class-2'
  >Something</dd.menu></BsDropdown>`,
    );

    assert.dom('.dropdown-menu').exists('menu has dropdown-menu class');
    assert
      .dom('.dropdown-menu')
      .hasClass('custom-class-1', 'menu has custom-class-1 class');
    assert
      .dom('.dropdown-menu')
      .hasClass('custom-class-2', 'menu has custom-class-2 class');
  });

  test('dropdown menu supports arbitrary attributes w/ angle brackets', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.menu
    @isOpen={{true}}
    @toggleElement={{this.element}}
    class='custom-class-1'
    data-test-menu
  >Something</dd.menu></BsDropdown>`,
    );

    assert
      .dom('.dropdown-menu')
      .exists('menu has dropdown-menu class')
      .hasClass('custom-class-1', 'menu has custom-class-1 class')
      .hasAttribute('data-test-menu');
  });

  test('dropdown menu can be right aligned', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.menu @align='right' @isOpen={{true}} /></BsDropdown>`,
    );

    assert
      .dom('.dropdown-menu')
      .hasClass(
        versionDependent('dropdown-menu-right', 'dropdown-menu-end'),
        'dropdown menu has CSS class for alignment within navbar',
      );
  });
});
