import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('bs-form', 'Integration | Component | bs-form', {
  integration: true
});

test('form has correct CSS class', function(assert) {
    this.render(hbs`{{#bs-form formLayout=formLayout}}Test{{/bs-form}}`);

    var classSpec = {
            vertical: 'form',
      horizontal: 'form-horizontal',
            inline: 'form-inline'
        };

    for (var layout in classSpec) {
        this.set('formLayout', layout);
        assert.equal(this.$('form').hasClass(classSpec[layout]), true, 'form has expected class.');
    }

});



test('Submitting the form calls default action', function(assert) {
    this.render(hbs`{{#bs-form action="testAction"}}Test{{/bs-form}}`);
    this.on('testAction', () => {
        assert.ok(true, 'Default action has been called.');
    });

    assert.expect(1);
    this.$('form').submit();
});


/*

 Cannot test validations as expected in unit tests.
 See https://github.com/dockyard/ember-validations/issues/247

test('Submitting the form with successful validation calls default action', function(assert) {
    var testController = Ember.Controller.extend({
            actions: {
                success: function() {
                    ok(true, 'Default action has been called.');
                },
                error: function() {
                    ok(false, 'Invalid action must not be called.');
                }
            }
        }).create(),
        model = Ember.Object.extend(EmberValidations,{
            test: 'someValue',
            validations: {
                test: {
                    presence: true
                }
            }
        }).create(),
        component = this.subject({
            targetObject: testController,
            action: 'success',
            invalid: 'error',
            model: model
        });

    expect(1);

    this.$().submit();
});




test('Submitting the form with invalid validation calls invalid action', function(assert) {
    var testController = Ember.Controller.extend({
            actions: {
                success: function() {
                    ok(false, 'Default action must not be called.');
                },
                error: function() {
                    ok(true, 'Invalid action has been called called.');
                }
            }
        }).create(),
        model = Ember.Object.extend(EmberValidations,{
            test: null,
            validations: {
                test: {
                    presence: true
                }
            }
        }).create(),
        component = this.subject({
            targetObject: testController,
            action: 'success',
            invalid: 'error',
            model: model
        });

    expect(1);

    this.$().submit();
});

*/



test('Pressing enter on a form with submitOnEnter submits the form', function(assert) {
    this.render(hbs`{{#bs-form action="testAction" submitOnEnter=true}}Test{{/bs-form}}`);
    var e = Ember.$.Event("keypress");
    e.which = e.keyCode = 13;
    assert.expect(1);

    this.on('testAction', () => {
        assert.ok(true, 'Default action has been called.');
    });

    this.$('form').trigger(e);
});