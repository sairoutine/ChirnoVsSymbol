'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;

var SceneLoading = function(core) {
	base_scene.apply(this, arguments);
};
util.inherit(SceneLoading, base_scene);

SceneLoading.prototype.init = function() {
	base_scene.prototype.init.apply(this, arguments);
	this.core.image_loader.loadImage("chara", "./image/chirno.png");
	this.core.image_loader.loadImage("shot", "./image/shot.png");

	// sample
	this.core.image_loader.loadImage("player", "./image/1player.png");
	this.core.image_loader.loadImage("block", "./image/brook.png");
	this.core.image_loader.loadImage("hashigo", "./image/hasigo.png");
};

SceneLoading.prototype.beforeDraw = function() {
	base_scene.prototype.beforeDraw.apply(this, arguments);

	if (this.core.image_loader.isAllLoaded()) {
		// sample
		this.core.changeScene("sample");
		//this.core.changeScene("stg");
	}
};
SceneLoading.prototype.draw = function(){
	base_scene.prototype.draw.apply(this, arguments);

	var ctx = this.core.ctx;
	ctx.save();
	ctx.fillStyle = 'rgb( 0, 0, 0 )';
	ctx.textAlign = 'right';
	ctx.font = "30px 'ＭＳ ゴシック'";
	ctx.fillText('Now Loading...', 400, 225);
	ctx.restore();
};

module.exports = SceneLoading;
