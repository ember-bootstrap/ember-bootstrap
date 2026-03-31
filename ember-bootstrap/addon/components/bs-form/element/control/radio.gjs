import Control from '../control';

/**

 @class FormElementControlRadio
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
import { concat, fn, get } from '@ember/helper';
import bsEq from 'ember-bootstrap/helpers/bs-eq';
export default class FormElementControlRadio extends Control {
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
  /**
   * @property inline
   * @type {Boolean}
   * @default false
   * @public
   */
}
