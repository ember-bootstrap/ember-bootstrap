{{! @glint-nocheck }}
{{!-- template-lint-disable no-duplicate-landmark-elements --}}
{{#let
  (hash
    toggle=(component (ensure-safe-component (bs-default @toggleComponent (component "bs-navbar/toggle"))) onClick=this.toggleNavbar collapsed=this.collapsed)
    content=(component (ensure-safe-component (bs-default @contentComponent (component "bs-navbar/content"))) collapsed=this.collapsed onHidden=this.onCollapsed onShown=this.onExpanded)
    nav=(component
      (ensure-safe-component (bs-default @navComponent (component "bs-navbar/nav")))
      linkToComponent=(component "bs-navbar/link-to" onCollapse=this.collapse attrClassInternal="nav-link")
    )
    collapse=this.collapse
    expand=this.expand
    toggleNavbar=this.toggleNavbar
  ) as |yieldedHash|}}
  <nav class="navbar {{this.positionClass}} {{this.typeClass}} {{this.breakpointClass}} {{this.backgroundClass}}" ...attributes>
    {{#if (macroCondition (macroGetOwnConfig "isBS4"))}}
      {{#if this.fluid}}
        {{yield yieldedHash}}
      {{else}}
        <div class="container">
          {{yield yieldedHash}}
        </div>
      {{/if}}
    {{else}}
      <div class={{this.containerClass}}>
        {{yield yieldedHash}}
      </div>
    {{/if}}
  </nav>
{{/let}}