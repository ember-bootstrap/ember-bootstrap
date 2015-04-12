import {
    moduleForComponent,
        test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('bs-form-element', 'BsFormElementComponent', {
    // specify the other units that are required for this test
    needs: [
        'template:components/form-element/vertical/default',
        'template:components/form-element/vertical/textarea',
        'template:components/form-element/vertical/checkbox',
        'template:components/form-element/vertical/select',
        'template:components/form-element/horizontal/default',
        'template:components/form-element/horizontal/textarea',
        'template:components/form-element/horizontal/checkbox',
        'template:components/form-element/horizontal/select',
        'template:components/form-element/inline/default',
        'template:components/form-element/inline/textarea',
        'template:components/form-element/inline/checkbox',
        'template:components/form-element/inline/select',
        'template:components/form-element/errors',
        'template:components/form-element/feedback-icon',
        'component:bs-input',
        'component:bs-textarea',
        'component:bs-select'
    ]
});

test('it renders', function(assert) {
    assert.expect(2);

    // creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // appends the component to the page
    this.append();
    assert.equal(component._state, 'inDOM');
});


test('component has form-group bootstrap class', function(assert) {
    var component = this.subject();
    assert.equal(component.get('classNames').contains('form-group'), true, 'component has form-group class');
});

test('setting label property displays label tag', function(assert) {
    var component = this.subject({
        label: 'myLabel'
    });
    assert.equal(this.$().find('label').length, 1, 'component has label tag');
    assert.equal(this.$().find('label').text().trim(), 'myLabel', 'label has text');
});

function controlTypeSupportTest(assert, controlType, selector, values, getValueFn, componentOptions) {
    var component = this.subject(Ember.merge({
            controlType: controlType
        }, componentOptions)),
        control = this.$().find(selector);

    if (!Ember.isArray(values)) {
        values = [values];
    }

    assert.equal(control.length, 1, 'component has ' + controlType + ' control');

    values.forEach(function(value) {
        Ember.run(component, 'set', 'value', value);
        var hasValue = typeof getValueFn === 'function' ? getValueFn.call(control) : control.val();
        assert.equal(hasValue, value, controlType + ' control has correct values');
    });
}

test('controlType "text" is supported', function(assert) {
    controlTypeSupportTest.call(this, assert, 'text', 'input[type=text]', 'myValue');
});

test('controlType "checkbox" is supported', function(assert) {
    controlTypeSupportTest.call(this, assert, 'checkbox', 'input[type=checkbox]', [true, false], function(){ return this.is(':checked'); });
});

test('controlType "textarea" is supported', function(assert) {
    controlTypeSupportTest.call(this, assert, 'textarea', 'textarea', 'myValue');
});


test('controlType "select" is supported', function(assert) {
    var options = {
        choices: [
            {
                id: 'f',
                label: 'Female'
            },
            {
                id: 'm',
                label: 'Male'
            }
        ],
        choiceLabelProperty: 'label',
        choiceValueProperty: 'id'
    };
    controlTypeSupportTest.call(this, assert, 'select', 'select', ['m','f'], null, options);
});