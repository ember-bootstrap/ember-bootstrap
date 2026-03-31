import BsButton from 'ember-bootstrap/components/bs-button';
import { on } from '@ember/modifier';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';
<template>
  {{! @glint-nocheck }}
  <BsButton
    {{! cannot pass @block directly because that triggers reserved keyword assertion when compiling the template }}
    {{! template-lint-disable no-capital-arguments no-args-paths }}
    @block={{this.args.block}}
    @onClick={{@onClick}}
    @active={{@active}}
    @size={{@size}}
    @type={{@type}}
    @outline={{@outline}}
    aria-expanded={{if @isOpen 'true' 'false'}}
    class='dropdown-toggle'
    ...attributes
    {{on 'keydown' @onKeyDown}}
    {{didInsert @registerChildElement 'toggle'}}
    {{willDestroy @unregisterChildElement 'toggle'}}
  >
    {{yield}}
  </BsButton>
</template>
