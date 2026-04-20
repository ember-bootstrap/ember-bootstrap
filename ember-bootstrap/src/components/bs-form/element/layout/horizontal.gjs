import bsFormHorizInputClass from '../../../../helpers/bs-form-horiz-input-class.js';
import bsFormHorizOffsetClass from '../../../../helpers/bs-form-horiz-offset-class.js';

<template>
  {{! @glint-nocheck }}
  {{#if @hasLabel}}
    <@labelComponent @labelClass={{@horizontalLabelGridClass}} />
    <div class={{bsFormHorizInputClass @horizontalLabelGridClass}}>
      {{yield}}
      <@errorsComponent />
      <@helpTextComponent />
    </div>
  {{else}}
    <div
      class='{{bsFormHorizInputClass @horizontalLabelGridClass}}
        {{bsFormHorizOffsetClass @horizontalLabelGridClass}}'
    >
      {{yield}}
      <@errorsComponent />
      <@helpTextComponent />
    </div>
  {{/if}}
</template>
