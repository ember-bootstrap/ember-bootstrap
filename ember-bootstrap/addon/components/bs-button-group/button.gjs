import { isArray } from '@ember/array';
import Button from 'ember-bootstrap/components/bs-button';
import { guidFor } from '@ember/object/internals';
import { getOwnConfig, macroCondition } from '@embroider/macros';
import { on } from '@ember/modifier';
import didUpdate from '@ember/render-modifiers/modifiers/did-update';
import bsSizeClass from 'ember-bootstrap/helpers/bs-size-class';
import bsTypeClass from 'ember-bootstrap/helpers/bs-type-class';
import { hash } from '@ember/helper';

/**
 Internal component for button-group buttons

 @class ButtonGroupButton
 @namespace Components
 @extends Components.Button
 @private
 */

export default class ButtonGroupButton extends Button {
  formId = guidFor(this);

  /**
   * @property groupValue
   * @private
   */

  /**
   * @property buttonGroupType
   * @type string
   * @private
   */

  /**
   * @property active
   * @type boolean
   * @readonly
   * @private
   */
  get active() {
    let { value, groupValue } = this.args;
    if (this.args.buttonGroupType === 'radio') {
      return value === groupValue;
    } else {
      if (isArray(groupValue)) {
        return groupValue.indexOf(value) !== -1;
      }
    }
    return false;
  }

  get isBS5ToggleButton() {
    if (macroCondition(getOwnConfig().isBS5)) {
      return (
        this.args.buttonGroupType === 'radio' ||
        this.args.buttonGroupType === 'checkbox'
      );
    } else {
      return false;
    }
  }
  <template>
    {{! @glint-nocheck }}
    {{#if this.isBS5ToggleButton}}
      <input
        type={{@buttonGroupType}}
        class='btn-check'
        id={{this.formId}}
        autocomplete='off'
        checked={{this.active}}
        ...attributes
        {{on 'click' this.handleClick}}
        {{didUpdate this.resetState @reset}}
      />
      <label
        class='btn
          {{bsSizeClass "btn" @size}}
          {{bsTypeClass "btn" @type default='secondary' outline=@outline}}'
        for={{this.formId}}
      >
        {{#if this.icon}}
          <i class={{this.icon}}></i>
        {{/if}}
        {{this.text}}
        {{yield
          (hash
            isFulfilled=this.isFulfilled
            isPending=this.isPending
            isRejected=this.isRejected
            isSettled=this.isSettled
          )
        }}
      </label>
    {{else}}
      <button
        disabled={{this.__disabled}}
        type='button'
        class='btn
          {{if this.active "active"}}
          {{if this.block "btn-block"}}
          {{bsSizeClass "btn" @size}}
          {{bsTypeClass "btn" @type default='secondary' outline=@outline}}'
        ...attributes
        {{on 'click' this.handleClick}}
        {{didUpdate this.resetState @reset}}
      >
        {{#if this.icon}}
          <i class={{this.icon}}></i>
        {{/if}}
        {{this.text}}
        {{yield
          (hash
            isFulfilled=this.isFulfilled
            isPending=this.isPending
            isRejected=this.isRejected
            isSettled=this.isSettled
          )
        }}
      </button>
    {{/if}}
  </template>
}
