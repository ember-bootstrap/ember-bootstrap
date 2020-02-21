import { layout as templateLayout } from '@ember-decorators/component';
import layout from 'ember-bootstrap/templates/components/bs-tooltip/element';
import ContextualHelpElement from '../bs-contextual-help/element';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import { hasBootstrapVersion } from 'ember-bootstrap/compatibility-helpers';

/**
 Internal component for tooltip's markup. Should not be used directly.

 @class TooltipElement
 @namespace Components
 @extends Components.ContextualHelpElement
 @private
 */
@templateLayout(layout)
export default class TooltipElement extends ContextualHelpElement {
  @defaultValue
  arrowClass = hasBootstrapVersion(3) ? 'tooltip-arrow' : 'arrow';
}
