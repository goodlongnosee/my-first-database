(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-362ab6e6"],{"0aec":function(t,i,n){"use strict";n.r(i);var s=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"yingyuan"},[t.isFirst?n("div",{staticClass:"first_loading"},[n("img",{attrs:{src:"https://s4.ax1x.com/2021/12/07/ocZHRU.gif",alt:""}}),n("span",[t._v("正在加载中...")])]):t._e(),t.isFirst?t._e():n("div",{staticClass:"screen_box"},[t._m(0)]),t.isFirst?t._e():n("div",{staticClass:"cinema_list"},[n("ul",t._l(t.cinemaList,(function(i){return n("li",{key:i.cinemaId,on:{click:function(n){return t.getCityId(i.cinemaId)}}},[n("div",{staticClass:"cinema_nm"},[n("p",{staticClass:"tit"},[t._v(t._s(i.title))]),n("a",[n("span",[t._v(t._s(i.price.n))]),n("i",[t._v(" "+t._s(i.price.q))])])]),n("div",{staticClass:"cinema_address"},[t._v(" "+t._s(i.location)+" ")]),n("div",{staticClass:"cinema_charact"},[n("ol",t._l(i.services,(function(i,s){return n("li",{key:s+(new Date).getTime()},[t._v(" "+t._s(i.text)+" ")])})),0)]),i.discount[0]?n("div",{staticClass:"cinema_discount"},[n("img",{attrs:{src:i.discount[0].card,alt:""}}),n("span",[t._v(t._s(i.discount[0].text))])]):t._e()])})),0)]),t.fixedLoading?n("div",{staticClass:"fixedLoading"},[n("img",{attrs:{src:"https://s4.ax1x.com/2021/12/07/ocZHRU.gif",alt:""}})]):t._e()])},e=[function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("ul",[n("li",{staticClass:"active"},[n("a",{attrs:{href:"#"}},[t._v("全城"),n("span")])]),n("li",[n("a",{attrs:{href:"#"}},[t._v("品牌"),n("span")])]),n("li",[n("a",{attrs:{href:"#"}},[t._v("特色"),n("span")])])])}],a=(n("b0c0"),{name:"Yingyuan",data:function(){return{isFirst:!1,limit:0,cinemaList:[],throt:null,fixedLoading:!1}},methods:{myThrot:function(){var t=this;null!==this.throt&&clearTimeout(this.throt),this.throt=setTimeout((function(){t.bottomRef()}),300)},bottomRef:function(t){var i=window.scrollY,n=window.innerHeight,s=document.body.clientHeight;i+n==s&&(this.fixedLoading=!0,this.getList())},getList:function(){var t=this;this.limit+=1,this.axios.get("https://apis.netstart.cn/maoyan/index/moreCinemas?limit=".concat(10*this.limit)).then((function(i){t.cinemaList=i.data,t.isFirst=!1,t.fixedLoading=!1})).catch((function(t){console.log("获取失败",t)}))},getCityId:function(t){console.log("无接口,影院Id=>",t)}},mounted:function(){this.isFirst=!0,this.getList()},beforeRouteEnter:function(t,i,n){n((function(i){"Yingyuan"==t.name&&window.addEventListener("scroll",i.myThrot)}))}}),c=a,o=(n("53b8"),n("2877")),r=Object(o["a"])(c,s,e,!1,null,"08f5fb0e",null);i["default"]=r.exports},"53b8":function(t,i,n){"use strict";n("afe0")},afe0:function(t,i,n){},b0c0:function(t,i,n){var s=n("83ab"),e=n("5e77").EXISTS,a=n("e330"),c=n("9bf2").f,o=Function.prototype,r=a(o.toString),l=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,u=a(l.exec),d="name";s&&!e&&c(o,d,{configurable:!0,get:function(){try{return u(l,r(this))[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=chunk-362ab6e6.fb958156.js.map