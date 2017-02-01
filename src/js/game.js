'use strict';
var core = require('./hakurei').core;
var util = require('./hakurei').util;

var Game = function(canvas) {
	core.apply(this, arguments);
};
util.inherit(Game, core);

Game.prototype.run = function () {
	core.prototype.run.apply(this, arguments);

	console.log("run: " + this.frame_count);
};

module.exports = Game;
