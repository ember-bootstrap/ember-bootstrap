{{! @glint-nocheck }}
{{#let (element this.htmlTag) as |Tag|}}
  <Tag
    class="list-group-item {{if @type (bs-type-class "list-group-item" @type default="")}} {{if @actionable "list-group-item-action"}} {{if @disabled "disabled"}} {{if @active "active"}}"
    aria-current="{{if @active true}}"
    aria-disabled="{{if @disabled true}}"
    type="{{if (bs-eq this.htmlTag "button") "button"}}"
     ...attributes>
    {{yield}}
  </Tag>
{{/let}}