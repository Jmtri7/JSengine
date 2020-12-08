class PlayerController {
	constructor(piece) {
		this.piece = piece;
	}

	Update(input) {
		if(this.piece != null) {
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
		}
	}
}