import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  accordionClassFor,
  accordionItemHeadClass,
  test,
  testBS3,
  testNotBS3,
  visibilityClass,
} from '../../helpers/bootstrap';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';

module('Integration | Component | bs-accordion', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  testBS3('accordion has correct default markup', async function (assert) {
    await render(hbs`
      <BsAccordion as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);
    assert.dom('.panel-group').exists('accordion has panel-group class');
  });

  testNotBS3('accordion has correct default markup', async function (assert) {
    await render(hbs`
      <BsAccordion as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);
    assert.dom('.accordion .card').exists('accordion has card within accordion');
  });

  test('accordion yields items', async function (assert) {
    await render(hbs`
      <BsAccordion as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);
    assert.dom(`.${accordionClassFor()}`).exists({ count: 2 }, 'accordion yields item');
  });

  test('accordion with preselected item has this item expanded', async function (assert) {
    this.set('selected', 1);
    await render(hbs`
      <BsAccordion @selected={{this.selected}} as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);

    assert
      .dom(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`)
      .hasNoClass('collapsed', `${accordionItemHeadClass()} has not collapsed class`);
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass('collapse', 'tabpanel has collapse class');
    assert
      .dom(`.${accordionClassFor()}:first-child .collapse`)
      .hasClass(visibilityClass(), `tabpanel has ${visibilityClass()} class`);
  });

  test('changing selected item expands this item', async function (assert) {
    this.set('selected', 1);
    await render(hbs`
      <BsAccordion @selected={{this.selected}} as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);
    this.set('selected', 2);

    // wait for transitions to complete
    await settled();
    assert
      .dom(`.${accordionClassFor()}:last-child .${accordionItemHeadClass()}`)
      .hasNoClass('collapsed', `${accordionItemHeadClass()} has not collapsed class`);
    assert.dom(`.${accordionClassFor()}:last-child .collapse`).hasClass('collapse', 'tabpanel has collapse class');
    assert.dom(`.${accordionClassFor()}:last-child .collapse`).hasClass(visibilityClass(), 'tabpanel is visible');
  });

  test('clicking collapsed item expands it', async function (assert) {
    await render(hbs`
      <BsAccordion as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);
    await click(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`);

    assert
      .dom(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`)
      .hasNoClass('collapsed', `${accordionItemHeadClass()} has not collapsed class`);
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass('collapse', 'tabpanel has collapse class');
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass(visibilityClass(), 'tabpanel is visible');
  });

  test('clicking expanded item collapses it', async function (assert) {
    await render(hbs`
      <BsAccordion @selected={{1}} as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);

    assert
      .dom(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`)
      .hasNoClass('collapsed', `${accordionItemHeadClass()} has not collapsed class`);
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass('collapse', 'tabpanel has collapse class');
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass(visibilityClass(), 'tabpanel is visible');

    await click(`.${accordionItemHeadClass()}`);

    assert
      .dom(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`)
      .hasClass('collapsed', `${accordionItemHeadClass()} has collapsed class`);
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass('collapse', 'tabpanel has collapse class');
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasNoClass(visibilityClass(), 'tabpanel is hidden');
  });

  test('calls onChange action when changing selection', async function (assert) {
    let action = sinon.spy();
    this.actions.change = action;
    await render(hbs`
      <BsAccordion @onChange={{action "change"}} as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);

    await click(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`);
    assert.ok(action.calledWith(1), 'onClick action has been called.');
  });

  test('prevents changing selection when onChange returns false', async function (assert) {
    let action = sinon.stub();
    action.returns(false);
    this.actions.change = action;
    await render(hbs`
      <BsAccordion @onChange={{action "change"}} as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);

    await click(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`);
    assert.ok(action.calledWith(1), 'onClick action has been called.');

    assert
      .dom(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`)
      .hasClass('collapsed', `${accordionItemHeadClass()} has collapsed class`);
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass('collapse', 'tabpanel has collapse class');
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasNoClass(visibilityClass(), 'tabpanel is hidden');
  });

  test('supports undefined as value of onChange argument', async function (assert) {
    await render(hbs`
      <BsAccordion @onChange={{undefined}} as |acc|>
        <acc.item @value={{1}} @title="TITLE1" data-test-item="1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);
    assert.dom(`[data-test-item="1"] .collapse`).hasNoClass(visibilityClass());

    await click(`[data-test-item="1"] .${accordionItemHeadClass()}`);
    assert.dom(`[data-test-item="1"] .collapse`).hasClass(visibilityClass());
  });

  test('changing selection does not leak to public selected property (DDAU)', async function (assert) {
    this.set('selected', 1);
    await render(hbs`
      <BsAccordion @selected={{this.selected}} as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);

    await click(`.${accordionClassFor()}:last-child .${accordionItemHeadClass()}`);
    assert.equal(this.selected, 1, 'Does not modify public selected property');
  });

  test('yields change action to add custom behaviour', async function (assert) {
    this.set('selected', 1);
    await render(hbs`
      <BsAccordion @selected={{1}} as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1 <button type="button" id="btn" {{action acc.change 2}}>Next</button></acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);

    await click('#btn');

    assert
      .dom(`.${accordionClassFor()}:last-child .${accordionItemHeadClass()}`)
      .hasNoClass('collapsed', `${accordionItemHeadClass()} has not collapsed class`);
    assert.dom(`.${accordionClassFor()}:last-child .collapse`).hasClass('collapse', 'tabpanel has collapse class');
    assert.dom(`.${accordionClassFor()}:last-child .collapse`).hasClass(visibilityClass(), 'tabpanel is visible');
  });

  test('clicking collapsed item with contextual title expands it', async function (assert) {
    await render(hbs`
      <BsAccordion as |acc|>
        <acc.item @value={{1}} as |aitem|>
          <aitem.title>TITLE1</aitem.title>
          <aitem.body>CONTENT1</aitem.body>
        </acc.item>
        <acc.item @value={{2}}>CONTENT2</acc.item>
      </BsAccordion>
    `);

    await click(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`);

    assert
      .dom(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`)
      .hasNoClass('collapsed', `${accordionItemHeadClass()} has not collapsed class`);
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass('collapse', 'tabpanel has collapse class');
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass(visibilityClass(), 'tabpanel is visible');
  });

  test('clicking expanded item with contextual title collapses it', async function (assert) {
    await render(hbs`
      <BsAccordion @selected={{1}} as |acc|>
        <acc.item @value={{1}} as |aitem|>
          <aitem.title>TITLE1</aitem.title>
          <aitem.body>CONTENT1</aitem.body>
        </acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);

    assert
      .dom(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`)
      .hasNoClass('collapsed', `${accordionItemHeadClass()} has not collapsed class`);
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass('collapse', 'tabpanel has collapse class');
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass(visibilityClass(), 'tabpanel is visible');

    await click(`.${accordionItemHeadClass()}`);

    assert
      .dom(`.${accordionClassFor()}:first-child .${accordionItemHeadClass()}`)
      .hasClass('collapsed', `${accordionItemHeadClass()} has collapsed class`);
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasClass('collapse', 'tabpanel has collapse class');
    assert.dom(`.${accordionClassFor()}:first-child .collapse`).hasNoClass(visibilityClass(), 'tabpanel is hidden');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(hbs`
      <BsAccordion as |acc|>
        <acc.item @value={{1}} @title="TITLE1">CONTENT1</acc.item>
        <acc.item @value={{2}} @title="TITLE2">CONTENT2</acc.item>
      </BsAccordion>
    `);

    await a11yAudit({
      rules: {
        // @todo https://github.com/kaliber5/ember-bootstrap/issues/999
        'nested-interactive': {
          enabled: false,
        },
        'color-contrast': { enabled: false },
        'heading-order': { enabled: false },
      },
    });
    assert.ok(true, 'A11y audit passed');
  });
});
