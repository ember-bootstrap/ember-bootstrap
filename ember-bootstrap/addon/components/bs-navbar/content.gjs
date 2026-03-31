{{! @glint-nocheck }}
<BsCollapse
  @collapsed={{@collapsed}}
  @onHidden={{@onHidden}}
  @onShown={{@onShown}}
  class="navbar-collapse"
  ...attributes
>
  {{yield}}
</BsCollapse>
