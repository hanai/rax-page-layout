(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{114:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return O}));var r=n(0),o=n(41),c=n.n(o),l=n(59),a=n(16),i=n.n(a),u={container:{height:90,alignItems:"center",justifyContent:"center",borderBottomStyle:"solid",borderBottomColor:"#e6e6e6",borderBottomWidth:2},text:{fontSize:32,color:"#333"}},s=function(){return Object(r.createElement)(c.a,{style:u.container},Object(r.createElement)(i.a,{style:u.text},"Header"))},d=n(110),f=n.n(d),b={container:{height:90,padding:20,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",borderWidth:4,borderStyle:"dashed",borderColor:"#e6e6e6"},footerInput:{flex:1,borderColor:"#ff6000",borderWidth:2,borderStyle:"solid"}},m=function(){return Object(r.createElement)(c.a,{style:b.container},Object(r.createElement)(f.a,{placeholder:"TextInput",style:b.footerInput}))},h={container:{height:100,alignItems:"center",justifyContent:"center"},text:{fontSize:30,color:"#333"}},j=function(e){var t=e.text;return Object(r.createElement)(c.a,{style:h.container},Object(r.createElement)(i.a,{style:h.text},t))},y={list:{borderWidth:2,borderColor:"e6e6e6",borderStyle:"dashed"}};function O(){var e=Object(r.useState)((function(){return Array(200).fill().map((function(e,t){return t}))})),t=e[0],n=e[1],o=Object(r.useState)(!1),a=o[0],i=o[1];return Object(r.createElement)(l.PageLayout,null,Object(r.createElement)(l.PageHeader,null,Object(r.createElement)(s,null)),Object(r.createElement)(l.PageMain,{isRefreshing:a,hasPullToRefresh:!0,onPullToRefresh:function(){return i(!0),new Promise((function(e){setTimeout((function(){n((function(e){return e.map((function(e){return e+parseInt(200*Math.random(),10)-100}))})),i(!1),e()}),5e3)}))}},Object(r.createElement)(c.a,{style:y.list},t.map((function(e,t){return Object(r.createElement)(j,{key:t,text:e})})))),Object(r.createElement)(l.PageFooter,null,Object(r.createElement)(m,null)))}}}]);