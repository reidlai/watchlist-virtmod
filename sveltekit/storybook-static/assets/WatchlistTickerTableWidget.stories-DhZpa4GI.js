import{W as k}from"./WatchlistTickerTableWidget-B8-9hyah.js";import"./legacy-B4DUf3ow.js";import"./runtime-BFaUp9fJ.js";import"./utils-DkOHMcqz.js";const T={title:"Widgets/WatchlistTickerTableWidget",component:k,tags:["autodocs"],argTypes:{tickers:{control:"object",description:"Array of ticker data objects"},loading:{control:"boolean",description:"Loading state"},error:{control:"text",description:"Error message (if any)"}}},f=[{symbol:"GOOG",name:"Alphabet C",last:336.42,open:334.68,high:337.02,low:331.14,change:-.01,changePercent:0,volume:1276e4,last_updated_at:1716654e6},{symbol:"NVDA",name:"NVIDIA",last:183.27,open:184.33,high:184.45,low:180.83,change:-2.54,changePercent:-1.37,volume:14123e4,last_updated_at:1716654e6},{symbol:"AAPL",name:"Apple Inc.",last:180,open:179,high:181,low:178,change:1,changePercent:.56,volume:5e7,last_updated_at:1716654e6}],e={args:{tickers:f,loading:!1,error:null}},r={args:{tickers:[],loading:!0,error:null}},a={args:{tickers:[],loading:!1,error:null}},o={args:{tickers:[],loading:!1,error:"Failed to fetch watchlist data"}};var t,s,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    tickers: mockTickers,
    loading: false,
    error: null
  }
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var c,l,i;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    tickers: [],
    loading: true,
    error: null
  }
}`,...(i=(l=r.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var d,g,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    tickers: [],
    loading: false,
    error: null
  }
}`,...(m=(g=a.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var p,u,h;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    tickers: [],
    loading: false,
    error: "Failed to fetch watchlist data"
  }
}`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const E=["Default","Loading","Empty","Error"];export{e as Default,a as Empty,o as Error,r as Loading,E as __namedExportsOrder,T as default};
