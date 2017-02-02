'use strict';
var base_object = require('../hakurei').object.base;
var util = require('../hakurei').util;

var Enemy = function(scene) {
	base_object.apply(this, arguments);
};
util.inherit(Enemy, base_object);

module.exports = Enemy;
