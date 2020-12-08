class Piece {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.direction = 0;
	}

	Move(direction) {
		this.direction = direction;

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