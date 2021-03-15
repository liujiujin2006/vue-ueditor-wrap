/*! For license information please see webuploader.withoutimage.js.LICENSE.txt */
!function(e,t){var n,i={},r=function(e,t){var n,i,r;if("string"==typeof e)return s(e);for(n=[],i=e.length,r=0;r<i;r++)n.push(s(e[r]));return t.apply(null,n)},o=function(e,t,n){var o,s={exports:t};"function"==typeof t&&(n.length||(n=[r,s.exports,s]),void 0!==(o=t.apply(null,n))&&(s.exports=o)),i[e]=s.exports},s=function(t){var n=i[t]||e[t];if(!n)throw new Error("`"+t+"` is undefined");return n},a=function(e,t,n){return t("dollar-third",[],(function(){return e.jQuery||e.Zepto})),t("dollar",["dollar-third"],(function(e){return e})),t("promise-third",["dollar"],(function(e){return{Deferred:e.Deferred,when:e.when,isPromise:function(e){return e&&"function"==typeof e.then}}})),t("promise",["promise-third"],(function(e){return e})),t("base",["dollar","promise"],(function(t,n){var i,r,o,s,a,u,c,l,d,p,f=function(){},h=Function.call;function g(e,t){return function(){return e.apply(t,arguments)}}return{version:"0.1.2",$:t,Deferred:n.Deferred,isPromise:n.isPromise,when:n.when,browser:(r=navigator.userAgent,o={},s=r.match(/WebKit\/([\d.]+)/),a=r.match(/Chrome\/([\d.]+)/)||r.match(/CriOS\/([\d.]+)/),u=r.match(/MSIE\s([\d\.]+)/)||r.match(/(?:trident)(?:.*rv:([\w.]+))?/i),c=r.match(/Firefox\/([\d.]+)/),l=r.match(/Safari\/([\d.]+)/),d=r.match(/OPR\/([\d.]+)/),s&&(o.webkit=parseFloat(s[1])),a&&(o.chrome=parseFloat(a[1])),u&&(o.ie=parseFloat(u[1])),c&&(o.firefox=parseFloat(c[1])),l&&(o.safari=parseFloat(l[1])),d&&(o.opera=parseFloat(d[1])),o),os:function(e){var t={},n=e.match(/(?:Android);?[\s\/]+([\d.]+)?/),i=e.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);return n&&(t.android=parseFloat(n[1])),i&&(t.ios=parseFloat(i[1].replace(/_/g,"."))),t}(navigator.userAgent),inherits:function(e,n,i){var r,o,s;return"function"==typeof n?(r=n,n=null):r=n&&n.hasOwnProperty("constructor")?n.constructor:function(){return e.apply(this,arguments)},t.extend(!0,r,e,i||{}),r.__super__=e.prototype,r.prototype=(o=e.prototype,Object.create?Object.create(o):((s=function(){}).prototype=o,new s)),n&&t.extend(!0,r.prototype,n),r},noop:f,bindFn:g,log:e.console?g(console.log,console):f,nextTick:function(e){setTimeout(e,1)},slice:(p=[].slice,function(){return h.apply(p,arguments)}),guid:(i=0,function(e){for(var t=(+new Date).toString(32),n=0;n<5;n++)t+=Math.floor(65535*Math.random()).toString(32);return(e||"wu_")+t+(i++).toString(32)}),formatSize:function(e,t,n){var i;for(n=n||["B","K","M","G","TB"];(i=n.shift())&&e>1024;)e/=1024;return("B"===i?e:e.toFixed(t||2))+i}}})),t("mediator",["base"],(function(e){var t,n=e.$,i=[].slice,r=/\s+/;function o(e,t,i,r){return n.grep(e,(function(e){return e&&(!t||e.e===t)&&(!i||e.cb===i||e.cb._cb===i)&&(!r||e.ctx===r)}))}function s(e,t,i){n.each((e||"").split(r),(function(e,n){i(n,t)}))}function a(e,t){for(var n,i=!1,r=-1,o=e.length;++r<o;)if(!1===(n=e[r]).cb.apply(n.ctx2,t)){i=!0;break}return!i}return t={on:function(e,t,n){var i,r=this;return t?(i=this._events||(this._events=[]),s(e,t,(function(e,t){var o={e:e};o.cb=t,o.ctx=n,o.ctx2=n||r,o.id=i.length,i.push(o)})),this):this},once:function(e,t,n){var i=this;return t?(s(e,t,(function(e,t){var r=function(){return i.off(e,r),t.apply(n||i,arguments)};r._cb=t,i.on(e,r,n)})),i):i},off:function(e,t,i){var r=this._events;return r?e||t||i?(s(e,t,(function(e,t){n.each(o(r,e,t,i),(function(){delete r[this.id]}))})),this):(this._events=[],this):this},trigger:function(e){var t,n,r;return this._events&&e?(t=i.call(arguments,1),n=o(this._events,e),r=o(this._events,"all"),a(n,t)&&a(r,arguments)):this}},n.extend({installTo:function(e){return n.extend(e,t)}},t)})),t("uploader",["base","mediator"],(function(e,t){var n=e.$;function i(e){this.options=n.extend(!0,{},i.options,e),this._init(this.options)}return i.options={},t.installTo(i.prototype),n.each({upload:"start-upload",stop:"stop-upload",getFile:"get-file",getFiles:"get-files",addFile:"add-file",addFiles:"add-file",sort:"sort-files",removeFile:"remove-file",skipFile:"skip-file",retry:"retry",isInProgress:"is-in-progress",makeThumb:"make-thumb",getDimension:"get-dimension",addButton:"add-btn",getRuntimeType:"get-runtime-type",refresh:"refresh",disable:"disable",enable:"enable",reset:"reset"},(function(e,t){i.prototype[e]=function(){return this.request(t,arguments)}})),n.extend(i.prototype,{state:"pending",_init:function(e){var t=this;t.request("init",e,(function(){t.state="ready",t.trigger("ready")}))},option:function(e,t){var i=this.options;if(!(arguments.length>1))return e?i[e]:i;n.isPlainObject(t)&&n.isPlainObject(i[e])?n.extend(i[e],t):i[e]=t},getStats:function(){var e=this.request("get-stats");return{successNum:e.numOfSuccess,cancelNum:e.numOfCancel,invalidNum:e.numOfInvalid,uploadFailNum:e.numOfUploadFailed,queueNum:e.numOfQueue}},trigger:function(e){var i=[].slice.call(arguments,1),r=this.options,o="on"+e.substring(0,1).toUpperCase()+e.substring(1);return!(!1===t.trigger.apply(this,arguments)||n.isFunction(r[o])&&!1===r[o].apply(this,i)||n.isFunction(this[o])&&!1===this[o].apply(this,i)||!1===t.trigger.apply(t,[this,e].concat(i)))},request:e.noop}),e.create=i.create=function(e){return new i(e)},e.Uploader=i,i})),t("runtime/runtime",["base","mediator"],(function(e,t){var n=e.$,i={},r=function(e){for(var t in e)if(e.hasOwnProperty(t))return t;return null};function o(t){this.options=n.extend({container:document.body},t),this.uid=e.guid("rt_")}return n.extend(o.prototype,{getContainer:function(){var e,t,i=this.options;return this._container?this._container:(e=n(i.container||document.body),(t=n(document.createElement("div"))).attr("id","rt_"+this.uid),t.css({position:"absolute",top:"0px",left:"0px",width:"1px",height:"1px",overflow:"hidden"}),e.append(t),e.addClass("webuploader-container"),this._container=t,t)},init:e.noop,exec:e.noop,destroy:function(){this._container&&this._container.parentNode.removeChild(this.__container),this.off()}}),o.orders="html5,flash",o.addRuntime=function(e,t){i[e]=t},o.hasRuntime=function(e){return!!(e?i[e]:r(i))},o.create=function(e,t){var s;if(t=t||o.orders,n.each(t.split(/\s*,\s*/g),(function(){if(i[this])return s=this,!1})),!(s=s||r(i)))throw new Error("Runtime Error");return new i[s](e)},t.installTo(o.prototype),o})),t("runtime/client",["base","mediator","runtime/runtime"],(function(e,t,n){var i,r;function o(t,r){var o,s,a=e.Deferred();this.uid=e.guid("client_"),this.runtimeReady=function(e){return a.done(e)},this.connectRuntime=function(t,s){if(o)throw new Error("already connected!");return a.done(s),"string"==typeof t&&i.get(t)&&(o=i.get(t)),(o=o||i.get(null,r))?(e.$.extend(o.options,t),o.__promise.then(a.resolve),o.__client++):((o=n.create(t,t.runtimeOrder)).__promise=a.promise(),o.once("ready",a.resolve),o.init(),i.add(o),o.__client=1),r&&(o.__standalone=r),o},this.getRuntime=function(){return o},this.disconnectRuntime=function(){o&&(o.__client--,o.__client<=0&&(i.remove(o),delete o.__promise,o.destroy()),o=null)},this.exec=function(){if(o){var n=e.slice(arguments);return t&&n.unshift(t),o.exec.apply(this,n)}},this.getRuid=function(){return o&&o.uid},this.destroy=(s=this.destroy,function(){s&&s.apply(this,arguments),this.trigger("destroy"),this.off(),this.exec("destroy"),this.disconnectRuntime()})}return r={},i={add:function(e){r[e.uid]=e},get:function(e,t){var n;if(e)return r[e];for(n in r)if(!t||!r[n].__standalone)return r[n];return null},remove:function(e){delete r[e.uid]}},t.installTo(o.prototype),o})),t("lib/dnd",["base","mediator","runtime/client"],(function(e,t,n){var i=e.$;function r(e){(e=this.options=i.extend({},r.options,e)).container=i(e.container),e.container.length&&n.call(this,"DragAndDrop")}return r.options={accept:null,disableGlobalDnd:!1},e.inherits(n,{constructor:r,init:function(){var e=this;e.connectRuntime(e.options,(function(){e.exec("init"),e.trigger("ready")}))},destroy:function(){this.disconnectRuntime()}}),t.installTo(r.prototype),r})),t("widgets/widget",["base","uploader"],(function(e,t){var n=e.$,i=t.prototype._init,r={},o=[];function s(e){this.owner=e,this.options=e.options}return n.extend(s.prototype,{init:e.noop,invoke:function(e,t){var i=this.responseMap;return i&&e in i&&i[e]in this&&n.isFunction(this[i[e]])?this[i[e]].apply(this,t):r},request:function(){return this.owner.request.apply(this.owner,arguments)}}),n.extend(t.prototype,{_init:function(){var e=this,t=e._widgets=[];return n.each(o,(function(n,i){t.push(new i(e))})),i.apply(e,arguments)},request:function(t,i,o){var s,a,u,c=0,l=this._widgets,d=l.length,p=[],f=[];for(i=function(e){if(!e)return!1;var t=e.length,i=n.type(e);return!(1!==e.nodeType||!t)||"array"===i||"function"!==i&&"string"!==i&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}(i)?i:[i];c<d;c++)(s=l[c].invoke(t,i))!==r&&(e.isPromise(s)?f.push(s):p.push(s));return o||f.length?(a=e.when.apply(e,f))[u=a.pipe?"pipe":"then"]((function(){var t=e.Deferred(),n=arguments;return setTimeout((function(){t.resolve.apply(t,n)}),1),t.promise()}))[u](o||e.noop):p[0]}}),t.register=s.register=function(t,i){var r,a={init:"init"};return 1===arguments.length?(i=t).responseMap=a:i.responseMap=n.extend(a,t),r=e.inherits(s,i),o.push(r),r},s})),t("widgets/filednd",["base","uploader","lib/dnd","widgets/widget"],(function(e,t,n){var i=e.$;return t.options.dnd="",t.register({init:function(t){if(t.dnd&&"html5"===this.request("predict-runtime-type")){var r,o=this,s=e.Deferred(),a=i.extend({},{disableGlobalDnd:t.disableGlobalDnd,container:t.dnd,accept:t.accept});return(r=new n(a)).once("ready",s.resolve),r.on("drop",(function(e){o.request("add-file",[e])})),r.on("accept",(function(e){return o.owner.trigger("dndAccept",e)})),r.init(),s.promise()}}})})),t("lib/filepaste",["base","mediator","runtime/client"],(function(e,t,n){var i=e.$;function r(e){(e=this.options=i.extend({},e)).container=i(e.container||document.body),n.call(this,"FilePaste")}return e.inherits(n,{constructor:r,init:function(){var e=this;e.connectRuntime(e.options,(function(){e.exec("init"),e.trigger("ready")}))},destroy:function(){this.exec("destroy"),this.disconnectRuntime(),this.off()}}),t.installTo(r.prototype),r})),t("widgets/filepaste",["base","uploader","lib/filepaste","widgets/widget"],(function(e,t,n){var i=e.$;return t.register({init:function(t){if(t.paste&&"html5"===this.request("predict-runtime-type")){var r,o=this,s=e.Deferred(),a=i.extend({},{container:t.paste,accept:t.accept});return(r=new n(a)).once("ready",s.resolve),r.on("paste",(function(e){o.owner.request("add-file",[e])})),r.init(),s.promise()}}})})),t("lib/blob",["base","runtime/client"],(function(e,t){function n(e,n){var i=this;i.source=n,i.ruid=e,t.call(i,"Blob"),this.uid=n.uid||this.uid,this.type=n.type||"",this.size=n.size||0,e&&i.connectRuntime(e)}return e.inherits(t,{constructor:n,slice:function(e,t){return this.exec("slice",e,t)},getSource:function(){return this.source}}),n})),t("lib/file",["base","lib/blob"],(function(e,t){var n=1,i=/\.([^.]+)$/;return e.inherits(t,(function(e,r){var o;t.apply(this,arguments),this.name=r.name||"untitled"+n++,!(o=i.exec(r.name)?RegExp.$1.toLowerCase():"")&&this.type&&(o=/\/(jpg|jpeg|png|gif|bmp)$/i.exec(this.type)?RegExp.$1.toLowerCase():"",this.name+="."+o),!this.type&&~"jpg,jpeg,png,gif,bmp".indexOf(o)&&(this.type="image/"+("jpg"===o?"jpeg":o)),this.ext=o,this.lastModifiedDate=r.lastModifiedDate||(new Date).toLocaleString()}))})),t("lib/filepicker",["base","runtime/client","lib/file"],(function(t,n,i){var r=t.$;function o(e){if((e=this.options=r.extend({},o.options,e)).container=r(e.id),!e.container.length)throw new Error("按钮指定错误");e.innerHTML=e.innerHTML||e.label||e.container.html()||"",e.button=r(e.button||document.createElement("div")),e.button.html(e.innerHTML),e.container.html(e.button),n.call(this,"FilePicker",!0)}return o.options={button:null,container:null,label:null,innerHTML:null,multiple:!0,accept:null,name:"file"},t.inherits(n,{constructor:o,init:function(){var t=this,n=t.options,o=n.button;o.addClass("webuploader-pick"),t.on("all",(function(e){var s;switch(e){case"mouseenter":o.addClass("webuploader-pick-hover");break;case"mouseleave":o.removeClass("webuploader-pick-hover");break;case"change":s=t.exec("getFiles"),t.trigger("select",r.map(s,(function(e){return(e=new i(t.getRuid(),e))._refer=n.container,e})),n.container)}})),t.connectRuntime(n,(function(){t.refresh(),t.exec("init",n),t.trigger("ready")})),r(e).on("resize",(function(){t.refresh()}))},refresh:function(){var e=this.getRuntime().getContainer(),t=this.options.button,n=t.outerWidth?t.outerWidth():t.width(),i=t.outerHeight?t.outerHeight():t.height(),r=t.offset();n&&i&&e.css({bottom:"auto",right:"auto",width:n+"px",height:i+"px"}).offset(r)},enable:function(){this.options.button.removeClass("webuploader-pick-disable"),this.refresh()},disable:function(){var e=this.options.button;this.getRuntime().getContainer().css({top:"-99999px"}),e.addClass("webuploader-pick-disable")},destroy:function(){this.runtime&&(this.exec("destroy"),this.disconnectRuntime())}}),o})),t("widgets/filepicker",["base","uploader","lib/filepicker","widgets/widget"],(function(e,t,n){var i=e.$;return i.extend(t.options,{pick:null,accept:null}),t.register({"add-btn":"addButton",refresh:"refresh",disable:"disable",enable:"enable"},{init:function(e){return this.pickers=[],e.pick&&this.addButton(e.pick)},refresh:function(){i.each(this.pickers,(function(){this.refresh()}))},addButton:function(t){var r,o,s,a=this,u=a.options,c=u.accept;if(t)return s=e.Deferred(),i.isPlainObject(t)||(t={id:t}),r=i.extend({},t,{accept:i.isPlainObject(c)?[c]:c,swf:u.swf,runtimeOrder:u.runtimeOrder}),(o=new n(r)).once("ready",s.resolve),o.on("select",(function(e){a.owner.request("add-file",[e])})),o.init(),this.pickers.push(o),s.promise()},disable:function(){i.each(this.pickers,(function(){this.disable()}))},enable:function(){i.each(this.pickers,(function(){this.enable()}))}})})),t("file",["base","mediator"],(function(e,t){var n=e.$,i=0,r=/\.([^.]+)$/,o={};function s(e){this.name=e.name||"Untitled",this.size=e.size||0,this.type=e.type||"application",this.lastModifiedDate=e.lastModifiedDate||1*new Date,this.id="WU_FILE_"+i++,this.ext=r.exec(this.name)?RegExp.$1:"",this.statusText="",o[this.id]=s.Status.INITED,this.source=e,this.loaded=0,this.on("error",(function(e){this.setStatus(s.Status.ERROR,e)}))}return n.extend(s.prototype,{setStatus:function(e,t){var n=o[this.id];void 0!==t&&(this.statusText=t),e!==n&&(o[this.id]=e,this.trigger("statuschange",e,n))},getStatus:function(){return o[this.id]},getSource:function(){return this.source},destory:function(){delete o[this.id]}}),t.installTo(s.prototype),s.Status={INITED:"inited",QUEUED:"queued",PROGRESS:"progress",ERROR:"error",COMPLETE:"complete",CANCELLED:"cancelled",INTERRUPT:"interrupt",INVALID:"invalid"},s})),t("queue",["base","mediator","file"],(function(e,t,n){var i=e.$,r=n.Status;function o(){this.stats={numOfQueue:0,numOfSuccess:0,numOfCancel:0,numOfProgress:0,numOfUploadFailed:0,numOfInvalid:0},this._queue=[],this._map={}}return i.extend(o.prototype,{append:function(e){return this._queue.push(e),this._fileAdded(e),this},prepend:function(e){return this._queue.unshift(e),this._fileAdded(e),this},getFile:function(e){return"string"!=typeof e?e:this._map[e]},fetch:function(e){var t,n,i=this._queue.length;for(e=e||r.QUEUED,t=0;t<i;t++)if(e===(n=this._queue[t]).getStatus())return n;return null},sort:function(e){"function"==typeof e&&this._queue.sort(e)},getFiles:function(){for(var e,t=[].slice.call(arguments,0),n=[],r=0,o=this._queue.length;r<o;r++)e=this._queue[r],t.length&&!~i.inArray(e.getStatus(),t)||n.push(e);return n},_fileAdded:function(e){var t=this;this._map[e.id]||(this._map[e.id]=e,e.on("statuschange",(function(e,n){t._onFileStatusChange(e,n)}))),e.setStatus(r.QUEUED)},_onFileStatusChange:function(e,t){var n=this.stats;switch(t){case r.PROGRESS:n.numOfProgress--;break;case r.QUEUED:n.numOfQueue--;break;case r.ERROR:n.numOfUploadFailed--;break;case r.INVALID:n.numOfInvalid--}switch(e){case r.QUEUED:n.numOfQueue++;break;case r.PROGRESS:n.numOfProgress++;break;case r.ERROR:n.numOfUploadFailed++;break;case r.COMPLETE:n.numOfSuccess++;break;case r.CANCELLED:n.numOfCancel++;break;case r.INVALID:n.numOfInvalid++}}}),t.installTo(o.prototype),o})),t("widgets/queue",["base","uploader","queue","file","lib/file","runtime/client","widgets/widget"],(function(e,t,n,i,r,o){var s=e.$,a=/\.\w+$/,u=i.Status;return t.register({"sort-files":"sortFiles","add-file":"addFiles","get-file":"getFile","fetch-file":"fetchFile","get-stats":"getStats","get-files":"getFiles","remove-file":"removeFile",retry:"retry",reset:"reset","accept-file":"acceptFile"},{init:function(t){var i,r,a,u,c,l,d,p=this;if(s.isPlainObject(t.accept)&&(t.accept=[t.accept]),t.accept){for(c=[],a=0,r=t.accept.length;a<r;a++)(u=t.accept[a].extensions)&&c.push(u);c.length&&(l="\\."+c.join(",").replace(/,/g,"$|\\.").replace(/\*/g,".*")+"$"),p.accept=new RegExp(l,"i")}if(p.queue=new n,p.stats=p.queue.stats,"html5"===this.request("predict-runtime-type"))return i=e.Deferred(),(d=new o("Placeholder")).connectRuntime({runtimeOrder:"html5"},(function(){p._ruid=d.getRuid(),i.resolve()})),i.promise()},_wrapFile:function(e){if(!(e instanceof i)){if(!(e instanceof r)){if(!this._ruid)throw new Error("Can't add external files.");e=new r(this._ruid,e)}e=new i(e)}return e},acceptFile:function(e){return!(!e||e.size<6||this.accept&&a.exec(e.name)&&!this.accept.test(e.name))},_addFile:function(e){var t=this;if(e=t._wrapFile(e),t.owner.trigger("beforeFileQueued",e)){if(t.acceptFile(e))return t.queue.append(e),t.owner.trigger("fileQueued",e),e;t.owner.trigger("error","Q_TYPE_DENIED",e)}},getFile:function(e){return this.queue.getFile(e)},addFiles:function(e){var t=this;e.length||(e=[e]),e=s.map(e,(function(e){return t._addFile(e)})),t.owner.trigger("filesQueued",e),t.options.auto&&t.request("start-upload")},getStats:function(){return this.stats},removeFile:function(e){(e=e.id?e:this.queue.getFile(e)).setStatus(u.CANCELLED),this.owner.trigger("fileDequeued",e)},getFiles:function(){return this.queue.getFiles.apply(this.queue,arguments)},fetchFile:function(){return this.queue.fetch.apply(this.queue,arguments)},retry:function(e,t){var n,i,r,o=this;if(e)return(e=e.id?e:o.queue.getFile(e)).setStatus(u.QUEUED),void(t||o.request("start-upload"));for(i=0,r=(n=o.queue.getFiles(u.ERROR)).length;i<r;i++)(e=n[i]).setStatus(u.QUEUED);o.request("start-upload")},sortFiles:function(){return this.queue.sort.apply(this.queue,arguments)},reset:function(){this.queue=new n,this.stats=this.queue.stats}})})),t("widgets/runtime",["uploader","runtime/runtime","widgets/widget"],(function(e,t){return e.support=function(){return t.hasRuntime.apply(t,arguments)},e.register({"predict-runtime-type":"predictRuntmeType"},{init:function(){if(!this.predictRuntmeType())throw Error("Runtime Error")},predictRuntmeType:function(){var e,n,i=this.options.runtimeOrder||t.orders,r=this.type;if(!r)for(e=0,n=(i=i.split(/\s*,\s*/g)).length;e<n;e++)if(t.hasRuntime(i[e])){this.type=r=i[e];break}return r}})})),t("lib/transport",["base","runtime/client","mediator"],(function(e,t,n){var i=e.$;function r(e){var n=this;e=n.options=i.extend(!0,{},r.options,e||{}),t.call(this,"Transport"),this._blob=null,this._formData=e.formData||{},this._headers=e.headers||{},this.on("progress",this._timeout),this.on("load error",(function(){n.trigger("progress",1),clearTimeout(n._timer)}))}return r.options={server:"",method:"POST",withCredentials:!1,fileVal:"file",timeout:12e4,formData:{},headers:{},sendAsBinary:!1},i.extend(r.prototype,{appendBlob:function(e,t,n){var i=this,r=i.options;i.getRuid()&&i.disconnectRuntime(),i.connectRuntime(t.ruid,(function(){i.exec("init")})),i._blob=t,r.fileVal=e||r.fileVal,r.filename=n||r.filename},append:function(e,t){"object"==typeof e?i.extend(this._formData,e):this._formData[e]=t},setRequestHeader:function(e,t){"object"==typeof e?i.extend(this._headers,e):this._headers[e]=t},send:function(e){this.exec("send",e),this._timeout()},abort:function(){return clearTimeout(this._timer),this.exec("abort")},destroy:function(){this.trigger("destroy"),this.off(),this.exec("destroy"),this.disconnectRuntime()},getResponse:function(){return this.exec("getResponse")},getResponseAsJson:function(){return this.exec("getResponseAsJson")},getStatus:function(){return this.exec("getStatus")},_timeout:function(){var e=this,t=e.options.timeout;t&&(clearTimeout(e._timer),e._timer=setTimeout((function(){e.abort(),e.trigger("error","timeout")}),t))}}),n.installTo(r.prototype),r})),t("widgets/upload",["base","uploader","file","lib/transport","widgets/widget"],(function(e,t,n,i){var r=e.$,o=e.isPromise,s=n.Status;r.extend(t.options,{prepareNextFile:!1,chunked:!1,chunkSize:5242880,chunkRetry:2,threads:3,formData:null}),t.register({"start-upload":"start","stop-upload":"stop","skip-file":"skipFile","is-in-progress":"isInProgress"},{init:function(){var t=this.owner;this.runing=!1,this.pool=[],this.pending=[],this.remaning=0,this.__tick=e.bindFn(this._tick,this),t.on("uploadComplete",(function(e){e.blocks&&r.each(e.blocks,(function(e,t){t.transport&&(t.transport.abort(),t.transport.destroy()),delete t.transport})),delete e.blocks,delete e.remaning}))},start:function(){var t=this;r.each(t.request("get-files",s.INVALID),(function(){t.request("remove-file",this)})),t.runing||(t.runing=!0,r.each(t.pool,(function(e,n){var i=n.file;i.getStatus()===s.INTERRUPT&&(i.setStatus(s.PROGRESS),t._trigged=!1,n.transport&&n.transport.send())})),t._trigged=!1,t.owner.trigger("startUpload"),e.nextTick(t.__tick))},stop:function(e){var t=this;!1!==t.runing&&(t.runing=!1,e&&r.each(t.pool,(function(e,t){t.transport&&t.transport.abort(),t.file.setStatus(s.INTERRUPT)})),t.owner.trigger("stopUpload"))},isInProgress:function(){return!!this.runing},getStats:function(){return this.request("get-stats")},skipFile:function(e,t){(e=this.request("get-file",e)).setStatus(t||s.COMPLETE),e.skipped=!0,e.blocks&&r.each(e.blocks,(function(e,t){var n=t.transport;n&&(n.abort(),n.destroy(),delete t.transport)})),this.owner.trigger("uploadSkip",e)},_tick:function(){var t,n,i=this,r=i.options;if(i._promise)return i._promise.always(i.__tick);i.pool.length<r.threads&&(n=i._nextBlock())?(i._trigged=!1,t=function(t){i._promise=null,t&&t.file&&i._startSend(t),e.nextTick(i.__tick)},i._promise=o(n)?n.always(t):t(n)):i.remaning||i.getStats().numOfQueue||(i.runing=!1,i._trigged||e.nextTick((function(){i.owner.trigger("uploadFinished")})),i._trigged=!0)},_nextBlock:function(){var e,t,n=this,i=n._act,r=n.options;return i&&i.has()&&i.file.getStatus()===s.PROGRESS?(r.prepareNextFile&&!n.pending.length&&n._prepareNextFile(),i.fetch()):n.runing?(!n.pending.length&&n.getStats().numOfQueue&&n._prepareNextFile(),e=n.pending.shift(),t=function(e){return e?(i=function(e,t){for(var n,i=[],r=e.source.size,o=t?Math.ceil(r/t):1,s=0,a=0;a<o;)n=Math.min(t,r-s),i.push({file:e,start:s,end:t?s+n:r,total:r,chunks:o,chunk:a++}),s+=n;return e.blocks=i.concat(),e.remaning=i.length,{file:e,has:function(){return!!i.length},fetch:function(){return i.shift()}}}(e,r.chunked?r.chunkSize:0),n._act=i,i.fetch()):null},o(e)?e[e.pipe?"pipe":"then"](t):t(e)):void 0},_prepareNextFile:function(){var e,t=this,n=t.request("fetch-file"),i=t.pending;n&&((e=t.request("before-send-file",n,(function(){return n.getStatus()===s.QUEUED?(t.owner.trigger("uploadStart",n),n.setStatus(s.PROGRESS),n):t._finishFile(n)}))).done((function(){var t=r.inArray(e,i);~t&&i.splice(t,1,n)})),e.fail((function(e){n.setStatus(s.ERROR,e),t.owner.trigger("uploadError",n,e),t.owner.trigger("uploadComplete",n)})),i.push(e))},_popBlock:function(e){var t=r.inArray(e,this.pool);this.pool.splice(t,1),e.file.remaning--,this.remaning--},_startSend:function(t){var n=this,i=t.file;n.pool.push(t),n.remaning++,t.blob=1===t.chunks?i.source:i.source.slice(t.start,t.end),n.request("before-send",t,(function(){i.getStatus()===s.PROGRESS?n._doSend(t):(n._popBlock(t),e.nextTick(n.__tick))})).fail((function(){1===i.remaning?n._finishFile(i).always((function(){t.percentage=1,n._popBlock(t),n.owner.trigger("uploadComplete",i),e.nextTick(n.__tick)})):(t.percentage=1,n._popBlock(t),e.nextTick(n.__tick))}))},_doSend:function(t){var n,o,a=this,u=a.owner,c=a.options,l=t.file,d=new i(c),p=r.extend({},c.formData),f=r.extend({},c.headers);t.transport=d,d.on("destroy",(function(){delete t.transport,a._popBlock(t),e.nextTick(a.__tick)})),d.on("progress",(function(e){var n=0,i=0;n=t.percentage=e,t.chunks>1&&(r.each(l.blocks,(function(e,t){i+=(t.percentage||0)*(t.end-t.start)})),n=i/l.size),u.trigger("uploadProgress",l,n||0)})),n=function(e){var n;return(o=d.getResponseAsJson()||{})._raw=d.getResponse(),n=function(t){e=t},u.trigger("uploadAccept",t,o,n)||(e=e||"server"),e},d.on("error",(function(e,i){t.retried=t.retried||0,t.chunks>1&&~"http,abort".indexOf(e)&&t.retried<c.chunkRetry?(t.retried++,d.send()):(i||"server"!==e||(e=n(e)),l.setStatus(s.ERROR,e),u.trigger("uploadError",l,e),u.trigger("uploadComplete",l))})),d.on("load",(function(){var e;(e=n())?d.trigger("error",e,!0):1===l.remaning?a._finishFile(l,o):d.destroy()})),p=r.extend(p,{id:l.id,name:l.name,type:l.type,lastModifiedDate:l.lastModifiedDate,size:l.size}),t.chunks>1&&r.extend(p,{chunks:t.chunks,chunk:t.chunk}),u.trigger("uploadBeforeSend",t,p,f),d.appendBlob(c.fileVal,t.blob,l.name),d.append(p),d.setRequestHeader(f),d.send()},_finishFile:function(e,t,n){var i=this.owner;return i.request("after-send-file",arguments,(function(){e.setStatus(s.COMPLETE),i.trigger("uploadSuccess",e,t,n)})).fail((function(t){e.getStatus()===s.PROGRESS&&e.setStatus(s.ERROR,t),i.trigger("uploadError",e,t)})).always((function(){i.trigger("uploadComplete",e)}))}})})),t("widgets/validator",["base","uploader","file","widgets/widget"],(function(e,t,n){var i,r=e.$,o={};return i={addValidator:function(e,t){o[e]=t},removeValidator:function(e){delete o[e]}},t.register({init:function(){var e=this;r.each(o,(function(){this.call(e.owner)}))}}),i.addValidator("fileNumLimit",(function(){var e=this,t=e.options,n=0,i=t.fileNumLimit>>0,r=!0;i&&(e.on("beforeFileQueued",(function(e){return n>=i&&r&&(r=!1,this.trigger("error","Q_EXCEED_NUM_LIMIT",i,e),setTimeout((function(){r=!0}),1)),!(n>=i)})),e.on("fileQueued",(function(){n++})),e.on("fileDequeued",(function(){n--})),e.on("uploadFinished",(function(){n=0})))})),i.addValidator("fileSizeLimit",(function(){var e=this,t=e.options,n=0,i=t.fileSizeLimit>>0,r=!0;i&&(e.on("beforeFileQueued",(function(e){var t=n+e.size>i;return t&&r&&(r=!1,this.trigger("error","Q_EXCEED_SIZE_LIMIT",i,e),setTimeout((function(){r=!0}),1)),!t})),e.on("fileQueued",(function(e){n+=e.size})),e.on("fileDequeued",(function(e){n-=e.size})),e.on("uploadFinished",(function(){n=0})))})),i.addValidator("fileSingleSizeLimit",(function(){var e=this.options.fileSingleSizeLimit;e&&this.on("beforeFileQueued",(function(t){if(t.size>e)return t.setStatus(n.Status.INVALID,"exceed_size"),this.trigger("error","F_EXCEED_SIZE",t),!1}))})),i.addValidator("duplicate",(function(){var e=this,t=e.options,n={};t.duplicate||(e.on("beforeFileQueued",(function(e){var t=e.__hash||(e.__hash=function(e){for(var t=0,n=0,i=e.length;n<i;n++)t=e.charCodeAt(n)+(t<<6)+(t<<16)-t;return t}(e.name+e.size+e.lastModifiedDate));if(n[t])return this.trigger("error","F_DUPLICATE",e),!1})),e.on("fileQueued",(function(e){var t=e.__hash;t&&(n[t]=!0)})),e.on("fileDequeued",(function(e){var t=e.__hash;t&&delete n[t]})))})),i})),t("runtime/compbase",[],(function(){return function(e,t){this.owner=e,this.options=e.options,this.getRuntime=function(){return t},this.getRuid=function(){return t.uid},this.trigger=function(){return e.trigger.apply(e,arguments)}}})),t("runtime/html5/runtime",["base","runtime/runtime","runtime/compbase"],(function(t,n,i){var r="html5",o={};function s(){var e={},i=this,s=this.destory;n.apply(i,arguments),i.type=r,i.exec=function(n,r){var s,a=this,u=a.uid,c=t.slice(arguments,2);if(o[n]&&(s=e[u]=e[u]||new o[n](a,i))[r])return s[r].apply(s,c)},i.destory=function(){return s&&s.apply(this,arguments)}}return t.inherits(n,{constructor:s,init:function(){var e=this;setTimeout((function(){e.trigger("ready")}),1)}}),s.register=function(e,n){return o[e]=t.inherits(i,n)},e.Blob&&e.FileReader&&e.DataView&&n.addRuntime(r,s),s})),t("runtime/html5/blob",["runtime/html5/runtime","lib/blob"],(function(e,t){return e.register("Blob",{slice:function(e,n){var i=this.owner.source;return i=(i.slice||i.webkitSlice||i.mozSlice).call(i,e,n),new t(this.getRuid(),i)}})})),t("runtime/html5/dnd",["base","runtime/html5/runtime","lib/file"],(function(e,t,n){var i=e.$,r="webuploader-dnd-";return t.register("DragAndDrop",{init:function(){var t=this.elem=this.options.container;this.dragEnterHandler=e.bindFn(this._dragEnterHandler,this),this.dragOverHandler=e.bindFn(this._dragOverHandler,this),this.dragLeaveHandler=e.bindFn(this._dragLeaveHandler,this),this.dropHandler=e.bindFn(this._dropHandler,this),this.dndOver=!1,t.on("dragenter",this.dragEnterHandler),t.on("dragover",this.dragOverHandler),t.on("dragleave",this.dragLeaveHandler),t.on("drop",this.dropHandler),this.options.disableGlobalDnd&&(i(document).on("dragover",this.dragOverHandler),i(document).on("drop",this.dropHandler))},_dragEnterHandler:function(e){var t,n=this,i=n._denied||!1;return e=e.originalEvent||e,n.dndOver||(n.dndOver=!0,(t=e.dataTransfer.items)&&t.length&&(n._denied=i=!n.trigger("accept",t)),n.elem.addClass(r+"over"),n.elem[i?"addClass":"removeClass"](r+"denied")),e.dataTransfer.dropEffect=i?"none":"copy",!1},_dragOverHandler:function(e){var t=this.elem.parent().get(0);return t&&!i.contains(t,e.currentTarget)||(clearTimeout(this._leaveTimer),this._dragEnterHandler.call(this,e)),!1},_dragLeaveHandler:function(){var e,t=this;return e=function(){t.dndOver=!1,t.elem.removeClass(r+"over "+r+"denied")},clearTimeout(t._leaveTimer),t._leaveTimer=setTimeout(e,100),!1},_dropHandler:function(e){var t=this,o=t.getRuid(),s=t.elem.parent().get(0);return s&&!i.contains(s,e.currentTarget)||(t._getTansferFiles(e,(function(e){t.trigger("drop",i.map(e,(function(e){return new n(o,e)})))})),t.dndOver=!1,t.elem.removeClass(r+"over")),!1},_getTansferFiles:function(t,n){var i,r,o,s,a,u,c,l,d=[],p=[];for(i=(o=(t=t.originalEvent||t).dataTransfer).items,r=o.files,l=!(!i||!i[0].webkitGetAsEntry),u=0,c=r.length;u<c;u++)s=r[u],a=i&&i[u],l&&a.webkitGetAsEntry().isDirectory?p.push(this._traverseDirectoryTree(a.webkitGetAsEntry(),d)):d.push(s);e.when.apply(e,p).done((function(){d.length&&n(d)}))},_traverseDirectoryTree:function(t,n){var i=e.Deferred(),r=this;return t.isFile?t.file((function(e){n.push(e),i.resolve()})):t.isDirectory&&t.createReader().readEntries((function(t){var o,s=t.length,a=[],u=[];for(o=0;o<s;o++)a.push(r._traverseDirectoryTree(t[o],u));e.when.apply(e,a).then((function(){n.push.apply(n,u),i.resolve()}),i.reject)})),i.promise()},destroy:function(){var e=this.elem;e.off("dragenter",this.dragEnterHandler),e.off("dragover",this.dragEnterHandler),e.off("dragleave",this.dragLeaveHandler),e.off("drop",this.dropHandler),this.options.disableGlobalDnd&&(i(document).off("dragover",this.dragOverHandler),i(document).off("drop",this.dropHandler))}})})),t("runtime/html5/filepaste",["base","runtime/html5/runtime","lib/file"],(function(e,t,n){return t.register("FilePaste",{init:function(){var t,n,i,r,o=this.options,s=this.elem=o.container,a=".*";if(o.accept){for(t=[],n=0,i=o.accept.length;n<i;n++)(r=o.accept[n].mimeTypes)&&t.push(r);t.length&&(a=(a=t.join(",")).replace(/,/g,"|").replace(/\*/g,".*"))}this.accept=a=new RegExp(a,"i"),this.hander=e.bindFn(this._pasteHander,this),s.on("paste",this.hander)},_pasteHander:function(e){var t,i,r,o,s,a=[],u=this.getRuid();for(o=0,s=(t=(e=e.originalEvent||e).clipboardData.items).length;o<s;o++)"file"===(i=t[o]).kind&&(r=i.getAsFile())&&a.push(new n(u,r));a.length&&(e.preventDefault(),e.stopPropagation(),this.trigger("paste",a))},destroy:function(){this.elem.off("paste",this.hander)}})})),t("runtime/html5/filepicker",["base","runtime/html5/runtime"],(function(e,t){var n=e.$;return t.register("FilePicker",{init:function(){var e,t,i,r,o=this.getRuntime().getContainer(),s=this,a=s.owner,u=s.options,c=n(document.createElement("label")),l=n(document.createElement("input"));if(l.attr("type","file"),l.attr("name",u.name),l.addClass("webuploader-element-invisible"),c.on("click",(function(){l.trigger("click")})),c.css({opacity:0,width:"100%",height:"100%",display:"block",cursor:"pointer",background:"#ffffff"}),u.multiple&&l.attr("multiple","multiple"),u.accept&&u.accept.length>0){for(e=[],t=0,i=u.accept.length;t<i;t++)e.push(u.accept[t].mimeTypes);l.attr("accept",e.join(","))}o.append(l),o.append(c),r=function(e){a.trigger(e.type)},l.on("change",(function(e){var t,i=arguments.callee;s.files=e.target.files,t=this.cloneNode(!0),this.parentNode.replaceChild(t,this),l.off(),l=n(t).on("change",i).on("mouseenter mouseleave",r),a.trigger("change")})),c.on("mouseenter mouseleave",r)},getFiles:function(){return this.files},destroy:function(){}})})),t("runtime/html5/transport",["base","runtime/html5/runtime"],(function(e,t){var n=e.noop,i=e.$;return t.register("Transport",{init:function(){this._status=0,this._response=null},send:function(){var t,n,r,o=this.owner,s=this.options,a=this._initAjax(),u=o._blob,c=s.server;s.sendAsBinary?(c+=(/\?/.test(c)?"&":"?")+i.param(o._formData),n=u.getSource()):(t=new FormData,i.each(o._formData,(function(e,n){t.append(e,n)})),t.append(s.fileVal,u.getSource(),s.filename||o._formData.name||"")),s.withCredentials&&"withCredentials"in a?(a.open(s.method,c,!0),a.withCredentials=!0):a.open(s.method,c),this._setRequestHeader(a,s.headers),n?(a.overrideMimeType("application/octet-stream"),e.os.android?((r=new FileReader).onload=function(){a.send(this.result),r=r.onload=null},r.readAsArrayBuffer(n)):a.send(n)):a.send(t)},getResponse:function(){return this._response},getResponseAsJson:function(){return this._parseJson(this._response)},getStatus:function(){return this._status},abort:function(){var e=this._xhr;e&&(e.upload.onprogress=n,e.onreadystatechange=n,e.abort(),this._xhr=e=null)},destroy:function(){this.abort()},_initAjax:function(){var e=this,t=new XMLHttpRequest;return this.options.withCredentials&&!("withCredentials"in t)&&"undefined"!=typeof XDomainRequest&&(t=new XDomainRequest),t.upload.onprogress=function(t){var n=0;return t.lengthComputable&&(n=t.loaded/t.total),e.trigger("progress",n)},t.onreadystatechange=function(){if(4===t.readyState)return t.upload.onprogress=n,t.onreadystatechange=n,e._xhr=null,e._status=t.status,t.status>=200&&t.status<300?(e._response=t.responseText,e.trigger("load")):t.status>=500&&t.status<600?(e._response=t.responseText,e.trigger("error","server")):e.trigger("error",e._status?"http":"abort")},e._xhr=t,t},_setRequestHeader:function(e,t){i.each(t,(function(t,n){e.setRequestHeader(t,n)}))},_parseJson:function(e){var t;try{t=JSON.parse(e)}catch(e){t={}}return t}})})),t("runtime/flash/runtime",["base","runtime/runtime","runtime/compbase"],(function(t,n,i){var r=t.$,o="flash",s={};function a(){var i={},r={},a=this.destory,u=this,c=t.guid("webuploader_");function l(e,t){var n,i,o=e.type||e;i=(n=o.split("::"))[0],"Ready"===(o=n[1])&&i===u.uid?u.trigger("ready"):r[i]&&r[i].trigger(o.toLowerCase(),e,t)}n.apply(u,arguments),u.type=o,u.exec=function(e,n){var o,a=this,c=a.uid,l=t.slice(arguments,2);return r[c]=a,s[e]&&(i[c]||(i[c]=new s[e](a,u)),(o=i[c])[n])?o[n].apply(o,l):u.flashExec.apply(a,arguments)},e[c]=function(){var e=arguments;setTimeout((function(){l.apply(null,e)}),1)},this.jsreciver=c,this.destory=function(){return a&&a.apply(this,arguments)},this.flashExec=function(e,n){var i=u.getFlash(),r=t.slice(arguments,2);return i.exec(this.uid,e,n,r)}}return t.inherits(n,{constructor:a,init:function(){var e,n=this.getContainer(),i=this.options;n.css({position:"absolute",top:"-8px",left:"-8px",width:"9px",height:"9px",overflow:"hidden"}),e='<object id="'+this.uid+'" type="application/x-shockwave-flash" data="'+i.swf+'" ',t.browser.ie&&(e+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '),e+='width="100%" height="100%" style="outline:0"><param name="movie" value="'+i.swf+'" /><param name="flashvars" value="uid='+this.uid+"&jsreciver="+this.jsreciver+'" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>',n.html(e)},getFlash:function(){return this._flash||(this._flash=r("#"+this.uid).get(0)),this._flash}}),a.register=function(e,n){return s[e]=t.inherits(i,r.extend({flashExec:function(){var e=this.owner;return this.getRuntime().flashExec.apply(e,arguments)}},n))},function(){var e;try{e=(e=navigator.plugins["Shockwave Flash"]).description}catch(t){try{e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")}catch(t){e="0.0"}}return e=e.match(/\d+/g),parseFloat(e[0]+"."+e[1],10)}()>=11.4&&n.addRuntime(o,a),a})),t("runtime/flash/filepicker",["base","runtime/flash/runtime"],(function(e,t){var n=e.$;return t.register("FilePicker",{init:function(e){var t,i,r=n.extend({},e);for(t=r.accept&&r.accept.length,i=0;i<t;i++)r.accept[i].title||(r.accept[i].title="Files");delete r.button,delete r.container,this.flashExec("FilePicker","init",r)},destroy:function(){}})})),t("runtime/flash/transport",["base","runtime/flash/runtime","runtime/client"],(function(e,t,n){var i=e.$;return t.register("Transport",{init:function(){this._status=0,this._response=null,this._responseJson=null},send:function(){var e,t=this.owner,n=this.options,r=this._initAjax(),o=t._blob,s=n.server;r.connectRuntime(o.ruid),n.sendAsBinary?(s+=(/\?/.test(s)?"&":"?")+i.param(t._formData),e=o.uid):(i.each(t._formData,(function(e,t){r.exec("append",e,t)})),r.exec("appendBlob",n.fileVal,o.uid,n.filename||t._formData.name||"")),this._setRequestHeader(r,n.headers),r.exec("send",{method:n.method,url:s},e)},getStatus:function(){return this._status},getResponse:function(){return this._response},getResponseAsJson:function(){return this._responseJson},abort:function(){var e=this._xhr;e&&(e.exec("abort"),e.destroy(),this._xhr=e=null)},destroy:function(){this.abort()},_initAjax:function(){var e=this,t=new n("XMLHttpRequest");return t.on("uploadprogress progress",(function(t){return e.trigger("progress",t.loaded/t.total)})),t.on("load",(function(){var n=t.exec("getStatus"),i="";return t.off(),e._xhr=null,n>=200&&n<300?(e._response=t.exec("getResponse"),e._responseJson=t.exec("getResponseAsJson")):n>=500&&n<600?(e._response=t.exec("getResponse"),e._responseJson=t.exec("getResponseAsJson"),i="server"):i="http",t.destroy(),t=null,i?e.trigger("error",i):e.trigger("load")})),t.on("error",(function(){t.off(),e._xhr=null,e.trigger("error","http")})),e._xhr=t,t},_setRequestHeader:function(e,t){i.each(t,(function(t,n){e.exec("setRequestHeader",t,n)}))}})})),t("preset/withoutimage",["base","widgets/filednd","widgets/filepaste","widgets/filepicker","widgets/queue","widgets/runtime","widgets/upload","widgets/validator","runtime/html5/blob","runtime/html5/dnd","runtime/html5/filepaste","runtime/html5/filepicker","runtime/html5/transport","runtime/flash/filepicker","runtime/flash/transport"],(function(e){return e})),t("webuploader",["preset/withoutimage"],(function(e){return e})),n("webuploader")}(e,(function(e,t,n){2===arguments.length&&(n=t,t=null),r(t||[],(function(){o(e,n,arguments)}))}),r);!function(e){var t,n,r,o,s,a;for(t in a=function(e){return e&&e.charAt(0).toUpperCase()+e.substr(1)},i)if(n=e,i.hasOwnProperty(t)){for(s=a((r=t.split("/")).pop());o=a(r.shift());)n[o]=n[o]||{},n=n[o];n[s]=i[t]}}(a),"object"==typeof module&&"object"==typeof module.exports?module.exports=a:"function"==typeof define&&define.amd?define([],a):(n=e.WebUploader,e.WebUploader=a,e.WebUploader.noConflict=function(){e.WebUploader=n})}(this);