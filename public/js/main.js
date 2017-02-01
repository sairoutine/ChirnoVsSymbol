(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var core = require('./hakurei').core;
var util = require('./hakurei').util;

var Game = function(canvas) {

};
util.inherit(Game, core);

module.exports = Game;

},{"./hakurei":2}],2:[function(require,module,exports){
'use strict';

module.exports = require("./hakurejs/index");

},{"./hakurejs/index":4}],3:[function(require,module,exports){
'use strict';

var Core = function(canvas) {

};

Core.prototype.init = function () {
	console.log("inited");
};
Core.prototype.startRun = function () {
	console.log("run!");
};

module.exports = Core;

},{}],4:[function(require,module,exports){
'use strict';
module.exports = {
	util: require("./util"),
	core: require("./core"),
};

},{"./core":3,"./util":5}],5:[function(require,module,exports){
'use strict';
var Util = {
	// 継承
	inherit: function( child, parent ) {
		var getPrototype = function(p) {
			if(Object.create) return Object.create(p);

			var F = function() {};
			F.prototype = p;
			return new F();
		};
		child.prototype = getPrototype(parent.prototype);
		child.prototype.constructor = child;
	},
	// ラジアン -> θ に変換
	radianToTheta: function(radian) {
		return (radian * 180 / Math.PI) | 0;
	},
	thetaToRadian: function(theta) {
		return theta * Math.PI / 180;
	},
};

module.exports = Util;

},{}],6:[function(require,module,exports){
'use strict';
var Game = require('./game');

// WebAudio
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var game;

window.onload = function() {
	// Canvas
	var mainCanvas = document.getElementById('mainCanvas');
	// Game オブジェクト
	game = new Game(mainCanvas);
	// 初期化
	game.init();
	// キーバインド
	window.onkeydown = function(e) { game.handleKeyDown(e); };
	window.onkeyup   = function(e) { game.handleKeyUp(e); };

	/*
	// ゲームパッド
	if(window.Gamepad && navigator.getGamepads) {
		game.enableGamePad();
	}
	*/

	// ゲーム起動
	game.startRun();
};
window.onerror = function (msg, file, line, column, err) {
	/*
	msg: error message
	file: file path
	line: row number
	column: column number
	err: error object
	*/ 
	window.alert(msg + "\n" + line + ":" + column);
};
/*
window.runGame = function () {
	game.startRun();
};
window.stopGame = function () {
	game.stopRun();
};

window.changeFullScreen = function () {
	var mainCanvas = document.getElementById('mainCanvas');
	if (mainCanvas.requestFullscreen) {
		mainCanvas.requestFullscreen();
	}
	else if (mainCanvas.msRequestuestFullscreen) {
		mainCanvas.msRequestuestFullscreen();
	}
	else if (mainCanvas.mozRequestFullScreen) {
		mainCanvas.mozRequestFullScreen();
	}
	else if (mainCanvas.webkitRequestFullscreen) {
		mainCanvas.webkitRequestFullscreen();
	}
};
*/

},{"./game":1}]},{},[6]);
