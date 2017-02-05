'use strict';

var EnemyAppear = function(stg_scene) {
	this.enemies = stg_scene.enemies;
	this.chara   = stg_scene.chara;
	this.scene   = stg_scene;

	this.frame_count = 0;
};

EnemyAppear.prototype.init = function() {
	this.frame_count = 0;
};
EnemyAppear.prototype.exec = function() {
	this.update();
	if (this.is_occur()) {
		this.create();
	}
};
EnemyAppear.prototype.update = function() {
	this.frame_count++;
};
EnemyAppear.prototype.is_occur = function() {
	return this.frame_count % 20 === 0;
};
EnemyAppear.prototype.create = function() {
	var magnitude = Math.floor(Math.random() * 5 + 1);
	var hp = Math.floor(Math.random() * 50);
	for (var i = 0; i < 3; i++) {
		var x = Math.floor(Math.random() * this.chara.x + 100);
		var y = Math.floor(Math.random() * this.chara.y + 100);
		this.enemies.create(x, y, magnitude, hp);
	}
};
module.exports = EnemyAppear;
