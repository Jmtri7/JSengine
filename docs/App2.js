class App2 extends QuickCanvas {
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
var APP2 = new App2(600, 400, 60);
document.body.appendChild(APP2.c);
APP2.Start();