/*! For license information please see chunk.418.7fc2bb6aed67f26b3066.js.LICENSE.txt */
(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[418],{7695:(e,t,n)=>{var r
e=n.nmd(e),function(){"use strict"
function i(e,t){(null==t||t>e.length)&&(t=e.length)
for(var n=0,r=Array(t);n<t;n++)r[n]=e[n]
return r}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,c(r.key),r)}}function a(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]
if(null!=n){var r,i,s,o,a=[],u=!0,l=!1
try{if(s=(n=n.call(e)).next,0===t){if(Object(n)!==n)return
u=!1}else for(;!(u=(r=s.call(n)).done)&&(a.push(r.value),a.length!==t);u=!0);}catch(e){l=!0,i=e}finally{try{if(!u&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return a}}(e,t)||d(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||d(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var n=t.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function d(e,t){if(e){if("string"==typeof e)return i(e,t)
var n={}.toString.call(e).slice(8,-1)
return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}var h=function(){if("undefined"!=typeof globalThis)return globalThis
if("undefined"!=typeof self)return self
if(void 0!==b)return b
if("undefined"!=typeof global)return global
throw new Error("Unable to locate global object")}(),p=h.console,g=h.setTimeout,m=h.clearTimeout,v=h.process,b=h.window,y=b&&b.document,k=b&&b.navigator,w=function(){var e="qunit-test-string"
try{return h.sessionStorage.setItem(e,e),h.sessionStorage.removeItem(e),h.sessionStorage}catch(e){return}}(),x="function"==typeof h.Map&&"function"==typeof h.Map.prototype.keys&&"function"==typeof h.Symbol&&"symbol"===f(h.Symbol.iterator)?h.Map:function(e){var t=this,n=Object.create(null),r=Object.prototype.hasOwnProperty
this.has=function(e){return r.call(n,e)},this.get=function(e){return n[e]},this.set=function(e,t){return r.call(n,e)||this.size++,n[e]=t,this},this.delete=function(e){r.call(n,e)&&(delete n[e],this.size--)},this.forEach=function(e){for(var t in n)e(n[t],t)},this.keys=function(){return Object.keys(n)},this.clear=function(){n=Object.create(null),this.size=0},this.size=0,e&&e.forEach((function(e,n){t.set(n,e)}))},E="function"==typeof h.Set&&"function"==typeof h.Set.prototype.values?h.Set:function(e){var t=Object.create(null)
return Array.isArray(e)&&e.forEach((function(e){t[e]=!0})),{add:function(e){t[e]=!0},has:function(e){return e in t},get size(){return Object.keys(t).length}}},T=Object.prototype.toString,C=Object.prototype.hasOwnProperty,_={now:b&&b.performance&&b.performance.now?b.performance.now.bind(b.performance):Date.now}
function S(e,t){return e.filter((function(e){return-1===t.indexOf(e)}))}var q=Array.prototype.includes?function(e,t){return t.includes(e)}:function(e,t){return-1!==t.indexOf(e)}
function j(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=t&&I("array",e)?[]:{}
for(var r in e)if(C.call(e,r)){var i=e[r]
n[r]=i===Object(i)?j(i,t):i}return n}function N(e,t){if(e!==Object(e))return e
var n={}
for(var r in t)C.call(t,r)&&C.call(e,r)&&(n[r]=N(e[r],t[r]))
return n}function M(e,t,n){for(var r in t)C.call(t,r)&&(void 0===t[r]?delete e[r]:n&&void 0!==e[r]||(e[r]=t[r]))
return e}function R(e){if(void 0===e)return"undefined"
if(null===e)return"null"
var t=T.call(e).match(/^\[object\s(.*)\]$/),n=t&&t[1]
switch(n){case"Number":return isNaN(e)?"nan":"number"
case"String":case"Boolean":case"Array":case"Set":case"Map":case"Date":case"RegExp":case"Function":case"Symbol":return n.toLowerCase()
default:return f(e)}}function I(e,t){return R(t)===e}function O(e,t){for(var n=e+""+t,r=0,i=0;i<n.length;i++)r=(r<<5)-r+n.charCodeAt(i),r|=0
var s=(4294967296+r).toString(16)
return s.length<8&&(s="0000000"+s),s.slice(-8)}function A(e){var t=String(e)
return"[object"===t.slice(0,7)?(e.name||"Error")+(e.message?": ".concat(e.message):""):t}function D(e){return e?(""+e).replace(/['"<>&]/g,(function(e){switch(e){case"'":return"&#039;"
case'"':return"&quot;"
case"<":return"&lt;"
case">":return"&gt;"
case"&":return"&amp;"}})):""}var L=new E(["boolean","number","string"]),U=[]
function Q(e,t){return e===t}function F(e,t){return e===t||e.valueOf()===t.valueOf()}function P(e){var t=Object.getPrototypeOf(e)
return t&&null!==t.constructor?e.constructor:Object}function H(e){return"flags"in e?e.flags:e.toString().match(/[gimuy]*$/)[0]}var B={undefined:Q,null:Q,boolean:F,number:function(e,t){return e===t||e.valueOf()===t.valueOf()||isNaN(e.valueOf())&&isNaN(t.valueOf())},string:F,symbol:Q,date:F,nan:function(){return!0},regexp:function(e,t){return e.source===t.source&&H(e)===H(t)},function:Q,array:function(e,t){if(e.length!==t.length)return!1
for(var n=0;n<e.length;n++)if(!$(e[n],t[n]))return!1
return!0},set:function(e,t){if(e.size!==t.size)return!1
var n=!0
return e.forEach((function(e){if(n){var r=!1
t.forEach((function(t){if(!r){var n=U
U=[],$(t,e)&&(r=!0),U=n}})),r||(n=!1)}})),n},map:function(e,t){if(e.size!==t.size)return!1
var n=!0
return e.forEach((function(e,r){if(n){var i=!1
t.forEach((function(t,n){if(!i){var s=U
U=[],B.array([t,n],[e,r])&&(i=!0),U=s}})),i||(n=!1)}})),n}},z={undefined:Q,null:Q,boolean:Q,number:function(e,t){return e===t||isNaN(e)&&isNaN(t)},string:Q,symbol:Q,function:Q,object:function(e,t){if(U.some((function(n){return n.a===e&&n.b===t})))return!0
U.push({a:e,b:t})
var n=R(e),r=R(t)
if("object"!==n||"object"!==r)return n===r&&B[n](e,t)
if(!1===function(e,t){return P(e)===P(t)}(e,t))return!1
var i=[],s=[]
for(var o in e)if(i.push(o),(e.constructor===Object||void 0===e.constructor||"function"!=typeof e[o]||"function"!=typeof t[o]||e[o].toString()!==t[o].toString())&&!$(e[o],t[o]))return!1
for(var a in t)s.push(a)
return B.array(i.sort(),s.sort())}}
function $(e,t){if(e===t)return!0
var n=f(e),r=f(t)
return n!==r?("object"===n&&L.has(R(e))?e.valueOf():e)===("object"===r&&L.has(R(t))?t.valueOf():t):z[n](e,t)}function G(e,t){var n=$(e,t)
return U=[],n}function Y(e,t){if(2===arguments.length)return e===t||G(e,t)
for(var n=arguments.length-1;n>0;){if(!G(arguments[n-1],arguments[n]))return!1
n--}return!0}var W={altertitle:!0,collapse:!0,countStepsAsOne:!1,failOnZeroTests:!0,filter:void 0,maxDepth:5,module:void 0,moduleId:void 0,reorder:!0,reporters:{},requireExpects:!1,scrolltop:!0,storage:w,testId:void 0,urlConfig:[],currentModule:{name:"",tests:[],childModules:[],testsRun:0,testsIgnored:0,hooks:{before:[],beforeEach:[],afterEach:[],after:[]}},globalHooks:{},pq:null,_event_listeners:Object.create(null),_event_memory:{},_deprecated_timeout_shown:!1,_deprecated_countEachStep_shown:!1,blocking:!0,callbacks:{},modules:[],queue:[],stats:{all:0,bad:0,testCount:0}}
function J(e,t){("boolean"==typeof e||"string"==typeof e&&""!==e)&&(W[t]=!0===e||"true"===e)}function V(e,t){("number"==typeof e||"string"==typeof e&&/^[0-9]+$/.test(e))&&(W[t]=+e)}function Z(e,t){"string"==typeof e&&""!==e&&(W[t]=e)}function K(e,t){"string"==typeof e&&""!==e&&(W[t]=[e])}function X(e){J(e.qunit_config_altertitle,"altertitle"),J(e.qunit_config_autostart,"autostart"),J(e.qunit_config_collapse,"collapse"),J(e.qunit_config_failonzerotests,"failOnZeroTests"),Z(e.qunit_config_filter,"filter"),Z(e.qunit_config_fixture,"fixture"),J(e.qunit_config_hidepassed,"hidepassed"),V(e.qunit_config_maxdepth,"maxDepth"),Z(e.qunit_config_module,"module"),K(e.qunit_config_moduleid,"moduleId"),J(e.qunit_config_noglobals,"noglobals"),J(e.qunit_config_notrycatch,"notrycatch"),J(e.qunit_config_reorder,"reorder"),J(e.qunit_config_requireexpects,"requireExpects"),J(e.qunit_config_scrolltop,"scrolltop"),function(e){("boolean"==typeof e||"string"==typeof e&&""!==e)&&(W.seed=e)}(e.qunit_config_seed),K(e.qunit_config_testid,"testId"),V(e.qunit_config_testtimeout,"testTimeout")
var t={qunit_config_reporters_console:"console",qunit_config_reporters_tap:"tap"}
for(var n in t){var r=e[n]
if("boolean"==typeof r||"string"==typeof r&&""!==r){var i=t[n]
W.reporters[i]=!0===r||"true"===r||"1"===r}}}v&&"env"in v&&X(v.env),X(h)
var ee=h&&h.QUnit&&!h.QUnit.version&&h.QUnit.config
ee&&M(W,ee),W.modules.push(W.currentModule),"true"!==W.seed&&!0!==W.seed||(W.seed=(Math.random().toString(36)+"0000000000").slice(2,12))
var te=function(){function e(e){return'"'+e.toString().replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'}function t(e){return e+""}function n(e,t,n){var r=s.separator(),i=s.indent(1)
return t.join&&(t=t.join(","+r+i)),t?[e,i+t,s.indent()+n].join(r):e+n}function r(e,t){if(s.maxDepth&&s.depth>s.maxDepth)return"[object Array]"
this.up()
for(var r=e.length,i=new Array(r);r--;)i[r]=this.parse(e[r],void 0,t)
return this.down(),n("[",i,"]")}var i=/^function (\w+)/,s={parse:function(e,t,n){var r=(n=n||[]).indexOf(e)
if(-1!==r)return"recursion(".concat(r-n.length,")")
t=t||this.typeOf(e)
var i=this.parsers[t],s=f(i)
if("function"===s){n.push(e)
var o=i.call(this,e,n)
return n.pop(),o}return"string"===s?i:"[ERROR: Missing QUnit.dump formatter for type "+t+"]"},typeOf:function(e){var t
return t=null===e?"null":void 0===e?"undefined":I("regexp",e)?"regexp":I("date",e)?"date":I("function",e)?"function":void 0!==e.setInterval&&void 0!==e.document&&void 0===e.nodeType?"window":9===e.nodeType?"document":e.nodeType?"node":function(e){return"[object Array]"===T.call(e)||"number"==typeof e.length&&void 0!==e.item&&(e.length?e.item(0)===e[0]:null===e.item(0)&&void 0===e[0])}(e)?"array":e.constructor===Error.prototype.constructor?"error":f(e),t},separator:function(){return this.multiline?this.HTML?"<br />":"\n":this.HTML?"&#160;":" "},indent:function(e){if(!this.multiline)return""
var t=this.indentChar
return this.HTML&&(t=t.replace(/\t/g,"   ").replace(/ /g,"&#160;")),new Array(this.depth+(e||0)).join(t)},up:function(e){this.depth+=e||1},down:function(e){this.depth-=e||1},setParser:function(e,t){this.parsers[e]=t},quote:e,literal:t,join:n,depth:1,maxDepth:W.maxDepth,parsers:{window:"[Window]",document:"[Document]",error:function(e){return'Error("'+e.message+'")'},unknown:"[Unknown]",null:"null",undefined:"undefined",function:function(e){var t="function",r="name"in e?e.name:(i.exec(e)||[])[1]
return r&&(t+=" "+r),n(t=[t+="(",s.parse(e,"functionArgs"),"){"].join(""),s.parse(e,"functionCode"),"}")},array:r,nodelist:r,arguments:r,object:function(e,t){var r=[]
if(s.maxDepth&&s.depth>s.maxDepth)return"[object Object]"
s.up()
var i=[]
for(var o in e)i.push(o)
var a=["message","name"]
for(var u in a){var l=a[u]
l in e&&!q(l,i)&&i.push(l)}i.sort()
for(var c=0;c<i.length;c++){var f=i[c],d=e[f]
r.push(s.parse(f,"key")+": "+s.parse(d,void 0,t))}return s.down(),n("{",r,"}")},node:function(e){var t=s.HTML?"&lt;":"<",n=s.HTML?"&gt;":">",r=e.nodeName.toLowerCase(),i=t+r,o=e.attributes
if(o)for(var a=0;a<o.length;a++){var u=o[a].nodeValue
u&&"inherit"!==u&&(i+=" "+o[a].nodeName+"="+s.parse(u,"attribute"))}return i+=n,3!==e.nodeType&&4!==e.nodeType||(i+=e.nodeValue),i+t+"/"+r+n},functionArgs:function(e){var t=e.length
if(!t)return""
for(var n=new Array(t);t--;)n[t]=String.fromCharCode(97+t)
return" "+n.join(", ")+" "},key:e,functionCode:"[code]",attribute:e,string:e,date:e,regexp:t,number:t,boolean:t,symbol:function(e){return e.toString()}},HTML:!1,indentChar:"  ",multiline:!0}
return s}(),ne={warn:p?Function.prototype.bind.call(p.warn||p.log,p):function(){}},re=a((function e(t,n){s(this,e),this.name=t,this.fullName=n?n.fullName.concat(t):[],this.globalFailureCount=0,this.tests=[],this.childSuites=[],n&&n.pushChildSuite(this)}),[{key:"start",value:function(e){return e&&(this._startTime=_.now()),{name:this.name,fullName:this.fullName.slice(),tests:this.tests.map((function(e){return e.start()})),childSuites:this.childSuites.map((function(e){return e.start()})),testCounts:{total:this.getTestCounts().total}}}},{key:"end",value:function(e){return e&&(this._endTime=_.now()),{name:this.name,fullName:this.fullName.slice(),tests:this.tests.map((function(e){return e.end()})),childSuites:this.childSuites.map((function(e){return e.end()})),testCounts:this.getTestCounts(),runtime:this.getRuntime(),status:this.getStatus()}}},{key:"pushChildSuite",value:function(e){this.childSuites.push(e)}},{key:"pushTest",value:function(e){this.tests.push(e)}},{key:"getRuntime",value:function(){return Math.round(this._endTime-this._startTime)}},{key:"getTestCounts",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{passed:0,failed:0,skipped:0,todo:0,total:0}
return e.failed+=this.globalFailureCount,e.total+=this.globalFailureCount,e=this.tests.reduce((function(e,t){return t.valid&&(e[t.getStatus()]++,e.total++),e}),e),this.childSuites.reduce((function(e,t){return t.getTestCounts(e)}),e)}},{key:"getStatus",value:function(){var e=this.getTestCounts(),t=e.total,n=e.failed,r=e.skipped,i=e.todo
return n?"failed":r===t?"skipped":i===t?"todo":"passed"}}]),ie=[],se=new re
function oe(e,t,n){var r=t[n]
"function"==typeof r&&e[n].push(r),delete t[n]}function ae(e,t){return function(n){W.currentModule!==e&&ne.warn("The `"+t+"` hook was called inside the wrong module (`"+W.currentModule.name+"`). Instead, use hooks provided by the callback to the containing module (`"+e.name+"`). This will become an error in QUnit 3.0."),e.hooks[t].push(n)}}function ue(e,t,n){"function"==typeof t&&(n=t,t=void 0)
var r=function(e,t,n){var r=ie.length?ie.slice(-1)[0]:null,i=null!==r?[r.name,e].join(" > "):e,s=r?r.suiteReport:se,o=null!==r&&r.skip||n.skip,a=null!==r&&r.todo||n.todo,u={}
r&&M(u,r.testEnvironment),M(u,t)
var l={name:i,parentModule:r,hooks:{before:[],beforeEach:[],afterEach:[],after:[]},testEnvironment:u,tests:[],moduleId:O(i),testsRun:0,testsIgnored:0,childModules:[],suiteReport:new re(e,s),stats:null,skip:o,todo:!o&&a,ignored:n.ignored||!1}
return r&&r.childModules.push(l),W.modules.push(l),l}(e,t,arguments.length>3&&void 0!==arguments[3]?arguments[3]:{}),i=r.testEnvironment,s=r.hooks
oe(s,i,"before"),oe(s,i,"beforeEach"),oe(s,i,"afterEach"),oe(s,i,"after")
var o={before:ae(r,"before"),beforeEach:ae(r,"beforeEach"),afterEach:ae(r,"afterEach"),after:ae(r,"after")},a=W.currentModule
if(W.currentModule=r,"function"==typeof n){ie.push(r)
try{var u=n.call(r.testEnvironment,o)
u&&"function"==typeof u.then&&ne.warn("Returning a promise from a module callback is not supported. Instead, use hooks for async behavior. This will become an error in QUnit 3.0.")}finally{ie.pop(),W.currentModule=r.parentModule||a}}}var le=!1
function ce(e,t,n){var r,i=le&&(r=W.modules.filter((function(e){return!e.ignored})).map((function(e){return e.moduleId})),!ie.some((function(e){return r.includes(e.moduleId)})))
ue(e,t,n,{ignored:i})}ce.only=function(){le||(W.modules.length=0,W.queue.length=0,W.currentModule.ignored=!0),le=!0,ue.apply(void 0,arguments)},ce.skip=function(e,t,n){le||ue(e,t,n,{skip:!0})},ce.if=function(e,t,n,r){le||ue(e,n,r,{skip:!t})},ce.todo=function(e,t,n){le||ue(e,t,n,{todo:!0})}
var fe=function(){var e=new Error
if(!e.stack)try{throw e}catch(t){e=t}return(e.stack||"").replace(/^error$\n/im,"").split("\n")[0].replace(/(:\d+)+\)?/g,"").replace(/.+[/\\]/,"")}()
function de(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=e.split("\n"),i=[]
n&&-1!==n.indexOf(r[0])&&i.push(r.shift())
for(var s=!0,o=0;o<r.length;o++){var a=r[o],u=fe&&-1!==a.indexOf(fe)||-1!==a.indexOf("node:internal/")||a.match(/^\s+at .+\(internal[^)]*\)$/)||a.match(/^\s+at .+\([a-z]+\.js[:\d]*\)$/)
u||(s=!1),s||i.push(u?t(a):a)}return i.join("\n")}function he(e,t){if(t=void 0===t?4:t,e&&e.stack){var n=e.stack.split("\n")
if(/^error$/i.test(n[0])&&n.shift(),fe){for(var r=[],i=t;i<n.length&&-1===n[i].indexOf(fe);i++)r.push(n[i])
if(r.length)return r.join("\n")}return n[t]}}function pe(e){var t=new Error
if(!t.stack)try{throw t}catch(e){t=e}return he(t,e)}var ge=function(){function e(t){s(this,e),this.test=t}return a(e,[{key:"timeout",value:function(e){if("number"!=typeof e)throw new Error("You must pass a number as the duration to assert.timeout")
this.test.timeout=e,W.timeout&&(m(W.timeout),W.timeout=null,W.timeoutHandler&&this.test.timeout>0&&this.test.internalResetTimeout(this.test.timeout))}},{key:"step",value:function(e){var t=e,n=!!e
this.test.steps.push(e),void 0===e||""===e?t="You must provide a message to assert.step":"string"!=typeof e&&(t="You must provide a string value to assert.step",n=!1),this.pushResult({result:n,message:t})}},{key:"verifySteps",value:function(e,t){var n=this.test.steps.slice()
this.deepEqual(n,e,t),this.test.stepsCount+=this.test.steps.length,this.test.steps.length=0}},{key:"expect",value:function(e){if(1!==arguments.length)return this.test.expected
this.test.expected=e}},{key:"async",value:function(e){if(void 0===e)e=1
else if("number"!=typeof e)throw new TypeError("async takes number as an input")
var t=e
return this.test.internalStop(t)}},{key:"closeTo",value:function(e,t,n,r){if("number"!=typeof n)throw new TypeError("closeTo() requires a delta argument")
this.pushResult({result:Math.abs(e-t)<=n,actual:e,expected:t,message:r||"value should be within ".concat(n," inclusive")})}},{key:"push",value:function(t,n,r,i,s){return(this instanceof e?this:W.current.assert).pushResult({result:t,actual:n,expected:r,message:i,negative:s})}},{key:"pushResult",value:function(t){var n=this,r=n instanceof e&&n.test||W.current
if(!r)throw new Error("assertion outside test context, in "+pe(2))
return n instanceof e||(n=r.assert),n.test.pushResult(t)}},{key:"ok",value:function(e,t){t||(t=e?"okay":"failed, expected argument to be truthy, was: ".concat(te.parse(e))),this.pushResult({result:!!e,actual:e,expected:!0,message:t})}},{key:"notOk",value:function(e,t){t||(t=e?"failed, expected argument to be falsy, was: ".concat(te.parse(e)):"okay"),this.pushResult({result:!e,actual:e,expected:!1,message:t})}},{key:"true",value:function(e,t){this.pushResult({result:!0===e,actual:e,expected:!0,message:t})}},{key:"false",value:function(e,t){this.pushResult({result:!1===e,actual:e,expected:!1,message:t})}},{key:"equal",value:function(e,t,n){this.pushResult({result:t==e,actual:e,expected:t,message:n})}},{key:"notEqual",value:function(e,t,n){this.pushResult({result:t!=e,actual:e,expected:t,message:n,negative:!0})}},{key:"propEqual",value:function(e,t,n){e=j(e),t=j(t),this.pushResult({result:Y(e,t),actual:e,expected:t,message:n})}},{key:"notPropEqual",value:function(e,t,n){e=j(e),t=j(t),this.pushResult({result:!Y(e,t),actual:e,expected:t,message:n,negative:!0})}},{key:"propContains",value:function(e,t,n){e=N(e,t),t=j(t,!1),this.pushResult({result:Y(e,t),actual:e,expected:t,message:n})}},{key:"notPropContains",value:function(e,t,n){e=N(e,t),t=j(t),this.pushResult({result:!Y(e,t),actual:e,expected:t,message:n,negative:!0})}},{key:"deepEqual",value:function(e,t,n){this.pushResult({result:Y(e,t),actual:e,expected:t,message:n})}},{key:"notDeepEqual",value:function(e,t,n){this.pushResult({result:!Y(e,t),actual:e,expected:t,message:n,negative:!0})}},{key:"strictEqual",value:function(e,t,n){this.pushResult({result:t===e,actual:e,expected:t,message:n})}},{key:"notStrictEqual",value:function(e,t,n){this.pushResult({result:t!==e,actual:e,expected:t,message:n,negative:!0})}},{key:"throws",value:function(t,n,r){var i=u(me(n,r,"throws"),2)
n=i[0],r=i[1]
var s=this instanceof e&&this.test||W.current
if("function"==typeof t){var o,a=!1
s.ignoreGlobalErrors=!0
try{t.call(s.testEnvironment)}catch(e){o=e}if(s.ignoreGlobalErrors=!1,o){var l=u(ve(o,n,r),3)
a=l[0],n=l[1],r=l[2]}s.assert.pushResult({result:a,actual:o&&A(o),expected:n,message:r})}else s.assert.pushResult({result:!1,actual:t,message:'The value provided to `assert.throws` in "'+s.testName+'" was not a function.'})}},{key:"rejects",value:function(t,n,r){var i=u(me(n,r,"rejects"),2)
n=i[0],r=i[1]
var s=this instanceof e&&this.test||W.current,o=t&&t.then
if("function"==typeof o){var a=this.async()
return o.call(t,(function(){s.assert.pushResult({result:!1,message:'The promise returned by the `assert.rejects` callback in "'+s.testName+'" did not reject.',actual:t}),a()}),(function(e){var t,i=u(ve(e,n,r),3)
t=i[0],n=i[1],r=i[2],s.assert.pushResult({result:t,actual:e&&A(e),expected:n,message:r}),a()}))}s.assert.pushResult({result:!1,message:'The value provided to `assert.rejects` in "'+s.testName+'" was not a promise.',actual:t})}}])}()
function me(e,t,n){var r=R(e)
if("string"===r){if(void 0===t)return t=e,[e=void 0,t]
throw new Error("assert."+n+" does not accept a string value for the expected argument.\nUse a non-string object value (e.g. RegExp or validator function) instead if necessary.")}if(e&&"regexp"!==r&&"function"!==r&&"object"!==r)throw new Error("Invalid expected value type ("+r+") provided to assert."+n+".")
return[e,t]}function ve(e,t,n){var r=!1,i=R(t)
if(t){if("regexp"===i)r=t.test(A(e)),t=String(t)
else if("function"===i&&void 0!==t.prototype&&e instanceof t)r=!0
else if("object"===i)r=e instanceof t.constructor&&e.name===t.name&&e.message===t.message,t=A(t)
else if("function"===i)try{r=!0===t.call({},e),t=null}catch(e){t=A(e)}}else r=!0
return[r,t,n]}ge.prototype.raises=ge.prototype.throws
var be=["error","runStart","suiteStart","testStart","assertion","testEnd","suiteEnd","runEnd"],ye=["error","runEnd"]
function ke(e,t){if("string"!=typeof e)throw new TypeError("eventName must be a string when emitting an event")
for(var n=W._event_listeners[e],r=n?l(n):[],i=0;i<r.length;i++)r[i](t)
q(e,ye)&&(W._event_memory[e]=t)}var we="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}
function xe(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ee={exports:{}}
!function(){var e=function(){if("undefined"!=typeof globalThis)return globalThis
if("undefined"!=typeof self)return self
if("undefined"!=typeof window)return window
if(void 0!==we)return we
throw new Error("unable to locate global object")}()
if("function"!=typeof e.Promise){var t=setTimeout
if(s.prototype.catch=function(e){return this.then(null,e)},s.prototype.then=function(e,t){var n=new this.constructor(i)
return o(this,new c(e,t,n)),n},s.prototype.finally=function(e){var t=this.constructor
return this.then((function(n){return t.resolve(e()).then((function(){return n}))}),(function(n){return t.resolve(e()).then((function(){return t.reject(n)}))}))},s.all=function(e){return new s((function(t,n){if(!r(e))return n(new TypeError("Promise.all accepts an array"))
var i=Array.prototype.slice.call(e)
if(0===i.length)return t([])
var s=i.length
function o(e,r){try{if(r&&("object"===f(r)||"function"==typeof r)){var a=r.then
if("function"==typeof a)return void a.call(r,(function(t){o(e,t)}),n)}i[e]=r,0==--s&&t(i)}catch(e){n(e)}}for(var a=0;a<i.length;a++)o(a,i[a])}))},s.allSettled=function(e){return new this((function(t,n){if(!e||void 0===e.length)return n(new TypeError(f(e)+" "+e+" is not iterable(cannot read property Symbol(Symbol.iterator))"))
var r=Array.prototype.slice.call(e)
if(0===r.length)return t([])
var i=r.length
function s(e,n){if(n&&("object"===f(n)||"function"==typeof n)){var o=n.then
if("function"==typeof o)return void o.call(n,(function(t){s(e,t)}),(function(n){r[e]={status:"rejected",reason:n},0==--i&&t(r)}))}r[e]={status:"fulfilled",value:n},0==--i&&t(r)}for(var o=0;o<r.length;o++)s(o,r[o])}))},s.resolve=function(e){return e&&"object"===f(e)&&e.constructor===s?e:new s((function(t){t(e)}))},s.reject=function(e){return new s((function(t,n){n(e)}))},s.race=function(e){return new s((function(t,n){if(!r(e))return n(new TypeError("Promise.race accepts an array"))
for(var i=0,o=e.length;i<o;i++)s.resolve(e[i]).then(t,n)}))},"function"==typeof setImmediate){var n=setImmediate
s._immediateFn=function(e){n(e)}}else s._immediateFn=function(e){t(e,0)}
s._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},Ee.exports=s}else Ee.exports=e.Promise
function r(e){return Boolean(e&&void 0!==e.length)}function i(){}function s(e){if(!(this instanceof s))throw new TypeError("Promises must be constructed via new")
if("function"!=typeof e)throw new TypeError("not a function")
this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],d(e,this)}function o(e,t){for(;3===e._state;)e=e._value
0!==e._state?(e._handled=!0,s._immediateFn((function(){var n=1===e._state?t.onFulfilled:t.onRejected
if(null!==n){var r
try{r=n(e._value)}catch(e){return void u(t.promise,e)}a(t.promise,r)}else(1===e._state?a:u)(t.promise,e._value)}))):e._deferreds.push(t)}function a(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.")
if(t&&("object"===f(t)||"function"==typeof t)){var n=t.then
if(t instanceof s)return e._state=3,e._value=t,void l(e)
if("function"==typeof n)return void d((r=n,i=t,function(){r.apply(i,arguments)}),e)}e._state=1,e._value=t,l(e)}catch(t){u(e,t)}var r,i}function u(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&s._immediateFn((function(){e._handled||s._unhandledRejectionFn(e._value)}))
for(var t=0,n=e._deferreds.length;t<n;t++)o(e,e._deferreds[t])
e._deferreds=null}function c(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function d(e,t){var n=!1
try{e((function(e){n||(n=!0,a(t,e))}),(function(e){n||(n=!0,u(t,e))}))}catch(e){if(n)return
n=!0,u(t,e)}}}()
var Te=Ee.exports
function Ce(e,t){var n=W.callbacks[e]
if("log"!==e){var r=Te.resolve()
return n.forEach((function(e){r=r.then((function(){return Te.resolve(e(t))}))})),r}n.map((function(e){return e(t)}))}var _e=a((function e(t,n,r){s(this,e),this.name=t,this.suiteName=n.name,this.fullName=n.fullName.concat(t),this.runtime=0,this.assertions=[],this.skipped=!!r.skip,this.todo=!!r.todo,this.valid=r.valid,this._startTime=0,this._endTime=0,n.pushTest(this)}),[{key:"start",value:function(e){return e&&(this._startTime=_.now()),{name:this.name,suiteName:this.suiteName,fullName:this.fullName.slice()}}},{key:"end",value:function(e){return e&&(this._endTime=_.now()),M(this.start(),{runtime:this.getRuntime(),status:this.getStatus(),errors:this.getFailedAssertions(),assertions:this.getAssertions()})}},{key:"pushAssertion",value:function(e){this.assertions.push(e)}},{key:"getRuntime",value:function(){return Math.round(this._endTime-this._startTime)}},{key:"getStatus",value:function(){return this.skipped?"skipped":(this.getFailedAssertions().length>0?this.todo:!this.todo)?this.todo?"todo":"passed":"failed"}},{key:"getFailedAssertions",value:function(){return this.assertions.filter((function(e){return!e.passed}))}},{key:"getAssertions",value:function(){return this.assertions.slice()}},{key:"slimAssertions",value:function(){this.assertions=this.assertions.map((function(e){return delete e.actual,delete e.expected,e}))}}])
function Se(e){if(this.expected=null,this.assertions=[],this.module=W.currentModule,this.steps=[],this.stepsCount=0,this.timeout=void 0,this.data=void 0,this.withData=!1,this.pauses=new x,this.nextPauseId=1,this.stackOffset=3,M(this,e),this.module.skip?(this.skip=!0,this.todo=!1):this.module.todo&&!this.skip&&(this.todo=!0),W.pq.finished)ne.warn("Unexpected test after runEnd. This is unstable and will fail in QUnit 3.0.")
else{if(!this.skip&&"function"!=typeof this.callback){var t=this.todo?"QUnit.todo":"QUnit.test"
throw new TypeError("You must provide a callback to ".concat(t,'("').concat(this.testName,'")'))}for(var n=0,r=this.module.tests;n<r.length;n++)this.module.tests[n].name===this.testName&&(this.testName+=" ")
this.testId=O(this.module.name,this.testName),++Se.count,this.errorForStack=new Error,this.callback&&this.callback.validTest&&(this.errorForStack.stack=void 0),this.testReport=new _e(this.testName,this.module.suiteReport,{todo:this.todo,skip:this.skip,valid:this.valid()}),this.module.tests.push({name:this.testName,testId:this.testId,skip:!!this.skip}),this.skip?(this.callback=function(){},this.async=!1,this.expected=0):this.assert=new ge(this)}}function qe(){if(!W.current)throw new Error("pushFailure() assertion outside test context, in "+pe(2))
var e=W.current
return e.pushFailure.apply(e,arguments)}function je(){if(W.pollution=[],W.noglobals)for(var e in h)if(C.call(h,e)){if(/^qunit-test-output/.test(e))continue
W.pollution.push(e)}}Se.count=0,Se.prototype={get stack(){return he(this.errorForStack,this.stackOffset)},before:function(){var e=this,t=this.module,n=function(e){for(var t=e,n=[];t&&0===t.testsRun;)n.push(t),t=t.parentModule
return n.reverse()}(t),r=Te.resolve()
return n.forEach((function(e){r=r.then((function(){return e.stats={all:0,bad:0,started:_.now()},ke("suiteStart",e.suiteReport.start(!0)),Ce("moduleStart",{name:e.name,tests:e.tests})}))})),r.then((function(){return W.current=e,e.testEnvironment=M({},t.testEnvironment),e.started=_.now(),ke("testStart",e.testReport.start(!0)),Ce("testStart",{name:e.testName,module:t.name,testId:e.testId,previousFailure:e.previousFailure}).then((function(){W.pollution||je()}))}))},run:function(){if(W.current=this,W.notrycatch)e(this)
else try{e(this)}catch(e){this.pushFailure("Died on test #"+(this.assertions.length+1)+": "+(e.message||e)+"\n"+this.stack,he(e,0)),je(),W.blocking&&Le(this)}function e(e){var t
t=e.withData?e.callback.call(e.testEnvironment,e.assert,e.data):e.callback.call(e.testEnvironment,e.assert),e.resolvePromise(t),0===e.timeout&&e.pauses.size>0&&qe("Test did not finish synchronously even though assert.timeout( 0 ) was used.",pe(2))}},after:function(){!function(){var e=W.pollution
je()
var t=S(W.pollution,e)
t.length>0&&qe("Introduced global variable(s): "+t.join(", "))
var n=S(e,W.pollution)
n.length>0&&qe("Deleted global variable(s): "+n.join(", "))}()},queueGlobalHook:function(e,t){var n=this
return function(){var r
if(W.current=n,W.notrycatch)r=e.call(n.testEnvironment,n.assert)
else try{r=e.call(n.testEnvironment,n.assert)}catch(e){return void n.pushFailure("Global "+t+" failed on "+n.testName+": "+A(e),he(e,0))}n.resolvePromise(r,t)}},queueHook:function(e,t,n){var r=this,i=function(){var n=e.call(r.testEnvironment,r.assert)
r.resolvePromise(n,t)}
return function(){if("before"===t){if(0!==n.testsRun)return
r.preserveEnvironment=!0}if("after"!==t||function(e){return e.testsRun===Qe(e).filter((function(e){return!e.skip})).length-1}(n)||!(W.queue.length>0||W.pq.taskCount()>2))if(W.current=r,W.notrycatch)i()
else try{i()}catch(e){r.pushFailure(t+" failed on "+r.testName+": "+(e.message||e),he(e,0))}}},hooks:function(e){var t=[]
return this.skip||(function(n){if(("beforeEach"===e||"afterEach"===e)&&W.globalHooks[e])for(var r=0;r<W.globalHooks[e].length;r++)t.push(n.queueGlobalHook(W.globalHooks[e][r],e))}(this),function n(r,i){if(i.parentModule&&n(r,i.parentModule),i.hooks[e].length)for(var s=0;s<i.hooks[e].length;s++)t.push(r.queueHook(i.hooks[e][s],e,i))}(this,this.module)),t},finish:function(){if(W.current=this,g&&(m(this.timeout),W.timeoutHandler=null),this.callback=void 0,this.steps.length){var e=this.steps.join(", ")
this.pushFailure("Expected assert.verifySteps() to be called before end of test "+"after using assert.step(). Unverified steps: ".concat(e),this.stack)}W._deprecated_countEachStep_shown||W.countStepsAsOne||null===this.expected||!this.stepsCount||(W._deprecated_countEachStep_shown=!0,W.requireExpects?ne.warn("Counting each assert.step() for assert.expect() is changing in QUnit 3.0. You can enable QUnit.config.countStepsAsOne to prepare for the upgrade. https://qunitjs.com/api/assert/expect/"):ne.warn("Counting each assert.step() for assert.expect() is changing in QUnit 3.0. Omit assert.expect() from tests that use assert.step(), or enable QUnit.config.countStepsAsOne to prepare for the upgrade. https://qunitjs.com/api/assert/expect/"))
var t=W.countStepsAsOne?this.assertions.length-this.stepsCount:this.assertions.length
W.requireExpects&&null===this.expected?this.pushFailure("Expected number of assertions to be defined, but expect() was not called.",this.stack):null!==this.expected&&this.expected!==t&&this.stepsCount&&this.expected===this.assertions.length-this.stepsCount&&!W.countStepsAsOne?this.pushFailure("Expected "+this.expected+" assertions, but "+t+" were run\nIt looks like you might prefer to enable QUnit.config.countStepsAsOne, which will become the default in QUnit 3.0. https://qunitjs.com/api/assert/expect/",this.stack):null!==this.expected&&this.expected!==t&&this.stepsCount&&this.expected===this.assertions.length&&W.countStepsAsOne?this.pushFailure("Expected "+this.expected+" assertions, but "+t+" were run\nRemember that with QUnit.config.countStepsAsOne and in QUnit 3.0, steps no longer count as separate assertions. https://qunitjs.com/api/assert/expect/",this.stack):null!==this.expected&&this.expected!==t?this.pushFailure("Expected "+this.expected+" assertions, but "+t+" were run",this.stack):null!==this.expected||t||this.pushFailure("Expected at least one assertion, but none were run - call expect(0) to accept zero assertions.",this.stack)
var n=this.module,r=n.name,i=this.testName,s=!!this.skip,o=!!this.todo,a=0,u=W.storage
this.runtime=Math.round(_.now()-this.started),W.stats.all+=this.assertions.length,W.stats.testCount+=1,n.stats.all+=this.assertions.length
for(var c=0;c<this.assertions.length;c++)this.assertions[c].result||(a++,W.stats.bad++,n.stats.bad++)
s?Pe(n):function(e){for(e.testsRun++;e=e.parentModule;)e.testsRun++}(n),u&&(a?u.setItem("qunit-test-"+r+"-"+i,a):u.removeItem("qunit-test-"+r+"-"+i)),ke("testEnd",this.testReport.end(!0)),this.testReport.slimAssertions()
var f=this
return Ce("testDone",{name:i,module:r,skipped:s,todo:o,failed:a,passed:this.assertions.length-a,total:this.assertions.length,runtime:s?0:this.runtime,assertions:this.assertions,testId:this.testId,get source(){return f.stack}}).then((function(){if(Fe(n)){for(var e=[n],t=n.parentModule;t&&Fe(t);)e.push(t),t=t.parentModule
var r=Te.resolve()
return e.forEach((function(e){r=r.then((function(){return function(e){for(var t=[e];t.length;){var n=t.shift()
n.hooks={},t.push.apply(t,l(n.childModules))}return ke("suiteEnd",e.suiteReport.end(!0)),Ce("moduleDone",{name:e.name,tests:e.tests,failed:e.stats.bad,passed:e.stats.all-e.stats.bad,total:e.stats.all,runtime:Math.round(_.now()-e.stats.started)})}(e)}))})),r}})).then((function(){W.current=void 0}))},preserveTestEnvironment:function(){this.preserveEnvironment&&(this.module.testEnvironment=this.testEnvironment,this.testEnvironment=M({},this.module.testEnvironment))},queue:function(){var e=this
if(this.valid()){var t=W.storage&&+W.storage.getItem("qunit-test-"+this.module.name+"-"+this.testName),n=W.reorder&&!!t
this.previousFailure=!!t,W.pq.add((function(){return[function(){return e.before()}].concat(l(e.hooks("before")),[function(){e.preserveTestEnvironment()}],l(e.hooks("beforeEach")),[function(){e.run()}],l(e.hooks("afterEach").reverse()),l(e.hooks("after").reverse()),[function(){e.after()},function(){return e.finish()}])}),n)}else Pe(this.module)},pushResult:function(e){if(this!==W.current){var t=e&&e.message||"",n=this&&this.testName||""
throw new Error("Assertion occurred after test finished.\n> Test: "+n+"\n> Message: "+t+"\n")}var r={module:this.module.name,name:this.testName,result:e.result,message:e.message,actual:e.actual,testId:this.testId,negative:e.negative||!1,runtime:Math.round(_.now()-this.started),todo:!!this.todo}
if(C.call(e,"expected")&&(r.expected=e.expected),!e.result){var i=e.source||pe()
i&&(r.source=i)}this.logAssertion(r),this.assertions.push({result:!!e.result,message:e.message})},pushFailure:function(e,t){if(!(this instanceof Se))throw new Error("pushFailure() assertion outside test context, was "+pe(2))
this.pushResult({result:!1,message:e||"error",source:t})},logAssertion:function(e){Ce("log",e)
var t={passed:e.result,actual:e.actual,expected:e.expected,message:e.message,stack:e.source,todo:e.todo}
this.testReport.pushAssertion(t),ke("assertion",t)},internalResetTimeout:function(e){m(W.timeout),W.timeout=g(W.timeoutHandler(e),e)},internalStop:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1
W.blocking=!0
var t,n=this,r=this.nextPauseId++,i={cancelled:!1,remaining:e}
return n.pauses.set(r,i),g&&("number"==typeof n.timeout?t=n.timeout:"number"==typeof W.testTimeout&&(t=W.testTimeout),"number"==typeof t&&t>0?(W.timeoutHandler=function(e){return function(){W.timeout=null,i.cancelled=!0,n.pauses.delete(r),n.pushFailure("Test took longer than ".concat(e,"ms; test timed out."),pe(2)),Le(n)}},m(W.timeout),W.timeout=g(W.timeoutHandler(t),t)):(m(W.timeout),W.timeout=g((function(){W.timeout=null,W._deprecated_timeout_shown||(W._deprecated_timeout_shown=!0,ne.warn('Test "'.concat(n.testName,'" took longer than 3000ms, but no timeout was set. Set QUnit.config.testTimeout or call assert.timeout() to avoid a timeout in QUnit 3. https://qunitjs.com/api/config/testTimeout/')))}),3e3))),function(){if(!i.cancelled){if(void 0===W.current)throw new Error("Unexpected release of async pause after tests finished.\n"+"> Test: ".concat(n.testName," [async #").concat(r,"]"))
if(W.current!==n)throw new Error("Unexpected release of async pause during a different test.\n"+"> Test: ".concat(n.testName," [async #").concat(r,"]"))
if(i.remaining<=0)throw new Error("Tried to release async pause that was already released.\n"+"> Test: ".concat(n.testName," [async #").concat(r,"]"))
i.remaining--,0===i.remaining&&n.pauses.delete(r),Ue(n)}}},resolvePromise:function(e,t){if(null!=e){var n=this,r=e.then
if("function"==typeof r){var i=n.internalStop(),s=function(){i()}
W.notrycatch?r.call(e,s):r.call(e,s,(function(e){var r="Promise rejected "+(t?t.replace(/Each$/,""):"during")+' "'+n.testName+'": '+(e&&e.message||e)
n.pushFailure(r,he(e,0)),je(),Le(n)}))}}},valid:function(){if(this.callback&&this.callback.validTest)return!0
if(!function e(t,n){return!n||!n.length||q(t.moduleId,n)||t.parentModule&&e(t.parentModule,n)}(this.module,W.moduleId))return!1
if(W.testId&&W.testId.length&&!q(this.testId,W.testId))return!1
var e=W.module&&W.module.toLowerCase()
if(!function e(t,n){return!n||(t.name?t.name.toLowerCase():null)===n||!!t.parentModule&&e(t.parentModule,n)}(this.module,e))return!1
var t=W.filter
if(!t)return!0
var n=/^(!?)\/([\w\W]*)\/(i?$)/.exec(t),r=this.module.name+": "+this.testName
return n?this.regexFilter(!!n[1],n[2],n[3],r):this.stringFilter(t,r)},regexFilter:function(e,t,n,r){return new RegExp(t,n).test(r)!==e},stringFilter:function(e,t){e=e.toLowerCase(),t=t.toLowerCase()
var n="!"!==e.charAt(0)
return n||(e=e.slice(1)),-1!==t.indexOf(e)?n:!n}}
var Ne=!1
function Me(e){Ne||W.currentModule.ignored||new Se(e).queue()}function Re(e){W.currentModule.ignored||(Ne||(W.queue.length=0,Ne=!0),new Se(e).queue())}function Ie(e,t){Me({testName:e,callback:t})}function Oe(e,t){return"".concat(e," [").concat(t,"]")}var Ae=/[\x00-\x1F\x7F\xA0]/
function De(e,t){if(Array.isArray(e))for(var n=0;n<e.length;n++){var r=e[n],i=f(r),s=n
if("string"===i&&r.length<=40&&!Ae.test(r)&&!/\s*\d+: /.test(r))s=r
else if("string"===i||"number"===i||"boolean"===i||"undefined"===i||null===r){var o=String(r)
Ae.test(o)||(s=n+": "+(o.length<=30?o:o.slice(0,29)+"…"))}t(r,s)}else{if("object"!==f(e)||null===e)throw new Error("test.each() expects an array or object as input, but\nfound ".concat(f(e)," instead."))
for(var a in e)t(e[a],a)}}function Le(e){e.pauses.forEach((function(e){e.cancelled=!0})),e.pauses.clear(),Ue(e)}function Ue(e){e.pauses.size>0||(g?(m(W.timeout),W.timeout=g((function(){e.pauses.size>0||(m(W.timeout),W.timeout=null,W.blocking=!1,W.pq.advance())}))):(W.blocking=!1,W.pq.advance()))}function Qe(e){for(var t=[].concat(e.tests),n=l(e.childModules);n.length;){var r=n.shift()
t.push.apply(t,r.tests),n.push.apply(n,l(r.childModules))}return t}function Fe(e){return e.testsRun+e.testsIgnored===Qe(e).length}function Pe(e){for(e.testsIgnored++;e=e.parentModule;)e.testsIgnored++}M(Ie,{todo:function(e,t){Me({testName:e,callback:t,todo:!0})},skip:function(e){Me({testName:e,skip:!0})},if:function(e,t,n){Me({testName:e,callback:n,skip:!t})},only:function(e,t){Re({testName:e,callback:t})},each:function(e,t,n){De(t,(function(t,r){Me({testName:Oe(e,r),callback:n,withData:!0,stackOffset:5,data:t})}))}}),Ie.todo.each=function(e,t,n){De(t,(function(t,r){Me({testName:Oe(e,r),callback:n,todo:!0,withData:!0,stackOffset:5,data:t})}))},Ie.skip.each=function(e,t){De(t,(function(t,n){Me({testName:Oe(e,n),stackOffset:5,skip:!0})}))},Ie.if.each=function(e,t,n,r){De(n,(function(n,i){Me({testName:Oe(e,i),callback:r,withData:!0,stackOffset:5,skip:!t,data:t?n:void 0})}))},Ie.only.each=function(e,t,n){De(t,(function(t,r){Re({testName:Oe(e,r),callback:n,withData:!0,stackOffset:5,data:t})}))}
var He,Be,ze,$e,Ge=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
s(this,e),this.log=n.log||Function.prototype.bind.call(p.log,p),t.on("error",this.onError.bind(this)),t.on("runStart",this.onRunStart.bind(this)),t.on("testStart",this.onTestStart.bind(this)),t.on("testEnd",this.onTestEnd.bind(this)),t.on("runEnd",this.onRunEnd.bind(this))}return a(e,[{key:"onError",value:function(e){this.log("error",e)}},{key:"onRunStart",value:function(e){this.log("runStart",e)}},{key:"onTestStart",value:function(e){this.log("testStart",e)}},{key:"onTestEnd",value:function(e){this.log("testEnd",e)}},{key:"onRunEnd",value:function(e){this.log("runEnd",e)}}],[{key:"init",value:function(t,n){return new e(t,n)}}])}(),Ye=b&&void 0!==b.performance&&"function"==typeof b.performance.mark&&"function"==typeof b.performance.measure?b.performance:void 0,We={measure:Ye?function(e,t,n){try{Ye.measure(e,t,n)}catch(e){ne.warn("performance.measure could not be executed because of ",e.message)}}:function(){},mark:Ye?Ye.mark.bind(Ye):function(){}},Je=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
s(this,e),this.perf=n.perf||We,t.on("runStart",this.onRunStart.bind(this)),t.on("runEnd",this.onRunEnd.bind(this)),t.on("suiteStart",this.onSuiteStart.bind(this)),t.on("suiteEnd",this.onSuiteEnd.bind(this)),t.on("testStart",this.onTestStart.bind(this)),t.on("testEnd",this.onTestEnd.bind(this))}return a(e,[{key:"onRunStart",value:function(){this.perf.mark("qunit_suite_0_start")}},{key:"onSuiteStart",value:function(e){var t=e.fullName.length
this.perf.mark("qunit_suite_".concat(t,"_start"))}},{key:"onSuiteEnd",value:function(e){var t=e.fullName.length,n=e.fullName.join(" – ")
this.perf.mark("qunit_suite_".concat(t,"_end")),this.perf.measure("QUnit Test Suite: ".concat(n),"qunit_suite_".concat(t,"_start"),"qunit_suite_".concat(t,"_end"))}},{key:"onTestStart",value:function(){this.perf.mark("qunit_test_start")}},{key:"onTestEnd",value:function(e){this.perf.mark("qunit_test_end")
var t=e.fullName.join(" – ")
this.perf.measure("QUnit Test: ".concat(t),"qunit_test_start","qunit_test_end")}},{key:"onRunEnd",value:function(){this.perf.mark("qunit_suite_0_end"),this.perf.measure("QUnit Test Run","qunit_suite_0_start","qunit_suite_0_end")}}],[{key:"init",value:function(t,n){return new e(t,n)}}])}(),Ve=!0
if("undefined"!=typeof process){var Ze=process.env||{}
He=Ze.FORCE_COLOR,Be=Ze.NODE_DISABLE_COLORS,ze=Ze.NO_COLOR,$e=Ze.TERM,Ve=process.stdout&&process.stdout.isTTY}var Ke={enabled:!Be&&null==ze&&"dumb"!==$e&&(null!=He&&"0"!==He||Ve),reset:et(0,0),bold:et(1,22),dim:et(2,22),italic:et(3,23),underline:et(4,24),inverse:et(7,27),hidden:et(8,28),strikethrough:et(9,29),black:et(30,39),red:et(31,39),green:et(32,39),yellow:et(33,39),blue:et(34,39),magenta:et(35,39),cyan:et(36,39),white:et(37,39),gray:et(90,39),grey:et(90,39),bgBlack:et(40,49),bgRed:et(41,49),bgGreen:et(42,49),bgYellow:et(43,49),bgBlue:et(44,49),bgMagenta:et(45,49),bgCyan:et(46,49),bgWhite:et(47,49)}
function Xe(e,t){for(var n,r=0,i="",s="";r<e.length;r++)i+=(n=e[r]).open,s+=n.close,~t.indexOf(n.close)&&(t=t.replace(n.rgx,n.close+n.open))
return i+t+s}function et(e,t){var n={open:"[".concat(e,"m"),close:"[".concat(t,"m"),rgx:new RegExp("\\x1b\\[".concat(t,"m"),"g")}
return function(t){return void 0!==this&&void 0!==this.has?(~this.has.indexOf(e)||(this.has.push(e),this.keys.push(n)),void 0===t?this:Ke.enabled?Xe(this.keys,t+""):t+""):void 0===t?((r={has:[e],keys:[n]}).reset=Ke.reset.bind(r),r.bold=Ke.bold.bind(r),r.dim=Ke.dim.bind(r),r.italic=Ke.italic.bind(r),r.underline=Ke.underline.bind(r),r.inverse=Ke.inverse.bind(r),r.hidden=Ke.hidden.bind(r),r.strikethrough=Ke.strikethrough.bind(r),r.black=Ke.black.bind(r),r.red=Ke.red.bind(r),r.green=Ke.green.bind(r),r.yellow=Ke.yellow.bind(r),r.blue=Ke.blue.bind(r),r.magenta=Ke.magenta.bind(r),r.cyan=Ke.cyan.bind(r),r.white=Ke.white.bind(r),r.gray=Ke.gray.bind(r),r.grey=Ke.grey.bind(r),r.bgBlack=Ke.bgBlack.bind(r),r.bgRed=Ke.bgRed.bind(r),r.bgGreen=Ke.bgGreen.bind(r),r.bgYellow=Ke.bgYellow.bind(r),r.bgBlue=Ke.bgBlue.bind(r),r.bgMagenta=Ke.bgMagenta.bind(r),r.bgCyan=Ke.bgCyan.bind(r),r.bgWhite=Ke.bgWhite.bind(r),r):Ke.enabled?Xe([n],t+""):t+""
var r}}function tt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2
if(void 0===e&&(e=String(e)),"number"!=typeof e||isFinite(e)||(e=String(e)),"number"==typeof e)return JSON.stringify(e)
if("string"==typeof e){if(""===e||/['"\\/[{}\]\r\n]/.test(e)||/[-?:,[\]{}#&*!|=>'"%@`]/.test(e[0])||/(^\s|\s$)/.test(e)||/^[\d._-]+$/.test(e)||/^(true|false|y|n|yes|no|on|off)$/i.test(e)){if(!/\n/.test(e))return JSON.stringify(e)
var n=new Array(2*t+1).join(" "),r=e.match(/\n+$/)
return 1===(r?r[0].length:0)?"|\n"+e.replace(/\n$/,"").split("\n").map((function(e){return n+e})).join("\n"):"|+\n"+e.split("\n").map((function(e){return n+e})).join("\n")}return e}var i=new Array(t+1).join(" ")
return JSON.stringify(nt(e),null,2).split("\n").map((function(e,t){return 0===t?e:i+e})).join("\n")}function nt(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]
if(-1!==n.indexOf(e))return"[Circular]"
switch(Object.prototype.toString.call(e).replace(/^\[.+\s(.+?)]$/,"$1").toLowerCase()){case"array":n.push(e),t=e.map((function(e){return nt(e,n)})),n.pop()
break
case"object":n.push(e),t={},Object.keys(e).forEach((function(r){t[r]=nt(e[r],n)})),n.pop()
break
default:t=e}return t}var rt=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
s(this,e),this.log=n.log||Function.prototype.bind.call(p.log,p),this.testCount=0,this.started=!1,this.ended=!1,this.bailed=!1,t.on("error",this.onError.bind(this)),t.on("runStart",this.onRunStart.bind(this)),t.on("testEnd",this.onTestEnd.bind(this)),t.on("runEnd",this.onRunEnd.bind(this))}return a(e,[{key:"onRunStart",value:function(e){this.started||(this.log("TAP version 13"),this.started=!0)}},{key:"onError",value:function(e){this.bailed||(this.bailed=!0,this.ended||(this.onRunStart(),this.testCount=this.testCount+1,this.log("not ok ".concat(this.testCount," ").concat(Ke.red("global failure"))),this.logError(e)),this.log("Bail out! "+A(e).split("\n")[0]),this.ended&&this.logError(e))}},{key:"onTestEnd",value:function(e){var t=this
this.testCount=this.testCount+1,"passed"===e.status?this.log("ok ".concat(this.testCount," ").concat(e.fullName.join(" > "))):"skipped"===e.status?this.log("ok ".concat(this.testCount," ").concat(Ke.yellow(e.fullName.join(" > "))," # SKIP")):"todo"===e.status?(this.log("not ok ".concat(this.testCount," ").concat(Ke.cyan(e.fullName.join(" > "))," # TODO")),e.errors.forEach((function(e){return t.logAssertion(e,"todo")}))):(this.log("not ok ".concat(this.testCount," ").concat(Ke.red(e.fullName.join(" > ")))),e.errors.forEach((function(e){return t.logAssertion(e)})))}},{key:"onRunEnd",value:function(e){this.ended=!0,this.log("1..".concat(e.testCounts.total)),this.log("# pass ".concat(e.testCounts.passed)),this.log("# ".concat(Ke.yellow("skip ".concat(e.testCounts.skipped)))),this.log("# ".concat(Ke.cyan("todo ".concat(e.testCounts.todo)))),this.log("# ".concat(Ke.red("fail ".concat(e.testCounts.failed))))}},{key:"logAssertion",value:function(e,t){var n="  ---"
if(n+="\n  message: ".concat(tt(e.message||"failed")),n+="\n  severity: ".concat(tt(t||"failed")),(void 0!==e.expected||void 0!==e.actual)&&(n+="\n  actual  : ".concat(tt(e.actual)),n+="\n  expected: ".concat(tt(e.expected))),e.stack){var r=de(e.stack,Ke.grey)
r.length&&(n+="\n  stack: ".concat(tt(r+"\n")))}n+="\n  ...",this.log(n)}},{key:"logError",value:function(e){var t="  ---"
if(t+="\n  message: ".concat(tt(A(e))),t+="\n  severity: ".concat(tt("failed")),e&&e.stack){var n=de(e.stack,Ke.grey,e.toString())
n.length&&(t+="\n  stack: ".concat(tt(n+"\n")))}t+="\n  ...",this.log(t)}}],[{key:"init",value:function(t,n){return new e(t,n)}}])}(),it={console:Ge,perf:Je,tap:rt}
function st(e){return function(t){W.globalHooks[e]||(W.globalHooks[e]=[]),W.globalHooks[e].push(t)}}var ot={beforeEach:st("beforeEach"),afterEach:st("afterEach")},at=a((function e(t){s(this,e),this.test=t,this.priorityCount=0,this.unitSampler=null,this.taskQueue=[],this.finished=!1}),[{key:"advance",value:function(){this.advanceTaskQueue(),this.taskQueue.length||W.blocking||W.current||this.advanceTestQueue()}},{key:"advanceTaskQueue",value:function(){var e=_.now()
W.depth=(W.depth||0)+1,this.processTaskQueue(e),W.depth--}},{key:"processTaskQueue",value:function(e){var t=this
if(this.taskQueue.length&&!W.blocking){var n=_.now()-e
if(!g||W.updateRate<=0||n<W.updateRate){var r=this.taskQueue.shift()
Te.resolve(r()).then((function(){t.taskQueue.length?t.processTaskQueue(e):t.advance()}))}else g((function(){t.advance()}))}}},{key:"advanceTestQueue",value:function(){if(W.blocking||W.queue.length||0!==W.depth){var e=W.queue.shift()
this.addToTaskQueue(e()),this.priorityCount>0&&this.priorityCount--,this.advance()}else this.done()}},{key:"addToTaskQueue",value:function(e){var t;(t=this.taskQueue).push.apply(t,l(e))}},{key:"taskCount",value:function(){return this.taskQueue.length}},{key:"add",value:function(e,t){if(t)W.queue.splice(this.priorityCount++,0,e)
else if(W.seed){this.unitSampler||(this.unitSampler=(r=W.seed,i=parseInt(O(r),16)||-1,function(){return i^=i<<13,i^=i>>>17,(i^=i<<5)<0&&(i+=4294967296),i/4294967296}))
var n=Math.floor(this.unitSampler()*(W.queue.length-this.priorityCount+1))
W.queue.splice(this.priorityCount+n,0,e)}else W.queue.push(e)
var r,i}},{key:"done",value:function(){var e
if(0===W.stats.testCount&&!0===W.failOnZeroTests)return e=W.filter&&W.filter.length?new Error('No tests matched the filter "'.concat(W.filter,'".')):W.module&&W.module.length?new Error('No tests matched the module "'.concat(W.module,'".')):W.moduleId&&W.moduleId.length?new Error('No tests matched the moduleId "'.concat(W.moduleId,'".')):W.testId&&W.testId.length?new Error('No tests matched the testId "'.concat(W.testId,'".')):new Error("No tests were run."),this.test("global failure",M((function(t){t.pushResult({result:!1,message:e.message,source:e.stack})}),{validTest:!0})),void this.advance()
var t=W.storage,n=Math.round(_.now()-W.started),r=W.stats.all-W.stats.bad
this.finished=!0,ke("runEnd",se.end(!0)),Ce("done",{passed:r,failed:W.stats.bad,total:W.stats.all,runtime:n}).then((function(){if(t&&0===W.stats.bad)for(var e=t.length-1;e>=0;e--){var n=t.key(e)
0===n.indexOf("qunit-test-")&&t.removeItem(n)}}))}}])
function ut(e){W.current?W.current.assert.pushResult({result:!1,message:"global failure: ".concat(A(e)),source:e&&e.stack||pe(2)}):(se.globalFailureCount++,W.stats.bad++,W.stats.all++,ke("error",e))}function lt(){}var ct=-1,ft=Object.prototype.hasOwnProperty
lt.prototype.DiffMain=function(e,t,n){var r=Date.now()+1e3
if(null===e||null===t)throw new Error("Cannot diff null input.")
if(e===t)return e?[[0,e]]:[]
void 0===n&&(n=!0)
var i=this.diffCommonPrefix(e,t),s=e.substring(0,i)
e=e.substring(i),t=t.substring(i),i=this.diffCommonSuffix(e,t)
var o=e.substring(e.length-i)
e=e.substring(0,e.length-i),t=t.substring(0,t.length-i)
var a=this.diffCompute(e,t,n,r)
return s&&a.unshift([0,s]),o&&a.push([0,o]),this.diffCleanupMerge(a),a},lt.prototype.diffCleanupEfficiency=function(e){var t,n,r,i,s,o,a,u,l
for(t=!1,n=[],r=0,i=null,s=0,o=!1,a=!1,u=!1,l=!1;s<e.length;)0===e[s][0]?(e[s][1].length<4&&(u||l)?(n[r++]=s,o=u,a=l,i=e[s][1]):(r=0,i=null),u=l=!1):(e[s][0]===ct?l=!0:u=!0,i&&(o&&a&&u&&l||i.length<2&&o+a+u+l===3)&&(e.splice(n[r-1],0,[ct,i]),e[n[r-1]+1][0]=1,r--,i=null,o&&a?(u=l=!0,r=0):(s=--r>0?n[r-1]:-1,u=l=!1),t=!0)),s++
t&&this.diffCleanupMerge(e)},lt.prototype.diffPrettyHtml=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n][0],i=e[n][1]
switch(r){case 1:t[n]="<ins>"+D(i)+"</ins>"
break
case ct:t[n]="<del>"+D(i)+"</del>"
break
case 0:t[n]="<span>"+D(i)+"</span>"}}return t.join("")},lt.prototype.diffCommonPrefix=function(e,t){var n,r,i,s
if(!e||!t||e.charAt(0)!==t.charAt(0))return 0
for(i=0,n=r=Math.min(e.length,t.length),s=0;i<n;)e.substring(s,n)===t.substring(s,n)?s=i=n:r=n,n=Math.floor((r-i)/2+i)
return n},lt.prototype.diffCommonSuffix=function(e,t){var n,r,i,s
if(!e||!t||e.charAt(e.length-1)!==t.charAt(t.length-1))return 0
for(i=0,n=r=Math.min(e.length,t.length),s=0;i<n;)e.substring(e.length-n,e.length-s)===t.substring(t.length-n,t.length-s)?s=i=n:r=n,n=Math.floor((r-i)/2+i)
return n},lt.prototype.diffCompute=function(e,t,n,r){var i,s,o,a,u,l,c,f,d,h,p,g
return e?t?(s=e.length>t.length?e:t,o=e.length>t.length?t:e,-1!==(a=s.indexOf(o))?(i=[[1,s.substring(0,a)],[0,o],[1,s.substring(a+o.length)]],e.length>t.length&&(i[0][0]=i[2][0]=ct),i):1===o.length?[[ct,e],[1,t]]:(u=this.diffHalfMatch(e,t))?(l=u[0],f=u[1],c=u[2],d=u[3],h=u[4],p=this.DiffMain(l,c,n,r),g=this.DiffMain(f,d,n,r),p.concat([[0,h]],g)):n&&e.length>100&&t.length>100?this.diffLineMode(e,t,r):this.diffBisect(e,t,r)):[[ct,e]]:[[1,t]]},lt.prototype.diffHalfMatch=function(e,t){var n,r,i,s,o,a,u,l,c,f
if(n=e.length>t.length?e:t,r=e.length>t.length?t:e,n.length<4||2*r.length<n.length)return null
function d(e,t,n){var r,s,o,a,u,l,c,f,d
for(r=e.substring(n,n+Math.floor(e.length/4)),s=-1,o="";-1!==(s=t.indexOf(r,s+1));)a=i.diffCommonPrefix(e.substring(n),t.substring(s)),u=i.diffCommonSuffix(e.substring(0,n),t.substring(0,s)),o.length<u+a&&(o=t.substring(s-u,s)+t.substring(s,s+a),l=e.substring(0,n-u),c=e.substring(n+a),f=t.substring(0,s-u),d=t.substring(s+a))
return 2*o.length>=e.length?[l,c,f,d,o]:null}return i=this,l=d(n,r,Math.ceil(n.length/4)),c=d(n,r,Math.ceil(n.length/2)),l||c?(f=c?l&&l[4].length>c[4].length?l:c:l,e.length>t.length?(s=f[0],u=f[1],a=f[2],o=f[3]):(a=f[0],o=f[1],s=f[2],u=f[3]),[s,u,a,o,f[4]]):null},lt.prototype.diffLineMode=function(e,t,n){var r,i,s,o,a,u,l,c,f
for(e=(r=this.diffLinesToChars(e,t)).chars1,t=r.chars2,s=r.lineArray,i=this.DiffMain(e,t,!1,n),this.diffCharsToLines(i,s),this.diffCleanupSemantic(i),i.push([0,""]),o=0,u=0,a=0,c="",l="";o<i.length;){switch(i[o][0]){case 1:a++,l+=i[o][1]
break
case ct:u++,c+=i[o][1]
break
case 0:if(u>=1&&a>=1){for(i.splice(o-u-a,u+a),o=o-u-a,f=(r=this.DiffMain(c,l,!1,n)).length-1;f>=0;f--)i.splice(o,0,r[f])
o+=r.length}a=0,u=0,c="",l=""}o++}return i.pop(),i},lt.prototype.diffBisect=function(e,t,n){var r,i,s,o,a,u,l,c,f,d,h,p,g,m,v,b,y,k,w,x,E,T,C
for(r=e.length,i=t.length,o=s=Math.ceil((r+i)/2),a=2*s,u=new Array(a),l=new Array(a),c=0;c<a;c++)u[c]=-1,l[c]=-1
for(u[o+1]=0,l[o+1]=0,d=(f=r-i)%2!=0,h=0,p=0,g=0,m=0,E=0;E<s&&!(Date.now()>n);E++){for(T=-E+h;T<=E-p;T+=2){for(b=o+T,w=(y=T===-E||T!==E&&u[b-1]<u[b+1]?u[b+1]:u[b-1]+1)-T;y<r&&w<i&&e.charAt(y)===t.charAt(w);)y++,w++
if(u[b]=y,y>r)p+=2
else if(w>i)h+=2
else if(d&&(v=o+f-T)>=0&&v<a&&-1!==l[v]&&y>=(k=r-l[v]))return this.diffBisectSplit(e,t,y,w,n)}for(C=-E+g;C<=E-m;C+=2){for(v=o+C,x=(k=C===-E||C!==E&&l[v-1]<l[v+1]?l[v+1]:l[v-1]+1)-C;k<r&&x<i&&e.charAt(r-k-1)===t.charAt(i-x-1);)k++,x++
if(l[v]=k,k>r)m+=2
else if(x>i)g+=2
else if(!d&&(b=o+f-C)>=0&&b<a&&-1!==u[b]&&(w=o+(y=u[b])-b,y>=(k=r-k)))return this.diffBisectSplit(e,t,y,w,n)}}return[[ct,e],[1,t]]},lt.prototype.diffBisectSplit=function(e,t,n,r,i){var s,o,a,u,l,c
return s=e.substring(0,n),a=t.substring(0,r),o=e.substring(n),u=t.substring(r),l=this.DiffMain(s,a,!1,i),c=this.DiffMain(o,u,!1,i),l.concat(c)},lt.prototype.diffCleanupSemantic=function(e){for(var t,n,r,i,s=!1,o=[],a=0,u=null,l=0,c=0,f=0,d=0,h=0;l<e.length;)0===e[l][0]?(o[a++]=l,c=d,f=h,d=0,h=0,u=e[l][1]):(1===e[l][0]?d+=e[l][1].length:h+=e[l][1].length,u&&u.length<=Math.max(c,f)&&u.length<=Math.max(d,h)&&(e.splice(o[a-1],0,[ct,u]),e[o[a-1]+1][0]=1,a--,l=--a>0?o[a-1]:-1,c=0,f=0,d=0,h=0,u=null,s=!0)),l++
for(s&&this.diffCleanupMerge(e),l=1;l<e.length;)e[l-1][0]===ct&&1===e[l][0]&&(t=e[l-1][1],n=e[l][1],(r=this.diffCommonOverlap(t,n))>=(i=this.diffCommonOverlap(n,t))?(r>=t.length/2||r>=n.length/2)&&(e.splice(l,0,[0,n.substring(0,r)]),e[l-1][1]=t.substring(0,t.length-r),e[l+1][1]=n.substring(r),l++):(i>=t.length/2||i>=n.length/2)&&(e.splice(l,0,[0,t.substring(0,i)]),e[l-1][0]=1,e[l-1][1]=n.substring(0,n.length-i),e[l+1][0]=ct,e[l+1][1]=t.substring(i),l++),l++),l++},lt.prototype.diffCommonOverlap=function(e,t){var n=e.length,r=t.length
if(0===n||0===r)return 0
n>r?e=e.substring(n-r):n<r&&(t=t.substring(0,n))
var i=Math.min(n,r)
if(e===t)return i
for(var s=0,o=1;;){var a=e.substring(i-o),u=t.indexOf(a)
if(-1===u)return s
o+=u,0!==u&&e.substring(i-o)!==t.substring(0,o)||(s=o,o++)}},lt.prototype.diffLinesToChars=function(e,t){var n=[],r={}
function i(e){for(var t="",i=0,s=-1,o=n.length;s<e.length-1;){-1===(s=e.indexOf("\n",i))&&(s=e.length-1)
var a=e.substring(i,s+1)
i=s+1,ft.call(r,a)?t+=String.fromCharCode(r[a]):(t+=String.fromCharCode(o),r[a]=o,n[o++]=a)}return t}return n[0]="",{chars1:i(e),chars2:i(t),lineArray:n}},lt.prototype.diffCharsToLines=function(e,t){for(var n=0;n<e.length;n++){for(var r=e[n][1],i=[],s=0;s<r.length;s++)i[s]=t[r.charCodeAt(s)]
e[n][1]=i.join("")}},lt.prototype.diffCleanupMerge=function(e){e.push([0,""])
for(var t=0,n=0,r=0,i="",s="";t<e.length;)switch(e[t][0]){case 1:r++,s+=e[t][1],t++
break
case ct:n++,i+=e[t][1],t++
break
case 0:if(n+r>1){if(0!==n&&0!==r){var o=this.diffCommonPrefix(s,i)
0!==o&&(t-n-r>0&&0===e[t-n-r-1][0]?e[t-n-r-1][1]+=s.substring(0,o):(e.splice(0,0,[0,s.substring(0,o)]),t++),s=s.substring(o),i=i.substring(o)),0!==(o=this.diffCommonSuffix(s,i))&&(e[t][1]=s.substring(s.length-o)+e[t][1],s=s.substring(0,s.length-o),i=i.substring(0,i.length-o))}0===n?e.splice(t-r,n+r,[1,s]):0===r?e.splice(t-n,n+r,[ct,i]):e.splice(t-n-r,n+r,[ct,i],[1,s]),t=t-n-r+(n?1:0)+(r?1:0)+1}else 0!==t&&0===e[t-1][0]?(e[t-1][1]+=e[t][1],e.splice(t,1)):t++
r=0,n=0,i="",s=""}""===e[e.length-1][1]&&e.pop()
var a=!1
for(t=1;t<e.length-1;){if(0===e[t-1][0]&&0===e[t+1][0]){var u=e[t][1]
u.substring(u.length-e[t-1][1].length)===e[t-1][1]?(e[t][1]=e[t-1][1]+e[t][1].substring(0,e[t][1].length-e[t-1][1].length),e[t+1][1]=e[t-1][1]+e[t+1][1],e.splice(t-1,1),a=!0):u.substring(0,e[t+1][1].length)===e[t+1][1]&&(e[t-1][1]+=e[t+1][1],e[t][1]=e[t][1].substring(e[t+1][1].length)+e[t+1][1],e.splice(t+1,1),a=!0)}t++}a&&this.diffCleanupMerge(e)}
var dt={}
W.currentModule.suiteReport=se,W.pq=new at(Ie)
var ht=!1,pt=!1
function gt(){pt=!0,g?g((function(){vt()})):vt()}function mt(){W.blocking=!1,W.pq.advance()}function vt(){if(W.started)mt()
else{W.reporters.console&&it.console.init(dt),W.reporters.tap&&it.tap.init(dt),W.started=_.now(),""===W.modules[0].name&&0===W.modules[0].tests.length&&W.modules.shift()
for(var e=[],t=0;t<W.modules.length;t++)""!==W.modules[t].name&&e.push({name:W.modules[t].name,moduleId:W.modules[t].moduleId,tests:W.modules[t].tests})
ke("runStart",se.start(!0)),Ce("begin",{totalTests:Se.count,modules:e}).then(mt)}}dt.isLocal=b&&b.location&&"file:"===b.location.protocol,dt.version="2.24.1",M(dt,{config:W,diff:function(e,t){var n,r
return r=(n=new lt).DiffMain(e,t),n.diffCleanupEfficiency(r),n.diffPrettyHtml(r)},dump:te,equiv:Y,reporters:it,hooks:ot,is:I,objectType:R,on:function(e,t){if("string"!=typeof e)throw new TypeError("eventName must be a string when registering a listener")
if(!q(e,be)){var n=be.join(", ")
throw new Error('"'.concat(e,'" is not a valid event; must be one of: ').concat(n,"."))}if("function"!=typeof t)throw new TypeError("callback must be a function when registering a listener")
var r=W._event_listeners[e]||(W._event_listeners[e]=[])
q(t,r)||(r.push(t),void 0!==W._event_memory[e]&&t(W._event_memory[e]))},onError:function(e){if(ne.warn("QUnit.onError is deprecated and will be removed in QUnit 3.0. Please use QUnit.onUncaughtException instead."),W.current&&W.current.ignoreGlobalErrors)return!0
var t=new Error(e.message)
return t.stack=e.stacktrace||e.fileName+":"+e.lineNumber,ut(t),!1},onUncaughtException:ut,pushFailure:qe,assert:ge.prototype,module:ce,test:Ie,todo:Ie.todo,skip:Ie.skip,only:Ie.only,start:function(e){if(W.current)throw new Error("QUnit.start cannot be called inside a test context.")
var t=ht
if(ht=!0,pt)throw new Error("Called start() while test already started running")
if(t||e>1)throw new Error("Called start() outside of a test context too many times")
if(W.autostart)throw new Error("Called start() outside of a test context when QUnit.config.autostart was true")
if(!W.pageLoaded)return W.autostart=!0,void(y||dt.autostart())
gt()},onUnhandledRejection:function(e){ne.warn("QUnit.onUnhandledRejection is deprecated and will be removed in QUnit 3.0. Please use QUnit.onUncaughtException instead."),ut(e)},extend:function(){ne.warn("QUnit.extend is deprecated and will be removed in QUnit 3.0. Please use Object.assign instead.")
for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return M.apply(this,t)},load:function(){ne.warn("QUnit.load is deprecated and will be removed in QUnit 3.0. https://qunitjs.com/api/QUnit/load/"),dt.autostart()},autostart:function(){W.pageLoaded=!0,M(W,{started:0,updateRate:1e3,autostart:!0,filter:""},!0),pt||(W.blocking=!1,W.autostart&&gt())},stack:function(e){return pe(e=(e||0)+2)}}),function(e){var t=["begin","done","log","testStart","testDone","moduleStart","moduleDone"]
function n(e){return function(t){if("function"!=typeof t)throw new Error("Callback parameter must be a function")
W.callbacks[e].push(t)}}for(var r=0;r<t.length;r++){var i=t[r]
void 0===W.callbacks[i]&&(W.callbacks[i]=[]),e[i]=n(i)}}(dt),function(i){if(b&&y){if(b.QUnit&&b.QUnit.version)throw new Error("QUnit has already been defined.")
b.QUnit=i}e&&e.exports&&(e.exports=i,e.exports.QUnit=i),t&&(t.QUnit=i),void 0===(r=function(){return i}.call(t,n,t,e))||(e.exports=r),i.config.autostart=!1}(dt),function(){if(b&&y){var e=dt.config,t=Object.prototype.hasOwnProperty
dt.begin((function(){if(!t.call(e,"fixture")){var n=y.getElementById("qunit-fixture")
n&&(e.fixture=n.cloneNode(!0))}})),dt.testStart((function(){if(null!=e.fixture){var t=y.getElementById("qunit-fixture")
if("string"===f(e.fixture)){var n=y.createElement("div")
n.setAttribute("id","qunit-fixture"),n.innerHTML=e.fixture,t.parentNode.replaceChild(n,t)}else{var r=e.fixture.cloneNode(!0)
t.parentNode.replaceChild(r,t)}}}))}}(),function(){var e=void 0!==b&&b.location
if(e){var t=function(){for(var t=Object.create(null),r=e.search.slice(1).split("&"),i=r.length,s=0;s<i;s++)if(r[s]){var o=r[s].split("="),a=n(o[0]),u=1===o.length||n(o.slice(1).join("="))
t[a]=a in t?[].concat(t[a],u):u}return t}()
dt.urlParams=t,dt.config.filter=t.filter,/^[0-9]+$/.test(t.maxDepth)&&(dt.config.maxDepth=dt.dump.maxDepth=+t.maxDepth),dt.config.module=t.module,dt.config.moduleId=[].concat(t.moduleId||[]),dt.config.testId=[].concat(t.testId||[]),"true"===t.seed||!0===t.seed?dt.config.seed=(Math.random().toString(36)+"0000000000").slice(2,12):t.seed&&(dt.config.seed=t.seed),dt.config.urlConfig.push({id:"hidepassed",label:"Hide passed tests",tooltip:"Only show tests and assertions that fail. Stored as query-strings."},{id:"noglobals",label:"Check for Globals",tooltip:"Enabling this will test if any test introduces new properties on the global object (`window` in Browsers). Stored as query-strings."},{id:"notrycatch",label:"No try-catch",tooltip:"Enabling this will run tests outside of a try-catch block. Makes debugging exceptions in IE reasonable. Stored as query-strings."}),dt.begin((function(){for(var e=dt.config.urlConfig,n=0;n<e.length;n++){var r=dt.config.urlConfig[n]
"string"!=typeof r&&(r=r.id),void 0===dt.config[r]&&(dt.config[r]=t[r])}}))}function n(e){return decodeURIComponent(e.replace(/\+/g,"%20"))}}()
var bt={exports:{}}
!function(e){var t,n
t=we,n=function(){var e=void 0!==xe&&"undefined"==typeof window,t="function"==typeof Map?Map:function(){var e=Object.create(null)
this.get=function(t){return e[t]},this.set=function(t,n){return e[t]=n,this},this.clear=function(){e=Object.create(null)}},n=new t,r=new t,i=[]
i.total=0
var s=[],o=[]
function a(){n.clear(),r.clear(),s=[],o=[]}function u(e){for(var t=-9007199254740991,n=e.length-1;n>=0;--n){var r=e[n]
if(null!==r){var i=r.score
i>t&&(t=i)}}return-9007199254740991===t?null:t}function l(e,t){var n=e[t]
if(void 0!==n)return n
var r=t
Array.isArray(t)||(r=t.split("."))
for(var i=r.length,s=-1;e&&++s<i;)e=e[r[s]]
return e}function c(e){return"object"===f(e)}var d=function(){var e=[],t=0,n={}
function r(){for(var n=0,r=e[n],i=1;i<t;){var s=i+1
n=i,s<t&&e[s].score<e[i].score&&(n=s),e[n-1>>1]=e[n],i=1+(n<<1)}for(var o=n-1>>1;n>0&&r.score<e[o].score;o=(n=o)-1>>1)e[n]=e[o]
e[n]=r}return n.add=function(n){var r=t
e[t++]=n
for(var i=r-1>>1;r>0&&n.score<e[i].score;i=(r=i)-1>>1)e[r]=e[i]
e[r]=n},n.poll=function(){if(0!==t){var n=e[0]
return e[0]=e[--t],r(),n}},n.peek=function(n){if(0!==t)return e[0]},n.replaceTop=function(t){e[0]=t,r()},n},h=d()
return function t(f){var p={single:function(e,t,n){return"farzher"==e?{target:"farzher was here (^-^*)/",score:0,indexes:[0,1,2,3,4,5,6]}:e?(c(e)||(e=p.getPreparedSearch(e)),t?(c(t)||(t=p.getPrepared(t)),((n&&void 0!==n.allowTypo?n.allowTypo:!f||void 0===f.allowTypo||f.allowTypo)?p.algorithm:p.algorithmNoTypo)(e,t,e[0])):null):null},go:function(e,t,n){if("farzher"==e)return[{target:"farzher was here (^-^*)/",score:0,indexes:[0,1,2,3,4,5,6],obj:t?t[0]:null}]
if(!e)return i
var r=(e=p.prepareSearch(e))[0],s=n&&n.threshold||f&&f.threshold||-9007199254740991,o=n&&n.limit||f&&f.limit||9007199254740991,a=(n&&void 0!==n.allowTypo?n.allowTypo:!f||void 0===f.allowTypo||f.allowTypo)?p.algorithm:p.algorithmNoTypo,d=0,g=0,m=t.length
if(n&&n.keys)for(var v=n.scoreFn||u,b=n.keys,y=b.length,k=m-1;k>=0;--k){for(var w=t[k],x=new Array(y),E=y-1;E>=0;--E)(_=l(w,C=b[E]))?(c(_)||(_=p.getPrepared(_)),x[E]=a(e,_,r)):x[E]=null
x.obj=w
var T=v(x)
null!==T&&(T<s||(x.score=T,d<o?(h.add(x),++d):(++g,T>h.peek().score&&h.replaceTop(x))))}else if(n&&n.key){var C=n.key
for(k=m-1;k>=0;--k)(_=l(w=t[k],C))&&(c(_)||(_=p.getPrepared(_)),null!==(S=a(e,_,r))&&(S.score<s||(S={target:S.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:S.score,indexes:S.indexes,obj:w},d<o?(h.add(S),++d):(++g,S.score>h.peek().score&&h.replaceTop(S)))))}else for(k=m-1;k>=0;--k){var _,S;(_=t[k])&&(c(_)||(_=p.getPrepared(_)),null!==(S=a(e,_,r))&&(S.score<s||(d<o?(h.add(S),++d):(++g,S.score>h.peek().score&&h.replaceTop(S)))))}if(0===d)return i
var q=new Array(d)
for(k=d-1;k>=0;--k)q[k]=h.poll()
return q.total=d+g,q},goAsync:function(t,n,r){var s=!1,o=new Promise((function(o,a){if("farzher"==t)return o([{target:"farzher was here (^-^*)/",score:0,indexes:[0,1,2,3,4,5,6],obj:n?n[0]:null}])
if(!t)return o(i)
var h=(t=p.prepareSearch(t))[0],g=d(),m=n.length-1,v=r&&r.threshold||f&&f.threshold||-9007199254740991,b=r&&r.limit||f&&f.limit||9007199254740991,y=(r&&void 0!==r.allowTypo?r.allowTypo:!f||void 0===f.allowTypo||f.allowTypo)?p.algorithm:p.algorithmNoTypo,k=0,w=0
function x(){if(s)return a("canceled")
var f=Date.now()
if(r&&r.keys)for(var d=r.scoreFn||u,E=r.keys,T=E.length;m>=0;--m){if(m%1e3==0&&Date.now()-f>=10)return void(e?setImmediate(x):setTimeout(x))
for(var C=n[m],_=new Array(T),S=T-1;S>=0;--S)(N=l(C,j=E[S]))?(c(N)||(N=p.getPrepared(N)),_[S]=y(t,N,h)):_[S]=null
_.obj=C
var q=d(_)
null!==q&&(q<v||(_.score=q,k<b?(g.add(_),++k):(++w,q>g.peek().score&&g.replaceTop(_))))}else if(r&&r.key)for(var j=r.key;m>=0;--m){if(m%1e3==0&&Date.now()-f>=10)return void(e?setImmediate(x):setTimeout(x));(N=l(C=n[m],j))&&(c(N)||(N=p.getPrepared(N)),null!==(M=y(t,N,h))&&(M.score<v||(M={target:M.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:M.score,indexes:M.indexes,obj:C},k<b?(g.add(M),++k):(++w,M.score>g.peek().score&&g.replaceTop(M)))))}else for(;m>=0;--m){if(m%1e3==0&&Date.now()-f>=10)return void(e?setImmediate(x):setTimeout(x))
var N,M;(N=n[m])&&(c(N)||(N=p.getPrepared(N)),null!==(M=y(t,N,h))&&(M.score<v||(k<b?(g.add(M),++k):(++w,M.score>g.peek().score&&g.replaceTop(M)))))}if(0===k)return o(i)
for(var R=new Array(k),I=k-1;I>=0;--I)R[I]=g.poll()
R.total=k+w,o(R)}e?setImmediate(x):x()}))
return o.cancel=function(){s=!0},o},highlight:function(e,t,n){if("function"==typeof t)return p.highlightCallback(e,t)
if(null===e)return null
void 0===t&&(t="<b>"),void 0===n&&(n="</b>")
for(var r="",i=0,s=!1,o=e.target,a=o.length,u=e.indexes,l=0;l<a;++l){var c=o[l]
if(u[i]===l){if(s||(s=!0,r+=t),++i===u.length){r+=c+n+o.substr(l+1)
break}}else s&&(s=!1,r+=n)
r+=c}return r},highlightCallback:function(e,t){if(null===e)return null
for(var n=e.target,r=n.length,i=e.indexes,s="",o=0,a=0,u=!1,l=(e=[],0);l<r;++l){var c=n[l]
if(i[a]===l){if(++a,u||(u=!0,e.push(s),s=""),a===i.length){s+=c,e.push(t(s,o++)),s="",e.push(n.substr(l+1))
break}}else u&&(u=!1,e.push(t(s,o++)),s="")
s+=c}return e},prepare:function(e){return e?{target:e,_targetLowerCodes:p.prepareLowerCodes(e),_nextBeginningIndexes:null,score:null,indexes:null,obj:null}:{target:"",_targetLowerCodes:[0],_nextBeginningIndexes:null,score:null,indexes:null,obj:null}},prepareSlow:function(e){return e?{target:e,_targetLowerCodes:p.prepareLowerCodes(e),_nextBeginningIndexes:p.prepareNextBeginningIndexes(e),score:null,indexes:null,obj:null}:{target:"",_targetLowerCodes:[0],_nextBeginningIndexes:null,score:null,indexes:null,obj:null}},prepareSearch:function(e){return e||(e=""),p.prepareLowerCodes(e)},getPrepared:function(e){if(e.length>999)return p.prepare(e)
var t=n.get(e)
return void 0!==t||(t=p.prepare(e),n.set(e,t)),t},getPreparedSearch:function(e){if(e.length>999)return p.prepareSearch(e)
var t=r.get(e)
return void 0!==t||(t=p.prepareSearch(e),r.set(e,t)),t},algorithm:function(e,t,n){for(var r=t._targetLowerCodes,i=e.length,a=r.length,u=0,l=0,c=0,f=0;;){if(n===r[l]){if(s[f++]=l,++u===i)break
n=e[0===c?u:c===u?u+1:c===u-1?u-1:u]}if(++l>=a)for(;;){if(u<=1)return null
if(0===c){if(n===e[--u])continue
c=u}else{if(1===c)return null
if((n=e[1+(u=--c)])===e[u])continue}l=s[(f=u)-1]+1
break}}u=0
var d=0,h=!1,g=0,m=t._nextBeginningIndexes
null===m&&(m=t._nextBeginningIndexes=p.prepareNextBeginningIndexes(t.target))
var v=l=0===s[0]?0:m[s[0]-1]
if(l!==a)for(;;)if(l>=a){if(u<=0){if(++d>i-2)break
if(e[d]===e[d+1])continue
l=v
continue}--u,l=m[o[--g]]}else if(e[0===d?u:d===u?u+1:d===u-1?u-1:u]===r[l]){if(o[g++]=l,++u===i){h=!0
break}++l}else l=m[l]
if(h)var b=o,y=g
else b=s,y=f
for(var k=0,w=-1,x=0;x<i;++x)w!==(l=b[x])-1&&(k-=l),w=l
for(h?0!==d&&(k+=-20):(k*=1e3,0!==c&&(k+=-20)),k-=a-i,t.score=k,t.indexes=new Array(y),x=y-1;x>=0;--x)t.indexes[x]=b[x]
return t},algorithmNoTypo:function(e,t,n){for(var r=t._targetLowerCodes,i=e.length,a=r.length,u=0,l=0,c=0;;){if(n===r[l]){if(s[c++]=l,++u===i)break
n=e[u]}if(++l>=a)return null}u=0
var f=!1,d=0,h=t._nextBeginningIndexes
if(null===h&&(h=t._nextBeginningIndexes=p.prepareNextBeginningIndexes(t.target)),(l=0===s[0]?0:h[s[0]-1])!==a)for(;;)if(l>=a){if(u<=0)break;--u,l=h[o[--d]]}else if(e[u]===r[l]){if(o[d++]=l,++u===i){f=!0
break}++l}else l=h[l]
if(f)var g=o,m=d
else g=s,m=c
for(var v=0,b=-1,y=0;y<i;++y)b!==(l=g[y])-1&&(v-=l),b=l
for(f||(v*=1e3),v-=a-i,t.score=v,t.indexes=new Array(m),y=m-1;y>=0;--y)t.indexes[y]=g[y]
return t},prepareLowerCodes:function(e){for(var t=e.length,n=[],r=e.toLowerCase(),i=0;i<t;++i)n[i]=r.charCodeAt(i)
return n},prepareBeginningIndexes:function(e){for(var t=e.length,n=[],r=0,i=!1,s=!1,o=0;o<t;++o){var a=e.charCodeAt(o),u=a>=65&&a<=90,l=u||a>=97&&a<=122||a>=48&&a<=57,c=u&&!i||!s||!l
i=u,s=l,c&&(n[r++]=o)}return n},prepareNextBeginningIndexes:function(e){for(var t=e.length,n=p.prepareBeginningIndexes(e),r=[],i=n[0],s=0,o=0;o<t;++o)i>o?r[o]=i:(i=n[++s],r[o]=void 0===i?t:i)
return r},cleanup:a,new:t}
return p}()},e.exports?e.exports=n():t.fuzzysort=n()}(bt)
var yt=bt.exports,kt={failedTests:[],defined:0,completed:0}
!function(){if(b&&y){dt.reporters.perf.init(dt)
var e=dt.config,t=[],n=!1,r=Object.prototype.hasOwnProperty,i=S({filter:void 0,module:void 0,moduleId:void 0,testId:void 0}),s=null
dt.on("runStart",(function(e){kt.defined=e.testCounts.total})),dt.begin((function(t){!function(t){var n,o,a,u,c,p,g,w,S=E("qunit")
S&&(S.setAttribute("role","main"),S.innerHTML="<h1 id='qunit-header'>"+D(y.title)+"</h1><h2 id='qunit-banner'></h2><div id='qunit-testrunner-toolbar' role='navigation'></div>"+(!(n=dt.config.testId)||n.length<=0?"":"<div id='qunit-filteredTest'>Rerunning selected tests: "+D(n.join(", "))+" <a id='qunit-clearFilter' href='"+D(i)+"'>Run all tests</a></div>")+"<h2 id='qunit-userAgent'></h2><ol id='qunit-tests'></ol>"),(o=E("qunit-header"))&&(o.innerHTML="<a href='"+D(i)+"'>"+o.innerHTML+"</a> "),(a=E("qunit-banner"))&&(a.className=""),g=E("qunit-tests"),(w=E("qunit-testresult"))&&w.parentNode.removeChild(w),g&&(g.innerHTML="",(w=y.createElement("p")).id="qunit-testresult",w.className="result",g.parentNode.insertBefore(w,g),w.innerHTML='<div id="qunit-testresult-display">Running...<br />&#160;</div><div id="qunit-testresult-controls"></div><div class="clearfix"></div>',c=E("qunit-testresult-controls")),c&&c.appendChild(((p=y.createElement("button")).id="qunit-abort-tests-button",p.innerHTML="Abort",f(p,"click",T),p)),(u=E("qunit-userAgent"))&&(u.innerHTML="",u.appendChild(y.createTextNode("QUnit "+dt.version+"; "+k.userAgent))),function(t){var n,i,o,a,u,c=E("qunit-testrunner-toolbar")
if(c){c.appendChild(((u=y.createElement("span")).innerHTML=function(){for(var t=!1,n=e.urlConfig,i="",s=0;s<n.length;s++){var o=e.urlConfig[s]
"string"==typeof o&&(o={id:o,label:o})
var a=D(o.id),u=D(o.tooltip)
if(o.value&&"string"!=typeof o.value){if(i+="<label for='qunit-urlconfig-"+a+"' title='"+u+"'>"+D(o.label)+": <select id='qunit-urlconfig-"+a+"' name='"+a+"' title='"+u+"'><option></option>",Array.isArray(o.value))for(var l=0;l<o.value.length;l++)i+="<option value='"+(a=D(o.value[l]))+"'"+(e[o.id]===o.value[l]?(t=!0)&&" selected='selected'":"")+">"+a+"</option>"
else for(var c in o.value)r.call(o.value,c)&&(i+="<option value='"+D(c)+"'"+(e[o.id]===c?(t=!0)&&" selected='selected'":"")+">"+D(o.value[c])+"</option>")
e[o.id]&&!t&&(i+="<option value='"+(a=D(e[o.id]))+"' selected='selected' disabled='disabled'>"+a+"</option>"),i+="</select></label>"}else i+="<label for='qunit-urlconfig-"+a+"' title='"+u+"'><input id='qunit-urlconfig-"+a+"' name='"+a+"' type='checkbox'"+(o.value?" value='"+D(o.value)+"'":"")+(e[o.id]?" checked='checked'":"")+" title='"+u+"' />"+D(o.label)+"</label>"}return i}(),m(u,"qunit-url-config"),h(u.getElementsByTagName("input"),"change",_),h(u.getElementsByTagName("select"),"change",_),u))
var p=y.createElement("span")
p.id="qunit-toolbar-filters",p.appendChild((n=y.createElement("form"),i=y.createElement("label"),o=y.createElement("input"),a=y.createElement("button"),m(n,"qunit-filter"),i.innerHTML="Filter: ",o.type="text",o.value=e.filter||"",o.name="filter",o.id="qunit-filter-input",a.innerHTML="Go",i.appendChild(o),n.appendChild(i),n.appendChild(y.createTextNode(" ")),n.appendChild(a),f(n,"submit",C),n)),p.appendChild(function(t){var n=null
if(s={options:t.modules.slice(),selectedMap:new x,isDirty:function(){return l(s.selectedMap.keys()).sort().join(",")!==l(n.keys()).sort().join(",")}},e.moduleId.length)for(var r=0;r<t.modules.length;r++){var i=t.modules[r];-1!==e.moduleId.indexOf(i.moduleId)&&s.selectedMap.set(i.moduleId,i.name)}n=new x(s.selectedMap)
var o=y.createElement("input")
o.id="qunit-modulefilter-search",o.autocomplete="off",f(o,"input",_),f(o,"input",T),f(o,"focus",T),f(o,"click",T)
var a=y.createElement("label")
a.htmlFor="qunit-modulefilter-search",a.textContent="Module:"
var u=y.createElement("span")
u.id="qunit-modulefilter-search-container",u.appendChild(o)
var c=y.createElement("button")
c.textContent="Apply",c.title="Re-run the selected test modules",f(c,"click",q)
var h=y.createElement("button")
h.textContent="Reset",h.type="reset",h.title="Restore the previous module selection"
var p=y.createElement("button")
p.textContent="Select none",p.type="button",p.title="Clear the current module selection",f(p,"click",(function(){s.selectedMap.clear(),S(),_()}))
var g=y.createElement("span")
g.id="qunit-modulefilter-actions",g.appendChild(c),g.appendChild(h),n.size&&g.appendChild(p)
var m=y.createElement("ul")
m.id="qunit-modulefilter-dropdown-list"
var k=y.createElement("div")
k.id="qunit-modulefilter-dropdown",k.style.display="none",k.appendChild(g),k.appendChild(m),f(k,"change",S),u.appendChild(k),S()
var w,E=y.createElement("form")
function T(){function e(t){var n=E.contains(t.target)
27!==t.keyCode&&n||(27===t.keyCode&&n&&o.focus(),k.style.display="none",d(y,"click",e),d(y,"keydown",e),o.value="",_())}"none"===k.style.display&&(_(),k.style.display="block",f(y,"click",e),f(y,"keydown",e))}function _(){b.clearTimeout(w),w=b.setTimeout((function(){m.innerHTML=function(e){return function(e){var t=""
s.selectedMap.forEach((function(e,n){t+=j(n,e,!0)}))
for(var n=0;n<e.length;n++){var r=e[n].obj
s.selectedMap.has(r.moduleId)||(t+=j(r.moduleId,r.name,!1))}return t}(""===e?s.options.slice(0,20).map((function(e){return{obj:e}})):yt.go(e,s.options,{limit:20,key:"name",allowTypo:!0}))}(o.value)}))}function S(e){var t=e&&e.target||null
t&&(t.checked?s.selectedMap.set(t.value,t.parentNode.textContent):s.selectedMap.delete(t.value),v(t.parentNode,"checked",t.checked))
var n=s.selectedMap.size?s.selectedMap.size+" "+(1===s.selectedMap.size?"module":"modules"):"All modules"
o.placeholder=n,o.title="Type to search through and reduce the list.",h.disabled=!s.isDirty(),p.style.display=s.selectedMap.size?"":"none"}return E.id="qunit-modulefilter",E.appendChild(a),E.appendChild(y.createTextNode(" ")),E.appendChild(u),f(E,"submit",C),f(E,"reset",(function(){s.selectedMap=new x(n),S(),_()})),E}(t))
var g=y.createElement("div")
g.className="clearfix",c.appendChild(p),c.appendChild(g)}}(t)}(t)})),dt.on("runEnd",(function(t){var n,r,i,s=E("qunit-banner"),o=E("qunit-tests"),a=E("qunit-abort-tests-button"),u=e.stats.all-e.stats.bad,l=[t.testCounts.total," tests completed in ",t.runtime," milliseconds, with ",t.testCounts.failed," failed, ",t.testCounts.skipped," skipped, and ",t.testCounts.todo," todo.<br />","<span class='passed'>",u,"</span> assertions of <span class='total'>",e.stats.all,"</span> passed, <span class='failed'>",e.stats.bad,"</span> failed.",R(kt.failedTests)].join("")
if(a&&a.disabled){l="Tests aborted after "+t.runtime+" milliseconds."
for(var c=0;c<o.children.length;c++)""!==(n=o.children[c]).className&&"running"!==n.className||(n.className="aborted",i=n.getElementsByTagName("ol")[0],(r=y.createElement("li")).className="fail",r.innerHTML="Test aborted.",i.appendChild(r))}!s||a&&!1!==a.disabled||(s.className="failed"===t.status?"qunit-fail":"qunit-pass"),a&&a.parentNode.removeChild(a),o&&(E("qunit-testresult-display").innerHTML=l),e.altertitle&&y.title&&(y.title=["failed"===t.status?"✖":"✔",y.title.replace(/^[\u2714\u2716] /i,"")].join(" ")),e.scrolltop&&b.scrollTo&&b.scrollTo(0,0)})),dt.testStart((function(e){var t,n
N(e.name,e.testId,e.module),(t=E("qunit-testresult-display"))&&(m(t,"running"),n=dt.config.reorder&&e.previousFailure,t.innerHTML=[O(kt),n?"Rerunning previously failed test: <br />":"Running: ",I(e.name,e.module),R(kt.failedTests)].join(""))})),dt.log((function(e){var t=E("qunit-test-output-"+e.testId)
if(t){var n,r,i,s=D(e.message)||(e.result?"okay":"failed")
s="<span class='test-message'>"+s+"</span>",s+="<span class='runtime'>@ "+e.runtime+" ms</span>"
var o=!1
e.result||void 0===e.expected&&void 0===e.actual?!e.result&&e.source&&(s+="<table><tr class='test-source'><th>Source: </th><td><pre>"+D(e.source)+"</pre></td></tr></table>"):(n=e.negative?"NOT "+dt.dump.parse(e.expected):dt.dump.parse(e.expected),r=dt.dump.parse(e.actual),s+="<table><tr class='test-expected'><th>Expected: </th><td><pre>"+D(n)+"</pre></td></tr>",r!==n?(s+="<tr class='test-actual'><th>Result: </th><td><pre>"+D(r)+"</pre></td></tr>","number"==typeof e.actual&&"number"==typeof e.expected?isNaN(e.actual)||isNaN(e.expected)||(o=!0,i=((i=e.actual-e.expected)>0?"+":"")+i):"boolean"!=typeof e.actual&&"boolean"!=typeof e.expected&&(o=L(i=dt.diff(n,r)).length!==L(n).length+L(r).length),o&&(s+="<tr class='test-diff'><th>Diff: </th><td><pre>"+i+"</pre></td></tr>")):-1!==n.indexOf("[object Array]")||-1!==n.indexOf("[object Object]")?s+="<tr class='test-message'><th>Message: </th><td>Diff suppressed as the depth of object is more than current max depth ("+dt.dump.maxDepth+").<p>Hint: Use <code>QUnit.dump.maxDepth</code> to  run with a higher max depth or <a href='"+D(S({maxDepth:0}))+"'>Rerun without max depth</a>.</p></td></tr>":s+="<tr class='test-message'><th>Message: </th><td>Diff suppressed as the expected and actual results have an equivalent serialization</td></tr>",e.source&&(s+="<tr class='test-source'><th>Source: </th><td><pre>"+D(e.source)+"</pre></td></tr>"),s+="</table>")
var a=t.getElementsByTagName("ol")[0],u=y.createElement("li")
u.className=e.result?"pass":"fail",u.innerHTML=s,a.appendChild(u)}})),dt.testDone((function(r){var i=E("qunit-tests"),s=E("qunit-test-output-"+r.testId)
if(i&&s){var o
w(s,"running"),o=r.failed>0?"failed":r.todo?"todo":r.skipped?"skipped":"passed"
var a=s.getElementsByTagName("ol")[0],u=r.passed,l=r.failed,c=r.failed>0?r.todo:!r.todo
c?m(a,"qunit-collapsed"):(kt.failedTests.push(r.testId),e.collapse&&(n?m(a,"qunit-collapsed"):n=!0))
var d=s.firstChild,h=l?"<b class='failed'>"+l+"</b>, <b class='passed'>"+u+"</b>, ":""
if(d.innerHTML+=" <b class='counts'>("+h+r.assertions.length+")</b>",kt.completed++,r.skipped){s.className="skipped"
var p=y.createElement("em")
p.className="qunit-skipped-label",p.innerHTML="skipped",s.insertBefore(p,d)}else{if(f(d,"click",(function(){v(a,"qunit-collapsed")})),s.className=c?"pass":"fail",r.todo){var g=y.createElement("em")
g.className="qunit-todo-label",g.innerHTML="todo",s.className+=" todo",s.insertBefore(g,d)}var b=y.createElement("span")
b.className="runtime",b.innerHTML=r.runtime+" ms",s.insertBefore(b,a)}if(r.source){var k=y.createElement("p")
k.innerHTML="<strong>Source: </strong>"+D(r.source),m(k,"qunit-source"),c&&m(k,"qunit-collapsed"),f(d,"click",(function(){v(k,"qunit-collapsed")})),s.appendChild(k)}e.hidepassed&&("passed"===o||r.skipped)&&(t.push(s),i.removeChild(s))}})),dt.on("error",(function(e){var t=N("global failure")
if(t){var n=D(A(e))
n="<span class='test-message'>"+n+"</span>",e&&e.stack&&(n+="<table><tr class='test-source'><th>Source: </th><td><pre>"+D(e.stack)+"</pre></td></tr></table>")
var r=t.getElementsByTagName("ol")[0],i=y.createElement("li")
i.className="fail",i.innerHTML=n,r.appendChild(i),t.className="fail"}}))
var o,a=(o=b.phantom)&&o.version&&o.version.major>0
a&&p.warn("Support for PhantomJS is deprecated and will be removed in QUnit 3.0."),a||"complete"!==y.readyState?f(b,"load",dt.autostart):dt.autostart()
var u=b.onerror
b.onerror=function(t,n,r,i,s){var o=!1
if(u){for(var a=arguments.length,l=new Array(a>5?a-5:0),c=5;c<a;c++)l[c-5]=arguments[c]
o=u.call.apply(u,[this,t,n,r,i,s].concat(l))}if(!0!==o){if(e.current&&e.current.ignoreGlobalErrors)return!0
var f=s||new Error(t)
!f.stack&&n&&r&&(f.stack="".concat(n,":").concat(r)),dt.onUncaughtException(f)}return o},b.addEventListener("unhandledrejection",(function(e){dt.onUncaughtException(e.reason)}))}function c(e){return"function"==typeof e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function f(e,t,n){e.addEventListener(t,n,!1)}function d(e,t,n){e.removeEventListener(t,n,!1)}function h(e,t,n){for(var r=e.length;r--;)f(e[r],t,n)}function g(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")>=0}function m(e,t){g(e,t)||(e.className+=(e.className?" ":"")+t)}function v(e,t,n){n||void 0===n&&!g(e,t)?m(e,t):w(e,t)}function w(e,t){for(var n=" "+e.className+" ";n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ")
e.className=c(n)}function E(e){return y.getElementById&&y.getElementById(e)}function T(){var e=E("qunit-abort-tests-button")
return e&&(e.disabled=!0,e.innerHTML="Aborting..."),dt.config.queue.length=0,!1}function C(e){var t=E("qunit-filter-input")
return t.value=c(t.value),q(),e&&e.preventDefault&&e.preventDefault(),!1}function _(){var n,r=this,i={}
n="selectedIndex"in r?r.options[r.selectedIndex].value||void 0:r.checked?r.defaultValue||!0:void 0,i[r.name]=n
var s=S(i)
if("hidepassed"===r.name&&"replaceState"in b.history){dt.urlParams[r.name]=n,e[r.name]=n||!1
var o=E("qunit-tests")
if(o)if(r.checked){for(var a=o.children.length,u=o.children,l=0;l<a;l++){var c=u[l],f=c?c.className:"",d=f.indexOf("pass")>-1,h=f.indexOf("skipped")>-1;(d||h)&&t.push(c)}for(var p=0;p<t.length;p++)o.removeChild(t[p])}else{for(var g=0;g<t.length;g++)o.appendChild(t[g])
t.length=0}b.history.replaceState(null,"",s)}else b.location=s}function S(e){var t="?",n=b.location
for(var i in e=M(M({},dt.urlParams),e))if(r.call(e,i)&&void 0!==e[i])for(var s=[].concat(e[i]),o=0;o<s.length;o++)t+=encodeURIComponent(i),!0!==s[o]&&(t+="="+encodeURIComponent(s[o])),t+="&"
return n.protocol+"//"+n.host+n.pathname+t.slice(0,-1)}function q(){var e=E("qunit-filter-input").value
b.location=S({filter:""===e?void 0:e,moduleId:l(s.selectedMap.keys()),module:void 0,testId:void 0})}function j(e,t,n){return'<li><label class="clickable'+(n?" checked":"")+'"><input type="checkbox" value="'+D(e)+'"'+(n?' checked="checked"':"")+" />"+D(t)+"</label></li>"}function N(e,t,n){var r=E("qunit-tests")
if(r){var i=y.createElement("strong")
i.className="qunit-test-name",i.innerHTML=I(e,n)
var s=y.createElement("li")
if(s.appendChild(i),void 0!==t){var o=y.createElement("a")
o.innerHTML="Rerun",o.href=S({testId:t}),s.id="qunit-test-output-"+t,s.appendChild(o)}var a=y.createElement("ol")
return a.className="qunit-assert-list",s.appendChild(a),r.appendChild(s),s}}function R(e){return 0===e.length?"":["<br /><a href='"+D(S({testId:e}))+"'>",1===e.length?"Rerun 1 failed test":"Rerun "+e.length+" failed tests","</a>"].join("")}function I(e,t){var n=""
return t&&(n="<span class='module-name'>"+D(t)+"</span>: "),n+"<span class='test-name'>"+D(e)+"</span>"}function O(e){return[e.completed," / ",e.defined," tests completed.<br />"].join("")}function L(e){return e.replace(/<\/?[^>]+(>|$)/g,"").replace(/&quot;/g,"").replace(/\s+/g,"")}}()}()},9244:(e,t,n)=>{"use strict"
n.r(t),n.d(t,{IS_DESCRIPTOR:()=>r,createDescriptor:()=>f,isDescriptor:()=>i,lookupDescriptorData:()=>a,registerDescriptorData:()=>o,resolveDOMElement:()=>u,resolveDOMElements:()=>l,resolveDescription:()=>c})
const r="__dom_element_descriptor_is_descriptor__"
function i(e){return Boolean("object"==typeof e&&e&&r in e)}function s(){const e=window
return e.domElementDescriptorsRegistry=e.domElementDescriptorsRegistry||new WeakMap,e.domElementDescriptorsRegistry}function o(e,t){t?s().set(e,t):s().delete(e)}function a(e){return s().get(e)||null}function u(e){let t=i(e)?a(e):e
if(!t)return null
if(void 0!==t.element)return t.element
for(let n of t.elements||[])return n
return null}function l(e){let t=i(e)?a(e):e
if(!t)return[]
if(t.elements)return Array.from(t.elements)
{let e=t.element
return e?[e]:[]}}function c(e){let t=i(e)?a(e):e
return t?.description}function f(e){let t={[r]:!0}
return o(t,e),t}}}])
