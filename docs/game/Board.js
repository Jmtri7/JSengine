class Board {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.pieces = [];

		this.pc = new PlayerController(null);
	}

	DetectOutOfBounds(piece) {
		return(
			piece.x <= 0
			|| piece.x + piece.width >= this.width
			|| piece.y <= 0
			|| piece.y + piece.height >= this.height
		);
	}

	DetectCollision(piece1, piece2) {
		return (
  			piece1.x + piece1.width >= piece2.x
			&& piece1.x <= piece2.x + piece2.width
			&& piece1.y + piece1.height >= piece2.y
  			&& piece1.y <= piece2.y + piece2.height
  		);
	}

	AddPlayer(width, height, x, y, direction) {
		var piece = new Piece(width, height, x, y, this, direction);
		this.pieces.push(piece);
		this.pc.piece = piece;
	}

	AddPiece(width, height, x, y, direction) {
		this.pieces.push(new Piece(width, height, x, y, this, direction));
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