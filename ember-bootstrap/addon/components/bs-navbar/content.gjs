import BsCollapse from 'ember-bootstrap/components/bs-collapse';
<template>
  {{! @glint-nocheck }}
  <BsCollapse
    @collapsed={{@collapsed}}
    @onHidden={{@onHidden}}
    @onShown={{@onShown}}
    class='navbar-collapse'
    ...attributes
  >
    {{yield}}
  </BsCollapse>
</template>
