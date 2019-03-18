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
(function(doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
          var clientWidth = docEl.clientWidth;
          if(!clientWidth) return;
          docEl.style.fontSize = 100 * (clientWidth / 750 * 2) + 'px';
      };
  if(!doc.addEventListener) return;
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