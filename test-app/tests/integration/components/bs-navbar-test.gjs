import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled, waitFor } from '@ember/test-helpers';
import {
  positionClassFor,
  positionStickyClass,
  test,
  testBS4,
  testBS5,
  visibilityClass,
} from '../../helpers/bootstrap';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';
import BsNavbar from 'ember-bootstrap/components/bs-navbar';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

module('Integration | Component | bs-navbar', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  testBS4('it has correct default markup', async function (assert) {
    await render(<template><BsNavbar /></template>);

    assert.dom('nav').exists({ count: 1 }, 'there is only one nav element');
    assert.dom('nav').hasClass('navbar', 'the navbar has the navbar class');
    assert
      .dom('nav')
      .hasClass('navbar-light', 'the navbar has the navbar-default class');
    // No container by default because fluid is automatic
  });

  testBS5('it has correct default markup', async function (assert) {
    await render(<template><BsNavbar /></template>);

    assert.dom('nav').exists({ count: 1 }, 'there is only one nav element');
    assert.dom('nav').hasClass('navbar', 'the navbar has the navbar class');
    assert
      .dom('nav')
      .hasClass('navbar-light', 'the navbar has the navbar-default class');
    assert
      .dom('nav > div')
      .exists({ count: 1 }, 'there is a div right under the nav element');
    assert
      .dom('nav > div')
      .hasClass('container-fluid', 'the div is a fluid container');
  });

  test('it handles inverse navbars properly', async function (assert) {
    await render(<template><BsNavbar @type='inverse' /></template>);

    assert
      .dom('nav')
      .hasClass('navbar-inverse', 'the navbar has the navbar-inverse class');
    assert
      .dom('nav')
      .hasNoClass(
        'navbar-default',
        'the navbar does not have the navbar-default class',
      );
  });

  test('it handles fluid containers properly', async function (assert) {
    await render(<template><BsNavbar @fluid={{false}} /></template>);

    assert
      .dom('nav > div')
      .hasClass('container', 'the wrapping div has the container class');
    assert
      .dom('nav > div')
      .hasNoClass(
        'container-fluid',
        'the wrapping div does not have the container-fluid class',
      );
  });

  testBS5('it supports custom containers', async function (assert) {
    await render(<template><BsNavbar @container='md' /></template>);

    assert
      .dom('nav > div')
      .hasClass('container-md', 'the wrapping div has the container class');
    assert
      .dom('nav > div')
      .hasNoClass(
        'container-fluid',
        'the wrapping div does not have the container-fluid class',
      );
  });

  test('it handles the toggling action properly', async function (assert) {
    await render(
      <template>
        <BsNavbar as |navbar|>
          <navbar.toggle @class='clickme'>Button</navbar.toggle>
        </BsNavbar>
      </template>,
    );

    assert
      .dom('button.navbar-toggler')
      .hasClass(
        'collapsed',
        'ensure the default state of the button through the active class',
      );

    await click('button');
    assert
      .dom('button.navbar-toggler')
      .hasNoClass(
        'collapsed',
        'ensure the toggled state of the button through the active class',
      );
  });

  test('it exposes all the requisite contextual components', async function (assert) {
    await render(
      <template>
        <BsNavbar as |navbar|>
          <div class='navbar-header'>
            {{navbar.toggle}}
            <a class='navbar-brand' href='#'>Brand</a>
          </div>
          <navbar.content>
            {{navbar.nav}}
          </navbar.content>
        </BsNavbar>
      </template>,
    );

    assert.dom('nav.navbar-light').exists({ count: 1 }, 'it has the navbar');
    assert
      .dom('nav.navbar-light .navbar-header > button.navbar-toggler')
      .exists({ count: 1 }, 'it has the navbar toggle');
    assert
      .dom('nav.navbar-light .navbar-collapse')
      .exists({ count: 1 }, 'it has the navbar content');
    assert
      .dom('nav.navbar-light .navbar-collapse > .navbar-nav')
      .exists({ count: 1 }, 'it has the navbar nav');
  });

  test('it nas no positional classes when position is not specified', async function (assert) {
    await render(<template><BsNavbar /></template>);

    assert
      .dom('nav')
      .hasNoClass(
        positionClassFor('fixed-top'),
        'it does not have position fixed-top',
      );
    assert
      .dom('nav')
      .hasNoClass(
        positionClassFor('fixed-bottom'),
        'it does not have position fixed-bottom',
      );
    assert
      .dom('nav')
      .hasNoClass(
        positionStickyClass(),
        `it does not have ${positionStickyClass()}`,
      );
  });

  test('it handles fixed-top properly', async function (assert) {
    await render(<template><BsNavbar @position='fixed-top' /></template>);

    assert
      .dom('nav')
      .hasClass(positionClassFor('fixed-top'), 'it has position fixed-top');
    assert
      .dom('nav')
      .hasNoClass(
        positionClassFor('fixed-bottom'),
        'it does not have position fixed-bottom',
      );
    assert
      .dom('nav')
      .hasNoClass(
        positionStickyClass(),
        `it does not have ${positionStickyClass()}`,
      );
  });

  test('it handles fixed-bottom properly', async function (assert) {
    await render(<template><BsNavbar @position='fixed-bottom' /></template>);

    assert
      .dom('nav')
      .hasNoClass(
        positionClassFor('fixed-top'),
        'it does not have position fixed-top',
      );
    assert
      .dom('nav')
      .hasClass(
        positionClassFor('fixed-bottom'),
        'it has position fixed-bottom',
      );
    assert
      .dom('nav')
      .hasNoClass(
        positionStickyClass(),
        `it does not have ${positionStickyClass()}`,
      );
  });

  test('it handles navbar-expand[-*] properly', async function (assert) {
    await render(<template><BsNavbar @toggleBreakpoint='sm' /></template>);
    assert
      .dom('nav')
      .hasNoClass(
        'navbar-expand-lg',
        'it does not have default navbar-expand-lg',
      );
    assert.dom('nav').hasClass('navbar-expand-sm', 'it has navbar-expand-sm');
  });

  test('it handles navbar-expand properly', async function (assert) {
    await render(<template><BsNavbar @toggleBreakpoint={{null}} /></template>);
    assert.dom('nav').hasClass('navbar-expand', 'it has navbar-expand');
  });

  test('it handles sticky-top properly', async function (assert) {
    await render(<template><BsNavbar @position='sticky-top' /></template>);

    assert
      .dom('nav')
      .hasNoClass(
        positionClassFor('fixed-top'),
        'it does not have position fixed-top',
      );
    assert
      .dom('nav')
      .hasNoClass(
        positionClassFor('fixed-bottom'),
        'it does not have position fixed-bottom',
      );
    assert
      .dom('nav')
      .hasClass(positionStickyClass(), `it has ${positionStickyClass()}`);
  });

  test('setting collapse to false expands the navbar', async function (assert) {
    const expandedAction = sinon.spy();
    class State {
      @tracked collapsed = true;
    }
    const state = new State();

    await render(
      <template>
        <BsNavbar
          @collapsed={{state.collapsed}}
          @onExpanded={{expandedAction}}
          as |navbar|
        >
          <div class='navbar-header'>
            {{navbar.toggle}}
            <a class='navbar-brand' href='#'>Brand</a>
          </div>
          <navbar.content>
            {{navbar.nav}}
          </navbar.content>
        </BsNavbar>
      </template>,
    );
    state.collapsed = false;
    await waitFor('.collapsing');

    assert
      .dom('.navbar-collapse')
      .hasClass(
        'collapsing',
        'collapse has collapsing class while transition is running',
      );

    await settled();
    assert.ok(expandedAction.calledOnce, 'onExpanded action has been called');
    assert
      .dom('.navbar-collapse')
      .hasClass('collapse', 'collapse has collapse class');
    assert
      .dom('.navbar-collapse')
      .hasClass(visibilityClass(), 'collapse has visibility class');
  });

  test('setting collapse to true collapses the navbar', async function (assert) {
    const collapsedAction = sinon.spy();
    class State {
      @tracked collapsed = false;
    }
    const state = new State();

    await render(
      <template>
        <BsNavbar
          @collapsed={{state.collapsed}}
          @onCollapsed={{collapsedAction}}
          as |navbar|
        >
          <div class='navbar-header'>
            {{navbar.toggle}}
            <a class='navbar-brand' href='#'>Brand</a>
          </div>
          <navbar.content>
            {{navbar.nav}}
          </navbar.content>
        </BsNavbar>
      </template>,
    );
    state.collapsed = true;
    await waitFor('.collapsing');

    assert
      .dom('.navbar-collapse')
      .hasClass(
        'collapsing',
        'collapse has collapsing class while transition is running',
      );

    // wait for transitions to complete
    await settled();
    assert.ok(collapsedAction.calledOnce, 'onCollapsed action has been called');
    assert
      .dom('.navbar-collapse')
      .hasClass('collapse', 'collapse has collapse class');
    assert
      .dom('.navbar-collapse')
      .hasNoClass('in', 'collapse does not have in class');
  });

  test('Expanding the navbar calls onExpand/onExpanded actions', async function (assert) {
    const expandAction = sinon.spy();
    const expandedAction = sinon.spy();

    await render(
      <template>
        <BsNavbar
          @collapsed={{true}}
          @onExpand={{expandAction}}
          @onExpanded={{expandedAction}}
          as |navbar|
        >
          <div class='navbar-header'>
            {{navbar.toggle}}
            <a class='navbar-brand' href='#'>Brand</a>
          </div>
          <navbar.content>
            {{navbar.nav}}
          </navbar.content>
        </BsNavbar>
      </template>,
    );
    await click('button');

    assert.ok(expandAction.calledOnce, 'onExpand action has been called');

    // wait for transitions to complete
    await settled();
    assert.ok(expandedAction.calledOnce, 'onExpanded action has been called');
    assert
      .dom('.navbar-collapse')
      .hasClass('collapse', 'collapse has collapse class');
    assert
      .dom('.navbar-collapse')
      .hasClass(visibilityClass(), 'collapse has visibility class');
  });

  test('Collapsing the navbar calls onCollapse/onCollapsed actions', async function (assert) {
    const collapseAction = sinon.spy();
    const collapsedAction = sinon.spy();

    await render(
      <template>
        <BsNavbar
          @collapsed={{false}}
          @onCollapse={{collapseAction}}
          @onCollapsed={{collapsedAction}}
          as |navbar|
        >
          <div class='navbar-header'>
            {{navbar.toggle}}
            <a class='navbar-brand' href='#'>Brand</a>
          </div>
          <navbar.content>
            {{navbar.nav}}
          </navbar.content>
        </BsNavbar>
      </template>,
    );
    await click('button');

    assert.ok(collapseAction.calledOnce, 'onCollapse action has been called');

    // wait for transitions to complete
    await settled();
    assert.ok(collapsedAction.calledOnce, 'onCollapsed action has been called');
    assert
      .dom('.navbar-collapse')
      .hasClass('collapse', 'collapse has collapse class');
    assert
      .dom('.navbar-collapse')
      .hasNoClass('in', 'collapse does not have in class');
  });

  test('navbar is not expanded when onExpand action returns false', async function (assert) {
    const expandAction = sinon.stub().returns(false);

    await render(
      <template>
        <BsNavbar @collapsed={{true}} @onExpand={{expandAction}} as |navbar|>
          <div class='navbar-header'>
            {{navbar.toggle}}
            <a class='navbar-brand' href='#'>Brand</a>
          </div>
          <navbar.content>
            {{navbar.nav}}
          </navbar.content>
        </BsNavbar>
      </template>,
    );
    await click('button');
    assert.ok(expandAction.calledOnce, 'onExpand has been called.');

    assert.dom('.collapsing').doesNotExist('no transition');
  });

  test('navbar is not collapsed when onCollapse action returns false', async function (assert) {
    const collapseAction = sinon.stub().returns(false);

    await render(
      <template>
        <BsNavbar
          @collapsed={{false}}
          @onCollapse={{collapseAction}}
          as |navbar|
        >
          <div class='navbar-header'>
            {{navbar.toggle}}
            <a class='navbar-brand' href='#'>Brand</a>
          </div>
          <navbar.content>
            {{navbar.nav}}
          </navbar.content>
        </BsNavbar>
      </template>,
    );
    await click('button');
    assert.ok(collapseAction.calledOnce, 'onCollapse has been called.');

    assert.dom('.collapsing').doesNotExist('no transition');
  });

  test('clicking the toggle does not modify the public collapsed property', async function (assert) {
    class State {
      @tracked collapsed = true;
    }
    const state = new State();
    await render(
      <template>
        <BsNavbar @collapsed={{state.collapsed}} as |navbar|>
          <div class='navbar-header'>
            {{navbar.toggle}}
            <a class='navbar-brand' href='#'>Brand</a>
          </div>
        </BsNavbar>
      </template>,
    );

    await click('button');
    assert.true(state.collapsed, 'collapse property did not change');
  });

  test('Navbar yields collapse action', async function (assert) {
    const collapseAction = sinon.spy();

    await render(
      <template>
        <BsNavbar
          @collapsed={{false}}
          @onCollapse={{collapseAction}}
          as |navbar|
        >
          <button type='button' {{on 'click' navbar.collapse}}>Collapse</button>
        </BsNavbar>
      </template>,
    );

    await click('button');
    assert.ok(collapseAction.calledOnce, 'onCollapse action has been called.');
  });

  test('Navbar yields expand action', async function (assert) {
    const expandAction = sinon.spy();

    await render(
      <template>
        <BsNavbar @collapsed={{true}} @onExpand={{expandAction}} as |navbar|>
          <button type='button' {{on 'click' navbar.expand}}>Expand</button>
        </BsNavbar>
      </template>,
    );

    await click('button');
    assert.ok(expandAction.calledOnce, 'onExpand action has been called.');
  });

  test('Navbar yields toggleNavbar action', async function (assert) {
    const expanded = sinon.spy();
    const collapsed = sinon.spy();

    await render(
      <template>
        <BsNavbar
          @collapsed={{true}}
          @onExpand={{expanded}}
          @onCollapse={{collapsed}}
          as |navbar|
        >
          <button
            type='button'
            {{on 'click' navbar.toggleNavbar}}
          >Expand</button>
        </BsNavbar>
      </template>,
    );

    await click('button');
    assert.ok(expanded.calledOnce, 'onExpand action has been called.');

    await click('button');
    assert.ok(collapsed.calledOnce, 'onCollapse action has been called.');
  });

  test('Clicking expanded navbar link collapses navbar', async function (assert) {
    const collapseAction = sinon.spy();

    this.owner.setupRouter();

    await render(
      <template>
        <BsNavbar
          @collapsed={{false}}
          @onCollapse={{collapseAction}}
          as |navbar|
        >
          <div class='navbar-header'>
            {{navbar.toggle}}
            <a class='navbar-brand' href='#'>Brand</a>
          </div>
          <navbar.content>
            <navbar.nav as |nav|>
              <nav.item><nav.linkTo
                  @route='index'
                  id='link'
                  @disabled={{true}}
                >Home</nav.linkTo></nav.item>
            </navbar.nav>
          </navbar.content>
        </BsNavbar>
      </template>,
    );
    await click('#link');

    assert.ok(collapseAction.calledOnce, 'onCollapse action has been called');
  });

  test('it passes accessibility checks', async function (assert) {
    this.owner.setupRouter();

    await render(
      <template>
        <BsNavbar as |navbar|>
          <div class='navbar-header'>
            {{navbar.toggle}}
            <a class='navbar-brand' href='#'>Brand</a>
          </div>
          <navbar.content>
            <navbar.nav as |nav|>
              <nav.item><nav.linkTo @route='index'>Home</nav.linkTo></nav.item>
            </navbar.nav>
          </navbar.content>
        </BsNavbar>
      </template>,
    );

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
