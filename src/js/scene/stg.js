'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;
var PoolManager = require('../hakurei').object.pool_manager;

var Chara = require('../object/chara');
var EnemyAppear = require('../logic/enemy_appear');

var SceneStg = function(core) {
	base_scene.apply(this, arguments);

	this.chara = new Chara(this);
	this.addObject(this.chara);

	this.enemies = new PoolManager(this);
	this.addObject(this.enemies);

	this.enemy_appear = new EnemyAppear();
};
util.inherit(SceneStg, base_scene);

SceneStg.prototype.init = function(){
	base_scene.prototype.init.apply(this, arguments);
	this.enemy_appear.init();
};

SceneStg.prototype.beforeDraw = function(){
	base_scene.prototype.beforeDraw.apply(this, arguments);

	// appear enemy
	this.enemy_appear.update();
	if (this.enemy_appear.is_occur()) {
		this.enemies.addObjects(this.enemy_appear.getAppearEnemies());
	}
};

SceneStg.prototype.draw = function(){
	var ctx = this.core.ctx;

	// draw background color
	ctx.fillStyle = util.hexToRGBString("E2FFFC");
	ctx.fillRect(0, 0, this.core.width, this.core.height);

	// draw objects
	base_scene.prototype.draw.apply(this, arguments);
};

module.exports = SceneStg;
