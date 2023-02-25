class TestApp extends QuickCanvas {
	constructor(windowWidth, windowHeight, speed) {
		super(windowWidth, windowHeight, speed);

		let center = new Point(windowWidth / 2, windowHeight / 2);

		this.box1 = Graphic.box(100, 50, "red", center.copy(), new Vector(1, 45));

	}
	Update(dt) {

		this.box1.spin(dt / 16);

	}
	Render() {
		this.Clear();

		this.box1.render(this);
		
		this.PaintRectangle(this.cursor.x - 5, this.cursor.y - 5, 10, 10, "red");
	}
}
var testApp = new TestApp(600, 400, 60);
document.body.appendChild(testApp.c);
testApp.Start();
