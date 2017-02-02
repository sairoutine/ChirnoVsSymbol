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
