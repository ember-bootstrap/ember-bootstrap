import ContextualHelpElement from '../bs-contextual-help/element';
import { getOwnConfig, macroCondition } from '@embroider/macros';

/**
 Internal component for popover's markup. Should not be used directly.

 @class PopoverElement
 @namespace Components
 @extends Components.ContextualHelpElement
 @private
 */
import popperTooltip from 'ember-popper-modifier/modifiers/popper-tooltip';
import createRef from 'ember-ref-bucket/modifiers/create-ref';
export default class PopoverElement extends ContextualHelpElement {
  /**
   * @property title
   * @type string
   * @public
   */

  arrowClass = macroCondition(getOwnConfig().isBS5) ? 'popover-arrow' : 'arrow';
  placementClassPrefix = 'bs-popover-';
  offset = [0, 8];
  <template>
    {{! @glint-nocheck }}
    {{#if @renderInPlace}}
      <div
        class='popover
          {{if this.fade "fade"}}
          {{this.actualPlacementClass}}
          {{if this.showHelp "show"}}'
        role='tooltip'
        ...attributes
        {{popperTooltip @popperTarget this.popperOptions}}
        {{this.getPopperElement}}
      >
        <div class={{this.arrowClass}}></div>
        {{#if @title}}
          <h3 class='popover-header'>{{@title}}</h3>
        {{/if}}
        <div class='popover-body'>{{yield}}</div>
      </div>
    {{else}}
      {{#in-element @destinationElement insertBefore=null}}
        <div
          class='popover
            {{if this.fade "fade"}}
            {{this.actualPlacementClass}}
            {{if this.showHelp "show"}}'
          role='tooltip'
          ...attributes
          {{popperTooltip @popperTarget this.popperOptions}}
          {{this.getPopperElement}}
        >
          <div class={{this.arrowClass}}></div>
          {{#if @title}}
            <h3 class='popover-header'>{{@title}}</h3>
          {{/if}}
          <div class='popover-body'>{{yield}}</div>
        </div>
      {{/in-element}}
    {{/if}}
  </template>
}
