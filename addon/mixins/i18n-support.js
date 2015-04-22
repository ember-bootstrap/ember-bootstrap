import Ember from 'ember';

/**
 Mixin for internationalization support.

 Currently supported is only [ember-i18n](https://github.com/jamesarosen/ember-i18n):
 If Ember.I18n is present, this mixin will simply export `Ember.I18n.TranslateableProperties`, maiking all
 components that use this mixin inherit the translateable properties functionality of `Ember.I18n.TranslateableProperties`.
 See https://github.com/jamesarosen/ember-i18n#translate-properties-on-any-object.

 ```hbs
 {{bs-button defaultTextTranslation="label.translated"}}
 ```

 @class I18nSupport
 @namespace Mixins
 */

var Mixin;

switch (true) {
    case Ember.isPresent(Ember.I18n):
        Mixin = Ember.I18n.TranslateableProperties;
        break;
    default:
        Mixin = Ember.Mixin.create();
}

export default Mixin;