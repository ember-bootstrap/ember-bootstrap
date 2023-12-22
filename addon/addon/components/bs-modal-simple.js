/**
  Component for creating [Bootstrap modals](http://getbootstrap.com/javascript/#modals) with a some common default markup
  including a header, footer and body. Creating a simple modal is easy:

  ```hbs
  <BsModalSimple @title="Simple Dialog">
    Hello world!
  </BsModalSimple>
  ```

  This will automatically create the appropriate markup, with a modal header containing the title, and a footer containing
  a default "Ok" button, that will close the modal automatically (unless you return `false` from `onHide`).

  A modal created this way will be visible at once. You can use the `{{#if ...}}` helper to hide all modal elements from
  the DOM until needed. Or you can bind the `open` argument to trigger showing and hiding the modal:

  ```hbs
  <BsModalSimple @open={{this.openModal}} @title="Simple Dialog">
    Hello world!
  </BsModalSimple>
  ```

  ### Custom Markup

  To customize the markup within the modal you can use the [<BsModal>](Components.Modal.html) component.

  ### Modals with forms

  There is a special case when you have a form inside your modals body: you probably do not want to have a submit button
  within your form but instead in your modal footer. Hover pressing the submit button outside your form would not
  trigger the form data to be submitted. In the example below this would not trigger the submit action of the form, and
  thus bypass the form validation feature of the form component.

  ```hbs
  <BsModalSimple @title="Form Example" @closeTitle="Cancel" @submitTitle="Ok">
    <BsForm @model={{this}} @onSubmit={{this.submit}} @submitOnEnter={{true}} as |Form|>
      <Form.element @label="first name" @property="firstname" />
      <Form.element @label="last name" @property="lastname" />
    </BsForm>
  </BsModalSimple>
  ```

  The modal component supports this common case by triggering the submit event programmatically on the body's form if
  present whenever the footer's submit button is pressed. To allow the form to be submitted by pressing the enter key
  also, you must either set `@submitOnEnter={{true}}` on the `<BsForm>` or include an invisible submit button in the
  form (`<button type="submit" class="d-hidden">Submit</button>`).

  ### Auto-focus

  In order to allow key handling to function, the modal's root element is given focus once the modal is shown. If your
  modal contains an element such as a text input and you would like it to be given focus rather than the modal element,
  then give it the HTML5 autofocus attribute:

  ```hbs
  <BsModalSimple @title="Form Example" @closeTitle="Cancel" @submitTitle="Ok">
    <BsForm @model={{this}} @onSubmit={{this.submit}} @submitOnEnter={{true}} as |Form|>
      <Form.element @label="first name" @property="firstname" @autofocus={{true}} />
      <Form.element @label="last name" @property="lastname" />
    </BsForm>
  </BsModalSimple>
  ```

  ### Modals inside wormhole

  Modals make use of the [ember-wormhole](https://github.com/yapplabs/ember-wormhole) addon, which will be installed
  automatically alongside ember-bootstrap. This is used to allow the modal to be placed in deeply nested
  components/templates where it belongs to logically, but to have the actual DOM elements within a special container
  element, which is a child of ember's root element. This will make sure that modals always overlay the whole app, and
  are not effected by parent elements with `overflow: hidden` for example.

  If you want the modal to render in place, rather than being wormholed, you can set `@renderInPlace={{true}}`.

  @class ModalSimple
  @namespace Components
  @public
*/

/**
 * The title of the modal, visible in the modal header. Is ignored if `header` is false.
 *
 * @property title
 * @type string
 * @public
 */

/**
 * Visibility of the modal. Toggle to show/hide with CSS transitions.
 *
 * When the modal is closed by user interaction this property will not update by using two-way bindings in order
 * to follow DDAU best practices. If you want to react to such changes, subscribe to the `onHide` action
 *
 * @property open
 * @type boolean
 * @default true
 * @public
 */

/**
 * Set to false to disable fade animations.
 *
 * @property fade
 * @type boolean
 * @default true
 * @public
 */

/**
 * Use a semi-transparent modal background to hide the rest of the page.
 *
 * @property backdrop
 * @type boolean
 * @default true
 * @public
 */

/**
 * Closes the modal when escape key is pressed.
 *
 * @property keyboard
 * @type boolean
 * @default true
 * @public
 */

/**
 * [BS4 only!] Vertical position, either 'top' (default) or 'center'
 * 'center' will apply the `modal-dialog-centered` class
 *
 * @property position
 * @type {string}
 * @default 'top'
 * @public
 */

/**
 * [BS4 only!] Allows scrolling within the modal body
 * 'true' will apply the `modal-dialog-scrollable` class
 *
 * @property scrollable
 * @type boolean
 * @default false
 * @public
 */

/**
 * Property for size styling, set to null (default), 'lg' or 'sm'
 *
 * Also see the [Bootstrap docs](http://getbootstrap.com/javascript/#modals-sizes)
 *
 * @property size
 * @type String
 * @public
 */

/**
 * If true clicking on the backdrop will close the modal.
 *
 * @property backdropClose
 * @type boolean
 * @default true
 * @public
 */

/**
 * If true component will render in place, rather than be wormholed.
 *
 * @property renderInPlace
 * @type boolean
 * @default false
 * @public
 */

/**
 * The duration of the fade transition
 *
 * @property transitionDuration
 * @type number
 * @default 300
 * @public
 */

/**
 * The duration of the backdrop fade transition
 *
 * @property backdropTransitionDuration
 * @type number
 * @default 150
 * @public
 */

/**
 * The action to be sent when the modal footer's submit button (if present) is pressed.
 * Note that if your modal body contains a form (e.g. [Components.Form](Components.Form.html)) this action will
 * not be triggered. Instead, a submit event will be triggered on the form itself. See the class description for an
 * example.
 *
 * @property onSubmit
 * @type function
 * @public
 */

/**
 * The action to be sent when the modal is closing.
 * This will be triggered by pressing the modal header's close button (x button) or the modal footer's close button.
 * Note that this will happen before the modal is hidden from the DOM, as the fade transitions will still need some
 * time to finish. Use the `onHidden` if you need the modal to be hidden when the action triggers.
 *
 * You can return `false` to prevent closing the modal automatically, and do that in your action by
 * setting `@open` to `false`.
 *
 * @property onHide
 * @type function
 * @public
 */

/**
 * The action to be sent after the modal has been completely hidden (including the CSS transition).
 *
 * @property onHidden
 * @type function
 * @default null
 * @public
 */

/**
 * The action to be sent when the modal is opening.
 * This will be triggered immediately after the modal is shown (so it's safe to access the DOM for
 * size calculations and the like). This means that if `@fade={{true}}`, it will be shown in between the
 * backdrop animation and the fade animation.
 *
 * @property onShow
 * @type function
 * @default null
 * @public
 */

/**
 * The action to be sent after the modal has been completely shown (including the CSS transition).
 *
 * @property onShown
 * @type function
 * @public
 */

/**
 * Display a close button (x icon) in the corner of the modal header.
 *
 * @property closeButton
 * @type boolean
 * @default true
 * @public
 */

/**
 * The title of the default close button.
 *
 * @property closeTitle
 * @type string
 * @default 'Ok'
 * @public
 */

/**
 * The type of the submit button (primary button).
 *
 * @property submitButtonType
 * @type string
 * @default 'primary'
 * @public
 */

/**
 * The title of the submit button (primary button). Will be ignored (i.e. no button) if set to null.
 *
 * @property submitTitle
 * @type string
 * @default null
 * @public
 */
import templateOnly from '@ember/component/template-only';

export default templateOnly();
