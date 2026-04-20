import Control from '../control.js';
import { concat, fn, get } from '@ember/helper';
import bsEq from '../../../../helpers/bs-eq.ts';

/**

 @class FormElementControlRadio
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default class FormElementControlRadio extends Control {
  /**
   * @property inline
   * @type {Boolean}
   * @default false
   * @public
   */
  <template>
    {{! @glint-nocheck }}
    {{! template-lint-disable no-positive-tabindex no-autofocus-attribute }}
    {{#each @options as |option index|}}
      {{#let (concat @id '-' index) as |id|}}
        <div class='form-check{{if @inline " form-check-inline"}}'>
          <input
            type='radio'
            class='form-check-input'
            id={{id}}
            checked={{bsEq option @value}}
            onclick={{fn @onChange option}}
            name={{@name}}
            required={{@required}}
            disabled={{@disabled}}
            autofocus={{@autofocus}}
            tabindex={{@tabindex}}
            form={{@form}}
            title={{@title}}
            ...attributes
          />
          <label for={{id}} class='form-check-label'>
            {{#if (has-block)}}
              {{yield option index}}
            {{else}}
              {{#if @optionLabelPath}}
                {{get option @optionLabelPath}}
              {{else}}
                {{option}}
              {{/if}}
            {{/if}}
          </label>
        </div>
      {{/let}}
    {{/each}}
  </template>
}
