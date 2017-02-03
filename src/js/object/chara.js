'use strict';
var base_object = require('../hakurei').object.base;
var util = require('../hakurei').util;

var CONSTANT = require('../hakurei').constant;

var Chara = function(scene) {
	base_object.apply(this, arguments);

	this.velocity = {theta: 0, magnitude: 10};
};
util.inherit(Chara, base_object);

Chara.prototype.init = function(){
	base_object.prototype.init.apply(this, arguments);

	this.x = this.core.width/2;
	this.y = this.core.height/2;
};

var BUTTON_UP_RIGHT_MAX_THETA = 315;
var BUTTON_UP_LEFT_MAX_THETA  = 225;
var BUTTON_DOWN_RIGHT_MAX_THETA   = 45;
var BUTTON_DOWN_LEFT_MAX_THETA    = 135;

var BUTTON_UP_MAX_THETA    = 270;
var BUTTON_DOWN_MAX_THETA  = 90;
var BUTTON_LEFT_MAX_THETA  = 180;
var BUTTON_RIGHT_MAX_THETA = 0;


Chara.prototype.beforeDraw = function(){
	base_object.prototype.beforeDraw.apply(this, arguments);
	if(this.core.isKeyDown(CONSTANT.BUTTON_LEFT) &&
			this.core.isKeyDown(CONSTANT.BUTTON_DOWN)) {
		this.velocity.theta=BUTTON_DOWN_LEFT_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_RIGHT) &&
			this.core.isKeyDown(CONSTANT.BUTTON_DOWN)) {
		this.velocity.theta=BUTTON_DOWN_RIGHT_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_LEFT) &&
			this.core.isKeyDown(CONSTANT.BUTTON_UP)) {
		this.velocity.theta=BUTTON_UP_LEFT_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_RIGHT) &&
			this.core.isKeyDown(CONSTANT.BUTTON_UP)) {
		this.velocity.theta=BUTTON_UP_RIGHT_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_UP)) {
		this.velocity.theta=BUTTON_UP_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_DOWN)) {
		this.velocity.theta=BUTTON_DOWN_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_LEFT)) {
		this.velocity.theta=BUTTON_LEFT_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_RIGHT)) {
		this.velocity.theta=BUTTON_RIGHT_MAX_THETA;
	}
};

Chara.prototype.calcMoveX = function() {
	var move_x = this.velocity.magnitude * Math.cos(util.thetaToRadian(this.velocity.theta));
	return move_x;
};

Chara.prototype.calcMoveY = function() {
	var move_y = this.velocity.magnitude * Math.sin(util.thetaToRadian(this.velocity.theta));
	return move_y;
};

Chara.prototype.draw = function(){

	var ctx = this.core.ctx;
	ctx.fillStyle = 'rgb( 6, 40, 255 )';
	ctx.textAlign = 'left';
	ctx.fillText("Frame: " + this.frame_count, this.x, this.y);

	base_object.prototype.draw.apply(this, arguments);
};

module.exports = Chara;
