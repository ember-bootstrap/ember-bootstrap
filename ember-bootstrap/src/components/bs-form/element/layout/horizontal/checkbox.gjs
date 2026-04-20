/* global macroCondition */
/* global macroGetOwnConfig */
import bsFormHorizInputClass from '../../../../../helpers/bs-form-horiz-input-class.js';
import bsFormHorizOffsetClass from '../../../../../helpers/bs-form-horiz-offset-class.js';
import bsEq from '../../../../../helpers/bs-eq.ts';

<template>
  {{! @glint-nocheck }}
  <div
    class='{{bsFormHorizInputClass @horizontalLabelGridClass}}
      {{bsFormHorizOffsetClass @horizontalLabelGridClass}}'
  >
    <div
      class='{{if
          (bsEq "switch" @controlType)
          (if
            (macroCondition (macroGetOwnConfig "isBS4"))
            "custom-control custom-switch"
            "form-check form-switch"
          )
          "form-check"
        }}'
    >
      {{yield}}
      <@labelComponent />
      <@errorsComponent />
      <@helpTextComponent />
    </div>
  </div>
</template>
