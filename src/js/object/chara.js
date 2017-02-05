'use strict';
var sprite = require('../hakurei').object.sprite;
var util = require('../hakurei').util;

var CONSTANT = require('../hakurei').constant;


var SHOT_SPAN = 6;

var Chara = function(scene) {
	sprite.apply(this, arguments);

	this.velocity = {theta: 0, magnitude: 10};
};
util.inherit(Chara, sprite);

Chara.prototype.init = function(){
	sprite.prototype.init.apply(this, arguments);

	this.x = this.scene.width/2;
	this.y = this.scene.height/2;
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
	sprite.prototype.beforeDraw.apply(this, arguments);

	// decide theta to move
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

	// shot automatically
	if (this.frame_count % SHOT_SPAN === 0) {
		var span = 15;

		// shot speed
		var magnitude = 15;

		var theta = this.velocity.theta;
		this.scene.shots.create(this.x, this.y, magnitude, theta);
		this.scene.shots.create(this.x, this.y, magnitude, theta).moveByVelocity({magnitude: span, theta: theta + 90});
		this.scene.shots.create(this.x, this.y, magnitude, theta).moveByVelocity({magnitude: span, theta: theta - 90});
	}
};
Chara.prototype.move = function() {
	// chara moves only pressed Z
	if(!this.core.isKeyDown(CONSTANT.BUTTON_Z)) return;

	sprite.prototype.move.apply(this, arguments);
};

Chara.prototype.spriteName = function(){
	return "chara";
};

Chara.prototype.spriteIndices = function(){
	return [{x: 4, y: 0}, {x: 5, y: 0}];
};
Chara.prototype.spriteAnimationSpan = function(){
	return 6;
};
Chara.prototype.spriteWidth = function(){
	return 80;
};
Chara.prototype.spriteHeight = function(){
	return 96;
};

module.exports = Chara;
