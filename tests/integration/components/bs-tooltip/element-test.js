import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  placementClassFor,
  test,
  visibilityClass
} from '../../../helpers/bootstrap-test';

moduleForComponent('bs-tooltip/element', 'Integration | Component | bs-tooltip/element', {
  integration: true
});

test('it has correct markup', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#bs-tooltip/element id="tooltip-element" fade=true showHelp=true}}
      template block text
    {{/bs-tooltip/element}}
  `);

  assert.ok(find(':first-child').classList.contains('tooltip'), 'has tooltip class');
  assert.ok(find(':first-child').classList.contains(placementClassFor('tooltip', 'top')), 'has placement class');
  assert.ok(find(':first-child').classList.contains('fade'), 'has fade class');
  assert.ok(find(':first-child').classList.contains(visibilityClass()), 'has visibility class');
  assert.equal(find(':first-child').getAttribute('role'), 'tooltip', 'has ARIA role');
  assert.equal(findAll('.tooltip-arrow').length, 1, 'has arrow');
  assert.equal(find('.tooltip-inner').textContent.trim(), 'template block text', 'shows title');
});

test('it supports different placements', function(assert) {
  let placements = ['top', 'left', 'bottom', 'right'];
  this.set('placement', placements[0]);
  this.render(hbs`
    {{#bs-tooltip/element id="tooltip-element" placement=placement}}
      template block text
    {{/bs-tooltip/element}}
  `);
  placements.forEach((placement) => {
    this.set('placement', placement);
    let placementClass = placementClassFor('tooltip', placement);
    assert.ok(find(':first-child').classList.contains(placementClass), `has ${placementClass} class`);
  });
});
