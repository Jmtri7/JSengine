class Mesh extends Point {
	constructor(x, y, color, vectors=[]) {
		super(x, y);
		this.color = color;
		this.vectors = vectors;
	}
	addVector(vector) {
		this.vectors.push(vector);
		return vector;
	}
	createVector(r, a) {
		return this.addVector(new Vector(r, a));
	}
	render(renderer) {
		let x = this.x +  this.vectors[0].x + renderer.origin.x;
		let y = this.y +  this.vectors[0].y + renderer.origin.y;

		renderer.ctx.beginPath();
		renderer.ctx.moveTo(x, y);

		for(var i = 1; i < this.vectors.length; i++) {
			x = this.x +  this.vectors[i].x + renderer.origin.x;
			y = this.y +  this.vectors[i].y + renderer.origin.y;
			renderer.ctx.lineTo(x, y);
		}

		renderer.ctx.closePath();
		renderer.ctx.fillStyle = this.color;
		renderer.ctx.fill(); 
	}
	spin(dA) {
		for(var i = 0; i < this.vectors.length; i++) {
			this.vectors[i].a += dA;
		}
	}
	revolve(center, dA) {
		this.spin(dA);
		this.rotate(center, dA);
	}
}
class App2 extends QuickCanvas {
	constructor(windowWidth, windowHeight, speed) {
		super(windowWidth, windowHeight, speed);

		this.mesh = new Mesh(100, 100, "red");
		this.mesh.createVector(50, 45);
		this.mesh.createVector(50, 45 + 90);
		this.mesh.createVector(50, 45 + 180);
		this.mesh.createVector(50, 45 + 270);
	}
	Update(dt) {

		this.mesh.revolve(new Point(0, 0), dt / 16);
		this.mesh.spin(dt / 16);

	}
	Render() {
		this.Clear();
		this.DrawAxes();

		this.mesh.render(this);
		
		this.PaintRectangle(this.cursor.x - 5, this.cursor.y - 5, 10, 10, "red");
	}
}	
var APP2 = new App2(600, 400, 60);
document.body.appendChild(APP2.c);
APP2.Start();