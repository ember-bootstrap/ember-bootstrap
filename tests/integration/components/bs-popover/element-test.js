import { find, findAll } from 'ember-native-dom-helpers';
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

    assert.ok(find(':first-child').classList.contains('popover'), 'has popover class');
    // assert.ok(find(':first-child').classList.contains(popoverPositionClass('top')), 'has placement class');
    assert.ok(find(':first-child').classList.contains('fade'), 'has fade class');
    assert.ok(find(':first-child').classList.contains(visibilityClass()), 'has visibility class');
    assert.equal(find(':first-child').getAttribute('role'), 'tooltip', 'has ARIA role');
    assert.equal(findAll('.arrow').length, 1, 'has arrow');
    assert.equal(find(versionDependent('.popover-title', '.popover-header')).textContent.trim(), 'dummy title', 'shows title');
    assert.equal(find(versionDependent('.popover-content', '.popover-body')).textContent.trim(), 'template block text', 'shows content');
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
      assert.ok(find(':first-child').classList.contains(placementClass), `has ${placementClass} class`);
    }
  });

  test('it passes along class attribute', async function(assert) {
    await render(hbs`
      {{#bs-popover/element id="popover-element" title="dummy title" class="wide"}}
        template block text
      {{/bs-popover/element}}
    `);

    assert.equal(findAll('.popover.wide').length, 1);
  });
});
