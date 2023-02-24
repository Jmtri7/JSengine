class CanvasRenderer {
	constructor(width, height) {
		this.originX = 0;
		this.originY = 0;

		this.c = document.createElement('canvas');
		this.c.width = width;
		this.c.height = height;
		this.c.style.border = "1px solid black";

    	this.ctx = this.c.getContext("2d");

    	document.body.appendChild(this.c);
  	}

  	// ADVANCED SHAPES

  	// TEXT

  	DrawText(x, y, text, size) {
  		this.ctx.font = size + "px Arial";
  		this.ctx.fillStyle = "black";
		this.ctx.fillText(text, x, y);
  	}

	// DRAWING

	DrawAxes() {
		if(this.originX >= 0 && this.originX <= this.c.width) {
			this.ctx.beginPath();
			this.ctx.moveTo(this.originX, 0);
			this.ctx.lineTo(this.originX, this.c.height);
			this.ctx.stroke();
		}
		if(this.originY >= 0 && this.originY <= this.c.height) {
			this.ctx.beginPath();
			this.ctx.moveTo(0, this.originY);
			this.ctx.lineTo(this.c.height, this.originY);
			this.ctx.stroke();
		}
	}

	DrawLine(x1, y1, x2, y2) {
		x1 += this.originX;
		y1 += this.originY;
		x2 += this.originX;
		y2 += this.originY;
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}

	DrawCircle(x, y, r) {
		x += this.originX;
		y += this.originY;
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.ctx.stroke();
	}

	DrawRectangle(x, y, w, h) {
		this.ctx.fillStyle = "#000000";
		x += this.originX;
		y += this.originY;
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.stroke();
	}

	// PAINTING

	PaintCircle(x, y, r, color) {
		x += this.originX;
		y += this.originY;
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.ctx.closePath();
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}

	PaintRectangle(x, y, w, h, color) {
		x += this.originX;
		y += this.originY;
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}

	// CLEARING

	ClearRectangle(x, y, w, h) {
		x += this.originX;
		y += this.originY;
		this.ctx.clearRect(x, y, w, h);
	}

	Clear() {
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
	}

	// GETTERS

	// SETTERS

	SetOrigin(x, y) {
		this.originX = x;
		this.originY = y;
	}
}