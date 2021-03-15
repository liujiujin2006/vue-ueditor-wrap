!function(t){var e,n=t.Chart,o=t.addEvent,i=t.removeEvent,r=t.createElement,a=t.discardElement,s=t.css,l=t.merge,p=t.each,c=t.extend,h=Math.max,u=document,d=window,m=t.isTouchDevice,g=t.Renderer.prototype.symbols,x=t.getOptions();c(x.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"}),x.navigation={menuStyle:{border:"1px solid #A0A0A0",background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:m?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}},x.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}},t.post=function(t,e){var n,o;for(n in o=r("form",{method:"post",action:t,enctype:"multipart/form-data"},{display:"none"},u.body),e)r("input",{type:"hidden",name:n,value:e[n]},null,o);o.submit(),a(o)},c(n.prototype,{getSVG:function(e){var n,o,i,s,h=this,d=l(h.options,e);return u.createElementNS||(u.createElementNS=function(t,e){return u.createElement(e)}),e=r("div",null,{position:"absolute",top:"-9999em",width:h.chartWidth+"px",height:h.chartHeight+"px"},u.body),o=h.renderTo.style.width,s=h.renderTo.style.height,o=d.exporting.sourceWidth||d.chart.width||/px$/.test(o)&&parseInt(o,10)||600,s=d.exporting.sourceHeight||d.chart.height||/px$/.test(s)&&parseInt(s,10)||400,c(d.chart,{animation:!1,renderTo:e,forExport:!0,width:o,height:s}),d.exporting.enabled=!1,d.series=[],p(h.series,(function(t){(i=l(t.options,{animation:!1,showCheckbox:!1,visible:t.visible})).isInternal||d.series.push(i)})),n=new t.Chart(d,h.callback),p(["xAxis","yAxis"],(function(t){p(h[t],(function(e,o){var i=n[t][o],r=(a=e.getExtremes()).userMin,a=a.userMax;i&&(void 0!==r||void 0!==a)&&i.setExtremes(r,a,!0,!1)}))})),o=n.container.innerHTML,d=null,n.destroy(),a(e),(o=o.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/&nbsp;/g," ").replace(/&shy;/g,"­").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,(function(t){return t.toLowerCase()}))).replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},exportChart:function(e,n){e=e||{};var o=this.options.exporting;o=this.getSVG(l({chart:{borderRadius:0}},o.chartOptions,n,{exporting:{sourceWidth:e.sourceWidth||o.sourceWidth,sourceHeight:e.sourceHeight||o.sourceHeight}})),e=l(this.options.exporting,e),t.post(e.url,{filename:e.filename||"chart",type:e.type,width:e.width||0,scale:e.scale||2,svg:o})},print:function(){var t=this,e=t.container,n=[],o=e.parentNode,i=u.body,r=i.childNodes;t.isPrinting||(t.isPrinting=!0,p(r,(function(t,e){1===t.nodeType&&(n[e]=t.style.display,t.style.display="none")})),i.appendChild(e),d.focus(),d.print(),setTimeout((function(){o.appendChild(e),p(r,(function(t,e){1===t.nodeType&&(t.style.display=n[e])})),t.isPrinting=!1}),1e3))},contextMenu:function(t,e,n,i,a,l,u){var d,m,g,x=this,y=x.options.navigation,f=y.menuItemStyle,b=x.chartWidth,v=x.chartHeight,w="cache-"+t,S=x[w],k=h(a,l);S||(x[w]=S=r("div",{className:t},{position:"absolute",zIndex:1e3,padding:k+"px"},x.container),d=r("div",null,c({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},y.menuStyle),S),m=function(){s(S,{display:"none"}),u&&u.setState(0),x.openMenu=!1},o(S,"mouseleave",(function(){g=setTimeout(m,500)})),o(S,"mouseenter",(function(){clearTimeout(g)})),o(document,"mousedown",(function(e){x.pointer.inClass(e.target,t)||m()})),p(e,(function(t){if(t){var e=t.separator?r("hr",null,null,d):r("div",{onmouseover:function(){s(this,y.menuItemHoverStyle)},onmouseout:function(){s(this,f)},onclick:function(){m(),t.onclick.apply(x,arguments)},innerHTML:t.text||x.options.lang[t.textKey]},c({cursor:"pointer"},f),d);x.exportDivElements.push(e)}})),x.exportDivElements.push(d,S),x.exportMenuWidth=S.offsetWidth,x.exportMenuHeight=S.offsetHeight),e={display:"block"},n+x.exportMenuWidth>b?e.right=b-n-a-k+"px":e.left=n-k+"px",i+l+x.exportMenuHeight>v&&"top"!==u.alignOptions.verticalAlign?e.bottom=v-i-k+"px":e.top=i+l-k+"px",s(S,e),x.openMenu=!0},addButton:function(n){var o,i,r=this,a=r.renderer,s=l(r.options.navigation.buttonOptions,n),p=s.onclick,h=s.menuItems,u={stroke:s.symbolStroke,fill:s.symbolFill},d=s.symbolSize||12;if(r.btnCount||(r.btnCount=0),r.exportDivElements||(r.exportDivElements=[],r.exportSVGElements=[]),!1!==s.enabled){var m,g=s.theme,x=(y=g.states)&&y.hover,y=y&&y.select;delete g.states,p?m=function(){p.apply(r,arguments)}:h&&(m=function(){r.contextMenu(i.menuClassName,h,i.translateX,i.translateY,i.width,i.height,i),i.setState(2)}),s.text&&s.symbol?g.paddingLeft=t.pick(g.paddingLeft,25):s.text||c(g,{width:s.width,height:s.height,padding:0}),(i=a.button(s.text,0,0,m,g,x,y).attr({title:r.options.lang[s._titleKey],"stroke-linecap":"round"})).menuClassName=n.menuClassName||"highcharts-menu-"+r.btnCount++,s.symbol&&(o=a.symbol(s.symbol,s.symbolX-d/2,s.symbolY-d/2,d,d).attr(c(u,{"stroke-width":s.symbolStrokeWidth||1,zIndex:1})).add(i)),i.add().align(c(s,{width:i.width,x:t.pick(s.x,e)}),!0,"spacingBox"),e+=(i.width+s.buttonSpacing)*("right"===s.align?-1:1),r.exportSVGElements.push(i,o)}},destroyExport:function(t){var e,n;for(t=t.target,e=0;e<t.exportSVGElements.length;e++)(n=t.exportSVGElements[e])&&(n.onclick=n.ontouchstart=null,t.exportSVGElements[e]=n.destroy());for(e=0;e<t.exportDivElements.length;e++)n=t.exportDivElements[e],i(n,"mouseleave"),t.exportDivElements[e]=n.onmouseout=n.onmouseover=n.ontouchstart=n.onclick=null,a(n)}}),g.menu=function(t,e,n,o){return["M",t,e+2.5,"L",t+n,e+2.5,"M",t,e+o/2+.5,"L",t+n,e+o/2+.5,"M",t,e+o-1.5,"L",t+n,e+o-1.5]},n.prototype.callbacks.push((function(t){var n,i=t.options.exporting,r=i.buttons;if(e=0,!1!==i.enabled){for(n in r)t.addButton(r[n]);o(t,"destroy",t.destroyExport)}}))}(Highcharts);