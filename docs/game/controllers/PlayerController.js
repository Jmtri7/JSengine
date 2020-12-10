class PlayerController {
	constructor(piece) {
		this.piece = piece;

		this.selectorActive = false;
		this.selector = new Piece(0, 0, 0, 0);
		this.selected = [];
	}

	Update(renderer, input) {

		// MOUSE

		// mousePress
		if(input.mouseDown) {
			this.selector.x = input.cursorX - renderer.originX;
			this.selector.y = input.cursorY - renderer.originY;
			this.selectorActive = true;
		}

		if(this.selectorActive) {
			this.selector.width = input.cursorX - renderer.originX - this.selector.x;
			this.selector.height = input.cursorY - renderer.originY - this.selector.y;
		}

		// mouseRelease
		if(input.mouseUp) {
			this.selectorActive = false;

			if(this.selector.width < 0) {
				this.selector.x += this.selector.width;
				this.selector.width *= -1;
			}

			if(this.selector.height < 0) {
				this.selector.y += this.selector.height;
				this.selector.height *= -1;
			}

			this.selected = this.piece.board.DetectCollision(this.selector);
			//console.log(this.selected);
		}

		// character controls
		if(this.piece != null) {

			// WASD movement

			var UD = input.IsKey(87) - input.IsKey(83);
			var LR = input.IsKey(68) - input.IsKey(65);

			if(UD == 1) {
				if(LR == 1) this.piece.Move(1);
				else if(LR == -1) this.piece.Move(7);
				else this.piece.Move(0);
			} 
			else if(UD == -1) {
				if(LR == 1) this.piece.Move(3);
				else if(LR == -1) this.piece.Move(5);
				else this.piece.Move(4);
			}
			else {
				if(LR == 1) this.piece.Move(2);
				else if(LR == -1) this.piece.Move(6);
			}
		} else {
			console.log("no pc");
		}
	}

	Render(renderer, input) {
		var lineSize = 30;
		var logHeight = 10;
		var lineText = "";

		if(this.selectorActive) {
			renderer.DrawRectangle(this.selector.x, this.selector.y, this.selector.width, this.selector.height);
		};

		for(var i = 0; i < this.selected.length; i++) {
			renderer.DrawRectangle(this.selected[i].x, this.selected[i].y, this.selected[i].width, this.selected[i].height);

			lineText = "x: " + this.selected[i].x + ", y: " + this.selected[i].y;
			renderer.DrawText(lineSize, lineSize + logHeight, lineText, lineSize);
			logHeight += lineSize;

			logHeight += 10;
		}
		
	}
}