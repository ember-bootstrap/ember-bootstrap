{{! @glint-nocheck }}
<BsModal
  @open={{@open}}
  @fade={{@fade}}
  @backdrop={{@backdrop}}
  @keyboard={{@keyboard}}
  @position={{@position}}
  @scrollable={{@scrollable}}
  @size={{@size}}
  @backdropClose={{@backdropClose}}
  @renderInPlace={{@renderInPlace}}
  @transitionDuration={{@transitionDuration}}
  @backdropTransitionDuration={{@backdropTransitionDuration}}
  @onSubmit={{@onSubmit}}
  @onHide={{@onHide}}
  @onHidden={{@onHidden}}
  @onShow={{@onShow}}
  @onShown={{@onShown}}
  ...attributes
  as |modal|
>
  <modal.header @title={{@title}} @closeButton={{@closeButton}} />
  <modal.body>
    {{yield
      (hash
        close=modal.close
        submit=modal.submit
      )
    }}
  </modal.body>
  <modal.footer
    @closeTitle={{@closeTitle}}
    @submitTitle={{@submitTitle}}
    @submitButtonType={{@submitButtonType}}
  />
</BsModal>
