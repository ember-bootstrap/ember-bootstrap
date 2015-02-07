import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import EmberValidations from 'ember-validations';



moduleForComponent('bs-form', 'BsFormComponent', {
  // specify the other units that are required for this test
    needs: [
//        'component:bs-form-element',
//        'template:components/bs-form-element',
//        'component:bs-form-group',
//        'template:components/bs-form-group'
    ]
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});




test('form has correct CSS class', function() {
    var component = this.subject(),
        classSpec = {
            vertical: 'form',
            horizontal: 'form-horizontal',
            inline: 'form-inline'
        };

    for (var layout in classSpec) {
        /*jshint loopfunc: true */
        Ember.run(function(){
            component.set('formLayout', layout);
        });
        equal(this.$().hasClass(classSpec[layout]), true, 'form has expected class.');
    }

});



test('Submitting the form calls default action', function() {
    var testController = Ember.Controller.extend({
            actions: {
                testAction: function() {
                    ok(true, 'Default action has been called.');
                }
            }
        }).create(),
        component = this.subject({
            targetObject: testController,
            action: 'testAction'
        });

    expect(1);

    this.$().submit();
});


/*

 Cannot test validations as expected in unit tests.
 See https://github.com/dockyard/ember-validations/issues/247

test('Submitting the form with successfull validation calls default action', function() {
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
        model = Ember.Object.extend(EmberValidations.Mixin,{
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




test('Submitting the form with invalid validation calls invalid action', function() {
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
        model = Ember.Object.extend(EmberValidations.Mixin,{
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
