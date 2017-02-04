'use strict';

var EnemyAppear = function(enemy_pool_manager) {
	this.enemies = enemy_pool_manager;
};

EnemyAppear.prototype.init = function() {
};
EnemyAppear.prototype.exec = function() {
	this.update();
	if (this.is_occur()) {
		this.enemies.addObjects(this.getAppearEnemies());
	}
};
EnemyAppear.prototype.update = function() {
};
EnemyAppear.prototype.is_occur = function() {
};
EnemyAppear.prototype.getAppearEnemies = function() {
};
module.exports = EnemyAppear;
