class Board {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.pieces = [];

		this.pc = new PlayerController(null);
		this.ai = [];

		this.renderView = 0;
	}

	// collisions

	DetectOutOfBounds(piece) {
		return(
			piece.x < 0
			|| piece.x + piece.width > this.width
			|| piece.y < 0
			|| piece.y + piece.height > this.height
		);
	}

	IsCollision(piece1, piece2) {
		return (
  			piece1.x + piece1.width > piece2.x
			&& piece1.x < piece2.x + piece2.width
			&& piece1.y + piece1.height > piece2.y
  			&& piece1.y < piece2.y + piece2.height
  		);
	}

	DetectCollision(piece) {
		var colliders = [];

		for(var i = 0; i < this.pieces.length; i++) {
			if(this.pieces[i] != piece && this.IsCollision(this.pieces[i], piece)) {
				colliders.push(this.pieces[i]);
			}
		}

		return colliders;
	}

	// add pieces

	AddPlayer(width, height, x, y, direction) {
		var piece = new Piece(width, height, x, y, this, direction);
		this.pieces.push(piece);
		this.pc.piece = piece;
		return piece;
	}

	AddPiece(width, height, x, y, direction) {
		var piece = new Piece(width, height, x, y, this, direction);
		this.pieces.push(piece);
		return piece;
	}

	AddFollower(width, height, x, y, direction, target) {
		var piece = new Piece(width, height, x, y, this, direction);
		this.pieces.push(piece);

		var ai = new AIController(piece);
		ai.Follow(target);
		ai.wander = true;
		this.ai.push(ai);

		return piece;
	}

	AddWanderer(width, height, x, y, direction) {
		var piece = new Piece(width, height, x, y, this, direction);
		this.pieces.push(piece);

		var ai = new AIController(piece);
		ai.wander = true;
		this.ai.push(ai);

		return piece;
	}

	// math

	GetDistance(piece1, piece2) {
		return Math.sqrt(Math.pow(piece2.x - piece1.x, 2) + Math.pow(piece2.y - piece1.y, 2));
	}

	GetAngle(piece1, piece2) {
		var dx = piece2.x - piece1.x;
		var dy = piece2.y - piece1.y;
		if(dy >= 0) {
		 	var theta = Math.abs(Math.atan2(dy, dx));
		} else {
		 	var theta = 2 * Math.PI - Math.abs(Math.atan2(dy, dx));
		}

		return theta;
	}

	// render / update

	Render(renderer, input) {
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

		this.pc.Render(renderer, input);
	}

	Update(renderer, input) {
		if(input.IsKey(49)) this.renderView = 0;
		else if(input.IsKey(50)) this.renderView = 1;

		this.pc.Update(renderer, input);
		for(var i = 0; i < this.ai.length; i++) {
			this.ai[i].Update(renderer, input);
		}
	}
}