class Game {
	constructor() {
		this.board = new Board(400, 400);

		this.board.AddPlayer(10, 10, 50, 50);
	}

	Render(renderer) {
		renderer.Clear();

		this.board.Render(renderer);
	}

	Update(input) {
		this.board.Update(input);
	}
}