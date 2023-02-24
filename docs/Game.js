class Game extends CanvasEngine {
	constructor(windowWidth, windowHeight, speed) {
		super(windowWidth, windowHeight, speed);

		this.p1 = new Point(0, 0);
		this.p2 = new Point(100, 0);
		this.p3 = new Point(100, 50);

		this.e1 = new Edge(this.p1, this.p2);
		this.e2 = new Edge(this.p2, this.p3);
	}
	Update(dt) {
		this.p2.rotate(this.p1, dt / 16);
		this.p3.rotate(this.p1, dt / 16);
		this.p3.rotate(this.p2, dt / 16 * 2);
	}
	Render() {
		this.Clear();
		this.DrawAxes();
		this.PaintRectangle(this.cursor.x - 5, this.cursor.y - 5, 10, 10, "red");

		this.DrawEdge(this.e1);
		this.DrawEdge(this.e2);
		
	}
	DrawEdge(edge) {
		this.DrawLine(edge.p1.x, edge.p1.y, edge.p2.x, edge.p2.y);
	}
}