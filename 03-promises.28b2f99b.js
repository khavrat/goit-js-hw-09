!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);var r=n("h6c0i"),i=document.querySelector(".form"),l=document.querySelector('input[name="delay"]'),a=document.querySelector('input[name="step"]'),u=document.querySelector('input[name="amount"]'),c=document.querySelector("button");i.addEventListener("submit",(function(e){e&&e.preventDefault&&e.preventDefault();d=Number(l.value),s=Number(u.value),p=Number(a.value);for(var t=1;t<=s;t+=1)setTimeout(f,p,t)}));var d="",s="",p="";function f(e){var t,o,n;(t=e,o=d,n=Math.random()>.3,new Promise((function(e,r){setTimeout((function(){n?e({position:t,delay:o}):r({position:t,delay:o})}),o)}))).then((function(e){var t=e.position,o=e.delay;r.Notify.success("Fulfilled promise ".concat(t," in ").concat(o,"ms"),{timeout:5e3,position:"left-center",distance:"130px"}),console.log("✅ Fulfilled promise ".concat(t," in ").concat(o,"ms"))})).catch((function(e){var t=e.position,o=e.delay;r.Notify.failure("Rejected promise ".concat(t," in ").concat(o,"ms"),{timeout:5e3,position:"left-center",distance:"130px"}),console.log("❌ Rejected promise ".concat(t," in ").concat(o,"ms"))})),d+=p}i.style.cssText="display: flex; gap: 10px; max-width: 600px; align-items: flex-end;",c.style.cssText="border: none; border-radius: 4px; width: 200px; padding: 7px; background-color: rgba(167, 191, 190, 0.5); font-size: 14px; cursor: pointer;";var m=document.querySelectorAll("input"),y=!0,x=!1,v=void 0;try{for(var b,g=m[Symbol.iterator]();!(y=(b=g.next()).done);y=!0){b.value.style.cssText="border: none; outline: 1px solid rgb(167, 191, 190); height: 28px; border-radius: 4px; margin-top: 8px;}"}}catch(e){x=!0,v=e}finally{try{y||null==g.return||g.return()}finally{if(x)throw v}}var h=document.querySelectorAll("label"),w=!0,S=!1,q=void 0;try{for(var T,N=h[Symbol.iterator]();!(w=(T=N.next()).done);w=!0){T.value.style.fontSize="14px"}}catch(e){S=!0,q=e}finally{try{w||null==N.return||N.return()}finally{if(S)throw q}}}();
//# sourceMappingURL=03-promises.28b2f99b.js.map