/* global macroCondition */
/* global macroGetOwnConfig */
import bsEq from 'ember-bootstrap/helpers/bs-eq';

<template>
  {{! @glint-nocheck }}
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
</template>
