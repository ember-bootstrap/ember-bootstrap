{{! @glint-nocheck }}
{{#if @show}}
  {{#if @showMultipleErrors}}
    <div class="pre-scrollable">
      {{#each @messages as |message|}}
        <div class="invalid-feedback d-block">{{message}}</div>
      {{/each}}
    </div>
  {{else}}
    <div class="invalid-feedback d-block">{{get @messages "0"}}</div>
  {{/if}}
{{/if}}
