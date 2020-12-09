class Game {
	constructor() {
		this.board = new Board(300, 300);

		this.board.AddPlayer(10, 10, 50, 50);
		this.board.AddPiece(100, 100, 50, 50);
	}

	Render(renderer) {
		renderer.Clear();

		this.board.Render(renderer);
	}

	Update(input) {
		this.board.Update(input);
	}
}