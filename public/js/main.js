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

},{"./hakurei":2,"./scene/loading":17,"./scene/stg":18}],2:[function(require,module,exports){
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
		sprite: require("./object/sprite"),
		pool_manager: require("./object/pool_manager"),
	},
	asset_loader: {
		image: require("./asset_loader/image"),
		//sound: require("./asset_loader/sound"),
	},
};

},{"./asset_loader/image":3,"./constant":4,"./core":5,"./object/base":7,"./object/pool_manager":8,"./object/sprite":9,"./scene/base":10,"./util":11}],7:[function(require,module,exports){
'use strict';

var util = require('../util');

var id = 0;

var ObjectBase = function(scene) {
	this.scene = scene;
	this.core = scene.core;
	this.id = ++id;

	this.frame_count = 0;

	this.x = 0; // local center x
	this.y = 0; // local center y

	this.velocity = {magnitude:0, theta:0};
};

ObjectBase.prototype.init = function(){
	this.frame_count = 0;

	this.x = 0;
	this.y = 0;
};

ObjectBase.prototype.beforeDraw = function(){
	this.frame_count++;

	this.move();
};

ObjectBase.prototype.draw = function(){
};

ObjectBase.prototype.afterDraw = function(){
};

ObjectBase.prototype.move = function() {
	var x = util.calcMoveXByVelocity(this.velocity);
	var y = util.calcMoveYByVelocity(this.velocity);

	this.x += x;
	this.y += y;
};
ObjectBase.prototype.onCollision = function(){
};

ObjectBase.prototype.width = function() {
	return 0;
};
ObjectBase.prototype.height = function() {
	return 0;
};
ObjectBase.prototype.globalCenterX = function() {
	return this.scene.x + this.x;
};
ObjectBase.prototype.globalCenterY = function() {
	return this.scene.y + this.y;
};
ObjectBase.prototype.globalLeftX = function() {
	return this.scene.x + this.x - this.width()/2;
};
ObjectBase.prototype.globalRightX = function() {
	return this.scene.x + this.x + this.width()/2;
};
ObjectBase.prototype.globalUpY = function() {
	return this.scene.x + this.y - this.height()/2;
};
ObjectBase.prototype.globalDownY = function() {
	return this.scene.x + this.y + this.height()/2;
};

ObjectBase.prototype.collisionWidth = function() {
	return 0;
};
ObjectBase.prototype.collisionHeight = function() {
	return 0;
};

ObjectBase.prototype.checkCollisionWithObject = function(obj1) {
	var obj2 = this;
	if(obj1.checkCollision(obj2)) {
		obj1.onCollision(obj2);
		obj2.onCollision(obj1);
		return true;
	}

	return false;
};
ObjectBase.prototype.checkCollision = function(obj) {
	if(Math.abs(this.x - obj.x) < this.collisionWidth()/2 + obj.collisionWidth()/2 &&
		Math.abs(this.y - obj.y) < this.collisionHeight()/2 + obj.collisionHeight()/2) {
		return true;
	}

	return false;
};

ObjectBase.prototype.getCollisionLeftX = function() {
	return this.x - this.collisionWidth() / 2;
};

ObjectBase.prototype.getCollisionUpY = function() {
	return this.y - this.collisionHeight() / 2;
};











ObjectBase.prototype.setVelocity = function(velocity) {
	this.velocity = velocity;
};
module.exports = ObjectBase;


},{"../util":11}],8:[function(require,module,exports){
'use strict';

// TODO: add pooling logic
// TODO: split manager class and pool manager class
var base_object = require('./base');
var util = require('../util');

var PoolManager = function(scene, Class) {
	base_object.apply(this, arguments);

	this.Class = Class;
	this.objects = {};
};
util.inherit(PoolManager, base_object);

PoolManager.prototype.init = function() {
	base_object.prototype.init.apply(this, arguments);

	this.objects = {};
};

PoolManager.prototype.beforeDraw = function(){
	base_object.prototype.beforeDraw.apply(this, arguments);

	for(var id in this.objects) {
		this.objects[id].beforeDraw();
	}
};

PoolManager.prototype.draw = function(){
	base_object.prototype.draw.apply(this, arguments);
	for(var id in this.objects) {
		this.objects[id].draw();
	}
};

PoolManager.prototype.afterDraw = function(){
	base_object.prototype.afterDraw.apply(this, arguments);
	for(var id in this.objects) {
		this.objects[id].afterDraw();
	}
};

PoolManager.prototype.create = function() {
	var object = new this.Class(this.scene);
	object.init.apply(object, arguments);

	this.objects[object.id] = object;

	return object;
};
PoolManager.prototype.remove = function(id) {
	delete this.objects[id];
};

PoolManager.prototype.checkCollisionWithObject = function(obj1) {
	for(var id in this.objects) {
		var obj2 = this.objects[id];
		if(obj1.checkCollision(obj2)) {
			obj1.onCollision(obj2);
			obj2.onCollision(obj1);
		}
	}
};

PoolManager.prototype.checkCollisionWithManager = function(manager) {
	for(var obj1_id in this.objects) {
		for(var obj2_id in manager.objects) {
			if(this.objects[obj1_id].checkCollision(manager.objects[obj2_id])) {
				var obj1 = this.objects[obj1_id];
				var obj2 = manager.objects[obj2_id];

				obj1.onCollision(obj2);
				obj2.onCollision(obj1);

				// do not check died object twice
				if (!this.objects[obj1_id]) {
					break;
				}
			}
		}
	}
};

module.exports = PoolManager;

},{"../util":11,"./base":7}],9:[function(require,module,exports){
'use strict';
var base_object = require('./base');
var util = require('../util');

var Sprite = function(scene) {
	base_object.apply(this, arguments);

	this.current_sprite_index = 0;
};
util.inherit(Sprite, base_object);

Sprite.prototype.init = function(){
	base_object.prototype.init.apply(this, arguments);

	this.current_sprite_index = 0;
};

Sprite.prototype.beforeDraw = function(){
	base_object.prototype.beforeDraw.apply(this, arguments);

	// animation sprite
	if(this.frame_count % this.spriteAnimationSpan() === 0) {
		this.current_sprite_index++;
		if(this.current_sprite_index >= this.spriteIndices().length) {
			this.current_sprite_index = 0;
		}
	}
};
Sprite.prototype.draw = function(){
	base_object.prototype.draw.apply(this, arguments);

	var image = this.core.image_loader.getImage(this.spriteName());

	var ctx = this.core.ctx;

	ctx.save();

	// set position
	ctx.translate(this.globalCenterX(), this.globalCenterY());

	// rotate
	var rotate = util.thetaToRadian(this.velocity.theta + this.rotateAdjust());
	ctx.rotate(rotate);

	var sprite_width  = this.spriteWidth();
	var sprite_height = this.spriteHeight();
	if(!sprite_width)  sprite_width = image.width;
	if(!sprite_height) sprite_height = image.height;

	var width  = sprite_width * this.scale();
	var height = sprite_height * this.scale();

	ctx.drawImage(image,
		// sprite position
		sprite_width * this.spriteIndexX(), sprite_height * this.spriteIndexY(),
		// sprite size to get
		sprite_width,                       sprite_height,
		// adjust left x, up y because of x and y indicate sprite center.
		-width/2,                           -height/2,
		// sprite size to show
		width,                              height
	);
	ctx.restore();
};

Sprite.prototype.spriteName = function(){
	throw new Error("spriteName method must be overridden.");
};
Sprite.prototype.spriteIndexX = function(){
	return this.spriteIndices()[this.current_sprite_index].x;
};
Sprite.prototype.spriteIndexY = function(){
	return this.spriteIndices()[this.current_sprite_index].y;
};
Sprite.prototype.spriteAnimationSpan = function(){
	return 0;
};
Sprite.prototype.spriteIndices = function(){
	return [{x: 0, y: 0}];
};
Sprite.prototype.spriteWidth = function(){
	return 0;
};
Sprite.prototype.spriteHeight = function(){
	return 0;
};
Sprite.prototype.rotateAdjust = function(){
	return 0;
};
Sprite.prototype.scale = function(){
	return 1;
};


module.exports = Sprite;

},{"../util":11,"./base":7}],10:[function(require,module,exports){
'use strict';

var SceneBase = function(core) {
	this.core = core;
	this.width = core.width;
	this.height = core.height;

	this.x = 0;
	this.y = 0;

	this.frame_count = 0;

	this.objects = [];
};

SceneBase.prototype.init = function(){
	this.x = 0;
	this.y = 0;

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


},{}],11:[function(require,module,exports){
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
	calcMoveXByVelocity: function(velocity) {
		return velocity.magnitude * Math.cos(Util.thetaToRadian(velocity.theta));
	},
	calcMoveYByVelocity: function(velocity) {
		return velocity.magnitude * Math.sin(Util.thetaToRadian(velocity.theta));
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

},{}],12:[function(require,module,exports){
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
	return this.frame_count % 50 === 0;
};
EnemyAppear.prototype.create = function() {
	var magnitude = Math.floor(Math.random() * 5 + 1);
	var hp = Math.floor(Math.random() *5);
	for (var i = 0; i < 3; i++) {
		var x = Math.floor(Math.random() * this.chara.x + 100);
		var y = Math.floor(Math.random() * this.chara.y + 100);
		this.enemies.create(x, y, magnitude, hp);
	}
};
module.exports = EnemyAppear;

},{}],13:[function(require,module,exports){
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

},{"./game":1}],14:[function(require,module,exports){
'use strict';
var sprite = require('../hakurei').object.sprite;
var util = require('../hakurei').util;

var CONSTANT = require('../hakurei').constant;


var SHOT_SPAN = 6;

var Chara = function(scene) {
	sprite.apply(this, arguments);

	this.velocity = {theta: 0, magnitude: 10};
};
util.inherit(Chara, sprite);

Chara.prototype.init = function(){
	sprite.prototype.init.apply(this, arguments);

	this.x = this.scene.width/2;
	this.y = this.scene.height/2;
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
	sprite.prototype.beforeDraw.apply(this, arguments);

	// decide theta to move
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

	// shot automatically
	if (this.frame_count % SHOT_SPAN === 0) {
		var span = 15;

		// shot speed
		var magnitude = 15;

		var theta = this.velocity.theta;
		this.scene.shots.create(this.x, this.y, magnitude, theta);
		this.scene.shots.create(this.x, this.y, magnitude, theta).moveByVelocity({magnitude: span, theta: theta + 90});
		this.scene.shots.create(this.x, this.y, magnitude, theta).moveByVelocity({magnitude: span, theta: theta - 90});
	}
};
Chara.prototype.move = function() {
	// chara moves only pressed Z
	if(!this.core.isKeyDown(CONSTANT.BUTTON_Z)) return;

	sprite.prototype.move.apply(this, arguments);
};

Chara.prototype.onCollision = function(){
	this.die();
};

Chara.prototype.die = function(){
	console.log("die!");
};



Chara.prototype.spriteName = function(){
	return "chara";
};

Chara.prototype.spriteIndices = function(){
	return [{x: 4, y: 0}, {x: 5, y: 0}];
};
Chara.prototype.spriteAnimationSpan = function(){
	return 6;
};
Chara.prototype.spriteWidth = function(){
	return 80;
};
Chara.prototype.spriteHeight = function(){
	return 96;
};

module.exports = Chara;

},{"../hakurei":2}],15:[function(require,module,exports){
'use strict';
var base_object = require('../hakurei').object.base;
var util = require('../hakurei').util;
var Shot  = require('../object/shot');

var Enemy = function(scene) {
	base_object.apply(this, arguments);
};
util.inherit(Enemy, base_object);
Enemy.prototype.init = function(x, y, magnitude, hp) {
	base_object.prototype.init.apply(this, arguments);

	// hp
	this.hp = hp;
	// color
	var COLORS = ["BCB6FF","B8E1FF","94FBAB","82ABA1"];
	var color_index = Math.floor(Math.random() * COLORS.length);
	this.color = COLORS[color_index];

	// symbol type
	this.type = Math.floor(Math.random() * 3); // 0: box, 1: triangle, 2: circle
	this.x = x;
	this.y = y;
	this.setVelocity({magnitude: magnitude, theta: 0});

	// set theta
	this.aimToChara();
};
Enemy.prototype.beforeDraw = function() {
	base_object.prototype.beforeDraw.apply(this, arguments);

	// set theta
	if (this.frame_count % 10 === 0) {
		this.aimToChara();
	}
};
Enemy.prototype.draw = function() {
	base_object.prototype.draw.apply(this, arguments);

	switch (this.type) {
		case 0:
			this.drawBox();
			break;
		case 1:
			this.drawTriangle();
			break;
		case 2:
			this.drawCircle();
			break;
		default:
			throw new Error("unknown enemy type");
	}
};
Enemy.prototype.drawBox = function() {
	var ctx = this.core.ctx;

	var BAR_SIZE = 20;
	ctx.save();
	ctx.fillStyle = util.hexToRGBString(this.color);
	ctx.translate(this.globalCenterX(), this.globalCenterY());
	ctx.fillRect(0, 0, BAR_SIZE, BAR_SIZE);
	ctx.restore();
};
Enemy.prototype.drawTriangle = function() {
	var ctx = this.core.ctx;

	ctx.save();
	ctx.fillStyle = util.hexToRGBString(this.color);
	ctx.translate(this.globalCenterX(), this.globalCenterY());
	ctx.beginPath();
	ctx.moveTo(75,50);
	ctx.lineTo(100,75);
	ctx.lineTo(100,25);
	ctx.fill();
	ctx.restore();
};
Enemy.prototype.drawCircle = function() {
	var ctx = this.core.ctx;

	var RADIUS = 20;
	ctx.save();
	ctx.fillStyle = util.hexToRGBString(this.color);
	ctx.beginPath();
	ctx.arc(this.globalCenterX(), this.globalCenterY(), RADIUS, 0, Math.PI*2, true);
	ctx.fill();
	ctx.restore();
};


Enemy.prototype.onCollision = function(obj) {
	if(!(obj instanceof Shot)) { return; }

	// reduce HP
	this.hp--;

	// die
	if(this.hp <= 0) {
		this.die();
	}
};

Enemy.prototype.collisionWidth = function(){
	return 20;
};
Enemy.prototype.collisionHeight = function(){
	return 20;
};
Enemy.prototype.die = function() {
	// remove me
	this.scene.enemies.remove(this.id);

	// SE
	//this.game.playSound('enemy_vanish');

	// add score
	this.scene.score += 100;

	// create effect
	//this.stage.effect_manager.create(this.x, this.y);
};

Enemy.prototype.aimToChara = function() {
	var character = this.scene.chara;

	var ax = character.x - this.x;
	var ay = character.y - this.y;

	this.velocity.theta = util.radianToTheta(Math.atan2(ay, ax));
};






module.exports = Enemy;

},{"../hakurei":2,"../object/shot":16}],16:[function(require,module,exports){
'use strict';
var sprite = require('../hakurei').object.sprite;
var util = require('../hakurei').util;


var Shot = function(scene) {
	sprite.apply(this, arguments);
};
util.inherit(Shot, sprite);

Shot.prototype.init = function(x, y, magnitude, theta) {
	sprite.prototype.init.apply(this, arguments);

	this.x = x;
	this.y = y;
	this.setVelocity({magnitude: magnitude, theta: theta});
};
Shot.prototype.beforeDraw = function( ) {
	sprite.prototype.beforeDraw.apply(this, arguments);

	if(this.isOutOfStage()) {
		this.scene.shots.remove(this.id);
	}
};
Shot.prototype.isOutOfStage = function( ) {
	if(this.x < 0 ||
	   this.y < 0 ||
	   this.x > this.scene.width  ||
	   this.y > this.scene.height
	  ) {
		return true;
	}

	return false;
};




Shot.prototype.moveByVelocity = function(velocity){
	var x = util.calcMoveXByVelocity(velocity);
	var y = util.calcMoveYByVelocity(velocity);

	this.x += x;
	this.y += y;
};
Shot.prototype.spriteName = function(){
	return "shot";
};
Shot.prototype.spriteIndices = function(){
	return [{x: 5, y: 13}];
};
Shot.prototype.spriteWidth = function(){
	return 18;
};
Shot.prototype.spriteHeight = function(){
	return 16;
};
Shot.prototype.rotateAdjust = function(){
	return 90;
};

Shot.prototype.collisionWidth = function(){
	return 18;
};
Shot.prototype.collisionHeight = function(){
	return 18;
};
Shot.prototype.onCollision = function(obj) {
	this.scene.shots.remove(this.id);
};







module.exports = Shot;

},{"../hakurei":2}],17:[function(require,module,exports){
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
	this.core.image_loader.loadImage("shot", "./image/shot.png");
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

},{"../hakurei":2}],18:[function(require,module,exports){
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

	this.score = 0;

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

	this.score = 0;

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
	this.enemies.checkCollisionWithObject(this.chara);
};

SceneStg.prototype.draw = function(){
	var ctx = this.core.ctx;

	ctx.save();
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
	ctx.restore();

	// draw objects
	base_scene.prototype.draw.apply(this, arguments);

	// draw score
	ctx.save();
	ctx.fillStyle = 'rgb( 6, 40, 255 )';
	ctx.textAlign = 'left';
	ctx.font = "16px Arial";
	ctx.fillText("Score: " + this.score, 30, 30);
	ctx.restore();
};

module.exports = SceneStg;

},{"../hakurei":2,"../logic/enemy_appear":12,"../object/chara":14,"../object/enemy":15,"../object/shot":16}]},{},[13]);
