import ContextualHelpElement, {
  type ContextualHelpElementSignature,
} from '../bs-contextual-help/element';
import { getOwnConfig, macroCondition } from '@embroider/macros';
import type { EmberBootstrapMacrosConfig } from '../../macros-config';
import popperTooltip from 'ember-popper-modifier/modifiers/popper-tooltip';

type BsTooltipElementSignature = ContextualHelpElementSignature & {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
};

/**
 Internal component for tooltip's markup. Should not be used directly.

 @class TooltipElement
 @namespace Components
 @extends Components.ContextualHelpElement
 @private
 */
export default class TooltipElement extends ContextualHelpElement<BsTooltipElementSignature> {
  arrowClass = macroCondition(getOwnConfig<EmberBootstrapMacrosConfig>().isBS4)
    ? 'arrow'
    : 'tooltip-arrow';
  placementClassPrefix = 'bs-tooltip-';
  offset = [0, 6];
  <template>
    {{! @glint-nocheck }}
    {{#if @renderInPlace}}
      <div
        class='tooltip
          {{if this.fade "fade"}}
          {{this.actualPlacementClass}}
          {{if this.showHelp "show"}}'
        role='tooltip'
        ...attributes
        {{popperTooltip @popperTarget this.popperOptions}}
        {{this.getPopperElement}}
      >
        <div class={{this.arrowClass}}></div>
        <div class='tooltip-inner'>
          {{yield}}
        </div>
      </div>
    {{else}}
      {{#in-element @destinationElement insertBefore=null}}
        <div
          class='tooltip
            {{if this.fade "fade"}}
            {{this.actualPlacementClass}}
            {{if this.showHelp "show"}}'
          role='tooltip'
          ...attributes
          {{popperTooltip @popperTarget this.popperOptions}}
          {{this.getPopperElement}}
        >
          <div class={{this.arrowClass}}></div>
          <div class='tooltip-inner'>
            {{yield}}
          </div>
        </div>
      {{/in-element}}
    {{/if}}
  </template>
}
