!function(t){var e=t.getOptions().plotOptions,i=t.seriesTypes,n=t.merge,a=function(){},o=t.each;e.funnel=n(e.pie,{center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",dataLabels:{connectorWidth:1,connectorColor:"#606060"},size:!0,states:{select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}}}),i.funnel=t.extendClass(i.pie,{type:"funnel",animate:a,translate:function(){var t,e,i,n,s,r,h,l,c,p,d,u=function(t,e){return/%$/.test(t)?e*parseInt(t,10)/100:parseInt(t,10)},f=0,g=(b=this.chart).plotWidth,b=b.plotHeight,w=0,y=this.options,C=y.center,L=u(C[0],g),k=u(C[0],b),W=u(y.width,g),v=u(y.height,b),A=u(y.neckWidth,g),H=u(y.neckHeight,b),P=v-H,X=(u=this.data,"left"===y.dataLabels.position?1:0);this.getWidthAt=e=function(t){return t>v-H||v===H?A:A+(v-H-t)/(v-H)*(W-A)},this.getX=function(t,i){return L+(i?-1:1)*(e(t)/2+y.dataLabels.distance)},this.center=[L,k,v],this.centerX=L,o(u,(function(t){f+=t.y})),o(u,(function(o){d=null,n=f?o.y/f:0,c=(r=k-v/2+w*v)+n*v,t=e(r),h=(s=L-t/2)+t,t=e(c),p=(l=L-t/2)+t,r>P?(s=l=L-A/2,h=p=L+A/2):c>P&&(d=c,t=e(P),p=(l=L-t/2)+t,c=P),i=["M",s,r,"L",h,r,p,c],d&&i.push(p,d,l,d),i.push(l,c,"Z"),o.shapeType="path",o.shapeArgs={d:i},o.percentage=100*n,o.plotX=L,o.plotY=(r+(d||c))/2,o.tooltipPos=[L,o.plotY],o.slice=a,o.half=X,w+=n})),this.setTooltipPoints()},drawPoints:function(){var t=this,e=t.options,i=t.chart.renderer;o(t.data,(function(n){var a=n.graphic,o=n.shapeArgs;a?a.animate(o):n.graphic=i.path(o).attr({fill:n.color,stroke:e.borderColor,"stroke-width":e.borderWidth}).add(t.group)}))},sortByAngle:a,drawDataLabels:function(){var t,e,n,a,o,s=this.data,r=this.options.dataLabels.distance,h=s.length;for(this.center[2]-=2*r;h--;)e=(t=(n=s[h]).half)?1:-1,o=n.plotY,a=this.getX(o,t),n.labelPos=[0,o,a+(r-5)*e,o,a+r*e,o,t?"right":"left",0];i.pie.prototype.drawDataLabels.call(this)}})}(Highcharts);