// simplified version of jQuery.offset.setOffset
export default function setOffset(elem, options) {
  let curOffset = getOffset(elem);
  let curCSSTop = elem.style.top;
  let curCSSLeft = elem.style.left;

  let curTop = parseFloat(curCSSTop) || 0;
  let curLeft = parseFloat(curCSSLeft) || 0;

  if (options.top != null) {
    elem.style.top = `${Math.round((options.top - curOffset.top) + curTop)}px`;
  }
  if (options.left != null) {
    elem.style.left = `${Math.round((options.left - curOffset.left) + curLeft)}px`;
  }
}

function getOffset(elem) {
  let rect = elem.getBoundingClientRect();
  let win = elem.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
}