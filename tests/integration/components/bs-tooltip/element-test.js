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

    assert.dom(':first-child').hasClass('tooltip', 'has tooltip class');
    // assert.ok(find(':first-child').classList.contains(tooltipPositionClass('top')), 'has placement class');
    assert.dom(':first-child').hasClass('fade', 'has fade class');
    assert.dom(':first-child').hasClass(visibilityClass(), 'has visibility class');
    assert.equal(this.element.querySelector(':first-child').getAttribute('role'), 'tooltip', 'has ARIA role');
    assert.dom(versionDependent('.tooltip-arrow', '.arrow')).exists({ count: 1 }, 'has arrow');
    assert.dom('.tooltip-inner').hasText('template block text', 'shows title');
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
      assert.dom(':first-child').hasClass(placementClass, `has ${placementClass} class`);
    });
  });
});
