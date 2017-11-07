import { find, click } from 'ember-native-dom-helpers';
import {
  moduleForComponent
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  accordionClassFor,
  accordionItemBodyClass,
  accordionItemHeadClass,
  accordionTitleSelector,
  test,
  visibilityClass
} from '../../../helpers/bootstrap-test';

moduleForComponent('bs-accordion-item', 'Integration | Component | bs-accordion-item', {
  integration: true
});

test('accordion item has correct default markup', function(assert) {
  this.render(hbs`{{#bs-accordion/item title="TITLE"}}CONTENT{{/bs-accordion/item}}`);
  assert.equal(find(':first-child').classList.contains(accordionClassFor()), true, `has ${accordionClassFor()} class`);
  assert.equal(find(':first-child').classList.contains(accordionClassFor('default')), true, `has ${accordionClassFor('default')} class`);
  assert.equal(find(`.${accordionItemHeadClass()}`).classList.contains('collapsed'), true, `has ${accordionItemHeadClass()} class`);
  assert.equal(find('[role="tabpanel"]').classList.contains('collapse'), true, 'has collapse class');
  assert.equal(find('.collapse').classList.contains(visibilityClass()), false, '.collapse is hidden');
  assert.equal(find(accordionTitleSelector()).textContent.trim(), 'TITLE', `${accordionTitleSelector()} has correct title`);
  assert.equal(find(`.${accordionItemBodyClass()}`).textContent.trim(), 'CONTENT', `${accordionItemBodyClass()} has correct title`);
});

test('calls onClick action when clicking heading', async function(assert) {
  let action = this.spy();
  this.on('click', action);
  this.render(hbs`{{#bs-accordion/item value=1 onClick=(action "click") title="TITLE"}}CONTENT{{/bs-accordion/item}}`);

  await click(`.${accordionItemHeadClass()}`);
  assert.ok(action.calledWith(1), 'onClick action has been called.');
});

test('renders a contextual title block', function(assert) {
  this.render(hbs`{{#bs-accordion/item as |aitem|}}
    {{#aitem.title}}TITLE{{/aitem.title}}
    {{#aitem.body}}CONTENT{{/aitem.body}}
  {{/bs-accordion/item}}`);

  assert.equal(find(accordionTitleSelector()).textContent.trim(), 'TITLE', `${accordionClassFor('title')} has correct title`);
  assert.equal(find(`.${accordionItemBodyClass()}`).textContent.trim(), 'CONTENT', `${accordionItemBodyClass()} has correct content`);
});
