/* global macroGetOwnConfig */
import FormElementLabel from 'ember-bootstrap/components/bs-form/element/label';
import { macroCondition } from '@embroider/macros';
import bsSizeClass from 'ember-bootstrap/helpers/bs-size-class';

export default class FormElementLegend extends FormElementLabel {
  <template>
    {{! @glint-nocheck }}
    <legend
      class='{{if
          @invisibleLabel
          (if
            (macroCondition (macroGetOwnConfig "isBS4"))
            "sr-only"
            "visually-hidden"
          )
        }}
        {{@labelClass}}
        {{if this.isHorizontalAndNotCheckbox "col-form-label"}}
        {{if this.isHorizontal (bsSizeClass "col-form-label" @size)}}'
    >
      {{#if (has-block)}}
        {{yield}}
      {{/if}}
      {{@label}}
    </legend>
  </template>
}
