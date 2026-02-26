import { action } from '@ember/object';
import Component from '@glimmer/component';
import {macroCondition} from "@embroider/macros";
import {macroGetOwnConfig} from "@embroider/macros/helpers";
import { on } from '@ember/modifier';

export interface TitleSignature {
  Args: {
    controls?: string;
    collapsed?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLHeadingElement;
}
/**
 Component for an accordion item title.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItemTitle
 @namespace Components
 @extends Glimmer.Component
 @public
 */
export default class AccordionItemTitle extends Component<TitleSignature> {
  /**
   * @property collapsed
   * @type boolean
   * @public
   */

  /**
   * @property disabled
   * @type boolean
   * @private
   */

  /**
   * @event onClick
   * @public
   */

  @action
  handleClick(e: Event) {
    e.preventDefault();
    if (!this.args.disabled) {
      this.args.onClick?.();
    }
  }

  <template>
    {{!-- template-lint-disable no-nested-interactive --}}
    {{!-- @todo fix this, see https://github.com/kaliber5/ember-bootstrap/issues/999 --}}
    {{#if (macroCondition (macroGetOwnConfig "isBS5"))}}
      <h2
        class="accordion-header"
        ...attributes
      >
        <button
          class="accordion-button {{if @disabled "disabled"}} {{if @collapsed "collapsed"}}"
          type="button"
          disabled={{@disabled}}
          aria-controls={{@controls}}
          aria-expanded={{if @collapsed "false" "true"}}
          {{on "click" this.handleClick}}
        >
          {{yield}}
        </button>
      </h2>
    {{else}}
      <div
        class="card-header"
      >
        <h2
          class="mb-0"
          ...attributes
        >
          <button
            class="btn btn-link {{if @disabled "disabled"}} {{if @collapsed "collapsed" "expanded"}}"
            type="button"
            disabled={{@disabled}}
            aria-controls={{@controls}}
            aria-expanded={{if @collapsed "false" "true"}}
            {{on "click" this.handleClick}}
          >
            {{yield}}
          </button>
        </h2>
      </div>
    {{/if}}
  </template>
}
