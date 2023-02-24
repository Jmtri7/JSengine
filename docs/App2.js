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
class Waver extends Edge {
	constructor(x, y, r, theta, waveMax) {
		super(new Point(x, y), new Point(x + r * Math.cos(theta), y + r * Math.sin(theta)));

		this.waveAngle = 0;
		this.waveMax = waveMax;

		this.direction = 1;

	}
	getAngle() {
		return this.p2.angleFrom(this.p1);
	}
	update(dt) {

		let dTheta = dt / 16;

		this.waveAngle += this.direction * dTheta;

		this.rotate(this.p1, this.direction * dTheta);

		if(this.waveAngle > this.waveMax) {
			this.direction *= -1;
			let excess = this.waveAngle - this.waveMax;
			this.waveAngle -= 2 * excess;
			this.rotate(this.p1, this.direction * 2 * excess);
		}
		if(this.waveAngle < 0) {
			this.direction *= -1;
			let excess = -this.waveAngle;
			this.waveAngle += 2 * excess;
			this.rotate(this.p1, this.direction * 2 * excess);
		}
		
	}
	render(renderer) {
		renderer.DrawLine(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
	}
}
class App2 extends QuickCanvas {
	constructor(windowWidth, windowHeight, speed) {
		super(windowWidth, windowHeight, speed);

		this.mesh1 = new Mesh();
		let p1 = this.mesh1.createPoint(100, 100);
		let p2 = this.mesh1.addPoint(p1.copy().translate(50, 0));


		this.c1 = new Waver(0, 0, 100, 0, 90);
	}
	Update(dt) {
		this.c1.update(dt);
	}
	Render() {
		this.Clear();
		this.DrawAxes();

		this.mesh1.render(this);

		this.c1.render(this);
		
		this.PaintRectangle(this.cursor.x - 5, this.cursor.y - 5, 10, 10, "red");
	}
}	
var APP2 = new App2(600, 400, 60);
document.body.appendChild(APP2.c);
APP2.Start();