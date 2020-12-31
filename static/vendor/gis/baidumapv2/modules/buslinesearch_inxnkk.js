/* 百度地图API V2 模块
 * 此模块必须配套使用baidumap_offline_v2_20160822.js对
 * 获取模块的方法：
 * http://api0.map.bdimg.com/getmodules?v=2.0&mod=模块1,模块2
 * 模块名称就是文件名
 * www.xiaoguo123.com 整理
 */
 _jsload2&&_jsload2('buslinesearch', 'x.extend(Gd.prototype,{Od:function(){for(var a=0,b=this.Oa.length;a<b;a++){var c=this.Oa[a];this[c.method].apply(this,c.arguments)}delete this.Oa},cv:function(a,b,c){a=R.xb(a);return z.qp+"?c="+a.lng+","+a.lat+"&i="+b+","+encodeURIComponent(c)+"&s="+encodeURIComponent("tpl:LinesQuery")},getBusList:function(a){var b=this;this.Lg(this.zd,function(c){c?$c.ab(function(a,c){b.gQ(a,c)},{qt:b.uP,c:c,wd:a},{sb:a}):(this.uc=new Lh({sb:a,city:"",ri:"",Gh:""}),b.rb(5),b.Ra(V.uu,this.uc))})},gQ:function(a,b){this.clearResults(); var c=a.result;if(!a.content||0!=c.error||c.type!=this.wP)this.uc=new Lh({sb:b.sb,city:a.current_city.name,ri:"",Gh:a.current_city.code}),this.rb(7),this.Ra(V.uu,this.uc);else{for(var c=a.content,d=[],e=0,f=c.length;e<f;e++)d.push({name:c[e].name,hk:c[e].uid,Gh:a.current_city.code,Tj:e,HA:b.sb,Ui:c[e].poiType||2});this.uc=new Lh({sb:b.sb,city:a.current_city.name,ri:this.cv(P.tb(a.current_city.geo,o).point,a.current_city.code,b.sb),tM:d,Gh:a.current_city.code});this.rb(0);this.Ra(V.uu,this.uc);this.HT(); this.HS(a.current_city.geo,a.current_city.level,a.current_city.code)}},HT:function(){if(this.k.ka.Ga&&this.k.ka.Ga.appendChild&&this.uc&&0<this.uc.Ts()){var a=K("div",{style:"font:12px "+F.fontFamily+";background:#fff"});a.id="divResult"+this.ba;for(var b=this.uc.Ts(),c=[],d=0;d<b;d++){var e=this.uc.CD(d).name;c.push(\'<dl style="margin:3px 3px"><dt><span style="cursor:pointer" onclick=Instance(\\\'\'+this.ba+"\')._selectBusListItem("+d+")><img id=imgBLIcon"+d+" src="+Gd.mv+\' style="border:none" /></span>&nbsp;&nbsp;<a style="color:blue" href="javascript:void(0)" onclick=Instance(\\\'\'+ this.ba+"\')._selectBusListItem("+d+")>"+e+"</a></dt><dd id=ddBLInfo"+d+\' style="display:none;margin:2px 0px"></dd></dl>\')}b="";this.uc.moreResultsUrl&&(b=b+"<div style=\'color:#7777cc;background:#e5ecf9;overflow:hidden;padding:2px;text-align:right\'>"+("<a style=\'color:#7777cc\' href=\'"+this.uc.moreResultsUrl+"\' target=\'_blank\'>\\u5230\\u767e\\u5ea6\\u5730\\u56fe\\u67e5\\u770b&#187;</a>"),b+="&nbsp;</div>");a.innerHTML=c.join("")+b;this.k.ka.Ga.appendChild(a);this.Ra(V.fG,a)}},HS:function(a,b,c){var d=this.k.ka.map; d&&(a=P.tb(a,o).point,this.dB?this.dB!=c&&(d.Cd(a,b),this.dB=c):(d.Cd(a,b),this.dB=c))},vU:function(a){if(this.uc)for(var b=0,c=this.uc.Ts();b<c;b++){var d=x.Ec("ddBLInfo"+b),e=x.Ec("imgBLIcon"+b);b==a?"none"==d.style.display?(d.style.display="block",e.src=Gd.zS):(d.style.display="none",e.src=Gd.mv):(d.style.display="none",e.src=Gd.mv)}},_selectBusListItem:function(a,b){if(!b){var c=x.Ec("ddBLInfo"+a),d=x.Ec("imgBLIcon"+a);if("block"==c.style.display){c.style.display="none";d.src=Gd.mv;return}}if(this.uc&& this.uc[a]&&0<this.uc[a].Yo())this.Fc=this.uc[a],this.rb(0),this.Ra(V.tu,this.Fc),this.HI(a),this.GI(a);else{var e=this,c=this.uc.CD(a);$c.ab(function(b,c){e.fQ(b,c,a)},{qt:e.tP,c:c.Gh,uid:c.hk},{name:c.name,Ui:c.Ui})}},clearResults:function(){delete this.uc;delete this.Fc;delete this.Yi;delete this.T0;this.Lj();this.k.ka.Ga&&(this.k.ka.Ga.innerHTML="")},getBusLine:function(a){a&&("object"==typeof a&&a.hk&&""!=a.hk&&"undefined"!=typeof a.Gh&&""!=a.Gh.toString()&&"undefined"!=typeof a.Tj&&""!=a.Tj.toString()&& "undefined"!=typeof a.HA&&""!=a.HA.toString())&&(this.uc&&0<this.uc.Ts()&&a.Gh==this.uc.Gh&&a.HA==this.uc.keyword)&&this._selectBusListItem(a.Tj,o)},fQ:function(a,b,c){var d=a.result;if(!a.content||!a.content[0]||0!=d.error||d.type!=this.vP)this.Fc=new Mh({name:b.name}),this.rb(7),this.Ra(V.tu,this.Fc);else{var a=a.content[0],e=d="",f="",g={},i=[],d=a.startTime,e=a.endTime,f=a.company;a.geo&&(g=P.tb(a.geo,o),g=new Ac(g.ia));if(a.stations)for(var k=0,l=a.stations.length;k<l;k++)if(a.stations[k].geo){var m= P.tb(a.stations[k].geo,o);i.push({name:a.stations[k].name,position:m.point,hk:a.stations[k].uid})}this.Fc=new Mh({name:b.name,startTime:d,yW:e,CV:f,hZ:g,fO:i,Ui:b.Ui});this.rb(0);this.Ra(V.tu,this.Fc);this.uc[c]=this.Fc;this.HI(c);this.GI(c)}},HI:function(a){if(this.k.ka.Ga&&this.k.ka.Ga.appendChild&&this.Fc&&0<this.Fc.Yo()){this.vU(a);var b=x.Ec("ddBLInfo"+a);if(b){var c=[];c.push(\'<table style="width:100%;background:#CDCDCD;font:12px \'+F.fontFamily+\'" cellspacing="1" cellpadding="1" ><tbody>\'); c.push(\'<tr><td style="width:95px;line-height:22px;padding:0px 8px;text-align:left;vertical-align:top;background:#F4F4F4" >\\u9996\\u672b\\u8f66\\u65f6\\u95f4</th><td  style="background:#FFFFFF;line-height:22px;padding:0px 8px" >\'+this.Fc.startTime+"-"+this.Fc.endTime+"</td></tr>");c.push(\'<tr><td style="width:95px;line-height:22px;padding:0px 8px;text-align:left;vertical-align:top;background:#F4F4F4" >\\u6240\\u5c5e\\u516c\\u53f8</th><td  style="background:#FFFFFF;line-height:22px;padding:0px 8px" >\'+this.Fc.company+ "</td></tr>");c.push("</tbody></table>");4==this.Fc.Ui?c.push(\'<p style="margin:2px 0px;font:12px \'+F.fontFamily+\';">\\u6cbf\\u7ebf\\u5730\\u94c1\\u7ad9:</p>\'):c.push(\'<p style="margin:2px 0px;font:12px \'+F.fontFamily+\';">\\u6cbf\\u7ebf\\u516c\\u4ea4\\u7ad9\\u70b9:</p>\');c.push(\'<table style="width:100%;font:12px \'+F.fontFamily+\';" ><tbody>\');for(var d=0,e=this.Fc.Yo();d<e;d++)c.push(\'<tr><td style="width:20px">\'+(d+1)+"</th><td><a id=aStop_"+a+"_"+d+\' style="color:blue" href="javascript:void(0)" onclick=Instance(\\\'\'+ this.ba+"\')._selectBusStop("+a+","+d+")>"+this.Fc.dx(d).name+"</a></td></tr>");c.push("</tbody></table>");b.innerHTML=c.join("")}a=x.Ec("divResult"+this.ba);this.Ra(V.eG,a)}},GI:function(a){if(this.k.ka.map&&this.Fc&&0<this.Fc.Yo()){this.Lj();U.Ql(this.k.ka.map,this.Fc.pe());var b=this.Fc.ap();this.Ra(V.vu,b);var c=this;this.Yi=[];for(var d=0,e=this.Fc.Yo();d<e;d++){var f=this.Fc.dx(d).position,g=this.Fc.dx(d).name,f=U.QU(this.k.ka.map,f,g);(function(b,d,e){b.addEventListener("click",function(f){var g= ["<div style=\'font:12px "+F.fontFamily+"\'>"];g.push("<div style=\'margin:10px 1em 24px 0\'><b>"+d+"</b></div>");g.push("</div>");var u=new qc(g.join(""),{title:"",height:0,width:220,margin:[10,10,20,10]});u.addEventListener("open",function(){var b=x.Ec("aStop_"+a+"_"+e);b&&(b.style.backgroundColor="#cccccc")});u.addEventListener("close",function(){var b=x.Ec("aStop_"+a+"_"+e);b&&(b.style.backgroundColor="#ffffff")});g=c.k.ka.map;g.K.lm?Yd.kp(u,g.getCurrentCity().code,{panoInstance:g.P,lngLat:f.target.ha(), titleTip:d,type:"busline"},function(){b.Mb(u)}):b.Mb(u)})})(f,g,d);f.zB=g;this.Yi.push(f)}this.Ra(V.Yp,this.Yi);this.k.ka.Zg&&this.k.ka.map.Bh(b.pe(),{margins:[5,5,5,5]})}},_selectBusStop:function(a,b){if(this.k.ka.map&&this.Yi&&0<this.Yi.length){var c=this.Yi[b];if(c.zB){var d=["<div style=\'font:12px "+F.fontFamily+"\'>"];d.push("<div style=\'margin:10px 1em 24px 0\'><b>"+c.zB+"</b></div>");d.push("</div>");var e=new qc(d.join(""),{title:"",height:0,width:220,margin:[10,10,20,10]});e.addEventListener("open", function(){var c=x.Ec("aStop_"+a+"_"+b);c&&(c.style.backgroundColor="#cccccc")});e.addEventListener("close",function(){var c=x.Ec("aStop_"+a+"_"+b);c&&(c.style.backgroundColor="#ffffff")});d=this.k.ka.map;d.K.lm?Yd.kp(e,d.getCurrentCity().code,{panoInstance:d.P,lngLat:c.ha(),titleTip:c.zB,type:"busline"},function(){c.Mb(e)}):c.Mb(e)}}else{this.rN&&(this.rN.style.backgroundColor="#ffffff");if(d=x.Ec("aStop_"+a+"_"+b))d.style.backgroundColor="#cccccc";this.rN=d}},Lj:function(){this.k.ka.map&&this.k.ka.map.hK()}, rb:function(a){"number"==typeof a?this.Bd=a:delete this.Bd}});function Lh(a){this.keyword=a.sb||"";this.city=a.city;this.moreResultsUrl=a.ri;this.LA=a.tM&&a.tM.slice(0)||[];this.Gh=a.Gh}x.extend(Lh.prototype,{CD:function(a){if(this.LA[a])return this.LA[a]},Ts:function(){return this.LA.length}});var Nh=Lh.prototype;S(Nh,{getNumBusList:Nh.Ts,getBusListItem:Nh.CD});function Mh(a){this.name=a.name||"";this.startTime=a.startTime||"";this.endTime=a.yW||"";this.company=a.CV||"";this.Vi=a.hZ||{};this.BB=a.fO&&a.fO.slice(0)||[];this.Ui=a.Ui||2}x.extend(Mh.prototype,{dx:function(a){if(this.BB[a])return this.BB[a]},Yo:function(){return this.BB.length},ap:t("Vi"),pe:function(){if(this.Vi.pe())return this.Vi.pe()}});var Oh=Mh.prototype;S(Oh,{getNumBusStations:Oh.Yo,getBusStation:Oh.dx,getPath:Oh.pe,getPolyline:Oh.ap}); ');
