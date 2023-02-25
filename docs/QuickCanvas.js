class QuickCanvas {
	constructor(width, height, speed) {

		this.showFPS = false;

		// CANVAS

		this.c = document.createElement('canvas');
		this.c.width = width;
		this.c.height = height;
		this.c.style.border = "1px solid black";
    	this.ctx = this.c.getContext("2d");

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

		this.origin = new Point(0, 0);
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
	DrawLine(x1, y1, x2, y2, color) {
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		if(color == undefined) {
			this.ctx.strokeStyle = "black";
		} else {
			this.ctx.strokeStyle = color;
		}
		this.ctx.stroke();
	}
	DrawPath(vertices) {
		let x = vertices[0].x;
		let y = vertices[0].y;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		for(var i = 1; i < vertices.length; i++) {
			x = vertices[i].x;
			y = vertices[i].y;
			this.ctx.lineTo(x, y);
		}
		this.ctx.closePath();
		this.ctx.stroke(); 
	}
	DrawCircle(x, y, r) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.ctx.stroke();
	}
	DrawRectangle(x, y, w, h) {
		this.ctx.fillStyle = "#000000";
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.stroke();
	}
	PaintPath(vertices, color) {
		let x = vertices[0].x;
		let y = vertices[0].y;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		for(var i = 1; i < vertices.length; i++) {
			x = vertices[i].x;
			y = vertices[i].y;
			this.ctx.lineTo(x, y);
		}
		this.ctx.closePath();
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}
	PaintCircle(x, y, r, color) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.ctx.closePath();
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}
	PaintRectangle(x, y, w, h, color) {
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}
	ClearRectangle(x, y, w, h) {
		this.ctx.clearRect(x, y, w, h);
	}
	Clear() {
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
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
				if(this.showFPS) console.log("FPS: " + this.frameCounter / this.timeSinceLastFrame * 1000);
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
			this.cursor.x = e.clientX - canvas.left;
			this.cursor.y = e.clientY - canvas.top;
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