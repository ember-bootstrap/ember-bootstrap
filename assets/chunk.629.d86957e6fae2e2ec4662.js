/*! For license information please see chunk.629.d86957e6fae2e2ec4662.js.LICENSE.txt */
(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[629],{380:(e,t,n)=>{var r
e=n.nmd(e),function(){"use strict"
function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]
if(null!=n){var r,i,o=[],s=!0,a=!1
try{for(n=n.call(e);!(s=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);s=!0);}catch(e){a=!0,i=e}finally{try{s||null==n.return||n.return()}finally{if(a)throw i}}return o}}(e,t)||c(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e){return function(e){if(Array.isArray(e))return f(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||c(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){if(e){if("string"==typeof e)return f(e,t)
var n=Object.prototype.toString.call(e).slice(8,-1)
return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}function f(e,t){(null==t||t>e.length)&&(t=e.length)
for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n]
return r}var d=function(){if("undefined"!=typeof globalThis)return globalThis
if("undefined"!=typeof self)return self
if(void 0!==h)return h
if("undefined"!=typeof global)return global
throw new Error("Unable to locate global object")}(),h=d.window,p=d.console,g=d.setTimeout,m=d.clearTimeout,v=h&&h.document,b=h&&h.navigator,y=function(){var e="qunit-test-string"
try{return d.sessionStorage.setItem(e,e),d.sessionStorage.removeItem(e),d.sessionStorage}catch(e){return}}(),k="function"==typeof d.Map&&"function"==typeof d.Map.prototype.keys&&"function"==typeof d.Symbol&&"symbol"===i(d.Symbol.iterator)?d.Map:function(e){var t=this,n=Object.create(null),r=Object.prototype.hasOwnProperty
this.has=function(e){return r.call(n,e)},this.get=function(e){return n[e]},this.set=function(e,t){return r.call(n,e)||this.size++,n[e]=t,this},this.delete=function(e){r.call(n,e)&&(delete n[e],this.size--)},this.forEach=function(e){for(var t in n)e(n[t],t)},this.keys=function(){return Object.keys(n)},this.clear=function(){n=Object.create(null),this.size=0},this.size=0,e&&e.forEach((function(e,n){t.set(n,e)}))},w="function"==typeof d.Set&&"function"==typeof d.Set.prototype.values?d.Set:function(e){var t=Object.create(null)
return Array.isArray(e)&&e.forEach((function(e){t[e]=!0})),{add:function(e){t[e]=!0},has:function(e){return e in t},get size(){return Object.keys(t).length}}},E=Object.prototype.toString,x=Object.prototype.hasOwnProperty,T={now:h&&h.performance&&h.performance.now?h.performance.now.bind(h.performance):Date.now}
function C(e,t){return e.filter((function(e){return-1===t.indexOf(e)}))}var S=Array.prototype.includes?function(e,t){return t.includes(e)}:function(e,t){return-1!==t.indexOf(e)}
function M(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=t&&R("array",e)?[]:{}
for(var r in e)if(x.call(e,r)){var i=e[r]
n[r]=i===Object(i)?M(i,t):i}return n}function N(e,t){if(e!==Object(e))return e
var n={}
for(var r in t)x.call(t,r)&&x.call(e,r)&&(n[r]=N(e[r],t[r]))
return n}function q(e,t,n){for(var r in t)x.call(t,r)&&(void 0===t[r]?delete e[r]:n&&void 0!==e[r]||(e[r]=t[r]))
return e}function j(e){if(void 0===e)return"undefined"
if(null===e)return"null"
var t=E.call(e).match(/^\[object\s(.*)\]$/),n=t&&t[1]
switch(n){case"Number":return isNaN(e)?"nan":"number"
case"String":case"Boolean":case"Array":case"Set":case"Map":case"Date":case"RegExp":case"Function":case"Symbol":return n.toLowerCase()
default:return i(e)}}function R(e,t){return j(t)===e}function _(e,t){for(var n=e+""+t,r=0,i=0;i<n.length;i++)r=(r<<5)-r+n.charCodeAt(i),r|=0
var o=(4294967296+r).toString(16)
return o.length<8&&(o="0000000"+o),o.slice(-8)}function I(e){var t=String(e)
return"[object"===t.slice(0,7)?(e.name||"Error")+(e.message?": ".concat(e.message):""):t}function O(e){return e?(""+e).replace(/['"<>&]/g,(function(e){switch(e){case"'":return"&#039;"
case'"':return"&quot;"
case"<":return"&lt;"
case">":return"&gt;"
case"&":return"&amp;"}})):""}var A=new w(["boolean","number","string"]),L=[]
function D(e,t){return e===t}function P(e,t){return e===t||e.valueOf()===t.valueOf()}function H(e){var t=Object.getPrototypeOf(e)
return t&&null!==t.constructor?e.constructor:Object}function U(e){return"flags"in e?e.flags:e.toString().match(/[gimuy]*$/)[0]}var F={undefined:D,null:D,boolean:P,number:function(e,t){return e===t||e.valueOf()===t.valueOf()||isNaN(e.valueOf())&&isNaN(t.valueOf())},string:P,symbol:D,date:P,nan:function(){return!0},regexp:function(e,t){return e.source===t.source&&U(e)===U(t)},function:D,array:function(e,t){if(e.length!==t.length)return!1
for(var n=0;n<e.length;n++)if(!B(e[n],t[n]))return!1
return!0},set:function(e,t){if(e.size!==t.size)return!1
var n=!0
return e.forEach((function(e){if(n){var r=!1
t.forEach((function(t){if(!r){var n=L
L=[],B(t,e)&&(r=!0),L=n}})),r||(n=!1)}})),n},map:function(e,t){if(e.size!==t.size)return!1
var n=!0
return e.forEach((function(e,r){if(n){var i=!1
t.forEach((function(t,n){if(!i){var o=L
L=[],F.array([t,n],[e,r])&&(i=!0),L=o}})),i||(n=!1)}})),n}},Q={undefined:D,null:D,boolean:D,number:function(e,t){return e===t||isNaN(e)&&isNaN(t)},string:D,symbol:D,function:D,object:function(e,t){if(L.some((function(n){return n.a===e&&n.b===t})))return!0
L.push({a:e,b:t})
var n=j(e),r=j(t)
if("object"!==n||"object"!==r)return n===r&&F[n](e,t)
if(!1===function(e,t){return H(e)===H(t)}(e,t))return!1
var i=[],o=[]
for(var s in e)if(i.push(s),(e.constructor===Object||void 0===e.constructor||"function"!=typeof e[s]||"function"!=typeof t[s]||e[s].toString()!==t[s].toString())&&!B(e[s],t[s]))return!1
for(var a in t)o.push(a)
return F.array(i.sort(),o.sort())}}
function B(e,t){if(e===t)return!0
var n=i(e),r=i(t)
return n!==r?("object"===n&&A.has(j(e))?e.valueOf():e)===("object"===r&&A.has(j(t))?t.valueOf():t):Q[n](e,t)}function z(e,t){var n=B(e,t)
return L=[],n}function $(e,t){if(2===arguments.length)return e===t||z(e,t)
for(var n=arguments.length-1;n>0;){if(!z(arguments[n-1],arguments[n]))return!1
n--}return!0}var G={altertitle:!0,collapse:!0,failOnZeroTests:!0,filter:void 0,maxDepth:5,module:void 0,moduleId:void 0,reorder:!0,requireExpects:!1,scrolltop:!0,storage:y,testId:void 0,urlConfig:[],currentModule:{name:"",tests:[],childModules:[],testsRun:0,testsIgnored:0,hooks:{before:[],beforeEach:[],afterEach:[],after:[]}},globalHooks:{},pq:null,blocking:!0,callbacks:{},modules:[],queue:[],stats:{all:0,bad:0,testCount:0}},Y=d&&d.QUnit&&!d.QUnit.version&&d.QUnit.config
Y&&q(G,Y),G.modules.push(G.currentModule)
var W=function(){function e(e){return'"'+e.toString().replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'}function t(e){return e+""}function n(e,t,n){var r=s.separator(),i=s.indent(1)
return t.join&&(t=t.join(","+r+i)),t?[e,i+t,s.indent()+n].join(r):e+n}function r(e,t){if(s.maxDepth&&s.depth>s.maxDepth)return"[object Array]"
this.up()
for(var r=e.length,i=new Array(r);r--;)i[r]=this.parse(e[r],void 0,t)
return this.down(),n("[",i,"]")}var o=/^function (\w+)/,s={parse:function(e,t,n){var r=(n=n||[]).indexOf(e)
if(-1!==r)return"recursion(".concat(r-n.length,")")
t=t||this.typeOf(e)
var o=this.parsers[t],s=i(o)
if("function"===s){n.push(e)
var a=o.call(this,e,n)
return n.pop(),a}return"string"===s?o:"[ERROR: Missing QUnit.dump formatter for type "+t+"]"},typeOf:function(e){var t
return t=null===e?"null":void 0===e?"undefined":R("regexp",e)?"regexp":R("date",e)?"date":R("function",e)?"function":void 0!==e.setInterval&&void 0!==e.document&&void 0===e.nodeType?"window":9===e.nodeType?"document":e.nodeType?"node":function(e){return"[object Array]"===E.call(e)||"number"==typeof e.length&&void 0!==e.item&&(e.length?e.item(0)===e[0]:null===e.item(0)&&void 0===e[0])}(e)?"array":e.constructor===Error.prototype.constructor?"error":i(e),t},separator:function(){return this.multiline?this.HTML?"<br />":"\n":this.HTML?"&#160;":" "},indent:function(e){if(!this.multiline)return""
var t=this.indentChar
return this.HTML&&(t=t.replace(/\t/g,"   ").replace(/ /g,"&#160;")),new Array(this.depth+(e||0)).join(t)},up:function(e){this.depth+=e||1},down:function(e){this.depth-=e||1},setParser:function(e,t){this.parsers[e]=t},quote:e,literal:t,join:n,depth:1,maxDepth:G.maxDepth,parsers:{window:"[Window]",document:"[Document]",error:function(e){return'Error("'+e.message+'")'},unknown:"[Unknown]",null:"null",undefined:"undefined",function:function(e){var t="function",r="name"in e?e.name:(o.exec(e)||[])[1]
return r&&(t+=" "+r),n(t=[t+="(",s.parse(e,"functionArgs"),"){"].join(""),s.parse(e,"functionCode"),"}")},array:r,nodelist:r,arguments:r,object:function(e,t){var r=[]
if(s.maxDepth&&s.depth>s.maxDepth)return"[object Object]"
s.up()
var i=[]
for(var o in e)i.push(o)
var a=["message","name"]
for(var u in a){var l=a[u]
l in e&&!S(l,i)&&i.push(l)}i.sort()
for(var c=0;c<i.length;c++){var f=i[c],d=e[f]
r.push(s.parse(f,"key")+": "+s.parse(d,void 0,t))}return s.down(),n("{",r,"}")},node:function(e){var t=s.HTML?"&lt;":"<",n=s.HTML?"&gt;":">",r=e.nodeName.toLowerCase(),i=t+r,o=e.attributes
if(o)for(var a=0;a<o.length;a++){var u=o[a].nodeValue
u&&"inherit"!==u&&(i+=" "+o[a].nodeName+"="+s.parse(u,"attribute"))}return i+=n,3!==e.nodeType&&4!==e.nodeType||(i+=e.nodeValue),i+t+"/"+r+n},functionArgs:function(e){var t=e.length
if(!t)return""
for(var n=new Array(t);t--;)n[t]=String.fromCharCode(97+t)
return" "+n.join(", ")+" "},key:e,functionCode:"[code]",attribute:e,string:e,date:e,regexp:t,number:t,boolean:t,symbol:function(e){return e.toString()}},HTML:!1,indentChar:"  ",multiline:!0}
return s}(),J={warn:p?Function.prototype.bind.call(p.warn||p.log,p):function(){}},V=function(){function e(t,n){o(this,e),this.name=t,this.fullName=n?n.fullName.concat(t):[],this.globalFailureCount=0,this.tests=[],this.childSuites=[],n&&n.pushChildSuite(this)}return a(e,[{key:"start",value:function(e){return e&&(this._startTime=T.now()),{name:this.name,fullName:this.fullName.slice(),tests:this.tests.map((function(e){return e.start()})),childSuites:this.childSuites.map((function(e){return e.start()})),testCounts:{total:this.getTestCounts().total}}}},{key:"end",value:function(e){return e&&(this._endTime=T.now()),{name:this.name,fullName:this.fullName.slice(),tests:this.tests.map((function(e){return e.end()})),childSuites:this.childSuites.map((function(e){return e.end()})),testCounts:this.getTestCounts(),runtime:this.getRuntime(),status:this.getStatus()}}},{key:"pushChildSuite",value:function(e){this.childSuites.push(e)}},{key:"pushTest",value:function(e){this.tests.push(e)}},{key:"getRuntime",value:function(){return Math.round(this._endTime-this._startTime)}},{key:"getTestCounts",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{passed:0,failed:0,skipped:0,todo:0,total:0}
return e.failed+=this.globalFailureCount,e.total+=this.globalFailureCount,e=this.tests.reduce((function(e,t){return t.valid&&(e[t.getStatus()]++,e.total++),e}),e),this.childSuites.reduce((function(e,t){return t.getTestCounts(e)}),e)}},{key:"getStatus",value:function(){var e=this.getTestCounts(),t=e.total,n=e.failed,r=e.skipped,i=e.todo
return n?"failed":r===t?"skipped":i===t?"todo":"passed"}}]),e}(),Z=[],K=new V
function X(e,t,n){var r=t[n]
"function"==typeof r&&e[n].push(r),delete t[n]}function ee(e,t){return function(n){G.currentModule!==e&&J.warn("The `"+t+"` hook was called inside the wrong module (`"+G.currentModule.name+"`). Instead, use hooks provided by the callback to the containing module (`"+e.name+"`). This will become an error in QUnit 3.0."),e.hooks[t].push(n)}}function te(e,t,n){"function"==typeof t&&(n=t,t=void 0)
var r=function(e,t,n){var r=Z.length?Z.slice(-1)[0]:null,i=null!==r?[r.name,e].join(" > "):e,o=r?r.suiteReport:K,s=null!==r&&r.skip||n.skip,a=null!==r&&r.todo||n.todo,u={}
r&&q(u,r.testEnvironment),q(u,t)
var l={name:i,parentModule:r,hooks:{before:[],beforeEach:[],afterEach:[],after:[]},testEnvironment:u,tests:[],moduleId:_(i),testsRun:0,testsIgnored:0,childModules:[],suiteReport:new V(e,o),stats:null,skip:s,todo:!s&&a,ignored:n.ignored||!1}
return r&&r.childModules.push(l),G.modules.push(l),l}(e,t,arguments.length>3&&void 0!==arguments[3]?arguments[3]:{}),i=r.testEnvironment,o=r.hooks
X(o,i,"before"),X(o,i,"beforeEach"),X(o,i,"afterEach"),X(o,i,"after")
var s={before:ee(r,"before"),beforeEach:ee(r,"beforeEach"),afterEach:ee(r,"afterEach"),after:ee(r,"after")},a=G.currentModule
if(G.currentModule=r,"function"==typeof n){Z.push(r)
try{var u=n.call(r.testEnvironment,s)
u&&"function"==typeof u.then&&J.warn("Returning a promise from a module callback is not supported. Instead, use hooks for async behavior. This will become an error in QUnit 3.0.")}finally{Z.pop(),G.currentModule=r.parentModule||a}}}var ne=!1
function re(e,t,n){var r,i=ne&&(r=G.modules.filter((function(e){return!e.ignored})).map((function(e){return e.moduleId})),!Z.some((function(e){return r.includes(e.moduleId)})))
te(e,t,n,{ignored:i})}re.only=function(){ne||(G.modules.length=0,G.queue.length=0,G.currentModule.ignored=!0),ne=!0,te.apply(void 0,arguments)},re.skip=function(e,t,n){ne||te(e,t,n,{skip:!0})},re.todo=function(e,t,n){ne||te(e,t,n,{todo:!0})}
var ie=(se(0)||"").replace(/(:\d+)+\)?/,"").replace(/.+[/\\]/,"")
function oe(e,t){if(t=void 0===t?4:t,e&&e.stack){var n=e.stack.split("\n")
if(/^error$/i.test(n[0])&&n.shift(),ie){for(var r=[],i=t;i<n.length&&-1===n[i].indexOf(ie);i++)r.push(n[i])
if(r.length)return r.join("\n")}return n[t]}}function se(e){var t=new Error
if(!t.stack)try{throw t}catch(e){t=e}return oe(t,e)}var ae=function(){function e(t){o(this,e),this.test=t}return a(e,[{key:"timeout",value:function(e){if("number"!=typeof e)throw new Error("You must pass a number as the duration to assert.timeout")
this.test.timeout=e,G.timeout&&(m(G.timeout),G.timeout=null,G.timeoutHandler&&this.test.timeout>0&&this.test.internalResetTimeout(this.test.timeout))}},{key:"step",value:function(e){var t=e,n=!!e
this.test.steps.push(e),void 0===e||""===e?t="You must provide a message to assert.step":"string"!=typeof e&&(t="You must provide a string value to assert.step",n=!1),this.pushResult({result:n,message:t})}},{key:"verifySteps",value:function(e,t){var n=this.test.steps.slice()
this.deepEqual(n,e,t),this.test.steps.length=0}},{key:"expect",value:function(e){if(1!==arguments.length)return this.test.expected
this.test.expected=e}},{key:"async",value:function(e){if(void 0===e)e=1
else if("number"!=typeof e)throw new TypeError("async takes number as an input")
var t=e
return this.test.internalStop(t)}},{key:"push",value:function(t,n,r,i,o){return J.warn("assert.push is deprecated and will be removed in QUnit 3.0. Please use assert.pushResult instead (https://api.qunitjs.com/assert/pushResult)."),(this instanceof e?this:G.current.assert).pushResult({result:t,actual:n,expected:r,message:i,negative:o})}},{key:"pushResult",value:function(t){var n=this,r=n instanceof e&&n.test||G.current
if(!r)throw new Error("assertion outside test context, in "+se(2))
return n instanceof e||(n=r.assert),n.test.pushResult(t)}},{key:"ok",value:function(e,t){t||(t=e?"okay":"failed, expected argument to be truthy, was: ".concat(W.parse(e))),this.pushResult({result:!!e,actual:e,expected:!0,message:t})}},{key:"notOk",value:function(e,t){t||(t=e?"failed, expected argument to be falsy, was: ".concat(W.parse(e)):"okay"),this.pushResult({result:!e,actual:e,expected:!1,message:t})}},{key:"true",value:function(e,t){this.pushResult({result:!0===e,actual:e,expected:!0,message:t})}},{key:"false",value:function(e,t){this.pushResult({result:!1===e,actual:e,expected:!1,message:t})}},{key:"equal",value:function(e,t,n){this.pushResult({result:t==e,actual:e,expected:t,message:n})}},{key:"notEqual",value:function(e,t,n){this.pushResult({result:t!=e,actual:e,expected:t,message:n,negative:!0})}},{key:"propEqual",value:function(e,t,n){e=M(e),t=M(t),this.pushResult({result:$(e,t),actual:e,expected:t,message:n})}},{key:"notPropEqual",value:function(e,t,n){e=M(e),t=M(t),this.pushResult({result:!$(e,t),actual:e,expected:t,message:n,negative:!0})}},{key:"propContains",value:function(e,t,n){e=N(e,t),t=M(t,!1),this.pushResult({result:$(e,t),actual:e,expected:t,message:n})}},{key:"notPropContains",value:function(e,t,n){e=N(e,t),t=M(t),this.pushResult({result:!$(e,t),actual:e,expected:t,message:n,negative:!0})}},{key:"deepEqual",value:function(e,t,n){this.pushResult({result:$(e,t),actual:e,expected:t,message:n})}},{key:"notDeepEqual",value:function(e,t,n){this.pushResult({result:!$(e,t),actual:e,expected:t,message:n,negative:!0})}},{key:"strictEqual",value:function(e,t,n){this.pushResult({result:t===e,actual:e,expected:t,message:n})}},{key:"notStrictEqual",value:function(e,t,n){this.pushResult({result:t!==e,actual:e,expected:t,message:n,negative:!0})}},{key:"throws",value:function(t,n,r){var i=u(ue(n,r,"throws"),2)
n=i[0],r=i[1]
var o=this instanceof e&&this.test||G.current
if("function"==typeof t){var s,a=!1
o.ignoreGlobalErrors=!0
try{t.call(o.testEnvironment)}catch(e){s=e}if(o.ignoreGlobalErrors=!1,s){var l=u(le(s,n,r),3)
a=l[0],n=l[1],r=l[2]}o.assert.pushResult({result:a,actual:s&&I(s),expected:n,message:r})}else o.assert.pushResult({result:!1,actual:t,message:'The value provided to `assert.throws` in "'+o.testName+'" was not a function.'})}},{key:"rejects",value:function(t,n,r){var i=u(ue(n,r,"rejects"),2)
n=i[0],r=i[1]
var o=this instanceof e&&this.test||G.current,s=t&&t.then
if("function"==typeof s){var a=this.async()
return s.call(t,(function(){o.assert.pushResult({result:!1,message:'The promise returned by the `assert.rejects` callback in "'+o.testName+'" did not reject.',actual:t}),a()}),(function(e){var t,i=u(le(e,n,r),3)
t=i[0],n=i[1],r=i[2],o.assert.pushResult({result:t,actual:e&&I(e),expected:n,message:r}),a()}))}o.assert.pushResult({result:!1,message:'The value provided to `assert.rejects` in "'+o.testName+'" was not a promise.',actual:t})}}]),e}()
function ue(e,t,n){var r=j(e)
if("string"===r){if(void 0===t)return t=e,[e=void 0,t]
throw new Error("assert."+n+" does not accept a string value for the expected argument.\nUse a non-string object value (e.g. RegExp or validator function) instead if necessary.")}if(e&&"regexp"!==r&&"function"!==r&&"object"!==r)throw new Error("Invalid expected value type ("+r+") provided to assert."+n+".")
return[e,t]}function le(e,t,n){var r=!1,i=j(t)
if(t){if("regexp"===i)r=t.test(I(e)),t=String(t)
else if("function"===i&&void 0!==t.prototype&&e instanceof t)r=!0
else if("object"===i)r=e instanceof t.constructor&&e.name===t.name&&e.message===t.message,t=I(t)
else if("function"===i)try{r=!0===t.call({},e),t=null}catch(e){t=I(e)}}else r=!0
return[r,t,n]}ae.prototype.raises=ae.prototype.throws
var ce=Object.create(null),fe=["error","runStart","suiteStart","testStart","assertion","testEnd","suiteEnd","runEnd"]
function de(e,t){if("string"!=typeof e)throw new TypeError("eventName must be a string when emitting an event")
for(var n=ce[e],r=n?l(n):[],i=0;i<r.length;i++)r[i](t)}var he="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}
function pe(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ge={exports:{}}
!function(){var e=function(){if("undefined"!=typeof globalThis)return globalThis
if("undefined"!=typeof self)return self
if("undefined"!=typeof window)return window
if(void 0!==he)return he
throw new Error("unable to locate global object")}()
if("function"!=typeof e.Promise){var t=setTimeout
if(s.prototype.catch=function(e){return this.then(null,e)},s.prototype.then=function(e,t){var n=new this.constructor(o)
return a(this,new f(e,t,n)),n},s.prototype.finally=function(e){var t=this.constructor
return this.then((function(n){return t.resolve(e()).then((function(){return n}))}),(function(n){return t.resolve(e()).then((function(){return t.reject(n)}))}))},s.all=function(e){return new s((function(t,n){if(!r(e))return n(new TypeError("Promise.all accepts an array"))
var o=Array.prototype.slice.call(e)
if(0===o.length)return t([])
var s=o.length
function a(e,r){try{if(r&&("object"===i(r)||"function"==typeof r)){var u=r.then
if("function"==typeof u)return void u.call(r,(function(t){a(e,t)}),n)}o[e]=r,0==--s&&t(o)}catch(e){n(e)}}for(var u=0;u<o.length;u++)a(u,o[u])}))},s.allSettled=function(e){return new this((function(t,n){if(!e||void 0===e.length)return n(new TypeError(i(e)+" "+e+" is not iterable(cannot read property Symbol(Symbol.iterator))"))
var r=Array.prototype.slice.call(e)
if(0===r.length)return t([])
var o=r.length
function s(e,n){if(n&&("object"===i(n)||"function"==typeof n)){var a=n.then
if("function"==typeof a)return void a.call(n,(function(t){s(e,t)}),(function(n){r[e]={status:"rejected",reason:n},0==--o&&t(r)}))}r[e]={status:"fulfilled",value:n},0==--o&&t(r)}for(var a=0;a<r.length;a++)s(a,r[a])}))},s.resolve=function(e){return e&&"object"===i(e)&&e.constructor===s?e:new s((function(t){t(e)}))},s.reject=function(e){return new s((function(t,n){n(e)}))},s.race=function(e){return new s((function(t,n){if(!r(e))return n(new TypeError("Promise.race accepts an array"))
for(var i=0,o=e.length;i<o;i++)s.resolve(e[i]).then(t,n)}))},"function"==typeof setImmediate){var n=setImmediate
s._immediateFn=function(e){n(e)}}else s._immediateFn=function(e){t(e,0)}
s._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},ge.exports=s}else ge.exports=e.Promise
function r(e){return Boolean(e&&void 0!==e.length)}function o(){}function s(e){if(!(this instanceof s))throw new TypeError("Promises must be constructed via new")
if("function"!=typeof e)throw new TypeError("not a function")
this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],d(e,this)}function a(e,t){for(;3===e._state;)e=e._value
0!==e._state?(e._handled=!0,s._immediateFn((function(){var n=1===e._state?t.onFulfilled:t.onRejected
if(null!==n){var r
try{r=n(e._value)}catch(e){return void l(t.promise,e)}u(t.promise,r)}else(1===e._state?u:l)(t.promise,e._value)}))):e._deferreds.push(t)}function u(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.")
if(t&&("object"===i(t)||"function"==typeof t)){var n=t.then
if(t instanceof s)return e._state=3,e._value=t,void c(e)
if("function"==typeof n)return void d((r=n,o=t,function(){r.apply(o,arguments)}),e)}e._state=1,e._value=t,c(e)}catch(t){l(e,t)}var r,o}function l(e,t){e._state=2,e._value=t,c(e)}function c(e){2===e._state&&0===e._deferreds.length&&s._immediateFn((function(){e._handled||s._unhandledRejectionFn(e._value)}))
for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t])
e._deferreds=null}function f(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function d(e,t){var n=!1
try{e((function(e){n||(n=!0,u(t,e))}),(function(e){n||(n=!0,l(t,e))}))}catch(e){if(n)return
n=!0,l(t,e)}}}()
var me=ge.exports
function ve(e,t){var n=G.callbacks[e]
if("log"!==e){var r=me.resolve()
return n.forEach((function(e){r=r.then((function(){return me.resolve(e(t))}))})),r}n.map((function(e){return e(t)}))}var be=function(){function e(t,n,r){o(this,e),this.name=t,this.suiteName=n.name,this.fullName=n.fullName.concat(t),this.runtime=0,this.assertions=[],this.skipped=!!r.skip,this.todo=!!r.todo,this.valid=r.valid,this._startTime=0,this._endTime=0,n.pushTest(this)}return a(e,[{key:"start",value:function(e){return e&&(this._startTime=T.now()),{name:this.name,suiteName:this.suiteName,fullName:this.fullName.slice()}}},{key:"end",value:function(e){return e&&(this._endTime=T.now()),q(this.start(),{runtime:this.getRuntime(),status:this.getStatus(),errors:this.getFailedAssertions(),assertions:this.getAssertions()})}},{key:"pushAssertion",value:function(e){this.assertions.push(e)}},{key:"getRuntime",value:function(){return Math.round(this._endTime-this._startTime)}},{key:"getStatus",value:function(){return this.skipped?"skipped":(this.getFailedAssertions().length>0?this.todo:!this.todo)?this.todo?"todo":"passed":"failed"}},{key:"getFailedAssertions",value:function(){return this.assertions.filter((function(e){return!e.passed}))}},{key:"getAssertions",value:function(){return this.assertions.slice()}},{key:"slimAssertions",value:function(){this.assertions=this.assertions.map((function(e){return delete e.actual,delete e.expected,e}))}}]),e}()
function ye(e){if(this.expected=null,this.assertions=[],this.module=G.currentModule,this.steps=[],this.timeout=void 0,this.data=void 0,this.withData=!1,this.pauses=new k,this.nextPauseId=1,this.stackOffset=3,q(this,e),this.module.skip?(this.skip=!0,this.todo=!1):this.module.todo&&!this.skip&&(this.todo=!0),G.pq.finished)J.warn("Unexpected test after runEnd. This is unstable and will fail in QUnit 3.0.")
else{if(!this.skip&&"function"!=typeof this.callback){var t=this.todo?"QUnit.todo":"QUnit.test"
throw new TypeError("You must provide a callback to ".concat(t,'("').concat(this.testName,'")'))}for(var n=0,r=this.module.tests;n<r.length;n++)this.module.tests[n].name===this.testName&&(this.testName+=" ")
this.testId=_(this.module.name,this.testName),++ye.count,this.errorForStack=new Error,this.callback&&this.callback.validTest&&(this.errorForStack.stack=void 0),this.testReport=new be(this.testName,this.module.suiteReport,{todo:this.todo,skip:this.skip,valid:this.valid()}),this.module.tests.push({name:this.testName,testId:this.testId,skip:!!this.skip}),this.skip?(this.callback=function(){},this.async=!1,this.expected=0):this.assert=new ae(this)}}function ke(){if(!G.current)throw new Error("pushFailure() assertion outside test context, in "+se(2))
var e=G.current
return e.pushFailure.apply(e,arguments)}function we(){if(G.pollution=[],G.noglobals)for(var e in d)if(x.call(d,e)){if(/^qunit-test-output/.test(e))continue
G.pollution.push(e)}}ye.count=0,ye.prototype={get stack(){return oe(this.errorForStack,this.stackOffset)},before:function(){var e=this,t=this.module,n=function(e){for(var t=e,n=[];t&&0===t.testsRun;)n.push(t),t=t.parentModule
return n.reverse()}(t),r=me.resolve()
return n.forEach((function(e){r=r.then((function(){return e.stats={all:0,bad:0,started:T.now()},de("suiteStart",e.suiteReport.start(!0)),ve("moduleStart",{name:e.name,tests:e.tests})}))})),r.then((function(){return G.current=e,e.testEnvironment=q({},t.testEnvironment),e.started=T.now(),de("testStart",e.testReport.start(!0)),ve("testStart",{name:e.testName,module:t.name,testId:e.testId,previousFailure:e.previousFailure}).then((function(){G.pollution||we()}))}))},run:function(){if(G.current=this,G.notrycatch)e(this)
else try{e(this)}catch(e){this.pushFailure("Died on test #"+(this.assertions.length+1)+": "+(e.message||e)+"\n"+this.stack,oe(e,0)),we(),G.blocking&&Ne(this)}function e(e){var t
t=e.withData?e.callback.call(e.testEnvironment,e.assert,e.data):e.callback.call(e.testEnvironment,e.assert),e.resolvePromise(t),0===e.timeout&&e.pauses.size>0&&ke("Test did not finish synchronously even though assert.timeout( 0 ) was used.",se(2))}},after:function(){!function(){var e=G.pollution
we()
var t=C(G.pollution,e)
t.length>0&&ke("Introduced global variable(s): "+t.join(", "))
var n=C(e,G.pollution)
n.length>0&&ke("Deleted global variable(s): "+n.join(", "))}()},queueGlobalHook:function(e,t){var n=this
return function(){var r
if(G.current=n,G.notrycatch)r=e.call(n.testEnvironment,n.assert)
else try{r=e.call(n.testEnvironment,n.assert)}catch(e){return void n.pushFailure("Global "+t+" failed on "+n.testName+": "+I(e),oe(e,0))}n.resolvePromise(r,t)}},queueHook:function(e,t,n){var r=this,i=function(){var n=e.call(r.testEnvironment,r.assert)
r.resolvePromise(n,t)}
return function(){if("before"===t){if(0!==n.testsRun)return
r.preserveEnvironment=!0}if("after"!==t||function(e){return e.testsRun===je(e).filter((function(e){return!e.skip})).length-1}(n)||!(G.queue.length>0||G.pq.taskCount()>2))if(G.current=r,G.notrycatch)i()
else try{i()}catch(e){r.pushFailure(t+" failed on "+r.testName+": "+(e.message||e),oe(e,0))}}},hooks:function(e){var t=[]
return this.skip||(function(n){if(("beforeEach"===e||"afterEach"===e)&&G.globalHooks[e])for(var r=0;r<G.globalHooks[e].length;r++)t.push(n.queueGlobalHook(G.globalHooks[e][r],e))}(this),function n(r,i){if(i.parentModule&&n(r,i.parentModule),i.hooks[e].length)for(var o=0;o<i.hooks[e].length;o++)t.push(r.queueHook(i.hooks[e][o],e,i))}(this,this.module)),t},finish:function(){if(G.current=this,g&&(m(this.timeout),G.timeoutHandler=null),this.callback=void 0,this.steps.length){var e=this.steps.join(", ")
this.pushFailure("Expected assert.verifySteps() to be called before end of test "+"after using assert.step(). Unverified steps: ".concat(e),this.stack)}G.requireExpects&&null===this.expected?this.pushFailure("Expected number of assertions to be defined, but expect() was not called.",this.stack):null!==this.expected&&this.expected!==this.assertions.length?this.pushFailure("Expected "+this.expected+" assertions, but "+this.assertions.length+" were run",this.stack):null!==this.expected||this.assertions.length||this.pushFailure("Expected at least one assertion, but none were run - call expect(0) to accept zero assertions.",this.stack)
var t=this.module,n=t.name,r=this.testName,i=!!this.skip,o=!!this.todo,s=0,a=G.storage
this.runtime=Math.round(T.now()-this.started),G.stats.all+=this.assertions.length,G.stats.testCount+=1,t.stats.all+=this.assertions.length
for(var u=0;u<this.assertions.length;u++)this.assertions[u].result||(s++,G.stats.bad++,t.stats.bad++)
i?_e(t):function(e){for(e.testsRun++;e=e.parentModule;)e.testsRun++}(t),a&&(s?a.setItem("qunit-test-"+n+"-"+r,s):a.removeItem("qunit-test-"+n+"-"+r)),de("testEnd",this.testReport.end(!0)),this.testReport.slimAssertions()
var c=this
return ve("testDone",{name:r,module:n,skipped:i,todo:o,failed:s,passed:this.assertions.length-s,total:this.assertions.length,runtime:i?0:this.runtime,assertions:this.assertions,testId:this.testId,get source(){return c.stack}}).then((function(){if(Re(t)){for(var e=[t],n=t.parentModule;n&&Re(n);)e.push(n),n=n.parentModule
var r=me.resolve()
return e.forEach((function(e){r=r.then((function(){return function(e){for(var t=[e];t.length;){var n=t.shift()
n.hooks={},t.push.apply(t,l(n.childModules))}return de("suiteEnd",e.suiteReport.end(!0)),ve("moduleDone",{name:e.name,tests:e.tests,failed:e.stats.bad,passed:e.stats.all-e.stats.bad,total:e.stats.all,runtime:Math.round(T.now()-e.stats.started)})}(e)}))})),r}})).then((function(){G.current=void 0}))},preserveTestEnvironment:function(){this.preserveEnvironment&&(this.module.testEnvironment=this.testEnvironment,this.testEnvironment=q({},this.module.testEnvironment))},queue:function(){var e=this
if(this.valid()){var t=G.storage&&+G.storage.getItem("qunit-test-"+this.module.name+"-"+this.testName),n=G.reorder&&!!t
this.previousFailure=!!t,G.pq.add((function(){return[function(){return e.before()}].concat(l(e.hooks("before")),[function(){e.preserveTestEnvironment()}],l(e.hooks("beforeEach")),[function(){e.run()}],l(e.hooks("afterEach").reverse()),l(e.hooks("after").reverse()),[function(){e.after()},function(){return e.finish()}])}),n)}else _e(this.module)},pushResult:function(e){if(this!==G.current){var t=e&&e.message||"",n=this&&this.testName||""
throw new Error("Assertion occurred after test finished.\n> Test: "+n+"\n> Message: "+t+"\n")}var r={module:this.module.name,name:this.testName,result:e.result,message:e.message,actual:e.actual,testId:this.testId,negative:e.negative||!1,runtime:Math.round(T.now()-this.started),todo:!!this.todo}
if(x.call(e,"expected")&&(r.expected=e.expected),!e.result){var i=e.source||se()
i&&(r.source=i)}this.logAssertion(r),this.assertions.push({result:!!e.result,message:e.message})},pushFailure:function(e,t,n){if(!(this instanceof ye))throw new Error("pushFailure() assertion outside test context, was "+se(2))
this.pushResult({result:!1,message:e||"error",actual:n||null,source:t})},logAssertion:function(e){ve("log",e)
var t={passed:e.result,actual:e.actual,expected:e.expected,message:e.message,stack:e.source,todo:e.todo}
this.testReport.pushAssertion(t),de("assertion",t)},internalResetTimeout:function(e){m(G.timeout),G.timeout=g(G.timeoutHandler(e),e)},internalStop:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1
G.blocking=!0
var t,n=this,r=this.nextPauseId++,i={cancelled:!1,remaining:e}
return n.pauses.set(r,i),g&&("number"==typeof n.timeout?t=n.timeout:"number"==typeof G.testTimeout&&(t=G.testTimeout),"number"==typeof t&&t>0&&(G.timeoutHandler=function(e){return function(){G.timeout=null,i.cancelled=!0,n.pauses.delete(r),n.pushFailure("Test took longer than ".concat(e,"ms; test timed out."),se(2)),Ne(n)}},m(G.timeout),G.timeout=g(G.timeoutHandler(t),t))),function(){if(!i.cancelled){if(void 0===G.current)throw new Error("Unexpected release of async pause after tests finished.\n"+"> Test: ".concat(n.testName," [async #").concat(r,"]"))
if(G.current!==n)throw new Error("Unexpected release of async pause during a different test.\n"+"> Test: ".concat(n.testName," [async #").concat(r,"]"))
if(i.remaining<=0)throw new Error("Tried to release async pause that was already released.\n"+"> Test: ".concat(n.testName," [async #").concat(r,"]"))
i.remaining--,0===i.remaining&&n.pauses.delete(r),qe(n)}}},resolvePromise:function(e,t){if(null!=e){var n=this,r=e.then
if("function"==typeof r){var i=n.internalStop(),o=function(){i()}
G.notrycatch?r.call(e,o):r.call(e,o,(function(e){var r="Promise rejected "+(t?t.replace(/Each$/,""):"during")+' "'+n.testName+'": '+(e&&e.message||e)
n.pushFailure(r,oe(e,0)),we(),Ne(n)}))}}},valid:function(){if(this.callback&&this.callback.validTest)return!0
if(!function e(t,n){return!n||!n.length||S(t.moduleId,n)||t.parentModule&&e(t.parentModule,n)}(this.module,G.moduleId))return!1
if(G.testId&&G.testId.length&&!S(this.testId,G.testId))return!1
var e=G.module&&G.module.toLowerCase()
if(!function e(t,n){return!n||(t.name?t.name.toLowerCase():null)===n||!!t.parentModule&&e(t.parentModule,n)}(this.module,e))return!1
var t=G.filter
if(!t)return!0
var n=/^(!?)\/([\w\W]*)\/(i?$)/.exec(t),r=this.module.name+": "+this.testName
return n?this.regexFilter(!!n[1],n[2],n[3],r):this.stringFilter(t,r)},regexFilter:function(e,t,n,r){return new RegExp(t,n).test(r)!==e},stringFilter:function(e,t){e=e.toLowerCase(),t=t.toLowerCase()
var n="!"!==e.charAt(0)
return n||(e=e.slice(1)),-1!==t.indexOf(e)?n:!n}}
var Ee=!1
function xe(e){Ee||G.currentModule.ignored||new ye(e).queue()}function Te(e){G.currentModule.ignored||(Ee||(G.queue.length=0,Ee=!0),new ye(e).queue())}function Ce(e,t){xe({testName:e,callback:t})}function Se(e,t){return"".concat(e," [").concat(t,"]")}function Me(e,t){if(Array.isArray(e))for(var n=0;n<e.length;n++)t(e[n],n)
else{if("object"!==i(e)||null===e)throw new Error("test.each() expects an array or object as input, but\nfound ".concat(i(e)," instead."))
for(var r in e)t(e[r],r)}}function Ne(e){e.pauses.forEach((function(e){e.cancelled=!0})),e.pauses.clear(),qe(e)}function qe(e){e.pauses.size>0||(g?(m(G.timeout),G.timeout=g((function(){e.pauses.size>0||(m(G.timeout),G.timeout=null,G.blocking=!1,G.pq.advance())}))):(G.blocking=!1,G.pq.advance()))}function je(e){for(var t=[].concat(e.tests),n=l(e.childModules);n.length;){var r=n.shift()
t.push.apply(t,r.tests),n.push.apply(n,l(r.childModules))}return t}function Re(e){return e.testsRun+e.testsIgnored===je(e).length}function _e(e){for(e.testsIgnored++;e=e.parentModule;)e.testsIgnored++}q(Ce,{todo:function(e,t){xe({testName:e,callback:t,todo:!0})},skip:function(e){xe({testName:e,skip:!0})},only:function(e,t){Te({testName:e,callback:t})},each:function(e,t,n){Me(t,(function(t,r){xe({testName:Se(e,r),callback:n,withData:!0,stackOffset:5,data:t})}))}}),Ce.todo.each=function(e,t,n){Me(t,(function(t,r){xe({testName:Se(e,r),callback:n,todo:!0,withData:!0,stackOffset:5,data:t})}))},Ce.skip.each=function(e,t){Me(t,(function(t,n){xe({testName:Se(e,n),stackOffset:5,skip:!0})}))},Ce.only.each=function(e,t,n){Me(t,(function(t,r){Te({testName:Se(e,r),callback:n,withData:!0,stackOffset:5,data:t})}))}
var Ie,Oe,Ae,Le,De=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,e),this.log=n.log||Function.prototype.bind.call(p.log,p),t.on("error",this.onError.bind(this)),t.on("runStart",this.onRunStart.bind(this)),t.on("testStart",this.onTestStart.bind(this)),t.on("testEnd",this.onTestEnd.bind(this)),t.on("runEnd",this.onRunEnd.bind(this))}return a(e,[{key:"onError",value:function(e){this.log("error",e)}},{key:"onRunStart",value:function(e){this.log("runStart",e)}},{key:"onTestStart",value:function(e){this.log("testStart",e)}},{key:"onTestEnd",value:function(e){this.log("testEnd",e)}},{key:"onRunEnd",value:function(e){this.log("runEnd",e)}}],[{key:"init",value:function(t,n){return new e(t,n)}}]),e}(),Pe=h&&void 0!==h.performance&&"function"==typeof h.performance.mark&&"function"==typeof h.performance.measure?h.performance:void 0,He={measure:Pe?function(e,t,n){try{Pe.measure(e,t,n)}catch(e){J.warn("performance.measure could not be executed because of ",e.message)}}:function(){},mark:Pe?Pe.mark.bind(Pe):function(){}},Ue=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,e),this.perf=n.perf||He,t.on("runStart",this.onRunStart.bind(this)),t.on("runEnd",this.onRunEnd.bind(this)),t.on("suiteStart",this.onSuiteStart.bind(this)),t.on("suiteEnd",this.onSuiteEnd.bind(this)),t.on("testStart",this.onTestStart.bind(this)),t.on("testEnd",this.onTestEnd.bind(this))}return a(e,[{key:"onRunStart",value:function(){this.perf.mark("qunit_suite_0_start")}},{key:"onSuiteStart",value:function(e){var t=e.fullName.length
this.perf.mark("qunit_suite_".concat(t,"_start"))}},{key:"onSuiteEnd",value:function(e){var t=e.fullName.length,n=e.fullName.join(" – ")
this.perf.mark("qunit_suite_".concat(t,"_end")),this.perf.measure("QUnit Test Suite: ".concat(n),"qunit_suite_".concat(t,"_start"),"qunit_suite_".concat(t,"_end"))}},{key:"onTestStart",value:function(){this.perf.mark("qunit_test_start")}},{key:"onTestEnd",value:function(e){this.perf.mark("qunit_test_end")
var t=e.fullName.join(" – ")
this.perf.measure("QUnit Test: ".concat(t),"qunit_test_start","qunit_test_end")}},{key:"onRunEnd",value:function(){this.perf.mark("qunit_suite_0_end"),this.perf.measure("QUnit Test Run","qunit_suite_0_start","qunit_suite_0_end")}}],[{key:"init",value:function(t,n){return new e(t,n)}}]),e}(),Fe=!0
if("undefined"!=typeof process){var Qe=process.env||{}
Ie=Qe.FORCE_COLOR,Oe=Qe.NODE_DISABLE_COLORS,Ae=Qe.NO_COLOR,Le=Qe.TERM,Fe=process.stdout&&process.stdout.isTTY}var Be={enabled:!Oe&&null==Ae&&"dumb"!==Le&&(null!=Ie&&"0"!==Ie||Fe),reset:$e(0,0),bold:$e(1,22),dim:$e(2,22),italic:$e(3,23),underline:$e(4,24),inverse:$e(7,27),hidden:$e(8,28),strikethrough:$e(9,29),black:$e(30,39),red:$e(31,39),green:$e(32,39),yellow:$e(33,39),blue:$e(34,39),magenta:$e(35,39),cyan:$e(36,39),white:$e(37,39),gray:$e(90,39),grey:$e(90,39),bgBlack:$e(40,49),bgRed:$e(41,49),bgGreen:$e(42,49),bgYellow:$e(43,49),bgBlue:$e(44,49),bgMagenta:$e(45,49),bgCyan:$e(46,49),bgWhite:$e(47,49)}
function ze(e,t){for(var n,r=0,i="",o="";r<e.length;r++)i+=(n=e[r]).open,o+=n.close,~t.indexOf(n.close)&&(t=t.replace(n.rgx,n.close+n.open))
return i+t+o}function $e(e,t){var n={open:"[".concat(e,"m"),close:"[".concat(t,"m"),rgx:new RegExp("\\x1b\\[".concat(t,"m"),"g")}
return function(t){return void 0!==this&&void 0!==this.has?(~this.has.indexOf(e)||(this.has.push(e),this.keys.push(n)),void 0===t?this:Be.enabled?ze(this.keys,t+""):t+""):void 0===t?((r={has:[e],keys:[n]}).reset=Be.reset.bind(r),r.bold=Be.bold.bind(r),r.dim=Be.dim.bind(r),r.italic=Be.italic.bind(r),r.underline=Be.underline.bind(r),r.inverse=Be.inverse.bind(r),r.hidden=Be.hidden.bind(r),r.strikethrough=Be.strikethrough.bind(r),r.black=Be.black.bind(r),r.red=Be.red.bind(r),r.green=Be.green.bind(r),r.yellow=Be.yellow.bind(r),r.blue=Be.blue.bind(r),r.magenta=Be.magenta.bind(r),r.cyan=Be.cyan.bind(r),r.white=Be.white.bind(r),r.gray=Be.gray.bind(r),r.grey=Be.grey.bind(r),r.bgBlack=Be.bgBlack.bind(r),r.bgRed=Be.bgRed.bind(r),r.bgGreen=Be.bgGreen.bind(r),r.bgYellow=Be.bgYellow.bind(r),r.bgBlue=Be.bgBlue.bind(r),r.bgMagenta=Be.bgMagenta.bind(r),r.bgCyan=Be.bgCyan.bind(r),r.bgWhite=Be.bgWhite.bind(r),r):Be.enabled?ze([n],t+""):t+""
var r}}var Ge=Object.prototype.hasOwnProperty
function Ye(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4
if(void 0===e&&(e=String(e)),"number"!=typeof e||isFinite(e)||(e=String(e)),"number"==typeof e)return JSON.stringify(e)
if("string"==typeof e){if(""===e||/['"\\/[{}\]\r\n]/.test(e)||/[-?:,[\]{}#&*!|=>'"%@`]/.test(e[0])||/(^\s|\s$)/.test(e)||/^[\d._-]+$/.test(e)||/^(true|false|y|n|yes|no|on|off)$/i.test(e)){if(!/\n/.test(e))return JSON.stringify(e)
var n=new Array(t+1).join(" "),r=e.match(/\n+$/)
return 1===(r?r[0].length:0)?"|\n"+e.replace(/\n$/,"").split("\n").map((function(e){return n+e})).join("\n"):"|+\n"+e.split("\n").map((function(e){return n+e})).join("\n")}return e}return JSON.stringify(We(e),null,2)}function We(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]
if(-1!==n.indexOf(e))return"[Circular]"
switch(Object.prototype.toString.call(e).replace(/^\[.+\s(.+?)]$/,"$1").toLowerCase()){case"array":n.push(e),t=e.map((function(e){return We(e,n)})),n.pop()
break
case"object":n.push(e),t={},Object.keys(e).forEach((function(r){t[r]=We(e[r],n)})),n.pop()
break
default:t=e}return t}var Je=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,e),this.log=n.log||Function.prototype.bind.call(p.log,p),this.testCount=0,this.ended=!1,this.bailed=!1,t.on("error",this.onError.bind(this)),t.on("runStart",this.onRunStart.bind(this)),t.on("testEnd",this.onTestEnd.bind(this)),t.on("runEnd",this.onRunEnd.bind(this))}return a(e,[{key:"onRunStart",value:function(e){this.log("TAP version 13")}},{key:"onError",value:function(e){this.bailed||(this.bailed=!0,this.ended||(this.testCount=this.testCount+1,this.log(Be.red("not ok ".concat(this.testCount," global failure"))),this.logError(e)),this.log("Bail out! "+I(e).split("\n")[0]),this.ended&&this.logError(e))}},{key:"onTestEnd",value:function(e){var t=this
this.testCount=this.testCount+1,"passed"===e.status?this.log("ok ".concat(this.testCount," ").concat(e.fullName.join(" > "))):"skipped"===e.status?this.log(Be.yellow("ok ".concat(this.testCount," # SKIP ").concat(e.fullName.join(" > ")))):"todo"===e.status?(this.log(Be.cyan("not ok ".concat(this.testCount," # TODO ").concat(e.fullName.join(" > ")))),e.errors.forEach((function(e){return t.logAssertion(e,"todo")}))):(this.log(Be.red("not ok ".concat(this.testCount," ").concat(e.fullName.join(" > ")))),e.errors.forEach((function(e){return t.logAssertion(e)})))}},{key:"onRunEnd",value:function(e){this.ended=!0,this.log("1..".concat(e.testCounts.total)),this.log("# pass ".concat(e.testCounts.passed)),this.log(Be.yellow("# skip ".concat(e.testCounts.skipped))),this.log(Be.cyan("# todo ".concat(e.testCounts.todo))),this.log(Be.red("# fail ".concat(e.testCounts.failed)))}},{key:"logAssertion",value:function(e,t){var n="  ---"
n+="\n  message: ".concat(Ye(e.message||"failed")),n+="\n  severity: ".concat(Ye(t||"failed")),Ge.call(e,"actual")&&(n+="\n  actual  : ".concat(Ye(e.actual))),Ge.call(e,"expected")&&(n+="\n  expected: ".concat(Ye(e.expected))),e.stack&&(n+="\n  stack: ".concat(Ye(e.stack+"\n"))),n+="\n  ...",this.log(n)}},{key:"logError",value:function(e){var t="  ---"
t+="\n  message: ".concat(Ye(I(e))),t+="\n  severity: ".concat(Ye("failed")),e&&e.stack&&(t+="\n  stack: ".concat(Ye(e.stack+"\n"))),t+="\n  ...",this.log(t)}}],[{key:"init",value:function(t,n){return new e(t,n)}}]),e}(),Ve={console:De,perf:Ue,tap:Je}
function Ze(e){return function(t){G.globalHooks[e]||(G.globalHooks[e]=[]),G.globalHooks[e].push(t)}}var Ke={beforeEach:Ze("beforeEach"),afterEach:Ze("afterEach")},Xe=function(){function e(t){o(this,e),this.test=t,this.priorityCount=0,this.unitSampler=null,this.taskQueue=[],this.finished=!1}return a(e,[{key:"advance",value:function(){this.advanceTaskQueue(),this.taskQueue.length||G.blocking||G.current||this.advanceTestQueue()}},{key:"advanceTaskQueue",value:function(){var e=T.now()
G.depth=(G.depth||0)+1,this.processTaskQueue(e),G.depth--}},{key:"processTaskQueue",value:function(e){var t=this
if(this.taskQueue.length&&!G.blocking){var n=T.now()-e
if(!g||G.updateRate<=0||n<G.updateRate){var r=this.taskQueue.shift()
me.resolve(r()).then((function(){t.taskQueue.length?t.processTaskQueue(e):t.advance()}))}else g((function(){t.advance()}))}}},{key:"advanceTestQueue",value:function(){if(G.blocking||G.queue.length||0!==G.depth){var e=G.queue.shift()
this.addToTaskQueue(e()),this.priorityCount>0&&this.priorityCount--,this.advance()}else this.done()}},{key:"addToTaskQueue",value:function(e){var t;(t=this.taskQueue).push.apply(t,l(e))}},{key:"taskCount",value:function(){return this.taskQueue.length}},{key:"add",value:function(e,t){if(t)G.queue.splice(this.priorityCount++,0,e)
else if(G.seed){this.unitSampler||(this.unitSampler=(r=G.seed,i=parseInt(_(r),16)||-1,function(){return i^=i<<13,i^=i>>>17,(i^=i<<5)<0&&(i+=4294967296),i/4294967296}))
var n=Math.floor(this.unitSampler()*(G.queue.length-this.priorityCount+1))
G.queue.splice(this.priorityCount+n,0,e)}else G.queue.push(e)
var r,i}},{key:"done",value:function(){var e
if(0===G.stats.testCount&&!0===G.failOnZeroTests)return e=G.filter&&G.filter.length?new Error('No tests matched the filter "'.concat(G.filter,'".')):G.module&&G.module.length?new Error('No tests matched the module "'.concat(G.module,'".')):G.moduleId&&G.moduleId.length?new Error('No tests matched the moduleId "'.concat(G.moduleId,'".')):G.testId&&G.testId.length?new Error('No tests matched the testId "'.concat(G.testId,'".')):new Error("No tests were run."),this.test("global failure",q((function(t){t.pushResult({result:!1,message:e.message,source:e.stack})}),{validTest:!0})),void this.advance()
var t=G.storage,n=Math.round(T.now()-G.started),r=G.stats.all-G.stats.bad
this.finished=!0,de("runEnd",K.end(!0)),ve("done",{passed:r,failed:G.stats.bad,total:G.stats.all,runtime:n}).then((function(){if(t&&0===G.stats.bad)for(var e=t.length-1;e>=0;e--){var n=t.key(e)
0===n.indexOf("qunit-test-")&&t.removeItem(n)}}))}}]),e}()
function et(e){G.current?G.current.assert.pushResult({result:!1,message:"global failure: ".concat(I(e)),source:e&&e.stack||se(2)}):(K.globalFailureCount++,G.stats.bad++,G.stats.all++,de("error",e))}function tt(){}var nt=-1,rt=Object.prototype.hasOwnProperty
tt.prototype.DiffMain=function(e,t,n){var r=Date.now()+1e3
if(null===e||null===t)throw new Error("Cannot diff null input.")
if(e===t)return e?[[0,e]]:[]
void 0===n&&(n=!0)
var i=this.diffCommonPrefix(e,t),o=e.substring(0,i)
e=e.substring(i),t=t.substring(i),i=this.diffCommonSuffix(e,t)
var s=e.substring(e.length-i)
e=e.substring(0,e.length-i),t=t.substring(0,t.length-i)
var a=this.diffCompute(e,t,n,r)
return o&&a.unshift([0,o]),s&&a.push([0,s]),this.diffCleanupMerge(a),a},tt.prototype.diffCleanupEfficiency=function(e){var t,n,r,i,o,s,a,u,l
for(t=!1,n=[],r=0,i=null,o=0,s=!1,a=!1,u=!1,l=!1;o<e.length;)0===e[o][0]?(e[o][1].length<4&&(u||l)?(n[r++]=o,s=u,a=l,i=e[o][1]):(r=0,i=null),u=l=!1):(e[o][0]===nt?l=!0:u=!0,i&&(s&&a&&u&&l||i.length<2&&s+a+u+l===3)&&(e.splice(n[r-1],0,[nt,i]),e[n[r-1]+1][0]=1,r--,i=null,s&&a?(u=l=!0,r=0):(o=--r>0?n[r-1]:-1,u=l=!1),t=!0)),o++
t&&this.diffCleanupMerge(e)},tt.prototype.diffPrettyHtml=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n][0],i=e[n][1]
switch(r){case 1:t[n]="<ins>"+O(i)+"</ins>"
break
case nt:t[n]="<del>"+O(i)+"</del>"
break
case 0:t[n]="<span>"+O(i)+"</span>"}}return t.join("")},tt.prototype.diffCommonPrefix=function(e,t){var n,r,i,o
if(!e||!t||e.charAt(0)!==t.charAt(0))return 0
for(i=0,n=r=Math.min(e.length,t.length),o=0;i<n;)e.substring(o,n)===t.substring(o,n)?o=i=n:r=n,n=Math.floor((r-i)/2+i)
return n},tt.prototype.diffCommonSuffix=function(e,t){var n,r,i,o
if(!e||!t||e.charAt(e.length-1)!==t.charAt(t.length-1))return 0
for(i=0,n=r=Math.min(e.length,t.length),o=0;i<n;)e.substring(e.length-n,e.length-o)===t.substring(t.length-n,t.length-o)?o=i=n:r=n,n=Math.floor((r-i)/2+i)
return n},tt.prototype.diffCompute=function(e,t,n,r){var i,o,s,a,u,l,c,f,d,h,p,g
return e?t?(o=e.length>t.length?e:t,s=e.length>t.length?t:e,-1!==(a=o.indexOf(s))?(i=[[1,o.substring(0,a)],[0,s],[1,o.substring(a+s.length)]],e.length>t.length&&(i[0][0]=i[2][0]=nt),i):1===s.length?[[nt,e],[1,t]]:(u=this.diffHalfMatch(e,t))?(l=u[0],f=u[1],c=u[2],d=u[3],h=u[4],p=this.DiffMain(l,c,n,r),g=this.DiffMain(f,d,n,r),p.concat([[0,h]],g)):n&&e.length>100&&t.length>100?this.diffLineMode(e,t,r):this.diffBisect(e,t,r)):[[nt,e]]:[[1,t]]},tt.prototype.diffHalfMatch=function(e,t){var n,r,i,o,s,a,u,l,c,f
if(n=e.length>t.length?e:t,r=e.length>t.length?t:e,n.length<4||2*r.length<n.length)return null
function d(e,t,n){var r,o,s,a,u,l,c,f,d
for(r=e.substring(n,n+Math.floor(e.length/4)),o=-1,s="";-1!==(o=t.indexOf(r,o+1));)a=i.diffCommonPrefix(e.substring(n),t.substring(o)),u=i.diffCommonSuffix(e.substring(0,n),t.substring(0,o)),s.length<u+a&&(s=t.substring(o-u,o)+t.substring(o,o+a),l=e.substring(0,n-u),c=e.substring(n+a),f=t.substring(0,o-u),d=t.substring(o+a))
return 2*s.length>=e.length?[l,c,f,d,s]:null}return i=this,l=d(n,r,Math.ceil(n.length/4)),c=d(n,r,Math.ceil(n.length/2)),l||c?(f=c?l&&l[4].length>c[4].length?l:c:l,e.length>t.length?(o=f[0],u=f[1],a=f[2],s=f[3]):(a=f[0],s=f[1],o=f[2],u=f[3]),[o,u,a,s,f[4]]):null},tt.prototype.diffLineMode=function(e,t,n){var r,i,o,s,a,u,l,c,f
for(e=(r=this.diffLinesToChars(e,t)).chars1,t=r.chars2,o=r.lineArray,i=this.DiffMain(e,t,!1,n),this.diffCharsToLines(i,o),this.diffCleanupSemantic(i),i.push([0,""]),s=0,u=0,a=0,c="",l="";s<i.length;){switch(i[s][0]){case 1:a++,l+=i[s][1]
break
case nt:u++,c+=i[s][1]
break
case 0:if(u>=1&&a>=1){for(i.splice(s-u-a,u+a),s=s-u-a,f=(r=this.DiffMain(c,l,!1,n)).length-1;f>=0;f--)i.splice(s,0,r[f])
s+=r.length}a=0,u=0,c="",l=""}s++}return i.pop(),i},tt.prototype.diffBisect=function(e,t,n){var r,i,o,s,a,u,l,c,f,d,h,p,g,m,v,b,y,k,w,E,x,T,C
for(r=e.length,i=t.length,s=o=Math.ceil((r+i)/2),a=2*o,u=new Array(a),l=new Array(a),c=0;c<a;c++)u[c]=-1,l[c]=-1
for(u[s+1]=0,l[s+1]=0,d=(f=r-i)%2!=0,h=0,p=0,g=0,m=0,x=0;x<o&&!(Date.now()>n);x++){for(T=-x+h;T<=x-p;T+=2){for(b=s+T,w=(y=T===-x||T!==x&&u[b-1]<u[b+1]?u[b+1]:u[b-1]+1)-T;y<r&&w<i&&e.charAt(y)===t.charAt(w);)y++,w++
if(u[b]=y,y>r)p+=2
else if(w>i)h+=2
else if(d&&(v=s+f-T)>=0&&v<a&&-1!==l[v]&&y>=(k=r-l[v]))return this.diffBisectSplit(e,t,y,w,n)}for(C=-x+g;C<=x-m;C+=2){for(v=s+C,E=(k=C===-x||C!==x&&l[v-1]<l[v+1]?l[v+1]:l[v-1]+1)-C;k<r&&E<i&&e.charAt(r-k-1)===t.charAt(i-E-1);)k++,E++
if(l[v]=k,k>r)m+=2
else if(E>i)g+=2
else if(!d&&(b=s+f-C)>=0&&b<a&&-1!==u[b]&&(w=s+(y=u[b])-b,y>=(k=r-k)))return this.diffBisectSplit(e,t,y,w,n)}}return[[nt,e],[1,t]]},tt.prototype.diffBisectSplit=function(e,t,n,r,i){var o,s,a,u,l,c
return o=e.substring(0,n),a=t.substring(0,r),s=e.substring(n),u=t.substring(r),l=this.DiffMain(o,a,!1,i),c=this.DiffMain(s,u,!1,i),l.concat(c)},tt.prototype.diffCleanupSemantic=function(e){for(var t,n,r,i,o=!1,s=[],a=0,u=null,l=0,c=0,f=0,d=0,h=0;l<e.length;)0===e[l][0]?(s[a++]=l,c=d,f=h,d=0,h=0,u=e[l][1]):(1===e[l][0]?d+=e[l][1].length:h+=e[l][1].length,u&&u.length<=Math.max(c,f)&&u.length<=Math.max(d,h)&&(e.splice(s[a-1],0,[nt,u]),e[s[a-1]+1][0]=1,a--,l=--a>0?s[a-1]:-1,c=0,f=0,d=0,h=0,u=null,o=!0)),l++
for(o&&this.diffCleanupMerge(e),l=1;l<e.length;)e[l-1][0]===nt&&1===e[l][0]&&(t=e[l-1][1],n=e[l][1],(r=this.diffCommonOverlap(t,n))>=(i=this.diffCommonOverlap(n,t))?(r>=t.length/2||r>=n.length/2)&&(e.splice(l,0,[0,n.substring(0,r)]),e[l-1][1]=t.substring(0,t.length-r),e[l+1][1]=n.substring(r),l++):(i>=t.length/2||i>=n.length/2)&&(e.splice(l,0,[0,t.substring(0,i)]),e[l-1][0]=1,e[l-1][1]=n.substring(0,n.length-i),e[l+1][0]=nt,e[l+1][1]=t.substring(i),l++),l++),l++},tt.prototype.diffCommonOverlap=function(e,t){var n=e.length,r=t.length
if(0===n||0===r)return 0
n>r?e=e.substring(n-r):n<r&&(t=t.substring(0,n))
var i=Math.min(n,r)
if(e===t)return i
for(var o=0,s=1;;){var a=e.substring(i-s),u=t.indexOf(a)
if(-1===u)return o
s+=u,0!==u&&e.substring(i-s)!==t.substring(0,s)||(o=s,s++)}},tt.prototype.diffLinesToChars=function(e,t){var n=[],r={}
function i(e){for(var t="",i=0,o=-1,s=n.length;o<e.length-1;){-1===(o=e.indexOf("\n",i))&&(o=e.length-1)
var a=e.substring(i,o+1)
i=o+1,rt.call(r,a)?t+=String.fromCharCode(r[a]):(t+=String.fromCharCode(s),r[a]=s,n[s++]=a)}return t}return n[0]="",{chars1:i(e),chars2:i(t),lineArray:n}},tt.prototype.diffCharsToLines=function(e,t){for(var n=0;n<e.length;n++){for(var r=e[n][1],i=[],o=0;o<r.length;o++)i[o]=t[r.charCodeAt(o)]
e[n][1]=i.join("")}},tt.prototype.diffCleanupMerge=function(e){e.push([0,""])
for(var t=0,n=0,r=0,i="",o="";t<e.length;)switch(e[t][0]){case 1:r++,o+=e[t][1],t++
break
case nt:n++,i+=e[t][1],t++
break
case 0:if(n+r>1){if(0!==n&&0!==r){var s=this.diffCommonPrefix(o,i)
0!==s&&(t-n-r>0&&0===e[t-n-r-1][0]?e[t-n-r-1][1]+=o.substring(0,s):(e.splice(0,0,[0,o.substring(0,s)]),t++),o=o.substring(s),i=i.substring(s)),0!==(s=this.diffCommonSuffix(o,i))&&(e[t][1]=o.substring(o.length-s)+e[t][1],o=o.substring(0,o.length-s),i=i.substring(0,i.length-s))}0===n?e.splice(t-r,n+r,[1,o]):0===r?e.splice(t-n,n+r,[nt,i]):e.splice(t-n-r,n+r,[nt,i],[1,o]),t=t-n-r+(n?1:0)+(r?1:0)+1}else 0!==t&&0===e[t-1][0]?(e[t-1][1]+=e[t][1],e.splice(t,1)):t++
r=0,n=0,i="",o=""}""===e[e.length-1][1]&&e.pop()
var a=!1
for(t=1;t<e.length-1;){if(0===e[t-1][0]&&0===e[t+1][0]){var u=e[t][1]
u.substring(u.length-e[t-1][1].length)===e[t-1][1]?(e[t][1]=e[t-1][1]+e[t][1].substring(0,e[t][1].length-e[t-1][1].length),e[t+1][1]=e[t-1][1]+e[t+1][1],e.splice(t-1,1),a=!0):u.substring(0,e[t+1][1].length)===e[t+1][1]&&(e[t-1][1]+=e[t+1][1],e[t][1]=e[t][1].substring(e[t+1][1].length)+e[t+1][1],e.splice(t+1,1),a=!0)}t++}a&&this.diffCleanupMerge(e)}
var it={}
G.currentModule.suiteReport=K,G.pq=new Xe(Ce)
var ot=!1,st=!1
function at(){st=!0,g?g((function(){lt()})):lt()}function ut(){G.blocking=!1,G.pq.advance()}function lt(){if(G.started)ut()
else{G.started=T.now(),""===G.modules[0].name&&0===G.modules[0].tests.length&&G.modules.shift()
for(var e=[],t=0;t<G.modules.length;t++)""!==G.modules[t].name&&e.push({name:G.modules[t].name,moduleId:G.modules[t].moduleId,tests:G.modules[t].tests})
de("runStart",K.start(!0)),ve("begin",{totalTests:ye.count,modules:e}).then(ut)}}it.isLocal=h&&h.location&&"file:"===h.location.protocol,it.version="2.20.1",q(it,{config:G,diff:function(e,t){var n,r
return r=(n=new tt).DiffMain(e,t),n.diffCleanupEfficiency(r),n.diffPrettyHtml(r)},dump:W,equiv:$,reporters:Ve,hooks:Ke,is:R,objectType:j,on:function(e,t){if("string"!=typeof e)throw new TypeError("eventName must be a string when registering a listener")
if(!S(e,fe)){var n=fe.join(", ")
throw new Error('"'.concat(e,'" is not a valid event; must be one of: ').concat(n,"."))}if("function"!=typeof t)throw new TypeError("callback must be a function when registering a listener")
ce[e]||(ce[e]=[]),S(t,ce[e])||ce[e].push(t)},onError:function(e){if(J.warn("QUnit.onError is deprecated and will be removed in QUnit 3.0. Please use QUnit.onUncaughtException instead."),G.current&&G.current.ignoreGlobalErrors)return!0
var t=new Error(e.message)
return t.stack=e.stacktrace||e.fileName+":"+e.lineNumber,et(t),!1},onUncaughtException:et,pushFailure:ke,assert:ae.prototype,module:re,test:Ce,todo:Ce.todo,skip:Ce.skip,only:Ce.only,start:function(e){if(G.current)throw new Error("QUnit.start cannot be called inside a test context.")
var t=ot
if(ot=!0,st)throw new Error("Called start() while test already started running")
if(t||e>1)throw new Error("Called start() outside of a test context too many times")
if(G.autostart)throw new Error("Called start() outside of a test context when QUnit.config.autostart was true")
if(!G.pageLoaded)return G.autostart=!0,void(v||it.load())
at()},onUnhandledRejection:function(e){J.warn("QUnit.onUnhandledRejection is deprecated and will be removed in QUnit 3.0. Please use QUnit.onUncaughtException instead."),et(e)},extend:function(){J.warn("QUnit.extend is deprecated and will be removed in QUnit 3.0. Please use Object.assign instead.")
for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return q.apply(this,t)},load:function(){G.pageLoaded=!0,q(G,{started:0,updateRate:1e3,autostart:!0,filter:""},!0),st||(G.blocking=!1,G.autostart&&at())},stack:function(e){return se(e=(e||0)+2)}}),function(e){var t=["begin","done","log","testStart","testDone","moduleStart","moduleDone"]
function n(e){return function(t){if("function"!=typeof t)throw new Error("Callback parameter must be a function")
G.callbacks[e].push(t)}}for(var r=0;r<t.length;r++){var i=t[r]
void 0===G.callbacks[i]&&(G.callbacks[i]=[]),e[i]=n(i)}}(it),function(i){if(h&&v){if(h.QUnit&&h.QUnit.version)throw new Error("QUnit has already been defined.")
h.QUnit=i}e&&e.exports&&(e.exports=i,e.exports.QUnit=i),t&&(t.QUnit=i),void 0===(r=function(){return i}.call(t,n,t,e))||(e.exports=r),i.config.autostart=!1}(it),function(){if(h&&v){var e=it.config,t=Object.prototype.hasOwnProperty
it.begin((function(){if(!t.call(e,"fixture")){var n=v.getElementById("qunit-fixture")
n&&(e.fixture=n.cloneNode(!0))}})),it.testStart((function(){if(null!=e.fixture){var t=v.getElementById("qunit-fixture")
if("string"===i(e.fixture)){var n=v.createElement("div")
n.setAttribute("id","qunit-fixture"),n.innerHTML=e.fixture,t.parentNode.replaceChild(n,t)}else{var r=e.fixture.cloneNode(!0)
t.parentNode.replaceChild(r,t)}}}))}}(),function(){var e=void 0!==h&&h.location
if(e){var t=function(){for(var t=Object.create(null),r=e.search.slice(1).split("&"),i=r.length,o=0;o<i;o++)if(r[o]){var s=r[o].split("="),a=n(s[0]),u=1===s.length||n(s.slice(1).join("="))
t[a]=a in t?[].concat(t[a],u):u}return t}()
it.urlParams=t,it.config.filter=t.filter,it.config.module=t.module,it.config.moduleId=[].concat(t.moduleId||[]),it.config.testId=[].concat(t.testId||[]),!0===t.seed?it.config.seed=Math.random().toString(36).slice(2):t.seed&&(it.config.seed=t.seed),it.config.urlConfig.push({id:"hidepassed",label:"Hide passed tests",tooltip:"Only show tests and assertions that fail. Stored as query-strings."},{id:"noglobals",label:"Check for Globals",tooltip:"Enabling this will test if any test introduces new properties on the global object (`window` in Browsers). Stored as query-strings."},{id:"notrycatch",label:"No try-catch",tooltip:"Enabling this will run tests outside of a try-catch block. Makes debugging exceptions in IE reasonable. Stored as query-strings."}),it.begin((function(){for(var e=it.config.urlConfig,n=0;n<e.length;n++){var r=it.config.urlConfig[n]
"string"!=typeof r&&(r=r.id),void 0===it.config[r]&&(it.config[r]=t[r])}}))}function n(e){return decodeURIComponent(e.replace(/\+/g,"%20"))}}()
var ct={exports:{}}
!function(e){var t,n
t=he,n=function(){var e=void 0!==pe&&"undefined"==typeof window,t="function"==typeof Map?Map:function(){var e=Object.create(null)
this.get=function(t){return e[t]},this.set=function(t,n){return e[t]=n,this},this.clear=function(){e=Object.create(null)}},n=new t,r=new t,o=[]
o.total=0
var s=[],a=[]
function u(){n.clear(),r.clear(),s=[],a=[]}function l(e){for(var t=-9007199254740991,n=e.length-1;n>=0;--n){var r=e[n]
if(null!==r){var i=r.score
i>t&&(t=i)}}return-9007199254740991===t?null:t}function c(e,t){var n=e[t]
if(void 0!==n)return n
var r=t
Array.isArray(t)||(r=t.split("."))
for(var i=r.length,o=-1;e&&++o<i;)e=e[r[o]]
return e}function f(e){return"object"===i(e)}var d=function(){var e=[],t=0,n={}
function r(){for(var n=0,r=e[n],i=1;i<t;){var o=i+1
n=i,o<t&&e[o].score<e[i].score&&(n=o),e[n-1>>1]=e[n],i=1+(n<<1)}for(var s=n-1>>1;n>0&&r.score<e[s].score;s=(n=s)-1>>1)e[n]=e[s]
e[n]=r}return n.add=function(n){var r=t
e[t++]=n
for(var i=r-1>>1;r>0&&n.score<e[i].score;i=(r=i)-1>>1)e[r]=e[i]
e[r]=n},n.poll=function(){if(0!==t){var n=e[0]
return e[0]=e[--t],r(),n}},n.peek=function(n){if(0!==t)return e[0]},n.replaceTop=function(t){e[0]=t,r()},n},h=d()
return function t(i){var p={single:function(e,t,n){return"farzher"==e?{target:"farzher was here (^-^*)/",score:0,indexes:[0,1,2,3,4,5,6]}:e?(f(e)||(e=p.getPreparedSearch(e)),t?(f(t)||(t=p.getPrepared(t)),((n&&void 0!==n.allowTypo?n.allowTypo:!i||void 0===i.allowTypo||i.allowTypo)?p.algorithm:p.algorithmNoTypo)(e,t,e[0])):null):null},go:function(e,t,n){if("farzher"==e)return[{target:"farzher was here (^-^*)/",score:0,indexes:[0,1,2,3,4,5,6],obj:t?t[0]:null}]
if(!e)return o
var r=(e=p.prepareSearch(e))[0],s=n&&n.threshold||i&&i.threshold||-9007199254740991,a=n&&n.limit||i&&i.limit||9007199254740991,u=(n&&void 0!==n.allowTypo?n.allowTypo:!i||void 0===i.allowTypo||i.allowTypo)?p.algorithm:p.algorithmNoTypo,d=0,g=0,m=t.length
if(n&&n.keys)for(var v=n.scoreFn||l,b=n.keys,y=b.length,k=m-1;k>=0;--k){for(var w=t[k],E=new Array(y),x=y-1;x>=0;--x)(S=c(w,C=b[x]))?(f(S)||(S=p.getPrepared(S)),E[x]=u(e,S,r)):E[x]=null
E.obj=w
var T=v(E)
null!==T&&(T<s||(E.score=T,d<a?(h.add(E),++d):(++g,T>h.peek().score&&h.replaceTop(E))))}else if(n&&n.key){var C=n.key
for(k=m-1;k>=0;--k)(S=c(w=t[k],C))&&(f(S)||(S=p.getPrepared(S)),null!==(M=u(e,S,r))&&(M.score<s||(M={target:M.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:M.score,indexes:M.indexes,obj:w},d<a?(h.add(M),++d):(++g,M.score>h.peek().score&&h.replaceTop(M)))))}else for(k=m-1;k>=0;--k){var S,M;(S=t[k])&&(f(S)||(S=p.getPrepared(S)),null!==(M=u(e,S,r))&&(M.score<s||(d<a?(h.add(M),++d):(++g,M.score>h.peek().score&&h.replaceTop(M)))))}if(0===d)return o
var N=new Array(d)
for(k=d-1;k>=0;--k)N[k]=h.poll()
return N.total=d+g,N},goAsync:function(t,n,r){var s=!1,a=new Promise((function(a,u){if("farzher"==t)return a([{target:"farzher was here (^-^*)/",score:0,indexes:[0,1,2,3,4,5,6],obj:n?n[0]:null}])
if(!t)return a(o)
var h=(t=p.prepareSearch(t))[0],g=d(),m=n.length-1,v=r&&r.threshold||i&&i.threshold||-9007199254740991,b=r&&r.limit||i&&i.limit||9007199254740991,y=(r&&void 0!==r.allowTypo?r.allowTypo:!i||void 0===i.allowTypo||i.allowTypo)?p.algorithm:p.algorithmNoTypo,k=0,w=0
function E(){if(s)return u("canceled")
var i=Date.now()
if(r&&r.keys)for(var d=r.scoreFn||l,x=r.keys,T=x.length;m>=0;--m){if(m%1e3==0&&Date.now()-i>=10)return void(e?setImmediate(E):setTimeout(E))
for(var C=n[m],S=new Array(T),M=T-1;M>=0;--M)(j=c(C,q=x[M]))?(f(j)||(j=p.getPrepared(j)),S[M]=y(t,j,h)):S[M]=null
S.obj=C
var N=d(S)
null!==N&&(N<v||(S.score=N,k<b?(g.add(S),++k):(++w,N>g.peek().score&&g.replaceTop(S))))}else if(r&&r.key)for(var q=r.key;m>=0;--m){if(m%1e3==0&&Date.now()-i>=10)return void(e?setImmediate(E):setTimeout(E));(j=c(C=n[m],q))&&(f(j)||(j=p.getPrepared(j)),null!==(R=y(t,j,h))&&(R.score<v||(R={target:R.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:R.score,indexes:R.indexes,obj:C},k<b?(g.add(R),++k):(++w,R.score>g.peek().score&&g.replaceTop(R)))))}else for(;m>=0;--m){if(m%1e3==0&&Date.now()-i>=10)return void(e?setImmediate(E):setTimeout(E))
var j,R;(j=n[m])&&(f(j)||(j=p.getPrepared(j)),null!==(R=y(t,j,h))&&(R.score<v||(k<b?(g.add(R),++k):(++w,R.score>g.peek().score&&g.replaceTop(R)))))}if(0===k)return a(o)
for(var _=new Array(k),I=k-1;I>=0;--I)_[I]=g.poll()
_.total=k+w,a(_)}e?setImmediate(E):E()}))
return a.cancel=function(){s=!0},a},highlight:function(e,t,n){if("function"==typeof t)return p.highlightCallback(e,t)
if(null===e)return null
void 0===t&&(t="<b>"),void 0===n&&(n="</b>")
for(var r="",i=0,o=!1,s=e.target,a=s.length,u=e.indexes,l=0;l<a;++l){var c=s[l]
if(u[i]===l){if(o||(o=!0,r+=t),++i===u.length){r+=c+n+s.substr(l+1)
break}}else o&&(o=!1,r+=n)
r+=c}return r},highlightCallback:function(e,t){if(null===e)return null
for(var n=e.target,r=n.length,i=e.indexes,o="",s=0,a=0,u=!1,l=(e=[],0);l<r;++l){var c=n[l]
if(i[a]===l){if(++a,u||(u=!0,e.push(o),o=""),a===i.length){o+=c,e.push(t(o,s++)),o="",e.push(n.substr(l+1))
break}}else u&&(u=!1,e.push(t(o,s++)),o="")
o+=c}return e},prepare:function(e){return e?{target:e,_targetLowerCodes:p.prepareLowerCodes(e),_nextBeginningIndexes:null,score:null,indexes:null,obj:null}:{target:"",_targetLowerCodes:[0],_nextBeginningIndexes:null,score:null,indexes:null,obj:null}},prepareSlow:function(e){return e?{target:e,_targetLowerCodes:p.prepareLowerCodes(e),_nextBeginningIndexes:p.prepareNextBeginningIndexes(e),score:null,indexes:null,obj:null}:{target:"",_targetLowerCodes:[0],_nextBeginningIndexes:null,score:null,indexes:null,obj:null}},prepareSearch:function(e){return e||(e=""),p.prepareLowerCodes(e)},getPrepared:function(e){if(e.length>999)return p.prepare(e)
var t=n.get(e)
return void 0!==t||(t=p.prepare(e),n.set(e,t)),t},getPreparedSearch:function(e){if(e.length>999)return p.prepareSearch(e)
var t=r.get(e)
return void 0!==t||(t=p.prepareSearch(e),r.set(e,t)),t},algorithm:function(e,t,n){for(var r=t._targetLowerCodes,i=e.length,o=r.length,u=0,l=0,c=0,f=0;;){if(n===r[l]){if(s[f++]=l,++u===i)break
n=e[0===c?u:c===u?u+1:c===u-1?u-1:u]}if(++l>=o)for(;;){if(u<=1)return null
if(0===c){if(n===e[--u])continue
c=u}else{if(1===c)return null
if((n=e[1+(u=--c)])===e[u])continue}l=s[(f=u)-1]+1
break}}u=0
var d=0,h=!1,g=0,m=t._nextBeginningIndexes
null===m&&(m=t._nextBeginningIndexes=p.prepareNextBeginningIndexes(t.target))
var v=l=0===s[0]?0:m[s[0]-1]
if(l!==o)for(;;)if(l>=o){if(u<=0){if(++d>i-2)break
if(e[d]===e[d+1])continue
l=v
continue}--u,l=m[a[--g]]}else if(e[0===d?u:d===u?u+1:d===u-1?u-1:u]===r[l]){if(a[g++]=l,++u===i){h=!0
break}++l}else l=m[l]
if(h)var b=a,y=g
else b=s,y=f
for(var k=0,w=-1,E=0;E<i;++E)w!==(l=b[E])-1&&(k-=l),w=l
for(h?0!==d&&(k+=-20):(k*=1e3,0!==c&&(k+=-20)),k-=o-i,t.score=k,t.indexes=new Array(y),E=y-1;E>=0;--E)t.indexes[E]=b[E]
return t},algorithmNoTypo:function(e,t,n){for(var r=t._targetLowerCodes,i=e.length,o=r.length,u=0,l=0,c=0;;){if(n===r[l]){if(s[c++]=l,++u===i)break
n=e[u]}if(++l>=o)return null}u=0
var f=!1,d=0,h=t._nextBeginningIndexes
if(null===h&&(h=t._nextBeginningIndexes=p.prepareNextBeginningIndexes(t.target)),(l=0===s[0]?0:h[s[0]-1])!==o)for(;;)if(l>=o){if(u<=0)break;--u,l=h[a[--d]]}else if(e[u]===r[l]){if(a[d++]=l,++u===i){f=!0
break}++l}else l=h[l]
if(f)var g=a,m=d
else g=s,m=c
for(var v=0,b=-1,y=0;y<i;++y)b!==(l=g[y])-1&&(v-=l),b=l
for(f||(v*=1e3),v-=o-i,t.score=v,t.indexes=new Array(m),y=m-1;y>=0;--y)t.indexes[y]=g[y]
return t},prepareLowerCodes:function(e){for(var t=e.length,n=[],r=e.toLowerCase(),i=0;i<t;++i)n[i]=r.charCodeAt(i)
return n},prepareBeginningIndexes:function(e){for(var t=e.length,n=[],r=0,i=!1,o=!1,s=0;s<t;++s){var a=e.charCodeAt(s),u=a>=65&&a<=90,l=u||a>=97&&a<=122||a>=48&&a<=57,c=u&&!i||!o||!l
i=u,o=l,c&&(n[r++]=s)}return n},prepareNextBeginningIndexes:function(e){for(var t=e.length,n=p.prepareBeginningIndexes(e),r=[],i=n[0],o=0,s=0;s<t;++s)i>s?r[s]=i:(i=n[++o],r[s]=void 0===i?t:i)
return r},cleanup:u,new:t}
return p}()},e.exports?e.exports=n():t.fuzzysort=n()}(ct)
var ft=ct.exports,dt={failedTests:[],defined:0,completed:0}
!function(){if(h&&v){it.reporters.perf.init(it)
var e=it.config,t=[],n=!1,r=Object.prototype.hasOwnProperty,i=N({filter:void 0,module:void 0,moduleId:void 0,testId:void 0}),o=null
it.on("runStart",(function(e){dt.defined=e.testCounts.total})),it.begin((function(t){!function(t){var n,s,a,u,c,f,p,y,x=T("qunit")
x&&(x.setAttribute("role","main"),x.innerHTML="<h1 id='qunit-header'>"+O(v.title)+"</h1><h2 id='qunit-banner'></h2><div id='qunit-testrunner-toolbar' role='navigation'></div>"+(!(n=it.config.testId)||n.length<=0?"":"<div id='qunit-filteredTest'>Rerunning selected tests: "+O(n.join(", "))+" <a id='qunit-clearFilter' href='"+O(i)+"'>Run all tests</a></div>")+"<h2 id='qunit-userAgent'></h2><ol id='qunit-tests'></ol>"),(s=T("qunit-header"))&&(s.innerHTML="<a href='"+O(i)+"'>"+s.innerHTML+"</a> "),(a=T("qunit-banner"))&&(a.className=""),p=T("qunit-tests"),(y=T("qunit-testresult"))&&y.parentNode.removeChild(y),p&&(p.innerHTML="",(y=v.createElement("p")).id="qunit-testresult",y.className="result",p.parentNode.insertBefore(y,p),y.innerHTML='<div id="qunit-testresult-display">Running...<br />&#160;</div><div id="qunit-testresult-controls"></div><div class="clearfix"></div>',c=T("qunit-testresult-controls")),c&&c.appendChild(((f=v.createElement("button")).id="qunit-abort-tests-button",f.innerHTML="Abort",d(f,"click",C),f)),(u=T("qunit-userAgent"))&&(u.innerHTML="",u.appendChild(v.createTextNode("QUnit "+it.version+"; "+b.userAgent))),function(t){var n,i,s,a,u,c=T("qunit-testrunner-toolbar")
if(c){c.appendChild(((u=v.createElement("span")).innerHTML=function(){for(var t=!1,n=e.urlConfig,i="",o=0;o<n.length;o++){var s=e.urlConfig[o]
"string"==typeof s&&(s={id:s,label:s})
var a=O(s.id),u=O(s.tooltip)
if(s.value&&"string"!=typeof s.value){if(i+="<label for='qunit-urlconfig-"+a+"' title='"+u+"'>"+s.label+": </label><select id='qunit-urlconfig-"+a+"' name='"+a+"' title='"+u+"'><option></option>",Array.isArray(s.value))for(var l=0;l<s.value.length;l++)i+="<option value='"+(a=O(s.value[l]))+"'"+(e[s.id]===s.value[l]?(t=!0)&&" selected='selected'":"")+">"+a+"</option>"
else for(var c in s.value)r.call(s.value,c)&&(i+="<option value='"+O(c)+"'"+(e[s.id]===c?(t=!0)&&" selected='selected'":"")+">"+O(s.value[c])+"</option>")
e[s.id]&&!t&&(i+="<option value='"+(a=O(e[s.id]))+"' selected='selected' disabled='disabled'>"+a+"</option>"),i+="</select>"}else i+="<label for='qunit-urlconfig-"+a+"' title='"+u+"'><input id='qunit-urlconfig-"+a+"' name='"+a+"' type='checkbox'"+(s.value?" value='"+O(s.value)+"'":"")+(e[s.id]?" checked='checked'":"")+" title='"+u+"' />"+O(s.label)+"</label>"}return i}(),w(u,"qunit-url-config"),m(u.getElementsByTagName("input"),"change",M),m(u.getElementsByTagName("select"),"change",M),u))
var f=v.createElement("span")
f.id="qunit-toolbar-filters",f.appendChild((n=v.createElement("form"),i=v.createElement("label"),s=v.createElement("input"),a=v.createElement("button"),w(n,"qunit-filter"),i.innerHTML="Filter: ",s.type="text",s.value=e.filter||"",s.name="filter",s.id="qunit-filter-input",a.innerHTML="Go",i.appendChild(s),n.appendChild(i),n.appendChild(v.createTextNode(" ")),n.appendChild(a),d(n,"submit",S),n)),f.appendChild(function(t){var n=null
if(o={options:t.modules.slice(),selectedMap:new k,isDirty:function(){return l(o.selectedMap.keys()).sort().join(",")!==l(n.keys()).sort().join(",")}},e.moduleId.length)for(var r=0;r<t.modules.length;r++){var i=t.modules[r];-1!==e.moduleId.indexOf(i.moduleId)&&o.selectedMap.set(i.moduleId,i.name)}n=new k(o.selectedMap)
var s=v.createElement("input")
s.id="qunit-modulefilter-search",s.autocomplete="off",d(s,"input",C),d(s,"input",T),d(s,"focus",T),d(s,"click",T)
var a=v.createElement("label")
a.htmlFor="qunit-modulefilter-search",a.textContent="Module:"
var u=v.createElement("span")
u.id="qunit-modulefilter-search-container",u.appendChild(s)
var c=v.createElement("button")
c.textContent="Apply",c.title="Re-run the selected test modules",d(c,"click",j)
var f=v.createElement("button")
f.textContent="Reset",f.type="reset",f.title="Restore the previous module selection"
var p=v.createElement("button")
p.textContent="Select none",p.type="button",p.title="Clear the current module selection",d(p,"click",(function(){o.selectedMap.clear(),M(),C()}))
var m=v.createElement("span")
m.id="qunit-modulefilter-actions",m.appendChild(c),m.appendChild(f),n.size&&m.appendChild(p)
var b=v.createElement("ul")
b.id="qunit-modulefilter-dropdown-list"
var y=v.createElement("div")
y.id="qunit-modulefilter-dropdown",y.style.display="none",y.appendChild(m),y.appendChild(b),d(y,"change",M),u.appendChild(y),M()
var w,x=v.createElement("form")
function T(){function e(t){var n=x.contains(t.target)
27!==t.keyCode&&n||(27===t.keyCode&&n&&s.focus(),y.style.display="none",g(v,"click",e),g(v,"keydown",e),s.value="",C())}"none"===y.style.display&&(C(),y.style.display="block",d(v,"click",e),d(v,"keydown",e))}function C(){h.clearTimeout(w),w=h.setTimeout((function(){b.innerHTML=function(e){return function(e){var t=""
o.selectedMap.forEach((function(e,n){t+=R(n,e,!0)}))
for(var n=0;n<e.length;n++){var r=e[n].obj
o.selectedMap.has(r.moduleId)||(t+=R(r.moduleId,r.name,!1))}return t}(""===e?o.options.slice(0,20).map((function(e){return{obj:e}})):ft.go(e,o.options,{limit:20,key:"name",allowTypo:!0}))}(s.value)}))}function M(e){var t=e&&e.target||null
t&&(t.checked?o.selectedMap.set(t.value,t.parentNode.textContent):o.selectedMap.delete(t.value),E(t.parentNode,"checked",t.checked))
var n=o.selectedMap.size?o.selectedMap.size+" "+(1===o.selectedMap.size?"module":"modules"):"All modules"
s.placeholder=n,s.title="Type to search through and reduce the list.",f.disabled=!o.isDirty(),p.style.display=o.selectedMap.size?"":"none"}return x.id="qunit-modulefilter",x.appendChild(a),x.appendChild(v.createTextNode(" ")),x.appendChild(u),d(x,"submit",S),d(x,"reset",(function(){o.selectedMap=new k(n),M(),C()})),x}(t))
var p=v.createElement("div")
p.className="clearfix",c.appendChild(f),c.appendChild(p)}}(t)}(t)})),it.on("runEnd",(function(t){var n,r,i,o=T("qunit-banner"),s=T("qunit-tests"),a=T("qunit-abort-tests-button"),u=e.stats.all-e.stats.bad,l=[t.testCounts.total," tests completed in ",t.runtime," milliseconds, with ",t.testCounts.failed," failed, ",t.testCounts.skipped," skipped, and ",t.testCounts.todo," todo.<br />","<span class='passed'>",u,"</span> assertions of <span class='total'>",e.stats.all,"</span> passed, <span class='failed'>",e.stats.bad,"</span> failed.",A(dt.failedTests)].join("")
if(a&&a.disabled){l="Tests aborted after "+t.runtime+" milliseconds."
for(var c=0;c<s.children.length;c++)""!==(n=s.children[c]).className&&"running"!==n.className||(n.className="aborted",i=n.getElementsByTagName("ol")[0],(r=v.createElement("li")).className="fail",r.innerHTML="Test aborted.",i.appendChild(r))}!o||a&&!1!==a.disabled||(o.className="failed"===t.status?"qunit-fail":"qunit-pass"),a&&a.parentNode.removeChild(a),s&&(T("qunit-testresult-display").innerHTML=l),e.altertitle&&v.title&&(v.title=["failed"===t.status?"✖":"✔",v.title.replace(/^[\u2714\u2716] /i,"")].join(" ")),e.scrolltop&&h.scrollTo&&h.scrollTo(0,0)})),it.testStart((function(e){var t,n
_(e.name,e.testId,e.module),(t=T("qunit-testresult-display"))&&(w(t,"running"),n=it.config.reorder&&e.previousFailure,t.innerHTML=[D(dt),n?"Rerunning previously failed test: <br />":"Running: ",L(e.name,e.module),A(dt.failedTests)].join(""))})),it.log((function(e){var t=T("qunit-test-output-"+e.testId)
if(t){var n,i,o,s=O(e.message)||(e.result?"okay":"failed")
s="<span class='test-message'>"+s+"</span>",s+="<span class='runtime'>@ "+e.runtime+" ms</span>"
var a=!1
!e.result&&r.call(e,"expected")?(n=e.negative?"NOT "+it.dump.parse(e.expected):it.dump.parse(e.expected),i=it.dump.parse(e.actual),s+="<table><tr class='test-expected'><th>Expected: </th><td><pre>"+O(n)+"</pre></td></tr>",i!==n?(s+="<tr class='test-actual'><th>Result: </th><td><pre>"+O(i)+"</pre></td></tr>","number"==typeof e.actual&&"number"==typeof e.expected?isNaN(e.actual)||isNaN(e.expected)||(a=!0,o=((o=e.actual-e.expected)>0?"+":"")+o):"boolean"!=typeof e.actual&&"boolean"!=typeof e.expected&&(a=P(o=it.diff(n,i)).length!==P(n).length+P(i).length),a&&(s+="<tr class='test-diff'><th>Diff: </th><td><pre>"+o+"</pre></td></tr>")):-1!==n.indexOf("[object Array]")||-1!==n.indexOf("[object Object]")?s+="<tr class='test-message'><th>Message: </th><td>Diff suppressed as the depth of object is more than current max depth ("+it.config.maxDepth+").<p>Hint: Use <code>QUnit.dump.maxDepth</code> to  run with a higher max depth or <a href='"+O(N({maxDepth:-1}))+"'>Rerun</a> without max depth.</p></td></tr>":s+="<tr class='test-message'><th>Message: </th><td>Diff suppressed as the expected and actual results have an equivalent serialization</td></tr>",e.source&&(s+="<tr class='test-source'><th>Source: </th><td><pre>"+O(e.source)+"</pre></td></tr>"),s+="</table>"):!e.result&&e.source&&(s+="<table><tr class='test-source'><th>Source: </th><td><pre>"+O(e.source)+"</pre></td></tr></table>")
var u=t.getElementsByTagName("ol")[0],l=v.createElement("li")
l.className=e.result?"pass":"fail",l.innerHTML=s,u.appendChild(l)}})),it.testDone((function(r){var i=T("qunit-tests"),o=T("qunit-test-output-"+r.testId)
if(i&&o){var s
x(o,"running"),s=r.failed>0?"failed":r.todo?"todo":r.skipped?"skipped":"passed"
var a=o.getElementsByTagName("ol")[0],u=r.passed,l=r.failed,c=r.failed>0?r.todo:!r.todo
c?w(a,"qunit-collapsed"):(dt.failedTests.push(r.testId),e.collapse&&(n?w(a,"qunit-collapsed"):n=!0))
var f=o.firstChild,h=l?"<b class='failed'>"+l+"</b>, <b class='passed'>"+u+"</b>, ":""
if(f.innerHTML+=" <b class='counts'>("+h+r.assertions.length+")</b>",dt.completed++,r.skipped){o.className="skipped"
var p=v.createElement("em")
p.className="qunit-skipped-label",p.innerHTML="skipped",o.insertBefore(p,f)}else{if(d(f,"click",(function(){E(a,"qunit-collapsed")})),o.className=c?"pass":"fail",r.todo){var g=v.createElement("em")
g.className="qunit-todo-label",g.innerHTML="todo",o.className+=" todo",o.insertBefore(g,f)}var m=v.createElement("span")
m.className="runtime",m.innerHTML=r.runtime+" ms",o.insertBefore(m,a)}if(r.source){var b=v.createElement("p")
b.innerHTML="<strong>Source: </strong>"+O(r.source),w(b,"qunit-source"),c&&w(b,"qunit-collapsed"),d(f,"click",(function(){E(b,"qunit-collapsed")})),o.appendChild(b)}e.hidepassed&&("passed"===s||r.skipped)&&(t.push(o),i.removeChild(o))}})),it.on("error",(function(e){var t=_("global failure")
if(t){var n=O(I(e))
n="<span class='test-message'>"+n+"</span>",e&&e.stack&&(n+="<table><tr class='test-source'><th>Source: </th><td><pre>"+O(e.stack)+"</pre></td></tr></table>")
var r=t.getElementsByTagName("ol")[0],i=v.createElement("li")
i.className="fail",i.innerHTML=n,r.appendChild(i),t.className="fail"}}))
var s,a=(s=h.phantom)&&s.version&&s.version.major>0
a&&p.warn("Support for PhantomJS is deprecated and will be removed in QUnit 3.0."),a||"complete"!==v.readyState?d(h,"load",it.load):it.load()
var u=h.onerror
h.onerror=function(t,n,r,i,o){var s=!1
if(u){for(var a=arguments.length,l=new Array(a>5?a-5:0),c=5;c<a;c++)l[c-5]=arguments[c]
s=u.call.apply(u,[this,t,n,r,i,o].concat(l))}if(!0!==s){if(e.current&&e.current.ignoreGlobalErrors)return!0
var f=o||new Error(t)
!f.stack&&n&&r&&(f.stack="".concat(n,":").concat(r)),it.onUncaughtException(f)}return s},h.addEventListener("unhandledrejection",(function(e){it.onUncaughtException(e.reason)}))}function f(e){return"function"==typeof e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function d(e,t,n){e.addEventListener(t,n,!1)}function g(e,t,n){e.removeEventListener(t,n,!1)}function m(e,t,n){for(var r=e.length;r--;)d(e[r],t,n)}function y(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")>=0}function w(e,t){y(e,t)||(e.className+=(e.className?" ":"")+t)}function E(e,t,n){n||void 0===n&&!y(e,t)?w(e,t):x(e,t)}function x(e,t){for(var n=" "+e.className+" ";n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ")
e.className=f(n)}function T(e){return v.getElementById&&v.getElementById(e)}function C(){var e=T("qunit-abort-tests-button")
return e&&(e.disabled=!0,e.innerHTML="Aborting..."),it.config.queue.length=0,!1}function S(e){var t=T("qunit-filter-input")
return t.value=f(t.value),j(),e&&e.preventDefault&&e.preventDefault(),!1}function M(){var n,r=this,i={}
n="selectedIndex"in r?r.options[r.selectedIndex].value||void 0:r.checked?r.defaultValue||!0:void 0,i[r.name]=n
var o=N(i)
if("hidepassed"===r.name&&"replaceState"in h.history){it.urlParams[r.name]=n,e[r.name]=n||!1
var s=T("qunit-tests")
if(s){var a=s.children.length,u=s.children
if(r.checked){for(var l=0;l<a;l++){var f=u[l],d=f?f.className:"",p=d.indexOf("pass")>-1,g=d.indexOf("skipped")>-1;(p||g)&&t.push(f)}var m,v=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]
if(!n){if(Array.isArray(e)||(n=c(e))){n&&(e=n)
var r=0,i=function(){}
return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,a=!1
return{s:function(){n=n.call(e)},n:function(){var e=n.next()
return s=e.done,e},e:function(e){a=!0,o=e},f:function(){try{s||null==n.return||n.return()}finally{if(a)throw o}}}}(t)
try{for(v.s();!(m=v.n()).done;){var b=m.value
s.removeChild(b)}}catch(e){v.e(e)}finally{v.f()}}else for(var y;null!=(y=t.pop());)s.appendChild(y)}h.history.replaceState(null,"",o)}else h.location=o}function N(e){var t="?",n=h.location
for(var i in e=q(q({},it.urlParams),e))if(r.call(e,i)&&void 0!==e[i])for(var o=[].concat(e[i]),s=0;s<o.length;s++)t+=encodeURIComponent(i),!0!==o[s]&&(t+="="+encodeURIComponent(o[s])),t+="&"
return n.protocol+"//"+n.host+n.pathname+t.slice(0,-1)}function j(){var e=T("qunit-filter-input").value
h.location=N({filter:""===e?void 0:e,moduleId:l(o.selectedMap.keys()),module:void 0,testId:void 0})}function R(e,t,n){return'<li><label class="clickable'+(n?" checked":"")+'"><input type="checkbox" value="'+O(e)+'"'+(n?' checked="checked"':"")+" />"+O(t)+"</label></li>"}function _(e,t,n){var r=T("qunit-tests")
if(r){var i=v.createElement("strong")
i.innerHTML=L(e,n)
var o=v.createElement("li")
if(o.appendChild(i),void 0!==t){var s=v.createElement("a")
s.innerHTML="Rerun",s.href=N({testId:t}),o.id="qunit-test-output-"+t,o.appendChild(s)}var a=v.createElement("ol")
return a.className="qunit-assert-list",o.appendChild(a),r.appendChild(o),o}}function A(e){return 0===e.length?"":["<br /><a href='"+O(N({testId:e}))+"'>",1===e.length?"Rerun 1 failed test":"Rerun "+e.length+" failed tests","</a>"].join("")}function L(e,t){var n=""
return t&&(n="<span class='module-name'>"+O(t)+"</span>: "),n+"<span class='test-name'>"+O(e)+"</span>"}function D(e){return[e.completed," / ",e.defined," tests completed.<br />"].join("")}function P(e){return e.replace(/<\/?[^>]+(>|$)/g,"").replace(/&quot;/g,"").replace(/\s+/g,"")}}()}()},920:(e,t,n)=>{"use strict"
n.r(t),n.d(t,{IS_DESCRIPTOR:()=>r,createDescriptor:()=>f,isDescriptor:()=>i,lookupDescriptorData:()=>a,registerDescriptorData:()=>s,resolveDOMElement:()=>u,resolveDOMElements:()=>l,resolveDescription:()=>c})
const r="__dom_element_descriptor_is_descriptor__"
function i(e){return"object"==typeof e&&e&&r in e}function o(){const e=window
return e.domElementDescriptorsRegistry=e.domElementDescriptorsRegistry||new WeakMap,e.domElementDescriptorsRegistry}function s(e,t){t?o().set(e,t):o().delete(e)}function a(e){return o().get(e)||null}function u(e){let t=i(e)?a(e):e
if(!t)return null
if(void 0!==t.element)return t.element
for(let n of t.elements||[])return n
return null}function l(e){let t=i(e)?a(e):e
if(!t)return[]
if(t.elements)return Array.from(t.elements)
{let e=t.element
return e?[e]:[]}}function c(e){let t=i(e)?a(e):e
return t?.description}function f(e){let t={[r]:!0}
return s(t,e),t}}}])
