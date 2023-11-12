/*! For license information please see chunk.371.b4581b152e263b3b8aa8.js.LICENSE.txt */
(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[371],{534:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>p})
var n=r(574),a=r.n(n),o=r(797),i=r.n(o),s=r(353),l=r(612)
function c(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e
var r=e[Symbol.toPrimitive]
if(void 0!==r){var n=r.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(){}class p extends(i()){constructor(...e){super(...e),c(this,"tagName",u),c(this,"componentClass",void 0)}compute(e,t){(0,s.assert)("The `element` helper takes a single positional argument",1===e.length),(0,s.assert)("The `element` helper does not take any named arguments",0===Object.keys(t).length)
let r=e[0]
return r!==this.tagName&&(this.tagName=r,"string"==typeof r?this.componentClass=(0,l.ensureSafeComponent)(class extends(a()){constructor(...e){super(...e),c(this,"tagName",r)}},this):(this.componentClass=void 0,(0,s.runInDebug)((()=>{let e="The argument passed to the `element` helper must be a string"
try{e+=` (you passed \`${r}\`)`}catch(e){}(0,s.assert)(e,null==r)})))),this.componentClass}}},635:(e,t,r)=>{"use strict"
function n(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e
var r=e[Symbol.toPrimitive]
if(void 0!==r){var n=r.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t,r,n){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(n):void 0})}function o(e,t,r,n,a){var o={}
return Object.keys(n).forEach((function(e){o[e]=n[e]})),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce((function(r,n){return n(e,t,r)||r}),o),a&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(a):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}r.d(t,{_:()=>o,a:()=>a,b:()=>n})},779:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>p})
var n,a,o,i=r(635),s=r(146),l=r(797),c=r.n(l),u=r(806)
let p=(n=(0,s.inject)("page-title"),a=class extends(c()){get tokenId(){return(0,u.guidFor)(this)}constructor(){super(...arguments),(0,i.a)(this,"tokens",o,this),this.tokens.push({id:this.tokenId})}compute(e,t){let r={...t,id:this.tokenId,title:e.join("")}
return this.tokens.push(r),this.tokens.scheduleTitleUpdate(),""}willDestroy(){super.willDestroy(),this.tokens.remove(this.tokenId),this.tokens.scheduleTitleUpdate()}},o=(0,i._)(a.prototype,"tokens",[n],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a)},413:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>b})
var n,a,o,i,s,l=r(635),c=r(292),u=r(773),p=r(146),d=r.n(p),f=r(866),h=r(353)
let m="undefined"!=typeof FastBoot
const g="routeDidChange"
let b=(n=(0,p.inject)("router"),a=(0,p.inject)("-document"),o=class extends(d()){constructor(){super(...arguments),(0,l.a)(this,"router",i,this),(0,l.a)(this,"document",s,this),(0,l.b)(this,"tokens",[]),(0,l.b)(this,"_defaultConfig",{separator:" | ",prepend:!0,replace:null}),(0,l.b)(this,"scheduleTitleUpdate",(()=>{(0,u.scheduleOnce)("afterRender",this,this._updateTitle)})),this._validateExistingTitleElement()
let e=(0,c.getOwner)(this).resolveRegistration("config:environment")
e.pageTitle&&["separator","prepend","replace"].forEach((t=>{(0,f.isEmpty)(e.pageTitle[t])||(this._defaultConfig[t]=e.pageTitle[t])})),this.router.on(g,this.scheduleTitleUpdate)}applyTokenDefaults(e){let t=this._defaultConfig.separator,r=this._defaultConfig.prepend,n=this._defaultConfig.replace
null==e.separator&&(e.separator=t),null==e.prepend&&null!=r&&(e.prepend=r),null==e.replace&&null!=n&&(e.replace=n)}inheritFromPrevious(e){let t=e.previous
t&&(null==e.separator&&(e.separator=t.separator),null==e.prepend&&(e.prepend=t.prepend))}push(e){let t=this._findTokenById(e.id)
if(t){let r=this.tokens.indexOf(t),n=[...this.tokens],a=t.previous
return e.previous=a,e.next=t.next,this.inheritFromPrevious(e),this.applyTokenDefaults(e),n.splice(r,1,e),void(this.tokens=n)}let r=this.tokens.slice(-1)[0]
r&&(e.previous=r,r.next=e,this.inheritFromPrevious(e)),this.applyTokenDefaults(e),this.tokens=[...this.tokens,e]}remove(e){let t=this._findTokenById(e),{next:r,previous:n}=t
r&&(r.previous=n),n&&(n.next=r),t.previous=t.next=null
let a=[...this.tokens]
a.splice(a.indexOf(t),1),this.tokens=a}get visibleTokens(){let e=this.tokens,t=e?e.length:0,r=[]
for(;t--;){let n=e[t]
if(n.replace){r.unshift(n)
break}r.unshift(n)}return r}get sortedTokens(){let e=this.visibleTokens,t=!0,r=[],n=[r],a=[]
return e.forEach((e=>{if(e.front)a.unshift(e)
else if(e.prepend){t&&(t=!1,r=[],n.push(r))
let a=r[0]
a&&((e={...e}).separator=a.separator),r.unshift(e)}else t||(t=!0,r=[],n.push(r)),r.push(e)})),a.concat(n.reduce(((e,t)=>e.concat(t)),[]))}toString(){let e=this.sortedTokens,t=[]
for(let r=0,n=e.length;r<n;r++){let a=e[r]
a.title&&(t.push(a.title),r+1<n&&t.push(a.separator))}return t.join("")}willDestroy(){super.willDestroy(),this.router.off(g,this.scheduleTitleUpdate)}_updateTitle(){const e=this.toString()
m?this.updateFastbootTitle(e):this.document.title=e,this.titleDidUpdate(e)}_validateExistingTitleElement(){m||(0,h.assert)("[ember-page-title]: Multiple title elements found. Check for other addons like ember-cli-head updating <title> as well.",document.head.querySelectorAll("title").length<=1)}_findTokenById(e){return this.tokens.find((t=>t.id===e))}updateFastbootTitle(e){if(!m)return
const t=this.document.head,r=t.childNodes
for(let o=0;o<r.length;o++){let e=r[o]
"title"===e.nodeName.toLowerCase()&&t.removeChild(e)}let n=this.document.createElement("title"),a=this.document.createTextNode(e)
n.appendChild(a),t.appendChild(n)}titleDidUpdate(){}},i=(0,l._)(o.prototype,"router",[n],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),s=(0,l._)(o.prototype,"document",[a],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),o)},619:function(e,t,r){var n;(function(){function a(e){"use strict"
var t={omitExtraWLInCodeBlocks:{defaultValue:!1,describe:"Omit the default extra whiteline added to code blocks",type:"boolean"},noHeaderId:{defaultValue:!1,describe:"Turn on/off generated header id",type:"boolean"},prefixHeaderId:{defaultValue:!1,describe:"Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",type:"string"},rawPrefixHeaderId:{defaultValue:!1,describe:'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',type:"boolean"},ghCompatibleHeaderId:{defaultValue:!1,describe:"Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",type:"boolean"},rawHeaderId:{defaultValue:!1,describe:"Remove only spaces, ' and \" from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids",type:"boolean"},headerLevelStart:{defaultValue:!1,describe:"The header blocks level start",type:"integer"},parseImgDimensions:{defaultValue:!1,describe:"Turn on/off image dimension parsing",type:"boolean"},simplifiedAutoLink:{defaultValue:!1,describe:"Turn on/off GFM autolink style",type:"boolean"},excludeTrailingPunctuationFromURLs:{defaultValue:!1,describe:"Excludes trailing punctuation from links generated with autoLinking",type:"boolean"},literalMidWordUnderscores:{defaultValue:!1,describe:"Parse midword underscores as literal underscores",type:"boolean"},literalMidWordAsterisks:{defaultValue:!1,describe:"Parse midword asterisks as literal asterisks",type:"boolean"},strikethrough:{defaultValue:!1,describe:"Turn on/off strikethrough support",type:"boolean"},tables:{defaultValue:!1,describe:"Turn on/off tables support",type:"boolean"},tablesHeaderId:{defaultValue:!1,describe:"Add an id to table headers",type:"boolean"},ghCodeBlocks:{defaultValue:!0,describe:"Turn on/off GFM fenced code blocks support",type:"boolean"},tasklists:{defaultValue:!1,describe:"Turn on/off GFM tasklist support",type:"boolean"},smoothLivePreview:{defaultValue:!1,describe:"Prevents weird effects in live previews due to incomplete input",type:"boolean"},smartIndentationFix:{defaultValue:!1,description:"Tries to smartly fix indentation in es6 strings",type:"boolean"},disableForced4SpacesIndentedSublists:{defaultValue:!1,description:"Disables the requirement of indenting nested sublists by 4 spaces",type:"boolean"},simpleLineBreaks:{defaultValue:!1,description:"Parses simple line breaks as <br> (GFM Style)",type:"boolean"},requireSpaceBeforeHeadingText:{defaultValue:!1,description:"Makes adding a space between `#` and the header text mandatory (GFM Style)",type:"boolean"},ghMentions:{defaultValue:!1,description:"Enables github @mentions",type:"boolean"},ghMentionsLink:{defaultValue:"https://github.com/{u}",description:"Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",type:"string"},encodeEmails:{defaultValue:!0,description:"Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",type:"boolean"},openLinksInNewWindow:{defaultValue:!1,description:"Open all links in new windows",type:"boolean"},backslashEscapesHTMLTags:{defaultValue:!1,description:"Support for HTML Tag escaping. ex: <div>foo</div>",type:"boolean"},emoji:{defaultValue:!1,description:"Enable emoji support. Ex: `this is a :smile: emoji`",type:"boolean"},underline:{defaultValue:!1,description:"Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",type:"boolean"},completeHTMLDocument:{defaultValue:!1,description:"Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",type:"boolean"},metadata:{defaultValue:!1,description:"Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).",type:"boolean"},splitAdjacentBlockquotes:{defaultValue:!1,description:"Split adjacent blockquote blocks",type:"boolean"}}
if(!1===e)return JSON.parse(JSON.stringify(t))
var r={}
for(var n in t)t.hasOwnProperty(n)&&(r[n]=t[n].defaultValue)
return r}var o={},i={},s={},l=a(!0),c="vanilla",u={github:{omitExtraWLInCodeBlocks:!0,simplifiedAutoLink:!0,excludeTrailingPunctuationFromURLs:!0,literalMidWordUnderscores:!0,strikethrough:!0,tables:!0,tablesHeaderId:!0,ghCodeBlocks:!0,tasklists:!0,disableForced4SpacesIndentedSublists:!0,simpleLineBreaks:!0,requireSpaceBeforeHeadingText:!0,ghCompatibleHeaderId:!0,ghMentions:!0,backslashEscapesHTMLTags:!0,emoji:!0,splitAdjacentBlockquotes:!0},original:{noHeaderId:!0,ghCodeBlocks:!1},ghost:{omitExtraWLInCodeBlocks:!0,parseImgDimensions:!0,simplifiedAutoLink:!0,excludeTrailingPunctuationFromURLs:!0,literalMidWordUnderscores:!0,strikethrough:!0,tables:!0,tablesHeaderId:!0,ghCodeBlocks:!0,tasklists:!0,smoothLivePreview:!0,simpleLineBreaks:!0,requireSpaceBeforeHeadingText:!0,ghMentions:!1,encodeEmails:!0},vanilla:a(!0),allOn:function(){"use strict"
var e=a(!0),t={}
for(var r in e)e.hasOwnProperty(r)&&(t[r]=!0)
return t}()}
function p(e,t){"use strict"
var r=t?"Error in "+t+" extension->":"Error in unnamed extension",n={valid:!0,error:""}
o.helper.isArray(e)||(e=[e])
for(var a=0;a<e.length;++a){var i=r+" sub-extension "+a+": ",s=e[a]
if("object"!=typeof s)return n.valid=!1,n.error=i+"must be an object, but "+typeof s+" given",n
if(!o.helper.isString(s.type))return n.valid=!1,n.error=i+'property "type" must be a string, but '+typeof s.type+" given",n
var l=s.type=s.type.toLowerCase()
if("language"===l&&(l=s.type="lang"),"html"===l&&(l=s.type="output"),"lang"!==l&&"output"!==l&&"listener"!==l)return n.valid=!1,n.error=i+"type "+l+' is not recognized. Valid values: "lang/language", "output/html" or "listener"',n
if("listener"===l){if(o.helper.isUndefined(s.listeners))return n.valid=!1,n.error=i+'. Extensions of type "listener" must have a property called "listeners"',n}else if(o.helper.isUndefined(s.filter)&&o.helper.isUndefined(s.regex))return n.valid=!1,n.error=i+l+' extensions must define either a "regex" property or a "filter" method',n
if(s.listeners){if("object"!=typeof s.listeners)return n.valid=!1,n.error=i+'"listeners" property must be an object but '+typeof s.listeners+" given",n
for(var c in s.listeners)if(s.listeners.hasOwnProperty(c)&&"function"!=typeof s.listeners[c])return n.valid=!1,n.error=i+'"listeners" property must be an hash of [event name]: [callback]. listeners.'+c+" must be a function but "+typeof s.listeners[c]+" given",n}if(s.filter){if("function"!=typeof s.filter)return n.valid=!1,n.error=i+'"filter" must be a function, but '+typeof s.filter+" given",n}else if(s.regex){if(o.helper.isString(s.regex)&&(s.regex=new RegExp(s.regex,"g")),!(s.regex instanceof RegExp))return n.valid=!1,n.error=i+'"regex" property must either be a string or a RegExp object, but '+typeof s.regex+" given",n
if(o.helper.isUndefined(s.replace))return n.valid=!1,n.error=i+'"regex" extensions must implement a replace string or function',n}}return n}function d(e,t){"use strict"
return"¨E"+t.charCodeAt(0)+"E"}o.helper={},o.extensions={},o.setOption=function(e,t){"use strict"
return l[e]=t,this},o.getOption=function(e){"use strict"
return l[e]},o.getOptions=function(){"use strict"
return l},o.resetOptions=function(){"use strict"
l=a(!0)},o.setFlavor=function(e){"use strict"
if(!u.hasOwnProperty(e))throw Error(e+" flavor was not found")
o.resetOptions()
var t=u[e]
for(var r in c=e,t)t.hasOwnProperty(r)&&(l[r]=t[r])},o.getFlavor=function(){"use strict"
return c},o.getFlavorOptions=function(e){"use strict"
if(u.hasOwnProperty(e))return u[e]},o.getDefaultOptions=function(e){"use strict"
return a(e)},o.subParser=function(e,t){"use strict"
if(o.helper.isString(e)){if(void 0===t){if(i.hasOwnProperty(e))return i[e]
throw Error("SubParser named "+e+" not registered!")}i[e]=t}},o.extension=function(e,t){"use strict"
if(!o.helper.isString(e))throw Error("Extension 'name' must be a string")
if(e=o.helper.stdExtName(e),o.helper.isUndefined(t)){if(!s.hasOwnProperty(e))throw Error("Extension named "+e+" is not registered!")
return s[e]}"function"==typeof t&&(t=t()),o.helper.isArray(t)||(t=[t])
var r=p(t,e)
if(!r.valid)throw Error(r.error)
s[e]=t},o.getAllExtensions=function(){"use strict"
return s},o.removeExtension=function(e){"use strict"
delete s[e]},o.resetExtensions=function(){"use strict"
s={}},o.validateExtension=function(e){"use strict"
var t=p(e,null)
return!!t.valid||(console.warn(t.error),!1)},o.hasOwnProperty("helper")||(o.helper={}),o.helper.isString=function(e){"use strict"
return"string"==typeof e||e instanceof String},o.helper.isFunction=function(e){"use strict"
return e&&"[object Function]"==={}.toString.call(e)},o.helper.isArray=function(e){"use strict"
return Array.isArray(e)},o.helper.isUndefined=function(e){"use strict"
return void 0===e},o.helper.forEach=function(e,t){"use strict"
if(o.helper.isUndefined(e))throw new Error("obj param is required")
if(o.helper.isUndefined(t))throw new Error("callback param is required")
if(!o.helper.isFunction(t))throw new Error("callback param must be a function/closure")
if("function"==typeof e.forEach)e.forEach(t)
else if(o.helper.isArray(e))for(var r=0;r<e.length;r++)t(e[r],r,e)
else{if("object"!=typeof e)throw new Error("obj does not seem to be an array or an iterable object")
for(var n in e)e.hasOwnProperty(n)&&t(e[n],n,e)}},o.helper.stdExtName=function(e){"use strict"
return e.replace(/[_?*+\/\\.^-]/g,"").replace(/\s/g,"").toLowerCase()},o.helper.escapeCharactersCallback=d,o.helper.escapeCharacters=function(e,t,r){"use strict"
var n="(["+t.replace(/([\[\]\\])/g,"\\$1")+"])"
r&&(n="\\\\"+n)
var a=new RegExp(n,"g")
return e.replace(a,d)},o.helper.unescapeHTMLEntities=function(e){"use strict"
return e.replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}
var f=function(e,t,r,n){"use strict"
var a,o,i,s,l,c=n||"",u=c.indexOf("g")>-1,p=new RegExp(t+"|"+r,"g"+c.replace(/g/g,"")),d=new RegExp(t,c.replace(/g/g,"")),f=[]
do{for(a=0;i=p.exec(e);)if(d.test(i[0]))a++||(s=(o=p.lastIndex)-i[0].length)
else if(a&&! --a){l=i.index+i[0].length
var h={left:{start:s,end:o},match:{start:o,end:i.index},right:{start:i.index,end:l},wholeMatch:{start:s,end:l}}
if(f.push(h),!u)return f}}while(a&&(p.lastIndex=o))
return f}
o.helper.matchRecursiveRegExp=function(e,t,r,n){"use strict"
for(var a=f(e,t,r,n),o=[],i=0;i<a.length;++i)o.push([e.slice(a[i].wholeMatch.start,a[i].wholeMatch.end),e.slice(a[i].match.start,a[i].match.end),e.slice(a[i].left.start,a[i].left.end),e.slice(a[i].right.start,a[i].right.end)])
return o},o.helper.replaceRecursiveRegExp=function(e,t,r,n,a){"use strict"
if(!o.helper.isFunction(t)){var i=t
t=function(){return i}}var s=f(e,r,n,a),l=e,c=s.length
if(c>0){var u=[]
0!==s[0].wholeMatch.start&&u.push(e.slice(0,s[0].wholeMatch.start))
for(var p=0;p<c;++p)u.push(t(e.slice(s[p].wholeMatch.start,s[p].wholeMatch.end),e.slice(s[p].match.start,s[p].match.end),e.slice(s[p].left.start,s[p].left.end),e.slice(s[p].right.start,s[p].right.end))),p<c-1&&u.push(e.slice(s[p].wholeMatch.end,s[p+1].wholeMatch.start))
s[c-1].wholeMatch.end<e.length&&u.push(e.slice(s[c-1].wholeMatch.end)),l=u.join("")}return l},o.helper.regexIndexOf=function(e,t,r){"use strict"
if(!o.helper.isString(e))throw"InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string"
if(t instanceof RegExp==0)throw"InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp"
var n=e.substring(r||0).search(t)
return n>=0?n+(r||0):n},o.helper.splitAtIndex=function(e,t){"use strict"
if(!o.helper.isString(e))throw"InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string"
return[e.substring(0,t),e.substring(t)]},o.helper.encodeEmailAddress=function(e){"use strict"
var t=[function(e){return"&#"+e.charCodeAt(0)+";"},function(e){return"&#x"+e.charCodeAt(0).toString(16)+";"},function(e){return e}]
return e.replace(/./g,(function(e){if("@"===e)e=t[Math.floor(2*Math.random())](e)
else{var r=Math.random()
e=r>.9?t[2](e):r>.45?t[1](e):t[0](e)}return e}))},o.helper.padEnd=function(e,t,r){"use strict"
return t>>=0,r=String(r||" "),e.length>t?String(e):((t-=e.length)>r.length&&(r+=r.repeat(t/r.length)),String(e)+r.slice(0,t))},"undefined"==typeof console&&(console={warn:function(e){"use strict"
alert(e)},log:function(e){"use strict"
alert(e)},error:function(e){"use strict"
throw e}}),o.helper.regexes={asteriskDashAndColon:/([*_:~])/g},o.helper.emojis={"+1":"👍","-1":"👎",100:"💯",1234:"🔢","1st_place_medal":"🥇","2nd_place_medal":"🥈","3rd_place_medal":"🥉","8ball":"🎱",a:"🅰️",ab:"🆎",abc:"🔤",abcd:"🔡",accept:"🉑",aerial_tramway:"🚡",airplane:"✈️",alarm_clock:"⏰",alembic:"⚗️",alien:"👽",ambulance:"🚑",amphora:"🏺",anchor:"⚓️",angel:"👼",anger:"💢",angry:"😠",anguished:"😧",ant:"🐜",apple:"🍎",aquarius:"♒️",aries:"♈️",arrow_backward:"◀️",arrow_double_down:"⏬",arrow_double_up:"⏫",arrow_down:"⬇️",arrow_down_small:"🔽",arrow_forward:"▶️",arrow_heading_down:"⤵️",arrow_heading_up:"⤴️",arrow_left:"⬅️",arrow_lower_left:"↙️",arrow_lower_right:"↘️",arrow_right:"➡️",arrow_right_hook:"↪️",arrow_up:"⬆️",arrow_up_down:"↕️",arrow_up_small:"🔼",arrow_upper_left:"↖️",arrow_upper_right:"↗️",arrows_clockwise:"🔃",arrows_counterclockwise:"🔄",art:"🎨",articulated_lorry:"🚛",artificial_satellite:"🛰",astonished:"😲",athletic_shoe:"👟",atm:"🏧",atom_symbol:"⚛️",avocado:"🥑",b:"🅱️",baby:"👶",baby_bottle:"🍼",baby_chick:"🐤",baby_symbol:"🚼",back:"🔙",bacon:"🥓",badminton:"🏸",baggage_claim:"🛄",baguette_bread:"🥖",balance_scale:"⚖️",balloon:"🎈",ballot_box:"🗳",ballot_box_with_check:"☑️",bamboo:"🎍",banana:"🍌",bangbang:"‼️",bank:"🏦",bar_chart:"📊",barber:"💈",baseball:"⚾️",basketball:"🏀",basketball_man:"⛹️",basketball_woman:"⛹️&zwj;♀️",bat:"🦇",bath:"🛀",bathtub:"🛁",battery:"🔋",beach_umbrella:"🏖",bear:"🐻",bed:"🛏",bee:"🐝",beer:"🍺",beers:"🍻",beetle:"🐞",beginner:"🔰",bell:"🔔",bellhop_bell:"🛎",bento:"🍱",biking_man:"🚴",bike:"🚲",biking_woman:"🚴&zwj;♀️",bikini:"👙",biohazard:"☣️",bird:"🐦",birthday:"🎂",black_circle:"⚫️",black_flag:"🏴",black_heart:"🖤",black_joker:"🃏",black_large_square:"⬛️",black_medium_small_square:"◾️",black_medium_square:"◼️",black_nib:"✒️",black_small_square:"▪️",black_square_button:"🔲",blonde_man:"👱",blonde_woman:"👱&zwj;♀️",blossom:"🌼",blowfish:"🐡",blue_book:"📘",blue_car:"🚙",blue_heart:"💙",blush:"😊",boar:"🐗",boat:"⛵️",bomb:"💣",book:"📖",bookmark:"🔖",bookmark_tabs:"📑",books:"📚",boom:"💥",boot:"👢",bouquet:"💐",bowing_man:"🙇",bow_and_arrow:"🏹",bowing_woman:"🙇&zwj;♀️",bowling:"🎳",boxing_glove:"🥊",boy:"👦",bread:"🍞",bride_with_veil:"👰",bridge_at_night:"🌉",briefcase:"💼",broken_heart:"💔",bug:"🐛",building_construction:"🏗",bulb:"💡",bullettrain_front:"🚅",bullettrain_side:"🚄",burrito:"🌯",bus:"🚌",business_suit_levitating:"🕴",busstop:"🚏",bust_in_silhouette:"👤",busts_in_silhouette:"👥",butterfly:"🦋",cactus:"🌵",cake:"🍰",calendar:"📆",call_me_hand:"🤙",calling:"📲",camel:"🐫",camera:"📷",camera_flash:"📸",camping:"🏕",cancer:"♋️",candle:"🕯",candy:"🍬",canoe:"🛶",capital_abcd:"🔠",capricorn:"♑️",car:"🚗",card_file_box:"🗃",card_index:"📇",card_index_dividers:"🗂",carousel_horse:"🎠",carrot:"🥕",cat:"🐱",cat2:"🐈",cd:"💿",chains:"⛓",champagne:"🍾",chart:"💹",chart_with_downwards_trend:"📉",chart_with_upwards_trend:"📈",checkered_flag:"🏁",cheese:"🧀",cherries:"🍒",cherry_blossom:"🌸",chestnut:"🌰",chicken:"🐔",children_crossing:"🚸",chipmunk:"🐿",chocolate_bar:"🍫",christmas_tree:"🎄",church:"⛪️",cinema:"🎦",circus_tent:"🎪",city_sunrise:"🌇",city_sunset:"🌆",cityscape:"🏙",cl:"🆑",clamp:"🗜",clap:"👏",clapper:"🎬",classical_building:"🏛",clinking_glasses:"🥂",clipboard:"📋",clock1:"🕐",clock10:"🕙",clock1030:"🕥",clock11:"🕚",clock1130:"🕦",clock12:"🕛",clock1230:"🕧",clock130:"🕜",clock2:"🕑",clock230:"🕝",clock3:"🕒",clock330:"🕞",clock4:"🕓",clock430:"🕟",clock5:"🕔",clock530:"🕠",clock6:"🕕",clock630:"🕡",clock7:"🕖",clock730:"🕢",clock8:"🕗",clock830:"🕣",clock9:"🕘",clock930:"🕤",closed_book:"📕",closed_lock_with_key:"🔐",closed_umbrella:"🌂",cloud:"☁️",cloud_with_lightning:"🌩",cloud_with_lightning_and_rain:"⛈",cloud_with_rain:"🌧",cloud_with_snow:"🌨",clown_face:"🤡",clubs:"♣️",cocktail:"🍸",coffee:"☕️",coffin:"⚰️",cold_sweat:"😰",comet:"☄️",computer:"💻",computer_mouse:"🖱",confetti_ball:"🎊",confounded:"😖",confused:"😕",congratulations:"㊗️",construction:"🚧",construction_worker_man:"👷",construction_worker_woman:"👷&zwj;♀️",control_knobs:"🎛",convenience_store:"🏪",cookie:"🍪",cool:"🆒",policeman:"👮",copyright:"©️",corn:"🌽",couch_and_lamp:"🛋",couple:"👫",couple_with_heart_woman_man:"💑",couple_with_heart_man_man:"👨&zwj;❤️&zwj;👨",couple_with_heart_woman_woman:"👩&zwj;❤️&zwj;👩",couplekiss_man_man:"👨&zwj;❤️&zwj;💋&zwj;👨",couplekiss_man_woman:"💏",couplekiss_woman_woman:"👩&zwj;❤️&zwj;💋&zwj;👩",cow:"🐮",cow2:"🐄",cowboy_hat_face:"🤠",crab:"🦀",crayon:"🖍",credit_card:"💳",crescent_moon:"🌙",cricket:"🏏",crocodile:"🐊",croissant:"🥐",crossed_fingers:"🤞",crossed_flags:"🎌",crossed_swords:"⚔️",crown:"👑",cry:"😢",crying_cat_face:"😿",crystal_ball:"🔮",cucumber:"🥒",cupid:"💘",curly_loop:"➰",currency_exchange:"💱",curry:"🍛",custard:"🍮",customs:"🛃",cyclone:"🌀",dagger:"🗡",dancer:"💃",dancing_women:"👯",dancing_men:"👯&zwj;♂️",dango:"🍡",dark_sunglasses:"🕶",dart:"🎯",dash:"💨",date:"📅",deciduous_tree:"🌳",deer:"🦌",department_store:"🏬",derelict_house:"🏚",desert:"🏜",desert_island:"🏝",desktop_computer:"🖥",male_detective:"🕵️",diamond_shape_with_a_dot_inside:"💠",diamonds:"♦️",disappointed:"😞",disappointed_relieved:"😥",dizzy:"💫",dizzy_face:"😵",do_not_litter:"🚯",dog:"🐶",dog2:"🐕",dollar:"💵",dolls:"🎎",dolphin:"🐬",door:"🚪",doughnut:"🍩",dove:"🕊",dragon:"🐉",dragon_face:"🐲",dress:"👗",dromedary_camel:"🐪",drooling_face:"🤤",droplet:"💧",drum:"🥁",duck:"🦆",dvd:"📀","e-mail":"📧",eagle:"🦅",ear:"👂",ear_of_rice:"🌾",earth_africa:"🌍",earth_americas:"🌎",earth_asia:"🌏",egg:"🥚",eggplant:"🍆",eight_pointed_black_star:"✴️",eight_spoked_asterisk:"✳️",electric_plug:"🔌",elephant:"🐘",email:"✉️",end:"🔚",envelope_with_arrow:"📩",euro:"💶",european_castle:"🏰",european_post_office:"🏤",evergreen_tree:"🌲",exclamation:"❗️",expressionless:"😑",eye:"👁",eye_speech_bubble:"👁&zwj;🗨",eyeglasses:"👓",eyes:"👀",face_with_head_bandage:"🤕",face_with_thermometer:"🤒",fist_oncoming:"👊",factory:"🏭",fallen_leaf:"🍂",family_man_woman_boy:"👪",family_man_boy:"👨&zwj;👦",family_man_boy_boy:"👨&zwj;👦&zwj;👦",family_man_girl:"👨&zwj;👧",family_man_girl_boy:"👨&zwj;👧&zwj;👦",family_man_girl_girl:"👨&zwj;👧&zwj;👧",family_man_man_boy:"👨&zwj;👨&zwj;👦",family_man_man_boy_boy:"👨&zwj;👨&zwj;👦&zwj;👦",family_man_man_girl:"👨&zwj;👨&zwj;👧",family_man_man_girl_boy:"👨&zwj;👨&zwj;👧&zwj;👦",family_man_man_girl_girl:"👨&zwj;👨&zwj;👧&zwj;👧",family_man_woman_boy_boy:"👨&zwj;👩&zwj;👦&zwj;👦",family_man_woman_girl:"👨&zwj;👩&zwj;👧",family_man_woman_girl_boy:"👨&zwj;👩&zwj;👧&zwj;👦",family_man_woman_girl_girl:"👨&zwj;👩&zwj;👧&zwj;👧",family_woman_boy:"👩&zwj;👦",family_woman_boy_boy:"👩&zwj;👦&zwj;👦",family_woman_girl:"👩&zwj;👧",family_woman_girl_boy:"👩&zwj;👧&zwj;👦",family_woman_girl_girl:"👩&zwj;👧&zwj;👧",family_woman_woman_boy:"👩&zwj;👩&zwj;👦",family_woman_woman_boy_boy:"👩&zwj;👩&zwj;👦&zwj;👦",family_woman_woman_girl:"👩&zwj;👩&zwj;👧",family_woman_woman_girl_boy:"👩&zwj;👩&zwj;👧&zwj;👦",family_woman_woman_girl_girl:"👩&zwj;👩&zwj;👧&zwj;👧",fast_forward:"⏩",fax:"📠",fearful:"😨",feet:"🐾",female_detective:"🕵️&zwj;♀️",ferris_wheel:"🎡",ferry:"⛴",field_hockey:"🏑",file_cabinet:"🗄",file_folder:"📁",film_projector:"📽",film_strip:"🎞",fire:"🔥",fire_engine:"🚒",fireworks:"🎆",first_quarter_moon:"🌓",first_quarter_moon_with_face:"🌛",fish:"🐟",fish_cake:"🍥",fishing_pole_and_fish:"🎣",fist_raised:"✊",fist_left:"🤛",fist_right:"🤜",flags:"🎏",flashlight:"🔦",fleur_de_lis:"⚜️",flight_arrival:"🛬",flight_departure:"🛫",floppy_disk:"💾",flower_playing_cards:"🎴",flushed:"😳",fog:"🌫",foggy:"🌁",football:"🏈",footprints:"👣",fork_and_knife:"🍴",fountain:"⛲️",fountain_pen:"🖋",four_leaf_clover:"🍀",fox_face:"🦊",framed_picture:"🖼",free:"🆓",fried_egg:"🍳",fried_shrimp:"🍤",fries:"🍟",frog:"🐸",frowning:"😦",frowning_face:"☹️",frowning_man:"🙍&zwj;♂️",frowning_woman:"🙍",middle_finger:"🖕",fuelpump:"⛽️",full_moon:"🌕",full_moon_with_face:"🌝",funeral_urn:"⚱️",game_die:"🎲",gear:"⚙️",gem:"💎",gemini:"♊️",ghost:"👻",gift:"🎁",gift_heart:"💝",girl:"👧",globe_with_meridians:"🌐",goal_net:"🥅",goat:"🐐",golf:"⛳️",golfing_man:"🏌️",golfing_woman:"🏌️&zwj;♀️",gorilla:"🦍",grapes:"🍇",green_apple:"🍏",green_book:"📗",green_heart:"💚",green_salad:"🥗",grey_exclamation:"❕",grey_question:"❔",grimacing:"😬",grin:"😁",grinning:"😀",guardsman:"💂",guardswoman:"💂&zwj;♀️",guitar:"🎸",gun:"🔫",haircut_woman:"💇",haircut_man:"💇&zwj;♂️",hamburger:"🍔",hammer:"🔨",hammer_and_pick:"⚒",hammer_and_wrench:"🛠",hamster:"🐹",hand:"✋",handbag:"👜",handshake:"🤝",hankey:"💩",hatched_chick:"🐥",hatching_chick:"🐣",headphones:"🎧",hear_no_evil:"🙉",heart:"❤️",heart_decoration:"💟",heart_eyes:"😍",heart_eyes_cat:"😻",heartbeat:"💓",heartpulse:"💗",hearts:"♥️",heavy_check_mark:"✔️",heavy_division_sign:"➗",heavy_dollar_sign:"💲",heavy_heart_exclamation:"❣️",heavy_minus_sign:"➖",heavy_multiplication_x:"✖️",heavy_plus_sign:"➕",helicopter:"🚁",herb:"🌿",hibiscus:"🌺",high_brightness:"🔆",high_heel:"👠",hocho:"🔪",hole:"🕳",honey_pot:"🍯",horse:"🐴",horse_racing:"🏇",hospital:"🏥",hot_pepper:"🌶",hotdog:"🌭",hotel:"🏨",hotsprings:"♨️",hourglass:"⌛️",hourglass_flowing_sand:"⏳",house:"🏠",house_with_garden:"🏡",houses:"🏘",hugs:"🤗",hushed:"😯",ice_cream:"🍨",ice_hockey:"🏒",ice_skate:"⛸",icecream:"🍦",id:"🆔",ideograph_advantage:"🉐",imp:"👿",inbox_tray:"📥",incoming_envelope:"📨",tipping_hand_woman:"💁",information_source:"ℹ️",innocent:"😇",interrobang:"⁉️",iphone:"📱",izakaya_lantern:"🏮",jack_o_lantern:"🎃",japan:"🗾",japanese_castle:"🏯",japanese_goblin:"👺",japanese_ogre:"👹",jeans:"👖",joy:"😂",joy_cat:"😹",joystick:"🕹",kaaba:"🕋",key:"🔑",keyboard:"⌨️",keycap_ten:"🔟",kick_scooter:"🛴",kimono:"👘",kiss:"💋",kissing:"😗",kissing_cat:"😽",kissing_closed_eyes:"😚",kissing_heart:"😘",kissing_smiling_eyes:"😙",kiwi_fruit:"🥝",koala:"🐨",koko:"🈁",label:"🏷",large_blue_circle:"🔵",large_blue_diamond:"🔷",large_orange_diamond:"🔶",last_quarter_moon:"🌗",last_quarter_moon_with_face:"🌜",latin_cross:"✝️",laughing:"😆",leaves:"🍃",ledger:"📒",left_luggage:"🛅",left_right_arrow:"↔️",leftwards_arrow_with_hook:"↩️",lemon:"🍋",leo:"♌️",leopard:"🐆",level_slider:"🎚",libra:"♎️",light_rail:"🚈",link:"🔗",lion:"🦁",lips:"👄",lipstick:"💄",lizard:"🦎",lock:"🔒",lock_with_ink_pen:"🔏",lollipop:"🍭",loop:"➿",loud_sound:"🔊",loudspeaker:"📢",love_hotel:"🏩",love_letter:"💌",low_brightness:"🔅",lying_face:"🤥",m:"Ⓜ️",mag:"🔍",mag_right:"🔎",mahjong:"🀄️",mailbox:"📫",mailbox_closed:"📪",mailbox_with_mail:"📬",mailbox_with_no_mail:"📭",man:"👨",man_artist:"👨&zwj;🎨",man_astronaut:"👨&zwj;🚀",man_cartwheeling:"🤸&zwj;♂️",man_cook:"👨&zwj;🍳",man_dancing:"🕺",man_facepalming:"🤦&zwj;♂️",man_factory_worker:"👨&zwj;🏭",man_farmer:"👨&zwj;🌾",man_firefighter:"👨&zwj;🚒",man_health_worker:"👨&zwj;⚕️",man_in_tuxedo:"🤵",man_judge:"👨&zwj;⚖️",man_juggling:"🤹&zwj;♂️",man_mechanic:"👨&zwj;🔧",man_office_worker:"👨&zwj;💼",man_pilot:"👨&zwj;✈️",man_playing_handball:"🤾&zwj;♂️",man_playing_water_polo:"🤽&zwj;♂️",man_scientist:"👨&zwj;🔬",man_shrugging:"🤷&zwj;♂️",man_singer:"👨&zwj;🎤",man_student:"👨&zwj;🎓",man_teacher:"👨&zwj;🏫",man_technologist:"👨&zwj;💻",man_with_gua_pi_mao:"👲",man_with_turban:"👳",tangerine:"🍊",mans_shoe:"👞",mantelpiece_clock:"🕰",maple_leaf:"🍁",martial_arts_uniform:"🥋",mask:"😷",massage_woman:"💆",massage_man:"💆&zwj;♂️",meat_on_bone:"🍖",medal_military:"🎖",medal_sports:"🏅",mega:"📣",melon:"🍈",memo:"📝",men_wrestling:"🤼&zwj;♂️",menorah:"🕎",mens:"🚹",metal:"🤘",metro:"🚇",microphone:"🎤",microscope:"🔬",milk_glass:"🥛",milky_way:"🌌",minibus:"🚐",minidisc:"💽",mobile_phone_off:"📴",money_mouth_face:"🤑",money_with_wings:"💸",moneybag:"💰",monkey:"🐒",monkey_face:"🐵",monorail:"🚝",moon:"🌔",mortar_board:"🎓",mosque:"🕌",motor_boat:"🛥",motor_scooter:"🛵",motorcycle:"🏍",motorway:"🛣",mount_fuji:"🗻",mountain:"⛰",mountain_biking_man:"🚵",mountain_biking_woman:"🚵&zwj;♀️",mountain_cableway:"🚠",mountain_railway:"🚞",mountain_snow:"🏔",mouse:"🐭",mouse2:"🐁",movie_camera:"🎥",moyai:"🗿",mrs_claus:"🤶",muscle:"💪",mushroom:"🍄",musical_keyboard:"🎹",musical_note:"🎵",musical_score:"🎼",mute:"🔇",nail_care:"💅",name_badge:"📛",national_park:"🏞",nauseated_face:"🤢",necktie:"👔",negative_squared_cross_mark:"❎",nerd_face:"🤓",neutral_face:"😐",new:"🆕",new_moon:"🌑",new_moon_with_face:"🌚",newspaper:"📰",newspaper_roll:"🗞",next_track_button:"⏭",ng:"🆖",no_good_man:"🙅&zwj;♂️",no_good_woman:"🙅",night_with_stars:"🌃",no_bell:"🔕",no_bicycles:"🚳",no_entry:"⛔️",no_entry_sign:"🚫",no_mobile_phones:"📵",no_mouth:"😶",no_pedestrians:"🚷",no_smoking:"🚭","non-potable_water":"🚱",nose:"👃",notebook:"📓",notebook_with_decorative_cover:"📔",notes:"🎶",nut_and_bolt:"🔩",o:"⭕️",o2:"🅾️",ocean:"🌊",octopus:"🐙",oden:"🍢",office:"🏢",oil_drum:"🛢",ok:"🆗",ok_hand:"👌",ok_man:"🙆&zwj;♂️",ok_woman:"🙆",old_key:"🗝",older_man:"👴",older_woman:"👵",om:"🕉",on:"🔛",oncoming_automobile:"🚘",oncoming_bus:"🚍",oncoming_police_car:"🚔",oncoming_taxi:"🚖",open_file_folder:"📂",open_hands:"👐",open_mouth:"😮",open_umbrella:"☂️",ophiuchus:"⛎",orange_book:"📙",orthodox_cross:"☦️",outbox_tray:"📤",owl:"🦉",ox:"🐂",package:"📦",page_facing_up:"📄",page_with_curl:"📃",pager:"📟",paintbrush:"🖌",palm_tree:"🌴",pancakes:"🥞",panda_face:"🐼",paperclip:"📎",paperclips:"🖇",parasol_on_ground:"⛱",parking:"🅿️",part_alternation_mark:"〽️",partly_sunny:"⛅️",passenger_ship:"🛳",passport_control:"🛂",pause_button:"⏸",peace_symbol:"☮️",peach:"🍑",peanuts:"🥜",pear:"🍐",pen:"🖊",pencil2:"✏️",penguin:"🐧",pensive:"😔",performing_arts:"🎭",persevere:"😣",person_fencing:"🤺",pouting_woman:"🙎",phone:"☎️",pick:"⛏",pig:"🐷",pig2:"🐖",pig_nose:"🐽",pill:"💊",pineapple:"🍍",ping_pong:"🏓",pisces:"♓️",pizza:"🍕",place_of_worship:"🛐",plate_with_cutlery:"🍽",play_or_pause_button:"⏯",point_down:"👇",point_left:"👈",point_right:"👉",point_up:"☝️",point_up_2:"👆",police_car:"🚓",policewoman:"👮&zwj;♀️",poodle:"🐩",popcorn:"🍿",post_office:"🏣",postal_horn:"📯",postbox:"📮",potable_water:"🚰",potato:"🥔",pouch:"👝",poultry_leg:"🍗",pound:"💷",rage:"😡",pouting_cat:"😾",pouting_man:"🙎&zwj;♂️",pray:"🙏",prayer_beads:"📿",pregnant_woman:"🤰",previous_track_button:"⏮",prince:"🤴",princess:"👸",printer:"🖨",purple_heart:"💜",purse:"👛",pushpin:"📌",put_litter_in_its_place:"🚮",question:"❓",rabbit:"🐰",rabbit2:"🐇",racehorse:"🐎",racing_car:"🏎",radio:"📻",radio_button:"🔘",radioactive:"☢️",railway_car:"🚃",railway_track:"🛤",rainbow:"🌈",rainbow_flag:"🏳️&zwj;🌈",raised_back_of_hand:"🤚",raised_hand_with_fingers_splayed:"🖐",raised_hands:"🙌",raising_hand_woman:"🙋",raising_hand_man:"🙋&zwj;♂️",ram:"🐏",ramen:"🍜",rat:"🐀",record_button:"⏺",recycle:"♻️",red_circle:"🔴",registered:"®️",relaxed:"☺️",relieved:"😌",reminder_ribbon:"🎗",repeat:"🔁",repeat_one:"🔂",rescue_worker_helmet:"⛑",restroom:"🚻",revolving_hearts:"💞",rewind:"⏪",rhinoceros:"🦏",ribbon:"🎀",rice:"🍚",rice_ball:"🍙",rice_cracker:"🍘",rice_scene:"🎑",right_anger_bubble:"🗯",ring:"💍",robot:"🤖",rocket:"🚀",rofl:"🤣",roll_eyes:"🙄",roller_coaster:"🎢",rooster:"🐓",rose:"🌹",rosette:"🏵",rotating_light:"🚨",round_pushpin:"📍",rowing_man:"🚣",rowing_woman:"🚣&zwj;♀️",rugby_football:"🏉",running_man:"🏃",running_shirt_with_sash:"🎽",running_woman:"🏃&zwj;♀️",sa:"🈂️",sagittarius:"♐️",sake:"🍶",sandal:"👡",santa:"🎅",satellite:"📡",saxophone:"🎷",school:"🏫",school_satchel:"🎒",scissors:"✂️",scorpion:"🦂",scorpius:"♏️",scream:"😱",scream_cat:"🙀",scroll:"📜",seat:"💺",secret:"㊙️",see_no_evil:"🙈",seedling:"🌱",selfie:"🤳",shallow_pan_of_food:"🥘",shamrock:"☘️",shark:"🦈",shaved_ice:"🍧",sheep:"🐑",shell:"🐚",shield:"🛡",shinto_shrine:"⛩",ship:"🚢",shirt:"👕",shopping:"🛍",shopping_cart:"🛒",shower:"🚿",shrimp:"🦐",signal_strength:"📶",six_pointed_star:"🔯",ski:"🎿",skier:"⛷",skull:"💀",skull_and_crossbones:"☠️",sleeping:"😴",sleeping_bed:"🛌",sleepy:"😪",slightly_frowning_face:"🙁",slightly_smiling_face:"🙂",slot_machine:"🎰",small_airplane:"🛩",small_blue_diamond:"🔹",small_orange_diamond:"🔸",small_red_triangle:"🔺",small_red_triangle_down:"🔻",smile:"😄",smile_cat:"😸",smiley:"😃",smiley_cat:"😺",smiling_imp:"😈",smirk:"😏",smirk_cat:"😼",smoking:"🚬",snail:"🐌",snake:"🐍",sneezing_face:"🤧",snowboarder:"🏂",snowflake:"❄️",snowman:"⛄️",snowman_with_snow:"☃️",sob:"😭",soccer:"⚽️",soon:"🔜",sos:"🆘",sound:"🔉",space_invader:"👾",spades:"♠️",spaghetti:"🍝",sparkle:"❇️",sparkler:"🎇",sparkles:"✨",sparkling_heart:"💖",speak_no_evil:"🙊",speaker:"🔈",speaking_head:"🗣",speech_balloon:"💬",speedboat:"🚤",spider:"🕷",spider_web:"🕸",spiral_calendar:"🗓",spiral_notepad:"🗒",spoon:"🥄",squid:"🦑",stadium:"🏟",star:"⭐️",star2:"🌟",star_and_crescent:"☪️",star_of_david:"✡️",stars:"🌠",station:"🚉",statue_of_liberty:"🗽",steam_locomotive:"🚂",stew:"🍲",stop_button:"⏹",stop_sign:"🛑",stopwatch:"⏱",straight_ruler:"📏",strawberry:"🍓",stuck_out_tongue:"😛",stuck_out_tongue_closed_eyes:"😝",stuck_out_tongue_winking_eye:"😜",studio_microphone:"🎙",stuffed_flatbread:"🥙",sun_behind_large_cloud:"🌥",sun_behind_rain_cloud:"🌦",sun_behind_small_cloud:"🌤",sun_with_face:"🌞",sunflower:"🌻",sunglasses:"😎",sunny:"☀️",sunrise:"🌅",sunrise_over_mountains:"🌄",surfing_man:"🏄",surfing_woman:"🏄&zwj;♀️",sushi:"🍣",suspension_railway:"🚟",sweat:"😓",sweat_drops:"💦",sweat_smile:"😅",sweet_potato:"🍠",swimming_man:"🏊",swimming_woman:"🏊&zwj;♀️",symbols:"🔣",synagogue:"🕍",syringe:"💉",taco:"🌮",tada:"🎉",tanabata_tree:"🎋",taurus:"♉️",taxi:"🚕",tea:"🍵",telephone_receiver:"📞",telescope:"🔭",tennis:"🎾",tent:"⛺️",thermometer:"🌡",thinking:"🤔",thought_balloon:"💭",ticket:"🎫",tickets:"🎟",tiger:"🐯",tiger2:"🐅",timer_clock:"⏲",tipping_hand_man:"💁&zwj;♂️",tired_face:"😫",tm:"™️",toilet:"🚽",tokyo_tower:"🗼",tomato:"🍅",tongue:"👅",top:"🔝",tophat:"🎩",tornado:"🌪",trackball:"🖲",tractor:"🚜",traffic_light:"🚥",train:"🚋",train2:"🚆",tram:"🚊",triangular_flag_on_post:"🚩",triangular_ruler:"📐",trident:"🔱",triumph:"😤",trolleybus:"🚎",trophy:"🏆",tropical_drink:"🍹",tropical_fish:"🐠",truck:"🚚",trumpet:"🎺",tulip:"🌷",tumbler_glass:"🥃",turkey:"🦃",turtle:"🐢",tv:"📺",twisted_rightwards_arrows:"🔀",two_hearts:"💕",two_men_holding_hands:"👬",two_women_holding_hands:"👭",u5272:"🈹",u5408:"🈴",u55b6:"🈺",u6307:"🈯️",u6708:"🈷️",u6709:"🈶",u6e80:"🈵",u7121:"🈚️",u7533:"🈸",u7981:"🈲",u7a7a:"🈳",umbrella:"☔️",unamused:"😒",underage:"🔞",unicorn:"🦄",unlock:"🔓",up:"🆙",upside_down_face:"🙃",v:"✌️",vertical_traffic_light:"🚦",vhs:"📼",vibration_mode:"📳",video_camera:"📹",video_game:"🎮",violin:"🎻",virgo:"♍️",volcano:"🌋",volleyball:"🏐",vs:"🆚",vulcan_salute:"🖖",walking_man:"🚶",walking_woman:"🚶&zwj;♀️",waning_crescent_moon:"🌘",waning_gibbous_moon:"🌖",warning:"⚠️",wastebasket:"🗑",watch:"⌚️",water_buffalo:"🐃",watermelon:"🍉",wave:"👋",wavy_dash:"〰️",waxing_crescent_moon:"🌒",wc:"🚾",weary:"😩",wedding:"💒",weight_lifting_man:"🏋️",weight_lifting_woman:"🏋️&zwj;♀️",whale:"🐳",whale2:"🐋",wheel_of_dharma:"☸️",wheelchair:"♿️",white_check_mark:"✅",white_circle:"⚪️",white_flag:"🏳️",white_flower:"💮",white_large_square:"⬜️",white_medium_small_square:"◽️",white_medium_square:"◻️",white_small_square:"▫️",white_square_button:"🔳",wilted_flower:"🥀",wind_chime:"🎐",wind_face:"🌬",wine_glass:"🍷",wink:"😉",wolf:"🐺",woman:"👩",woman_artist:"👩&zwj;🎨",woman_astronaut:"👩&zwj;🚀",woman_cartwheeling:"🤸&zwj;♀️",woman_cook:"👩&zwj;🍳",woman_facepalming:"🤦&zwj;♀️",woman_factory_worker:"👩&zwj;🏭",woman_farmer:"👩&zwj;🌾",woman_firefighter:"👩&zwj;🚒",woman_health_worker:"👩&zwj;⚕️",woman_judge:"👩&zwj;⚖️",woman_juggling:"🤹&zwj;♀️",woman_mechanic:"👩&zwj;🔧",woman_office_worker:"👩&zwj;💼",woman_pilot:"👩&zwj;✈️",woman_playing_handball:"🤾&zwj;♀️",woman_playing_water_polo:"🤽&zwj;♀️",woman_scientist:"👩&zwj;🔬",woman_shrugging:"🤷&zwj;♀️",woman_singer:"👩&zwj;🎤",woman_student:"👩&zwj;🎓",woman_teacher:"👩&zwj;🏫",woman_technologist:"👩&zwj;💻",woman_with_turban:"👳&zwj;♀️",womans_clothes:"👚",womans_hat:"👒",women_wrestling:"🤼&zwj;♀️",womens:"🚺",world_map:"🗺",worried:"😟",wrench:"🔧",writing_hand:"✍️",x:"❌",yellow_heart:"💛",yen:"💴",yin_yang:"☯️",yum:"😋",zap:"⚡️",zipper_mouth_face:"🤐",zzz:"💤",octocat:'<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',showdown:"<span style=\"font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;\">S</span>"},o.Converter=function(e){"use strict"
var t={},r=[],n=[],a={},i=c,d={parsed:{},raw:"",format:""}
function f(e,t){if(t=t||null,o.helper.isString(e)){if(t=e=o.helper.stdExtName(e),o.extensions[e])return console.warn("DEPRECATION WARNING: "+e+" is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"),void function(e,t){"function"==typeof e&&(e=e(new o.Converter)),o.helper.isArray(e)||(e=[e])
var a=p(e,t)
if(!a.valid)throw Error(a.error)
for(var i=0;i<e.length;++i)switch(e[i].type){case"lang":r.push(e[i])
break
case"output":n.push(e[i])
break
default:throw Error("Extension loader error: Type unrecognized!!!")}}(o.extensions[e],e)
if(o.helper.isUndefined(s[e]))throw Error('Extension "'+e+'" could not be loaded. It was either not found or is not a valid extension.')
e=s[e]}"function"==typeof e&&(e=e()),o.helper.isArray(e)||(e=[e])
var a=p(e,t)
if(!a.valid)throw Error(a.error)
for(var i=0;i<e.length;++i){switch(e[i].type){case"lang":r.push(e[i])
break
case"output":n.push(e[i])}if(e[i].hasOwnProperty("listeners"))for(var l in e[i].listeners)e[i].listeners.hasOwnProperty(l)&&h(l,e[i].listeners[l])}}function h(e,t){if(!o.helper.isString(e))throw Error("Invalid argument in converter.listen() method: name must be a string, but "+typeof e+" given")
if("function"!=typeof t)throw Error("Invalid argument in converter.listen() method: callback must be a function, but "+typeof t+" given")
a.hasOwnProperty(e)||(a[e]=[]),a[e].push(t)}!function(){for(var r in e=e||{},l)l.hasOwnProperty(r)&&(t[r]=l[r])
if("object"!=typeof e)throw Error("Converter expects the passed parameter to be an object, but "+typeof e+" was passed instead.")
for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])
t.extensions&&o.helper.forEach(t.extensions,f)}(),this._dispatch=function(e,t,r,n){if(a.hasOwnProperty(e))for(var o=0;o<a[e].length;++o){var i=a[e][o](e,t,this,r,n)
i&&void 0!==i&&(t=i)}return t},this.listen=function(e,t){return h(e,t),this},this.makeHtml=function(e){if(!e)return e
var a={gHtmlBlocks:[],gHtmlMdBlocks:[],gHtmlSpans:[],gUrls:{},gTitles:{},gDimensions:{},gListLevel:0,hashLinkCounts:{},langExtensions:r,outputModifiers:n,converter:this,ghCodeBlocks:[],metadata:{parsed:{},raw:"",format:""}}
return e=(e=(e=(e=(e=e.replace(/¨/g,"¨T")).replace(/\$/g,"¨D")).replace(/\r\n/g,"\n")).replace(/\r/g,"\n")).replace(/\u00A0/g,"&nbsp;"),t.smartIndentationFix&&(e=function(e){var t=e.match(/^\s*/)[0].length,r=new RegExp("^\\s{0,"+t+"}","gm")
return e.replace(r,"")}(e)),e="\n\n"+e+"\n\n",e=(e=o.subParser("detab")(e,t,a)).replace(/^[ \t]+$/gm,""),o.helper.forEach(r,(function(r){e=o.subParser("runExtension")(r,e,t,a)})),e=o.subParser("metadata")(e,t,a),e=o.subParser("hashPreCodeTags")(e,t,a),e=o.subParser("githubCodeBlocks")(e,t,a),e=o.subParser("hashHTMLBlocks")(e,t,a),e=o.subParser("hashCodeTags")(e,t,a),e=o.subParser("stripLinkDefinitions")(e,t,a),e=o.subParser("blockGamut")(e,t,a),e=o.subParser("unhashHTMLSpans")(e,t,a),e=(e=(e=o.subParser("unescapeSpecialChars")(e,t,a)).replace(/¨D/g,"$$")).replace(/¨T/g,"¨"),e=o.subParser("completeHTMLDocument")(e,t,a),o.helper.forEach(n,(function(r){e=o.subParser("runExtension")(r,e,t,a)})),d=a.metadata,e},this.makeMarkdown=this.makeMd=function(e,t){if(e=(e=(e=e.replace(/\r\n/g,"\n")).replace(/\r/g,"\n")).replace(/>[ \t]+</,">¨NBSP;<"),!t){if(!window||!window.document)throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM")
t=window.document}var r=t.createElement("div")
r.innerHTML=e
var n={preList:function(e){for(var t=e.querySelectorAll("pre"),r=[],n=0;n<t.length;++n)if(1===t[n].childElementCount&&"code"===t[n].firstChild.tagName.toLowerCase()){var a=t[n].firstChild.innerHTML.trim(),i=t[n].firstChild.getAttribute("data-language")||""
if(""===i)for(var s=t[n].firstChild.className.split(" "),l=0;l<s.length;++l){var c=s[l].match(/^language-(.+)$/)
if(null!==c){i=c[1]
break}}a=o.helper.unescapeHTMLEntities(a),r.push(a),t[n].outerHTML='<precode language="'+i+'" precodenum="'+n.toString()+'"></precode>'}else r.push(t[n].innerHTML),t[n].innerHTML="",t[n].setAttribute("prenum",n.toString())
return r}(r)}
!function e(t){for(var r=0;r<t.childNodes.length;++r){var n=t.childNodes[r]
3===n.nodeType?/\S/.test(n.nodeValue)?(n.nodeValue=n.nodeValue.split("\n").join(" "),n.nodeValue=n.nodeValue.replace(/(\s)+/g,"$1")):(t.removeChild(n),--r):1===n.nodeType&&e(n)}}(r)
for(var a=r.childNodes,i="",s=0;s<a.length;s++)i+=o.subParser("makeMarkdown.node")(a[s],n)
return i},this.setOption=function(e,r){t[e]=r},this.getOption=function(e){return t[e]},this.getOptions=function(){return t},this.addExtension=function(e,t){f(e,t=t||null)},this.useExtension=function(e){f(e)},this.setFlavor=function(e){if(!u.hasOwnProperty(e))throw Error(e+" flavor was not found")
var r=u[e]
for(var n in i=e,r)r.hasOwnProperty(n)&&(t[n]=r[n])},this.getFlavor=function(){return i},this.removeExtension=function(e){o.helper.isArray(e)||(e=[e])
for(var t=0;t<e.length;++t){for(var a=e[t],i=0;i<r.length;++i)r[i]===a&&r[i].splice(i,1)
for(;0<n.length;++i)n[0]===a&&n[0].splice(i,1)}},this.getAllExtensions=function(){return{language:r,output:n}},this.getMetadata=function(e){return e?d.raw:d.parsed},this.getMetadataFormat=function(){return d.format},this._setMetadataPair=function(e,t){d.parsed[e]=t},this._setMetadataFormat=function(e){d.format=e},this._setMetadataRaw=function(e){d.raw=e}},o.subParser("anchors",(function(e,t,r){"use strict"
var n=function(e,n,a,i,s,l,c){if(o.helper.isUndefined(c)&&(c=""),a=a.toLowerCase(),e.search(/\(<?\s*>? ?(['"].*['"])?\)$/m)>-1)i=""
else if(!i){if(a||(a=n.toLowerCase().replace(/ ?\n/g," ")),i="#"+a,o.helper.isUndefined(r.gUrls[a]))return e
i=r.gUrls[a],o.helper.isUndefined(r.gTitles[a])||(c=r.gTitles[a])}var u='<a href="'+(i=i.replace(o.helper.regexes.asteriskDashAndColon,o.helper.escapeCharactersCallback))+'"'
return""!==c&&null!==c&&(u+=' title="'+(c=(c=c.replace(/"/g,"&quot;")).replace(o.helper.regexes.asteriskDashAndColon,o.helper.escapeCharactersCallback))+'"'),t.openLinksInNewWindow&&!/^#/.test(i)&&(u+=' rel="noopener noreferrer" target="¨E95Eblank"'),u+">"+n+"</a>"}
return e=(e=(e=(e=(e=r.converter._dispatch("anchors.before",e,t,r)).replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g,n)).replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,n)).replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,n)).replace(/\[([^\[\]]+)]()()()()()/g,n),t.ghMentions&&(e=e.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gim,(function(e,r,n,a,i){if("\\"===n)return r+a
if(!o.helper.isString(t.ghMentionsLink))throw new Error("ghMentionsLink option must be a string")
var s=t.ghMentionsLink.replace(/\{u}/g,i),l=""
return t.openLinksInNewWindow&&(l=' rel="noopener noreferrer" target="¨E95Eblank"'),r+'<a href="'+s+'"'+l+">"+a+"</a>"}))),r.converter._dispatch("anchors.after",e,t,r)}))
var h=/([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,m=/([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,g=/()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,b=/(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gim,_=/<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,w=function(e){"use strict"
return function(t,r,n,a,i,s,l){var c=n=n.replace(o.helper.regexes.asteriskDashAndColon,o.helper.escapeCharactersCallback),u="",p="",d=r||"",f=l||""
return/^www\./i.test(n)&&(n=n.replace(/^www\./i,"http://www.")),e.excludeTrailingPunctuationFromURLs&&s&&(u=s),e.openLinksInNewWindow&&(p=' rel="noopener noreferrer" target="¨E95Eblank"'),d+'<a href="'+n+'"'+p+">"+c+"</a>"+u+f}},v=function(e,t){"use strict"
return function(r,n,a){var i="mailto:"
return n=n||"",a=o.subParser("unescapeSpecialChars")(a,e,t),e.encodeEmails?(i=o.helper.encodeEmailAddress(i+a),a=o.helper.encodeEmailAddress(a)):i+=a,n+'<a href="'+i+'">'+a+"</a>"}}
o.subParser("autoLinks",(function(e,t,r){"use strict"
return e=(e=(e=r.converter._dispatch("autoLinks.before",e,t,r)).replace(g,w(t))).replace(_,v(t,r)),r.converter._dispatch("autoLinks.after",e,t,r)})),o.subParser("simplifiedAutoLinks",(function(e,t,r){"use strict"
return t.simplifiedAutoLink?(e=r.converter._dispatch("simplifiedAutoLinks.before",e,t,r),e=(e=t.excludeTrailingPunctuationFromURLs?e.replace(m,w(t)):e.replace(h,w(t))).replace(b,v(t,r)),e=r.converter._dispatch("simplifiedAutoLinks.after",e,t,r)):e})),o.subParser("blockGamut",(function(e,t,r){"use strict"
return e=r.converter._dispatch("blockGamut.before",e,t,r),e=o.subParser("blockQuotes")(e,t,r),e=o.subParser("headers")(e,t,r),e=o.subParser("horizontalRule")(e,t,r),e=o.subParser("lists")(e,t,r),e=o.subParser("codeBlocks")(e,t,r),e=o.subParser("tables")(e,t,r),e=o.subParser("hashHTMLBlocks")(e,t,r),e=o.subParser("paragraphs")(e,t,r),r.converter._dispatch("blockGamut.after",e,t,r)})),o.subParser("blockQuotes",(function(e,t,r){"use strict"
e=r.converter._dispatch("blockQuotes.before",e,t,r),e+="\n\n"
var n=/(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm
return t.splitAdjacentBlockquotes&&(n=/^ {0,3}>[\s\S]*?(?:\n\n)/gm),e=e.replace(n,(function(e){return e=(e=(e=e.replace(/^[ \t]*>[ \t]?/gm,"")).replace(/¨0/g,"")).replace(/^[ \t]+$/gm,""),e=o.subParser("githubCodeBlocks")(e,t,r),e=(e=(e=o.subParser("blockGamut")(e,t,r)).replace(/(^|\n)/g,"$1  ")).replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,(function(e,t){return t.replace(/^  /gm,"¨0").replace(/¨0/g,"")})),o.subParser("hashBlock")("<blockquote>\n"+e+"\n</blockquote>",t,r)})),r.converter._dispatch("blockQuotes.after",e,t,r)})),o.subParser("codeBlocks",(function(e,t,r){"use strict"
return e=r.converter._dispatch("codeBlocks.before",e,t,r),e=(e=(e+="¨0").replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g,(function(e,n,a){var i=n,s=a,l="\n"
return i=o.subParser("outdent")(i,t,r),i=o.subParser("encodeCode")(i,t,r),i=(i=(i=o.subParser("detab")(i,t,r)).replace(/^\n+/g,"")).replace(/\n+$/g,""),t.omitExtraWLInCodeBlocks&&(l=""),i="<pre><code>"+i+l+"</code></pre>",o.subParser("hashBlock")(i,t,r)+s}))).replace(/¨0/,""),r.converter._dispatch("codeBlocks.after",e,t,r)})),o.subParser("codeSpans",(function(e,t,r){"use strict"
return void 0===(e=r.converter._dispatch("codeSpans.before",e,t,r))&&(e=""),e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,(function(e,n,a,i){var s=i
return s=(s=s.replace(/^([ \t]*)/g,"")).replace(/[ \t]*$/g,""),s=n+"<code>"+(s=o.subParser("encodeCode")(s,t,r))+"</code>",o.subParser("hashHTMLSpans")(s,t,r)})),r.converter._dispatch("codeSpans.after",e,t,r)})),o.subParser("completeHTMLDocument",(function(e,t,r){"use strict"
if(!t.completeHTMLDocument)return e
e=r.converter._dispatch("completeHTMLDocument.before",e,t,r)
var n="html",a="<!DOCTYPE HTML>\n",o="",i='<meta charset="utf-8">\n',s="",l=""
for(var c in void 0!==r.metadata.parsed.doctype&&(a="<!DOCTYPE "+r.metadata.parsed.doctype+">\n","html"!==(n=r.metadata.parsed.doctype.toString().toLowerCase())&&"html5"!==n||(i='<meta charset="utf-8">')),r.metadata.parsed)if(r.metadata.parsed.hasOwnProperty(c))switch(c.toLowerCase()){case"doctype":break
case"title":o="<title>"+r.metadata.parsed.title+"</title>\n"
break
case"charset":i="html"===n||"html5"===n?'<meta charset="'+r.metadata.parsed.charset+'">\n':'<meta name="charset" content="'+r.metadata.parsed.charset+'">\n'
break
case"language":case"lang":s=' lang="'+r.metadata.parsed[c]+'"',l+='<meta name="'+c+'" content="'+r.metadata.parsed[c]+'">\n'
break
default:l+='<meta name="'+c+'" content="'+r.metadata.parsed[c]+'">\n'}return e=a+"<html"+s+">\n<head>\n"+o+i+l+"</head>\n<body>\n"+e.trim()+"\n</body>\n</html>",r.converter._dispatch("completeHTMLDocument.after",e,t,r)})),o.subParser("detab",(function(e,t,r){"use strict"
return e=(e=(e=(e=(e=(e=r.converter._dispatch("detab.before",e,t,r)).replace(/\t(?=\t)/g,"    ")).replace(/\t/g,"¨A¨B")).replace(/¨B(.+?)¨A/g,(function(e,t){for(var r=t,n=4-r.length%4,a=0;a<n;a++)r+=" "
return r}))).replace(/¨A/g,"    ")).replace(/¨B/g,""),r.converter._dispatch("detab.after",e,t,r)})),o.subParser("ellipsis",(function(e,t,r){"use strict"
return e=(e=r.converter._dispatch("ellipsis.before",e,t,r)).replace(/\.\.\./g,"…"),r.converter._dispatch("ellipsis.after",e,t,r)})),o.subParser("emoji",(function(e,t,r){"use strict"
return t.emoji?(e=(e=r.converter._dispatch("emoji.before",e,t,r)).replace(/:([\S]+?):/g,(function(e,t){return o.helper.emojis.hasOwnProperty(t)?o.helper.emojis[t]:e})),r.converter._dispatch("emoji.after",e,t,r)):e})),o.subParser("encodeAmpsAndAngles",(function(e,t,r){"use strict"
return e=(e=(e=(e=(e=r.converter._dispatch("encodeAmpsAndAngles.before",e,t,r)).replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;")).replace(/<(?![a-z\/?$!])/gi,"&lt;")).replace(/</g,"&lt;")).replace(/>/g,"&gt;"),r.converter._dispatch("encodeAmpsAndAngles.after",e,t,r)})),o.subParser("encodeBackslashEscapes",(function(e,t,r){"use strict"
return e=(e=(e=r.converter._dispatch("encodeBackslashEscapes.before",e,t,r)).replace(/\\(\\)/g,o.helper.escapeCharactersCallback)).replace(/\\([`*_{}\[\]()>#+.!~=|-])/g,o.helper.escapeCharactersCallback),r.converter._dispatch("encodeBackslashEscapes.after",e,t,r)})),o.subParser("encodeCode",(function(e,t,r){"use strict"
return e=(e=r.converter._dispatch("encodeCode.before",e,t,r)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/([*_{}\[\]\\=~-])/g,o.helper.escapeCharactersCallback),r.converter._dispatch("encodeCode.after",e,t,r)})),o.subParser("escapeSpecialCharsWithinTagAttributes",(function(e,t,r){"use strict"
return e=(e=(e=r.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before",e,t,r)).replace(/<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi,(function(e){return e.replace(/(.)<\/?code>(?=.)/g,"$1`").replace(/([\\`*_~=|])/g,o.helper.escapeCharactersCallback)}))).replace(/<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi,(function(e){return e.replace(/([\\`*_~=|])/g,o.helper.escapeCharactersCallback)})),r.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after",e,t,r)})),o.subParser("githubCodeBlocks",(function(e,t,r){"use strict"
return t.ghCodeBlocks?(e=r.converter._dispatch("githubCodeBlocks.before",e,t,r),e=(e=(e+="¨0").replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g,(function(e,n,a,i){var s=t.omitExtraWLInCodeBlocks?"":"\n"
return i=o.subParser("encodeCode")(i,t,r),i="<pre><code"+(a?' class="'+a+" language-"+a+'"':"")+">"+(i=(i=(i=o.subParser("detab")(i,t,r)).replace(/^\n+/g,"")).replace(/\n+$/g,""))+s+"</code></pre>",i=o.subParser("hashBlock")(i,t,r),"\n\n¨G"+(r.ghCodeBlocks.push({text:e,codeblock:i})-1)+"G\n\n"}))).replace(/¨0/,""),r.converter._dispatch("githubCodeBlocks.after",e,t,r)):e})),o.subParser("hashBlock",(function(e,t,r){"use strict"
return e=(e=r.converter._dispatch("hashBlock.before",e,t,r)).replace(/(^\n+|\n+$)/g,""),e="\n\n¨K"+(r.gHtmlBlocks.push(e)-1)+"K\n\n",r.converter._dispatch("hashBlock.after",e,t,r)})),o.subParser("hashCodeTags",(function(e,t,r){"use strict"
return e=r.converter._dispatch("hashCodeTags.before",e,t,r),e=o.helper.replaceRecursiveRegExp(e,(function(e,n,a,i){var s=a+o.subParser("encodeCode")(n,t,r)+i
return"¨C"+(r.gHtmlSpans.push(s)-1)+"C"}),"<code\\b[^>]*>","</code>","gim"),r.converter._dispatch("hashCodeTags.after",e,t,r)})),o.subParser("hashElement",(function(e,t,r){"use strict"
return function(e,t){var n=t
return n=(n=(n=n.replace(/\n\n/g,"\n")).replace(/^\n/,"")).replace(/\n+$/g,""),"\n\n¨K"+(r.gHtmlBlocks.push(n)-1)+"K\n\n"}})),o.subParser("hashHTMLBlocks",(function(e,t,r){"use strict"
e=r.converter._dispatch("hashHTMLBlocks.before",e,t,r)
var n=["pre","div","h1","h2","h3","h4","h5","h6","blockquote","table","dl","ol","ul","script","noscript","form","fieldset","iframe","math","style","section","header","footer","nav","article","aside","address","audio","canvas","figure","hgroup","output","video","p"],a=function(e,t,n,a){var o=e
return-1!==n.search(/\bmarkdown\b/)&&(o=n+r.converter.makeHtml(t)+a),"\n\n¨K"+(r.gHtmlBlocks.push(o)-1)+"K\n\n"}
t.backslashEscapesHTMLTags&&(e=e.replace(/\\<(\/?[^>]+?)>/g,(function(e,t){return"&lt;"+t+"&gt;"})))
for(var i=0;i<n.length;++i)for(var s,l=new RegExp("^ {0,3}(<"+n[i]+"\\b[^>]*>)","im"),c="<"+n[i]+"\\b[^>]*>",u="</"+n[i]+">";-1!==(s=o.helper.regexIndexOf(e,l));){var p=o.helper.splitAtIndex(e,s),d=o.helper.replaceRecursiveRegExp(p[1],a,c,u,"im")
if(d===p[1])break
e=p[0].concat(d)}return e=e.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,o.subParser("hashElement")(e,t,r)),e=(e=o.helper.replaceRecursiveRegExp(e,(function(e){return"\n\n¨K"+(r.gHtmlBlocks.push(e)-1)+"K\n\n"}),"^ {0,3}\x3c!--","--\x3e","gm")).replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,o.subParser("hashElement")(e,t,r)),r.converter._dispatch("hashHTMLBlocks.after",e,t,r)})),o.subParser("hashHTMLSpans",(function(e,t,r){"use strict"
function n(e){return"¨C"+(r.gHtmlSpans.push(e)-1)+"C"}return e=(e=(e=(e=(e=r.converter._dispatch("hashHTMLSpans.before",e,t,r)).replace(/<[^>]+?\/>/gi,(function(e){return n(e)}))).replace(/<([^>]+?)>[\s\S]*?<\/\1>/g,(function(e){return n(e)}))).replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g,(function(e){return n(e)}))).replace(/<[^>]+?>/gi,(function(e){return n(e)})),r.converter._dispatch("hashHTMLSpans.after",e,t,r)})),o.subParser("unhashHTMLSpans",(function(e,t,r){"use strict"
e=r.converter._dispatch("unhashHTMLSpans.before",e,t,r)
for(var n=0;n<r.gHtmlSpans.length;++n){for(var a=r.gHtmlSpans[n],o=0;/¨C(\d+)C/.test(a);){var i=RegExp.$1
if(a=a.replace("¨C"+i+"C",r.gHtmlSpans[i]),10===o){console.error("maximum nesting of 10 spans reached!!!")
break}++o}e=e.replace("¨C"+n+"C",a)}return r.converter._dispatch("unhashHTMLSpans.after",e,t,r)})),o.subParser("hashPreCodeTags",(function(e,t,r){"use strict"
return e=r.converter._dispatch("hashPreCodeTags.before",e,t,r),e=o.helper.replaceRecursiveRegExp(e,(function(e,n,a,i){var s=a+o.subParser("encodeCode")(n,t,r)+i
return"\n\n¨G"+(r.ghCodeBlocks.push({text:e,codeblock:s})-1)+"G\n\n"}),"^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>","^ {0,3}</code>\\s*</pre>","gim"),r.converter._dispatch("hashPreCodeTags.after",e,t,r)})),o.subParser("headers",(function(e,t,r){"use strict"
e=r.converter._dispatch("headers.before",e,t,r)
var n=isNaN(parseInt(t.headerLevelStart))?1:parseInt(t.headerLevelStart),a=t.smoothLivePreview?/^(.+)[ \t]*\n={2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n=+[ \t]*\n+/gm,i=t.smoothLivePreview?/^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n-+[ \t]*\n+/gm
e=(e=e.replace(a,(function(e,a){var i=o.subParser("spanGamut")(a,t,r),s=t.noHeaderId?"":' id="'+l(a)+'"',c="<h"+n+s+">"+i+"</h"+n+">"
return o.subParser("hashBlock")(c,t,r)}))).replace(i,(function(e,a){var i=o.subParser("spanGamut")(a,t,r),s=t.noHeaderId?"":' id="'+l(a)+'"',c=n+1,u="<h"+c+s+">"+i+"</h"+c+">"
return o.subParser("hashBlock")(u,t,r)}))
var s=t.requireSpaceBeforeHeadingText?/^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm:/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm
function l(e){var n,a
if(t.customizedHeaderId){var i=e.match(/\{([^{]+?)}\s*$/)
i&&i[1]&&(e=i[1])}return n=e,a=o.helper.isString(t.prefixHeaderId)?t.prefixHeaderId:!0===t.prefixHeaderId?"section-":"",t.rawPrefixHeaderId||(n=a+n),n=t.ghCompatibleHeaderId?n.replace(/ /g,"-").replace(/&amp;/g,"").replace(/¨T/g,"").replace(/¨D/g,"").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g,"").toLowerCase():t.rawHeaderId?n.replace(/ /g,"-").replace(/&amp;/g,"&").replace(/¨T/g,"¨").replace(/¨D/g,"$").replace(/["']/g,"-").toLowerCase():n.replace(/[^\w]/g,"").toLowerCase(),t.rawPrefixHeaderId&&(n=a+n),r.hashLinkCounts[n]?n=n+"-"+r.hashLinkCounts[n]++:r.hashLinkCounts[n]=1,n}return e=e.replace(s,(function(e,a,i){var s=i
t.customizedHeaderId&&(s=i.replace(/\s?\{([^{]+?)}\s*$/,""))
var c=o.subParser("spanGamut")(s,t,r),u=t.noHeaderId?"":' id="'+l(i)+'"',p=n-1+a.length,d="<h"+p+u+">"+c+"</h"+p+">"
return o.subParser("hashBlock")(d,t,r)})),r.converter._dispatch("headers.after",e,t,r)})),o.subParser("horizontalRule",(function(e,t,r){"use strict"
e=r.converter._dispatch("horizontalRule.before",e,t,r)
var n=o.subParser("hashBlock")("<hr />",t,r)
return e=(e=(e=e.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm,n)).replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm,n)).replace(/^ {0,2}( ?_){3,}[ \t]*$/gm,n),r.converter._dispatch("horizontalRule.after",e,t,r)})),o.subParser("images",(function(e,t,r){"use strict"
function n(e,t,n,a,i,s,l,c){var u=r.gUrls,p=r.gTitles,d=r.gDimensions
if(n=n.toLowerCase(),c||(c=""),e.search(/\(<?\s*>? ?(['"].*['"])?\)$/m)>-1)a=""
else if(""===a||null===a){if(""!==n&&null!==n||(n=t.toLowerCase().replace(/ ?\n/g," ")),a="#"+n,o.helper.isUndefined(u[n]))return e
a=u[n],o.helper.isUndefined(p[n])||(c=p[n]),o.helper.isUndefined(d[n])||(i=d[n].width,s=d[n].height)}t=t.replace(/"/g,"&quot;").replace(o.helper.regexes.asteriskDashAndColon,o.helper.escapeCharactersCallback)
var f='<img src="'+(a=a.replace(o.helper.regexes.asteriskDashAndColon,o.helper.escapeCharactersCallback))+'" alt="'+t+'"'
return c&&o.helper.isString(c)&&(f+=' title="'+(c=c.replace(/"/g,"&quot;").replace(o.helper.regexes.asteriskDashAndColon,o.helper.escapeCharactersCallback))+'"'),i&&s&&(f+=' width="'+(i="*"===i?"auto":i)+'"',f+=' height="'+(s="*"===s?"auto":s)+'"'),f+" />"}return e=(e=(e=(e=(e=(e=r.converter._dispatch("images.before",e,t,r)).replace(/!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g,n)).replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,(function(e,t,r,a,o,i,s,l){return n(e,t,r,a=a.replace(/\s/g,""),o,i,0,l)}))).replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,n)).replace(/!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,n)).replace(/!\[([^\[\]]+)]()()()()()/g,n),r.converter._dispatch("images.after",e,t,r)})),o.subParser("italicsAndBold",(function(e,t,r){"use strict"
function n(e,t,r){return t+e+r}return e=r.converter._dispatch("italicsAndBold.before",e,t,r),e=t.literalMidWordUnderscores?(e=(e=e.replace(/\b___(\S[\s\S]*?)___\b/g,(function(e,t){return n(t,"<strong><em>","</em></strong>")}))).replace(/\b__(\S[\s\S]*?)__\b/g,(function(e,t){return n(t,"<strong>","</strong>")}))).replace(/\b_(\S[\s\S]*?)_\b/g,(function(e,t){return n(t,"<em>","</em>")})):(e=(e=e.replace(/___(\S[\s\S]*?)___/g,(function(e,t){return/\S$/.test(t)?n(t,"<strong><em>","</em></strong>"):e}))).replace(/__(\S[\s\S]*?)__/g,(function(e,t){return/\S$/.test(t)?n(t,"<strong>","</strong>"):e}))).replace(/_([^\s_][\s\S]*?)_/g,(function(e,t){return/\S$/.test(t)?n(t,"<em>","</em>"):e})),e=t.literalMidWordAsterisks?(e=(e=e.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g,(function(e,t,r){return n(r,t+"<strong><em>","</em></strong>")}))).replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g,(function(e,t,r){return n(r,t+"<strong>","</strong>")}))).replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g,(function(e,t,r){return n(r,t+"<em>","</em>")})):(e=(e=e.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g,(function(e,t){return/\S$/.test(t)?n(t,"<strong><em>","</em></strong>"):e}))).replace(/\*\*(\S[\s\S]*?)\*\*/g,(function(e,t){return/\S$/.test(t)?n(t,"<strong>","</strong>"):e}))).replace(/\*([^\s*][\s\S]*?)\*/g,(function(e,t){return/\S$/.test(t)?n(t,"<em>","</em>"):e})),r.converter._dispatch("italicsAndBold.after",e,t,r)})),o.subParser("lists",(function(e,t,r){"use strict"
function n(e,n){r.gListLevel++,e=e.replace(/\n{2,}$/,"\n")
var a=/(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,i=/\n[ \t]*\n(?!¨0)/.test(e+="¨0")
return t.disableForced4SpacesIndentedSublists&&(a=/(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm),e=(e=e.replace(a,(function(e,n,a,s,l,c,u){u=u&&""!==u.trim()
var p=o.subParser("outdent")(l,t,r),d=""
return c&&t.tasklists&&(d=' class="task-list-item" style="list-style-type: none;"',p=p.replace(/^[ \t]*\[(x|X| )?]/m,(function(){var e='<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"'
return u&&(e+=" checked"),e+">"}))),p=p.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g,(function(e){return"¨A"+e})),n||p.search(/\n{2,}/)>-1?(p=o.subParser("githubCodeBlocks")(p,t,r),p=o.subParser("blockGamut")(p,t,r)):(p=(p=o.subParser("lists")(p,t,r)).replace(/\n$/,""),p=(p=o.subParser("hashHTMLBlocks")(p,t,r)).replace(/\n\n+/g,"\n\n"),p=i?o.subParser("paragraphs")(p,t,r):o.subParser("spanGamut")(p,t,r)),"<li"+d+">"+(p=p.replace("¨A",""))+"</li>\n"}))).replace(/¨0/g,""),r.gListLevel--,n&&(e=e.replace(/\s+$/,"")),e}function a(e,t){if("ol"===t){var r=e.match(/^ *(\d+)\./)
if(r&&"1"!==r[1])return' start="'+r[1]+'"'}return""}function i(e,r,o){var i=t.disableForced4SpacesIndentedSublists?/^ ?\d+\.[ \t]/gm:/^ {0,3}\d+\.[ \t]/gm,s=t.disableForced4SpacesIndentedSublists?/^ ?[*+-][ \t]/gm:/^ {0,3}[*+-][ \t]/gm,l="ul"===r?i:s,c=""
if(-1!==e.search(l))!function t(u){var p=u.search(l),d=a(e,r);-1!==p?(c+="\n\n<"+r+d+">\n"+n(u.slice(0,p),!!o)+"</"+r+">\n",l="ul"==(r="ul"===r?"ol":"ul")?i:s,t(u.slice(p))):c+="\n\n<"+r+d+">\n"+n(u,!!o)+"</"+r+">\n"}(e)
else{var u=a(e,r)
c="\n\n<"+r+u+">\n"+n(e,!!o)+"</"+r+">\n"}return c}return e=r.converter._dispatch("lists.before",e,t,r),e+="¨0",e=(e=r.gListLevel?e.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,(function(e,t,r){return i(t,r.search(/[*+-]/g)>-1?"ul":"ol",!0)})):e.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,(function(e,t,r,n){return i(r,n.search(/[*+-]/g)>-1?"ul":"ol",!1)}))).replace(/¨0/,""),r.converter._dispatch("lists.after",e,t,r)})),o.subParser("metadata",(function(e,t,r){"use strict"
if(!t.metadata)return e
function n(e){r.metadata.raw=e,(e=(e=e.replace(/&/g,"&amp;").replace(/"/g,"&quot;")).replace(/\n {4}/g," ")).replace(/^([\S ]+): +([\s\S]+?)$/gm,(function(e,t,n){return r.metadata.parsed[t]=n,""}))}return e=(e=(e=(e=r.converter._dispatch("metadata.before",e,t,r)).replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/,(function(e,t,r){return n(r),"¨M"}))).replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/,(function(e,t,a){return t&&(r.metadata.format=t),n(a),"¨M"}))).replace(/¨M/g,""),r.converter._dispatch("metadata.after",e,t,r)})),o.subParser("outdent",(function(e,t,r){"use strict"
return e=(e=(e=r.converter._dispatch("outdent.before",e,t,r)).replace(/^(\t|[ ]{1,4})/gm,"¨0")).replace(/¨0/g,""),r.converter._dispatch("outdent.after",e,t,r)})),o.subParser("paragraphs",(function(e,t,r){"use strict"
for(var n=(e=(e=(e=r.converter._dispatch("paragraphs.before",e,t,r)).replace(/^\n+/g,"")).replace(/\n+$/g,"")).split(/\n{2,}/g),a=[],i=n.length,s=0;s<i;s++){var l=n[s]
l.search(/¨(K|G)(\d+)\1/g)>=0?a.push(l):l.search(/\S/)>=0&&(l=(l=o.subParser("spanGamut")(l,t,r)).replace(/^([ \t]*)/g,"<p>"),l+="</p>",a.push(l))}for(i=a.length,s=0;s<i;s++){for(var c="",u=a[s],p=!1;/¨(K|G)(\d+)\1/.test(u);){var d=RegExp.$1,f=RegExp.$2
c=(c="K"===d?r.gHtmlBlocks[f]:p?o.subParser("encodeCode")(r.ghCodeBlocks[f].text,t,r):r.ghCodeBlocks[f].codeblock).replace(/\$/g,"$$$$"),u=u.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/,c),/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(u)&&(p=!0)}a[s]=u}return e=(e=(e=a.join("\n")).replace(/^\n+/g,"")).replace(/\n+$/g,""),r.converter._dispatch("paragraphs.after",e,t,r)})),o.subParser("runExtension",(function(e,t,r,n){"use strict"
if(e.filter)t=e.filter(t,n.converter,r)
else if(e.regex){var a=e.regex
a instanceof RegExp||(a=new RegExp(a,"g")),t=t.replace(a,e.replace)}return t})),o.subParser("spanGamut",(function(e,t,r){"use strict"
return e=r.converter._dispatch("spanGamut.before",e,t,r),e=o.subParser("codeSpans")(e,t,r),e=o.subParser("escapeSpecialCharsWithinTagAttributes")(e,t,r),e=o.subParser("encodeBackslashEscapes")(e,t,r),e=o.subParser("images")(e,t,r),e=o.subParser("anchors")(e,t,r),e=o.subParser("autoLinks")(e,t,r),e=o.subParser("simplifiedAutoLinks")(e,t,r),e=o.subParser("emoji")(e,t,r),e=o.subParser("underline")(e,t,r),e=o.subParser("italicsAndBold")(e,t,r),e=o.subParser("strikethrough")(e,t,r),e=o.subParser("ellipsis")(e,t,r),e=o.subParser("hashHTMLSpans")(e,t,r),e=o.subParser("encodeAmpsAndAngles")(e,t,r),t.simpleLineBreaks?/\n\n¨K/.test(e)||(e=e.replace(/\n+/g,"<br />\n")):e=e.replace(/  +\n/g,"<br />\n"),r.converter._dispatch("spanGamut.after",e,t,r)})),o.subParser("strikethrough",(function(e,t,r){"use strict"
return t.strikethrough&&(e=(e=r.converter._dispatch("strikethrough.before",e,t,r)).replace(/(?:~){2}([\s\S]+?)(?:~){2}/g,(function(e,n){return function(e){return t.simplifiedAutoLink&&(e=o.subParser("simplifiedAutoLinks")(e,t,r)),"<del>"+e+"</del>"}(n)})),e=r.converter._dispatch("strikethrough.after",e,t,r)),e})),o.subParser("stripLinkDefinitions",(function(e,t,r){"use strict"
var n=function(e,n,a,i,s,l,c){return n=n.toLowerCase(),a.match(/^data:.+?\/.+?;base64,/)?r.gUrls[n]=a.replace(/\s/g,""):r.gUrls[n]=o.subParser("encodeAmpsAndAngles")(a,t,r),l?l+c:(c&&(r.gTitles[n]=c.replace(/"|'/g,"&quot;")),t.parseImgDimensions&&i&&s&&(r.gDimensions[n]={width:i,height:s}),"")}
return(e=(e=(e+="¨0").replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm,n)).replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm,n)).replace(/¨0/,"")})),o.subParser("tables",(function(e,t,r){"use strict"
if(!t.tables)return e
function n(e,n){return"<td"+n+">"+o.subParser("spanGamut")(e,t,r)+"</td>\n"}function a(e){var a,i=e.split("\n")
for(a=0;a<i.length;++a)/^ {0,3}\|/.test(i[a])&&(i[a]=i[a].replace(/^ {0,3}\|/,"")),/\|[ \t]*$/.test(i[a])&&(i[a]=i[a].replace(/\|[ \t]*$/,"")),i[a]=o.subParser("codeSpans")(i[a],t,r)
var s,l,c,u,p=i[0].split("|").map((function(e){return e.trim()})),d=i[1].split("|").map((function(e){return e.trim()})),f=[],h=[],m=[],g=[]
for(i.shift(),i.shift(),a=0;a<i.length;++a)""!==i[a].trim()&&f.push(i[a].split("|").map((function(e){return e.trim()})))
if(p.length<d.length)return e
for(a=0;a<d.length;++a)m.push((s=d[a],/^:[ \t]*--*$/.test(s)?' style="text-align:left;"':/^--*[ \t]*:[ \t]*$/.test(s)?' style="text-align:right;"':/^:[ \t]*--*[ \t]*:$/.test(s)?' style="text-align:center;"':""))
for(a=0;a<p.length;++a)o.helper.isUndefined(m[a])&&(m[a]=""),h.push((l=p[a],c=m[a],u=void 0,u="",l=l.trim(),(t.tablesHeaderId||t.tableHeaderId)&&(u=' id="'+l.replace(/ /g,"_").toLowerCase()+'"'),"<th"+u+c+">"+(l=o.subParser("spanGamut")(l,t,r))+"</th>\n"))
for(a=0;a<f.length;++a){for(var b=[],_=0;_<h.length;++_)o.helper.isUndefined(f[a][_]),b.push(n(f[a][_],m[_]))
g.push(b)}return function(e,t){for(var r="<table>\n<thead>\n<tr>\n",n=e.length,a=0;a<n;++a)r+=e[a]
for(r+="</tr>\n</thead>\n<tbody>\n",a=0;a<t.length;++a){r+="<tr>\n"
for(var o=0;o<n;++o)r+=t[a][o]
r+="</tr>\n"}return r+"</tbody>\n</table>\n"}(h,g)}return e=(e=(e=(e=r.converter._dispatch("tables.before",e,t,r)).replace(/\\(\|)/g,o.helper.escapeCharactersCallback)).replace(/^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm,a)).replace(/^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm,a),r.converter._dispatch("tables.after",e,t,r)})),o.subParser("underline",(function(e,t,r){"use strict"
return t.underline?(e=r.converter._dispatch("underline.before",e,t,r),e=(e=t.literalMidWordUnderscores?(e=e.replace(/\b___(\S[\s\S]*?)___\b/g,(function(e,t){return"<u>"+t+"</u>"}))).replace(/\b__(\S[\s\S]*?)__\b/g,(function(e,t){return"<u>"+t+"</u>"})):(e=e.replace(/___(\S[\s\S]*?)___/g,(function(e,t){return/\S$/.test(t)?"<u>"+t+"</u>":e}))).replace(/__(\S[\s\S]*?)__/g,(function(e,t){return/\S$/.test(t)?"<u>"+t+"</u>":e}))).replace(/(_)/g,o.helper.escapeCharactersCallback),e=r.converter._dispatch("underline.after",e,t,r)):e})),o.subParser("unescapeSpecialChars",(function(e,t,r){"use strict"
return e=(e=r.converter._dispatch("unescapeSpecialChars.before",e,t,r)).replace(/¨E(\d+)E/g,(function(e,t){var r=parseInt(t)
return String.fromCharCode(r)})),r.converter._dispatch("unescapeSpecialChars.after",e,t,r)})),o.subParser("makeMarkdown.blockquote",(function(e,t){"use strict"
var r=""
if(e.hasChildNodes())for(var n=e.childNodes,a=n.length,i=0;i<a;++i){var s=o.subParser("makeMarkdown.node")(n[i],t)
""!==s&&(r+=s)}return"> "+(r=r.trim()).split("\n").join("\n> ")})),o.subParser("makeMarkdown.codeBlock",(function(e,t){"use strict"
var r=e.getAttribute("language"),n=e.getAttribute("precodenum")
return"```"+r+"\n"+t.preList[n]+"\n```"})),o.subParser("makeMarkdown.codeSpan",(function(e){"use strict"
return"`"+e.innerHTML+"`"})),o.subParser("makeMarkdown.emphasis",(function(e,t){"use strict"
var r=""
if(e.hasChildNodes()){r+="*"
for(var n=e.childNodes,a=n.length,i=0;i<a;++i)r+=o.subParser("makeMarkdown.node")(n[i],t)
r+="*"}return r})),o.subParser("makeMarkdown.header",(function(e,t,r){"use strict"
var n=new Array(r+1).join("#"),a=""
if(e.hasChildNodes()){a=n+" "
for(var i=e.childNodes,s=i.length,l=0;l<s;++l)a+=o.subParser("makeMarkdown.node")(i[l],t)}return a})),o.subParser("makeMarkdown.hr",(function(){"use strict"
return"---"})),o.subParser("makeMarkdown.image",(function(e){"use strict"
var t=""
return e.hasAttribute("src")&&(t+="!["+e.getAttribute("alt")+"](",t+="<"+e.getAttribute("src")+">",e.hasAttribute("width")&&e.hasAttribute("height")&&(t+=" ="+e.getAttribute("width")+"x"+e.getAttribute("height")),e.hasAttribute("title")&&(t+=' "'+e.getAttribute("title")+'"'),t+=")"),t})),o.subParser("makeMarkdown.links",(function(e,t){"use strict"
var r=""
if(e.hasChildNodes()&&e.hasAttribute("href")){var n=e.childNodes,a=n.length
r="["
for(var i=0;i<a;++i)r+=o.subParser("makeMarkdown.node")(n[i],t)
r+="](",r+="<"+e.getAttribute("href")+">",e.hasAttribute("title")&&(r+=' "'+e.getAttribute("title")+'"'),r+=")"}return r})),o.subParser("makeMarkdown.list",(function(e,t,r){"use strict"
var n=""
if(!e.hasChildNodes())return""
for(var a=e.childNodes,i=a.length,s=e.getAttribute("start")||1,l=0;l<i;++l)void 0!==a[l].tagName&&"li"===a[l].tagName.toLowerCase()&&(n+=("ol"===r?s.toString()+". ":"- ")+o.subParser("makeMarkdown.listItem")(a[l],t),++s)
return(n+="\n\x3c!-- --\x3e\n").trim()})),o.subParser("makeMarkdown.listItem",(function(e,t){"use strict"
for(var r="",n=e.childNodes,a=n.length,i=0;i<a;++i)r+=o.subParser("makeMarkdown.node")(n[i],t)
return/\n$/.test(r)?r=r.split("\n").join("\n    ").replace(/^ {4}$/gm,"").replace(/\n\n+/g,"\n\n"):r+="\n",r})),o.subParser("makeMarkdown.node",(function(e,t,r){"use strict"
r=r||!1
var n=""
if(3===e.nodeType)return o.subParser("makeMarkdown.txt")(e,t)
if(8===e.nodeType)return"\x3c!--"+e.data+"--\x3e\n\n"
if(1!==e.nodeType)return""
switch(e.tagName.toLowerCase()){case"h1":r||(n=o.subParser("makeMarkdown.header")(e,t,1)+"\n\n")
break
case"h2":r||(n=o.subParser("makeMarkdown.header")(e,t,2)+"\n\n")
break
case"h3":r||(n=o.subParser("makeMarkdown.header")(e,t,3)+"\n\n")
break
case"h4":r||(n=o.subParser("makeMarkdown.header")(e,t,4)+"\n\n")
break
case"h5":r||(n=o.subParser("makeMarkdown.header")(e,t,5)+"\n\n")
break
case"h6":r||(n=o.subParser("makeMarkdown.header")(e,t,6)+"\n\n")
break
case"p":r||(n=o.subParser("makeMarkdown.paragraph")(e,t)+"\n\n")
break
case"blockquote":r||(n=o.subParser("makeMarkdown.blockquote")(e,t)+"\n\n")
break
case"hr":r||(n=o.subParser("makeMarkdown.hr")(e,t)+"\n\n")
break
case"ol":r||(n=o.subParser("makeMarkdown.list")(e,t,"ol")+"\n\n")
break
case"ul":r||(n=o.subParser("makeMarkdown.list")(e,t,"ul")+"\n\n")
break
case"precode":r||(n=o.subParser("makeMarkdown.codeBlock")(e,t)+"\n\n")
break
case"pre":r||(n=o.subParser("makeMarkdown.pre")(e,t)+"\n\n")
break
case"table":r||(n=o.subParser("makeMarkdown.table")(e,t)+"\n\n")
break
case"code":n=o.subParser("makeMarkdown.codeSpan")(e,t)
break
case"em":case"i":n=o.subParser("makeMarkdown.emphasis")(e,t)
break
case"strong":case"b":n=o.subParser("makeMarkdown.strong")(e,t)
break
case"del":n=o.subParser("makeMarkdown.strikethrough")(e,t)
break
case"a":n=o.subParser("makeMarkdown.links")(e,t)
break
case"img":n=o.subParser("makeMarkdown.image")(e,t)
break
default:n=e.outerHTML+"\n\n"}return n})),o.subParser("makeMarkdown.paragraph",(function(e,t){"use strict"
var r=""
if(e.hasChildNodes())for(var n=e.childNodes,a=n.length,i=0;i<a;++i)r+=o.subParser("makeMarkdown.node")(n[i],t)
return r.trim()})),o.subParser("makeMarkdown.pre",(function(e,t){"use strict"
var r=e.getAttribute("prenum")
return"<pre>"+t.preList[r]+"</pre>"})),o.subParser("makeMarkdown.strikethrough",(function(e,t){"use strict"
var r=""
if(e.hasChildNodes()){r+="~~"
for(var n=e.childNodes,a=n.length,i=0;i<a;++i)r+=o.subParser("makeMarkdown.node")(n[i],t)
r+="~~"}return r})),o.subParser("makeMarkdown.strong",(function(e,t){"use strict"
var r=""
if(e.hasChildNodes()){r+="**"
for(var n=e.childNodes,a=n.length,i=0;i<a;++i)r+=o.subParser("makeMarkdown.node")(n[i],t)
r+="**"}return r})),o.subParser("makeMarkdown.table",(function(e,t){"use strict"
var r,n,a="",i=[[],[]],s=e.querySelectorAll("thead>tr>th"),l=e.querySelectorAll("tbody>tr")
for(r=0;r<s.length;++r){var c=o.subParser("makeMarkdown.tableCell")(s[r],t),u="---"
if(s[r].hasAttribute("style"))switch(s[r].getAttribute("style").toLowerCase().replace(/\s/g,"")){case"text-align:left;":u=":---"
break
case"text-align:right;":u="---:"
break
case"text-align:center;":u=":---:"}i[0][r]=c.trim(),i[1][r]=u}for(r=0;r<l.length;++r){var p=i.push([])-1,d=l[r].getElementsByTagName("td")
for(n=0;n<s.length;++n){var f=" "
void 0!==d[n]&&(f=o.subParser("makeMarkdown.tableCell")(d[n],t)),i[p].push(f)}}var h=3
for(r=0;r<i.length;++r)for(n=0;n<i[r].length;++n){var m=i[r][n].length
m>h&&(h=m)}for(r=0;r<i.length;++r){for(n=0;n<i[r].length;++n)1===r?":"===i[r][n].slice(-1)?i[r][n]=o.helper.padEnd(i[r][n].slice(-1),h-1,"-")+":":i[r][n]=o.helper.padEnd(i[r][n],h,"-"):i[r][n]=o.helper.padEnd(i[r][n],h)
a+="| "+i[r].join(" | ")+" |\n"}return a.trim()})),o.subParser("makeMarkdown.tableCell",(function(e,t){"use strict"
var r=""
if(!e.hasChildNodes())return""
for(var n=e.childNodes,a=n.length,i=0;i<a;++i)r+=o.subParser("makeMarkdown.node")(n[i],t,!0)
return r.trim()})),o.subParser("makeMarkdown.txt",(function(e){"use strict"
var t=e.nodeValue
return t=(t=t.replace(/ +/g," ")).replace(/¨NBSP;/g," "),(t=(t=(t=(t=(t=(t=(t=(t=o.helper.unescapeHTMLEntities(t)).replace(/([*_~|`])/g,"\\$1")).replace(/^(\s*)>/g,"\\$1>")).replace(/^#/gm,"\\#")).replace(/^(\s*)([-=]{3,})(\s*)$/,"$1\\$2$3")).replace(/^( {0,3}\d+)\./gm,"$1\\.")).replace(/^( {0,3})([+-])/gm,"$1\\$2")).replace(/]([\s]*)\(/g,"\\]$1\\(")).replace(/^ {0,3}\[([\S \t]*?)]:/gm,"\\[$1]:")})),void 0===(n=function(){"use strict"
return o}.call(t,r,t,e))||(e.exports=n)}).call(this)},627:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{afterMain:()=>k,afterRead:()=>w,afterWrite:()=>P,applyStyles:()=>z,arrow:()=>Q,auto:()=>s,basePlacements:()=>l,beforeMain:()=>v,beforeRead:()=>b,beforeWrite:()=>x,bottom:()=>a,clippingParents:()=>p,computeStyles:()=>re,createPopper:()=>Ce,createPopperBase:()=>Ae,createPopperLite:()=>ze,detectOverflow:()=>be,end:()=>u,eventListeners:()=>ae,flip:()=>_e,hide:()=>ye,left:()=>i,main:()=>y,modifierPhases:()=>E,offset:()=>ke,placements:()=>g,popper:()=>f,popperGenerator:()=>Te,popperOffsets:()=>xe,preventOverflow:()=>je,read:()=>_,reference:()=>h,right:()=>o,start:()=>c,top:()=>n,variationPlacements:()=>m,viewport:()=>d,write:()=>j})
var n="top",a="bottom",o="right",i="left",s="auto",l=[n,a,o,i],c="start",u="end",p="clippingParents",d="viewport",f="popper",h="reference",m=l.reduce((function(e,t){return e.concat([t+"-"+c,t+"-"+u])}),[]),g=[].concat(l,[s]).reduce((function(e,t){return e.concat([t,t+"-"+c,t+"-"+u])}),[]),b="beforeRead",_="read",w="afterRead",v="beforeMain",y="main",k="afterMain",x="beforeWrite",j="write",P="afterWrite",E=[b,_,w,v,y,k,x,j,P]
function S(e){return e?(e.nodeName||"").toLowerCase():null}function O(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function T(e){return e instanceof O(e).Element||e instanceof Element}function A(e){return e instanceof O(e).HTMLElement||e instanceof HTMLElement}function C(e){return"undefined"!=typeof ShadowRoot&&(e instanceof O(e).ShadowRoot||e instanceof ShadowRoot)}const z={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var r=t.styles[e]||{},n=t.attributes[e]||{},a=t.elements[e]
A(a)&&S(a)&&(Object.assign(a.style,r),Object.keys(n).forEach((function(e){var t=n[e]
!1===t?a.removeAttribute(e):a.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach((function(e){var n=t.elements[e],a=t.attributes[e]||{},o=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:r[e]).reduce((function(e,t){return e[t]="",e}),{})
A(n)&&S(n)&&(Object.assign(n.style,o),Object.keys(a).forEach((function(e){n.removeAttribute(e)})))}))}},requires:["computeStyles"]}
function M(e){return e.split("-")[0]}var L=Math.max,R=Math.min,I=Math.round
function D(){var e=navigator.userAgentData
return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function B(){return!/^((?!chrome|android).)*safari/i.test(D())}function N(e,t,r){void 0===t&&(t=!1),void 0===r&&(r=!1)
var n=e.getBoundingClientRect(),a=1,o=1
t&&A(e)&&(a=e.offsetWidth>0&&I(n.width)/e.offsetWidth||1,o=e.offsetHeight>0&&I(n.height)/e.offsetHeight||1)
var i=(T(e)?O(e):window).visualViewport,s=!B()&&r,l=(n.left+(s&&i?i.offsetLeft:0))/a,c=(n.top+(s&&i?i.offsetTop:0))/o,u=n.width/a,p=n.height/o
return{width:u,height:p,top:c,right:l+u,bottom:c+p,left:l,x:l,y:c}}function H(e){var t=N(e),r=e.offsetWidth,n=e.offsetHeight
return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function F(e,t){var r=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(r&&C(r)){var n=t
do{if(n&&e.isSameNode(n))return!0
n=n.parentNode||n.host}while(n)}return!1}function $(e){return O(e).getComputedStyle(e)}function q(e){return["table","td","th"].indexOf(S(e))>=0}function U(e){return((T(e)?e.ownerDocument:e.document)||window.document).documentElement}function G(e){return"html"===S(e)?e:e.assignedSlot||e.parentNode||(C(e)?e.host:null)||U(e)}function V(e){return A(e)&&"fixed"!==$(e).position?e.offsetParent:null}function W(e){for(var t=O(e),r=V(e);r&&q(r)&&"static"===$(r).position;)r=V(r)
return r&&("html"===S(r)||"body"===S(r)&&"static"===$(r).position)?t:r||function(e){var t=/firefox/i.test(D())
if(/Trident/i.test(D())&&A(e)&&"fixed"===$(e).position)return null
var r=G(e)
for(C(r)&&(r=r.host);A(r)&&["html","body"].indexOf(S(r))<0;){var n=$(r)
if("none"!==n.transform||"none"!==n.perspective||"paint"===n.contain||-1!==["transform","perspective"].indexOf(n.willChange)||t&&"filter"===n.willChange||t&&n.filter&&"none"!==n.filter)return r
r=r.parentNode}return null}(e)||t}function K(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Z(e,t,r){return L(e,R(t,r))}function Y(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function X(e,t){return t.reduce((function(t,r){return t[r]=e,t}),{})}const Q={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,r=e.state,s=e.name,c=e.options,u=r.elements.arrow,p=r.modifiersData.popperOffsets,d=M(r.placement),f=K(d),h=[i,o].indexOf(d)>=0?"height":"width"
if(u&&p){var m=function(e,t){return Y("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:X(e,l))}(c.padding,r),g=H(u),b="y"===f?n:i,_="y"===f?a:o,w=r.rects.reference[h]+r.rects.reference[f]-p[f]-r.rects.popper[h],v=p[f]-r.rects.reference[f],y=W(u),k=y?"y"===f?y.clientHeight||0:y.clientWidth||0:0,x=w/2-v/2,j=m[b],P=k-g[h]-m[_],E=k/2-g[h]/2+x,S=Z(j,E,P),O=f
r.modifiersData[s]=((t={})[O]=S,t.centerOffset=S-E,t)}},effect:function(e){var t=e.state,r=e.options.element,n=void 0===r?"[data-popper-arrow]":r
null!=n&&("string"!=typeof n||(n=t.elements.popper.querySelector(n)))&&F(t.elements.popper,n)&&(t.elements.arrow=n)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]}
function J(e){return e.split("-")[1]}var ee={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function te(e){var t,r=e.popper,s=e.popperRect,l=e.placement,c=e.variation,p=e.offsets,d=e.position,f=e.gpuAcceleration,h=e.adaptive,m=e.roundOffsets,g=e.isFixed,b=p.x,_=void 0===b?0:b,w=p.y,v=void 0===w?0:w,y="function"==typeof m?m({x:_,y:v}):{x:_,y:v}
_=y.x,v=y.y
var k=p.hasOwnProperty("x"),x=p.hasOwnProperty("y"),j=i,P=n,E=window
if(h){var S=W(r),T="clientHeight",A="clientWidth"
S===O(r)&&"static"!==$(S=U(r)).position&&"absolute"===d&&(T="scrollHeight",A="scrollWidth"),(l===n||(l===i||l===o)&&c===u)&&(P=a,v-=(g&&S===E&&E.visualViewport?E.visualViewport.height:S[T])-s.height,v*=f?1:-1),l!==i&&(l!==n&&l!==a||c!==u)||(j=o,_-=(g&&S===E&&E.visualViewport?E.visualViewport.width:S[A])-s.width,_*=f?1:-1)}var C,z=Object.assign({position:d},h&&ee),M=!0===m?function(e,t){var r=e.x,n=e.y,a=t.devicePixelRatio||1
return{x:I(r*a)/a||0,y:I(n*a)/a||0}}({x:_,y:v},O(r)):{x:_,y:v}
return _=M.x,v=M.y,f?Object.assign({},z,((C={})[P]=x?"0":"",C[j]=k?"0":"",C.transform=(E.devicePixelRatio||1)<=1?"translate("+_+"px, "+v+"px)":"translate3d("+_+"px, "+v+"px, 0)",C)):Object.assign({},z,((t={})[P]=x?v+"px":"",t[j]=k?_+"px":"",t.transform="",t))}const re={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,r=e.options,n=r.gpuAcceleration,a=void 0===n||n,o=r.adaptive,i=void 0===o||o,s=r.roundOffsets,l=void 0===s||s,c={placement:M(t.placement),variation:J(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:a,isFixed:"fixed"===t.options.strategy}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,te(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:l})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,te(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}}
var ne={passive:!0}
const ae={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,r=e.instance,n=e.options,a=n.scroll,o=void 0===a||a,i=n.resize,s=void 0===i||i,l=O(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return o&&c.forEach((function(e){e.addEventListener("scroll",r.update,ne)})),s&&l.addEventListener("resize",r.update,ne),function(){o&&c.forEach((function(e){e.removeEventListener("scroll",r.update,ne)})),s&&l.removeEventListener("resize",r.update,ne)}},data:{}}
var oe={left:"right",right:"left",bottom:"top",top:"bottom"}
function ie(e){return e.replace(/left|right|bottom|top/g,(function(e){return oe[e]}))}var se={start:"end",end:"start"}
function le(e){return e.replace(/start|end/g,(function(e){return se[e]}))}function ce(e){var t=O(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function ue(e){return N(U(e)).left+ce(e).scrollLeft}function pe(e){var t=$(e),r=t.overflow,n=t.overflowX,a=t.overflowY
return/auto|scroll|overlay|hidden/.test(r+a+n)}function de(e){return["html","body","#document"].indexOf(S(e))>=0?e.ownerDocument.body:A(e)&&pe(e)?e:de(G(e))}function fe(e,t){var r
void 0===t&&(t=[])
var n=de(e),a=n===(null==(r=e.ownerDocument)?void 0:r.body),o=O(n),i=a?[o].concat(o.visualViewport||[],pe(n)?n:[]):n,s=t.concat(i)
return a?s:s.concat(fe(G(i)))}function he(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function me(e,t,r){return t===d?he(function(e,t){var r=O(e),n=U(e),a=r.visualViewport,o=n.clientWidth,i=n.clientHeight,s=0,l=0
if(a){o=a.width,i=a.height
var c=B();(c||!c&&"fixed"===t)&&(s=a.offsetLeft,l=a.offsetTop)}return{width:o,height:i,x:s+ue(e),y:l}}(e,r)):T(t)?function(e,t){var r=N(e,!1,"fixed"===t)
return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}(t,r):he(function(e){var t,r=U(e),n=ce(e),a=null==(t=e.ownerDocument)?void 0:t.body,o=L(r.scrollWidth,r.clientWidth,a?a.scrollWidth:0,a?a.clientWidth:0),i=L(r.scrollHeight,r.clientHeight,a?a.scrollHeight:0,a?a.clientHeight:0),s=-n.scrollLeft+ue(e),l=-n.scrollTop
return"rtl"===$(a||r).direction&&(s+=L(r.clientWidth,a?a.clientWidth:0)-o),{width:o,height:i,x:s,y:l}}(U(e)))}function ge(e){var t,r=e.reference,s=e.element,l=e.placement,p=l?M(l):null,d=l?J(l):null,f=r.x+r.width/2-s.width/2,h=r.y+r.height/2-s.height/2
switch(p){case n:t={x:f,y:r.y-s.height}
break
case a:t={x:f,y:r.y+r.height}
break
case o:t={x:r.x+r.width,y:h}
break
case i:t={x:r.x-s.width,y:h}
break
default:t={x:r.x,y:r.y}}var m=p?K(p):null
if(null!=m){var g="y"===m?"height":"width"
switch(d){case c:t[m]=t[m]-(r[g]/2-s[g]/2)
break
case u:t[m]=t[m]+(r[g]/2-s[g]/2)}}return t}function be(e,t){void 0===t&&(t={})
var r=t,i=r.placement,s=void 0===i?e.placement:i,c=r.strategy,u=void 0===c?e.strategy:c,m=r.boundary,g=void 0===m?p:m,b=r.rootBoundary,_=void 0===b?d:b,w=r.elementContext,v=void 0===w?f:w,y=r.altBoundary,k=void 0!==y&&y,x=r.padding,j=void 0===x?0:x,P=Y("number"!=typeof j?j:X(j,l)),E=v===f?h:f,O=e.rects.popper,C=e.elements[k?E:v],z=function(e,t,r,n){var a="clippingParents"===t?function(e){var t=fe(G(e)),r=["absolute","fixed"].indexOf($(e).position)>=0&&A(e)?W(e):e
return T(r)?t.filter((function(e){return T(e)&&F(e,r)&&"body"!==S(e)})):[]}(e):[].concat(t),o=[].concat(a,[r]),i=o[0],s=o.reduce((function(t,r){var a=me(e,r,n)
return t.top=L(a.top,t.top),t.right=R(a.right,t.right),t.bottom=R(a.bottom,t.bottom),t.left=L(a.left,t.left),t}),me(e,i,n))
return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}(T(C)?C:C.contextElement||U(e.elements.popper),g,_,u),M=N(e.elements.reference),I=ge({reference:M,element:O,strategy:"absolute",placement:s}),D=he(Object.assign({},O,I)),B=v===f?D:M,H={top:z.top-B.top+P.top,bottom:B.bottom-z.bottom+P.bottom,left:z.left-B.left+P.left,right:B.right-z.right+P.right},q=e.modifiersData.offset
if(v===f&&q){var V=q[s]
Object.keys(H).forEach((function(e){var t=[o,a].indexOf(e)>=0?1:-1,r=[n,a].indexOf(e)>=0?"y":"x"
H[e]+=V[r]*t}))}return H}const _e={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,r=e.options,u=e.name
if(!t.modifiersData[u]._skip){for(var p=r.mainAxis,d=void 0===p||p,f=r.altAxis,h=void 0===f||f,b=r.fallbackPlacements,_=r.padding,w=r.boundary,v=r.rootBoundary,y=r.altBoundary,k=r.flipVariations,x=void 0===k||k,j=r.allowedAutoPlacements,P=t.options.placement,E=M(P),S=b||(E!==P&&x?function(e){if(M(e)===s)return[]
var t=ie(e)
return[le(e),t,le(t)]}(P):[ie(P)]),O=[P].concat(S).reduce((function(e,r){return e.concat(M(r)===s?function(e,t){void 0===t&&(t={})
var r=t,n=r.placement,a=r.boundary,o=r.rootBoundary,i=r.padding,s=r.flipVariations,c=r.allowedAutoPlacements,u=void 0===c?g:c,p=J(n),d=p?s?m:m.filter((function(e){return J(e)===p})):l,f=d.filter((function(e){return u.indexOf(e)>=0}))
0===f.length&&(f=d)
var h=f.reduce((function(t,r){return t[r]=be(e,{placement:r,boundary:a,rootBoundary:o,padding:i})[M(r)],t}),{})
return Object.keys(h).sort((function(e,t){return h[e]-h[t]}))}(t,{placement:r,boundary:w,rootBoundary:v,padding:_,flipVariations:x,allowedAutoPlacements:j}):r)}),[]),T=t.rects.reference,A=t.rects.popper,C=new Map,z=!0,L=O[0],R=0;R<O.length;R++){var I=O[R],D=M(I),B=J(I)===c,N=[n,a].indexOf(D)>=0,H=N?"width":"height",F=be(t,{placement:I,boundary:w,rootBoundary:v,altBoundary:y,padding:_}),$=N?B?o:i:B?a:n
T[H]>A[H]&&($=ie($))
var q=ie($),U=[]
if(d&&U.push(F[D]<=0),h&&U.push(F[$]<=0,F[q]<=0),U.every((function(e){return e}))){L=I,z=!1
break}C.set(I,U)}if(z)for(var G=function(e){var t=O.find((function(t){var r=C.get(t)
if(r)return r.slice(0,e).every((function(e){return e}))}))
if(t)return L=t,"break"},V=x?3:1;V>0&&"break"!==G(V);V--);t.placement!==L&&(t.modifiersData[u]._skip=!0,t.placement=L,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function we(e,t,r){return void 0===r&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function ve(e){return[n,o,a,i].some((function(t){return e[t]>=0}))}const ye={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,r=e.name,n=t.rects.reference,a=t.rects.popper,o=t.modifiersData.preventOverflow,i=be(t,{elementContext:"reference"}),s=be(t,{altBoundary:!0}),l=we(i,n),c=we(s,a,o),u=ve(l),p=ve(c)
t.modifiersData[r]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:u,hasPopperEscaped:p},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":p})}},ke={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,r=e.options,a=e.name,s=r.offset,l=void 0===s?[0,0]:s,c=g.reduce((function(e,r){return e[r]=function(e,t,r){var a=M(e),s=[i,n].indexOf(a)>=0?-1:1,l="function"==typeof r?r(Object.assign({},t,{placement:e})):r,c=l[0],u=l[1]
return c=c||0,u=(u||0)*s,[i,o].indexOf(a)>=0?{x:u,y:c}:{x:c,y:u}}(r,t.rects,l),e}),{}),u=c[t.placement],p=u.x,d=u.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=d),t.modifiersData[a]=c}},xe={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,r=e.name
t.modifiersData[r]=ge({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},je={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,r=e.options,s=e.name,l=r.mainAxis,u=void 0===l||l,p=r.altAxis,d=void 0!==p&&p,f=r.boundary,h=r.rootBoundary,m=r.altBoundary,g=r.padding,b=r.tether,_=void 0===b||b,w=r.tetherOffset,v=void 0===w?0:w,y=be(t,{boundary:f,rootBoundary:h,padding:g,altBoundary:m}),k=M(t.placement),x=J(t.placement),j=!x,P=K(k),E="x"===P?"y":"x",S=t.modifiersData.popperOffsets,O=t.rects.reference,T=t.rects.popper,A="function"==typeof v?v(Object.assign({},t.rects,{placement:t.placement})):v,C="number"==typeof A?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),z=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,I={x:0,y:0}
if(S){if(u){var D,B="y"===P?n:i,N="y"===P?a:o,F="y"===P?"height":"width",$=S[P],q=$+y[B],U=$-y[N],G=_?-T[F]/2:0,V=x===c?O[F]:T[F],Y=x===c?-T[F]:-O[F],X=t.elements.arrow,Q=_&&X?H(X):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[B],re=ee[N],ne=Z(0,O[F],Q[F]),ae=j?O[F]/2-G-ne-te-C.mainAxis:V-ne-te-C.mainAxis,oe=j?-O[F]/2+G+ne+re+C.mainAxis:Y+ne+re+C.mainAxis,ie=t.elements.arrow&&W(t.elements.arrow),se=ie?"y"===P?ie.clientTop||0:ie.clientLeft||0:0,le=null!=(D=null==z?void 0:z[P])?D:0,ce=$+oe-le,ue=Z(_?R(q,$+ae-le-se):q,$,_?L(U,ce):U)
S[P]=ue,I[P]=ue-$}if(d){var pe,de="x"===P?n:i,fe="x"===P?a:o,he=S[E],me="y"===E?"height":"width",ge=he+y[de],_e=he-y[fe],we=-1!==[n,i].indexOf(k),ve=null!=(pe=null==z?void 0:z[E])?pe:0,ye=we?ge:he-O[me]-T[me]-ve+C.altAxis,ke=we?he+O[me]+T[me]-ve-C.altAxis:_e,xe=_&&we?function(e,t,r){var n=Z(e,t,r)
return n>r?r:n}(ye,he,ke):Z(_?ye:ge,he,_?ke:_e)
S[E]=xe,I[E]=xe-he}t.modifiersData[s]=I}},requiresIfExists:["offset"]}
function Pe(e,t,r){void 0===r&&(r=!1)
var n,a,o=A(t),i=A(t)&&function(e){var t=e.getBoundingClientRect(),r=I(t.width)/e.offsetWidth||1,n=I(t.height)/e.offsetHeight||1
return 1!==r||1!==n}(t),s=U(t),l=N(e,i,r),c={scrollLeft:0,scrollTop:0},u={x:0,y:0}
return(o||!o&&!r)&&(("body"!==S(t)||pe(s))&&(c=(n=t)!==O(n)&&A(n)?{scrollLeft:(a=n).scrollLeft,scrollTop:a.scrollTop}:ce(n)),A(t)?((u=N(t,!0)).x+=t.clientLeft,u.y+=t.clientTop):s&&(u.x=ue(s))),{x:l.left+c.scrollLeft-u.x,y:l.top+c.scrollTop-u.y,width:l.width,height:l.height}}function Ee(e){var t=new Map,r=new Set,n=[]
function a(e){r.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!r.has(e)){var n=t.get(e)
n&&a(n)}})),n.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){r.has(e.name)||a(e)})),n}var Se={placement:"bottom",modifiers:[],strategy:"absolute"}
function Oe(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Te(e){void 0===e&&(e={})
var t=e,r=t.defaultModifiers,n=void 0===r?[]:r,a=t.defaultOptions,o=void 0===a?Se:a
return function(e,t,r){void 0===r&&(r=o)
var a,i,s={placement:"bottom",orderedModifiers:[],options:Object.assign({},Se,o),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},l=[],c=!1,u={state:s,setOptions:function(r){var a="function"==typeof r?r(s.options):r
p(),s.options=Object.assign({},o,s.options,a),s.scrollParents={reference:T(e)?fe(e):e.contextElement?fe(e.contextElement):[],popper:fe(t)}
var i,c,d=function(e){var t=Ee(e)
return E.reduce((function(e,r){return e.concat(t.filter((function(e){return e.phase===r})))}),[])}((i=[].concat(n,s.options.modifiers),c=i.reduce((function(e,t){var r=e[t.name]
return e[t.name]=r?Object.assign({},r,t,{options:Object.assign({},r.options,t.options),data:Object.assign({},r.data,t.data)}):t,e}),{}),Object.keys(c).map((function(e){return c[e]}))))
return s.orderedModifiers=d.filter((function(e){return e.enabled})),s.orderedModifiers.forEach((function(e){var t=e.name,r=e.options,n=void 0===r?{}:r,a=e.effect
if("function"==typeof a){var o=a({state:s,name:t,instance:u,options:n})
l.push(o||function(){})}})),u.update()},forceUpdate:function(){if(!c){var e=s.elements,t=e.reference,r=e.popper
if(Oe(t,r)){s.rects={reference:Pe(t,W(r),"fixed"===s.options.strategy),popper:H(r)},s.reset=!1,s.placement=s.options.placement,s.orderedModifiers.forEach((function(e){return s.modifiersData[e.name]=Object.assign({},e.data)}))
for(var n=0;n<s.orderedModifiers.length;n++)if(!0!==s.reset){var a=s.orderedModifiers[n],o=a.fn,i=a.options,l=void 0===i?{}:i,p=a.name
"function"==typeof o&&(s=o({state:s,options:l,name:p,instance:u})||s)}else s.reset=!1,n=-1}}},update:(a=function(){return new Promise((function(e){u.forceUpdate(),e(s)}))},function(){return i||(i=new Promise((function(e){Promise.resolve().then((function(){i=void 0,e(a())}))}))),i}),destroy:function(){p(),c=!0}}
if(!Oe(e,t))return u
function p(){l.forEach((function(e){return e()})),l=[]}return u.setOptions(r).then((function(e){!c&&r.onFirstUpdate&&r.onFirstUpdate(e)})),u}}var Ae=Te(),Ce=Te({defaultModifiers:[ae,xe,re,z,ke,_e,je,Q,ye]}),ze=Te({defaultModifiers:[ae,xe,re,z]})},698:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>L})
var n=r(927),a=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],o=a.join(","),i="undefined"==typeof Element,s=i?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,l=!i&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},c=function(e,t,r){var n=Array.prototype.slice.apply(e.querySelectorAll(o))
return t&&s.call(e,o)&&n.unshift(e),n.filter(r)},u=function e(t,r,n){for(var a=[],i=Array.from(t);i.length;){var l=i.shift()
if("SLOT"===l.tagName){var c=l.assignedElements(),u=e(c.length?c:l.children,!0,n)
n.flatten?a.push.apply(a,u):a.push({scope:l,candidates:u})}else{s.call(l,o)&&n.filter(l)&&(r||!t.includes(l))&&a.push(l)
var p=l.shadowRoot||"function"==typeof n.getShadowRoot&&n.getShadowRoot(l),d=!n.shadowRootFilter||n.shadowRootFilter(l)
if(p&&d){var f=e(!0===p?l.children:p.children,!0,n)
n.flatten?a.push.apply(a,f):a.push({scope:l,candidates:f})}else i.unshift.apply(i,l.children)}}return a},p=function(e,t){return e.tabIndex<0&&(t||/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||e.isContentEditable)&&isNaN(parseInt(e.getAttribute("tabindex"),10))?0:e.tabIndex},d=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},f=function(e){return"INPUT"===e.tagName},h=function(e){var t=e.getBoundingClientRect(),r=t.width,n=t.height
return 0===r&&0===n},m=function(e,t){return!(t.disabled||function(e){return f(e)&&"hidden"===e.type}(t)||function(e,t){var r=t.displayCheck,n=t.getShadowRoot
if("hidden"===getComputedStyle(e).visibility)return!0
var a=s.call(e,"details>summary:first-of-type")?e.parentElement:e
if(s.call(a,"details:not([open]) *"))return!0
var o=l(e).host,i=(null==o?void 0:o.ownerDocument.contains(o))||e.ownerDocument.contains(e)
if(r&&"full"!==r){if("non-zero-area"===r)return h(e)}else{if("function"==typeof n){for(var c=e;e;){var u=e.parentElement,p=l(e)
if(u&&!u.shadowRoot&&!0===n(u))return h(e)
e=e.assignedSlot?e.assignedSlot:u||p===e.ownerDocument?u:p.host}e=c}if(i)return!e.getClientRects().length}return!1}(t,e)||function(e){return"DETAILS"===e.tagName&&Array.prototype.slice.apply(e.children).some((function(e){return"SUMMARY"===e.tagName}))}(t)||function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if("FIELDSET"===t.tagName&&t.disabled){for(var r=0;r<t.children.length;r++){var n=t.children.item(r)
if("LEGEND"===n.tagName)return!!s.call(t,"fieldset[disabled] *")||!n.contains(e)}return!0}t=t.parentElement}return!1}(t))},g=function(e,t){return!(function(e){return function(e){return f(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0
var t,r=e.form||l(e),n=function(e){return r.querySelectorAll('input[type="radio"][name="'+e+'"]')}
if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)t=n(window.CSS.escape(e.name))
else try{t=n(e.name)}catch(e){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",e.message),!1}var a=function(e,t){for(var r=0;r<e.length;r++)if(e[r].checked&&e[r].form===t)return e[r]}(t,e.form)
return!a||a===e}(e)}(t)||p(t)<0||!m(e,t))},b=function(e){var t=parseInt(e.getAttribute("tabindex"),10)
return!!(isNaN(t)||t>=0)},_=function e(t){var r=[],n=[]
return t.forEach((function(t,a){var o=!!t.scope,i=o?t.scope:t,s=p(i,o),l=o?e(t.candidates):i
0===s?o?r.push.apply(r,l):r.push(i):n.push({documentOrder:a,tabIndex:s,item:t,isScope:o,content:l})})),n.sort(d).reduce((function(e,t){return t.isScope?e.push.apply(e,t.content):e.push(t.content),e}),[]).concat(r)},w=function(e,t){var r
return r=(t=t||{}).getShadowRoot?u([e],t.includeContainer,{filter:g.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot,shadowRootFilter:b}):c(e,t.includeContainer,g.bind(null,t)),_(r)},v=function(e,t){if(t=t||{},!e)throw new Error("No node provided")
return!1!==s.call(e,o)&&g(t,e)},y=a.concat("iframe").join(","),k=function(e,t){if(t=t||{},!e)throw new Error("No node provided")
return!1!==s.call(e,y)&&m(t,e)}
function x(e,t){var r=Object.keys(e)
if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e)
t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{}
t%2?x(Object(r),!0).forEach((function(t){P(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var E,S=(E=[],{activateTrap:function(e){if(E.length>0){var t=E[E.length-1]
t!==e&&t.pause()}var r=E.indexOf(e);-1===r||E.splice(r,1),E.push(e)},deactivateTrap:function(e){var t=E.indexOf(e);-1!==t&&E.splice(t,1),E.length>0&&E[E.length-1].unpause()}}),O=function(e){return setTimeout(e,0)},T=function(e,t){var r=-1
return e.every((function(e,n){return!t(e)||(r=n,!1)})),r},A=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n]
return"function"==typeof e?e.apply(void 0,r):e},C=function(e){return e.target.shadowRoot&&"function"==typeof e.composedPath?e.composedPath()[0]:e.target},z=function(e,t){var r,n=(null==t?void 0:t.document)||document,a=j({returnFocusOnDeactivate:!0,escapeDeactivates:!0,delayInitialFocus:!0},t),o={containers:[],containerGroups:[],tabbableGroups:[],nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1,delayInitialFocusTimer:void 0},i=function(e,t,r){return e&&void 0!==e[t]?e[t]:a[r||t]},s=function(e){return o.containerGroups.findIndex((function(t){var r=t.container,n=t.tabbableNodes
return r.contains(e)||n.find((function(t){return t===e}))}))},l=function(e){var t=a[e]
if("function"==typeof t){for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i]
t=t.apply(void 0,o)}if(!0===t&&(t=void 0),!t){if(void 0===t||!1===t)return t
throw new Error("`".concat(e,"` was specified but was not a node, or did not return a node"))}var s=t
if("string"==typeof t&&!(s=n.querySelector(t)))throw new Error("`".concat(e,"` as selector refers to no known node"))
return s},p=function(){var e=l("initialFocus")
if(!1===e)return!1
if(void 0===e)if(s(n.activeElement)>=0)e=n.activeElement
else{var t=o.tabbableGroups[0]
e=t&&t.firstTabbableNode||l("fallbackFocus")}if(!e)throw new Error("Your focus-trap needs to have at least one focusable element")
return e},d=function(){if(o.containerGroups=o.containers.map((function(e){var t,r,n=w(e,a.tabbableOptions),o=(t=e,(r=(r=a.tabbableOptions)||{}).getShadowRoot?u([t],r.includeContainer,{filter:m.bind(null,r),flatten:!0,getShadowRoot:r.getShadowRoot}):c(t,r.includeContainer,m.bind(null,r)))
return{container:e,tabbableNodes:n,focusableNodes:o,firstTabbableNode:n.length>0?n[0]:null,lastTabbableNode:n.length>0?n[n.length-1]:null,nextTabbableNode:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=o.findIndex((function(t){return t===e}))
if(!(r<0))return t?o.slice(r+1).find((function(e){return v(e,a.tabbableOptions)})):o.slice(0,r).reverse().find((function(e){return v(e,a.tabbableOptions)}))}}})),o.tabbableGroups=o.containerGroups.filter((function(e){return e.tabbableNodes.length>0})),o.tabbableGroups.length<=0&&!l("fallbackFocus"))throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times")},f=function e(t){!1!==t&&t!==n.activeElement&&(t&&t.focus?(t.focus({preventScroll:!!a.preventScroll}),o.mostRecentlyFocusedNode=t,function(e){return e.tagName&&"input"===e.tagName.toLowerCase()&&"function"==typeof e.select}(t)&&t.select()):e(p()))},h=function(e){var t=l("setReturnFocus",e)
return t||!1!==t&&e},g=function(e){var t=C(e)
s(t)>=0||(A(a.clickOutsideDeactivates,e)?r.deactivate({returnFocus:a.returnFocusOnDeactivate&&!k(t,a.tabbableOptions)}):A(a.allowOutsideClick,e)||e.preventDefault())},b=function(e){var t=C(e),r=s(t)>=0
r||t instanceof Document?r&&(o.mostRecentlyFocusedNode=t):(e.stopImmediatePropagation(),f(o.mostRecentlyFocusedNode||p()))},_=function(e){if(function(e){return"Escape"===e.key||"Esc"===e.key||27===e.keyCode}(e)&&!1!==A(a.escapeDeactivates,e))return e.preventDefault(),void r.deactivate();(function(e){return"Tab"===e.key||9===e.keyCode})(e)&&function(e){var t=C(e)
d()
var r=null
if(o.tabbableGroups.length>0){var n=s(t),i=n>=0?o.containerGroups[n]:void 0
if(n<0)r=e.shiftKey?o.tabbableGroups[o.tabbableGroups.length-1].lastTabbableNode:o.tabbableGroups[0].firstTabbableNode
else if(e.shiftKey){var c=T(o.tabbableGroups,(function(e){var r=e.firstTabbableNode
return t===r}))
if(c<0&&(i.container===t||k(t,a.tabbableOptions)&&!v(t,a.tabbableOptions)&&!i.nextTabbableNode(t,!1))&&(c=n),c>=0){var u=0===c?o.tabbableGroups.length-1:c-1
r=o.tabbableGroups[u].lastTabbableNode}}else{var p=T(o.tabbableGroups,(function(e){var r=e.lastTabbableNode
return t===r}))
if(p<0&&(i.container===t||k(t,a.tabbableOptions)&&!v(t,a.tabbableOptions)&&!i.nextTabbableNode(t))&&(p=n),p>=0){var h=p===o.tabbableGroups.length-1?0:p+1
r=o.tabbableGroups[h].firstTabbableNode}}}else r=l("fallbackFocus")
r&&(e.preventDefault(),f(r))}(e)},y=function(e){var t=C(e)
s(t)>=0||A(a.clickOutsideDeactivates,e)||A(a.allowOutsideClick,e)||(e.preventDefault(),e.stopImmediatePropagation())},x=function(){if(o.active)return S.activateTrap(r),o.delayInitialFocusTimer=a.delayInitialFocus?O((function(){f(p())})):f(p()),n.addEventListener("focusin",b,!0),n.addEventListener("mousedown",g,{capture:!0,passive:!1}),n.addEventListener("touchstart",g,{capture:!0,passive:!1}),n.addEventListener("click",y,{capture:!0,passive:!1}),n.addEventListener("keydown",_,{capture:!0,passive:!1}),r},P=function(){if(o.active)return n.removeEventListener("focusin",b,!0),n.removeEventListener("mousedown",g,!0),n.removeEventListener("touchstart",g,!0),n.removeEventListener("click",y,!0),n.removeEventListener("keydown",_,!0),r}
return(r={get active(){return o.active},get paused(){return o.paused},activate:function(e){if(o.active)return this
var t=i(e,"onActivate"),r=i(e,"onPostActivate"),a=i(e,"checkCanFocusTrap")
a||d(),o.active=!0,o.paused=!1,o.nodeFocusedBeforeActivation=n.activeElement,t&&t()
var s=function(){a&&d(),x(),r&&r()}
return a?(a(o.containers.concat()).then(s,s),this):(s(),this)},deactivate:function(e){if(!o.active)return this
var t=j({onDeactivate:a.onDeactivate,onPostDeactivate:a.onPostDeactivate,checkCanReturnFocus:a.checkCanReturnFocus},e)
clearTimeout(o.delayInitialFocusTimer),o.delayInitialFocusTimer=void 0,P(),o.active=!1,o.paused=!1,S.deactivateTrap(r)
var n=i(t,"onDeactivate"),s=i(t,"onPostDeactivate"),l=i(t,"checkCanReturnFocus"),c=i(t,"returnFocus","returnFocusOnDeactivate")
n&&n()
var u=function(){O((function(){c&&f(h(o.nodeFocusedBeforeActivation)),s&&s()}))}
return c&&l?(l(h(o.nodeFocusedBeforeActivation)).then(u,u),this):(u(),this)},pause:function(){return o.paused||!o.active||(o.paused=!0,P()),this},unpause:function(){return o.paused&&o.active?(o.paused=!1,d(),x(),this):this},updateContainerElements:function(e){var t=[].concat(e).filter(Boolean)
return o.containers=t.map((function(e){return"string"==typeof e?n.querySelector(e):e})),o.active&&d(),this}}).updateContainerElements(e),r}
let M
try{M=(0,n.capabilities)("3.22")}catch{M=(0,n.capabilities)("3.13")}var L=(0,n.setModifierManager)((()=>({capabilities:M,createModifier:()=>({focusTrapOptions:void 0,isActive:!0,isPaused:!1,shouldSelfFocus:!1,focusTrap:void 0}),installModifier(e,t,{named:{isActive:r,isPaused:n,shouldSelfFocus:a,focusTrapOptions:o,additionalElements:i,_createFocusTrap:s}}){e.focusTrapOptions={...o}||{},void 0!==r&&(e.isActive=r),void 0!==n&&(e.isPaused=n),e.focusTrapOptions&&void 0===e.focusTrapOptions.initialFocus&&a&&(e.focusTrapOptions.initialFocus=t)
let l=z
s&&(l=s),!1!==e.focusTrapOptions.returnFocusOnDeactivate&&(e.focusTrapOptions.returnFocusOnDeactivate=!0),e.focusTrap=l(void 0!==i?[t,...i]:t,e.focusTrapOptions),e.isActive&&e.focusTrap.activate(),e.isPaused&&e.focusTrap.pause()},updateModifier(e,{named:t}){const r=t.focusTrapOptions||{}
if(e.isActive&&!t.isActive){const{returnFocusOnDeactivate:t}=r,n=void 0===t
e.focusTrap.deactivate({returnFocus:n})}else!e.isActive&&t.isActive&&e.focusTrap.activate()
e.isPaused&&!t.isPaused?e.focusTrap.unpause():!e.isPaused&&t.isPaused&&e.focusTrap.pause(),e.focusTrapOptions=r,void 0!==t.isActive&&(e.isActive=t.isActive),void 0!==t.isPaused&&(e.isPaused=t.isPaused)},destroyModifier({focusTrap:e}){e.deactivate()}})),class{})},377:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>l,modifier:()=>u})
var n=r(292),a=r(927),o=r(341)
function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class s{constructor(e){this.owner=e,i(this,"capabilities",(0,a.capabilities)("3.22"))}createModifier(e,t){return{instance:new e(this.owner,t),element:null}}installModifier(e,t,r){const n=function(e,t){const r=e
return r.element=t,r}(e,t)
n.instance.modify(t,r.positional,r.named)}updateModifier(e,t){e.instance.modify(e.element,t.positional,t.named)}destroyModifier({instance:e}){(0,o.destroy)(e)}}class l{constructor(e,t){(0,n.setOwner)(this,e)}modify(e,t,r){}}(0,a.setModifierManager)((e=>new s(e)),l)
const c=new class{constructor(){i(this,"capabilities",(0,a.capabilities)("3.22"))}createModifier(e){return{element:null,instance:e}}installModifier(e,t,r){const n=function(e,t){const r=e
return r.element=t,r}(e,t),{positional:a,named:o}=r,i=e.instance(t,a,o)
"function"==typeof i&&(n.teardown=i)}updateModifier(e,t){"function"==typeof e.teardown&&e.teardown()
const r=e.instance(e.element,t.positional,t.named)
"function"==typeof r&&(e.teardown=r)}destroyModifier(e){"function"==typeof e.teardown&&e.teardown()}}
function u(e){return(0,a.setModifierManager)((()=>c),e)}},962:(e,t,r)=>{"use strict"
function n(e){var t=e._promiseCallbacks
return t||(t=e._promiseCallbacks={}),t}r.r(t),r.d(t,{EventTarget:()=>a,Promise:()=>z,all:()=>D,allSettled:()=>N,asap:()=>re,async:()=>we,cast:()=>_e,configure:()=>i,default:()=>je,defer:()=>V,denodeify:()=>L,filter:()=>J,hash:()=>$,hashSettled:()=>U,map:()=>K,off:()=>ye,on:()=>ve,race:()=>H,reject:()=>Y,resolve:()=>Z,rethrow:()=>G})
var a={mixin:function(e){return e.on=this.on,e.off=this.off,e.trigger=this.trigger,e._promiseCallbacks=void 0,e},on:function(e,t){if("function"!=typeof t)throw new TypeError("Callback must be a function")
var r=n(this),a=r[e]
a||(a=r[e]=[]),-1===a.indexOf(t)&&a.push(t)},off:function(e,t){var r=n(this)
if(t){var a=r[e],o=a.indexOf(t);-1!==o&&a.splice(o,1)}else r[e]=[]},trigger:function(e,t,r){var a=n(this)[e]
if(a)for(var o=0;o<a.length;o++)(0,a[o])(t,r)}},o={instrument:!1}
function i(e,t){if(2!==arguments.length)return o[e]
o[e]=t}a.mixin(o)
var s=[]
function l(e,t,r){1===s.push({name:e,payload:{key:t._guidKey,id:t._id,eventName:e,detail:t._result,childId:r&&r._id,label:t._label,timeStamp:Date.now(),error:o["instrument-with-stack"]?new Error(t._label):null}})&&setTimeout((function(){for(var e=0;e<s.length;e++){var t=s[e],r=t.payload
r.guid=r.key+r.id,r.childGuid=r.key+r.childId,r.error&&(r.stack=r.error.stack),o.trigger(t.name,t.payload)}s.length=0}),50)}function c(e,t){if(e&&"object"==typeof e&&e.constructor===this)return e
var r=new this(u,t)
return v(r,e),r}function u(){}var p=void 0,d=1,f=2,h={error:null}
function m(e){try{return e.then}catch(e){return h.error=e,h}}var g=void 0
function b(){try{var e=g
return g=null,e.apply(this,arguments)}catch(e){return h.error=e,h}}function _(e){return g=e,b}function w(e,t,r){if(t.constructor===e.constructor&&r===S&&e.constructor.resolve===c)!function(e,t){t._state===d?k(e,t._result):t._state===f?(t._onError=null,x(e,t._result)):j(t,void 0,(function(r){t===r?k(e,r):v(e,r)}),(function(t){return x(e,t)}))}(e,t)
else if(r===h){var n=h.error
h.error=null,x(e,n)}else"function"==typeof r?function(e,t,r){o.async((function(e){var n=!1,a=_(r).call(t,(function(r){n||(n=!0,t===r?k(e,r):v(e,r))}),(function(t){n||(n=!0,x(e,t))}),"Settle: "+(e._label||" unknown promise"))
if(!n&&a===h){n=!0
var o=h.error
h.error=null,x(e,o)}}),e)}(e,t,r):k(e,t)}function v(e,t){var r,n
e===t?k(e,t):(n=typeof(r=t),null===r||"object"!==n&&"function"!==n?k(e,t):w(e,t,m(t)))}function y(e){e._onError&&e._onError(e._result),P(e)}function k(e,t){e._state===p&&(e._result=t,e._state=d,0===e._subscribers.length?o.instrument&&l("fulfilled",e):o.async(P,e))}function x(e,t){e._state===p&&(e._state=f,e._result=t,o.async(y,e))}function j(e,t,r,n){var a=e._subscribers,i=a.length
e._onError=null,a[i]=t,a[i+d]=r,a[i+f]=n,0===i&&e._state&&o.async(P,e)}function P(e){var t=e._subscribers,r=e._state
if(o.instrument&&l(r===d?"fulfilled":"rejected",e),0!==t.length){for(var n=void 0,a=void 0,i=e._result,s=0;s<t.length;s+=3)n=t[s],a=t[s+r],n?E(r,n,a,i):a(i)
e._subscribers.length=0}}function E(e,t,r,n){var a,o="function"==typeof r
if(a=o?_(r)(n):n,t._state!==p);else if(a===t)x(t,new TypeError("A promises callback cannot return that same promise."))
else if(a===h){var i=h.error
h.error=null,x(t,i)}else o?v(t,a):e===d?k(t,a):e===f&&x(t,a)}function S(e,t,r){var n=this,a=n._state
if(a===d&&!e||a===f&&!t)return o.instrument&&l("chained",n,n),n
n._onError=null
var i=new n.constructor(u,r),s=n._result
if(o.instrument&&l("chained",n,i),a===p)j(n,i,e,t)
else{var c=a===d?e:t
o.async((function(){return E(a,i,c,s)}))}return i}var O=function(){function e(e,t,r,n){this._instanceConstructor=e,this.promise=new e(u,n),this._abortOnReject=r,this._isUsingOwnPromise=e===z,this._isUsingOwnResolve=e.resolve===c,this._init.apply(this,arguments)}return e.prototype._init=function(e,t){var r=t.length||0
this.length=r,this._remaining=r,this._result=new Array(r),this._enumerate(t)},e.prototype._enumerate=function(e){for(var t=this.length,r=this.promise,n=0;r._state===p&&n<t;n++)this._eachEntry(e[n],n,!0)
this._checkFullfillment()},e.prototype._checkFullfillment=function(){if(0===this._remaining){var e=this._result
k(this.promise,e),this._result=null}},e.prototype._settleMaybeThenable=function(e,t,r){var n=this._instanceConstructor
if(this._isUsingOwnResolve){var a=m(e)
if(a===S&&e._state!==p)e._onError=null,this._settledAt(e._state,t,e._result,r)
else if("function"!=typeof a)this._settledAt(d,t,e,r)
else if(this._isUsingOwnPromise){var o=new n(u)
w(o,e,a),this._willSettleAt(o,t,r)}else this._willSettleAt(new n((function(t){return t(e)})),t,r)}else this._willSettleAt(n.resolve(e),t,r)},e.prototype._eachEntry=function(e,t,r){null!==e&&"object"==typeof e?this._settleMaybeThenable(e,t,r):this._setResultAt(d,t,e,r)},e.prototype._settledAt=function(e,t,r,n){var a=this.promise
a._state===p&&(this._abortOnReject&&e===f?x(a,r):(this._setResultAt(e,t,r,n),this._checkFullfillment()))},e.prototype._setResultAt=function(e,t,r,n){this._remaining--,this._result[t]=r},e.prototype._willSettleAt=function(e,t,r){var n=this
j(e,void 0,(function(e){return n._settledAt(d,t,e,r)}),(function(e){return n._settledAt(f,t,e,r)}))},e}()
function T(e,t,r){this._remaining--,this._result[t]=e===d?{state:"fulfilled",value:r}:{state:"rejected",reason:r}}var A="rsvp_"+Date.now()+"-",C=0,z=function(){function e(t,r){this._id=C++,this._label=r,this._state=void 0,this._result=void 0,this._subscribers=[],o.instrument&&l("created",this),u!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof e?function(e,t){var r=!1
try{t((function(t){r||(r=!0,v(e,t))}),(function(t){r||(r=!0,x(e,t))}))}catch(t){x(e,t)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return e.prototype._onError=function(e){var t=this
o.after((function(){t._onError&&o.trigger("error",e,t._label)}))},e.prototype.catch=function(e,t){return this.then(void 0,e,t)},e.prototype.finally=function(e,t){var r=this,n=r.constructor
return"function"==typeof e?r.then((function(t){return n.resolve(e()).then((function(){return t}))}),(function(t){return n.resolve(e()).then((function(){throw t}))})):r.then(e,e)},e}()
function M(e,t){return{then:function(r,n){return e.call(t,r,n)}}}function L(e,t){var r=function(){for(var r=arguments.length,n=new Array(r+1),a=!1,o=0;o<r;++o){var i=arguments[o]
if(!a){if((a=I(i))===h){var s=h.error
h.error=null
var l=new z(u)
return x(l,s),l}a&&!0!==a&&(i=M(a,i))}n[o]=i}var c=new z(u)
return n[r]=function(e,r){e?x(c,e):void 0===t?v(c,r):!0===t?v(c,function(e){for(var t=e.length,r=new Array(t-1),n=1;n<t;n++)r[n-1]=e[n]
return r}(arguments)):Array.isArray(t)?v(c,function(e,t){for(var r={},n=e.length,a=new Array(n),o=0;o<n;o++)a[o]=e[o]
for(var i=0;i<t.length;i++)r[t[i]]=a[i+1]
return r}(arguments,t)):v(c,r)},a?function(e,t,r,n){return z.all(t).then((function(t){return R(e,t,r,n)}))}(c,n,e,this):R(c,n,e,this)}
return r.__proto__=e,r}function R(e,t,r,n){if(_(r).apply(n,t)===h){var a=h.error
h.error=null,x(e,a)}return e}function I(e){return null!==e&&"object"==typeof e&&(e.constructor===z||m(e))}function D(e,t){return z.all(e,t)}z.cast=c,z.all=function(e,t){return Array.isArray(e)?new O(this,e,!0,t).promise:this.reject(new TypeError("Promise.all must be called with an array"),t)},z.race=function(e,t){var r=new this(u,t)
if(!Array.isArray(e))return x(r,new TypeError("Promise.race must be called with an array")),r
for(var n=0;r._state===p&&n<e.length;n++)j(this.resolve(e[n]),void 0,(function(e){return v(r,e)}),(function(e){return x(r,e)}))
return r},z.resolve=c,z.reject=function(e,t){var r=new this(u,t)
return x(r,e),r},z.prototype._guidKey=A,z.prototype.then=S
var B=function(e){function t(t,r,n){return function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t,r,!1,n))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t}(O)
function N(e,t){return Array.isArray(e)?new B(z,e,t).promise:z.reject(new TypeError("Promise.allSettled must be called with an array"),t)}function H(e,t){return z.race(e,t)}B.prototype._setResultAt=T
var F=function(e){function t(t,r){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=arguments[3]
return function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t,r,n,a))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype._init=function(e,t){this._result={},this._enumerate(t)},t.prototype._enumerate=function(e){var t=Object.keys(e),r=t.length,n=this.promise
this._remaining=r
for(var a=void 0,o=void 0,i=0;n._state===p&&i<r;i++)o=e[a=t[i]],this._eachEntry(o,a,!0)
this._checkFullfillment()},t}(O)
function $(e,t){return z.resolve(e,t).then((function(e){if(null===e||"object"!=typeof e)throw new TypeError("Promise.hash must be called with an object")
return new F(z,e,t).promise}))}var q=function(e){function t(t,r,n){return function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t,r,!1,n))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t}(F)
function U(e,t){return z.resolve(e,t).then((function(e){if(null===e||"object"!=typeof e)throw new TypeError("hashSettled must be called with an object")
return new q(z,e,!1,t).promise}))}function G(e){throw setTimeout((function(){throw e})),e}function V(e){var t={resolve:void 0,reject:void 0}
return t.promise=new z((function(e,r){t.resolve=e,t.reject=r}),e),t}q.prototype._setResultAt=T
var W=function(e){function t(t,r,n,a){return function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t,r,!0,a,n))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype._init=function(e,t,r,n,a){var o=t.length||0
this.length=o,this._remaining=o,this._result=new Array(o),this._mapFn=a,this._enumerate(t)},t.prototype._setResultAt=function(e,t,r,n){if(n){var a=_(this._mapFn)(r,t)
a===h?this._settledAt(f,t,a.error,!1):this._eachEntry(a,t,!1)}else this._remaining--,this._result[t]=r},t}(O)
function K(e,t,r){return"function"!=typeof t?z.reject(new TypeError("map expects a function as a second argument"),r):z.resolve(e,r).then((function(e){if(!Array.isArray(e))throw new TypeError("map must be called with an array")
return new W(z,e,t,r).promise}))}function Z(e,t){return z.resolve(e,t)}function Y(e,t){return z.reject(e,t)}var X={},Q=function(e){function t(){return function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype._checkFullfillment=function(){if(0===this._remaining&&null!==this._result){var e=this._result.filter((function(e){return e!==X}))
k(this.promise,e),this._result=null}},t.prototype._setResultAt=function(e,t,r,n){if(n){this._result[t]=r
var a=_(this._mapFn)(r,t)
a===h?this._settledAt(f,t,a.error,!1):this._eachEntry(a,t,!1)}else this._remaining--,r||(this._result[t]=X)},t}(W)
function J(e,t,r){return"function"!=typeof t?z.reject(new TypeError("filter expects function as a second argument"),r):z.resolve(e,r).then((function(e){if(!Array.isArray(e))throw new TypeError("filter must be called with an array")
return new Q(z,e,t,r).promise}))}var ee=0,te=void 0
function re(e,t){ce[ee]=e,ce[ee+1]=t,2===(ee+=2)&&be()}var ne="undefined"!=typeof window?window:void 0,ae=ne||{},oe=ae.MutationObserver||ae.WebKitMutationObserver,ie="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),se="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel
function le(){return function(){return setTimeout(ue,1)}}var ce=new Array(1e3)
function ue(){for(var e=0;e<ee;e+=2)(0,ce[e])(ce[e+1]),ce[e]=void 0,ce[e+1]=void 0
ee=0}var pe,de,fe,he,me,ge,be=void 0
ie?(me=process.nextTick,ge=process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/),Array.isArray(ge)&&"0"===ge[1]&&"10"===ge[2]&&(me=setImmediate),be=function(){return me(ue)}):oe?(de=0,fe=new oe(ue),he=document.createTextNode(""),fe.observe(he,{characterData:!0}),be=function(){return he.data=de=++de%2}):se?((pe=new MessageChannel).port1.onmessage=ue,be=function(){return pe.port2.postMessage(0)}):be=void 0===ne?function(){try{var e=Function("return this")().require("vertx")
return void 0!==(te=e.runOnLoop||e.runOnContext)?function(){te(ue)}:le()}catch(e){return le()}}():le(),o.async=re,o.after=function(e){return setTimeout(e,0)}
var _e=Z,we=function(e,t){return o.async(e,t)}
function ve(){o.on.apply(o,arguments)}function ye(){o.off.apply(o,arguments)}if("undefined"!=typeof window&&"object"==typeof window.__PROMISE_INSTRUMENTATION__){var ke=window.__PROMISE_INSTRUMENTATION__
for(var xe in i("instrument",!0),ke)ke.hasOwnProperty(xe)&&ve(xe,ke[xe])}const je={asap:re,cast:_e,Promise:z,EventTarget:a,all:D,allSettled:N,race:H,hash:$,hashSettled:U,rethrow:G,defer:V,denodeify:L,configure:i,on:ve,off:ye,resolve:Z,reject:Y,map:K,async:we,filter:J}},255:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{cached:()=>w,dedupeTracked:()=>v,localCopy:()=>b,trackedReset:()=>_})
var n,a,o=r(353),i=r(219),s=r(521),l=r(173)
function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}let u=(n=class{constructor(){var e
c(this,"prevRemote",void 0),c(this,"peek",void 0),(e=a)&&Object.defineProperty(this,"value",{enumerable:e.enumerable,configurable:e.configurable,writable:e.writable,value:e.initializer?e.initializer.call(this):void 0})}},p=n.prototype,d="value",f=[s.tracked],h={configurable:!0,enumerable:!0,writable:!0,initializer:null},m={},Object.keys(h).forEach((function(e){m[e]=h[e]})),m.enumerable=!!m.enumerable,m.configurable=!!m.configurable,("value"in m||m.initializer)&&(m.writable=!0),void 0===(m=f.slice().reverse().reduce((function(e,t){return t(p,d,e)||e}),m)).initializer&&(Object.defineProperty(p,d,m),m=null),a=m,n)
var p,d,f,h,m
function g(e,t,r){let n=t.get(e)
return void 0===n&&(n=new u,t.set(e,n),n.value=n.peek="function"==typeof r?r.call(e):r),n}function b(e,t){(0,o.assert)(`@localCopy() must be given a memo path as its first argument, received \`${String(e)}\``,"string"==typeof e)
let r=new WeakMap
return()=>{let n=t=>(0,i.get)(t,e)
return{get(){let e=g(this,r,t),{prevRemote:a}=e,o=n(this)
return a!==o&&(e.value=e.prevRemote=o),e.value},set(e){if(!r.has(this)){let a=g(this,r,t)
return a.prevRemote=n(this),void(a.value=e)}g(this,r,t).value=e}}}}function _(e){(0,o.assert)(`@trackedReset() must be given a memo path, a memo function, or config object with a memo path or function as its first argument, received \`${String(e)}\``,"string"==typeof e||"function"==typeof e||"object"==typeof e&&null!==e&&void 0!==e.memo)
let t=new WeakMap
return(r,n,a)=>{let o,s,l=a.initializer??(()=>{})
"object"==typeof e?(o=e.memo,s=e.update??l):(o=e,s=l)
let c="function"==typeof o?(e,t)=>o.call(e,e,n,t):e=>(0,i.get)(e,o)
return{get(){let e=g(this,t,l),{prevRemote:r}=e,a=c(this,r)
return a!==r&&(e.prevRemote=a,e.value=e.peek=s.call(this,this,n,e.peek)),e.value},set(e){g(this,t,l).value=e}}}}function w(e,t,r){(0,o.assert)("@cached can only be used on getters",r&&r.get)
let{get:n,set:a}=r,i=new WeakMap
return{get(){let e=i.get(this)
return void 0===e&&(e=(0,l.createCache)(n.bind(this)),i.set(this,e)),(0,l.getValue)(e)},set:a}}function v(){let e
const t=function(t,r,n){let{initializer:a}=n,{get:o,set:i}=(0,s.tracked)(t,r,n),l=new WeakMap
return{get(){if(!l.has(this)){let e=a?.call(this)
l.set(this,e),i.call(this,e)}return o.call(this)},set(t){l.has(this)&&e(t,l.get(this))||(l.set(this,t),i.call(this,t))}}}
return 3===arguments.length?(e=(e,t)=>e===t,t(...arguments)):1===arguments.length&&"function"==typeof arguments[0]?(e=arguments[0],t):void(0,o.assert)(`@dedupeTracked() can either be invoked without arguments or with one comparator function, received \`${String(arguments)}\``,!1)}},339:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{setup:()=>c})
var n=Object.defineProperty,a=Object.prototype.hasOwnProperty,o=Object.getOwnPropertySymbols,i=Object.prototype.propertyIsEnumerable,s=(e,t,r)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,l=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&s(e,r,t[r])
if(o)for(var r of o(t))i.call(t,r)&&s(e,r,t[r])
return e}
function c(e){function t(e){return new RegExp(`\\b(?:${e.split(" ").join("|")})\\b`)}let r="[-+*/_~!@$%^=<>{}\\w]+",n=/[A-Za-z0-9]+/,a=d.either(n,/[a-zA-Z0-9]+\.[a-zA-Z0-9-]+/,d.concat(n,/::/,/-?/,n)),o=/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,i=new RegExp(d.either(/"[^{"]+/,/"/,/'[^{']+/,/'/,/"[^"]+"/,/'[^']+'/)),s={"parameter argument property":{pattern:/@[\w\d-_]+/}},c={punctuation:[{pattern:/[!#%&:()*+,.\/;<=>\[\\\]^`{|}~]+/},{pattern:/^=/,alias:"attr-equals"},{pattern:/\/?>/}]},u={"function-name":[{pattern:new RegExp("(\\()"+r),lookbehind:!0},{pattern:new RegExp("(\\{\\{\\{?)"+r),lookbehind:!0}]},p={builtin:t(["action on","outlet yield","log debugger","let each each-in if else unless"].join(" ")),keyword:t(["has-block concat fn component helper modifier get hash query-params","true false undefined null"].join(" ")),operator:t(["eq neq","gt gte le lte","and or not","as"].join(" "))},f={function:{greedy:!0,pattern:/\([\S-_\d]+\b/,inside:l(l(l({},c),u),p)}},h={"this-expression":{pattern:/this\.[\S]+/,lookbehind:!0,greedy:!0,inside:l(l({},c),{namespace:/this/,property:/[\S]+/})}},m={"member-expression":{pattern:/[\S]+\.[\S]+/,lookbehind:!0,greedy:!0,inside:l(l({},c),{constant:/[\S]+/,property:/[\S]+/})}},g=l(l(l(l(l(l(l(l(l({},f),c),h),m),s),{number:o,boolean:/\b(?:true|false)\b/}),p),u),{"attr-name":/^[^=]+=/,string:i,variable:/\b[A-Za-z0-9_-]+\b/}),b={mustache:{pattern:/\{\{\{?\/?[^}]+?\}?\}\}/,lookbehind:!0,alias:"punctuation",greedy:!0,inside:l(l({},{"sub-expression":{alias:"punctuation",pattern:/\([^)]+\)/,lookbehind:!0,greedy:!0,inside:g}}),g)}},_={string:{pattern:i,inside:b}}
g.string=_.string
let w=e.languages.markup
if(!w)throw new Error("prism-markup is required")
e.languages.glimmer=l(l({comment:[{pattern:/\{\{!--[\s\S]*?--\}\}/},{pattern:/\{\{![\s\S]*?\}\}/}],number:o},b),{tag:l(l({},w.tag),{inside:l(l(l(l(l({number:o},s),b),{tag:l(l({},w.tag.inside.tag),{inside:l(l({},c),{"class-name":new RegExp(a)})}),"attr-name":{pattern:/\b[^=\b]+=/,inside:l(l(l(l({},_),c),s),b)}}),c),_)})})}function u(...e){return e.map((e=>p(e))).join("")}function p(e){return e?"string"==typeof e?e:e.source:null}var d={lookahead:function(e){return u("(?=",e,")")},either:function(...e){return"("+e.map((e=>p(e))).join("|")+")"},optional:function(e){return u("(",e,")?")},concat:u}}}])
