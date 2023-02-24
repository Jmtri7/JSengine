class App1 extends CanvasEngine {
	constructor(windowWidth, windowHeight, speed) {
		super(windowWidth, windowHeight, speed);

		this.center = new Point(0, 0);
		this.vertices = [];
		
		let n = 5;
		for(var i = 0; i < n; i++) {
			this.vertices.push(this.center.copy().translate(100, 0).rotate(this.center, 360 / n * i));
		}

	}
	Update(dt) {
		for(var i = 0; i < this.vertices.length; i++) {
			this.vertices[i].rotate(this.center, dt / 16);
		}
	}
	Render() {
		this.Clear();

		this.DrawAxes();
		
		this.PaintRectangle(this.cursor.x - 5, this.cursor.y - 5, 10, 10, "red");

		this.PaintPath(this.vertices, "red");
		
	}
	DrawEdge(edge) {
		this.DrawLine(edge.p1.x, edge.p1.y, edge.p2.x, edge.p2.y);
	}
}	
var APP1 = new App1(600, 400, 60);
document.body.appendChild(APP1.c);
APP1.Start();