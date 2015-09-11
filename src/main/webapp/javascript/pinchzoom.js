!function(){"use strict";var a=function(a,b){var f,c=function(c,d){this.el=a(c),this.zoomFactor=1,this.lastScale=1,this.offset={x:0,y:0},this.options=b.extend(this.defaults,d),this.setupMarkup(),this.bindEvents(),this.update()},d=function(a,b){return a+b},e=function(a,b){return a>b-.01&&b+.01>a};return c.prototype={defaults:{tapZoomFactor:2,zoomOutFactor:1.3,animationDuration:300,animationInterval:5,maxZoom:4,minZoom:.5,use2d:!0},handleDragStart:function(a){this.stopAnimation(),this.lastDragPosition=!1,this.hasInteraction=!0,this.handleDrag(a)},handleDrag:function(a){if(this.zoomFactor>1){var b=this.getTouches(a)[0];this.drag(b,this.lastDragPosition),this.offset=this.sanitizeOffset(this.offset),this.lastDragPosition=b}},handleDragEnd:function(){this.end()},handleZoomStart:function(){this.stopAnimation(),this.lastScale=1,this.nthZoom=0,this.lastZoomCenter=!1,this.hasInteraction=!0},handleZoom:function(a,b){var c=this.getTouchCenter(this.getTouches(a)),d=b/this.lastScale;this.lastScale=b,this.nthZoom+=1,this.nthZoom>3&&(this.scale(d,c),this.drag(c,this.lastZoomCenter)),this.lastZoomCenter=c},handleZoomEnd:function(){this.end()},handleDoubleTap:function(a){var c=this.getTouches(a)[0],d=this.zoomFactor>1?1:this.options.tapZoomFactor,e=this.zoomFactor,f=b.bind(function(a){this.scaleTo(e+a*(d-e),c)},this);this.hasInteraction||(e>d&&(c=this.getCurrentZoomCenter()),this.animate(this.options.animationDuration,this.options.animationInterval,f,this.swing))},sanitizeOffset:function(a){var b=(this.zoomFactor-1)*this.getContainerX(),c=(this.zoomFactor-1)*this.getContainerY(),d=Math.max(b,0),e=Math.max(c,0),f=Math.min(b,0),g=Math.min(c,0);return{x:Math.min(Math.max(a.x,f),d),y:Math.min(Math.max(a.y,g),e)}},scaleTo:function(a,b){this.scale(a/this.zoomFactor,b)},scale:function(a,b){a=this.scaleZoomFactor(a),this.addOffset({x:(a-1)*(b.x+this.offset.x),y:(a-1)*(b.y+this.offset.y)})},scaleZoomFactor:function(a){var b=this.zoomFactor;return this.zoomFactor*=a,this.zoomFactor=Math.min(this.options.maxZoom,Math.max(this.zoomFactor,this.options.minZoom)),this.zoomFactor/b},drag:function(a,b){b&&this.addOffset({x:-(a.x-b.x),y:-(a.y-b.y)})},getTouchCenter:function(a){return this.getVectorAvg(a)},getVectorAvg:function(a){return{x:b.reduce(b.pluck(a,"x"),d)/a.length,y:b.reduce(b.pluck(a,"y"),d)/a.length}},addOffset:function(a){this.offset={x:this.offset.x+a.x,y:this.offset.y+a.y}},sanitize:function(){this.zoomFactor<this.options.zoomOutFactor?this.zoomOutAnimation():this.isInsaneOffset(this.offset)&&this.sanitizeOffsetAnimation()},isInsaneOffset:function(a){var b=this.sanitizeOffset(a);return b.x!==a.x||b.y!==a.y},sanitizeOffsetAnimation:function(){var a=this.sanitizeOffset(this.offset),c={x:this.offset.x,y:this.offset.y},d=b.bind(function(b){this.offset.x=c.x+b*(a.x-c.x),this.offset.y=c.y+b*(a.y-c.y),this.update()},this);this.animate(this.options.animationDuration,this.options.animationInterval,d,this.swing)},zoomOutAnimation:function(){var a=this.zoomFactor,c=1,d=this.getCurrentZoomCenter(),e=b.bind(function(b){this.scaleTo(a+b*(c-a),d)},this);this.animate(this.options.animationDuration,this.options.animationInterval,e,this.swing)},updateAspectRatio:function(){this.setContainerY(this.getContainerX()/this.getAspectRatio())},getInitialZoomFactor:function(){return this.container.width()/this.el.width()},getAspectRatio:function(){return this.el.width()/this.el.height()},getCurrentZoomCenter:function(){var a=this.container.width()*this.zoomFactor,b=this.offset.x,c=a-b-this.container.width(),d=b/c,e=d*this.container.width()/(d+1),f=this.container.height()*this.zoomFactor,g=this.offset.y,h=f-g-this.container.height(),i=g/h,j=i*this.container.height()/(i+1);return 0===c&&(e=this.container.width()),0===h&&(j=this.container.height()),{x:e,y:j}},canDrag:function(){return!e(this.zoomFactor,1)},getTouches:function(a){var c=this.container.offset();return b.map(a.touches,function(a){return{x:a.pageX-c.left,y:a.pageY-c.top}})},animate:function(a,c,d,e,f){var g=(new Date).getTime(),h=b.bind(function(){if(this.inAnimation){var b=(new Date).getTime()-g,i=b/a;b>=a?(d(1),f&&f(),this.update(),this.stopAnimation(),this.update()):(e&&(i=e(i)),d(i),this.update(),setTimeout(h,c))}},this);this.inAnimation=!0,h()},stopAnimation:function(){this.inAnimation=!1},swing:function(a){return-Math.cos(a*Math.PI)/2+.5},getContainerX:function(){return this.container.width()},getContainerY:function(){return this.container.height()},setContainerY:function(a){return this.container.height(a)},setupMarkup:function(){this.container=a('<div class="pinch-zoom-container"></div>'),this.el.before(this.container),this.container.append(this.el),this.container.css({overflow:"hidden",position:"relative"}),this.el.css({webkitTransformOrigin:"0% 0%",mozTransformOrigin:"0% 0%",msTransformOrigin:"0% 0%",oTransformOrigin:"0% 0%",transformOrigin:"0% 0%",position:"absolute"})},end:function(){this.hasInteraction=!1,this.sanitize(),this.update()},bindEvents:function(){f(this.container.get(0),this),a(window).bind("resize",b.bind(this.update,this)),a(this.el).find("img").bind("load",b.bind(this.update,this))},update:function(){this.updatePlaned||(this.updatePlaned=!0,setTimeout(b.bind(function(){this.updatePlaned=!1,this.updateAspectRatio();var a=this.getInitialZoomFactor()*this.zoomFactor,c=-this.offset.x/a,d=-this.offset.y/a,e="scale3d("+a+", "+a+",1) "+"translate3d("+c+"px,"+d+"px,0px)",f="scale("+a+", "+a+") "+"translate("+c+"px,"+d+"px)",g=b.bind(function(){this.clone&&(this.clone.remove(),delete this.clone)},this);!this.options.use2d||this.hasInteraction||this.inAnimation?(this.is3d=!0,g(),this.el.css({webkitTransform:e,oTransform:f,msTransform:f,mozTransform:f,transform:e})):(this.is3d&&(this.clone=this.el.clone(),this.clone.css("pointer-events","none"),this.clone.appendTo(this.container),setTimeout(g,200)),this.el.css({webkitTransform:f,oTransform:f,msTransform:f,mozTransform:f,transform:f}),this.is3d=!1)},this),0))}},f=function(a,c){var d=null,e=0,f=null,g=null,h=function(a,b){if(d!==a){if(d&&!a)switch(d){case"zoom":c.handleZoomEnd(b);break;case"drag":c.handleDragEnd(b)}switch(a){case"zoom":c.handleZoomStart(b);break;case"drag":c.handleDragStart(b)}}d=a},i=function(a){2===e?h("zoom"):1===e&&c.canDrag()?h("drag",a):h(null,a)},j=function(a){return b.map(a,function(a){return{x:a.pageX,y:a.pageY}})},k=function(a,b){var c,d;return c=a.x-b.x,d=a.y-b.y,Math.sqrt(c*c+d*d)},l=function(a,b){var c=k(a[0],a[1]),d=k(b[0],b[1]);return d/c},m=function(a){a.stopPropagation(),a.preventDefault()},n=function(a){var b=(new Date).getTime();if(e>1&&(f=null),300>b-f)switch(m(a),c.handleDoubleTap(a),d){case"zoom":c.handleZoomEnd(a);break;case"drag":c.handleDragEnd(a)}1===e&&(f=b)},o=!0;a.addEventListener("touchstart",function(a){o=!0,e=a.touches.length,n(a)}),a.addEventListener("touchmove",function(a){if(o)i(a),d&&m(a),g=j(a.touches);else{switch(d){case"zoom":c.handleZoom(a,l(g,j(a.touches)));break;case"drag":c.handleDrag(a)}d&&(m(a),c.update())}o=!1}),a.addEventListener("touchend",function(a){e=a.touches.length,i(a)})},c};"undefined"!=typeof define&&define.amd?define(["jquery","underscore"],function(b,c){return a(b,c)}):(window.RTP=window.RTP||{},window.RTP.PinchZoom=a(jQuery,_))}.call(this);