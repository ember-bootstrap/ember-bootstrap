/*globals document */
const hasDOM = typeof document !== 'undefined';

function appendContainerElement(rootElementId, id) {
  if (!hasDOM) {
    return;
  }

  const rootEl = document.querySelector(rootElementId);
  const modalContainerEl = document.createElement('div');
  modalContainerEl.id = id;
  rootEl.appendChild(modalContainerEl);
}

function initialize() {
  const application = arguments[1] || arguments[0];
  const modalContainerElId = 'ember-bootstrap-modal-container';
  appendContainerElement(application.rootElement, modalContainerElId);
}

export default {
  name: 'modals-container',
  initialize: initialize
};