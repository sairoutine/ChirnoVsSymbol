'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;
var PoolManager = require('../hakurei').object.pool_manager;
var CONSTANT = require('../hakurei').constant;

var Chara = require('../object/chara');
var Stage = require('../object/stage');
var Enemy = require('../object/enemy');
var Shot  = require('../object/shot');
var EnemyAppear = require('../logic/enemy_appear');

var SceneStg = function(core) {
	base_scene.apply(this, arguments);

	this.stage = new Stage(this);
	this.addObject(this.stage);

	this.shots = new PoolManager(this, Shot);
	this.addObject(this.shots);

	this.chara = new Chara(this);
	this.addObject(this.chara);

	this.enemies = new PoolManager(this, Enemy);
	this.addObject(this.enemies);

	this.enemy_appear = new EnemyAppear(this);
};
util.inherit(SceneStg, base_scene);

SceneStg.prototype.init = function(){
	base_scene.prototype.init.apply(this, arguments);
	this.enemy_appear.init();
};

SceneStg.prototype.beforeDraw = function(){
	base_scene.prototype.beforeDraw.apply(this, arguments);

	// appear enemy
	this.enemy_appear.exec();

	if(this.core.isKeyDown(CONSTANT.BUTTON_Z)) {
		var x = this.chara.calcMoveX();
		var y = this.chara.calcMoveY();

		this.stage.x -= x;
		this.stage.y -= y;

		// forbid chara out of display
		if(this.chara.x < this.stage.leftX()) {
			this.stage.x = this.chara.x;
		}
		else if(this.chara.x > this.stage.rightX()) {
			this.stage.x = this.chara.x - this.stage.width;
		}
		if(this.chara.y < this.stage.upY()) {
			this.stage.y = this.chara.y;
		}
		else if(this.chara.y > this.stage.downY()) {
			this.stage.y = this.chara.y - this.stage.height;
		}

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
