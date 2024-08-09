import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import {
  accordionClassFor,
  accordionItemBodyClass,
  accordionItemClass,
  accordionItemClickableSelector,
  accordionItemHeadClass,
  accordionTitleSelector,
  test,
  visibilityClass,
} from '../../../helpers/bootstrap';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import sinon from 'sinon';
import BsAccordionItem from 'ember-bootstrap/components/bs-accordion/item';

module('Integration | Component | bs-accordion-item', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('accordion item has correct default markup', async function (assert) {
    await render(
      <template>
        <BsAccordionItem @title='TITLE'>CONTENT</BsAccordionItem>
      </template>,
    );
    assert
      .dom(`.${accordionItemClass()}`)
      .exists(`has ${accordionItemClass()} class`);
    assert
      .dom(`.${accordionItemClass()}`)
      .hasClass(
        accordionClassFor('default'),
        `has ${accordionClassFor('default')} class`,
      );
    assert
      .dom(`.${accordionItemClass()} .${accordionItemHeadClass()}`)
      .exists();
    assert
      .dom(accordionItemClickableSelector())
      .hasClass('collapsed', `has collapsed class`);
    assert.dom('.collapse').exists();
    assert
      .dom('.collapse')
      .hasNoClass(visibilityClass(), '.collapse is hidden');
    assert
      .dom(accordionTitleSelector())
      .hasText('TITLE', `${accordionTitleSelector()} has correct title`);
    assert
      .dom(`.${accordionItemBodyClass()}`)
      .hasText('CONTENT', `${accordionItemBodyClass()} has correct title`);
  });

  test('calls onClick action when clicking heading', async function (assert) {
    const clickAction = sinon.spy();
    await render(
      <template>
        <BsAccordionItem
          @value={{1}}
          @onClick={{clickAction}}
          @title='TITLE'
        >CONTENT</BsAccordionItem>
      </template>,
    );

    await click(accordionItemClickableSelector());
    assert.ok(clickAction.calledWith(1), 'onClick action has been called.');
  });

  test('renders a contextual title block', async function (assert) {
    await render(
      <template>
        <BsAccordionItem as |aitem|>
          <aitem.title>TITLE</aitem.title>
          <aitem.body>CONTENT</aitem.body>
        </BsAccordionItem>
      </template>,
    );

    assert
      .dom(accordionTitleSelector())
      .hasText('TITLE', `${accordionClassFor('title')} has correct title`);
    assert
      .dom(`.${accordionItemBodyClass()}`)
      .hasText('CONTENT', `${accordionItemBodyClass()} has correct content`);
  });

  test('accordion items can be disabled', async function (assert) {
    const clickAction = sinon.spy();
    await render(
      <template>
        <BsAccordionItem
          @value={{1}}
          @disabled={{true}}
          @onClick={{clickAction}}
          @title='TITLE'
        >CONTENT</BsAccordionItem>
      </template>,
    );
    assert
      .dom(accordionItemClickableSelector())
      .hasClass(
        'disabled',
        'Clickable accordion selector has `.disabled` class',
      )
      .hasAttribute('disabled');
    assert
      .dom(`.${accordionItemClass()}`)
      .hasClass('disabled', 'entire item has `.disabled` class');
    try {
      await click(accordionItemClickableSelector());
    } catch (e) {
      // click helper will throw on a disabled button
    }
    assert.notOk(
      clickAction.calledWith(1),
      'onClick action should not be called',
    );
  });
});
