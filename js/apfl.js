/**
 * APFL 
 * Author : Donson
 * version : v0.0.1
 * LastEdit : 31/03/13 15:53:38  
 * =============
 */

var APFL = window.APFL || {};

/**
 * 命名空间
 */
APFL.namespace = function(ns){
    var parts = ns.split('.'),
        object = this, 
        i, len;

    for(i = 0,len = parts.length; i < len; i++){
        if(!object[parts[i]]){
            object[parts[i]] = {};
        }
        object = object[parts[i]];
    }
    return object;
};

APFL.namespace('base');

APFL.md5 = {
    hexChr : "0123456789abcdef",
    rhex : function(num) {
        str = "";
        for(j = 0; j <= 3; j++)
            str += this.hexChr.charAt((num >> (j * 8 + 4)) & 0x0F) +
                this.hexChr.charAt((num >> (j * 8)) & 0x0F);
        return str;
    } 
};



var hex_chr = "0123456789abcdef";
function rhex(num)
{
  str = "";
  for(j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

function str2blks_MD5(str)
{
  nblk = ((str.length + 8) >> 6) + 1;
  blks = new Array(nblk * 16);
  for(i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

function cmn(q, a, b, x, s, t)
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function MD5(str)
{
  x = str2blks_MD5(str);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
 
  for(i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i+10], 17, -42063);
    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = ff(d, a, b, c, x[i+13], 12, -40341101);
    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = ff(b, c, d, a, x[i+15], 22,  1236535329);    

    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = gg(c, d, a, b, x[i+11], 14,  643717713);
    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = gg(c, d, a, b, x[i+15], 14, -660478335);
    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = gg(b, c, d, a, x[i+12], 20, -1926607734);
    
    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i+10], 15, -1051523);
    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = ii(d, a, b, c, x[i+15], 10, -30611744);
    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}


/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
//调用flash函数方式
function getFlash(flashName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[flashName];
	}else{
		return document[flashName];
	}
}
//************************
//user login js start here

var loginFunction;
var loginedFuncs=new Array();

var spaceUrl="http://www.aipai.com/space.php?bid="
var manageUrl="http://www.aipai.com/my.php"
var userPicDef="http://www.aipai.com/app/www/templates/common/img/userdefault60.gif";
var loginUrl="/login.php";
var smsEmpty="http://www.aipai.com/app/www/templates/common/img/mailEmpty.gif";
var smsNew="http://www.aipai.com/app/www/templates/common/img/mail.gif";

var logining = false;	//是否登录中
var userNowTime = Date.parse(Date())/1000;  //用户登陆时间

function gel(a){
	if(arguments[1] == 'loginTop')
	{
		//top函数出错的时候，取消它
		try
		{
			if(top.document.getElementById(a) == null)
			{
				return false;
			}
			
			
		  return top.document.getElementById(a);
		}
		catch(err)
		{
		  try
		  {
			if(document.getElementById(a) == null)
			{
				return false;
			}	
			
			return document.getElementById?document.getElementById(a):null;
		  }
		  catch (err)
		  {
			  return parent.document.getElementById(a);
		  }
		  
		  
		}
	}

	return document.getElementById?document.getElementById(a):null;
}

/*
function CheckStr(srcStr){
    var dstStr;
    dstStr = srcStr;
    dstStr = dstStr.replace(/</g, “<”);
    dstStr = dstStr.replace(/>/g, “>”);
    dstStr = dstStr.replace(/&/g, “&”);
    return dstStr;
}
*/

//ajax functions

function CreateXMLHTTP(){
   if(window.XMLHttpRequest)
   {
      var xmlObj = new XMLHttpRequest();    
   } 
   else 
   {
      var MSXML = ['Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
      for(var n = 0; n < MSXML.length; n++)
      {
         try
         {
            var xmlObj = new ActiveXObject(MSXML[n]);        
            break;
         }
         catch(e)
         {
         }
      }
   } 
   return xmlObj;
}

function SendRequest(url, param, method, echofun) {
    var xmlHTTP = CreateXMLHTTP();
    
   	if(typeof(xmlHTTP) != "object")
   	{
    	return false ;
   	}
   		
   	
    if (xmlHTTP){
        xmlHTTP.onreadystatechange = function()
        {
            if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200){
                if (echofun!=null){
                	echofun(xmlHTTP.responseText);
                }
            }
            else
            {
            	//alert("网络故障");
            }
        }
        xmlHTTP.open(method, url, true);
        xmlHTTP.setRequestHeader("If-Modified-Since", 0); // no cache
        
        if (method == 'GET')
        {
        	xmlHTTP.send('');
        }
        else
        {
	        xmlHTTP.setRequestHeader('Content-Length',param.length); 
	        xmlHTTP.setRequestHeader('CONTENT-TYPE','application/x-www-form-urlencoded');
	        xmlHTTP.send(encodeURI(param));
        }    
    }else{
        NoXMLHTTP();
    }
}

function NoXMLHTTP(){
    alert('Sorry, your browser doesn’t support XMLHTTP');
}

function processLogin(responseText) 
{
	var ret = eval('(' + responseText + ')');
	
	if(ret['code'] == 0)
	{
		
		//用户时间检测(相差7天有提示一下)
		var userTime = Date.parse(Date());
		var correctTime = ret['user']['correctTime'];
		
		var difTime = Math.abs(userTime - ret['user']['nowTime']);	
		difTime = Math.ceil(difTime/(1000*60*60*24));
		if (difTime > 7)
		{
			alert("你的系统时间与标准时间相差太多，\n 这会影响你的正常登录，请检查时间设置再重新登录。\n\n 当前时间是: "+correctTime+"");
			//return false;
		}	

        if(ret['expChange'] != '')
        {
            //经验实体化
            try{
                APFL.pop.exp('登录成功', ret['expChange']);
            }catch(e){}
        }
		
		if (loginFunction!=null)
		{
			loginFunction();
		}
		
		doLoginedFuncs();
	} else if (ret['code'] == 25){
        //转到login.php,提示输入验证码
        var url = location.href;
        location.href = 'http://www.aipai.com/login.php?code=1&ref='+url;
    } else {
		if (gel("openLoginErrorMsg") == null)
		{
			alert(ret['msg']);
		}
		else
		{
			gel("openLoginErrorMsg").style.display = "block";   //弹出框登陆失败
			gel("openLoginErrorMsg").innerHTML = "拍子号/邮箱或密码输入有误";
			gel("openLoginErrorMsg").className = "tips";
            //newPage
            if(gel('gb_new_login') !== null){
                gbNewLogin.showTips('global_login_pass','帐号/密码不对');
            }

		}	
	}

	//登录请求完成
	logining = false;
	
}

function addLoginedFuncs(func)
{
	for (i=0;i<loginedFuncs.length;i++)
	{
		if (loginedFuncs[i] == func)
			return true;
	}
	
	loginedFuncs.push(func);
}

function doLoginedFuncs()
{
	for (i=0;i<loginedFuncs.length;i++)
	{
		loginedFuncs[i]();
	}
}

//gel 加top 保持永远都是父窗口 因为登陆涉及到子窗口。所以加TOP
/*
* 加上论坛的登陆判断
*/
function checkUserLogin()
{	
	var bid = Cookies.get("b");
	var nickname = Cookies.get("n",false);
	var userPic = Cookies.get("up");
	var notifyNum = Cookies.get("notifyNum");

	if (!notifyNum)
		notifyNum = 0;
			
	if (nickname==null || nickname.length <=0 )
	{
		nickname = "玩家" + bid;
	}
	
	if (userPic==null || userPic.length <= 0)
	{
		userPic = userPicDef;
	}
	
	if (bid==null || bid.length <= 0)
	{
        //newPage
        if(gel('gb_new_login') !== null){
            gbNewLogin.logout();
			//添加登录回调
			addLoginedFuncs(checkUserLogin);
            return;
        }

		gel("loginDiv1",'loginTop').style.display = "block";
		gel("loginDiv2",'loginTop').style.display = "none";
		
		if (gel("link_logined",'loginTop'))
		{
			try
			{
				gel("link_logined",'loginTop').style.display = "none";	
				gel("link_unlogin",'loginTop').style.display = "block";
			}
			catch(e){}
		}
	}
	else
	{
		var userSpace = spaceUrl + bid;
        //newPage
        if(gel('gb_new_login') !== null){
            gbNewLogin.login(nickname,userSpace,manageUrl,notifyNum,userPic);
			//添加登录回调
			addLoginedFuncs(checkUserLogin);
            return;
        }

        //登录完成后执行
        if(typeof afterLogin === 'function'){
            afterLogin();
        }

        /*
        if(window.location.hostname == 'f.aipai.com' || (typeof(tfans_page) != 'undefined' && tfans_page == 1))
        {
            var tfans = Cookies.get('tfans');
            if(tfans == 1)
            {
				var _tfans = '<span class="tfans">你好！亲爱的铁杆粉丝</span>';
				$('#userLink').before(_tfans);
				var _length = $('.tfans').length;
				if(_length == 2 || _length == 3){
					$('.tfans').eq(0).remove();
					$('.tfans').eq(1).remove();
				}
            }
        }
        */

		gel("userLink",'loginTop').innerHTML = decodeURIComponent(nickname);
		
		gel("userLink",'loginTop').href = userSpace;
		gel("userLink2",'loginTop').href = userSpace;
		
		gel("userSpaceLink",'loginTop').href = userSpace;
		gel("userManageLink",'loginTop').href = manageUrl;
		
		if (userPic.length > 0)
			gel("userPic",'loginTop').src = userPic;
		else
			gel("userPic",'loginTop').src = "../common/img/userdefault60.gif";
		
		gel("loginDiv1",'loginTop').style.display = "none";
		gel("loginDiv2",'loginTop').style.display = "block";

		if (gel("link_logined",'loginTop'))
		{		
			try
			{
				gel("link_logined",'loginTop').style.display = "block";	
				gel("link_unlogin",'loginTop').style.display = "none";
			}
			catch(e){}
		}	
		
		if (gel("login_mailnum_span",'loginTop'))
		{
			try
			{
				if (notifyNum>0)
				{
					gel("login_mailnum",'loginTop').innerHTML = notifyNum;
					
					if (gel("login_mailimg",'loginTop'))
						gel("login_mailimg").src = smsNew;
						
					gel("login_mailnum_span",'loginTop').style.display = '';						
				}	
				else
				{
					gel("login_mailnum",'loginTop').innerHTML = 0;	

					if (gel("login_mailimg",'loginTop'))
						gel("login_mailimg",'loginTop').src = smsEmpty;
					
					gel("login_mailnum_span",'loginTop').style.display = 'none';											
				}
			}
			catch(e){}
		}
	}
	
	//添加登录回调
	addLoginedFuncs(checkUserLogin);
}

function ajaxLogin(idUser,idPass,idKeep,func)
{
	loginFunction = func;	//登录成功之后执行的function
	
	var inputUser = gel(idUser);
	var user = inputUser.value;
	if (user.length <= 0 )
	{
		if (gel("openLoginErrorMsg") == null)                     //原来的登陆
		{
			alert("请输入您的拍子号或者注册邮箱喔");
		}
		else
		{
			gel("openLoginErrorMsg").style.display = "block";     //弹出框的登陆
			gel("openLoginErrorMsg").innerHTML = "拍子号/邮箱或密码输入有误";
			gel("openLoginErrorMsg").className = "tips";
		}
			
		inputUser.focus();
		return;
	}

	var inputPass = gel(idPass);
	var pass = inputPass.value;
	if (pass.length <= 0 )
	{
		if (gel("openLoginErrorMsg") == null)
		{
			alert("请输入密码喔");                                    //原来的登陆
		}
		else
		{
			gel("openLoginErrorMsg").style.display = "block";       //弹出框的登陆
			gel("openLoginErrorMsg").innerHTML = "拍子号/邮箱或密码输入有误"; 
			gel("openLoginErrorMsg").className = "tips";
		}
			
		inputPass.focus();
		return;
	}
	
	var keep='1';
	if (gel(idKeep).checked)
		keep = '1';
	else
		keep = '0';
	
	var param = 'action=login';
    param += '&user=' + user;
    param += '&password=' + MD5(pass);
    param += '&keeplogin=' + keep;
	param += '&comouterTime=' + keep;
    param += '&userNowTime=' + userNowTime;
	
    SendRequest(loginUrl, param, 'POST', processLogin);	
}

function ajaxLogOut()
{
    var param;
    param = 'action=logout';
    SendRequest(loginUrl, param, 'POST', 
                function(responseText){
                    //alert('退出登录成功，现在将以游客身份访问');
					var url= window.location.href;
//					if(url.indexOf("?")!=-1)
//					{
//						 location.href=url+"&l=noref";
//						 //alert(url+"&l=noref");
//					}
//					else
//					{
//						 location.href =url+"?"+"l=noref";
//						// alert(window.location.href);
//					}
					location.reload();
                });
}

//************************
//get notify start here

function loadJson(url,autoRemove,charset) 
{
	charset    = charset || '';
	autoRemove = autoRemove||false; 
	var b=document.getElementsByTagName("head")[0];
	var c=document.createElement("script");
	c.type="text/javascript";
	c.charset=charset;
	c.src=url;
	if(autoRemove)
	{
		c.id = autoRemove;
	} 	
	var remove=function()
	{
		c.onload=null;
		var h=c.parentNode;
		h.removeChild(c);
		delete c;
	};
	var e=function(h)
	{
		var j=(h?h:window.event).target?(h?h:window.event).target:(h?h:window.event).srcElement;
		if(j.readyState=="loaded"||j.readyState=="complete")
		{
			j.onreadystatechange=null;
			if(autoRemove){
				remove();
			}
		}
	};
	if(navigator.product=="Gecko"&&autoRemove)
	{
		c.onload=remove;
	}
	else
	{
		c.onreadystatechange=e;
	} 
	b.appendChild(c);
}

var g_blinkswitch = 0;
var g_blinktitle = document.title;

function blinkNewMsg(num)
{
	//gel("login_mailimg").style.display = "";
	if (gel("login_mailnum_span"))
	{
		gel("login_mailnum_span").style.display = '';
	}
	
	try
	{
		gel("login_mailnum").innerHTML = num;
	}
	catch(err)
	{
        //TODO 2010.11.11
        try{
            gel("login_mailnum",'loginTop').innerHTML = num;	
        }catch(e){
            
        }
	}
    //newPage
    if(gel('gb_new_login') !== null){
        gbNewLogin.blinkNewMsg(num);
    }
	document.title = g_blinkswitch % 2 ? "[　　　]" + g_blinktitle : "[新消息]" + g_blinktitle;
	g_blinkswitch++;
}

function stopBlinkNewMsg()
{
	if (gel("login_mailnum_span"))
	{
		gel("login_mailnum_span").style.display = 'none';
	}
    //newPage
    if(gel('gb_new_login') !== null){
        gbNewLogin.blinkNewMsg(0);
    }
	
	document.title = g_blinktitle;
	g_blinkswitch = 0;
}

function blink()
{
	var bid = Cookies.get("b");
	if (!bid || bid<=0)
		return;

	var notifyNum = Cookies.get('notifyNum');
	if (!notifyNum)
		notifyNum = 0;
		
	if (notifyNum > 0)
		blinkNewMsg(notifyNum);
	else
		stopBlinkNewMsg();
}

function getNotify()
{	
	var bid = Cookies.get("b");
	if (!bid || bid<=0)
		return;

	//var sendUrl = "http://notify.aipai.com/bus/notify/getNotify.php" ;
	var sendUrl = "http://so.aipai.com/bus/notify/getNotify.php" ;
	
	var metadata = "bid="+bid+"&callback=getNotifySuccess";
	
	//由于跨域，不能直接使用原生的ajax
	//SendRequest(sendUrl, param, 'POST', processNotify);

	//
	loadJson(sendUrl+'?'+metadata);
	
	/*
	//jquery的GET/jsonp的方式可以跨域，不过需要引入jquery库
	$.ajax({
	    type: "GET",		
	    url: sendUrl,
	    dataType: 'jsonp',
	    data: metadata,
	    //jsonp: 'loadSuccess',
	   error: function(msg)
	   {
	   		//alert( "读取失败：" + msg );
	   }
    });
	*/
}

function getNotifySuccess(ret) 
{
	//alert(ret);
	if(ret['code'] == 0)
	{
		if(ret['data'] == null)
		{
			Cookies.clear('notifyNum'); 
			stopBlinkNewMsg();
		} else {
			//cookie notifyNum 现在由服务器设置
			var oldMsg = Cookies.get('notifyNumOld');
			var newMsg = Cookies.get('notifyNum');

			var msg = parseInt(ret['data']['msg']);
			var sysMsg = parseInt(ret['data']['sysMsg']);
			var friendMsg = parseInt(ret['data']['friendMsg']);
			var interMsg = parseInt(ret['data']['interMsg']);
			var groupMsg = parseInt(ret['data']['groupMsg']);

			//var allMsg = msg+sysMsg+friendMsg+userComment+reUserComment;
			
			if (gel("notify_msg"))
			{
				try
				{
					gel("notify_msg").innerHTML = msg;
					gel("notify_sys").innerHTML = sysMsg;
					gel("notify_friend").innerHTML = friendMsg;
					gel("notify_inter").innerHTML = interMsg;
					gel("notify_group").innerHTML = groupMsg;
				}
				catch(e){}
			}
			
			//alert(allMsg);
			if (newMsg > oldMsg)
			{
				playMisc();
			}
			
			Cookies.set('notifyNumOld', newMsg);
		}
	}
	else
	{
		//alert(ret['code']);
	}
}

function playMisc()
{
	var flashvars = {};
	flashvars.autoplay = "0";
    
	var params = {};
	params.allowscriptaccess = "always";
	params.wmode = "opaque";
	params.menu = "false";

	var attributes = {}; 

	swfobject.embedSWF("http://www.aipai.com/app/www/templates/common/swf/newmsg_sound.swf", "head_msgsound_div", "1", "1", "8.0.0", "http://www.aipai.com/app/www/templates/common/expressInstall.swf", flashvars, params, attributes);
}

function startGetNotify()
{
	//getNotify();
	setInterval(getNotify, 300000);
}

function startBlink()
{
	//blink()
	setInterval(blink, 5000);
}

//QQ登录
function gotoQzoneLogin()
{
	var url = "http://www.aipai.com/login.php?action=todirect&refURL="+encodeURIComponent(location.href);
	document.location = url;
}

//弹出登陆窗口(目前只使用一个参数) 新的调用是没有传第二个参数的
function checkLogin(method,func,param1)
{
	var action;
	if(typeof(method) != "undefined")
	{
		action = '='+param1;
	}
	
	if(typeof(param1) != "undefined")
	{
		//如果第二个参数（函数名）为空，则是调用新的优化方法
		if (func == "")
			action = '='+method+'='+param1+'='+"1";
		else
			action = '='+method+'='+param1;
	
	}
	
	var bid = Cookies.get("b");

	if (bid==null || bid.length <= 0)
	{
		var baseLink = window.location.host;
		
		if(baseLink.indexOf('so') != -1)
		{
			$(this).myDialog({type:'page', topPic:'http://www.aipai.com/app/www/templates/common/img/top.gif', tailPic:
			'http://www.aipai.com/app/www/templates/common/img/tail.gif', title:'登录爱拍', width:'396', height:'165', 
			url:'http://so.aipai.com/app/www/templates/indexnew/login.html?'+action,css:'login'});
		}
		else
		{
			$(this).myDialog({type:'page', topPic:'http://www.aipai.com/app/www/templates/common/img/top.gif', tailPic:
			'http://www.aipai.com/app/www/templates/common/img/tail.gif', title:'登录爱拍', width:'396', height:'165', 
			url:'http://www.aipai.com/app/www/templates/indexnew/login.html?'+action,css:'login'});
		}
	}
	else
	{
		//如果是新的优化，则是没有传直接传函数过来，所以要通过eval去执行
		if (func == "")
			var funcs = eval(method)(param1);
		else
		    func(param1);
	}
}

//new checkLogin
var cl_method;
var cl_param;
var cl_html = '<div class="login_con"><div class="login_w"><label for="pop_login_user">拍子号/邮箱：</label><input type="text" id="pop_login_user" maxlength="50" name="pop_login_user" /></div><div class="login_w"><label for="pop_login_pass">密  码：</label><input type="password" id="pop_login_pass" maxlength="32" name="pop_login_pass" /><input id="pop_login_keep" type="hidden" /></div><div class="login_tips" id="login_tips" style="display:none;">拍子号/邮箱或密码输入有误</div><div class="login_action"><button class="login_btn">登录</button><div class="login_reg"><a id="pop_fastreg" href="#">3秒极速注册</a><div onclick="toOpenQzoneLogin();return false;" class="oauth_w"><span class="oauth_btn"></span><div class="oauth_list"><span></span><ul><li class="oauth_lt">使用以下账号登录</li><li class="oauth_qq"><a onclick="toOpenQzoneLogin();return false;" href="#">QQ登录</a></li></ul></div></div></div></div></div><div class="login_bg"></div><span class="login_close" title="关闭">关闭</span>';
var loginPop;
function checkloginNew(method,param,type){

    var cls_fresh = '';
    if(type == 'fresh'){
        var cls_fresh = 'pop_fresh';
    }
	
	var for_cross = false;
    if(type == 'cross'){
        var for_cross = true;
    }
	
	var bid = Cookies.get("b");
	if (bid==null || bid.length <= 0)
	{
        try{
            getFlash('player').pausePlayer();
        }catch(e){}
        //针对铁粉播放页面临时处理 13.1.10 
        try{
            if(typeof fans !== 'undefined'){
                fans.cmtGg.hide()
            }
        }catch(e){}
        $(this).pop_dialog({
            type : 'content',
            position : 'center',
            width : 314,
            height : 196,
            content : '<div class="pop_login '+cls_fresh+'">'+cl_html+'</div>',
            id : 'pop_login',
            afterShow : function(){
                var _pl = $('#pop_login');
                $('.login_hz').hover(function(){
                    $(this).addClass('show_hzlist');
                },function(){
                    $(this).removeClass('show_hzlist');
                });

                $('#pop_login_user',_pl).focus();
                $('.login_close',_pl).click(function(){
                    $(this).pop_close('pop_login');
                    try{
                        getFlash('player').startPlay();
                    }catch(e){}
                });
                $('.login_btn',_pl).click(function(){
                    var user = $('#pop_login_user',_pl).val();
                    var pass = $('#pop_login_pass',_pl).val();
                    ajaxLoginNew(user,pass,commonLoginedNew,for_cross);
                });
                $('#pop_login_pass',_pl).keypress(function(e){
                    if(e.which == 13){
                        var user = $('#pop_login_user',_pl).val();
                        var pass = $('#pop_login_pass',_pl).val();
                        ajaxLoginNew(user,pass,commonLoginedNew,for_cross);
                        return false;
                    }
               });
               $.getScript('http://www.aipai.com/app/www/templates/signup/js_2011/pop_signup2.js?20120305',function(){});
               $(document.createElement("link")).attr({ "rel": "stylesheet", "type": "text/css", "href": 'http://www.aipai.com/app/www/templates/signup/img_2011/style.css?20120305v2' }).appendTo("head");
               $('#pop_fastreg',_pl).click(function(){
                   var email = ''; 
                   var has_reg = $('#pop_login_user').attr('has_reg');
                   if(has_reg == '0'){
                       email = $.trim($('#pop_login_user').val());
                   }
                        
                   var html_pop_signup = '<div id="html_pop_signup"> <!--=S pop_signup --> <div class="pop_signup" id="pop_signup"> <div id="pop_signup_loading" class="pop_signup_loading hidden"> <img src="http://www.aipai.com/app/www/templates/common/img/loading.gif" alt="" width="32" height="32" /> </div> <!--==S su_form --> <form id="signup_form" name="form" method="post" onSubmit="return postCheck()"> <input name="step" value="2" type="hidden" style="display:none"/> <div class="su_form"> <div class="suf_w" id="suf_email"> <label class="suf_wl" for="email">邮箱</label> <div class="suf_wr"> <input type="text" name="email" id="email" class="si1 sie" tabindex="10" value="如：qq号@qq.com" /> </div> </div> <div class="suf_w" id="suf_password"> <label class="suf_wl" for="password">密码</label> <div class="suf_wr"> <input type="password" name="password" id="password" tabindex="11" class="si1" value="" /> </div> </div> <div class="suf_w" id="suf_password2"> <label class="suf_wl" for="password2">确认密码</label> <div class="suf_wr"> <input type="password" name="password2" id="password2" class="si1" tabindex="12" value="" /> </div> </div> <div class="suf_w" id="suf_nick"> <label class="suf_wl" for="nick">昵称</label> <div class="suf_wr"> <input type="text" name="nickname" id="nick" class="si1" tabindex="13" value="" /> </div> </div> <div class="show_more hidden"> <div class="suf_w" id="suf_auth_code"> <label class="suf_wl" for="auth_code">验证码</label> <div class="suf_wr"> <input type="text" name="auth_code" id="auth_code" class="si2" tabindex="17" value="" /><div class="code_img"><a href="javascript:getAuthimg();"><img src="http://www.aipai.com/app/www/common/captcha.php" title="换一个" width="120" height="42" id="auth_img" /></a></div></div> </div> </div> <div class="suf_submitw"> <input type="hidden" name="sex" value="1" /> <input type="submit" class="suf_submit" value=" " /> <div class="suf_swr"> <a onclick="backLogin();return false;" href="###">返回登录</a> <!--<a class="login_qq" href="###">QQ登录</a>--> </div> </div> </div> </form> <!--==E su_form --> <div id="pop_signup_suc" class="pop_signup_suc hidden"> <h5><span></span>，欢迎加入爱拍大家庭!</h5> <p>你的拍子号是：<em></em></p> <p class="red">无广告“清爽”特权已成功开启，以后别忘了登录哦！</p> <div class="btns"> <span class="btn_complete"></span> </div> <div class="sl_mod">爱拍试炼场：　<a href="http://sl.aipai.com/?tab=novoice" target="_blank">做任务升级>></a>　<a href="http://sl.aipai.com/" target="_blank">玩游戏赚大钱>></a></div> </div> <div id="pop_signup_fail" class="pop_signup_fail hidden">网络出问题了，<a class="signup_back" href="#">请点这里返回</a>重试一次！</div> </div> <!--=E pop_signup --> </div>';
                    $(this).pop_dialog({
                        type : 'content',
                        position : 'center',
                        width : 314,
                        height : 241,
                        content : '<div class="pop_fastreg"><div class="'+cls_fresh+'"><div class="fastreg_con">'+html_pop_signup+'</div><div class="fastreg_bg"><div class="fastreg_bgt"></div><div class="fastreg_bgc"></div><div class="fastreg_bgb"></div></div><span class="fastreg_close" title="关闭">关闭</span></div></div>',
                        id : 'pop_fastreg',
                        afterShow : function(){
                            var _pl = $('#pop_fastreg');
                            $('.fastreg_close',_pl).click(function(){
                                $(this).pop_close('pop_fastreg');
                                try{
                                    getFlash('player').startPlay();
                                }catch(e){}
                            });
                            regLoad(email);
                        }
                    });
                    return false;
               });
               //合作登录
               $('.oauth_w',_pl).hover(function(){
                   $(this).addClass('oauth_w2');
               },function(){
                   $(this).removeClass('oauth_w2');
               });
            }
        });
        cl_method = method;
        cl_param = param;
	}
	else
	{
        method(param);
	}
}
var showSucReging = false;
function showSucReg(type){
    var bid = Cookies.get("b") || 0;
    /*if(bid != 0)
    {
        return;
    }*/
    //判断登录类别
    var otype= 'qq';ostr = 'QQ';
    if(type == 'rr'){
        otype = 'rr';
        ostr = '人人网';
    }

    var ssr_html = '<div class="oauth_suc_con"><div class="osc_main"><p>首次'+ostr+'登录成功，请完善安全邮箱！</p><div class="osc_email"><input class="osc_in" type="text" value="如：qq号@qq.com" /></div><div class="osc_btn"><a target="_blank" href="http://www.aipai.com/signup.php?action=thirdSuc&type='+otype+'">完成注册</a></div></div><div class="osc_ft">老用户请去<a target="_blank" href="http://www.aipai.com/service.php">绑定中心</a>绑定拍子号。</div></div><div class="login_bg"></div><span class="login_close" title="关闭">关闭</span>';
    var showDialog = function(){
        setTimeout(function(){
            try{
                getFlash("player").pausePlayer();
            }catch(e){}
        },2000);
        $(this).pop_dialog({
            type : 'content',
            position : 'center',
            width : 314,
            height : 196,
            content : '<div class="pop_login pop_login_oauth">'+ssr_html+'</div>',
            id : 'pop_login',
            afterShow : function(){
                var _pl = $('#pop_login');
                $('.osc_in',_pl).one('focus',function(){
                    if($(this).hasClass('osc_in')){
                        $(this).removeClass('osc_in').val('');
                    }
                });
                $('.osc_btn a',_pl).click(function(){
                    if(showSucReging == true){
                        return false;
                    }
                    showSucReging = true;
                    var email = $.trim($('.osc_email input').val());
                    if(email == '' || email == '如：qq号@qq.com'){
						Cookies.clear('third_suc_service');
                        location.href = 'http://www.aipai.com/signup.php?action=thirdSuc&type='+otype;
                        $(this).pop_close('pop_login');
                    }
                    if(email.length > 0){
                        if(!emailValidate(email)){
                            oauthTips('格式错误!示例：me@163.com');
                        }else if(emailValidate2(email)){
                            oauthTips('该邮箱已被注册');
                        }else{
                            var url = 'http://www.aipai.com/bus/urs/usercheck.php';
                            var metadata = '{"email":"'+email+'"}';
                            metadata = encodeURI('&callback=checkEmailSucoa&metadata='+metadata); 
                            $.ajax({
                                type: "GET",		
                                url: url,
                                dataType: 'jsonp',
                                success: checkEmailSucoa,
                                data: metadata
                            });	
                        }
                        return false;
                    }
                });
            }
        });
    }
    if(typeof(pop_dialog) == 'undefined'){
        $.getScript('http://www.aipai.com/app/www/templates/common/js/pop_dialog.js',showDialog);
    }else{
        showDialog();
    }
}
var oauthTips = function(str){
    var tips = str;
    var html = '<div class="osce_tips">'+tips+'</div>';
    $('.osc_email').addClass('osc_cur').append(html);
    setTimeout(function(){
        showSucReging = false;
        $('.osce_tips').remove();
    },2000);
}
//检测Email回调fun
function checkEmailSucoa(ret){
	
	var bid    = Cookies.get("tx_bid");
	var type    = Cookies.get("tx_type");

	if(type == 1)
	{
		var openid = Cookies.get("rr_id");
		var key    = Cookies.get("rr_key");
	}
	else
	{
		var openid = Cookies.get("tx_id");
		var key    = Cookies.get("tx_key");
	}

    showSucReging = false;
    if(ret && ret['code'] == 0){
         var url = 'http://www.aipai.com/apps/updateEmail.php';
        var metadata = '{"email":"'+ret['email']['email']+'","bid":"'+bid+'","key":"'+key+'","type":"'+type+'","openid":"'+openid+'"}';
        metadata = encodeURI('&callback=updateEmailSucoa&metadata='+metadata); 
        $.ajax({
            type: "GET",		
            url: url,
            dataType: 'jsonp',
            success: updateEmailSucoa,
            data: metadata
        });	
    } else {
        if(ret.code == '6002')
        {
            oauthTips('已存在相同邮箱');
        }
        else
        {
            oauthTips('QQ邮箱：QQ号码@qq.com');
        }
    }
}
//修改email回调fun
function updateEmailSucoa(ret){
	 if(ret && ret['code'] == 0){
		 if(ret['openid']){
			
			 CookiesSetOneDay('third_suc_service', 1);
               
			 if(ret['type'] == 1)
			 {
				 location.href="http://www.aipai.com/signup.php?action=thirdSuc&type=rr";
			 }
			 else
			 {
				 location.href="http://www.aipai.com/signup.php?action=thirdSuc&type=qq";
			 }
			
		 }
		 else
		 {
			 $(this).pop_close('pop_login');
		     window.location.reload();
		 }
	}
	else{
		 $(this).pop_close('pop_login');
	}
}
function emailValidate(emailStr) {
    if(emailStr.match(/^[a-z0-9][a-z0-9_\.]*@([0-9a-z][0-9a-z-]+\.)+[a-z]{2,3}$/)){
        return true;
    }
    return false;
}
function emailValidate2(emailStr) {
    if(emailStr.match(/@aipai.com$/)){
        return true;
    }
    return false;
}
function ajaxLoginNew(user,pass,func,cross){
	loginPop = func;	//登录成功之后执行的function
	if (user.length <= 0 || pass.length <= 0){
        $('#login_tips').html('拍子号/邮箱或密码输入有误').show();
        setTimeout(function(){
            $('#login_tips').fadeOut();   
        },500);
		return;
	}
	var keep='1';
	var param = 'action=login';
    param += '&user=' + user;
    param += '&password=' + MD5(pass);
    param += '&keeplogin=' + keep;
	param += '&comouterTime=' + keep;
	param += '&cross=' + cross;
	param += '&userNowTime=' + userNowTime;
	
    SendRequest(loginUrl, param, 'POST', processLoginNew);	
}
function processLoginNew(responseText){
	var ret = eval('(' + responseText + ')');
	if(ret['code'] == 0)
	{
        if(ret['expChange'] != '')
        {
            //经验实体化
            APFL.pop.exp('登录成功', ret['expChange']);
        }

		if (loginPop!=null)
		{
			loginPop();
		}
		doLoginedFuncs();
	} else if (ret['code'] == 25){
        //转到login.php,提示输入验证码
        var url = location.href;
        location.href = 'http://www.aipai.com/login.php?code=1&ref='+url;
	} else {
        $('#login_tips').html(ret['msg']).show();
        setTimeout(function(){
            $('#login_tips').fadeOut();   
        },500);
        $('#pop_login_user').attr('has_reg',ret['hasReg']);
	}
}
function commonLoginedNew()
{	
	doLoginedFuncs();
    $(this).pop_close('pop_login');
    try{
        getFlash('player').startPlay();
    }catch(e){}
    cl_method(cl_param);
}
function signup(){
	var url = window.location.href.split("#")[0];
	var str = url.indexOf("member");
	if(str != -1){
		url = "http://www.aipai.com/member.php";	
	}
	$(this).pop_close_all();
    var urlArray = url.split(".");
    var cuf = urlArray[0]+"."+urlArray[1]+"."+urlArray[2]+"&urlType="+encodeURIComponent(urlArray[3]);
	location.href="http://www.aipai.com/signup.php?frompage="+cuf;
}


var Cookies = {};
/**//**
 * 设置Cookies
 */
Cookies.set = function(name, value){
     var argv = arguments;
     var argc = arguments.length;
     var expires = (argc > 2) ? argv[2] : null;
     var path = (argc > 3) ? argv[3] : '/';
     var domain = (argc > 4) ? argv[4] : null;
     var secure = (argc > 5) ? argv[5] : false;
     //del
     var delNames = ['playNum','loginLog','tx_url','PLAY_AD_CLICK','FROM_VIDEO_VISIT','FROM_AIPAI_VISIT','FROM_LIMIT_VISIT','IsClose',
                    'isView','isLoginView','viewNum','markGame','end_open_ds','jsTestTemp'];   
     for(var i=0,dnl = delNames.length;i< dnl;i++){
         if(Cookies.get(name) && name == delNames[i]){
            var expdate = new Date(); 
            expdate.setTime(expdate.getTime() - (86400 * 1000 * 1)); 
            document.cookie = name + "= ; expires=" + expdate.toGMTString() + "; path=/; domain=aipai.com"+
               ((secure == true) ? "; secure" : "");
         }
     }
     //End del
     document.cookie = name + "=" + escape (value) +
       ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
       ((path == null) ? "" : ("; path=" + path)) +
       ((domain == null) ? "" : ("; domain=" + domain)) +
       ((secure == true) ? "; secure" : "");
};
/**//**
 * 读取Cookies
 */
Cookies.get = function(name,bUnescape){
	
	var bUnescape = (typeof(bUnescape)=="undefined")?true:false;
	
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    while(i < clen){
        j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return Cookies.getCookieVal(j,bUnescape);
        i = document.cookie.indexOf(" ", i) + 1;
        if(i == 0)
            break;
    }
    return null;
};
/**//**
 * 清除Cookies
 */
Cookies.clear = function(name) {
  if(Cookies.get(name)){
    var expdate = new Date(); 
    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1)); 
    Cookies.set(name, "", expdate,'/','aipai.com'); 
    Cookies.set(name, "", expdate,'/','www.aipai.com'); 
    Cookies.set(name, "", expdate); 
  }
};

Cookies.getCookieVal = function(offset,bUnescape){
   var endstr = document.cookie.indexOf(";", offset);
   if(endstr == -1){
       endstr = document.cookie.length;
   }
   
   if (bUnescape)
   	   return unescape(document.cookie.substring(offset, endstr));
   else 
   	   return document.cookie.substring(offset, endstr);
};
CookiesSetOneDay = function(key,val){
	var date= new Date();			
	var nowTime = date.getTime();
	var expdate = new Date();
	var exptime = nowTime - (date.getHours()*3600+date.getMinutes()*60+date.getSeconds())*1000 + 86400*1000;
	expdate.setTime(exptime);
    if(val){
        Cookies.set(key, val, expdate, '/', 'aipai.com');	
    }else{
        var v = Cookies.get(key) || 0;
        v = parseInt(v);
        Cookies.set(key, v+1, expdate, '/', 'aipai.com');	
    }
}


 

 

//检测客户端的COOKIE是否禁用了
//function checkCookies()
//{
//	var result=false; 
//	if(navigator.cookiesEnabled)  return true;   
//	
//	document.cookie = "testcookie=yes;";   
//	
//	var cookieSet = document.cookie;   
//	
//	if (cookieSet.indexOf("testcookie=yes") > -1)  result=true;   
//	
//	document.cookie = "";   
//	
//	return result;   	
//}
//
//function checkCookiesResult()
//{
//	var result = checkCookies();
//	if (result == false)
//	{
//		alert('对不起，您的浏览器的Cookie功能被禁用，请开启');
//	}
//}


//防止window.onload多次调用

/*
if (window.attachEvent)
{
	window.attachEvent('onload',startGetNotify);
	window.attachEvent('onload',startBlink);
}
else if(window.addEventListener)
{
	window.addEventListener('load',startGetNotify,false);
	window.addEventListener('load',startBlink,false);
}
*/

/*
window.onload =function() {
	checkUserLogin();
}
*/

function checkAipai()
{
	return true;
}

//先执行登陆检查
//checkCookiesResult();
checkUserLogin();

startGetNotify();
startBlink();



//更新登录时间
(function updateLoginTime(){
    var bid = Cookies.get("b") || 0;
    if (bid > 0){
        var loginLog = Cookies.get('loginLog');
        if(loginLog != bid){
            $.getScript('http://www.aipai.com/app/www/apps/updateLasttime.php?bid='+bid);
            CookiesSetOneDay('loginLog',bid);
        }
    }
})();

//QQ登录新开窗口
function toOpenQzoneLogin(toSync)
{

	toOauthLogin('qq','1',toSync);
} 

//QQ登录不新开窗口
function toQzoneLogin()
{
	toOauthLogin('qq');
} 

if(window.location.href.match(/oauth_renren/))
{
   setTimeout(function(){showSucReg('rr');},1000);
}
else if(window.location.href.match(/oauth_email/))
{
   setTimeout(showSucReg,1000);
}
else
{
}
//人人登录新开窗口
function toOpenRenrenLogin(toSync)
{
	toOauthLogin('rr','1',toSync);
}

//人人登录不新开窗口
function toRenrenLogin()
{
	toOauthLogin('rr');
} 



//外站登录
function toOauthLogin(type,newWin,toSync){
    var types = ['qq','rr'];
    if($.inArray(type,types) == -1){
        return;
    }
    var loginType = 'login';
    if(newWin == '1'){
        loginType = 'openLogin';
    }
    oauthFun[type][loginType](toSync);
}
var oauthFun = {
    qq :{
        //QQ登录不新开窗口
        login : function(){
            Cookies.clear('tx_url');
            window.location.href="app/www/login.php?action=todirect&refURL=index";
        },
        //QQ登录新开窗口
        openLogin : function(toSync){
            var url = location.href; 
			//设置一个父窗的url cookie 返回路径
            CookiesSetOneDay('parent_url', url);

            if(url.substring(7,16) != 'www.aipai')
            {
                CookiesSetOneDay('tx_url',url);
                window.location.href="app/www/login.php?action=todirect";
            }
            else
            {
                //如果是从服务中心的验证登录的，则加上一个cookie以便不用去填写邮箱
                if(toSync == '1')
                {
                    CookiesSetOneDay('tx_sync_service', 1);
                }
                else
                {
                    Cookies.clear('tx_sync_service');   
                }

                Cookies.clear('tx_url');
                var A=window.open("app/www/login.php?action=todirect","TencentLogin","width=450,height=320,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
            }
        }
    },
    rr : {
        //人人登录不新开窗口
        login : function(){
            Cookies.clear('rr_url');
            window.location.href="https://graph.renren.com/oauth/authorize?client_id=383894e2d79a45ebbca096a71df8f115&response_type=code&redirect_uri=http%3A%2F%2Fwww.aipai.com%2Flogin.php%3Faction%3Dthirdlogin%26thirdType%3D1&display=page&scope=publish_blog publish_feed";
        },
        //人人登录新开窗口
        openLogin : function(toSync){
            var url = location.href; 
            if(url.substring(7,16) != 'www.aipai')
            {
                CookiesSetOneDay('rr_url',url);
                window.location.href="https://graph.renren.com/oauth/authorize?client_id=383894e2d79a45ebbca096a71df8f115&response_type=code&redirect_uri=http%3A%2F%2Fwww.aipai.com%2Flogin.php%3Faction%3Dthirdlogin%26thirdType%3D1&display=page&scope=publish_blog publish_feed";
            }
            else
            {
                //如果是从服务中心的验证登录的，则加上一个cookie以便不用去填写邮箱
                if(toSync == '1')
                {
                    CookiesSetOneDay('rr_sync_service', 1);
                }
                else
                {
                    Cookies.clear('rr_sync_service');   
                }
                //设置一个父窗的url cookie
                CookiesSetOneDay('parent_url', url);
                Cookies.clear('rr_url');
                var A=window.open("https://graph.renren.com/oauth/authorize?client_id=383894e2d79a45ebbca096a71df8f115&response_type=code&redirect_uri=http%3A%2F%2Fwww.aipai.com%2Flogin.php%3Faction%3Dthirdlogin%26thirdType%3D1&display=page&scope=publish_blog publish_feed","TencentLogin","width=450,height=320,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
            }
        }

        
    }
}
//经验实体化
var APFL = window.APFL || {};
APFL.pop = {
    expIsshow : 0, 
    expQueue : [],
    expLoadCss : function(){
        if(!$('#pop__exp_style').get(0)){
            $('body').append('<div id="pop__exp_style" style="display:none;"></div>');
        }
        var w = $('#pop__exp_style').width();
        if(w !== 1){
            $('body').append('<style type="text/css">#pop__exp{width:173px;height:42px;padding:30px 0 0 18px;position:fixed;left:50%;margin-left:-36px;font-size:14px;font-weight:700;color:#ffe825;background:url(http://www.aipai.com/app/www/templates/common/img/global/exp.png) no-repeat 0 22px;_position:absolute;z-index:10000;}#pop__exp span{color:#ffffff;margin-right:10px;}#pop__exp em{font-family:arial;font-weight:700;font-size:18px;}#pop__exp div{width:82px;height:78px;overflow:hidden;position:absolute;top:0;right:0;}</style>');
        }
        $('#pop__exp_style').remove();
        this.expLoadCss = function(){};
    },
    exp : function(txt, num, name){
        num = parseInt(num, 10);
		var name = name || '经验';
        var msg = name+'<em>+'+num+'</em>';
        if(name !== 'no'){
            if(isNaN(num) || num <= 0){
                return;
            }
        }
        if(name === 'no'){
            msg = '';
        }
        var _pop = this;
        _pop.expLoadCss();
        if(_pop.expIsshow === 0){
            _pop.expIsshow = 1;
            var _win = $(window),
                height = 72,    //提示pop高度
                range = 80,     //显示范围
                winHeight = _win.height(),          //窗口高度
                scrBottom = winHeight,              //起点
                scrCenter = (winHeight - height)/2, //显示点
                scrTop = -height;                   //消失点
            if(winHeight > range){
                scrTop = (winHeight - range)/2 + scrTop;
                scrBottom = (winHeight + range)/2;
            }
            if($.browser.msie && $.browser.version == '6.0'){
                //IE6
                var winScrtop = _win.scrollTop(); 
                scrTop = winScrtop + scrTop;
                scrCenter = winScrtop + scrCenter;
                scrBottom = winScrtop + scrBottom;
            }
            var style = 'top:'+scrBottom+'px;',
                html = '<div id="pop__exp" style="'+style+'"><span>'+txt+'</span>'+msg+'<div class="hidden"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="82" height="78" id="main"><param name="movie" value="http://www.aipai.com/app/www/templates/common/img/global/exp.swf"/><param name="quality" value="high" /><param name="wmode" value="transparent" /><param name="bgcolor" value="#000000" /><object type="application/x-shockwave-flash" data="http://www.aipai.com/app/www/templates/common/img/global/exp.swf" width="82" height="78"><param name="quality" value="high" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="bgcolor" value="#000000" /></object></object></div></div>';
            $('body').append(html);
            $('#pop__exp').css({
                'opacity' : 0
            }).animate({
                top : scrCenter+'px', 
                'opacity' : 1
            }, 'fast', 'swing', function(){
                var _t = $(this);
                _t.get(0).style.filter = '';
                _t.find('div').show();
                setTimeout(function(){
                    _t.find('div').remove();
                    _t.animate({
                        top : scrTop+'px', 
                        'opacity' : 0
                    }, 'fast', 'swing', function(){
                        _t.remove();
                        _pop.expIsshow = 0;
                        _pop.expExeQueue(); //执行队列
                    });
                }, 2500);
            });
        }else{
            _pop.expQueue.push([txt, num, name]);
        }
    },
    expExeQueue : function(){
        var _pop = this;
        if(_pop.expQueue.length > 0){
            var obj = _pop.expQueue.shift();
            _pop.exp(obj[0], obj[1], obj[2]);
        }
    }
};


function getActionToken()
{
    return MD5(Cookies.get('b') + Cookies.get('at') + Cookies.get('t'));
}

function afterLogin(){};
