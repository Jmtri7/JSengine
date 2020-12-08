class Board {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.pieces = [];

		this.pc = new PlayerController(null);
	}

	AddPlayer(x, y, width, height) {
		var piece = new Piece(x, y, width, height);
		this.pieces.push(piece);
		this.pc.piece = piece;
	}

	AddPiece(x, y, width, height) {
		this.pieces.push(new Piece(x, y, width, height));
	}

	Render(renderer) {
		renderer.SetOrigin(renderer.c.width / 2 - this.pc.piece.x, renderer.c.height / 2 - this.pc.piece.y);

		renderer.PaintRectangle(0, 0, this.width, this.height, "#00ff00");
	
		for(var i = 0; i < this.pieces.length; i++) {
			this.pieces[i].Render(renderer);
		}
	}

	Update(input) {
		this.pc.Update(input);
	}
}