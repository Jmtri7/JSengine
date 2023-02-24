class CanvasEngine {
	constructor(width, height, speed) {

		// CANVAS

		this.c = document.createElement('canvas');
		this.c.width = width;
		this.c.height = height;
		this.c.style.border = "1px solid black";
    	this.ctx = this.c.getContext("2d");

		this.origin = new Point(0, 0);
		this.SetOrigin(width / 2, height / 2);

    	// ENGINE

		this.timeLastRun = new Date().getTime();

		// How many seconds to wait before updating. Speed in updates per second
		this.updatePeriod = (1 / speed) * 1000;

		// Timers for updating and rendering
		this.timeSinceLastUpdate = 0;
		this.timeSinceLastFrame = 0;

		// calculate FPS
		this.frameCounter = 0;

		this.render = false;

		// INPUT

		this.keys = [];

		this.mouseLast = false;
		this.mouse = false;
		this.mouseDown = false;
		this.mouseUp = false;

		this.cursor = new Point(0, 0);
	}
	Update(dt) {
		
	}
	Render() {
		
	}
  	DrawText(x, y, text, size) {
  		this.ctx.font = size + "px Arial";
  		this.ctx.fillStyle = "black";
		this.ctx.fillText(text, x, y);
  	}
	DrawLine(x1, y1, x2, y2) {
		x1 += this.origin.x;
		y1 += this.origin.y;
		x2 += this.origin.x;
		y2 += this.origin.y;
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}
	DrawCircle(x, y, r) {
		x += this.origin.x;
		y += this.origin.y;
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.ctx.stroke();
	}
	DrawRectangle(x, y, w, h) {
		this.ctx.fillStyle = "#000000";
		x += this.origin.x;
		y += this.origin.y;
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.stroke();
	}
	PaintCircle(x, y, r, color) {
		x += this.origin.x;
		y += this.origin.y;
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.ctx.closePath();
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}
	PaintRectangle(x, y, w, h, color) {
		x += this.origin.x;
		y += this.origin.y;
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}
	ClearRectangle(x, y, w, h) {
		x += this.origin.x;
		y += this.origin.y;
		this.ctx.clearRect(x, y, w, h);
	}
	Clear() {
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
	}
	DrawAxes() {
		this.DrawLine(0, -this.c.height / 2, 0, this.c.height / 2);
		this.DrawLine(-this.c.width / 2, 0, this.c.width, 0);
	}
  	SetOrigin(x, y) {
		this.origin.x = x;
		this.origin.y = y;
	}
	UpdateMouse() {
  		this.mouseDown = this.mouse && !this.mouseLast;
  		this.mouseUp = !this.mouse && this.mouseLast;

  		this.mouseLast = this.mouse;
  	}
  	IsKey(code) {
  		if(this.keys[code] == undefined) return false;
  		return this.keys[code];
  	}
  	Run() {
		let time = new Date().getTime();
		let timeSinceLastRun = time - this.timeLastRun;
		this.timeLastRun = time;

		this.timeSinceLastUpdate += timeSinceLastRun;
		this.timeSinceLastFrame += timeSinceLastRun;

		this.render = this.timeSinceLastUpdate >= this.updatePeriod;

		while(this.timeSinceLastUpdate >= this.updatePeriod) {

			this.timeSinceLastUpdate -= this.updatePeriod;

			this.Update(this.updatePeriod);
		}

		if(this.render) {
			this.Render();

			this.frameCounter++;

			if(this.timeSinceLastFrame >= 1000) {
				console.log("FPS: " + this.frameCounter / this.timeSinceLastFrame * 1000);
				this.frameCounter = 0;
				this.timeSinceLastFrame = 0;
			}

			this.render = false;
		}
	}
  	Start() {
		if(this.interval != undefined) clearInterval(this.interval);
		this.interval = setInterval(this.Run.bind(this), 10); // Tries to Run every 10 ms

		document.addEventListener('keydown', (e) => {
			this.keys[e.keyCode] = true;
			console.log(e.keyCode + " pressed");
		});
		document.addEventListener('keyup', (e) => {
			this.keys[e.keyCode] = false;
			//console.log(e.keyCode + " released");
		});
		document.addEventListener('mousemove', (e) => {
			var canvas = this.c.getBoundingClientRect();
			this.cursor.x = e.clientX - canvas.left - this.origin.x;
			this.cursor.y = e.clientY - canvas.top - this.origin.y;
			//console.log("mouse at " + this.cursorX + ", " + this.cursorY);
		});
		document.addEventListener('mousedown', (e) => {
			this.mouse = true;
			//console.log("mouse down at " + this.cursorX + ", " + this.cursorY);
		});
		document.addEventListener('mouseup', (e) => {
			this.mouse = false;
			//console.log("mouse up at " + this.cursorX + ", " + this.cursorY);
		});
	}
}