class Board {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.pieces = [];

		this.pc = new PlayerController(null);

		this.renderView = 0;
	}

	// collisions

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

	// add pieces

	AddPlayer(width, height, x, y, direction) {
		var piece = new Piece(width, height, x, y, this, direction);
		this.pieces.push(piece);
		this.pc.piece = piece;
	}

	AddPiece(width, height, x, y, direction) {
		this.pieces.push(new Piece(width, height, x, y, this, direction));
	}

	// perspective calculator

	GetDistance(piece1, piece2) {
		
	}

	GetAngle(piece1, piece2) {
		// if(dy >= 0) {
		// 	var theta = Math.abs(Math.atan2(dy, dx));
		// } else {
		// 	var theta = 2 * Math.PI - Math.abs(Math.atan2(dy, dx));
		// }
	}

	// render / update

	Render(renderer) {
		if(this.renderView == 0) {
			if(this.pc.piece != null) renderer.SetOrigin(renderer.c.width / 2 - this.pc.piece.x, renderer.c.height / 2 - this.pc.piece.y);

			renderer.PaintRectangle(0, 0, this.width, this.height, "#00ff00");
	
			for(var i = 0; i < this.pieces.length; i++) {
				this.pieces[i].Render(renderer);
			}
		} else if(this.renderView == 1) {
			renderer.SetOrigin(0, 0);
			renderer.PaintRectangle(0, renderer.c.height / 2, renderer.c.width, renderer.c.height / 2, "#00ff00");
		}
	}

	Update(input) {
		if(input.IsKey(49)) this.renderView = 0;
		else if(input.IsKey(50)) this.renderView = 1;

		this.pc.Update(input);
	}
}