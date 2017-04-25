import {
  moduleForComponent
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  accordionClassFor,
  accordionItemBodyClass,
  accordionItemHeadClass,
  test,
  visibilityClass
} from '../../../helpers/bootstrap-test';

moduleForComponent('bs-accordion-item', 'Integration | Component | bs-accordion-item', {
  integration: true
});

test('accordion item has correct default markup', function(assert) {
  this.render(hbs`{{#bs-accordion/item title="TITLE"}}CONTENT{{/bs-accordion/item}}`);
  assert.equal(this.$(':first-child').hasClass(accordionClassFor()), true, `has ${accordionClassFor()} class`);
  assert.equal(this.$(':first-child').hasClass(accordionClassFor('default')), true, `has ${accordionClassFor('default')} class`);
  assert.equal(this.$(`.${accordionItemHeadClass()}`).hasClass('collapsed'), true, `has ${accordionItemHeadClass()} class`);
  assert.equal(this.$(`.${accordionClassFor('collapse')}`).hasClass('collapse'), true, `${accordionClassFor('collapse')} has collapse class`);
  assert.equal(this.$(`.${accordionClassFor('collapse')}`).hasClass(visibilityClass()), false, `${accordionClassFor('collapse')} is hidden`);
  assert.equal(this.$(`.${accordionClassFor('title')}`).text().trim(), 'TITLE', `${accordionClassFor('title')} has correct title`);
  assert.equal(this.$(`.${accordionItemBodyClass()}`).text().trim(), 'CONTENT', `${accordionItemBodyClass()} has correct title`);
});

test('calls onClick action when clicking heading', function(assert) {
  let action = this.spy();
  this.on('click', action);
  this.render(hbs`{{#bs-accordion/item value=1 onClick=(action "click") title="TITLE"}}CONTENT{{/bs-accordion/item}}`);

  this.$(`.${accordionItemHeadClass()}`).click();
  assert.ok(action.calledWith(1), 'onClick action has been called.');
});

test('renders a contextual title block', function(assert) {
  this.render(hbs`{{#bs-accordion/item as |aitem|}}
    {{#aitem.title}}TITLE{{/aitem.title}}
    {{#aitem.body}}CONTENT{{/aitem.body}}
  {{/bs-accordion/item}}`);

  assert.equal(this.$(`.${accordionClassFor('title')}`).text().trim(), 'TITLE', `${accordionClassFor('title')} has correct title`);
  assert.equal(this.$(`.${accordionItemBodyClass()}`).text().trim(), 'CONTENT', `${accordionItemBodyClass()} has correct content`);
});
