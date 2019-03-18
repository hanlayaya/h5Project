(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('./lib/setRem');

require('./lib/mTabs.min');

// tab选项卡
document.addEventListener('DOMContentLoaded', function () {
    new mTabs({
        mtab: '#tabs1',
        mhead: '#tabs1 .mhead',
        mcontent: '#tabs1 .mcontent'
    });
}, false);
var mjJs = mojiJs();
mjJs.config({
    // appId: 'moji888820150907',
    appId: '401f3f5b3a67261786b1ee9caab907d3'
});
// 诸葛统计
// window.zhuge.load('Your App Key', {debug:true});
// document.getElementById('btn').addEventListener('click',function(){
//     window.zhuge.load('Your App Key', {debug:true});
// })
// 端内分享
//分享
var dlp = downloadApp({ original: true });
//微信分享
var url = location.href;
var imgUrl = url.slice(0, url.lastIndexOf("/")) + "/assets/images/share.png";
var shareData = {
    "imgUrl": imgUrl,
    "link": url,
    "desc": "春风、春日、春暖、春长，墨迹天气与你春日相逢",
    "title": "墨迹天气与你春日相逢"
};
document.getElementById("app_link").innerHTML = url;
document.getElementById("app_img_url").src = imgUrl;
document.getElementById("app_big_img_url").src = imgUrl;
dlp.wxSdk(shareData);
var ua = navigator.userAgent.toLowerCase();
if (/mojia|mojii/.test(ua)) {} else {}

// var dlp = downloadApp({original: true});

},{"./lib/mTabs.min":2,"./lib/setRem":3}],2:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * LBS mTabs
 * Date: 2014-5-10
 * ===================================================
 * opts.mtab 	tabs外围容器/滑动事件对象(一个CSS选择器)
 * opts.mhead 	tabs标题容器/点击对象(一个CSS选择器)
 * opts.mcontent	tabs内容容器/滑动切换对象(一个CSS选择器) 
 * opts.index 	tabs索引(默认0) 指定显示哪个索引的标题、内容
 * opts.current  tabs当前项的类名(默认current)
 * ===================================================
**/
(function () {
  window.mTabs = function (a) {
    void 0 !== (typeof a === "undefined" ? "undefined" : _typeof(a)) && (this.mtab = document.querySelector(a.mtab), this.mhead = document.querySelector(a.mhead), this.mcontent = document.querySelector(a.mcontent), this.mheads = this.mhead.children, this.mcontents = this.mcontent.children, this.length = this.mheads.length, 1 > this.length || (a.index > this.length - 1 && (a.index = this.length - 1), this.index = this.oIndex = a.index || 0, this.current = a.current || "current", this.touch = {}, this.init()));
  };mTabs.prototype = { init: function init(a) {
      this.set();this.initset();
      this.bind();
    }, initset: function initset() {
      for (var a = 0; a < this.length; a++) {
        this.mheads[a].index = a, this.mheads[a].className = this.mheads[a].className.replace(this.current, ""), this.mcontents[a].className = this.mcontents[a].className.replace(this.current, "");
      }this.mheads[this.index].className += " " + this.current;this.mcontents[this.index].className += " " + this.current;this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translate3d(" + -this.index * this.width + "px,0,0)";
    }, set: function set() {
      this.width = document.documentElement.clientWidth || document.body.clientWidth;this.mcontent.style.width = this.length * this.width + "px";for (var a = 0; a < this.length; a++) {
        this.mcontents[a].style.width = this.width + "px";
      }this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translate3d(" + -this.index * this.width + "px,0,0)";
    }, bind: function bind() {
      var a = this;this.mtab.addEventListener("touchstart", function (b) {
        a.touchStart(b);
      }, !1);this.mtab.addEventListener("touchmove", function (b) {
        a.touchMove(b);
      }, !1);this.mtab.addEventListener("touchend", function (b) {
        a.touchEnd(b);
      }, !1);this.mtab.addEventListener("touchcancel", function (b) {
        a.touchEnd(b);
      }, !1);this.mhead.addEventListener("click", function (b) {
        a.touchClick(b);
      }, !1);this.mcontent.addEventListener("webkitTransitionEnd", function () {
        a.transitionEnd();
      }, !1);window.addEventListener("resize", function () {
        setTimeout(function () {
          a.set();
        }, 100);
      }, !1);window.addEventListener("orientationchange", function () {
        setTimeout(function () {
          a.set();
        }, 100);
      }, !1);
    }, touchStart: function touchStart(a) {
      this.touch.x = a.touches[0].pageX;this.touch.y = a.touches[0].pageY;
      this.touch.time = Date.now();this.touch.disX = 0;this.touch.disY = 0;this.touch.fixed = "";
    }, touchMove: function touchMove(a) {
      if ("up" !== this.touch.fixed && (a.stopPropagation(), !(1 < a.touches.length || a.scale && 1 !== a.scale) && (this.touch.disX = a.touches[0].pageX - this.touch.x, this.touch.disY = a.touches[0].pageY - this.touch.y, "" === this.touch.fixed && (Math.abs(this.touch.disY) > Math.abs(this.touch.disX) ? this.touch.fixed = "up" : this.touch.fixed = "left"), "left" === this.touch.fixed))) {
        a.preventDefault();if (0 === this.index && 0 < this.touch.disX || this.index === this.length - 1 && 0 > this.touch.disX) this.touch.disX /= 4;this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translate3d(" + (this.touch.disX - this.index * this.width) + "px,0,0)";
      }
    }, touchEnd: function touchEnd(a) {
      if ("left" === this.touch.fixed) {
        a = Math.abs(this.touch.disX);this.mcontent.style.webkitTransition = this.mcontent.style.transition = "all 100ms";if (100 < Date.now() - this.touch.time && 10 < a || a > this.width / 2) this.touch.time = Date.now(), 0 < this.touch.disX ? this.index-- : this.index++, 0 > this.index && (this.index = 0), this.index > this.length - 1 && (this.index = this.length - 1), this.index === this.oIndex && (this.mcontent.style.webkitTransition = this.mcontent.style.transition = "all 300ms"), this.index !== this.oIndex && this.replace();this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translate3d(" + -this.index * this.width + "px,0,0)";
      }
    }, transitionEnd: function transitionEnd() {
      this.mcontent.style.webkitTransition = this.mcontent.style.transition = "all 0ms";
    }, touchClick: function touchClick(a) {
      var b = a.target;1 === b.nodeType && void 0 !== b.index && b.index !== this.index && (a.preventDefault(), a.stopPropagation(), this.index = b.index, this.mcontent.style.webkitTransition = this.mcontent.style.transition = "all 100ms", this.mcontent.style.webkitTransform = this.mcontent.style.transform = "translate3d(" + -this.index * this.width + "px,0,0)", this.replace());
    }, replace: function replace() {
      this.mheads[this.index].className += " " + this.current;this.mheads[this.oIndex].className = this.mheads[this.oIndex].className.replace(this.current, "").trim();this.mcontents[this.index].className += " " + this.current;
      this.mcontents[this.oIndex].className = this.mcontents[this.oIndex].className.replace(this.current, "").trim();this.oIndex = this.index;
    } };
})();

},{}],3:[function(require,module,exports){
'use strict';

// (function (doc, win) {
//     var docEl = doc.documentElement,
//       resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//       recalc = function () {
//         var clientWidth = docEl.clientWidth;
//         if (!clientWidth) return;
//         docEl.style.fontSize = 100 * (clientWidth / 640 * 2) + 'px';
//         //750是设计图的宽度,100是一个基准宽度(html的font-size值)
//       };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
//   })(document, window);

//   <!--移动端自适应-->
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function recalc() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / 750 * 2) + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// 网上下载
// !
// function(win) {
//     function resize() {
//         var domWidth = domEle.getBoundingClientRect().width;
//         win.rem = domWidth / 10;
//         domEle.style.fontSize = win.rem + "px"
//     }
//     var v, initial_scale, timeCode, dom = win.document,
//     domEle = dom.documentElement,
//     viewport = dom.querySelector('meta[name="viewport"]'),
//     flexible = dom.querySelector('meta[name="flexible"]');
//     if (viewport) {
//         var o = viewport.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
//         if (o) {
//             initial_scale = parseFloat(o[2]);
//             v = parseInt(1 / initial_scale)
//         }
//     } else {
//         if (flexible) {
//             var o = flexible.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
//             if (o) {
//                 v = parseFloat(o[2]);
//                 initial_scale = parseFloat((1 / v).toFixed(2))
//             }
//         }
//     }
//     if (!v && !initial_scale) {
//         var n = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
//         v = win.devicePixelRatio;
//         v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1,
//         initial_scale = 1 / v
//     }
//     if (domEle.setAttribute("data-dpr", v), !viewport) {
//         if (viewport = dom.createElement("meta"), viewport.setAttribute("name", "viewport"), viewport.setAttribute("content", "initial-scale=" + initial_scale + ", maximum-scale=" + initial_scale + ", minimum-scale=" + initial_scale + ", user-scalable=no"), domEle.firstElementChild) {
//             domEle.firstElementChild.appendChild(viewport)
//         } else {
//             var m = dom.createElement("div");
//             m.appendChild(viewport),
//             dom.write(m.innerHTML)
//         }
//     }
//     win.dpr = v;
//     if (domEle.getBoundingClientRect().width >= 640) {
//         domEle.style.width = 640 + 'px';
//         var clientW = document.documentElement.clientWidth || document.body.clientWidth;
//         var pcw = (clientW - domEle.getBoundingClientRect().width) / 2;
//         domEle.style.position = "absolute";
//         domEle.style.left = pcw + 'px'
//     }
//     win.addEventListener("resize",
//     function() {
//         clearTimeout(timeCode),
//         timeCode = setTimeout(resize, 300)
//     },
//     false);
//     win.addEventListener("pageshow",
//     function(b) {
//         b.persisted && (clearTimeout(timeCode), timeCode = setTimeout(resize, 300))
//     },
//     false);
//     resize()
// } (window);


// 新的
//designWidth:设计稿的实际宽度值，需要根据实际设置
//maxWidth:制作稿的最大宽度值，需要根据实际设置
//这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)

// ;(function(designWidth, maxWidth) {
// 	var doc = document,
// 	win = window,
// 	docEl = doc.documentElement,
// 	remStyle = document.createElement("style"),
// 	tid;

// 	function refreshRem() {
// 		var width = docEl.getBoundingClientRect().width;
// 		maxWidth = maxWidth || 540;
// 		width>maxWidth && (width=maxWidth);
// 		var rem = width * 100 / designWidth;
// 		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
// 	}

// 	if (docEl.firstElementChild) {
// 		docEl.firstElementChild.appendChild(remStyle);
// 	} else {
// 		var wrap = doc.createElement("div");
// 		wrap.appendChild(remStyle);
// 		doc.write(wrap.innerHTML);
// 		wrap = null;
// 	}
// 	//要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
// 	refreshRem();

// 	win.addEventListener("resize", function() {
// 		clearTimeout(tid); //防止执行两次
// 		tid = setTimeout(refreshRem, 300);
// 	}, false);

// 	win.addEventListener("pageshow", function(e) {
// 		if (e.persisted) { // 浏览器后退的时候重新计算
// 			clearTimeout(tid);
// 			tid = setTimeout(refreshRem, 300);
// 		}
// 	}, false);

// 	if (doc.readyState === "complete") {
// 		doc.body.style.fontSize = "16px";
// 	} else {
// 		doc.addEventListener("DOMContentLoaded", function(e) {
// 			doc.body.style.fontSize = "16px";
// 		}, false);
// 	}
// })(640, 640);


// 新的可用，但不能动态刷新

//常规情况下js根据屏幕宽度动态计算

// !(function(doc, win) {
//     var docEle = doc.documentElement,
//         evt = "onorientationchange" in window ? "orientationchange" : "resize",
//         fn = function() {
//             var width = docEle.clientWidth;
//             width && (docEle.style.fontSize = 100 * (width / 640 * 2) + "px");
//         };

//     win.addEventListener(evt, fn, false);
//     doc.addEventListener("DOMContentLoaded", fn, false);

// }(document, window));

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbGliL21UYWJzLm1pbi5qcyIsInNyYy9qcy9saWIvc2V0UmVtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFFQTtBQUNBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQTZDLFlBQVU7QUFDdEQsUUFBSSxLQUFKLENBQVU7QUFDSCxjQUFNLFFBREg7QUFFSCxlQUFPLGVBRko7QUFHSCxrQkFBVTtBQUhQLEtBQVY7QUFLQSxDQU5ELEVBTUUsS0FORjtBQU9BLElBQUksT0FBTyxRQUFYO0FBQ0ksS0FBSyxNQUFMLENBQVk7QUFDUjtBQUNBLFdBQU87QUFGQyxDQUFaO0FBSUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE1BQU0sWUFBWSxFQUFDLFVBQVUsSUFBWCxFQUFaLENBQVY7QUFDQTtBQUNBLElBQUksTUFBTSxTQUFTLElBQW5CO0FBQ0EsSUFBSSxTQUFTLElBQUksS0FBSixDQUFXLENBQVgsRUFBYSxJQUFJLFdBQUosQ0FBZ0IsR0FBaEIsQ0FBYixJQUFzQywwQkFBbkQ7QUFDQSxJQUFJLFlBQVk7QUFDWixjQUFVLE1BREU7QUFFWixZQUFRLEdBRkk7QUFHWixZQUFRLHdCQUhJO0FBSVosYUFBUztBQUpHLENBQWhCO0FBTUEsU0FBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLFNBQXBDLEdBQThDLEdBQTlDO0FBQ0EsU0FBUyxjQUFULENBQXdCLGFBQXhCLEVBQXVDLEdBQXZDLEdBQTJDLE1BQTNDO0FBQ0EsU0FBUyxjQUFULENBQXdCLGlCQUF4QixFQUEyQyxHQUEzQyxHQUErQyxNQUEvQztBQUNBLElBQUksS0FBSixDQUFVLFNBQVY7QUFDQSxJQUFJLEtBQUssVUFBVSxTQUFWLENBQW9CLFdBQXBCLEVBQVQ7QUFDQSxJQUFHLGNBQWMsSUFBZCxDQUFtQixFQUFuQixDQUFILEVBQTBCLENBRXpCLENBRkQsTUFFSyxDQUVKOztBQUVEOzs7Ozs7O0FDNUNBOzs7Ozs7Ozs7OztBQVdBLENBQUMsWUFBVTtBQUFDLFNBQU8sS0FBUCxHQUFhLFVBQVMsQ0FBVCxFQUFXO0FBQUMsU0FBSyxDQUFMLGFBQWdCLENBQWhCLHlDQUFnQixDQUFoQixPQUFvQixLQUFLLElBQUwsR0FBVSxTQUFTLGFBQVQsQ0FBdUIsRUFBRSxJQUF6QixDQUFWLEVBQXlDLEtBQUssS0FBTCxHQUFXLFNBQVMsYUFBVCxDQUF1QixFQUFFLEtBQXpCLENBQXBELEVBQW9GLEtBQUssUUFBTCxHQUFjLFNBQVMsYUFBVCxDQUF1QixFQUFFLFFBQXpCLENBQWxHLEVBQXFJLEtBQUssTUFBTCxHQUFZLEtBQUssS0FBTCxDQUFXLFFBQTVKLEVBQXFLLEtBQUssU0FBTCxHQUFlLEtBQUssUUFBTCxDQUFjLFFBQWxNLEVBQTJNLEtBQUssTUFBTCxHQUFZLEtBQUssTUFBTCxDQUFZLE1BQW5PLEVBQTBPLElBQUUsS0FBSyxNQUFQLEtBQWdCLEVBQUUsS0FBRixHQUFRLEtBQUssTUFBTCxHQUFZLENBQXBCLEtBQXdCLEVBQUUsS0FBRixHQUFRLEtBQUssTUFBTCxHQUFZLENBQTVDLEdBQStDLEtBQUssS0FBTCxHQUFXLEtBQUssTUFBTCxHQUFZLEVBQUUsS0FBRixJQUFTLENBQS9FLEVBQWlGLEtBQUssT0FBTCxHQUFhLEVBQUUsT0FBRixJQUFXLFNBQXpHLEVBQW1ILEtBQUssS0FBTCxHQUFXLEVBQTlILEVBQWlJLEtBQUssSUFBTCxFQUFqSixDQUE5UDtBQUE2WixHQUF0YixDQUF1YixNQUFNLFNBQU4sR0FBZ0IsRUFBQyxNQUFLLGNBQVMsQ0FBVCxFQUFXO0FBQUMsV0FBSyxHQUFMLEdBQVcsS0FBSyxPQUFMO0FBQ2hmLFdBQUssSUFBTDtBQUFZLEtBRHVjLEVBQ3RjLFNBQVEsbUJBQVU7QUFBQyxXQUFJLElBQUksSUFBRSxDQUFWLEVBQVksSUFBRSxLQUFLLE1BQW5CLEVBQTBCLEdBQTFCO0FBQThCLGFBQUssTUFBTCxDQUFZLENBQVosRUFBZSxLQUFmLEdBQXFCLENBQXJCLEVBQXVCLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxTQUFmLEdBQXlCLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxTQUFmLENBQXlCLE9BQXpCLENBQWlDLEtBQUssT0FBdEMsRUFBOEMsRUFBOUMsQ0FBaEQsRUFBa0csS0FBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixTQUFsQixHQUE0QixLQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLFNBQWxCLENBQTRCLE9BQTVCLENBQW9DLEtBQUssT0FBekMsRUFBaUQsRUFBakQsQ0FBOUg7QUFBOUIsT0FBaU4sS0FBSyxNQUFMLENBQVksS0FBSyxLQUFqQixFQUF3QixTQUF4QixJQUFtQyxNQUFJLEtBQUssT0FBNUMsQ0FBb0QsS0FBSyxTQUFMLENBQWUsS0FBSyxLQUFwQixFQUEyQixTQUEzQixJQUFzQyxNQUFJLEtBQUssT0FBL0MsQ0FBdUQsS0FBSyxRQUFMLENBQWMsS0FBZCxDQUFvQixlQUFwQixHQUFvQyxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLFNBQXBCLEdBQThCLGlCQUFlLENBQUMsS0FBSyxLQUFOLEdBQVksS0FBSyxLQUFoQyxHQUFzQyxTQUF4RztBQUFrSCxLQURLLEVBQ0osS0FBSSxlQUFVO0FBQUMsV0FBSyxLQUFMLEdBQVcsU0FBUyxlQUFULENBQXlCLFdBQXpCLElBQ3plLFNBQVMsSUFBVCxDQUFjLFdBRGdkLENBQ3BjLEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FBb0IsS0FBcEIsR0FBMEIsS0FBSyxNQUFMLEdBQVksS0FBSyxLQUFqQixHQUF1QixJQUFqRCxDQUFzRCxLQUFJLElBQUksSUFBRSxDQUFWLEVBQVksSUFBRSxLQUFLLE1BQW5CLEVBQTBCLEdBQTFCO0FBQThCLGFBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsS0FBbEIsQ0FBd0IsS0FBeEIsR0FBOEIsS0FBSyxLQUFMLEdBQVcsSUFBekM7QUFBOUIsT0FBNEUsS0FBSyxRQUFMLENBQWMsS0FBZCxDQUFvQixlQUFwQixHQUFvQyxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLFNBQXBCLEdBQThCLGlCQUFlLENBQUMsS0FBSyxLQUFOLEdBQVksS0FBSyxLQUFoQyxHQUFzQyxTQUF4RztBQUFrSCxLQUZxTSxFQUVwTSxNQUFLLGdCQUFVO0FBQUMsVUFBSSxJQUFFLElBQU4sQ0FBVyxLQUFLLElBQUwsQ0FBVSxnQkFBVixDQUEyQixZQUEzQixFQUF3QyxVQUFTLENBQVQsRUFBVztBQUFDLFVBQUUsVUFBRixDQUFhLENBQWI7QUFBZ0IsT0FBcEUsRUFBcUUsQ0FBQyxDQUF0RSxFQUF5RSxLQUFLLElBQUwsQ0FBVSxnQkFBVixDQUEyQixXQUEzQixFQUF1QyxVQUFTLENBQVQsRUFBVztBQUFDLFVBQUUsU0FBRixDQUFZLENBQVo7QUFBZSxPQUFsRSxFQUFtRSxDQUFDLENBQXBFLEVBQXVFLEtBQUssSUFBTCxDQUFVLGdCQUFWLENBQTJCLFVBQTNCLEVBQXNDLFVBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBRSxRQUFGLENBQVcsQ0FBWDtBQUFjLE9BQWhFLEVBQzFiLENBQUMsQ0FEeWIsRUFDdGIsS0FBSyxJQUFMLENBQVUsZ0JBQVYsQ0FBMkIsYUFBM0IsRUFBeUMsVUFBUyxDQUFULEVBQVc7QUFBQyxVQUFFLFFBQUYsQ0FBVyxDQUFYO0FBQWMsT0FBbkUsRUFBb0UsQ0FBQyxDQUFyRSxFQUF3RSxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixPQUE1QixFQUFvQyxVQUFTLENBQVQsRUFBVztBQUFDLFVBQUUsVUFBRixDQUFhLENBQWI7QUFBZ0IsT0FBaEUsRUFBaUUsQ0FBQyxDQUFsRSxFQUFxRSxLQUFLLFFBQUwsQ0FBYyxnQkFBZCxDQUErQixxQkFBL0IsRUFBcUQsWUFBVTtBQUFDLFVBQUUsYUFBRjtBQUFrQixPQUFsRixFQUFtRixDQUFDLENBQXBGLEVBQXVGLE9BQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBaUMsWUFBVTtBQUFDLG1CQUFXLFlBQVU7QUFBQyxZQUFFLEdBQUY7QUFBUSxTQUE5QixFQUErQixHQUEvQjtBQUFvQyxPQUFoRixFQUFpRixDQUFDLENBQWxGLEVBQXFGLE9BQU8sZ0JBQVAsQ0FBd0IsbUJBQXhCLEVBQTRDLFlBQVU7QUFBQyxtQkFBVyxZQUFVO0FBQUMsWUFBRSxHQUFGO0FBQVEsU0FBOUIsRUFBK0IsR0FBL0I7QUFBb0MsT0FBM0YsRUFBNEYsQ0FBQyxDQUE3RjtBQUFnRyxLQUhzRCxFQUdyRCxZQUFXLG9CQUFTLENBQVQsRUFBVztBQUFDLFdBQUssS0FBTCxDQUFXLENBQVgsR0FBYSxFQUFFLE9BQUYsQ0FBVSxDQUFWLEVBQWEsS0FBMUIsQ0FBZ0MsS0FBSyxLQUFMLENBQVcsQ0FBWCxHQUFhLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBYSxLQUExQjtBQUNyZCxXQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWdCLEtBQUssR0FBTCxFQUFoQixDQUEyQixLQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWdCLENBQWhCLENBQWtCLEtBQUssS0FBTCxDQUFXLElBQVgsR0FBZ0IsQ0FBaEIsQ0FBa0IsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFpQixFQUFqQjtBQUFvQixLQUpnWSxFQUkvWCxXQUFVLG1CQUFTLENBQVQsRUFBVztBQUFDLFVBQUcsU0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFsQixLQUEwQixFQUFFLGVBQUYsSUFBb0IsRUFBRSxJQUFFLEVBQUUsT0FBRixDQUFVLE1BQVosSUFBb0IsRUFBRSxLQUFGLElBQVMsTUFBSSxFQUFFLEtBQXJDLE1BQThDLEtBQUssS0FBTCxDQUFXLElBQVgsR0FBZ0IsRUFBRSxPQUFGLENBQVUsQ0FBVixFQUFhLEtBQWIsR0FBbUIsS0FBSyxLQUFMLENBQVcsQ0FBOUMsRUFBZ0QsS0FBSyxLQUFMLENBQVcsSUFBWCxHQUFnQixFQUFFLE9BQUYsQ0FBVSxDQUFWLEVBQWEsS0FBYixHQUFtQixLQUFLLEtBQUwsQ0FBVyxDQUE5RixFQUFnRyxPQUFLLEtBQUssS0FBTCxDQUFXLEtBQWhCLEtBQXdCLEtBQUssR0FBTCxDQUFTLEtBQUssS0FBTCxDQUFXLElBQXBCLElBQTBCLEtBQUssR0FBTCxDQUFTLEtBQUssS0FBTCxDQUFXLElBQXBCLENBQTFCLEdBQW9ELEtBQUssS0FBTCxDQUFXLEtBQVgsR0FBaUIsSUFBckUsR0FBMEUsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFpQixNQUFuSCxDQUFoRyxFQUEyTixXQUFTLEtBQUssS0FBTCxDQUFXLEtBQTdSLENBQTlDLENBQUgsRUFBc1Y7QUFBQyxVQUFFLGNBQUYsR0FBbUIsSUFBRyxNQUFJLEtBQUssS0FBVCxJQUFnQixJQUFFLEtBQUssS0FBTCxDQUFXLElBQTdCLElBQ3ZkLEtBQUssS0FBTCxLQUFhLEtBQUssTUFBTCxHQUFZLENBQXpCLElBQTRCLElBQUUsS0FBSyxLQUFMLENBQVcsSUFEMmEsRUFDdGEsS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFpQixDQUFqQixDQUFtQixLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLGVBQXBCLEdBQW9DLEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FBb0IsU0FBcEIsR0FBOEIsa0JBQWdCLEtBQUssS0FBTCxDQUFXLElBQVgsR0FBZ0IsS0FBSyxLQUFMLEdBQVcsS0FBSyxLQUFoRCxJQUF1RCxTQUF6SDtBQUFtSTtBQUFDLEtBTDhRLEVBSzdRLFVBQVMsa0JBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBRyxXQUFTLEtBQUssS0FBTCxDQUFXLEtBQXZCLEVBQTZCO0FBQUMsWUFBRSxLQUFLLEdBQUwsQ0FBUyxLQUFLLEtBQUwsQ0FBVyxJQUFwQixDQUFGLENBQTRCLEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FBb0IsZ0JBQXBCLEdBQXFDLEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FBb0IsVUFBcEIsR0FBK0IsV0FBcEUsQ0FBZ0YsSUFBRyxNQUFJLEtBQUssR0FBTCxLQUFXLEtBQUssS0FBTCxDQUFXLElBQTFCLElBQWdDLEtBQUcsQ0FBbkMsSUFBc0MsSUFBRSxLQUFLLEtBQUwsR0FBVyxDQUF0RCxFQUF3RCxLQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWdCLEtBQUssR0FBTCxFQUFoQixFQUEyQixJQUFFLEtBQUssS0FBTCxDQUFXLElBQWIsR0FBa0IsS0FBSyxLQUFMLEVBQWxCLEdBQStCLEtBQUssS0FBTCxFQUExRCxFQUF1RSxJQUFFLEtBQUssS0FBUCxLQUFlLEtBQUssS0FBTCxHQUNuZixDQURvZSxDQUF2RSxFQUMxWixLQUFLLEtBQUwsR0FBVyxLQUFLLE1BQUwsR0FBWSxDQUF2QixLQUEyQixLQUFLLEtBQUwsR0FBVyxLQUFLLE1BQUwsR0FBWSxDQUFsRCxDQUQwWixFQUNyVyxLQUFLLEtBQUwsS0FBYSxLQUFLLE1BQWxCLEtBQTJCLEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FBb0IsZ0JBQXBCLEdBQXFDLEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FBb0IsVUFBcEIsR0FBK0IsV0FBL0YsQ0FEcVcsRUFDelAsS0FBSyxLQUFMLEtBQWEsS0FBSyxNQUFsQixJQUEwQixLQUFLLE9BQUwsRUFEK04sQ0FDaE4sS0FBSyxRQUFMLENBQWMsS0FBZCxDQUFvQixlQUFwQixHQUFvQyxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLFNBQXBCLEdBQThCLGlCQUFlLENBQUMsS0FBSyxLQUFOLEdBQVksS0FBSyxLQUFoQyxHQUFzQyxTQUF4RztBQUFrSDtBQUFDLEtBTm1KLEVBTWxKLGVBQWMseUJBQVU7QUFBQyxXQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLGdCQUFwQixHQUFxQyxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLFVBQXBCLEdBQStCLFNBQXBFO0FBQThFLEtBTjJDLEVBTTFDLFlBQVcsb0JBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxJQUFFLEVBQUUsTUFBUixDQUFlLE1BQUksRUFBRSxRQUFOLElBQWdCLEtBQUssQ0FBTCxLQUFTLEVBQUUsS0FBM0IsSUFBa0MsRUFBRSxLQUFGLEtBQ2pmLEtBQUssS0FEMGMsS0FDbGMsRUFBRSxjQUFGLElBQW1CLEVBQUUsZUFBRixFQUFuQixFQUF1QyxLQUFLLEtBQUwsR0FBVyxFQUFFLEtBQXBELEVBQTBELEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FBb0IsZ0JBQXBCLEdBQXFDLEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FBb0IsVUFBcEIsR0FBK0IsV0FBOUgsRUFBMEksS0FBSyxRQUFMLENBQWMsS0FBZCxDQUFvQixlQUFwQixHQUFvQyxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLFNBQXBCLEdBQThCLGlCQUFlLENBQUMsS0FBSyxLQUFOLEdBQVksS0FBSyxLQUFoQyxHQUFzQyxTQUFsUCxFQUE0UCxLQUFLLE9BQUwsRUFEc007QUFDdEwsS0FQMEwsRUFPekwsU0FBUSxtQkFBVTtBQUFDLFdBQUssTUFBTCxDQUFZLEtBQUssS0FBakIsRUFBd0IsU0FBeEIsSUFBbUMsTUFBSSxLQUFLLE9BQTVDLENBQW9ELEtBQUssTUFBTCxDQUFZLEtBQUssTUFBakIsRUFBeUIsU0FBekIsR0FBbUMsS0FBSyxNQUFMLENBQVksS0FBSyxNQUFqQixFQUF5QixTQUF6QixDQUFtQyxPQUFuQyxDQUEyQyxLQUFLLE9BQWhELEVBQXdELEVBQXhELEVBQTRELElBQTVELEVBQW5DLENBQXNHLEtBQUssU0FBTCxDQUFlLEtBQUssS0FBcEIsRUFBMkIsU0FBM0IsSUFBc0MsTUFBSSxLQUFLLE9BQS9DO0FBQ3ZjLFdBQUssU0FBTCxDQUFlLEtBQUssTUFBcEIsRUFBNEIsU0FBNUIsR0FBc0MsS0FBSyxTQUFMLENBQWUsS0FBSyxNQUFwQixFQUE0QixTQUE1QixDQUFzQyxPQUF0QyxDQUE4QyxLQUFLLE9BQW5ELEVBQTJELEVBQTNELEVBQStELElBQS9ELEVBQXRDLENBQTRHLEtBQUssTUFBTCxHQUFZLEtBQUssS0FBakI7QUFBdUIsS0FSZ1YsRUFBaEI7QUFROVQsQ0FSckk7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLFVBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUI7QUFDbEIsUUFBSSxRQUFRLElBQUksZUFBaEI7QUFBQSxRQUNJLFlBQVksdUJBQXVCLE1BQXZCLEdBQWdDLG1CQUFoQyxHQUFzRCxRQUR0RTtBQUFBLFFBRUksU0FBUyxTQUFULE1BQVMsR0FBVztBQUNoQixZQUFJLGNBQWMsTUFBTSxXQUF4QjtBQUNBLFlBQUcsQ0FBQyxXQUFKLEVBQWlCO0FBQ2pCLGNBQU0sS0FBTixDQUFZLFFBQVosR0FBdUIsT0FBTyxjQUFjLEdBQWQsR0FBb0IsQ0FBM0IsSUFBZ0MsSUFBdkQ7QUFDSCxLQU5MO0FBT0EsUUFBRyxDQUFDLElBQUksZ0JBQVIsRUFBMEI7QUFDMUIsUUFBSSxnQkFBSixDQUFxQixTQUFyQixFQUFnQyxNQUFoQyxFQUF3QyxLQUF4QztBQUNBLFFBQUksZ0JBQUosQ0FBcUIsa0JBQXJCLEVBQXlDLE1BQXpDLEVBQWlELEtBQWpEO0FBQ0QsQ0FYRCxFQVdHLFFBWEgsRUFXYSxNQVhiOztBQWFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0ICcuL2xpYi9zZXRSZW0nO1xuaW1wb3J0ICcuL2xpYi9tVGFicy5taW4nO1xuXG4vLyB0YWLpgInpobnljaFcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLGZ1bmN0aW9uKCl7XG5cdG5ldyBtVGFicyh7XG4gICAgICAgIG10YWI6ICcjdGFiczEnLFxuICAgICAgICBtaGVhZDogJyN0YWJzMSAubWhlYWQnLFxuICAgICAgICBtY29udGVudDogJyN0YWJzMSAubWNvbnRlbnQnXG4gICAgfSk7XG59LGZhbHNlKTtcbnZhciBtakpzID0gbW9qaUpzKCk7XG4gICAgbWpKcy5jb25maWcoe1xuICAgICAgICAvLyBhcHBJZDogJ21vamk4ODg4MjAxNTA5MDcnLFxuICAgICAgICBhcHBJZDogJzQwMWYzZjViM2E2NzI2MTc4NmIxZWU5Y2FhYjkwN2QzJyxcbiAgICB9KTtcbi8vIOivuOiRm+e7n+iuoVxuLy8gd2luZG93LnpodWdlLmxvYWQoJ1lvdXIgQXBwIEtleScsIHtkZWJ1Zzp0cnVlfSk7XG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKCl7XG4vLyAgICAgd2luZG93LnpodWdlLmxvYWQoJ1lvdXIgQXBwIEtleScsIHtkZWJ1Zzp0cnVlfSk7XG4vLyB9KVxuLy8g56uv5YaF5YiG5LqrXG4vL+WIhuS6q1xudmFyIGRscCA9IGRvd25sb2FkQXBwKHtvcmlnaW5hbDogdHJ1ZSB9KTtcbi8v5b6u5L+h5YiG5LqrXG52YXIgdXJsID0gbG9jYXRpb24uaHJlZjtcbnZhciBpbWdVcmwgPSB1cmwuc2xpY2UoIDAsdXJsLmxhc3RJbmRleE9mKFwiL1wiKSApICsgXCIvYXNzZXRzL2ltYWdlcy9zaGFyZS5wbmdcIlxudmFyIHNoYXJlRGF0YSA9IHtcbiAgICBcImltZ1VybFwiOiBpbWdVcmwsXG4gICAgXCJsaW5rXCI6IHVybCxcbiAgICBcImRlc2NcIjogXCLmmKXpo47jgIHmmKXml6XjgIHmmKXmmpbjgIHmmKXplb/vvIzloqjov7nlpKnmsJTkuI7kvaDmmKXml6Xnm7jpgKJcIixcbiAgICBcInRpdGxlXCI6IFwi5aKo6L+55aSp5rCU5LiO5L2g5pil5pel55u46YCiXCJcbn07XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcF9saW5rXCIpLmlubmVySFRNTD11cmw7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcF9pbWdfdXJsXCIpLnNyYz1pbWdVcmw7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcF9iaWdfaW1nX3VybFwiKS5zcmM9aW1nVXJsO1xuZGxwLnd4U2RrKHNoYXJlRGF0YSk7XG52YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcbmlmKC9tb2ppYXxtb2ppaS8udGVzdCh1YSkpe1xuICAgXG59ZWxzZXtcblxufVxuXG4vLyB2YXIgZGxwID0gZG93bmxvYWRBcHAoe29yaWdpbmFsOiB0cnVlfSk7IiwiLyoqXHJcbiAqIExCUyBtVGFic1xyXG4gKiBEYXRlOiAyMDE0LTUtMTBcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIG9wdHMubXRhYiBcdHRhYnPlpJblm7Tlrrnlmagv5ruR5Yqo5LqL5Lu25a+56LGhKOS4gOS4qkNTU+mAieaLqeWZqClcclxuICogb3B0cy5taGVhZCBcdHRhYnPmoIfpopjlrrnlmagv54K55Ye75a+56LGhKOS4gOS4qkNTU+mAieaLqeWZqClcclxuICogb3B0cy5tY29udGVudFx0dGFic+WGheWuueWuueWZqC/mu5HliqjliIfmjaLlr7nosaEo5LiA5LiqQ1NT6YCJ5oup5ZmoKSBcclxuICogb3B0cy5pbmRleCBcdHRhYnPntKLlvJUo6buY6K6kMCkg5oyH5a6a5pi+56S65ZOq5Liq57Si5byV55qE5qCH6aKY44CB5YaF5a65XHJcbiAqIG9wdHMuY3VycmVudCAgdGFic+W9k+WJjemhueeahOexu+WQjSjpu5jorqRjdXJyZW50KVxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuKiovXHJcbihmdW5jdGlvbigpe3dpbmRvdy5tVGFicz1mdW5jdGlvbihhKXt2b2lkIDAhPT10eXBlb2YgYSYmKHRoaXMubXRhYj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGEubXRhYiksdGhpcy5taGVhZD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGEubWhlYWQpLHRoaXMubWNvbnRlbnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhLm1jb250ZW50KSx0aGlzLm1oZWFkcz10aGlzLm1oZWFkLmNoaWxkcmVuLHRoaXMubWNvbnRlbnRzPXRoaXMubWNvbnRlbnQuY2hpbGRyZW4sdGhpcy5sZW5ndGg9dGhpcy5taGVhZHMubGVuZ3RoLDE+dGhpcy5sZW5ndGh8fChhLmluZGV4PnRoaXMubGVuZ3RoLTEmJihhLmluZGV4PXRoaXMubGVuZ3RoLTEpLHRoaXMuaW5kZXg9dGhpcy5vSW5kZXg9YS5pbmRleHx8MCx0aGlzLmN1cnJlbnQ9YS5jdXJyZW50fHxcImN1cnJlbnRcIix0aGlzLnRvdWNoPXt9LHRoaXMuaW5pdCgpKSl9O21UYWJzLnByb3RvdHlwZT17aW5pdDpmdW5jdGlvbihhKXt0aGlzLnNldCgpO3RoaXMuaW5pdHNldCgpO1xyXG50aGlzLmJpbmQoKX0saW5pdHNldDpmdW5jdGlvbigpe2Zvcih2YXIgYT0wO2E8dGhpcy5sZW5ndGg7YSsrKXRoaXMubWhlYWRzW2FdLmluZGV4PWEsdGhpcy5taGVhZHNbYV0uY2xhc3NOYW1lPXRoaXMubWhlYWRzW2FdLmNsYXNzTmFtZS5yZXBsYWNlKHRoaXMuY3VycmVudCxcIlwiKSx0aGlzLm1jb250ZW50c1thXS5jbGFzc05hbWU9dGhpcy5tY29udGVudHNbYV0uY2xhc3NOYW1lLnJlcGxhY2UodGhpcy5jdXJyZW50LFwiXCIpO3RoaXMubWhlYWRzW3RoaXMuaW5kZXhdLmNsYXNzTmFtZSs9XCIgXCIrdGhpcy5jdXJyZW50O3RoaXMubWNvbnRlbnRzW3RoaXMuaW5kZXhdLmNsYXNzTmFtZSs9XCIgXCIrdGhpcy5jdXJyZW50O3RoaXMubWNvbnRlbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtPXRoaXMubWNvbnRlbnQuc3R5bGUudHJhbnNmb3JtPVwidHJhbnNsYXRlM2QoXCIrLXRoaXMuaW5kZXgqdGhpcy53aWR0aCtcInB4LDAsMClcIn0sc2V0OmZ1bmN0aW9uKCl7dGhpcy53aWR0aD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGh8fFxyXG5kb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO3RoaXMubWNvbnRlbnQuc3R5bGUud2lkdGg9dGhpcy5sZW5ndGgqdGhpcy53aWR0aCtcInB4XCI7Zm9yKHZhciBhPTA7YTx0aGlzLmxlbmd0aDthKyspdGhpcy5tY29udGVudHNbYV0uc3R5bGUud2lkdGg9dGhpcy53aWR0aCtcInB4XCI7dGhpcy5tY29udGVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm09dGhpcy5tY29udGVudC5zdHlsZS50cmFuc2Zvcm09XCJ0cmFuc2xhdGUzZChcIistdGhpcy5pbmRleCp0aGlzLndpZHRoK1wicHgsMCwwKVwifSxiaW5kOmZ1bmN0aW9uKCl7dmFyIGE9dGhpczt0aGlzLm10YWIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIixmdW5jdGlvbihiKXthLnRvdWNoU3RhcnQoYil9LCExKTt0aGlzLm10YWIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLGZ1bmN0aW9uKGIpe2EudG91Y2hNb3ZlKGIpfSwhMSk7dGhpcy5tdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLGZ1bmN0aW9uKGIpe2EudG91Y2hFbmQoYil9LFxyXG4hMSk7dGhpcy5tdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLGZ1bmN0aW9uKGIpe2EudG91Y2hFbmQoYil9LCExKTt0aGlzLm1oZWFkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGIpe2EudG91Y2hDbGljayhiKX0sITEpO3RoaXMubWNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdFRyYW5zaXRpb25FbmRcIixmdW5jdGlvbigpe2EudHJhbnNpdGlvbkVuZCgpfSwhMSk7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXthLnNldCgpfSwxMDApfSwhMSk7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLGZ1bmN0aW9uKCl7c2V0VGltZW91dChmdW5jdGlvbigpe2Euc2V0KCl9LDEwMCl9LCExKX0sdG91Y2hTdGFydDpmdW5jdGlvbihhKXt0aGlzLnRvdWNoLng9YS50b3VjaGVzWzBdLnBhZ2VYO3RoaXMudG91Y2gueT1hLnRvdWNoZXNbMF0ucGFnZVk7XHJcbnRoaXMudG91Y2gudGltZT1EYXRlLm5vdygpO3RoaXMudG91Y2guZGlzWD0wO3RoaXMudG91Y2guZGlzWT0wO3RoaXMudG91Y2guZml4ZWQ9XCJcIn0sdG91Y2hNb3ZlOmZ1bmN0aW9uKGEpe2lmKFwidXBcIiE9PXRoaXMudG91Y2guZml4ZWQmJihhLnN0b3BQcm9wYWdhdGlvbigpLCEoMTxhLnRvdWNoZXMubGVuZ3RofHxhLnNjYWxlJiYxIT09YS5zY2FsZSkmJih0aGlzLnRvdWNoLmRpc1g9YS50b3VjaGVzWzBdLnBhZ2VYLXRoaXMudG91Y2gueCx0aGlzLnRvdWNoLmRpc1k9YS50b3VjaGVzWzBdLnBhZ2VZLXRoaXMudG91Y2gueSxcIlwiPT09dGhpcy50b3VjaC5maXhlZCYmKE1hdGguYWJzKHRoaXMudG91Y2guZGlzWSk+TWF0aC5hYnModGhpcy50b3VjaC5kaXNYKT90aGlzLnRvdWNoLmZpeGVkPVwidXBcIjp0aGlzLnRvdWNoLmZpeGVkPVwibGVmdFwiKSxcImxlZnRcIj09PXRoaXMudG91Y2guZml4ZWQpKSl7YS5wcmV2ZW50RGVmYXVsdCgpO2lmKDA9PT10aGlzLmluZGV4JiYwPHRoaXMudG91Y2guZGlzWHx8XHJcbnRoaXMuaW5kZXg9PT10aGlzLmxlbmd0aC0xJiYwPnRoaXMudG91Y2guZGlzWCl0aGlzLnRvdWNoLmRpc1gvPTQ7dGhpcy5tY29udGVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm09dGhpcy5tY29udGVudC5zdHlsZS50cmFuc2Zvcm09XCJ0cmFuc2xhdGUzZChcIisodGhpcy50b3VjaC5kaXNYLXRoaXMuaW5kZXgqdGhpcy53aWR0aCkrXCJweCwwLDApXCJ9fSx0b3VjaEVuZDpmdW5jdGlvbihhKXtpZihcImxlZnRcIj09PXRoaXMudG91Y2guZml4ZWQpe2E9TWF0aC5hYnModGhpcy50b3VjaC5kaXNYKTt0aGlzLm1jb250ZW50LnN0eWxlLndlYmtpdFRyYW5zaXRpb249dGhpcy5tY29udGVudC5zdHlsZS50cmFuc2l0aW9uPVwiYWxsIDEwMG1zXCI7aWYoMTAwPERhdGUubm93KCktdGhpcy50b3VjaC50aW1lJiYxMDxhfHxhPnRoaXMud2lkdGgvMil0aGlzLnRvdWNoLnRpbWU9RGF0ZS5ub3coKSwwPHRoaXMudG91Y2guZGlzWD90aGlzLmluZGV4LS06dGhpcy5pbmRleCsrLDA+dGhpcy5pbmRleCYmKHRoaXMuaW5kZXg9XHJcbjApLHRoaXMuaW5kZXg+dGhpcy5sZW5ndGgtMSYmKHRoaXMuaW5kZXg9dGhpcy5sZW5ndGgtMSksdGhpcy5pbmRleD09PXRoaXMub0luZGV4JiYodGhpcy5tY29udGVudC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uPXRoaXMubWNvbnRlbnQuc3R5bGUudHJhbnNpdGlvbj1cImFsbCAzMDBtc1wiKSx0aGlzLmluZGV4IT09dGhpcy5vSW5kZXgmJnRoaXMucmVwbGFjZSgpO3RoaXMubWNvbnRlbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtPXRoaXMubWNvbnRlbnQuc3R5bGUudHJhbnNmb3JtPVwidHJhbnNsYXRlM2QoXCIrLXRoaXMuaW5kZXgqdGhpcy53aWR0aCtcInB4LDAsMClcIn19LHRyYW5zaXRpb25FbmQ6ZnVuY3Rpb24oKXt0aGlzLm1jb250ZW50LnN0eWxlLndlYmtpdFRyYW5zaXRpb249dGhpcy5tY29udGVudC5zdHlsZS50cmFuc2l0aW9uPVwiYWxsIDBtc1wifSx0b3VjaENsaWNrOmZ1bmN0aW9uKGEpe3ZhciBiPWEudGFyZ2V0OzE9PT1iLm5vZGVUeXBlJiZ2b2lkIDAhPT1iLmluZGV4JiZiLmluZGV4IT09XHJcbnRoaXMuaW5kZXgmJihhLnByZXZlbnREZWZhdWx0KCksYS5zdG9wUHJvcGFnYXRpb24oKSx0aGlzLmluZGV4PWIuaW5kZXgsdGhpcy5tY29udGVudC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uPXRoaXMubWNvbnRlbnQuc3R5bGUudHJhbnNpdGlvbj1cImFsbCAxMDBtc1wiLHRoaXMubWNvbnRlbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtPXRoaXMubWNvbnRlbnQuc3R5bGUudHJhbnNmb3JtPVwidHJhbnNsYXRlM2QoXCIrLXRoaXMuaW5kZXgqdGhpcy53aWR0aCtcInB4LDAsMClcIix0aGlzLnJlcGxhY2UoKSl9LHJlcGxhY2U6ZnVuY3Rpb24oKXt0aGlzLm1oZWFkc1t0aGlzLmluZGV4XS5jbGFzc05hbWUrPVwiIFwiK3RoaXMuY3VycmVudDt0aGlzLm1oZWFkc1t0aGlzLm9JbmRleF0uY2xhc3NOYW1lPXRoaXMubWhlYWRzW3RoaXMub0luZGV4XS5jbGFzc05hbWUucmVwbGFjZSh0aGlzLmN1cnJlbnQsXCJcIikudHJpbSgpO3RoaXMubWNvbnRlbnRzW3RoaXMuaW5kZXhdLmNsYXNzTmFtZSs9XCIgXCIrdGhpcy5jdXJyZW50O1xyXG50aGlzLm1jb250ZW50c1t0aGlzLm9JbmRleF0uY2xhc3NOYW1lPXRoaXMubWNvbnRlbnRzW3RoaXMub0luZGV4XS5jbGFzc05hbWUucmVwbGFjZSh0aGlzLmN1cnJlbnQsXCJcIikudHJpbSgpO3RoaXMub0luZGV4PXRoaXMuaW5kZXh9fX0pKCk7IiwiLy8gKGZ1bmN0aW9uIChkb2MsIHdpbikge1xuLy8gICAgIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4vLyAgICAgICByZXNpemVFdnQgPSAnb3JpZW50YXRpb25jaGFuZ2UnIGluIHdpbmRvdyA/ICdvcmllbnRhdGlvbmNoYW5nZScgOiAncmVzaXplJyxcbi8vICAgICAgIHJlY2FsYyA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgdmFyIGNsaWVudFdpZHRoID0gZG9jRWwuY2xpZW50V2lkdGg7XG4vLyAgICAgICAgIGlmICghY2xpZW50V2lkdGgpIHJldHVybjtcbi8vICAgICAgICAgZG9jRWwuc3R5bGUuZm9udFNpemUgPSAxMDAgKiAoY2xpZW50V2lkdGggLyA2NDAgKiAyKSArICdweCc7XG4vLyAgICAgICAgIC8vNzUw5piv6K6+6K6h5Zu+55qE5a695bqmLDEwMOaYr+S4gOS4quWfuuWHhuWuveW6pihodG1s55qEZm9udC1zaXpl5YC8KVxuLy8gICAgICAgfTtcbi8vICAgICBpZiAoIWRvYy5hZGRFdmVudExpc3RlbmVyKSByZXR1cm47XG4vLyAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIocmVzaXplRXZ0LCByZWNhbGMsIGZhbHNlKTtcbi8vICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHJlY2FsYywgZmFsc2UpO1xuLy8gICB9KShkb2N1bWVudCwgd2luZG93KTtcblxuLy8gICA8IS0t56e75Yqo56uv6Ieq6YCC5bqULS0+XG4oZnVuY3Rpb24oZG9jLCB3aW4pIHtcbiAgdmFyIGRvY0VsID0gZG9jLmRvY3VtZW50RWxlbWVudCxcbiAgICAgIHJlc2l6ZUV2dCA9ICdvcmllbnRhdGlvbmNoYW5nZScgaW4gd2luZG93ID8gJ29yaWVudGF0aW9uY2hhbmdlJyA6ICdyZXNpemUnLFxuICAgICAgcmVjYWxjID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGNsaWVudFdpZHRoID0gZG9jRWwuY2xpZW50V2lkdGg7XG4gICAgICAgICAgaWYoIWNsaWVudFdpZHRoKSByZXR1cm47XG4gICAgICAgICAgZG9jRWwuc3R5bGUuZm9udFNpemUgPSAxMDAgKiAoY2xpZW50V2lkdGggLyA3NTAgKiAyKSArICdweCc7XG4gICAgICB9O1xuICBpZighZG9jLmFkZEV2ZW50TGlzdGVuZXIpIHJldHVybjtcbiAgd2luLmFkZEV2ZW50TGlzdGVuZXIocmVzaXplRXZ0LCByZWNhbGMsIGZhbHNlKTtcbiAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCByZWNhbGMsIGZhbHNlKTtcbn0pKGRvY3VtZW50LCB3aW5kb3cpO1xuXG4gIC8vIOe9keS4iuS4i+i9vVxuLy8gIVxuLy8gZnVuY3Rpb24od2luKSB7XG4vLyAgICAgZnVuY3Rpb24gcmVzaXplKCkge1xuLy8gICAgICAgICB2YXIgZG9tV2lkdGggPSBkb21FbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4vLyAgICAgICAgIHdpbi5yZW0gPSBkb21XaWR0aCAvIDEwO1xuLy8gICAgICAgICBkb21FbGUuc3R5bGUuZm9udFNpemUgPSB3aW4ucmVtICsgXCJweFwiXG4vLyAgICAgfVxuLy8gICAgIHZhciB2LCBpbml0aWFsX3NjYWxlLCB0aW1lQ29kZSwgZG9tID0gd2luLmRvY3VtZW50LFxuLy8gICAgIGRvbUVsZSA9IGRvbS5kb2N1bWVudEVsZW1lbnQsXG4vLyAgICAgdmlld3BvcnQgPSBkb20ucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidmlld3BvcnRcIl0nKSxcbi8vICAgICBmbGV4aWJsZSA9IGRvbS5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJmbGV4aWJsZVwiXScpO1xuLy8gICAgIGlmICh2aWV3cG9ydCkge1xuLy8gICAgICAgICB2YXIgbyA9IHZpZXdwb3J0LmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIikubWF0Y2goL2luaXRpYWxcXC1zY2FsZT0oW1wiJ10/KShbXFxkXFwuXSspXFwxPy8pO1xuLy8gICAgICAgICBpZiAobykge1xuLy8gICAgICAgICAgICAgaW5pdGlhbF9zY2FsZSA9IHBhcnNlRmxvYXQob1syXSk7XG4vLyAgICAgICAgICAgICB2ID0gcGFyc2VJbnQoMSAvIGluaXRpYWxfc2NhbGUpXG4vLyAgICAgICAgIH1cbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgICBpZiAoZmxleGlibGUpIHtcbi8vICAgICAgICAgICAgIHZhciBvID0gZmxleGlibGUuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKS5tYXRjaCgvaW5pdGlhbFxcLWRwcj0oW1wiJ10/KShbXFxkXFwuXSspXFwxPy8pO1xuLy8gICAgICAgICAgICAgaWYgKG8pIHtcbi8vICAgICAgICAgICAgICAgICB2ID0gcGFyc2VGbG9hdChvWzJdKTtcbi8vICAgICAgICAgICAgICAgICBpbml0aWFsX3NjYWxlID0gcGFyc2VGbG9hdCgoMSAvIHYpLnRvRml4ZWQoMikpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgaWYgKCF2ICYmICFpbml0aWFsX3NjYWxlKSB7XG4vLyAgICAgICAgIHZhciBuID0gKHdpbi5uYXZpZ2F0b3IuYXBwVmVyc2lvbi5tYXRjaCgvYW5kcm9pZC9naSksIHdpbi5uYXZpZ2F0b3IuYXBwVmVyc2lvbi5tYXRjaCgvaXBob25lL2dpKSk7XG4vLyAgICAgICAgIHYgPSB3aW4uZGV2aWNlUGl4ZWxSYXRpbztcbi8vICAgICAgICAgdiA9IG4gPyB2ID49IDMgPyAzIDogdiA+PSAyID8gMiA6IDEgOiAxLFxuLy8gICAgICAgICBpbml0aWFsX3NjYWxlID0gMSAvIHZcbi8vICAgICB9XG4vLyAgICAgaWYgKGRvbUVsZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRwclwiLCB2KSwgIXZpZXdwb3J0KSB7XG4vLyAgICAgICAgIGlmICh2aWV3cG9ydCA9IGRvbS5jcmVhdGVFbGVtZW50KFwibWV0YVwiKSwgdmlld3BvcnQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInZpZXdwb3J0XCIpLCB2aWV3cG9ydC5zZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIsIFwiaW5pdGlhbC1zY2FsZT1cIiArIGluaXRpYWxfc2NhbGUgKyBcIiwgbWF4aW11bS1zY2FsZT1cIiArIGluaXRpYWxfc2NhbGUgKyBcIiwgbWluaW11bS1zY2FsZT1cIiArIGluaXRpYWxfc2NhbGUgKyBcIiwgdXNlci1zY2FsYWJsZT1ub1wiKSwgZG9tRWxlLmZpcnN0RWxlbWVudENoaWxkKSB7XG4vLyAgICAgICAgICAgICBkb21FbGUuZmlyc3RFbGVtZW50Q2hpbGQuYXBwZW5kQ2hpbGQodmlld3BvcnQpXG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICB2YXIgbSA9IGRvbS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy8gICAgICAgICAgICAgbS5hcHBlbmRDaGlsZCh2aWV3cG9ydCksXG4vLyAgICAgICAgICAgICBkb20ud3JpdGUobS5pbm5lckhUTUwpXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgd2luLmRwciA9IHY7XG4vLyAgICAgaWYgKGRvbUVsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCA+PSA2NDApIHtcbi8vICAgICAgICAgZG9tRWxlLnN0eWxlLndpZHRoID0gNjQwICsgJ3B4Jztcbi8vICAgICAgICAgdmFyIGNsaWVudFcgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcbi8vICAgICAgICAgdmFyIHBjdyA9IChjbGllbnRXIC0gZG9tRWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSAvIDI7XG4vLyAgICAgICAgIGRvbUVsZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbi8vICAgICAgICAgZG9tRWxlLnN0eWxlLmxlZnQgPSBwY3cgKyAncHgnXG4vLyAgICAgfVxuLy8gICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsXG4vLyAgICAgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lQ29kZSksXG4vLyAgICAgICAgIHRpbWVDb2RlID0gc2V0VGltZW91dChyZXNpemUsIDMwMClcbi8vICAgICB9LFxuLy8gICAgIGZhbHNlKTtcbi8vICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsXG4vLyAgICAgZnVuY3Rpb24oYikge1xuLy8gICAgICAgICBiLnBlcnNpc3RlZCAmJiAoY2xlYXJUaW1lb3V0KHRpbWVDb2RlKSwgdGltZUNvZGUgPSBzZXRUaW1lb3V0KHJlc2l6ZSwgMzAwKSlcbi8vICAgICB9LFxuLy8gICAgIGZhbHNlKTtcbi8vICAgICByZXNpemUoKVxuLy8gfSAod2luZG93KTtcblxuXG5cbi8vIOaWsOeahFxuLy9kZXNpZ25XaWR0aDrorr7orqHnqL/nmoTlrp7pmYXlrr3luqblgLzvvIzpnIDopoHmoLnmja7lrp7pmYXorr7nva5cbi8vbWF4V2lkdGg65Yi25L2c56i/55qE5pyA5aSn5a695bqm5YC877yM6ZyA6KaB5qC55o2u5a6e6ZmF6K6+572uXG4vL+i/meautWpz55qE5pyA5ZCO6Z2i5pyJ5Lik5Liq5Y+C5pWw6K6w5b6X6KaB6K6+572u77yM5LiA5Liq5Li66K6+6K6h56i/5a6e6ZmF5a695bqm77yM5LiA5Liq5Li65Yi25L2c56i/5pyA5aSn5a695bqm77yM5L6L5aaC6K6+6K6h56i/5Li6NzUw77yM5pyA5aSn5a695bqm5Li6NzUw77yM5YiZ5Li6KDc1MCw3NTApXG5cbi8vIDsoZnVuY3Rpb24oZGVzaWduV2lkdGgsIG1heFdpZHRoKSB7XG4vLyBcdHZhciBkb2MgPSBkb2N1bWVudCxcbi8vIFx0d2luID0gd2luZG93LFxuLy8gXHRkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4vLyBcdHJlbVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpLFxuLy8gXHR0aWQ7XG5cbi8vIFx0ZnVuY3Rpb24gcmVmcmVzaFJlbSgpIHtcbi8vIFx0XHR2YXIgd2lkdGggPSBkb2NFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbi8vIFx0XHRtYXhXaWR0aCA9IG1heFdpZHRoIHx8IDU0MDtcbi8vIFx0XHR3aWR0aD5tYXhXaWR0aCAmJiAod2lkdGg9bWF4V2lkdGgpO1xuLy8gXHRcdHZhciByZW0gPSB3aWR0aCAqIDEwMCAvIGRlc2lnbldpZHRoO1xuLy8gXHRcdHJlbVN0eWxlLmlubmVySFRNTCA9ICdodG1se2ZvbnQtc2l6ZTonICsgcmVtICsgJ3B4O30nO1xuLy8gXHR9XG5cbi8vIFx0aWYgKGRvY0VsLmZpcnN0RWxlbWVudENoaWxkKSB7XG4vLyBcdFx0ZG9jRWwuZmlyc3RFbGVtZW50Q2hpbGQuYXBwZW5kQ2hpbGQocmVtU3R5bGUpO1xuLy8gXHR9IGVsc2Uge1xuLy8gXHRcdHZhciB3cmFwID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4vLyBcdFx0d3JhcC5hcHBlbmRDaGlsZChyZW1TdHlsZSk7XG4vLyBcdFx0ZG9jLndyaXRlKHdyYXAuaW5uZXJIVE1MKTtcbi8vIFx0XHR3cmFwID0gbnVsbDtcbi8vIFx0fVxuLy8gXHQvL+imgeetiSB3aWV3cG9ydCDorr7nva7lpb3lkI7miY3og73miafooYwgcmVmcmVzaFJlbe+8jOS4jeeEtiByZWZyZXNoUmVtIOS8muaJp+ihjDLmrKHvvJtcbi8vIFx0cmVmcmVzaFJlbSgpO1xuXG4vLyBcdHdpbi5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uKCkge1xuLy8gXHRcdGNsZWFyVGltZW91dCh0aWQpOyAvL+mYsuatouaJp+ihjOS4pOasoVxuLy8gXHRcdHRpZCA9IHNldFRpbWVvdXQocmVmcmVzaFJlbSwgMzAwKTtcbi8vIFx0fSwgZmFsc2UpO1xuXG4vLyBcdHdpbi5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgZnVuY3Rpb24oZSkge1xuLy8gXHRcdGlmIChlLnBlcnNpc3RlZCkgeyAvLyDmtY/op4jlmajlkI7pgIDnmoTml7blgJnph43mlrDorqHnrpdcbi8vIFx0XHRcdGNsZWFyVGltZW91dCh0aWQpO1xuLy8gXHRcdFx0dGlkID0gc2V0VGltZW91dChyZWZyZXNoUmVtLCAzMDApO1xuLy8gXHRcdH1cbi8vIFx0fSwgZmFsc2UpO1xuXG4vLyBcdGlmIChkb2MucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XG4vLyBcdFx0ZG9jLmJvZHkuc3R5bGUuZm9udFNpemUgPSBcIjE2cHhcIjtcbi8vIFx0fSBlbHNlIHtcbi8vIFx0XHRkb2MuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oZSkge1xuLy8gXHRcdFx0ZG9jLmJvZHkuc3R5bGUuZm9udFNpemUgPSBcIjE2cHhcIjtcbi8vIFx0XHR9LCBmYWxzZSk7XG4vLyBcdH1cbi8vIH0pKDY0MCwgNjQwKTtcblxuXG4vLyDmlrDnmoTlj6/nlKjvvIzkvYbkuI3og73liqjmgIHliLfmlrBcblxuLy/luLjop4Tmg4XlhrXkuItqc+agueaNruWxj+W5leWuveW6puWKqOaAgeiuoeeul1xuXG4vLyAhKGZ1bmN0aW9uKGRvYywgd2luKSB7XG4vLyAgICAgdmFyIGRvY0VsZSA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4vLyAgICAgICAgIGV2dCA9IFwib25vcmllbnRhdGlvbmNoYW5nZVwiIGluIHdpbmRvdyA/IFwib3JpZW50YXRpb25jaGFuZ2VcIiA6IFwicmVzaXplXCIsXG4vLyAgICAgICAgIGZuID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICB2YXIgd2lkdGggPSBkb2NFbGUuY2xpZW50V2lkdGg7XG4vLyAgICAgICAgICAgICB3aWR0aCAmJiAoZG9jRWxlLnN0eWxlLmZvbnRTaXplID0gMTAwICogKHdpZHRoIC8gNjQwICogMikgKyBcInB4XCIpO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBmbiwgZmFsc2UpO1xuLy8gICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmbiwgZmFsc2UpO1xuXG4vLyB9KGRvY3VtZW50LCB3aW5kb3cpKTsiXX0=
