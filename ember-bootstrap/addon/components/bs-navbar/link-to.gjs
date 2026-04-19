{{! @glint-nocheck }}
<BsLinkTo
  @route={{@route}}
  @model={{@model}}
  @models={{@models}}
  @query={{@query}}
  @disabled={{@disabled}}
  {{on 'click' this.onClick}}
  class={{@attrClassInternal}}
  ...attributes
>
  {{yield}}
</BsLinkTo>