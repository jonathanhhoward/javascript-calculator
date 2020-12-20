(this["webpackJsonpjavascript-calculator"]=this["webpackJsonpjavascript-calculator"]||[]).push([[0],[,,,,function(e,t,a){e.exports=a(12)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var r=a(0),i=a.n(r),s=a(2),o=a.n(s),c=a(3);a(9);function n(e){var t=e.expression,a=e.input;return i.a.createElement("div",{className:"Display"},i.a.createElement("div",{className:"Expression"},t),i.a.createElement("div",{id:"display",className:"Input"},a))}var u=Object.freeze({EQUALS:"EQUALS",INPUT:"INPUT",NEGATIVE:"NEGATIVE",OPERATOR:"OPERATOR",RESULT:"RESULT"}),l={expression:"0",input:"0",status:u.INPUT},p=Object.freeze({CLEAR:"AC",DELETE:"C",DIVIDE:"/",MULTIPLY:"*",SUBTRACT:"-",ADD:"+",EQUALS:"=",DECIMAL:".",ZERO:"0",ONE:"1",TWO:"2",THREE:"3",FOUR:"4",FIVE:"5",SIX:"6",SEVEN:"7",EIGHT:"8",NINE:"9"});function d(e){var t;try{t=function(e){if(Number.isNaN(e))return NaN.toString();if(0===e)return"0";var t=Math.abs(e);if(1e-6<=t&&t<1)return(Math.round(1e9*e)/1e9).toString();var a=Number(e).toPrecision(10);return t<1e-6||1e10<=t?Number(a).toExponential():Number(a).toString()}(function(e){var t=e.match(/(?:\d+(?:\.\d*)?(?:e[-+]\d+)?)|[-+*/=]/g);return function(){var e=a(),r=t.shift();for(;;)switch(r){case"+":e+=a(),r=t.shift();break;case"-":e-=a(),r=t.shift();break;case"=":return e;default:throw new Error("expression error")}}();function a(){for(var e=r(),a=t.shift();;)switch(a){case"*":e*=r(),a=t.shift();break;case"/":var i=r();if(0===i)throw new Error("divide by zero");e/=i,a=t.shift();break;default:return t.unshift(a),e}}function r(){var e=t.shift();if("-"===e)return-r();var a=Number(e);if(Number.isNaN(a))throw new Error("primary expected");return a}}(e.expression))}catch(a){t=a.message}return{expression:e.expression,input:t,status:u.RESULT}}var E=function(e,t,a){switch(e.status){case u.RESULT:return t({type:"operator-result",payload:a});case u.NEGATIVE:return t({type:"operator-negative",payload:a});case u.OPERATOR:return t("-"===a?{type:"operator-operator-negate",payload:a}:{type:"operator-operator",payload:a});case u.INPUT:return t({type:"operator-input",payload:a})}},y=function(e,t,a){var r=10===e.input.replace(/[.-]/g,"").length,i=e.status===u.RESULT;if(!r||i)switch(e.status){case u.RESULT:return t({type:"digit-result",payload:a});case u.NEGATIVE:return t({type:"digit-negative",payload:a});case u.OPERATOR:return t({type:"digit-operator",payload:a});case u.INPUT:return"0"===e.input?t({type:"digit-input-zero",payload:a}):t({type:"digit-input",payload:a})}},g=(a(10),[{id:"clear",class:"clear",symbol:p.CLEAR,click:function(e,t,a){t({type:"clear",payload:a})}},{id:"delete",class:"delete",symbol:p.DELETE,click:function(e,t,a){switch(e.status){case u.INPUT:return t({type:"delete",payload:"0"})}}},{id:"divide",class:"operator",symbol:p.DIVIDE,click:E},{id:"multiply",class:"operator",symbol:p.MULTIPLY,click:E},{id:"subtract",class:"operator",symbol:p.SUBTRACT,click:E},{id:"add",class:"operator",symbol:p.ADD,click:E},{id:"equals",class:"equals",symbol:p.EQUALS,click:function(e,t,a){switch(e.status){case u.NEGATIVE:return t({type:"equals-negative",payload:a});case u.OPERATOR:return t({type:"equals-operator",payload:a});case u.INPUT:return t({type:"equals-input",payload:a})}}},{id:"decimal",class:"digit",symbol:p.DECIMAL,click:function(e,t,a){var r=e.status===u.RESULT;if(!e.input.includes(a)||r)return"0"===e.input||e.status?y(e,t,"0"+a):y(e,t,a)}},{id:"zero",class:"digit",symbol:p.ZERO,click:y},{id:"one",class:"digit",symbol:p.ONE,click:y},{id:"two",class:"digit",symbol:p.TWO,click:y},{id:"three",class:"digit",symbol:p.THREE,click:y},{id:"four",class:"digit",symbol:p.FOUR,click:y},{id:"five",class:"digit",symbol:p.FIVE,click:y},{id:"six",class:"digit",symbol:p.SIX,click:y},{id:"seven",class:"digit",symbol:p.SEVEN,click:y},{id:"eight",class:"digit",symbol:p.EIGHT,click:y},{id:"nine",class:"digit",symbol:p.NINE,click:y}]);function f(e){var t=e.state,a=e.dispatch,r=g.map((function(e){return i.a.createElement("button",{key:e.id,className:"Key ".concat(e.class),id:e.id,onClick:function(){return e.click(t,a,e.symbol)}},e.symbol)}));return i.a.createElement("div",{className:"KeyPad"},r)}function m(e,t){var a=e.expression,r=e.input;switch(t.type){case"operator-operator-negate":case"operator-input":case"equals-input":case"digit-negative":case"digit-operator":case"digit-input":return a+t.payload;case"operator-negative":case"equals-negative":return a.slice(0,-2)+t.payload;case"operator-operator":case"equals-operator":case"digit-input-zero":return a.slice(0,-1)+t.payload;case"delete":return a.slice(0,-r.length)+t.payload;case"operator-result":return r+t.payload;case"digit-result":return t.payload;default:return a}}function v(e,t){switch(t.type){case"operator-result":case"operator-negative":case"operator-operator-negate":case"operator-operator":case"operator-input":case"digit-result":case"digit-operator":case"digit-input-zero":case"delete":return t.payload;case"digit-negative":case"digit-input":return e+t.payload;default:return e}}function b(e,t){switch(t.type){case"operator-result":case"operator-negative":case"operator-operator":case"operator-input":return u.OPERATOR;case"operator-operator-negate":return u.NEGATIVE;case"equals-negative":case"equals-operator":case"equals-input":return u.EQUALS;case"digit-result":case"digit-negative":case"digit-operator":case"digit-input-zero":case"digit-input":return u.INPUT;default:return e}}function T(e,t){switch(t.type){case"clear":return l;case"get-result":return d(e);default:return{expression:m(e,t),input:v(e.input,t),status:b(e.status,t)}}}a(11);function h(){var e=Object(r.useReducer)(T,l,void 0),t=Object(c.a)(e,2),a=t[0],s=t[1];return Object(r.useEffect)((function(){a.status===u.EQUALS&&s({type:"get-result"})}),[a.status]),i.a.createElement("div",{className:"App"},i.a.createElement(n,{expression:a.expression,input:a.input}),i.a.createElement(f,{state:a,dispatch:s}))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[4,1,2]]]);
//# sourceMappingURL=main.fabac661.chunk.js.map