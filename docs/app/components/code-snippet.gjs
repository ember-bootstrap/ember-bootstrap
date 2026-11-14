import getCodeSnippet from 'ember-code-snippet/helpers/get-code-snippet';
import dynamicCodeSnippet from 'ember-bootstrap-docs/helpers/dynamic-code-snippet';
import CodeBlock from 'ember-prism/components/code-block';

<template>
  {{#let (getCodeSnippet @name) as |snippet|}}
    <CodeBlock
      @language="handlebars"
      @code={{dynamicCodeSnippet
        snippet.source
        language=snippet.language
        dynamic=@dynamicProperties
      }}
      class="line-numbers"
    />
  {{/let}}
</template>
