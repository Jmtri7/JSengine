class Board {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.pieces = [];

		this.pc = new PlayerController(null);
	}

	DetectCollision(piece1, piece2) {
		if(
			piece1.x + piece1.width >= piece2.x
			&& piece1.x <= piece2.x + piece2.width
			&& piece1.y + piece1.height >= piece2.y
  			&& piece1.y <= piece2.y + piece2.height
  		) return true;
		return false;
	}

	AddPlayer(x, y, width, height) {
		var piece = new Piece(x, y, width, height, this);
		this.pieces.push(piece);
		this.pc.piece = piece;
	}

	AddPiece(x, y, width, height) {
		this.pieces.push(new Piece(x, y, width, height, this));
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