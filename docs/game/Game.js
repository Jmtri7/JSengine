class Game {
	constructor(windowWidth, windowHeight) {
		this.canvas = new CanvasRenderer(windowWidth, windowHeight);
		this.canvas.SetOrigin(windowWidth / 2, windowHeight / 2);
		this.input = new Input(this.canvas.c);
	}

	Update(dt) {

	}

	Render() {
		this.canvas.Clear();

		this.canvas.PaintRectangle(this.input.cursorX - this.canvas.originX , this.input.cursorY - this.canvas.originY, 10, 10, "red");

		this.canvas.DrawAxes();
	}
}