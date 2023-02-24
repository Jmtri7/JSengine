class Game extends CanvasEngine {
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
		//this.DrawAxes();
		this.PaintRectangle(this.cursor.x - 5, this.cursor.y - 5, 10, 10, "red");

		this.PaintPath(this.vertices, "red");
		
	}
	DrawEdge(edge) {
		this.DrawLine(edge.p1.x, edge.p1.y, edge.p2.x, edge.p2.y);
	}
}
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