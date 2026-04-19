{{! @glint-nocheck }}
<div
  class="tab-pane {{if this.showContent "show"}} {{if this.active "active"}} {{if this.usesTransition "fade"}}"
  role="tabpanel"
  ...attributes
  {{this.trackMainNode}}
  {{did-insert this.updateActive @active}}
  {{did-update this.showHide this.isActive}}
>
  {{yield}}
</div>