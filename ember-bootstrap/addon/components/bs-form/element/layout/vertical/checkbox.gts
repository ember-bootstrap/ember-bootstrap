import bsEq from 'ember-bootstrap/helpers/bs-eq';
import { macroCondition } from '@embroider/macros';
declare function macroGetOwnConfig(path: string): boolean;
import type { TemplateOnlyComponent } from '@ember/component/template-only';
export default <template>
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
</template> satisfies TemplateOnlyComponent<{ Args: {} }>;
