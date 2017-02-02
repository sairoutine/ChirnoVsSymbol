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
