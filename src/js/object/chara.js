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
	base_object.prototype.draw.apply(this, arguments);

	var image = this.core.image_loader.getImage("chara");

	var ctx = this.core.ctx;

	ctx.save();

	// set position
	ctx.translate(this.x, this.y);

	// rotate
	var rotate = util.thetaToRadian(this.velocity.theta);
	ctx.rotate(rotate);

	var width  = this.spriteWidth()  * this.scale();
	var height = this.spriteHeight() * this.scale();

	ctx.drawImage(image,
		// スプライトの取得位置
		this.spriteWidth()  * this.spriteIndexX(), this.spriteHeight() * this.spriteIndexY(),
		// スプライトのサイズ
		this.spriteWidth(),                   this.spriteHeight(),
		// x, yがオブジェクトの真ん中を指定しているので、左上をx, yの始点に変更
		-width/2,                             -height/2,
		// オブジェクトのゲーム上のサイズ
		width,                                height
	);
	ctx.restore();
};

Chara.prototype.spriteIndexX = function(){
	return 3;
};
Chara.prototype.spriteIndexY = function(){
	return 0;
};

Chara.prototype.spriteWidth = function(){
	return 80;
};
Chara.prototype.spriteHeight = function(){
	return 96;
};
Chara.prototype.scale = function(){
	return 1;
};


module.exports = Chara;
