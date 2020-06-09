import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-modal/header/title';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 @class ModalHeaderTitle
 @namespace Components
 @extends Ember.Component
 @private
 */
@templateLayout(layout)
@tagName('')
@deprecateSubclassing
export default class ModalHeaderTitle extends Component {}
