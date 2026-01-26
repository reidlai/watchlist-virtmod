import{l as m,p as P,i as A,f as c,a,c as x,t as ee,b as B,d as F,s as J,e as Ce}from"./legacy-B4DUf3ow.js";import{o as Pe}from"./index-client-BxLS0K7R.js";import{p as y,d as k,u as N,f as u,h as p,i as C,j as te,k as g,m as E,t as Q}from"./runtime-BFaUp9fJ.js";import{a as D,s as V,c as v}from"./utils-DkOHMcqz.js";import{w as W}from"./WatchlistState.svelte-BRAPbZVb.js";import"./_commonjsHelpers-CqkleIqs.js";var Ae=c("<div><!></div>");function me(s,e){const l=m(e,["children","$$slots","$$events","$$legacy"]),r=m(l,["class"]);y(e,!1);let n=P(e,"class",8,void 0);A();var t=Ae();D(t,i=>({class:i,...r}),[()=>(u(v),u(n()),N(()=>v("rounded-lg border bg-card text-card-foreground shadow-sm",n())))]);var o=p(t);V(o,e,"default",{}),a(s,t),k()}me.__docgen={version:3,name:"card.svelte",data:[],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};var Ne=c("<div><!></div>");function ue(s,e){const l=m(e,["children","$$slots","$$events","$$legacy"]),r=m(l,["class"]);y(e,!1);let n=P(e,"class",8,void 0);A();var t=Ne();D(t,i=>({class:i,...r}),[()=>(u(v),u(n()),N(()=>v("p-6 pt-0",n())))]);var o=p(t);V(o,e,"default",{}),a(s,t),k()}ue.__docgen={version:3,name:"card-content.svelte",data:[],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};var De=c("<p><!></p>");function ve(s,e){const l=m(e,["children","$$slots","$$events","$$legacy"]),r=m(l,["class"]);y(e,!1);let n=P(e,"class",8,void 0);A();var t=De();D(t,i=>({class:i,...r}),[()=>(u(v),u(n()),N(()=>v("text-sm text-muted-foreground",n())))]);var o=p(t);V(o,e,"default",{}),a(s,t),k()}ve.__docgen={version:3,name:"card-description.svelte",data:[],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};var Ve=c("<div><!></div>");function ge(s,e){const l=m(e,["children","$$slots","$$events","$$legacy"]),r=m(l,["class"]);y(e,!1);let n=P(e,"class",8,void 0);A();var t=Ve();D(t,i=>({class:i,...r}),[()=>(u(v),u(n()),N(()=>v("flex flex-col space-y-1.5 p-6",n())))]);var o=p(t);V(o,e,"default",{}),a(s,t),k()}ge.__docgen={version:3,name:"card-header.svelte",data:[],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};var Ie=c("<h3><!></h3>");function pe(s,e){const l=m(e,["children","$$slots","$$events","$$legacy"]),r=m(l,["class"]);y(e,!1);let n=P(e,"class",8,void 0);A();var t=Ie();D(t,i=>({class:i,...r}),[()=>(u(v),u(n()),N(()=>v("text-2xl font-semibold leading-none tracking-tight",n())))]);var o=p(t);V(o,e,"default",{}),a(s,t),k()}pe.__docgen={version:3,name:"card-title.svelte",data:[],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[{keywords:[],visibility:"public",description:"",name:"default"}],refs:[]};async function Oe(...s){const e=new CustomEvent("storybook:goto",{detail:s});window.dispatchEvent(e)}var Ge=c('<div class="flex items-center space-x-2"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div> <span class="text-sm text-muted-foreground">Loading...</span></div>'),Ee=c('<div class="text-sm text-red-500 text-destructive"> </div>'),We=c("<!> <!>",1),Se=c('<p class="text-sm text-muted-foreground"> </p>'),Le=c("<!> <!>",1),ze=c('<div role="button" tabindex="0" class="@container w-full h-full cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"><!></div>');function fe(s,e){y(e,!0);let l=E(()=>e.tickers??W.tickers??["PLACEHOLDER"]),r=E(()=>e.loading??W.loading??!1),n=E(()=>e.error??W.error??null),t=E(()=>e.tickerCount??g(l).length);function o(){Oe("/watchlist")}function i(b){(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),o())}Pe(()=>{W.getWatchlist()});var I=ze();I.__click=o,I.__keydown=i;var he=p(I);x(he,()=>me,(b,ye)=>{ye(b,{class:"w-full",children:(ke,Te)=>{var U=Le(),X=C(U);x(X,()=>ge,(T,j)=>{j(T,{class:"pb-2",children:(H,_e)=>{var _=We(),O=C(_);x(O,()=>ve,(d,f)=>{f(d,{children:(M,Y)=>{var R=ee("Number of Tickers in Watchlist");a(M,R)},$$slots:{default:!0}})});var K=te(O,2);{var w=d=>{var f=Ge();a(d,f)},G=d=>{var f=F(),M=C(f);{var Y=h=>{var $=Ee(),q=p($);Q(()=>J(q,g(n))),a(h,$)},R=h=>{var $=F(),q=C($);x(q,()=>pe,(we,$e)=>{$e(we,{class:"text-3xl font-bold tracking-tight",children:(xe,je)=>{var Z=ee();Q(()=>J(Z,g(t))),a(xe,Z)},$$slots:{default:!0}})}),a(h,$)};B(M,h=>{g(n)?h(Y):h(R,!1)},!0)}a(d,f)};B(K,d=>{g(r)?d(w):d(G,!1)})}a(H,_)},$$slots:{default:!0}})});var be=te(X,2);x(be,()=>ue,(T,j)=>{j(T,{children:(H,_e)=>{var _=F(),O=C(_);{var K=w=>{var G=Se(),d=p(G);Q(()=>J(d,`${g(t)??""}
          ${g(t)===1?"ticker":"tickers"} tracked`)),a(w,G)};B(O,w=>{!g(r)&&!g(n)&&w(K)})}a(H,_)},$$slots:{default:!0}})}),a(ke,U)},$$slots:{default:!0}})}),a(s,I),k()}Ce(["click","keydown"]);fe.__docgen={data:[{name:"tickers",visibility:"public",keywords:[],kind:"let",type:{kind:"union",type:[{kind:"type",type:"array",text:"string[]"},{kind:"type",type:"array",text:"ITicker[]"}],text:"string[] | ITicker[]"},static:!1,readonly:!1,defaultValue:"..."},{name:"tickerCount",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"number",text:"number"},static:!1,readonly:!1,defaultValue:"..."},{name:"loading",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"boolean",text:"boolean"},static:!1,readonly:!1,defaultValue:"..."},{name:"error",visibility:"public",keywords:[],kind:"let",type:{kind:"type",type:"string",text:"string"},static:!1,readonly:!1,defaultValue:"..."}],name:"WatchlistSummaryWidget.svelte"};const Fe={title:"Widgets/WatchlistSummaryWidget",component:fe,tags:["autodocs"],argTypes:{tickers:{control:"object",description:"Array of ticker symbols"},tickerCount:{control:"number",description:"Placeholder of tickerCount in storybook"},loading:{control:"boolean",description:"Loading state"},error:{control:"text",description:"Error message (if any)"}}},S={args:{tickers:[{name:"Alphabet C",symbol:"GOOG",last:336.42,open:334.68,high:337.02,low:331.14,change:-.01,changePercent:0,volume:1276e4},{name:"NVIDIA",symbol:"NVDA",last:183.27,open:184.33,high:184.45,low:180.83,change:-2.54,changePercent:-1.37,volume:14123e4}],tickerCount:2,loading:!1,error:""}},L={args:{tickers:[{name:"Alphabet C",symbol:"GOOG",last:336.42,open:334.68,high:337.02,low:331.14,change:-.01,changePercent:0,volume:1276e4},{name:"NVIDIA",symbol:"NVDA",last:183.27,open:184.33,high:184.45,low:180.83,change:-2.54,changePercent:-1.37,volume:14123e4}],tickerCount:2,loading:!0,error:""}},z={args:{tickers:[{name:"Alphabet C",symbol:"GOOG",last:336.42,open:334.68,high:337.02,low:331.14,change:-.01,changePercent:0,volume:1276e4},{name:"NVIDIA",symbol:"NVDA",last:183.27,open:184.33,high:184.45,low:180.83,change:-2.54,changePercent:-1.37,volume:14123e4}],tickerCount:2,loading:!1,error:"No tickers in watchlist"}};var ne,ae,se;S.parameters={...S.parameters,docs:{...(ne=S.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    tickers: [{
      name: "Alphabet C",
      symbol: "GOOG",
      last: 336.42,
      open: 334.68,
      high: 337.02,
      low: 331.14,
      change: -0.01,
      changePercent: 0,
      volume: 12760000
    }, {
      name: "NVIDIA",
      symbol: "NVDA",
      last: 183.27,
      open: 184.33,
      high: 184.45,
      low: 180.83,
      change: -2.54,
      changePercent: -1.37,
      volume: 141230000
    }],
    tickerCount: 2,
    loading: false,
    error: ""
  }
}`,...(se=(ae=S.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var re,oe,le;L.parameters={...L.parameters,docs:{...(re=L.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    tickers: [{
      name: "Alphabet C",
      symbol: "GOOG",
      last: 336.42,
      open: 334.68,
      high: 337.02,
      low: 331.14,
      change: -0.01,
      changePercent: 0,
      volume: 12760000
    }, {
      name: "NVIDIA",
      symbol: "NVDA",
      last: 183.27,
      open: 184.33,
      high: 184.45,
      low: 180.83,
      change: -2.54,
      changePercent: -1.37,
      volume: 141230000
    }],
    tickerCount: 2,
    loading: true,
    error: ""
  }
}`,...(le=(oe=L.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var ie,ce,de;z.parameters={...z.parameters,docs:{...(ie=z.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    tickers: [{
      name: "Alphabet C",
      symbol: "GOOG",
      last: 336.42,
      open: 334.68,
      high: 337.02,
      low: 331.14,
      change: -0.01,
      changePercent: 0,
      volume: 12760000
    }, {
      name: "NVIDIA",
      symbol: "NVDA",
      last: 183.27,
      open: 184.33,
      high: 184.45,
      low: 180.83,
      change: -2.54,
      changePercent: -1.37,
      volume: 141230000
    }],
    tickerCount: 2,
    loading: false,
    error: "No tickers in watchlist"
  }
}`,...(de=(ce=z.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};const Je=["Default","Loading","Error"];export{S as Default,z as Error,L as Loading,Je as __namedExportsOrder,Fe as default};
