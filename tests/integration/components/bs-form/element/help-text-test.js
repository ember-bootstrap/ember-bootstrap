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

  assert.ok(this.$('div').hasClass(formHelpTextClass()));
  assert.equal(this.$('div').text().trim(), 'foo bar');
});
