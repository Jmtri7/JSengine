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
	extrudePolar(r, theta) {
		let p3 = this.p2.copy().translate(r, 0);
		p3.rotate(this.p2, theta);
		return this.extrude(p3);
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
		
		let r1 = this.rig.extrudePolar(50, 90);
		let r2 = this.rig.extrudePolar(50, 0);
		let r3 = this.rig.extrudePolar(50, -90);

		r1.extrudePolar(25, 0)
		r1.extrudePolar(25, 90)
		r1.extrudePolar(25, 180)
		r1.extrudePolar(25, 270)

		r2.extrudePolar(25, 0)
		r2.extrudePolar(25, 90)
		r2.extrudePolar(25, 180)
		r2.extrudePolar(25, 270)

		r3.extrudePolar(25, 0)
		r3.extrudePolar(25, 90)
		r3.extrudePolar(25, 180)
		r3.extrudePolar(25, 270)
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