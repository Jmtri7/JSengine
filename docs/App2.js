class Mesh {
	constructor() {
		this.points = [];
		this.edges = [];
	}
	addPoint(point) {
		this.points.push(point);
		return point;
	}
	createPoint(x, y) {
		return this.addPoint(new Point(x, y));
	}
	createEdge(p1, p2) {
		this.edges.push(new Edge());
	}
	render(renderer) {
		for(var i = 0; i < this.points.length; i++) {
			renderer.PaintCircle(this.points[i].x, this.points[i].y, 3, "black");
		}
	}
}
class App2 extends QuickCanvas {
	constructor(windowWidth, windowHeight, speed) {
		super(windowWidth, windowHeight, speed);

		this.mesh1 = new Mesh();
		let p1 = this.mesh1.createPoint(100, 100);
		let p2 = this.mesh1.addPoint(p1.copy().translate(50, 0));
		
	}
	Update(dt) {
		
	}
	Render() {
		this.Clear();
		this.DrawAxes();

		this.mesh1.render(this);
		
		this.PaintRectangle(this.cursor.x - 5, this.cursor.y - 5, 10, 10, "red");
	}
}	
var APP2 = new App2(600, 400, 60);
document.body.appendChild(APP2.c);
APP2.Start();