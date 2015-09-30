import Ember from 'ember';
import I18nSupport from 'ember-bootstrap-components/mixins/i18n-support';


/**
 Extends Ember.TextArea to add Bootstrap's 'form-control' class.

 ### I18n support

 Supports translateable properties if [ember-i18n](https://github.com/jamesarosen/ember-i18n) is present.
 See {{#crossLink "Mixins.I18nSupport"}}{{/crossLink}}

 @class Textarea
 @namespace Components
 @extends Ember.TextArea
 @uses Mixins.I18nSupport
 */
export default Ember.TextArea.extend(I18nSupport, {
    classNames: ['form-control']
});