import { classNames, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-modal/body';

/**

 Modal body element used within [Components.Modal](Components.Modal.html) components. See there for examples.

 @class ModalBody
 @namespace Components
 @extends Ember.Component
 @public
 */
@templateLayout(layout)
@classNames('modal-body')
export default class ModalBody extends Component {}
