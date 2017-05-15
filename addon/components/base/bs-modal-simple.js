import Modal from 'ember-bootstrap/components/bs-modal';
import layout from 'ember-bootstrap/templates/components/bs-modal-simple';

/**

 Component for creating [Bootstrap modals](http://getbootstrap.com/javascript/#modals) with a some common default markup
 including a header, footer and body. Creating a simple modal is easy:

 ```hbs
 {{#bs-modal-simple title="Simple Dialog"}}
   Hello world!
 {{/bs-modal-simple}}
 ```

 This will automatically create the appropriate markup, with a modal header containing the title, and a footer containing
 a default "Ok" button, that will close the modal automatically (unless you return false from `onHide`).

 A modal created this way will be visible at once. You can use the `{{#if ...}}` helper to hide all modal elements from
 the DOM until needed. Or you can bind the `open` property to trigger showing and hiding the modal:

 ```hbs
 {{#bs-modal-simple open=openModal title="Simple Dialog"}}
   Hello world!
 {{/bs-modal-simple}}
 ```

 ### Custom Markup

 To customize the markup within the modal you can use the [bs-modal](Components.Modal.html) component.

 ### Modals with forms

 There is a special case when you have a form inside your modals body: you probably do not want to have a submit button
 within your form but instead in your modal footer. Hover pressing the submit button outside of your form would not
 trigger the form data to be submitted. In the example below this would not trigger the submit action of the form, an
 thus bypass the form validation feature of the form component.

 ```hbs
 {{#bs-modal-simple title="Form Example" closeTitle="Cancel" submitTitle="Ok"}}
   {{#bs-form onSubmit=(action "submit") model=this as |form|}}
     {{form.element controlType="text" label="first name" property="firstname"}}
     {{form.element controlType="text" label="last name" property="lastname"}}
   {{/bs-form}}
 {{/bs-modal-simple}}
 ```

 The modal component supports this common case by triggering the submit event programmatically on the body's form if
 present whenever the footer's submit button is pressed, so the example above will work as expected.

 ### Auto-focus

 In order to allow key handling to function, the modal's root element is given focus once the modal is shown. If your
 modal contains an element such as a text input and you would like it to be given focus rather than the modal element,
 then give it the HTML5 autofocus attribute:

 ```hbs
 {{#bs-modal-simple title="Form Example" closeTitle="Cancel" submitTitle="Ok"}}
   {{#bs-form onSubmit=(action "submit") model=this as |form|}}
     {{form.element controlType="text" label="first name" property="firstname" autofocus=true}}
     {{form.element controlType="text" label="last name" property="lastname"}}
   {{/bs-form}}
 {{/bs-modal-simple}}

 ```

 ### Modals inside wormhole

 Modals make use of the [ember-wormhole](https://github.com/yapplabs/ember-wormhole) addon, which will be installed
 automatically alongside ember-bootstrap. This is used to allow the modal to be placed in deeply nested
 components/templates where it belongs to logically, but to have the actual DOM elements within a special container
 element, which is a child of ember's root element. This will make sure that modals always overlay the whole app, and
 are not effected by parent elements with `overflow: hidden` for example.

 If you want the modal to render in place, rather than being wormholed, you can set renderInPlace=true.

 @class ModalSimple
 @namespace Components
 @extends Components.Modal
 @public
 */
export default Modal.extend({
  layout,

  /**
   * The title of the modal, visible in the modal header. Is ignored if `header` is false.
   *
   * @property title
   * @type string
   * @public
   */
  title: null,

  /**
   * Display a close button (x icon) in the corner of the modal header.
   *
   * @property closeButton
   * @type boolean
   * @default true
   * @public
   */
  closeButton: true,

  /**
   * The title of the default close button.
   *
   * @property closeTitle
   * @type string
   * @default 'Ok'
   * @public
   */
  closeTitle: 'Ok',

  /**
   * The title of the submit button (primary button). Will be ignored (i.e. no button) if set to null.
   *
   * @property submitTitle
   * @type string
   * @default null
   * @public
   */
  submitTitle: null

});
