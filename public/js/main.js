(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./hakurei":2,"./scene/loading":15,"./scene/stg":16}],2:[function(require,module,exports){
'use strict';

module.exports = require("./hakurejs/index");

},{"./hakurejs/index":6}],3:[function(require,module,exports){
'use strict';

var ImageLoader = function(game) {
	this.images = {};

	this.loading_image_num = 0;
	this.loaded_image_num = 0;
};
ImageLoader.prototype.init = function() {
	// cancel already loading images
	for(var name in this.images){
		this.images[name].src = "";
	}

	this.images = {};

	this.loading_image_num = 0;
	this.loaded_image_num = 0;
};

ImageLoader.prototype.loadImage = function(name, path) {
	var self = this;

	self.loading_image_num++;

	// it's done to load image
	var onload_function = function() {
		self.loaded_image_num++;
	};

	var image = new Image();
	image.src = path;
	image.onload = onload_function;
	this.images[name] = image;
};

ImageLoader.prototype.isAllLoaded = function() {
	return this.loaded_image_num > 0 && this.loaded_image_num === this.loading_image_num;
};

ImageLoader.prototype.getImage = function(name) {
	return this.images[name];
};

module.exports = ImageLoader;

},{}],4:[function(require,module,exports){
'use strict';

var Constant = {
	BUTTON_SHIFT: 16,
	BUTTON_SPACE: 32,
	BUTTON_LEFT:  37,
	BUTTON_UP:    38,
	BUTTON_RIGHT: 39,
	BUTTON_DOWN:  40,
	BUTTON_X:     88,
	BUTTON_Z:     90,
};

module.exports = Constant;

},{}],5:[function(require,module,exports){
'use strict';
var CONSTANT = require("./constant");
var ImageLoader = require("./asset_loader/image");

var Core = function(canvas) {
	this.ctx = canvas.getContext('2d');

	this.width = Number(canvas.getAttribute('width'));
	this.height = Number(canvas.getAttribute('height'));

	this.current_scene = null;
	this.scenes = {};

	this.frame_count = 0;

	this.request_id = null;

	this.key_down_map = {};

	this.image_loader = new ImageLoader();
};
Core.prototype.init = function () {
	this.current_scene = null;
	this.frame_count = 0;

	this.request_id = null;

	this.key_down_map = {};

	this.image_loader.init();
};
Core.prototype.isRunning = function () {
	return this.request_id ? true : false;
};
Core.prototype.startRun = function () {
	if(this.isRunning()) return;

	this.run();
};
Core.prototype.run = function(){
	// get gamepad input
	this.handleGamePad();

	var current_scene = this.currentScene();
	if(current_scene) {
		current_scene.beforeDraw();

		// clear already rendered canvas
		this.clearCanvas();

		current_scene.draw();
		current_scene.afterDraw();
	}

	/*

	if(Config.DEBUG) {
		this._renderFPS();
	}

	// SEを再生
	this.runPlaySound();

	// 押下されたキーを保存しておく
	this.before_keyflag = this.keyflag;
	*/

	// 経過フレーム数更新
	this.frame_count++;

	// 次の描画タイミングで再呼び出ししてループ
	this.request_id = requestAnimationFrame(this.run.bind(this));
};
Core.prototype.currentScene = function() {
	if(this.current_scene === null) {
		return;
	}

	return this.scenes[this.current_scene];
};

Core.prototype.addScene = function(name, scene) {
	this.scenes[name] = scene;
};
Core.prototype.changeScene = function(name) {
	this.current_scene = name;
	this.currentScene().init();
};
Core.prototype.clearCanvas = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
};
Core.prototype.handleKeyDown = function(e) {
	var keycode = e.keyCode;

	// initialize
	if(!(keycode in this.key_down_map)) {
		this.key_down_map[keycode] = 0;
	}

	this.key_down_map[keycode]++;
	e.preventDefault();
};
Core.prototype.handleKeyUp = function(e) {
	this.key_down_map[e.keyCode] = 0;
	e.preventDefault();
};
Core.prototype.handleGamePad = function() {
	//if(!this.is_connect_gamepad) return;

	var pads = navigator.getGamepads();
	var pad = pads[0]; // 1P gamepad

	if(!pad) return;

	var num_to_keycode = [
		CONSTANT.BUTTON_Z,
		CONSTANT.BUTTON_X,
	];

	for (var i = 0, len = num_to_keycode.length; i < len; i++) {
		if (pad.buttons[i].pressed) {
			// initialize
			if(!(num_to_keycode[i] in this.key_down_map)) {
				this.key_down_map[ num_to_keycode[i] ] = 0;
			}

			this.key_down_map[ num_to_keycode[i] ]++;
		}
		else {
			this.key_down_map[ num_to_keycode[i] ] = 0;
		}
	}

	// up
	if(pad.axes[1] < -0.5) {
		if(!(CONSTANT.BUTTON_UP in this.key_down_map)) {
			this.key_down_map[CONSTANT.BUTTON_UP] = 0;
		}

		this.key_down_map[CONSTANT.BUTTON_UP]++;
	}
	else {
		this.key_down_map[CONSTANT.BUTTON_UP] = 0;
	}

	// down
	if(pad.axes[1] >  0.5) { 
		if(!(CONSTANT.BUTTON_UP in this.key_down_map)) {
			this.key_down_map[CONSTANT.BUTTON_DOWN] = 0;
		}

		this.key_down_map[CONSTANT.BUTTON_DOWN]++;
	}
	else {
		this.key_down_map[CONSTANT.BUTTON_DOWN] = 0;
	}

	// left
	if(pad.axes[0] < -0.5) { 
		if(!(CONSTANT.BUTTON_UP in this.key_down_map)) {
			this.key_down_map[CONSTANT.BUTTON_LEFT] = 0;
		}

		this.key_down_map[CONSTANT.BUTTON_LEFT]++;
	}
	else {
		this.key_down_map[CONSTANT.BUTTON_LEFT] = 0;
	}

	// right
	if(pad.axes[0] >  0.5) {
		if(!(CONSTANT.BUTTON_UP in this.key_down_map)) {
			this.key_down_map[CONSTANT.BUTTON_RIGHT] = 0;
		}

		this.key_down_map[CONSTANT.BUTTON_RIGHT]++;
	}
	else {
		this.key_down_map[CONSTANT.BUTTON_RIGHT] = 0;
	}
};



Core.prototype.isKeyDown = function(keycode) {
	return this.key_down_map[keycode] > 0 ? true : false;
};
Core.prototype.isKeyPush = function(keycode) {
	return this.key_down_map[keycode] === 1 ? true : false;
};

module.exports = Core;

},{"./asset_loader/image":3,"./constant":4}],6:[function(require,module,exports){
'use strict';
module.exports = {
	util: require("./util"),
	core: require("./core"),
	constant: require("./constant"),
	scene: {
		base: require("./scene/base"),
	},
	object: {
		base: require("./object/base"),
		pool_manager: require("./object/pool_manager"),
	},
	asset_loader: {
		image: require("./asset_loader/image"),
		//sound: require("./asset_loader/sound"),
	},
};

},{"./asset_loader/image":3,"./constant":4,"./core":5,"./object/base":7,"./object/pool_manager":8,"./scene/base":9,"./util":10}],7:[function(require,module,exports){
'use strict';

var ObjectBase = function(scene) {
	this.scene = scene;
	this.core = scene.core;

	this.frame_count = 0;

	this.x = 0;
	this.y = 0;
};

ObjectBase.prototype.init = function(){
	this.frame_count = 0;

	this.x = 0;
	this.y = 0;
};

ObjectBase.prototype.beforeDraw = function(){
	this.frame_count++;

};

ObjectBase.prototype.draw = function(){
};

ObjectBase.prototype.afterDraw = function(){
};

module.exports = ObjectBase;


},{}],8:[function(require,module,exports){
'use strict';

// TODO: add pooling logic

var base_object = require('./base');
var util = require('../util');

var PoolManager = function(scene) {
	base_object.apply(this, arguments);

	this.objects = [];
};
util.inherit(PoolManager, base_object);

PoolManager.prototype.init = function() {
	base_object.prototype.init.apply(this, arguments);

	this.objects = [];
};

PoolManager.prototype.beforeDraw = function(){
	base_object.prototype.beforeDraw.apply(this, arguments);

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].beforeDraw();
	}
};

PoolManager.prototype.draw = function(){
	base_object.prototype.draw.apply(this, arguments);
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].draw();
	}
};

PoolManager.prototype.afterDraw = function(){
	base_object.prototype.afterDraw.apply(this, arguments);
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].afterDraw();
	}
};

PoolManager.prototype.addObject = function(object){
	this.objects.push(object);
};

PoolManager.prototype.addObjects = function(objects) {
	 this.objects = this.objects.concat(objects);
};
module.exports = PoolManager;

},{"../util":10,"./base":7}],9:[function(require,module,exports){
'use strict';

var SceneBase = function(core) {
	this.core = core;

	this.frame_count = 0;

	this.objects = [];
};

SceneBase.prototype.init = function(){
	this.frame_count = 0;

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].init();
	}
};

SceneBase.prototype.beforeDraw = function(){
	this.frame_count++;

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].beforeDraw();
	}
};

SceneBase.prototype.draw = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].draw();
	}
};

SceneBase.prototype.afterDraw = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].afterDraw();
	}
};

SceneBase.prototype.addObject = function(object){
	this.objects.push(object);
};


module.exports = SceneBase;


},{}],10:[function(require,module,exports){
'use strict';
var Util = {
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
	radianToTheta: function(radian) {
		return (radian * 180 / Math.PI) | 0;
	},
	thetaToRadian: function(theta) {
		return theta * Math.PI / 180;
	},
	hexToRGBString: function(h) {
		var hex16 = (h.charAt(0) === "#") ? h.substring(1, 7) : h;
		var r = parseInt(hex16.substring(0, 2), 16);
		var g = parseInt(hex16.substring(2, 4), 16);
		var b = parseInt(hex16.substring(4, 6), 16);

		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	},
};

module.exports = Util;

},{}],11:[function(require,module,exports){
'use strict';

var EnemyAppear = function() {
};

EnemyAppear.prototype.init = function() {
};
EnemyAppear.prototype.update = function() {
};
EnemyAppear.prototype.is_occur = function() {
};
EnemyAppear.prototype.getAppearEnemies = function() {
};
module.exports = EnemyAppear;

},{}],12:[function(require,module,exports){
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

},{"./game":1}],13:[function(require,module,exports){
'use strict';
var base_object = require('../hakurei').object.base;
var util = require('../hakurei').util;

var CONSTANT = require('../hakurei').constant;

var Chara = function(scene) {
	base_object.apply(this, arguments);

	this.velocity = {theta: 0, magnitude: 10};
};
util.inherit(Chara, base_object);

Chara.prototype.init = function(){
	base_object.prototype.init.apply(this, arguments);

	this.x = this.core.width/2;
	this.y = this.core.height/2;
};

var BUTTON_UP_RIGHT_MAX_THETA = 315;
var BUTTON_UP_LEFT_MAX_THETA  = 225;
var BUTTON_DOWN_RIGHT_MAX_THETA   = 45;
var BUTTON_DOWN_LEFT_MAX_THETA    = 135;

var BUTTON_UP_MAX_THETA    = 270;
var BUTTON_DOWN_MAX_THETA  = 90;
var BUTTON_LEFT_MAX_THETA  = 180;
var BUTTON_RIGHT_MAX_THETA = 0;


Chara.prototype.beforeDraw = function(){
	base_object.prototype.beforeDraw.apply(this, arguments);
	if(this.core.isKeyDown(CONSTANT.BUTTON_LEFT) &&
			this.core.isKeyDown(CONSTANT.BUTTON_DOWN)) {
		this.velocity.theta=BUTTON_DOWN_LEFT_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_RIGHT) &&
			this.core.isKeyDown(CONSTANT.BUTTON_DOWN)) {
		this.velocity.theta=BUTTON_DOWN_RIGHT_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_LEFT) &&
			this.core.isKeyDown(CONSTANT.BUTTON_UP)) {
		this.velocity.theta=BUTTON_UP_LEFT_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_RIGHT) &&
			this.core.isKeyDown(CONSTANT.BUTTON_UP)) {
		this.velocity.theta=BUTTON_UP_RIGHT_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_UP)) {
		this.velocity.theta=BUTTON_UP_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_DOWN)) {
		this.velocity.theta=BUTTON_DOWN_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_LEFT)) {
		this.velocity.theta=BUTTON_LEFT_MAX_THETA;
	}
	else if(this.core.isKeyDown(CONSTANT.BUTTON_RIGHT)) {
		this.velocity.theta=BUTTON_RIGHT_MAX_THETA;
	}
};

Chara.prototype.calcMoveX = function() {
	var move_x = this.velocity.magnitude * Math.cos(util.thetaToRadian(this.velocity.theta));
	return move_x;
};

Chara.prototype.calcMoveY = function() {
	var move_y = this.velocity.magnitude * Math.sin(util.thetaToRadian(this.velocity.theta));
	return move_y;
};

Chara.prototype.draw = function(){
	base_object.prototype.draw.apply(this, arguments);

	var image = this.core.image_loader.getImage("chara");

	var ctx = this.core.ctx;

	ctx.save();

	// set position
	ctx.translate(this.x, this.y);

	// rotate
	var rotate = util.thetaToRadian(this.velocity.theta);
	ctx.rotate(rotate);

	var width  = this.spriteWidth()  * this.scale();
	var height = this.spriteHeight() * this.scale();

	ctx.drawImage(image,
		// スプライトの取得位置
		this.spriteWidth()  * this.spriteIndexX(), this.spriteHeight() * this.spriteIndexY(),
		// スプライトのサイズ
		this.spriteWidth(),                   this.spriteHeight(),
		// x, yがオブジェクトの真ん中を指定しているので、左上をx, yの始点に変更
		-width/2,                             -height/2,
		// オブジェクトのゲーム上のサイズ
		width,                                height
	);
	ctx.restore();
};

Chara.prototype.spriteIndexX = function(){
	return 3;
};
Chara.prototype.spriteIndexY = function(){
	return 0;
};

Chara.prototype.spriteWidth = function(){
	return 80;
};
Chara.prototype.spriteHeight = function(){
	return 96;
};
Chara.prototype.scale = function(){
	return 1;
};


module.exports = Chara;

},{"../hakurei":2}],14:[function(require,module,exports){
'use strict';
var base_object = require('../hakurei').object.base;
var util = require('../hakurei').util;

var Stage = function(scene) {
	base_object.apply(this, arguments);
	this.width  = 2000;
	this.height = 2000;
};
util.inherit(Stage, base_object);

Stage.prototype.leftX = function() {
	return this.x;
};
Stage.prototype.rightX = function() {
	return this.x + this.width;
};
Stage.prototype.upY = function() {
	return this.y;
};
Stage.prototype.downY = function() {
	return this.y + this.height;
};

Stage.prototype.draw = function(){
	base_object.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	var BAR_SIZE = 10;

	ctx.fillStyle = util.hexToRGBString("608C87");

	// bars which enclose stage
	ctx.fillRect(this.leftX(), this.upY(), BAR_SIZE, this.height);
	ctx.fillRect(this.leftX() + BAR_SIZE, this.upY(), this.width, BAR_SIZE);
	ctx.fillRect(this.rightX(), this.upY() + BAR_SIZE, BAR_SIZE, this.height);
	ctx.fillRect(this.leftX(), this.downY(), this.width, BAR_SIZE);

};

module.exports = Stage;

},{"../hakurei":2}],15:[function(require,module,exports){
'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;

var SceneLoading = function(core) {
	base_scene.apply(this, arguments);
};
util.inherit(SceneLoading, base_scene);

SceneLoading.prototype.init = function() {
	base_scene.prototype.init.apply(this, arguments);
	this.core.image_loader.loadImage("chara", "./image/chirno.png");
};

SceneLoading.prototype.beforeDraw = function() {
	base_scene.prototype.beforeDraw.apply(this, arguments);

	if (this.core.image_loader.isAllLoaded()) {
		this.core.changeScene("stg");
	}
};
SceneLoading.prototype.draw = function(){
	base_scene.prototype.draw.apply(this, arguments);

	var ctx = this.core.ctx;
	ctx.save();
	ctx.fillStyle = 'rgb( 0, 0, 0 )';
	ctx.textAlign = 'right';
	ctx.font = "30px 'ＭＳ ゴシック'";
	ctx.fillText('Now Loading...', 400, 225);
	ctx.restore();
};

module.exports = SceneLoading;

},{"../hakurei":2}],16:[function(require,module,exports){
'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;
var PoolManager = require('../hakurei').object.pool_manager;
var CONSTANT = require('../hakurei').constant;

var Chara = require('../object/chara');
var Stage = require('../object/stage');
var EnemyAppear = require('../logic/enemy_appear');

var SceneStg = function(core) {
	base_scene.apply(this, arguments);

	this.chara = new Chara(this);
	this.addObject(this.chara);

	this.enemies = new PoolManager(this);
	this.addObject(this.enemies);

	this.enemy_appear = new EnemyAppear();


	this.stage = new Stage(this);
	this.addObject(this.stage);
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

},{"../hakurei":2,"../logic/enemy_appear":11,"../object/chara":13,"../object/stage":14}]},{},[12]);
