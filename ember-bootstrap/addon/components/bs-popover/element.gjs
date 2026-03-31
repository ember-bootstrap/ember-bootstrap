{{! @glint-nocheck }}
{{#if @renderInPlace}}
  <div
    class="popover {{if this.fade "fade"}} {{this.actualPlacementClass}} {{if this.showHelp "show"}}"
    role="tooltip"
    ...attributes
    {{popper-tooltip @popperTarget this.popperOptions}}
    {{create-ref "popperElement"}}
  >
    <div class={{this.arrowClass}}></div>
    {{#if @title}}
      <h3 class="popover-header">{{@title}}</h3>
    {{/if}}
    <div class="popover-body">{{yield}}</div>
  </div>
{{else}}
  {{#in-element @destinationElement insertBefore=null}}
    <div
      class="popover {{if this.fade "fade"}} {{this.actualPlacementClass}} {{if this.showHelp "show"}}"
      role="tooltip"
      ...attributes
      {{popper-tooltip @popperTarget this.popperOptions}}
      {{create-ref "popperElement"}}
    >
      <div class={{this.arrowClass}}></div>
      {{#if @title}}
        <h3 class="popover-header">{{@title}}</h3>
      {{/if}}
      <div class="popover-body">{{yield}}</div>
    </div>
  {{/in-element}}
{{/if}}

