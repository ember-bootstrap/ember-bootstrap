import { findAll, find } from 'ember-native-dom-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS3, testBS4 } from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-dropdown/menu', function(hooks) {
  setupRenderingTest(hooks);

  testBS3('dropdown menu has correct markup', async function(assert) {
    await render(hbs`{{#bs-dropdown/menu align="right"}}Something{{/bs-dropdown/menu}}`);

    assert.equal(find(':first-child').tagName, 'UL', 'menu is an unordered list (<ul>) by default');
    assert.equal(find('ul').classList.contains('dropdown-menu'), true, 'menu has dropdown-menu class');
    assert.equal(find('ul').classList.contains('dropdown-menu-right'), true, 'menu has dropdown-menu-right class');
    assert.equal(find('ul').innerHTML.trim(), 'Something', 'menu contains block contents');
  });

  testBS4('dropdown menu has correct markup', async function(assert) {
    await render(hbs`{{#bs-dropdown/menu align="right" toggleElement=null}}Something{{/bs-dropdown/menu}}`);

    assert.equal(find(':first-child').tagName, 'DIV', 'menu is a div (<div>) by default');
    assert.equal(find('div').classList.contains('dropdown-menu'), true, 'menu has dropdown-menu class');
    assert.equal(find('div').classList.contains('dropdown-menu-right'), true, 'menu has dropdown-menu-right class');
    assert.equal(find('div').innerHTML.trim(), 'Something', 'menu contains block contents');
  });

  testBS3('dropdown menu yields item component', async function(assert) {
    await render(hbs`{{#bs-dropdown/menu as |ddm|}}{{#ddm.item}}Dummy{{/ddm.item}}{{/bs-dropdown/menu}}`);

    assert.equal(findAll('li').length, 1, 'has item component');
  });

  testBS4('dropdown menu yields item component', async function(assert) {
    await render(
      hbs`{{#bs-dropdown/menu toggleElement=null as |ddm|}}{{#ddm.item}}Dummy{{/ddm.item}}{{/bs-dropdown/menu}}`
    );

    assert.equal(findAll('.dropdown-item').length, 0, 'has item component with no markup');
  });
});
