import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('bs-modal', 'BsModalComponent', {
  // specify the other units that are required for this test
  needs: [
      'component:bs-modal-header',
      'template:components/bs-modal-header',
      'component:bs-modal-body',
      'component:bs-modal-footer',
      'template:components/bs-modal-footer',
      'component:bs-button'

  ]
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



test('submit event in footer is proxied to form in body', function(assert){
    var component = this.subject({
        template: Ember.Handlebars.compile('{{#bs-modal-body}}<form id="form"></form>{{/bs-modal-body}}{{#bs-modal-footer}}<button type="submit" id="button">submit</button>{{/bs-modal-footer}}'),
        body: false,
        footer: false,
        fade: false
    });

    assert.expect(1);

    this.$().find('form#form').submit(function(e){
        e.preventDefault();
        assert.ok(true, 'submit event has been triggered.');
    });

    this.$().find('button#button').click();

});