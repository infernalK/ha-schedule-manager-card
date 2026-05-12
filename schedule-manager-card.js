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
  }

  .card {
    padding: 16px;
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

  .time-block-col {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 0.9em;
  }

  .payload-preview {
    font-size: 0.75em;
    opacity: 0.85;
    word-break: break-all;
  }

  .block-remove {
    flex-shrink: 0;
    padding: 4px 8px;
    font-size: 0.8em;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }

  .add-block-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 8px;
    align-items: end;
  }

  @media (max-width: 450px) {
    .add-block-form {
      grid-template-columns: 1fr;
    }
  }

  .add-block-form label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.8em;
    color: var(--secondary-text-color);
  }

  .add-block-form input[type='time'],
  .add-block-form input[type='text'],
  .add-block-form textarea {
    padding: 6px 8px;
    border-radius: 4px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-family: inherit;
  }

  .add-block-form textarea {
    grid-column: 1 / -1;
    min-height: 52px;
    resize: vertical;
  }

  .add-block-form .full-row {
    grid-column: 1 / -1;
  }

  .add-block-form button.add-plage {
    grid-column: 1 / -1;
    padding: 8px;
    border-radius: 4px;
    border: none;
    background: var(--primary-color);
    color: var(--text-primary-color);
    cursor: pointer;
  }

  .time-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    margin-bottom: 4px;
  }

  .active {
    background-color: var(--primary-color);
    color: var(--text-primary-color);
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
`;

let ScheduleManagerCardEditor = class ScheduleManagerCardEditor extends s {
    setConfig(config) {
        this._config = config;
    }
    render() {
        return x `
      <div class="card-config">
        <paper-input
          label="Entité statut (optionnel)"
          .value=${this._config?.status_entity || ''}
          @value-changed=${this._statusEntityChanged}
        ></paper-input>
        <paper-input
          label="ID de groupe (optionnel)"
          .value=${this._config?.group_id || ''}
          @value-changed=${this._groupIdChanged}
        ></paper-input>
        <paper-input
          label="IDs de plannings (séparés par des virgules)"
          .value=${this._config?.schedule_ids?.join(',') || ''}
          @value-changed=${this._scheduleIdsChanged}
        ></paper-input>
      </div>
    `;
    }
    _statusEntityChanged(ev) {
        const value = (ev.detail?.value ?? '').trim();
        this._config = {
            ...(this._config || { type: 'custom:schedule-manager-card' }),
            status_entity: value || undefined,
        };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
    }
    _groupIdChanged(ev) {
        const value = (ev.detail?.value ?? '').trim();
        this._config = {
            ...(this._config || { type: 'custom:schedule-manager-card' }),
            group_id: value || undefined,
        };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
    }
    _scheduleIdsChanged(ev) {
        const raw = ev.detail?.value ?? '';
        const ids = String(raw)
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id);
        this._config = {
            ...(this._config || { type: 'custom:schedule-manager-card' }),
            schedule_ids: ids.length ? ids : undefined,
        };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
    }
};
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
const DEFAULT_BLOCK_DRAFT = {
    start: '08:00',
    end: '09:00',
    actionType: 'set_preset_mode',
    payloadStr: '{"preset_mode":"comfort"}',
};
function normalizeTimeForHa(t) {
    const s = t.trim();
    if (!s) {
        return '00:00:00';
    }
    const p = s.split(':');
    if (p.length === 2) {
        return `${p[0]}:${p[1]}:00`;
    }
    return s;
}
function parseTimeToMinutes(t) {
    const parts = String(t).split(':').map((p) => Number(p));
    const h = parts[0] ?? 0;
    const m = parts[1] ?? 0;
    const s = parts[2] ?? 0;
    return h * 60 + m + s / 60;
}
function nowMinutes() {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;
}
let ScheduleManagerCard = class ScheduleManagerCard extends s {
    constructor() {
        super(...arguments);
        this._newScheduleName = '';
        this._creating = false;
        /** Brouillon pour le formulaire « ajouter une plage » par planning */
        this._drafts = {};
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
    }
    statusEntityId() {
        return this.config?.status_entity?.trim() || DEFAULT_STATUS_ENTITY;
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
    getCurrentBlockId() {
        const state = this.hass?.states[this.statusEntityId()];
        const attrs = state?.attributes;
        const cur = attrs?.current_time_block;
        return cur?.id;
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
      <ha-card class="card">
        <div class="card-header">Schedule Manager</div>
        <div class="card-content">
          ${groupId
            ? this.renderGroup(groupsMap[groupId], schedulesMap)
            : this.renderSchedulesList(scheduleIds, schedulesMap)}
        </div>
      </ha-card>
    `;
    }
    renderSchedulesList(scheduleIds, schedulesMap) {
        const totalCount = Object.keys(schedulesMap).length;
        const list = scheduleIds.length > 0
            ? scheduleIds.map((id) => schedulesMap[id]).filter(Boolean)
            : Object.values(schedulesMap);
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
        return x `
      <div class="group">
        <h3>${group.name}</h3>
        ${group.schedules.map((scheduleId) => {
            const schedule = schedulesMap[scheduleId];
            return this.renderSchedule(schedule, group);
        })}
      </div>
    `;
    }
    draftFor(scheduleId) {
        return this._drafts[scheduleId] ?? DEFAULT_BLOCK_DRAFT;
    }
    patchDraft(scheduleId, patch) {
        const prev = this._drafts[scheduleId] ?? { ...DEFAULT_BLOCK_DRAFT };
        this._drafts = { ...this._drafts, [scheduleId]: { ...prev, ...patch } };
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
        const draft = this.draftFor(schedule.id);
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

        <div class="subsection-title">Plages horaires</div>
        ${blocks.length === 0
            ? x `<div class="empty-hint">Aucune plage — ajoutez-en une ci-dessous.</div>`
            : null}
        ${blocks.map((block, index) => x `
            <div class="time-block ${this.isActiveBlock(block) ? 'active' : ''}">
              <div class="time-block-col">
                <span
                  ><strong>${block.start_time}</strong> →
                  <strong>${block.end_time}</strong></span
                >
                <span>${block.action_type}</span>
                <span class="payload-preview"
                  >${JSON.stringify(block.action_payload ?? {})}</span
                >
              </div>
              <button
                type="button"
                class="block-remove"
                @click=${() => this.removeBlockAt(schedule, index)}
              >
                Retirer
              </button>
            </div>
          `)}

        <div class="add-block-form">
          <label>
            Début
            <input
              type="time"
              .value=${draft.start}
              @input=${(e) => this.patchDraft(schedule.id, {
            start: e.target.value,
        })}
            />
          </label>
          <label>
            Fin
            <input
              type="time"
              .value=${draft.end}
              @input=${(e) => this.patchDraft(schedule.id, { end: e.target.value })}
            />
          </label>
          <label class="full-row">
            Type d’action
            <input
              type="text"
              placeholder="set_preset_mode"
              .value=${draft.actionType}
              @input=${(e) => this.patchDraft(schedule.id, {
            actionType: e.target.value,
        })}
            />
          </label>
          <label class="full-row">
            Payload JSON
            <textarea
              .value=${draft.payloadStr}
              @input=${(e) => this.patchDraft(schedule.id, {
            payloadStr: e.target.value,
        })}
            ></textarea>
          </label>
          <button type="button" class="add-plage" @click=${() => this.addBlockToSchedule(schedule)}>
            Ajouter la plage
          </button>
        </div>

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
    isActiveBlock(block) {
        const curId = this.getCurrentBlockId();
        if (curId && block.id === curId) {
            return true;
        }
        const start = parseTimeToMinutes(block.start_time);
        const end = parseTimeToMinutes(block.end_time);
        const now = nowMinutes();
        if (end > start) {
            return now >= start && now < end;
        }
        if (end < start) {
            return now >= start || now < end;
        }
        return false;
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
    async removeBlockAt(schedule, index) {
        const next = [...(schedule.time_blocks || [])];
        next.splice(index, 1);
        try {
            await this.services().updateSchedule(schedule.id, {
                time_blocks: this.blocksToPayload(next),
            });
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error('schedule_manager.update_schedule failed', e);
        }
    }
    async addBlockToSchedule(schedule) {
        const d = this.draftFor(schedule.id);
        let payload;
        try {
            payload = JSON.parse(d.payloadStr.trim() || '{}');
            if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
                throw new Error('payload doit être un objet JSON');
            }
        }
        catch {
            alert('Payload JSON invalide (objet attendu, ex. {"preset_mode":"comfort"})');
            return;
        }
        const actionType = d.actionType.trim();
        if (!actionType) {
            alert('Indiquez un type d’action.');
            return;
        }
        const newBlock = {
            start_time: normalizeTimeForHa(d.start),
            end_time: normalizeTimeForHa(d.end),
            action_type: actionType,
            action_payload: payload,
        };
        const merged = [...this.blocksToPayload(schedule.time_blocks || []), newBlock];
        try {
            await this.services().updateSchedule(schedule.id, { time_blocks: merged });
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error('schedule_manager.update_schedule failed', e);
        }
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
], ScheduleManagerCard.prototype, "_drafts", void 0);
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
