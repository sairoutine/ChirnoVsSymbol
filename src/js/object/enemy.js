'use strict';
var base_object = require('../hakurei').object.base;
var util = require('../hakurei').util;
var Shot  = require('../object/shot');

var Enemy = function(scene) {
	base_object.apply(this, arguments);
};
util.inherit(Enemy, base_object);
Enemy.prototype.init = function(x, y, magnitude, hp) {
	base_object.prototype.init.apply(this, arguments);

	// hp
	this.hp = hp;
	// color
	var COLORS = ["BCB6FF","B8E1FF","94FBAB","82ABA1"];
	var color_index = Math.floor(Math.random() * COLORS.length);
	this.color = COLORS[color_index];

	// symbol type
	this.type = Math.floor(Math.random() * 3); // 0: box, 1: triangle, 2: circle
	this.x = x;
	this.y = y;
	this.setVelocity({magnitude: magnitude, theta: 0});
};

Enemy.prototype.draw = function() {
	base_object.prototype.draw.apply(this, arguments);

	switch (this.type) {
		case 0:
			this.drawBox();
			break;
		case 1:
			this.drawTriangle();
			break;
		case 2:
			this.drawCircle();
			break;
		default:
			throw new Error("unknown enemy type");
	}
};
Enemy.prototype.drawBox = function() {
	var ctx = this.core.ctx;

	var BAR_SIZE = 20;
	ctx.save();
	ctx.fillStyle = util.hexToRGBString(this.color);
	ctx.translate(this.globalCenterX(), this.globalCenterY());
	ctx.fillRect(0, 0, BAR_SIZE, BAR_SIZE);
	ctx.restore();
};
Enemy.prototype.drawTriangle = function() {
	var ctx = this.core.ctx;

	ctx.save();
	ctx.fillStyle = util.hexToRGBString(this.color);
	ctx.translate(this.globalCenterX(), this.globalCenterY());
	ctx.beginPath();
	ctx.moveTo(75,50);
	ctx.lineTo(100,75);
	ctx.lineTo(100,25);
	ctx.fill();
	ctx.restore();
};
Enemy.prototype.drawCircle = function() {
	var ctx = this.core.ctx;

	var RADIUS = 20;
	ctx.save();
	ctx.fillStyle = util.hexToRGBString(this.color);
	ctx.beginPath();
	ctx.arc(this.globalCenterX(), this.globalCenterY(), RADIUS, 0, Math.PI*2, true);
	ctx.fill();
	ctx.restore();
};


Enemy.prototype.onCollision = function(obj) {
	if(!(obj instanceof Shot)) { return; }

	// reduce HP
	this.hp--;

	// die
	if(this.hp <= 0) {
		this.die();
	}
};

Enemy.prototype.collisionWidth = function(){
	return 20;
};
Enemy.prototype.collisionHeight = function(){
	return 20;
};
Enemy.prototype.die = function() {
	// remove me
	this.scene.enemies.remove(this.id);

	// SE
	//this.game.playSound('enemy_vanish');

	// add score
	this.scene.score += 100;

	// create effect
	//this.stage.effect_manager.create(this.x, this.y);
};





module.exports = Enemy;
