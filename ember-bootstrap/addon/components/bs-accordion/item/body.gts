/**
 Component for an accordion item body.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItemBody
 @namespace Components
 @extends Ember.Component
 @public
 */

/**
 * @property collapsed
 * @type boolean
 * @public
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import {macroCondition} from "@embroider/macros";
import {macroGetOwnConfig} from "@embroider/macros/helpers";
import BsCollapse from "ember-bootstrap/components/bs-collapse";

export interface BodySignature {
  Args: {
    collapsableId?: string;
    collapsed?: boolean;
    describedby?: string;
  };
  Blocks: {
    default: [];
  };
}

export default <template>
  <BsCollapse @collapsed={{@collapsed}} class="accordion-collapse" id={{@collapsableId}} aria-describedby={{@describedby}}>
    <div class="{{if (macroCondition (macroGetOwnConfig "isBS4")) "card-body"}} {{if (macroCondition (macroGetOwnConfig "isBS5")) "accordion-body"}}">
      {{yield}}
    </div>
  </BsCollapse>
</template> satisfies TemplateOnlyComponent<BodySignature>;
