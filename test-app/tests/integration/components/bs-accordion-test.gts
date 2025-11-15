import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import {
  accordionClass,
  accordionItemClass,
  accordionItemClickableSelector,
  accordionItemHeadClass,
  test,
  visibilityClass,
} from '../../helpers/bootstrap';
import BsAccordion from 'ember-bootstrap/components/bs-accordion';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';

module('Integration | Component | bs-accordion', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('accordion has correct default markup', async function (assert) {
    await render(
      <template>
        <BsAccordion as |acc|>
          <acc.item
            @value={{1}}
            @title='TITLE1'
            data-test-item='1'
          >CONTENT1</acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );
    assert
      .dom(`.${accordionClass()}`)
      .exists({ count: 1 }, 'accordion has correct class');
    assert
      .dom(`.${accordionClass()} .accordion-collapse`)
      .exists({ count: 2 }, 'collapsable area of accordion has correct class');
    assert
      .dom(`.${accordionClass()} .${accordionItemClass()}`)
      .exists({ count: 2 }, 'accordion item has correct class');
    assert.dom('[data-test-item="1"] h2').hasText('TITLE1', 'renders title');
    assert
      .dom('[data-test-item="1"] .accordion-collapse')
      .hasAria(
        'describedby',
        find('[data-test-item="1"] h2')!.id,
        'aria: accordion body is described by accordion title',
      );
    assert
      .dom('[data-test-item="1"] h2 button')
      .hasAria(
        'controls',
        find('[data-test-item="1"] .accordion-collapse')!.id,
        'aria: accordion title controls collapsable part',
      );
  });

  test('accordion with preselected item has this item expanded', async function (assert) {
    const selected = 1;

    await render(
      <template>
        <BsAccordion @selected={{selected}} as |acc|>
          <acc.item @value={{1}} @title='TITLE1'>CONTENT1</acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );

    assert
      .dom(
        `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
      )
      .hasNoClass(
        'collapsed',
        `${accordionItemHeadClass()} has not collapsed class`,
      )
      .hasAria('expanded', 'true', 'aria: is expanded');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass('collapse', 'tabpanel has collapse class');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass(visibilityClass(), `tabpanel has ${visibilityClass()} class`);
  });

  test('changing selected item expands this item', async function (assert) {
    class State {
      @tracked selected = 1;
    }
    const state = new State();

    await render(
      <template>
        <BsAccordion @selected={{state.selected}} as |acc|>
          <acc.item @value={{1}} @title='TITLE1'>CONTENT1</acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );

    state.selected = 2;
    // wait for transitions to complete
    await settled();

    assert
      .dom(
        `.${accordionItemClass()}:last-child ${accordionItemClickableSelector()}`,
      )
      .hasNoClass(
        'collapsed',
        `${accordionItemHeadClass()} has not collapsed class`,
      )
      .hasAria('expanded', 'true', 'aria: is expanded');
    assert
      .dom(`.${accordionItemClass()}:last-child .collapse`)
      .hasClass('collapse', 'tabpanel has collapse class');
    assert
      .dom(`.${accordionItemClass()}:last-child .collapse`)
      .hasClass(visibilityClass(), 'tabpanel is visible');
  });

  test('clicking collapsed item expands it', async function (assert) {
    await render(
      <template>
        <BsAccordion as |acc|>
          <acc.item @value={{1}} @title='TITLE1'>CONTENT1</acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );
    await click(
      `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
    );

    assert
      .dom(
        `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
      )
      .hasNoClass(
        'collapsed',
        `${accordionItemHeadClass()} has not collapsed class`,
      )
      .hasAria('expanded', 'true', 'aria: is expanded');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass('collapse', 'tabpanel has collapse class');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass(visibilityClass(), 'tabpanel is visible');
  });

  test('clicking expanded item collapses it', async function (assert) {
    await render(
      <template>
        <BsAccordion @selected={{1}} as |acc|>
          <acc.item @value={{1}} @title='TITLE1'>CONTENT1</acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );

    assert
      .dom(
        `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
      )
      .hasNoClass(
        'collapsed',
        `${accordionItemHeadClass()} has not collapsed class`,
      )
      .hasAria('expanded', 'true', 'aria: is expanded');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass('collapse', 'tabpanel has collapse class');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass(visibilityClass(), 'tabpanel is visible');

    await click(accordionItemClickableSelector());

    assert
      .dom(
        `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
      )
      .hasClass('collapsed', `${accordionItemHeadClass()} has collapsed class`)
      .hasAria('expanded', 'false', 'aria: is expanded');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass('collapse', 'tabpanel has collapse class');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasNoClass(visibilityClass(), 'tabpanel is hidden');
  });

  test('calls onChange action when changing selection', async function (assert) {
    const change = sinon.spy();
    await render(
      <template>
        <BsAccordion @onChange={{change}} as |acc|>
          <acc.item @value={{1}} @title='TITLE1'>CONTENT1</acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );

    await click(
      `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
    );
    assert.ok(change.calledWith(1), 'onClick action has been called.');
  });

  test('prevents changing selection when onChange returns false', async function (assert) {
    const change = sinon.stub();
    change.returns(false);
    await render(
      <template>
        <BsAccordion @onChange={{change}} as |acc|>
          <acc.item @value={{1}} @title='TITLE1'>CONTENT1</acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );

    await click(
      `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
    );
    assert.ok(change.calledWith(1), 'onClick action has been called.');

    assert
      .dom(
        `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
      )
      .hasClass('collapsed', `${accordionItemHeadClass()} has collapsed class`);
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass('collapse', 'tabpanel has collapse class');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasNoClass(visibilityClass(), 'tabpanel is hidden');
  });

  test('supports undefined as value of onChange argument', async function (assert) {
    await render(
      <template>
        <BsAccordion @onChange={{undefined}} as |acc|>
          <acc.item
            @value={{1}}
            @title='TITLE1'
            data-test-item='1'
          >CONTENT1</acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );
    assert.dom(`[data-test-item="1"] .collapse`).hasNoClass(visibilityClass());

    await click(`[data-test-item="1"] ${accordionItemClickableSelector()}`);
    assert.dom(`[data-test-item="1"] .collapse`).hasClass(visibilityClass());
  });

  test('changing selection does not leak to public selected property (DDAU)', async function (assert) {
    const selected = 1;
    await render(
      <template>
        <BsAccordion @selected={{selected}} as |acc|>
          <acc.item @value={{1}} @title='TITLE1'>CONTENT1</acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );

    await click(
      `.${accordionItemClass()}:last-child ${accordionItemClickableSelector()}`,
    );
    assert.equal(selected, 1, 'Does not modify public selected property');
  });

  test('yields change action to add custom behaviour', async function (assert) {
    await render(
      <template>
        <BsAccordion @selected={{1}} as |acc|>
          <acc.item @value={{1}} @title='TITLE1'>CONTENT1
            <button
              type='button'
              id='btn'
              {{on 'click' (fn acc.change 2)}}
            >Next</button></acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );

    await click('#btn');

    assert
      .dom(
        `.${accordionItemClass()}:last-child ${accordionItemClickableSelector()}`,
      )
      .hasNoClass(
        'collapsed',
        `${accordionItemHeadClass()} has not collapsed class`,
      );
    assert
      .dom(`.${accordionItemClass()}:last-child .collapse`)
      .hasClass('collapse', 'tabpanel has collapse class');
    assert
      .dom(`.${accordionItemClass()}:last-child .collapse`)
      .hasClass(visibilityClass(), 'tabpanel is visible');
  });

  test('clicking collapsed item with contextual title expands it', async function (assert) {
    await render(
      <template>
        <BsAccordion as |acc|>
          <acc.item @value={{1}} as |aitem|>
            <aitem.title>TITLE1</aitem.title>
            <aitem.body>CONTENT1</aitem.body>
          </acc.item>
          <acc.item @value={{2}}>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );

    await click(
      `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
    );

    assert
      .dom(
        `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
      )
      .hasNoClass(
        'collapsed',
        `${accordionItemHeadClass()} has not collapsed class`,
      );
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass('collapse', 'tabpanel has collapse class');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass(visibilityClass(), 'tabpanel is visible');
  });

  test('clicking expanded item with contextual title collapses it', async function (assert) {
    await render(
      <template>
        <BsAccordion @selected={{1}} as |acc|>
          <acc.item @value={{1}} as |aitem|>
            <aitem.title>TITLE1</aitem.title>
            <aitem.body>CONTENT1</aitem.body>
          </acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );

    assert
      .dom(
        `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
      )
      .hasNoClass(
        'collapsed',
        `${accordionItemHeadClass()} has not collapsed class`,
      );
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass('collapse', 'tabpanel has collapse class');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass(visibilityClass(), 'tabpanel is visible');

    await click(accordionItemClickableSelector());

    assert
      .dom(
        `.${accordionItemClass()}:first-child ${accordionItemClickableSelector()}`,
      )
      .hasClass('collapsed', `${accordionItemHeadClass()} has collapsed class`);
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasClass('collapse', 'tabpanel has collapse class');
    assert
      .dom(`.${accordionItemClass()}:first-child .collapse`)
      .hasNoClass(visibilityClass(), 'tabpanel is hidden');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(
      <template>
        <BsAccordion as |acc|>
          <acc.item @value={{1}} @title='TITLE1'>CONTENT1</acc.item>
          <acc.item @value={{2}} @title='TITLE2'>CONTENT2</acc.item>
        </BsAccordion>
      </template>,
    );

    await a11yAudit({
      rules: {
        // @todo https://github.com/kaliber5/ember-bootstrap/issues/999
        'nested-interactive': { enabled: false },
        'color-contrast': { enabled: false },
        'heading-order': { enabled: false },
      },
    });
    assert.ok(true, 'A11y audit passed');
  });
});
