import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';
import {
  positionClassFor,
  positionStickyClass,
  test,
  testBS3,
  testNotBS3,
  visibilityClass,
} from '../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';

module('Integration | Component | bs-navbar', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  testBS3('it has correct default markup', async function (assert) {
    await render(hbs`<BsNavbar />`);

    assert.dom('nav').exists({ count: 1 }, 'there is only one nav element');
    assert.dom('nav').hasClass('navbar', 'the navbar has the navbar class');
    assert.dom('nav').hasClass('navbar-default', 'the navbar has the navbar-default class');
    assert.dom('nav > div').exists({ count: 1 }, 'there is a div right under the nav element');
    assert.dom('nav > div').hasClass('container-fluid', 'the div is a fluid container');
  });

  testNotBS3('it has correct default markup', async function (assert) {
    await render(hbs`<BsNavbar />`);

    assert.dom('nav').exists({ count: 1 }, 'there is only one nav element');
    assert.dom('nav').hasClass('navbar', 'the navbar has the navbar class');
    assert.dom('nav').hasClass('navbar-light', 'the navbar has the navbar-default class');
    // No container by default because fluid is automatic
  });

  test('it handles inverse navbars properly', async function (assert) {
    await render(hbs`<BsNavbar @type="inverse" />`);

    assert.dom('nav').hasClass('navbar-inverse', 'the navbar has the navbar-inverse class');
    assert.dom('nav').hasNoClass('navbar-default', 'the navbar does not have the navbar-default class');
  });

  test('it handles fluid containers properly', async function (assert) {
    await render(hbs`<BsNavbar @fluid={{false}} />`);

    assert.dom('nav > div').hasClass('container', 'the wrapping div has the container class');
    assert.dom('nav > div').hasNoClass('container-fluid', 'the wrapping div does not have the container-fluid class');
  });

  testBS3('it handles the toggling action properly', async function (assert) {
    await render(hbs`
      <BsNavbar as |navbar|>
        <navbar.toggle @class="clickme">Button</navbar.toggle>
      </BsNavbar>
    `);

    assert
      .dom('button.navbar-toggle')
      .hasClass('collapsed', 'ensure the default state of the button through the active class');

    await click('button');
    assert
      .dom('button.navbar-toggle')
      .hasNoClass('collapsed', 'ensure the toggled state of the button through the active class');
  });

  testNotBS3('it handles the toggling action properly', async function (assert) {
    await render(hbs`
      <BsNavbar as |navbar|>
        <navbar.toggle @class="clickme">Button</navbar.toggle>
      </BsNavbar>
    `);

    assert
      .dom('button.navbar-toggler')
      .hasClass('collapsed', 'ensure the default state of the button through the active class');

    await click('button');
    assert
      .dom('button.navbar-toggler')
      .hasNoClass('collapsed', 'ensure the toggled state of the button through the active class');
  });

  testBS3('it exposes all the requisite contextual components', async function (assert) {
    await render(hbs`
      <BsNavbar as |navbar|>
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        <navbar.content>
          {{navbar.nav}}
        </navbar.content>
      </BsNavbar>
    `);

    assert.dom('nav.navbar-default').exists({ count: 1 }, 'it has the navbar');
    assert
      .dom('nav.navbar-default .navbar-header > button.navbar-toggle')
      .exists({ count: 1 }, 'it has the navbar toggle');
    assert.dom('nav.navbar-default .navbar-collapse').exists({ count: 1 }, 'it has the navbar content');
    assert.dom('nav.navbar-default .navbar-collapse > .navbar-nav').exists({ count: 1 }, 'it has the navbar nav');
  });

  testNotBS3('it exposes all the requisite contextual components', async function (assert) {
    await render(hbs`
      <BsNavbar as |navbar|>
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        <navbar.content>
          {{navbar.nav}}
        </navbar.content>
      </BsNavbar>
    `);

    assert.dom('nav.navbar-light').exists({ count: 1 }, 'it has the navbar');
    assert
      .dom('nav.navbar-light .navbar-header > button.navbar-toggler')
      .exists({ count: 1 }, 'it has the navbar toggle');
    assert.dom('nav.navbar-light .navbar-collapse').exists({ count: 1 }, 'it has the navbar content');
    assert.dom('nav.navbar-light .navbar-collapse > .navbar-nav').exists({ count: 1 }, 'it has the navbar nav');
  });

  test('it nas no positional classes when position is not specified', async function (assert) {
    await render(hbs`<BsNavbar />`);

    assert.dom('nav').hasNoClass(positionClassFor('fixed-top'), 'it does not have position fixed-top');
    assert.dom('nav').hasNoClass(positionClassFor('fixed-bottom'), 'it does not have position fixed-bottom');
    assert.dom('nav').hasNoClass(positionStickyClass(), `it does not have ${positionStickyClass()}`);
  });

  test('it handles fixed-top properly', async function (assert) {
    await render(hbs`<BsNavbar @position="fixed-top" />`);

    assert.dom('nav').hasClass(positionClassFor('fixed-top'), 'it has position fixed-top');
    assert.dom('nav').hasNoClass(positionClassFor('fixed-bottom'), 'it does not have position fixed-bottom');
    assert.dom('nav').hasNoClass(positionStickyClass(), `it does not have ${positionStickyClass()}`);
  });

  test('it handles fixed-bottom properly', async function (assert) {
    await render(hbs`<BsNavbar @position="fixed-bottom" />`);

    assert.dom('nav').hasNoClass(positionClassFor('fixed-top'), 'it does not have position fixed-top');
    assert.dom('nav').hasClass(positionClassFor('fixed-bottom'), 'it has position fixed-bottom');
    assert.dom('nav').hasNoClass(positionStickyClass(), `it does not have ${positionStickyClass()}`);
  });

  testNotBS3('it handles navbar-expand[-*] properly', async function (assert) {
    await render(hbs`<BsNavbar @toggleBreakpoint="sm" />`);
    assert.dom('nav').hasNoClass('navbar-expand-lg', 'it does not have default navbar-expand-lg');
    assert.dom('nav').hasClass('navbar-expand-sm', 'it has navbar-expand-sm');
  });

  testNotBS3('it handles navbar-expand properly', async function (assert) {
    await render(hbs`<BsNavbar @toggleBreakpoint={{null}} />`);
    assert.dom('nav').hasClass('navbar-expand', 'it has navbar-expand');
  });

  testBS3('it handles static-top properly', async function (assert) {
    await render(hbs`<BsNavbar @position="static-top" />`);

    assert.dom('nav').hasNoClass(positionClassFor('fixed-top'), 'it does not have position fixed-top');
    assert.dom('nav').hasNoClass(positionClassFor('fixed-bottom'), 'it does not have position fixed-bottom');
    assert.dom('nav').hasClass(positionStickyClass(), `it has ${positionStickyClass()}`);
  });

  testNotBS3('it handles sticky-top properly', async function (assert) {
    await render(hbs`<BsNavbar @position="sticky-top" />`);

    assert.dom('nav').hasNoClass(positionClassFor('fixed-top'), 'it does not have position fixed-top');
    assert.dom('nav').hasNoClass(positionClassFor('fixed-bottom'), 'it does not have position fixed-bottom');
    assert.dom('nav').hasClass(positionStickyClass(), `it has ${positionStickyClass()}`);
  });

  test('setting collapse to false expands the navbar', async function (assert) {
    let expandedAction = sinon.spy();
    this.actions.expandedAction = expandedAction;

    this.set('collapsed', true);
    await render(hbs`
      {{#bs-navbar collapsed=this.collapsed onExpanded=(action "expandedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        <navbar.content>
          {{navbar.nav}}
        </navbar.content>
      {{/bs-navbar}}
    `);
    this.set('collapsed', false);
    assert.dom('.navbar-collapse').hasClass('collapsing', 'collapse has collapsing class while transition is running');

    await settled();
    assert.ok(expandedAction.calledOnce, 'onExpanded action has been called');
    assert.dom('.navbar-collapse').hasClass('collapse', 'collapse has collapse class');
    assert.dom('.navbar-collapse').hasClass(visibilityClass(), 'collapse has visibility class');
  });

  test('setting collapse to true collapses the navbar', async function (assert) {
    let collapsedAction = sinon.spy();
    this.actions.collapsedAction = collapsedAction;

    this.set('collapsed', false);
    await render(hbs`
      {{#bs-navbar collapsed=this.collapsed onCollapsed=(action "collapsedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        <navbar.content>
          {{navbar.nav}}
        </navbar.content>
      {{/bs-navbar}}
    `);
    this.set('collapsed', true);

    assert.dom('.navbar-collapse').hasClass('collapsing', 'collapse has collapsing class while transition is running');

    // wait for transitions to complete
    await settled();
    assert.ok(collapsedAction.calledOnce, 'onCollapsed action has been called');
    assert.dom('.navbar-collapse').hasClass('collapse', 'collapse has collapse class');
    assert.dom('.navbar-collapse').hasNoClass('in', 'collapse does not have in class');
  });

  test('Expanding the navbar calls onExpand/onExpanded actions', async function (assert) {
    let expandAction = sinon.spy();
    let expandedAction = sinon.spy();
    this.actions.expandAction = expandAction;
    this.actions.expandedAction = expandedAction;

    await render(hbs`
      {{#bs-navbar collapsed=true onExpand=(action "expandAction") onExpanded=(action "expandedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        <navbar.content>
          {{navbar.nav}}
        </navbar.content>
      {{/bs-navbar}}
    `);
    await click('button');

    assert.ok(expandAction.calledOnce, 'onExpand action has been called');

    // wait for transitions to complete
    await settled();
    assert.ok(expandedAction.calledOnce, 'onExpanded action has been called');
    assert.dom('.navbar-collapse').hasClass('collapse', 'collapse has collapse class');
    assert.dom('.navbar-collapse').hasClass(visibilityClass(), 'collapse has visibility class');
  });

  test('Collapsing the navbar calls onCollapse/onCollapsed actions', async function (assert) {
    let collapseAction = sinon.spy();
    let collapsedAction = sinon.spy();
    this.actions.collapseAction = collapseAction;
    this.actions.collapsedAction = collapsedAction;

    await render(hbs`
      {{#bs-navbar collapsed=false onCollapse=(action "collapseAction") onCollapsed=(action "collapsedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        <navbar.content>
          {{navbar.nav}}
        </navbar.content>
      {{/bs-navbar}}
    `);
    await click('button');

    assert.ok(collapseAction.calledOnce, 'onCollapse action has been called');

    // wait for transitions to complete
    await settled();
    assert.ok(collapsedAction.calledOnce, 'onCollapsed action has been called');
    assert.dom('.navbar-collapse').hasClass('collapse', 'collapse has collapse class');
    assert.dom('.navbar-collapse').hasNoClass('in', 'collapse does not have in class');
  });

  test('navbar is not expanded when onExpand action returns false', async function (assert) {
    let action = sinon.stub();
    action.returns(false);
    this.actions.expandAction = action;

    await render(hbs`
      <BsNavbar @collapsed={{true}} @onExpand={{action "expandAction"}} as |navbar|>
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        <navbar.content>
          {{navbar.nav}}
        </navbar.content>
      </BsNavbar>
    `);
    await click('button');
    assert.ok(action.calledOnce, 'onExpand has been called.');

    assert.dom('.collapsing').doesNotExist('no transition');
  });

  test('navbar is not collapsed when onCollapse action returns false', async function (assert) {
    let action = sinon.stub();
    action.returns(false);
    this.actions.collapseAction = action;

    await render(hbs`
      <BsNavbar @collapsed={{false}} @onCollapse={{action "collapseAction"}} as |navbar|>
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        <navbar.content>
          {{navbar.nav}}
        </navbar.content>
      </BsNavbar>
    `);
    await click('button');
    assert.ok(action.calledOnce, 'onCollapse has been called.');

    assert.dom('.collapsing').doesNotExist('no transition');
  });

  test('clicking the toggle does not modify the public collapsed property', async function (assert) {
    this.set('collapsed', true);
    await render(hbs`
      <BsNavbar @collapsed={{this.collapsed}} as |navbar|>
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
      </BsNavbar>
    `);

    await click('button');
    assert.equal(this.collapsed, true, 'collapse property did not change');
  });

  test('Navbar yields collapse action', async function (assert) {
    let action = sinon.spy();
    this.actions.action = action;

    await render(hbs`
      <BsNavbar @collapsed={{false}} @onCollapse={{action "action"}} as |navbar|>
        <button type="button" {{action navbar.collapse}}>Collapse</button>
      </BsNavbar>
    `);

    await click('button');
    assert.ok(action.calledOnce, 'onCollapse action has been called.');
  });

  test('Navbar yields expand action', async function (assert) {
    let action = sinon.spy();
    this.actions.action = action;

    await render(hbs`
      <BsNavbar @collapsed={{true}} @onExpand={{action "action"}} as |navbar|>
        <button type="button" {{action navbar.expand}}>Expand</button>
      </BsNavbar>
    `);

    await click('button');
    assert.ok(action.calledOnce, 'onExpand action has been called.');
  });

  test('Navbar yields toggleNavbar action', async function (assert) {
    let expanded = sinon.spy();
    this.actions.expanded = expanded;

    let collapsed = sinon.spy();
    this.actions.collapsed = collapsed;

    await render(hbs`
      <BsNavbar @collapsed={{true}} @onExpand={{action "expanded"}} @onCollapse={{action "collapsed"}} as |navbar|>
        <button type="button" {{action navbar.toggleNavbar}}>Expand</button>
      </BsNavbar>
    `);

    await click('button');
    assert.ok(expanded.calledOnce, 'onExpand action has been called.');

    await click('button');
    assert.ok(collapsed.calledOnce, 'onCollapse action has been called.');
  });

  test('Clicking expanded navbar link collapses navbar', async function (assert) {
    let collapseAction = sinon.spy();
    this.actions.collapseAction = collapseAction;

    this.owner.setupRouter();

    await render(hbs`
      <BsNavbar @collapsed={{false}} @onCollapse={{action "collapseAction"}} as |navbar|>
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        <navbar.content>
          <navbar.nav as |nav|>
            <nav.item><nav.linkTo @route="index" id="link" @disabled={{true}}>Home</nav.linkTo></nav.item>
          </navbar.nav>
        </navbar.content>
      </BsNavbar>
    `);
    await click('#link');

    assert.ok(collapseAction.calledOnce, 'onCollapse action has been called');
  });

  test('it passes accessibility checks', async function (assert) {
    this.owner.setupRouter();

    await render(hbs`
      <BsNavbar as |navbar|>
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        <navbar.content>
          <navbar.nav as |nav|>
            <nav.item><nav.linkTo @route="index">Home</nav.linkTo></nav.item>
          </navbar.nav>
        </navbar.content>
      </BsNavbar>
    `);

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
