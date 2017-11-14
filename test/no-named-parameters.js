/**
 * @fileoverview Tests for no-named-parameters rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

var Solium = require("solium");

var userConfig = {
	rules: {
		"security/no-named-parameters": "error"
	}
};

describe("[RULE] no-named-parameters: Rejections", function() {
	it("should reject contracts using named parameters but allow structs", function(done) {
		var code = `pragma solidity 0.4.17;

contract TestContract {
		struct C {
			uint d;
			uint e;
		}

		function a(uint a, uint b) {
			return [a, b];
		}

		function b() {
			return a({b: 1, a: 2});
		}

		function c() {
			return C({d: 1, e: 2});
		}
}`;

		var errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		Solium.reset();

		done();
	});
});
