'use strict';
var sprite = require('../hakurei').object.sprite;
var util = require('../hakurei').util;

var MAGNITUDE = 10;

var Shot = function(scene) {
	sprite.apply(this, arguments);
};
util.inherit(Shot, sprite);

Shot.prototype.init = function(x, y, theta) {
	sprite.prototype.init.apply(this, arguments);

	this.x = x;
	this.y = y;
	this.setVelocity({magnitude: MAGNITUDE, theta: theta});
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




module.exports = Shot;
