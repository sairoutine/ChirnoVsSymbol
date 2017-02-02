(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * Proton v2.1.0
 * https://github.com/a-jie/Proton
 *
 * Copyright 2011-2016, A-JIE
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license
 *
 */
(function(a,b){function bf(a,b,c,d){bf._super_.call(this),this.reset(a,b,c,d)}function be(a,b,c,d){be._super_.call(this),this.x=a,this.y=b,this.width=c,this.height=d}function bd(a,b){bd._super_.call(this),this.x=a,this.y=b}function bc(a,b,c){bc._super_.call(this),this.x=a,this.y=b,this.radius=c,this.angle=0,this.center={x:this.x,y:this.y}}function bb(a,b,d,e,f){bb._super_.call(this),d-a>=0?(this.x1=a,this.y1=b,this.x2=d,this.y2=e):(this.x1=d,this.y1=e,this.x2=a,this.y2=b),this.dx=this.x2-this.x1,this.dy=this.y2-this.y1,this.minx=Math.min(this.x1,this.x2),this.miny=Math.min(this.y1,this.y2),this.maxx=Math.max(this.x1,this.x2),this.maxy=Math.max(this.y1,this.y2),this.dot=this.x2*this.y1-this.x1*this.y2,this.xxyy=this.dx*this.dx+this.dy*this.dy,this.gradient=this.getGradient(),this.length=this.getLength(),this.direction=c.Util.initValue(f,">")}function ba(){this.vector=new c.Vector2D(0,0),this.random=0,this.crossType="dead",this.alert=!0}function _(a,b){_._super_.call(this,a,b),this.gl=this.element.getContext("experimental-webgl",{antialias:!0,stencil:!1,depth:!1}),this.gl||alert("Sorry your browser do not suppest WebGL!"),this.initVar(),this.setMaxRadius(),this.initShaders(),this.initBuffers(),this.gl.blendEquation(this.gl.FUNC_ADD),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.enable(this.gl.BLEND)}function $(a,b,c){$._super_.call(this,a,b),this.context=this.element.getContext("2d"),this.imageData=null,this.rectangle=null,this.rectangle=c,this.createImageData(c)}function Z(a,b){Z._super_.call(this,a,b),this.stroke=null,this.context=this.element.getContext("2d"),this.bufferCache={}}function Y(a,b,c){Y._super_.call(this,a,b),this.stroke=c}function X(a,b){X._super_.call(this,a,b),this.stroke=null}function W(a,b,d){this.proton=a,this.element=b,this.stroke=d,this.pool=new c.Pool}function V(a,b,d){this.element=d,this.type=c.Util.initValue(a,"canvas"),this.proton=b,this.renderer=this.getRenderer()}function T(b,d,e){this.mouseTarget=c.Util.initValue(b,a),this.ease=c.Util.initValue(d,.7),this._allowEmitting=!1,this.initEventHandler(),T._super_.call(this,e)}function S(a){this.selfBehaviours=[],S._super_.call(this,a)}function R(a){this.initializes=[],this.particles=[],this.behaviours=[],this.emitTime=0,this.emitTotalTimes=-1,this.damping=.006,this.bindEmitter=!0,this.rate=new c.Rate(1,.1),R._super_.call(this,a),this.id="emitter_"+R.ID++}function Q(a,b,d,e){Q._super_.call(this,d,e),this.distanceVec=new c.Vector2D,this.centerPoint=c.Util.initValue(a,new c.Vector2D),this.force=c.Util.initValue(this.normalizeValue(b),100),this.name="GravityWell"}function P(a,b,c,d){P._super_.call(this,c,d),this.reset(a,b),this.name="Color"}function O(a,b,c,d,e){O._super_.call(this,d,e),this.reset(a,b,c),this.name="Rotate"}function N(a,b,c,d){N._super_.call(this,c,d),this.reset(a,b),this.name="Scale"}function M(a,b,c,d){M._super_.call(this,c,d),this.reset(a,b),this.name="Alpha"}function L(a,b,c,d){L._super_.call(this,c,d),this.reset(a,b),this.name="CrossZone"}function K(a,b,c,d,e){K._super_.call(this,d,e),this.reset(a,b,c),this.name="Collision"}function J(a,b,c){J._super_.call(this,0,a,b,c),this.name="Gravity"}function I(a,b,c,d,e){I._super_.call(this,a,b,c,d,e),this.force*=-1,this.name="Repulsion"}function H(a,b,c,d,e){H._super_.call(this,d,e),this.reset(a,b,c),this.time=0,this.name="RandomDrift"}function G(a,b,d,e,f){G._super_.call(this,e,f),this.targetPosition=c.Util.initValue(a,new c.Vector2D),this.radius=c.Util.initValue(d,1e3),this.force=c.Util.initValue(this.normalizeValue(b),100),this.radiusSq=this.radius*this.radius,this.attractionForce=new c.Vector2D,this.lengthSq=0,this.name="Attraction"}function F(a,b,d,e){F._super_.call(this,d,e),this.force=this.normalizeForce(new c.Vector2D(a,b)),this.name="Force"}function E(a,b,d){E._super_.call(this),this.image=this.setSpanValue(a),this.w=c.Util.initValue(b,20),this.h=c.Util.initValue(d,this.w)}function D(a,b,d){D._super_.call(this),this.radius=c.Util.setSpanValue(a,b,d)}function C(a,b,d){C._super_.call(this),this.massPan=c.Util.setSpanValue(a,b,d)}function B(a,b,d){B._super_.call(this),this.rPan=c.Util.setSpanValue(a),this.thaPan=c.Util.setSpanValue(b),this.type=c.Util.initValue(d,"vector")}function A(a){A._super_.call(this),this.zone=c.Util.initValue(a,new c.PointZone)}function z(a,b,d){z._super_.call(this),this.lifePan=c.Util.setSpanValue(a,b,d)}function x(){}function w(a,b){this.numPan=c.Util.initValue(a,1),this.timePan=c.Util.initValue(b,1),this.numPan=c.Util.setSpanValue(this.numPan),this.timePan=c.Util.setSpanValue(this.timePan),this.startTime=0,this.nextTime=0,this.init()}function v(a,b){this.id="Behaviour_"+v.id++,this.life=c.Util.initValue(a,Infinity),this.easing=c.ease.setEasingByName(b),this.age=0,this.energy=1,this.dead=!1,this.parents=[],this.name="Behaviour"}function t(a,b,c,d){this.x=a,this.y=b,this.width=c,this.height=d,this.bottom=this.y+this.height,this.right=this.x+this.width}function s(a){c.Util.isArray(a)?this.colorArr=a:this.colorArr=[a]}function r(a,b,d){this.isArray=!1,c.Util.isArray(a)?(this.isArray=!0,this.a=a):(this.a=c.Util.initValue(a,1),this.b=c.Util.initValue(b,this.a),this.center=c.Util.initValue(d,!1))}function k(){this.cID=0,this.list={}}function j(a){this.id="particle_"+j.ID++,this.reset(!0),c.Util.setPrototypeByObject(this,a)}function i(){this.mats=[],this.size=0;for(var a=0;a<20;a++)this.mats.push(c.Mat3.create([0,0,0,0,0,0,0,0,0]))}function d(){this.initialize()}function c(a,b){this.integrationType=c.Util.initValue(b,c.EULER),this.emitters=[],this.renderers=[],this.time=0,this.oldTime=0,c.pool=new c.Pool(100),c.integrator=new c.NumericalIntegration(this.integrationType)}c.POOL_MAX=1e3,c.TIME_STEP=60,c.USE_CLOCK=!1,c.MEASURE=100,c.EULER="euler",c.RK2="runge-kutta2",c.RK4="runge-kutta4",c.VERLET="verlet",c.PARTICLE_CREATED="partilcleCreated",c.PARTICLE_UPDATE="partilcleUpdate",c.PARTICLE_SLEEP="particleSleep",c.PARTICLE_DEAD="partilcleDead",c.PROTON_UPDATE="protonUpdate",c.PROTON_UPDATE_AFTER="protonUpdateAfter",c.EMITTER_ADDED="emitterAdded",c.EMITTER_REMOVED="emitterRemoved",c.amendChangeTabsBug=!0,c.TextureBuffer={},c.TextureCanvasBuffer={},c.prototype={addRender:function(a){a.proton=this,this.renderers.push(a.proton)},addEmitter:function(a){this.emitters.push(a),a.parent=this,this.dispatchEvent(c.EMITTER_ADDED,a)},removeEmitter:function(a){var b=this.emitters.indexOf(a);this.emitters.splice(b,1),a.parent=null,this.dispatchEvent(c.EMITTER_REMOVED,a)},update:function(){this.dispatchEvent(c.PROTON_UPDATE);if(c.USE_CLOCK){this.oldTime||(this.oldTime=(new Date).getTime());var a=(new Date).getTime();this.elapsed=(a-this.oldTime)/1e3,c.amendChangeTabsBug&&this.amendChangeTabsBug(),this.oldTime=a}else this.elapsed=.0167;if(this.elapsed>0)for(var b=0;b<this.emitters.length;b++)this.emitters[b].update(this.elapsed);this.dispatchEvent(c.PROTON_UPDATE_AFTER)},amendChangeTabsBug:function(){this.elapsed>.5&&(this.oldTime=(new Date).getTime(),this.elapsed=0)},getCount:function(){var a=0,b=this.emitters.length;for(var c=0;c<b;c++)a+=this.emitters[c].particles.length;return a},destroy:function(){var a=this.emitters.length;for(var b=0;b<a;b++)this.emitters[b].destroy(),delete this.emitters[b];this.emitters=[],this.time=0,this.oldTime=0,c.pool.release()}},a.Proton=c,d.initialize=function(a){a.addEventListener=e.addEventListener,a.removeEventListener=e.removeEventListener,a.removeAllEventListeners=e.removeAllEventListeners,a.hasEventListener=e.hasEventListener,a.dispatchEvent=e.dispatchEvent};var e=d.prototype;e._listeners=null,e.initialize=function(){},e.addEventListener=function(a,b){this._listeners?this.removeEventListener(a,b):this._listeners={},this._listeners[a]||(this._listeners[a]=[]),this._listeners[a].push(b);return b},e.removeEventListener=function(a,b){if(!!this._listeners){if(!this._listeners[a])return;var c=this._listeners[a];for(var d=0,e=c.length;d<e;d++)if(c[d]==b){e==1?delete this._listeners[a]:c.splice(d,1);break}}},e.removeAllEventListeners=function(a){a?this._listeners&&delete this._listeners[a]:this._listeners=null},e.dispatchEvent=function(a,b){var c=!1,d=this._listeners;if(a&&d){var e=d[a];if(!e)return c;e=e.slice();var f,g=e.length;while(g--){var f=e[g];c=c||f(b)}}return!!c},e.hasEventListener=function(a){var b=this._listeners;return!!b&&!!b[a]},d.initialize(c.prototype),c.EventDispatcher=d;var f=f||{initValue:function(a,c){var a=a!=null&&a!=b?a:c;return a},isArray:function(a){return typeof a=="object"&&a.hasOwnProperty("length")},destroyArray:function(a){a.length=0},destroyObject:function(a){for(var b in a)delete a[b]},getVector2D:function(a,b){if(typeof a=="object")return a;var d=new c.Vector2D(a,b);return d},classApply:function(a,b){if(!b)return new a;var c=[null].concat(b),d=a.bind.apply(a,c);return new d},judgeVector2D:function(a){var b="";if(a.hasOwnProperty("x")||a.hasOwnProperty("y")||a.hasOwnProperty("p")||a.hasOwnProperty("position"))b+="p";if(a.hasOwnProperty("vx")||a.hasOwnProperty("vx")||a.hasOwnProperty("v")||a.hasOwnProperty("velocity"))b+="v";if(a.hasOwnProperty("ax")||a.hasOwnProperty("ax")||a.hasOwnProperty("a")||a.hasOwnProperty("accelerate"))b+="a";return b},setVector2DByObject:function(a,b){b.hasOwnProperty("x")&&(a.p.x=b.x),b.hasOwnProperty("y")&&(a.p.y=b.y),b.hasOwnProperty("vx")&&(a.v.x=b.vx),b.hasOwnProperty("vy")&&(a.v.y=b.vy),b.hasOwnProperty("ax")&&(a.a.x=b.ax),b.hasOwnProperty("ay")&&(a.a.y=b.ay),b.hasOwnProperty("p")&&particle.p.copy(b.p),b.hasOwnProperty("v")&&particle.v.copy(b.v),b.hasOwnProperty("a")&&particle.a.copy(b.a),b.hasOwnProperty("position")&&particle.p.copy(b.position),b.hasOwnProperty("velocity")&&particle.v.copy(b.velocity),b.hasOwnProperty("accelerate")&&particle.a.copy(b.accelerate)},addPrototypeByObject:function(a,b,d){for(var e in b)d?d.indexOf(e)<0&&(a[e]=c.Util.getSpanValue(b[e])):a[e]=c.Util.getSpanValue(b[e]);return a},setPrototypeByObject:function(a,b,d){for(var e in b)a.hasOwnProperty(e)&&(d?d.indexOf(e)<0&&(a[e]=c.Util.getSpanValue(b[e])):a[e]=c.Util.getSpanValue(b[e]));return a},setSpanValue:function(a,b,d){return a instanceof c.Span?a:b?d?new c.Span(a,b,d):new c.Span(a,b):new c.Span(a)},getSpanValue:function(a){return a instanceof c.Span?a.getValue():a},inherits:function(a,b){a._super_=b;if(Object.create)a.prototype=Object.create(b.prototype,{constructor:{value:a}});else{var c=function(){};c.prototype=b.prototype,a.prototype=new c,a.prototype.constructor=a}},getImageData:function(a,b,c){a.drawImage(b,c.x,c.y);var d=a.getImageData(c.x,c.y,c.width,c.height);a.clearRect(c.x,c.y,c.width,c.height);return d},getImage:function(a,b,c,d){typeof a=="string"?this.loadAndSetImage(a,b,c,d):typeof a=="object"?this.loadAndSetImage(a.src,b,c,d):a instanceof Image&&this.loadedImage(a.src,b,c,d,a)},loadedImage:function(a,b,d,e,f){b.target=f,b.transform.src=a,c.TextureBuffer[a]||(c.TextureBuffer[a]=b.target);if(d)if(c.TextureCanvasBuffer[a])b.transform.canvas=c.TextureCanvasBuffer[a];else{var g=c.WebGLUtil.nhpot(b.target.width),h=c.WebGLUtil.nhpot(b.target.height);b.transform.canvas=c.DomUtil.createCanvas("canvas"+a,g,h);var i=b.transform.canvas.getContext("2d");i.drawImage(b.target,0,0,b.target.width,b.target.height),c.TextureCanvasBuffer[a]=b.transform.canvas}e&&e(b)},loadAndSetImage:function(a,b,d,e){if(c.TextureBuffer[a])this.loadedImage(a,b,d,e,c.TextureBuffer[a]);else{var f=this,g=new Image;g.onload=function(c){f.loadedImage(a,b,d,e,c.target)},g.src=a}},hexToRGB:function(a){var b=a.charAt(0)=="#"?a.substring(1,7):a,c=parseInt(b.substring(0,2),16),d=parseInt(b.substring(2,4),16),e=parseInt(b.substring(4,6),16);return{r:c,g:d,b:e}},rgbToHex:function(a){return"rgb("+a.r+", "+a.g+", "+a.b+")"}};c.Util=f,Function.prototype.bind||(Function.prototype.bind=function(a){if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d?this:a||this,b.concat(Array.prototype.slice.call(arguments)))};d.prototype=this.prototype,e.prototype=new d;return e});var g=g||{ipot:function(a){return(a&a-1)==0},nhpot:function(a){--a;for(var b=1;b<32;b<<=1)a=a|a>>b;return a+1},makeTranslation:function(a,b){return[1,0,0,0,1,0,a,b,1]},makeRotation:function(a){var b=Math.cos(a),c=Math.sin(a);return[b,-c,0,c,b,0,0,0,1]},makeScale:function(a,b){return[a,0,0,0,b,0,0,0,1]},matrixMultiply:function(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],i=a[6],j=a[7],k=a[8],l=b[0],m=b[1],n=b[2],o=b[3],p=b[4],q=b[5],r=b[6],s=b[7],t=b[8];return[c*l+d*o+e*r,c*m+d*p+e*s,c*n+d*q+e*t,f*l+g*o+h*r,f*m+g*p+h*s,f*n+g*q+h*t,i*l+j*o+k*r,i*m+j*p+k*s,i*n+j*q+k*t]}};c.WebGLUtil=g;var h=h||{createCanvas:function(a,b,c,d){var e=document.createElement("canvas"),f=d?d:"absolute";e.id=a,e.width=b,e.height=c,e.style.position=f,e.style.opacity=0,this.transformDom(e,-500,-500,0,0);return e},transformDom:function(a,b,c,d,e){a.style.WebkitTransform="translate("+b+"px, "+c+"px) "+"scale("+d+") "+"rotate("+e+"deg)",a.style.MozTransform="translate("+b+"px, "+c+"px) "+"scale("+d+") "+"rotate("+e+"deg)",a.style.OTransform="translate("+b+"px, "+c+"px) "+"scale("+d+") "+"rotate("+e+"deg)",a.style.msTransform="translate("+b+"px, "+c+"px) "+"scale("+d+") "+"rotate("+e+"deg)",a.style.transform="translate("+b+"px, "+c+"px) "+"scale("+d+") "+"rotate("+e+"deg)"}};c.DomUtil=h,i.prototype.set=function(a,b){b==0?c.Mat3.set(a,this.mats[0]):c.Mat3.multiply(this.mats[b-1],a,this.mats[b]),this.size=Math.max(this.size,b+1)},i.prototype.push=function(a){this.size==0?c.Mat3.set(a,this.mats[0]):c.Mat3.multiply(this.mats[this.size-1],a,this.mats[this.size]),this.size++},i.prototype.pop=function(){this.size>0&&this.size--},i.prototype.top=function(){return this.mats[this.size-1]},c.MStack=i,j.ID=0,j.prototype={getDirection:function(){return Math.atan2(this.v.x,-this.v.y)*(180/Math.PI)},reset:function(a){this.life=Infinity,this.age=0,this.energy=1,this.dead=!1,this.sleep=!1,this.target=null,this.sprite=null,this.parent=null,this.mass=1,this.radius=10,this.alpha=1,this.scale=1,this.rotation=0,this.color=null,this.easing=c.ease.setEasingByName(c.easeLinear),a?(this.transform={},this.p=new c.Vector2D,this.v=new c.Vector2D,this.a=new c.Vector2D,this.old={p:new c.Vector2D,v:new c.Vector2D,a:new c.Vector2D},this.behaviours=[]):(c.Util.destroyObject(this.transform),this.p.set(0,0),this.v.set(0,0),this.a.set(0,0),this.old.p.set(0,0),this.old.v.set(0,0),this.old.a.set(0,0),this.removeAllBehaviours()),this.transform.rgb={r:255,g:255,b:255};return this},update:function(a,b){if(!this.sleep){this.age+=a;var c=this.behaviours.length,d;for(d=0;d<c;d++)this.behaviours[d]&&this.behaviours[d].applyBehaviour(this,a,b)}if(this.age>=this.life)this.destroy();else{var e=this.easing(this.age/this.life);this.energy=Math.max(1-e,0)}},addBehaviour:function(a){this.behaviours.push(a),a.hasOwnProperty("parents")&&a.parents.push(this),a.initialize(this)},addBehaviours:function(a){var b=a.length,c;for(c=0;c<b;c++)this.addBehaviour(a[c])},removeBehaviour:function(a){var b=this.behaviours.indexOf(a);if(b>-1){var a=this.behaviours.splice(b,1);a.parents=null}},removeAllBehaviours:function(){c.Util.destroyArray(this.behaviours)},destroy:function(){this.removeAllBehaviours(),this.energy=0,this.dead=!0,this.parent=null}},c.Particle=j,k.prototype={create:function(a,b){this.cID++;return typeof a=="function"?c.Util.classApply(a,b):a.clone()},getCount:function(){var a=0;for(var b in this.list)a+=this.list[b].length;return a++},get:function(a,b){var c,d=a.__puid||l.id(a);this.list[d]&&this.list[d].length>0?c=this.list[d].pop():c=this.create(a,b),c.__puid=a.__puid||d;return c},set:function(a){return this._getList(a.__puid).push(a)},destroy:function(){for(var a in this.list)this.list[a].length=0,delete this.list[a]},_getList:function(a){a=a||"default",this.list[a]||(this.list[a]=[]);return this.list[a]}},c.Pool=k;var l={_id:0,_uids:{},id:function(a){for(var b in this._uids)if(this._uids[b]==a)return b;var c="PUID_"+this._id++;this._uids[c]=a;return c},hash:function(a){return}},m={randomAToB:function(a,b,c){return c?Math.floor(Math.random()*(b-a))+a:a+Math.random()*(b-a)},randomFloating:function(a,b,c){return m.randomAToB(a-b,a+b,c)},randomZone:function(a){},degreeTransform:function(a){return a*Math.PI/180},toColor16:function(a){return"#"+a.toString(16)},randomColor:function(){return"#"+("00000"+(Math.random()*16777216<<0).toString(16)).slice(-6)}};c.MathUtils=m;var o=function(a){this.type=c.Util.initValue(a,c.EULER)};o.prototype={integrate:function(a,b,c){this.eulerIntegrate(a,b,c)},eulerIntegrate:function(a,b,c){a.sleep||(a.old.p.copy(a.p),a.old.v.copy(a.v),a.a.multiplyScalar(1/a.mass),a.v.add(a.a.multiplyScalar(b)),a.p.add(a.old.v.multiplyScalar(b)),c&&a.v.multiplyScalar(c),a.a.clear())}},c.NumericalIntegration=o;var p=function(a,b){this.x=a||0,this.y=b||0};p.prototype={set:function(a,b){this.x=a,this.y=b;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;default:throw new Error("index is out of range: "+a)}},getGradient:function(){if(this.x!=0)return Math.atan2(this.y,this.x);if(this.y>0)return Math.PI/2;if(this.y<0)return-Math.PI/2},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+a)}},copy:function(a){this.x=a.x,this.y=a.y;return this},add:function(a,c){if(c!==b)return this.addVectors(a,c);this.x+=a.x,this.y+=a.y;return this},addXY:function(a,b){this.x+=a,this.y+=b;return this},addVectors:function(a,b){this.x=a.x+b.x,this.y=a.y+b.y;return this},addScalar:function(a){this.x+=a,this.y+=a;return this},sub:function(a,c){if(c!==b)return this.subVectors(a,c);this.x-=a.x,this.y-=a.y;return this},subVectors:function(a,b){this.x=a.x-b.x,this.y=a.y-b.y;return this},multiplyScalar:function(a){this.x*=a,this.y*=a;return this},divideScalar:function(a){a!==0?(this.x/=a,this.y/=a):this.set(0,0);return this},min:function(a){this.x>a.x&&(this.x=a.x),this.y>a.y&&(this.y=a.y);return this},max:function(a){this.x<a.x&&(this.x=a.x),this.y<a.y&&(this.y=a.y);return this},clamp:function(a,b){this.x<a.x?this.x=a.x:this.x>b.x&&(this.x=b.x),this.y<a.y?this.y=a.y:this.y>b.y&&(this.y=b.y);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize:function(){return this.divideScalar(this.length())},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},rotate:function(a){var b=this.x,c=this.y;this.x=b*Math.cos(a)+c*Math.sin(a),this.y=-b*Math.sin(a)+c*Math.cos(a);return this},distanceToSquared:function(a){var b=this.x-a.x,c=this.y-a.y;return b*b+c*c},setLength:function(a){var b=this.length();b!==0&&a!==b&&this.multiplyScalar(a/b);return this},lerp:function(a,b){this.x+=(a.x-this.x)*b,this.y+=(a.y-this.y)*b;return this},equals:function(a){return a.x===this.x&&a.y===this.y},toArray:function(){return[this.x,this.y]},clear:function(){this.x=0,this.y=0;return this},clone:function(){return new c.Vector2D(this.x,this.y)}},c.Vector2D=p;var q=function(a,b){this.r=Math.abs(a)||0,this.tha=b||0};q.prototype={set:function(a,b){this.r=a,this.tha=b;return this},setR:function(a){this.r=a;return this},setTha:function(a){this.tha=a;return this},copy:function(a){this.r=a.r,this.tha=a.tha;return this},toVector:function(){return new c.Vector2D(this.getX(),this.getY())},getX:function(){return this.r*Math.sin(this.tha)},getY:function(){return-this.r*Math.cos(this.tha)},normalize:function(){this.r=1;return this},equals:function(a){return a.r===this.r&&a.tha===this.tha},toArray:function(){return[this.r,this.tha]},clear:function(){this.r=0,this.tha=0;return this},clone:function(){return new c.Polar2D(this.r,this.tha)}},c.Polar2D=q,r.prototype={getValue:function(a){return this.isArray?this.a[Math.floor(this.a.length*Math.random())]:this.center?c.MathUtils.randomFloating(this.a,this.b,a):c.MathUtils.randomAToB(this.a,this.b,a)}},c.Span=r,c.getSpan=function(a,b,d){return new c.Span(a,b,d)},c.Util.inherits(s,c.Span),s.prototype.getValue=function(){var a=this.colorArr[Math.floor(this.colorArr.length*Math.random())];return a=="random"||a=="Random"?c.MathUtils.randomColor():a},c.ColorSpan=s,t.prototype={contains:function(a,b){return a<=this.right&&a>=this.x&&b<=this.bottom&&b>=this.y?!0:!1}},c.Rectangle=t;var u=u||{create:function(a){var b=new Float32Array(9);a&&this.set(a,b);return b},set:function(a,b){for(var c=0;c<9;c++)b[c]=a[c];return b},multiply:function(a,b,c){var d=a[0],e=a[1],f=a[2],g=a[3],h=a[4],i=a[6],j=a[7],k=b[0],l=b[1],m=b[2],n=b[3],o=b[4],p=b[6],q=b[7];c[0]=k*d+l*g,c[1]=k*e+l*h,c[2]=f*m,c[3]=n*d+o*g,c[4]=n*e+o*h,c[6]=p*d+q*g+i,c[7]=p*e+q*h+j;return c},inverse:function(a,b){var c=a[0],d=a[1],e=a[3],f=a[4],g=a[6],h=a[7],i=f,j=-e,k=h*e-f*g,l=c*i+d*j,m;m=1/l,b[0]=i*m,b[1]=-d*m,b[3]=j*m,b[4]=c*m,b[6]=k*m,b[7]=(-h*c+d*g)*m;return b},multiplyVec2:function(a,b,c){var d=b[0],e=b[1];c[0]=d*a[0]+e*a[3]+a[6],c[1]=d*a[1]+e*a[4]+a[7];return c}};c.Mat3=u,v.id=0,v.prototype={reset:function(a,b){this.life=c.Util.initValue(a,Infinity),this.easing=c.Util.initValue(b,c.ease.setEasingByName(c.easeLinear))},normalizeForce:function(a){return a.multiplyScalar(c.MEASURE)},normalizeValue:function(a){return a*c.MEASURE},initialize:function(a){},applyBehaviour:function(a,b,c){this.age+=b;if(this.age>=this.life||this.dead)this.energy=0,this.dead=!0,this.destroy();else{var d=this.easing(a.age/a.life);this.energy=Math.max(1-d,0)}},destroy:function(){var a,b=this.parents.length,c;for(c=0;c<b;c++)this.parents[c].removeBehaviour(this);this.parents=[]}},c.Behaviour=v,w.prototype={init:function(){this.startTime=0,this.nextTime=this.timePan.getValue()},getValue:function(a){this.startTime+=a;if(this.startTime>=this.nextTime){this.startTime=0,this.nextTime=this.timePan.getValue();return this.numPan.b==1?this.numPan.getValue(!1)>.5?1:0:this.numPan.getValue(!0)}return 0}},c.Rate=w,x.prototype.reset=function(){},x.prototype.init=function(a,b){b?this.initialize(b):this.initialize(a)},x.prototype.initialize=function(a){},c.Initialize=x;var y={initialize:function(a,b,d){var e=d.length,f;for(f=0;f<e;f++)d[f]instanceof c.Initialize?d[f].init(a,b):c.InitializeUtil.init(a,b,d[f]);c.InitializeUtil.bindEmitter(a,b)},init:function(a,b,d){c.Util.setPrototypeByObject(b,d),c.Util.setVector2DByObject(b,d)},bindEmitter:function(a,b){a.bindEmitter&&(b.p.add(a.p),b.v.add(a.v),b.a.add(a.a),b.v.rotate(c.MathUtils.degreeTransform(a.rotation)))}};c.InitializeUtil=y,c.Util.inherits(z,c.Initialize),z.prototype.initialize=function(a){this.lifePan.a==Infinity?a.life=Infinity:a.life=this.lifePan.getValue()},c.Life=z,c.Util.inherits(A,c.Initialize),A.prototype.reset=function(a){this.zone=c.Util.initValue(a,new c.PointZone)},A.prototype.initialize=function(a){this.zone.getPosition(),a.p.x=this.zone.vector.x,a.p.y=this.zone.vector.y},c.Position=A,c.P=A,c.Util.inherits(B,c.Initialize),B.prototype.reset=function(a,b,d){this.rPan=c.Util.setSpanValue(a),this.thaPan=c.Util.setSpanValue(b),this.type=c.Util.initValue(d,"vector")},B.prototype.normalizeVelocity=function(a){return a*c.MEASURE},B.prototype.initialize=function(a){if(this.type=="p"||this.type=="P"||this.type=="polar"){var b=new c.Polar2D(this.normalizeVelocity(this.rPan.getValue()),this.thaPan.getValue()*Math.PI/180);a.v.x=b.getX(),a.v.y=b.getY()}else a.v.x=this.normalizeVelocity(this.rPan.getValue()),a.v.y=this.normalizeVelocity(this.thaPan.getValue())},c.Velocity=B,c.V=B,c.Util.inherits(C,c.Initialize),C.prototype.initialize=function(a){a.mass=this.massPan.getValue()},c.Mass=C,c.Util.inherits(D,c.Initialize),D.prototype.reset=function(a,b,d){this.radius=c.Util.setSpanValue(a,b,d)},D.prototype.initialize=function(a){a.radius=this.radius.getValue(),a.transform.oldRadius=a.radius},c.Radius=D,c.Util.inherits(E,c.Initialize),E.prototype.initialize=function(a){var b=this.image.getValue();typeof b=="string"?a.target={width:this.w,height:this.h,src:b}:a.target=b},E.prototype.setSpanValue=function(a){return a instanceof c.ColorSpan?a:new c.ColorSpan(a)},c.ImageTarget=E,c.Util.inherits(F,c.Behaviour),F.prototype.reset=function(a,b,d,e){this.force=this.normalizeForce(new c.Vector2D(a,b)),d&&F._super_.prototype.reset.call(this,d,e)},F.prototype.applyBehaviour=function(a,b,c){F._super_.prototype.applyBehaviour.call(this,a,b,c),a.a.add(this.force)},c.Force=F,c.F=F,c.Util.inherits(G,c.Behaviour),G.prototype.reset=function(a,b,d,e,f){this.targetPosition=c.Util.initValue(a,new c.Vector2D),this.radius=c.Util.initValue(d,1e3),this.force=c.Util.initValue(this.normalizeValue(b),100),this.radiusSq=this.radius*this.radius,this.attractionForce=new c.Vector2D,this.lengthSq=0,e&&G._super_.prototype.reset.call(this,e,f)},G.prototype.applyBehaviour=function(a,b,c){G._super_.prototype.applyBehaviour.call(this,a,b,c),this.attractionForce.copy(this.targetPosition),this.attractionForce.sub(a.p),this.lengthSq=this.attractionForce.lengthSq(),this.lengthSq>4e-6&&this.lengthSq<this.radiusSq&&(this.attractionForce.normalize(),this.attractionForce.multiplyScalar(1-this.lengthSq/this.radiusSq),this.attractionForce.multiplyScalar(this.force),a.a.add(this.attractionForce))},c.Attraction=G,c.Util.inherits(H,c.Behaviour),H.prototype.reset=function(a,b,d,e,f){this.panFoce=new c.Vector2D(a,b),this.panFoce=this.normalizeForce(this.panFoce),this.delay=d,e&&H._super_.prototype.reset.call(this,e,f)},H.prototype.applyBehaviour=function(a,b,d){H._super_.prototype.applyBehaviour.call(this,a,b,d),this.time+=b,this.time>=this.delay&&(a.a.addXY(c.MathUtils.randomAToB(-this.panFoce.x,this.panFoce.x),c.MathUtils.randomAToB(-this.panFoce.y,this.panFoce.y)),this.time=0)},c.RandomDrift=H,c.Util.inherits(I,c.Attraction),I.prototype.reset=function(a,b,c,d,e){I._super_.prototype.reset.call(this,a,b,c,d,e),this.force*=-1},c.Repulsion=I,c.Util.inherits(J,c.Force),J.prototype.reset=function(a,b,c){J._super_.prototype.reset.call(this,0,a,b,c)},c.Gravity=J,c.G=J,c.Util.inherits(K,c.Behaviour),K.prototype.reset=function(a,b,d,e,f){this.emitter=c.Util.initValue(a,null),this.mass=c.Util.initValue(b,!0),this.callback=c.Util.initValue(d,null),this.collisionPool=[],this.delta=new c.Vector2D,e&&K._super_.prototype.reset.call(this,e,f)},K.prototype.applyBehaviour=function(a,b,c){var d=this.emitter?this.emitter.particles.slice(c):this.pool.slice(c),e,f,g,h,i,j=d.length;for(var k=0;k<j;k++)e=d[k],e!==a&&(this.delta.copy(e.p),this.delta.sub(a.p),f=this.delta.lengthSq(),distance=a.radius+e.radius,f<=distance*distance&&(g=distance-Math.sqrt(f),g+=.5,totalMass=a.mass+e.mass,h=this.mass?e.mass/totalMass:.5,i=this.mass?a.mass/totalMass:.5,a.p.add(this.delta.clone().normalize().multiplyScalar(g*-h)),e.p.add(this.delta.normalize().multiplyScalar(g*i)),this.callback&&this.callback(a,e)))},c.Collision=K,c.Util.inherits(L,c.Behaviour),L.prototype.reset=function(a,b,d,e){this.zone=a,this.zone.crossType=c.Util.initValue(b,"dead"),d&&L._super_.prototype.reset.call(this,d,e)},L.prototype.applyBehaviour=function(a,b,c){L._super_.prototype.applyBehaviour.call(this,a,b,c),this.zone.crossing(a)},c.CrossZone=L,c.Util.inherits(M,c.Behaviour),M.prototype.reset=function(a,d,e,f){d==null||d==b?this.same=!0:this.same=!1,this.a=c.Util.setSpanValue(c.Util.initValue(a,1)),this.b=c.Util.setSpanValue(d),e&&M._super_.prototype.reset.call(this,e,f)},M.prototype.initialize=function(a){a.transform.alphaA=this.a.getValue(),this.same?a.transform.alphaB=a.transform.alphaA:a.transform.alphaB=this.b.getValue()},M.prototype.applyBehaviour=function(a,b,c){M._super_.prototype.applyBehaviour.call(this,a,b,c),a.alpha=a.transform.alphaB+(a.transform.alphaA-a.transform.alphaB)*this.energy,a.alpha<.001&&(a.alpha=0)},c.Alpha=M,c.Util.inherits(N,c.Behaviour),N.prototype.reset=function(a,d,e,f){d==null||d==b?this.same=!0:this.same=!1,this.a=c.Util.setSpanValue(c.Util.initValue(a,1)),this.b=c.Util.setSpanValue(d),e&&N._super_.prototype.reset.call(this,e,f)},N.prototype.initialize=function(a){a.transform.scaleA=this.a.getValue(),a.transform.oldRadius=a.radius,this.same?a.transform.scaleB=a.transform.scaleA:a.transform.scaleB=this.b.getValue()},N.prototype.applyBehaviour=function(a,b,c){N._super_.prototype.applyBehaviour.call(this,a,b,c),a.scale=a.transform.scaleB+(a.transform.scaleA-a.transform.scaleB)*this.energy,a.scale<1e-4&&(a.scale=0),a.radius=a.transform.oldRadius*a.scale},c.Scale=N,c.Util.inherits(O,c.Behaviour),O.prototype.reset=function(a,d,e,f,g){d==null||d==b?this.same=!0:this.same=!1,this.a=c.Util.setSpanValue(c.Util.initValue(a,"Velocity")),this.b=c.Util.setSpanValue(c.Util.initValue(d,0)),this.style=c.Util.initValue(e,"to"),f&&O._super_.prototype.reset.call(this,f,g)},O.prototype.initialize=function(a){a.rotation=this.a.getValue(),a.transform.rotationA=this.a.getValue(),this.same||(a.transform.rotationB=this.b.getValue())},O.prototype.applyBehaviour=function(a,b,c){O._super_.prototype.applyBehaviour.call(this,a,b,c);if(!this.same)this.style=="to"||this.style=="TO"||this.style=="_"?a.rotation+=a.transform.rotationB+(a.transform.rotationA-a.transform.rotationB)*this.energy:a.rotation+=a.transform.rotationB;else if(this.a.a=="V"||this.a.a=="Velocity"||this.a.a=="v")a.rotation=a.getDirection()},c.Rotate=O,c.Util.inherits(P,c.Behaviour),P.prototype.reset=function(a,b,c,d){this.color1=this.setSpanValue(a),this.color2=this.setSpanValue(b),c&&P._super_.prototype.reset.call(this,c,d)},P.prototype.initialize=function(a){a.color=this.color1.getValue(),a.transform.beginRGB=c.Util.hexToRGB(a.color),this.color2&&(a.transform.endRGB=c.Util.hexToRGB(this.color2.getValue()))},P.prototype.applyBehaviour=function(a,b,c){this.color2?(P._super_.prototype.applyBehaviour.call(this,a,b,c),a.transform.rgb.r=a.transform.endRGB.r+(a.transform.beginRGB.r-a.transform.endRGB.r)*this.energy,a.transform.rgb.g=a.transform.endRGB.g+(a.transform.beginRGB.g-a.transform.endRGB.g)*this.energy,a.transform.rgb.b=a.transform.endRGB.b+(a.transform.beginRGB.b-a.transform.endRGB.b)*this.energy,a.transform.rgb.r=parseInt(a.transform.rgb.r,10),a.transform.rgb.g=parseInt(a.transform.rgb.g,10),a.transform.rgb.b=parseInt(a.transform.rgb.b,10)):(a.transform.rgb.r=a.transform.beginRGB.r,a.transform.rgb.g=a.transform.beginRGB.g,a.transform.rgb.b=a.transform.beginRGB.b)},P.prototype.setSpanValue=function(a){return a?a instanceof c.ColorSpan?a:new c.ColorSpan(a):null},c.Color=P,c.Util.inherits(Q,c.Behaviour),Q.prototype.reset=function(a,b,d,e){this.distanceVec=new c.Vector2D,this.centerPoint=c.Util.initValue(a,new c.Vector2D),this.force=c.Util.initValue(this.normalizeValue(b),100),d&&Q._super_.prototype.reset.call(this,d,e)},Q.prototype.initialize=function(a){},Q.prototype.applyBehaviour=function(a,b,c){this.distanceVec.set(this.centerPoint.x-a.p.x,this.centerPoint.y-a.p.y);var d=this.distanceVec.lengthSq();if(d!=0){var e=this.distanceVec.length(),f=this.force*b/(d*e);a.v.x+=f*this.distanceVec.x,a.v.y+=f*this.distanceVec.y}},c.GravityWell=Q,R.ID=0,c.Util.inherits(R,c.Particle),c.EventDispatcher.initialize(R.prototype),R.prototype.emit=function(a,b){this.emitTime=0,this.emitTotalTimes=c.Util.initValue(a,Infinity),b==!0||b=="life"||b=="destroy"?a=="once"?this.life=1:this.life=this.emitTotalTimes:isNaN(b)||(this.life=b),this.rate.init()},R.prototype.stopEmit=function(){this.emitTotalTimes=-1,this.emitTime=0},R.prototype.removeAllParticles=function(){for(var a=0;a<this.particles.length;a++)this.particles[a].dead=!0},R.prototype.createParticle=function(a,b){var d=c.pool.get(c.Particle);this.setupParticle(d,a,b),this.dispatchEvent(c.PARTICLE_CREATED,d);return d},R.prototype.addSelfInitialize=function(a){a.init?a.init(this):this.initAll()},R.prototype.addInitialize=function(){var a=arguments.length,b;for(b=0;b<a;b++)this.initializes.push(arguments[b])},R.prototype.removeInitialize=function(a){var b=this.initializes.indexOf(a);b>-1&&this.initializes.splice(b,1)},R.prototype.removeInitializers=function(){c.Util.destroyArray(this.initializes)},R.prototype.addBehaviour=function(){var a=arguments.length,b;for(b=0;b<a;b++)this.behaviours.push(arguments[b]),arguments[b].hasOwnProperty("parents")&&arguments[b].parents.push(this)},R.prototype.removeBehaviour=function(a){var b=this.behaviours.indexOf(a);b>-1&&this.behaviours.splice(b,1)},R.prototype.removeAllBehaviours=function(){c.Util.destroyArray(this.behaviours)},R.prototype.integrate=function(a){var b=1-this.damping;c.integrator.integrate(this,a,b);var d=this.particles.length,e;for(e=0;e<d;e++){var f=this.particles[e];f.update(a,e),c.integrator.integrate(f,a,b),this.dispatchEvent(c.PARTICLE_UPDATE,f)}},R.prototype.emitting=function(a){if(this.emitTotalTimes=="once"){var b=this.rate.getValue(99999),c;for(c=0;c<b;c++)this.createParticle();this.emitTotalTimes="none"}else if(!isNaN(this.emitTotalTimes)){this.emitTime+=a;if(this.emitTime<this.emitTotalTimes){var b=this.rate.getValue(a),c;for(c=0;c<b;c++)this.createParticle()}}},R.prototype.update=function(a){this.age+=a,(this.age>=this.life||this.dead)&&this.destroy(),this.emitting(a),this.integrate(a);var b,d=this.particles.length,e;for(e=d-1;e>=0;e--)b=this.particles[e],b.dead&&(this.dispatchEvent(c.PARTICLE_DEAD,b),c.pool.set(b),this.particles.splice(e,1))},R.prototype.setupParticle=function(a,b,d){var e=this.initializes,f=this.behaviours;b&&(b instanceof Array?e=b:e=[b]),d&&(d instanceof Array?f=d:f=[d]),a.reset(),c.InitializeUtil.initialize(this,a,e),a.addBehaviours(f),a.parent=this,this.particles.push(a)},R.prototype.destroy=function(){this.dead=!0,this.emitTotalTimes=-1,this.particles.length==0&&(this.removeInitializers(),this.removeAllBehaviours(),this.parent&&this.parent.removeEmitter(this))},c.Emitter=R,c.Util.inherits(S,c.Emitter),S.prototype.addSelfBehaviour=function(){var a=arguments.length,b;for(b=0;b<a;b++)this.selfBehaviours.push(arguments[b])},S.prototype.removeSelfBehaviour=function(a){var b=this.selfBehaviours.indexOf(a);b>-1&&this.selfBehaviours.splice(b,1)},S.prototype.update=function(a){S._super_.prototype.update.call(this,a);if(!this.sleep){var b=this.selfBehaviours.length,c;for(c=0;c<b;c++)this.selfBehaviours[c].applyBehaviour(this,a,c)}},c.BehaviourEmitter=S,c.Util.inherits(T,c.Emitter),T.prototype.initEventHandler=function(){var a=this;this.mousemoveHandler=function(b){a.mousemove.call(a,b)},this.mousedownHandler=function(b){a.mousedown.call(a,b)},this.mouseupHandler=function(b){a.mouseup.call(a,b)},this.mouseTarget.addEventListener("mousemove",this.mousemoveHandler,!1)},T.prototype.emit=function(){this._allowEmitting=!0},T.prototype.stopEmit=function(){this._allowEmitting=!1},T.prototype.mousemove=function(a){if(a.layerX||a.layerX==0)this.p.x+=(a.layerX-this.p.x)*this.ease,this.p.y+=(a.layerY-this.p.y)*this.ease;else if(a.offsetX||a.offsetX==0)this.p.x+=(a.offsetX-this.p.x)*this.ease,this.p.y+=(a.offsetY-this.p.y)*this.ease;this._allowEmitting&&T._super_.prototype.emit.call(this,"once")},T.prototype.destroy=function(){T._super_.prototype.destroy.call(this),this.mouseTarget.removeEventListener("mousemove",this.mousemoveHandler,!1)},c.FollowEmitter=T;var U=U||{easeLinear:function(a){return a},easeInQuad:function(a){return Math.pow(a,2)},easeOutQuad:function(a){return-(Math.pow(a-1,2)-1)},easeInOutQuad:function(a){if((a/=.5)<1)return.5*Math.pow(a,2);return-0.5*((a-=2)*a-2)},easeInCubic:function(a){return Math.pow(a,3)},easeOutCubic:function(a){return Math.pow(a-1,3)+1},easeInOutCubic:function(a){if((a/=.5)<1)return.5*Math.pow(a,3);return.5*(Math.pow(a-2,3)+2)},easeInQuart:function(a){return Math.pow(a,4)},easeOutQuart:function(a){return-(Math.pow(a-1,4)-1)},easeInOutQuart:function(a){if((a/=.5)<1)return.5*Math.pow(a,4);return-0.5*((a-=2)*Math.pow(a,3)-2)},easeInSine:function(a){return-Math.cos(a*(Math.PI/2))+1},easeOutSine:function(a){return Math.sin(a*(Math.PI/2))},easeInOutSine:function(a){return-0.5*(Math.cos(Math.PI*a)-1)},easeInExpo:function(a){return a===0?0:Math.pow(2,10*(a-1))},easeOutExpo:function(a){return a===1?1:-Math.pow(2,-10*a)+1},easeInOutExpo:function(a){if(a===0)return 0;if(a===1)return 1;if((a/=.5)<1)return.5*Math.pow(2,10*(a-1));return.5*(-Math.pow(2,-10*--a)+2)},easeInCirc:function(a){return-(Math.sqrt(1-a*a)-1)},easeOutCirc:function(a){return Math.sqrt(1-Math.pow(a-1,2))},easeInOutCirc:function(a){if((a/=.5)<1)return-0.5*(Math.sqrt(1-a*a)-1);return.5*(Math.sqrt(1-(a-=2)*a)+1)},easeInBack:function(a){var b=1.70158;return a*a*((b+1)*a-b)},easeOutBack:function(a){var b=1.70158;return(a=a-1)*a*((b+1)*a+b)+1},easeInOutBack:function(a){var b=1.70158;if((a/=.5)<1)return.5*a*a*(((b*=1.525)+1)*a-b);return.5*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},setEasingByName:function(a){switch(a){case"easeLinear":return c.ease.easeLinear;case"easeInQuad":return c.ease.easeInQuad;case"easeOutQuad":return c.ease.easeOutQuad;case"easeInOutQuad":return c.ease.easeInOutQuad;case"easeInCubic":return c.ease.easeInCubic;case"easeOutCubic":return c.ease.easeOutCubic;case"easeInOutCubic":return c.ease.easeInOutCubic;case"easeInQuart":return c.ease.easeInQuart;case"easeOutQuart":return c.ease.easeOutQuart;case"easeInOutQuart":return c.ease.easeInOutQuart;case"easeInSine":return c.ease.easeInSine;case"easeOutSine":return c.ease.easeOutSine;case"easeInOutSine":return c.ease.easeInOutSine;case"easeInExpo":return c.ease.easeInExpo;case"easeOutExpo":return c.ease.easeOutExpo;case"easeInOutExpo":return c.ease.easeInOutExpo;case"easeInCirc":return c.ease.easeInCirc;case"easeOutCirc":return c.ease.easeOutCirc;case"easeInOutCirc":return c.ease.easeInOutCirc;case"easeInBack":return c.ease.easeInBack;case"easeOutBack":return c.ease.easeOutBack;case"easeInOutBack":return c.ease.easeInOutBack;default:return c.ease.easeLinear}}};c.ease=U,c.easeLinear="easeLinear",c.easeInQuad="easeInQuad",c.easeOutQuad="easeOutQuad",c.easeInOutQuad="easeInOutQuad",c.easeInCubic="easeInCubic",c.easeOutCubic="easeOutCubic",c.easeInOutCubic="easeInOutCubic",c.easeInQuart="easeInQuart",c.easeOutQuart="easeOutQuart",c.easeInOutQuart="easeInOutQuart",c.easeInSine="easeInSine",c.easeOutSine="easeOutSine",c.easeInOutSine="easeInOutSine",c.easeInExpo="easeInExpo",c.easeOutExpo="easeOutExpo",c.easeInOutExpo="easeInOutExpo",c.easeInCirc="easeInCirc",c.easeOutCirc="easeOutCirc",c.easeInOutCirc="easeInOutCirc",c.easeInBack="easeInBack",c.easeOutBack="easeOutBack",c.easeInOutBack="easeInOutBack",V.prototype={start:function(){this.addEventHandler(),this.renderer.start()},stop:function(){this.renderer.stop()},resize:function(a,b){this.renderer.resize(a,b)},setStroke:function(a,b){this.renderer.hasOwnProperty("stroke")?this.renderer.setStroke(a,b):alert("Sorry this renderer do not suppest stroke method!")},createImageData:function(a){this.renderer instanceof c.PixelRender&&this.renderer.createImageData(a)},setMaxRadius:function(a){this.renderer instanceof c.WebGLRender&&this.renderer.setMaxRadius(a)},blendEquation:function(a){this.renderer instanceof c.WebGLRender&&this.renderer.blendEquation(a)},blendFunc:function(a,b){this.renderer instanceof c.WebGLRender&&this.renderer.blendFunc(a,b)},setType:function(a){this.type=a,this.renderer=this.getRenderer()},getRenderer:function(){switch(this.type){case"pixi":return new c.PixiRender(this.proton,this.element);case"dom":return new c.DomRender(this.proton,this.element);case"canvas":return new c.CanvasRender(this.proton,this.element);case"webgl":return new c.WebGLRender(this.proton,this.element);case"easel":return new c.EaselRender(this.proton,this.element);case"easeljs":return new c.EaselRender(this.proton,this.element);case"pixel":return new c.PixelRender(this.proton,this.element);default:return new c.BaseRender(this.proton,this.element)}},render:function(a){this.renderer.render(a)},addEventHandler:function(){this.onProtonUpdate&&(this.renderer.onProtonUpdate=this.onProtonUpdate),this.onParticleCreated&&(this.renderer.onParticleCreated=this.onParticleCreated),this.onParticleUpdate&&(this.renderer.onParticleUpdate=this.onParticleUpdate),this.onParticleDead&&(this.renderer.onParticleDead=this.onParticleDead)}},c.Renderer=V,W.prototype={start:function(){var a=this;this.proton.addEventListener(c.PROTON_UPDATE,function(){a.onProtonUpdate.call(a)}),this.proton.addEventListener(c.PROTON_UPDATE_AFTER,function(){a.onProtonUpdateAfter.call(a)}),this.proton.addEventListener(c.EMITTER_ADDED,function(b){a.onEmitterAdded.call(a,b)}),this.proton.addEventListener(c.EMITTER_REMOVED,function(b){a.onEmitterRemoved.call(a,b)});var b=this.proton.emitters.length,d;for(d=0;d<b;d++){var e=this.proton.emitters[d];this.addEmitterListener(e)}},resize:function(a,b){},addEmitterListener:function(a){var b=this;a.addEventListener(c.PARTICLE_CREATED,function(a){b.onParticleCreated.call(b,a)}),a.addEventListener(c.PARTICLE_UPDATE,function(a){b.onParticleUpdate.call(b,a)}),a.addEventListener(c.PARTICLE_DEAD,function(a){b.onParticleDead.call(b,a)})},stop:function(){var a=this.proton.emitters.length,b;this.proton.removeAllEventListeners();for(b=0;b<a;b++){var c=this.proton.emitters[b];c.removeAllEventListeners()}},onEmitterAdded:function(a){this.addEmitterListener(a)},onEmitterRemoved:function(a){a.removeAllEventListeners()},onProtonUpdate:function(){},onProtonUpdateAfter:function(){},onParticleCreated:function(a){},onParticleUpdate:function(a){},onParticleDead:function(a){}},c.BaseRender=W,c.Util.inherits(X,c.BaseRender),X.prototype.start=function(){X._super_.prototype.start.call(this)},X.prototype.setStroke=function(a,b){a=c.Util.initValue(a,"#000000"),b=c.Util.initValue(b,1),this.stroke={color:a,thinkness:b}},X.prototype.onProtonUpdate=function(){},X.prototype.onParticleCreated=function(a){if(a.target){var b=this;c.Util.getImage(a.target,a,!1,function(a){b.setImgInDIV.call(b,a)})}else a.transform.canvas=c.DomUtil.createCanvas(a.id+"_canvas",a.radius+1,a.radius+1,"absolute"),a.transform.bakOldRadius=a.radius,this.stroke?(a.transform.canvas.width=2*a.radius+this.stroke.thinkness*2,a.transform.canvas.height=2*a.radius+this.stroke.thinkness*2):(a.transform.canvas.width=2*a.radius+1,a.transform.canvas.height=2*a.radius+1),a.transform.context=a.transform.canvas.getContext("2d"),a.transform.context.fillStyle=a.color,a.transform.context.beginPath(),a.transform.context.arc(a.radius,a.radius,a.radius,0,Math.PI*2,!0),this.stroke&&(a.transform.context.strokeStyle=this.stroke.color,a.transform.context.lineWidth=this.stroke.thinkness,a.transform.context.stroke()),a.transform.context.closePath(),a.transform.context.fill(),this.element.appendChild(a.transform.canvas)},X.prototype.onParticleUpdate=function(a){a.target?a.target instanceof Image&&(a.transform.canvas.style.opacity=a.alpha,c.DomUtil.transformDom(a.transform.canvas,a.p.x-a.target.width/2,a.p.y-a.target.height/2,a.scale,a.rotation)):(a.transform.canvas.style.opacity=a.alpha,a.transform.oldRadius?c.DomUtil.transformDom(a.transform.canvas,a.p.x-a.transform.oldRadius,a.p.y-a.transform.oldRadius,a.scale,a.rotation):c.DomUtil.transformDom(a.transform.canvas,a.p.x-a.transform.bakOldRadius,a.p.y-a.transform.bakOldRadius,a.scale,a.rotation))},X.prototype.onParticleDead=function(a){a.transform.canvas&&this.element.removeChild(a.transform.canvas)},X.prototype.setImgInDIV=function(a){a.transform.canvas=c.DomUtil.createCanvas(a.id+"_canvas",a.target.width+1,a.target.height+1,"absolute",a.p.x-a.radius,a.p.y-a.radius),a.transform.context=a.transform.canvas.getContext("2d"),a.transform.context.drawImage(a.target,0,0,a.target.width,a.target.height),this.element.appendChild(a.transform.canvas)},c.DomRender=X,c.Util.inherits(Y,c.BaseRender),Y.prototype.resize=function(a,b){},Y.prototype.start=function(){Y._super_.prototype.start.call(this)},Y.prototype.onProtonUpdate=function(){},Y.prototype.onParticleCreated=function(a){if(a.target)a.target=this.pool.get(a.target),a.target.parent||(!a.target.image||(a.target.regX=a.target.image.width/2,a.target.regY=a.target.image.height/2),this.element.addChild(a.target));else{var b=this.pool.get(createjs.Graphics);this.stroke&&(this.stroke==!0?b.beginStroke("#000000"):this.stroke instanceof String&&b.beginStroke(this.stroke)),b.beginFill(a.color).drawCircle(0,0,a.radius);var c=new createjs.Shape(b);a.target=c,this.element.addChild(a.target)}},Y.prototype.onParticleUpdate=function(a){a.target&&(a.target.x=a.p.x,a.target.y=a.p.y,a.target.alpha=a.alpha,a.target.scaleX=a.target.scaleY=a.scale,a.target.rotation=a.rotation)},Y.prototype.onParticleDead=function(a){a.target&&(a.target.parent&&a.target.parent.removeChild(a.target),this.pool.set(a.target),a.target=null)},c.EaselRender=Y,c.Util.inherits(Z,c.BaseRender),Z.prototype.resize=function(a,b){this.element.width=a,this.element.height=b},Z.prototype.start=function(){Z._super_.prototype.start.call(this)},Z.prototype.setStroke=function(a,b){a=c.Util.initValue(a,"#000000"),b=c.Util.initValue(b,1),this.stroke={color:a,thinkness:b}},Z.prototype.onProtonUpdate=function(){this.context.clearRect(0,0,this.element.width,this.element.height)},Z.prototype.onParticleCreated=function(a){a.target?c.Util.getImage(a.target,a,!1):a.color=a.color?a.color:"#ff0000"},Z.prototype.onParticleUpdate=function(a){if(a.target){if(a.target instanceof Image){var b=a.target.width*a.scale|0,d=a.target.height*a.scale|0,e=a.p.x-b/2,f=a.p.y-d/2;if(!a.color)this.context.save(),this.context.globalAlpha=a.alpha,this.context.translate(a.p.x,a.p.y),this.context.rotate(c.MathUtils.degreeTransform(a.rotation)),this.context.translate(-a.p.x,-a.p.y),this.context.drawImage(a.target,0,0,a.target.width,a.target.height,e,f,b,d),this.context.globalAlpha=1,this.context.restore();else{a.transform.buffer||(a.transform.buffer=this.getBuffer(a.target));var g=a.transform.buffer.getContext("2d");g.clearRect(0,0,a.transform.buffer.width,a.transform.buffer.height),g.globalAlpha=a.alpha,g.drawImage(a.target,0,0),g.globalCompositeOperation="source-atop",g.fillStyle=c.Util.rgbToHex(a.transform.rgb),g.fillRect(0,0,a.transform.buffer.width,a.transform.buffer.height),g.globalCompositeOperation="source-over",g.globalAlpha=1,this.context.drawImage(a.transform.buffer,0,0,a.transform.buffer.width,a.transform.buffer.height,e,f,b,d)}}}else a.transform.rgb?this.context.fillStyle="rgba("+a.transform.rgb.r+","+a.transform.rgb.g+","+a.transform.rgb.b+","+a.alpha+")":this.context.fillStyle=a.color,this.context.beginPath(),this.context.arc(a.p.x,a.p.y,a.radius,0,Math.PI*2,!0),this.stroke&&(this.context.strokeStyle=this.stroke.color,this.context.lineWidth=this.stroke.thinkness,this.context.stroke()),this.context.closePath(),this.context.fill()},Z.prototype.onParticleDead=function(a){},Z.prototype.getBuffer=function(a){if(a instanceof Image){var b=a.width+"_"+a.height,c=this.bufferCache[b];c||(c=document.createElement("canvas"),c.width=a.width,c.height=a.height,this.bufferCache[b]=c);return c}},c.CanvasRender=Z,c.Util.inherits($,c.BaseRender),$.prototype.resize=function(a,b){this.element.width=a,this.element.height=b},$.prototype.createImageData=function(a){a?this.rectangle=a:this.rectangle=new c.Rectangle(0,0,this.element.width,this.element.height),this.imageData=this.context.createImageData(this.rectangle.width,this.rectangle.height),this.context.putImageData(this.imageData,this.rectangle.x,this.rectangle.y)},$.prototype.start=function(){$._super_.prototype.start.call(this)},$.prototype.onProtonUpdate=function(){this.context.clearRect(this.rectangle.x,this.rectangle.y,this.rectangle.width,this.rectangle.height),this.imageData=this.context.getImageData(this.rectangle.x,this.rectangle.y,this.rectangle.width,this.rectangle.height)},$.prototype.onProtonUpdateAfter=function(){this.context.putImageData(this.imageData,this.rectangle.x,this.rectangle.y)},$.prototype.onParticleCreated=function(a){},$.prototype.onParticleUpdate=function(a){this.imageData&&this.setPixel(this.imageData,Math.floor(a.p.x-this.rectangle.x),Math.floor(a.p.y-this.rectangle.y),a)},$.prototype.setPixel=function(a,b,c,d){var e=d.transform.rgb;if(!(b<0||b>this.element.width||c<0||c>this.elementwidth)){var f=((c>>0)*a.width+(b>>0))*4;a.data[f]=e.r,a.data[f+1]=e.g,a.data[f+2]=e.b,a.data[f+3]=d.alpha*255}},$.prototype.onParticleDead=function(a){},c.PixelRender=$,c.Util.inherits(_,c.BaseRender),_.prototype.resize=function(a,b){this.umat[4]=-2,this.umat[7]=1,this.smat[0]=1/a,this.smat[4]=1/b,this.mstack.set(this.umat,0),this.mstack.set(this.smat,1),this.gl.viewport(0,0,a,b),this.element.width=a,this.element.height=b},_.prototype.setMaxRadius=function(a){this.circleCanvasURL=this.createCircle(a)},_.prototype.getVertexShader=function(){var a=["uniform vec2 viewport;","attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 tMat;","varying vec2 vTextureCoord;","varying float alpha;","void main() {","vec3 v = tMat * vec3(aVertexPosition, 1.0);","gl_Position = vec4(v.x, v.y, 0, 1);","vTextureCoord = aTextureCoord;","alpha = tMat[0][2];","}"].join("\n");return a},_.prototype.getFragmentShader=function(){var a=["precision mediump float;","varying vec2 vTextureCoord;","varying float alpha;","uniform sampler2D uSampler;","uniform vec4 color;","uniform bool useTexture;","uniform vec3 uColor;","void main() {","vec4 textureColor = texture2D(uSampler, vTextureCoord);","gl_FragColor = textureColor * vec4(uColor, 1.0);","gl_FragColor.w *= alpha;","}"].join("\n");return a},_.prototype.initVar=function(){this.mstack=new c.MStack,this.umat=c.Mat3.create([2,0,1,0,-2,0,-1,1,1]),this.smat=c.Mat3.create([.01,0,1,0,.01,0,0,0,1]),this.texturebuffers={}},_.prototype.start=function(){_._super_.prototype.start.call(this),this.resize(this.element.width,this.element.height)},_.prototype.blendEquation=function(a){this.gl.blendEquation(this.gl[a])},_.prototype.blendFunc=function(a,b){this.gl.blendFunc(this.gl[a],this.gl[b])},_.prototype.getShader=function(a,b,c){var d;c?d=a.createShader(a.FRAGMENT_SHADER):d=a.createShader(a.VERTEX_SHADER),a.shaderSource(d,b),a.compileShader(d);if(!a.getShaderParameter(d,a.COMPILE_STATUS)){alert(a.getShaderInfoLog(d));return null}return d},_.prototype.initShaders=function(){var a=this.getShader(this.gl,this.getFragmentShader(),!0),b=this.getShader(this.gl,this.getVertexShader(),!1);this.sprogram=this.gl.createProgram(),this.gl.attachShader(this.sprogram,b),this.gl.attachShader(this.sprogram,a),this.gl.linkProgram(this.sprogram),this.gl.getProgramParameter(this.sprogram,this.gl.LINK_STATUS)||alert("Could not initialise shaders"),this.gl.useProgram(this.sprogram),this.sprogram.vpa=this.gl.getAttribLocation(this.sprogram,"aVertexPosition"),this.sprogram.tca=this.gl.getAttribLocation(this.sprogram,"aTextureCoord"),this.gl.enableVertexAttribArray(this.sprogram.tca),this.gl.enableVertexAttribArray(this.sprogram.vpa),this.sprogram.tMatUniform=this.gl.getUniformLocation(this.sprogram,"tMat"),this.sprogram.samplerUniform=this.gl.getUniformLocation(this.sprogram,"uSampler"),this.sprogram.useTex=this.gl.getUniformLocation(this.sprogram,"useTexture"),this.sprogram.color=this.gl.getUniformLocation(this.sprogram,"uColor"),this.gl.uniform1i(this.sprogram.useTex,1)},_.prototype.initBuffers=function(){this.unitIBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.unitIBuffer);var a=[0,3,1,0,2,3];this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(a),this.gl.STATIC_DRAW);var b=[];for(var c=0;c<100;c++)b.push(c);idx=new Uint16Array(b),this.unitI33=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.unitI33),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,idx,this.gl.STATIC_DRAW),b=[];for(c=0;c<100;c++)b.push(c,c+1,c+2);idx=new Uint16Array(b),this.stripBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.stripBuffer),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,idx,this.gl.STATIC_DRAW)},_.prototype.createCircle=function(a){this.circleCanvasRadius=c.WebGLUtil.nhpot(c.Util.initValue(a,32));var b=c.DomUtil.createCanvas("circle_canvas",this.circleCanvasRadius*2,this.circleCanvasRadius*2),d=b.getContext("2d");d.beginPath(),d.arc(this.circleCanvasRadius,this.circleCanvasRadius,this.circleCanvasRadius,0,Math.PI*2,!0),d.closePath(),d.fillStyle="#FFF",d.fill();return b.toDataURL()},_.prototype.setImgInCanvas=function(a){var b=a.target.width,d=a.target.height,e=c.WebGLUtil.nhpot(a.target.width),f=c.WebGLUtil.nhpot(a.target.height),g=a.target.width/e,h=a.target.height/f;this.texturebuffers[a.transform.src]||(this.texturebuffers[a.transform.src]=[this.gl.createTexture(),this.gl.createBuffer(),this.gl.createBuffer()]),a.transform.texture=this.texturebuffers[a.transform.src][0],a.transform.vcBuffer=this.texturebuffers[a.transform.src][1],a.transform.tcBuffer=this.texturebuffers[a.transform.src][2],this.gl.bindBuffer(this.gl.ARRAY_BUFFER,a.transform.tcBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,g,0,0,h,h,h]),this.gl.STATIC_DRAW),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,a.transform.vcBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,b,0,0,d,b,d]),this.gl.STATIC_DRAW);var i=a.transform.canvas.getContext("2d"),j=i.getImageData(0,0,e,f);this.gl.bindTexture(this.gl.TEXTURE_2D,a.transform.texture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,j),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_NEAREST),this.gl.generateMipmap(this.gl.TEXTURE_2D),a.transform.textureLoaded=!0,a.transform.textureWidth=b,a.transform.textureHeight=d},_.prototype.setStroke=function(a,b){},_.prototype.onProtonUpdate=function(){},_.prototype.onParticleCreated=function(a){var b=this;a.transform.textureLoaded=!1,a.transform.tmat=c.Mat3.create(),a.transform.tmat[8]=1,a.transform.imat=c.Mat3.create(),a.transform.imat[8]=1,a.target?c.Util.getImage(a.target,a,!0,function(a){b.setImgInCanvas.call(b,a),a.transform.oldScale=1}):c.Util.getImage(this.circleCanvasURL,a,!0,function(a){b.setImgInCanvas.call(b,a),a.transform.oldScale=a.radius/b.circleCanvasRadius})},_.prototype.onParticleUpdate=function(a){a.transform.textureLoaded&&(this.updateMatrix(a),this.gl.uniform3f(this.sprogram.color,a.transform.rgb.r/255,a.transform.rgb.g/255,a.transform.rgb.b/255),this.gl.uniformMatrix3fv(this.sprogram.tMatUniform,!1,this.mstack.top()),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,a.transform.vcBuffer),this.gl.vertexAttribPointer(this.sprogram.vpa,2,this.gl.FLOAT,!1,0,0),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,a.transform.tcBuffer),this.gl.vertexAttribPointer(this.sprogram.tca,2,this.gl.FLOAT,!1,0,0),this.gl.bindTexture(this.gl.TEXTURE_2D,a.transform.texture),this.gl.uniform1i(this.sprogram.samplerUniform,0),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.unitIBuffer),this.gl.drawElements(this.gl.TRIANGLES,6,this.gl.UNSIGNED_SHORT,0),this.mstack.pop())},_.prototype.onParticleDead=function(a){},_.prototype.updateMatrix=function(a){var b=c.WebGLUtil.makeTranslation(-a.transform.textureWidth/2,-a.transform.textureHeight/2),d=c.WebGLUtil.makeTranslation(a.p.x,a.p.y),e=a.rotation*(Math.PI/180),f=c.WebGLUtil.makeRotation(e),g=a.scale*a.transform.oldScale,h=c.WebGLUtil.makeScale(g,g),i=c.WebGLUtil.matrixMultiply(b,h);i=c.WebGLUtil.matrixMultiply(i,f),i=c.WebGLUtil.matrixMultiply(i,d),c.Mat3.inverse(i,a.transform.imat),i[2]=a.alpha,this.mstack.push(i)},c.WebGLRender=_,ba.prototype={getPosition:function(){},crossing:function(a){}},c.Zone=ba,c.Util.inherits(bb,c.Zone),bb.prototype.getPosition=function(){this.random=Math.random(),this.vector.x=this.x1+this.random*this.length*Math.cos(this.gradient),this.vector.y=this.y1+this.random*this.length*Math.sin(this.gradient);return this.vector},bb.prototype.getDirection=function(a,b){var c=this.dy,d=-this.dx,e=this.dot,f=d==0?1:d;return(c*a+d*b+e)*f>0?!0:!1},bb.prototype.getDistance=function(a,b){var c=this.dy,d=-this.dx,e=this.dot,f=c*a+d*b+e;return f/Math.sqrt(this.xxyy)},bb.prototype.getSymmetric=function(a){var b=a.getGradient(),c=this.getGradient(),d=2*(c-b),e=a.x,f=a.y;a.x=e*Math.cos(d)-f*Math.sin(d),a.y=e*Math.sin(d)+f*Math.cos(d);return a},bb.prototype.getGradient=function(){return Math.atan2(this.dy,this.dx)},bb.prototype.getRange=function(a,b){var c=Math.abs(this.getGradient());c<=Math.PI/4?a.p.x<this.maxx&&a.p.x>this.minx&&b():a.p.y<this.maxy&&a.p.y>this.miny&&b()},bb.prototype.getLength=function(){return Math.sqrt(this.dx*this.dx+this.dy*this.dy)},bb.prototype.crossing=function(a){var b=this;this.crossType=="dead"?this.direction==">"||this.direction=="R"||this.direction=="right"||this.direction=="down"?this.getRange(a,function(){b.getDirection(a.p.x,a.p.y)&&(a.dead=!0)}):this.getRange(a,function(){b.getDirection(a.p.x,a.p.y)||(a.dead=!0)}):this.crossType=="bound"?this.getRange(a,function(){b.getDistance(a.p.x,a.p.y)<=a.radius&&(b.dx==0?a.v.x*=-1:b.dy==0?a.v.y*=-1:b.getSymmetric(a.v))}):this.crossType=="cross"&&this.alert&&(alert("Sorry lineZone does not support cross method"),this.alert=!1)},c.LineZone=bb,c.Util.inherits(bc,c.Zone),bc.prototype.getPosition=function(){this.random=Math.random(),this.angle=Math.PI*2*Math.random(),this.vector.x=this.x+this.random*this.radius*Math.cos(this.angle),this.vector.y=this.y+this.random*this.radius*Math.sin(this.angle);return this.vector},bc.prototype.setCenter=function(a,b){this.center.x=a,this.center.y=b},bc.prototype.crossing=function(a){var b=a.p.distanceTo(this.center);this.crossType=="dead"?b-a.radius>this.radius&&(a.dead=!0):this.crossType=="bound"?b+a.radius>=this.radius&&this.getSymmetric(a):this.crossType=="cross"&&this.alert&&(alert("Sorry CircleZone does not support cross method"),this.alert=!1)},bc.prototype.getSymmetric=function(a){var b=a.v.getGradient(),c=this.getGradient(a),d=2*(c-b),e=a.v.x,f=a.v.y;a.v.x=e*Math.cos(d)-f*Math.sin(d),a.v.y=e*Math.sin(d)+f*Math.cos(d)},bc.prototype.getGradient=function(a){return-Math.PI/2+Math.atan2(a.p.y-this.center.y,a.p.x-this.center.x)},c.CircleZone=bc,c.Util.inherits(bd,c.Zone),bd.prototype.getPosition=function(){this.vector.x=this.x,this.vector.y=this.y;return this.vector},bd.prototype.crossing=function(a){this.alert&&(alert("Sorry PointZone does not support crossing method"),this.alert=!1)},c.PointZone=bd,c.Util.inherits(be,c.Zone),be.prototype.getPosition=function(){this.vector.x=this.x+Math.random()*this.width,this.vector.y=this.y+Math.random()*this.height;return this.vector},be.prototype.crossing=function(a){this.crossType=="dead"?(a.p.x+a.radius<this.x?a.dead=!0:a.p.x-a.radius>this.x+this.width&&(a.dead=!0),a.p.y+a.radius<this.y?a.dead=!0:a.p.y-a.radius>this.y+this.height&&(a.dead=!0)):this.crossType=="bound"?(a.p.x-a.radius<this.x?(a.p.x=this.x+a.radius,a.v.x*=-1):a.p.x+a.radius>this.x+this.width&&(a.p.x=this.x+this.width-a.radius,a.v.x*=-1),a.p.y-a.radius<this.y?(a.p.y=this.y+a.radius,a.v.y*=-1):a.p.y+a.radius>this.y+this.height&&(a.p.y=this.y+this.height-a.radius,a.v.y*=-1)):this.crossType=="cross"&&(a.p.x+a.radius<this.x&&a.v.x<=0?a.p.x=this.x+this.width+a.radius:a.p.x-a.radius>this.x+this.width&&a.v.x>=0&&(a.p.x=this.x-a.radius),a.p.y+a.radius<this.y&&a.v.y<=0?a.p.y=this.y+this.height+a.radius:a.p.y-a.radius>this.y+this.height&&a.v.y>=0&&(a.p.y=this.y-a.radius))},c.RectZone=be,c.Util.inherits(bf,c.Zone),bf.prototype.reset=function(a,b,d,e){this.imageData=a,this.x=c.Util.initValue(b,0),this.y=c.Util.initValue(d,0),this.d=c.Util.initValue(e,2),this.vectors=[],this.setVectors()},bf.prototype.setVectors=function(){var a,b,c=this.imageData.width,d=this.imageData.height;for(a=0;a<c;a+=this.d)for(b=0;b<d;b+=this.d){var e=((b>>0)*c+(a>>0))*4;this.imageData.data[e+3]>0&&this.vectors.push({x:a+this.x,y:b+this.y})}return this.vector},bf.prototype.getBound=function(a,b){var c=((b>>0)*this.imageData.width+(a>>0))*4;return this.imageData.data[c+3]>0?!0:!1},bf.prototype.getPosition=function(){return this.vector.copy(this.vectors[Math.floor(Math.random()*this.vectors.length)])},bf.prototype.getColor=function(a,b){a-=this.x,b-=this.y;var c=((b>>0)*this.imageData.width+(a>>0))*4;return{r:this.imageData.data[c],g:this.imageData.data[c+1],b:this.imageData.data[c+2],a:this.imageData.data[c+3]}},bf.prototype.crossing=function(a){this.crossType=="dead"?this.getBound(a.p.x-this.x,a.p.y-this.y)?a.dead=!0:a.dead=!1:this.crossType=="bound"&&(this.getBound(a.p.x-this.x,a.p.y-this.y)||a.v.negate())},c.ImageZone=bf;var bg=function(){if(a.console&&a.console.log){var b=arguments;if(typeof arguments[0]=="string")if(arguments[0].indexOf("+")==0){var c=parseInt(arguments[0]);bg.once<c&&(delete b[0],console.log(b),bg.once++)}else console.log(b);else console.log(b)}};bg.once=0,c.log=bg;var bh=bh||{addEventListener:function(a,b){a.addEventListener(c.PROTON_UPDATE,function(){b()})},setStyle:function(a){var b=a||"#ff0000",d=c.Util.hexToRGB(b),e="rgba("+d.r+","+d.g+","+d.b+","+.5+")";return e},drawZone:function(a,b,d,e){var f=b.getContext("2d"),g=this.setStyle();this.addEventListener(a,function(){e&&f.clearRect(0,0,b.width,b.height),d instanceof c.PointZone?(f.beginPath(),f.fillStyle=g,f.arc(d.x,d.y,10,0,Math.PI*2,!0),f.fill(),f.closePath()):d instanceof c.LineZone?(f.beginPath(),f.strokeStyle=g,f.moveTo(d.x1,d.y1),f.lineTo(d.x2,d.y2),f.stroke(),f.closePath()):d instanceof c.RectZone?(f.beginPath(),f.strokeStyle=g,f.drawRect(d.x,d.y,d.width,d.height),f.stroke(),f.closePath()):d instanceof c.CircleZone&&(f.beginPath(),f.strokeStyle=g,f.arc(d.x,d.y,d.radius,0,Math.PI*2,!0),f.stroke(),f.closePath())})},drawEmitter:function(a,b,c,d){var e=b.getContext("2d"),f=this.setStyle();this.addEventListener(a,function(){d&&e.clearRect(0,0,b.width,b.height),e.beginPath(),e.fillStyle=f,e.arc(c.p.x,c.p.y,10,0,Math.PI*2,!0),e.fill(),e.closePath()})},test:{},setTest:function(a,b){this.test[a]=b},getTest:function(a){return this.test.hasOwnProperty(a)?this.test[a]:!1}};c.Debug=bh})(window),function(){var a=0,b=["ms","moz","webkit","o"];for(var c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b,c){var d=(new Date).getTime(),e=Math.max(0,16-(d-a)),f=window.setTimeout(function(){b(d+e)},e);a=d+e;return f}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}()
},{}],2:[function(require,module,exports){
'use strict';
var core = require('./hakurei').core;
var util = require('./hakurei').util;
var SceneStg = require('./scene/stg');

var Game = function(canvas) {
	core.apply(this, arguments);

	this.addScene("stg", new SceneStg(this));
};
util.inherit(Game, core);

Game.prototype.init = function () {
	core.prototype.init.apply(this, arguments);

	this.changeScene("stg");
};

module.exports = Game;

},{"./hakurei":3,"./scene/stg":16}],3:[function(require,module,exports){
'use strict';

module.exports = require("./hakurejs/index");

},{"./hakurejs/index":5}],4:[function(require,module,exports){
'use strict';

var Core = function(canvas) {
	this.ctx = canvas.getContext('2d');

	this.width = Number(canvas.getAttribute('width'));
	this.height = Number(canvas.getAttribute('height'));

	this.current_scene = null;
	this.scenes = {};

	this.frame_count = 0;

	this.request_id = null;
};
Core.prototype.init = function () {
	this.current_scene = null;
	this.frame_count = 0;

	this.request_id = null;
};
Core.prototype.isRunning = function () {
	return this.request_id ? true : false;
};
Core.prototype.startRun = function () {
	if(this.isRunning()) return;

	this.run();
};
Core.prototype.run = function(){
	//this.handleGamePad();

	var current_scene = this.currentScene();
	if(current_scene) {
		current_scene.beforeDraw();

		// clear already rendered canvas
		this.clearCanvas();

		current_scene.draw();
		current_scene.afterDraw();
	}

	/*

	if(Config.DEBUG) {
		this._renderFPS();
	}

	// SEを再生
	this.runPlaySound();

	// 押下されたキーを保存しておく
	this.before_keyflag = this.keyflag;
	*/

	// 経過フレーム数更新
	this.frame_count++;

	// 次の描画タイミングで再呼び出ししてループ
	this.request_id = requestAnimationFrame(this.run.bind(this));
};
Core.prototype.currentScene = function() {
	if(this.current_scene === null) {
		return;
	}

	return this.scenes[this.current_scene];
};

Core.prototype.addScene = function(name, scene) {
	this.scenes[name] = scene;
};
Core.prototype.changeScene = function(name) {
	this.current_scene = name;
	this.currentScene().init();
};
Core.prototype.clearCanvas = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
};














module.exports = Core;

},{}],5:[function(require,module,exports){
'use strict';
module.exports = {
	util: require("./util"),
	core: require("./core"),
	scene: {
		base: require("./scene/base"),
	},
	object: {
		base: require("./object/base"),
		pool_manager: require("./object/pool_manager"),
	},

};

},{"./core":4,"./object/base":6,"./object/pool_manager":7,"./scene/base":8,"./util":9}],6:[function(require,module,exports){
'use strict';

var ObjectBase = function(scene) {
	this.scene = scene;
	this.core = scene.core;

	this.frame_count = 0;

	this.x = 0;
	this.y = 0;
};

ObjectBase.prototype.init = function(){
	this.frame_count = 0;

	this.x = 0;
	this.y = 0;
};

ObjectBase.prototype.beforeDraw = function(){
	this.frame_count++;

};

ObjectBase.prototype.draw = function(){
};

ObjectBase.prototype.afterDraw = function(){
};

module.exports = ObjectBase;


},{}],7:[function(require,module,exports){
'use strict';

// TODO: add pooling logic

var base_object = require('./base');
var util = require('../util');

var PoolManager = function(scene) {
	base_object.apply(this, arguments);

	this.objects = [];
};
util.inherit(PoolManager, base_object);

PoolManager.prototype.init = function() {
	base_object.prototype.init.apply(this, arguments);

	this.objects = [];
};

PoolManager.prototype.beforeDraw = function(){
	base_object.prototype.beforeDraw.apply(this, arguments);

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].beforeDraw();
	}
};

PoolManager.prototype.draw = function(){
	base_object.prototype.draw.apply(this, arguments);
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].draw();
	}
};

PoolManager.prototype.afterDraw = function(){
	base_object.prototype.afterDraw.apply(this, arguments);
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].afterDraw();
	}
};

PoolManager.prototype.addObject = function(object){
	this.objects.push(object);
};

PoolManager.prototype.addObjects = function(objects) {
	 this.objects = this.objects.concat(objects);
};
module.exports = PoolManager;

},{"../util":9,"./base":6}],8:[function(require,module,exports){
'use strict';

var SceneBase = function(core) {
	this.core = core;

	this.frame_count = 0;

	this.objects = [];
};

SceneBase.prototype.init = function(){
	this.frame_count = 0;

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].init();
	}
};

SceneBase.prototype.beforeDraw = function(){
	this.frame_count++;

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].beforeDraw();
	}
};

SceneBase.prototype.draw = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].draw();
	}
};

SceneBase.prototype.afterDraw = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].afterDraw();
	}
};

SceneBase.prototype.addObject = function(object){
	this.objects.push(object);
};


module.exports = SceneBase;


},{}],9:[function(require,module,exports){
'use strict';
var Util = {
	inherit: function( child, parent ) {
		var getPrototype = function(p) {
			if(Object.create) return Object.create(p);

			var F = function() {};
			F.prototype = p;
			return new F();
		};
		child.prototype = getPrototype(parent.prototype);
		child.prototype.constructor = child;
	},
	radianToTheta: function(radian) {
		return (radian * 180 / Math.PI) | 0;
	},
	thetaToRadian: function(theta) {
		return theta * Math.PI / 180;
	},
	hexToRGBString: function(h) {
		var hex16 = (h.charAt(0) === "#") ? h.substring(1, 7) : h;
		var r = parseInt(hex16.substring(0, 2), 16);
		var g = parseInt(hex16.substring(2, 4), 16);
		var b = parseInt(hex16.substring(4, 6), 16);

		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	},
};

module.exports = Util;

},{}],10:[function(require,module,exports){
'use strict';

var EnemyAppear = function() {
};

EnemyAppear.prototype.init = function() {
};
EnemyAppear.prototype.update = function() {
};
EnemyAppear.prototype.is_occur = function() {
};
EnemyAppear.prototype.getAppearEnemies = function() {
};
module.exports = EnemyAppear;

},{}],11:[function(require,module,exports){
'use strict';
var Game = require('./game');

// WebAudio
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var game;

window.onload = function() {
	// Canvas
	var mainCanvas = document.getElementById('mainCanvas');
	// Game オブジェクト
	game = new Game(mainCanvas);
	// 初期化
	game.init();
	// キーバインド
	window.onkeydown = function(e) { game.handleKeyDown(e); };
	window.onkeyup   = function(e) { game.handleKeyUp(e); };

	/*
	// ゲームパッド
	if(window.Gamepad && navigator.getGamepads) {
		game.enableGamePad();
	}
	*/

	// ゲーム起動
	game.startRun();
};
window.onerror = function (msg, file, line, column, err) {
	/*
	msg: error message
	file: file path
	line: row number
	column: column number
	err: error object
	*/ 
	window.alert(msg + "\n" + line + ":" + column);
};
/*
window.runGame = function () {
	game.startRun();
};
window.stopGame = function () {
	game.stopRun();
};

window.changeFullScreen = function () {
	var mainCanvas = document.getElementById('mainCanvas');
	if (mainCanvas.requestFullscreen) {
		mainCanvas.requestFullscreen();
	}
	else if (mainCanvas.msRequestuestFullscreen) {
		mainCanvas.msRequestuestFullscreen();
	}
	else if (mainCanvas.mozRequestFullScreen) {
		mainCanvas.mozRequestFullScreen();
	}
	else if (mainCanvas.webkitRequestFullscreen) {
		mainCanvas.webkitRequestFullscreen();
	}
};
*/

},{"./game":2}],12:[function(require,module,exports){
'use strict';
var base_object = require('../hakurei').object.base;
var util = require('../hakurei').util;

var Chara = function(scene) {
	base_object.apply(this, arguments);
};
util.inherit(Chara, base_object);

Chara.prototype.init = function(){
	base_object.prototype.init.apply(this, arguments);

	this.x = 30;
	this.y = 30;
};

Chara.prototype.draw = function(){

	var ctx = this.core.ctx;
	ctx.fillStyle = 'rgb( 6, 40, 255 )';
	ctx.textAlign = 'left';
	ctx.fillText("Frame: " + this.frame_count, this.x, this.y);

	base_object.prototype.draw.apply(this, arguments);
};

module.exports = Chara;

},{"../hakurei":3}],13:[function(require,module,exports){
'use strict';
var base_object = require('../../hakurei').object.base;
var util = require('../../hakurei').util;

var Proton = require('../../proton');

var Particle = function(scene) {
	base_object.apply(this, arguments);

	this.canvas = document.createElement('canvas');
};
util.inherit(Particle, base_object);

Particle.prototype.init = function(){
	base_object.prototype.init.apply(this, arguments);
	this.proton = this.createProton();
};
Particle.prototype.beforeDraw = function(){
	base_object.prototype.beforeDraw.apply(this, arguments);

	this.proton.update();
};

Particle.prototype.draw = function() {
	base_object.prototype.draw.apply(this, arguments);

	this.core.ctx.drawImage(this.canvas, this.x, this.y);
};

Particle.prototype.createProton = function(){
	var proton = new Proton();
	return proton;
};



module.exports = Particle;

},{"../../hakurei":3,"../../proton":15}],14:[function(require,module,exports){
'use strict';
var base_particle = require('./base');
var util = require('../../hakurei').util;

var Proton = require('../../proton');

var EnemyAppear = function(scene) {
	base_particle.apply(this, arguments);
	this.canvas.width = 1003;
	this.canvas.height = 610;

};
util.inherit(EnemyAppear, base_particle);

EnemyAppear.prototype.createProton = function(){
	var canvas = this.canvas;
	var colors = ['#529B88', '#CDD180', '#FFFA32', '#FB6255', '#FB4A53', '#FF4E50', '#F9D423'];

	var proton = new Proton();
	var emitter = new Proton.Emitter();
	emitter.rate = new Proton.Rate(new Proton.Span(3, 6), new Proton.Span(0.05, 0.2));
	emitter.addInitialize(new Proton.Mass(1));
	emitter.addInitialize(new Proton.Radius(20, 200));
	emitter.addInitialize(new Proton.Life(2, 4));
	emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, canvas.width, canvas.height)));
	emitter.addBehaviour(new Proton.Alpha(0, 1, Infinity, Proton.easeOutCubic));
	emitter.addBehaviour(new Proton.Scale(1, 0, Infinity, Proton.easeOutCubic));
	emitter.addBehaviour(new Proton.Color(colors, 'random'));

	emitter.emit();
	proton.addEmitter(emitter);

	var renderer = new Proton.Renderer('canvas', proton, canvas);
	renderer.start();

	return proton;
};



module.exports = EnemyAppear;

},{"../../hakurei":3,"../../proton":15,"./base":13}],15:[function(require,module,exports){
'use strict';
require('proton');
var Proton = window.Proton;

module.exports = Proton;

},{"proton":1}],16:[function(require,module,exports){
'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;
var PoolManager = require('../hakurei').object.pool_manager;

var Chara = require('../object/chara');
var Particle = require('../object/particle/enemy_appear');
var EnemyAppear = require('../logic/enemy_appear');

var SceneStg = function(core) {
	base_scene.apply(this, arguments);

	this.chara = new Chara(this);
	this.addObject(this.chara);

	this.enemies = new PoolManager(this);
	this.addObject(this.enemies);

	this.enemy_appear = new EnemyAppear();


	this.addObject(new Particle(this));
};
util.inherit(SceneStg, base_scene);

SceneStg.prototype.init = function(){
	base_scene.prototype.init.apply(this, arguments);
	this.enemy_appear.init();
};

SceneStg.prototype.beforeDraw = function(){
	base_scene.prototype.beforeDraw.apply(this, arguments);

	// appear enemy
	this.enemy_appear.update();
	if (this.enemy_appear.is_occur()) {
		this.enemies.addObjects(this.enemy_appear.getAppearEnemies());
	}
};

SceneStg.prototype.draw = function(){
	var ctx = this.core.ctx;

	// draw background color
	ctx.fillStyle = util.hexToRGBString("E2FFFC");
	ctx.fillRect(0, 0, this.core.width, this.core.height);

	// draw objects
	base_scene.prototype.draw.apply(this, arguments);
};

module.exports = SceneStg;

},{"../hakurei":3,"../logic/enemy_appear":10,"../object/chara":12,"../object/particle/enemy_appear":14}]},{},[11]);
