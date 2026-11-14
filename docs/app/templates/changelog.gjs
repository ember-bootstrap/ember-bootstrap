import MarkdownToHtml from 'ember-cli-showdown/components/markdown-to-html';

<template>
  <h1>Changelog</h1>

  <MarkdownToHtml @markdown={{@model}} />
</template>
