"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9],{9:(ye,z,x)=>{x.d(z,{c:()=>Ae});var D=x(3178);let w;const V=(d,a,p)=>{const S=a.startsWith("animation")?(d=>(void 0===w&&(w=void 0===d.style.animationName&&void 0!==d.style.webkitAnimationName?"-webkit-":""),w))(d):"";d.style.setProperty(S+a,p)},T=(d=[],a)=>{if(void 0!==a){const p=Array.isArray(a)?a:[a];return[...d,...p]}return d},Ae=d=>{let a,p,S,N,B,j,o,b,v,C,t,i=[],G=[],H=[],y=!1,J={},Q=[],X=[],Y={},A=0,K=!1,O=!1,_=!0,F=!1,W=!0,I=!1;const re=d,Z=[],P=[],L=[],g=[],c=[],se=[],oe=[],ie=[],fe=[],ae=[],h=[],be="function"==typeof AnimationEffect||void 0!==D.w&&"function"==typeof D.w.AnimationEffect,u="function"==typeof Element&&"function"==typeof Element.prototype.animate&&be,ce=()=>h,le=(e,n)=>{const r=n.findIndex(s=>s.c===e);r>-1&&n.splice(r,1)},$=(e,n)=>((null!=n&&n.oneTimeCallback?P:Z).push({c:e,o:n}),t),ue=()=>{u&&(h.forEach(e=>{e.cancel()}),h.length=0)},Fe=()=>{se.forEach(e=>{null!=e&&e.parentNode&&e.parentNode.removeChild(e)}),se.length=0},q=()=>void 0!==B?B:o?o.getFill():"both",U=()=>void 0!==b?b:void 0!==j?j:o?o.getDirection():"normal",ee=()=>K?"linear":void 0!==S?S:o?o.getEasing():"linear",k=()=>O?0:void 0!==v?v:void 0!==p?p:o?o.getDuration():0,ne=()=>void 0!==N?N:o?o.getIterations():1,te=()=>void 0!==C?C:void 0!==a?a:o?o.getDelay():0,M=()=>{0!==A&&(A--,0===A&&((()=>{fe.forEach(f=>f()),ae.forEach(f=>f());const e=_?1:0,n=Q,r=X,s=Y;g.forEach(f=>{const m=f.classList;n.forEach(E=>m.add(E)),r.forEach(E=>m.remove(E));for(const E in s)s.hasOwnProperty(E)&&V(f,E,s[E])}),v=void 0,b=void 0,C=void 0,Z.forEach(f=>f.c(e,t)),P.forEach(f=>f.c(e,t)),P.length=0,W=!0,_&&(F=!0),_=!0})(),o&&o.animationFinish()))},de=()=>{(()=>{oe.forEach(s=>s()),ie.forEach(s=>s());const e=G,n=H,r=J;g.forEach(s=>{const f=s.classList;e.forEach(m=>f.add(m)),n.forEach(m=>f.remove(m));for(const m in r)r.hasOwnProperty(m)&&V(s,m,r[m])})})(),i.length>0&&u&&(g.forEach(e=>{const n=e.animate(i,{id:re,delay:te(),duration:k(),easing:ee(),iterations:ne(),fill:q(),direction:U()});n.pause(),h.push(n)}),h.length>0&&(h[0].onfinish=()=>{M()})),y=!0},R=e=>{e=Math.min(Math.max(e,0),.9999),u&&h.forEach(n=>{n.currentTime=n.effect.getComputedTiming().delay+k()*e,n.pause()})},he=e=>{h.forEach(n=>{n.effect.updateTiming({delay:te(),duration:k(),easing:ee(),iterations:ne(),fill:q(),direction:U()})}),void 0!==e&&R(e)},l=(e=!1,n=!0,r)=>(e&&c.forEach(s=>{s.update(e,n,r)}),u&&he(r),t),me=()=>{y&&(u?h.forEach(e=>{e.pause()}):g.forEach(e=>{V(e,"animation-play-state","paused")}),I=!0)},pe=e=>new Promise(n=>{null!=e&&e.sync&&(O=!0,$(()=>O=!1,{oneTimeCallback:!0})),y||de(),F&&(u&&(R(0),he()),F=!1),W&&(A=c.length+1,W=!1);const r=()=>{le(s,P),n()},s=()=>{le(r,L),n()};$(s,{oneTimeCallback:!0}),((e,n)=>{L.push({c:e,o:{oneTimeCallback:!0}})})(r),c.forEach(f=>{f.play()}),u?(h.forEach(e=>{e.play()}),(0===i.length||0===g.length)&&M()):M(),I=!1}),ge=(e,n)=>{const r=i[0];return void 0===r||void 0!==r.offset&&0!==r.offset?i=[{offset:0,[e]:n},...i]:r[e]=n,t};return t={parentAnimation:o,elements:g,childAnimations:c,id:re,animationFinish:M,from:ge,to:(e,n)=>{const r=i[i.length-1];return void 0===r||void 0!==r.offset&&1!==r.offset?i=[...i,{offset:1,[e]:n}]:r[e]=n,t},fromTo:(e,n,r)=>ge(e,n).to(e,r),parent:e=>(o=e,t),play:pe,pause:()=>(c.forEach(e=>{e.pause()}),me(),t),stop:()=>{c.forEach(e=>{e.stop()}),y&&(ue(),y=!1),K=!1,O=!1,W=!0,b=void 0,v=void 0,C=void 0,A=0,F=!1,_=!0,I=!1,L.forEach(e=>e.c(0,t)),L.length=0},destroy:e=>(c.forEach(n=>{n.destroy(e)}),(e=>{ue(),e&&Fe()})(e),g.length=0,c.length=0,i.length=0,Z.length=0,P.length=0,y=!1,W=!0,t),keyframes:e=>{const n=i!==e;return i=e,n&&(e=>{u&&ce().forEach(n=>{const r=n.effect;if(r.setKeyframes)r.setKeyframes(e);else{const s=new KeyframeEffect(r.target,e,r.getTiming());n.effect=s}})})(i),t},addAnimation:e=>{if(null!=e)if(Array.isArray(e))for(const n of e)n.parent(t),c.push(n);else e.parent(t),c.push(e);return t},addElement:e=>{if(null!=e)if(1===e.nodeType)g.push(e);else if(e.length>=0)for(let n=0;n<e.length;n++)g.push(e[n]);else console.error("Invalid addElement value");return t},update:l,fill:e=>(B=e,l(!0),t),direction:e=>(j=e,l(!0),t),iterations:e=>(N=e,l(!0),t),duration:e=>(!u&&0===e&&(e=1),p=e,l(!0),t),easing:e=>(S=e,l(!0),t),delay:e=>(a=e,l(!0),t),getWebAnimations:ce,getKeyframes:()=>i,getFill:q,getDirection:U,getDelay:te,getIterations:ne,getEasing:ee,getDuration:k,afterAddRead:e=>(fe.push(e),t),afterAddWrite:e=>(ae.push(e),t),afterClearStyles:(e=[])=>{for(const n of e)Y[n]="";return t},afterStyles:(e={})=>(Y=e,t),afterRemoveClass:e=>(X=T(X,e),t),afterAddClass:e=>(Q=T(Q,e),t),beforeAddRead:e=>(oe.push(e),t),beforeAddWrite:e=>(ie.push(e),t),beforeClearStyles:(e=[])=>{for(const n of e)J[n]="";return t},beforeStyles:(e={})=>(J=e,t),beforeRemoveClass:e=>(H=T(H,e),t),beforeAddClass:e=>(G=T(G,e),t),onFinish:$,isRunning:()=>0!==A&&!I,progressStart:(e=!1,n)=>(c.forEach(r=>{r.progressStart(e,n)}),me(),K=e,y||de(),l(!1,!0,n),t),progressStep:e=>(c.forEach(n=>{n.progressStep(e)}),R(e),t),progressEnd:(e,n,r)=>(K=!1,c.forEach(s=>{s.progressEnd(e,n,r)}),void 0!==r&&(v=r),F=!1,_=!0,0===e?(b="reverse"===U()?"normal":"reverse","reverse"===b&&(_=!1),u?(l(),R(1-n)):(C=(1-n)*k()*-1,l(!1,!1))):1===e&&(u?(l(),R(n)):(C=n*k()*-1,l(!1,!1))),void 0!==e&&!o&&pe(),t)}}},3178:(ye,z,x)=>{x.d(z,{d:()=>w,w:()=>D});const D=typeof window<"u"?window:void 0,w=typeof document<"u"?document:void 0}}]);