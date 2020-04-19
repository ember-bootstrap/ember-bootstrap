/*
 * Implement some helpers methods for interacting with the DOM,
 * be it Fastboot's SimpleDOM or the browser's version.
 *
 * Credit to https://github.com/yapplabs/ember-wormhole, from where this has been shamelessly stolen.
 */

import { getOwner } from '@ember/application';
import { DEBUG } from '@glimmer/env';
import requirejs from 'require';
import { warn } from '@ember/debug';

function childNodesOfElement(element) {
  let children = [];
  let child = element.firstChild;
  while (child) {
    children.push(child);
    child = child.nextSibling;
  }
  return children;
}

export function findElementById(doc, id) {
  if (doc.getElementById) {
    return doc.getElementById(id);
  }

  let nodes = childNodesOfElement(doc);
  let node;

  while (nodes.length) {
    node = nodes.shift();

    if (node.getAttribute && node.getAttribute('id') === id) {
      return node;
    }
    nodes = childNodesOfElement(node).concat(nodes);
  }
}

// Private Ember API usage. Get the dom implementation used by the current
// renderer, be it native browser DOM or Fastboot SimpleDOM
export function getDOM(context) {
  let { renderer } = context;
  if (!renderer._dom) {
    // pre glimmer2
    let container = getOwner ? getOwner(context) : context.container;
    let documentService = container.lookup('service:-document');

    if (documentService) {
      return documentService;
    }

    renderer = container.lookup('renderer:-dom');
  }

  if (renderer._dom && renderer._dom.document) {
    return renderer._dom.document;
  } else {
    throw new Error('Could not get DOM');
  }
}

export function getDestinationElement(context) {
  let dom = getDOM(context);
  let destinationElement = findElementById(dom, 'ember-bootstrap-wormhole');

  if (DEBUG && !destinationElement) {
    let config = getOwner(context).resolveRegistration('config:environment');
    if (config.environment === 'test' && typeof FastBoot === 'undefined') {
      let id;
      if (requirejs.has('@ember/test-helpers/dom/get-root-element')) {
        try {
          id = requirejs('@ember/test-helpers/dom/get-root-element').default().id;
        } catch (ex) {
          // no op
        }
      }
      if (!id) {
        return document.querySelector('#ember-testing > .ember-view');
      }
      return document.getElementById(id);
    }

    warn(
      `No wormhole destination element found for component ${context}. If you have set \`insertEmberWormholeElementToDom\` to false, you should insert a \`div#ember-bootstrap-wormhole\` manually!`,
      false,
      { id: 'ember-bootstrap.no-destination-element' }
    );
  }

  return destinationElement;
}
