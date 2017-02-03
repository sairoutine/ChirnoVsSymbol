'use strict';
var core = require('./hakurei').core;
var util = require('./hakurei').util;
var SceneStg = require('./scene/stg');
var SceneLoading = require('./scene/loading');

var Game = function(canvas) {
	core.apply(this, arguments);

	this.addScene("stg", new SceneStg(this));
	this.addScene("loading", new SceneLoading(this));
};
util.inherit(Game, core);

Game.prototype.init = function () {
	core.prototype.init.apply(this, arguments);

	this.changeScene("loading");
};

module.exports = Game;
