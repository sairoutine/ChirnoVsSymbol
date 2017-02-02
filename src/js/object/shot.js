'use strict';
var base_object = require('../hakurei').object.base;
var util = require('../hakurei').util;

var Shot = function(scene) {
	base_object.apply(this, arguments);
};
util.inherit(Shot, base_object);

module.exports = Shot;
