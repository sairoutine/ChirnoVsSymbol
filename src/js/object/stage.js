'use strict';
var base_object = require('../hakurei').object.base;
var util = require('../hakurei').util;

var Stage = function(scene) {
	base_object.apply(this, arguments);
	this.width  = 2000;
	this.height = 2000;
};
util.inherit(Stage, base_object);

Stage.prototype.draw = function(){
	base_object.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	var BAR_SIZE = 10;

	ctx.fillStyle = util.hexToRGBString("608C87");

	// bars which enclose stage
	ctx.fillRect(this.leftX(), this.upY(), BAR_SIZE, this.height);
	ctx.fillRect(this.leftX() + BAR_SIZE, this.upY(), this.width, BAR_SIZE);
	ctx.fillRect(this.rightX(), this.upY() + BAR_SIZE, BAR_SIZE, this.height);
	ctx.fillRect(this.leftX(), this.downY(), this.width, BAR_SIZE);

};

module.exports = Stage;
