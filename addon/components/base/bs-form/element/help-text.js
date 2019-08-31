import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-form/element/help-text';

/**

 @class FormElementHelpText
 @namespace Components
 @extends Ember.Component
 @private
 */
@classic
@templateLayout(layout)
export default class HelpText extends Component {}
