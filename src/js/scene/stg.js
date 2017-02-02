'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;

var Chara = require('../object/chara');

var SceneStg = function(core) {
	base_scene.apply(this, arguments);

	this.chara = new Chara(this);
	this.addObject(this.chara);
};
util.inherit(SceneStg, base_scene);

SceneStg.prototype.draw = function(){
	var ctx = this.core.ctx;
	ctx.fillStyle = util.hexToRGBString("E2FFFC");
	ctx.fillRect(0, 0, this.core.width, this.core.height);

	base_scene.prototype.draw.apply(this, arguments);
};

module.exports = SceneStg;
