'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;
var PoolManager = require('../hakurei').object.pool_manager;
var CONSTANT = require('../hakurei').constant;

var Chara = require('../object/chara');
var Enemy = require('../object/enemy');
var Shot  = require('../object/shot');
var EnemyAppear = require('../logic/enemy_appear');

var SceneStg = function(core) {
	base_scene.apply(this, arguments);

	this.width  = 1500;
	this.height = 1500;

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

	this.x = -this.chara.x + this.core.width/2;
	this.y = -this.chara.y + this.core.height/2;
};

SceneStg.prototype.beforeDraw = function(){
	base_scene.prototype.beforeDraw.apply(this, arguments);

	// appear enemy
	this.enemy_appear.exec();

	if(this.core.isKeyDown(CONSTANT.BUTTON_Z)) {
		// forbid chara out of stage
		if(this.chara.x < 0) {
			this.chara.x = 0;
		}
		else if(this.chara.x > this.width) {
			this.chara.x = this.width;
		}
		if(this.chara.y < 0) {
			this.chara.y = 0;
		}
		else if(this.chara.y > this.height) {
			this.chara.y = this.height;
		}

		// scrolling background
		this.x = -this.chara.x + this.core.width/2;
		this.y = -this.chara.y + this.core.height/2;
	}

	this.enemies.checkCollisionWithManager(this.shots);
};

SceneStg.prototype.draw = function(){
	var ctx = this.core.ctx;

	// draw background color
	ctx.fillStyle = util.hexToRGBString("E2FFFC");
	ctx.fillRect(0, 0, this.width, this.height);

	// bars which enclose stage
	var BAR_SIZE = 10;

	ctx.fillStyle = util.hexToRGBString("608C87");

	ctx.fillRect(this.x, this.y, BAR_SIZE, this.height);
	ctx.fillRect(this.x + BAR_SIZE, this.y, this.width, BAR_SIZE);
	ctx.fillRect(this.x + this.width, this.y + BAR_SIZE, BAR_SIZE, this.height);
	ctx.fillRect(this.x, this.y + this.height, this.width, BAR_SIZE);

	// draw objects
	base_scene.prototype.draw.apply(this, arguments);
};

module.exports = SceneStg;
