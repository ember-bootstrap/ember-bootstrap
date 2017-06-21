import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import { testBS3, testBS4 } from '../../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-dropdown/menu/link-to', 'Integration | Component | bs dropdown/menu/link to', {
  integration: true
});

testBS3('it has correct markup', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#bs-dropdown/menu/link-to "index"}}
      template block text
    {{/bs-dropdown/menu/link-to}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
  assert.equal(findAll('a.dropdown-item').length, 0, 'renders as plain element with no dropdown item class');
});

testBS4('it has correct markup', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#bs-dropdown/menu/link-to "index"}}
      template block text
    {{/bs-dropdown/menu/link-to}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
  assert.equal(findAll('a.dropdown-item').length, 1, 'renders as plain element with dropdown item class');
});
