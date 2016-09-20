import Ember from 'ember';

const { $ } = Ember;

export default function getPosition($element) {
  let el = $element.get(0);
  let isBody = el.tagName === 'BODY';

  let elRect = el.getBoundingClientRect();

  // not needed as we won't support IE8
  //
  // if (elRect.width == null) {
  //   // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
  //   elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
  // }

  let isSvg = window.SVGElement && el instanceof window.SVGElement;
  // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
  // See https://github.com/twbs/bootstrap/issues/20280
  let elOffset = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset());
  let scroll = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() };
  let outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null;

  return $.extend({}, elRect, scroll, outerDims, elOffset);
}
