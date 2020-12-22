class Game {
	constructor(windowWidth, windowHeight) {
		this.canvas = new CanvasRenderer(windowWidth, windowHeight);
		this.canvas.SetOrigin(windowWidth / 2, windowHeight / 2);
		this.input = new Input(this.canvas.c);

		this.testVector = new Matrix([
			[50],
			[50],
			[0]
		]);

		this.testVector.Log();
	}

	Update(dt) {
		var theta = dt / 180 * Math.PI * 360 / 1000;
		this.testVector = this.testVector.Rotate(0, 0, - theta);
	}

	Render() {
		this.canvas.Clear();

		this.canvas.PaintRectangle(this.input.cursorX - this.canvas.originX , this.input.cursorY - this.canvas.originY, 10, 10, "red");

		this.canvas.DrawLine(0, 0, this.testVector.At(0, 0), this.testVector.At(1, 0));

		this.canvas.DrawAxes();
	}
}