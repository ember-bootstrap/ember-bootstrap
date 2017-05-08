import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { formHelpTextClass } from '../../../../helpers/bootstrap-test';

moduleForComponent('bs-form/element/help-text', 'Integration | Component | bs form/element/help text', {
  integration: true
});

test('it renders help text', function(assert) {
  this.render(hbs`
    {{bs-form/element/help-text text="foo bar"}}
  `);

  assert.ok(find('div').classList.contains(formHelpTextClass()));
  assert.equal(find('div').textContent.trim(), 'foo bar');
});
