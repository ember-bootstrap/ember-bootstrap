import Ember from 'ember';
import I18nSupport from 'ember-bootstrap/mixins/i18n-support';


/**
 Extends Ember.TextField to add Bootstrap's 'form-control' class.

 ### I18n support

 Supports translateable properties if [ember-i18n](https://github.com/jamesarosen/ember-i18n) is present.
 See {{#crossLink "Mixins.I18nSupport"}}{{/crossLink}}

 @class Input
 @namespace Components
 @extends Ember.TextField
 @uses Mixins.I18nSupport
 */
export default Ember.TextField.extend(I18nSupport, {
    classNames: ['form-control']
});