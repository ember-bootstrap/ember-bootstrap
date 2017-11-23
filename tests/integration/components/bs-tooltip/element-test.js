import { find, findAll } from 'ember-native-dom-helpers';
import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  tooltipPositionClass,
  test,
  visibilityClass,
  versionDependent
} from '../../../helpers/bootstrap-test';

module('Integration | Component | bs-tooltip/element', function(hooks) {
  setupRenderingTest(hooks);

  test('it has correct markup', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#bs-tooltip/element id="tooltip-element" fade=true showHelp=true}}
        template block text
      {{/bs-tooltip/element}}
    `);

    assert.ok(find(':first-child').classList.contains('tooltip'), 'has tooltip class');
    // assert.ok(find(':first-child').classList.contains(tooltipPositionClass('top')), 'has placement class');
    assert.ok(find(':first-child').classList.contains('fade'), 'has fade class');
    assert.ok(find(':first-child').classList.contains(visibilityClass()), 'has visibility class');
    assert.equal(find(':first-child').getAttribute('role'), 'tooltip', 'has ARIA role');
    assert.equal(findAll(versionDependent('.tooltip-arrow', '.arrow')).length, 1, 'has arrow');
    assert.equal(find('.tooltip-inner').textContent.trim(), 'template block text', 'shows title');
  });

  skip('it supports different placements', async function(assert) {
    let placements = ['top', 'left', 'bottom', 'right'];
    this.set('placement', placements[0]);
    await render(hbs`
      {{#bs-tooltip/element id="tooltip-element" placement=placement}}
        template block text
      {{/bs-tooltip/element}}
    `);
    placements.forEach((placement) => {
      this.set('placement', placement);
      let placementClass = tooltipPositionClass(placement);
      assert.ok(find(':first-child').classList.contains(placementClass), `has ${placementClass} class`);
    });
  });
});
