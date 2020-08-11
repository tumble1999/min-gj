// ==UserScript==
// @name MinGJ
// @description  Useless Kernel
// @author       Tumble
// @version      0.0.1.1
// @run-at       document-start
// @match      *://*/*
// ==/UserScript==
//! /boot

class device{constructor(t,c){this.write=c||function(t){},this.read=t||function(){}}}
class blockDevice extends device{constructor(e){super((function(e=0,t="Uint8"){if(blockDevice.types.includes(t))return this.view["get"+t](e)}),(function(e,t=0,i="Uint8"){blockDevice.types.includes(i)&&this.view["set"+i](t,e)})),this.data=new ArrayBuffer(e),this.view=new DataView(this.data)}getBlockCount(e="Uint8"){if(!blockDevice.types.includes(e))return NaN;this.data.byteLength,blockDevice.typeSizes[blockDevice.typeSizes.indexOf(e)]}readArray(e,t,i="Uint8"){if(!blockDevice.types.includes(i))return[NaN];t=t||this.getBlockCount(i);var n=[];for(let i=e;i<e+t;i++)n.push(this.read(i));return new globalThis[i+"Array"](n)}writeArray(e,t=0,i=e.constructor.name.replace("Array","")){if(blockDevice.types.includes(i))for(let n=t;n<t+e.length;n++)this.write(e,n,i)}}blockDevice.types=["Int8","Uint8","Uint8Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64","BigInt64","BigUint64"],blockDevice.typeSizes=[1,1,1,2,2,4,4,4,8,8,8];
class kernel{constructor(t){var e=this,n=new Array,s=65;for(n.push(32);s<=90;)n.push(s),s++;for(s=160;s<=165;)n.push(s),s++;for(s=169;s<=173;)n.push(s),s++;for(s=186;s<=193;)n.push(s),s++;for(s=219;s<=223;)n.push(s),s++;n.push(231),this.fs=t,this.env={cd:"/",path:["/bin"],hostname:this.fs.etc.hostname},this.buffer=new String,this.fs.dev.stdout=new device(null,console.log),this.fs.dev.stderr=new device(null,console.error),window.document.body.addEventListener("keyup",(function(t){"Backspace"==t.key&&e.buffer.length>0?e.buffer=e.buffer.substring(0,e.buffer.length-1):"Enter"==t.key?e.buffer+="\n":n.includes(t.keyCode)&&(e.buffer+=t.key)})),this.fs.dev.stdin=new device((function(){return new Promise((function t(n){var s=new String;"\n"==e.buffer[e.buffer.length-1]?(s=e.buffer,e.buffer=new String,n(s)):setTimeout((function(){t(n)}),400)}))}),null),this.exec("/bin/init")}mount(t,e){var n=this.getAbsolutePath(e),s=this.basename(n);n=this.joinPath(n,".."),this.getObj(n)[s]=t}umount(t){var e=this.getAbsolutePath(t),n=this.basename(e);e=this.joinPath(e,".."),delete this.getObj(e)[n]}getObj(t,e){var n=t.split("/").filter(t=>""!=t),s=[],i=e||this.fs;for(var r of n)"."!=r&&(".."!=r?(s.push(i),i=i[r]):r=s.pop());return i}getAbsolutePath(t){return"/"!=!t[0]&&(t=this.joinPath(this.env.cd,t)),t}joinPath(t=".",e="."){var n="/"==t[0]||"/"==e[0]?"/":"",s=[],i=t.split("/").filter(t=>""!=t),r=e.split("/").filter(t=>""!=t);function o(t){".."==t&&s.pop(),".."!=t&&"."!=t&&s.push(t)}if("/"!=e[0])for(const t of i)o(t);for(const t of r)o(t);return n+s.join("/")}pathExist(t){var e=t.split("/").filter(t=>""!=t),n=this.fs;for(const t of e){if(void 0===n[t])return!1;n=n[t]}return!0}exec(t,e){var n=this.getObj(t),s=new Array,i=new Object,r=new Object,o=-1;return e instanceof Array||(e=s),e.splice(0,0,t),n instanceof Function&&(Object.assign(i,this.fs.dev.stdout),Object.assign(r,this.fs.dev.stderr),o=3==n.length?n(e.length,e,this):2==n.length?n(e.length,e):n(),Object.assign(this.fs.dev.stdout,i),Object.assign(this.fs.dev.stderr,r)),o}basename(t){return t.split("/").pop()}write(t,e){var n=this.getObj(this.joinPath(t,"..")),s=this.basename(t),i=n[s];"string"==typeof i||i instanceof String?n[s]+=e:i instanceof device?i.write(e):void 0===i&&(n[s]=e)}read(t){var e=this.getObj(t);return e instanceof device?e.read():e}print(...t){var e=new String;return t.forEach((function(t){e+=t})),this.write("/dev/stdout",e)}gendevname(t){for(var e=t.constructor.name,n=1;this.fs.dev[e+n]!=t&&this.fs.dev[e+n];)n++;e+=n}mknod(t,e,n,s){["b","c"].includes(e)||this.print("mknod: "+e+": invalid device type");var i,r=this.getObj(this.joinPath(t,"..")),o=this.basename(t);"b"==e&&(i=new blockDevice),"c"==e&&(i=null),r[o]=i}}
//! /lib

/*!
 * Platform.js
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
(function(){"use strict";var e={function:!0,object:!0},t=e[typeof window]&&window||this,i=e[typeof exports]&&exports,r=e[typeof module]&&module&&!module.nodeType&&module,n=i&&r&&"object"==typeof global&&global;!n||n.global!==n&&n.window!==n&&n.self!==n||(t=n);var o=Math.pow(2,53)-1,a=/\bOpera/,l=Object.prototype,s=l.hasOwnProperty,b=l.toString;function p(e){return(e=String(e)).charAt(0).toUpperCase()+e.slice(1)}function c(e){return e=x(e),/^(?:webOS|i(?:OS|P))/.test(e)?e:p(e)}function d(e,t){for(var i in e)s.call(e,i)&&t(e[i],i,e)}function u(e){return null==e?p(e):b.call(e).slice(8,-1)}function f(e){return String(e).replace(/([ -])(?!$)/g,"$1?")}function S(e,t){var i=null;return function(e,t){var i=-1,r=e?e.length:0;if("number"==typeof r&&r>-1&&r<=o)for(;++i<r;)t(e[i],i,e);else d(e,t)}(e,(function(r,n){i=t(i,r,n,e)})),i}function x(e){return String(e).replace(/^ +| +$/g,"")}var h=function e(i){var r=t,n=i&&"object"==typeof i&&"String"!=u(i);n&&(r=i,i=null);var o=r.navigator||{},l=o.userAgent||"";i||(i=l);var s,p,h,m,g,O=n?!!o.likeChrome:/\bChrome\b/.test(i)&&!/internal|\n/i.test(b.toString()),y=n?"Object":"ScriptBridgingProxyObject",M=n?"Object":"Environment",E=n&&r.java?"JavaPackage":u(r.java),w=n?"Object":"RuntimeObject",v=/\bJava/.test(E)&&r.java,P=v&&u(r.environment)==M,C=v?"a":"α",B=v?"b":"β",W=r.document||{},k=r.operamini||r.opera,R=a.test(R=n&&k?k["[[Class]]"]:u(k))?R:k=null,A=i,I=[],F=null,T=i==l,G=T&&k&&"function"==typeof k.version&&k.version(),$=S([{label:"EdgeHTML",pattern:"Edge"},"Trident",{label:"WebKit",pattern:"AppleWebKit"},"iCab","Presto","NetFront","Tasman","KHTML","Gecko"],(function(e,t){return e||RegExp("\\b"+(t.pattern||f(t))+"\\b","i").exec(i)&&(t.label||t)})),j=function(e){return S(e,(function(e,t){return e||RegExp("\\b"+(t.pattern||f(t))+"\\b","i").exec(i)&&(t.label||t)}))}(["Adobe AIR","Arora","Avant Browser","Breach","Camino","Electron","Epiphany","Fennec","Flock","Galeon","GreenBrowser","iCab","Iceweasel","K-Meleon","Konqueror","Lunascape","Maxthon",{label:"Microsoft Edge",pattern:"(?:Edge|Edg|EdgA|EdgiOS)"},"Midori","Nook Browser","PaleMoon","PhantomJS","Raven","Rekonq","RockMelt",{label:"Samsung Internet",pattern:"SamsungBrowser"},"SeaMonkey",{label:"Silk",pattern:"(?:Cloud9|Silk-Accelerated)"},"Sleipnir","SlimBrowser",{label:"SRWare Iron",pattern:"Iron"},"Sunrise","Swiftfox","Vivaldi","Waterfox","WebPositive",{label:"Yandex Browser",pattern:"YaBrowser"},{label:"UC Browser",pattern:"UCBrowser"},"Opera Mini",{label:"Opera Mini",pattern:"OPiOS"},"Opera",{label:"Opera",pattern:"OPR"},"Chromium","Chrome",{label:"Chrome",pattern:"(?:HeadlessChrome)"},{label:"Chrome Mobile",pattern:"(?:CriOS|CrMo)"},{label:"Firefox",pattern:"(?:Firefox|Minefield)"},{label:"Firefox for iOS",pattern:"FxiOS"},{label:"IE",pattern:"IEMobile"},{label:"IE",pattern:"MSIE"},"Safari"]),X=V([{label:"BlackBerry",pattern:"BB10"},"BlackBerry",{label:"Galaxy S",pattern:"GT-I9000"},{label:"Galaxy S2",pattern:"GT-I9100"},{label:"Galaxy S3",pattern:"GT-I9300"},{label:"Galaxy S4",pattern:"GT-I9500"},{label:"Galaxy S5",pattern:"SM-G900"},{label:"Galaxy S6",pattern:"SM-G920"},{label:"Galaxy S6 Edge",pattern:"SM-G925"},{label:"Galaxy S7",pattern:"SM-G930"},{label:"Galaxy S7 Edge",pattern:"SM-G935"},"Google TV","Lumia","iPad","iPod","iPhone","Kindle",{label:"Kindle Fire",pattern:"(?:Cloud9|Silk-Accelerated)"},"Nexus","Nook","PlayBook","PlayStation Vita","PlayStation","TouchPad","Transformer",{label:"Wii U",pattern:"WiiU"},"Wii","Xbox One",{label:"Xbox 360",pattern:"Xbox"},"Xoom"]),K=function(e){return S(e,(function(e,t,r){return e||(t[X]||t[/^[a-z]+(?: +[a-z]+\b)*/i.exec(X)]||RegExp("\\b"+f(r)+"(?:\\b|\\w*\\d)","i").exec(i))&&r}))}({Apple:{iPad:1,iPhone:1,iPod:1},Alcatel:{},Archos:{},Amazon:{Kindle:1,"Kindle Fire":1},Asus:{Transformer:1},"Barnes & Noble":{Nook:1},BlackBerry:{PlayBook:1},Google:{"Google TV":1,Nexus:1},HP:{TouchPad:1},HTC:{},Huawei:{},Lenovo:{},LG:{},Microsoft:{Xbox:1,"Xbox One":1},Motorola:{Xoom:1},Nintendo:{"Wii U":1,Wii:1},Nokia:{Lumia:1},Oppo:{},Samsung:{"Galaxy S":1,"Galaxy S2":1,"Galaxy S3":1,"Galaxy S4":1},Sony:{PlayStation:1,"PlayStation Vita":1},Xiaomi:{Mi:1,Redmi:1}}),N=function(e){return S(e,(function(e,t){var r=t.pattern||f(t);return!e&&(e=RegExp("\\b"+r+"(?:/[\\d.]+|[ \\w.]*)","i").exec(i))&&(e=function(e,t,i){var r={"10.0":"10",6.4:"10 Technical Preview",6.3:"8.1",6.2:"8",6.1:"Server 2008 R2 / 7","6.0":"Server 2008 / Vista",5.2:"Server 2003 / XP 64-bit",5.1:"XP",5.01:"2000 SP1","5.0":"2000","4.0":"NT","4.90":"ME"};return t&&i&&/^Win/i.test(e)&&!/^Windows Phone /i.test(e)&&(r=r[/[\d.]+$/.exec(e)])&&(e="Windows "+r),e=String(e),t&&i&&(e=e.replace(RegExp(t,"i"),i)),c(e.replace(/ ce$/i," CE").replace(/\bhpw/i,"web").replace(/\bMacintosh\b/,"Mac OS").replace(/_PowerPC\b/i," OS").replace(/\b(OS X) [^ \d]+/i,"$1").replace(/\bMac (OS X)\b/,"$1").replace(/\/(\d)/," $1").replace(/_/g,".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i,"").replace(/\bx86\.64\b/gi,"x86_64").replace(/\b(Windows Phone) OS\b/,"$1").replace(/\b(Chrome OS \w+) [\d.]+\b/,"$1").split(" on ")[0])}(e,r,t.label||t)),e}))}(["Windows Phone","KaiOS","Android","CentOS",{label:"Chrome OS",pattern:"CrOS"},"Debian",{label:"DragonFly BSD",pattern:"DragonFly"},"Fedora","FreeBSD","Gentoo","Haiku","Kubuntu","Linux Mint","OpenBSD","Red Hat","SuSE","Ubuntu","Xubuntu","Cygwin","Symbian OS","hpwOS","webOS ","webOS","Tablet OS","Tizen","Linux","Mac OS X","Macintosh","Mac","Windows 98;","Windows "]);function V(e){return S(e,(function(e,t){var r=t.pattern||f(t);return!e&&(e=RegExp("\\b"+r+" *\\d+[.\\w_]*","i").exec(i)||RegExp("\\b"+r+" *\\w+-[\\w]*","i").exec(i)||RegExp("\\b"+r+"(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)","i").exec(i))&&((e=String(t.label&&!RegExp(r,"i").test(t.label)?t.label:e).split("/"))[1]&&!/[\d.]+/.test(e[0])&&(e[0]+=" "+e[1]),t=t.label||t,e=c(e[0].replace(RegExp(r,"i"),t).replace(RegExp("; *(?:"+t+"[_-])?","i")," ").replace(RegExp("("+t+")[-_.]?(\\w)","i"),"$1 $2"))),e}))}function z(e){return S(e,(function(e,t){return e||(RegExp(t+"(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)","i").exec(i)||0)[1]||null}))}if($&&($=[$]),/\bAndroid\b/.test(N)&&!X&&(s=/\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(i))&&(X=x(s[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i,"")||null),K&&!X?X=V([K]):K&&X&&(X=X.replace(RegExp("^("+f(K)+")[-_.\\s]","i"),K+" ").replace(RegExp("^("+f(K)+")[-_.]?(\\w)","i"),K+" $2")),(s=/\bGoogle TV\b/.exec(X))&&(X=s[0]),/\bSimulator\b/i.test(i)&&(X=(X?X+" ":"")+"Simulator"),"Opera Mini"==j&&/\bOPiOS\b/.test(i)&&I.push("running in Turbo/Uncompressed mode"),"IE"==j&&/\blike iPhone OS\b/.test(i)?(K=(s=e(i.replace(/like iPhone OS/,""))).manufacturer,X=s.product):/^iP/.test(X)?(j||(j="Safari"),N="iOS"+((s=/ OS ([\d_]+)/i.exec(i))?" "+s[1].replace(/_/g,"."):"")):"Konqueror"==j&&/^Linux\b/i.test(N)?N="Kubuntu":K&&"Google"!=K&&(/Chrome/.test(j)&&!/\bMobile Safari\b/i.test(i)||/\bVita\b/.test(X))||/\bAndroid\b/.test(N)&&/^Chrome/.test(j)&&/\bVersion\//i.test(i)?(j="Android Browser",N=/\bAndroid\b/.test(N)?N:"Android"):"Silk"==j?(/\bMobi/i.test(i)||(N="Android",I.unshift("desktop mode")),/Accelerated *= *true/i.test(i)&&I.unshift("accelerated")):"UC Browser"==j&&/\bUCWEB\b/.test(i)?I.push("speed mode"):"PaleMoon"==j&&(s=/\bFirefox\/([\d.]+)\b/.exec(i))?I.push("identifying as Firefox "+s[1]):"Firefox"==j&&(s=/\b(Mobile|Tablet|TV)\b/i.exec(i))?(N||(N="Firefox OS"),X||(X=s[1])):!j||(s=!/\bMinefield\b/i.test(i)&&/\b(?:Firefox|Safari)\b/.exec(j))?(j&&!X&&/[\/,]|^[^(]+?\)/.test(i.slice(i.indexOf(s+"/")+8))&&(j=null),(s=X||K||N)&&(X||K||/\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(N))&&(j=/[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(N)?N:s)+" Browser")):"Electron"==j&&(s=(/\bChrome\/([\d.]+)\b/.exec(i)||0)[1])&&I.push("Chromium "+s),G||(G=z(["(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)","Version",f(j),"(?:Firefox|Minefield|NetFront)"])),(s=("iCab"==$&&parseFloat(G)>3?"WebKit":/\bOpera\b/.test(j)&&(/\bOPR\b/.test(i)?"Blink":"Presto"))||/\b(?:Midori|Nook|Safari)\b/i.test(i)&&!/^(?:Trident|EdgeHTML)$/.test($)&&"WebKit"||!$&&/\bMSIE\b/i.test(i)&&("Mac OS"==N?"Tasman":"Trident")||"WebKit"==$&&/\bPlayStation\b(?! Vita\b)/i.test(j)&&"NetFront")&&($=[s]),"IE"==j&&(s=(/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(i)||0)[1])?(j+=" Mobile",N="Windows Phone "+(/\+$/.test(s)?s:s+".x"),I.unshift("desktop mode")):/\bWPDesktop\b/i.test(i)?(j="IE Mobile",N="Windows Phone 8.x",I.unshift("desktop mode"),G||(G=(/\brv:([\d.]+)/.exec(i)||0)[1])):"IE"!=j&&"Trident"==$&&(s=/\brv:([\d.]+)/.exec(i))&&(j&&I.push("identifying as "+j+(G?" "+G:"")),j="IE",G=s[1]),T){if(m="global",g=null!=(h=r)?typeof h[m]:"number",/^(?:boolean|number|string|undefined)$/.test(g)||"object"==g&&!h[m])u(s=r.runtime)==y?(j="Adobe AIR",N=s.flash.system.Capabilities.os):u(s=r.phantom)==w?(j="PhantomJS",G=(s=s.version||null)&&s.major+"."+s.minor+"."+s.patch):"number"==typeof W.documentMode&&(s=/\bTrident\/(\d+)/i.exec(i))?(G=[G,W.documentMode],(s=+s[1]+4)!=G[1]&&(I.push("IE "+G[1]+" mode"),$&&($[1]=""),G[1]=s),G="IE"==j?String(G[1].toFixed(1)):G[0]):"number"==typeof W.documentMode&&/^(?:Chrome|Firefox)\b/.test(j)&&(I.push("masking as "+j+" "+G),j="IE",G="11.0",$=["Trident"],N="Windows");else if(v&&(A=(s=v.lang.System).getProperty("os.arch"),N=N||s.getProperty("os.name")+" "+s.getProperty("os.version")),P){try{G=r.require("ringo/engine").version.join("."),j="RingoJS"}catch(e){(s=r.system)&&s.global.system==r.system&&(j="Narwhal",N||(N=s[0].os||null))}j||(j="Rhino")}else"object"==typeof r.process&&!r.process.browser&&(s=r.process)&&("object"==typeof s.versions&&("string"==typeof s.versions.electron?(I.push("Node "+s.versions.node),j="Electron",G=s.versions.electron):"string"==typeof s.versions.nw&&(I.push("Chromium "+G,"Node "+s.versions.node),j="NW.js",G=s.versions.nw)),j||(j="Node.js",A=s.arch,N=s.platform,G=(G=/[\d.]+/.exec(s.version))?G[0]:null));N=N&&c(N)}if(G&&(s=/(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(G)||/(?:alpha|beta)(?: ?\d)?/i.exec(i+";"+(T&&o.appMinorVersion))||/\bMinefield\b/i.test(i)&&"a")&&(F=/b/i.test(s)?"beta":"alpha",G=G.replace(RegExp(s+"\\+?$"),"")+("beta"==F?B:C)+(/\d+\+?/.exec(s)||"")),"Fennec"==j||"Firefox"==j&&/\b(?:Android|Firefox OS|KaiOS)\b/.test(N))j="Firefox Mobile";else if("Maxthon"==j&&G)G=G.replace(/\.[\d.]+/,".x");else if(/\bXbox\b/i.test(X))"Xbox 360"==X&&(N=null),"Xbox 360"==X&&/\bIEMobile\b/.test(i)&&I.unshift("mobile mode");else if(!/^(?:Chrome|IE|Opera)$/.test(j)&&(!j||X||/Browser|Mobi/.test(j))||"Windows CE"!=N&&!/Mobi/i.test(i))if("IE"==j&&T)try{null===r.external&&I.unshift("platform preview")}catch(e){I.unshift("embedded")}else(/\bBlackBerry\b/.test(X)||/\bBB10\b/.test(i))&&(s=(RegExp(X.replace(/ +/g," *")+"/([.\\d]+)","i").exec(i)||0)[1]||G)?(N=((s=[s,/BB10/.test(i)])[1]?(X=null,K="BlackBerry"):"Device Software")+" "+s[0],G=null):this!=d&&"Wii"!=X&&(T&&k||/Opera/.test(j)&&/\b(?:MSIE|Firefox)\b/i.test(i)||"Firefox"==j&&/\bOS X (?:\d+\.){2,}/.test(N)||"IE"==j&&(N&&!/^Win/.test(N)&&G>5.5||/\bWindows XP\b/.test(N)&&G>8||8==G&&!/\bTrident\b/.test(i)))&&!a.test(s=e.call(d,i.replace(a,"")+";"))&&s.name&&(s="ing as "+s.name+((s=s.version)?" "+s:""),a.test(j)?(/\bIE\b/.test(s)&&"Mac OS"==N&&(N=null),s="identify"+s):(s="mask"+s,j=R?c(R.replace(/([a-z])([A-Z])/g,"$1 $2")):"Opera",/\bIE\b/.test(s)&&(N=null),T||(G=null)),$=["Presto"],I.push(s));else j+=" Mobile";(s=(/\bAppleWebKit\/([\d.]+\+?)/i.exec(i)||0)[1])&&(s=[parseFloat(s.replace(/\.(\d)$/,".0$1")),s],"Safari"==j&&"+"==s[1].slice(-1)?(j="WebKit Nightly",F="alpha",G=s[1].slice(0,-1)):G!=s[1]&&G!=(s[2]=(/\bSafari\/([\d.]+\+?)/i.exec(i)||0)[1])||(G=null),s[1]=(/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(i)||0)[1],537.36==s[0]&&537.36==s[2]&&parseFloat(s[1])>=28&&"WebKit"==$&&($=["Blink"]),T&&(O||s[1])?($&&($[1]="like Chrome"),s=s[1]||((s=s[0])<530?1:s<532?2:s<532.05?3:s<533?4:s<534.03?5:s<534.07?6:s<534.1?7:s<534.13?8:s<534.16?9:s<534.24?10:s<534.3?11:s<535.01?12:s<535.02?"13+":s<535.07?15:s<535.11?16:s<535.19?17:s<536.05?18:s<536.1?19:s<537.01?20:s<537.11?"21+":s<537.13?23:s<537.18?24:s<537.24?25:s<537.36?26:"Blink"!=$?"27":"28")):($&&($[1]="like Safari"),s=(s=s[0])<400?1:s<500?2:s<526?3:s<533?4:s<534?"4+":s<535?5:s<537?6:s<538?7:s<601?8:s<602?9:s<604?10:s<606?11:s<608?12:"12"),$&&($[1]+=" "+(s+="number"==typeof s?".x":/[.+]/.test(s)?"":"+")),"Safari"==j&&(!G||parseInt(G)>45)?G=s:"Chrome"==j&&/\bHeadlessChrome/i.test(i)&&I.unshift("headless")),"Opera"==j&&(s=/\bzbov|zvav$/.exec(N))?(j+=" ",I.unshift("desktop mode"),"zvav"==s?(j+="Mini",G=null):j+="Mobile",N=N.replace(RegExp(" *"+s+"$"),"")):"Safari"==j&&/\bChrome\b/.exec($&&$[1])?(I.unshift("desktop mode"),j="Chrome Mobile",G=null,/\bOS X\b/.test(N)?(K="Apple",N="iOS 4.3+"):N=null):/\bSRWare Iron\b/.test(j)&&!G&&(G=z("Chrome")),G&&0==G.indexOf(s=/[\d.]+$/.exec(N))&&i.indexOf("/"+s+"-")>-1&&(N=x(N.replace(s,""))),N&&-1!=N.indexOf(j)&&!RegExp(j+" OS").test(N)&&(N=N.replace(RegExp(" *"+f(j)+" *"),"")),$&&!/\b(?:Avant|Nook)\b/.test(j)&&(/Browser|Lunascape|Maxthon/.test(j)||"Safari"!=j&&/^iOS/.test(N)&&/\bSafari\b/.test($[1])||/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(j)&&$[1])&&(s=$[$.length-1])&&I.push(s),I.length&&(I=["("+I.join("; ")+")"]),K&&X&&X.indexOf(K)<0&&I.push("on "+K),X&&I.push((/^on /.test(I[I.length-1])?"":"on ")+X),N&&(s=/ ([\d.+]+)$/.exec(N),p=s&&"/"==N.charAt(N.length-s[0].length-1),N={architecture:32,family:s&&!p?N.replace(s[0],""):N,version:s?s[1]:null,toString:function(){var e=this.version;return this.family+(e&&!p?" "+e:"")+(64==this.architecture?" 64-bit":"")}}),(s=/\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(A))&&!/\bi686\b/i.test(A)?(N&&(N.architecture=64,N.family=N.family.replace(RegExp(" *"+s),"")),j&&(/\bWOW64\b/i.test(i)||T&&/\w(?:86|32)$/.test(o.cpuClass||o.platform)&&!/\bWin64; x64\b/i.test(i))&&I.unshift("32-bit")):N&&/^OS X/.test(N.family)&&"Chrome"==j&&parseFloat(G)>=39&&(N.architecture=64),i||(i=null);var H={};return H.description=i,H.layout=$&&$[0],H.manufacturer=K,H.name=j,H.prerelease=F,H.product=X,H.ua=i,H.version=j&&G,H.os=N||{architecture:null,family:null,version:null,toString:function(){return"null"}},H.parse=e,H.toString=function(){return this.description||""},H.version&&I.unshift(G),H.name&&I.unshift(j),N&&j&&(N!=String(N).split(" ")[0]||N!=j.split(" ")[0]&&!X)&&I.push(X?"("+N+")":"on "+N),I.length&&(H.description=I.join(" ")),H}();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(t.platform=h,define((function(){return h}))):i&&r?d(h,(function(e,t){i[t]=e})):t.platform=h}).call(this);
function WEBAPIhttpGet(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText}
//! /bin

const fs={bin:{init:function(n,e,o){o.write("/dev/stdout","OK.")}},home:new Object,mnt:new Object,etc:{hostname:"MinGJ"},dev:new Object};var MinGJ=new kernel(fs);function MGJgetPrompt(){return`${MinGJ.env.username}@${location.hostname}:${MinGJ.env.cd}$ `}function MGJWhereis(n){var e=[];for(const o of MinGJ.env.path){MinGJ.getObj(o)[n]&&e.push(`${o}/${n}`)}return e}function MGJuname(n,e,o){var t=[];function i(n,o,i=""){var a=e.includes("-a")||e.includes("--all");(e.includes("--"+n)||e.includes("-"+o)||a&&""!==i)&&t.push(i||"unknown")}return i("kernel-name","v","MinGJ"),i("nodename","n",location.hostname),i("kernel-release","r"),i("kernel-version","v"),i("machine","m",platform.os),i("processor","p"),i("hardware-platform","i"),i("operating-system","o",platform.name),t.join(" ")}function Bash(n){MinGJ.print(MGJgetPrompt(),n);var e=n.split(" "),o=MGJWhereis(e[0]);o.length>0?(e.shift(),MinGJ.exec(o[0],e)):console.log(`bash: ${e[0]}: command not found`)}function MGJLogin(n){MinGJ.env.username=n,"object"!=typeof MinGJ.home[n]&&(MinGJ.home[n]={}),console.log(`\n${location.hostname} login: ${n}`)}MinGJ.env.username="js",window.Bash=Bash,fs.bin.bash=function(n,e,o){e.length>1&&o.print("JS Bash alpha 1.0")};
fs.bin.cat=function(t,e,r){var n=new String,i=new String,o=0;return e.shift(),e.forEach((function(t){return r.pathExist(r.getAbsolutePath(t))?"string"==typeof(i=r.getObj(r.getAbsolutePath(t)))||i instanceof String?void(n+=i):(o=-1,r.write("/dev/stderr",`Error: ${r.getAbsolutePath(t)} is not a normal file.`)):(o=-1,r.write("/dev/stderr",`Error: ${r.getAbsolutePath(t)} does not exist.`))})),0!=o?o:r.print(n)};
fs.bin.cd=function(n,t,c){var e=n>1?t[n-1]:".";e=c.getAbsolutePath(e),c.env.cd=e};
fs.bin.debug=function(n,o,b){console.log(b)};
fs.bin.dir=function(t,i,e){var n=t>1?i[t-1]:".";n=e.getAbsolutePath(n),e.pathExist(n)||e.print(n+" does not exist");var s=e.getObj(n);e.print(Object.keys(s).join(" "))};
fs.bin.echo=function(i,n,f){n.shift(),f.print(n.join(" "))};
fs.bin.env=function(n,i,e){for(const n in e.env)e.print(n+"="+e.env[n])};
fs.bin.help=function(n,i,e){MinGJ.env.path.forEach(n=>e.exec("/bin/dir",[n]))};
fs.bin.mknod=function(n,f,i){f.shift(),i.mknod(...f)};
fs.bin.mount=function(n,t,o){n<3?o.print("Usage: mount DEVICE PLACE"):o.mount(t[1],t[2])};
fs.bin.su=function(e,n,s){if(e<2)s.env.username="root";else{var o=n[e-1];"-s"==o&&(o="root"),s.env.username=o}n.includes("-s")&&("root"==s.env.username?(fs.root=fs.root||new Object,fs.env.cd="/root"):(fs.home[s.env.username]=fs.home[s.env.username]||new Object,s.env.cd="/home/"+s.env.username))};
fs.bin.uname=function(n,i,u){u.print(MGJuname(n,i,u))};
fs.bin.wget=function(t,e,g){var n=e[1],b=g.getObj(g.getAbsolutePath(".")),h=n.split("/");b[h[h.length-1]]=WEBAPIhttpGet(n)};
fs.bin.whereis=function(i,n,e){var r=MGJWhereis(n[1]).map(i=>`${n[1]}:${i}`);e.print(r.join("\n"))};
//# sourceMappingURL=mingj.min.js.map

// UserScript Exports
var globals = {Bash}
for (const g in globals) {
	exportFunction(globals[g],unsafeWindow,{
		defineAs: g
	  });
}