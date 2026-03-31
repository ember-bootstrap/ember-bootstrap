import FormElementLabel from 'ember-bootstrap/components/bs-form/element/label';

export default class FormElementLegend extends FormElementLabel {}

{{! @glint-nocheck }}
<legend
  class="
    {{if @invisibleLabel (if (macroCondition (macroGetOwnConfig "isBS4")) "sr-only" "visually-hidden")}}
    {{@labelClass}}
    {{if this.isHorizontalAndNotCheckbox "col-form-label"}}
    {{if this.isHorizontal (bs-size-class "col-form-label" @size)}}"
>
  {{#if (has-block)}}
    {{yield}}
  {{/if}}
  {{@label}}
</legend>