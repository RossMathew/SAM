/*! Main WebHelp functions for HM Premium Pack Version 2.02
Copyright (c) 2008-2012 by Tim Green. 
All rights reserved. */
$(window).attr({id:"hmhelpwindow",name:"hmhelpwindow"});if(!Array.indexOf){Array.prototype.indexOf=function(b){for(var a=0;a<this.length;a++){if(this[a]==b){return a}}return -1}}function addCss(b){var a=document.createElement("style");a.type="text/css";if(a.styleSheet){a.styleSheet.cssText=b}else{a.appendChild(document.createTextNode(b))}document.getElementsByTagName("head")[0].appendChild(a)}var jsCSS="div#hmtoolbar, div#hmtabscontrols {display: block;}\ntable#tbtable {display: table;}";if(navigator.platform.indexOf("iPad")>-1){jsCSS+="\ndiv#hmtabsCtab, div#tabsMenu {display: none;}\ndiv#hmtabswindow {left: 10px}\ndiv#undocktabtool, div#newtabtool, li#indextab img.closetab, li#searchtab img.closetab {display: none;}\ninput#searchinput {height: 1.8em}"}addCss(jsCSS);function newIE(){var c=-1;var a=navigator.userAgent;var b=new RegExp("Trident/([0-9]{1,}[.0-9]{0,})");if(b.exec(a)!=null){c=parseFloat(RegExp.$1)}return(c>=4)}if(document.all&&!window.opera){lazysync=function(c){if(c!=""){var e=hmNavigationFrame().document.getElementById("toc");if(e){if(!tocselecting){var a=$("a[href^='"+c+"']",e);if(a.length>0){var b=$(a).children("span").attr("id");var d=false;if(hmTocSingleClick){d=hilightexpand(b)}else{d=hilight(b)}intoview(a[0],e,d);hilight(b)}}if(autocollapse){if(currentselection){collapseunfocused(e,currentselection.id)}else{collapseunfocused(e,"")}}}}tocselecting=false}}$(function(){$.extend($.fn.disableTextSelect=function(){return this.each(function(){if($.browser.mozilla){$(this).css("MozUserSelect","none")}else{if($.browser.msie){$(this).bind("selectstart",function(){return false})}else{$(this).mousedown(function(){return false})}}})})});function doPermalink(a){document.onselectstart=function(){};var f=hmWebHelp.tabsapi.getCurrentPane().find("iframe").contents().find("title").text();var g=hmWebHelp.tabsapi.getCurrentPane().find("iframe").attr("src");var c=hmWebHelp.tabsapi.getIndex();var b=g;if(c==0){b=hmWebHelp.activePage}if(hmpldata.auto){var e=document.location.href.toString().replace(/\#.*$/,"");e=e.replace(/\?.*$/,"")}else{var e=hmpldata.hurl;if(!/\.[\w]{3,4}$/im.test(e)&&!/\/$/im.test(e)){e=e+"/"}}if(c>0&&c<3){b=hmWebHelp.currentPage}if(e.length==e.lastIndexOf("/")+1){e=e+a+"?"+b}else{e=e+"?"+b}e=e.replace(/ /g,"%20");switch(a){case"close":$("div#permalink").css("visibility","hidden");document.onselectstart=function(){return false};break;case"bookmark":if(hmWebHelp.server){if(window.sidebar){window.sidebar.addPanel(f,e,"")}else{if(document.all&&!window.opera){window.external.AddFavorite(e,f)}else{alert(hmpldata.sorry)}}}else{alert(hmpldata.noserver)}document.onselectstart=function(){return false};break;case"alert":$("textarea#plinkBox").focus().select();alert(hmpldata.manualcopy);document.onselectstart=function(){return false};break;default:if($("div#permalink").css("visibility")=="visible"){$("div#permalink").css("visibility","hidden");document.onselectstart=function(){return false};return}$("div#unclicker").bind("click.closeperma",function(){$("div#permalink").css("visibility","hidden");document.onselectstart=function(){return false};$("div#unclicker").unbind("click.closeperma");$("div#unclicker").hide()}).show();var d=400;if($("div#hmtoolbar").width()<d){d=$("div#hmtoolbar").width()-25}$("textarea#plinkBox").css("height",(Math.round(e.length/30)*17)+"px");$("textarea#plinkBox").css("width",d+"px").val(e);if(!hmWebHelp.server){$("tr#offlinemessage").show();$("#selectPermalink, #bookmarkPermalink").attr("disabled","disabled")}$("div#permalink").css("visibility","visible");if(!hmWebHelp.server){$("textarea#plinkBox").focus().select()}break}}function initClipboard(){if((navigator.platform.indexOf("iPad")===-1&&navigator.platform.indexOf("iPhone")===-1)&&isFlash()){clip=new ZeroClipboard.Client();clip.glue("selectPermalink","permalink_box");clip.addEventListener("complete",function(a,b){alert(hmpldata.copied+"\n"+b)});clip.addEventListener("mouseDown",function(a){clip.setText(document.getElementById("plinkBox").value)})}}function isFlash(){var c=false;if(navigator.platform!="iPad"&&navigator.platform!="iPhone"){if(window.ActiveXObject){try{control=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(b){return}if(control){c=true}}else{if(navigator.plugins&&navigator.plugins.length){c=navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]?true:false}else{if(navigator.mimeTypes&&navigator.mimeTypes.length){var a=navigator.mimeTypes["application/x-shockwave-flash"];c=a&&a.enabledPlugin}}}}return c}function trimString(a){return a.replace(/^\s+/g,"").replace(/\s+$/g,"")}function browserPlatform(b){var e=navigator.userAgent.toLowerCase();var a=((e.indexOf("series60")!=-1)||(e.indexOf("symbian")!=-1)||(e.indexOf("windows ce")!=-1));var g=navigator.userAgent.match(/blackberry(.*?\(khtml, like gecko\) version\/(\d)\.\d.\d.[\d]{1,4}.*?mobile safari)?/ig);if(g!=null&&g[1]==null){a=true}var l=(g!=null&&g[2]>=6);var n=/Windows Phone OS ([\d]{1,1}).*? trident\/([\d]{1,1})/i;g=n.exec(e);var j=(g!=null&&g[1]>=7&&g[2]>=3);var d=typeof orientation!="undefined"?true:false;var i=("ontouchstart" in document.documentElement)?true:false;var k=(navigator.platform.indexOf("iPhone")!=-1)?true:false;var o=(navigator.platform.indexOf("iPad")!=-1)?true:false;var m=(k||o)?true:false;var c=(e.indexOf("android")!=-1)||(!m&&!a&&!j&&i&&d)?true:false;var h=e.indexOf("msie 6")>-1&&!newIE();var f=(e.indexOf("msie 7")>-1)&&!newIE();if(h|f){document.location.replace("oldiewarning.html");return null}else{if(b&&!(a||d||i||m||c||j||l)){return"desktop"}else{if(b&&!o){if(mobRe.smart!=""){document.location.replace(mobRe.smart)}else{document.location.replace("nomobilewarning.html")}}else{if(o){if(mobRe.ipad!=""){document.location.replace(mobRe.ipad)}else{return"iPad"}}else{if(a){return"oldMobile"}else{if(c){return"Android"}else{if(k){return"iPhone"}else{return"desktop"}}}}}}}}var doCookies={setCookie:function(c,d,e){if(e){var b=new Date();b.setTime(b.getTime()+(e*24*60*60*1000));var a="; expires="+b.toGMTString()}else{var a=""}document.cookie=c+"="+d+a+"; path=/"},getCookie:function(b){var e=b+"=";var a=document.cookie.split(";");for(var d=0;d<a.length;d++){var f=a[d];while(f.charAt(0)==" "){f=f.substring(1,f.length)}if(f.indexOf(e)==0){return f.substring(e.length,f.length)}}return null},deleteCookie:function(a){setCookie(a,"",-1)}};function openWindow(c,a,b){this.win=c;this.tabID=a;this.liID=a.replace(/(.*?)Link$/mg,"li$1");this.tool=b}var hmTabSlider={sliderWidth:0,currentTab:0,navTabs:[],userTabs:[],visibleTabs:[],tabsNum:0,isMaxPos:false,canBounce:true,updateSlider:function(){var d=0;var c=hmTabSlider.navTabs.length;if(c>0){hmTabSlider.navTabs.splice(0,c);hmTabSlider.visibleTabs.splice(0,c)}$("ul#tabsList").html("");hmTabSlider.sliderWidth=0;hmTabSlider.navTabs.push(hmTabSlider.sliderWidth);$("ul#topictabs a").each(function(e){$(this).parent("li").attr("tabnum",e);if($(this).is(":visible")){hmTabSlider.sliderWidth+=$(this).parent("li").outerWidth(true);hmTabSlider.navTabs.push(hmTabSlider.sliderWidth);hmTabSlider.visibleTabs.push(e)}});var b="";for(var a=0;a<hmTabSlider.visibleTabs.length;a++){b=b+"index "+a+": "+hmTabSlider.visibleTabs[a]+" - "+hmTabSlider.navTabs[a]+"\n"}hmTabSlider.sliderWidth+=2;$("ul.tabs a").each(function(e){var f=e==0?hminfo.currtopic+":&nbsp;"+$(this).attr("data"):(e==1||e==2)?$(this).text():$(this).attr("data");if($(this).is(":visible")){$("ul#tabsList").append("<li><a id='tabList"+e+"' href='#' onclick='hmTabSlider.goToTab("+e+",true)'>"+f+"</a></li>")}});$("div#hmtabslider").css("width",hmTabSlider.sliderWidth+"px");c=hmTabSlider.tabsNum;if(c>0){hmTabSlider.userTabs.splice(0,c)}$("ul.tabs a").each(function(e){hmTabSlider.userTabs[($(this).attr("id"))]=e;hmTabSlider.tabsNum=e});hmTabSlider.hiTabMenu()},hiTabMenu:function(){var b=true;try{hmWebHelp.mainWin.tVars!=null}catch(a){b=false}if(b||hmWebHelp.tabsapi.getIndex()>0){hmWebHelp.togTogCheck()}$("ul.tabs a").each(function(d){var e=$(this).attr("class")?$(this).attr("class"):"";if(e&&e.indexOf("current")>-1){$("ul#tabsList a[id='tabList"+d+"']").css("font-weight","bold");if(d>0){hmWebHelp.activePage=$(this).parent("li").attr("hpage")}}else{if($("ul#tabsList a").length>0){$("ul#tabsList a[id='tabList"+d+"']").css("font-weight","normal")}}})},maxTab:function(){var b=hmTabSlider.sliderWidth-$("div#hmtabswindow").innerWidth();var a;for(var c=0;c<hmTabSlider.navTabs.length;c++){if(hmTabSlider.navTabs[c]<b){a=c}}a=parseInt(a)+2;a=$("ul.tabs a").not(":hidden").length-1>a?a:$("ul.tabs a").not(":hidden").length-1;return a},maxTarget:function(b){var a=hmTabSlider.maxTab()-1;var c=0;if(b<a){c=hmTabSlider.navTabs[b];hmTabSlider.isMaxPos=false}else{c=(hmTabSlider.sliderWidth-$("div#hmtabswindow").innerWidth());hmTabSlider.isMaxPos=true}return c},getCurrentTab:function(){var c=$("div#hmtabslider").position();c=c.left;if(c!=0){c=-c}var a=0;for(var b=0;b<hmTabSlider.navTabs.length;b++){if(hmTabSlider.navTabs[b]>c){break}a=parseInt(b)}return a},moveSlider:function(a){a=a===0?0:-a;$("div#hmtabslider").animate({left:a},550,"easeOutBack",function(){})},bounceSlider:function(b){var d,c,a;if(hmTabSlider.canBounce){hmTabSlider.canBounce=false;d=$("div#hmtabslider").position();c=d.left-10;a=d.left;if(b=="right"){c=d.left+10}$("div#hmtabslider").animate({left:c},100,"easeOutBack",function(){$("div#hmtabslider").animate({left:a},100,"easeOutBack",function(){setTimeout(function(){hmTabSlider.canBounce=true},300)})})}},updateToolbar:function(a){if(a===0&&!hmWebHelp.external){hmWebHelp.enableTool("newtab",true);hmWebHelp.enableTool("undock",false);hmWebHelp.enableTool("perma",true)}else{if(a===0&&hmWebHelp.external){hmWebHelp.enableTool("newtab",false);hmWebHelp.enableTool("undock",false);hmWebHelp.enableTool("perma",false);hmWebHelp.enableTool("feedback",false);hmWebHelp.enableTool("printer",false);hmWebHelp.enableTool("togtog",false)}else{if(a>0&&a<3){hmWebHelp.enableTool("newtab",false);hmWebHelp.enableTool("undock",true);hmWebHelp.enableTool("perma",false);hmWebHelp.enableTool("printer",false);hmWebHelp.enableTool("feedback",false)}else{hmWebHelp.enableTool("newtab",false);hmWebHelp.enableTool("undock",true);hmWebHelp.enableTool("perma",true);hmWebHelp.enableTool("printer",true);hmWebHelp.enableTool("feedback",true)}}}},goToTab:function(a,b){var c=$("div#hmtabslider").position();if(hmTabSlider.sliderWidth>$("div#hmtabswindow").innerWidth()){hmTabSlider.moveSlider(hmTabSlider.maxTarget(a))}else{if(hmTabSlider.sliderWidth<$("div#hmtabswindow").innerWidth()&&c.left<0){hmTabSlider.moveSlider(0);setTimeout(function(){hmTabSlider.goToTab(a,b)},600)}}if(b){hmWebHelp.tabsapi.click(a);hmTabSlider.updateToolbar(a);hmTabSlider.hiTabMenu()}},hideMenu:function(){if($("div#tabsMenu").is(":visible")){$("div#tabsMenu").slideUp("fast");$("div#unclicker").unbind("click.tabmenu")}},togTabMenu:function(){if($("div#tabsMenu").is(":hidden")){$("div#tabsMenu").slideDown("fast")}else{$("div#tabsMenu").slideUp("fast");$("div#unclicker").unbind("click.tabmenu")}},alignTab:function(d){var f=$("div#hmtabslider").position();var c=$("div#hmtabswindow").innerWidth();var a=$("div#hmtabslider").innerWidth()-2;var b=hmTabSlider.navTabs[d];var e=hmTabSlider.navTabs[hmTabSlider.visibleTabs[d+1]];if(!e){e=$("div#hmtabswindow").innerWidth()}if(((c-f.left)>=e)||(b<-f.left)){hmTabSlider.goToTab(d,true)}},nextValidTab:function(d,c){var b=d;var a=hmTabSlider.tabsNum;if(c){while(!$("ul#topictabs li[tabnum='"+d+"']").is(":visible")&&d<a){d++}}else{while(!$("ul#topictabs li[tabnum='"+d+"']").is(":visible")&&d>0){d--}}if(!$("ul#topictabs li[tabnum='"+d+"']").is(":visible")||d>a||d<0){d=b-1}if(d<0){d=0}if(d>a){d=a}return d},incrToVisible:function(e,d){var a=hmTabSlider.tabsNum;var c=hmWebHelp.tabsapi.getIndex();var b=d?"left":"right";e=hmTabSlider.nextValidTab(e,d);if(e<=a&&e>-1&&e!=c){hmTabSlider.goToTab(e,true)}else{hmTabSlider.bounceSlider(b)}},initTabControls:function(){$("img#tabRight").click(function(a){hmTabSlider.incrToVisible(hmWebHelp.tabsapi.getIndex()+1,true)});$("img#tabLeft").click(function(a){hmTabSlider.incrToVisible(hmWebHelp.tabsapi.getIndex()-1,false)})}};var hmWebHelp={tabsapi:{},openTabs:[],openWindows:[],dockChecker:null,currentPage:"",activePage:"",currentPageStyle:"",tabFile:"",isNewTab:false,external:false,qSearch:true,searchArgs:"",searchReturnArgs:"",navWidth:hmnavpages.tocWidth>=180?hmnavpages.tocWidth:180,navHidden:false,server:false,browser:"desktop",tocDoc:0,tocWin:0,idxDoc:0,idxWin:0,schDoc:0,mainDoc:0,mainWin:0,hmWebHelpReady:false,hmTopicLoaded:false,hmWebHelpPage:(function(){var a=document.location.href;a=a.substring(0,(a.indexOf("#")==-1)?a.length:a.indexOf("#"));a=a.substring(0,(a.indexOf("?")==-1)?a.length:a.indexOf("?"));a=a.substring(a.lastIndexOf("/")+1,a.length);return a})(),parseUrl:function(f,a){hmLayout.startTab=0;hmLayout.hmIndexArg="";hmLayout.hmSearchArg="";if(f.length>2){var d=/(\?|&)([^&?:\/]+?(\.htm[l]?|\.php[\d]?|\.asp))/;var b=d.exec(f);if(b!=null){document.getElementById("hmcontent").src=b[2]+a}var e=/(\?|&)([^&?]?(nav=index|nav=search|nav=toc))/;var b=e.exec(f);if(b!=null){var h=b[2];if(h=="nav=index"){hmLayout.startTab=1}else{if(h=="nav=search"){hmLayout.startTab=2}}}var c=/(\?|&)([^&?]?search=([^&?]+))/;var b=c.exec(f);if(b!=null){hmLayout.hmSearchArg=decodeURIComponent(b[3]);hmLayout.startTab=2}var g=/(\?|&)([^&?]?index=([^&?]+))/;var b=g.exec(f);if(b!=null){hmLayout.hmIndexArg=decodeURIComponent(b[3]);hmLayout.startTab=1}}},setFrameDoc:function(b,c){var d=document.getElementById(b);var a=setInterval(function(){try{if($("body",d.contentWindow.document).html()){clearInterval(a);switch(b){case"hmnavigation":hmWebHelp.tocDoc=d.contentWindow.document;hmWebHelp.tocWin=d.contentWindow;break;case"hmcontent":hmWebHelp.mainDoc=d.contentWindow.document;hmWebHelp.mainWin=d.contentWindow;break;case"hmindex":hmWebHelp.idxDoc=d.contentWindow.document;hmWebHelp.idxWin=d.contentWindow;break;case"hmsearchframe":hmWebHelp.schDoc=d.contentWindow.document;break;default:alert("no such framedoc found")}}}catch(e){clearInterval(a);document.location.replace(c)}},100)},printTopic:function(a){a+="?toc=0&printWindow";window.open(a,"","toolbar=1,scrollbars=1,location=0,status=1,menubar=1,titlebar=1,resizable=1")},maxZindex:function(){var a=document.getElementsByTagName?document.getElementsByTagName("*"):document.all;return a.length},currentFrameID:function(){var b="";var a=$(hmWebHelp.tabsapi.getCurrentTab()).parent().find("a").attr("id");switch(a){case"topictablink":b="hmcontent";break;case"indextablink":b=null;break;case"searchtablink":b=null;break;default:b=a.replace("Link","Frame")}return b},togTogCheck:function(){var b=hmWebHelp.currentFrameID();if(!b){hmWebHelp.enableTool("togtog",false);hmWebHelp.enableTool("feedback",false);hmWebHelp.enableTool("printer",false);return false}var a=document.getElementById(b).contentWindow.HMToggles;if(a&&a.length>0){hmWebHelp.enableTool("togtog",true)}else{hmWebHelp.enableTool("togtog",false)}if(b){hmWebHelp.enableTool("feedback",true);hmWebHelp.enableTool("printer",true)}},toggleToggles:function(){var a=hmWebHelp.currentFrameID();if(!a){return false}else{document.getElementById(a).contentWindow.toggleToggles()}},clipTitle:function(d,b){d=trimString(d);d=d.replace(/((\s|&nbsp;)+)/ig," ");var c=d;var f=b;var e=0;var a="";if(d.length>b){c=d.substr(0,b);d=d+" ";do{f++;c=d.substr(0,f)}while(c.substr(c.length-1,1)!=" ");c=trimString(c);d=trimString(d);e=f-b;a=trimString(d.substr(c.lastIndexOf(" ")));a=trimString(a.substr(0,a.indexOf(" ")));if(e<5){return trimString(d.substr(0,trimString(c).lastIndexOf(" ")+a.length+1))+"&hellip;"}else{return trimString(d.substr(0,trimString(c).lastIndexOf(" ")))+"&hellip;"}}else{return d}},deSelect:function(){if(window.getSelection){window.getSelection().removeAllRanges()}else{if(document.selection){document.selection.empty()}}return false},resizeNav:function(f,d){hmWebHelp.deSelect();if($("img#navshowhide").offset().left>100){var c=(!document.all&&!window.opera)?f.clientX-d:event.clientX-d;var a=hmWebHelp.navWidth+c<180?180:hmWebHelp.navWidth+c;var b=a+17;$("div#hmnavbox").css("width",a+"px");$("div#hmtopicpane").css("left",(b)+"px")}},unQuot:function(a){a=a.replace(/&gt;/g,">");a=a.replace(/&lt;/g,"<");a=a.replace(/&quot;/g,'"');a=a.replace(/&amp;/g,"&");a=escape(a);a=a.replace(/%E2|%E0|%E5|%E1|%E3/g,"a");a=a.replace(/%C5|%C0|%C1|%C2|%C3/g,"A");a=a.replace(/%C7/g,"C");a=a.replace(/%E7/g,"c");a=a.replace(/%E9|%EA|%EB|%E8/g,"e");a=a.replace(/%C9|%CA|%C8|%CB/g,"E");a=a.replace(/%u0192/g,"f");a=a.replace(/%EF|%EE|%EC|%ED/g,"i");a=a.replace(/%CF|%CD|%CE|%CC/g,"I");a=a.replace(/%F1/g,"n");a=a.replace(/%D1/g,"N");a=a.replace(/%F4|%F2|%F3|%F5|%F8/g,"o");a=a.replace(/%D4|%D2|%D3|%D5|%D8/g,"O");a=a.replace(/%u0161/g,"s");a=a.replace(/%u0160/g,"S");a=a.replace(/%FB|%FA|%F9/g,"u");a=a.replace(/%DB|%DA|%D9/g,"U");a=a.replace(/%FF|%FD/g,"y");a=a.replace(/%DD|%u0178/g,"Y");a=a.replace(/%FC/g,"ue");a=a.replace(/%DC/g,"Ue");a=a.replace(/%E4|%E6/g,"ae");a=a.replace(/%C4|%C6/g,"Ae");a=a.replace(/%F6|%u0153/g,"oe");a=a.replace(/%D6/g,"Oe");a=a.replace(/%DF/g,"ss");return(a)},mailFB:function(b){var e=hmWebHelp.currentFrameID();if(!e){return false}e=document.getElementById(e).contentWindow;var f=hmWebHelp.unQuot(e.tVars.mailsubject);var a=hmWebHelp.unQuot(e.tVars.mailpath);var d=hmWebHelp.unQuot(e.tVars.mailbody);var g=hmWebHelp.unQuot(e.tVars.mailid);if(!b){var i="mailto:"+escape(e.tVars.mailrecipient)+"?subject="+f;var h="&body=Ref:%20"+a+"%20ID:%20"+g+"%0A%0D%0A%0D"+d+"%0A%0D%0A%0D"}else{var i="mailto:"+escape(e.tVars.simplerecipient)+"?subject="+e.tVars.simplesubject;var h="&body=Ref-ID:%20"+g+"%0A%0D%0A%0D"}var c=i+h;document.location.href=c},hmInit:function(){hmWebHelp.parseUrl(document.location.search,document.location.hash);$("body").prepend('<div id="unclicker"></div>');$("div#hmnavbox").css("width",hmWebHelp.navWidth+"px");$("div#hmtopicpane").css("left",(hmWebHelp.navWidth+17)+"px");if(hmpldata.show&&hmWebHelp.browser!="iPad"){$("body").prepend('<div id="permalink" class="popups"><table cellspacing="3" cellpadding="0" width="400" height="50"><tr><td align="left"><div id="permalink_box" style="position:relative">&nbsp;<input type="button" id="selectPermalink" value="'+hmpldata.select+'" /></div></td><td align="center"><input type="button" id="bookmarkPermalink" value="'+hmpldata.bookmark+'" onClick="doPermalink(\'bookmark\')" /></td><td align="right"><input type="button" id="closePermalink" value="'+hmpldata.close+'" onClick="doPermalink(\'close\')" /></td></tr><tr id="offlinemessage"><td colspan="3" align="center"> <p>'+hmpldata.manualcopy+'</p></td></tr><tr><td colspan="3" align="center"> <textarea id="plinkBox" readonly="readonly"></textarea></td></tr></table></div>');$("td#topicNavTD").prepend('<div class="naviconboxR"><span id="navicon_perma" onclick="doPermalink(hmnavpages.top);"><img id="perma_on" class="navicon" src="permalink.png" alt="'+hmpldata.copy+'" title="'+hmpldata.copy+'"/></span><img id="perma_off" src="permalinkoff.png" /><br /><span id="permaText" class="navtextOn">Permalink</span></div>')}$("input[id*='Permalink']").css("cursor","pointer");$("div#hmnavbox").prepend('<div id="hmdragdivider" /><div id="hmnavhandle"><a href="javascript: void(0);" onclick="hmWebHelp.showHideNav()"><img src="nav_close.png" id="navshowhide" alt="'+hminfo.hidenav+'" title="'+hminfo.hidenav+'" border="0"/></a></div>');$("div#hmtopicbox").append('<div id="hmindexbox"><iframe name="hmindex" id="hmindex" class="scrollpane" src="'+hmnavpages.idx+'" title="Index Tab" height="100%" width="100%" frameborder="0" scrolling="auto" /></iframe></div><div id="hmsearchbox"><iframe name="hmsearchframe" id="hmsearchframe" class="scrollpane" src="'+hmnavpages.sch+'" title="Search Tab" height="100%" width="100%" frameborder="0" scrolling="auto" /></iframe>');$("#hmnavbox").css("margin-top",(parseInt($("#hmnavbox").css("margin-top")))+8+"px");$("#hmtopicpane").css("margin-top",(parseInt($("#hmtopicpane").css("margin-top")))+8+"px");if(hmnavpages.idx==""){$("li#indextab").hide()}if(hmnavpages.sch==""){$("li#searchtab").hide()}$("ul.tabs").tabs("div#hmtopicbox > div");hmWebHelp.tabsapi=$("ul.tabs").data("tabs");$("div#hmdragdivider").mousedown(function(d){if(!hmWebHelp.navHidden){var c=(!document.all&&!window.opera)?d.clientX:event.clientX;$("div#unclicker").show().css("cursor","col-resize");$("div#unclicker").bind("mousemove",function(f){hmWebHelp.resizeNav(f,c)}).bind("mouseup",function(){$("div#unclicker").hide().css("cursor","default");hmWebHelp.navWidth=parseInt($("div#hmnavbox").css("width"),10);$(this).unbind("mousemove");$(this).unbind("mouseup")})}});$("img.navicon").mouseover(function(){$(this).toggleClass("navicon naviconH")}).mouseout(function(){$(this).toggleClass("navicon naviconH")});$("ul#topictabs").on("mouseenter","li.hmtabs:not(has:(a[class='current']))",function(){$(this).find("a,span").not("[class='current']").addClass("hover");$(this).find("img.closetab").show()});$("ul#topictabs").on("mouseleave","li.hmtabs:not(has:(a[class='current']))",function(){$(this).find("a,span").not("[class='current']").removeClass("hover");$(this).find("img.closetab").hide()});$("li#indextab  img.closetab, li#searchtab  img.closetab").mouseover(function(){$(this).css("cursor","pointer").attr("src","closetabon.png")}).mouseout(function(){$(this).attr("src","closetaboff.png")}).click(function(){$(this).parent().hide();hmTabSlider.updateSlider();if($(this).parent().has("a.current").length>0){hmWebHelp.tabsapi.click(0);hmTabSlider.hiTabMenu();hmWebHelp.enableTool("newtab",true);hmWebHelp.enableTool("undock",false)}});hmWebHelp.enableTool("undock",false);$("input#searchinput").keyup(function(c){if(c.keyCode==13&&$("input#searchinput").val().length>0&&hmWebHelp.qSearch){hmWebHelp.remoteSearch()}});$("li.hmtabs").not("li#topictab").click(function(){if(hmWebHelp.tabsapi.getIndex()!=0){hmWebHelp.enableTool("newtab",false);hmWebHelp.enableTool("undock",true);hmTabSlider.hiTabMenu();hmTabSlider.alignTab(hmWebHelp.tabsapi.getIndex())}});$("li#topictab").click(function(){hmWebHelp.enableTool("newtab",true);hmWebHelp.enableTool("undock",false);hmTabSlider.hiTabMenu();hmTabSlider.alignTab(hmWebHelp.tabsapi.getIndex())});$("li#indextab").click(function(){setTimeout(function(){hmWebHelp.idxWin.nsHeader()},100)});$("img.tabPlayer").mouseover(function(){$(this).toggleClass("tabPlayer tabPlayerH")}).mouseout(function(){$(this).toggleClass("tabPlayerH tabPlayer")});$("img#toggleTabMenu").bind("click",function(c){c.stopPropagation();hmTabSlider.togTabMenu();if($("div#tabsMenu").is(":visible")){$("div#unclicker").show().bind("click.tabmenu",function(){$("div#tabsMenu").slideUp("fast");$(this).hide().unbind("click.tabmenu")})}});if(document.all&&!window.opera){$("iframe#hmcontent").attr("src",$("iframe#hmcontent").attr("src"))}hmWebHelp.setFrameDoc("hmnavigation",hmnavpages.toc);hmWebHelp.setFrameDoc("hmcontent",hmnavpages.def);hmWebHelp.setFrameDoc("hmindex",hmnavpages.idx);hmWebHelp.setFrameDoc("hmsearchframe",hmnavpages.sch);var a=0;var b=setInterval(function(){if(hmWebHelp.tocDoc!=0&&hmWebHelp.idxDoc!=0&&hmWebHelp.schDoc!=0&&hmWebHelp.mainDoc!=0){clearInterval(b);hmWebHelp.hmWebHelpReady=true;hmWebHelp.currentPageStyle=$("link#colorscheme").attr("href")}else{a++}},100);$("li.hmtabs, li.hmtabs a").disableTextSelect();if(/^https??:\/\//im.test(document.location)&&hmpldata.show){hmWebHelp.server=true;$.getScript("ZeroClipboard.js",function(){initClipboard()})}else{if(hmpldata.show){$("input#selectPermalink").bind("click",function(){doPermalink("alert")})}}$("div#hmtoolbar").css("min-width","770px");hmWebHelp.initBanner(0,true);document.onselectstart=function(){return false};$("#hmcontent").bind("load",function(){var c,g,f;var d=hmWebHelp.external;f=document.location.href;f=f.substr(0,f.lastIndexOf("/"));try{c=this.contentDocument.location.href;if(c){if(hmWebHelp.external){g=hmWebHelp.external}else{g=c.substr(c.lastIndexOf("/")+1);c=c.substr(0,c.lastIndexOf("/"));if(this.contentWindow.tVars!=null){hmWebHelp.external=false}else{hmWebHelp.external=$("a[href$='"+g+"']",hmWebHelp.tocDoc).attr("href")}}}}catch(e){if(!hmWebHelp.external){hmWebHelp.external=hminfo.webfile}}if(d&&!hmWebHelp.external&&g){lazysync(g);hmWebHelp.external=false;hmTabSlider.goToTab(0,true)}else{if(hmWebHelp.external&&g){f=$("a[href='"+hmWebHelp.external+"']",hmWebHelp.tocDoc).children("span").text();$("a#topictablink",parent.document).html("<span>"+f+"</span>");lazysync(hmWebHelp.external);hmTabSlider.goToTab(0,true);hmWebHelp.external=false}else{if(hmWebHelp.external&&!g){if(!/^http/.test(hmWebHelp.external)){$("a#topictablink",parent.document).html("<span>"+hmWebHelp.external+"</span>");$("span[class^='hilight']",hmWebHelp.tocDoc).each(function(){var h=$(this).attr("class");h=h.substr(h.length-1);$(this).attr("class","heading"+h)})}hmTabSlider.goToTab(0,true);hmWebHelp.external=false}}}})},initHeadMenu:function(){$("ul.topnav li ul.subnav").css("top",$($("ul.topnav")[0]).height()+"px");$("ul.topnav li").hover(function(){$(this).find("ul.subnav").slideDown("fast")},function(){$(this).find("ul.subnav").hide()});hmLayout.menuInit=true},initBanner:function(a,e){hmLayout.banner=$("div#hmbanner").length>0;if(!a){a=0}if(!hmLayout.menuInit&&hmLayout.banner){hmWebHelp.initHeadMenu()}var b=$("#hmtabscontrols").height();var d=$("div#hmbanner").is(":hidden");var c=$("div#hmtoolbar").outerHeight();if((d||e)&&hmLayout.banner){c+=$("div#hmbanner").outerHeight()-5}if(!hmLayout.banner){$("div#hmtoolbar").toggleClass("bannerToolbar compactToolbar")}$("div#hmnavbox").animate({top:c},a);$("div#hmtopicpane").animate({top:c+b-5},a)},toggleBanner:function(a){if(!hmLayout.banner){return}var c=$("#hmtabscontrols").height();var d=$("div#hmbanner").is(":hidden");var b=$("div#hmtoolbar").outerHeight();if(d){b+=$("div#hmbanner").outerHeight()-5;$("ul.topnav").show()}else{$("ul.topnav").hide()}$("div#hmtoolbar").toggleClass("bannerToolbar compactToolbar");hmWebHelp.initBanner(hmLayout.bannerSpeed,false);$("div#hmbanner").slideToggle(hmLayout.bannerSpeed)},showHideNav:function(){var a=-(hmWebHelp.navWidth-5)+"";var b=hmWebHelp.navWidth+17+"";if(parseInt($("div#hmnavbox").css("left"),10)===0){$("div#hmtocbody",hmWebHelp.tocDoc).css("overflow","hidden");$("div#hmdragdivider").css("cursor","default");$("div#hmnavbox").animate({left:a},400,function(){});$("div#hmtopicpane").animate({left:"22"},400,function(){$("img#navshowhide").attr({alt:hminfo.shownav,title:hminfo.shownav,src:"nav_open.png"})});hmWebHelp.navHidden=true}else{$("div#hmdragdivider").css("cursor","col-resize");$("div#hmtocbody",hmWebHelp.tocDoc).css("overflow","auto");$("div#hmnavbox").animate({left:"0"},400,function(){});$("div#hmtopicpane").animate({left:b},400,function(){$("img#navshowhide").attr({alt:hminfo.hidenav,title:hminfo.hidenav,src:"nav_close.png"})});hmWebHelp.navHidden=false}},newTab:function(){var c=hmWebHelp.currentPage.substr(0,hmWebHelp.currentPage.lastIndexOf("."));var b=c+"Div";var a=c+"Frame";var d=c+"Link";if($.inArray(c,hmWebHelp.openTabs)>-1){alert(hminfo.tabopen);return}hmWebHelp.isNewTab=true;hmWebHelp.openTabs.push(c);hmWebHelp.tabsapi.destroy();$("li#searchtab").after('<li class="hmtabs" id="'+c+'" hpage="'+hmWebHelp.currentPage+'" ondblclick="hmWebHelp.undockTab()" style="visibility: hidden;"><img class="closetab" src="closetaboff.png" alt="'+hminfo.tabclose+'" title="'+hminfo.tabclose+'"/><a href="#" id="'+d+'"><span>-</span></a></li>');$("div#hmsearchbox").after('<div class="hmnewtabbox" id="'+b+'"><iframe name="'+a+'" id="'+a+'" class="scrollpane" src="'+hmWebHelp.currentPage+'" title="New Tab" height="100%" width="100%" frameborder="0" scrolling="auto" /></iframe></div>');$("ul.tabs").tabs("div#hmtopicbox > div");hmWebHelp.tabsapi=$("ul.tabs").data("tabs");hmWebHelp.initTab($("li#"+c+""),b,c);$("li#"+c+",li#"+c+" a").disableTextSelect();hmWebHelp.tabsapi.click(3);setTimeout(function(){$("li#"+c+"").css("visibility","visible")},200)},enableTool:function(a,b){if(b){$("img#"+a+"_on").show();$("img#"+a+"_off").hide();$("span#"+a+"Text").removeClass("navtextOff")}else{$("img#"+a+"_on").hide();$("img#"+a+"_off").show();$("span#"+a+"Text").addClass("navtextOff")}},initTab:function(a,c,b){$(a).click(function(){hmWebHelp.enableTool("newtab",false);hmWebHelp.enableTool("undock",true);hmTabSlider.hiTabMenu();hmTabSlider.alignTab(hmWebHelp.tabsapi.getIndex());hmWebHelp.activePage=$(this).attr("hpage")});$("img.closetab",a).mouseover(function(){$(this).css("cursor","pointer").attr("src","closetabon.png")}).mouseout(function(){$(this).attr("src","closetaboff.png")}).click(function(){var e=0;if($(this).parent().has("a.current").length>0){e=hmWebHelp.tabsapi.getIndex()-1;e=e<3?0:e}else{e=hmWebHelp.tabsapi.getIndex();var d=$(this).siblings("a").attr("id");if(hmTabSlider.userTabs[d]<e){e--}}hmWebHelp.killTab($(this).parent(),c,b,e)})},killTab:function(c,a,d,b){hmWebHelp.tabsapi.destroy();$(c).remove();$("div#"+a).remove();hmWebHelp.openTabs.splice(hmWebHelp.openTabs.indexOf(d),1);$("ul.tabs").tabs("div#hmtopicbox > div");hmWebHelp.tabsapi=$("ul.tabs").data("tabs");hmTabSlider.updateSlider();hmWebHelp.tabsapi.click(b);hmTabSlider.hiTabMenu();if(b==0){hmWebHelp.enableTool("newtab",true)}},windowPoller:function(){var c;if(hmWebHelp.openWindows.length>0){for(var b=0;b<hmWebHelp.openWindows.length;b++){c=hmWebHelp.openWindows[b].win;if(!c||c.closed){var a=hmWebHelp.openWindows[b].tool;$(hmWebHelp.openWindows[b].liID).show();$(hmWebHelp.openWindows[b].tabID).show();if(a!="topic"){hmWebHelp.enableTool(a,true);if(a=="search"){$("#hmsearchframe").contents().find("input#zoom_searchbox").val(hmWebHelp.searchReturnArgs);$("#hmsearchframe").contents().find("form").submit();hmWebHelp.tabsapi.click(2);hmTabSlider.updateToolbar(2)}else{if(a=="index"){hmWebHelp.tabsapi.click(1);hmTabSlider.updateToolbar(1)}}}window.focus();setTimeout(function(){hmTabSlider.updateSlider()},300);hmWebHelp.openWindows.splice(b,1);break}}}else{window.clearInterval(hmWebHelp.dockChecker);hmWebHelp.dockChecker=null}},getCurTabDoc:function(b){var c=hmWebHelp.tabsapi.getIndex();if(c>0&&c<3){var a="hmcontent"}else{var a=hmWebHelp.tabsapi.getCurrentTab().attr("id").replace("Link","Frame");if(a=="topictablink"){a="hmcontent"}}if(b=="window"){return document.getElementById(a).contentWindow.window}else{return document.getElementById(a).contentWindow.document}},undockTab:function(){var c=hmWebHelp.tabsapi.getIndex();if(c==0){alert(hminfo.noundock);return}var e=c==1?"index":c==2?"search":"topic";var b="#"+hmWebHelp.tabsapi.getCurrentTab().attr("id");var a;hmWebHelp.tabsapi.click(0);hmWebHelp.activePage=hmWebHelp.currentPage;if(c<3){hmWebHelp.enableTool(e,false)}hmWebHelp.enableTool("newtab",true);$(b).hide();$(b.replace(/(.*?)Link$/mg,"li$1")).hide();$(b).siblings("img.closetab").hide();var d=$("div#hmcontentbox").width();var i=$("div#hmcontentbox").height();if(c==2){hmWebHelp.searchArgs=$("#hmsearchframe").contents().find("input#zoom_searchbox").val();a=window.open(hmnavpages.sch,"hmsearchwindow","toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,titlebar=0,resizable=1,width="+d+",height="+i+"")}else{if(c==1){a=window.open(hmnavpages.idx,"hmindexwindow","toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,titlebar=0,resizable=1,width="+d+",height="+i+"")}else{if(c>2){var g=b.replace(/(.*?)Link$/mg,"iframe$1Frame");var f=$(g).attr("src")+"?toc=0";var h=b.replace(/#(.*?)Link$/mg,"$1Window");a=window.open(f,h,"toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,titlebar=0,resizable=1,width="+d+",height="+i+"")}}}hmWebHelp.enableTool("undock",false);hmWebHelp.openWindows.push(new openWindow(a,b,e));a.focus();if(hmWebHelp.openWindows.length===1){hmWebHelp.dockChecker=setInterval(function(){hmWebHelp.windowPoller()},200)}hmTabSlider.updateSlider()},topicsPane:function(){hmWebHelp.enableTool("newtab",true);hmWebHelp.enableTool("undock",false);hmWebHelp.tabsapi.click(0);hmTabSlider.updateSlider();hmWebHelp.activePage=hmWebHelp.currentPage},userFeedback:function(){feedbackwindow=window.open("feedback.php","hmfeedbackwindow","toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,titlebar=0,resizable=1,width=500,height=600")},indexPane:function(){$("li#indextab").show().parent().show();hmWebHelp.enableTool("newtab",false);hmWebHelp.enableTool("undock",true);hmWebHelp.tabsapi.click(1);setTimeout(function(){hmWebHelp.idxWin.nsHeader()},100);hmTabSlider.updateSlider();hmWebHelp.activePage="index"},searchPane:function(){$("li#searchtab").show().parent().show();hmWebHelp.enableTool("newtab",false);hmWebHelp.enableTool("undock",true);hmWebHelp.tabsapi.click(2);hmTabSlider.updateSlider();hmWebHelp.activePage="search"},remoteSearch:function(){var a=$("input#searchinput").val();$("li#searchtab").show("fast");hmWebHelp.tabsapi.click(2);hmWebHelp.activePage="search";hmWebHelp.enableTool("newtab",false);hmWebHelp.enableTool("undock",true);$("#hmsearchframe").contents().find("input#zoom_searchbox").val(a);$("#hmsearchframe").contents().find("form").submit()},supportsStorage:function(){return("localStorage" in window)&&window.localStorage!==null}};hmWebHelp.browser=browserPlatform(true);if(doCookies.getCookie("hmskin")){$("link#colorscheme").attr("href",doCookies.getCookie("hmskin"))}if(location.href.lastIndexOf("?")>0){target=location.href.substring(location.href.lastIndexOf("?")+1,location.href.length).replace(/:/g,"");hmnavpages.def=target}$(document).ready(function(){hmWebHelp.hmInit();hmTabSlider.initTabControls()});