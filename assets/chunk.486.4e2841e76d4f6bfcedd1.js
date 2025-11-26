"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[486],{1180:(e,t,n)=>{n(1603),function(){const e="TEST_WAITERS",t="undefined"!=typeof Symbol?Symbol.for(e):e,n=function(){if("undefined"!=typeof globalThis)return globalThis
if("undefined"!=typeof self)return self
if("undefined"!=typeof window)return window
throw new Error("unable to locate global object")}()
let r=n[t]
void 0===r&&(r=n[t]=new Map)}()
class r{constructor(e){var t,n,r
t=this,r=void 0,(n=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var n=t.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(n="name"))in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,this.name=e}beginAsync(){return this}endAsync(){}waitUntil(){return!0}debugInfo(){return[]}reset(){}}function o(e){return new r(e)}o("@ember/test-waiters:promise-waiter"),o("@ember/test-waiters:generator-waiter")},1476:(e,t,n)=>{n(1223),n(9728),n(1180)},4532:(e,t,n)=>{function r(e){return null!==e&&"object"==typeof e&&Reflect.get(e,"nodeType")===Node.ELEMENT_NODE}function o(e){return null!==e&&"object"==typeof e&&Reflect.get(e,"nodeType")===Node.DOCUMENT_NODE}n.d(t,{vq:()=>r,wz:()=>o})},5131:(e,t,n)=>{new WeakMap},5486:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i})
var r=n(6449),o=n(4532)
function i(){const e=(0,r.g)()
if(!e||!(0,r.i)(e)||!e.owner)throw new Error("Must setup rendering context before attempting to interact with elements.")
const t=e.owner
let n
if(n=t&&void 0===t._emberTestHelpersMockOwner?t.rootElement:"#ember-testing",n instanceof Window&&(n=n.document),(0,o.vq)(n)||(0,o.wz)(n))return n
if("string"==typeof n){const e=document.querySelector(n)
if(e)return e
throw new Error(`Application.rootElement (${n}) not found`)}throw new Error("Application.rootElement must be an element or a selector string")}},6449:(e,t,n)=>{n.d(t,{g:()=>g,i:()=>f}),n(1223)
var r=n(4471),o=n.n(r),i=(n(2294),n(4540),n(9311),n(9132))
o().extend(i.RegistryProxyMixin,i.ContainerProxyMixin,{_emberTestHelpersMockOwner:!0,unregister(e){this.__container__.reset(e),this.__registry__.unregister(e)}})
var a=n(8234),s=(n(2394),n(1704),n(1603)),l=n(6098)
n(8675),n(5131)
const u=new WeakMap
if("undefined"!=typeof URLSearchParams){const e=new URLSearchParams(document.location.search.substring(1)),t=e.get("disabledDeprecations"),n=e.get("debugDeprecations")
t&&(0,s.registerDeprecationHandler)((e,n,r)=>{n&&t.includes(n.id)||r.apply(null,[e,n])}),n&&(0,s.registerDeprecationHandler)((e,t,r)=>{t&&n.includes(t.id),r.apply(null,[e,t])})}const c=new WeakMap
if("undefined"!=typeof URLSearchParams){const e=new URLSearchParams(document.location.search.substring(1)),t=e.get("disabledWarnings"),n=e.get("debugWarnings")
t&&(0,s.registerWarnHandler)((e,n,r)=>{n&&t.includes(n.id)||r.apply(null,[e,n])}),n&&(0,s.registerWarnHandler)((e,t,r)=>{t&&n.includes(t.id),r.apply(null,[e,t])})}var p=n(2682)
function f(e){const t=e
return"function"==typeof t.pauseTest&&"function"==typeof t.resumeTest}function d(e){return e&&e.Math===Math&&e}n(9168),n(1180),n(1476),(0,p.A)(3,6),new WeakMap,new WeakMap,(0,p.A)(2,13),a.Test.checkWaiters,new Map,(0,s.registerDeprecationHandler)((e,t,n)=>{const r=g()
void 0!==r?(function(e){if(!e)throw new TypeError(`[@ember/test-helpers] could not get deprecations for an invalid test context: '${e}'`)
let t=u.get(e)
return Array.isArray(t)||(t=[],u.set(e,t)),t}(r).push({message:e,options:t}),n.apply(null,[e,t])):n.apply(null,[e,t])}),(0,s.registerWarnHandler)((e,t,n)=>{const r=g()
void 0!==r?(function(e){if(!e)throw new TypeError(`[@ember/test-helpers] could not get warnings for an invalid test context: '${e}'`)
let t=c.get(e)
return Array.isArray(t)||(t=[],c.set(e,t)),t}(r).push({message:e,options:t}),n.apply(null,[e,t])):n.apply(null,[e,t])})
const w=d("object"==typeof globalThis&&globalThis)||d("object"==typeof window&&window)||d("object"==typeof self&&self)||d("object"==typeof l.A&&l.A)
function g(){return w.__test_context__}},8675:(e,t,n)=>{n(2294)},9168:(e,t,n)=>{new Map},9728:(e,t,n)=>{new Set}}])
