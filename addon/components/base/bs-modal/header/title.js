import { classNames, layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-modal/header/title';

/**

 @class ModalHeaderTitle
 @namespace Components
 @extends Ember.Component
 @private
 */
@templateLayout(layout)
@tagName('h4')
@classNames('modal-title')
export default class ModalHeaderTitle extends Component {}
