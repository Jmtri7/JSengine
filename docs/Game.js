class Game {
	constructor() {
		this.moveUp = false;
	}

	Render(renderer) {
		renderer.Clear();

		renderer.DrawText(
				30, 30,
				"Renderer Test",
				30
		);

		renderer.DrawText(
				30, 60,
				"Press 'W'",
				30
		);

		if(this.moveUp) {
			renderer.DrawText(
				30, 90,
				"'W' key pressed!",
				30
			);
		}
	}

	Update(input) {
		// player controller
		this.moveUp = input.IsKey(87);
	}
}