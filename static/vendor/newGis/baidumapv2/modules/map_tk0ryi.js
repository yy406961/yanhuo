
_jsload2&&_jsload2('map', 'sb.prototype.cancel=ga(1,function(){this.Rr&&clearTimeout(this.Rr);this.Wz=this.Lu;this.uy=0}); z.Se(function(a){if(!a.K||!a.K.Kx){a.Jx()?vf(a):a.addEventListener("load",function(){vf(this)});a.$g="\\u4e2d\\u56fd";a.Zr="1";var b={kD:o,ab:function(){b.kD&&(b.kD=q,setTimeout(function(){b.Sg()},500))},Sg:function(){var c=a.Gd(),d=a.fa(),e=R.xb(c.re()),c=R.xb(c.kf());$c.ab(function(c){b.kD=o;if(c&&c.current_city&&c.current_city.name){var d=c.current_city.name,c=c.current_city.code;c!==a.Zr&&a.dispatchEvent("citychange",{name:d,code:c});a.$g=d;a.Zr=c;G()||wf(a)}},{qt:"cen",b:e.lng+","+e.lat+";"+c.lng+ ","+c.lat,l:d},"","",o)}};a.addEventListener("load",function(){b.ab()});a.addEventListener("moveend",function(){b.ab()});a.addEventListener("zoomend",function(){b.ab()});b.ab();z.version&&1.5<=z.version&&Qb(z.Hc+"?qt=verify&ak="+pa,function(b){if(b&&0!==b.error){a.Na().innerHTML="";a.Ii={};z=p;var d="\\u767e\\u5ea6\\u672a\\u6388\\u6743\\u4f7f\\u7528\\u5730\\u56feAPI\\uff0c\\u53ef\\u80fd\\u662f\\u56e0\\u4e3a\\u60a8\\u63d0\\u4f9b\\u7684\\u5bc6\\u94a5\\u4e0d\\u662f\\u6709\\u6548\\u7684\\u767e\\u5ea6LBS\\u5f00\\u653e\\u5e73\\u53f0\\u5bc6\\u94a5\\uff0c\\u6216\\u6b64\\u5bc6\\u94a5\\u672a\\u5bf9\\u672c\\u5e94\\u7528\\u7684\\u767e\\u5ea6\\u5730\\u56feJavaScriptAPI\\u6388\\u6743\\u3002\\u60a8\\u53ef\\u4ee5\\u8bbf\\u95ee\\u5982\\u4e0b\\u7f51\\u5740\\u4e86\\u89e3\\u5982\\u4f55\\u83b7\\u53d6\\u6709\\u6548\\u7684\\u5bc6\\u94a5\\uff1ahttp://lbsyun.baidu.com/apiconsole/key#\\u3002"; switch(b.error){case 101:d="\\u5f00\\u53d1\\u8005\\u7981\\u7528\\u4e86\\u8be5ak\\u7684jsapi\\u670d\\u52a1\\u6743\\u9650\\u3002\\u60a8\\u53ef\\u4ee5\\u8bbf\\u95ee\\u5982\\u4e0b\\u7f51\\u5740\\u4e86\\u89e3\\u5982\\u4f55\\u83b7\\u53d6\\u6709\\u6548\\u7684\\u5bc6\\u94a5\\uff1ahttp://lbsyun.baidu.com/apiconsole/key#\\u3002";break;case 102:d="\\u5f00\\u53d1\\u8005Referer\\u4e0d\\u6b63\\u786e\\u3002\\u60a8\\u53ef\\u4ee5\\u8bbf\\u95ee\\u5982\\u4e0b\\u7f51\\u5740\\u4e86\\u89e3\\u5982\\u4f55\\u83b7\\u53d6\\u6709\\u6548\\u7684\\u5bc6\\u94a5\\uff1ahttp://lbsyun.baidu.com/apiconsole/key#\\u3002"}alert(d)}})}}); function vf(a){if(!a.R.HV){a.R.HV=o;if(!a.Jw){var b=new L(81,2);G()&&(b.width=72,b.height=0);var c=new Xb({offset:b,printable:o});a.Jw=c}G()||(wf(a),a.addEventListener("maptypechange",function(){wf(a)}));a.lw(c);var d=new xf;d.k={Ag:o};a.lw(d);a.addEventListener("resize",function(){if(this.yb().width>=360&&a.yb().height>=100){d.show();c.Te(b)}else{d.U();c.Te(new L(4,2))}});360<=a.yb().width&&100<=a.yb().height&&a.K.CY?d.show():(d.U(),c.Te(new L(4,2)))}} function wf(a){var b=a.$g||"\\u4e2d\\u56fd",c=a.oa(),d="\\u5e38\\u5dde\\u5e02 \\u4e4c\\u9c81\\u6728\\u9f50\\u5e02 \\u5357\\u660c\\u5e02 \\u65e0\\u9521\\u5e02 \\u798f\\u5dde\\u5e02 \\u6cc9\\u5dde\\u5e02 \\u73e0\\u6d77\\u5e02 \\u8d35\\u9633\\u5e02".split(" "),e=[],f;a.Jw||(e=new L(81,2),G()&&(e.width=72,e.height=0),e=new Xb({offset:e,printable:o}),a.Jw=e);switch(c){case Xa:case Ra:e=[\'<span style="display:inline;color:#fff;font-size:11px;text-shadow:0 1px 3px black">\'];e.push(\' \'); for(var g in d)if(d[g]===b){f=o;break}f?e.push(\'<a target="_blank" href="http://www.palmcity.cn/" style="display:inline;color:#fff;font-size:11px;text-shadow:0 1px 3px black">PalmCity</a>\'):e.push(\'\');e.push(\'\'); e.push(" , Image &copy; DigitalGlobe & </span>");e.push(\'<a href="http://www.chinasiwei.com" target="_blank" style="display:inline;color:#fff;font-size:11px;text-shadow:0 1px 3px black">chinasiwei</a>\');break;case Oa:e=[\'<span style="display:inline;color:#fff;font-size:11px;text-shadow:0 1px 3px black"></span>\',\'<a href="http://o.cn" target="_blank" style="color:#fff;font-size:11px;text-shadow:0 1px 3px black">\\u90fd\\u5e02\\u5708</a>\'];break;default:e=[\'<span style="font-size:11px"> \']; e.push(\' \');for(g in d)if(d[g]===b){f=o;break}f?e.push(\'<a target="_blank" href="http://www.palmcity.cn/" style="display:inline;">PalmCity</a>\'):e.push(\'\');e.push(\'\');e.push("</span>")}e=e.join("");a.Jw.mw({id:1,content:e})} function xf(){this.defaultAnchor=Vb;this.defaultOffset=new L(1,0);this.uz=30;this.yu=F.pa+(G()?"copyright_logo_s.png":"copyright_logo.png")}xf.prototype=new Sb; xf.prototype.initialize=function(a){this.C=a;var b=K("div");b.style.height="32px";var c=K("a",{title:"\\u5230\\u767e\\u5ea6\\u5730\\u56fe\\u67e5\\u770b\\u6b64\\u533a\\u57df",target:"_blank",href:""});c.style.outline="none";c.innerHTML=6===x.ea.la?"<div style=\'cursor:pointer;width:77px;height:32px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+this.yu+")\'></div>":"<img style=\'border:none;width:77px;height:32px\' src=\'"+this.yu+"\' />";G()&&(1<window.devicePixelRatio&& (this.yu=F.pa+"copyright_logo_hd.png"),b.style.height="25px",c.href="",c.innerHTML="<img style=\'border:none;width:68px;height:25px\' src=\'"+this.yu+"\' />");b.appendChild(c);a.Na().appendChild(b);return b};x.extend(Ka.prototype,{wb:function(){this.ca()},ca:function(){var a=this;a.Ur=function(){var b=a.yb();if(a.width!=b.width||a.height!=b.height){var c=new L(a.width,a.height),d=new N("onbeforeresize");d.size=c;a.dispatchEvent(d);a.ik((b.width-a.width)/2,(b.height-a.height)/2);a.ue.style.width=(a.width=b.width)+"px";a.ue.style.height=(a.height=b.height)+"px";c=new N("onresize");c.size=b;a.dispatchEvent(c);b=parseInt(a.platform.style.left)||0;c=parseInt(a.platform.style.top)||0;0!=a.Sa&&(a.offsetX!=b|| a.offsetY!=c)&&a.He(b,c)}};G()||(x.M(a.ue,"mouseover",function(b){Bb(b);a.dispatchEvent(new N("onmouseover"))}),x.M(a.ue,"mouseout",function(b){Bb(b);a.dispatchEvent(new N("onmouseout"))}))},He:function(a,b,c,d){!isNaN(a)&&!isNaN(b)&&!(this.offsetX==a&&this.offsetY==b)&&(this.ik(this.offsetX-a,this.offsetY-b,c),a=Math.round(a),b=Math.round(b),this.offsetX=a,this.offsetY=b,this.platform.style.left=a+"px",this.platform.style.top=b+"px",this.ue.style.left=-a+"px",this.ue.style.top=-b+"px",d!=q&&this.dispatchEvent(new N("onmoving")))}, ui:function(a,b){if(a instanceof H){var c=this.ac(a),d=Math.round(this.width/2),e=Math.round(this.height/2),b=b||{};Math.abs(d-c.x)>this.width||Math.abs(e-c.y)>this.height||b.noAnimation?this.xI(d-c.x,e-c.y,a):this.yl(d-c.x,e-c.y,{duration:b.duration})}},xI:function(a,b,c){var d=this.R;d.Jc!=o&&(d.lb&&d.lb.stop(),this.dispatchEvent(new N("onmovestart")),this.He(this.offsetX+a,this.offsetY+b,c),this.dispatchEvent(new N("onmoveend")))},yg:function(a,b,c){a=Math.round(a)||0;b=Math.round(b)||0;c=c||{}; Math.abs(a)<=this.width&&Math.abs(b)<=this.height&&!c.noAnimation?this.yl(a,b):this.xI(a,b)},yl:function(a,b,c){if(this.R.Jc!=o){c=c||{};this.dispatchEvent(new N("onmovestart"));var d=this,e=d.R;e.jy=d.offsetX;e.m=d.offsetY;e.JF&&e.JF.cancel();e.lb&&e.lb.stop();e.JF=new sb({Ic:c.Ic||d.K.Ic,duration:c.duration||d.K.HU,hc:c.hc||tb.NK,ua:function(c){(this.FF=d.R.Jc)||d.He(e.jy+Math.ceil(a*c),e.m+Math.ceil(b*c))},finish:function(){d.dispatchEvent(new N("onmoveend"));d.R.JF=q;d.R.Ai==o&&(d.R.Ai=q,0!=d.R.kc&& d.cb())}})}},HX:function(a,b){var c=this.oa();if("object"!=typeof c)return p;c=256*c.Bc(b);a=R.xb(a);return{py:parseInt(a.lng/c),Gw:parseInt(a.lat/c),vg:b}}});S(W,{panTo:W.ui,panBy:W.yg}); ');
