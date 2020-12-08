class Game {
	constructor() {
		this.moveUp = false;
	}

	Render(renderer) {
		renderer.Clear();

		if(this.moveUp) {
			renderer.PaintRectangle(0, 0, 10, 10);
		}
	}

	Update(input) {
		// player controller
		this.moveUp = input.IsKey(87);
	}
}