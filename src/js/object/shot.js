'use strict';
var sprite = require('../hakurei').object.sprite;
var util = require('../hakurei').util;


var Shot = function(scene) {
	sprite.apply(this, arguments);
};
util.inherit(Shot, sprite);

Shot.prototype.init = function(x, y, magnitude, theta) {
	sprite.prototype.init.apply(this, arguments);

	this.x = x;
	this.y = y;
	this.setVelocity({magnitude: magnitude, theta: theta});
};

Shot.prototype.moveByVelocity = function(velocity){
	var x = util.calcMoveXByVelocity(velocity);
	var y = util.calcMoveYByVelocity(velocity);

	this.x += x;
	this.y += y;
};
Shot.prototype.spriteName = function(){
	return "shot";
};
Shot.prototype.spriteIndices = function(){
	return [{x: 5, y: 13}];
};
Shot.prototype.spriteWidth = function(){
	return 18;
};
Shot.prototype.spriteHeight = function(){
	return 16;
};
Shot.prototype.rotateAdjust = function(){
	return 90;
};

Shot.prototype.collisionWidth = function(){
	return 18;
};
Shot.prototype.collisionHeight = function(){
	return 18;
};
Shot.prototype.onCollision = function(obj) {
	this.scene.shots.remove(this.id);
};







module.exports = Shot;
