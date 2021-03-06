'use strict';

var base_scene = require('../hakurei').scene.base;
var util = require('../hakurei').util;
var SceneStg = function(core) {
	base_scene.apply(this, arguments);
};
util.inherit(SceneStg, base_scene);

SceneStg.prototype.init = function(){
	base_scene.prototype.init.apply(this, arguments);
};

SceneStg.prototype.draw = function(){
	var ctx = this.core.ctx;

	ctx.save();
	ctx.fillStyle = util.hexToRGBString("000000");
	ctx.fillRect(0, 0, this.core.width, this.core.height);

	// 横:30, 縦20
	// 0: 背景
	// 1: 緑ブロック
	// 2: 青ブロック
	// 3: 赤ブロック
	// 4: 紫ブロック
	// 5: 茶ブロック
	// 6: はしご
	// 7: プレイヤー
var stage = [
	[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,7,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,2,2,2,2,2,2,2,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,0,0,0,2,2,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0],
	[0,0,0,0,2,2,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0],
	[0,0,0,0,2,2,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0],
	[0,0,0,0,2,2,0,3,3,3,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,1,1,1,0,0],
	[0,0,0,0,2,2,0,3,3,3,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,1,1,1,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0],
	[0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

	var player = this.core.image_loader.getImage("player");
	var block = this.core.image_loader.getImage("block");
	var hashigo = this.core.image_loader.getImage("hashigo");

	var size = 24;
	for (var i = 0; i < stage.length; i++) {
		var line = stage[i];
		for (var j = 0; j < line.length; j++) {
			var type = line[j];
			if (type === 0) {
				/*
				if(j % 2 ===0) continue;
				ctx.fillStyle = 'rgb(255, 255, 255 )';
				ctx.textAlign = 'left';
				ctx.font = "9px Arial";
				ctx.fillText(j + "," + i , j * size, i * size);
				*/
			}
			else if (type === 1) {//block
				ctx.drawImage(block,
					// sprite position
					16 * 4, 0,
					// sprite size to get
					16, 16,
					j * size, i * size,
					// sprite size to show
					size, size
				);
			}
			else if (type === 2) {//block
				ctx.drawImage(block,
					// sprite position
					16 * 5, 0,
					// sprite size to get
					16, 16,
					j * size, i * size,
					// sprite size to show
					size, size
				);
			}
			else if (type === 3) {//block
				ctx.drawImage(block,
					// sprite position
					16 * 6, 0,
					// sprite size to get
					16, 16,
					j * size, i * size,
					// sprite size to show
					size, size
				);
			}
			else if (type === 4) {//block
				ctx.drawImage(block,
					// sprite position
					16 * 7, 0,
					// sprite size to get
					16, 16,
					j * size, i * size,
					// sprite size to show
					size, size
				);
			}
			else if (type === 5) {//block
				ctx.drawImage(block,
					// sprite position
					16 * 3, 0,
					// sprite size to get
					16, 16,
					j * size, i * size,
					// sprite size to show
					size, size
				);
			}
			else if (type === 6) { //hashigo
				ctx.drawImage(hashigo,
					// sprite position
					0, 0,
					// sprite size to get
					32, 16,
					j * size, i * size,
					// sprite size to show
					size, size
				);
			}
			else if (type === 7) { // player
				ctx.drawImage(player,
					// sprite position
					32 * 1, 0,
					// sprite size to get
					32, 32,
					j * size, i * size,
					// sprite size to show
					48, 48
				);
			}

		}
	}
};

module.exports = SceneStg;
