import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('bs-form-element', 'Integration | Component | bs-form-element', {
    integration: true
});

test('component has form-group bootstrap class', function(assert) {
    this.render(hbs`{{bs-form-element}}`);
    assert.equal(this.$(':first-child').hasClass('form-group'), true, 'component has form-group class');
});

test('setting label property displays label tag', function(assert) {
    this.render(hbs`{{bs-form-element label="myLabel"}}`);

    assert.equal(this.$('label').length, 1, 'component has label tag');
    assert.equal(this.$('label').text().trim(), 'myLabel', 'label has text');
});

function controlTypeSupportTest(assert, controlType, selector, values, getValueFn, componentOptions) {
    componentOptions = componentOptions || {};

    if (!Ember.isArray(values)) {
        values = [values];
    }
    values = Ember.A(values);

    this.set('controlType',controlType);
    if (componentOptions.choices) this.set('choices',componentOptions.choices);
    if (componentOptions.choiceLabelProperty) this.set('choiceLabelProperty',componentOptions.choiceLabelProperty);
    if (componentOptions.choiceValueProperty) this.set('choiceValueProperty',componentOptions.choiceValueProperty);

    this.render(hbs`{{bs-form-element controlType=controlType choices=choices choiceLabelProperty=choiceLabelProperty choiceValueProperty=choiceValueProperty value=value}}`);

    assert.equal(this.$(selector).length, 1, 'component has ' + controlType + ' control');

    values.forEach(value => {
        this.set('value', value);
        var hasValue = typeof getValueFn === 'function' ? getValueFn.call(this.$(selector)) : this.$(selector).val();
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
        choices: Ember.A([
            {
                id: 'f',
                label: 'Female'
            },
            {
                id: 'm',
                label: 'Male'
            }
        ]),
        choiceLabelProperty: 'label',
        choiceValueProperty: 'id'
    };
    controlTypeSupportTest.call(this, assert, 'select', 'select', ['m','f'], null, options);
});


//test('button supports ember-i18n if present', function(assert) {
//    Ember.I18n.translations = {
//        i18nKey: 'translated'
//    };
//    var component = this.subject({
//        labelTranslation: 'i18nKey'
//    });
//    assert.equal(this.$().find('label').text().trim(), 'translated', 'label has translated text');
//});