function transitionSupport() {
  let el = document.createElement('bootstrap');

  let transEndEventNames = {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend'
  };

  for (let name in transEndEventNames) {
    if (el.style[name] !== undefined) {
      return transEndEventNames[name];
    }
  }

  return false;
}

export default typeof document !== 'undefined' && transitionSupport();