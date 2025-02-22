{{did-insert-helper this.handleVisibilityChanges}}
{{did-update-helper this.handleVisibilityChanges @open}}

{{#if this.inDom}}
  {{!
    ember-on-helper do not support FastBoot yet. This guard can be removed as
    soon as ember-on-helper guards for FastBoot itself. It is tracked in this
    GitHub issue: https://github.com/buschtoens/ember-on-helper/issues/3
  }}
  {{#unless this.isFastBoot}}
    {{on-window "resize" this.adjustDialog}}
  {{/unless}}

  {{#let (component (ensure-safe-component this.dialogComponent)
    onClose=this.close
    fade=this._fade
    showModal=this.showModal
    keyboard=this.keyboard
    size=@size
    backdropClose=this.backdropClose
    inDom=this.inDom
    paddingLeft=this.paddingLeft
    paddingRight=this.paddingRight
    centered=(bs-eq this.position "center")
    scrollable=this.scrollable
    fullscreen=@fullscreen
  ) as |Dialog|}}
    {{#if this._renderInPlace}}
      <Dialog
        {{create-ref "modalElement"}}
        ...attributes
      >
        {{yield
          (hash
            header=(component (ensure-safe-component this.headerComponent) onClose=this.close)
            body=(ensure-safe-component this.bodyComponent)
            footer=(component (ensure-safe-component this.footerComponent) onClose=this.close onSubmit=this.doSubmit)
            close=this.close
            submit=this.doSubmit
          )
        }}
      </Dialog>
      <div>
        {{#if this.shouldShowBackdrop}}
          <div class="modal-backdrop {{if this._fade "fade"}} {{if this.showModal "show"}}" {{create-ref "backdropElement"}}></div>
        {{/if}}
      </div>
    {{else if this.destinationElement}}
      {{#in-element this.destinationElement insertBefore=null}}
        <Dialog
          {{create-ref "modalElement"}}
          ...attributes
        >
          {{yield
            (hash
              header=(component (ensure-safe-component this.headerComponent) onClose=this.close)
              body=(ensure-safe-component this.bodyComponent)
              footer=(component (ensure-safe-component this.footerComponent) onClose=this.close onSubmit=this.doSubmit)
              close=this.close
              submit=this.doSubmit
            )
          }}
        </Dialog>
        <div>
          {{#if this.shouldShowBackdrop}}
            <div class="modal-backdrop {{if this._fade "fade"}} {{if this.showModal "show"}}" {{create-ref "backdropElement"}}></div>
          {{/if}}
        </div>
      {{/in-element}}
    {{/if}}
  {{/let}}
{{/if}}
