/**
 * @fileoverview Tests for no-fixed rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

var Solium = require("solium");
var wrappers = require("./utils/wrappers");
var toContract = wrappers.toContract;

var userConfig = {
	rules: {
		"security/no-fixed": "error"
	}
};

describe("[RULE] no-fixed: Rejections", function() {
	it("should reject contracts using fixed point declarations", function(done) {
		var code = toContract("function foo () { fixed a; }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		Solium.reset();

		done();
	});

	it("should reject contracts using fixed point assignments", function(done) {
		var code = toContract("function foo () { fixed a = 2.0; }");
		var errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		Solium.reset();

		done();
	});
});
