class CanvasRenderer {
	constructor(width, height) {
		this.originX = 0;
		this.originY = 0;

		this.c = document.createElement('canvas');
		this.c.width = width;
		this.c.height = height;
		this.c.style.border = "1px solid";

    	this.ctx = this.c.getContext("2d");

    	document.body.appendChild(this.c);
  	}

  	// TEXT

  	DrawText(x, y, text, size) {
  		this.ctx.font = size + "px Arial";
		this.ctx.fillText(text, x, y); 
  	}

	// DRAWING

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