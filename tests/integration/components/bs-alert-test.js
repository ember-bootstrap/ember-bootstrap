import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('bs-alert', 'Integration | Component | bs-alert', {
    integration: true
});

test('alert has correct CSS classes', function(assert) {
    this.render(hbs`{{#bs-alert type="success"}}Test{{/bs-alert}}`);

    assert.equal(this.$(':first-child').hasClass('alert'),true, 'alert has alert class');
    assert.equal(this.$(':first-child').hasClass('alert-success'),true, 'alert has type class');
});

test('dismissible alert can be hidden by clicking close button', function(assert) {
    this.render(hbs`{{#bs-alert type="success" fade=false}}Test{{/bs-alert}}`);

    assert.equal(this.$().find('button.close').length,1, 'alert has close button');
    this.$().find('button.close').click();

    assert.equal(this.$(':first-child').hasClass('alert'),false, 'alert has no alert class');
    assert.equal(this.$(':first-child').text().trim(),'', 'alert has no content');

});

