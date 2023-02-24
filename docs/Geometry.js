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