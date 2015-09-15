describe("Remove", function() {
	var Signal = require('../Signal');
	var signal;

	beforeEach(function() {
		signal = new Signal();
	});

	describe("Signal.remove()", function() {
		it("should remove binding", function() {
			var f1 = function() {};
			var f2 = function() {};
			signal.add(f1);
			signal.add(f2);
			signal.remove(f1);
			expect(signal.bindings.length).toBe(1);
			signal.remove(f2);
			expect(signal.bindings.length).toBe(0);
		});

		it("should not fail if called twice in a row", function() {
			var f1 = function() {};
			signal.add(f1);
			signal.remove(f1);
			expect(signal.bindings.length).toBe(0);
			signal.remove(f1);
			expect(signal.bindings.length).toBe(0);
		});

		it("should not remove binding with same callback", function() {
			var f1 = function() {};
			var scope = {};
			signal.add(f1);
			signal.add(f1, scope);
			signal.remove(f1);
			expect(signal.bindings.length).toBe(1);
			signal.remove(f1, scope);
			expect(signal.bindings.length).toBe(0);
		});
	});

	describe("Signal.remove()", function() {
		it("should remove all bindings", function() {
			var f1 = function() {};
			var f2 = function() {};
			var scope = {};
			signal.add(f1);
			signal.add(f2);
			signal.add(f1, scope);
			signal.removeAll();
			expect(signal.bindings.length).toBe(0);
		});
	});
});
