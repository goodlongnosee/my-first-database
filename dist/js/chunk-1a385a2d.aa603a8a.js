(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a385a2d"],{"057f":function(t,r,e){var n=e("c6b6"),i=e("fc6a"),o=e("241c").f,c=e("4dae"),a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],f=function(t){try{return o(t)}catch(r){return c(a)}};t.exports.f=function(t){return a&&"Window"==n(t)?f(t):o(i(t))}},"0b42":function(t,r,e){var n=e("da84"),i=e("e8b5"),o=e("68ee"),c=e("861d"),a=e("b622"),f=a("species"),u=n.Array;t.exports=function(t){var r;return i(t)&&(r=t.constructor,o(r)&&(r===u||i(r.prototype))?r=void 0:c(r)&&(r=r[f],null===r&&(r=void 0))),void 0===r?u:r}},"159b":function(t,r,e){var n=e("da84"),i=e("fdbc"),o=e("785a"),c=e("17c2"),a=e("9112"),f=function(t){if(t&&t.forEach!==c)try{a(t,"forEach",c)}catch(r){t.forEach=c}};for(var u in i)i[u]&&f(n[u]&&n[u].prototype);f(o)},"17c2":function(t,r,e){"use strict";var n=e("b727").forEach,i=e("a640"),o=i("forEach");t.exports=o?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,r,e){var n=e("d039"),i=e("b622"),o=e("2d00"),c=i("species");t.exports=function(t){return o>=51||!n((function(){var r=[],e=r.constructor={};return e[c]=function(){return{foo:1}},1!==r[t](Boolean).foo}))}},"428f":function(t,r,e){var n=e("da84");t.exports=n},"4ab4":function(t,r,e){"use strict";e("52f7")},"4dae":function(t,r,e){var n=e("da84"),i=e("23cb"),o=e("07fa"),c=e("8418"),a=n.Array,f=Math.max;t.exports=function(t,r,e){for(var n=o(t),u=i(r,n),s=i(void 0===e?n:e,n),b=a(f(s-u,0)),l=0;u<s;u++,l++)c(b,l,t[u]);return b.length=l,b}},"4de4":function(t,r,e){"use strict";var n=e("23e7"),i=e("b727").filter,o=e("1dde"),c=o("filter");n({target:"Array",proto:!0,forced:!c},{filter:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},"52f7":function(t,r,e){},5530:function(t,r,e){"use strict";e.d(r,"a",(function(){return o}));e("b64b"),e("a4d3"),e("4de4"),e("d3b7"),e("e439"),e("159b"),e("dbb4");function n(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function i(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function o(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?i(Object(e),!0).forEach((function(r){n(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}},"65f0":function(t,r,e){var n=e("0b42");t.exports=function(t,r){return new(n(t))(0===r?0:r)}},"746f":function(t,r,e){var n=e("428f"),i=e("1a2d"),o=e("e538"),c=e("9bf2").f;t.exports=function(t){var r=n.Symbol||(n.Symbol={});i(r,t)||c(r,t,{value:o.f(t)})}},8418:function(t,r,e){"use strict";var n=e("a04b"),i=e("9bf2"),o=e("5c6c");t.exports=function(t,r,e){var c=n(r);c in t?i.f(t,c,o(0,e)):t[c]=e}},"932a":function(t,r,e){"use strict";e.r(r);var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("nav",{staticClass:"allStar"},[e("div",{staticClass:"return_btn"},[e("button",{on:{click:t.returnUpPage}},[e("img",{attrs:{src:"https://s4.ax1x.com/2021/12/07/ocGds0.png",alt:""}})]),e("p",[t._v("全部演职人员")])]),e("ul",t._l(t.allStar,(function(r,n){return e("li",{key:n},[e("img",{attrs:{src:r.avatar.replace(/\/w\.h/,""),alt:""},on:{click:function(e){return t.showBigImg(r.avatar)}}}),r.cnm?e("p",[t._v(t._s(r.cnm))]):t._e()])})),0),t.isBig?e("div",{staticClass:"big_img",on:{click:function(r){return r.stopPropagation(),t.hideBigImg.apply(null,arguments)}}},[e("p"),e("img",{staticClass:"big",attrs:{src:t.imgUrl.replace(/\/w\.h/,""),alt:""}})]):t._e()])},i=[],o=e("5530"),c=e("2f62"),a={name:"ImgAll",data:function(){return{isBig:!1,imgUrl:"https://s4.ax1x.com/2021/12/07/ocGds0.png"}},methods:{returnUpPage:function(){this.$router.go(-1)},showBigImg:function(t){this.imgUrl=t,this.isBig=!this.isBig,setTimeout((function(){var t=document.querySelector(".big").offsetHeight/2;document.querySelector(".big").style["marginTop"]=-t+"px"}),10)},hideBigImg:function(){this.isBig=!this.isBig}},computed:Object(o["a"])({},Object(c["c"])(["allStar"]))},f=a,u=(e("4ab4"),e("2877")),s=Object(u["a"])(f,n,i,!1,null,"187c258e",null);r["default"]=s.exports},a4d3:function(t,r,e){"use strict";var n=e("23e7"),i=e("da84"),o=e("d066"),c=e("2ba4"),a=e("c65b"),f=e("e330"),u=e("c430"),s=e("83ab"),b=e("4930"),l=e("d039"),d=e("1a2d"),p=e("e8b5"),g=e("1626"),v=e("861d"),h=e("3a9b"),y=e("d9b5"),m=e("825a"),O=e("7b0b"),w=e("fc6a"),j=e("a04b"),P=e("577e"),S=e("5c6c"),x=e("7c73"),E=e("df75"),k=e("241c"),B=e("057f"),_=e("7418"),A=e("06cf"),D=e("9bf2"),I=e("d1e7"),C=e("f36a"),N=e("6eeb"),U=e("5692"),J=e("f772"),T=e("d012"),q=e("90e3"),F=e("b622"),G=e("e538"),$=e("746f"),H=e("d44e"),M=e("69f3"),Q=e("b727").forEach,R=J("hidden"),W="Symbol",z="prototype",K=F("toPrimitive"),L=M.set,V=M.getterFor(W),X=Object[z],Y=i.Symbol,Z=Y&&Y[z],tt=i.TypeError,rt=i.QObject,et=o("JSON","stringify"),nt=A.f,it=D.f,ot=B.f,ct=I.f,at=f([].push),ft=U("symbols"),ut=U("op-symbols"),st=U("string-to-symbol-registry"),bt=U("symbol-to-string-registry"),lt=U("wks"),dt=!rt||!rt[z]||!rt[z].findChild,pt=s&&l((function(){return 7!=x(it({},"a",{get:function(){return it(this,"a",{value:7}).a}})).a}))?function(t,r,e){var n=nt(X,r);n&&delete X[r],it(t,r,e),n&&t!==X&&it(X,r,n)}:it,gt=function(t,r){var e=ft[t]=x(Z);return L(e,{type:W,tag:t,description:r}),s||(e.description=r),e},vt=function(t,r,e){t===X&&vt(ut,r,e),m(t);var n=j(r);return m(e),d(ft,n)?(e.enumerable?(d(t,R)&&t[R][n]&&(t[R][n]=!1),e=x(e,{enumerable:S(0,!1)})):(d(t,R)||it(t,R,S(1,{})),t[R][n]=!0),pt(t,n,e)):it(t,n,e)},ht=function(t,r){m(t);var e=w(r),n=E(e).concat(jt(e));return Q(n,(function(r){s&&!a(mt,e,r)||vt(t,r,e[r])})),t},yt=function(t,r){return void 0===r?x(t):ht(x(t),r)},mt=function(t){var r=j(t),e=a(ct,this,r);return!(this===X&&d(ft,r)&&!d(ut,r))&&(!(e||!d(this,r)||!d(ft,r)||d(this,R)&&this[R][r])||e)},Ot=function(t,r){var e=w(t),n=j(r);if(e!==X||!d(ft,n)||d(ut,n)){var i=nt(e,n);return!i||!d(ft,n)||d(e,R)&&e[R][n]||(i.enumerable=!0),i}},wt=function(t){var r=ot(w(t)),e=[];return Q(r,(function(t){d(ft,t)||d(T,t)||at(e,t)})),e},jt=function(t){var r=t===X,e=ot(r?ut:w(t)),n=[];return Q(e,(function(t){!d(ft,t)||r&&!d(X,t)||at(n,ft[t])})),n};if(b||(Y=function(){if(h(Z,this))throw tt("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?P(arguments[0]):void 0,r=q(t),e=function(t){this===X&&a(e,ut,t),d(this,R)&&d(this[R],r)&&(this[R][r]=!1),pt(this,r,S(1,t))};return s&&dt&&pt(X,r,{configurable:!0,set:e}),gt(r,t)},Z=Y[z],N(Z,"toString",(function(){return V(this).tag})),N(Y,"withoutSetter",(function(t){return gt(q(t),t)})),I.f=mt,D.f=vt,A.f=Ot,k.f=B.f=wt,_.f=jt,G.f=function(t){return gt(F(t),t)},s&&(it(Z,"description",{configurable:!0,get:function(){return V(this).description}}),u||N(X,"propertyIsEnumerable",mt,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!b,sham:!b},{Symbol:Y}),Q(E(lt),(function(t){$(t)})),n({target:W,stat:!0,forced:!b},{for:function(t){var r=P(t);if(d(st,r))return st[r];var e=Y(r);return st[r]=e,bt[e]=r,e},keyFor:function(t){if(!y(t))throw tt(t+" is not a symbol");if(d(bt,t))return bt[t]},useSetter:function(){dt=!0},useSimple:function(){dt=!1}}),n({target:"Object",stat:!0,forced:!b,sham:!s},{create:yt,defineProperty:vt,defineProperties:ht,getOwnPropertyDescriptor:Ot}),n({target:"Object",stat:!0,forced:!b},{getOwnPropertyNames:wt,getOwnPropertySymbols:jt}),n({target:"Object",stat:!0,forced:l((function(){_.f(1)}))},{getOwnPropertySymbols:function(t){return _.f(O(t))}}),et){var Pt=!b||l((function(){var t=Y();return"[null]"!=et([t])||"{}"!=et({a:t})||"{}"!=et(Object(t))}));n({target:"JSON",stat:!0,forced:Pt},{stringify:function(t,r,e){var n=C(arguments),i=r;if((v(r)||void 0!==t)&&!y(t))return p(r)||(r=function(t,r){if(g(i)&&(r=a(i,this,t,r)),!y(r))return r}),n[1]=r,c(et,null,n)}})}if(!Z[K]){var St=Z.valueOf;N(Z,K,(function(t){return a(St,this)}))}H(Y,W),T[R]=!0},a640:function(t,r,e){"use strict";var n=e("d039");t.exports=function(t,r){var e=[][t];return!!e&&n((function(){e.call(null,r||function(){throw 1},1)}))}},b64b:function(t,r,e){var n=e("23e7"),i=e("7b0b"),o=e("df75"),c=e("d039"),a=c((function(){o(1)}));n({target:"Object",stat:!0,forced:a},{keys:function(t){return o(i(t))}})},b727:function(t,r,e){var n=e("0366"),i=e("e330"),o=e("44ad"),c=e("7b0b"),a=e("07fa"),f=e("65f0"),u=i([].push),s=function(t){var r=1==t,e=2==t,i=3==t,s=4==t,b=6==t,l=7==t,d=5==t||b;return function(p,g,v,h){for(var y,m,O=c(p),w=o(O),j=n(g,v),P=a(w),S=0,x=h||f,E=r?x(p,P):e||l?x(p,0):void 0;P>S;S++)if((d||S in w)&&(y=w[S],m=j(y,S,O),t))if(r)E[S]=m;else if(m)switch(t){case 3:return!0;case 5:return y;case 6:return S;case 2:u(E,y)}else switch(t){case 4:return!1;case 7:u(E,y)}return b?-1:i||s?s:E}};t.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6),filterReject:s(7)}},dbb4:function(t,r,e){var n=e("23e7"),i=e("83ab"),o=e("56ef"),c=e("fc6a"),a=e("06cf"),f=e("8418");n({target:"Object",stat:!0,sham:!i},{getOwnPropertyDescriptors:function(t){var r,e,n=c(t),i=a.f,u=o(n),s={},b=0;while(u.length>b)e=i(n,r=u[b++]),void 0!==e&&f(s,r,e);return s}})},e439:function(t,r,e){var n=e("23e7"),i=e("d039"),o=e("fc6a"),c=e("06cf").f,a=e("83ab"),f=i((function(){c(1)})),u=!a||f;n({target:"Object",stat:!0,forced:u,sham:!a},{getOwnPropertyDescriptor:function(t,r){return c(o(t),r)}})},e538:function(t,r,e){var n=e("b622");r.f=n},e8b5:function(t,r,e){var n=e("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}}}]);
//# sourceMappingURL=chunk-1a385a2d.aa603a8a.js.map