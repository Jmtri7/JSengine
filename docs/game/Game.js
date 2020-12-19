class Game {
	constructor() {
		this.board = new Board(300, 300);

		this.player = this.board.AddPlayer(50, 50, 10, 10, 3);
		this.follower = this.board.AddFollower(50, 50, 200, 200, 7, this.player);
	}

	Render(renderer, input) {
		renderer.Clear();

		this.board.Render(renderer, input);
	}

	Update(renderer, input) {
		this.board.Update(renderer, input);

		console.log(180 * this.board.GetAngle(this.follower, this.player) / Math.PI);
		
	}
}