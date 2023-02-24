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
	addEdge(edge) {
		this.edges.push(edge);
		return edge;
	}
	createEdge(p1, p2) {
		if(!this.points.includes(p1)) this.addPoint(p1);
		if(!this.points.includes(p2)) this.addPoint(p2);
		return this.addEdge(new Edge(p1, p2));
	}
	render(renderer) {
		for(var i = 0; i < this.edges.length; i++) {
			renderer.DrawLine(this.edges[i].p1.x, this.edges[i].p1.y, this.edges[i].p2.x, this.edges[i].p2.y);
		}
		for(var i = 0; i < this.points.length; i++) {
			renderer.PaintCircle(this.points[i].x, this.points[i].y, 3, "black");
		}
	}
}
class Puppet extends Mesh {
	constructor(x, y) {
		super();

		this.torso = this.createEdge(new Point(x, y), new Point(x, y + 100));

		this.leftUpperArm = this.createEdge(this.torso.p1, this.torso.p1.copy().translate(-50, 50));
		this.leftLowerArm = this.createEdge(this.leftUpperArm.p2, this.leftUpperArm.p2.copy().translate(-50, -50));

		this.rightUpperArm = this.createEdge(this.torso.p1, this.torso.p1.copy().translate(50, 50));
		this.rightLowerArm = this.createEdge(this.rightUpperArm.p2, this.rightUpperArm.p2.copy().translate(50, -50));

		this.leftUpperLeg = this.createEdge(this.torso.p2, this.torso.p2.copy().translate(-50, 50));
		this.leftLowerLeg = this.createEdge(this.leftUpperLeg.p2, this.leftUpperLeg.p2.copy().translate(-50, 50));

		this.rightUpperLeg = this.createEdge(this.torso.p2, this.torso.p2.copy().translate(50, 50));
		this.rightLowerLeg = this.createEdge(this.rightUpperLeg.p2, this.rightUpperLeg.p2.copy().translate(50, 50));
	}
	rotateLeftShoulder(theta) {
		this.leftLowerArm.rotate(this.leftUpperArm.p1, theta);
		this.leftUpperArm.rotate(this.leftUpperArm.p1, theta);
	}
}
class App2 extends QuickCanvas {
	constructor(windowWidth, windowHeight, speed) {
		super(windowWidth, windowHeight, speed);

		this.fencer = new Puppet(50, -50);
		
	}
	Update(dt) {
	
		this.fencer.rotateLeftShoulder(dt / 16);

	}
	Render() {
		this.Clear();
		this.DrawAxes();

		this.fencer.render(this);
		
		this.PaintRectangle(this.cursor.x - 5, this.cursor.y - 5, 10, 10, "red");
	}
}	
var APP2 = new App2(600, 400, 60);
document.body.appendChild(APP2.c);
APP2.Start();