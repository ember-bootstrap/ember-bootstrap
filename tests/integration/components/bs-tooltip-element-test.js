import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-tooltip-element', 'Integration | Component | bs tooltip element', {
  integration: true
});

test('it has correct markup', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#bs-tooltip-element fade=true in=true}}
      template block text
    {{/bs-tooltip-element}}
  `);

  assert.ok(this.$(':first-child').hasClass('tooltip'), 'has tooltip class');
  assert.ok(this.$(':first-child').hasClass('top'), 'has top class');
  assert.ok(this.$(':first-child').hasClass('fade'), 'has fade class');
  assert.ok(this.$(':first-child').hasClass('in'), 'has in class');
  assert.equal(this.$('.tooltip-arrow').length, 1, 'has arrow');
  assert.equal(this.$('.tooltip-inner').text().trim(), 'template block text', 'shows title');
});

test('it supports different placements', function(assert) {
  let placements = ['top', 'left', 'bottom', 'right'];
  this.render(hbs`
    {{#bs-tooltip-element placement=placement}}
      template block text
    {{/bs-tooltip-element}}
  `);
  placements.forEach((placement) => {
    this.set('placement', placement);
    assert.ok(this.$(':first-child').hasClass(placement), `has ${placement} class`);
  });
});