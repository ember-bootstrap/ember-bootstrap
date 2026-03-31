<div
  class="carousel-item {{if this.active "active"}} {{if this.left (if (macroCondition (macroGetOwnConfig "isBS4")) "carousel-item-left" "carousel-item-start")}} {{if this.next "carousel-item-next"}} {{if this.prev "carousel-item-prev"}} {{if this.right (if (macroCondition (macroGetOwnConfig "isBS4")) "carousel-item-right" "carousel-item-end")}}"
  ...attributes
  {{create-ref "mainNode"}}
  {{did-update this.presentationStateObserver @presentationState @currentSlide}}
>
  {{yield}}
</div>