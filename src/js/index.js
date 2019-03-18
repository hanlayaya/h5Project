import './lib/setRem';
import './lib/mTabs.min';

// tab选项卡
document.addEventListener('DOMContentLoaded',function(){
	new mTabs({
        mtab: '#tabs1',
        mhead: '#tabs1 .mhead',
        mcontent: '#tabs1 .mcontent'
    });
},false);
var mjJs = mojiJs();
    mjJs.config({
        // appId: 'moji888820150907',
        appId: '401f3f5b3a67261786b1ee9caab907d3',
    });
// 诸葛统计
// window.zhuge.load('Your App Key', {debug:true});
// document.getElementById('btn').addEventListener('click',function(){
//     window.zhuge.load('Your App Key', {debug:true});
// })
// 端内分享
//分享
var dlp = downloadApp({original: true });
//微信分享
var url = location.href;
var imgUrl = url.slice( 0,url.lastIndexOf("/") ) + "/assets/images/share.png"
var shareData = {
    "imgUrl": imgUrl,
    "link": url,
    "desc": "春风、春日、春暖、春长，墨迹天气与你春日相逢",
    "title": "墨迹天气与你春日相逢"
};
document.getElementById("app_link").innerHTML=url;
document.getElementById("app_img_url").src=imgUrl;
document.getElementById("app_big_img_url").src=imgUrl;
dlp.wxSdk(shareData);
var ua = navigator.userAgent.toLowerCase()
if(/mojia|mojii/.test(ua)){
   
}else{

}

// var dlp = downloadApp({original: true});