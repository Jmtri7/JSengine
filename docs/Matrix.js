class Matrix {
	constructor(array) {
		this.m = array.length;
		this.n = array[0].length;

		this.array = array;
	}

	// Matrix Stuff

	At(m, n) {
		return this.array[m][n];
	}

	Log() {
		var output = this.m + " x " + this.n + "\n";
		for(var m = 0; m < this.m; m++) {
			for(var n = 0; n < this.n; n++) {
				output += this.At(m, n) + " ";
			}
			output += "\n";
		}
		console.log(output);
	}

	static Sum(a, b) {
		var array = [];
		for(var m = 0; m < a.m; m++) {
			var row = [];
			for(var n = 0; n < a.n; n++) {
				row.push(a.At(m, n) + b.At(m, n));
			}
			array.push(row);
		}
		return new Matrix(array);
	}

	static Difference(a, b) {
		var array = [];
		for(var m = 0; m < a.m; m++) {
			var row = [];
			for(var n = 0; n < a.n; n++) {
				row.push(a.At(m, n) - b.At(m, n));
			}
			array.push(row);
		}
		return new Matrix(array);
	}

	static ScalarProduct(a, b) {

	}

	static VectorProduct(a, b) {
		var array = [];
		for(var m1 = 0; m1 < a.m; m1++) {
			var row = [];
			for(var n2 = 0; n2 < b.n; n2++) {
				var sum = 0;
				for(var m2 = 0; m2 < b.m; m2++) {
					sum += a.At(m1, m2) * b.At(m2, n2);	
				}
				row.push(sum);
			}
			array.push(row);
		}
		return new Matrix(array);
	}

	// Vector Stuff

	Rotate(rx, ry, rz) {
		var cosRX = Math.cos(rx);
		var sinRX = Math.sin(rx);
		var RX = new Matrix([
			[1, 0, 0],
			[0, cosRX, -sinRX],
			[0, sinRX, cosRX]
		]);

		var cosRY = Math.cos(ry);
		var sinRY = Math.sin(ry);
		var RY = new Matrix([
			[cosRY, 0, sinRY],
			[0, 1, 0],
			[-sinRY, 0, cosRY]
		]);

		var cosRZ = Math.cos(rz);
		var sinRZ = Math.sin(rz);
		var RZ = new Matrix([
			[cosRZ, -sinRZ, 0],
			[sinRZ, cosRZ, 0],
			[0, 0, 1]
		]);

		return Matrix.VectorProduct(RZ, Matrix.VectorProduct(RY, Matrix.VectorProduct(RX, this)));
	}

	// Tests

	static Test3() {
		console.log("TEST 3 BEGIN");
		console.log("\n");

		var a = new Matrix([
			[1],
			[1],
			[0]
		]);

		console.log("A:");
		a.Log();
		console.log("\n");

		console.log("RX 180:");
		a.Rotate(Math.PI, 0, 0).Log();
		console.log("\n");

		console.log("RY 180:");
		a.Rotate(0, Math.PI, 0).Log();
		console.log("\n");

		console.log("RZ 180:");
		a.Rotate(0, 0, Math.PI).Log();
		console.log("\n");

		console.log("TEST 3 END");
	}

	static Test2() {

		console.log("TEST 2 BEGIN");
		console.log("\n");

		var a = new Matrix([
			[1, 2, 3],
			[4, 5, 6]
		]);

		var b = new Matrix([
			[7, 8],
			[9, 10],
			[11, 12]
		]);

		console.log("A:");
		a.Log();
		console.log("\n");

		console.log("B:");
		b.Log();
		console.log("\n");

		console.log("A X B:");
		Matrix.VectorProduct(a, b).Log();
		console.log("\n");

		console.log("TEST 2 END");
	}

	static Test1() {

		console.log("TEST 1 BEGIN");
		console.log("\n");

		var a = new Matrix([
			[1, 2, 3],
			[4, 5, 6]
		]);

		var b = new Matrix([
			[1, 2, 3],
			[4, 5, 6]
		]);

		console.log("A:");
		a.Log();
		console.log("\n");

		console.log("B:");
		b.Log();
		console.log("\n");
		
		console.log("A + B:");
		Matrix.Sum(a, b).Log();
		console.log("\n");

		console.log("A - B:");
		Matrix.Difference(a, b).Log();
		console.log("\n");

		console.log("TEST 1 END");
	}
}