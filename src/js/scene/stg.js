'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;

var SceneStg = function(core) {
	base_scene.apply(this, arguments);
};
util.inherit(SceneStg, base_scene);

SceneStg.prototype.init = function(){
	console.log("init!");

};
SceneStg.prototype.draw = function(){
	this.core.clearCanvas();
	var ctx = this.core.ctx;

	ctx.fillStyle = 'rgb( 6, 40, 255 )';
	ctx.textAlign = 'left';
	ctx.fillText("Frame: " + this.frame_count, 30, 30);
};

module.exports = SceneStg;
