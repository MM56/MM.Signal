describe("Add", function() {
	var Signal = require('../Signal');
	var signal;

	beforeEach(function() {
		signal = new Signal();
	});

	describe("Signal.add()", function() {
		it("should increase the number of bindings", function() {
			expect(signal.bindings.length).toBe(0);
			signal.add(function() {});
			expect(signal.bindings.length).toBe(1);
			signal.add(function() {});
			expect(signal.bindings.length).toBe(2);
		});

		it("should add same callback multiple times", function() {
			expect(signal.bindings.length).toBe(0);
			var f = function() {};
			signal.add(f);
			expect(signal.bindings.length).toBe(1);
			signal.add(f);
			expect(signal.bindings.length).toBe(2);
		});

		it("should add same callback in diff context", function() {
			expect(signal.bindings.length).toBe(0);
			var f = function() {};
			signal.add(f);
			expect(signal.bindings.length).toBe(1);
			signal.add(f, {});
			expect(signal.bindings.length).toBe(2);
		});

		it("should thow an error if callback isn't a function", function() {
			expect(function() { signal.add(); }).toThrowError("Invalid callback");
			expect(function() { signal.add(123); }).toThrowError("Invalid callback");
			expect(function() { signal.add(true); }).toThrowError("Invalid callback");
			expect(function() { signal.add({}); }).toThrowError("Invalid callback");
			expect(signal.bindings.length).toBe(0);
		});
	});

	describe("Signal.addOnce()", function() {
		it("should increase the number of bindings", function() {
			expect(signal.bindings.length).toBe(0);
			signal.addOnce(function() {});
			expect(signal.bindings.length).toBe(1);
			signal.addOnce(function() {});
			expect(signal.bindings.length).toBe(2);
		});

		it("should add same callback multiple times", function() {
			expect(signal.bindings.length).toBe(0);
			var f = function() {};
			signal.addOnce(f);
			expect(signal.bindings.length).toBe(1);
			signal.addOnce(f);
			expect(signal.bindings.length).toBe(2);
		});

		it("should add same callback in diff context", function() {
			expect(signal.bindings.length).toBe(0);
			var f = function() {};
			signal.addOnce(f);
			expect(signal.bindings.length).toBe(1);
			signal.addOnce(f, {});
			expect(signal.bindings.length).toBe(2);
		});

		it("should thow an error if callback isn't a function", function() {
			expect(function() { signal.addOnce(); }).toThrowError("Invalid callback");
			expect(function() { signal.addOnce(123); }).toThrowError("Invalid callback");
			expect(function() { signal.addOnce(true); }).toThrowError("Invalid callback");
			expect(function() { signal.addOnce({}); }).toThrowError("Invalid callback");
			expect(signal.bindings.length).toBe(0);
		});
	});
});
