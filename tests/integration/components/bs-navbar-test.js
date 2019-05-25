import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';
import {
  positionClassFor,
  positionStickyClass,
  test,
  testBS3,
  testBS4,
  visibilityClass
} from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';

module('Integration | Component | bs-navbar', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  testBS3('it has correct default markup', async function(assert) {
    await render(hbs`{{bs-navbar}}`);

    assert.dom('nav').exists({ count: 1 }, 'there is only one nav element');
    assert.dom('nav').hasClass('navbar', 'the navbar has the navbar class');
    assert.dom('nav').hasClass('navbar-default', 'the navbar has the navbar-default class');
    assert.dom('nav > div').exists({ count: 1 }, 'there is a div right under the nav element');
    assert.dom('nav > div').hasClass('container-fluid', 'the div is a fluid container');
  });

  testBS4('it has correct default markup', async function(assert) {
    await render(hbs`{{bs-navbar}}`);

    assert.dom('nav').exists({ count: 1 }, 'there is only one nav element');
    assert.dom('nav').hasClass('navbar', 'the navbar has the navbar class');
    assert.dom('nav').hasClass('navbar-light', 'the navbar has the navbar-default class');
    // No container by default because fluid is automatic
  });

  test('it handles inverse navbars properly', async function(assert) {
    await render(hbs`{{bs-navbar type="inverse"}}`);

    assert.dom('nav').hasClass('navbar-inverse', 'the navbar has the navbar-inverse class');
    assert.dom('nav').hasNoClass('navbar-default', 'the navbar does not have the navbar-default class');
  });

  test('it handles fluid containers properly', async function(assert) {
    await render(hbs`{{bs-navbar fluid=false}}`);

    assert.dom('nav > div').hasClass('container', 'the wrapping div has the container class');
    assert.dom('nav > div').hasNoClass(
      'container-fluid',
      'the wrapping div does not have the container-fluid class'
    );
  });

  testBS3('it handles the toggling action properly', async function(assert) {
    await render(hbs`
      {{#bs-navbar as |navbar|}}
        {{#navbar.toggle class="clickme"}}Button{{/navbar.toggle}}
      {{/bs-navbar}}
    `);

    assert.dom('button.navbar-toggle').hasClass(
      'collapsed',
      'ensure the default state of the button through the active class'
    );

    await click('button');
    assert.dom('button.navbar-toggle').hasNoClass(
      'collapsed',
      'ensure the toggled state of the button through the active class'
    );
  });

  testBS4('it handles the toggling action properly', async function(assert) {
    await render(hbs`
      {{#bs-navbar as |navbar|}}
        {{#navbar.toggle class="clickme"}}Button{{/navbar.toggle}}
      {{/bs-navbar}}
    `);

    assert.dom('button.navbar-toggler').hasClass(
      'collapsed',
      'ensure the default state of the button through the active class'
    );

    await click('button');
    assert.dom('button.navbar-toggler').hasNoClass(
      'collapsed',
      'ensure the toggled state of the button through the active class'
    );
  });



  testBS3('it exposes all the requisite contextual components', async function(assert) {
    await render(hbs`
      {{#bs-navbar as | navbar | }}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);

    assert.dom('nav.navbar-default').exists({ count: 1 }, 'it has the navbar');
    assert.dom('nav.navbar-default .navbar-header > button.navbar-toggle').exists({ count: 1 }, 'it has the navbar toggle');
    assert.dom('nav.navbar-default .navbar-collapse').exists({ count: 1 }, 'it has the navbar content');
    assert.dom('nav.navbar-default .navbar-collapse > .navbar-nav').exists({ count: 1 }, 'it has the navbar nav');
  });

  testBS4('it exposes all the requisite contextual components', async function(assert) {
    await render(hbs`
      {{#bs-navbar as | navbar | }}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);

    assert.dom('nav.navbar-light').exists({ count: 1 }, 'it has the navbar');
    assert.dom('nav.navbar-light .navbar-header > button.navbar-toggler').exists({ count: 1 }, 'it has the navbar toggle');
    assert.dom('nav.navbar-light .navbar-collapse').exists({ count: 1 }, 'it has the navbar content');
    assert.dom('nav.navbar-light .navbar-collapse > .navbar-nav').exists({ count: 1 }, 'it has the navbar nav');
  });

  test('it nas no positional classes when position is not specified', async function(assert) {
    await render(hbs`{{bs-navbar}}`);

    assert.dom('nav').hasNoClass(positionClassFor('fixed-top'), 'it does not have position fixed-top');
    assert.dom('nav').hasNoClass(positionClassFor('fixed-bottom'), 'it does not have position fixed-bottom');
    assert.dom('nav').hasNoClass(positionStickyClass(), `it does not have ${positionStickyClass()}`);
  });

  test('it handles fixed-top properly', async function(assert) {
    await render(hbs`{{bs-navbar position="fixed-top"}}`);

    assert.dom('nav').hasClass(positionClassFor('fixed-top'), 'it has position fixed-top');
    assert.dom('nav').hasNoClass(positionClassFor('fixed-bottom'), 'it does not have position fixed-bottom');
    assert.dom('nav').hasNoClass(positionStickyClass(), `it does not have ${positionStickyClass()}`);
  });

  test('it handles fixed-bottom properly', async function(assert) {
    await render(hbs`{{bs-navbar position="fixed-bottom"}}`);

    assert.dom('nav').hasNoClass(positionClassFor('fixed-top'), 'it does not have position fixed-top');
    assert.dom('nav').hasClass(positionClassFor('fixed-bottom'), 'it has position fixed-bottom');
    assert.dom('nav').hasNoClass(positionStickyClass(), `it does not have ${positionStickyClass()}`);
  });

  testBS4('it handles navbar-expand[-*] properly', async function(assert) {
    await render(hbs`{{bs-navbar toggleBreakpoint="sm"}}`);
    assert.dom('nav').hasNoClass('navbar-expand-lg', 'it does not have default navbar-expand-lg');
    assert.dom('nav').hasClass('navbar-expand-sm', 'it has navbar-expand-sm');
  });

  testBS4('it handles navbar-expand properly', async function(assert) {
    await render(hbs`{{bs-navbar toggleBreakpoint=null}}`);
    assert.dom('nav').hasClass('navbar-expand', 'it has navbar-expand');
  });

  testBS3('it handles static-top properly', async function(assert) {
    await render(hbs`{{bs-navbar position="static-top"}}`);

    assert.dom('nav').hasNoClass(positionClassFor('fixed-top'), 'it does not have position fixed-top');
    assert.dom('nav').hasNoClass(positionClassFor('fixed-bottom'), 'it does not have position fixed-bottom');
    assert.dom('nav').hasClass(positionStickyClass(), `it has ${positionStickyClass()}`);
  });

  testBS4('it handles sticky-top properly', async function(assert) {
    await render(hbs`{{bs-navbar position="sticky-top"}}`);

    assert.dom('nav').hasNoClass(positionClassFor('fixed-top'), 'it does not have position fixed-top');
    assert.dom('nav').hasNoClass(positionClassFor('fixed-bottom'), 'it does not have position fixed-bottom');
    assert.dom('nav').hasClass(positionStickyClass(), `it has ${positionStickyClass()}`);
  });

  test('setting collapse to false expands the navbar', async function(assert) {
    let expandedAction = this.spy();
    this.actions.expandedAction = expandedAction;

    this.set('collapsed', true);
    await render(hbs`
      {{#bs-navbar as collapsed=collapsed onExpanded=(action "expandedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    this.set('collapsed', false);
    assert.dom('.navbar-collapse').hasClass('collapsing', 'collapse has collapsing class while transition is running');

    await settled();
    assert.ok(expandedAction.calledOnce, 'onExpanded action has been called');
    assert.dom('.navbar-collapse').hasClass('collapse', 'collapse has collapse class');
    assert.dom('.navbar-collapse').hasClass(visibilityClass(), 'collapse has visibility class');
  });

  test('setting collapse to true collapses the navbar', async function(assert) {
    let collapsedAction = this.spy();
    this.actions.collapsedAction = collapsedAction;

    this.set('collapsed', false);
    await render(hbs`
      {{#bs-navbar as collapsed=collapsed onCollapsed=(action "collapsedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
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

  test('Expanding the navbar calls onExpand/onExpanded actions', async function(assert) {
    let expandAction = this.spy();
    let expandedAction = this.spy();
    this.actions.expandAction = expandAction;
    this.actions.expandedAction = expandedAction;

    await render(hbs`
      {{#bs-navbar as collapsed=true onExpand=(action "expandAction") onExpanded=(action "expandedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
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

  test('Collapsing the navbar calls onCollapse/onCollapsed actions', async function(assert) {
    let collapseAction = this.spy();
    let collapsedAction = this.spy();
    this.actions.collapseAction = collapseAction;
    this.actions.collapsedAction = collapsedAction;

    await render(hbs`
      {{#bs-navbar as collapsed=false onCollapse=(action "collapseAction") onCollapsed=(action "collapsedAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
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

  test('navbar is not expanded when onExpand action returns false', async function(assert) {
    let action = this.stub();
    action.returns(false);
    this.actions.expandAction = action;

    await render(hbs`
      {{#bs-navbar collapsed=true onExpand=(action "expandAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('button');
    assert.ok(action.calledOnce, 'onExpand has been called.');

    assert.dom('.collapsing').doesNotExist('no transition');
  });

  test('navbar is not collapsed when onCollapse action returns false', async function(assert) {
    let action = this.stub();
    action.returns(false);
    this.actions.collapseAction = action;

    await render(hbs`
      {{#bs-navbar collapsed=false onCollapse=(action "collapseAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('button');
    assert.ok(action.calledOnce, 'onCollapse has been called.');

    assert.dom('.collapsing').doesNotExist('no transition');
  });

  test('clicking the toggle does not modify the public collapsed property', async function(assert) {
    this.set('collapsed', true);
    await render(hbs`
      {{#bs-navbar collapsed=collapsed as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
      {{/bs-navbar}}
    `);

    await click('button');
    assert.equal(this.get('collapsed'), true, 'collapse property did not change');
  });

  test('Navbar yields collapse action', async function(assert) {
    let action = this.spy();
    this.actions.action = action;

    await render(hbs`{{#bs-navbar collapsed=false onCollapse=(action "action") as |navbar|}}
        <button {{action navbar.collapse}}>Collapse</button>
    {{/bs-navbar}}`);

    await click('button');
    assert.ok(action.calledOnce, 'onCollapse action has been called.');
  });

  test('Navbar yields expand action', async function(assert) {
    let action = this.spy();
    this.actions.action = action;

    await render(hbs`{{#bs-navbar collapsed=true onExpand=(action "action") as |navbar|}}
        <button {{action navbar.expand}}>Expand</button>
    {{/bs-navbar}}`);

    await click('button');
    assert.ok(action.calledOnce, 'onExpand action has been called.');
  });

  test('Navbar yields toggleNavbar action', async function(assert) {
    let expanded = this.spy();
    this.actions.expanded = expanded;

    let collapsed = this.spy();
    this.actions.collapsed = collapsed;

    await render(hbs`{{#bs-navbar collapsed=true onExpand=(action "expanded") onCollapse=(action "collapsed") as |navbar|}}
        <button {{action navbar.toggleNavbar}}>Expand</button>
    {{/bs-navbar}}`);

    await click('button');
    assert.ok(expanded.calledOnce, 'onExpand action has been called.');

    await click('button');
    assert.ok(collapsed.calledOnce, 'onCollapse action has been called.');
  });

  test('[DEPRECATED] Clicking expanded navbar link collapses navbar', async function(assert) {
    let collapseAction = this.spy();
    this.actions.collapseAction = collapseAction;

    await render(hbs`
      {{#bs-navbar as collapsed=false onCollapse=(action "collapseAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{#navbar.nav as |nav|}}
            {{#nav.item}}{{#nav.link-to "index" id="link" disabled=true}}Home{{/nav.link-to}}{{/nav.item}}
          {{/navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('#link');

    assert.ok(collapseAction.calledOnce, 'onCollapse action has been called');
    assert.deprecations();
  });

  test('[DEPRECATED] Clicking expanded navbar link does not collapse navbar when collapseNavbar is false', async function(assert) {
    let collapseAction = this.spy();
    this.actions.collapseAction = collapseAction;

    await render(hbs`
      {{#bs-navbar as collapsed=false onCollapse=(action "collapseAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{#navbar.nav as |nav|}}
            {{#nav.item}}{{#nav.link-to "index" id="link" disabled=true collapseNavbar=false}}Home{{/nav.link-to}}{{/nav.item}}
          {{/navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('#link');

    assert.notOk(collapseAction.called, 'onCollapse action has not been called');
    assert.deprecations();
  });

  test('Clicking expanded navbar link collapses navbar', async function(assert) {
    this.owner.lookup('router:main').setupRouter();

    let collapseAction = this.spy();
    this.actions.collapseAction = collapseAction;

    await render(hbs`
      {{#bs-navbar as collapsed=false onCollapse=(action "collapseAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{#navbar.nav as |nav|}}
            {{#nav.item linkTo="index" id="link" disabled=true}}Home{{/nav.item}}
          {{/navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('#link');

    assert.ok(collapseAction.calledOnce, 'onCollapse action has been called');
  });

  test('Clicking expanded navbar link does not collapse navbar when collapseNavbar is false', async function(assert) {
    this.owner.lookup('router:main').setupRouter();

    let collapseAction = this.spy();
    this.actions.collapseAction = collapseAction;

    await render(hbs`
      {{#bs-navbar as collapsed=false onCollapse=(action "collapseAction") as |navbar|}}
        <div class="navbar-header">
          {{navbar.toggle}}
          <a class="navbar-brand" href="#">Brand</a>
        </div>
        {{#navbar.content}}
          {{#navbar.nav as |nav|}}
            {{#nav.item linkTo="index" id="link" disabled=true collapseNavbar=false}}Home{{/nav.item}}
          {{/navbar.nav}}
        {{/navbar.content}}
      {{/bs-navbar}}
    `);
    await click('#link');

    assert.notOk(collapseAction.called, 'onCollapse action has not been called');
  });
});
