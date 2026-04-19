{{! @glint-nocheck }}
<div ...attributes {{did-update this.listenToActiveId @activeId}}>
  {{#if this.customTabs}}
    {{yield
      (hash
        pane=(component (ensure-safe-component (bs-default @paneComponent (component "bs-tab/pane"))) parent=this activeId=this.activeId fade=this.fade fadeTransition=this.fadeTransition registerChild=this.registerChild unregisterChild=this.unregisterChild)
        activeId=this.activeId
        select=this.select
      )
    }}
  {{else}}
    {{#let (ensure-safe-component (bs-default @navComponent (component "bs-nav"))) as |NavComponent|}}
      <NavComponent @type={{this.type}} role="tablist" as |Nav|>
        {{#each this.navItems as |item|}}
          {{#if item.isGroup}}
            <Nav.dropdown class={{if (bs-contains item.childIds this.activeId) "active"}} role="presentation" as |DD|>
              <DD.toggle>{{item.groupTitle}} <span class="caret"></span></DD.toggle>
              <DD.menu as |Menu|>
                {{#each item.children as |subItem|}}
                  <Menu.item>
                    {{!-- template-lint-disable require-context-role --}}
                    <a
                      href="#{{subItem.id}}"
                      role="tab"
                      class="dropdown-item {{if (bs-eq this.activeId subItem.id) "active"}}"
                      {{on "click" (fn this.select subItem.id)}}
                    >
                      {{subItem.title}}
                    </a>
                  </Menu.item>
                {{/each}}
              </DD.menu>
            </Nav.dropdown>
          {{else}}
            <Nav.item @active={{bs-eq item.id this.activeId}} role="presentation">
              <a
                href="#{{item.id}}"
                role="tab"
                class="nav-link {{if (bs-eq this.activeId item.id) "active"}}"
                aria-selected={{if (bs-eq this.activeId item.id) "true" "false"}}
                {{on "click" (fn this.select item.id)}}
              >
                {{item.title}}
              </a>
            </Nav.item>
          {{/if}}
        {{/each}}
      </NavComponent>
    {{/let}}

    <div class="tab-content">
      {{yield
        (hash
          pane=(component (ensure-safe-component (bs-default @paneComponent (component "bs-tab/pane"))) parent=this activeId=this.activeId fade=this.fade fadeTransition=this.fadeTransition registerChild=this.registerChild unregisterChild=this.unregisterChild)
          activeId=this.activeId
          select=this.select
        )
      }}
    </div>
  {{/if}}

</div>
