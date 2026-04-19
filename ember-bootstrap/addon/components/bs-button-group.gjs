{{! @glint-nocheck }}
<div class="{{if @vertical "btn-group-vertical" "btn-group"}} {{bs-size-class "btn-group" @size}}" role="group" ...attributes>
  {{yield
    (hash
      button=(component (ensure-safe-component (bs-default @buttonComponent (component "bs-button-group/button"))) buttonGroupType=@type groupValue=@value onClick=this.buttonPressed)
    )
  }}
</div>