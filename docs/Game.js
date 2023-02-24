class Rig extends Edge {
	constructor(p1, p2) {
		super(p1, p2);
		this.children = [];
	}
	extrude(p3) {
		let r2 = new Rig(this.p2, p3);
		this.children.push(r2);
		return r2;
	}
	rotate(center, angle) {
		this.p1.rotate(center, angle);
		this.p2.rotate(center, angle);
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].rotateChild(center, angle);
		}
		return this;
	}
	rotateChild(center, angle) {
		this.p2.rotate(center, angle);
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].rotateChild(center, angle);
		}
	}
	render(renderer) {
		renderer.DrawEdge(this);
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].render(renderer);
		}
	}
}
class Game extends CanvasEngine {
	constructor(windowWidth, windowHeight, speed) {
		super(windowWidth, windowHeight, speed);

		this.rig = new Rig(new Point(0, 0), new Point(100, 0))
		let r1 = this.rig.extrude(new Point(100, 50))
		let r2 = this.rig.extrude(new Point(100, -50))
		let r3 = this.rig.extrude(new Point(150, 0))
	}
	Update(dt) {
		this.rig.rotate(this.rig.p1, dt / 16);
	}
	Render() {
		this.Clear();
		this.DrawAxes();
		this.PaintRectangle(this.cursor.x - 5, this.cursor.y - 5, 10, 10, "red");

		this.rig.render(this);
		
	}
	DrawEdge(edge) {
		this.DrawLine(edge.p1.x, edge.p1.y, edge.p2.x, edge.p2.y);
	}
}