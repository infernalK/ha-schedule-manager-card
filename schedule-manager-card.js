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
const t$2=window,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$5=new WeakMap;let o$3 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$5.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$3("string"==typeof t?t:t+"",void 0,s$3),i$2=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$3(n,t,s$3)},S$1=(s,n)=>{e$4?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$2.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$3=window,r$1=e$3.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$2=e$3.reactiveElementPolyfillSupport,n$4={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:n$4,reflect:!1,hasChanged:a$1},d$1="finalized";let u$1 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty(d$1))return !1;this[d$1]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$4).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$4;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$1[d$1]=!0,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:u$1}),(null!==(s$2=e$3.reactiveElementVersions)&&void 0!==s$2?s$2:e$3.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$1=window,s$1=i$1.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1="$lit$",n$3=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$3,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w$1=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w$1(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$1+s.slice(v)+n$3+w):s+n$3+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$1)||i.startsWith(n$3)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$1).split(n$3),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$3),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$3,t+1));)v.push({type:7,index:r}),t+=n$3.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$1.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$1=i$1.litHtmlVersions)&&void 0!==t$1?t$1:i$1.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$2=globalThis.litElementPolyfillSupport;null==n$2||n$2({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.3.3");

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
const i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$1(n){return (t,o)=>void 0!==o?e(n,t,o):i(n,t)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return n$1({...t,state:!0})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

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

const styles = i$2 `
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

  /* Frise 24 h — variante « thermostat » (barre continue, type intégration HA) */
  .timeline-frise {
    margin: 0 0 16px;
    padding: 10px 12px;
    border-radius: 8px;
    background: rgba(127, 127, 127, 0.08);
    border: 1px solid var(--divider-color);
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  .timeline-frise--hvac {
    padding: 12px 14px 14px;
    border-radius: 12px;
    background: rgba(30, 30, 30, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .timeline-rail {
    position: relative;
    height: 52px;
    border-radius: 6px;
    background: rgba(127, 127, 127, 0.18);
    overflow: hidden;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12);
    width: 100%;
    box-sizing: border-box;
  }

  .timeline-rail--continuous {
    height: 56px;
    border-radius: 999px;
    overflow: hidden;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.42) 0%,
      rgba(0, 0, 0, 0.22) 100%
    );
    box-shadow:
      inset 0 2px 8px rgba(0, 0, 0, 0.45),
      inset 0 -1px 0 rgba(255, 255, 255, 0.06),
      0 1px 0 rgba(255, 255, 255, 0.05);
    isolation: isolate;
  }

  .timeline-segment {
    position: absolute;
    top: 0;
    height: 100%;
    min-width: 3px;
    box-sizing: border-box;
    padding: 2px 6px;
    color: var(--text-primary-color, #fff);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .timeline-segment--hvac {
    border-right: 1px solid rgba(255, 255, 255, 0.14);
    border-left: none;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .timeline-frise--hvac .timeline-segment.is-selected {
    z-index: 3;
    box-shadow:
      inset 0 0 0 3px rgba(255, 255, 255, 0.95),
      0 0 0 2px rgba(0, 0, 0, 0.35),
      0 0 16px rgba(255, 255, 255, 0.25);
    filter: saturate(1.12) brightness(1.05);
  }

  .timeline-segment-label {
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1.15;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    padding: 0 2px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
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

  /* Échelle horaire en ligne (évite les bugs de positionnement absolu dans HA) */
  .timeline-scale-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    max-width: 100%;
    margin-top: 10px;
    padding: 2px 2px 0;
    box-sizing: border-box;
    gap: 2px;
  }

  .timeline-scale-flex-label {
    flex: 1 1 0;
    min-width: 0;
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--secondary-text-color);
    white-space: nowrap;
    text-align: center;
    letter-spacing: 0.02em;
  }

  .timeline-scale-flex-label:first-child {
    text-align: left;
  }

  .timeline-scale-flex-label:last-child {
    text-align: right;
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
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    font-size: 0.75rem;
    border-radius: 16px;
    background: rgba(127, 127, 127, 0.2);
    max-width: 100%;
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
    margin-top: 8px;
    margin-bottom: 24px;
    border-radius: 12px;
    background: var(--card-background-color, var(--ha-card-background, #1e1e1e));
    border: 1px solid var(--divider-color);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
    color: var(--primary-text-color);
    box-sizing: border-box;
    overflow-x: hidden;
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
  }

  .sm-color-field {
    margin-bottom: 14px;
  }

  .sm-color-field-title {
    display: block;
    margin-bottom: 8px;
    font-size: 0.78em;
    color: var(--secondary-text-color);
  }

  .sm-color-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  .sm-color-native {
    width: 52px;
    height: 40px;
    padding: 0;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    cursor: pointer;
    background: var(--card-background-color);
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
  }

  .sm-form-label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 10px;
    font-size: 0.78em;
    color: var(--secondary-text-color);
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

  .sm-payload-textarea {
    min-height: 72px;
    resize: vertical;
    font-family: inherit;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
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

  .sm-time-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }

  .sm-time-row label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.78em;
    color: var(--secondary-text-color);
  }

  .sm-time-row input {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-family: inherit;
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

  .sm-editor-rail .timeline-segment {
    cursor: pointer;
  }

  .sm-editor-rail .timeline-segment:hover:not(.is-selected) {
    filter: brightness(1.08);
  }

  .timeline-boundary-handle {
    position: absolute;
    top: 50%;
    width: 30px;
    height: 30px;
    margin-top: -15px;
    margin-left: -15px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: rgba(245, 248, 252, 0.96);
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.28),
      0 3px 10px rgba(0, 0, 0, 0.35);
    cursor: ew-resize;
    z-index: 6;
    touch-action: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(55, 71, 79, 0.85);
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
  }

  .timeline-boundary-handle::after {
    content: '\2039 \203A';
    letter-spacing: 0.02em;
    pointer-events: none;
    font-size: 12px;
  }

  .timeline-boundary-handle:hover {
    background: var(--primary-color, #2196f3);
    color: var(--text-primary-color, #fff);
    box-shadow:
      0 0 0 2px rgba(255, 255, 255, 0.35),
      0 4px 12px rgba(33, 150, 243, 0.55);
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
`;

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
function entityMatchesDomains(entityId, domains) {
    if (!domains.length) {
        return true;
    }
    const dom = entityId.split('.')[0];
    return domains.includes(dom);
}

const MINUTES_PER_DAY = 24 * 60;
/** Métadonnée carte uniquement — à retirer si le payload est passé tel quel à un service HA. */
const SCHEDULE_MANAGER_COLOR_KEY = 'schedule_manager_color';
function parseToMinutes(t) {
    const parts = String(t).split(':').map((p) => Number(p));
    const h = parts[0] ?? 0;
    const m = parts[1] ?? 0;
    const s = parts[2] ?? 0;
    return h * 60 + m + s / 60;
}
function segmentLabel(block) {
    const p = block.action_payload;
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
    const tail = block.action_type.includes('.')
        ? block.action_type.split('.').pop()
        : block.action_type;
    return tail.length > 14 ? `${tail.slice(0, 12)}…` : tail;
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
    return hueFromLabel(`${label}-${block.action_type}`);
}
/** Couleur de remplissage segment (#hex ou hsl dérivé du bloc). */
function blockTimelineFill(block) {
    const p = block.action_payload;
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
function minutesToHaTime(totalMinutes) {
    let m = Math.round(totalMinutes) % MINUTES_PER_DAY;
    if (m < 0) {
        m += MINUTES_PER_DAY;
    }
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}:00`;
}
function isOvernightBlock(b) {
    const s = parseToMinutes(b.start_time);
    const e = parseToMinutes(b.end_time);
    return e < s;
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

let ScheduleManagerCardEditor = class ScheduleManagerCardEditor extends s {
    setConfig(config) {
        this._config = {
            type: 'custom:schedule-manager-card',
            ...config,
        };
    }
    render() {
        const hass = this.hass;
        if (!hass) {
            return x `<div class="card-config">Chargement du tableau de bord…</div>`;
        }
        return x `
      <div class="card-config">
        <ha-entity-picker
          .hass=${hass}
          label="Capteur Schedule Manager"
          .value=${this._config?.status_entity ?? ''}
          .includeDomains=${['sensor']}
          .allowCustomEntity=${true}
          @value-changed=${this._statusEntityChanged}
        ></ha-entity-picker>
        <ha-textfield
          label="ID de groupe (optionnel)"
          .value=${this._config?.group_id ?? ''}
          @input=${this._groupIdChanged}
        ></ha-textfield>
        <ha-textfield
          label="IDs de plannings (optionnel, virgules — vide = tous)"
          .value=${this._config?.schedule_ids?.join(', ') ?? ''}
          @input=${this._scheduleIdsChanged}
        ></ha-textfield>
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
        this._patchConfig({ status_entity: value || undefined });
    }
    _groupIdChanged(ev) {
        const value = (ev.target.value ?? '').trim();
        this._patchConfig({ group_id: value || undefined });
    }
    _scheduleIdsChanged(ev) {
        const raw = ev.target.value ?? '';
        const ids = String(raw)
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id.length > 0);
        this._patchConfig({ schedule_ids: ids.length ? ids : undefined });
    }
};
ScheduleManagerCardEditor.styles = i$2 `
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
  `;
__decorate([
    n$1({ attribute: false })
], ScheduleManagerCardEditor.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], ScheduleManagerCardEditor.prototype, "config", void 0);
ScheduleManagerCardEditor = __decorate([
    e$1('schedule-manager-card-editor')
], ScheduleManagerCardEditor);

const DEFAULT_STATUS_ENTITY = 'sensor.schedule_manager_status';
const WEEKDAY_LABELS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
/** Graduations alignées sur la journée (comme le planning clim intégré HA). */
const TIMELINE_SCALE_TICKS = [
    { pct: 0, label: '00:00', align: 'start' },
    { pct: 25, label: '06:00', align: 'center' },
    { pct: 50, label: '12:00', align: 'center' },
    { pct: 75, label: '18:00', align: 'center' },
    { pct: 100, label: '24:00', align: 'end' },
];
/** Inline pour forcer la barre horizontale (certains thèmes HA neutralisent le CSS du shadow DOM). */
function railLayoutInlineStyle() {
    return [
        'position:relative',
        'display:block',
        'width:100%',
        'min-height:56px',
        'height:56px',
        'overflow:hidden',
        'border-radius:999px',
        'box-sizing:border-box',
    ].join(';');
}
function segmentLayoutInlineStyle(leftPct, widthPct, fill) {
    return [
        'position:absolute',
        'top:0',
        'height:100%',
        `left:${leftPct}%`,
        `width:${widthPct}%`,
        'box-sizing:border-box',
        'display:flex',
        'align-items:center',
        'justify-content:center',
        `background:${fill}`,
    ].join(';');
}
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
/** JSON éditable : sans entity_id ni couleur (couleur = champ dédié). */
function payloadForJsonEditor(payload) {
    const rec = payloadWithoutEntityId(payload);
    delete rec[SCHEDULE_MANAGER_COLOR_KEY];
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
function defaultNewBlock() {
    return {
        start_time: '12:00:00',
        end_time: '13:00:00',
        action_type: 'climate.set_preset_mode',
        action_payload: { preset_mode: 'comfort' },
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
    const h = Math.min(23, Math.max(0, parseInt(p[0] ?? '0', 10)));
    const m = Math.min(59, Math.max(0, parseInt(p[1] ?? '0', 10)));
    const sec = p[2] !== undefined && p[2] !== ''
        ? Math.min(59, Math.max(0, parseInt(p[2] ?? '0', 10)))
        : 0;
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
/** Empêche deux entrées identiques (horaires + action + payload normalisé). */
function blockFingerprint(block) {
    const st = normalizeTimeForHa(block.start_time);
    const et = normalizeTimeForHa(block.end_time);
    const at = String(block.action_type).trim();
    return `${st}|${et}|${at}|${stablePayloadString(payloadForDuplicateCheck(block.action_payload))}`;
}
let ScheduleManagerCard = class ScheduleManagerCard extends s {
    constructor() {
        super(...arguments);
        this._newScheduleName = '';
        this._creating = false;
        /** Éditeur plein écran (frise + détail plage), style config HA */
        this._visualEdit = null;
        this._visualPayloadStr = '';
        this._visualEntityPickerNonce = 0;
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
            m = Math.max(d.minM, Math.min(d.maxM, m));
            const ha = minutesToHaTime(m);
            const blocks = [...this._visualEdit.blocks];
            const L = blocks[d.leftIdx];
            const R = blocks[d.rightIdx];
            if (!L || !R) {
                return;
            }
            blocks[d.leftIdx] = { ...L, end_time: ha };
            blocks[d.rightIdx] = { ...R, start_time: ha };
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
        if (changed.has('_visualEdit') && this._visualEdit) {
            requestAnimationFrame(() => {
                const m = this.shadowRoot?.querySelector('.sm-modal');
                m?.focus();
            });
        }
    }
    statusEntityId() {
        return this.config?.status_entity?.trim() || DEFAULT_STATUS_ENTITY;
    }
    /**
     * La clé de l’objet `attributes.schedules` est l’identifiant canonique côté stockage.
     * Si le champ `id` à l’intérieur diverge (fichier JSON édité, ancien bug), les actions / suppression
     * visaient le mauvais UUID — d’où un planning « fantôme » ou introuvable.
     */
    withCanonicalId(storageKey, schedule) {
        if (schedule.id === storageKey) {
            return schedule;
        }
        return { ...schedule, id: storageKey };
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
            return this.renderSchedule(this.withCanonicalId(scheduleId, schedule), group);
        })}
      </div>
    `;
    }
    renderTimelineScale() {
        return x `
      <div class="timeline-scale-flex" aria-hidden="true">
        ${TIMELINE_SCALE_TICKS.map((t) => x `<span class="timeline-scale-flex-label">${t.label}</span>`)}
      </div>
    `;
    }
    renderDayTimeline(blocks) {
        const segments = blocksToTimelineSegments(blocks);
        const nowPct = nowPercentOfDay();
        return x `
      <div
        class="timeline-frise timeline-frise--hvac"
        role="img"
        aria-label="Plages sur 24 heures"
      >
        <div
          class="timeline-rail timeline-rail--continuous"
          style=${railLayoutInlineStyle()}
        >
          ${segments.map((s) => {
            const blk = blocks[s.blockIndex];
            const fill = blk ? blockTimelineFill(blk) : `hsl(${s.hue}, 58%, 42%)`;
            return x `
              <div
                class="timeline-segment timeline-segment--hvac"
                style=${segmentLayoutInlineStyle(s.leftPct, s.widthPct, fill)}
                title=${s.label}
              >
                <span class="timeline-segment-label">${s.label}</span>
              </div>
            `;
        })}
          <div
            class="timeline-now"
            style="position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;left:${nowPct}%"
          ></div>
        </div>
        ${this.renderTimelineScale()}
      </div>
    `;
    }
    blocksToPayload(blocks) {
        return (blocks || []).map((b) => ({
            start_time: String(b.start_time),
            end_time: String(b.end_time),
            action_type: b.action_type,
            action_payload: typeof b.action_payload === 'object' && b.action_payload !== null
                ? b.action_payload
                : {},
            ...(b.id ? { id: b.id } : {}),
        }));
    }
    renderSchedule(schedule, group) {
        if (!schedule) {
            return x ``;
        }
        const blocks = schedule.time_blocks || [];
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
        const blocks = JSON.parse(JSON.stringify(schedule.time_blocks || []));
        this._visualEdit = {
            scheduleId: schedule.id,
            blocks,
            repeatDays: [
                ...(schedule.repeat_days && schedule.repeat_days.length > 0
                    ? schedule.repeat_days
                    : [0, 1, 2, 3, 4, 5, 6]),
            ],
            selectedIndex: 0,
        };
        this.syncPayloadStrFromSelection();
    }
    closeVisualEditor() {
        this.endBoundaryDrag();
        this._visualEdit = null;
        this._visualPayloadStr = '';
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
    }
    onBoundaryPointerDown(ev, tb) {
        ev.preventDefault();
        ev.stopPropagation();
        if (!this._visualEdit) {
            return;
        }
        const rail = ev.currentTarget.closest('.sm-editor-rail');
        if (!rail) {
            return;
        }
        this.endBoundaryDrag();
        const handle = ev.currentTarget;
        this._boundaryDrag = {
            pointerId: ev.pointerId,
            leftIdx: tb.leftBlockIndex,
            rightIdx: tb.rightBlockIndex,
            minM: tb.minMinute,
            maxM: tb.maxMinute,
            rail,
            handle,
        };
        handle.setPointerCapture(ev.pointerId);
        window.addEventListener('pointermove', this._onBoundaryMove);
        window.addEventListener('pointerup', this._onBoundaryUp);
        window.addEventListener('pointercancel', this._onBoundaryUp);
    }
    syncPayloadStrFromSelection() {
        if (!this._visualEdit) {
            this._visualPayloadStr = '{}';
            return;
        }
        const b = this._visualEdit.blocks[this._visualEdit.selectedIndex];
        if (!b) {
            this._visualPayloadStr = '{}';
            return;
        }
        try {
            this._visualPayloadStr = JSON.stringify(payloadForJsonEditor(b.action_payload), null, 2);
        }
        catch {
            this._visualPayloadStr = '{}';
        }
    }
    applyPayloadEditorToVisualBlocks() {
        if (!this._visualEdit) {
            return false;
        }
        const sel = this._visualEdit.selectedIndex;
        const block = this._visualEdit.blocks[sel];
        if (!block) {
            return true;
        }
        try {
            const raw = this._visualPayloadStr.trim() || '{}';
            const extra = JSON.parse(raw);
            if (typeof extra !== 'object' || extra === null || Array.isArray(extra)) {
                throw new Error('invalid');
            }
            delete extra.entity_id;
            delete extra[SCHEDULE_MANAGER_COLOR_KEY];
            const entityIds = entityIdsFromPayload(block.action_payload);
            const action_payload = { ...extra };
            if (entityIds.length === 1) {
                action_payload.entity_id = entityIds[0];
            }
            else if (entityIds.length > 1) {
                action_payload.entity_id = [...entityIds];
            }
            const prevRec = typeof block.action_payload === 'object' && block.action_payload !== null
                ? block.action_payload
                : {};
            const prevColor = prevRec[SCHEDULE_MANAGER_COLOR_KEY];
            if (typeof prevColor === 'string') {
                action_payload[SCHEDULE_MANAGER_COLOR_KEY] = prevColor;
            }
            const nextBlocks = [...this._visualEdit.blocks];
            nextBlocks[sel] = { ...block, action_payload };
            this._visualEdit = { ...this._visualEdit, blocks: nextBlocks };
            return true;
        }
        catch {
            alert('Payload JSON invalide pour la plage sélectionnée (objet attendu).');
            return false;
        }
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
        if (!this.applyPayloadEditorToVisualBlocks()) {
            return;
        }
        const max = this._visualEdit.blocks.length - 1;
        const idx = Math.max(0, Math.min(index, max));
        this._visualEdit = { ...this._visualEdit, selectedIndex: idx };
        this.syncPayloadStrFromSelection();
    }
    visualPatchSelected(patch) {
        if (!this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const cur = this._visualEdit.blocks[sel];
        if (!cur) {
            return;
        }
        const nextBlocks = [...this._visualEdit.blocks];
        nextBlocks[sel] = { ...cur, ...patch };
        this._visualEdit = { ...this._visualEdit, blocks: nextBlocks };
    }
    visualAddBlock() {
        if (!this._visualEdit) {
            return;
        }
        if (!this.applyPayloadEditorToVisualBlocks()) {
            return;
        }
        const nb = defaultNewBlock();
        const nextBlocks = [...this._visualEdit.blocks, nb];
        const fp = blockFingerprint(nb);
        for (const b of this._visualEdit.blocks) {
            if (blockFingerprint(b) === fp) {
                alert('Une plage identique existe déjà — modifiez les horaires ou le service.');
                return;
            }
        }
        this._visualEdit = {
            ...this._visualEdit,
            blocks: nextBlocks,
            selectedIndex: nextBlocks.length - 1,
        };
        this.syncPayloadStrFromSelection();
        this._visualEntityPickerNonce += 1;
    }
    visualRemoveSelected() {
        if (!this._visualEdit) {
            return;
        }
        if (!this.applyPayloadEditorToVisualBlocks()) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const nextBlocks = this._visualEdit.blocks.filter((_, i) => i !== sel);
        let nextSel = sel;
        if (nextSel >= nextBlocks.length) {
            nextSel = Math.max(0, nextBlocks.length - 1);
        }
        this._visualEdit = {
            ...this._visualEdit,
            blocks: nextBlocks,
            selectedIndex: nextSel,
        };
        this.syncPayloadStrFromSelection();
        this._visualEntityPickerNonce += 1;
    }
    entityFilterVisualEditor() {
        if (!this._visualEdit) {
            return () => true;
        }
        const b = this._visualEdit.blocks[this._visualEdit.selectedIndex];
        const domains = domainsForActionType(b?.action_type ?? '');
        return (entityId) => entityMatchesDomains(entityId, domains);
    }
    visualOnEntitySelected(ev) {
        const v = String(ev.detail?.value ?? '').trim();
        if (!v || !this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const block = this._visualEdit.blocks[sel];
        if (!block) {
            return;
        }
        const ids = entityIdsFromPayload(block.action_payload);
        if (ids.includes(v)) {
            return;
        }
        const nextIds = [...ids, v];
        const base = typeof block.action_payload === 'object' && block.action_payload !== null
            ? { ...block.action_payload }
            : {};
        if (nextIds.length === 1) {
            base.entity_id = nextIds[0];
        }
        else {
            base.entity_id = nextIds;
        }
        this.visualPatchSelected({ action_payload: base });
        this._visualEntityPickerNonce += 1;
    }
    visualRemoveEntity(entityId) {
        if (!this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const block = this._visualEdit.blocks[sel];
        if (!block) {
            return;
        }
        const ids = entityIdsFromPayload(block.action_payload).filter((e) => e !== entityId);
        const base = typeof block.action_payload === 'object' && block.action_payload !== null
            ? { ...block.action_payload }
            : {};
        delete base.entity_id;
        if (ids.length === 1) {
            base.entity_id = ids[0];
        }
        else if (ids.length > 1) {
            base.entity_id = ids;
        }
        this.visualPatchSelected({ action_payload: base });
    }
    async saveVisualEditor() {
        if (!this._visualEdit) {
            return;
        }
        if (!this.applyPayloadEditorToVisualBlocks()) {
            return;
        }
        const { scheduleId, blocks, repeatDays } = this._visualEdit;
        for (const b of blocks) {
            if (!String(b.action_type ?? '').trim()) {
                alert('Chaque plage doit avoir un type d’action (service).');
                return;
            }
        }
        const dupAt = findDuplicateBlockIndex(blocks);
        if (dupAt >= 0) {
            alert(`Deux plages identiques (horaires + action + payload) — modifiez l’entrée n° ${dupAt + 1}.`);
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
    renderClimatePresetSelect(selected) {
        const modes = this.getClimatePresetModesForSelected();
        if (!modes?.length) {
            return x ``;
        }
        const cur = String(selected.action_payload?.preset_mode ?? '');
        const orphan = cur && !modes.includes(cur);
        return x `
      <label class="sm-form-label">
        Mode préréglé
        <select
          class="sm-select"
          .value=${cur}
          @change=${(e) => this.visualSetPresetMode(e.target.value)}
        >
          ${orphan ? x `<option value=${cur}>${cur} (actuel)</option>` : null}
          ${modes.map((m) => x `<option value=${m}>${m}</option>`)}
        </select>
      </label>
    `;
    }
    getClimatePresetModesForSelected() {
        if (!this.hass || !this._visualEdit) {
            return null;
        }
        const block = this._visualEdit.blocks[this._visualEdit.selectedIndex];
        if (!block || block.action_type.trim() !== 'climate.set_preset_mode') {
            return null;
        }
        const ids = entityIdsFromPayload(block.action_payload);
        for (const id of ids) {
            if (!id.startsWith('climate.')) {
                continue;
            }
            const st = this.hass.states[id];
            if (!st) {
                continue;
            }
            const pm = st.attributes?.preset_modes;
            if (Array.isArray(pm) && pm.every((x) => typeof x === 'string')) {
                return pm;
            }
        }
        return null;
    }
    visualSetPresetMode(mode) {
        if (!this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const block = this._visualEdit.blocks[sel];
        if (!block) {
            return;
        }
        const base = typeof block.action_payload === 'object' && block.action_payload !== null
            ? { ...block.action_payload }
            : {};
        base.preset_mode = mode;
        this.visualPatchSelected({ action_payload: base });
        this.syncPayloadStrFromSelection();
    }
    hasCustomBlockColor(block) {
        const p = block.action_payload;
        if (!p || typeof p !== 'object') {
            return false;
        }
        return typeof p[SCHEDULE_MANAGER_COLOR_KEY] === 'string';
    }
    blockColorPickerHex(block) {
        const p = block.action_payload;
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
        if (!block) {
            return;
        }
        const base = typeof block.action_payload === 'object' && block.action_payload !== null
            ? { ...block.action_payload }
            : {};
        base[SCHEDULE_MANAGER_COLOR_KEY] = hex;
        this.visualPatchSelected({ action_payload: base });
    }
    visualClearBlockColor() {
        if (!this._visualEdit) {
            return;
        }
        const sel = this._visualEdit.selectedIndex;
        const block = this._visualEdit.blocks[sel];
        if (!block) {
            return;
        }
        const base = typeof block.action_payload === 'object' && block.action_payload !== null
            ? { ...block.action_payload }
            : {};
        delete base[SCHEDULE_MANAGER_COLOR_KEY];
        this.visualPatchSelected({ action_payload: base });
    }
    renderBlockColorControls(block) {
        const pickerVal = this.blockColorPickerHex(block);
        const custom = this.hasCustomBlockColor(block);
        return x `
      <div class="sm-form-label sm-color-field">
        <span class="sm-color-field-title">Couleur sur la frise</span>
        <div class="sm-color-row">
          <input
            type="color"
            class="sm-color-native"
            .value=${pickerVal}
            @input=${(e) => this.visualSetBlockColor(e.target.value)}
          />
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
        const segments = blocksToTimelineSegments(blocks);
        const boundaries = touchBoundariesBetweenBlocks(blocks);
        const nowPct = nowPercentOfDay();
        return x `
      <div
        class="timeline-frise sm-editor-frise timeline-frise--hvac"
        role="group"
        aria-label="Plages sur 24 heures — cliquer pour sélectionner, poignées pour ajuster"
      >
        <div class="sm-frise-heading">
          <span class="sm-frise-heading-label">Heure</span>
        </div>
        <div
          class="timeline-rail sm-editor-rail timeline-rail--continuous"
          style=${railLayoutInlineStyle()}
        >
          ${segments.map((s) => {
            const blk = blocks[s.blockIndex];
            const fill = blk ? blockTimelineFill(blk) : `hsl(${s.hue}, 58%, 42%)`;
            return x `
              <div
                class="timeline-segment timeline-segment--hvac ${s.blockIndex === selectedIndex
                ? 'is-selected'
                : ''}"
                style=${segmentLayoutInlineStyle(s.leftPct, s.widthPct, fill)}
                title=${s.label}
                @click=${() => this.visualSelectBlock(s.blockIndex)}
              >
                <span class="timeline-segment-label">${s.label}</span>
              </div>
            `;
        })}
          ${boundaries.map((tb) => x `
              <button
                type="button"
                class="timeline-boundary-handle"
                style="position:absolute;left:${tb.pct}%"
                aria-label="Ajuster la transition entre deux plages"
                title="Glisser pour déplacer la transition"
                @pointerdown=${(e) => this.onBoundaryPointerDown(e, tb)}
              ></button>
            `)}
          <div
            class="timeline-now"
            style="position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;left:${nowPct}%"
          ></div>
        </div>
        ${this.renderTimelineScale()}
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
                        @input=${(e) => this.visualPatchSelected({
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
                        @input=${(e) => this.visualPatchSelected({
                end_time: normalizeTimeForHa(e.target.value),
            })}
                      />
                    </label>
                  </div>
                  ${this.renderBlockColorControls(selected)}
                  <div class="sm-action-card">
                    <h4>Action pendant cette plage</h4>
                    <label class="sm-form-label">
                      Service (domaine.action)
                      <input
                        type="text"
                        placeholder="climate.set_preset_mode"
                        .value=${selected.action_type}
                        @input=${(e) => this.visualPatchSelected({
                action_type: e.target.value,
            })}
                      />
                    </label>
                    <label class="sm-form-label">
                      Entités ciblées
                      <div class="entity-chips">
                        ${entityIdsFromPayload(selected.action_payload).map((eid) => x `
                            <span class="entity-chip">
                              <code>${eid}</code>
                              <button
                                type="button"
                                aria-label="Retirer"
                                @click=${() => this.visualRemoveEntity(eid)}
                              >
                                ×
                              </button>
                            </span>
                          `)}
                      </div>
                      <ha-entity-picker
                        .hass=${this.hass}
                        .entityFilter=${this.entityFilterVisualEditor()}
                        .allowCustomEntity=${true}
                        label="Ajouter une entité"
                        .value=${''}
                        id=${`sm-viz-ep-${v.scheduleId}-${sel}-${this._visualEntityPickerNonce}`}
                        @value-changed=${(e) => this.visualOnEntitySelected(e)}
                      ></ha-entity-picker>
                    </label>
                    ${this.renderClimatePresetSelect(selected)}
                    <label class="sm-form-label sm-form-label-last">
                      Payload JSON (sans entity_id — géré par les puces)
                      <textarea
                        class="sm-payload-textarea"
                        .value=${this._visualPayloadStr}
                        @input=${(e) => {
                this._visualPayloadStr = e.target.value;
            }}
                      ></textarea>
                    </label>
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
    n$1({ attribute: false })
], ScheduleManagerCard.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
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
], ScheduleManagerCard.prototype, "_visualPayloadStr", void 0);
__decorate([
    t()
], ScheduleManagerCard.prototype, "_visualEntityPickerNonce", void 0);
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
