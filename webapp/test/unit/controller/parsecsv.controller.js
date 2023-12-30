/*global QUnit*/

sap.ui.define([
	"parsecsv/controller/parsecsv.controller"
], function (Controller) {
	"use strict";

	QUnit.module("parsecsv Controller");

	QUnit.test("I should test the parsecsv controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
