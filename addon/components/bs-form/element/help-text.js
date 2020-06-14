import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-form/element/help-text';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 @class FormElementHelpText
 @namespace Components
 @extends Ember.Component
 @private
 */
@tagName('')
@deprecateSubclassing
@templateLayout(layout)
export default class FormElementHelpText extends Component {}
