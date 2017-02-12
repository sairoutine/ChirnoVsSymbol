'use strict';
var core = require('./hakurei').core;
var util = require('./hakurei').util;
var SceneStg = require('./scene/stg');
var SceneLoading = require('./scene/loading');
var Sample = require('./scene/sample');

var Game = function(canvas) {
	core.apply(this, arguments);

	this.addScene("stg", new SceneStg(this));
	this.addScene("loading", new SceneLoading(this));
	/* sample */
	this.addScene("sample", new Sample(this));
};
util.inherit(Game, core);

Game.prototype.init = function () {
	core.prototype.init.apply(this, arguments);

	this.changeScene("loading");
};

module.exports = Game;
