{{! @glint-nocheck }}
<label
  {{!-- template-lint-disable simple-unless --}}
  class="
    {{unless (macroCondition (macroGetOwnConfig "isBS4")) "form-label"}}
    {{if @invisibleLabel (if (macroCondition (macroGetOwnConfig "isBS4")) "sr-only" "visually-hidden")}}
    {{@labelClass}}
    {{if this.isHorizontalAndNotCheckbox "col-form-label"}}
    {{if this.isCheckbox "form-check-label"}}
    {{if (bs-eq "switch" @controlType) (if (macroCondition (macroGetOwnConfig "isBS4")) "custom-control-label" "form-check-label")}}
    {{if this.isHorizontal (bs-size-class "col-form-label" @size)}}"
  for={{@formElementId}}
  ...attributes
>
  {{#if (has-block)}}
    {{yield}}
  {{/if}}
  {{@label}}
</label>
