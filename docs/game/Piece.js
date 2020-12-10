class Piece {
	constructor(width, height, x, y, board, direction) {
		this.width = width;
		this.height = height;

		this.x = x;
		this.y = y;
		this.board = board;
		this.direction = direction;
	}

	Move(direction) {
		this.direction = direction;

		var oldX = this.x;
		var oldY = this.y;

		switch(this.direction) {
			case 0:
				this.y--;
			break;
			case 1:
				this.x++;
				this.y--;
			break;
			case 2:
				this.x++;
			break;
			case 3:
				this.x++;
				this.y++;
			break;
			case 4:
				this.y++;
			break;
			case 5:
				this.x--;
				this.y++;
			break;
			case 6:
				this.x--;
			break;
			case 7:
				this.x--;
				this.y--;
			break;
		}

		if(this.board.DetectOutOfBounds(this) || this.board.DetectCollision(this).length != 0) {
			console.log("collision");
			this.x = oldX;
			this.y = oldY;
		}
	}

	Render(renderer) {
		// token
		renderer.PaintRectangle(this.x, this.y, this.width, this.height, "#ff0000");

		// direction pointer
		var centerX = this.x + this.width / 2;
		var centerY = this.y + this.height / 2;
		var pointerLength = 20;
		switch(this.direction) {
			case 0: renderer.DrawLine(centerX, centerY, centerX, centerY - pointerLength);
			break;
			case 1: renderer.DrawLine(centerX, centerY, centerX + pointerLength, centerY - pointerLength);
			break;
			case 2: renderer.DrawLine(centerX, centerY, centerX + pointerLength, centerY);
			break;
			case 3: renderer.DrawLine(centerX, centerY, centerX + pointerLength, centerY + pointerLength);
			break;
			case 4: renderer.DrawLine(centerX, centerY, centerX, centerY + pointerLength);
			break;
			case 5: renderer.DrawLine(centerX, centerY, centerX - pointerLength, centerY + pointerLength);
			break;
			case 6: renderer.DrawLine(centerX, centerY, centerX - pointerLength, centerY);
			break;
			case 7: renderer.DrawLine(centerX, centerY, centerX - pointerLength, centerY - pointerLength);
			break;
		}
	}
}