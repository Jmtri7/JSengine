class TestApp extends QuickCanvas {
	constructor(windowWidth, windowHeight, speed) {
		super(windowWidth, windowHeight, speed);

		let center = new Point(windowWidth / 2, windowHeight / 2);

		this.box1 = Graphic.box(50, 100, "blue", center.copy().translate(-100, 50));
		this.box2 = Graphic.box(10, 50, "blue", center.copy().translate(-120, 50), new Vector(1, -45));

	}
	Update(dt) {


	}
	Render() {
		this.Clear();

		this.box1.render(this);
		this.box2.render(this);
		
		this.PaintRectangle(this.cursor.x - 5, this.cursor.y - 5, 10, 10, "red");
	}
}
var testApp = new TestApp(600, 400, 60);
document.body.appendChild(testApp.c);
testApp.Start();
