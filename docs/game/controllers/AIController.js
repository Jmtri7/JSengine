class AIController {
	constructor(piece) {
		this.piece = piece;

		this.leader = null;

		this.wander = false;
		this.wanderTimer = 100;
	}

	Wander() {
		if(this.wanderTimer <= 0) {
			this.piece.direction = Math.floor(8 * Math.random());
			this.wanderTimer = 100;
		} else {
			// wander 50 / wait 50
			if(this.wanderTimer <= 50) {
				this.piece.Move(this.piece.direction);
			}
			this.wanderTimer--;
		}
	}

	Follow(leader) {
		this.leader = leader;
	}

	Approach(target) {
		if(target.x > this.piece.x) {
			if(target.y > this.piece.y) {
				this.piece.Move(3);
			} else if(target.y < this.piece.y) {
				this.piece.Move(1);
			} else {
				this.piece.Move(2);
			}
		} else if(target.x < this.piece.x) {
			if(target.y > this.piece.y) {
				this.piece.Move(5);
			} else if(target.y < this.piece.y) {
				this.piece.Move(7);
			} else {
				this.piece.Move(6);
			}
		} else {
			if(target.y > this.piece.y) {
				this.piece.Move(4);
			} else if(target.y < this.piece.y) {
				this.piece.Move(0);
			}
		}
	}

	Update(renderer, input) {
		if(this.leader != null) {
			if(this.piece.board.GetDistance(this.leader, this.piece) > 200) {
				this.Approach(this.leader);
			} else if(this.wander) {
				this.Wander();
			}
		} else if(this.wander) {
			this.Wander();
		}
	}
}