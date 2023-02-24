class Input {
	constructor(where) {
		this.keys = [];

		this.mouseLast = false;
		this.mouse = false;
		this.mouseDown = false;
		this.mouseUp = false;

		this.cursorX = 0;
		this.cursorY = 0;

		document.addEventListener('keydown', (e) => {
			this.keys[e.keyCode] = true;
			console.log(e.keyCode + " pressed");
		});

		document.addEventListener('keyup', (e) => {
			this.keys[e.keyCode] = false;
			//console.log(e.keyCode + " released");
		});

		document.addEventListener('mousemove', (e) => {
			var canvas = where.getBoundingClientRect();
			this.cursorX = e.clientX - canvas.left;
			this.cursorY = e.clientY - canvas.top;
			//console.log("mouse at " + this.cursorX + ", " + this.cursorY);
		});

		document.addEventListener('mousedown', (e) => {
			this.mouse = true;
			// console.log("mouse down at " + this.cursorX + ", " + this.cursorY);
		});

		document.addEventListener('mouseup', (e) => {
			this.mouse = false;
			// console.log("mouse up at " + this.cursorX + ", " + this.cursorY);
		});
  	}

  	Update() {
  		this.mouseDown = this.mouse && !this.mouseLast;
  		this.mouseUp = !this.mouse && this.mouseLast;

  		this.mouseLast = this.mouse;
  	}

  	IsKey(code) {
  		if(this.keys[code] == undefined) return false;
  		return this.keys[code];
  	}
}