describe("Dispatch", function() {
	var Signal = require('../Signal');
	var signal;

	beforeEach(function() {
		signal = new Signal();
	});

	describe("Signal.add()", function() {
		it("should execute callbacks (FIFO)", function() {
			var str = "";
			var f1 = function() { str += "a"; };
			var f2 = function() { str += "b"; };
			signal.add(f1);
			signal.add(f2);
			signal.dispatch();
			expect(str).toBe("ab");
		});

		it("should allow multiple dispatches", function() {
			var n = 0;
			var f1 = function() { n++; };
			signal.add(f1);
			signal.dispatch();
			expect(n).toBe(1);
			signal.dispatch();
			expect(n).toBe(2);
			signal.dispatch();
			expect(n).toBe(3);
		});

		it("should respect callback context", function() {
			var scope1 = {
				n: 0,
				inc: function() { this.n++; }
			};
			var scope2 = {
				n: 0,
				inc: function() { this.n++; }
			};

			var f1 = function() { this.inc(); };
			var f2 = function() { this.inc(); };

			signal.add(f1, scope1);
			signal.add(f2, scope2);

			signal.dispatch();
			expect(scope1.n).toBe(1);
			expect(scope2.n).toBe(1);

			signal.dispatch();
			expect(scope1.n).toBe(2);
			expect(scope2.n).toBe(2);
		});
	});

	describe("Signal.addOnce()", function() {
		it("should execute callback only once even if multiple dispatches", function() {
			var n = 0;
			var k = 0;
			var f1 = function() { n++; };
			var f2 = function() { k++; };

			signal.addOnce(f1);
			signal.addOnce(f2);
			signal.dispatch();
			signal.dispatch();

			expect(n).toBe(1);
			expect(k).toBe(1);
		});

		it("should respect callback context", function() {
			var scope1 = {
				n: 0,
				inc: function() { this.n++; }
			};
			var scope2 = {
				n: 0,
				inc: function() { this.n++; }
			};

			var f1 = function() { this.inc(); };
			var f2 = function() { this.inc(); };

			signal.addOnce(f1, scope1);
			signal.addOnce(f2, scope2);

			signal.dispatch();
			expect(scope1.n).toBe(1);
			expect(scope2.n).toBe(1);

			signal.dispatch();
			expect(scope1.n).toBe(1);
			expect(scope2.n).toBe(1);
		});
	});

	describe("Signal.remove()", function() {
		it("should not trigger callback if it was removed", function() {
			var n = 0;
			var f1 = function() { n++; signal.remove(f1); };

			signal.add(f1);
			signal.remove(f1);
			signal.dispatch();
			expect(n).toBe(0);
		});
	});

	describe("arguments", function() {
		describe("add", function() {
			it("should propagate single argument", function() {
				var n = 0;
				var f1 = function(param) { n += param;  };
				var f2 = function(param) { n += param;  };

				signal.add(f1);
				signal.add(f2);

				signal.dispatch(1);
				expect(n).toBe(2);
			});

			it("should propagate n arguments", function() {
				var n = 0;
				var args;
				signal.add(function() {
					args = Array.prototype.slice.call(arguments);
				});

				signal.dispatch(1, 2, 3, 4, 5);
				expect(args).toEqual([1, 2, 3, 4, 5]);

				signal.dispatch(9, 8);
				expect(args).toEqual([9, 8]);
			});
		});

		describe("addOnce", function() {
			it("should propagate single argument", function() {
				var n = 0;
				var f1 = function(param) { n += param;  };
				var f2 = function(param) { n += param;  };

				signal.addOnce(f1);
				signal.addOnce(f2);

				signal.dispatch(1);
				expect(n).toBe(2);

				signal.dispatch(20);
				expect(n).toBe(2);
			});

			it("should propagate n arguments", function() {
				var n = 0;
				var args;
				signal.addOnce(function() {
					args = Array.prototype.slice.call(arguments);
				});

				signal.dispatch(1, 2, 3, 4, 5);
				expect(args).toEqual([1, 2, 3, 4, 5]);

				signal.dispatch(9, 8);
				expect(args).toEqual([1, 2, 3, 4, 5]);
			});
		});
	});
});
