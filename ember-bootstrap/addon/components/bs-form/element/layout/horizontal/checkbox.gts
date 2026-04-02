import bsFormHorizInputClass from 'ember-bootstrap/helpers/bs-form-horiz-input-class';
import bsFormHorizOffsetClass from 'ember-bootstrap/helpers/bs-form-horiz-offset-class';
import bsEq from 'ember-bootstrap/helpers/bs-eq';
import { macroCondition } from '@embroider/macros';
declare function macroGetOwnConfig(path: string): boolean;
import type { TemplateOnlyComponent } from '@ember/component/template-only';
export default <template>
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
</template> satisfies TemplateOnlyComponent<{ Args: {} }>;
