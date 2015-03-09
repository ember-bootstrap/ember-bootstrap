import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('bs-alert', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('alert has correct CSS classes', function(assert) {
    var component = this.subject({
        type: 'success'
    });

    assert.equal(this.$().hasClass('alert'),true, 'alert has alert class');
    assert.equal(this.$().hasClass('alert-success'),true, 'alert has type class');
});

test('dismissible alert can be hidden by clicking close button', function(assert) {
    var component = this.subject({
        type: 'success',
        fade: false
    });

    assert.equal(this.$().find('button.close').length,1, 'alert has close button');
    this.$().find('button.close').click();

    assert.equal(this.$().hasClass('alert'),false, 'alert has no alert class');
    assert.equal(this.$().text().trim(),'', 'alert has no content');
    assert.equal(component.get('visible'),false, 'visible property is false');
    assert.equal(component.get('dismissed'),true, 'dismissed property is true');

});