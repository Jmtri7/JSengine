class Game extends CanvasEngine {
	constructor(windowWidth, windowHeight, speed) {
		super(windowWidth, windowHeight, speed);
	}
	Update(dt) {
		
	}
	Render() {
		this.Clear();
		this.DrawAxes();

		

		this.PaintRectangle(this.cursor.x - 5, this.cursor.y - 5, 10, 10, "red");
		
	}
}