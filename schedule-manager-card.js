/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=window,e$6=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$4=Symbol(),n$6=new WeakMap;let o$4 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$4)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$6&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$6.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$4("string"==typeof t?t:t+"",void 0,s$4),i$4=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$4(n,t,s$4)},S$1=(s,n)=>{e$6?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$3.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$6?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$3;const e$5=window,r$1=e$5.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$3=e$5.reactiveElementPolyfillSupport,n$5={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$2=(t,i)=>i!==t&&(i==i||t==t),l$3={attribute:!0,type:String,converter:n$5,reflect:!1,hasChanged:a$2},d$1="finalized";let u$1 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$3){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$3}static finalize(){if(this.hasOwnProperty(d$1))return !1;this[d$1]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$3){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$5).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$5;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$2)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$1[d$1]=!0,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$3||o$3({ReactiveElement:u$1}),(null!==(s$3=e$5.reactiveElementVersions)&&void 0!==s$3?s$3:e$5.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$3=window,s$2=i$3.trustedTypes,e$4=s$2?s$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2="$lit$",n$4=`lit$${(Math.random()+"").slice(9)}$`,l$2="?"+n$4,h=`<${l$2}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$1="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a$1}(?:([^\\s"'>=/]+)(${a$1}*=${a$1}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w$1=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w$1(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$4?e$4.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$2+s.slice(v)+n$4+w):s+n$4+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$2)||i.startsWith(n$4)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$2).split(n$4),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$4),i=t.length-1;if(i>0){h.textContent=s$2?s$2.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$2)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$4,t+1));)v.push({type:7,index:r}),t+=n$4.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$2?s$2.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$3.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$2=i$3.litHtmlVersions)&&void 0!==t$2?t$2:i$3.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$1,o$1;let s$1 = class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}};s$1.finalized=!0,s$1._$litElement$=!0,null===(l$1=globalThis.litElementHydrateSupport)||void 0===l$1||l$1.call(globalThis,{LitElement:s$1});const n$3=globalThis.litElementPolyfillSupport;null==n$3||n$3({LitElement:s$1});(null!==(o$1=globalThis.litElementVersions)&&void 0!==o$1?o$1:globalThis.litElementVersions=[]).push("3.3.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$3=t=>(...e)=>({_$litDirective$:t,values:e});let i$2 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$2=o=>void 0===o.strings,s={},a=(o,l=s)=>o._$AH=l;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=e$3(class extends i$2{constructor(r){if(super(r),r.type!==t$1.PROPERTY&&r.type!==t$1.ATTRIBUTE&&r.type!==t$1.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!e$2(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i,[t]){if(t===T||t===A)return t;const o=i.element,l=i.name;if(i.type===t$1.PROPERTY){if(t===o[l])return T}else if(i.type===t$1.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(l))return T}else if(i.type===t$1.ATTRIBUTE&&o.getAttribute(l)===t+"")return T;return a(i),t}});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$1=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$2(n){return (t,o)=>void 0!==o?e(n,t,o):i$1(n,t)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return n$2({...t,state:!0})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n$1;null!=(null===(n$1=window.HTMLSlotElement)||void 0===n$1?void 0:n$1.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i="important",n=" !"+i,o=e$3(class extends i$2{constructor(t){var e;if(super(t),t.type!==t$1.ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ht){this.ht=new Set;for(const t in r)this.ht.add(t);return this.render(r)}this.ht.forEach((t=>{null==r[t]&&(this.ht.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];if(null!=e){this.ht.add(t);const r="string"==typeof e&&e.endsWith(n);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?i:""):s[t]=e;}}return T}});

/** Capteur créé par l’intégration Schedule Manager (`attributes.schedules`, `attributes.groups`). */
const SCHEDULE_MANAGER_STATUS_ENTITY_ID = 'sensor.schedule_manager_status';

function randomActionId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return `a-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function newEmptyAction() {
    return {
        id: randomActionId(),
        action_type: '',
        action_payload: {},
    };
}
/** Normalise une plage depuis le stockage HA (tableau `actions` ou ancien format plat). */
function normalizeTimeBlock(raw) {
    const start_time = String(raw.start_time ?? '00:00:00');
    const end_time = String(raw.end_time ?? '23:59:59');
    const id = typeof raw.id === 'string' ? raw.id : undefined;
    const actionsRaw = raw.actions;
    if (Array.isArray(actionsRaw) && actionsRaw.length > 0) {
        const actions = actionsRaw.map((a, i) => {
            const rec = a;
            return {
                id: typeof rec.id === 'string' ? rec.id : `${randomActionId()}-${i}`,
                action_type: String(rec.action_type ?? ''),
                action_payload: typeof rec.action_payload === 'object' && rec.action_payload !== null
                    ? rec.action_payload
                    : {},
            };
        });
        return { id, start_time, end_time, actions };
    }
    return {
        id,
        start_time,
        end_time,
        actions: [
            {
                id: randomActionId(),
                action_type: String(raw.action_type ?? ''),
                action_payload: typeof raw.action_payload === 'object' && raw.action_payload !== null
                    ? raw.action_payload
                    : {},
            },
        ],
    };
}
function normalizeScheduleTimeBlocks(schedule) {
    return {
        ...schedule,
        time_blocks: (schedule.time_blocks || []).map((tb) => normalizeTimeBlock(tb)),
    };
}

class ScheduleManagerServices {
    constructor(hass) {
        this.hass = hass;
    }
    async callService(domain, service, data) {
        await this.hass.callService(domain, service, data);
    }
    async enableSchedule(scheduleId) {
        await this.callService('schedule_manager', 'enable_schedule', { schedule_id: scheduleId });
    }
    async disableSchedule(scheduleId) {
        await this.callService('schedule_manager', 'disable_schedule', { schedule_id: scheduleId });
    }
    async setActiveSchedule(groupId, scheduleId) {
        await this.callService('schedule_manager', 'set_active_schedule', {
            group_id: groupId,
            schedule_id: scheduleId,
        });
    }
    async createSchedule(name) {
        const trimmed = name.trim();
        if (!trimmed) {
            return;
        }
        await this.callService('schedule_manager', 'create_schedule', { name: trimmed });
    }
    async deleteSchedule(scheduleId) {
        await this.callService('schedule_manager', 'delete_schedule', { schedule_id: scheduleId });
    }
    async updateSchedule(scheduleId, updates) {
        const data = { schedule_id: scheduleId };
        if (updates.name !== undefined)
            data.name = updates.name;
        if (updates.enabled !== undefined)
            data.enabled = updates.enabled;
        if (updates.repeat_days !== undefined)
            data.repeat_days = updates.repeat_days;
        if (updates.time_blocks !== undefined)
            data.time_blocks = updates.time_blocks;
        await this.callService('schedule_manager', 'update_schedule', data);
    }
}

const styles = i$4 `
  :host {
    display: block;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .card {
    padding: 16px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .schedule {
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--divider-color);
  }

  .schedule:last-child {
    border-bottom: none;
  }

  .schedule-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .schedule-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-danger {
    padding: 6px 10px;
    font-size: 0.85em;
    border-radius: 4px;
    border: 1px solid var(--error-color, #db4437);
    background: transparent;
    color: var(--error-color, #db4437);
    cursor: pointer;
  }

  .btn-danger:hover {
    background: rgba(219, 68, 55, 0.12);
  }

  .btn-danger:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .subsection-title {
    font-size: 0.85em;
    font-weight: 600;
    margin: 12px 0 6px;
    color: var(--secondary-text-color);
  }

  .empty-hint {
    color: var(--secondary-text-color);
    font-size: 0.9em;
    line-height: 1.4;
    margin-bottom: 12px;
  }

  .create-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-top: 8px;
  }

  .create-row input[type='text'] {
    flex: 1;
    min-width: 160px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }

  .create-row button {
    padding: 8px 14px;
    border-radius: 4px;
    border: none;
    background: var(--primary-color);
    color: var(--text-primary-color);
    cursor: pointer;
  }

  .create-row button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  code.inline {
    font-size: 0.85em;
    background: rgba(127, 127, 127, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .timeline-hint {
    font-size: 0.78em;
    color: var(--secondary-text-color);
    margin: -4px 0 8px;
    line-height: 1.35;
  }

  /* Frise 24 h — même principe que scheduler-card (barre flex 60px + time-bar 18px) */
  .timeline-frise {
    margin: 0 0 16px;
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(127, 127, 127, 0.08);
    border: 1px solid var(--divider-color);
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    overflow: hidden;
  }

  .sm-scheduler-frise {
    display: block;
    max-width: 100%;
  }

  .sm-scheduler-track {
    position: relative;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .sm-scheduler-bar {
    position: relative;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
  }

  .sm-slot {
    display: flex;
    height: 100%;
    box-sizing: border-box;
    cursor: default;
    color: var(--text-primary-color);
    font-weight: 500;
    align-items: center;
    justify-content: center;
    word-break: break-word;
    white-space: normal;
    overflow: hidden;
    padding: 2px 4px;
    min-width: 3px;
    /* position / taille / fond en inline (pourcentage exact sur 24 h) */
  }

  .sm-scheduler-track--editor .sm-slot {
    cursor: pointer;
  }

  .sm-scheduler-track--editor .sm-slot.is-selected {
    cursor: grab;
    user-select: none;
    touch-action: none;
  }

  .sm-scheduler-track--editor .sm-slot.is-selected:active {
    cursor: grabbing;
  }

  .sm-slot--cap-start {
    border-radius: 10px 0 0 10px;
  }

  .sm-slot--cap-end {
    border-radius: 0 10px 10px 0;
  }

  .sm-slot:hover {
    filter: brightness(1.08);
  }

  .sm-slot.is-selected {
    box-shadow:
      inset 0 0 0 3px rgba(255, 255, 255, 0.95),
      0 0 0 1px rgba(0, 0, 0, 0.35);
    z-index: 2;
  }

  .sm-slot-label {
    font-size: 0.72rem;
    line-height: 1.15;
    text-align: center;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  }

  /* Barre d’heures (équivalent time-bar du scheduler-card) */
  .sm-time-bar {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 18px;
    margin-top: 4px;
    box-sizing: border-box;
  }

  .sm-time-bar-label {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    white-space: nowrap;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sm-time-bar-label--left {
    justify-content: flex-start;
  }

  .sm-time-bar-label--right {
    justify-content: flex-end;
  }

  .timeline-now {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    margin-left: -1px;
    background: var(--accent-color, var(--primary-color));
    opacity: 0.95;
    z-index: 5;
    pointer-events: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  }

  .sm-frise-heading {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 2px;
  }

  .sm-frise-heading-label {
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--primary-text-color);
  }

  /* Entités (formulaire plage) */
  .entity-picker-row {
    grid-column: 1 / -1;
  }

  .entity-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 6px;
  }

  .entity-chip {
    display: inline-flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 10px;
    font-size: 0.75rem;
    border-radius: 12px;
    background: rgba(127, 127, 127, 0.18);
    max-width: 100%;
  }

  .entity-chip-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;
  }

  .entity-chip-name {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--primary-text-color);
    line-height: 1.25;
    word-break: break-word;
  }

  .entity-chip-id {
    font-size: 0.68rem;
    color: var(--secondary-text-color);
    word-break: break-all;
    line-height: 1.2;
  }

  .entity-chip code {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 220px;
  }

  .entity-chip button {
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--error-color, #c62828);
    font-size: 1rem;
    line-height: 1;
    padding: 0 2px;
  }

  .btn-open-config {
    width: 100%;
    margin: 10px 0 12px;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--primary-color);
    color: var(--text-primary-color);
    font-size: 0.95em;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-open-config:hover {
    filter: brightness(1.06);
  }

  /* Éditeur plein écran (style config HA) */
  .sm-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.52);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: max(12px, env(safe-area-inset-top)) 12px 24px;
    overflow: auto;
    box-sizing: border-box;
  }

  .sm-modal {
    width: min(100%, 520px);
    max-width: calc(100vw - 24px);
    min-width: 0;
    margin-top: 8px;
    margin-bottom: 24px;
    border-radius: 12px;
    background: var(--card-background-color, var(--ha-card-background, #1e1e1e));
    border: 1px solid var(--divider-color);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
    color: var(--primary-text-color);
    box-sizing: border-box;
    /* visible : évite de recadrer les listes déroulantes de ha-entity-picker (overflow hidden les masque parfois) */
    overflow-x: visible;
    overflow-y: visible;
  }

  .sm-modal-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px 10px;
    border-bottom: 1px solid var(--divider-color);
  }

  .sm-modal-head h2 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 600;
  }

  .sm-icon-btn {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
  }

  .sm-icon-btn:hover {
    background: rgba(127, 127, 127, 0.2);
    color: var(--primary-text-color);
  }

  .sm-modal-sub {
    padding: 12px 16px 8px;
    font-size: 0.82em;
    color: var(--secondary-text-color);
  }

  .sm-modal-sub span {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .sm-repeat-days {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .sm-day {
    min-width: 2.85rem;
    padding: 10px 10px;
    border-radius: 10px;
    border: 1px solid var(--divider-color);
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.95em;
    font-weight: 500;
    cursor: pointer;
  }

  .sm-day.on {
    border-color: var(--primary-color);
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.18);
    color: var(--primary-text-color);
    font-weight: 600;
  }

  .sm-toolbar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 4px 16px 14px;
    align-items: stretch;
  }

  .sm-tool-btn {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-size: 0.92em;
    font-weight: 600;
    cursor: pointer;
  }

  .sm-tool-accent {
    border-color: rgba(33, 150, 243, 0.55);
    background: rgba(33, 150, 243, 0.15);
    color: var(--primary-color, #2196f3);
  }

  .sm-tool-btn.danger {
    border-color: rgba(219, 68, 55, 0.55);
    color: var(--error-color, #ef5350);
    background: rgba(239, 83, 80, 0.08);
  }

  .sm-tool-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .sm-editor-frise {
    margin: 0 16px 12px;
    min-width: 0;
  }

  .sm-color-field {
    margin-bottom: 14px;
  }

  .sm-color-field-title {
    display: block;
    margin-bottom: 6px;
    font-size: 0.78em;
    color: var(--secondary-text-color);
    font-weight: 600;
  }

  .sm-color-field-hint {
    margin: 0 0 10px;
    font-size: 0.72em;
    line-height: 1.4;
    color: var(--secondary-text-color);
    opacity: 0.92;
  }

  .sm-color-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  .sm-color-system-label {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    flex-shrink: 0;
    cursor: pointer;
    max-width: min(100%, 160px);
  }

  .sm-color-system-text {
    font-size: 0.72em;
    line-height: 1.25;
    color: var(--secondary-text-color);
  }

  /* Pastille ronde : évite l’effet « gros rectangle bleu » du nuancier natif par défaut */
  .sm-color-native {
    width: 36px;
    height: 36px;
    padding: 0;
    border: 2px solid var(--divider-color);
    border-radius: 50%;
    cursor: pointer;
    background: var(--card-background-color);
    box-sizing: border-box;
  }

  .sm-color-native::-webkit-color-swatch-wrapper {
    padding: 2px;
  }

  .sm-color-native::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }

  .sm-color-native::-moz-color-swatch {
    border: none;
    border-radius: 50%;
  }

  .sm-color-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    flex: 1;
    min-width: 0;
  }

  .sm-color-swatch {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.25);
    cursor: pointer;
    padding: 0;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }

  .sm-color-swatch:hover {
    transform: scale(1.08);
  }

  .sm-color-reset {
    padding: 8px 12px;
    font-size: 0.8em;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    white-space: nowrap;
  }

  .sm-color-reset:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .sm-modal-body {
    padding: 0 16px 12px;
    min-width: 0;
  }

  .sm-form-label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 10px;
    font-size: 0.78em;
    color: var(--secondary-text-color);
  }

  /*
   * Sans display:block + largeur, ha-entity-picker (élément personnalisé) peut
   * rester en ligne à largeur/hauteur nulles dans une colonne flex — invisible dans le modal.
   */
  .sm-form-label ha-entity-picker,
  .sm-action-card ha-entity-picker,
  .sm-entity-picker-shell ha-entity-picker {
    display: block;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: 56px;
  }

  .sm-form-label input[type='text'] {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-family: inherit;
    font-size: 1rem;
  }

  .sm-form-label-last {
    margin-bottom: 0;
  }

  .sm-action-card {
    margin-top: 4px;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid var(--divider-color);
    background: rgba(127, 127, 127, 0.06);
  }

  .sm-action-card h4 {
    margin: 0 0 10px;
    font-size: 0.88em;
    font-weight: 600;
    color: var(--secondary-text-color);
  }

  .sm-field-hint {
    display: block;
    margin-top: 6px;
    font-size: 0.72em;
    line-height: 1.35;
    color: var(--secondary-text-color);
  }

  .sm-field-hint code {
    font-size: 0.95em;
    word-break: break-all;
  }

  .sm-field-hint-warn {
    color: var(--warning-color, #ff9800);
  }

  .sm-action-advanced {
    margin: 10px 0 6px;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px dashed var(--divider-color);
    background: rgba(127, 127, 127, 0.04);
  }

  .sm-action-advanced summary {
    cursor: pointer;
    font-size: 0.82em;
    color: var(--secondary-text-color);
    user-select: none;
  }

  .sm-form-label-inner {
    margin-top: 8px;
    margin-bottom: 0;
  }

  .sm-modal-body-input-full {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin-top: 6px;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-family: inherit;
    font-size: 0.95rem;
  }

  .sm-modal-body .sm-time-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 12px 16px;
    margin-bottom: 14px;
    align-items: start;
    width: 100%;
    box-sizing: border-box;
  }

  .sm-modal-body .sm-time-row label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.78em;
    color: var(--secondary-text-color);
    min-width: 0;
    margin: 0;
  }

  .sm-modal-body .sm-time-row input {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    min-width: 0;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-family: inherit;
    font-size: 1rem;
  }

  .sm-modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding: 14px 16px 16px;
    border-top: 1px solid var(--divider-color);
  }

  .btn-text {
    padding: 8px 4px;
    border: none;
    background: transparent;
    font-size: 0.95em;
    cursor: pointer;
    font-family: inherit;
  }

  .btn-text.primary {
    color: var(--primary-color);
    font-weight: 600;
  }

  .btn-text.danger {
    color: var(--secondary-text-color);
    margin-right: auto;
  }

  .sm-editor-frise {
    overflow-x: visible;
    overflow-y: visible;
  }

  .sm-scheduler-track--editor .sm-slot {
    touch-action: manipulation;
  }

  /* Poignées : centrées sur l’heure (translateX dans le style inline), pas deux disques noirs collés */
  .sm-scheduler-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 28px;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    cursor: ew-resize;
    z-index: 10;
    touch-action: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Poignée visible sur thème sombre / clair */
  .sm-scheduler-handle-grip {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    box-sizing: border-box;
    background: rgb(var(--rgb-primary-color, 33, 150, 243));
    border: 2px solid rgba(255, 255, 255, 0.92);
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.28),
      0 2px 10px rgba(0, 0, 0, 0.35);
    pointer-events: none;
  }

  .sm-scheduler-handle:hover .sm-scheduler-handle-grip {
    filter: brightness(1.12);
    box-shadow:
      0 0 0 2px rgba(255, 255, 255, 0.5),
      0 3px 12px rgba(0, 0, 0, 0.35);
  }

  .sm-select {
    width: 100%;
    max-width: 100%;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
  }

  /* Résumé + bouton principal « comme » l’UI horaire HA */
  .sm-action-entry {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 8px;
  }

  .sm-actions-stack {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .sm-action-block {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid var(--divider-color);
    background: rgba(var(--rgb-primary-text-color, 221, 221, 221), 0.04);
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
  }

  .sm-action-block-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .sm-action-block-title {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .sm-action-block-remove {
    padding: 4px 10px;
    font-size: 0.78rem;
    border-radius: 6px;
    border: 1px solid var(--divider-color);
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    font-family: inherit;
  }

  .sm-action-block-remove:hover {
    color: var(--error-color, #c62828);
    border-color: var(--error-color, #c62828);
  }

  .sm-action-block-wizard {
    align-self: flex-start;
    margin-top: 4px;
  }

  .sm-action-add-another-btn {
    align-self: stretch;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px dashed var(--divider-color);
    background: transparent;
    color: var(--primary-color);
    font-size: 0.9rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
  }

  .sm-action-add-another-btn:hover {
    background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.08);
  }

  .sm-entity-add-block {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
  }

  .sm-entity-add-heading {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .sm-entity-add-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-height: 32px;
  }

  .sm-entity-add-plus {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid var(--primary-color);
    background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.12);
    color: var(--primary-color);
    font-size: 1.35rem;
    font-weight: 500;
    line-height: 1;
    font-family: inherit;
    cursor: pointer;
    box-sizing: border-box;
  }

  .sm-entity-add-plus:hover {
    background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.22);
  }

  .sm-entity-add-dismiss {
    flex-shrink: 0;
    padding: 6px 10px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--primary-color);
    font-size: 0.82rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
  }

  .sm-entity-add-dismiss:hover {
    text-decoration: underline;
  }

  .sm-entity-picker-shell--popover {
    margin-top: 2px;
    min-height: 48px;
  }

  .sm-action-climate-preset {
    margin-top: 4px;
  }

  .sm-actions-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
  }

  .sm-action-tab-wrap {
    display: inline-flex;
    align-items: stretch;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--divider-color);
  }

  .sm-action-tab {
    padding: 6px 10px;
    border: none;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-family: inherit;
    font-size: 0.82rem;
    cursor: pointer;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sm-action-tab.is-active {
    background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.15);
    font-weight: 600;
  }

  .sm-action-tab--add {
    border-radius: 8px;
    border: 1px dashed var(--divider-color);
    background: transparent;
  }

  .sm-action-tab-remove {
    padding: 0 6px;
    border: none;
    border-left: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--secondary-text-color);
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
  }

  .sm-action-summary {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--divider-color);
    background: rgba(var(--rgb-primary-text-color, 221, 221, 221), 0.05);
    min-width: 0;
  }

  .sm-action-summary-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    color: var(--primary-color);
    background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.12);
  }

  .sm-action-summary-text {
    min-width: 0;
    flex: 1;
  }

  .sm-action-summary-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--primary-text-color);
    line-height: 1.25;
    word-break: break-word;
  }

  .sm-action-summary-sub {
    margin-top: 4px;
    font-size: 0.78em;
    color: var(--secondary-text-color);
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px;
  }

  .sm-action-tech {
    font-size: 0.85em;
    opacity: 0.85;
    word-break: break-all;
  }

  .sm-action-primary-btn {
    align-self: flex-start;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--primary-color);
    text-decoration: none;
  }

  .sm-action-primary-btn:hover {
    text-decoration: underline;
  }

  .sm-entity-picker-shell {
    display: block;
    width: 100%;
    min-width: 0;
    min-height: 52px;
    box-sizing: border-box;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    padding: 4px 6px;
    background: var(--ha-card-background, var(--card-background-color));
  }

  .sm-entity-picker-shell ha-entity-picker {
    display: block;
    width: 100%;
    min-width: 0;
    min-height: 44px;
  }

  .sm-action-entities-quick {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid var(--divider-color);
  }

  .sm-action-entities-quick-title {
    display: block;
    font-size: 0.78em;
    font-weight: 600;
    color: var(--secondary-text-color);
    margin-bottom: 4px;
  }

  .sm-action-entities-quick-hint {
    margin: 0 0 8px;
    font-size: 0.72em;
    line-height: 1.35;
    color: var(--secondary-text-color);
  }

  .sm-action-entities-quick-hint code {
    font-size: 0.95em;
    word-break: break-all;
  }

  .sm-action-entities-quick-picker {
    display: block;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: 56px;
    margin-top: 8px;
  }

  /* Assistant plein écran au-dessus du modal d’édition */
  .sm-action-wizard-overlay {
    position: fixed;
    inset: 0;
    z-index: 10050;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: max(12px, env(safe-area-inset-top)) 12px 24px;
    box-sizing: border-box;
    overflow: auto;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }

  .sm-action-wizard-panel {
    width: min(100%, 440px);
    max-width: calc(100vw - 24px);
    margin-top: min(10vh, 48px);
    margin-bottom: 24px;
    border-radius: 12px;
    background: var(--card-background-color, var(--ha-card-background, #fff));
    border: 1px solid var(--divider-color);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
    color: var(--primary-text-color);
    box-sizing: border-box;
    overflow: hidden;
  }

  .sm-action-wizard-head {
    display: grid;
    grid-template-columns: 44px 1fr 44px;
    align-items: center;
    gap: 4px;
    padding: 10px 8px 8px;
    border-bottom: 1px solid var(--divider-color);
  }

  .sm-ap-heading {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 600;
    text-align: center;
    line-height: 1.25;
  }

  .sm-ap-nav-btn {
    width: 40px;
    height: 40px;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: var(--primary-text-color);
    font-size: 1.35rem;
    line-height: 1;
    cursor: pointer;
    font-family: inherit;
  }

  .sm-ap-nav-btn:hover:not(:disabled) {
    background: rgba(127, 127, 127, 0.12);
  }

  .sm-ap-nav-btn:disabled {
    opacity: 0.28;
    cursor: default;
  }

  .sm-ap-context {
    margin: 10px 16px 6px;
    font-size: 0.78rem;
    line-height: 1.45;
    color: var(--secondary-text-color);
  }

  .sm-ap-context strong {
    color: var(--primary-text-color);
    font-weight: 600;
  }

  .sm-ap-search {
    display: block;
    width: calc(100% - 32px);
    margin: 0 16px 10px;
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    color: var(--primary-text-color);
    font-family: inherit;
    font-size: 0.95rem;
  }

  .sm-ap-scroll {
    max-height: min(52vh, 440px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 4px 0 12px;
  }

  .sm-ap-row {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 16px;
    margin: 0;
    border: none;
    border-bottom: 1px solid rgba(127, 127, 127, 0.15);
    background: transparent;
    color: var(--primary-text-color);
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    box-sizing: border-box;
  }

  .sm-ap-row:hover {
    background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.06);
  }

  .sm-ap-row-icon {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    color: var(--secondary-text-color);
  }

  .sm-ap-row-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .sm-ap-row-primary {
    font-size: 0.92rem;
    font-weight: 600;
    line-height: 1.25;
    word-break: break-word;
  }

  .sm-ap-row-secondary {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
    word-break: break-all;
    line-height: 1.25;
  }

  .sm-ap-row--dense .sm-ap-row-secondary {
    font-size: 0.68rem;
  }

  .sm-ap-chevron {
    flex-shrink: 0;
    font-size: 1.25rem;
    color: var(--secondary-text-color);
    opacity: 0.65;
    line-height: 1;
  }

  .sm-ap-empty {
    margin: 16px;
    font-size: 0.85rem;
    color: var(--secondary-text-color);
    text-align: center;
  }
`;

/** Décompose `climate.set_preset_mode` → domain + nom court du service. */
function parseDomainService(actionType) {
    const t = actionType.trim();
    if (!t.includes('.')) {
        return null;
    }
    const i = t.indexOf('.');
    const domain = t.slice(0, i).trim();
    const service = t.slice(i + 1).trim();
    if (!domain || !service) {
        return null;
    }
    return { domain, service };
}
/** Entités « hass.services » exposées par Lovelace (schéma HA). */
function servicesForDomain(hass, domain) {
    const raw = hass.services?.[domain];
    if (!raw || typeof raw !== 'object') {
        return [];
    }
    return Object.keys(raw).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}
/** Garde uniquement `entity_id` et la couleur d’affichage (réinitialise le reste au changement de service). */
function stripPayloadForNewService(prevPayload, entityId, colorKey) {
    const out = {};
    if (entityId) {
        out.entity_id = entityId;
    }
    if (prevPayload &&
        typeof prevPayload === 'object' &&
        !Array.isArray(prevPayload)) {
        const c = prevPayload[colorKey];
        if (typeof c === 'string') {
            out[colorKey] = c;
        }
    }
    return out;
}
/** Préréglages utiles quand on arrive sur certains services courants. */
function applyDefaultFieldsForService(domain, service, entityId, payload, hass) {
    if (domain === 'climate' && service === 'set_preset_mode') {
        if (payload.preset_mode !== undefined) {
            return;
        }
        const st = hass.states[entityId];
        const modes = st?.attributes?.preset_modes;
        if (Array.isArray(modes) && modes.length && typeof modes[0] === 'string') {
            payload.preset_mode = modes[0];
        }
        else {
            payload.preset_mode = 'comfort';
        }
        return;
    }
}

/** Libellé FR pour un domaine (navigation type « Thermostat », « Lumière »). */
function domainLabelFr(domain) {
    const map = {
        alarm_control_panel: 'Alarme',
        automation: 'Automatisation',
        binary_sensor: 'Capteur binaire',
        button: 'Bouton',
        camera: 'Caméra',
        climate: 'Climat',
        cover: 'Volet / store',
        fan: 'Ventilateur',
        humidifier: 'Humidificateur',
        input_boolean: 'Interrupteur virtuel',
        input_button: 'Bouton virtuel',
        input_number: 'Nombre',
        input_select: 'Liste déroulante',
        input_text: 'Texte',
        light: 'Lumière',
        lock: 'Serrure',
        media_player: 'Média',
        number: 'Nombre',
        scene: 'Scène',
        script: 'Script',
        select: 'Liste',
        sensor: 'Capteur',
        switch: 'Interrupteur',
        sun: 'Soleil',
        update: 'Mise à jour',
        vacuum: 'Aspirateur',
        valve: 'Vanne',
        water_heater: 'Chauffe-eau',
        weather: 'Météo',
        zone: 'Zone',
    };
    return map[domain] ?? domain.replace(/_/g, ' ');
}
function domainIcon(domain) {
    const map = {
        alarm_control_panel: 'mdi:shield-home',
        automation: 'mdi:robot',
        binary_sensor: 'mdi:toggle-switch',
        button: 'mdi:gesture-tap-button',
        camera: 'mdi:cctv',
        climate: 'mdi:thermostat',
        cover: 'mdi:window-open',
        fan: 'mdi:fan',
        humidifier: 'mdi:air-humidifier',
        input_boolean: 'mdi:toggle-switch-outline',
        input_button: 'mdi:gesture-tap',
        input_number: 'mdi:numeric',
        input_select: 'mdi:format-list-bulleted',
        input_text: 'mdi:form-textbox',
        light: 'mdi:lightbulb',
        lock: 'mdi:lock',
        media_player: 'mdi:speaker',
        number: 'mdi:numeric',
        scene: 'mdi:palette',
        script: 'mdi:script-text',
        select: 'mdi:format-list-checkbox',
        sensor: 'mdi:eye',
        switch: 'mdi:light-switch',
        vacuum: 'mdi:robot-vacuum',
        valve: 'mdi:pipe-valve',
        water_heater: 'mdi:water-boiler',
        weather: 'mdi:weather-partly-cloudy',
    };
    return map[domain] ?? 'mdi:shape-outline';
}
/** Titre principal pour une ligne de service (FR quand on connaît le couple domain/service). */
function servicePrimaryLabel(domain, service) {
    const known = {
        'climate.turn_on': 'Allumer',
        'climate.turn_off': 'Éteindre',
        'climate.toggle': 'Basculer',
        'climate.set_preset_mode': 'Choisir un mode préréglé',
        'climate.set_temperature': 'Régler la température',
        'climate.set_hvac_mode': 'Régler le mode HVAC',
        'climate.set_fan_mode': 'Régler le mode ventilation',
        'light.turn_on': 'Allumer',
        'light.turn_off': 'Éteindre',
        'light.toggle': 'Basculer',
        'switch.turn_on': 'Allumer',
        'switch.turn_off': 'Éteindre',
        'switch.toggle': 'Basculer',
        'fan.turn_on': 'Allumer',
        'fan.turn_off': 'Éteindre',
        'cover.open_cover': 'Ouvrir',
        'cover.close_cover': 'Fermer',
        'cover.stop_cover': 'Arrêter',
        'cover.set_cover_position': 'Régler la position',
        'lock.lock': 'Verrouiller',
        'lock.unlock': 'Déverrouiller',
        'media_player.media_play': 'Lecture',
        'media_player.media_pause': 'Pause',
        'media_player.turn_on': 'Allumer',
        'media_player.turn_off': 'Éteindre',
        'vacuum.start': 'Démarrer',
        'vacuum.pause': 'Pause',
        'vacuum.return_to_base': 'Retour à la base',
        'script.turn_on': 'Exécuter',
        'scene.turn_on': 'Activer la scène',
        'input_boolean.turn_on': 'Activer',
        'input_boolean.turn_off': 'Désactiver',
        'input_boolean.toggle': 'Basculer',
        'humidifier.set_humidity': 'Régler l’humidité',
        'humidifier.turn_on': 'Allumer',
        'humidifier.turn_off': 'Éteindre',
        'water_heater.set_temperature': 'Régler la température',
    };
    const k = `${domain}.${service}`;
    if (known[k]) {
        return known[k];
    }
    const t = service.replace(/_/g, ' ');
    return t.charAt(0).toUpperCase() + t.slice(1);
}
function serviceSecondaryHint(domain, service) {
    return `${domain}.${service}`;
}
function friendlyEntityName(hass, entityId) {
    const fn = hass.states[entityId]?.attributes?.friendly_name;
    return typeof fn === 'string' && fn.trim() ? fn.trim() : entityId;
}
function entityIcon(hass, entityId) {
    const ic = hass.states[entityId]?.attributes?.icon;
    return typeof ic === 'string' ? ic : undefined;
}
/** Domaines ayant au moins une entité et des services HA connus. */
function listSelectableDomains(hass) {
    const svc = hass.services || {};
    const doms = new Set();
    for (const eid of Object.keys(hass.states)) {
        const d = eid.includes('.') ? eid.split('.')[0] ?? '' : '';
        if (!d || !svc[d] || Object.keys(svc[d]).length === 0) {
            continue;
        }
        doms.add(d);
    }
    return [...doms].sort((a, b) => domainLabelFr(a).localeCompare(domainLabelFr(b), 'fr', { sensitivity: 'base' }));
}
function listEntitiesInDomain(hass, domain) {
    const prefix = `${domain}.`;
    return Object.keys(hass.states)
        .filter((id) => id.startsWith(prefix))
        .sort((a, b) => friendlyEntityName(hass, a).localeCompare(friendlyEntityName(hass, b), 'fr', {
        sensitivity: 'base',
    }));
}

/**
 * Déduit les domaines d’entités « compatibles » avec un type d’action HA.
 * Si `domain.service` est fourni, un seul domaine ; sinon heuristiques pour les noms de service seuls.
 */
function domainsForActionType(actionType) {
    const t = actionType.trim().toLowerCase();
    if (!t) {
        return [];
    }
    if (t.includes('.')) {
        const dom = t.split('.')[0];
        return dom ? [dom] : [];
    }
    const map = {
        set_preset_mode: ['climate'],
        set_temperature: ['climate'],
        set_hvac_mode: ['climate'],
        turn_on: ['switch', 'light', 'climate', 'input_boolean', 'group', 'fan'],
        turn_off: ['switch', 'light', 'climate', 'input_boolean', 'group', 'fan'],
        toggle: ['switch', 'light', 'input_boolean'],
        open_cover: ['cover'],
        close_cover: ['cover'],
        set_cover_position: ['cover'],
        stop_cover: ['cover'],
        lock: ['lock'],
        unlock: ['lock'],
        alarm_arm_home: ['alarm_control_panel'],
        alarm_arm_away: ['alarm_control_panel'],
        alarm_disarm: ['alarm_control_panel'],
    };
    return map[t] ?? [];
}
function isClimateSetPresetModeAction(actionType) {
    const t = String(actionType ?? '').trim().toLowerCase();
    if (t === 'set_preset_mode') {
        return true;
    }
    return t === 'climate.set_preset_mode';
}
function isClimateSetHvacModeAction(actionType) {
    const t = String(actionType ?? '').trim().toLowerCase();
    if (t === 'set_hvac_mode') {
        return true;
    }
    return t === 'climate.set_hvac_mode';
}
/** Climat avec au moins un mode préréglé exposé par HA (sinon `set_preset_mode` n’a pas de sens). */
function climateEntityHasPresetModes(hass, entityId) {
    if (!entityId.startsWith('climate.')) {
        return false;
    }
    const pm = hass.states[entityId]?.attributes?.preset_modes;
    return (Array.isArray(pm) &&
        pm.length > 0 &&
        pm.every((x) => typeof x === 'string'));
}
/** Climat avec au moins un mode HVAC exposé (`hvac_modes` non vide). */
function climateEntityHasHvacModes(hass, entityId) {
    if (!entityId.startsWith('climate.')) {
        return false;
    }
    const hm = hass.states[entityId]?.attributes?.hvac_modes;
    return (Array.isArray(hm) &&
        hm.length > 0 &&
        hm.every((x) => typeof x === 'string'));
}
/**
 * Indique si une entité peut être associée à une action `domain.service`.
 * Comportement strict : si la carte ne connaît pas le service, on se rabat sur l’égalité
 * du domaine de l’entité avec le domaine du service (jamais « tout autoriser »).
 *
 * @param hass — si fourni, filtres supplémentaires pour certains services climate
 *   (`preset_modes` / `hvac_modes` non vides).
 */
function entityCompatibleWithAction(entityId, actionType, hass) {
    if (!entityId.includes('.')) {
        return false;
    }
    const entityDom = entityId.split('.')[0] ?? '';
    const t = String(actionType ?? '').trim().toLowerCase();
    if (!t) {
        return false;
    }
    let baseOk = false;
    const compat = domainsForActionType(t);
    if (compat.length > 0) {
        baseOk = compat.includes(entityDom);
    }
    else {
        const firstDot = t.indexOf('.');
        if (firstDot > 0) {
            const serviceDomain = t.slice(0, firstDot);
            baseOk = entityDom === serviceDomain;
        }
    }
    if (!baseOk) {
        return false;
    }
    if (hass && entityDom === 'climate') {
        if (isClimateSetPresetModeAction(t)) {
            return climateEntityHasPresetModes(hass, entityId);
        }
        if (isClimateSetHvacModeAction(t)) {
            return climateEntityHasHvacModes(hass, entityId);
        }
    }
    return true;
}

/**
 * HA ≥ 2024 : `ha-entity-picker.entityFilter` reçoit un `HassEntity` (objet avec `entity_id`),
 * pas uniquement une chaîne `entity_id`.
 */
function entityIdFromPickerFilterArgument(raw) {
    if (typeof raw === 'string' && raw.includes('.')) {
        return raw;
    }
    if (raw && typeof raw === 'object' && 'entity_id' in raw) {
        const id = raw.entity_id;
        if (typeof id === 'string' && id.includes('.')) {
            return id;
        }
    }
    return '';
}

const MINUTES_PER_DAY = 24 * 60;
/**
 * Dernière heure acceptée par Home Assistant `cv.time` (pas de 24:00:00 dans les services).
 * Utilisée pour fin de journée / drag maximal.
 */
const HA_END_OF_DAY_TIME = '23:59:59';
/** Aligné sur l’usage du scheduler-card (pas de 15 min pour le drag des séparateurs). */
const TIMELINE_DRAG_SNAP_MINUTES = 15;
function snapMinutesToGrid(totalMinutes, stepMinutes) {
    if (stepMinutes <= 1) {
        return Math.round(totalMinutes);
    }
    return Math.round(totalMinutes / stepMinutes) * stepMinutes;
}
const DEFAULT_TIMELINE_SCALE_TICKS = [
    { pct: 0, label: '00:00', align: 'start' },
    { pct: 25, label: '06:00', align: 'center' },
    { pct: 50, label: '12:00', align: 'center' },
    { pct: 75, label: '18:00', align: 'center' },
    { pct: 100, label: '24:00', align: 'end' },
];
/**
 * Heures affichées sous la frise selon la largeur (même logique que scheduler-card :
 * éviter les étiquettes trop serrées sur petit écran).
 */
function timelineScaleTicksForWidth(widthPx) {
    if (!widthPx || widthPx < 120) {
        return DEFAULT_TIMELINE_SCALE_TICKS;
    }
    const allowedStepHours = [1, 2, 3, 4, 6, 8, 12];
    const targetPxPerHour = 100;
    let stepH = Math.ceil(24 / (widthPx / targetPxPerHour));
    if (stepH < 1) {
        stepH = 1;
    }
    while (stepH <= 24 && !allowedStepHours.includes(stepH)) {
        stepH++;
    }
    if (stepH > 12) {
        stepH = 12;
    }
    const inner = Math.max(0, Math.floor(24 / stepH) - 1);
    const nums = [
        0,
        ...Array.from({ length: inner }, (_, i) => (i + 1) * stepH),
        24,
    ];
    const uniq = [...new Set(nums)].sort((a, b) => a - b);
    return uniq.map((h, i) => ({
        pct: (h / 24) * 100,
        label: h === 24 ? '24:00' : `${String(h).padStart(2, '0')}:00`,
        align: i === 0 ? 'start' : i === uniq.length - 1 ? 'end' : 'center',
    }));
}
/** Métadonnée carte uniquement — à retirer si le payload est passé tel quel à un service HA. */
const SCHEDULE_MANAGER_COLOR_KEY = 'schedule_manager_color';
function parseToMinutes(t) {
    const parts = String(t).split(':').map((p) => Number(p));
    const h = parts[0] ?? 0;
    const m = parts[1] ?? 0;
    const s = parts[2] ?? 0;
    return h * 60 + m + s / 60;
}
/** Exposé pour le drag de plage / tests (même moteur que la frise). */
function timeStringToMinutes(t) {
    return parseToMinutes(t);
}
function segmentLabelOne(action) {
    if (!String(action.action_type ?? '').trim()) {
        return '—';
    }
    const p = action.action_payload;
    if (p && typeof p === 'object') {
        const rec = p;
        if (rec.preset_mode !== undefined) {
            return String(rec.preset_mode);
        }
        if (rec.hvac_mode !== undefined) {
            return String(rec.hvac_mode);
        }
        if (rec.position !== undefined) {
            return `${String(rec.position)}%`;
        }
    }
    const segs = action.action_type.split('.');
    const tail = action.action_type.includes('.')
        ? segs[segs.length - 1] ?? action.action_type
        : action.action_type;
    return tail.length > 14 ? `${tail.slice(0, 12)}…` : tail;
}
function segmentLabel(block) {
    const actions = block.actions || [];
    const configured = actions.filter((a) => String(a.action_type ?? '').trim());
    if (configured.length === 0) {
        return '—';
    }
    const labels = configured.map((a) => segmentLabelOne(a));
    if (labels.length === 1) {
        return labels[0] ?? '—';
    }
    const first = labels[0] ?? '—';
    const suffix = ` +${labels.length - 1}`;
    const maxMain = Math.max(4, 14 - suffix.length);
    if (first.length > maxMain) {
        return `${first.slice(0, maxMain)}…${suffix}`;
    }
    return `${first}${suffix}`;
}
function hueFromLabel(label) {
    let h = 0;
    for (let i = 0; i < label.length; i++) {
        h = (h * 31 + label.charCodeAt(i)) % 360;
    }
    return h;
}
/** Même teinte que les segments de la frise (pastilles liste / barres). */
function hueForBlock(block) {
    const label = segmentLabel(block);
    const key = (block.actions || [])
        .map((a) => a.action_type)
        .filter(Boolean)
        .join(',');
    return hueFromLabel(`${label}-${key}`);
}
/** Couleur de remplissage segment (#hex ou hsl dérivé du bloc). */
function blockTimelineFill(block) {
    for (const a of block.actions || []) {
        const p = a.action_payload;
        if (p && typeof p === 'object') {
            const raw = p[SCHEDULE_MANAGER_COLOR_KEY];
            if (typeof raw === 'string') {
                const c = raw.trim();
                if (/^#[0-9A-Fa-f]{6}$/.test(c)) {
                    return c;
                }
                if (/^#[0-9A-Fa-f]{3}$/.test(c)) {
                    const h = c.slice(1);
                    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
                }
            }
        }
    }
    return `hsl(${hueForBlock(block)}, 58%, 42%)`;
}
/**
 * Découpe les plages en segments sur une journée (0:00–24:00), gère le passage minuit.
 */
function blocksToTimelineSegments(blocks) {
    const out = [];
    const day = MINUTES_PER_DAY;
    const list = blocks || [];
    for (let bi = 0; bi < list.length; bi++) {
        const b = list[bi];
        const start = parseToMinutes(b.start_time);
        const end = parseToMinutes(b.end_time);
        const label = segmentLabel(b);
        const hue = hueForBlock(b);
        if (end > start) {
            const w = end - start;
            out.push({
                leftPct: (start / day) * 100,
                widthPct: (w / day) * 100,
                label,
                hue,
                blockIndex: bi,
            });
        }
        else if (end < start) {
            const w1 = day - start;
            const w2 = end;
            out.push({
                leftPct: (start / day) * 100,
                widthPct: (w1 / day) * 100,
                label,
                hue,
                blockIndex: bi,
            });
            out.push({
                leftPct: 0,
                widthPct: (w2 / day) * 100,
                label,
                hue,
                blockIndex: bi,
            });
        }
    }
    return out;
}
function nowPercentOfDay() {
    const d = new Date();
    const m = d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;
    return (m / MINUTES_PER_DAY) * 100;
}
/** Pour le drag sur la frise : minute ≥ fin de journée → `HA_END_OF_DAY_TIME` (pas 24:00:00). */
function minuteToHaTimeForSchedule(totalMinutes) {
    const r = Math.round(totalMinutes);
    if (r >= MINUTES_PER_DAY) {
        return HA_END_OF_DAY_TIME;
    }
    if (r <= 0) {
        return '00:00:00';
    }
    const h = Math.floor(r / 60);
    const mm = r % 60;
    return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}:00`;
}
function isOvernightBlock(b) {
    const s = parseToMinutes(b.start_time);
    const e = parseToMinutes(b.end_time);
    return e < s;
}
/** Intervalle [start, end) en minutes sur une même journée (pas de passage minuit). */
function sameDayBlockIntervalExclusiveEnd(b) {
    if (isOvernightBlock(b)) {
        return null;
    }
    const s = Math.round(parseToMinutes(b.start_time));
    const e = Math.round(parseToMinutes(b.end_time));
    if (e <= s) {
        return null;
    }
    return { start: s, end: e };
}
/**
 * Détecte un chevauchement entre plages « même jour » (intervalles [début, fin) en minutes).
 * Utilisé pour empêcher deux créneaux actifs au même moment.
 */
function hasOverlappingSameDayBlocks(blocks) {
    const intervals = [];
    for (const b of blocks || []) {
        const iv = sameDayBlockIntervalExclusiveEnd(b);
        if (iv) {
            intervals.push(iv);
        }
    }
    intervals.sort((a, b) => a.start - b.start);
    for (let i = 0; i < intervals.length - 1; i++) {
        if (intervals[i].end > intervals[i + 1].start) {
            return true;
        }
    }
    return false;
}
/** Trouve un créneau libre d’au moins `minDurationMinutes` minutes pour une nouvelle plage. */
function suggestGapIntervalMinutes(blocks, minDurationMinutes = 60) {
    const minDur = Math.max(TIMELINE_DRAG_SNAP_MINUTES, minDurationMinutes);
    const intervals = [];
    for (const b of blocks || []) {
        const iv = sameDayBlockIntervalExclusiveEnd(b);
        if (iv) {
            intervals.push(iv);
        }
    }
    intervals.sort((a, b) => a.start - b.start);
    let prevEnd = 0;
    for (const iv of intervals) {
        if (iv.start - prevEnd >= minDur) {
            return { start: prevEnd, end: prevEnd + minDur };
        }
        prevEnd = Math.max(prevEnd, iv.end);
    }
    if (MINUTES_PER_DAY - prevEnd >= minDur) {
        return { start: prevEnd, end: prevEnd + minDur };
    }
    if (minDur > TIMELINE_DRAG_SNAP_MINUTES) {
        return suggestGapIntervalMinutes(blocks, TIMELINE_DRAG_SNAP_MINUTES);
    }
    return null;
}
/**
 * Journée déjà couverte sans trou utilisable : insère une plage en tête [0, slotM)
 * soit en décalant le début de la première plage « même jour » qui commence à minuit,
 * soit si la première plage commence plus tard avec un trou ≥ slot avant elle.
 */
function tryInsertSlotAtDayStart(blocks, slotMinutes = TIMELINE_DRAG_SNAP_MINUTES) {
    const slot = Math.max(1, Math.round(slotMinutes));
    const list = blocks || [];
    const indexed = list
        .map((b, i) => ({ i, b, iv: sameDayBlockIntervalExclusiveEnd(b) }))
        .filter((x) => x.iv !== null)
        .sort((a, b) => a.iv.start - b.iv.start || a.iv.end - b.iv.end);
    if (!indexed.length) {
        return null;
    }
    const first = indexed[0];
    const newBlock = () => ({
        start_time: '00:00:00',
        end_time: minuteToHaTimeForSchedule(slot),
        actions: [newEmptyAction()],
    });
    if (first.iv.start >= slot) {
        const withNew = [newBlock(), ...list];
        return hasOverlappingSameDayBlocks(withNew) ? null : withNew;
    }
    if (first.iv.start === 0 && first.iv.end - first.iv.start > slot) {
        const trimmed = {
            ...first.b,
            start_time: minuteToHaTimeForSchedule(slot),
        };
        const mapped = list.map((b, j) => (j === first.i ? trimmed : b));
        const withNew = [newBlock(), ...mapped];
        return hasOverlappingSameDayBlocks(withNew) ? null : withNew;
    }
    return null;
}
/**
 * Indices des plages « même jour » (autres que `excludeIndex`) dont l’intervalle [s,e)
 * intersecte [startM, endM) (demi-ouvert).
 */
function blockIndicesOverlappingIntervalSameDay(blocks, excludeIndex, startM, endM) {
    const out = [];
    for (let i = 0; i < (blocks || []).length; i++) {
        if (i === excludeIndex) {
            continue;
        }
        const iv = sameDayBlockIntervalExclusiveEnd(blocks[i]);
        if (!iv) {
            continue;
        }
        if (iv.start < endM && iv.end > startM) {
            out.push(i);
        }
    }
    return out;
}
/**
 * Applique le déplacement d’une plage ; si cela crée un chevauchement avec **une seule** autre plage,
 * échange les créneaux horaires (l’autre prend l’ancien créneau de la plage déplacée).
 * Sinon retourne `null` (mouvement refusé).
 */
function applyDragMoveWithOptionalSwap(blocks, dragIdx, newStartM, newEndM, origStartM, origEndM) {
    const list = blocks || [];
    if (newEndM <= newStartM || origEndM <= origStartM) {
        return null;
    }
    const cur = list[dragIdx];
    if (!cur || isOvernightBlock(cur)) {
        return null;
    }
    const moved = {
        ...cur,
        start_time: minuteToHaTimeForSchedule(newStartM),
        end_time: minuteToHaTimeForSchedule(newEndM),
    };
    const trial = list.map((b, i) => (i === dragIdx ? moved : b));
    if (!hasOverlappingSameDayBlocks(trial)) {
        return trial;
    }
    const overlaps = blockIndicesOverlappingIntervalSameDay(trial, dragIdx, newStartM, newEndM);
    if (overlaps.length !== 1) {
        return null;
    }
    const j = overlaps[0];
    const other = list[j];
    if (!other || isOvernightBlock(other)) {
        return null;
    }
    const swapped = list.map((b, i) => {
        if (i === dragIdx) {
            return moved;
        }
        if (i === j) {
            return {
                ...other,
                start_time: minuteToHaTimeForSchedule(origStartM),
                end_time: minuteToHaTimeForSchedule(origEndM),
            };
        }
        return b;
    });
    return hasOverlappingSameDayBlocks(swapped) ? null : swapped;
}
function touchBoundariesBetweenBlocks(blocks) {
    const list = blocks || [];
    const segments = blocksToTimelineSegments(list);
    if (segments.length < 2) {
        return [];
    }
    const sorted = [...segments].sort((a, b) => a.leftPct - b.leftPct);
    const eps = 0.12;
    const out = [];
    for (let i = 0; i < sorted.length - 1; i++) {
        const a = sorted[i];
        const b = sorted[i + 1];
        const endA = a.leftPct + a.widthPct;
        if (Math.abs(endA - b.leftPct) > eps) {
            continue;
        }
        if (a.blockIndex === b.blockIndex) {
            continue;
        }
        const L = list[a.blockIndex];
        const R = list[b.blockIndex];
        if (!L || !R || isOvernightBlock(L) || isOvernightBlock(R)) {
            continue;
        }
        const minM = Math.floor(parseToMinutes(L.start_time)) + 1;
        const maxM = Math.ceil(parseToMinutes(R.end_time)) - 1;
        if (minM >= maxM) {
            continue;
        }
        const boundaryMin = Math.round((parseToMinutes(L.end_time) + parseToMinutes(R.start_time)) / 2);
        const pct = (boundaryMin / MINUTES_PER_DAY) * 100;
        out.push({
            pct,
            leftBlockIndex: a.blockIndex,
            rightBlockIndex: b.blockIndex,
            minMinute: minM,
            maxMinute: maxM,
        });
    }
    return out;
}
/**
 * Toutes les poignées redimensionnement : jonctions entre blocs adjacents + début/fin libres.
 * Sans cela, une seule plage ou des plages séparées par un trou n’avaient aucune poignée.
 */
function allTimelineResizeHandles(blocks) {
    const list = blocks || [];
    const internals = touchBoundariesBetweenBlocks(list);
    const junctionMinutes = new Set();
    for (const tb of internals) {
        const L = list[tb.leftBlockIndex];
        if (L) {
            junctionMinutes.add(Math.round(parseToMinutes(L.end_time)));
        }
    }
    const out = internals.map((tb) => ({
        kind: 'junction',
        pct: tb.pct,
        leftBlockIndex: tb.leftBlockIndex,
        rightBlockIndex: tb.rightBlockIndex,
        minMinute: tb.minMinute,
        maxMinute: tb.maxMinute,
    }));
    const gap = TIMELINE_DRAG_SNAP_MINUTES;
    for (let i = 0; i < list.length; i++) {
        const b = list[i];
        if (isOvernightBlock(b)) {
            continue;
        }
        const sm = Math.round(parseToMinutes(b.start_time));
        const em = Math.round(parseToMinutes(b.end_time));
        if (!junctionMinutes.has(sm)) {
            const maxStart = em - gap;
            if (maxStart >= 0 && sm <= maxStart) {
                out.push({
                    kind: 'start',
                    pct: (sm / MINUTES_PER_DAY) * 100,
                    blockIndex: i,
                    minMinute: 0,
                    maxMinute: maxStart,
                });
            }
        }
        if (!junctionMinutes.has(em)) {
            const minEnd = sm + gap;
            if (minEnd <= MINUTES_PER_DAY) {
                out.push({
                    kind: 'end',
                    pct: Math.min(100, (em / MINUTES_PER_DAY) * 100),
                    blockIndex: i,
                    minMinute: minEnd,
                    maxMinute: MINUTES_PER_DAY,
                });
            }
        }
    }
    out.sort((a, b) => a.pct - b.pct);
    return out;
}
/** Poignées uniquement pour la plage sélectionnée (on ne redimensionne pas les autres). */
function timelineResizeHandlesForSelection(blocks, selectedIndex) {
    return allTimelineResizeHandles(blocks).filter((h) => {
        if (h.kind === 'junction') {
            return h.leftBlockIndex === selectedIndex || h.rightBlockIndex === selectedIndex;
        }
        return h.blockIndex === selectedIndex;
    });
}

let ScheduleManagerCardEditor = class ScheduleManagerCardEditor extends s$1 {
    constructor() {
        super(...arguments);
        /** True si l’utilisateur a vidé le capteur — ne pas réappliquer le défaut automatiquement. */
        this._userClearedStatusEntity = false;
        /** Réduit la liste aux capteurs « Schedule Manager » (nom ou attribut schedules). */
        this._statusEntityFilter = (entity) => {
            const entityId = entityIdFromPickerFilterArgument(entity);
            if (!entityId) {
                return false;
            }
            if (entityId === SCHEDULE_MANAGER_STATUS_ENTITY_ID) {
                return true;
            }
            if (entityId.includes('schedule_manager')) {
                return true;
            }
            const st = this.hass?.states[entityId];
            const attrs = st?.attributes;
            const schedules = attrs?.schedules;
            return (schedules != null &&
                typeof schedules === 'object' &&
                !Array.isArray(schedules));
        };
    }
    setConfig(config) {
        this._config = {
            ...config,
            type: 'custom:schedule-manager-card',
        };
        this.config = this._config;
        this._userClearedStatusEntity = false;
    }
    willUpdate(changed) {
        super.willUpdate(changed);
        // Certains flux HA posent uniquement la propriété `config` sans rappeler setConfig.
        if (changed.has('config') && this.config) {
            this._config = {
                ...this.config,
                type: 'custom:schedule-manager-card',
            };
        }
    }
    updated(changed) {
        super.updated(changed);
        if (changed.has('hass') || changed.has('config') || changed.has('_config')) {
            this._maybeApplyDefaultStatusEntity();
        }
    }
    /** Présélectionne le capteur d’état standard si aucun n’est configuré et qu’il existe. */
    _maybeApplyDefaultStatusEntity() {
        if (this._userClearedStatusEntity || !this.hass) {
            return;
        }
        if (!this.hass.states[SCHEDULE_MANAGER_STATUS_ENTITY_ID]) {
            return;
        }
        if (this._config?.status_entity?.trim()) {
            return;
        }
        this._patchConfig({ status_entity: SCHEDULE_MANAGER_STATUS_ENTITY_ID });
    }
    _resolvedStatusEntityId() {
        return this._config?.status_entity?.trim() || SCHEDULE_MANAGER_STATUS_ENTITY_ID;
    }
    /** Valeur affichée dans le sélecteur (vide si l’utilisateur a explicitement retiré le capteur). */
    _statusEntityPickerValue() {
        const v = this._config?.status_entity?.trim();
        if (v) {
            return v;
        }
        if (this._userClearedStatusEntity) {
            return '';
        }
        return SCHEDULE_MANAGER_STATUS_ENTITY_ID;
    }
    _schedulesRecord() {
        const st = this.hass?.states[this._resolvedStatusEntityId()];
        const raw = st?.attributes?.schedules;
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
            return {};
        }
        return raw;
    }
    _scheduleEntries() {
        const rec = this._schedulesRecord();
        return Object.entries(rec)
            .map(([id, sch]) => ({
            id,
            name: typeof sch?.name === 'string' && sch.name.trim() ? sch.name.trim() : id,
        }))
            .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
    }
    _allScheduleIds() {
        return this._scheduleEntries().map((e) => e.id);
    }
    /** Filtrage actif uniquement si `schedule_ids` est une liste non vide. */
    _isScheduleChecked(scheduleId) {
        const explicit = this._config?.schedule_ids;
        if (!explicit || explicit.length === 0) {
            return true;
        }
        return explicit.includes(scheduleId);
    }
    _onScheduleCheck(ev, scheduleId) {
        const t = ev.currentTarget;
        const checked = t.checked;
        const allIds = this._allScheduleIds();
        if (allIds.length === 0) {
            return;
        }
        const explicit = this._config?.schedule_ids;
        const selected = new Set(explicit && explicit.length > 0 ? explicit : allIds);
        if (checked) {
            selected.add(scheduleId);
        }
        else {
            if (selected.size <= 1) {
                t.checked = true;
                return;
            }
            selected.delete(scheduleId);
        }
        const arr = Array.from(selected).sort();
        const allOn = arr.length === allIds.length && allIds.every((id) => selected.has(id));
        this._patchConfig({
            schedule_ids: allOn ? undefined : arr,
        });
    }
    render() {
        const hass = this.hass;
        if (!hass) {
            return x `<div class="card-config">Chargement du tableau de bord…</div>`;
        }
        const entries = this._scheduleEntries();
        const entityMissing = !hass.states[this._resolvedStatusEntityId()];
        return x `
      <div class="card-config">
        <div class="field-block">
          <ha-entity-picker
            .hass=${hass}
            label="Capteur d’état Schedule Manager"
            .value=${this._statusEntityPickerValue()}
            .includeDomains=${['sensor']}
            .entityFilter=${this._statusEntityFilter}
            .allowCustomEntity=${true}
            @value-changed=${this._statusEntityChanged}
          ></ha-entity-picker>
          <p class="hint">
            En général une seule entité :
            <code class="inline">${SCHEDULE_MANAGER_STATUS_ENTITY_ID}</code>
            (présélectionnée si elle existe). Autre capteur seulement si vous avez plusieurs entrées
            Schedule Manager.
          </p>
        </div>
        <div class="field-block">
          <ha-textfield
            label="ID de groupe (optionnel)"
            .value=${this._config?.group_id ?? ''}
            @input=${this._groupIdChanged}
          ></ha-textfield>
          <p class="hint">
            UUID d’un groupe exclusif pour n’afficher que ce groupe. Vide = liste de plannings
            ci‑dessous.
          </p>
        </div>
        <div class="field-block">
          ${entityMissing
            ? x `
                <p class="hint">
                  Capteur
                  <code class="inline">${this._resolvedStatusEntityId()}</code>
                  introuvable — vérifiez l’intégration Schedule Manager.
                </p>
              `
            : entries.length === 0
                ? x `
                  <p class="hint">
                    Aucun planning dans les attributs du capteur pour l’instant. Créez un planning
                    depuis la carte ou le service
                    <code class="inline">schedule_manager.create_schedule</code>.
                  </p>
                `
                : x `
                  <div class="schedule-list-title">Plannings à afficher sur la carte</div>
                  <p class="hint">
                    Toutes les cases cochées = afficher tous les plannings. Décochez pour masquer un
                    planning (au moins un reste visible).
                  </p>
                  <div class="schedule-list">
                    ${entries.map((row) => x `
                        <ha-formfield label=${row.name}>
                          <ha-checkbox
                            .checked=${this._isScheduleChecked(row.id)}
                            @change=${(e) => this._onScheduleCheck(e, row.id)}
                          ></ha-checkbox>
                        </ha-formfield>
                      `)}
                  </div>
                `}
        </div>
      </div>
    `;
    }
    _patchConfig(patch) {
        this._config = {
            type: 'custom:schedule-manager-card',
            ...(this._config ?? {}),
            ...patch,
        };
        this.dispatchEvent(new CustomEvent('config-changed', {
            bubbles: true,
            composed: true,
            detail: { config: this._config },
        }));
    }
    _statusEntityChanged(ev) {
        const value = String(ev.detail?.value ?? '').trim();
        if (!value) {
            this._userClearedStatusEntity = true;
            this._patchConfig({ status_entity: undefined });
            return;
        }
        this._userClearedStatusEntity = false;
        this._patchConfig({ status_entity: value });
    }
    _groupIdChanged(ev) {
        const value = (ev.target.value ?? '').trim();
        this._patchConfig({ group_id: value || undefined });
    }
};
ScheduleManagerCardEditor.styles = i$4 `
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }
    ha-entity-picker,
    ha-textfield {
      display: block;
      width: 100%;
    }
    .field-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .hint {
      margin: 0;
      font-size: 0.82rem;
      line-height: 1.45;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
    }
    code.inline {
      font-size: 0.85em;
      padding: 1px 5px;
      border-radius: 4px;
      background: rgba(127, 127, 127, 0.2);
      word-break: break-all;
    }
    .schedule-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 4px;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: rgba(var(--rgb-primary-text-color, 221, 221, 221), 0.04);
    }
    .schedule-list-title {
      font-size: 0.88rem;
      font-weight: 600;
      margin-bottom: 6px;
      color: var(--primary-text-color);
    }
    ha-formfield {
      --mdc-theme-text-primary-on-background: var(--primary-text-color);
    }
  `;
__decorate([
    n$2({ attribute: false })
], ScheduleManagerCardEditor.prototype, "hass", void 0);
__decorate([
    n$2({ attribute: false })
], ScheduleManagerCardEditor.prototype, "config", void 0);
__decorate([
    t()
], ScheduleManagerCardEditor.prototype, "_config", void 0);
__decorate([
    t()
], ScheduleManagerCardEditor.prototype, "_userClearedStatusEntity", void 0);
ScheduleManagerCardEditor = __decorate([
    e$1('schedule-manager-card-editor')
], ScheduleManagerCardEditor);

const WEEKDAY_LABELS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
/** Pastilles de couleur rapides (+ valeur du sélecteur). */
const BLOCK_COLOR_PRESETS = [
    '#2196F3',
    '#4CAF50',
    '#FF9800',
    '#9C27B0',
    '#00BCD4',
    '#E91E63',
    '#795548',
    '#607D8B',
];
function payloadWithoutEntityId(payload) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        return {};
    }
    const rec = { ...payload };
    delete rec.entity_id;
    return rec;
}
/** Empêcher qu’une même couleur fasse doublon avec une autre plage identique en action. */
function payloadForDuplicateCheck(payload) {
    const rec = payloadWithoutEntityId(payload);
    delete rec[SCHEDULE_MANAGER_COLOR_KEY];
    return rec;
}
function entityIdsFromPayload(payload) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        return [];
    }
    const e = payload.entity_id;
    if (typeof e === 'string') {
        return [e];
    }
    if (Array.isArray(e)) {
        return e.filter((x) => typeof x === 'string');
    }
    return [];
}
/** Ouverture éditeur ou planning vide : une plage couvrant la journée, action à définir par l’assistant. */
function defaultFullDayBlock() {
    return {
        start_time: '00:00:00',
        end_time: HA_END_OF_DAY_TIME,
        actions: [newEmptyAction()],
    };
}
function findDuplicateBlockIndex(blocks) {
    const seen = new Set();
    for (let i = 0; i < blocks.length; i++) {
        const fp = blockFingerprint(blocks[i]);
        if (seen.has(fp)) {
            return i;
        }
        seen.add(fp);
    }
    return -1;
}
/** Format HH:MM[:SS] pour les services HA (évite `<input type="time">` = crash app Mac Catalyst). */
function normalizeTimeForHa(t) {
    const s = t.trim();
    if (!s) {
        return '00:00:00';
    }
    const p = s.split(':').map((x) => x.trim());
    if (p.length < 2) {
        return '00:00:00';
    }
    const hRaw = parseInt(p[0] ?? '0', 10);
    const mRaw = parseInt(p[1] ?? '0', 10);
    if (Number.isNaN(hRaw) || Number.isNaN(mRaw)) {
        return '00:00:00';
    }
    const secRaw = p[2] !== undefined && p[2] !== ''
        ? parseInt(p[2] ?? '0', 10)
        : 0;
    const sec = p[2] !== undefined && p[2] !== ''
        ? Number.isNaN(secRaw)
            ? 0
            : Math.min(59, Math.max(0, secRaw))
        : 0;
    /** `cv.time` n’accepte pas 24:00:00 — tout instant ≥ fin de journée → dernière seconde HA. */
    const totalMinutes = hRaw * 60 + mRaw + sec / 60;
    if (totalMinutes >= MINUTES_PER_DAY) {
        return HA_END_OF_DAY_TIME;
    }
    const h = Math.min(23, Math.max(0, hRaw));
    const m = Math.min(59, Math.max(0, mRaw));
    if ([h, m, sec].some((n) => Number.isNaN(n))) {
        return '00:00:00';
    }
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
function haTimeToHHMM(t) {
    return normalizeTimeForHa(t).slice(0, 5);
}
function sortKeysDeep(value) {
    if (value === null || typeof value !== 'object') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(sortKeysDeep);
    }
    const rec = value;
    const keys = Object.keys(rec).sort();
    const out = {};
    for (const k of keys) {
        out[k] = sortKeysDeep(rec[k]);
    }
    return out;
}
function stablePayloadString(payload) {
    return JSON.stringify(sortKeysDeep(payload ?? {}));
}
/** Empêche deux entrées identiques (horaires + toutes les actions + payloads normalisés). */
function blockFingerprint(block) {
    const st = normalizeTimeForHa(block.start_time);
    const et = normalizeTimeForHa(block.end_time);
    const parts = [...(block.actions || [])]
        .slice()
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((a) => `${String(a.action_type).trim()}|${stablePayloadString(payloadForDuplicateCheck(a.action_payload))}`);
    return `${st}|${et}|${parts.join('||')}`;
}
let ScheduleManagerCard = class ScheduleManagerCard extends s$1 {
    constructor() {
        super(...arguments);
        this._newScheduleName = '';
        this._creating = false;
        /** Éditeur plein écran (frise + détail plage), style config HA */
        this._visualEdit = null;
        /** Assistant « Choisir une action » : domaine → service → entité compatible. */
        this._actionWizardOpen = false;
        this._actionWizardStep = 'domain';
        this._actionWizardSearch = '';
        this._actionWizardDomain = null;
        /** Nom court du service sélectionné (ex. turn_on) avant le choix de l’entité. */
        this._actionWizardServiceShort = null;
        this._actionWizardEntityId = null;
        /** Réinitialise le sélecteur rapide d’entités après ajout. */
        this._quickEntityPickerNonce = 0;
        /** `${blockIdx}-${actionIdx}` quand le panneau d’ajout d’entité (bouton +) est ouvert. */
        this._entityAddPickerOpenKey = null;
        /** Réglé à l’ouverture de l’assistant : action à mettre à jour (évite décalage avec selectedActionIndex). */
        this._actionWizardTargetActionIndex = 0;
        /** Largeur du bandeau éditeur pour graduations adaptatives (pattern scheduler-card). */
        this._editorFriseWidth = 0;
        /** Déplacement horizontal de la plage sélectionnée (durée conservée). */
        this._segmentDrag = null;
        this._suppressSlotClick = false;
        /** Glisser-déposer sur la frise (pas @state : évite un render à chaque pixel). */
        this._boundaryDrag = null;
        this._onBoundaryMove = (ev) => {
            const d = this._boundaryDrag;
            if (!d || !this._visualEdit || ev.pointerId !== d.pointerId) {
                return;
            }
            const rect = d.rail.getBoundingClientRect();
            const x = Math.max(0, Math.min(rect.width, ev.clientX - rect.left));
            const pct = (x / rect.width) * 100;
            let m = Math.round((pct / 100) * MINUTES_PER_DAY);
            m = snapMinutesToGrid(m, TIMELINE_DRAG_SNAP_MINUTES);
            m = Math.max(d.minM, Math.min(d.maxM, m));
            const ha = minuteToHaTimeForSchedule(m);
            const blocks = [...this._visualEdit.blocks];
            if (d.mode === 'junction') {
                const L = blocks[d.leftIdx];
                const R = blocks[d.rightIdx];
                if (!L || !R) {
                    return;
                }
                blocks[d.leftIdx] = { ...L, end_time: ha };
                blocks[d.rightIdx] = { ...R, start_time: ha };
            }
            else if (d.mode === 'start') {
                const B = blocks[d.blockIdx];
                if (!B) {
                    return;
                }
                blocks[d.blockIdx] = { ...B, start_time: ha };
            }
            else {
                const B = blocks[d.blockIdx];
                if (!B) {
                    return;
                }
                blocks[d.blockIdx] = { ...B, end_time: ha };
            }
            if (hasOverlappingSameDayBlocks(blocks)) {
                return;
            }
            this._visualEdit = { ...this._visualEdit, blocks };
            this.requestUpdate();
        };
        this._onBoundaryUp = (ev) => {
            const d = this._boundaryDrag;
            if (!d) {
                return;
            }
            window.removeEventListener('pointermove', this._onBoundaryMove);
            window.removeEventListener('pointerup', this._onBoundaryUp);
            window.removeEventListener('pointercancel', this._onBoundaryUp);
            if (ev.pointerId === d.pointerId) {
                try {
                    d.handle.releasePointerCapture(ev.pointerId);
                }
                catch {
                    /* ignore */
                }
            }
            this._boundaryDrag = null;
        };
        this._onSegmentDragMove = (ev) => {
            const d = this._segmentDrag;
            if (!d || !this._visualEdit || ev.pointerId !== d.pointerId) {
                return;
            }
            const rect = d.rail.getBoundingClientRect();
            const rawDelta = ((ev.clientX - d.startClientX) / Math.max(1, rect.width)) * MINUTES_PER_DAY;
            const deltaM = snapMinutesToGrid(Math.round(rawDelta), TIMELINE_DRAG_SNAP_MINUTES);
            const dur = d.origEndM - d.origStartM;
            if (dur <= 0) {
                return;
            }
            let newStart = d.origStartM + deltaM;
            let newEnd = newStart + dur;
            newStart = snapMinutesToGrid(Math.round(newStart), TIMELINE_DRAG_SNAP_MINUTES);
            newEnd = newStart + dur;
            const maxStart = MINUTES_PER_DAY - dur;
            newStart = Math.max(0, Math.min(maxStart, newStart));
            newEnd = newStart + dur;
            if (newEnd > MINUTES_PER_DAY) {
                newEnd = MINUTES_PER_DAY;
                newStart = Math.max(0, newEnd - dur);
            }
            const resolved = applyDragMoveWithOptionalSwap(this._visualEdit.blocks, d.blockIdx, newStart, newEnd, d.origStartM, d.origEndM);
            if (!resolved) {
                return;
            }
            this._visualEdit = { ...this._visualEdit, blocks: resolved };
            this.requestUpdate();
        };
        this._onSegmentDragUp = (ev) => {
            const d = this._segmentDrag;
            if (d && ev.pointerId === d.pointerId) {
                const rect = d.rail.getBoundingClientRect();
                const rawDelta = ((ev.clientX - d.startClientX) / Math.max(1, rect.width)) * MINUTES_PER_DAY;
                if (Math.abs(rawDelta) > 4) {
                    this._suppressSlotClick = true;
                }
            }
            this.endSegmentDrag();
        };
    }
    static get styles() {
        return styles;
    }
    static getConfigElement() {
        return document.createElement('schedule-manager-card-editor');
    }
    static getStubConfig() {
        return { type: 'custom:schedule-manager-card' };
    }
    updated(changed) {
        super.updated(changed);
        if (changed.has('hass') && this.hass) {
            void this.requestUpdate();
        }
        if (changed.has('_visualEdit')) {
            if (this._visualEdit) {
                this._syncEditorFriseObserver();
                requestAnimationFrame(() => {
                    const m = this.shadowRoot?.querySelector('.sm-modal');
                    m?.focus();
                });
            }
            else {
                this._detachEditorFriseObserver();
                this._editorFriseWidth = 0;
            }
        }
    }
    statusEntityId() {
        return this.config?.status_entity?.trim() || SCHEDULE_MANAGER_STATUS_ENTITY_ID;
    }
    /**
     * La clé de l’objet `attributes.schedules` est l’identifiant canonique côté stockage.
     * Si le champ `id` à l’intérieur diverge (fichier JSON édité, ancien bug), les actions / suppression
     * visaient le mauvais UUID — d’où un planning « fantôme » ou introuvable.
     */
    withCanonicalId(storageKey, schedule) {
        const base = schedule.id === storageKey ? schedule : { ...schedule, id: storageKey };
        return normalizeScheduleTimeBlocks(base);
    }
    getSchedulesRecord() {
        const state = this.hass?.states[this.statusEntityId()];
        const attrs = state?.attributes;
        const raw = attrs?.schedules;
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
            return {};
        }
        return raw;
    }
    getGroupsRecord() {
        const state = this.hass?.states[this.statusEntityId()];
        const attrs = state?.attributes;
        const raw = attrs?.groups;
        return raw && typeof raw === 'object' ? raw : {};
    }
    services() {
        return new ScheduleManagerServices(this.hass);
    }
    render() {
        if (!this.hass || !this.config) {
            return x `<ha-card><div class="card-content">Chargement…</div></ha-card>`;
        }
        const groupId = this.config.group_id?.trim();
        const scheduleIds = this.config.schedule_ids || [];
        const schedulesMap = this.getSchedulesRecord();
        const groupsMap = this.getGroupsRecord();
        if (!this.hass.states[this.statusEntityId()]) {
            return x `
        <ha-card>
          <div class="card-header">Schedule Manager</div>
          <div class="card-content">
            Entité introuvable : <code>${this.statusEntityId()}</code>
          </div>
        </ha-card>
      `;
        }
        return x `
      <div>
        <ha-card class="card">
          <div class="card-header">Schedule Manager</div>
          <div class="card-content">
            ${groupId
            ? this.renderGroup(groupsMap[groupId], schedulesMap)
            : this.renderSchedulesList(scheduleIds, schedulesMap)}
          </div>
        </ha-card>
        ${this.renderVisualEditorOverlay()}
        ${this.renderActionWizardOverlay()}
      </div>
    `;
    }
    renderSchedulesList(scheduleIds, schedulesMap) {
        const totalCount = Object.keys(schedulesMap).length;
        const list = scheduleIds.length > 0
            ? scheduleIds
                .map((id) => {
                const sch = schedulesMap[id];
                return sch ? this.withCanonicalId(id, sch) : undefined;
            })
                .filter((s) => Boolean(s))
            : Object.entries(schedulesMap).map(([id, sch]) => this.withCanonicalId(id, sch));
        if (!list.length) {
            if (scheduleIds.length > 0 && totalCount > 0) {
                return x `
          <div class="empty-hint">
            Aucun planning ne correspond aux
            <code class="inline">schedule_ids</code>
            de la carte. Vérifiez les UUID dans les attributs du capteur
            <code class="inline">schedules</code>.
          </div>
        `;
            }
            if (totalCount === 0) {
                return x `
          <div class="empty-hint">
            Aucun planning enregistré pour l’instant. Créez-en un ci-dessous ou via
            <strong>Outils de développement → Actions</strong> :
            <code class="inline">schedule_manager.create_schedule</code>
            (service <code class="inline">name</code> obligatoire).
          </div>
          <div class="create-row">
            <input
              type="text"
              placeholder="Nom du planning (ex. Semaine)"
              .value=${this._newScheduleName}
              @input=${(e) => {
                    this._newScheduleName = e.target.value;
                }}
              @keydown=${(e) => {
                    if (e.key === 'Enter') {
                        void this.createScheduleFromInput();
                    }
                }}
            />
            <button
              type="button"
              ?disabled=${this._creating || !this._newScheduleName.trim()}
              @click=${() => this.createScheduleFromInput()}
            >
              ${this._creating ? 'Création…' : 'Créer le planning'}
            </button>
          </div>
        `;
            }
            return x `<div class="empty-hint">Aucun élément à afficher.</div>`;
        }
        return x `${list.map((s) => this.renderSchedule(s, undefined))}`;
    }
    renderGroup(group, schedulesMap) {
        if (!group) {
            return x `<div>Groupe introuvable.</div>`;
        }
        const refs = group.schedules || [];
        const missing = refs.filter((id) => !schedulesMap[id]);
        return x `
      <div class="group">
        <h3>${group.name}</h3>
        ${missing.length
            ? x `<div class="empty-hint">
              Références de planning absentes du stockage :
              <code class="inline">${missing.join(', ')}</code>
            </div>`
            : null}
        ${refs
            .filter((scheduleId) => schedulesMap[scheduleId])
            .map((scheduleId) => {
            const schedule = schedulesMap[scheduleId];
            if (!schedule) {
                return x ``;
            }
            return this.renderSchedule(this.withCanonicalId(scheduleId, schedule), group);
        })}
      </div>
    `;
    }
    /**
     * Barre d’heures sous la frise (même structure que scheduler-card : flex 18px de haut).
     */
    renderSchedulerTimeScale(mode) {
        const ticks = mode === 'editor'
            ? timelineScaleTicksForWidth(this._editorFriseWidth)
            : DEFAULT_TIMELINE_SCALE_TICKS;
        return x `
      <div class="sm-time-bar" aria-hidden="true">
        ${ticks.map((t, i) => {
            const cls = i === 0
                ? 'sm-time-bar-label sm-time-bar-label--left'
                : i === ticks.length - 1
                    ? 'sm-time-bar-label sm-time-bar-label--right'
                    : 'sm-time-bar-label';
            return x `<span class=${cls}>${t.label}</span>`;
        })}
      </div>
    `;
    }
    /** Ordre de peinture : plages plus étroites au-dessus (données anciennes encore chevauchées). */
    sortTimelineSegmentsForPaint(segments) {
        return [...segments].sort((a, b) => a.leftPct !== b.leftPct ? a.leftPct - b.leftPct : b.widthPct - a.widthPct);
    }
    /** Positionnement réel sur la journée (le flex-grow seul faisait occuper toute la barre à un seul bloc). */
    schedulerSlotAbsoluteStyle(leftPct, widthPct, fill) {
        return o({
            position: 'absolute',
            left: `${leftPct}%`,
            width: `${widthPct}%`,
            top: '0',
            height: '100%',
            boxSizing: 'border-box',
            background: fill,
        });
    }
    /** Coins arrondis uniquement sur le premier / dernier segment visible (gauche → droite). */
    segmentCapIndices(segments) {
        if (!segments.length) {
            return { capStart: new Set(), capEnd: new Set() };
        }
        let minLeft = Infinity;
        let maxRight = -Infinity;
        let iStart = 0;
        let iEnd = 0;
        for (let i = 0; i < segments.length; i++) {
            const seg = segments[i];
            if (seg.leftPct < minLeft) {
                minLeft = seg.leftPct;
                iStart = i;
            }
            const right = seg.leftPct + seg.widthPct;
            if (right > maxRight) {
                maxRight = right;
                iEnd = i;
            }
        }
        return {
            capStart: new Set([iStart]),
            capEnd: new Set([iEnd]),
        };
    }
    renderDayTimeline(blocks) {
        const segments = this.sortTimelineSegmentsForPaint(blocksToTimelineSegments(blocks));
        const caps = this.segmentCapIndices(segments);
        const showNow = segments.length > 0;
        const nowPct = nowPercentOfDay();
        return x `
      <div class="timeline-frise sm-scheduler-frise" role="img" aria-label="Plages sur 24 heures">
        <div class="sm-scheduler-track">
          <div class="sm-scheduler-bar">
            ${segments.map((s, i) => {
            const blk = blocks[s.blockIndex];
            const fill = blk ? blockTimelineFill(blk) : `hsl(${s.hue}, 58%, 42%)`;
            const capS = caps.capStart.has(i) ? 'sm-slot--cap-start' : '';
            const capE = caps.capEnd.has(i) ? 'sm-slot--cap-end' : '';
            return x `
                <div
                  class="sm-slot ${capS} ${capE}"
                  style=${this.schedulerSlotAbsoluteStyle(s.leftPct, s.widthPct, fill)}
                  title=${s.label}
                >
                  <span class="sm-slot-label">${s.label}</span>
                </div>
              `;
        })}
          </div>
          ${showNow
            ? x `<div
                class="timeline-now"
                style="position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;left:${nowPct}%"
              ></div>`
            : null}
        </div>
        ${this.renderSchedulerTimeScale('dashboard')}
      </div>
    `;
    }
    blocksToPayload(blocks) {
        return (blocks || []).map((b) => {
            const actions = (b.actions || [])
                .filter((a) => String(a.action_type ?? '').trim())
                .map((a) => ({
                action_type: a.action_type,
                action_payload: typeof a.action_payload === 'object' && a.action_payload !== null
                    ? a.action_payload
                    : {},
                ...(a.id ? { id: a.id } : {}),
            }));
            return {
                start_time: normalizeTimeForHa(String(b.start_time)),
                end_time: normalizeTimeForHa(String(b.end_time)),
                actions,
                ...(b.id ? { id: b.id } : {}),
            };
        });
    }
    renderSchedule(schedule, group) {
        if (!schedule) {
            return x ``;
        }
        const blocks = schedule.time_blocks || [];
        const totalSchedules = Object.keys(this.getSchedulesRecord()).length;
        const deleteLocked = totalSchedules <= 1;
        return x `
      <div class="schedule">
        <div class="schedule-header">
          <span>${schedule.name}</span>
          <div class="schedule-actions">
            <ha-switch
              .checked=${schedule.enabled}
              @change=${(e) => this.toggleSchedule(schedule.id, e.target.checked)}
            ></ha-switch>
            <button
              type="button"
              class="btn-danger"
              ?disabled=${deleteLocked}
              title=${deleteLocked
            ? 'Créez un autre planning avant de pouvoir supprimer celui-ci.'
            : `Supprimer le planning « ${schedule.name} »`}
              @click=${() => this.deletePlanning(schedule)}
            >
              Supprimer
            </button>
          </div>
        </div>

        <button
          type="button"
          class="btn-open-config"
          @click=${() => this.openVisualEditor(schedule)}
        >
          Configurer les plages…
        </button>

        ${blocks.length
            ? x `
              <div class="subsection-title">Vue 24 h</div>
              <div class="timeline-hint">
                Aperçu graphique — ouvrez la configuration pour modifier les plages.
              </div>
              ${this.renderDayTimeline(blocks)}
            `
            : x `
              <div class="empty-hint">
                Aucune plage — utilisez « Configurer les plages… » pour définir des créneaux.
              </div>
            `}

        ${group?.exclusive
            ? x `
              <button
                type="button"
                style="margin-top:10px"
                @click=${() => this.setActiveSchedule(group.id, schedule.id)}
              >
                Définir comme actif (groupe exclusif)
              </button>
            `
            : ''}
      </div>
    `;
    }
    async toggleSchedule(scheduleId, enabled) {
        try {
            if (enabled) {
                await this.services().enableSchedule(scheduleId);
            }
            else {
                await this.services().disableSchedule(scheduleId);
            }
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error('schedule_manager service call failed', e);
        }
    }
    async setActiveSchedule(groupId, scheduleId) {
        try {
            await this.services().setActiveSchedule(groupId, scheduleId);
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error('schedule_manager.set_active_schedule failed', e);
        }
    }
    async deletePlanning(schedule) {
        const schedulesMap = this.getSchedulesRecord();
        if (Object.keys(schedulesMap).length <= 1) {
            alert('Impossible de supprimer le dernier planning. Créez d’abord un autre planning (Paramètres → Schedule Manager → Configurer, ou depuis cette carte), puis supprimez celui-ci.');
            return;
        }
        if (!confirm(`Supprimer définitivement le planning « ${schedule.name} » ?`)) {
            return;
        }
        try {
            await this.services().deleteSchedule(schedule.id);
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error('schedule_manager.delete_schedule failed', e);
        }
    }
    openVisualEditor(schedule) {
        let blocks = JSON.parse(JSON.stringify(schedule.time_blocks || []));
        if (!blocks.length) {
            blocks = [defaultFullDayBlock()];
        }
        else {
            blocks = blocks.map((b) => {
                const n = normalizeTimeBlock(b);
                return {
                    ...n,
                    start_time: normalizeTimeForHa(String(n.start_time ?? '')),
                    end_time: normalizeTimeForHa(String(n.end_time ?? '')),
                };
            });
        }
        this._visualEdit = {
            scheduleId: schedule.id,
            blocks,
            repeatDays: [
                ...(schedule.repeat_days && schedule.repeat_days.length > 0
                    ? schedule.repeat_days
                    : [0, 1, 2, 3, 4, 5, 6]),
            ],
            selectedIndex: 0,
            selectedActionIndex: 0,
        };
    }
    closeVisualEditor() {
        this.endBoundaryDrag();
        this.endSegmentDrag();
        this._detachEditorFriseObserver();
        this._editorFriseWidth = 0;
        this._visualEdit = null;
        this._actionWizardOpen = false;
        this._quickEntityPickerNonce = 0;
        this._entityAddPickerOpenKey = null;
    }
    endBoundaryDrag() {
        const d = this._boundaryDrag;
        window.removeEventListener('pointermove', this._onBoundaryMove);
        window.removeEventListener('pointerup', this._onBoundaryUp);
        window.removeEventListener('pointercancel', this._onBoundaryUp);
        if (d) {
            try {
                d.handle.releasePointerCapture(d.pointerId);
            }
            catch {
                /* ignore */
            }
        }
        this._boundaryDrag = null;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.endBoundaryDrag();
        this.endSegmentDrag();
        this._detachEditorFriseObserver();
    }
    endSegmentDrag() {
        window.removeEventListener('pointermove', this._onSegmentDragMove);
        window.removeEventListener('pointerup', this._onSegmentDragUp);
        window.removeEventListener('pointercancel', this._onSegmentDragUp);
        const d = this._segmentDrag;
        if (d) {
            try {
                d.slotEl.releasePointerCapture(d.pointerId);
            }
            catch {
                /* ignore */
            }
        }
        this._segmentDrag = null;
    }
    onSlotPointerDown(ev, blockIdx) {
        if (!this._visualEdit || blockIdx !== this._visualEdit.selectedIndex) {
            return;
        }
        if (ev.button !== 0) {
            return;
        }
        const b = this._visualEdit.blocks[blockIdx];
        if (!b || isOvernightBlock(b)) {
            return;
        }
        const rail = ev.currentTarget.closest('.sm-scheduler-track');
        if (!rail) {
            return;
        }
        const s0 = timeStringToMinutes(b.start_time);
        const e0 = timeStringToMinutes(b.end_time);
        if (e0 <= s0) {
            return;
        }
        this.endBoundaryDrag();
        this.endSegmentDrag();
        const slotEl = ev.currentTarget;
        this._segmentDrag = {
            pointerId: ev.pointerId,
            blockIdx,
            rail,
            slotEl,
            startClientX: ev.clientX,
            origStartM: s0,
            origEndM: e0,
        };
        try {
            slotEl.setPointerCapture(ev.pointerId);
        }
        catch {
            /* ignore */
        }
        window.addEventListener('pointermove', this._onSegmentDragMove);
        window.addEventListener('pointerup', this._onSegmentDragUp);
        window.addEventListener('pointercancel', this._onSegmentDragUp);
    }
    onSlotClick(ev, blockIdx) {
        if (this._suppressSlotClick) {
            this._suppressSlotClick = false;
            ev.preventDefault();
            ev.stopPropagation();
            return;
        }
        this.visualSelectBlock(blockIdx);
    }
    _detachEditorFriseObserver() {
        this._editorFriseResizeObserver?.disconnect();
        this._editorFriseResizeObserver = undefined;
    }
    _syncEditorFriseObserver() {
        this._detachEditorFriseObserver();
        if (!this._visualEdit) {
            return;
        }
        requestAnimationFrame(() => {
            if (!this._visualEdit) {
                return;
            }
            const el = this.shadowRoot?.querySelector('.sm-editor-frise');
            if (!el) {
                return;
            }
            const ro = new ResizeObserver((entries) => {
                const w = entries[0]?.contentRect.width ?? 0;
                if (Math.abs(w - this._editorFriseWidth) > 0.5) {
                    this._editorFriseWidth = w;
                }
            });
            ro.observe(el);
            this._editorFriseResizeObserver = ro;
            const w = el.getBoundingClientRect().width;
            if (w > 0 && Math.abs(w - this._editorFriseWidth) > 0.5) {
                this._editorFriseWidth = w;
            }
        });
    }
    onResizePointerDown(ev, h) {
        ev.preventDefault();
        ev.stopPropagation();
        if (!this._visualEdit) {
            return;
        }
        const rail = ev.currentTarget.closest('.sm-scheduler-track');
        if (!rail) {
            return;
        }
        this.endBoundaryDrag();
        this.endSegmentDrag();
        const handle = ev.currentTarget;
        if (h.kind === 'junction') {
            this._boundaryDrag = {
                pointerId: ev.pointerId,
                mode: 'junction',
                leftIdx: h.leftBlockIndex,
                rightIdx: h.rightBlockIndex,
                minM: h.minMinute,
                maxM: h.maxMinute,
                rail,
                handle,
            };
        }
        else if (h.kind === 'start') {
            this._boundaryDrag = {
                pointerId: ev.pointerId,
                mode: 'start',
                blockIdx: h.blockIndex,
                minM: h.minMinute,
                maxM: h.maxMinute,
                rail,
                handle,
            };
        }
        else {
            this._boundaryDrag = {
                pointerId: ev.pointerId,
                mode: 'end',
                blockIdx: h.blockIndex,
                minM: h.minMinute,
                maxM: h.maxMinute,
                rail,
                handle,
            };
        }
        handle.setPointerCapture(ev.pointerId);
        window.addEventListener('pointermove', this._onBoundaryMove);
        window.addEventListener('pointerup', this._onBoundaryUp);
        window.addEventListener('pointercancel', this._onBoundaryUp);
    }
    visualToggleDay(day) {
        if (!this._visualEdit) {
            return;
        }
        let days = [...this._visualEdit.repeatDays];
        if (days.includes(day)) {
            days = days.filter((d) => d !== day);
        }
        else {
            days = [...days, day].sort((a, b) => a - b);
        }
        if (days.length === 0) {
            alert('Sélectionnez au moins un jour.');
            return;
        }
        this._visualEdit = { ...this._visualEdit, repeatDays: days };
    }
    visualSelectBlock(index) {
        if (!this._visualEdit) {
            return;
        }
        const max = this._visualEdit.blocks.length - 1;
        const idx = Math.max(0, Math.min(index, max));
        if (idx === this._visualEdit.selectedIndex) {
            return;
        }
        this._entityAddPickerOpenKey = null;
        this._visualEdit = {
            ...this._visualEdit,
            selectedIndex: idx,
            selectedActionIndex: 0,
        };
    }
    visualPatchBlockFields(patch) {
        if (!this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const cur = this._visualEdit.blocks[sel];
        if (!cur) {
            return;
        }
        const next = { ...cur, ...patch };
        if (!isOvernightBlock(next) && !sameDayBlockIntervalExclusiveEnd(next)) {
            alert('Pour une plage sur une même journée, l’heure de fin doit être strictement après le début.');
            return;
        }
        const trial = [...this._visualEdit.blocks];
        trial[sel] = next;
        if (hasOverlappingSameDayBlocks(trial)) {
            alert('Les plages horaires ne peuvent pas se chevaucher.');
            return;
        }
        this._visualEdit = { ...this._visualEdit, blocks: trial };
    }
    visualPatchSelectedAction(patch, actionIndexOverride) {
        if (!this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const maxAi = Math.max(0, (this._visualEdit.blocks[sel]?.actions?.length ?? 1) - 1);
        const ai = Math.min(actionIndexOverride !== undefined
            ? actionIndexOverride
            : this._visualEdit.selectedActionIndex, maxAi);
        const cur = this._visualEdit.blocks[sel];
        if (!cur?.actions?.length) {
            return;
        }
        const actions = cur.actions.map((a, i) => i === ai ? { ...a, ...patch } : a);
        const next = { ...cur, actions };
        const trial = [...this._visualEdit.blocks];
        trial[sel] = next;
        this._visualEdit = { ...this._visualEdit, blocks: trial };
    }
    visualSelectAction(ai) {
        if (!this._visualEdit) {
            return;
        }
        const b = this._visualEdit.blocks[this._visualEdit.selectedIndex];
        if (!b?.actions?.length) {
            return;
        }
        const max = b.actions.length - 1;
        const next = Math.max(0, Math.min(ai, max));
        if (next === this._visualEdit.selectedActionIndex) {
            return;
        }
        this._entityAddPickerOpenKey = null;
        this._visualEdit = {
            ...this._visualEdit,
            selectedActionIndex: next,
        };
    }
    visualAddAction() {
        if (!this._visualEdit) {
            return;
        }
        const bi = this._visualEdit.selectedIndex;
        const b = this._visualEdit.blocks[bi];
        if (!b) {
            return;
        }
        const actions = [...b.actions, newEmptyAction()];
        const next = { ...b, actions };
        const trial = [...this._visualEdit.blocks];
        trial[bi] = next;
        this._entityAddPickerOpenKey = null;
        this._visualEdit = {
            ...this._visualEdit,
            blocks: trial,
            selectedActionIndex: actions.length - 1,
        };
    }
    visualRemoveAction(ai) {
        if (!this._visualEdit) {
            return;
        }
        const bi = this._visualEdit.selectedIndex;
        const b = this._visualEdit.blocks[bi];
        if (!b || b.actions.length <= 1) {
            alert('Chaque plage doit conserver au moins une action.');
            return;
        }
        const actions = b.actions.filter((_, i) => i !== ai);
        const next = { ...b, actions };
        const trial = [...this._visualEdit.blocks];
        trial[bi] = next;
        let selectedActionIndex = this._visualEdit.selectedActionIndex;
        if (selectedActionIndex >= actions.length) {
            selectedActionIndex = actions.length - 1;
        }
        else if (ai < selectedActionIndex) {
            selectedActionIndex -= 1;
        }
        this._entityAddPickerOpenKey = null;
        this._visualEdit = { ...this._visualEdit, blocks: trial, selectedActionIndex };
    }
    visualAddBlock() {
        if (!this._visualEdit) {
            return;
        }
        const gap = suggestGapIntervalMinutes(this._visualEdit.blocks, 60);
        let nb;
        let nextBlocks;
        let selectedIndex;
        if (gap) {
            nb = {
                start_time: minuteToHaTimeForSchedule(gap.start),
                end_time: minuteToHaTimeForSchedule(gap.end),
                actions: [newEmptyAction()],
            };
            nextBlocks = [...this._visualEdit.blocks, nb];
            selectedIndex = nextBlocks.length - 1;
            if (hasOverlappingSameDayBlocks(nextBlocks)) {
                alert('Impossible d’ajouter cette plage sans chevauchement. Modifiez les horaires existants.');
                return;
            }
        }
        else {
            const split = tryInsertSlotAtDayStart(this._visualEdit.blocks, TIMELINE_DRAG_SNAP_MINUTES);
            if (!split) {
                alert('La journée est déjà entièrement couverte. Supprimez ou raccourcissez une plage avant d’en ajouter une autre.');
                return;
            }
            nextBlocks = split;
            selectedIndex = 0;
            nb = split[0];
        }
        const fp = blockFingerprint(nb);
        for (const b of this._visualEdit.blocks) {
            if (blockFingerprint(b) === fp) {
                alert('Une plage identique existe déjà — modifiez les horaires ou le service.');
                return;
            }
        }
        this._entityAddPickerOpenKey = null;
        this._visualEdit = {
            ...this._visualEdit,
            blocks: nextBlocks,
            selectedIndex,
            selectedActionIndex: 0,
        };
    }
    visualRemoveSelected() {
        if (!this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const nextBlocks = this._visualEdit.blocks.filter((_, i) => i !== sel);
        let nextSel = sel;
        if (nextSel >= nextBlocks.length) {
            nextSel = Math.max(0, nextBlocks.length - 1);
        }
        this._entityAddPickerOpenKey = null;
        this._visualEdit = {
            ...this._visualEdit,
            blocks: nextBlocks,
            selectedIndex: nextSel,
            selectedActionIndex: 0,
        };
    }
    /** Première entité ciblée dans le payload (pour l’UI et les services). */
    primaryEntityFromAction(action) {
        return entityIdsFromPayload(action.action_payload)[0] ?? '';
    }
    /** Domaine HA pour restreindre le picker (complète entityFilter). */
    includeDomainsForEntityPicker(action) {
        const parsed = parseDomainService(String(action.action_type ?? '').trim());
        return parsed?.domain ? [parsed.domain] : undefined;
    }
    /** Filtre le sélecteur d’entités selon le service configuré (strict, jamais « tout autoriser »). */
    entityFilterForConfiguredAction(selected) {
        const actionType = String(selected.action_type ?? '').trim();
        const hass = this.hass;
        return (entity) => {
            const entityId = entityIdFromPickerFilterArgument(entity);
            if (!entityId) {
                return false;
            }
            return entityCompatibleWithAction(entityId, actionType, hass);
        };
    }
    visualAppendEntity(ev, actionIndexOverride) {
        if (!this._visualEdit || !this.hass) {
            return false;
        }
        const raw = ev.detail?.value ??
            (ev.target?.value ?? '');
        const v = String(raw).trim();
        if (!v) {
            return false;
        }
        const sel = this._visualEdit.selectedIndex;
        const block = this._visualEdit.blocks[sel];
        const maxAi = Math.max(0, (block?.actions?.length ?? 1) - 1);
        const ai = Math.min(actionIndexOverride !== undefined
            ? Math.max(0, Math.min(actionIndexOverride, maxAi))
            : Math.min(this._visualEdit.selectedActionIndex, maxAi), maxAi);
        const action = block?.actions?.[ai];
        if (!block || !action || !String(action.action_type ?? '').trim()) {
            return false;
        }
        const ids = entityIdsFromPayload(action.action_payload);
        if (ids.includes(v)) {
            return false;
        }
        const base = typeof action.action_payload === 'object' && action.action_payload !== null
            ? { ...action.action_payload }
            : {};
        const nextIds = [...ids, v];
        base.entity_id = nextIds.length === 1 ? nextIds[0] : nextIds;
        this.visualPatchSelectedAction({ action_payload: base }, ai);
        this._quickEntityPickerNonce += 1;
        return true;
    }
    visualRemoveEntityChip(entityId, actionIndexOverride) {
        if (!this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const block = this._visualEdit.blocks[sel];
        const maxAi = Math.max(0, (block?.actions?.length ?? 1) - 1);
        const ai = Math.min(actionIndexOverride !== undefined
            ? Math.max(0, Math.min(actionIndexOverride, maxAi))
            : Math.min(this._visualEdit.selectedActionIndex, maxAi), maxAi);
        const action = block?.actions?.[ai];
        if (!block || !action) {
            return;
        }
        const ids = entityIdsFromPayload(action.action_payload).filter((e) => e !== entityId);
        if (ids.length === 0) {
            alert('Conservez au moins une entité, ou utilisez « Modifier l’action » pour tout reconfigurer.');
            return;
        }
        const base = typeof action.action_payload === 'object' && action.action_payload !== null
            ? { ...action.action_payload }
            : {};
        base.entity_id = ids.length === 1 ? ids[0] : ids;
        this.visualPatchSelectedAction({ action_payload: base }, ai);
        this._quickEntityPickerNonce += 1;
    }
    /** Modes préréglés exposés par l’entité climate (pour l’étape assistant). */
    climatePresetModesForEntityId(entityId) {
        const st = this.hass?.states[entityId];
        const pm = st?.attributes?.preset_modes;
        if (Array.isArray(pm) && pm.length && pm.every((x) => typeof x === 'string')) {
            return pm;
        }
        return null;
    }
    applyWizardSelection(entityId, serviceShort, climatePresetMode) {
        if (!this._visualEdit || !this.hass || !entityId.includes('.')) {
            return;
        }
        const domain = entityId.split('.')[0] ?? '';
        if (!domain) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const maxAi = Math.max(0, (this._visualEdit.blocks[sel]?.actions?.length ?? 1) - 1);
        const ai = Math.min(Math.max(0, this._actionWizardTargetActionIndex), maxAi);
        const block = this._visualEdit.blocks[sel];
        const curAction = block?.actions?.[ai];
        if (!block || !curAction) {
            return;
        }
        const payload = stripPayloadForNewService(curAction.action_payload, entityId, SCHEDULE_MANAGER_COLOR_KEY);
        if (domain === 'climate' &&
            serviceShort === 'set_preset_mode' &&
            climatePresetMode !== undefined) {
            payload.preset_mode = climatePresetMode;
        }
        else {
            applyDefaultFieldsForService(domain, serviceShort, entityId, payload, this.hass);
        }
        this.visualPatchSelectedAction({
            action_type: `${domain}.${serviceShort}`,
            action_payload: payload,
        }, ai);
        this.closeActionWizard();
    }
    openActionWizard() {
        if (!this._visualEdit || !this.hass) {
            return;
        }
        this.closeEntityAddPicker();
        const bi = this._visualEdit.selectedIndex;
        const n = this._visualEdit.blocks[bi]?.actions?.length ?? 0;
        const maxAi = Math.max(0, n - 1);
        this._actionWizardTargetActionIndex = Math.min(Math.max(0, this._visualEdit.selectedActionIndex), maxAi);
        this._actionWizardOpen = true;
        this._actionWizardStep = 'domain';
        this._actionWizardSearch = '';
        this._actionWizardDomain = null;
        this._actionWizardServiceShort = null;
        this._actionWizardEntityId = null;
    }
    closeActionWizard() {
        this._actionWizardOpen = false;
    }
    actionWizardBack() {
        if (this._actionWizardStep === 'climate_preset') {
            this._actionWizardStep = 'entity';
            this._actionWizardEntityId = null;
            this._actionWizardSearch = '';
            return;
        }
        if (this._actionWizardStep === 'entity') {
            this._actionWizardStep = 'service';
            this._actionWizardEntityId = null;
            this._actionWizardSearch = '';
            return;
        }
        if (this._actionWizardStep === 'service') {
            this._actionWizardStep = 'domain';
            this._actionWizardDomain = null;
            this._actionWizardServiceShort = null;
            this._actionWizardSearch = '';
        }
    }
    actionWizardPickDomain(domain) {
        this._actionWizardDomain = domain;
        this._actionWizardServiceShort = null;
        this._actionWizardStep = 'service';
        this._actionWizardSearch = '';
    }
    actionWizardPickService(serviceShort) {
        this._actionWizardServiceShort = serviceShort;
        this._actionWizardStep = 'entity';
        this._actionWizardEntityId = null;
        this._actionWizardSearch = '';
    }
    actionWizardPickEntity(eid) {
        const domain = this._actionWizardDomain;
        const svc = this._actionWizardServiceShort;
        if (!domain || !svc) {
            return;
        }
        this._actionWizardEntityId = eid;
        if (svc === 'set_preset_mode' && domain === 'climate') {
            const modes = this.climatePresetModesForEntityId(eid);
            if (modes && modes.length > 0) {
                this._actionWizardStep = 'climate_preset';
                this._actionWizardSearch = '';
                return;
            }
        }
        this.applyWizardSelection(eid, svc);
    }
    actionWizardApplyClimatePreset(presetMode) {
        const id = this._actionWizardEntityId;
        const svc = this._actionWizardServiceShort;
        if (!id || svc !== 'set_preset_mode') {
            return;
        }
        this.applyWizardSelection(id, 'set_preset_mode', presetMode);
    }
    _onWizardSearchInput(ev) {
        this._actionWizardSearch = ev.target.value;
    }
    _onWizardOverlayKeydown(ev) {
        if (ev.key === 'Escape') {
            ev.preventDefault();
            ev.stopPropagation();
            this.closeActionWizard();
        }
    }
    renderActionSummary(selected) {
        if (!String(selected.action_type ?? '').trim()) {
            return x ``;
        }
        const hass = this.hass;
        if (!hass) {
            return x ``;
        }
        const primary = this.primaryEntityFromAction(selected);
        const parsed = parseDomainService(selected.action_type);
        const primaryDomain = primary.includes('.')
            ? primary.split('.')[0] ?? ''
            : '';
        const icon = primary
            ? entityIcon(hass, primary) ??
                (primaryDomain ? domainIcon(primaryDomain) : undefined) ??
                'mdi:gesture-tap-button'
            : 'mdi:gesture-tap-button';
        const title = primary
            ? friendlyEntityName(hass, primary)
            : 'Aucune entité sélectionnée';
        const actionLine = parsed
            ? servicePrimaryLabel(parsed.domain, parsed.service)
            : selected.action_type || '—';
        return x `
      <div class="sm-action-summary">
        <ha-icon class="sm-action-summary-icon" .icon=${icon}></ha-icon>
        <div class="sm-action-summary-text">
          <div class="sm-action-summary-title">${title}</div>
          <div class="sm-action-summary-sub">
            <span>${actionLine}</span>
            ${selected.action_type
            ? x `<code class="sm-action-tech">${selected.action_type}</code>`
            : null}
          </div>
        </div>
      </div>
    `;
    }
    formatActionTabTitle(action, index) {
        const t = String(action.action_type ?? '').trim();
        if (!t) {
            return `Action ${index + 1}`;
        }
        const segs = t.split('.');
        const tail = t.includes('.') ? segs[segs.length - 1] ?? t : t;
        return tail.length > 20 ? `${tail.slice(0, 18)}…` : tail;
    }
    /** Une seule action encore sans service : pas de liste — uniquement le bouton principal. */
    isSinglePlaceholderAction(selected) {
        const actions = selected.actions || [];
        return (actions.length === 1 && !String(actions[0]?.action_type ?? '').trim());
    }
    openActionWizardAt(actionIndex) {
        this.visualSelectAction(actionIndex);
        this.openActionWizard();
    }
    visualAppendEntityAt(actionIndex, ev) {
        return this.visualAppendEntity(ev, actionIndex);
    }
    entityAddPickerKey(blockIdx, actionIdx) {
        return `${blockIdx}-${actionIdx}`;
    }
    closeEntityAddPicker() {
        this._entityAddPickerOpenKey = null;
    }
    toggleEntityAddPicker(blockIdx, actionIdx) {
        const k = this.entityAddPickerKey(blockIdx, actionIdx);
        if (this._entityAddPickerOpenKey === k) {
            this.closeEntityAddPicker();
            return;
        }
        this._entityAddPickerOpenKey = k;
        this._quickEntityPickerNonce += 1;
    }
    visualRemoveEntityAt(actionIndex, entityId) {
        this.visualRemoveEntityChip(entityId, actionIndex);
    }
    visualSetPresetModeAt(actionIndex, mode) {
        this.visualSelectAction(actionIndex);
        this.visualSetPresetMode(mode);
    }
    renderActionWizardOverlay() {
        if (!this._actionWizardOpen || !this.hass || !this._visualEdit) {
            return x ``;
        }
        const hass = this.hass;
        const step = this._actionWizardStep;
        const qRaw = this._actionWizardSearch.trim().toLowerCase();
        const domainF = this._actionWizardDomain;
        const svcPick = this._actionWizardServiceShort;
        const entityPick = this._actionWizardEntityId;
        const matches = (text) => !qRaw || text.toLowerCase().includes(qRaw);
        let body = x ``;
        if (step === 'domain') {
            const domains = listSelectableDomains(hass).filter((d) => matches(domainLabelFr(d)) || matches(d));
            body =
                domains.length === 0
                    ? x `<p class="sm-ap-empty">Aucun résultat.</p>`
                    : x `<div class="sm-ap-scroll">
              ${domains.map((d) => x `
                  <button
                    type="button"
                    class="sm-ap-row"
                    @click=${() => this.actionWizardPickDomain(d)}
                  >
                    <ha-icon class="sm-ap-row-icon" .icon=${domainIcon(d)}></ha-icon>
                    <div class="sm-ap-row-text">
                      <span class="sm-ap-row-primary">${domainLabelFr(d)}</span>
                      <span class="sm-ap-row-secondary">${d}</span>
                    </div>
                    <span class="sm-ap-chevron" aria-hidden="true">›</span>
                  </button>
                `)}
            </div>`;
        }
        else if (step === 'service' && domainF) {
            const dom = domainF;
            const svcList = servicesForDomain(hass, dom).filter((s) => matches(s) ||
                matches(servicePrimaryLabel(dom, s)) ||
                matches(serviceSecondaryHint(dom, s)));
            body =
                svcList.length === 0
                    ? x `<p class="sm-ap-empty">Aucun service pour ce domaine.</p>`
                    : x `<div class="sm-ap-scroll">
              ${svcList.map((s) => x `
                  <button
                    type="button"
                    class="sm-ap-row sm-ap-row--dense"
                    @click=${() => this.actionWizardPickService(s)}
                  >
                    <ha-icon class="sm-ap-row-icon" .icon=${domainIcon(dom)}></ha-icon>
                    <div class="sm-ap-row-text">
                      <span class="sm-ap-row-primary">${servicePrimaryLabel(dom, s)}</span>
                      <span class="sm-ap-row-secondary">${serviceSecondaryHint(dom, s)}</span>
                    </div>
                    <span class="sm-ap-chevron" aria-hidden="true">›</span>
                  </button>
                `)}
            </div>`;
        }
        else if (step === 'entity' && domainF && svcPick) {
            const actionFull = `${domainF}.${svcPick}`;
            let entities = listEntitiesInDomain(hass, domainF).filter((eid) => matches(friendlyEntityName(hass, eid)) || matches(eid));
            entities = entities.filter((eid) => entityCompatibleWithAction(eid, actionFull, hass));
            body =
                entities.length === 0
                    ? x `<p class="sm-ap-empty">
              Aucune entité compatible avec l’action <code>${actionFull}</code> dans ce domaine.
            </p>`
                    : x `<div class="sm-ap-scroll">
              ${entities.map((eid) => x `
                  <button
                    type="button"
                    class="sm-ap-row"
                    @click=${() => this.actionWizardPickEntity(eid)}
                  >
                    <ha-icon
                      class="sm-ap-row-icon"
                      .icon=${entityIcon(hass, eid) ?? domainIcon(domainF)}
                    ></ha-icon>
                    <div class="sm-ap-row-text">
                      <span class="sm-ap-row-primary">${friendlyEntityName(hass, eid)}</span>
                      <span class="sm-ap-row-secondary">${eid}</span>
                    </div>
                    <span class="sm-ap-chevron" aria-hidden="true">›</span>
                  </button>
                `)}
            </div>`;
        }
        else if (step === 'climate_preset' && entityPick) {
            const modes = this.climatePresetModesForEntityId(entityPick) ?? [];
            const filtered = modes.filter((m) => matches(m));
            body =
                filtered.length === 0
                    ? x `<p class="sm-ap-empty">
              Aucun mode préréglé trouvé pour cette entité. Utilisez Retour ou fermez.
            </p>`
                    : x `<div class="sm-ap-scroll">
              ${filtered.map((mode) => x `
                  <button
                    type="button"
                    class="sm-ap-row"
                    @click=${() => this.actionWizardApplyClimatePreset(mode)}
                  >
                    <ha-icon
                      class="sm-ap-row-icon"
                      .icon=${entityIcon(hass, entityPick) ?? domainIcon('climate')}
                    ></ha-icon>
                    <div class="sm-ap-row-text">
                      <span class="sm-ap-row-primary">${mode}</span>
                      <span class="sm-ap-row-secondary">Mode préréglé · climate.set_preset_mode</span>
                    </div>
                    <span class="sm-ap-chevron" aria-hidden="true">›</span>
                  </button>
                `)}
            </div>`;
        }
        const context = step === 'domain'
            ? 'Étape 1 — choisissez un type d’appareil (domaine)'
            : step === 'service' && domainF
                ? x `Étape 2 — quelle action · domaine
              <strong>${domainLabelFr(domainF)}</strong> ?`
                : step === 'entity' && domainF && svcPick
                    ? x `Étape 3 — quelle entité pour
                <code>${domainF}.${svcPick}</code>
                ? Seules les entités compatibles sont listées.`
                    : step === 'climate_preset' && entityPick
                        ? x `Étape 4 — mode préréglé pour «
                  <strong>${friendlyEntityName(hass, entityPick)}</strong> »`
                        : '';
        return x `
      <div
        class="sm-action-wizard-overlay"
        tabindex="-1"
        @keydown=${this._onWizardOverlayKeydown}
        @click=${(e) => {
            if (e.target === e.currentTarget) {
                this.closeActionWizard();
            }
        }}
      >
        <div
          class="sm-action-wizard-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sm-ap-heading"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="sm-action-wizard-head">
            <button
              type="button"
              class="sm-ap-nav-btn"
              aria-label="Retour"
              ?disabled=${step === 'domain'}
              @click=${() => this.actionWizardBack()}
            >
              ‹
            </button>
            <h3 id="sm-ap-heading" class="sm-ap-heading">Choisir une action</h3>
            <button
              type="button"
              class="sm-ap-nav-btn"
              aria-label="Fermer"
              @click=${() => this.closeActionWizard()}
            >
              ×
            </button>
          </div>
          <p class="sm-ap-context">${context}</p>
          <input
            type="search"
            class="sm-ap-search"
            placeholder="Rechercher"
            aria-label="Filtrer la liste"
            .value=${this._actionWizardSearch}
            @input=${this._onWizardSearchInput}
          />
          ${body}
        </div>
      </div>
    `;
    }
    renderActionPlanningControls(selected) {
        if (!this.hass || !this._visualEdit) {
            return x ``;
        }
        const hass = this.hass;
        if (this.isSinglePlaceholderAction(selected)) {
            return x `
        <div class="sm-action-entry">
          <button
            type="button"
            class="sm-action-primary-btn"
            @click=${() => this.openActionWizardAt(0)}
          >
            + Choisir une action
          </button>
        </div>
      `;
        }
        const scheduleKey = this._visualEdit.scheduleId;
        const blockIdx = this._visualEdit.selectedIndex;
        return x `
      <div class="sm-action-entry">
        <div class="sm-actions-stack" role="list" aria-label="Liste des actions du créneau">
          ${selected.actions.map((action, i) => {
            const primary = this.primaryEntityFromAction(action);
            const parsed = parseDomainService(action.action_type);
            const dom = primary.includes('.') ? primary.split('.')[0] ?? '' : '';
            const hasAction = Boolean(String(action.action_type ?? '').trim());
            const unknownService = Boolean(hasAction &&
                primary &&
                parsed &&
                dom &&
                parsed.domain === dom &&
                !servicesForDomain(hass, parsed.domain).includes(parsed.service));
            return x `
              <div class="sm-action-block" role="listitem">
                <div class="sm-action-block-head">
                  <span class="sm-action-block-title">${this.formatActionTabTitle(action, i)}</span>
                  ${selected.actions.length > 1
                ? x `
                        <button
                          type="button"
                          class="sm-action-block-remove"
                          aria-label="Supprimer cette action"
                          title="Supprimer cette action"
                          @click=${() => this.visualRemoveAction(i)}
                        >
                          Supprimer
                        </button>
                      `
                : null}
                </div>
                ${hasAction ? this.renderActionSummary(action) : null}
                ${hasAction
                ? x `
                      <div class="sm-action-entities-quick">
                        <span class="sm-action-entities-quick-title">Entités ciblées</span>
                        <p class="sm-action-entities-quick-hint">
                          Retirez une entité avec × ou utilisez « + » puis choisissez une entité compatible
                          avec <code>${action.action_type}</code>.
                        </p>
                        <div class="entity-chips">
                          ${entityIdsFromPayload(action.action_payload).map((eid) => x `
                              <span class="entity-chip" title=${eid}>
                                <span class="entity-chip-text">
                                  <span class="entity-chip-name">${friendlyEntityName(hass, eid)}</span>
                                  <span class="entity-chip-id">${eid}</span>
                                </span>
                                <button
                                  type="button"
                                  aria-label="Retirer ${friendlyEntityName(hass, eid)}"
                                  @click=${() => this.visualRemoveEntityAt(i, eid)}
                                >
                                  ×
                                </button>
                              </span>
                            `)}
                        </div>
                        <div class="sm-entity-add-block">
                          <div class="sm-entity-add-row">
                            <span class="sm-entity-add-heading">Ajouter une entité</span>
                            ${this._entityAddPickerOpenKey === this.entityAddPickerKey(blockIdx, i)
                    ? x `
                                  <button
                                    type="button"
                                    class="sm-entity-add-dismiss"
                                    aria-label="Fermer le sélecteur d’entité"
                                    @click=${() => this.closeEntityAddPicker()}
                                  >
                                    Fermer
                                  </button>
                                `
                    : x `
                                  <button
                                    type="button"
                                    class="sm-entity-add-plus"
                                    title="Choisir une entité à ajouter"
                                    aria-label="Ajouter une entité"
                                    @click=${() => this.toggleEntityAddPicker(blockIdx, i)}
                                  >
                                    +
                                  </button>
                                `}
                          </div>
                          ${this._entityAddPickerOpenKey === this.entityAddPickerKey(blockIdx, i)
                    ? x `
                                <div class="sm-entity-picker-shell sm-entity-picker-shell--popover">
                                  <ha-entity-picker
                                    class="sm-action-entities-quick-picker"
                                    .hass=${hass}
                                    .includeDomains=${this.includeDomainsForEntityPicker(action)}
                                    .entityFilter=${this.entityFilterForConfiguredAction(action)}
                                    .allowCustomEntity=${true}
                                    label="Rechercher ou choisir une entité…"
                                    .value=${''}
                                    id=${`sm-quick-ep-${scheduleKey}-${blockIdx}-${i}-${this._quickEntityPickerNonce}`}
                                    @value-changed=${(e) => {
                        if (this.visualAppendEntityAt(i, e)) {
                            this.closeEntityAddPicker();
                        }
                    }}
                                  ></ha-entity-picker>
                                </div>
                              `
                    : null}
                        </div>
                      </div>
                    `
                : null}
                ${this.renderClimatePresetForAction(action, i)}
                ${unknownService
                ? x `<p class="sm-field-hint">
                      Action personnalisée : <code>${action.action_type}</code>
                    </p>`
                : null}
                <button
                  type="button"
                  class="sm-action-primary-btn sm-action-block-wizard"
                  @click=${() => this.openActionWizardAt(i)}
                >
                  ${hasAction ? 'Modifier l’action' : '+ Choisir une action'}
                </button>
              </div>
            `;
        })}
        </div>
        <button
          type="button"
          class="sm-action-add-another-btn"
          @click=${() => this.visualAddAction()}
        >
          + Ajouter une autre action
        </button>
      </div>
    `;
    }
    getClimatePresetModesForAction(action) {
        if (!this.hass || action.action_type.trim() !== 'climate.set_preset_mode') {
            return null;
        }
        const ids = entityIdsFromPayload(action.action_payload);
        for (const id of ids) {
            if (!id.startsWith('climate.')) {
                continue;
            }
            const st = this.hass.states[id];
            if (!st) {
                continue;
            }
            const pm = st.attributes?.preset_modes;
            if (Array.isArray(pm) && pm.length > 0 && pm.every((x) => typeof x === 'string')) {
                return pm;
            }
        }
        return null;
    }
    renderClimatePresetForAction(action, actionIndex) {
        const modes = this.getClimatePresetModesForAction(action);
        if (!modes?.length) {
            return x ``;
        }
        const cur = String(action.action_payload?.preset_mode ?? '');
        const orphan = cur && !modes.includes(cur);
        return x `
      <label class="sm-form-label sm-form-label-last sm-action-climate-preset">
        Mode préréglé
        <select
          class="sm-select"
          .value=${l(cur)}
          @change=${(e) => this.visualSetPresetModeAt(actionIndex, e.target.value)}
        >
          ${orphan ? x `<option value=${cur}>${cur} (actuel)</option>` : null}
          ${modes.map((m) => x `<option value=${m}>${m}</option>`)}
        </select>
      </label>
    `;
    }
    async saveVisualEditor() {
        if (!this._visualEdit) {
            return;
        }
        const { scheduleId, blocks, repeatDays } = this._visualEdit;
        for (const b of blocks) {
            const ok = (b.actions || []).some((a) => String(a.action_type ?? '').trim());
            if (!ok) {
                alert('Chaque plage doit avoir au moins une action avec un service défini (assistant « Choisir une action »).');
                return;
            }
        }
        const dupAt = findDuplicateBlockIndex(blocks);
        if (dupAt >= 0) {
            alert(`Deux plages identiques (horaires + action + payload) — modifiez l’entrée n° ${dupAt + 1}.`);
            return;
        }
        if (hasOverlappingSameDayBlocks(blocks)) {
            alert('Des plages se chevauchent sur la journée. Corrigez les horaires avant d’enregistrer.');
            return;
        }
        try {
            await this.services().updateSchedule(scheduleId, {
                repeat_days: repeatDays,
                time_blocks: this.blocksToPayload(blocks),
            });
            this.closeVisualEditor();
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error('schedule_manager.update_schedule failed', e);
        }
    }
    visualSetPresetMode(mode) {
        if (!this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const block = this._visualEdit.blocks[sel];
        const ai = Math.min(this._visualEdit.selectedActionIndex, Math.max(0, (block?.actions?.length ?? 1) - 1));
        const action = block?.actions?.[ai];
        if (!block || !action) {
            return;
        }
        const base = typeof action.action_payload === 'object' && action.action_payload !== null
            ? { ...action.action_payload }
            : {};
        base.preset_mode = mode;
        this.visualPatchSelectedAction({ action_payload: base });
    }
    /** Couleur affichée sur la frise : métadonnée sur la première action du créneau. */
    hasCustomBlockColor(block) {
        const p = block.actions?.[0]?.action_payload;
        if (!p || typeof p !== 'object') {
            return false;
        }
        return typeof p[SCHEDULE_MANAGER_COLOR_KEY] === 'string';
    }
    blockColorPickerHex(block) {
        const p = block.actions?.[0]?.action_payload;
        if (p && typeof p === 'object') {
            const c = p[SCHEDULE_MANAGER_COLOR_KEY];
            if (typeof c === 'string' && /^#[0-9A-Fa-f]{6}$/.test(c.trim())) {
                return c.trim();
            }
        }
        return '#2196F3';
    }
    visualSetBlockColor(hex) {
        if (!this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const block = this._visualEdit.blocks[sel];
        if (!block?.actions?.length) {
            return;
        }
        const actions = block.actions.map((a, i) => {
            if (i !== 0) {
                return a;
            }
            const base = typeof a.action_payload === 'object' && a.action_payload !== null
                ? { ...a.action_payload }
                : {};
            base[SCHEDULE_MANAGER_COLOR_KEY] = hex;
            return { ...a, action_payload: base };
        });
        const next = { ...block, actions };
        const trial = [...this._visualEdit.blocks];
        trial[sel] = next;
        this._visualEdit = { ...this._visualEdit, blocks: trial };
    }
    visualClearBlockColor() {
        if (!this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const block = this._visualEdit.blocks[sel];
        if (!block?.actions?.length) {
            return;
        }
        const actions = block.actions.map((a, i) => {
            if (i !== 0) {
                return a;
            }
            const base = typeof a.action_payload === 'object' && a.action_payload !== null
                ? { ...a.action_payload }
                : {};
            delete base[SCHEDULE_MANAGER_COLOR_KEY];
            return { ...a, action_payload: base };
        });
        const next = { ...block, actions };
        const trial = [...this._visualEdit.blocks];
        trial[sel] = next;
        this._visualEdit = { ...this._visualEdit, blocks: trial };
    }
    renderBlockColorControls(block) {
        const pickerVal = this.blockColorPickerHex(block);
        const custom = this.hasCustomBlockColor(block);
        return x `
      <div class="sm-form-label sm-color-field">
        <span class="sm-color-field-title">Couleur du créneau sur la ligne horaire</span>
        <p class="sm-color-field-hint">
          Teinte affichée pour la plage sélectionnée sur la frise « Heure » ci‑dessus (pas la couleur
          de la pièce dans Home Assistant).
        </p>
        <div class="sm-color-row">
          <label class="sm-color-system-label">
            <span class="sm-color-system-text">Nuancier du navigateur</span>
            <input
              type="color"
              class="sm-color-native"
              .value=${pickerVal}
              title="Ouvrir le sélecteur de couleur du système"
              aria-label="Choisir une couleur précise avec le nuancier du navigateur"
              @input=${(e) => this.visualSetBlockColor(e.target.value)}
            />
          </label>
          <div class="sm-color-presets" aria-hidden="true">
            ${BLOCK_COLOR_PRESETS.map((hex) => x `
                <button
                  type="button"
                  class="sm-color-swatch"
                  style="background:${hex}"
                  title=${hex}
                  aria-label="Appliquer la couleur ${hex}"
                  @click=${() => this.visualSetBlockColor(hex)}
                ></button>
              `)}
          </div>
          <button
            type="button"
            class="sm-color-reset"
            ?disabled=${!custom}
            @click=${() => this.visualClearBlockColor()}
          >
            Défaut
          </button>
        </div>
      </div>
    `;
    }
    renderEditorTimeline(blocks, selectedIndex) {
        const segments = this.sortTimelineSegmentsForPaint(blocksToTimelineSegments(blocks));
        const caps = this.segmentCapIndices(segments);
        const resizeHandles = timelineResizeHandlesForSelection(blocks, selectedIndex);
        const showNow = segments.length > 0;
        const nowPct = nowPercentOfDay();
        return x `
      <div
        class="timeline-frise sm-scheduler-frise sm-editor-frise"
        role="group"
        aria-label="Plages sur 24 heures — cliquer pour sélectionner, poignées pour ajuster"
      >
        <div class="sm-frise-heading">
          <span class="sm-frise-heading-label">Heure</span>
        </div>
        <div class="sm-scheduler-track sm-scheduler-track--editor">
          <div class="sm-scheduler-bar">
            ${segments.map((s, i) => {
            const blk = blocks[s.blockIndex];
            const fill = blk ? blockTimelineFill(blk) : `hsl(${s.hue}, 58%, 42%)`;
            const sel = s.blockIndex === selectedIndex ? 'is-selected' : '';
            const capS = caps.capStart.has(i) ? 'sm-slot--cap-start' : '';
            const capE = caps.capEnd.has(i) ? 'sm-slot--cap-end' : '';
            return x `
                <div
                  class="sm-slot ${sel} ${capS} ${capE}"
                  style=${this.schedulerSlotAbsoluteStyle(s.leftPct, s.widthPct, fill)}
                  title=${s.blockIndex === selectedIndex
                ? `${s.label} — glisser pour déplacer la plage`
                : s.label}
                  @pointerdown=${(e) => this.onSlotPointerDown(e, s.blockIndex)}
                  @click=${(e) => this.onSlotClick(e, s.blockIndex)}
                >
                  <span class="sm-slot-label">${s.label}</span>
                </div>
              `;
        })}
          </div>
          ${resizeHandles.map((h) => {
            const label = h.kind === 'junction'
                ? 'Ajuster la transition entre deux plages'
                : h.kind === 'start'
                    ? 'Déplacer le début de la plage'
                    : 'Déplacer la fin de la plage';
            const title = h.kind === 'junction'
                ? 'Glisser pour déplacer la transition'
                : h.kind === 'start'
                    ? 'Glisser pour modifier l’heure de début'
                    : 'Glisser pour modifier l’heure de fin';
            return x `
              <button
                type="button"
                class="sm-scheduler-handle"
                style=${o({
                left: `${h.pct}%`,
                transform: 'translateX(-50%)',
            })}
                aria-label=${label}
                title=${title}
                @pointerdown=${(e) => this.onResizePointerDown(e, h)}
              >
                <span class="sm-scheduler-handle-grip"></span>
              </button>
            `;
        })}
          ${showNow
            ? x `<div
                class="timeline-now"
                style="position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;left:${nowPct}%"
              ></div>`
            : null}
        </div>
        ${this.renderSchedulerTimeScale('editor')}
      </div>
    `;
    }
    renderVisualEditorOverlay() {
        const v = this._visualEdit;
        if (!v || !this.hass) {
            return x ``;
        }
        const schedulesMap = this.getSchedulesRecord();
        const raw = schedulesMap[v.scheduleId];
        if (!raw) {
            return x ``;
        }
        const schedule = this.withCanonicalId(v.scheduleId, raw);
        const blocks = v.blocks;
        const sel = v.selectedIndex;
        const selected = blocks[sel];
        return x `
      <div
        class="sm-overlay"
        @click=${(e) => {
            if (e.target === e.currentTarget) {
                this.closeVisualEditor();
            }
        }}
      >
        <div
        class="sm-modal"
        tabindex="-1"
        @click=${(e) => e.stopPropagation()}
        @keydown=${(e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                this.closeVisualEditor();
            }
        }}
        >
          <div class="sm-modal-head">
            <h2>${schedule.name}</h2>
            <button
              type="button"
              class="sm-icon-btn"
              aria-label="Fermer"
              @click=${() => this.closeVisualEditor()}
            >
              ×
            </button>
          </div>
          <div class="sm-modal-sub">
            <span>Jours de répétition</span>
            <div class="sm-repeat-days">
              ${WEEKDAY_LABELS_FR.map((label, day) => x `
                  <button
                    type="button"
                    class="sm-day ${v.repeatDays.includes(day) ? 'on' : ''}"
                    @click=${() => this.visualToggleDay(day)}
                  >
                    ${label}
                  </button>
                `)}
            </div>
          </div>
          <div class="sm-toolbar">
            <button type="button" class="sm-tool-btn sm-tool-accent" @click=${() => this.visualAddBlock()}>
              + Ajouter une plage
            </button>
            <button
              type="button"
              class="sm-tool-btn danger"
              ?disabled=${blocks.length === 0}
              @click=${() => this.visualRemoveSelected()}
            >
              Supprimer la plage
            </button>
          </div>
          ${this.renderEditorTimeline(blocks, sel)}
          ${blocks.length === 0
            ? x `
                <div class="sm-modal-body sm-modal-body-frise-placeholder">
                  <div class="empty-hint">
                    Aucune plage — utilisez « + Ajouter une plage » ci-dessus.
                  </div>
                </div>
              `
            : null}
          ${selected
            ? x `
                <div class="sm-modal-body">
                  <div class="sm-time-row">
                    <label>
                      Heure de début (HH:MM)
                      <input
                        type="text"
                        inputmode="numeric"
                        autocomplete="off"
                        maxlength="8"
                        .value=${haTimeToHHMM(selected.start_time)}
                        @input=${(e) => this.visualPatchBlockFields({
                start_time: normalizeTimeForHa(e.target.value),
            })}
                      />
                    </label>
                    <label>
                      Heure de fin (HH:MM)
                      <input
                        type="text"
                        inputmode="numeric"
                        autocomplete="off"
                        maxlength="8"
                        .value=${haTimeToHHMM(selected.end_time)}
                        @input=${(e) => this.visualPatchBlockFields({
                end_time: normalizeTimeForHa(e.target.value),
            })}
                      />
                    </label>
                  </div>
                  ${this.renderBlockColorControls(selected)}
                  <div class="sm-action-card">
                    <h4>Actions pendant cette plage</h4>
                    ${this.renderActionPlanningControls(selected)}
                  </div>
                </div>
              `
            : null}
          <div class="sm-modal-footer">
            <button type="button" class="btn-text danger" @click=${() => this.closeVisualEditor()}>
              Annuler
            </button>
            <button type="button" class="btn-text primary" @click=${() => this.saveVisualEditor()}>
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    `;
    }
    async createScheduleFromInput() {
        const name = this._newScheduleName.trim();
        if (!name || this._creating) {
            return;
        }
        this._creating = true;
        try {
            await this.services().createSchedule(name);
            this._newScheduleName = '';
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error('schedule_manager.create_schedule failed', e);
        }
        finally {
            this._creating = false;
        }
    }
    setConfig(config) {
        if (!config.type) {
            throw new Error('Type must be defined');
        }
        this.config = config;
    }
    getCardSize() {
        return 3;
    }
};
__decorate([
    n$2({ attribute: false })
], ScheduleManagerCard.prototype, "hass", void 0);
__decorate([
    n$2({ attribute: false })
], ScheduleManagerCard.prototype, "config", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_newScheduleName", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_creating", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_visualEdit", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_actionWizardOpen", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_actionWizardStep", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_actionWizardSearch", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_actionWizardDomain", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_actionWizardServiceShort", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_actionWizardEntityId", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_quickEntityPickerNonce", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_entityAddPickerOpenKey", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_editorFriseWidth", void 0);
ScheduleManagerCard = __decorate([
    e$1('schedule-manager-card')
], ScheduleManagerCard);
const w = window;
w.customCards = w.customCards || [];
w.customCards.push({
    type: 'schedule-manager-card',
    name: 'Schedule Manager',
    description: 'Planning Schedule Manager',
});

export { ScheduleManagerCard };
