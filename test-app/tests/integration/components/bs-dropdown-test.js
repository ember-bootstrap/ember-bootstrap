import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, focus, render, triggerKeyEvent } from '@ember/test-helpers';
import {
  dropdownVisibilityElementSelector,
  isHidden,
  isVisible,
  openClass,
  test,
  versionDependent,
} from '../../helpers/bootstrap';
import { hbs } from 'ember-cli-htmlbars';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';

module('Integration | Component | bs-dropdown', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  test('dropdown container has dropdown class', async function (assert) {
    await render(hbs`<BsDropdown>Test</BsDropdown>`);

    assert.dom('.dropdown').exists('has dropdown class');
  });

  test('dropdown container supports dropup style', async function (assert) {
    await render(hbs`<BsDropdown @direction='up'>Test</BsDropdown>`);

    assert.dom('.dropup').exists('has dropup class');
  });

  test('dropdown container supports dropright style', async function (assert) {
    await render(hbs`<BsDropdown @direction='right'>Test</BsDropdown>`);

    let droprightClass = versionDependent('.dropright', '.dropend');
    assert.dom(droprightClass).exists('has dropright class');
  });

  test('dropdown container supports dropleft style', async function (assert) {
    await render(hbs`<BsDropdown @direction='left'>Test</BsDropdown>`);

    let dropleftClass = versionDependent('.dropleft', '.dropstart');
    assert.dom(dropleftClass).exists('has dropleft class');
  });

  test('dropdown container with dropdown button has btn-group class', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.button>Dropdown
    <span class='caret'></span></dd.button><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );
    assert.dom('.btn-group').exists('has btn-group class');
  });

  test('dropdown container with block dropdown button has dropdown class', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.button @block={{true}}>Dropdown
    <span class='caret'></span></dd.button><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );
    assert.dom('.dropdown').exists('has dropdown class');
  });

  test('dropdown container with dropdown button supports dropup style', async function (assert) {
    await render(
      hbs`<BsDropdown @direction='up' as |dd|><dd.button>Dropdown
    <span class='caret'></span></dd.button><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );
    assert.dom('.btn-group').exists('has btn-group class');
    assert.dom('.dropup').exists('has dropup class');
  });

  test('dropdown-toggle toggles dropdown visibility', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.toggle>Dropdown
    <span class='caret'></span></dd.toggle><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );

    assert.dom('.dropdown-menu').doesNotExist('Dropdown is closed');
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-menu').exists();
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-menu').doesNotExist('Dropdown is closed');
  });

  test('dropdown toggle has aria-expanded attribute', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.toggle>Dropdown
    <span class='caret'></span></dd.toggle><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );

    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'false');
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'true');
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'false');
  });

  test('dropdown button has aria-expanded attribute', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.button>Dropdown
    <span class='caret'></span></dd.button><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );

    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'false');
    await click('button.dropdown-toggle');
    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'true');
    await click('button.dropdown-toggle');
    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'false');
  });

  test('opened dropdown will close on outside click', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.toggle>Dropdown
    <span class='caret'></span></dd.toggle><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );

    await click('a.dropdown-toggle');
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');

    await click('*');
    assert.dom('.dropdown-menu').doesNotExist('Dropdown is closed');
  });

  test('opened dropdown will not close on outside click if onHide returns false', async function (assert) {
    this.set('onHide', () => {
      return false;
    });
    await render(
      hbs`<BsDropdown @onHide={{this.onHide}} as |dd|><dd.toggle>Dropdown
    <span class='caret'></span></dd.toggle><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );

    await click('a.dropdown-toggle');
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');

    await click('*');
    assert.dom('.dropdown-menu').exists('Dropdown remains open');
  });

  test('clicking dropdown menu will close it', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.toggle>Dropdown
    <span class='caret'></span></dd.toggle><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-menu').exists();
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');

    await click('.dropdown-menu a');
    assert.dom('.dropdown-menu').doesNotExist('Dropdown is closed');
  });

  test('clicking dropdown menu will not close it if onHide returns false', async function (assert) {
    this.set('onHide', () => {
      return false;
    });
    await render(
      hbs`<BsDropdown @onHide={{this.onHide}} as |dd|><dd.toggle>Dropdown
    <span class='caret'></span></dd.toggle><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-menu').exists();
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');

    await click('.dropdown-menu a');
    assert.dom('.dropdown-menu').exists('Dropdown remains open');
  });

  test('dropdown will close on click, when default is prevented, propagation is stopped', async function (assert) {
    assert.expect(3);

    this.set('stopEvent', (event) => {
      event.stopPropagation();
      event.preventDefault();
      assert.ok('stopped event');
    });

    await render(hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
  <dd.menu><li><a href='#'>Something</a></li></dd.menu>
</BsDropdown>
<div id='target' role='button' onclick={{action this.stopEvent}} />`);

    await click('a.dropdown-toggle');
    assert.dom(`.${openClass()}`).exists('Dropdown is open');

    await click('#target');
    assert.dom(`.${openClass()}`).doesNotExist('Dropdown is closed');
  });

  test('clicking dropdown menu when closeOnMenuClick is false will not close it', async function (assert) {
    await render(hbs`<BsDropdown @closeOnMenuClick={{false}} as |dd|>
  <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
  <dd.menu><li><a href='#'>Something</a></li></dd.menu>
</BsDropdown>`);
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-menu').exists();
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');

    await click('.dropdown-menu a');
    assert.dom('.dropdown-menu').exists();
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');
  });

  test('clicking dropdown menu when closeOnMenuClick is false will not close it, even after opening the menu again', async function (assert) {
    await render(hbs`<BsDropdown @closeOnMenuClick={{false}} as |dd|>
  <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
  <dd.menu><li><a href='#'>Something</a></li></dd.menu>
</BsDropdown>`);
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-menu').exists();
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');

    await click('.dropdown-menu a');
    assert.dom('.dropdown-menu').exists();
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');

    // close the menu to validate again
    await click(document.body);
    assert.dom('.dropdown-menu').doesNotExist();

    // toggle the menu again
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-menu').exists();
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');

    await click('.dropdown-menu a');
    assert.dom('.dropdown-menu').exists();
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');
  });

  test('clicking outside dropdown menu when closeOnMenuClick is false will close it', async function (assert) {
    await render(
      hbs`<BsDropdown @closeOnMenuClick={{false}} as |dd|><dd.toggle>Dropdown
    <span class='caret'></span></dd.toggle><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-menu').exists();
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');

    await click(document.body);
    assert.dom('.dropdown-menu').doesNotExist();
  });

  test('clicking outside dropdown menu when closeOnMenuClick is false and renderInPlace is false will close it', async function (assert) {
    await render(
      hbs`<div id='ember-bootstrap-wormhole'></div>
<BsDropdown @closeOnMenuClick={{false}} as |dd|><dd.toggle>Dropdown
    <span class='caret'></span></dd.toggle><dd.menu @renderInPlace={{false}}><li
    ><a href='#'>Something</a></li></dd.menu></BsDropdown>`,
    );
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-menu').exists();
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');

    await click(document.body);
    assert.dom('.dropdown-menu').doesNotExist();
  });

  test('child components can access isOpen property', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|><dd.toggle><span id='toggleText'>{{if
        dd.isOpen
        'open'
        'closed'
      }}</span></dd.toggle></BsDropdown>`,
    );

    assert.dom('#toggleText').hasText('closed', 'Dropdown is closed');
    await click('a.dropdown-toggle');
    assert.dom('#toggleText').hasText('open', 'Dropdown is open');
    await click('a.dropdown-toggle');
    assert.dom('#toggleText').hasText('closed', 'Dropdown is closed');
  });

  test('clicking on a menu item with an action will perform that action before closing the dropdown', async function (assert) {
    const actionStub = this.set('action', sinon.stub());

    await render(hbs`<BsDropdown as |dd|>
  <dd.toggle data-test-dropdown-toggle>
    Dropdown
    <span class='caret'></span>
  </dd.toggle>
  <dd.menu>
    <li><a
        href='#'
        role='button'
        data-test-dropdown-item
        {{on 'click' this.action}}
      >Something</a></li>
  </dd.menu>
</BsDropdown>`);
    await click('[data-test-dropdown-toggle]');
    await click('[data-test-dropdown-item]');

    assert.true(actionStub.calledOnce, 'The "click" handler is called once');
  });

  test('opening dropdown calls onShow action', async function (assert) {
    let action = sinon.spy();
    this.actions.show = action;
    await render(
      hbs`<BsDropdown @onShow={{action 'show'}} as |dd|><dd.toggle>Dropdown
    <span class='caret'></span></dd.toggle><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );

    await click('a.dropdown-toggle');
    assert.ok(action.calledOnce);
  });

  test('closing dropdown calls onHide action', async function (assert) {
    let action = sinon.spy();
    this.actions.hide = action;
    await render(
      hbs`<BsDropdown @onHide={{action 'hide'}} as |dd|><dd.toggle>Dropdown
    <span class='caret'></span></dd.toggle><dd.menu><li><a
        href='#'
      >Something</a></li></dd.menu></BsDropdown>`,
    );

    await click('a.dropdown-toggle');
    await click('.dropdown-menu a');
    assert.ok(action.calledOnce);
  });

  test('dropdown yields the openDropdown action', async function (assert) {
    let action = sinon.spy();
    this.actions.show = action;
    await render(hbs`<BsDropdown @onShow={{action 'show'}} as |dd|>
  <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
  <dd.menu><li><a href='#'>Something</a></li></dd.menu>
  <a
    href='#'
    role='button'
    {{action dd.openDropdown}}
    class='custom-open'
  >Custom open link</a>
</BsDropdown>`);

    await click('a.custom-open');
    assert.ok(action.calledOnce);
  });

  test('dropdown yields the closeDropdown action', async function (assert) {
    let hide = sinon.spy();
    this.actions.hide = hide;
    await render(hbs`<BsDropdown @closeOnMenuClick={{false}} @onHide={{action 'hide'}} as |dd|>
  <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
  <dd.menu>
    <li>
      <a href='#'>Something</a>
      <a
        href='#'
        role='button'
        {{action dd.closeDropdown}}
        class='custom-close'
      >Custom close link</a>
    </li>
  </dd.menu>
</BsDropdown>`);

    await click('a.dropdown-toggle');
    await click('.custom-close');
    assert.ok(hide.calledOnce);
  });

  test('dropdown yields the toggleDropdown action', async function (assert) {
    const show = this.set('show', sinon.stub());
    const hide = this.set('hide', sinon.stub());
    await render(hbs`<BsDropdown
  @closeOnMenuClick={{false}}
  @onShow={{this.show}}
  @onHide={{this.hide}}
  as |dd|
>
  <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
  <dd.menu><li><a
        href='#'
        data-test-dropdown-menu-toggle
        {{on 'click' dd.toggleDropdown}}
      >Something</a></li></dd.menu>
  <a
    href='#'
    data-test-dropdown-outside-toggle
    {{on 'click' dd.toggleDropdown}}
    role='button'
  >Custom toggle link</a>
</BsDropdown>`);

    await click('[data-test-dropdown-outside-toggle]');
    assert.ok(show.calledOnce, 'Show callback was called');

    // Test the toggle yield by clicking a button in the menu.
    // If we don't, the event that closes the dropdown will be the 'outside click', which is not tested here.
    // For this reason, if [data-test-dropdown-outside-toggle] is clicked, hide will get called twice.
    await click('[data-test-dropdown-menu-toggle]');
    assert.ok(hide.calledOnce, 'Hide callback was called');
  });

  test('opening dropdown makes the menu visible', async function (assert) {
    await render(hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu as |menu|>
    <menu.item>
      <menu.link-to @route='index'>Home</menu.link-to>
    </menu.item>
  </dd.menu>
</BsDropdown>`);

    assert.ok(isHidden(this.element.querySelector('.dropdown-menu')));

    await click('a.dropdown-toggle');
    assert.ok(isVisible(this.element.querySelector('.dropdown-menu a')));
    assert.notStrictEqual(
      this.element.querySelector('.dropdown-menu').offsetParent,
      null,
    );
  });

  test('dropdown in nav disables dynamic positioning', async function (assert) {
    this.set('inNav', false);

    await render(hbs`<BsDropdown @inNav={{this.inNav}} as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu as |menu|>
    <menu.item>
      <menu.link-to @route='index'>Home</menu.link-to>
    </menu.item>
  </dd.menu>
</BsDropdown>`);

    await click('a.dropdown-toggle');

    assert.ok(
      this.element.querySelector('.dropdown-menu').style.length > 0,
      'Dynamic positioning applied when inNav is set to false',
    );

    this.set('inNav', true);

    assert.strictEqual(
      this.element.querySelector('.dropdown-menu').style.length,
      0,
      'Dynamic positioning not applied when inNav is set to true',
    );
  });

  test('dropdown menu can be rendered in a wormhole', async function (assert) {
    await render(
      hbs`<div id='ember-bootstrap-wormhole'></div>
<BsDropdown as |dd|>
  <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
  <dd.menu @renderInPlace={{false}}><li><a href='#'>Something</a></li></dd.menu>
</BsDropdown>`,
    );

    await click('a.dropdown-toggle');
    assert
      .dom('#ember-bootstrap-wormhole .dropdown-menu')
      .exists({ count: 1 }, 'Menu is rendered in wormhole');
  });

  module('keyboard control', function () {
    function keyboardTest() {
      test(`should have correct default element focused`, async function (assert) {
        await render(
          hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu @renderInPlace={{this.renderInPlace}} as |menu|>
    <menu.item><a class='dropdown-item' href='#'>Something</a></menu.item>
  </dd.menu>
</BsDropdown>`,
        );

        await click('a.dropdown-toggle');
        let expectedFocusElement = this.renderInPlace
          ? 'a.dropdown-toggle'
          : '.dropdown-menu';

        assert.dom(expectedFocusElement).isFocused();
      });

      test('should show if down key is pressed on toggle', async function (assert) {
        await render(
          hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu @renderInPlace={{this.renderInPlace}} as |menu|>
    <menu.item><a class='dropdown-item' href='#'>Something</a></menu.item>
  </dd.menu>
</BsDropdown>`,
        );

        await focus('a.dropdown-toggle');
        await triggerKeyEvent('a.dropdown-toggle', 'keydown', 40); // down

        assert.dom('.dropdown-menu').exists();
      });

      test('should show if down key is pressed on button', async function (assert) {
        await render(
          hbs`<BsDropdown as |dd|>
  <dd.button>Dropdown</dd.button>
  <dd.menu @renderInPlace={{this.renderInPlace}} as |menu|>
    <menu.item><a class='dropdown-item' href='#'>Something</a></menu.item>
  </dd.menu>
</BsDropdown>`,
        );

        await focus('button.dropdown-toggle');
        await triggerKeyEvent('button.dropdown-toggle', 'keydown', 40); // down

        assert.dom('.dropdown-menu').exists();
      });

      test('should hide if pressing escape', async function (assert) {
        await render(
          hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu @renderInPlace={{this.renderInPlace}} as |menu|>
    <menu.item><a class='dropdown-item' href='#'>Something</a></menu.item>
  </dd.menu>
</BsDropdown>`,
        );

        await click('a.dropdown-toggle');

        assert.dom('.dropdown-menu').exists();

        await triggerKeyEvent(document.activeElement, 'keydown', 40); // down, to set focus to different element

        await triggerKeyEvent(document.activeElement, 'keydown', 27); // escape

        assert.dom('.dropdown-menu').doesNotExist();
        assert.dom('a.dropdown-toggle').isFocused();
      });

      test('should hide if tabbing outside of menu', async function (assert) {
        await render(
          hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu @renderInPlace={{this.renderInPlace}} as |menu|>
    <menu.item><a class='dropdown-item' href='#'>Something</a></menu.item>
  </dd.menu>
</BsDropdown>`,
        );

        await click('a.dropdown-toggle');

        assert.dom('.dropdown-menu').exists();

        await triggerKeyEvent(document, 'keyup', 9); // tab

        assert.dom('.dropdown-menu').doesNotExist();
      });

      test('should not hide if tabbing inside of menu', async function (assert) {
        await render(
          hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu @renderInPlace={{this.renderInPlace}} as |menu|>
    <menu.item><a class='dropdown-item' href='#'>Something</a></menu.item>
  </dd.menu>
</BsDropdown>`,
        );

        await click('a.dropdown-toggle');

        assert.dom('.dropdown-menu').exists();

        await triggerKeyEvent('.dropdown-item', 'keyup', 9); // tab

        assert.dom('.dropdown-menu').exists();
      });

      test('should focus next/previous element when using keyboard navigation', async function (assert) {
        await render(
          hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu @renderInPlace={{this.renderInPlace}} as |menu|>
    <menu.item><a
        class='dropdown-item'
        href='#'
        id='item1'
      >Something</a></menu.item>
    <menu.item><a
        class='dropdown-item'
        href='#'
        id='item2'
      >Something</a></menu.item>
  </dd.menu>
</BsDropdown>`,
        );

        await click('a.dropdown-toggle');

        await triggerKeyEvent(document.activeElement, 'keydown', 40); // down
        assert.dom('#item1').isFocused();

        await triggerKeyEvent(document.activeElement, 'keydown', 40); // down
        assert.dom('#item2').isFocused();

        await triggerKeyEvent(document.activeElement, 'keydown', 38); // up
        assert.dom('#item1').isFocused();
      });

      test('should hide and focus next element when tabbing outside of menu ', async function (assert) {
        await render(
          hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu @renderInPlace={{this.renderInPlace}} as |menu|>
    <menu.item><a
        class='dropdown-item'
        href='#'
        id='item1'
      >Something</a></menu.item>
    <menu.item><a
        class='dropdown-item'
        href='#'
        id='item2'
      >Something</a></menu.item>
  </dd.menu>
  <button type='button' id='next'>Next</button>
</BsDropdown>`,
        );

        await click('a.dropdown-toggle');

        await new Promise((resolve) => setTimeout(resolve, 0));

        await triggerKeyEvent(document.activeElement, 'keydown', 40); // down
        assert.dom('#item1').isFocused();

        await triggerKeyEvent(document.activeElement, 'keydown', 40); // down
        assert.dom('#item2').isFocused();

        await triggerKeyEvent(document.activeElement, 'keydown', 38); // up
        assert.dom('#item1').isFocused();
      });

      test('should ignore keyboard events within <input>s and <textarea>s, except for escape key', async function (assert) {
        await render(hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu @renderInPlace={{this.renderInPlace}}>
    <a class='dropdown-item' href='#' id='item1'>Something</a>
    <input type='text' />
    <textarea></textarea>
  </dd.menu>
</BsDropdown>`);

        await click('a.dropdown-toggle');
        await focus('input');

        await triggerKeyEvent(document.activeElement, 'keydown', 38); // up
        assert.dom('input').isFocused();

        await focus('textarea');

        await triggerKeyEvent(document.activeElement, 'keydown', 38); // up
        assert.dom('textarea').isFocused();

        await triggerKeyEvent(document.activeElement, 'keydown', 27); // escape
        assert.dom('.dropdown-menu').doesNotExist();
      });

      test('should skip disabled element when using keyboard navigation', async function (assert) {
        await render(hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu @renderInPlace={{this.renderInPlace}}>
    <a class='dropdown-item disabled' href='#sub1'>Submenu 1</a>
    <button class='dropdown-item' type='button' disabled>Disabled button</button>
    <a class='dropdown-item' href='#' id='item1'>Something</a>
  </dd.menu>
</BsDropdown>`);

        await click('a.dropdown-toggle');

        await triggerKeyEvent(document.activeElement, 'keydown', 40); // down
        assert.dom('#item1').isFocused();
      });
    }

    module('in place', function (hooks) {
      hooks.beforeEach(function () {
        this.renderInPlace = true;
      });
      keyboardTest();
    });

    module('in wormhole', function () {
      hooks.beforeEach(function () {
        this.renderInPlace = false;
      });
      keyboardTest();
    });
  });

  test('it passes accessibility checks', async function (assert) {
    await render(
      hbs`<BsDropdown as |dd|>
  <dd.toggle>Dropdown</dd.toggle>
  <dd.menu as |menu|>
    <menu.item><a class='dropdown-item' href='#'>Something</a></menu.item>
  </dd.menu>
</BsDropdown>`,
    );

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
