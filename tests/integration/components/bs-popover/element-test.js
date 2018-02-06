import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  popoverPositionClass,
  test,
  visibilityClass,
  versionDependent
} from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-popover/element', function(hooks) {
  setupRenderingTest(hooks);

  test('it has correct markup', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#bs-popover/element id="popover-element" fade=true showHelp=true title="dummy title"}}
        template block text
      {{/bs-popover/element}}
    `);

    assert.dom(':first-child').hasClass('popover', 'has popover class');
    // assert.ok(find(':first-child').classList.contains(popoverPositionClass('top')), 'has placement class');
    assert.dom(':first-child').hasClass('fade', 'has fade class');
    assert.dom(':first-child').hasClass(visibilityClass(), 'has visibility class');
    assert.equal(this.element.querySelector(':first-child').getAttribute('role'), 'tooltip', 'has ARIA role');
    assert.dom('.arrow').exists({ count: 1 }, 'has arrow');
    assert.dom(versionDependent('.popover-title', '.popover-header')).hasText('dummy title', 'shows title');
    assert.dom(versionDependent('.popover-content', '.popover-body')).hasText('template block text', 'shows content');
  });

  skip('it supports different placements', async function(assert) {
    let placements = ['top', 'left', 'bottom', 'right'];
    this.set('placement', placements[0]);
    await render(hbs`
      <div style="margin: 200px">
        {{#bs-popover/element id="popover-element" placement=placement title="dummy title"}}
          template block text
        {{/bs-popover/element}}
      </div>
    `);
    for (let placement of placements) {
      this.set('placement', placement);
      let placementClass = popoverPositionClass(placement);
      assert.dom(':first-child').hasClass(placementClass, `has ${placementClass} class`);
    }
  });

  test('it passes along class attribute', async function(assert) {
    await render(hbs`
      {{#bs-popover/element id="popover-element" title="dummy title" class="wide"}}
        template block text
      {{/bs-popover/element}}
    `);

    assert.dom('.popover.wide').exists({ count: 1 });
  });
});
