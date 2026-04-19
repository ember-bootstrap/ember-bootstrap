/**
 *
 * Modal header element used within [Components.Modal](Components.Modal.html) components. See there for examples.
 *
 * @class ModalHeader
 * @namespace Components
 * @extends Glimmer.Component
 * @public
 */

/**
 * Show a close button (x icon)
 *
 * @property closeButton
 * @type boolean
 * @default true
 * @public
 */

/**
 * The title to display in the modal header
 *
 * @property title
 * @type string
 * @default null
 * @public
 */

/**
 * @property titleComponent
 * @type {String}
 * @private
 */

/**
 * @property closeComponent
 * @type {String}
 * @private
 */

/**
 * @event onClose
 * @public
 */
import templateOnly from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { TitleSignature } from './header/title';
import type { CloseSignature } from './header/close';

export interface HeaderSignature {
  Args: {
    closeButton?: boolean;
    title?: string;
    titleComponent?: ComponentLike<TitleSignature>;
    closeComponent?: ComponentLike<CloseSignature>;
    onClose?: () => void;
  };
  Blocks: {
    default: [
      {
        title: ComponentLike<TitleSignature>;
        close: ComponentLike<CloseSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default templateOnly<HeaderSignature>();

{{#let
  (ensure-safe-component (bs-default @titleComponent (component "bs-modal/header/title")))
  (component (ensure-safe-component (bs-default @closeComponent (component "bs-modal/header/close"))) onClick=@onClose)
as |Title Close|
}}
  <div class="modal-header" ...attributes>
    {{#if (has-block-params)}}
      {{yield
        (hash
          title=Title
          close=Close
        )
      }}
    {{else}}
      {{#if (has-block)}}
        {{yield
          (hash
            title=Title
            close=Close
          )
        }}
      {{else}}
        <Title>{{@title}}</Title>
      {{/if}}
      {{#if (bs-default @closeButton true)}}
        <Close/>
      {{/if}}
    {{/if}}
  </div>
{{/let}}