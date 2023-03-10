class Vector {
	constructor(r, a) {
		this.r = r;
		this.a = a;
	}
	get x() {
		return this.r * Math.cos(this.a / 180 * Math.PI);
	}
	get y() {
		return this.r * Math.sin(this.a / 180 * Math.PI);
	}
	copy() {
		return new Vector(this.r, this.a);
	}
	add(that) {
		this.x = this.x + that.x;
		this.y = this.y + that.y;
	}
	static sum(v1, v2) {
		return v1.copy().add(v2);
	}
}
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	copy() {
		return new Point(this.x, this.y);
	}
	translate(dx, dy) {
		if(dy == undefined) {
			console.log("Error: dy undefined in point translate!");
			return this;
		}
		this.x += dx;
		this.y += dy;
		return this;
	}
	rotate(center, angle) {
		let dx = this.x - center.x;
		let dy = this.y - center.y;
		let r = Math.sqrt(dx * dx + dy * dy);
		let theta = this.angleFrom(center) * Math.PI / 180;
		this.x = center.x + r * Math.cos(angle / 180 * Math.PI + theta);
		this.y = center.y + r * Math.sin(angle / 180 * Math.PI + theta);
		return this;
	}
	distanceFrom(that) {
		return Math.sqrt(Math.pow(this.x - that.x, 2) + Math.pow(this.y - that.y, 2));
	}
	angleFrom(that) {
		var dx = this.x - that.x;
		var dy = this.y - that.y;
		var atan = Math.atan2(dy, dx) * 180 / Math.PI;
		if(atan < 0) atan += 360;
		return atan;
	}
	extrude(dx, dy) {
		let p2 = this.copy().translate(dx, dy);
		return new Edge(this, p2);
	}
}
class Mesh {
	constructor(origin, points=[]) {
		this.origin = origin;
		this.points = points;
	}
	addPoint(point) {
		this.points.push(point);
		return point;
	}
	createPoint(x, y) {
		return this.addPoint(new Point(x, y));
	}
	vectorize() {
		let vectors = [];
		for(var i = 0; i < this.points.length; i++) {
			vectors.push(new Vector(this.points[i].distanceFrom(this.origin), this.points[i].angleFrom(this.origin)));
		}
		return vectors;
	}
}
class Edge {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}
	intersect(that) {
		return this.p1.x <= that.p2.x
        	&& this.p2.x >= that.p1.x
        	&& this.p1.y <= that.p2.y
        	&& this.p2.y >= that.p1.y;
	}
	copy() {
		return new Edge(this.p1, this.p2);
	}
	translate(dx, dy) {
		this.p1.translate(dx, dy);
		this.p2.translate(dx, dy);
		return this;
	}
	rotate(center, angle) {
		this.p1.rotate(center, angle);
		this.p2.rotate(center, angle);
		return this;
	}
}
class Graphic {
	constructor(center, color, vectors=[]) {
		this.center = center;
		this.color = color;
		this.vectors = vectors;
	}
	translate(x, y) {
		this.center.translate(x, y);
	}
	addVector(vector) {
		this.vectors.push(vector);
		return vector;
	}
	createVector(r, a) {
		return this.addVector(new Vector(r, a));
	}
	render(renderer) {
		let x = this.center.x +  this.vectors[0].x;
		let y = this.center.y +  this.vectors[0].y;
		renderer.ctx.beginPath();
		renderer.ctx.moveTo(x, y);
		for(var i = 1; i < this.vectors.length; i++) {
			x = this.center.x +  this.vectors[i].x;
			y = this.center.y +  this.vectors[i].y;
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
		this.center.rotate(center, dA);
	}
	static fromMesh(mesh, color) {
		return new Graphic(mesh.origin, color, mesh.vectorize());
	}
	static box(length, width, color, center, normal=new Vector(1, 270)) {
		let mesh = new Mesh(center);
		mesh.addPoint(center.copy().translate(-width / 2, -length / 2));
		mesh.addPoint(center.copy().translate(width / 2, -length / 2));
		mesh.addPoint(center.copy().translate(width / 2, length / 2));
		mesh.addPoint(center.copy().translate(-width / 2, length / 2));
		let graphic = Graphic.fromMesh(mesh, color);
		graphic.spin(normal.a);
		return graphic;
	}
}