import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-progress/bar', 'Integration | Component | bs-progress/bar', {
  integration: true
});

test('has correct markup', function(assert) {
  this.render(hbs`
    {{bs-progress/bar}}
  `);

  assert.equal(this.$('div.progress-bar').length, 1, 'Has progress-bar class');

});