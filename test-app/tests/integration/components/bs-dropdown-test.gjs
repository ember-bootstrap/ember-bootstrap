import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  focus,
  render,
  settled,
  triggerKeyEvent,
} from '@ember/test-helpers';
import {
  dropdownVisibilityElementSelector,
  isHidden,
  isVisible,
  openClass,
  test,
  versionDependent,
} from '../../helpers/bootstrap';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';
import { on } from '@ember/modifier';
import BsDropdown from 'ember-bootstrap/components/bs-dropdown';
import { tracked } from '@glimmer/tracking';

module('Integration | Component | bs-dropdown', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('dropdown container has dropdown class', async function (assert) {
    await render(
      <template>
        <BsDropdown>Test</BsDropdown>
      </template>,
    );

    assert.dom('.dropdown').exists('has dropdown class');
  });

  test('dropdown container supports dropup style', async function (assert) {
    await render(
      <template>
        <BsDropdown @direction='up'>Test</BsDropdown>
      </template>,
    );

    assert.dom('.dropup').exists('has dropup class');
  });

  test('dropdown container supports dropright style', async function (assert) {
    await render(
      <template>
        <BsDropdown @direction='right'>Test</BsDropdown>
      </template>,
    );

    let droprightClass = versionDependent('.dropright', '.dropend');
    assert.dom(droprightClass).exists('has dropright class');
  });

  test('dropdown container supports dropleft style', async function (assert) {
    await render(
      <template>
        <BsDropdown @direction='left'>Test</BsDropdown>
      </template>,
    );

    let dropleftClass = versionDependent('.dropleft', '.dropstart');
    assert.dom(dropleftClass).exists('has dropleft class');
  });

  test('supports setting btn-group class', async function (assert) {
    await render(
      <template>
        <BsDropdown class='btn-group' as |dd|><dd.button>Dropdown
            <span class='caret'></span></dd.button><dd.menu><li><a
                href='#'
              >Something</a></li></dd.menu></BsDropdown>
      </template>,
    );
    assert.dom('.btn-group').exists('has btn-group class');
  });

  test('dropdown-toggle toggles dropdown visibility', async function (assert) {
    await render(
      <template>
        <BsDropdown as |dd|><dd.toggle>Dropdown
            <span class='caret'></span></dd.toggle><dd.menu><li><a
                href='#'
              >Something</a></li></dd.menu></BsDropdown>
      </template>,
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
      <template>
        <BsDropdown as |dd|><dd.toggle>Dropdown
            <span class='caret'></span></dd.toggle><dd.menu><li><a
                href='#'
              >Something</a></li></dd.menu></BsDropdown>
      </template>,
    );

    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'false');
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'true');
    await click('a.dropdown-toggle');
    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'false');
  });

  test('dropdown button has aria-expanded attribute', async function (assert) {
    await render(
      <template>
        <BsDropdown as |dd|><dd.button>Dropdown
            <span class='caret'></span></dd.button><dd.menu><li><a
                href='#'
              >Something</a></li></dd.menu></BsDropdown>
      </template>,
    );

    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'false');
    await click('button.dropdown-toggle');
    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'true');
    await click('button.dropdown-toggle');
    assert.dom('.dropdown-toggle').hasAttribute('aria-expanded', 'false');
  });

  test('opened dropdown will close on outside click', async function (assert) {
    await render(
      <template>
        <BsDropdown as |dd|><dd.toggle>Dropdown
            <span class='caret'></span></dd.toggle><dd.menu><li><a
                href='#'
              >Something</a></li></dd.menu></BsDropdown>
      </template>,
    );

    await click('a.dropdown-toggle');
    assert
      .dom(dropdownVisibilityElementSelector())
      .hasClass(openClass(), 'Dropdown is open');

    await click('*');
    assert.dom('.dropdown-menu').doesNotExist('Dropdown is closed');
  });

  test('opened dropdown will not close on outside click if onHide returns false', async function (assert) {
    const onHide = () => false;

    await render(
      <template>
        <BsDropdown @onHide={{onHide}} as |dd|><dd.toggle>Dropdown
            <span class='caret'></span></dd.toggle><dd.menu><li><a
                href='#'
              >Something</a></li></dd.menu></BsDropdown>
      </template>,
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
      <template>
        <BsDropdown as |dd|><dd.toggle>Dropdown
            <span class='caret'></span></dd.toggle><dd.menu><li><a
                href='#'
              >Something</a></li></dd.menu></BsDropdown>
      </template>,
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
    const onHide = () => false;

    await render(
      <template>
        <BsDropdown @onHide={{onHide}} as |dd|><dd.toggle>Dropdown
            <span class='caret'></span></dd.toggle><dd.menu><li><a
                href='#'
              >Something</a></li></dd.menu></BsDropdown>
      </template>,
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

    const stopEvent = (event) => {
      event.stopPropagation();
      event.preventDefault();
      assert.ok('stopped event');
    };

    await render(
      <template>
        <BsDropdown as |dd|>
          <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
          <dd.menu><li><a href='#'>Something</a></li></dd.menu>
        </BsDropdown>
        <div id='target' role='button' onclick={{stopEvent}} />
      </template>,
    );

    await click('a.dropdown-toggle');
    assert.dom(`.${openClass()}`).exists('Dropdown is open');

    await click('#target');
    assert.dom(`.${openClass()}`).doesNotExist('Dropdown is closed');
  });

  test('clicking dropdown menu when closeOnMenuClick is false will not close it', async function (assert) {
    await render(
      <template>
        <BsDropdown @closeOnMenuClick={{false}} as |dd|>
          <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
          <dd.menu><li><a href='#'>Something</a></li></dd.menu>
        </BsDropdown>
      </template>,
    );
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
    await render(
      <template>
        <BsDropdown @closeOnMenuClick={{false}} as |dd|>
          <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
          <dd.menu><li><a href='#'>Something</a></li></dd.menu>
        </BsDropdown>
      </template>,
    );
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
      <template>
        <BsDropdown @closeOnMenuClick={{false}} as |dd|><dd.toggle>Dropdown
            <span class='caret'></span></dd.toggle><dd.menu><li><a
                href='#'
              >Something</a></li></dd.menu></BsDropdown>
      </template>,
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
      <template>
        <div id='ember-bootstrap-wormhole'></div>
        <BsDropdown @closeOnMenuClick={{false}} as |dd|><dd.toggle>Dropdown
            <span class='caret'></span></dd.toggle><dd.menu
            @renderInPlace={{false}}
          ><li><a href='#'>Something</a></li></dd.menu></BsDropdown>
      </template>,
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
      <template>
        <BsDropdown as |dd|><dd.toggle><span id='toggleText'>{{if
                dd.isOpen
                'open'
                'closed'
              }}</span></dd.toggle></BsDropdown>
      </template>,
    );

    assert.dom('#toggleText').hasText('closed', 'Dropdown is closed');
    await click('a.dropdown-toggle');
    assert.dom('#toggleText').hasText('open', 'Dropdown is open');
    await click('a.dropdown-toggle');
    assert.dom('#toggleText').hasText('closed', 'Dropdown is closed');
  });

  test('clicking on a menu item with an action will perform that action before closing the dropdown', async function (assert) {
    const actionStub = sinon.stub();

    await render(
      <template>
        <BsDropdown as |dd|>
          <dd.toggle data-test-dropdown-toggle>
            Dropdown
            <span class='caret'></span>
          </dd.toggle>
          <dd.menu>
            <li><a
                href='#'
                role='button'
                data-test-dropdown-item
                {{on 'click' actionStub}}
              >Something</a></li>
          </dd.menu>
        </BsDropdown>
      </template>,
    );
    await click('[data-test-dropdown-toggle]');
    await click('[data-test-dropdown-item]');

    assert.true(actionStub.calledOnce, 'The "click" handler is called once');
  });

  test('opening dropdown calls onShow action', async function (assert) {
    const showAction = sinon.spy();

    await render(
      <template>
        <BsDropdown @onShow={{showAction}} as |dd|><dd.toggle>Dropdown
            <span class='caret'></span></dd.toggle><dd.menu><li><a
                href='#'
              >Something</a></li></dd.menu></BsDropdown>
      </template>,
    );

    await click('a.dropdown-toggle');
    assert.ok(showAction.calledOnce);
  });

  test('closing dropdown calls onHide action', async function (assert) {
    const hideAction = sinon.spy();

    await render(
      <template>
        <BsDropdown @onHide={{hideAction}} as |dd|><dd.toggle>Dropdown
            <span class='caret'></span></dd.toggle><dd.menu><li><a
                href='#'
              >Something</a></li></dd.menu></BsDropdown>
      </template>,
    );

    await click('a.dropdown-toggle');
    await click('.dropdown-menu a');
    assert.ok(hideAction.calledOnce);
  });

  test('dropdown yields the openDropdown action', async function (assert) {
    const showAction = sinon.spy();

    await render(
      <template>
        <BsDropdown @onShow={{showAction}} as |dd|>
          <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
          <dd.menu><li><a href='#'>Something</a></li></dd.menu>
          <a
            href='#'
            role='button'
            {{on 'click' dd.openDropdown}}
            class='custom-open'
          >Custom open link</a>
        </BsDropdown>
      </template>,
    );

    await click('a.custom-open');
    assert.ok(showAction.calledOnce);
  });

  test('dropdown yields the closeDropdown action', async function (assert) {
    const hideAction = sinon.spy();

    await render(
      <template>
        <BsDropdown @closeOnMenuClick={{false}} @onHide={{hideAction}} as |dd|>
          <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
          <dd.menu>
            <li>
              <a href='#'>Something</a>
              <a
                href='#'
                role='button'
                {{on 'click' dd.closeDropdown}}
                class='custom-close'
              >Custom close link</a>
            </li>
          </dd.menu>
        </BsDropdown>
      </template>,
    );

    await click('a.dropdown-toggle');
    await click('.custom-close');
    assert.ok(hideAction.calledOnce);
  });

  test('dropdown yields the toggleDropdown action', async function (assert) {
    const showAction = sinon.stub();
    const hideAction = sinon.stub();

    await render(
      <template>
        <BsDropdown
          @closeOnMenuClick={{false}}
          @onShow={{showAction}}
          @onHide={{hideAction}}
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
        </BsDropdown>
      </template>,
    );

    await click('[data-test-dropdown-outside-toggle]');
    assert.ok(showAction.calledOnce, 'Show callback was called');

    // Test the toggle yield by clicking a button in the menu.
    // If we don't, the event that closes the dropdown will be the 'outside click', which is not tested here.
    // For this reason, if [data-test-dropdown-outside-toggle] is clicked, hide will get called twice.
    await click('[data-test-dropdown-menu-toggle]');
    assert.ok(hideAction.calledOnce, 'Hide callback was called');
  });

  test('opening dropdown makes the menu visible', async function (assert) {
    await render(
      <template>
        <BsDropdown as |dd|>
          <dd.toggle>Dropdown</dd.toggle>
          <dd.menu as |menu|>
            <menu.item>
              <menu.link-to @route='index'>Home</menu.link-to>
            </menu.item>
          </dd.menu>
        </BsDropdown>
      </template>,
    );

    assert.ok(isHidden(this.element.querySelector('.dropdown-menu')));

    await click('a.dropdown-toggle');
    assert.ok(isVisible(this.element.querySelector('.dropdown-menu a')));
    assert.notStrictEqual(
      this.element.querySelector('.dropdown-menu').offsetParent,
      null,
    );
  });

  test('dropdown in nav disables dynamic positioning', async function (assert) {
    class State {
      @tracked inNav = false;
    }
    const state = new State();

    await render(
      <template>
        <BsDropdown @inNav={{state.inNav}} as |dd|>
          <dd.toggle>Dropdown</dd.toggle>
          <dd.menu as |menu|>
            <menu.item>
              <menu.link-to @route='index'>Home</menu.link-to>
            </menu.item>
          </dd.menu>
        </BsDropdown>
      </template>,
    );

    await click('a.dropdown-toggle');

    assert.ok(
      this.element.querySelector('.dropdown-menu').style.length > 0,
      'Dynamic positioning applied when inNav is set to false',
    );

    state.inNav = true;
    await settled();

    assert.strictEqual(
      this.element.querySelector('.dropdown-menu').style.length,
      0,
      'Dynamic positioning not applied when inNav is set to true',
    );
  });

  test('dropdown menu can be rendered in a wormhole', async function (assert) {
    await render(
      <template>
        <div id='ember-bootstrap-wormhole'></div>
        <BsDropdown as |dd|>
          <dd.toggle>Dropdown <span class='caret'></span></dd.toggle>
          <dd.menu @renderInPlace={{false}}><li><a
                href='#'
              >Something</a></li></dd.menu>
        </BsDropdown>
      </template>,
    );

    await click('a.dropdown-toggle');
    assert
      .dom('#ember-bootstrap-wormhole .dropdown-menu')
      .exists({ count: 1 }, 'Menu is rendered in wormhole');
  });

  module('keyboard control', function () {
    class State {
      @tracked renderInPlace = false;
    }
    const state = new State();

    function keyboardTest() {
      test(`should have correct default element focused`, async function (assert) {
        await render(
          <template>
            <BsDropdown as |dd|>
              <dd.toggle>Dropdown</dd.toggle>
              <dd.menu @renderInPlace={{state.renderInPlace}} as |menu|>
                <menu.item><a
                    class='dropdown-item'
                    href='#'
                  >Something</a></menu.item>
              </dd.menu>
            </BsDropdown>
          </template>,
        );

        await click('a.dropdown-toggle');
        let expectedFocusElement = state.renderInPlace
          ? 'a.dropdown-toggle'
          : '.dropdown-menu';

        assert.dom(expectedFocusElement).isFocused();
      });

      test('should show if down key is pressed on toggle', async function (assert) {
        await render(
          <template>
            <BsDropdown as |dd|>
              <dd.toggle>Dropdown</dd.toggle>
              <dd.menu @renderInPlace={{state.renderInPlace}} as |menu|>
                <menu.item><a
                    class='dropdown-item'
                    href='#'
                  >Something</a></menu.item>
              </dd.menu>
            </BsDropdown>
          </template>,
        );

        await focus('a.dropdown-toggle');
        await triggerKeyEvent('a.dropdown-toggle', 'keydown', 40); // down

        assert.dom('.dropdown-menu').exists();
      });

      test('should show if down key is pressed on button', async function (assert) {
        await render(
          <template>
            <BsDropdown as |dd|>
              <dd.button>Dropdown</dd.button>
              <dd.menu @renderInPlace={{state.renderInPlace}} as |menu|>
                <menu.item><a
                    class='dropdown-item'
                    href='#'
                  >Something</a></menu.item>
              </dd.menu>
            </BsDropdown>
          </template>,
        );

        await focus('button.dropdown-toggle');
        await triggerKeyEvent('button.dropdown-toggle', 'keydown', 40); // down

        assert.dom('.dropdown-menu').exists();
      });

      test('should hide if pressing escape', async function (assert) {
        await render(
          <template>
            <BsDropdown as |dd|>
              <dd.toggle>Dropdown</dd.toggle>
              <dd.menu @renderInPlace={{state.renderInPlace}} as |menu|>
                <menu.item><a
                    class='dropdown-item'
                    href='#'
                  >Something</a></menu.item>
              </dd.menu>
            </BsDropdown>
          </template>,
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
          <template>
            <BsDropdown as |dd|>
              <dd.toggle>Dropdown</dd.toggle>
              <dd.menu @renderInPlace={{state.renderInPlace}} as |menu|>
                <menu.item><a
                    class='dropdown-item'
                    href='#'
                  >Something</a></menu.item>
              </dd.menu>
            </BsDropdown>
          </template>,
        );

        await click('a.dropdown-toggle');

        assert.dom('.dropdown-menu').exists();

        await triggerKeyEvent(document, 'keyup', 9); // tab

        assert.dom('.dropdown-menu').doesNotExist();
      });

      test('should not hide if tabbing inside of menu', async function (assert) {
        await render(
          <template>
            <BsDropdown as |dd|>
              <dd.toggle>Dropdown</dd.toggle>
              <dd.menu @renderInPlace={{state.renderInPlace}} as |menu|>
                <menu.item><a
                    class='dropdown-item'
                    href='#'
                  >Something</a></menu.item>
              </dd.menu>
            </BsDropdown>
          </template>,
        );

        await click('a.dropdown-toggle');

        assert.dom('.dropdown-menu').exists();

        await triggerKeyEvent('.dropdown-item', 'keyup', 9); // tab

        assert.dom('.dropdown-menu').exists();
      });

      test('should focus next/previous element when using keyboard navigation', async function (assert) {
        await render(
          <template>
            <BsDropdown as |dd|>
              <dd.toggle>Dropdown</dd.toggle>
              <dd.menu @renderInPlace={{state.renderInPlace}} as |menu|>
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
            </BsDropdown>
          </template>,
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
          <template>
            <BsDropdown as |dd|>
              <dd.toggle>Dropdown</dd.toggle>
              <dd.menu @renderInPlace={{state.renderInPlace}} as |menu|>
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
            </BsDropdown>
          </template>,
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
        await render(
          <template>
            <BsDropdown as |dd|>
              <dd.toggle>Dropdown</dd.toggle>
              <dd.menu @renderInPlace={{state.renderInPlace}}>
                <a class='dropdown-item' href='#' id='item1'>Something</a>
                <input type='text' />
                <textarea></textarea>
              </dd.menu>
            </BsDropdown>
          </template>,
        );

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
        await render(
          <template>
            <BsDropdown as |dd|>
              <dd.toggle>Dropdown</dd.toggle>
              <dd.menu @renderInPlace={{state.renderInPlace}}>
                <a class='dropdown-item disabled' href='#sub1'>Submenu 1</a>
                <button class='dropdown-item' type='button' disabled>Disabled
                  button</button>
                <a class='dropdown-item' href='#' id='item1'>Something</a>
              </dd.menu>
            </BsDropdown>
          </template>,
        );

        await click('a.dropdown-toggle');

        await triggerKeyEvent(document.activeElement, 'keydown', 40); // down
        assert.dom('#item1').isFocused();
      });
    }

    module('in place', function (hooks) {
      hooks.beforeEach(function () {
        state.renderInPlace = true;
      });
      keyboardTest();
    });

    module('in wormhole', function () {
      hooks.beforeEach(function () {
        state.renderInPlace = false;
      });
      keyboardTest();
    });
  });

  test('it passes accessibility checks', async function (assert) {
    await render(
      <template>
        <BsDropdown as |dd|>
          <dd.toggle>Dropdown</dd.toggle>
          <dd.menu as |menu|>
            <menu.item>
              <a class='dropdown-item' href='#'>
                Something
              </a>
            </menu.item>
          </dd.menu>
        </BsDropdown>
      </template>,
    );

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
