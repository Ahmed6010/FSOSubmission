(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var c=t(0),r=t(2),u=t(15),i=t.n(u),o=t(6),a=t(3),s=t(4),d=t.n(s),l="/api/persons",j=function(){return d.a.get(l).then((function(e){return e.data}))},b=function(e){return d.a.post(l,e).then((function(e){return e.data}))},f=function(e,n){return d.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return d.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))},m=function(e){var n=e.func;return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("p",{children:"filter shown with "}),Object(c.jsx)("input",{onChange:n})]})},O=function(e){var n=e.submitFunc,t=e.name,r=e.num,u=e.func1,i=e.func2;return Object(c.jsxs)("form",{onSubmit:n,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:t,onChange:u})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:r,onChange:i})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},p=function(e){var n=e.message,t=e.color;if(null===n)return null;var r={color:t,fontStyle:"italic",fontSize:20,background:"lightgrey",borderStyle:"solid",borderRadius:5,padding:10};return Object(c.jsx)("div",{style:r,children:n})},x=function(){var e=Object(r.useState)([]),n=Object(a.a)(e,2),t=n[0],u=n[1],i=Object(r.useState)(""),s=Object(a.a)(i,2),d=s[0],l=s[1],x=Object(r.useState)(""),v=Object(a.a)(x,2),g=v[0],w=v[1],S=Object(r.useState)(""),k=Object(a.a)(S,2),y=k[0],C=k[1],F=Object(r.useState)(null),T=Object(a.a)(F,2),D=T[0],E=T[1],I=Object(r.useState)(null),J=Object(a.a)(I,2),W=J[0],z=J[1];return Object(r.useEffect)((function(){j().then((function(e){u(e)}))}),[]),Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(p,{message:W,color:"green"}),Object(c.jsx)(p,{message:D,color:"red"}),Object(c.jsx)(m,{func:function(e){return C(e.target.value)}}),Object(c.jsx)("h2",{children:"add a new"}),Object(c.jsx)(O,{submitFunc:function(e){e.preventDefault();var n={name:d,number:g,id:t.length+1},c=t.find((function(e){return e.name===d}));if(c){var r=c.id;window.confirm("".concat(c.name," is already added to phonebook, replace the old number with a new one ?"))&&f(r,Object(o.a)(Object(o.a)({},n),{},{id:r})).then((function(e){z("Updated ".concat(e.name)),u(t.map((function(n){return n.id!==r?n:e}))),l(""),w(""),setTimeout((function(){z(null)}),5e3)})).catch((function(e){E("Information of ".concat(c.name," has already been removed from server")),setTimeout((function(){E(null)}),5e3),u(t.filter((function(e){return e.id!==c.id})))}))}else u(t.concat(n)),b(n).then((function(e){z("Added ".concat(e.name)),l(""),w(""),setTimeout((function(){z(null)}),5e3)}))},name:d,num:g,func1:function(e){return l(e.target.value)},func2:function(e){return w(e.target.value)}}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)("ul",{children:t.map((function(e){return e.name.startsWith(y)||e.name.toLowerCase().startsWith(y)?Object(c.jsxs)("li",{children:[Object(c.jsxs)("span",{children:[e.name," ",e.number,"   "]},e.id),Object(c.jsx)("button",{onClick:function(){return function(e){window.confirm("Delete ".concat(e.name," ?"))&&h(e.id).then((function(){u(t.filter((function(n){return n.id!==e.id})))}))}(e)},children:"delete"})]}):null}))})]})};i.a.render(Object(c.jsx)(x,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.d3d4a9c0.chunk.js.map