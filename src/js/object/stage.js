'use strict';
var base_particle = require('./particle/base');
var util = require('../hakurei').util;

var Proton = require('../proton');

var Stage = function(scene) {
	base_particle.apply(this, arguments);
	this.width  = this.canvas.width = 1003;
	this.height = this.canvas.height = 610;

};
util.inherit(Stage, base_particle);

Stage.prototype.createProton = function(){
	var canvas = this.canvas;
	var colors = ['#529B88', '#CDD180', '#FFFA32', '#FB6255', '#FB4A53', '#FF4E50', '#F9D423'];

	var proton = new Proton();
	var emitter = new Proton.Emitter();
	emitter.rate = new Proton.Rate(new Proton.Span(3, 6), new Proton.Span(0.05, 0.2));
	emitter.addInitialize(new Proton.Mass(1));
	emitter.addInitialize(new Proton.Radius(20, 200));
	emitter.addInitialize(new Proton.Life(2, 4));
	emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, canvas.width, canvas.height)));
	emitter.addBehaviour(new Proton.Alpha(0, 1, Infinity, Proton.easeOutCubic));
	emitter.addBehaviour(new Proton.Scale(1, 0, Infinity, Proton.easeOutCubic));
	emitter.addBehaviour(new Proton.Color(colors, 'random'));

	emitter.emit();
	proton.addEmitter(emitter);

	var renderer = new Proton.Renderer('canvas', proton, canvas);
	renderer.start();

	return proton;
};



module.exports = Stage;
