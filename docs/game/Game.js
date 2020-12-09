class Game {
	constructor() {
		this.board = new Board(300, 300);

		this.board.AddPlayer(50, 50, 10, 10, 3);
		this.board.AddPiece(50, 50, 200, 200, 7);
	}

	Render(renderer) {
		renderer.Clear();

		this.board.Render(renderer);
	}

	Update(input) {
		this.board.Update(input);
	}
}