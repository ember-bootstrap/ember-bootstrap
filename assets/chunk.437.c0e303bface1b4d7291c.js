/*! For license information please see chunk.437.c0e303bface1b4d7291c.js.LICENSE.txt */
(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[437],{113:(e,t,r)=>{"use strict"
function n(e,t){return e!==t}r.r(t),r.d(t,{default:()=>n})},194:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>a})
var n=r(9128)
function a(...e){return e.every(e=>!(0,n.A)(e))}},456:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{cached:()=>v,dedupeTracked:()=>w,localCopy:()=>b,trackedReset:()=>_})
var n,a,s=r(1603),i=r(4471),o=r(473),l=r(4217)
function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}let u=(n=class{constructor(){var e
c(this,"prevRemote",void 0),c(this,"peek",void 0),(e=a)&&Object.defineProperty(this,"value",{enumerable:e.enumerable,configurable:e.configurable,writable:e.writable,value:e.initializer?e.initializer.call(this):void 0})}},d=n.prototype,p="value",h=[o.tracked],f={configurable:!0,enumerable:!0,writable:!0,initializer:null},m={},Object.keys(f).forEach(function(e){m[e]=f[e]}),m.enumerable=!!m.enumerable,m.configurable=!!m.configurable,("value"in m||m.initializer)&&(m.writable=!0),void 0===(m=h.slice().reverse().reduce(function(e,t){return t(d,p,e)||e},m)).initializer&&(Object.defineProperty(d,p,m),m=null),a=m,n)
var d,p,h,f,m
function g(e,t,r){let n=t.get(e)
return void 0===n&&(n=new u,t.set(e,n),n.value=n.peek="function"==typeof r?r.call(e):r),n}function b(e,t){(0,s.assert)(`@localCopy() must be given a memo path as its first argument, received \`${String(e)}\``,"string"==typeof e)
let r=new WeakMap
return()=>{let n=t=>(0,i.get)(t,e)
return{get(){let e=g(this,r,t),{prevRemote:a}=e,s=n(this)
return a!==s&&(e.value=e.prevRemote=s),e.value},set(e){if(!r.has(this)){let a=g(this,r,t)
return a.prevRemote=n(this),void(a.value=e)}g(this,r,t).value=e}}}}function _(e){(0,s.assert)(`@trackedReset() must be given a memo path, a memo function, or config object with a memo path or function as its first argument, received \`${String(e)}\``,"string"==typeof e||"function"==typeof e||"object"==typeof e&&null!==e&&void 0!==e.memo)
let t=new WeakMap
return(r,n,a)=>{let s,o,l=a.initializer??(()=>{})
"object"==typeof e?(s=e.memo,o=e.update??l):(s=e,o=l)
let c="function"==typeof s?(e,t)=>s.call(e,e,n,t):e=>(0,i.get)(e,s)
return{get(){let e=g(this,t,l),{prevRemote:r}=e,a=c(this,r)
return a!==r&&(e.prevRemote=a,e.value=e.peek=o.call(this,this,n,e.peek)),e.value},set(e){g(this,t,l).value=e}}}}function v(e,t,r){(0,s.assert)("@cached can only be used on getters",r&&r.get)
let{get:n,set:a}=r,i=new WeakMap
return{get(){let e=i.get(this)
return void 0===e&&(e=(0,l.createCache)(n.bind(this)),i.set(this,e)),(0,l.getValue)(e)},set:a}}function w(){let e
const t=function(t,r,n){let{initializer:a}=n,{get:s,set:i}=(0,o.tracked)(t,r,n),l=new WeakMap
return{get(){if(!l.has(this)){let e=a?.call(this)
l.set(this,e),i.call(this,e)}return s.call(this)},set(t){l.has(this)&&e(t,l.get(this))||(l.set(this,t),i.call(this,t))}}}
return 3===arguments.length?(e=(e,t)=>e===t,t(...arguments)):1===arguments.length&&"function"==typeof arguments[0]?(e=arguments[0],t):void(0,s.assert)(`@dedupeTracked() can either be invoked without arguments or with one comparator function, received \`${String(arguments)}\``,!1)}},766:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>a})
var n=r(9128)
function a(e,t){return(0,n.A)(e)!==(0,n.A)(t)}},1355:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>R})
var n=r(2377),a=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],s=a.join(","),i="undefined"==typeof Element,o=i?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,l=!i&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},c=function(e,t,r){var n=Array.prototype.slice.apply(e.querySelectorAll(s))
return t&&o.call(e,s)&&n.unshift(e),n.filter(r)},u=function e(t,r,n){for(var a=[],i=Array.from(t);i.length;){var l=i.shift()
if("SLOT"===l.tagName){var c=l.assignedElements(),u=e(c.length?c:l.children,!0,n)
n.flatten?a.push.apply(a,u):a.push({scope:l,candidates:u})}else{o.call(l,s)&&n.filter(l)&&(r||!t.includes(l))&&a.push(l)
var d=l.shadowRoot||"function"==typeof n.getShadowRoot&&n.getShadowRoot(l),p=!n.shadowRootFilter||n.shadowRootFilter(l)
if(d&&p){var h=e(!0===d?l.children:d.children,!0,n)
n.flatten?a.push.apply(a,h):a.push({scope:l,candidates:h})}else i.unshift.apply(i,l.children)}}return a},d=function(e,t){return e.tabIndex<0&&(t||/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||e.isContentEditable)&&isNaN(parseInt(e.getAttribute("tabindex"),10))?0:e.tabIndex},p=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},h=function(e){return"INPUT"===e.tagName},f=function(e){var t=e.getBoundingClientRect(),r=t.width,n=t.height
return 0===r&&0===n},m=function(e,t){return!(t.disabled||function(e){return h(e)&&"hidden"===e.type}(t)||function(e,t){var r=t.displayCheck,n=t.getShadowRoot
if("hidden"===getComputedStyle(e).visibility)return!0
var a=o.call(e,"details>summary:first-of-type")?e.parentElement:e
if(o.call(a,"details:not([open]) *"))return!0
var s=l(e).host,i=(null==s?void 0:s.ownerDocument.contains(s))||e.ownerDocument.contains(e)
if(r&&"full"!==r){if("non-zero-area"===r)return f(e)}else{if("function"==typeof n){for(var c=e;e;){var u=e.parentElement,d=l(e)
if(u&&!u.shadowRoot&&!0===n(u))return f(e)
e=e.assignedSlot?e.assignedSlot:u||d===e.ownerDocument?u:d.host}e=c}if(i)return!e.getClientRects().length}return!1}(t,e)||function(e){return"DETAILS"===e.tagName&&Array.prototype.slice.apply(e.children).some(function(e){return"SUMMARY"===e.tagName})}(t)||function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if("FIELDSET"===t.tagName&&t.disabled){for(var r=0;r<t.children.length;r++){var n=t.children.item(r)
if("LEGEND"===n.tagName)return!!o.call(t,"fieldset[disabled] *")||!n.contains(e)}return!0}t=t.parentElement}return!1}(t))},g=function(e,t){return!(function(e){return function(e){return h(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0
var t,r=e.form||l(e),n=function(e){return r.querySelectorAll('input[type="radio"][name="'+e+'"]')}
if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)t=n(window.CSS.escape(e.name))
else try{t=n(e.name)}catch(e){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",e.message),!1}var a=function(e,t){for(var r=0;r<e.length;r++)if(e[r].checked&&e[r].form===t)return e[r]}(t,e.form)
return!a||a===e}(e)}(t)||d(t)<0||!m(e,t))},b=function(e){var t=parseInt(e.getAttribute("tabindex"),10)
return!!(isNaN(t)||t>=0)},_=function e(t){var r=[],n=[]
return t.forEach(function(t,a){var s=!!t.scope,i=s?t.scope:t,o=d(i,s),l=s?e(t.candidates):i
0===o?s?r.push.apply(r,l):r.push(i):n.push({documentOrder:a,tabIndex:o,item:t,isScope:s,content:l})}),n.sort(p).reduce(function(e,t){return t.isScope?e.push.apply(e,t.content):e.push(t.content),e},[]).concat(r)},v=function(e,t){var r
return r=(t=t||{}).getShadowRoot?u([e],t.includeContainer,{filter:g.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot,shadowRootFilter:b}):c(e,t.includeContainer,g.bind(null,t)),_(r)},w=function(e,t){if(t=t||{},!e)throw new Error("No node provided")
return!1!==o.call(e,s)&&g(t,e)},y=a.concat("iframe").join(","),k=function(e,t){if(t=t||{},!e)throw new Error("No node provided")
return!1!==o.call(e,y)&&m(t,e)}
function x(e,t){var r=Object.keys(e)
if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e)
t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{}
t%2?x(Object(r),!0).forEach(function(t){S(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function S(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var E,j=(E=[],{activateTrap:function(e){if(E.length>0){var t=E[E.length-1]
t!==e&&t.pause()}var r=E.indexOf(e);-1===r||E.splice(r,1),E.push(e)},deactivateTrap:function(e){var t=E.indexOf(e);-1!==t&&E.splice(t,1),E.length>0&&E[E.length-1].unpause()}}),T=function(e){return setTimeout(e,0)},C=function(e,t){var r=-1
return e.every(function(e,n){return!t(e)||(r=n,!1)}),r},O=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n]
return"function"==typeof e?e.apply(void 0,r):e},z=function(e){return e.target.shadowRoot&&"function"==typeof e.composedPath?e.composedPath()[0]:e.target},M=function(e,t){var r,n=(null==t?void 0:t.document)||document,a=P({returnFocusOnDeactivate:!0,escapeDeactivates:!0,delayInitialFocus:!0},t),s={containers:[],containerGroups:[],tabbableGroups:[],nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1,delayInitialFocusTimer:void 0},i=function(e,t,r){return e&&void 0!==e[t]?e[t]:a[r||t]},o=function(e){return s.containerGroups.findIndex(function(t){var r=t.container,n=t.tabbableNodes
return r.contains(e)||n.find(function(t){return t===e})})},l=function(e){var t=a[e]
if("function"==typeof t){for(var r=arguments.length,s=new Array(r>1?r-1:0),i=1;i<r;i++)s[i-1]=arguments[i]
t=t.apply(void 0,s)}if(!0===t&&(t=void 0),!t){if(void 0===t||!1===t)return t
throw new Error("`".concat(e,"` was specified but was not a node, or did not return a node"))}var o=t
if("string"==typeof t&&!(o=n.querySelector(t)))throw new Error("`".concat(e,"` as selector refers to no known node"))
return o},d=function(){var e=l("initialFocus")
if(!1===e)return!1
if(void 0===e)if(o(n.activeElement)>=0)e=n.activeElement
else{var t=s.tabbableGroups[0]
e=t&&t.firstTabbableNode||l("fallbackFocus")}if(!e)throw new Error("Your focus-trap needs to have at least one focusable element")
return e},p=function(){if(s.containerGroups=s.containers.map(function(e){var t,r,n=v(e,a.tabbableOptions),s=(t=e,(r=(r=a.tabbableOptions)||{}).getShadowRoot?u([t],r.includeContainer,{filter:m.bind(null,r),flatten:!0,getShadowRoot:r.getShadowRoot}):c(t,r.includeContainer,m.bind(null,r)))
return{container:e,tabbableNodes:n,focusableNodes:s,firstTabbableNode:n.length>0?n[0]:null,lastTabbableNode:n.length>0?n[n.length-1]:null,nextTabbableNode:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=s.findIndex(function(t){return t===e})
if(!(r<0))return t?s.slice(r+1).find(function(e){return w(e,a.tabbableOptions)}):s.slice(0,r).reverse().find(function(e){return w(e,a.tabbableOptions)})}}}),s.tabbableGroups=s.containerGroups.filter(function(e){return e.tabbableNodes.length>0}),s.tabbableGroups.length<=0&&!l("fallbackFocus"))throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times")},h=function e(t){!1!==t&&t!==n.activeElement&&(t&&t.focus?(t.focus({preventScroll:!!a.preventScroll}),s.mostRecentlyFocusedNode=t,function(e){return e.tagName&&"input"===e.tagName.toLowerCase()&&"function"==typeof e.select}(t)&&t.select()):e(d()))},f=function(e){var t=l("setReturnFocus",e)
return t||!1!==t&&e},g=function(e){var t=z(e)
o(t)>=0||(O(a.clickOutsideDeactivates,e)?r.deactivate({returnFocus:a.returnFocusOnDeactivate&&!k(t,a.tabbableOptions)}):O(a.allowOutsideClick,e)||e.preventDefault())},b=function(e){var t=z(e),r=o(t)>=0
r||t instanceof Document?r&&(s.mostRecentlyFocusedNode=t):(e.stopImmediatePropagation(),h(s.mostRecentlyFocusedNode||d()))},_=function(e){if(function(e){return"Escape"===e.key||"Esc"===e.key||27===e.keyCode}(e)&&!1!==O(a.escapeDeactivates,e))return e.preventDefault(),void r.deactivate();(function(e){return"Tab"===e.key||9===e.keyCode})(e)&&function(e){var t=z(e)
p()
var r=null
if(s.tabbableGroups.length>0){var n=o(t),i=n>=0?s.containerGroups[n]:void 0
if(n<0)r=e.shiftKey?s.tabbableGroups[s.tabbableGroups.length-1].lastTabbableNode:s.tabbableGroups[0].firstTabbableNode
else if(e.shiftKey){var c=C(s.tabbableGroups,function(e){var r=e.firstTabbableNode
return t===r})
if(c<0&&(i.container===t||k(t,a.tabbableOptions)&&!w(t,a.tabbableOptions)&&!i.nextTabbableNode(t,!1))&&(c=n),c>=0){var u=0===c?s.tabbableGroups.length-1:c-1
r=s.tabbableGroups[u].lastTabbableNode}}else{var d=C(s.tabbableGroups,function(e){var r=e.lastTabbableNode
return t===r})
if(d<0&&(i.container===t||k(t,a.tabbableOptions)&&!w(t,a.tabbableOptions)&&!i.nextTabbableNode(t))&&(d=n),d>=0){var f=d===s.tabbableGroups.length-1?0:d+1
r=s.tabbableGroups[f].firstTabbableNode}}}else r=l("fallbackFocus")
r&&(e.preventDefault(),h(r))}(e)},y=function(e){var t=z(e)
o(t)>=0||O(a.clickOutsideDeactivates,e)||O(a.allowOutsideClick,e)||(e.preventDefault(),e.stopImmediatePropagation())},x=function(){if(s.active)return j.activateTrap(r),s.delayInitialFocusTimer=a.delayInitialFocus?T(function(){h(d())}):h(d()),n.addEventListener("focusin",b,!0),n.addEventListener("mousedown",g,{capture:!0,passive:!1}),n.addEventListener("touchstart",g,{capture:!0,passive:!1}),n.addEventListener("click",y,{capture:!0,passive:!1}),n.addEventListener("keydown",_,{capture:!0,passive:!1}),r},S=function(){if(s.active)return n.removeEventListener("focusin",b,!0),n.removeEventListener("mousedown",g,!0),n.removeEventListener("touchstart",g,!0),n.removeEventListener("click",y,!0),n.removeEventListener("keydown",_,!0),r}
return(r={get active(){return s.active},get paused(){return s.paused},activate:function(e){if(s.active)return this
var t=i(e,"onActivate"),r=i(e,"onPostActivate"),a=i(e,"checkCanFocusTrap")
a||p(),s.active=!0,s.paused=!1,s.nodeFocusedBeforeActivation=n.activeElement,t&&t()
var o=function(){a&&p(),x(),r&&r()}
return a?(a(s.containers.concat()).then(o,o),this):(o(),this)},deactivate:function(e){if(!s.active)return this
var t=P({onDeactivate:a.onDeactivate,onPostDeactivate:a.onPostDeactivate,checkCanReturnFocus:a.checkCanReturnFocus},e)
clearTimeout(s.delayInitialFocusTimer),s.delayInitialFocusTimer=void 0,S(),s.active=!1,s.paused=!1,j.deactivateTrap(r)
var n=i(t,"onDeactivate"),o=i(t,"onPostDeactivate"),l=i(t,"checkCanReturnFocus"),c=i(t,"returnFocus","returnFocusOnDeactivate")
n&&n()
var u=function(){T(function(){c&&h(f(s.nodeFocusedBeforeActivation)),o&&o()})}
return c&&l?(l(f(s.nodeFocusedBeforeActivation)).then(u,u),this):(u(),this)},pause:function(){return s.paused||!s.active||(s.paused=!0,S()),this},unpause:function(){return s.paused&&s.active?(s.paused=!1,p(),x(),this):this},updateContainerElements:function(e){var t=[].concat(e).filter(Boolean)
return s.containers=t.map(function(e){return"string"==typeof e?n.querySelector(e):e}),s.active&&p(),this}}).updateContainerElements(e),r}
let A
try{A=(0,n.capabilities)("3.22")}catch{A=(0,n.capabilities)("3.13")}var R=(0,n.setModifierManager)(()=>({capabilities:A,createModifier:()=>({focusTrapOptions:void 0,isActive:!0,isPaused:!1,shouldSelfFocus:!1,focusTrap:void 0}),installModifier(e,t,{named:{isActive:r,isPaused:n,shouldSelfFocus:a,focusTrapOptions:s,additionalElements:i,_createFocusTrap:o}}){e.focusTrapOptions={...s}||{},void 0!==r&&(e.isActive=r),void 0!==n&&(e.isPaused=n),e.focusTrapOptions&&void 0===e.focusTrapOptions.initialFocus&&a&&(e.focusTrapOptions.initialFocus=t)
let l=M
o&&(l=o),!1!==e.focusTrapOptions.returnFocusOnDeactivate&&(e.focusTrapOptions.returnFocusOnDeactivate=!0),e.focusTrap=l(void 0!==i?[t,...i]:t,e.focusTrapOptions),e.isActive&&e.focusTrap.activate(),e.isPaused&&e.focusTrap.pause()},updateModifier(e,{named:t}){const r=t.focusTrapOptions||{}
if(e.isActive&&!t.isActive){const{returnFocusOnDeactivate:t}=r,n=void 0===t
e.focusTrap.deactivate({returnFocus:n})}else!e.isActive&&t.isActive&&e.focusTrap.activate()
e.isPaused&&!t.isPaused?e.focusTrap.unpause():!e.isPaused&&t.isPaused&&e.focusTrap.pause(),e.focusTrapOptions=r,void 0!==t.isActive&&(e.isActive=t.isActive),void 0!==t.isPaused&&(e.isPaused=t.isPaused)},destroyModifier({focusTrap:e}){e.deactivate()}}),class{})},1451:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{ModuleRegistry:()=>g,default:()=>b})
class n{constructor(e,t,r){this.limit=e,this.func=t,this.store=r,this.size=0,this.misses=0,this.hits=0,this.store=r||new Map}get(e){let t=this.store.get(e)
return this.store.has(e)?(this.hits++,this.store.get(e)):(this.misses++,t=this.set(e,this.func(e)),t)}set(e,t){return this.limit>this.size&&(this.size++,this.store.set(e,t)),t}purge(){this.store.clear(),this.size=0,this.hits=0,this.misses=0}}const a=/[ _]/g,s=new n(1e3,e=>{return(t=e,f.get(t)).replace(a,"-")
var t}),i=/^(\-|_)+(.)?/,o=/(.)(\-|\_|\.|\s)+(.)?/g,l=/(^|\/|\.)([a-z])/g,c=new n(1e3,e=>{const t=(e,t,r)=>r?`_${r.toUpperCase()}`:"",r=(e,t,r,n)=>t+(n?n.toUpperCase():""),n=e.split("/")
for(let a=0;a<n.length;a++)n[a]=n[a].replace(i,t).replace(o,r)
return n.join("/").replace(l,e=>e.toUpperCase())}),u=/([a-z\d])([A-Z]+)/g,d=/\-|\s+/g,p=new n(1e3,e=>e.replace(u,"$1_$2").replace(d,"_").toLowerCase()),h=/([a-z\d])([A-Z])/g,f=new n(1e3,e=>e.replace(h,"$1_$2").toLowerCase())
function m(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class g{constructor(e){this._entries=e||globalThis.requirejs.entries}moduleNames(){return Object.keys(this._entries)}has(e){return e in this._entries}get(...e){return globalThis.require(...e)}}class b{static create(e){return new this(e)}static withModules(e){var t
return m(t=class extends(this){},"explicitModules",e),t}constructor(e){if(m(this,"moduleBasedResolver",!0),m(this,"_deprecatedPodModulePrefix",!1),m(this,"_normalizeCache",Object.create(null)),m(this,"moduleNameLookupPatterns",[this.podBasedModuleName,this.podBasedComponentsInSubdir,this.mainModuleName,this.defaultModuleName,this.nestedColocationComponentModuleName]),Object.assign(this,e),!this._moduleRegistry){let e=this.constructor.explicitModules
e?this._moduleRegistry={moduleNames:()=>Object.keys(e),has:t=>Boolean(e[t]),get:t=>e[t],addModules(t){e=Object.assign({},e,t)}}:(void 0===globalThis.requirejs.entries&&(globalThis.requirejs.entries=globalThis.requirejs._eak_seen),this._moduleRegistry=new g)}this.pluralizedTypes=this.pluralizedTypes||Object.create(null),this.pluralizedTypes.config||(this.pluralizedTypes.config="config")}makeToString(e,t){return this.namespace.modulePrefix+"@"+t+":"}shouldWrapInClassFactory(){return!1}parseName(e){if(!0===e.parsedName)return e
let t,r,n,a=e.split("@")
if(3===a.length){if(0===a[0].length){t=`@${a[1]}`
let e=a[2].split(":")
r=e[0],n=e[1]}else t=`@${a[1]}`,r=a[0].slice(0,-1),n=a[2]
"template:components"===r&&(n=`components/${n}`,r="template")}else if(2===a.length){let e=a[0].split(":")
if(2===e.length)0===e[1].length?(r=e[0],n=`@${a[1]}`):(t=e[1],r=e[0],n=a[1])
else{let e=a[1].split(":")
t=a[0],r=e[0],n=e[1]}"template"===r&&0===t.lastIndexOf("components/",0)&&(n=`components/${n}`,t=t.slice(11))}else a=e.split(":"),r=a[0],n=a[1]
let s=n,i=this.namespace
return{parsedName:!0,fullName:e,prefix:t||this.prefix({type:r}),type:r,fullNameWithoutType:s,name:n,root:i,resolveMethodName:"resolve"+(o=r,c.get(o))}
var o}resolveOther(e){_("`modulePrefix` must be defined",this.namespace.modulePrefix)
let t=this.findModuleName(e)
if(t){let n=this._extractDefaultExport(t,e)
if(void 0===n)throw new Error(` Expected to find: '${e.fullName}' within '${t}' but got 'undefined'. Did you forget to 'export default' within '${t}'?`)
return this.shouldWrapInClassFactory(n,e)&&(r=n,n={create:e=>"function"==typeof r.extend?r.extend(e):r}),n}var r}normalize(e){return this._normalizeCache[e]||(this._normalizeCache[e]=this._normalize(e))}resolve(e){if("resolver:current"===e)return{create:()=>this}
let t,r=this.parseName(e),n=r.resolveMethodName
return"function"==typeof this[n]&&(t=this[n](r)),null==t&&(t=this.resolveOther(r)),t}addModules(e){if(!this._moduleRegistry.addModules)throw new Error("addModules is only supported when your Resolver has been configured to use static modules via Resolver.withModules()")
this._moduleRegistry.addModules(e)}_normalize(e){let t=e.split(":")
if(t.length>1){let e=t[0]
return"component"===e||"helper"===e||"modifier"===e||"template"===e&&0===t[1].indexOf("components/")?e+":"+t[1].replace(/_/g,"-"):e+":"+(r=t[1].replace(/\./g,"/"),s.get(r))}return e
var r}pluralize(e){return this.pluralizedTypes[e]||(this.pluralizedTypes[e]=e+"s")}podBasedLookupWithPrefix(e,t){let r=t.fullNameWithoutType
return"template"===t.type&&(r=r.replace(/^components\//,"")),e+"/"+r+"/"+t.type}podBasedModuleName(e){let t=this.namespace.podModulePrefix||this.namespace.modulePrefix
return this.podBasedLookupWithPrefix(t,e)}podBasedComponentsInSubdir(e){let t=this.namespace.podModulePrefix||this.namespace.modulePrefix
if(t+="/components","component"===e.type||/^components/.test(e.fullNameWithoutType))return this.podBasedLookupWithPrefix(t,e)}resolveEngine(e){let t=e.fullNameWithoutType+"/engine"
if(this._moduleRegistry.has(t))return this._extractDefaultExport(t)}resolveRouteMap(e){let t=e.fullNameWithoutType,r=t+"/routes"
if(this._moduleRegistry.has(r)){let e=this._extractDefaultExport(r)
return _(`The route map for ${t} should be wrapped by 'buildRoutes' before exporting.`,e.isRouteMap),e}}resolveTemplate(e){return this.resolveOther(e)}mainModuleName(e){if("main"===e.fullNameWithoutType)return e.prefix+"/"+e.type}defaultModuleName(e){return e.prefix+"/"+this.pluralize(e.type)+"/"+e.fullNameWithoutType}nestedColocationComponentModuleName(e){if("component"===e.type)return e.prefix+"/"+this.pluralize(e.type)+"/"+e.fullNameWithoutType+"/index"}prefix(e){let t=this.namespace.modulePrefix
return this.namespace[e.type+"Prefix"]&&(t=this.namespace[e.type+"Prefix"]),t}findModuleName(e){let t,r=this.moduleNameLookupPatterns
for(let n=0,a=r.length;n<a;n++){let a=r[n].call(this,e)
if(a&&(a=this.chooseModuleName(a)),a&&this._moduleRegistry.has(a)&&(t=a),t)return t}}chooseModuleName(e){let t=(r=e,p.get(r))
var r
if(e!==t&&this._moduleRegistry.has(e)&&this._moduleRegistry.has(t))throw new TypeError(`Ambiguous module names: '${e}' and '${t}'`)
return this._moduleRegistry.has(e)?e:this._moduleRegistry.has(t)?t:void 0}knownForType(e){let t=this._moduleRegistry.moduleNames(),r=Object.create(null)
for(let n=0,a=t.length;n<a;n++){let a=t[n],s=this.translateToContainerFullname(e,a)
s&&(r[s]=!0)}return r}translateToContainerFullname(e,t){let r=this.prefix({type:e}),n=r+"/",a="/"+e,s=t.indexOf(n),i=t.indexOf(a)
if(0===s&&i===t.length-a.length&&t.length>n.length+a.length)return e+":"+t.slice(s+n.length,i)
let o=r+"/"+this.pluralize(e)+"/"
return 0===t.indexOf(o)&&t.length>o.length?e+":"+t.slice(o.length):void 0}_extractDefaultExport(e){let t=this._moduleRegistry.get(e,null,null,!0)
return t&&t.default&&(t=t.default),t}}function _(e,t){if(!t)throw new Error(e)}m(b,"moduleBasedResolver",!0)},1624:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{setup:()=>c})
var n=Object.defineProperty,a=Object.prototype.hasOwnProperty,s=Object.getOwnPropertySymbols,i=Object.prototype.propertyIsEnumerable,o=(e,t,r)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,l=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&o(e,r,t[r])
if(s)for(var r of s(t))i.call(t,r)&&o(e,r,t[r])
return e}
function c(e){function t(e){return new RegExp(`\\b(?:${e.split(" ").join("|")})\\b`)}let r="[-+*/_~!@$%^=<>{}\\w]+",n=/[A-Za-z0-9]+/,a=p.either(n,/[a-zA-Z0-9]+\.[a-zA-Z0-9-]+/,p.concat(n,/::/,/-?/,n)),s=/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,i=new RegExp(p.either(/"[^{"]+/,/"/,/'[^{']+/,/'/,/"[^"]+"/,/'[^']+'/)),o={"parameter argument property":{pattern:/@[\w\d-_]+/}},c={punctuation:[{pattern:/[!#%&:()*+,.\/;<=>\[\\\]^`{|}~]+/},{pattern:/^=/,alias:"attr-equals"},{pattern:/\/?>/}]},u={"function-name":[{pattern:new RegExp("(\\()"+r),lookbehind:!0},{pattern:new RegExp("(\\{\\{\\{?)"+r),lookbehind:!0}]},d={builtin:t(["action on","outlet yield","log debugger","let each each-in if else unless"].join(" ")),keyword:t(["has-block concat fn component helper modifier get hash query-params","true false undefined null"].join(" ")),operator:t(["eq neq","gt gte le lte","and or not","as"].join(" "))},h={function:{greedy:!0,pattern:/\([\S-_\d]+\b/,inside:l(l(l({},c),u),d)}},f={"this-expression":{pattern:/this\.[\S]+/,lookbehind:!0,greedy:!0,inside:l(l({},c),{namespace:/this/,property:/[\S]+/})}},m={"member-expression":{pattern:/[\S]+\.[\S]+/,lookbehind:!0,greedy:!0,inside:l(l({},c),{constant:/[\S]+/,property:/[\S]+/})}},g=l(l(l(l(l(l(l(l(l({},h),c),f),m),o),{number:s,boolean:/\b(?:true|false)\b/}),d),u),{"attr-name":/^[^=]+=/,string:i,variable:/\b[A-Za-z0-9_-]+\b/}),b={mustache:{pattern:/\{\{\{?\/?[^}]+?\}?\}\}/,lookbehind:!0,alias:"punctuation",greedy:!0,inside:l(l({},{"sub-expression":{alias:"punctuation",pattern:/\([^)]+\)/,lookbehind:!0,greedy:!0,inside:g}}),g)}},_={string:{pattern:i,inside:b}}
g.string=_.string
let v=e.languages.markup
if(!v)throw new Error("prism-markup is required")
e.languages.glimmer=l(l({comment:[{pattern:/\{\{!--[\s\S]*?--\}\}/},{pattern:/\{\{![\s\S]*?\}\}/}],number:s},b),{tag:l(l({},v.tag),{inside:l(l(l(l(l({number:s},o),b),{tag:l(l({},v.tag.inside.tag),{inside:l(l({},c),{"class-name":new RegExp(a)})}),"attr-name":{pattern:/\b[^=\b]+=/,inside:l(l(l(l({},_),c),o),b)}}),c),_)})})}function u(...e){return e.map(e=>d(e)).join("")}function d(e){return e?"string"==typeof e?e:e.source:null}var p={lookahead:function(e){return u("(?=",e,")")},either:function(...e){return"("+e.map(e=>d(e)).join("|")+")"},optional:function(e){return u("(",e,")?")},concat:u}},1640:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>i})
var n=r(336),a=r.n(n),s=r(1603)
class i extends(a()){constructor(...e){var t,r,n
super(...e),t=this,n=!1,(r=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(r="didRun"))in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n}compute(e,t){const[r,...n]=e
if((0,s.assert)(`\`{{did-update-helper}}\` expects a callback function as the first parameter. You provided: ${r}`,"function"==typeof r),!this.didRun)return this.didRun=!0,e.forEach(()=>{}),void Object.values(t)
r(n,t)}}},2192:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{afterMain:()=>k,afterRead:()=>v,afterWrite:()=>S,applyStyles:()=>M,arrow:()=>X,auto:()=>o,basePlacements:()=>l,beforeMain:()=>w,beforeRead:()=>b,beforeWrite:()=>x,bottom:()=>a,clippingParents:()=>d,computeStyles:()=>re,createPopper:()=>ze,createPopperBase:()=>Oe,createPopperLite:()=>Me,detectOverflow:()=>be,end:()=>u,eventListeners:()=>ae,flip:()=>_e,hide:()=>ye,left:()=>i,main:()=>y,modifierPhases:()=>E,offset:()=>ke,placements:()=>g,popper:()=>h,popperGenerator:()=>Ce,popperOffsets:()=>xe,preventOverflow:()=>Pe,read:()=>_,reference:()=>f,right:()=>s,start:()=>c,top:()=>n,variationPlacements:()=>m,viewport:()=>p,write:()=>P})
var n="top",a="bottom",s="right",i="left",o="auto",l=[n,a,s,i],c="start",u="end",d="clippingParents",p="viewport",h="popper",f="reference",m=l.reduce(function(e,t){return e.concat([t+"-"+c,t+"-"+u])},[]),g=[].concat(l,[o]).reduce(function(e,t){return e.concat([t,t+"-"+c,t+"-"+u])},[]),b="beforeRead",_="read",v="afterRead",w="beforeMain",y="main",k="afterMain",x="beforeWrite",P="write",S="afterWrite",E=[b,_,v,w,y,k,x,P,S]
function j(e){return e?(e.nodeName||"").toLowerCase():null}function T(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function C(e){return e instanceof T(e).Element||e instanceof Element}function O(e){return e instanceof T(e).HTMLElement||e instanceof HTMLElement}function z(e){return"undefined"!=typeof ShadowRoot&&(e instanceof T(e).ShadowRoot||e instanceof ShadowRoot)}const M={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach(function(e){var r=t.styles[e]||{},n=t.attributes[e]||{},a=t.elements[e]
O(a)&&j(a)&&(Object.assign(a.style,r),Object.keys(n).forEach(function(e){var t=n[e]
!1===t?a.removeAttribute(e):a.setAttribute(e,!0===t?"":t)}))})},effect:function(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(e){var n=t.elements[e],a=t.attributes[e]||{},s=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:r[e]).reduce(function(e,t){return e[t]="",e},{})
O(n)&&j(n)&&(Object.assign(n.style,s),Object.keys(a).forEach(function(e){n.removeAttribute(e)}))})}},requires:["computeStyles"]}
function A(e){return e.split("-")[0]}var R=Math.max,L=Math.min,I=Math.round
function N(){var e=navigator.userAgentData
return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function D(){return!/^((?!chrome|android).)*safari/i.test(N())}function F(e,t,r){void 0===t&&(t=!1),void 0===r&&(r=!1)
var n=e.getBoundingClientRect(),a=1,s=1
t&&O(e)&&(a=e.offsetWidth>0&&I(n.width)/e.offsetWidth||1,s=e.offsetHeight>0&&I(n.height)/e.offsetHeight||1)
var i=(C(e)?T(e):window).visualViewport,o=!D()&&r,l=(n.left+(o&&i?i.offsetLeft:0))/a,c=(n.top+(o&&i?i.offsetTop:0))/s,u=n.width/a,d=n.height/s
return{width:u,height:d,top:c,right:l+u,bottom:c+d,left:l,x:l,y:c}}function B(e){var t=F(e),r=e.offsetWidth,n=e.offsetHeight
return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function $(e,t){var r=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(r&&z(r)){var n=t
do{if(n&&e.isSameNode(n))return!0
n=n.parentNode||n.host}while(n)}return!1}function H(e){return T(e).getComputedStyle(e)}function q(e){return["table","td","th"].indexOf(j(e))>=0}function W(e){return((C(e)?e.ownerDocument:e.document)||window.document).documentElement}function G(e){return"html"===j(e)?e:e.assignedSlot||e.parentNode||(z(e)?e.host:null)||W(e)}function U(e){return O(e)&&"fixed"!==H(e).position?e.offsetParent:null}function V(e){for(var t=T(e),r=U(e);r&&q(r)&&"static"===H(r).position;)r=U(r)
return r&&("html"===j(r)||"body"===j(r)&&"static"===H(r).position)?t:r||function(e){var t=/firefox/i.test(N())
if(/Trident/i.test(N())&&O(e)&&"fixed"===H(e).position)return null
var r=G(e)
for(z(r)&&(r=r.host);O(r)&&["html","body"].indexOf(j(r))<0;){var n=H(r)
if("none"!==n.transform||"none"!==n.perspective||"paint"===n.contain||-1!==["transform","perspective"].indexOf(n.willChange)||t&&"filter"===n.willChange||t&&n.filter&&"none"!==n.filter)return r
r=r.parentNode}return null}(e)||t}function Y(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function K(e,t,r){return R(e,L(t,r))}function Z(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function Q(e,t){return t.reduce(function(t,r){return t[r]=e,t},{})}const X={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,r=e.state,o=e.name,c=e.options,u=r.elements.arrow,d=r.modifiersData.popperOffsets,p=A(r.placement),h=Y(p),f=[i,s].indexOf(p)>=0?"height":"width"
if(u&&d){var m=function(e,t){return Z("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:Q(e,l))}(c.padding,r),g=B(u),b="y"===h?n:i,_="y"===h?a:s,v=r.rects.reference[f]+r.rects.reference[h]-d[h]-r.rects.popper[f],w=d[h]-r.rects.reference[h],y=V(u),k=y?"y"===h?y.clientHeight||0:y.clientWidth||0:0,x=v/2-w/2,P=m[b],S=k-g[f]-m[_],E=k/2-g[f]/2+x,j=K(P,E,S),T=h
r.modifiersData[o]=((t={})[T]=j,t.centerOffset=j-E,t)}},effect:function(e){var t=e.state,r=e.options.element,n=void 0===r?"[data-popper-arrow]":r
null!=n&&("string"!=typeof n||(n=t.elements.popper.querySelector(n)))&&$(t.elements.popper,n)&&(t.elements.arrow=n)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]}
function J(e){return e.split("-")[1]}var ee={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function te(e){var t,r=e.popper,o=e.popperRect,l=e.placement,c=e.variation,d=e.offsets,p=e.position,h=e.gpuAcceleration,f=e.adaptive,m=e.roundOffsets,g=e.isFixed,b=d.x,_=void 0===b?0:b,v=d.y,w=void 0===v?0:v,y="function"==typeof m?m({x:_,y:w}):{x:_,y:w}
_=y.x,w=y.y
var k=d.hasOwnProperty("x"),x=d.hasOwnProperty("y"),P=i,S=n,E=window
if(f){var j=V(r),C="clientHeight",O="clientWidth"
j===T(r)&&"static"!==H(j=W(r)).position&&"absolute"===p&&(C="scrollHeight",O="scrollWidth"),(l===n||(l===i||l===s)&&c===u)&&(S=a,w-=(g&&j===E&&E.visualViewport?E.visualViewport.height:j[C])-o.height,w*=h?1:-1),l!==i&&(l!==n&&l!==a||c!==u)||(P=s,_-=(g&&j===E&&E.visualViewport?E.visualViewport.width:j[O])-o.width,_*=h?1:-1)}var z,M=Object.assign({position:p},f&&ee),A=!0===m?function(e,t){var r=e.x,n=e.y,a=t.devicePixelRatio||1
return{x:I(r*a)/a||0,y:I(n*a)/a||0}}({x:_,y:w},T(r)):{x:_,y:w}
return _=A.x,w=A.y,h?Object.assign({},M,((z={})[S]=x?"0":"",z[P]=k?"0":"",z.transform=(E.devicePixelRatio||1)<=1?"translate("+_+"px, "+w+"px)":"translate3d("+_+"px, "+w+"px, 0)",z)):Object.assign({},M,((t={})[S]=x?w+"px":"",t[P]=k?_+"px":"",t.transform="",t))}const re={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,r=e.options,n=r.gpuAcceleration,a=void 0===n||n,s=r.adaptive,i=void 0===s||s,o=r.roundOffsets,l=void 0===o||o,c={placement:A(t.placement),variation:J(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:a,isFixed:"fixed"===t.options.strategy}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,te(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:l})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,te(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}}
var ne={passive:!0}
const ae={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,r=e.instance,n=e.options,a=n.scroll,s=void 0===a||a,i=n.resize,o=void 0===i||i,l=T(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return s&&c.forEach(function(e){e.addEventListener("scroll",r.update,ne)}),o&&l.addEventListener("resize",r.update,ne),function(){s&&c.forEach(function(e){e.removeEventListener("scroll",r.update,ne)}),o&&l.removeEventListener("resize",r.update,ne)}},data:{}}
var se={left:"right",right:"left",bottom:"top",top:"bottom"}
function ie(e){return e.replace(/left|right|bottom|top/g,function(e){return se[e]})}var oe={start:"end",end:"start"}
function le(e){return e.replace(/start|end/g,function(e){return oe[e]})}function ce(e){var t=T(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function ue(e){return F(W(e)).left+ce(e).scrollLeft}function de(e){var t=H(e),r=t.overflow,n=t.overflowX,a=t.overflowY
return/auto|scroll|overlay|hidden/.test(r+a+n)}function pe(e){return["html","body","#document"].indexOf(j(e))>=0?e.ownerDocument.body:O(e)&&de(e)?e:pe(G(e))}function he(e,t){var r
void 0===t&&(t=[])
var n=pe(e),a=n===(null==(r=e.ownerDocument)?void 0:r.body),s=T(n),i=a?[s].concat(s.visualViewport||[],de(n)?n:[]):n,o=t.concat(i)
return a?o:o.concat(he(G(i)))}function fe(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function me(e,t,r){return t===p?fe(function(e,t){var r=T(e),n=W(e),a=r.visualViewport,s=n.clientWidth,i=n.clientHeight,o=0,l=0
if(a){s=a.width,i=a.height
var c=D();(c||!c&&"fixed"===t)&&(o=a.offsetLeft,l=a.offsetTop)}return{width:s,height:i,x:o+ue(e),y:l}}(e,r)):C(t)?function(e,t){var r=F(e,!1,"fixed"===t)
return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}(t,r):fe(function(e){var t,r=W(e),n=ce(e),a=null==(t=e.ownerDocument)?void 0:t.body,s=R(r.scrollWidth,r.clientWidth,a?a.scrollWidth:0,a?a.clientWidth:0),i=R(r.scrollHeight,r.clientHeight,a?a.scrollHeight:0,a?a.clientHeight:0),o=-n.scrollLeft+ue(e),l=-n.scrollTop
return"rtl"===H(a||r).direction&&(o+=R(r.clientWidth,a?a.clientWidth:0)-s),{width:s,height:i,x:o,y:l}}(W(e)))}function ge(e){var t,r=e.reference,o=e.element,l=e.placement,d=l?A(l):null,p=l?J(l):null,h=r.x+r.width/2-o.width/2,f=r.y+r.height/2-o.height/2
switch(d){case n:t={x:h,y:r.y-o.height}
break
case a:t={x:h,y:r.y+r.height}
break
case s:t={x:r.x+r.width,y:f}
break
case i:t={x:r.x-o.width,y:f}
break
default:t={x:r.x,y:r.y}}var m=d?Y(d):null
if(null!=m){var g="y"===m?"height":"width"
switch(p){case c:t[m]=t[m]-(r[g]/2-o[g]/2)
break
case u:t[m]=t[m]+(r[g]/2-o[g]/2)}}return t}function be(e,t){void 0===t&&(t={})
var r=t,i=r.placement,o=void 0===i?e.placement:i,c=r.strategy,u=void 0===c?e.strategy:c,m=r.boundary,g=void 0===m?d:m,b=r.rootBoundary,_=void 0===b?p:b,v=r.elementContext,w=void 0===v?h:v,y=r.altBoundary,k=void 0!==y&&y,x=r.padding,P=void 0===x?0:x,S=Z("number"!=typeof P?P:Q(P,l)),E=w===h?f:h,T=e.rects.popper,z=e.elements[k?E:w],M=function(e,t,r,n){var a="clippingParents"===t?function(e){var t=he(G(e)),r=["absolute","fixed"].indexOf(H(e).position)>=0&&O(e)?V(e):e
return C(r)?t.filter(function(e){return C(e)&&$(e,r)&&"body"!==j(e)}):[]}(e):[].concat(t),s=[].concat(a,[r]),i=s[0],o=s.reduce(function(t,r){var a=me(e,r,n)
return t.top=R(a.top,t.top),t.right=L(a.right,t.right),t.bottom=L(a.bottom,t.bottom),t.left=R(a.left,t.left),t},me(e,i,n))
return o.width=o.right-o.left,o.height=o.bottom-o.top,o.x=o.left,o.y=o.top,o}(C(z)?z:z.contextElement||W(e.elements.popper),g,_,u),A=F(e.elements.reference),I=ge({reference:A,element:T,strategy:"absolute",placement:o}),N=fe(Object.assign({},T,I)),D=w===h?N:A,B={top:M.top-D.top+S.top,bottom:D.bottom-M.bottom+S.bottom,left:M.left-D.left+S.left,right:D.right-M.right+S.right},q=e.modifiersData.offset
if(w===h&&q){var U=q[o]
Object.keys(B).forEach(function(e){var t=[s,a].indexOf(e)>=0?1:-1,r=[n,a].indexOf(e)>=0?"y":"x"
B[e]+=U[r]*t})}return B}const _e={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,r=e.options,u=e.name
if(!t.modifiersData[u]._skip){for(var d=r.mainAxis,p=void 0===d||d,h=r.altAxis,f=void 0===h||h,b=r.fallbackPlacements,_=r.padding,v=r.boundary,w=r.rootBoundary,y=r.altBoundary,k=r.flipVariations,x=void 0===k||k,P=r.allowedAutoPlacements,S=t.options.placement,E=A(S),j=b||(E!==S&&x?function(e){if(A(e)===o)return[]
var t=ie(e)
return[le(e),t,le(t)]}(S):[ie(S)]),T=[S].concat(j).reduce(function(e,r){return e.concat(A(r)===o?function(e,t){void 0===t&&(t={})
var r=t,n=r.placement,a=r.boundary,s=r.rootBoundary,i=r.padding,o=r.flipVariations,c=r.allowedAutoPlacements,u=void 0===c?g:c,d=J(n),p=d?o?m:m.filter(function(e){return J(e)===d}):l,h=p.filter(function(e){return u.indexOf(e)>=0})
0===h.length&&(h=p)
var f=h.reduce(function(t,r){return t[r]=be(e,{placement:r,boundary:a,rootBoundary:s,padding:i})[A(r)],t},{})
return Object.keys(f).sort(function(e,t){return f[e]-f[t]})}(t,{placement:r,boundary:v,rootBoundary:w,padding:_,flipVariations:x,allowedAutoPlacements:P}):r)},[]),C=t.rects.reference,O=t.rects.popper,z=new Map,M=!0,R=T[0],L=0;L<T.length;L++){var I=T[L],N=A(I),D=J(I)===c,F=[n,a].indexOf(N)>=0,B=F?"width":"height",$=be(t,{placement:I,boundary:v,rootBoundary:w,altBoundary:y,padding:_}),H=F?D?s:i:D?a:n
C[B]>O[B]&&(H=ie(H))
var q=ie(H),W=[]
if(p&&W.push($[N]<=0),f&&W.push($[H]<=0,$[q]<=0),W.every(function(e){return e})){R=I,M=!1
break}z.set(I,W)}if(M)for(var G=function(e){var t=T.find(function(t){var r=z.get(t)
if(r)return r.slice(0,e).every(function(e){return e})})
if(t)return R=t,"break"},U=x?3:1;U>0&&"break"!==G(U);U--);t.placement!==R&&(t.modifiersData[u]._skip=!0,t.placement=R,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function ve(e,t,r){return void 0===r&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function we(e){return[n,s,a,i].some(function(t){return e[t]>=0})}const ye={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,r=e.name,n=t.rects.reference,a=t.rects.popper,s=t.modifiersData.preventOverflow,i=be(t,{elementContext:"reference"}),o=be(t,{altBoundary:!0}),l=ve(i,n),c=ve(o,a,s),u=we(l),d=we(c)
t.modifiersData[r]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:u,hasPopperEscaped:d},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":d})}},ke={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,r=e.options,a=e.name,o=r.offset,l=void 0===o?[0,0]:o,c=g.reduce(function(e,r){return e[r]=function(e,t,r){var a=A(e),o=[i,n].indexOf(a)>=0?-1:1,l="function"==typeof r?r(Object.assign({},t,{placement:e})):r,c=l[0],u=l[1]
return c=c||0,u=(u||0)*o,[i,s].indexOf(a)>=0?{x:u,y:c}:{x:c,y:u}}(r,t.rects,l),e},{}),u=c[t.placement],d=u.x,p=u.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=d,t.modifiersData.popperOffsets.y+=p),t.modifiersData[a]=c}},xe={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,r=e.name
t.modifiersData[r]=ge({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},Pe={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,r=e.options,o=e.name,l=r.mainAxis,u=void 0===l||l,d=r.altAxis,p=void 0!==d&&d,h=r.boundary,f=r.rootBoundary,m=r.altBoundary,g=r.padding,b=r.tether,_=void 0===b||b,v=r.tetherOffset,w=void 0===v?0:v,y=be(t,{boundary:h,rootBoundary:f,padding:g,altBoundary:m}),k=A(t.placement),x=J(t.placement),P=!x,S=Y(k),E="x"===S?"y":"x",j=t.modifiersData.popperOffsets,T=t.rects.reference,C=t.rects.popper,O="function"==typeof w?w(Object.assign({},t.rects,{placement:t.placement})):w,z="number"==typeof O?{mainAxis:O,altAxis:O}:Object.assign({mainAxis:0,altAxis:0},O),M=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,I={x:0,y:0}
if(j){if(u){var N,D="y"===S?n:i,F="y"===S?a:s,$="y"===S?"height":"width",H=j[S],q=H+y[D],W=H-y[F],G=_?-C[$]/2:0,U=x===c?T[$]:C[$],Z=x===c?-C[$]:-T[$],Q=t.elements.arrow,X=_&&Q?B(Q):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[D],re=ee[F],ne=K(0,T[$],X[$]),ae=P?T[$]/2-G-ne-te-z.mainAxis:U-ne-te-z.mainAxis,se=P?-T[$]/2+G+ne+re+z.mainAxis:Z+ne+re+z.mainAxis,ie=t.elements.arrow&&V(t.elements.arrow),oe=ie?"y"===S?ie.clientTop||0:ie.clientLeft||0:0,le=null!=(N=null==M?void 0:M[S])?N:0,ce=H+se-le,ue=K(_?L(q,H+ae-le-oe):q,H,_?R(W,ce):W)
j[S]=ue,I[S]=ue-H}if(p){var de,pe="x"===S?n:i,he="x"===S?a:s,fe=j[E],me="y"===E?"height":"width",ge=fe+y[pe],_e=fe-y[he],ve=-1!==[n,i].indexOf(k),we=null!=(de=null==M?void 0:M[E])?de:0,ye=ve?ge:fe-T[me]-C[me]-we+z.altAxis,ke=ve?fe+T[me]+C[me]-we-z.altAxis:_e,xe=_&&ve?function(e,t,r){var n=K(e,t,r)
return n>r?r:n}(ye,fe,ke):K(_?ye:ge,fe,_?ke:_e)
j[E]=xe,I[E]=xe-fe}t.modifiersData[o]=I}},requiresIfExists:["offset"]}
function Se(e,t,r){void 0===r&&(r=!1)
var n,a,s=O(t),i=O(t)&&function(e){var t=e.getBoundingClientRect(),r=I(t.width)/e.offsetWidth||1,n=I(t.height)/e.offsetHeight||1
return 1!==r||1!==n}(t),o=W(t),l=F(e,i,r),c={scrollLeft:0,scrollTop:0},u={x:0,y:0}
return(s||!s&&!r)&&(("body"!==j(t)||de(o))&&(c=(n=t)!==T(n)&&O(n)?{scrollLeft:(a=n).scrollLeft,scrollTop:a.scrollTop}:ce(n)),O(t)?((u=F(t,!0)).x+=t.clientLeft,u.y+=t.clientTop):o&&(u.x=ue(o))),{x:l.left+c.scrollLeft-u.x,y:l.top+c.scrollTop-u.y,width:l.width,height:l.height}}function Ee(e){var t=new Map,r=new Set,n=[]
function a(e){r.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach(function(e){if(!r.has(e)){var n=t.get(e)
n&&a(n)}}),n.push(e)}return e.forEach(function(e){t.set(e.name,e)}),e.forEach(function(e){r.has(e.name)||a(e)}),n}var je={placement:"bottom",modifiers:[],strategy:"absolute"}
function Te(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r]
return!t.some(function(e){return!(e&&"function"==typeof e.getBoundingClientRect)})}function Ce(e){void 0===e&&(e={})
var t=e,r=t.defaultModifiers,n=void 0===r?[]:r,a=t.defaultOptions,s=void 0===a?je:a
return function(e,t,r){void 0===r&&(r=s)
var a,i,o={placement:"bottom",orderedModifiers:[],options:Object.assign({},je,s),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},l=[],c=!1,u={state:o,setOptions:function(r){var a="function"==typeof r?r(o.options):r
d(),o.options=Object.assign({},s,o.options,a),o.scrollParents={reference:C(e)?he(e):e.contextElement?he(e.contextElement):[],popper:he(t)}
var i,c,p=function(e){var t=Ee(e)
return E.reduce(function(e,r){return e.concat(t.filter(function(e){return e.phase===r}))},[])}((i=[].concat(n,o.options.modifiers),c=i.reduce(function(e,t){var r=e[t.name]
return e[t.name]=r?Object.assign({},r,t,{options:Object.assign({},r.options,t.options),data:Object.assign({},r.data,t.data)}):t,e},{}),Object.keys(c).map(function(e){return c[e]})))
return o.orderedModifiers=p.filter(function(e){return e.enabled}),o.orderedModifiers.forEach(function(e){var t=e.name,r=e.options,n=void 0===r?{}:r,a=e.effect
if("function"==typeof a){var s=a({state:o,name:t,instance:u,options:n})
l.push(s||function(){})}}),u.update()},forceUpdate:function(){if(!c){var e=o.elements,t=e.reference,r=e.popper
if(Te(t,r)){o.rects={reference:Se(t,V(r),"fixed"===o.options.strategy),popper:B(r)},o.reset=!1,o.placement=o.options.placement,o.orderedModifiers.forEach(function(e){return o.modifiersData[e.name]=Object.assign({},e.data)})
for(var n=0;n<o.orderedModifiers.length;n++)if(!0!==o.reset){var a=o.orderedModifiers[n],s=a.fn,i=a.options,l=void 0===i?{}:i,d=a.name
"function"==typeof s&&(o=s({state:o,options:l,name:d,instance:u})||o)}else o.reset=!1,n=-1}}},update:(a=function(){return new Promise(function(e){u.forceUpdate(),e(o)})},function(){return i||(i=new Promise(function(e){Promise.resolve().then(function(){i=void 0,e(a())})})),i}),destroy:function(){d(),c=!0}}
if(!Te(e,t))return u
function d(){l.forEach(function(e){return e()}),l=[]}return u.setOptions(r).then(function(e){!c&&r.onFirstUpdate&&r.onFirstUpdate(e)}),u}}var Oe=Ce(),ze=Ce({defaultModifiers:[ae,xe,re,M,ke,_e,Pe,X,ye]}),Me=Ce({defaultModifiers:[ae,xe,re,M]})},2207:function(e,t,r){var n;(function(){function a(e){"use strict"
var t={omitExtraWLInCodeBlocks:{defaultValue:!1,describe:"Omit the default extra whiteline added to code blocks",type:"boolean"},noHeaderId:{defaultValue:!1,describe:"Turn on/off generated header id",type:"boolean"},prefixHeaderId:{defaultValue:!1,describe:"Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",type:"string"},rawPrefixHeaderId:{defaultValue:!1,describe:'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',type:"boolean"},ghCompatibleHeaderId:{defaultValue:!1,describe:"Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",type:"boolean"},rawHeaderId:{defaultValue:!1,describe:"Remove only spaces, ' and \" from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids",type:"boolean"},headerLevelStart:{defaultValue:!1,describe:"The header blocks level start",type:"integer"},parseImgDimensions:{defaultValue:!1,describe:"Turn on/off image dimension parsing",type:"boolean"},simplifiedAutoLink:{defaultValue:!1,describe:"Turn on/off GFM autolink style",type:"boolean"},excludeTrailingPunctuationFromURLs:{defaultValue:!1,describe:"Excludes trailing punctuation from links generated with autoLinking",type:"boolean"},literalMidWordUnderscores:{defaultValue:!1,describe:"Parse midword underscores as literal underscores",type:"boolean"},literalMidWordAsterisks:{defaultValue:!1,describe:"Parse midword asterisks as literal asterisks",type:"boolean"},strikethrough:{defaultValue:!1,describe:"Turn on/off strikethrough support",type:"boolean"},tables:{defaultValue:!1,describe:"Turn on/off tables support",type:"boolean"},tablesHeaderId:{defaultValue:!1,describe:"Add an id to table headers",type:"boolean"},ghCodeBlocks:{defaultValue:!0,describe:"Turn on/off GFM fenced code blocks support",type:"boolean"},tasklists:{defaultValue:!1,describe:"Turn on/off GFM tasklist support",type:"boolean"},smoothLivePreview:{defaultValue:!1,describe:"Prevents weird effects in live previews due to incomplete input",type:"boolean"},smartIndentationFix:{defaultValue:!1,describe:"Tries to smartly fix indentation in es6 strings",type:"boolean"},disableForced4SpacesIndentedSublists:{defaultValue:!1,describe:"Disables the requirement of indenting nested sublists by 4 spaces",type:"boolean"},simpleLineBreaks:{defaultValue:!1,describe:"Parses simple line breaks as <br> (GFM Style)",type:"boolean"},requireSpaceBeforeHeadingText:{defaultValue:!1,describe:"Makes adding a space between `#` and the header text mandatory (GFM Style)",type:"boolean"},ghMentions:{defaultValue:!1,describe:"Enables github @mentions",type:"boolean"},ghMentionsLink:{defaultValue:"https://github.com/{u}",describe:"Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",type:"string"},encodeEmails:{defaultValue:!0,describe:"Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",type:"boolean"},openLinksInNewWindow:{defaultValue:!1,describe:"Open all links in new windows",type:"boolean"},backslashEscapesHTMLTags:{defaultValue:!1,describe:"Support for HTML Tag escaping. ex: <div>foo</div>",type:"boolean"},emoji:{defaultValue:!1,describe:"Enable emoji support. Ex: `this is a :smile: emoji`",type:"boolean"},underline:{defaultValue:!1,describe:"Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",type:"boolean"},ellipsis:{defaultValue:!0,describe:"Replaces three dots with the ellipsis unicode character",type:"boolean"},completeHTMLDocument:{defaultValue:!1,describe:"Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",type:"boolean"},metadata:{defaultValue:!1,describe:"Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).",type:"boolean"},splitAdjacentBlockquotes:{defaultValue:!1,describe:"Split adjacent blockquote blocks",type:"boolean"}}
if(!1===e)return JSON.parse(JSON.stringify(t))
var r={}
for(var n in t)t.hasOwnProperty(n)&&(r[n]=t[n].defaultValue)
return r}var s={},i={},o={},l=a(!0),c="vanilla",u={github:{omitExtraWLInCodeBlocks:!0,simplifiedAutoLink:!0,excludeTrailingPunctuationFromURLs:!0,literalMidWordUnderscores:!0,strikethrough:!0,tables:!0,tablesHeaderId:!0,ghCodeBlocks:!0,tasklists:!0,disableForced4SpacesIndentedSublists:!0,simpleLineBreaks:!0,requireSpaceBeforeHeadingText:!0,ghCompatibleHeaderId:!0,ghMentions:!0,backslashEscapesHTMLTags:!0,emoji:!0,splitAdjacentBlockquotes:!0},original:{noHeaderId:!0,ghCodeBlocks:!1},ghost:{omitExtraWLInCodeBlocks:!0,parseImgDimensions:!0,simplifiedAutoLink:!0,excludeTrailingPunctuationFromURLs:!0,literalMidWordUnderscores:!0,strikethrough:!0,tables:!0,tablesHeaderId:!0,ghCodeBlocks:!0,tasklists:!0,smoothLivePreview:!0,simpleLineBreaks:!0,requireSpaceBeforeHeadingText:!0,ghMentions:!1,encodeEmails:!0},vanilla:a(!0),allOn:function(){"use strict"
var e=a(!0),t={}
for(var r in e)e.hasOwnProperty(r)&&(t[r]=!0)
return t}()}
function d(e,t){"use strict"
var r=t?"Error in "+t+" extension->":"Error in unnamed extension",n={valid:!0,error:""}
s.helper.isArray(e)||(e=[e])
for(var a=0;a<e.length;++a){var i=r+" sub-extension "+a+": ",o=e[a]
if("object"!=typeof o)return n.valid=!1,n.error=i+"must be an object, but "+typeof o+" given",n
if(!s.helper.isString(o.type))return n.valid=!1,n.error=i+'property "type" must be a string, but '+typeof o.type+" given",n
var l=o.type=o.type.toLowerCase()
if("language"===l&&(l=o.type="lang"),"html"===l&&(l=o.type="output"),"lang"!==l&&"output"!==l&&"listener"!==l)return n.valid=!1,n.error=i+"type "+l+' is not recognized. Valid values: "lang/language", "output/html" or "listener"',n
if("listener"===l){if(s.helper.isUndefined(o.listeners))return n.valid=!1,n.error=i+'. Extensions of type "listener" must have a property called "listeners"',n}else if(s.helper.isUndefined(o.filter)&&s.helper.isUndefined(o.regex))return n.valid=!1,n.error=i+l+' extensions must define either a "regex" property or a "filter" method',n
if(o.listeners){if("object"!=typeof o.listeners)return n.valid=!1,n.error=i+'"listeners" property must be an object but '+typeof o.listeners+" given",n
for(var c in o.listeners)if(o.listeners.hasOwnProperty(c)&&"function"!=typeof o.listeners[c])return n.valid=!1,n.error=i+'"listeners" property must be an hash of [event name]: [callback]. listeners.'+c+" must be a function but "+typeof o.listeners[c]+" given",n}if(o.filter){if("function"!=typeof o.filter)return n.valid=!1,n.error=i+'"filter" must be a function, but '+typeof o.filter+" given",n}else if(o.regex){if(s.helper.isString(o.regex)&&(o.regex=new RegExp(o.regex,"g")),!(o.regex instanceof RegExp))return n.valid=!1,n.error=i+'"regex" property must either be a string or a RegExp object, but '+typeof o.regex+" given",n
if(s.helper.isUndefined(o.replace))return n.valid=!1,n.error=i+'"regex" extensions must implement a replace string or function',n}}return n}function p(e,t){"use strict"
return"¨E"+t.charCodeAt(0)+"E"}s.helper={},s.extensions={},s.setOption=function(e,t){"use strict"
return l[e]=t,this},s.getOption=function(e){"use strict"
return l[e]},s.getOptions=function(){"use strict"
return l},s.resetOptions=function(){"use strict"
l=a(!0)},s.setFlavor=function(e){"use strict"
if(!u.hasOwnProperty(e))throw Error(e+" flavor was not found")
s.resetOptions()
var t=u[e]
for(var r in c=e,t)t.hasOwnProperty(r)&&(l[r]=t[r])},s.getFlavor=function(){"use strict"
return c},s.getFlavorOptions=function(e){"use strict"
if(u.hasOwnProperty(e))return u[e]},s.getDefaultOptions=function(e){"use strict"
return a(e)},s.subParser=function(e,t){"use strict"
if(s.helper.isString(e)){if(void 0===t){if(i.hasOwnProperty(e))return i[e]
throw Error("SubParser named "+e+" not registered!")}i[e]=t}},s.extension=function(e,t){"use strict"
if(!s.helper.isString(e))throw Error("Extension 'name' must be a string")
if(e=s.helper.stdExtName(e),s.helper.isUndefined(t)){if(!o.hasOwnProperty(e))throw Error("Extension named "+e+" is not registered!")
return o[e]}"function"==typeof t&&(t=t()),s.helper.isArray(t)||(t=[t])
var r=d(t,e)
if(!r.valid)throw Error(r.error)
o[e]=t},s.getAllExtensions=function(){"use strict"
return o},s.removeExtension=function(e){"use strict"
delete o[e]},s.resetExtensions=function(){"use strict"
o={}},s.validateExtension=function(e){"use strict"
var t=d(e,null)
return!!t.valid||(console.warn(t.error),!1)},s.hasOwnProperty("helper")||(s.helper={}),s.helper.isString=function(e){"use strict"
return"string"==typeof e||e instanceof String},s.helper.isFunction=function(e){"use strict"
return e&&"[object Function]"==={}.toString.call(e)},s.helper.isArray=function(e){"use strict"
return Array.isArray(e)},s.helper.isUndefined=function(e){"use strict"
return void 0===e},s.helper.forEach=function(e,t){"use strict"
if(s.helper.isUndefined(e))throw new Error("obj param is required")
if(s.helper.isUndefined(t))throw new Error("callback param is required")
if(!s.helper.isFunction(t))throw new Error("callback param must be a function/closure")
if("function"==typeof e.forEach)e.forEach(t)
else if(s.helper.isArray(e))for(var r=0;r<e.length;r++)t(e[r],r,e)
else{if("object"!=typeof e)throw new Error("obj does not seem to be an array or an iterable object")
for(var n in e)e.hasOwnProperty(n)&&t(e[n],n,e)}},s.helper.stdExtName=function(e){"use strict"
return e.replace(/[_?*+\/\\.^-]/g,"").replace(/\s/g,"").toLowerCase()},s.helper.escapeCharactersCallback=p,s.helper.escapeCharacters=function(e,t,r){"use strict"
var n="(["+t.replace(/([\[\]\\])/g,"\\$1")+"])"
r&&(n="\\\\"+n)
var a=new RegExp(n,"g")
return e.replace(a,p)},s.helper.unescapeHTMLEntities=function(e){"use strict"
return e.replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}
var h=function(e,t,r,n){"use strict"
var a,s,i,o,l,c=n||"",u=c.indexOf("g")>-1,d=new RegExp(t+"|"+r,"g"+c.replace(/g/g,"")),p=new RegExp(t,c.replace(/g/g,"")),h=[]
do{for(a=0;i=d.exec(e);)if(p.test(i[0]))a++||(o=(s=d.lastIndex)-i[0].length)
else if(a&&! --a){l=i.index+i[0].length
var f={left:{start:o,end:s},match:{start:s,end:i.index},right:{start:i.index,end:l},wholeMatch:{start:o,end:l}}
if(h.push(f),!u)return h}}while(a&&(d.lastIndex=s))
return h}
s.helper.matchRecursiveRegExp=function(e,t,r,n){"use strict"
for(var a=h(e,t,r,n),s=[],i=0;i<a.length;++i)s.push([e.slice(a[i].wholeMatch.start,a[i].wholeMatch.end),e.slice(a[i].match.start,a[i].match.end),e.slice(a[i].left.start,a[i].left.end),e.slice(a[i].right.start,a[i].right.end)])
return s},s.helper.replaceRecursiveRegExp=function(e,t,r,n,a){"use strict"
if(!s.helper.isFunction(t)){var i=t
t=function(){return i}}var o=h(e,r,n,a),l=e,c=o.length
if(c>0){var u=[]
0!==o[0].wholeMatch.start&&u.push(e.slice(0,o[0].wholeMatch.start))
for(var d=0;d<c;++d)u.push(t(e.slice(o[d].wholeMatch.start,o[d].wholeMatch.end),e.slice(o[d].match.start,o[d].match.end),e.slice(o[d].left.start,o[d].left.end),e.slice(o[d].right.start,o[d].right.end))),d<c-1&&u.push(e.slice(o[d].wholeMatch.end,o[d+1].wholeMatch.start))
o[c-1].wholeMatch.end<e.length&&u.push(e.slice(o[c-1].wholeMatch.end)),l=u.join("")}return l},s.helper.regexIndexOf=function(e,t,r){"use strict"
if(!s.helper.isString(e))throw"InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string"
if(t instanceof RegExp==0)throw"InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp"
var n=e.substring(r||0).search(t)
return n>=0?n+(r||0):n},s.helper.splitAtIndex=function(e,t){"use strict"
if(!s.helper.isString(e))throw"InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string"
return[e.substring(0,t),e.substring(t)]},s.helper.encodeEmailAddress=function(e){"use strict"
var t=[function(e){return"&#"+e.charCodeAt(0)+";"},function(e){return"&#x"+e.charCodeAt(0).toString(16)+";"},function(e){return e}]
return e.replace(/./g,function(e){if("@"===e)e=t[Math.floor(2*Math.random())](e)
else{var r=Math.random()
e=r>.9?t[2](e):r>.45?t[1](e):t[0](e)}return e})},s.helper.padEnd=function(e,t,r){"use strict"
return t|=0,r=String(r||" "),e.length>t?String(e):((t-=e.length)>r.length&&(r+=r.repeat(t/r.length)),String(e)+r.slice(0,t))},"undefined"==typeof console&&(console={warn:function(e){"use strict"
alert(e)},log:function(e){"use strict"
alert(e)},error:function(e){"use strict"
throw e}}),s.helper.regexes={asteriskDashAndColon:/([*_:~])/g},s.helper.emojis={"+1":"👍","-1":"👎",100:"💯",1234:"🔢","1st_place_medal":"🥇","2nd_place_medal":"🥈","3rd_place_medal":"🥉","8ball":"🎱",a:"🅰️",ab:"🆎",abc:"🔤",abcd:"🔡",accept:"🉑",aerial_tramway:"🚡",airplane:"✈️",alarm_clock:"⏰",alembic:"⚗️",alien:"👽",ambulance:"🚑",amphora:"🏺",anchor:"⚓️",angel:"👼",anger:"💢",angry:"😠",anguished:"😧",ant:"🐜",apple:"🍎",aquarius:"♒️",aries:"♈️",arrow_backward:"◀️",arrow_double_down:"⏬",arrow_double_up:"⏫",arrow_down:"⬇️",arrow_down_small:"🔽",arrow_forward:"▶️",arrow_heading_down:"⤵️",arrow_heading_up:"⤴️",arrow_left:"⬅️",arrow_lower_left:"↙️",arrow_lower_right:"↘️",arrow_right:"➡️",arrow_right_hook:"↪️",arrow_up:"⬆️",arrow_up_down:"↕️",arrow_up_small:"🔼",arrow_upper_left:"↖️",arrow_upper_right:"↗️",arrows_clockwise:"🔃",arrows_counterclockwise:"🔄",art:"🎨",articulated_lorry:"🚛",artificial_satellite:"🛰",astonished:"😲",athletic_shoe:"👟",atm:"🏧",atom_symbol:"⚛️",avocado:"🥑",b:"🅱️",baby:"👶",baby_bottle:"🍼",baby_chick:"🐤",baby_symbol:"🚼",back:"🔙",bacon:"🥓",badminton:"🏸",baggage_claim:"🛄",baguette_bread:"🥖",balance_scale:"⚖️",balloon:"🎈",ballot_box:"🗳",ballot_box_with_check:"☑️",bamboo:"🎍",banana:"🍌",bangbang:"‼️",bank:"🏦",bar_chart:"📊",barber:"💈",baseball:"⚾️",basketball:"🏀",basketball_man:"⛹️",basketball_woman:"⛹️&zwj;♀️",bat:"🦇",bath:"🛀",bathtub:"🛁",battery:"🔋",beach_umbrella:"🏖",bear:"🐻",bed:"🛏",bee:"🐝",beer:"🍺",beers:"🍻",beetle:"🐞",beginner:"🔰",bell:"🔔",bellhop_bell:"🛎",bento:"🍱",biking_man:"🚴",bike:"🚲",biking_woman:"🚴&zwj;♀️",bikini:"👙",biohazard:"☣️",bird:"🐦",birthday:"🎂",black_circle:"⚫️",black_flag:"🏴",black_heart:"🖤",black_joker:"🃏",black_large_square:"⬛️",black_medium_small_square:"◾️",black_medium_square:"◼️",black_nib:"✒️",black_small_square:"▪️",black_square_button:"🔲",blonde_man:"👱",blonde_woman:"👱&zwj;♀️",blossom:"🌼",blowfish:"🐡",blue_book:"📘",blue_car:"🚙",blue_heart:"💙",blush:"😊",boar:"🐗",boat:"⛵️",bomb:"💣",book:"📖",bookmark:"🔖",bookmark_tabs:"📑",books:"📚",boom:"💥",boot:"👢",bouquet:"💐",bowing_man:"🙇",bow_and_arrow:"🏹",bowing_woman:"🙇&zwj;♀️",bowling:"🎳",boxing_glove:"🥊",boy:"👦",bread:"🍞",bride_with_veil:"👰",bridge_at_night:"🌉",briefcase:"💼",broken_heart:"💔",bug:"🐛",building_construction:"🏗",bulb:"💡",bullettrain_front:"🚅",bullettrain_side:"🚄",burrito:"🌯",bus:"🚌",business_suit_levitating:"🕴",busstop:"🚏",bust_in_silhouette:"👤",busts_in_silhouette:"👥",butterfly:"🦋",cactus:"🌵",cake:"🍰",calendar:"📆",call_me_hand:"🤙",calling:"📲",camel:"🐫",camera:"📷",camera_flash:"📸",camping:"🏕",cancer:"♋️",candle:"🕯",candy:"🍬",canoe:"🛶",capital_abcd:"🔠",capricorn:"♑️",car:"🚗",card_file_box:"🗃",card_index:"📇",card_index_dividers:"🗂",carousel_horse:"🎠",carrot:"🥕",cat:"🐱",cat2:"🐈",cd:"💿",chains:"⛓",champagne:"🍾",chart:"💹",chart_with_downwards_trend:"📉",chart_with_upwards_trend:"📈",checkered_flag:"🏁",cheese:"🧀",cherries:"🍒",cherry_blossom:"🌸",chestnut:"🌰",chicken:"🐔",children_crossing:"🚸",chipmunk:"🐿",chocolate_bar:"🍫",christmas_tree:"🎄",church:"⛪️",cinema:"🎦",circus_tent:"🎪",city_sunrise:"🌇",city_sunset:"🌆",cityscape:"🏙",cl:"🆑",clamp:"🗜",clap:"👏",clapper:"🎬",classical_building:"🏛",clinking_glasses:"🥂",clipboard:"📋",clock1:"🕐",clock10:"🕙",clock1030:"🕥",clock11:"🕚",clock1130:"🕦",clock12:"🕛",clock1230:"🕧",clock130:"🕜",clock2:"🕑",clock230:"🕝",clock3:"🕒",clock330:"🕞",clock4:"🕓",clock430:"🕟",clock5:"🕔",clock530:"🕠",clock6:"🕕",clock630:"🕡",clock7:"🕖",clock730:"🕢",clock8:"🕗",clock830:"🕣",clock9:"🕘",clock930:"🕤",closed_book:"📕",closed_lock_with_key:"🔐",closed_umbrella:"🌂",cloud:"☁️",cloud_with_lightning:"🌩",cloud_with_lightning_and_rain:"⛈",cloud_with_rain:"🌧",cloud_with_snow:"🌨",clown_face:"🤡",clubs:"♣️",cocktail:"🍸",coffee:"☕️",coffin:"⚰️",cold_sweat:"😰",comet:"☄️",computer:"💻",computer_mouse:"🖱",confetti_ball:"🎊",confounded:"😖",confused:"😕",congratulations:"㊗️",construction:"🚧",construction_worker_man:"👷",construction_worker_woman:"👷&zwj;♀️",control_knobs:"🎛",convenience_store:"🏪",cookie:"🍪",cool:"🆒",policeman:"👮",copyright:"©️",corn:"🌽",couch_and_lamp:"🛋",couple:"👫",couple_with_heart_woman_man:"💑",couple_with_heart_man_man:"👨&zwj;❤️&zwj;👨",couple_with_heart_woman_woman:"👩&zwj;❤️&zwj;👩",couplekiss_man_man:"👨&zwj;❤️&zwj;💋&zwj;👨",couplekiss_man_woman:"💏",couplekiss_woman_woman:"👩&zwj;❤️&zwj;💋&zwj;👩",cow:"🐮",cow2:"🐄",cowboy_hat_face:"🤠",crab:"🦀",crayon:"🖍",credit_card:"💳",crescent_moon:"🌙",cricket:"🏏",crocodile:"🐊",croissant:"🥐",crossed_fingers:"🤞",crossed_flags:"🎌",crossed_swords:"⚔️",crown:"👑",cry:"😢",crying_cat_face:"😿",crystal_ball:"🔮",cucumber:"🥒",cupid:"💘",curly_loop:"➰",currency_exchange:"💱",curry:"🍛",custard:"🍮",customs:"🛃",cyclone:"🌀",dagger:"🗡",dancer:"💃",dancing_women:"👯",dancing_men:"👯&zwj;♂️",dango:"🍡",dark_sunglasses:"🕶",dart:"🎯",dash:"💨",date:"📅",deciduous_tree:"🌳",deer:"🦌",department_store:"🏬",derelict_house:"🏚",desert:"🏜",desert_island:"🏝",desktop_computer:"🖥",male_detective:"🕵️",diamond_shape_with_a_dot_inside:"💠",diamonds:"♦️",disappointed:"😞",disappointed_relieved:"😥",dizzy:"💫",dizzy_face:"😵",do_not_litter:"🚯",dog:"🐶",dog2:"🐕",dollar:"💵",dolls:"🎎",dolphin:"🐬",door:"🚪",doughnut:"🍩",dove:"🕊",dragon:"🐉",dragon_face:"🐲",dress:"👗",dromedary_camel:"🐪",drooling_face:"🤤",droplet:"💧",drum:"🥁",duck:"🦆",dvd:"📀","e-mail":"📧",eagle:"🦅",ear:"👂",ear_of_rice:"🌾",earth_africa:"🌍",earth_americas:"🌎",earth_asia:"🌏",egg:"🥚",eggplant:"🍆",eight_pointed_black_star:"✴️",eight_spoked_asterisk:"✳️",electric_plug:"🔌",elephant:"🐘",email:"✉️",end:"🔚",envelope_with_arrow:"📩",euro:"💶",european_castle:"🏰",european_post_office:"🏤",evergreen_tree:"🌲",exclamation:"❗️",expressionless:"😑",eye:"👁",eye_speech_bubble:"👁&zwj;🗨",eyeglasses:"👓",eyes:"👀",face_with_head_bandage:"🤕",face_with_thermometer:"🤒",fist_oncoming:"👊",factory:"🏭",fallen_leaf:"🍂",family_man_woman_boy:"👪",family_man_boy:"👨&zwj;👦",family_man_boy_boy:"👨&zwj;👦&zwj;👦",family_man_girl:"👨&zwj;👧",family_man_girl_boy:"👨&zwj;👧&zwj;👦",family_man_girl_girl:"👨&zwj;👧&zwj;👧",family_man_man_boy:"👨&zwj;👨&zwj;👦",family_man_man_boy_boy:"👨&zwj;👨&zwj;👦&zwj;👦",family_man_man_girl:"👨&zwj;👨&zwj;👧",family_man_man_girl_boy:"👨&zwj;👨&zwj;👧&zwj;👦",family_man_man_girl_girl:"👨&zwj;👨&zwj;👧&zwj;👧",family_man_woman_boy_boy:"👨&zwj;👩&zwj;👦&zwj;👦",family_man_woman_girl:"👨&zwj;👩&zwj;👧",family_man_woman_girl_boy:"👨&zwj;👩&zwj;👧&zwj;👦",family_man_woman_girl_girl:"👨&zwj;👩&zwj;👧&zwj;👧",family_woman_boy:"👩&zwj;👦",family_woman_boy_boy:"👩&zwj;👦&zwj;👦",family_woman_girl:"👩&zwj;👧",family_woman_girl_boy:"👩&zwj;👧&zwj;👦",family_woman_girl_girl:"👩&zwj;👧&zwj;👧",family_woman_woman_boy:"👩&zwj;👩&zwj;👦",family_woman_woman_boy_boy:"👩&zwj;👩&zwj;👦&zwj;👦",family_woman_woman_girl:"👩&zwj;👩&zwj;👧",family_woman_woman_girl_boy:"👩&zwj;👩&zwj;👧&zwj;👦",family_woman_woman_girl_girl:"👩&zwj;👩&zwj;👧&zwj;👧",fast_forward:"⏩",fax:"📠",fearful:"😨",feet:"🐾",female_detective:"🕵️&zwj;♀️",ferris_wheel:"🎡",ferry:"⛴",field_hockey:"🏑",file_cabinet:"🗄",file_folder:"📁",film_projector:"📽",film_strip:"🎞",fire:"🔥",fire_engine:"🚒",fireworks:"🎆",first_quarter_moon:"🌓",first_quarter_moon_with_face:"🌛",fish:"🐟",fish_cake:"🍥",fishing_pole_and_fish:"🎣",fist_raised:"✊",fist_left:"🤛",fist_right:"🤜",flags:"🎏",flashlight:"🔦",fleur_de_lis:"⚜️",flight_arrival:"🛬",flight_departure:"🛫",floppy_disk:"💾",flower_playing_cards:"🎴",flushed:"😳",fog:"🌫",foggy:"🌁",football:"🏈",footprints:"👣",fork_and_knife:"🍴",fountain:"⛲️",fountain_pen:"🖋",four_leaf_clover:"🍀",fox_face:"🦊",framed_picture:"🖼",free:"🆓",fried_egg:"🍳",fried_shrimp:"🍤",fries:"🍟",frog:"🐸",frowning:"😦",frowning_face:"☹️",frowning_man:"🙍&zwj;♂️",frowning_woman:"🙍",middle_finger:"🖕",fuelpump:"⛽️",full_moon:"🌕",full_moon_with_face:"🌝",funeral_urn:"⚱️",game_die:"🎲",gear:"⚙️",gem:"💎",gemini:"♊️",ghost:"👻",gift:"🎁",gift_heart:"💝",girl:"👧",globe_with_meridians:"🌐",goal_net:"🥅",goat:"🐐",golf:"⛳️",golfing_man:"🏌️",golfing_woman:"🏌️&zwj;♀️",gorilla:"🦍",grapes:"🍇",green_apple:"🍏",green_book:"📗",green_heart:"💚",green_salad:"🥗",grey_exclamation:"❕",grey_question:"❔",grimacing:"😬",grin:"😁",grinning:"😀",guardsman:"💂",guardswoman:"💂&zwj;♀️",guitar:"🎸",gun:"🔫",haircut_woman:"💇",haircut_man:"💇&zwj;♂️",hamburger:"🍔",hammer:"🔨",hammer_and_pick:"⚒",hammer_and_wrench:"🛠",hamster:"🐹",hand:"✋",handbag:"👜",handshake:"🤝",hankey:"💩",hatched_chick:"🐥",hatching_chick:"🐣",headphones:"🎧",hear_no_evil:"🙉",heart:"❤️",heart_decoration:"💟",heart_eyes:"😍",heart_eyes_cat:"😻",heartbeat:"💓",heartpulse:"💗",hearts:"♥️",heavy_check_mark:"✔️",heavy_division_sign:"➗",heavy_dollar_sign:"💲",heavy_heart_exclamation:"❣️",heavy_minus_sign:"➖",heavy_multiplication_x:"✖️",heavy_plus_sign:"➕",helicopter:"🚁",herb:"🌿",hibiscus:"🌺",high_brightness:"🔆",high_heel:"👠",hocho:"🔪",hole:"🕳",honey_pot:"🍯",horse:"🐴",horse_racing:"🏇",hospital:"🏥",hot_pepper:"🌶",hotdog:"🌭",hotel:"🏨",hotsprings:"♨️",hourglass:"⌛️",hourglass_flowing_sand:"⏳",house:"🏠",house_with_garden:"🏡",houses:"🏘",hugs:"🤗",hushed:"😯",ice_cream:"🍨",ice_hockey:"🏒",ice_skate:"⛸",icecream:"🍦",id:"🆔",ideograph_advantage:"🉐",imp:"👿",inbox_tray:"📥",incoming_envelope:"📨",tipping_hand_woman:"💁",information_source:"ℹ️",innocent:"😇",interrobang:"⁉️",iphone:"📱",izakaya_lantern:"🏮",jack_o_lantern:"🎃",japan:"🗾",japanese_castle:"🏯",japanese_goblin:"👺",japanese_ogre:"👹",jeans:"👖",joy:"😂",joy_cat:"😹",joystick:"🕹",kaaba:"🕋",key:"🔑",keyboard:"⌨️",keycap_ten:"🔟",kick_scooter:"🛴",kimono:"👘",kiss:"💋",kissing:"😗",kissing_cat:"😽",kissing_closed_eyes:"😚",kissing_heart:"😘",kissing_smiling_eyes:"😙",kiwi_fruit:"🥝",koala:"🐨",koko:"🈁",label:"🏷",large_blue_circle:"🔵",large_blue_diamond:"🔷",large_orange_diamond:"🔶",last_quarter_moon:"🌗",last_quarter_moon_with_face:"🌜",latin_cross:"✝️",laughing:"😆",leaves:"🍃",ledger:"📒",left_luggage:"🛅",left_right_arrow:"↔️",leftwards_arrow_with_hook:"↩️",lemon:"🍋",leo:"♌️",leopard:"🐆",level_slider:"🎚",libra:"♎️",light_rail:"🚈",link:"🔗",lion:"🦁",lips:"👄",lipstick:"💄",lizard:"🦎",lock:"🔒",lock_with_ink_pen:"🔏",lollipop:"🍭",loop:"➿",loud_sound:"🔊",loudspeaker:"📢",love_hotel:"🏩",love_letter:"💌",low_brightness:"🔅",lying_face:"🤥",m:"Ⓜ️",mag:"🔍",mag_right:"🔎",mahjong:"🀄️",mailbox:"📫",mailbox_closed:"📪",mailbox_with_mail:"📬",mailbox_with_no_mail:"📭",man:"👨",man_artist:"👨&zwj;🎨",man_astronaut:"👨&zwj;🚀",man_cartwheeling:"🤸&zwj;♂️",man_cook:"👨&zwj;🍳",man_dancing:"🕺",man_facepalming:"🤦&zwj;♂️",man_factory_worker:"👨&zwj;🏭",man_farmer:"👨&zwj;🌾",man_firefighter:"👨&zwj;🚒",man_health_worker:"👨&zwj;⚕️",man_in_tuxedo:"🤵",man_judge:"👨&zwj;⚖️",man_juggling:"🤹&zwj;♂️",man_mechanic:"👨&zwj;🔧",man_office_worker:"👨&zwj;💼",man_pilot:"👨&zwj;✈️",man_playing_handball:"🤾&zwj;♂️",man_playing_water_polo:"🤽&zwj;♂️",man_scientist:"👨&zwj;🔬",man_shrugging:"🤷&zwj;♂️",man_singer:"👨&zwj;🎤",man_student:"👨&zwj;🎓",man_teacher:"👨&zwj;🏫",man_technologist:"👨&zwj;💻",man_with_gua_pi_mao:"👲",man_with_turban:"👳",tangerine:"🍊",mans_shoe:"👞",mantelpiece_clock:"🕰",maple_leaf:"🍁",martial_arts_uniform:"🥋",mask:"😷",massage_woman:"💆",massage_man:"💆&zwj;♂️",meat_on_bone:"🍖",medal_military:"🎖",medal_sports:"🏅",mega:"📣",melon:"🍈",memo:"📝",men_wrestling:"🤼&zwj;♂️",menorah:"🕎",mens:"🚹",metal:"🤘",metro:"🚇",microphone:"🎤",microscope:"🔬",milk_glass:"🥛",milky_way:"🌌",minibus:"🚐",minidisc:"💽",mobile_phone_off:"📴",money_mouth_face:"🤑",money_with_wings:"💸",moneybag:"💰",monkey:"🐒",monkey_face:"🐵",monorail:"🚝",moon:"🌔",mortar_board:"🎓",mosque:"🕌",motor_boat:"🛥",motor_scooter:"🛵",motorcycle:"🏍",motorway:"🛣",mount_fuji:"🗻",mountain:"⛰",mountain_biking_man:"🚵",mountain_biking_woman:"🚵&zwj;♀️",mountain_cableway:"🚠",mountain_railway:"🚞",mountain_snow:"🏔",mouse:"🐭",mouse2:"🐁",movie_camera:"🎥",moyai:"🗿",mrs_claus:"🤶",muscle:"💪",mushroom:"🍄",musical_keyboard:"🎹",musical_note:"🎵",musical_score:"🎼",mute:"🔇",nail_care:"💅",name_badge:"📛",national_park:"🏞",nauseated_face:"🤢",necktie:"👔",negative_squared_cross_mark:"❎",nerd_face:"🤓",neutral_face:"😐",new:"🆕",new_moon:"🌑",new_moon_with_face:"🌚",newspaper:"📰",newspaper_roll:"🗞",next_track_button:"⏭",ng:"🆖",no_good_man:"🙅&zwj;♂️",no_good_woman:"🙅",night_with_stars:"🌃",no_bell:"🔕",no_bicycles:"🚳",no_entry:"⛔️",no_entry_sign:"🚫",no_mobile_phones:"📵",no_mouth:"😶",no_pedestrians:"🚷",no_smoking:"🚭","non-potable_water":"🚱",nose:"👃",notebook:"📓",notebook_with_decorative_cover:"📔",notes:"🎶",nut_and_bolt:"🔩",o:"⭕️",o2:"🅾️",ocean:"🌊",octopus:"🐙",oden:"🍢",office:"🏢",oil_drum:"🛢",ok:"🆗",ok_hand:"👌",ok_man:"🙆&zwj;♂️",ok_woman:"🙆",old_key:"🗝",older_man:"👴",older_woman:"👵",om:"🕉",on:"🔛",oncoming_automobile:"🚘",oncoming_bus:"🚍",oncoming_police_car:"🚔",oncoming_taxi:"🚖",open_file_folder:"📂",open_hands:"👐",open_mouth:"😮",open_umbrella:"☂️",ophiuchus:"⛎",orange_book:"📙",orthodox_cross:"☦️",outbox_tray:"📤",owl:"🦉",ox:"🐂",package:"📦",page_facing_up:"📄",page_with_curl:"📃",pager:"📟",paintbrush:"🖌",palm_tree:"🌴",pancakes:"🥞",panda_face:"🐼",paperclip:"📎",paperclips:"🖇",parasol_on_ground:"⛱",parking:"🅿️",part_alternation_mark:"〽️",partly_sunny:"⛅️",passenger_ship:"🛳",passport_control:"🛂",pause_button:"⏸",peace_symbol:"☮️",peach:"🍑",peanuts:"🥜",pear:"🍐",pen:"🖊",pencil2:"✏️",penguin:"🐧",pensive:"😔",performing_arts:"🎭",persevere:"😣",person_fencing:"🤺",pouting_woman:"🙎",phone:"☎️",pick:"⛏",pig:"🐷",pig2:"🐖",pig_nose:"🐽",pill:"💊",pineapple:"🍍",ping_pong:"🏓",pisces:"♓️",pizza:"🍕",place_of_worship:"🛐",plate_with_cutlery:"🍽",play_or_pause_button:"⏯",point_down:"👇",point_left:"👈",point_right:"👉",point_up:"☝️",point_up_2:"👆",police_car:"🚓",policewoman:"👮&zwj;♀️",poodle:"🐩",popcorn:"🍿",post_office:"🏣",postal_horn:"📯",postbox:"📮",potable_water:"🚰",potato:"🥔",pouch:"👝",poultry_leg:"🍗",pound:"💷",rage:"😡",pouting_cat:"😾",pouting_man:"🙎&zwj;♂️",pray:"🙏",prayer_beads:"📿",pregnant_woman:"🤰",previous_track_button:"⏮",prince:"🤴",princess:"👸",printer:"🖨",purple_heart:"💜",purse:"👛",pushpin:"📌",put_litter_in_its_place:"🚮",question:"❓",rabbit:"🐰",rabbit2:"🐇",racehorse:"🐎",racing_car:"🏎",radio:"📻",radio_button:"🔘",radioactive:"☢️",railway_car:"🚃",railway_track:"🛤",rainbow:"🌈",rainbow_flag:"🏳️&zwj;🌈",raised_back_of_hand:"🤚",raised_hand_with_fingers_splayed:"🖐",raised_hands:"🙌",raising_hand_woman:"🙋",raising_hand_man:"🙋&zwj;♂️",ram:"🐏",ramen:"🍜",rat:"🐀",record_button:"⏺",recycle:"♻️",red_circle:"🔴",registered:"®️",relaxed:"☺️",relieved:"😌",reminder_ribbon:"🎗",repeat:"🔁",repeat_one:"🔂",rescue_worker_helmet:"⛑",restroom:"🚻",revolving_hearts:"💞",rewind:"⏪",rhinoceros:"🦏",ribbon:"🎀",rice:"🍚",rice_ball:"🍙",rice_cracker:"🍘",rice_scene:"🎑",right_anger_bubble:"🗯",ring:"💍",robot:"🤖",rocket:"🚀",rofl:"🤣",roll_eyes:"🙄",roller_coaster:"🎢",rooster:"🐓",rose:"🌹",rosette:"🏵",rotating_light:"🚨",round_pushpin:"📍",rowing_man:"🚣",rowing_woman:"🚣&zwj;♀️",rugby_football:"🏉",running_man:"🏃",running_shirt_with_sash:"🎽",running_woman:"🏃&zwj;♀️",sa:"🈂️",sagittarius:"♐️",sake:"🍶",sandal:"👡",santa:"🎅",satellite:"📡",saxophone:"🎷",school:"🏫",school_satchel:"🎒",scissors:"✂️",scorpion:"🦂",scorpius:"♏️",scream:"😱",scream_cat:"🙀",scroll:"📜",seat:"💺",secret:"㊙️",see_no_evil:"🙈",seedling:"🌱",selfie:"🤳",shallow_pan_of_food:"🥘",shamrock:"☘️",shark:"🦈",shaved_ice:"🍧",sheep:"🐑",shell:"🐚",shield:"🛡",shinto_shrine:"⛩",ship:"🚢",shirt:"👕",shopping:"🛍",shopping_cart:"🛒",shower:"🚿",shrimp:"🦐",signal_strength:"📶",six_pointed_star:"🔯",ski:"🎿",skier:"⛷",skull:"💀",skull_and_crossbones:"☠️",sleeping:"😴",sleeping_bed:"🛌",sleepy:"😪",slightly_frowning_face:"🙁",slightly_smiling_face:"🙂",slot_machine:"🎰",small_airplane:"🛩",small_blue_diamond:"🔹",small_orange_diamond:"🔸",small_red_triangle:"🔺",small_red_triangle_down:"🔻",smile:"😄",smile_cat:"😸",smiley:"😃",smiley_cat:"😺",smiling_imp:"😈",smirk:"😏",smirk_cat:"😼",smoking:"🚬",snail:"🐌",snake:"🐍",sneezing_face:"🤧",snowboarder:"🏂",snowflake:"❄️",snowman:"⛄️",snowman_with_snow:"☃️",sob:"😭",soccer:"⚽️",soon:"🔜",sos:"🆘",sound:"🔉",space_invader:"👾",spades:"♠️",spaghetti:"🍝",sparkle:"❇️",sparkler:"🎇",sparkles:"✨",sparkling_heart:"💖",speak_no_evil:"🙊",speaker:"🔈",speaking_head:"🗣",speech_balloon:"💬",speedboat:"🚤",spider:"🕷",spider_web:"🕸",spiral_calendar:"🗓",spiral_notepad:"🗒",spoon:"🥄",squid:"🦑",stadium:"🏟",star:"⭐️",star2:"🌟",star_and_crescent:"☪️",star_of_david:"✡️",stars:"🌠",station:"🚉",statue_of_liberty:"🗽",steam_locomotive:"🚂",stew:"🍲",stop_button:"⏹",stop_sign:"🛑",stopwatch:"⏱",straight_ruler:"📏",strawberry:"🍓",stuck_out_tongue:"😛",stuck_out_tongue_closed_eyes:"😝",stuck_out_tongue_winking_eye:"😜",studio_microphone:"🎙",stuffed_flatbread:"🥙",sun_behind_large_cloud:"🌥",sun_behind_rain_cloud:"🌦",sun_behind_small_cloud:"🌤",sun_with_face:"🌞",sunflower:"🌻",sunglasses:"😎",sunny:"☀️",sunrise:"🌅",sunrise_over_mountains:"🌄",surfing_man:"🏄",surfing_woman:"🏄&zwj;♀️",sushi:"🍣",suspension_railway:"🚟",sweat:"😓",sweat_drops:"💦",sweat_smile:"😅",sweet_potato:"🍠",swimming_man:"🏊",swimming_woman:"🏊&zwj;♀️",symbols:"🔣",synagogue:"🕍",syringe:"💉",taco:"🌮",tada:"🎉",tanabata_tree:"🎋",taurus:"♉️",taxi:"🚕",tea:"🍵",telephone_receiver:"📞",telescope:"🔭",tennis:"🎾",tent:"⛺️",thermometer:"🌡",thinking:"🤔",thought_balloon:"💭",ticket:"🎫",tickets:"🎟",tiger:"🐯",tiger2:"🐅",timer_clock:"⏲",tipping_hand_man:"💁&zwj;♂️",tired_face:"😫",tm:"™️",toilet:"🚽",tokyo_tower:"🗼",tomato:"🍅",tongue:"👅",top:"🔝",tophat:"🎩",tornado:"🌪",trackball:"🖲",tractor:"🚜",traffic_light:"🚥",train:"🚋",train2:"🚆",tram:"🚊",triangular_flag_on_post:"🚩",triangular_ruler:"📐",trident:"🔱",triumph:"😤",trolleybus:"🚎",trophy:"🏆",tropical_drink:"🍹",tropical_fish:"🐠",truck:"🚚",trumpet:"🎺",tulip:"🌷",tumbler_glass:"🥃",turkey:"🦃",turtle:"🐢",tv:"📺",twisted_rightwards_arrows:"🔀",two_hearts:"💕",two_men_holding_hands:"👬",two_women_holding_hands:"👭",u5272:"🈹",u5408:"🈴",u55b6:"🈺",u6307:"🈯️",u6708:"🈷️",u6709:"🈶",u6e80:"🈵",u7121:"🈚️",u7533:"🈸",u7981:"🈲",u7a7a:"🈳",umbrella:"☔️",unamused:"😒",underage:"🔞",unicorn:"🦄",unlock:"🔓",up:"🆙",upside_down_face:"🙃",v:"✌️",vertical_traffic_light:"🚦",vhs:"📼",vibration_mode:"📳",video_camera:"📹",video_game:"🎮",violin:"🎻",virgo:"♍️",volcano:"🌋",volleyball:"🏐",vs:"🆚",vulcan_salute:"🖖",walking_man:"🚶",walking_woman:"🚶&zwj;♀️",waning_crescent_moon:"🌘",waning_gibbous_moon:"🌖",warning:"⚠️",wastebasket:"🗑",watch:"⌚️",water_buffalo:"🐃",watermelon:"🍉",wave:"👋",wavy_dash:"〰️",waxing_crescent_moon:"🌒",wc:"🚾",weary:"😩",wedding:"💒",weight_lifting_man:"🏋️",weight_lifting_woman:"🏋️&zwj;♀️",whale:"🐳",whale2:"🐋",wheel_of_dharma:"☸️",wheelchair:"♿️",white_check_mark:"✅",white_circle:"⚪️",white_flag:"🏳️",white_flower:"💮",white_large_square:"⬜️",white_medium_small_square:"◽️",white_medium_square:"◻️",white_small_square:"▫️",white_square_button:"🔳",wilted_flower:"🥀",wind_chime:"🎐",wind_face:"🌬",wine_glass:"🍷",wink:"😉",wolf:"🐺",woman:"👩",woman_artist:"👩&zwj;🎨",woman_astronaut:"👩&zwj;🚀",woman_cartwheeling:"🤸&zwj;♀️",woman_cook:"👩&zwj;🍳",woman_facepalming:"🤦&zwj;♀️",woman_factory_worker:"👩&zwj;🏭",woman_farmer:"👩&zwj;🌾",woman_firefighter:"👩&zwj;🚒",woman_health_worker:"👩&zwj;⚕️",woman_judge:"👩&zwj;⚖️",woman_juggling:"🤹&zwj;♀️",woman_mechanic:"👩&zwj;🔧",woman_office_worker:"👩&zwj;💼",woman_pilot:"👩&zwj;✈️",woman_playing_handball:"🤾&zwj;♀️",woman_playing_water_polo:"🤽&zwj;♀️",woman_scientist:"👩&zwj;🔬",woman_shrugging:"🤷&zwj;♀️",woman_singer:"👩&zwj;🎤",woman_student:"👩&zwj;🎓",woman_teacher:"👩&zwj;🏫",woman_technologist:"👩&zwj;💻",woman_with_turban:"👳&zwj;♀️",womans_clothes:"👚",womans_hat:"👒",women_wrestling:"🤼&zwj;♀️",womens:"🚺",world_map:"🗺",worried:"😟",wrench:"🔧",writing_hand:"✍️",x:"❌",yellow_heart:"💛",yen:"💴",yin_yang:"☯️",yum:"😋",zap:"⚡️",zipper_mouth_face:"🤐",zzz:"💤",octocat:'<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',showdown:"<span style=\"font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;\">S</span>"},s.Converter=function(e){"use strict"
var t={},r=[],n=[],a={},i=c,p={parsed:{},raw:"",format:""}
function h(e,t){if(t=t||null,s.helper.isString(e)){if(t=e=s.helper.stdExtName(e),s.extensions[e])return console.warn("DEPRECATION WARNING: "+e+" is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"),void function(e,t){"function"==typeof e&&(e=e(new s.Converter)),s.helper.isArray(e)||(e=[e])
var a=d(e,t)
if(!a.valid)throw Error(a.error)
for(var i=0;i<e.length;++i)switch(e[i].type){case"lang":r.push(e[i])
break
case"output":n.push(e[i])
break
default:throw Error("Extension loader error: Type unrecognized!!!")}}(s.extensions[e],e)
if(s.helper.isUndefined(o[e]))throw Error('Extension "'+e+'" could not be loaded. It was either not found or is not a valid extension.')
e=o[e]}"function"==typeof e&&(e=e()),s.helper.isArray(e)||(e=[e])
var a=d(e,t)
if(!a.valid)throw Error(a.error)
for(var i=0;i<e.length;++i){switch(e[i].type){case"lang":r.push(e[i])
break
case"output":n.push(e[i])}if(e[i].hasOwnProperty("listeners"))for(var l in e[i].listeners)e[i].listeners.hasOwnProperty(l)&&f(l,e[i].listeners[l])}}function f(e,t){if(!s.helper.isString(e))throw Error("Invalid argument in converter.listen() method: name must be a string, but "+typeof e+" given")
if("function"!=typeof t)throw Error("Invalid argument in converter.listen() method: callback must be a function, but "+typeof t+" given")
a.hasOwnProperty(e)||(a[e]=[]),a[e].push(t)}!function(){for(var r in e=e||{},l)l.hasOwnProperty(r)&&(t[r]=l[r])
if("object"!=typeof e)throw Error("Converter expects the passed parameter to be an object, but "+typeof e+" was passed instead.")
for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])
t.extensions&&s.helper.forEach(t.extensions,h)}(),this._dispatch=function(e,t,r,n){if(a.hasOwnProperty(e))for(var s=0;s<a[e].length;++s){var i=a[e][s](e,t,this,r,n)
i&&void 0!==i&&(t=i)}return t},this.listen=function(e,t){return f(e,t),this},this.makeHtml=function(e){if(!e)return e
var a={gHtmlBlocks:[],gHtmlMdBlocks:[],gHtmlSpans:[],gUrls:{},gTitles:{},gDimensions:{},gListLevel:0,hashLinkCounts:{},langExtensions:r,outputModifiers:n,converter:this,ghCodeBlocks:[],metadata:{parsed:{},raw:"",format:""}}
return e=(e=(e=(e=(e=e.replace(/¨/g,"¨T")).replace(/\$/g,"¨D")).replace(/\r\n/g,"\n")).replace(/\r/g,"\n")).replace(/\u00A0/g,"&nbsp;"),t.smartIndentationFix&&(e=function(e){var t=e.match(/^\s*/)[0].length,r=new RegExp("^\\s{0,"+t+"}","gm")
return e.replace(r,"")}(e)),e="\n\n"+e+"\n\n",e=(e=s.subParser("detab")(e,t,a)).replace(/^[ \t]+$/gm,""),s.helper.forEach(r,function(r){e=s.subParser("runExtension")(r,e,t,a)}),e=s.subParser("metadata")(e,t,a),e=s.subParser("hashPreCodeTags")(e,t,a),e=s.subParser("githubCodeBlocks")(e,t,a),e=s.subParser("hashHTMLBlocks")(e,t,a),e=s.subParser("hashCodeTags")(e,t,a),e=s.subParser("stripLinkDefinitions")(e,t,a),e=s.subParser("blockGamut")(e,t,a),e=s.subParser("unhashHTMLSpans")(e,t,a),e=(e=(e=s.subParser("unescapeSpecialChars")(e,t,a)).replace(/¨D/g,"$$")).replace(/¨T/g,"¨"),e=s.subParser("completeHTMLDocument")(e,t,a),s.helper.forEach(n,function(r){e=s.subParser("runExtension")(r,e,t,a)}),p=a.metadata,e},this.makeMarkdown=this.makeMd=function(e,t){if(e=(e=(e=e.replace(/\r\n/g,"\n")).replace(/\r/g,"\n")).replace(/>[ \t]+</,">¨NBSP;<"),!t){if(!window||!window.document)throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM")
t=window.document}var r=t.createElement("div")
r.innerHTML=e
var n={preList:function(e){for(var t=e.querySelectorAll("pre"),r=[],n=0;n<t.length;++n)if(1===t[n].childElementCount&&"code"===t[n].firstChild.tagName.toLowerCase()){var a=t[n].firstChild.innerHTML.trim(),i=t[n].firstChild.getAttribute("data-language")||""
if(""===i)for(var o=t[n].firstChild.className.split(" "),l=0;l<o.length;++l){var c=o[l].match(/^language-(.+)$/)
if(null!==c){i=c[1]
break}}a=s.helper.unescapeHTMLEntities(a),r.push(a),t[n].outerHTML='<precode language="'+i+'" precodenum="'+n.toString()+'"></precode>'}else r.push(t[n].innerHTML),t[n].innerHTML="",t[n].setAttribute("prenum",n.toString())
return r}(r)}
!function e(t){for(var r=0;r<t.childNodes.length;++r){var n=t.childNodes[r]
3===n.nodeType?/\S/.test(n.nodeValue)||/^[ ]+$/.test(n.nodeValue)?(n.nodeValue=n.nodeValue.split("\n").join(" "),n.nodeValue=n.nodeValue.replace(/(\s)+/g,"$1")):(t.removeChild(n),--r):1===n.nodeType&&e(n)}}(r)
for(var a=r.childNodes,i="",o=0;o<a.length;o++)i+=s.subParser("makeMarkdown.node")(a[o],n)
return i},this.setOption=function(e,r){t[e]=r},this.getOption=function(e){return t[e]},this.getOptions=function(){return t},this.addExtension=function(e,t){h(e,t=t||null)},this.useExtension=function(e){h(e)},this.setFlavor=function(e){if(!u.hasOwnProperty(e))throw Error(e+" flavor was not found")
var r=u[e]
for(var n in i=e,r)r.hasOwnProperty(n)&&(t[n]=r[n])},this.getFlavor=function(){return i},this.removeExtension=function(e){s.helper.isArray(e)||(e=[e])
for(var t=0;t<e.length;++t){for(var a=e[t],i=0;i<r.length;++i)r[i]===a&&r.splice(i,1)
for(var o=0;o<n.length;++o)n[o]===a&&n.splice(o,1)}},this.getAllExtensions=function(){return{language:r,output:n}},this.getMetadata=function(e){return e?p.raw:p.parsed},this.getMetadataFormat=function(){return p.format},this._setMetadataPair=function(e,t){p.parsed[e]=t},this._setMetadataFormat=function(e){p.format=e},this._setMetadataRaw=function(e){p.raw=e}},s.subParser("anchors",function(e,t,r){"use strict"
var n=function(e,n,a,i,o,l,c){if(s.helper.isUndefined(c)&&(c=""),a=a.toLowerCase(),e.search(/\(<?\s*>? ?(['"].*['"])?\)$/m)>-1)i=""
else if(!i){if(a||(a=n.toLowerCase().replace(/ ?\n/g," ")),i="#"+a,s.helper.isUndefined(r.gUrls[a]))return e
i=r.gUrls[a],s.helper.isUndefined(r.gTitles[a])||(c=r.gTitles[a])}var u='<a href="'+(i=i.replace(s.helper.regexes.asteriskDashAndColon,s.helper.escapeCharactersCallback))+'"'
return""!==c&&null!==c&&(u+=' title="'+(c=(c=c.replace(/"/g,"&quot;")).replace(s.helper.regexes.asteriskDashAndColon,s.helper.escapeCharactersCallback))+'"'),t.openLinksInNewWindow&&!/^#/.test(i)&&(u+=' rel="noopener noreferrer" target="¨E95Eblank"'),u+">"+n+"</a>"}
return e=(e=(e=(e=(e=r.converter._dispatch("anchors.before",e,t,r)).replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g,n)).replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,n)).replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,n)).replace(/\[([^\[\]]+)]()()()()()/g,n),t.ghMentions&&(e=e.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gim,function(e,r,n,a,i){if("\\"===n)return r+a
if(!s.helper.isString(t.ghMentionsLink))throw new Error("ghMentionsLink option must be a string")
var o=t.ghMentionsLink.replace(/\{u}/g,i),l=""
return t.openLinksInNewWindow&&(l=' rel="noopener noreferrer" target="¨E95Eblank"'),r+'<a href="'+o+'"'+l+">"+a+"</a>"})),r.converter._dispatch("anchors.after",e,t,r)})
var f=/([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,m=/([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,g=/()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,b=/(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gim,_=/<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,v=function(e){"use strict"
return function(t,r,n,a,i,o,l){var c=n=n.replace(s.helper.regexes.asteriskDashAndColon,s.helper.escapeCharactersCallback),u="",d="",p=r||"",h=l||""
return/^www\./i.test(n)&&(n=n.replace(/^www\./i,"http://www.")),e.excludeTrailingPunctuationFromURLs&&o&&(u=o),e.openLinksInNewWindow&&(d=' rel="noopener noreferrer" target="¨E95Eblank"'),p+'<a href="'+n+'"'+d+">"+c+"</a>"+u+h}},w=function(e,t){"use strict"
return function(r,n,a){var i="mailto:"
return n=n||"",a=s.subParser("unescapeSpecialChars")(a,e,t),e.encodeEmails?(i=s.helper.encodeEmailAddress(i+a),a=s.helper.encodeEmailAddress(a)):i+=a,n+'<a href="'+i+'">'+a+"</a>"}}
s.subParser("autoLinks",function(e,t,r){"use strict"
return e=(e=(e=r.converter._dispatch("autoLinks.before",e,t,r)).replace(g,v(t))).replace(_,w(t,r)),r.converter._dispatch("autoLinks.after",e,t,r)}),s.subParser("simplifiedAutoLinks",function(e,t,r){"use strict"
return t.simplifiedAutoLink?(e=r.converter._dispatch("simplifiedAutoLinks.before",e,t,r),e=(e=t.excludeTrailingPunctuationFromURLs?e.replace(m,v(t)):e.replace(f,v(t))).replace(b,w(t,r)),e=r.converter._dispatch("simplifiedAutoLinks.after",e,t,r)):e}),s.subParser("blockGamut",function(e,t,r){"use strict"
return e=r.converter._dispatch("blockGamut.before",e,t,r),e=s.subParser("blockQuotes")(e,t,r),e=s.subParser("headers")(e,t,r),e=s.subParser("horizontalRule")(e,t,r),e=s.subParser("lists")(e,t,r),e=s.subParser("codeBlocks")(e,t,r),e=s.subParser("tables")(e,t,r),e=s.subParser("hashHTMLBlocks")(e,t,r),e=s.subParser("paragraphs")(e,t,r),r.converter._dispatch("blockGamut.after",e,t,r)}),s.subParser("blockQuotes",function(e,t,r){"use strict"
e=r.converter._dispatch("blockQuotes.before",e,t,r),e+="\n\n"
var n=/(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm
return t.splitAdjacentBlockquotes&&(n=/^ {0,3}>[\s\S]*?(?:\n\n)/gm),e=e.replace(n,function(e){return e=(e=(e=e.replace(/^[ \t]*>[ \t]?/gm,"")).replace(/¨0/g,"")).replace(/^[ \t]+$/gm,""),e=s.subParser("githubCodeBlocks")(e,t,r),e=(e=(e=s.subParser("blockGamut")(e,t,r)).replace(/(^|\n)/g,"$1  ")).replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(e,t){return t.replace(/^  /gm,"¨0").replace(/¨0/g,"")}),s.subParser("hashBlock")("<blockquote>\n"+e+"\n</blockquote>",t,r)}),r.converter._dispatch("blockQuotes.after",e,t,r)}),s.subParser("codeBlocks",function(e,t,r){"use strict"
return e=r.converter._dispatch("codeBlocks.before",e,t,r),e=(e=(e+="¨0").replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g,function(e,n,a){var i=n,o=a,l="\n"
return i=s.subParser("outdent")(i,t,r),i=s.subParser("encodeCode")(i,t,r),i=(i=(i=s.subParser("detab")(i,t,r)).replace(/^\n+/g,"")).replace(/\n+$/g,""),t.omitExtraWLInCodeBlocks&&(l=""),i="<pre><code>"+i+l+"</code></pre>",s.subParser("hashBlock")(i,t,r)+o})).replace(/¨0/,""),r.converter._dispatch("codeBlocks.after",e,t,r)}),s.subParser("codeSpans",function(e,t,r){"use strict"
return void 0===(e=r.converter._dispatch("codeSpans.before",e,t,r))&&(e=""),e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(e,n,a,i){var o=i
return o=(o=o.replace(/^([ \t]*)/g,"")).replace(/[ \t]*$/g,""),o=n+"<code>"+(o=s.subParser("encodeCode")(o,t,r))+"</code>",s.subParser("hashHTMLSpans")(o,t,r)}),r.converter._dispatch("codeSpans.after",e,t,r)}),s.subParser("completeHTMLDocument",function(e,t,r){"use strict"
if(!t.completeHTMLDocument)return e
e=r.converter._dispatch("completeHTMLDocument.before",e,t,r)
var n="html",a="<!DOCTYPE HTML>\n",s="",i='<meta charset="utf-8">\n',o="",l=""
for(var c in void 0!==r.metadata.parsed.doctype&&(a="<!DOCTYPE "+r.metadata.parsed.doctype+">\n","html"!==(n=r.metadata.parsed.doctype.toString().toLowerCase())&&"html5"!==n||(i='<meta charset="utf-8">')),r.metadata.parsed)if(r.metadata.parsed.hasOwnProperty(c))switch(c.toLowerCase()){case"doctype":break
case"title":s="<title>"+r.metadata.parsed.title+"</title>\n"
break
case"charset":i="html"===n||"html5"===n?'<meta charset="'+r.metadata.parsed.charset+'">\n':'<meta name="charset" content="'+r.metadata.parsed.charset+'">\n'
break
case"language":case"lang":o=' lang="'+r.metadata.parsed[c]+'"',l+='<meta name="'+c+'" content="'+r.metadata.parsed[c]+'">\n'
break
default:l+='<meta name="'+c+'" content="'+r.metadata.parsed[c]+'">\n'}return e=a+"<html"+o+">\n<head>\n"+s+i+l+"</head>\n<body>\n"+e.trim()+"\n</body>\n</html>",r.converter._dispatch("completeHTMLDocument.after",e,t,r)}),s.subParser("detab",function(e,t,r){"use strict"
return e=(e=(e=(e=(e=(e=r.converter._dispatch("detab.before",e,t,r)).replace(/\t(?=\t)/g,"    ")).replace(/\t/g,"¨A¨B")).replace(/¨B(.+?)¨A/g,function(e,t){for(var r=t,n=4-r.length%4,a=0;a<n;a++)r+=" "
return r})).replace(/¨A/g,"    ")).replace(/¨B/g,""),r.converter._dispatch("detab.after",e,t,r)}),s.subParser("ellipsis",function(e,t,r){"use strict"
return t.ellipsis?(e=(e=r.converter._dispatch("ellipsis.before",e,t,r)).replace(/\.\.\./g,"…"),e=r.converter._dispatch("ellipsis.after",e,t,r)):e}),s.subParser("emoji",function(e,t,r){"use strict"
return t.emoji?(e=(e=r.converter._dispatch("emoji.before",e,t,r)).replace(/:([\S]+?):/g,function(e,t){return s.helper.emojis.hasOwnProperty(t)?s.helper.emojis[t]:e}),r.converter._dispatch("emoji.after",e,t,r)):e}),s.subParser("encodeAmpsAndAngles",function(e,t,r){"use strict"
return e=(e=(e=(e=(e=r.converter._dispatch("encodeAmpsAndAngles.before",e,t,r)).replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;")).replace(/<(?![a-z\/?$!])/gi,"&lt;")).replace(/</g,"&lt;")).replace(/>/g,"&gt;"),r.converter._dispatch("encodeAmpsAndAngles.after",e,t,r)}),s.subParser("encodeBackslashEscapes",function(e,t,r){"use strict"
return e=(e=(e=r.converter._dispatch("encodeBackslashEscapes.before",e,t,r)).replace(/\\(\\)/g,s.helper.escapeCharactersCallback)).replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g,s.helper.escapeCharactersCallback),r.converter._dispatch("encodeBackslashEscapes.after",e,t,r)}),s.subParser("encodeCode",function(e,t,r){"use strict"
return e=(e=r.converter._dispatch("encodeCode.before",e,t,r)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/([*_{}\[\]\\=~-])/g,s.helper.escapeCharactersCallback),r.converter._dispatch("encodeCode.after",e,t,r)}),s.subParser("escapeSpecialCharsWithinTagAttributes",function(e,t,r){"use strict"
return e=(e=(e=r.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before",e,t,r)).replace(/<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi,function(e){return e.replace(/(.)<\/?code>(?=.)/g,"$1`").replace(/([\\`*_~=|])/g,s.helper.escapeCharactersCallback)})).replace(/<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi,function(e){return e.replace(/([\\`*_~=|])/g,s.helper.escapeCharactersCallback)}),r.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after",e,t,r)}),s.subParser("githubCodeBlocks",function(e,t,r){"use strict"
return t.ghCodeBlocks?(e=r.converter._dispatch("githubCodeBlocks.before",e,t,r),e=(e=(e+="¨0").replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g,function(e,n,a,i){var o=t.omitExtraWLInCodeBlocks?"":"\n"
return i=s.subParser("encodeCode")(i,t,r),i="<pre><code"+(a?' class="'+a+" language-"+a+'"':"")+">"+(i=(i=(i=s.subParser("detab")(i,t,r)).replace(/^\n+/g,"")).replace(/\n+$/g,""))+o+"</code></pre>",i=s.subParser("hashBlock")(i,t,r),"\n\n¨G"+(r.ghCodeBlocks.push({text:e,codeblock:i})-1)+"G\n\n"})).replace(/¨0/,""),r.converter._dispatch("githubCodeBlocks.after",e,t,r)):e}),s.subParser("hashBlock",function(e,t,r){"use strict"
return e=(e=r.converter._dispatch("hashBlock.before",e,t,r)).replace(/(^\n+|\n+$)/g,""),e="\n\n¨K"+(r.gHtmlBlocks.push(e)-1)+"K\n\n",r.converter._dispatch("hashBlock.after",e,t,r)}),s.subParser("hashCodeTags",function(e,t,r){"use strict"
return e=r.converter._dispatch("hashCodeTags.before",e,t,r),e=s.helper.replaceRecursiveRegExp(e,function(e,n,a,i){var o=a+s.subParser("encodeCode")(n,t,r)+i
return"¨C"+(r.gHtmlSpans.push(o)-1)+"C"},"<code\\b[^>]*>","</code>","gim"),r.converter._dispatch("hashCodeTags.after",e,t,r)}),s.subParser("hashElement",function(e,t,r){"use strict"
return function(e,t){var n=t
return n=(n=(n=n.replace(/\n\n/g,"\n")).replace(/^\n/,"")).replace(/\n+$/g,""),"\n\n¨K"+(r.gHtmlBlocks.push(n)-1)+"K\n\n"}}),s.subParser("hashHTMLBlocks",function(e,t,r){"use strict"
e=r.converter._dispatch("hashHTMLBlocks.before",e,t,r)
var n=["pre","div","h1","h2","h3","h4","h5","h6","blockquote","table","dl","ol","ul","script","noscript","form","fieldset","iframe","math","style","section","header","footer","nav","article","aside","address","audio","canvas","figure","hgroup","output","video","p"],a=function(e,t,n,a){var s=e
return-1!==n.search(/\bmarkdown\b/)&&(s=n+r.converter.makeHtml(t)+a),"\n\n¨K"+(r.gHtmlBlocks.push(s)-1)+"K\n\n"}
t.backslashEscapesHTMLTags&&(e=e.replace(/\\<(\/?[^>]+?)>/g,function(e,t){return"&lt;"+t+"&gt;"}))
for(var i=0;i<n.length;++i)for(var o,l=new RegExp("^ {0,3}(<"+n[i]+"\\b[^>]*>)","im"),c="<"+n[i]+"\\b[^>]*>",u="</"+n[i]+">";-1!==(o=s.helper.regexIndexOf(e,l));){var d=s.helper.splitAtIndex(e,o),p=s.helper.replaceRecursiveRegExp(d[1],a,c,u,"im")
if(p===d[1])break
e=d[0].concat(p)}return e=e.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,s.subParser("hashElement")(e,t,r)),e=(e=s.helper.replaceRecursiveRegExp(e,function(e){return"\n\n¨K"+(r.gHtmlBlocks.push(e)-1)+"K\n\n"},"^ {0,3}\x3c!--","--\x3e","gm")).replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,s.subParser("hashElement")(e,t,r)),r.converter._dispatch("hashHTMLBlocks.after",e,t,r)}),s.subParser("hashHTMLSpans",function(e,t,r){"use strict"
function n(e){return"¨C"+(r.gHtmlSpans.push(e)-1)+"C"}return e=(e=(e=(e=(e=r.converter._dispatch("hashHTMLSpans.before",e,t,r)).replace(/<[^>]+?\/>/gi,function(e){return n(e)})).replace(/<([^>]+?)>[\s\S]*?<\/\1>/g,function(e){return n(e)})).replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g,function(e){return n(e)})).replace(/<[^>]+?>/gi,function(e){return n(e)}),r.converter._dispatch("hashHTMLSpans.after",e,t,r)}),s.subParser("unhashHTMLSpans",function(e,t,r){"use strict"
e=r.converter._dispatch("unhashHTMLSpans.before",e,t,r)
for(var n=0;n<r.gHtmlSpans.length;++n){for(var a=r.gHtmlSpans[n],s=0;/¨C(\d+)C/.test(a);){var i=RegExp.$1
if(a=a.replace("¨C"+i+"C",r.gHtmlSpans[i]),10===s){console.error("maximum nesting of 10 spans reached!!!")
break}++s}e=e.replace("¨C"+n+"C",a)}return r.converter._dispatch("unhashHTMLSpans.after",e,t,r)}),s.subParser("hashPreCodeTags",function(e,t,r){"use strict"
return e=r.converter._dispatch("hashPreCodeTags.before",e,t,r),e=s.helper.replaceRecursiveRegExp(e,function(e,n,a,i){var o=a+s.subParser("encodeCode")(n,t,r)+i
return"\n\n¨G"+(r.ghCodeBlocks.push({text:e,codeblock:o})-1)+"G\n\n"},"^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>","^ {0,3}</code>\\s*</pre>","gim"),r.converter._dispatch("hashPreCodeTags.after",e,t,r)}),s.subParser("headers",function(e,t,r){"use strict"
e=r.converter._dispatch("headers.before",e,t,r)
var n=isNaN(parseInt(t.headerLevelStart))?1:parseInt(t.headerLevelStart),a=t.smoothLivePreview?/^(.+)[ \t]*\n={2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n=+[ \t]*\n+/gm,i=t.smoothLivePreview?/^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n-+[ \t]*\n+/gm
e=(e=e.replace(a,function(e,a){var i=s.subParser("spanGamut")(a,t,r),o=t.noHeaderId?"":' id="'+l(a)+'"',c="<h"+n+o+">"+i+"</h"+n+">"
return s.subParser("hashBlock")(c,t,r)})).replace(i,function(e,a){var i=s.subParser("spanGamut")(a,t,r),o=t.noHeaderId?"":' id="'+l(a)+'"',c=n+1,u="<h"+c+o+">"+i+"</h"+c+">"
return s.subParser("hashBlock")(u,t,r)})
var o=t.requireSpaceBeforeHeadingText?/^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm:/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm
function l(e){var n,a
if(t.customizedHeaderId){var i=e.match(/\{([^{]+?)}\s*$/)
i&&i[1]&&(e=i[1])}return n=e,a=s.helper.isString(t.prefixHeaderId)?t.prefixHeaderId:!0===t.prefixHeaderId?"section-":"",t.rawPrefixHeaderId||(n=a+n),n=t.ghCompatibleHeaderId?n.replace(/ /g,"-").replace(/&amp;/g,"").replace(/¨T/g,"").replace(/¨D/g,"").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g,"").toLowerCase():t.rawHeaderId?n.replace(/ /g,"-").replace(/&amp;/g,"&").replace(/¨T/g,"¨").replace(/¨D/g,"$").replace(/["']/g,"-").toLowerCase():n.replace(/[^\w]/g,"").toLowerCase(),t.rawPrefixHeaderId&&(n=a+n),r.hashLinkCounts[n]?n=n+"-"+r.hashLinkCounts[n]++:r.hashLinkCounts[n]=1,n}return e=e.replace(o,function(e,a,i){var o=i
t.customizedHeaderId&&(o=i.replace(/\s?\{([^{]+?)}\s*$/,""))
var c=s.subParser("spanGamut")(o,t,r),u=t.noHeaderId?"":' id="'+l(i)+'"',d=n-1+a.length,p="<h"+d+u+">"+c+"</h"+d+">"
return s.subParser("hashBlock")(p,t,r)}),r.converter._dispatch("headers.after",e,t,r)}),s.subParser("horizontalRule",function(e,t,r){"use strict"
e=r.converter._dispatch("horizontalRule.before",e,t,r)
var n=s.subParser("hashBlock")("<hr />",t,r)
return e=(e=(e=e.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm,n)).replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm,n)).replace(/^ {0,2}( ?_){3,}[ \t]*$/gm,n),r.converter._dispatch("horizontalRule.after",e,t,r)}),s.subParser("images",function(e,t,r){"use strict"
function n(e,t,n,a,i,o,l,c){var u=r.gUrls,d=r.gTitles,p=r.gDimensions
if(n=n.toLowerCase(),c||(c=""),e.search(/\(<?\s*>? ?(['"].*['"])?\)$/m)>-1)a=""
else if(""===a||null===a){if(""!==n&&null!==n||(n=t.toLowerCase().replace(/ ?\n/g," ")),a="#"+n,s.helper.isUndefined(u[n]))return e
a=u[n],s.helper.isUndefined(d[n])||(c=d[n]),s.helper.isUndefined(p[n])||(i=p[n].width,o=p[n].height)}t=t.replace(/"/g,"&quot;").replace(s.helper.regexes.asteriskDashAndColon,s.helper.escapeCharactersCallback)
var h='<img src="'+(a=a.replace(s.helper.regexes.asteriskDashAndColon,s.helper.escapeCharactersCallback))+'" alt="'+t+'"'
return c&&s.helper.isString(c)&&(h+=' title="'+(c=c.replace(/"/g,"&quot;").replace(s.helper.regexes.asteriskDashAndColon,s.helper.escapeCharactersCallback))+'"'),i&&o&&(h+=' width="'+(i="*"===i?"auto":i)+'"',h+=' height="'+(o="*"===o?"auto":o)+'"'),h+" />"}return e=(e=(e=(e=(e=(e=r.converter._dispatch("images.before",e,t,r)).replace(/!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g,n)).replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,function(e,t,r,a,s,i,o,l){return n(e,t,r,a=a.replace(/\s/g,""),s,i,0,l)})).replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,n)).replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,n)).replace(/!\[([^\[\]]+)]()()()()()/g,n),r.converter._dispatch("images.after",e,t,r)}),s.subParser("italicsAndBold",function(e,t,r){"use strict"
function n(e,t,r){return t+e+r}return e=r.converter._dispatch("italicsAndBold.before",e,t,r),e=t.literalMidWordUnderscores?(e=(e=e.replace(/\b___(\S[\s\S]*?)___\b/g,function(e,t){return n(t,"<strong><em>","</em></strong>")})).replace(/\b__(\S[\s\S]*?)__\b/g,function(e,t){return n(t,"<strong>","</strong>")})).replace(/\b_(\S[\s\S]*?)_\b/g,function(e,t){return n(t,"<em>","</em>")}):(e=(e=e.replace(/___(\S[\s\S]*?)___/g,function(e,t){return/\S$/.test(t)?n(t,"<strong><em>","</em></strong>"):e})).replace(/__(\S[\s\S]*?)__/g,function(e,t){return/\S$/.test(t)?n(t,"<strong>","</strong>"):e})).replace(/_([^\s_][\s\S]*?)_/g,function(e,t){return/\S$/.test(t)?n(t,"<em>","</em>"):e}),e=t.literalMidWordAsterisks?(e=(e=e.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g,function(e,t,r){return n(r,t+"<strong><em>","</em></strong>")})).replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g,function(e,t,r){return n(r,t+"<strong>","</strong>")})).replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g,function(e,t,r){return n(r,t+"<em>","</em>")}):(e=(e=e.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g,function(e,t){return/\S$/.test(t)?n(t,"<strong><em>","</em></strong>"):e})).replace(/\*\*(\S[\s\S]*?)\*\*/g,function(e,t){return/\S$/.test(t)?n(t,"<strong>","</strong>"):e})).replace(/\*([^\s*][\s\S]*?)\*/g,function(e,t){return/\S$/.test(t)?n(t,"<em>","</em>"):e}),r.converter._dispatch("italicsAndBold.after",e,t,r)}),s.subParser("lists",function(e,t,r){"use strict"
function n(e,n){r.gListLevel++,e=e.replace(/\n{2,}$/,"\n")
var a=/(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,i=/\n[ \t]*\n(?!¨0)/.test(e+="¨0")
return t.disableForced4SpacesIndentedSublists&&(a=/(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm),e=(e=e.replace(a,function(e,n,a,o,l,c,u){u=u&&""!==u.trim()
var d=s.subParser("outdent")(l,t,r),p=""
return c&&t.tasklists&&(p=' class="task-list-item" style="list-style-type: none;"',d=d.replace(/^[ \t]*\[(x|X| )?]/m,function(){var e='<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"'
return u&&(e+=" checked"),e+">"})),d=d.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g,function(e){return"¨A"+e}),n||d.search(/\n{2,}/)>-1?(d=s.subParser("githubCodeBlocks")(d,t,r),d=s.subParser("blockGamut")(d,t,r)):(d=(d=s.subParser("lists")(d,t,r)).replace(/\n$/,""),d=(d=s.subParser("hashHTMLBlocks")(d,t,r)).replace(/\n\n+/g,"\n\n"),d=i?s.subParser("paragraphs")(d,t,r):s.subParser("spanGamut")(d,t,r)),"<li"+p+">"+(d=d.replace("¨A",""))+"</li>\n"})).replace(/¨0/g,""),r.gListLevel--,n&&(e=e.replace(/\s+$/,"")),e}function a(e,t){if("ol"===t){var r=e.match(/^ *(\d+)\./)
if(r&&"1"!==r[1])return' start="'+r[1]+'"'}return""}function i(e,r,s){var i=t.disableForced4SpacesIndentedSublists?/^ ?\d+\.[ \t]/gm:/^ {0,3}\d+\.[ \t]/gm,o=t.disableForced4SpacesIndentedSublists?/^ ?[*+-][ \t]/gm:/^ {0,3}[*+-][ \t]/gm,l="ul"===r?i:o,c=""
if(-1!==e.search(l))!function t(u){var d=u.search(l),p=a(e,r);-1!==d?(c+="\n\n<"+r+p+">\n"+n(u.slice(0,d),!!s)+"</"+r+">\n",l="ul"==(r="ul"===r?"ol":"ul")?i:o,t(u.slice(d))):c+="\n\n<"+r+p+">\n"+n(u,!!s)+"</"+r+">\n"}(e)
else{var u=a(e,r)
c="\n\n<"+r+u+">\n"+n(e,!!s)+"</"+r+">\n"}return c}return e=r.converter._dispatch("lists.before",e,t,r),e+="¨0",e=(e=r.gListLevel?e.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,function(e,t,r){return i(t,r.search(/[*+-]/g)>-1?"ul":"ol",!0)}):e.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,function(e,t,r,n){return i(r,n.search(/[*+-]/g)>-1?"ul":"ol",!1)})).replace(/¨0/,""),r.converter._dispatch("lists.after",e,t,r)}),s.subParser("metadata",function(e,t,r){"use strict"
if(!t.metadata)return e
function n(e){r.metadata.raw=e,(e=(e=e.replace(/&/g,"&amp;").replace(/"/g,"&quot;")).replace(/\n {4}/g," ")).replace(/^([\S ]+): +([\s\S]+?)$/gm,function(e,t,n){return r.metadata.parsed[t]=n,""})}return e=(e=(e=(e=r.converter._dispatch("metadata.before",e,t,r)).replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/,function(e,t,r){return n(r),"¨M"})).replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/,function(e,t,a){return t&&(r.metadata.format=t),n(a),"¨M"})).replace(/¨M/g,""),r.converter._dispatch("metadata.after",e,t,r)}),s.subParser("outdent",function(e,t,r){"use strict"
return e=(e=(e=r.converter._dispatch("outdent.before",e,t,r)).replace(/^(\t|[ ]{1,4})/gm,"¨0")).replace(/¨0/g,""),r.converter._dispatch("outdent.after",e,t,r)}),s.subParser("paragraphs",function(e,t,r){"use strict"
for(var n=(e=(e=(e=r.converter._dispatch("paragraphs.before",e,t,r)).replace(/^\n+/g,"")).replace(/\n+$/g,"")).split(/\n{2,}/g),a=[],i=n.length,o=0;o<i;o++){var l=n[o]
l.search(/¨(K|G)(\d+)\1/g)>=0?a.push(l):l.search(/\S/)>=0&&(l=(l=s.subParser("spanGamut")(l,t,r)).replace(/^([ \t]*)/g,"<p>"),l+="</p>",a.push(l))}for(i=a.length,o=0;o<i;o++){for(var c="",u=a[o],d=!1;/¨(K|G)(\d+)\1/.test(u);){var p=RegExp.$1,h=RegExp.$2
c=(c="K"===p?r.gHtmlBlocks[h]:d?s.subParser("encodeCode")(r.ghCodeBlocks[h].text,t,r):r.ghCodeBlocks[h].codeblock).replace(/\$/g,"$$$$"),u=u.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/,c),/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(u)&&(d=!0)}a[o]=u}return e=(e=(e=a.join("\n")).replace(/^\n+/g,"")).replace(/\n+$/g,""),r.converter._dispatch("paragraphs.after",e,t,r)}),s.subParser("runExtension",function(e,t,r,n){"use strict"
if(e.filter)t=e.filter(t,n.converter,r)
else if(e.regex){var a=e.regex
a instanceof RegExp||(a=new RegExp(a,"g")),t=t.replace(a,e.replace)}return t}),s.subParser("spanGamut",function(e,t,r){"use strict"
return e=r.converter._dispatch("spanGamut.before",e,t,r),e=s.subParser("codeSpans")(e,t,r),e=s.subParser("escapeSpecialCharsWithinTagAttributes")(e,t,r),e=s.subParser("encodeBackslashEscapes")(e,t,r),e=s.subParser("images")(e,t,r),e=s.subParser("anchors")(e,t,r),e=s.subParser("autoLinks")(e,t,r),e=s.subParser("simplifiedAutoLinks")(e,t,r),e=s.subParser("emoji")(e,t,r),e=s.subParser("underline")(e,t,r),e=s.subParser("italicsAndBold")(e,t,r),e=s.subParser("strikethrough")(e,t,r),e=s.subParser("ellipsis")(e,t,r),e=s.subParser("hashHTMLSpans")(e,t,r),e=s.subParser("encodeAmpsAndAngles")(e,t,r),t.simpleLineBreaks?/\n\n¨K/.test(e)||(e=e.replace(/\n+/g,"<br />\n")):e=e.replace(/  +\n/g,"<br />\n"),r.converter._dispatch("spanGamut.after",e,t,r)}),s.subParser("strikethrough",function(e,t,r){"use strict"
return t.strikethrough&&(e=(e=r.converter._dispatch("strikethrough.before",e,t,r)).replace(/(?:~){2}([\s\S]+?)(?:~){2}/g,function(e,n){return function(e){return t.simplifiedAutoLink&&(e=s.subParser("simplifiedAutoLinks")(e,t,r)),"<del>"+e+"</del>"}(n)}),e=r.converter._dispatch("strikethrough.after",e,t,r)),e}),s.subParser("stripLinkDefinitions",function(e,t,r){"use strict"
var n=function(n,a,i,o,l,c,u){return a=a.toLowerCase(),e.toLowerCase().split(a).length-1<2?n:(i.match(/^data:.+?\/.+?;base64,/)?r.gUrls[a]=i.replace(/\s/g,""):r.gUrls[a]=s.subParser("encodeAmpsAndAngles")(i,t,r),c?c+u:(u&&(r.gTitles[a]=u.replace(/"|'/g,"&quot;")),t.parseImgDimensions&&o&&l&&(r.gDimensions[a]={width:o,height:l}),""))}
return e=(e=(e=(e+="¨0").replace(/^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm,n)).replace(/^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm,n)).replace(/¨0/,"")}),s.subParser("tables",function(e,t,r){"use strict"
if(!t.tables)return e
function n(e){return/^:[ \t]*--*$/.test(e)?' style="text-align:left;"':/^--*[ \t]*:[ \t]*$/.test(e)?' style="text-align:right;"':/^:[ \t]*--*[ \t]*:$/.test(e)?' style="text-align:center;"':""}function a(e,n){var a=""
return e=e.trim(),(t.tablesHeaderId||t.tableHeaderId)&&(a=' id="'+e.replace(/ /g,"_").toLowerCase()+'"'),"<th"+a+n+">"+(e=s.subParser("spanGamut")(e,t,r))+"</th>\n"}function i(e,n){return"<td"+n+">"+s.subParser("spanGamut")(e,t,r)+"</td>\n"}function o(e){var o,l=e.split("\n")
for(o=0;o<l.length;++o)/^ {0,3}\|/.test(l[o])&&(l[o]=l[o].replace(/^ {0,3}\|/,"")),/\|[ \t]*$/.test(l[o])&&(l[o]=l[o].replace(/\|[ \t]*$/,"")),l[o]=s.subParser("codeSpans")(l[o],t,r)
var c=l[0].split("|").map(function(e){return e.trim()}),u=l[1].split("|").map(function(e){return e.trim()}),d=[],p=[],h=[],f=[]
for(l.shift(),l.shift(),o=0;o<l.length;++o)""!==l[o].trim()&&d.push(l[o].split("|").map(function(e){return e.trim()}))
if(c.length<u.length)return e
for(o=0;o<u.length;++o)h.push(n(u[o]))
for(o=0;o<c.length;++o)s.helper.isUndefined(h[o])&&(h[o]=""),p.push(a(c[o],h[o]))
for(o=0;o<d.length;++o){for(var m=[],g=0;g<p.length;++g)s.helper.isUndefined(d[o][g]),m.push(i(d[o][g],h[g]))
f.push(m)}return function(e,t){for(var r="<table>\n<thead>\n<tr>\n",n=e.length,a=0;a<n;++a)r+=e[a]
for(r+="</tr>\n</thead>\n<tbody>\n",a=0;a<t.length;++a){r+="<tr>\n"
for(var s=0;s<n;++s)r+=t[a][s]
r+="</tr>\n"}return r+"</tbody>\n</table>\n"}(p,f)}return e=(e=(e=(e=r.converter._dispatch("tables.before",e,t,r)).replace(/\\(\|)/g,s.helper.escapeCharactersCallback)).replace(/^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm,o)).replace(/^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm,o),r.converter._dispatch("tables.after",e,t,r)}),s.subParser("underline",function(e,t,r){"use strict"
return t.underline?(e=r.converter._dispatch("underline.before",e,t,r),e=(e=t.literalMidWordUnderscores?(e=e.replace(/\b___(\S[\s\S]*?)___\b/g,function(e,t){return"<u>"+t+"</u>"})).replace(/\b__(\S[\s\S]*?)__\b/g,function(e,t){return"<u>"+t+"</u>"}):(e=e.replace(/___(\S[\s\S]*?)___/g,function(e,t){return/\S$/.test(t)?"<u>"+t+"</u>":e})).replace(/__(\S[\s\S]*?)__/g,function(e,t){return/\S$/.test(t)?"<u>"+t+"</u>":e})).replace(/(_)/g,s.helper.escapeCharactersCallback),e=r.converter._dispatch("underline.after",e,t,r)):e}),s.subParser("unescapeSpecialChars",function(e,t,r){"use strict"
return e=(e=r.converter._dispatch("unescapeSpecialChars.before",e,t,r)).replace(/¨E(\d+)E/g,function(e,t){var r=parseInt(t)
return String.fromCharCode(r)}),r.converter._dispatch("unescapeSpecialChars.after",e,t,r)}),s.subParser("makeMarkdown.blockquote",function(e,t){"use strict"
var r=""
if(e.hasChildNodes())for(var n=e.childNodes,a=n.length,i=0;i<a;++i){var o=s.subParser("makeMarkdown.node")(n[i],t)
""!==o&&(r+=o)}return"> "+(r=r.trim()).split("\n").join("\n> ")}),s.subParser("makeMarkdown.codeBlock",function(e,t){"use strict"
var r=e.getAttribute("language"),n=e.getAttribute("precodenum")
return"```"+r+"\n"+t.preList[n]+"\n```"}),s.subParser("makeMarkdown.codeSpan",function(e){"use strict"
return"`"+e.innerHTML+"`"}),s.subParser("makeMarkdown.emphasis",function(e,t){"use strict"
var r=""
if(e.hasChildNodes()){r+="*"
for(var n=e.childNodes,a=n.length,i=0;i<a;++i)r+=s.subParser("makeMarkdown.node")(n[i],t)
r+="*"}return r}),s.subParser("makeMarkdown.header",function(e,t,r){"use strict"
var n=new Array(r+1).join("#"),a=""
if(e.hasChildNodes()){a=n+" "
for(var i=e.childNodes,o=i.length,l=0;l<o;++l)a+=s.subParser("makeMarkdown.node")(i[l],t)}return a}),s.subParser("makeMarkdown.hr",function(){"use strict"
return"---"}),s.subParser("makeMarkdown.image",function(e){"use strict"
var t=""
return e.hasAttribute("src")&&(t+="!["+e.getAttribute("alt")+"](",t+="<"+e.getAttribute("src")+">",e.hasAttribute("width")&&e.hasAttribute("height")&&(t+=" ="+e.getAttribute("width")+"x"+e.getAttribute("height")),e.hasAttribute("title")&&(t+=' "'+e.getAttribute("title")+'"'),t+=")"),t}),s.subParser("makeMarkdown.links",function(e,t){"use strict"
var r=""
if(e.hasChildNodes()&&e.hasAttribute("href")){var n=e.childNodes,a=n.length
r="["
for(var i=0;i<a;++i)r+=s.subParser("makeMarkdown.node")(n[i],t)
r+="](",r+="<"+e.getAttribute("href")+">",e.hasAttribute("title")&&(r+=' "'+e.getAttribute("title")+'"'),r+=")"}return r}),s.subParser("makeMarkdown.list",function(e,t,r){"use strict"
var n=""
if(!e.hasChildNodes())return""
for(var a=e.childNodes,i=a.length,o=e.getAttribute("start")||1,l=0;l<i;++l)void 0!==a[l].tagName&&"li"===a[l].tagName.toLowerCase()&&(n+=("ol"===r?o.toString()+". ":"- ")+s.subParser("makeMarkdown.listItem")(a[l],t),++o)
return(n+="\n\x3c!-- --\x3e\n").trim()}),s.subParser("makeMarkdown.listItem",function(e,t){"use strict"
for(var r="",n=e.childNodes,a=n.length,i=0;i<a;++i)r+=s.subParser("makeMarkdown.node")(n[i],t)
return/\n$/.test(r)?r=r.split("\n").join("\n    ").replace(/^ {4}$/gm,"").replace(/\n\n+/g,"\n\n"):r+="\n",r}),s.subParser("makeMarkdown.node",function(e,t,r){"use strict"
r=r||!1
var n=""
if(3===e.nodeType)return s.subParser("makeMarkdown.txt")(e,t)
if(8===e.nodeType)return"\x3c!--"+e.data+"--\x3e\n\n"
if(1!==e.nodeType)return""
switch(e.tagName.toLowerCase()){case"h1":r||(n=s.subParser("makeMarkdown.header")(e,t,1)+"\n\n")
break
case"h2":r||(n=s.subParser("makeMarkdown.header")(e,t,2)+"\n\n")
break
case"h3":r||(n=s.subParser("makeMarkdown.header")(e,t,3)+"\n\n")
break
case"h4":r||(n=s.subParser("makeMarkdown.header")(e,t,4)+"\n\n")
break
case"h5":r||(n=s.subParser("makeMarkdown.header")(e,t,5)+"\n\n")
break
case"h6":r||(n=s.subParser("makeMarkdown.header")(e,t,6)+"\n\n")
break
case"p":r||(n=s.subParser("makeMarkdown.paragraph")(e,t)+"\n\n")
break
case"blockquote":r||(n=s.subParser("makeMarkdown.blockquote")(e,t)+"\n\n")
break
case"hr":r||(n=s.subParser("makeMarkdown.hr")(e,t)+"\n\n")
break
case"ol":r||(n=s.subParser("makeMarkdown.list")(e,t,"ol")+"\n\n")
break
case"ul":r||(n=s.subParser("makeMarkdown.list")(e,t,"ul")+"\n\n")
break
case"precode":r||(n=s.subParser("makeMarkdown.codeBlock")(e,t)+"\n\n")
break
case"pre":r||(n=s.subParser("makeMarkdown.pre")(e,t)+"\n\n")
break
case"table":r||(n=s.subParser("makeMarkdown.table")(e,t)+"\n\n")
break
case"code":n=s.subParser("makeMarkdown.codeSpan")(e,t)
break
case"em":case"i":n=s.subParser("makeMarkdown.emphasis")(e,t)
break
case"strong":case"b":n=s.subParser("makeMarkdown.strong")(e,t)
break
case"del":n=s.subParser("makeMarkdown.strikethrough")(e,t)
break
case"a":n=s.subParser("makeMarkdown.links")(e,t)
break
case"img":n=s.subParser("makeMarkdown.image")(e,t)
break
default:n=e.outerHTML+"\n\n"}return n}),s.subParser("makeMarkdown.paragraph",function(e,t){"use strict"
var r=""
if(e.hasChildNodes())for(var n=e.childNodes,a=n.length,i=0;i<a;++i)r+=s.subParser("makeMarkdown.node")(n[i],t)
return r.trim()}),s.subParser("makeMarkdown.pre",function(e,t){"use strict"
var r=e.getAttribute("prenum")
return"<pre>"+t.preList[r]+"</pre>"}),s.subParser("makeMarkdown.strikethrough",function(e,t){"use strict"
var r=""
if(e.hasChildNodes()){r+="~~"
for(var n=e.childNodes,a=n.length,i=0;i<a;++i)r+=s.subParser("makeMarkdown.node")(n[i],t)
r+="~~"}return r}),s.subParser("makeMarkdown.strong",function(e,t){"use strict"
var r=""
if(e.hasChildNodes()){r+="**"
for(var n=e.childNodes,a=n.length,i=0;i<a;++i)r+=s.subParser("makeMarkdown.node")(n[i],t)
r+="**"}return r}),s.subParser("makeMarkdown.table",function(e,t){"use strict"
var r,n,a="",i=[[],[]],o=e.querySelectorAll("thead>tr>th"),l=e.querySelectorAll("tbody>tr")
for(r=0;r<o.length;++r){var c=s.subParser("makeMarkdown.tableCell")(o[r],t),u="---"
if(o[r].hasAttribute("style"))switch(o[r].getAttribute("style").toLowerCase().replace(/\s/g,"")){case"text-align:left;":u=":---"
break
case"text-align:right;":u="---:"
break
case"text-align:center;":u=":---:"}i[0][r]=c.trim(),i[1][r]=u}for(r=0;r<l.length;++r){var d=i.push([])-1,p=l[r].getElementsByTagName("td")
for(n=0;n<o.length;++n){var h=" "
void 0!==p[n]&&(h=s.subParser("makeMarkdown.tableCell")(p[n],t)),i[d].push(h)}}var f=3
for(r=0;r<i.length;++r)for(n=0;n<i[r].length;++n){var m=i[r][n].length
m>f&&(f=m)}for(r=0;r<i.length;++r){for(n=0;n<i[r].length;++n)1===r?":"===i[r][n].slice(-1)?i[r][n]=s.helper.padEnd(i[r][n].slice(-1),f-1,"-")+":":i[r][n]=s.helper.padEnd(i[r][n],f,"-"):i[r][n]=s.helper.padEnd(i[r][n],f)
a+="| "+i[r].join(" | ")+" |\n"}return a.trim()}),s.subParser("makeMarkdown.tableCell",function(e,t){"use strict"
var r=""
if(!e.hasChildNodes())return""
for(var n=e.childNodes,a=n.length,i=0;i<a;++i)r+=s.subParser("makeMarkdown.node")(n[i],t,!0)
return r.trim()}),s.subParser("makeMarkdown.txt",function(e){"use strict"
var t=e.nodeValue
return t=(t=t.replace(/ +/g," ")).replace(/¨NBSP;/g," "),(t=(t=(t=(t=(t=(t=(t=(t=s.helper.unescapeHTMLEntities(t)).replace(/([*_~|`])/g,"\\$1")).replace(/^(\s*)>/g,"\\$1>")).replace(/^#/gm,"\\#")).replace(/^(\s*)([-=]{3,})(\s*)$/,"$1\\$2$3")).replace(/^( {0,3}\d+)\./gm,"$1\\.")).replace(/^( {0,3})([+-])/gm,"$1\\$2")).replace(/]([\s]*)\(/g,"\\]$1\\(")).replace(/^ {0,3}\[([\S \t]*?)]:/gm,"\\[$1]:")}),void 0===(n=function(){"use strict"
return s}.call(t,r,t,e))||(e.exports=n)}).call(this)},2445:(e,t,r)=>{"use strict"
function n(e,t,r){return r?.forceNumber&&("number"!=typeof e&&(e=Number(e)),"number"!=typeof t&&(t=Number(t))),e>=t}r.r(t),r.d(t,{default:()=>n})},2604:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>i})
var n=r(336),a=r.n(n),s=r(1603)
class i extends(a()){constructor(...e){var t,r,n
super(...e),t=this,n=!1,(r=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(r="didRun"))in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n}compute(e,t){const[r,...n]=e;(0,s.assert)(`\`{{did-insert-helper}}\` expects a callback function as the first parameter. You provided: ${r}`,"function"==typeof r),this.didRun||(this.didRun=!0,r(n,t))}}},2682:(e,t,r)=>{"use strict"
r.d(t,{A:()=>a})
var n=r(5152)
function a(e,t){const r=n.VERSION.split("-")[0]?.split(".")
if(!r||!r[0]||!r[1])throw new Error("`Ember.VERSION` is not set.")
const a=parseInt(r[0],10),s=parseInt(r[1],10)
return a>e||a===e&&s>=t}},3063:(e,t,r)=>{"use strict"
function n(e,t,r){return r?.forceNumber&&("number"!=typeof e&&(e=Number(e)),"number"!=typeof t&&(t=Number(t))),e<t}r.r(t),r.d(t,{default:()=>n})},3136:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>l,performHelper:()=>o})
var n=r(336),a=r(1603),s=r(3655)
function i(e){return function(t){"function"==typeof e?e(t):null===e||(0,a.assert)(`The onError argument passed to the \`perform\` helper should be a function or null; you passed ${e}`,!1)}}function o(e,t){let r=(0,s.F)("perform","perform",e,t)
return t&&void 0!==t.onError?function(...e){try{return r(...e).catch(i(t.onError))}catch{i(t.onError)}}:r}var l=(0,n.helper)(o)},3276:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>n})
var n=(0,r(336).helper)(function(e){let[t,...r]=e
return t._curry(...r)})},3611:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>d})
var n,a,s,i=r(8784),o=r(2735),l=r(336),c=r.n(l),u=r(4666)
let d=(n=(0,o.service)("page-title"),a=class extends(c()){constructor(e){super(e),(0,i.a)(this,"tokens",s,this),(0,i.b)(this,"tokenId",(0,u.guidFor)(this)),this.tokens.push({id:this.tokenId})}compute(e,t){const r={...t,id:this.tokenId,title:e.join("")}
return this.tokens.push(r),this.tokens.scheduleTitleUpdate(),""}willDestroy(){super.willDestroy(),this.tokens.remove(this.tokenId),this.tokens.scheduleTitleUpdate()}},s=(0,i._)(a.prototype,"tokens",[n],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a)},3629:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{cancelHelper:()=>o,default:()=>l})
var n=r(336),a=r(1603),s=r(3655)
const i="the 'cancel-all' template helper was invoked"
function o(e){let t=e[0]
return t&&"function"==typeof t.cancelAll||(0,a.assert)(`The first argument passed to the \`cancel-all\` helper should be a Task or TaskGroup (without quotes); you passed ${t}`,!1),(0,s.F)("cancel-all","cancelAll",[t,{reason:i}])}var l=(0,n.helper)(o)},3655:(e,t,r)=>{"use strict"
r.d(t,{F:()=>s})
var n=r(4471),a=r(1603)
function s(e,t,r,s){let i=r[0],o=r.slice(1)
return function(...r){if(i&&"function"==typeof i[t]){if(s&&s.value){let e=r.pop()
r.push((0,n.get)(e,s.value))}return i[t](...o,...r)}(0,a.assert)(`The first argument passed to the \`${e}\` helper should be a Task object (without quotes); you passed ${i}`,!1)}}},4091:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>w})
var n=r(5114)
class a{constructor(e,t,r){this.limit=e,this.func=t,this.store=r,this.size=0,this.misses=0,this.hits=0,this.store=r||new Map}get(e){let t=this.store.get(e)
return this.store.has(e)?(this.hits++,this.store.get(e)):(this.misses++,t=this.set(e,this.func(e)),t)}set(e,t){return this.limit>this.size&&(this.size++,this.store.set(e,t)),t}purge(){this.store.clear(),this.size=0,this.hits=0,this.misses=0}}const s=/[ _]/g,i=new a(1e3,e=>{return(t=e,g.get(t)).replace(s,"-")
var t}),o=/(\-|\_|\.|\s)+(.)?/g,l=/(^|\/)([A-Z])/g,c=(new a(1e3,e=>e.replace(o,(e,t,r)=>r?r.toUpperCase():"").replace(l,e=>e.toLowerCase())),/^(\-|_)+(.)?/),u=/(.)(\-|\_|\.|\s)+(.)?/g,d=/(^|\/|\.)([a-z])/g,p=(new a(1e3,e=>{const t=(e,t,r)=>r?`_${r.toUpperCase()}`:"",r=(e,t,r,n)=>t+(n?n.toUpperCase():""),n=e.split("/")
for(let a=0;a<n.length;a++)n[a]=n[a].replace(c,t).replace(u,r)
return n.join("/").replace(d,e=>e.toUpperCase())}),/([a-z\d])([A-Z]+)/g),h=/\-|\s+/g,f=(new a(1e3,e=>e.replace(p,"$1_$2").replace(h,"_").toLowerCase()),/(^|\/)([a-z\u00C0-\u024F])/g),m=(new a(1e3,e=>e.replace(f,e=>e.toUpperCase())),/([a-z\d])([A-Z])/g),g=new a(1e3,e=>e.replace(m,"$1_$2").toLowerCase())
var b=r(1603),_=r(9553)
function v(e){return"object"==typeof e&&Boolean(e)}class w extends n.default{constructor(...e){var t,r,n
super(...e),t=this,r="existingStyles",n=new Set,(r=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(r))in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n}setStyles(e,t){const{existingStyles:r}=this,n=new Set(r)
r.clear(),t.forEach(([t,a])=>{(0,b.assert)(`Your given value for property '${t}' is ${a} (${(0,_.typeOf)(a)}). Accepted types are string and undefined. Please change accordingly.`,void 0===a||"string"===(0,_.typeOf)(a))
let s=""
a&&a.includes("!important")&&(s="important",a=a.replace("!important","")),e.style.setProperty(t,a,s),n.delete(t),r.add(t)}),n.forEach(t=>e.style.removeProperty(t))}modify(e,t,r){this.setStyles(e,function(e,t){return[...e.filter(v),t].map(e=>Object.entries(e).map(([e,t])=>{return[(r=e,i.get(r)),t]
var r})).flat()}(t,r))}}},5114:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>l,modifier:()=>u})
var n=r(2294),a=r(2377),s=r(1130)
function i(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class o{constructor(e){i(this,"capabilities",(0,a.capabilities)("3.22")),this.owner=e}createModifier(e,t){return{instance:new e(this.owner,t),element:null}}installModifier(e,t,r){const n=function(e,t){const r=e
return r.element=t,r}(e,t)
n.instance.modify(t,r.positional,r.named)}updateModifier(e,t){e.instance.modify(e.element,t.positional,t.named)}destroyModifier({instance:e}){(0,s.destroy)(e)}}class l{constructor(e,t){(0,n.setOwner)(this,e)}modify(e,t,r){}}(0,a.setModifierManager)(e=>new o(e),l)
const c=new class{constructor(){i(this,"capabilities",(0,a.capabilities)("3.22"))}createModifier(e){return{element:null,instance:e}}installModifier(e,t,r){const n=function(e,t){const r=e
return r.element=t,r}(e,t),{positional:a,named:s}=r,i=e.instance(t,a,s)
"function"==typeof i&&(n.teardown=i)}updateModifier(e,t){"function"==typeof e.teardown&&e.teardown()
const r=e.instance(e.element,t.positional,t.named)
"function"==typeof r&&(e.teardown=r)}destroyModifier(e){"function"==typeof e.teardown&&e.teardown()}getDebugName(e){return e.instance.toString()}getDebugInstance(e){return e}}
function u(e,t){return e.toString=()=>t?.name||e.name,(0,a.setModifierManager)(()=>c,e)}},5245:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>u})
var n=r(2663),a=r.n(n),s=r(336),i=r.n(s),o=r(1603)
function l(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||null===e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(){}class u extends(i()){constructor(...e){super(...e),l(this,"tagName",c),l(this,"componentClass",void 0)}compute(e,t){(0,o.assert)("The `element` helper takes a single positional argument",1===e.length),(0,o.assert)("The `element` helper does not take any named arguments",0===Object.keys(t).length)
let r=e[0]
return r!==this.tagName&&(this.tagName=r,"string"==typeof r?this.componentClass=class extends(a()){constructor(...e){super(...e),l(this,"tagName",r)}}:(this.componentClass=void 0,(0,o.runInDebug)(()=>{let e="The argument passed to the `element` helper must be a string"
try{e+=` (you passed \`${r}\`)`}catch(e){}(0,o.assert)(e,null==r)}))),this.componentClass}}},5572:(e,t,r)=>{"use strict"
function n(e,t,r){return r?.forceNumber&&("number"!=typeof e&&(e=Number(e)),"number"!=typeof t&&(t=Number(t))),e<=t}r.r(t),r.d(t,{default:()=>n})},5614:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>n.isEqual})
var n=r(9553)},5648:(e,t,r)=>{"use strict"
function n(e,t,r){return r?.forceNumber&&("number"!=typeof e&&(e=Number(e)),"number"!=typeof t&&(t=Number(t))),e>t}r.r(t),r.d(t,{default:()=>n})},6098:(e,t,r)=>{"use strict"
r.d(t,{A:()=>n})
var n="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:Function("return this")()},6651:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>n.isEmpty})
var n=r(9553)},6675:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>a})
var n=r(1389)
function a(...e){return e.every(n.isArray)}},6828:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>b})
var n,a,s,i,o,l=r(8784),c=r(1223),u=r(2735),d=r.n(u),p=r(9553),h=r(1603)
const f="undefined"!=typeof FastBoot,m="routeDidChange",g=["separator","prepend","replace"]
let b=(n=(0,u.service)("router"),a=(0,u.service)("-document"),s=class extends(d()){constructor(e){if(super(e),(0,l.a)(this,"router",i,this),(0,l.a)(this,"document",o,this),(0,l.b)(this,"tokens",[]),(0,l.b)(this,"_defaultConfig",{separator:" | ",prepend:!0,replace:null}),(0,l.b)(this,"scheduleTitleUpdate",()=>{(0,c.scheduleOnce)("afterRender",this,this._updateTitle)}),this._validateExistingTitleElement(),function(e){return"resolveRegistration"in e}(e)){const r=e.resolveRegistration("config:environment")
"object"==typeof(t=r)&&null!==t&&"pageTitle"in t&&g.forEach(e=>{if(!(0,p.isEmpty)(r.pageTitle[e])){const t=r.pageTitle[e]
this._defaultConfig[e]=t}})}var t
this.router.on(m,this.scheduleTitleUpdate)}applyTokenDefaults(e){const t=this._defaultConfig.separator,r=this._defaultConfig.prepend,n=this._defaultConfig.replace
e.previous??=null,e.next??=null,null==e.separator&&(e.separator=t),null==e.prepend&&null!=r&&(e.prepend=r),null==e.replace&&null!=n&&(e.replace=n)}inheritFromPrevious(e){const t=e.previous
t&&(null==e.separator&&(e.separator=t.separator),null==e.prepend&&(e.prepend=t.prepend))}push(e){const t=this._findTokenById(e.id)
if(t){const r=this.tokens.indexOf(t),n=[...this.tokens],a=t.previous
return e.previous=a,e.next=t.next,this.inheritFromPrevious(e),this.applyTokenDefaults(e),n.splice(r,1,e),void(this.tokens=n)}const r=this.tokens.slice(-1)[0]
r&&(e.previous=r??null,r.next=e,this.inheritFromPrevious(e)),this.applyTokenDefaults(e),this.tokens=[...this.tokens,e]}remove(e){const t=this._findTokenById(e)
if(!t)return
const{next:r,previous:n}=t
r&&(r.previous=n),n&&(n.next=r),t.previous=t.next=null
const a=[...this.tokens]
a.splice(a.indexOf(t),1),this.tokens=a}get visibleTokens(){const e=this.tokens
let t=e?e.length:0
const r=[]
for(;t--;){const n=e[t]
if(n){if(n.replace){r.unshift(n)
break}r.unshift(n)}}return r}get sortedTokens(){const e=this.visibleTokens
if(!e)return[]
let t=!0,r=[]
const n=[r],a=[]
return e.forEach(e=>{e.front?a.unshift(e):e.prepend?(t&&(t=!1,r=[],n.push(r)),r.unshift(e)):(t||(t=!0,r=[],n.push(r)),r.push(e))}),a.concat(n.reduce((e,t)=>e.concat(t),[]))}toString(){const e=this.sortedTokens,t=[]
for(let r=0,n=e.length;r<n;r++){const a=e[r]
a&&a.title&&(t.push(a.title),r+1<n&&t.push(a.separator))}return t.join("")}willDestroy(){super.willDestroy(),this.router.off(m,this.scheduleTitleUpdate)}_updateTitle(){const e=this.toString()
f?this.updateFastbootTitle(e):this.document.title=e,this.titleDidUpdate(e)}_validateExistingTitleElement(){f||(0,h.assert)("[ember-page-title]: Multiple title elements found. Check for other addons like ember-cli-head updating <title> as well.",document.head.querySelectorAll("title").length<=1)}_findTokenById(e){return this.tokens.find(t=>t.id===e)}updateFastbootTitle(e){if(!f)return
const t=this.document.head,r=t.childNodes
for(let s=0;s<r.length;s++){const e=r[s]
e&&"title"===e.nodeName.toLowerCase()&&t.removeChild(e)}const n=this.document.createElement("title"),a=this.document.createTextNode(e)
n.appendChild(a),t.appendChild(n)}titleDidUpdate(e){}},i=(0,l._)(s.prototype,"router",[n],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),o=(0,l._)(s.prototype,"document",[a],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),s)},7822:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>i})
var n=r(9128),a=r(336),s=r.n(a)
class i extends(s()){compute(e){for(let t=0,r=e.length;t<r;t++)if(!0===(0,n.A)(e[t]))return e[t]
return e[e.length-1]}}},7991:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{Task:()=>tt,TaskGroup:()=>at,TaskGroupProperty:()=>Q,TaskInstance:()=>Je,TaskProperty:()=>Z,Yieldable:()=>S,all:()=>Pt,allSettled:()=>St,animationFrame:()=>k,didCancel:()=>pe,dropTask:()=>pt,dropTaskGroup:()=>bt,enqueueTask:()=>ht,enqueueTaskGroup:()=>_t,forever:()=>x,getModifier:()=>Ae,hasModifier:()=>Re,hash:()=>jt,hashSettled:()=>Tt,keepLatestTask:()=>ft,keepLatestTaskGroup:()=>vt,lastValue:()=>ut,race:()=>Et,rawTimeout:()=>P,registerModifier:()=>Me,restartableTask:()=>mt,restartableTaskGroup:()=>wt,task:()=>yt,taskGroup:()=>kt,timeout:()=>j,waitForEvent:()=>Nt,waitForProperty:()=>Dt,waitForQueue:()=>It})
var n=r(1223),a=r(3211),s=r.n(a),i=r(4421),o=r.n(i)
class l{assert(){}async(e){Promise.resolve().then(e)}reportUncaughtRejection(){this.async(e=>{throw e})}defer(){let e={promise:null,resolve:null,reject:null},t=new Promise((t,r)=>{e.resolve=t,e.reject=r})
return e.promise=t,e}globalDebuggingEnabled(){return!1}}const c=new l
var u=r(1603)
const d=new class extends l{assert(...e){(0,u.assert)(...e)}async(e){(0,n.join)(()=>(0,n.schedule)("actions",e))}reportUncaughtRejection(e){(0,n.next)(null,function(){if(!s().onerror)throw e
s().onerror(e)})}defer(){return(0,i.defer)()}globalDebuggingEnabled(){return s().ENV.DEBUG_TASKS}},p="__ec_cancel__",h="__ec_yieldable__",f="next",m="throw",g="return",b="cancel"
class _{constructor(e,t){this._taskInstance=e,this._resumeIndex=t}getTaskInstance(){return this._taskInstance}cancel(){let e=this._taskInstance
e.proceed.call(e,this._resumeIndex,b)}next(e){let t=this._taskInstance
t.proceed.call(t,this._resumeIndex,f,e)}return(e){let t=this._taskInstance
t.proceed.call(t,this._resumeIndex,g,e)}throw(e){let t=this._taskInstance
t.proceed.call(t,this._resumeIndex,m,e)}}class v{constructor(){this[h]=this[h].bind(this)}onYield(){}_deferable(){let e={resolve:void 0,reject:void 0}
return e.promise=new Promise((t,r)=>{e.resolve=t,e.reject=r}),e}_toPromise(){let e=this._deferable(),t={proceed(t,r,n){r==f||r==g?e.resolve(n):e.reject(n)}},r=this[h](t,0)
return e.promise[p]=r,e.promise}then(...e){return this._toPromise().then(...e)}catch(...e){return this._toPromise().catch(...e)}finally(...e){return this._toPromise().finally(...e)}[h](e,t){let r=new _(e,t)
return this.onYield(r)}}class w extends v{onYield(e){let t=requestAnimationFrame(()=>e.next())
return()=>cancelAnimationFrame(t)}}class y extends v{constructor(e){super(),this.ms=e}onYield(e){let t=setTimeout(()=>e.next(),this.ms)
return()=>clearTimeout(t)}}function k(){return new w}const x=new class extends v{onYield(){}}
function P(e){return new y(e)}class S extends v{_deferable(){return d.defer()}}class E extends S{constructor(e){super(),this.ms=e}onYield(e){let t=(0,n.later)(()=>e.next(),this.ms)
return()=>(0,n.cancel)(t)}}function j(e){return new E(e)}var T=r(4471),C=r.n(T)
class O{constructor(e){this.maxConcurrency=e||1}}const z="CANCELLED",M="STARTED",A="QUEUED",R={type:M},L={type:A},I=e=>({type:z,reason:e}),N=I("it belongs to a 'drop' Task that was already running")
class D{constructor(e){this.remainingSlots=e}step(){return this.remainingSlots>0?(this.remainingSlots--,R):N}}class F extends O{makeReducer(){return new D(this.maxConcurrency)}}class B{constructor(e){this.remainingSlots=e}step(){return this.remainingSlots>0?(this.remainingSlots--,R):L}}class $ extends O{makeReducer(){return new B(this.maxConcurrency)}}const H=I("it belongs to a 'keepLatest' Task that was already running")
class q{constructor(e,t){this.remainingSlots=e,this.numToCancel=t}step(){return this.remainingSlots>0?(this.remainingSlots--,R):this.numToCancel>0?(this.numToCancel--,H):L}}class W extends O{makeReducer(e,t){let r=e+t
return new q(this.maxConcurrency,r-this.maxConcurrency-1)}}const G=I("it belongs to a 'restartable' Task that was .perform()ed again")
class U{constructor(e){this.numToCancel=e}step(){return this.numToCancel>0?(this.numToCancel--,G):R}}class V extends O{makeReducer(e,t){return new U(e+t-this.maxConcurrency)}}let Y="__ec_task_factory"
const K={restartable(){return this[Y].setBufferPolicy(V),this},enqueue(){return this[Y].setBufferPolicy($),this},drop(){return this[Y].setBufferPolicy(F),this},keepLatest(){return this[Y].setBufferPolicy(W),this},maxConcurrency(e){return this[Y].setMaxConcurrency(e),this},group(e){return this[Y].setGroup(e),this},evented(){return this[Y].setEvented(!0),this},debug(){return this[Y].setDebug(!0),this},onState(e){return this[Y].setOnState(e),this}}
class Z{}class Q{}Object.assign(Q.prototype,K),Object.assign(Z.prototype,K,{setup(e,t){this.callSuperSetup&&this.callSuperSetup(...arguments),this[Y].setName(t),this[Y]._setupEmberKVO(e)},on(){return this[Y].addPerformEvents(...arguments),this},cancelOn(){return this[Y].addCancelEvents(...arguments),this},observes(){return this[Y].addObserverKeys(...arguments),this}})
const X=s()._setClassicDecorator
function J(e){let t=function(r,n){return void 0!==t.setup&&t.setup(r,n),(0,T.computed)(e)(...arguments)}
return X(t),t}const ee=new Map
class te{constructor(e,t,r){this.stateTracker=t,this.schedulerPolicy=e,this.initialTaskInstances=r,this.startingInstances=[]}process(){let[e,t,r]=this.filterFinishedTaskInstances(),n=this.schedulerPolicy.makeReducer(t,r),a=e.filter(e=>this.setTaskInstanceExecutionState(e,n.step()))
return this.stateTracker.computeFinalStates(e=>this.applyState(e)),this.startingInstances.forEach(e=>e.start()),a}filterFinishedTaskInstances(){let e=0,t=0
return[this.initialTaskInstances.filter(r=>{let n=this.stateTracker.stateFor(r.task),a=r.executor.state
return a.isFinished?(n.onCompletion(r),!1):(a.hasStarted?e+=1:t+=1,!0)}),e,t]}setTaskInstanceExecutionState(e,t){let r=this.stateTracker.stateFor(e.task)
switch(e.executor.counted||(e.executor.counted=!0,r.onPerformed(e)),t.type){case z:return e.cancel(t.reason),!1
case M:return e.executor.state.hasStarted||(this.startingInstances.push(e),r.onStart(e)),r.onRunning(e),!0
case A:return r.onQueued(e),!0}}applyState(e){let{taskable:t}=e
if(!t.onState)return
const{guid:r}=t
if(ee.has(r)&&e.tag<ee.get(r))return
let n=Object.assign({numRunning:e.numRunning,numQueued:e.numQueued,numPerformedInc:e.numPerformedInc},e.attrs)
t.onState(n,t),ee.set(r,e.tag)}}class re{constructor(e,t){this.taskable=e,this.group=e.group,this.numRunning=0,this.numQueued=0,this.numPerformedInc=0,this.attrs={},this.tag=t}onCompletion(e){let t=e.completionState
this.attrs.lastRunning=null,this.attrs.lastComplete=e,1===t?this.attrs.lastSuccessful=e:(2===t?this.attrs.lastErrored=e:3===t&&(this.attrs.lastCanceled=e),this.attrs.lastIncomplete=e)}onPerformed(e){this.numPerformedInc+=1,this.attrs.lastPerformed=e}onStart(e){this.attrs.last=e}onRunning(e){this.attrs.lastRunning=e,this.numRunning+=1}onQueued(){this.numQueued+=1}recurseTaskGroups(e){let t=this.group
for(;t;)e(t),t=t.group}applyStateFrom(e){Object.assign(this.attrs,e.attrs),this.numRunning+=e.numRunning,this.numQueued+=e.numQueued,this.numPerformedInc+=e.numPerformedInc}}const ne=new Map
class ae{constructor(){this.states=new Map}stateFor(e){let t=e.guid,r=this.states.get(t)
if(!r){let n=ne.has(t)?ne.get(t):0
r=new re(e,++n),this.states.set(t,r),ne.set(t,n)}return r}computeFinalStates(e){this.computeRecursiveState(),this.forEachState(t=>e(t))}computeRecursiveState(){this.forEachState(e=>{let t=e
e.recurseTaskGroups(e=>{let r=this.stateFor(e)
r.applyStateFrom(t),t=r})})}forEachState(e){this.states.forEach(t=>e(t))}}const se=new class{onCompletion(){}onPerformed(){}onStart(){}onRunning(){}onQueued(){}}
class ie{stateFor(){return se}computeFinalStates(){}}class oe{constructor(e,t){this.schedulerPolicy=e,this.stateTrackingEnabled=t,this.taskInstances=[]}cancelAll(e,t){let r=this.taskInstances.map(r=>{r.task.guids[e]&&r.executor.cancel(t)}).filter(e=>!!e)
return Promise.all(r)}perform(e){e.onFinalize(()=>this.scheduleRefresh()),this.taskInstances.push(e),this.refresh()}scheduleRefresh(){Promise.resolve().then(()=>this.refresh())}refresh(){let e=this.stateTrackingEnabled?new ae:new ie,t=new te(this.schedulerPolicy,e,this.taskInstances)
this.taskInstances=t.process()}}const le=new class{step(){return R}}
class ce{makeReducer(){return le}}const ue={last:null,lastRunning:null,lastPerformed:null,lastSuccessful:null,lastComplete:null,lastErrored:null,lastCanceled:null,lastIncomplete:null,performCount:0}
Object.freeze(ue)
const de="TaskCancelation"
function pe(e){return e&&e.name===de}const he="explicit",fe="lifespan_end"
class me{constructor(e,t){this.kind=e,this.reason=t,this.promise=new Promise(e=>{this.finalize=e})}}let ge=0
class be{constructor(e){this.context=e.context,this.debug=e.debug||!1,this.enabledModifiers=e.enabledModifiers,this.env=e.env,this.group=e.group,this.hasEnabledEvents=e.hasEnabledEvents,this.modifierOptions=e.modifierOptions,this.name=e.name,this.onStateCallback=e.onStateCallback,this.scheduler=e.scheduler,this.guid="ec_"+ge++,this.guids={},this.guids[this.guid]=!0,this.group&&Object.assign(this.guids,this.group.guids)}cancelAll(e){let{reason:t,cancelRequestKind:r,resetState:n}=e||{}
t=t||".cancelAll() was explicitly called on the Task"
let a=new me(r||he,t)
return this.scheduler.cancelAll(this.guid,a).then(()=>{n&&this._resetState()})}get _isAlive(){return!0}_resetState(){this.setState(ue)}setState(){}}Object.assign(be.prototype,ue),Object.assign(be.prototype,{numRunning:0,numQueued:0,isRunning:!1,isQueued:!1,isIdle:!0,state:"idle"})
class _e{constructor(e,t,r){this.value=e,this.done=t,this.errored=r}}class ve{constructor(e){this.done=!1,this.generatorFactory=e,this.iterator=null}step(e,t){try{let r=this.getIterator(),{value:n,done:a}=r[t](e)
return a?this.finalize(n,!1):new _e(n,!1,!1)}catch(e){return this.finalize(e,!0)}}getIterator(){return this.iterator||this.done||(this.iterator=this.generatorFactory()),this.iterator}finalize(e,t){return this.done=!0,this.iterator=null,new _e(e,!0,t)}}const we={completionState:0,value:null,error:null,isSuccessful:!1,isError:!1,isCanceled:!1,hasStarted:!1,isFinished:!1},ye="PERFORM_TYPE_DEFAULT",ke="PERFORM_TYPE_UNLINKED",xe="PERFORM_TYPE_LINKED",Pe={}
let Se=[]
class Ee{constructor({generatorFactory:e,env:t,debug:r}){this.generatorState=new ve(e),this.state=Object.assign({},we),this.index=1,this.disposers=[],this.finalizeCallbacks=[],this.env=t,this.debug=r,this.cancelRequest=null}start(){this.state.hasStarted||this.cancelRequest||(this.setState({hasStarted:!0}),this.proceedSync(f,void 0),this.taskInstance.onStarted())}cancel(e){return this.requestCancel(e)?(this.state.hasStarted?this.proceedWithCancelAsync():this.finalizeWithCancel(),this.cancelRequest.promise):(e.finalize(),e.promise)}setState(e){Object.assign(this.state,e),this.taskInstance.setState(this.state)}proceedChecked(e,t,r){this.state.isFinished||this.advanceIndex(e)&&(t===b?(this.requestCancel(new me("yielded"),r),this.proceedWithCancelAsync()):this.proceedAsync(t,r))}proceedWithCancelAsync(){this.proceedAsync(g,Pe)}proceedAsync(e,t){this.advanceIndex(this.index),this.env.async(()=>this.proceedSync(e,t))}proceedSync(e,t){this.state.isFinished||(this.dispose(),this.generatorState.done?this.handleResolvedReturnedValue(e,t):this.handleResolvedContinueValue(e,t))}handleResolvedContinueValue(e,t){let r=this.index,n=this.generatorStep(t,e)
this.advanceIndex(r)&&(n.errored?this.finalize(n.value,2):this.handleYieldedValue(n))}handleResolvedReturnedValue(e,t){switch(e){case f:case g:this.finalize(t,1)
break
case m:this.finalize(t,2)}}handleYieldedUnknownThenable(e){let t=this.index
e.then(e=>{this.proceedChecked(t,f,e)},e=>{this.proceedChecked(t,m,e)})}advanceIndex(e){if(this.index===e)return++this.index}handleYieldedValue(e){let t=e.value
t?(this.addDisposer(t[p]),t[h]?this.invokeYieldable(t):"function"==typeof t.then?this.handleYieldedUnknownThenable(t):this.proceedWithSimpleValue(t)):this.proceedWithSimpleValue(t)}proceedWithSimpleValue(e){this.proceedAsync(f,e)}addDisposer(e){"function"==typeof e&&this.disposers.push(e)}dispose(){let e=this.disposers
0!==e.length&&(this.disposers=[],e.forEach(e=>e()))}generatorStep(e,t){Se.push(this)
let r=this.generatorState.step(e,t)
if(Se.pop(),this._expectsLinkedYield){let e=r.value
e&&e.performType===xe||console.warn("You performed a .linked() task without immediately yielding/returning it. This is currently unsupported (but might be supported in future version of ember-concurrency)."),this._expectsLinkedYield=!1}return r}maybeResolveDefer(){this.defer&&this.state.isFinished&&(1===this.state.completionState?this.defer.resolve(this.state.value):this.defer.reject(this.state.error))}onFinalize(e){this.finalizeCallbacks.push(e),this.state.isFinished&&this.runFinalizeCallbacks()}runFinalizeCallbacks(){this.finalizeCallbacks.forEach(e=>e()),this.finalizeCallbacks=[],this.maybeResolveDefer(),this.maybeThrowUnhandledTaskErrorLater()}promise(){return this.defer||(this.defer=this.env.defer(),this.asyncErrorsHandled=!0,this.maybeResolveDefer()),this.defer.promise}maybeThrowUnhandledTaskErrorLater(){this.asyncErrorsHandled||2!==this.state.completionState||pe(this.state.error)||this.env.async(()=>{this.asyncErrorsHandled||this.env.reportUncaughtRejection(this.state.error)})}requestCancel(e){return!this.cancelRequest&&!this.state.isFinished&&(this.cancelRequest=e,!0)}finalize(e,t){if(this.cancelRequest)return this.finalizeWithCancel()
let r={completionState:t}
1===t?(r.isSuccessful=!0,r.value=e):2===t?(r.isError=!0,r.error=e):3===t&&(r.error=e),this.finalizeShared(r)}finalizeWithCancel(){let e=this.taskInstance.formatCancelReason(this.cancelRequest.reason),t=new Error(e)
this.debugEnabled()&&console.log(e),t.name=de,this.finalizeShared({isCanceled:!0,completionState:3,error:t,cancelReason:e}),this.cancelRequest.finalize()}debugEnabled(){return this.debug||this.env.globalDebuggingEnabled()}finalizeShared(e){this.index++,e.isFinished=!0,this.setState(e),this.runFinalizeCallbacks(),this.dispatchFinalizeEvents(e.completionState)}dispatchFinalizeEvents(e){switch(e){case 1:this.taskInstance.onSuccess()
break
case 2:this.taskInstance.onError(this.state.error)
break
case 3:this.taskInstance.onCancel(this.state.cancelReason)}}invokeYieldable(e){try{let t=e[h](this.taskInstance,this.index)
this.addDisposer(t)}catch(e){this.env.reportUncaughtRejection(e)}}onYielded(e,t){this.asyncErrorsHandled=!0,this.onFinalize(()=>{let r=this.state.completionState
1===r?e.proceed(t,f,this.state.value):2===r?e.proceed(t,m,this.state.error):3===r&&e.proceed(t,b,null)})
let r=this.getPerformType()
if(r!==ke)return()=>{this.detectSelfCancelLoop(r,e),this.cancel(new me("parent_cancel"))}}getPerformType(){return this.taskInstance.performType||ye}detectSelfCancelLoop(e,t){if(e!==ye)return
let r=t.executor&&t.executor.cancelRequest
!r||r.kind!==fe||this.cancelRequest||this.state.isFinished||this.taskInstance.selfCancelLoopWarning(t)}}class je{constructor(e,t,r){this.task=e,this.performType=t,this.linkedObject=r}perform(...e){return this.task._performShared(e,this.performType,this.linkedObject)}}let Te=class e extends be{constructor(e){super(e),this.generatorFactory=e.generatorFactory,this.perform=this._perform.bind(this)}linked(){let e=Se[Se.length-1]
if(!e)throw new Error("You can only call .linked() from within a task.")
return new je(this,xe,e)}unlinked(){return new je(this,ke,null)}toString(){return`<Task:${this.name}>`}_clone(){return new e({context:this.context,debug:this.debug,env:this.env,generatorFactory:this.generatorFactory,group:this.group,hasEnabledEvents:this.hasEnabledEvents,name:this.name,onStateCallback:this.onStateCallback,scheduler:this.scheduler})}_curry(...e){let t=this._clone()
return t._curryArgs=[...this._curryArgs||[],...e],t}_perform(...e){return this._performShared(e,ye,null)}_performShared(e,t,r){let n=this._curryArgs?[...this._curryArgs,...e]:e,a=this._taskInstanceFactory(n,t,r)
return t===xe&&(r._expectsLinkedYield=!0),this._isAlive||a.cancel(),this.scheduler.perform(a),a}_taskInstanceOptions(e,t,r){return{task:this,args:e,executor:new Ee({generatorFactory:()=>this.generatorFactory(e),env:this.env,debug:this.debug}),performType:t,hasEnabledEvents:this.hasEnabledEvents}}},Ce=class extends be{}
function Oe(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const ze={enqueue:(e,t)=>t&&e.setBufferPolicy($),evented:(e,t)=>t&&e.setEvented(t),debug:(e,t)=>t&&e.setDebug(t),drop:(e,t)=>t&&e.setBufferPolicy(F),group:(e,t)=>e.setGroup(t),keepLatest:(e,t)=>t&&e.setBufferPolicy(W),maxConcurrency:(e,t)=>e.setMaxConcurrency(t),onState:(e,t)=>e.setOnState(t),restartable:(e,t)=>t&&e.setBufferPolicy(V)}
function Me(e,t){if(ze[e])throw new Error(`A modifier with the name '${e}' has already been defined.`)
ze[e]=t}function Ae(e){return ze[e]}function Re(e){return e in ze}let Le=class{constructor(e="<unknown>",t=null,r={}){Oe(this,"env",c),Oe(this,"_debug",null),Oe(this,"_enabledModifiers",[]),Oe(this,"_hasSetConcurrencyConstraint",!1),Oe(this,"_hasSetBufferPolicy",!1),Oe(this,"_hasEnabledEvents",!1),Oe(this,"_maxConcurrency",null),Oe(this,"_onStateCallback",(e,t)=>t.setState(e)),Oe(this,"_schedulerPolicyClass",ce),Oe(this,"_taskGroupPath",null),this.name=e,this.taskDefinition=t,this.options=r,this._processModifierOptions(r)}createTask(e){let t=this.getTaskOptions(e)
return new Te(Object.assign({generatorFactory:t=>this.taskDefinition.apply(e,t)},t))}createTaskGroup(e){let t=this.getTaskOptions(e)
return new Ce(t)}getModifier(e){if(Re(e))return ze[e].bind(null,this)}getOptions(){return this.options}getScheduler(e,t){return new oe(e,t)}getTaskOptions(e){let t,r,n=this._onStateCallback
if(this._taskGroupPath){if(t=e[this._taskGroupPath],!(t instanceof Ce))throw new Error(`Expected group '${this._taskGroupPath}' to be defined but was not found.`)
r=t.scheduler}else{let e=new this._schedulerPolicyClass(this._maxConcurrency)
r=this.getScheduler(e,n&&"function"==typeof n)}return{context:e,debug:this._debug,env:this.env,name:this.name,group:t,scheduler:r,hasEnabledEvents:this._hasEnabledEvents,onStateCallback:n,enabledModifiers:this._enabledModifiers,modifierOptions:this.getOptions()}}setBufferPolicy(e){return function(e){if(e._hasSetBufferPolicy)throw new Error(`Cannot set multiple buffer policies on a task or task group. ${e._schedulerPolicyClass} has already been set for task or task group '${e.name}'`)}(this),this._hasSetBufferPolicy=!0,this._hasSetConcurrencyConstraint=!0,this._schedulerPolicyClass=e,function(e){if(e._hasSetConcurrencyConstraint&&e._taskGroupPath)throw new Error("Cannot use both 'group' and other concurrency-constraining task modifiers (e.g. 'drop', 'enqueue', 'restartable')")}(this),this}setDebug(e){return this._debug=e,this}setEvented(e){return this._hasEnabledEvents=e,this}setMaxConcurrency(e){return this._hasSetConcurrencyConstraint=!0,this._maxConcurrency=e,this}setGroup(e){return this._taskGroupPath=e,this}setName(e){return this.name=e,this}setOnState(e){return this._onStateCallback=e,this}setTaskDefinition(e){return this.taskDefinition=e,this}_processModifierOptions(e){if(e)for(let t of Object.keys(e)){let r=e[t],n=this.getModifier(t)
"function"==typeof n&&n(r)&&this._enabledModifiers.push(t)}}}
function Ie(e,t,r,n=[],a=Le){let s,{initializer:i,get:o,value:l}=r;(0,u.deprecate)("Using @task decorator (or any of its variants) is deprecated. Please use modern `taskName = task(async () => {})` syntax instead",!1,{id:"ember-concurrency.deprecate-decorator-task",for:"ember-concurrency",since:"4.0.5",until:"5.0.0"}),i?s=i.call(void 0):o?s=o.call(void 0):l&&(s=l),s.displayName=`${t} (task)`
let c=new WeakMap,d=new a(t,s,n[0]||{})
return d._setupEmberKVO(e),{get(){let e=c.get(this)
return e||(e=d.createTask(this),c.set(this,e)),e}}}function Ne(e,t,r,n=[],a=Le){let s=new WeakMap,i=new a(t,null,n[0]||{})
return{get(){let e=s.get(this)
return e||(e=i.createTaskGroup(this),s.set(this,e)),e}}}function De(e){return function(...t){return function(e){let[t,r,n]=e
return 3===e.length&&"object"==typeof t&&null!==t&&"string"==typeof r&&("object"==typeof n&&null!==n&&"enumerable"in n&&"configurable"in n||void 0===n)}(t)?e(...t):(...r)=>e(...r,t)}}function Fe(e,t={},r=Le){return De((n,a,s,[i]=[])=>{let o=Object.assign({},{...t,...i})
return e(n,a,s,[o],r)})}function Be(e={},t=Le){return Fe(Ie,e,t)}function $e(e={},t=Le){return Fe(Ne,e,t)}const He=De((e,t,r,[n]=[])=>{const{initializer:a}=r
return delete r.initializer,(0,u.deprecate)("@lastValue is deprecated is deprecated along with all ember-concurrency decorators. Please use a getter that references taskName.lastSuccessful.value instead.",!1,{id:"ember-concurrency.deprecate-decorator-last-value",for:"ember-concurrency",since:"4.0.5",until:"5.0.0"}),{get(){let e=this[n].lastSuccessful
return e?e.value:a?a.call(this):void 0}}})
var qe=r(4505),We=r(123)
class Ge extends oe{scheduleRefresh(){(0,n.once)(this,this.refresh)}}var Ue=r(2294),Ve=r(1130)
class Ye{constructor({task:e,args:t,executor:r,performType:n,hasEnabledEvents:a}){this.task=e,this.args=t,this.performType=n,this.executor=r,this.executor.taskInstance=this,this.hasEnabledEvents=a}setState(){}onStarted(){}onSuccess(){}onError(){}onCancel(){}formatCancelReason(){}selfCancelLoopWarning(){}onFinalize(e){this.executor.onFinalize(e)}proceed(e,t,r){this.executor.proceedChecked(e,t,r)}[h](e,t){return this.executor.onYielded(e,t)}cancel(e=".cancel() was explicitly called"){this.executor.cancel(new me(he,e))}then(...e){return this.executor.promise().then(...e)}catch(...e){return this.executor.promise().catch(...e)}finally(...e){return this.executor.promise().finally(...e)}toString(){return`${this.task} TaskInstance`}start(){return this.executor.start(),this}}Object.assign(Ye.prototype,we),Object.assign(Ye.prototype,{state:"waiting",isDropped:!1,isRunning:!0})
var Ke=r(473)
function Ze(e,t){return Object.keys(e).reduce((t,r)=>function(e,t,r){const n=Object.getOwnPropertyDescriptor(e,r)
n.initializer=n.initializer||(()=>e[r]),delete n.value
const a=(0,Ke.tracked)(t,r,n)
return t[r]=a,t}(e,t,r),t)}let Qe,Xe
Qe=Ze(ue,{}),Qe=Ze({numRunning:0,numQueued:0,isRunning:!1,isQueued:!1,isIdle:!0,state:"idle"},Qe),Xe=Ze(we,{}),Xe=Ze({state:"waiting",isDropped:!1,isRunning:!1},Xe),Object.freeze(Qe),Object.freeze(Xe)
class Je extends Ye{setState(e){let t=this._recomputeState(e)
Object.assign(this,{...e,isRunning:!e.isFinished,isDropped:"dropped"===t,state:t})}_recomputeState(e){return e.isDropped?"dropped":e.isCanceled?e.hasStarted?"canceled":"dropped":e.isFinished?"finished":e.hasStarted?"running":"waiting"}onStarted(){this.triggerEvent("started",this)}onSuccess(){this.triggerEvent("succeeded",this)}onError(e){this.triggerEvent("errored",this,e)}onCancel(e){this.triggerEvent("canceled",this,e)}formatCancelReason(e){return`TaskInstance '${this.getName()}' was canceled because ${e}. For more information, see: http://ember-concurrency.com/docs/task-cancelation-help`}getName(){return this.name||(this.name=this.task&&this.task.name||"<unknown>"),this.name}selfCancelLoopWarning(e){let t=`\`${e.getName()}\``,r=`\`${this.getName()}\``
console.warn(`ember-concurrency detected a potentially hazardous "self-cancel loop" between parent task ${t} and child task ${r}. If you want child task ${r} to be canceled when parent task ${t} is canceled, please change \`.perform()\` to \`.linked().perform()\`. If you want child task ${r} to keep running after parent task ${t} is canceled, change it to \`.unlinked().perform()\``)}triggerEvent(...e){if(!this.hasEnabledEvents)return
let t=this.task,r=t.context,n=t&&t.name
if(r&&r.trigger&&n){let[t,...a]=e
r.trigger(`${n}:${t}`,...a)}}}Xe&&Object.defineProperties(Je.prototype,Xe)
const et={_performCount:0,setState(e){this._performCount=this._performCount+(e.numPerformedInc||0)
let t=e.numRunning>0,r=e.numQueued>0,n=Object.assign({},e,{performCount:this._performCount,isRunning:t,isQueued:r,isIdle:!t&&!r,state:t?"running":"idle"})
Object.assign(this,n)},onState(e,t){t.onStateCallback&&t.onStateCallback(e,t)}}
class tt extends Te{constructor(e){super(e),(0,Ve.isDestroying)(this.context)||(0,Ve.registerDestructor)(this.context,()=>{this.cancelAll({reason:"the object it lives on was destroyed or unrendered",cancelRequestKind:fe})})}get _isAlive(){return!(0,Ve.isDestroying)(this.context)}_taskInstanceFactory(e,t,r){let n=this._taskInstanceOptions(e,t,r)
return new Je(n)}_clone(){return new tt({context:this.context,debug:this.debug,env:this.env,generatorFactory:this.generatorFactory,group:this.group,hasEnabledEvents:this.hasEnabledEvents,name:this.name,onStateCallback:this.onStateCallback,scheduler:this.scheduler})}}Qe&&Object.defineProperties(tt.prototype,Qe),Object.assign(tt.prototype,et)
const rt="__ec__encap_current_ti"
class nt extends tt{constructor(e){super(e),this.taskObj=e.taskObj,this._encapsulatedTaskStates=new WeakMap,this._encapsulatedTaskInstanceProxies=new WeakMap}_getEncapsulatedTaskClass(){let e=this._encapsulatedTaskImplClass
return e||(e=C().extend(this.taskObj,{unknownProperty(e){let t=this[rt]
return t?t[e]:void 0}})),e}_taskInstanceFactory(e,t){let r,n=(0,Ue.getOwner)(this.context),a=this._getEncapsulatedTaskClass().create({context:this.context});(0,Ue.setOwner)(a,n)
let s=new Je({task:this,args:e,executor:new Ee({generatorFactory:()=>a.perform.apply(r,e),env:this.env,debug:this.debug}),performType:t,hasEnabledEvents:this.hasEnabledEvents})
return a[rt]=s,this._encapsulatedTaskStates.set(s,a),r=this._wrappedEncapsulatedTaskInstance(s),r}_wrappedEncapsulatedTaskInstance(e){if(!e)return null
let t=this._encapsulatedTaskInstanceProxies,r=t.get(e)
if(!r){let n=this._encapsulatedTaskStates.get(e)
r=new Proxy(e,{get:(e,t)=>t in e?e[t]:(0,T.get)(n,t.toString()),set:(e,t,r)=>(t in e?e[t]=r:(0,T.set)(n,t.toString(),r),!0),has:(e,t)=>t in e||t in n,ownKeys:e=>Reflect.ownKeys(e).concat(Reflect.ownKeys(n)),defineProperty(r,a,s){let i=t.get(e)
return i&&(s.get?s.get=s.get.bind(i):i&&s.set&&(s.set=s.set.bind(i))),Reflect.defineProperty(n,a,s)},getOwnPropertyDescriptor:(e,t)=>t in e?Reflect.getOwnPropertyDescriptor(e,t):Reflect.getOwnPropertyDescriptor(n,t)}),t.set(e,r)}return r}}class at extends Ce{}Qe&&Object.defineProperties(at.prototype,Qe),Object.assign(at.prototype,et)
let st=0
function it(e,t,r,n,a,s){if(r&&r.length>0)for(let i=0;i<r.length;++i){let o=r[i],l="__ember_concurrency_handler_"+st++
t[l]=ot(n,a,s),e(t,o,null,l)}}function ot(e,t,r){return function(){let a=(0,T.get)(this,e)
r?(0,n.scheduleOnce)("actions",a,t,...arguments):a[t].apply(a,arguments)}}const lt=e=>Array.isArray(e)?e:[e]
Me("cancelOn",(e,t)=>e.addCancelEvents(...lt(t))),Me("observes",(e,t)=>e.addObserverKeys(...lt(t))),Me("on",(e,t)=>e.addPerformEvents(...lt(t)))
class ct extends Le{constructor(...e){var t,r,n
super(...e),t=this,n=d,(r=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(r="env"))in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n}createTask(e){(0,u.assert)("Cannot create task if a task definition is not provided as generator function or encapsulated task.",this.taskDefinition)
let t=this.getTaskOptions(e)
return"object"==typeof this.taskDefinition?new nt(Object.assign({taskObj:this.taskDefinition},t)):new tt(Object.assign({generatorFactory:t=>this.taskDefinition.apply(e,t)},t))}createTaskGroup(e){(0,u.assert)("A task definition is not expected for a task group.",!this.taskDefinition),(0,u.deprecate)("Task Groups are deprecated. There is no direct replacement for Task Groups and some refactoring may be necessary.",!1,{id:"ember-concurrency.deprecate-task-group",for:"ember-concurrency",since:"4.0.5",until:"5.0.0"})
let t=this.getTaskOptions(e)
return new at(t)}addCancelEvents(...e){return this._cancelEventNames=this._cancelEventNames||[],this._cancelEventNames.push(...e),this}addObserverKeys(...e){return this._observes=this._observes||[],this._observes.push(...e),this}addPerformEvents(...e){return this._eventNames=this._eventNames||[],this._eventNames.push(...e),this}getModifier(e){let t=super.getModifier(e)
return t||"function"!=typeof Z.prototype[e]||(t=Z.prototype[e].bind(this)),(0,u.assert)(`Task option '${e}' is not recognized as a supported option.`,t),t}getScheduler(e,t){return new Ge(e,t)}_setupEmberKVO(e){it(qe.addListener,e,this._eventNames,this.name,"perform",!1),it(qe.addListener,e,this._cancelEventNames,this.name,"cancelAll",!1),it(We.addObserver,e,this._observes,this.name,"perform",!0)}get taskFn(){return this.taskDefinition}set taskFn(e){this.setTaskDefinition(e)}}const ut=He,dt=Be({},ct),pt=Be({drop:!0},ct),ht=Be({enqueue:!0},ct),ft=Be({keepLatest:!0},ct),mt=Be({restartable:!0},ct),gt=$e({},ct),bt=$e({drop:!0},ct),_t=$e({enqueue:!0},ct),vt=$e({keepLatest:!0},ct),wt=$e({restartable:!0},ct)
function yt(e,t,r){var n
return(0,u.assert)('It appears you\'re attempting to use the new task(async () => { ... }) syntax, but the async arrow task function you\'ve provided is not being properly compiled by Babel.\n\nPossible causes / remedies:\n\n1. You must pass the async function expression directly to the task() function (it is not currently supported to pass in a variable containing the async arrow fn, or any other kind of indirection)\n2. The new task syntax is only supported by native classes. Ensure that this is one.\n3. If this code is in an addon, please ensure the addon specifies ember-concurrency "2.3.0" or higher in "dependencies" (not "devDependencies")\n4. Ensure that there is only one version of ember-concurrency v2.3.0+ being used in your project (including nested dependencies) and consider using npm/yarn/pnpm resolutions to enforce a single version is used\n5. Ensure that you have registered the Babel transform that Ember Concurrency uses to transform tasks in the "async-arrow" notation, see https://ember-concurrency.com/docs/v4-upgrade',!((n=arguments[arguments.length-1])&&n.constructor&&"AsyncFunction"===n.constructor.name)),xt(e)||t&&r?dt(...arguments):function(e){const t=J(function(){return t[Y].setTaskDefinition(t.taskFn),t[Y].createTask(this)})
return(0,u.deprecate)("Using task() in any form other than `taskName = task(async () => {})` is deprecated. Please use the modern syntax instead (and consider using one of ember-concurrency's codemods).",!1,{id:"ember-concurrency.deprecate-classic-task-api",for:"ember-concurrency",since:"4.0.5",until:"5.0.0"}),t.taskFn=e,t[Y]=new ct,Object.setPrototypeOf(t,Z.prototype),t}(e)}function kt(e,t,r){if(xt(e)||t&&r)return gt(...arguments)
{let e=J(function(t){return e[Y].setName(t),e[Y].createTaskGroup(this)})
return e[Y]=new ct,Object.setPrototypeOf(e,Q.prototype),e}}function xt(e){return!(!e||"function"==typeof e||"object"==typeof e&&"perform"in e&&"function"==typeof e.perform||Object.getPrototypeOf(e)!==Object.prototype)}const Pt=Mt(o().Promise,"all",Ct),St=Mt(o(),"allSettled",Ct),Et=Mt(i.Promise,"race",Ct),jt=Mt(o(),"hash",Ot),Tt=Mt(o(),"hashSettled",Ot)
function Ct(e){return e}function Ot(e){return Object.keys(e).map(t=>e[t])}function zt(e){if(e)if(e instanceof Je)e.executor.asyncErrorsHandled=!0
else if(e instanceof v)return e._toPromise()
return e}function Mt(e,t,r){return function(n){let a=function(e,t){if(Array.isArray(e))return e.map(t)
if("object"==typeof e&&null!==e){let r={}
return Object.keys(e).forEach(n=>{r[n]=t(e[n])}),r}return e}(n,zt),s=r(a);(0,u.assert)(`'${t}' expects an array.`,Array.isArray(s))
let i=o().defer()
e[t](a).then(i.resolve,i.reject)
let l=!1,c=()=>{l||(l=!0,s.forEach(e=>{e&&(e instanceof Je?e.cancel():"function"==typeof e[p]&&e[p]())}))},d=i.promise.finally(c)
return d[p]=c,d}}class At extends S{constructor(e){super(),this.queueName=e}onYield(e){let t
try{t=(0,n.schedule)(this.queueName,()=>e.next())}catch(t){e.throw(t)}return()=>(0,n.cancel)(t)}}class Rt extends S{constructor(e,t){super(),this.object=e,this.eventName=t,this.usesDOMEvents=!1}on(e){"function"==typeof this.object.addEventListener?(this.usesDOMEvents=!0,this.object.addEventListener(this.eventName,e)):this.object.on(this.eventName,e)}off(e){this.usesDOMEvents?this.object.removeEventListener(this.eventName,e):this.object.off(this.eventName,e)}onYield(e){let t=null,r=()=>{t&&this.off(t),t=null}
return t=t=>{r(),e.next(t)},this.on(t),r}}class Lt extends S{constructor(e,t,r=Boolean){super(),this.object=e,this.key=t,(0,u.deprecate)("waitForProperty is deprecated due to its use of observers. Consider using a polling approach instead.",!1,{id:"ember-concurrency.deprecate-wait-for-property",for:"ember-concurrency",since:"4.0.5",until:"5.0.0"}),this.predicateCallback="function"==typeof r?r:e=>e===r}onYield(e){let t=!1,r=()=>{let t=(0,T.get)(this.object,this.key)
if(this.predicateCallback(t))return e.next(t),!0}
return r()||((0,We.addObserver)(this.object,this.key,null,r),t=!0),()=>{t&&r&&(0,We.removeObserver)(this.object,this.key,null,r)}}}function It(e){return new At(e)}function Nt(e,t){var r
return(0,u.assert)(`${e} must include Ember.Evented (or support \`.on()\` and \`.off()\`) or DOM EventTarget (or support \`addEventListener\` and  \`removeEventListener\`) to be able to use \`waitForEvent\``,(r=e)&&("function"==typeof r.one&&"function"==typeof r.off||"function"==typeof r.on&&"function"==typeof r.off||"function"==typeof r.addEventListener&&"function"==typeof r.removeEventListener)),new Rt(e,t)}function Dt(e,t,r){return new Lt(e,t,r)}},8784:(e,t,r)=>{"use strict"
function n(e,t,r){return(t="symbol"==typeof(n=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?n:String(n))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e
var n}function a(e,t,r,n){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(n):void 0})}function s(e,t,r,n,a){var s={}
return Object.keys(n).forEach(function(e){s[e]=n[e]}),s.enumerable=!!s.enumerable,s.configurable=!!s.configurable,("value"in s||s.initializer)&&(s.writable=!0),s=r.slice().reverse().reduce(function(r,n){return n(e,t,r)||r},s),a&&void 0!==s.initializer&&(s.value=s.initializer?s.initializer.call(a):void 0,s.initializer=void 0),void 0===s.initializer&&(Object.defineProperty(e,t,s),s=null),s}r.d(t,{_:()=>s,a:()=>a,b:()=>n})},9054:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>o})
var n=r(336),a=r.n(n),s=r(1603)
function i(e,t,r){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var r=t.call(e,"string")
if("object"!=typeof r)return r
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class o extends(a()){constructor(...e){super(...e),i(this,"callback",void 0),i(this,"named",void 0),i(this,"positional",void 0)}compute(e,t){const[r,...n]=e;(0,s.assert)(`\`{{will-destroy-helper}}\` expects a function as the first parameter. You provided: ${r}`,"function"==typeof r),this.callback=r,this.named=t,this.positional=n}willDestroy(){this.callback&&this.positional&&this.named&&this.callback(this.positional,this.named),super.willDestroy()}}},9128:(e,t,r)=>{"use strict"
r.d(t,{A:()=>a})
var n=r(1389)
function a(e){return"object"==typeof e&&e&&"isTruthy"in e&&"boolean"==typeof e.isTruthy?e.isTruthy:(0,n.isArray)(e)?0!==e.length:!!e}},9373:(e,t,r)=>{"use strict"
function n(e,t){return e===t}r.r(t),r.d(t,{default:()=>n})},9601:(e,t,r)=>{"use strict"
function n(e,t){let r=e.load(t)
if(!r)throw new Error(t+" must export an initializer.")
let n=r.default
if(!n)throw new Error(t+" must have a default export")
return n.name||(n.name=t.slice(t.lastIndexOf("/")+1)),n}function a(e,t,r){var a=t+"/initializers/",s=t+"/instance-initializers/",i=[],o=[]
let l
l=r?{names:()=>Object.keys(r),load:e=>r[e]}:{names(){let e=globalThis.requirejs
if(!e||!e._eak_seen)throw new Error("No global AMD loader found. To use loadInitializers without a global AMD loader you must provide explicit modules")
return Object.keys(e._eak_seen)},load:e=>globalThis.require(e,null,null,!0)}
for(let n of l.names())n.startsWith(a)&&!n.endsWith("-test")?i.push(n):n.startsWith(s)&&!n.endsWith("-test")&&o.push(n)
!function(e,t,r){for(let a of r)e.initializer(n(t,a))}(e,l,i),function(e,t,r){for(let a of r)e.instanceInitializer(n(t,a))}(e,l,o)}r.r(t),r.d(t,{default:()=>a})},9970:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>i})
var n=r(336),a=r.n(n),s=r(9128)
class i extends(a()){compute(e){for(let t=0,r=e.length;t<r;t++)if(!1===(0,s.A)(e[t]))return e[t]
return e[e.length-1]}}}}])
