class Input {
	constructor() {
		this.keys = [];

		document.addEventListener('keydown', (e) => {
			this.keys[e.keyCode] = true;
			console.log(e.keyCode + " pressed");
		});

		document.addEventListener('keyup', (e) => {
			this.keys[e.keyCode] = false;
			//console.log(e.keyCode + " released");
		});
  	}

  	IsKey(code) {
  		if(this.keys[code] == undefined) return false;
  		return this.keys[code];
  	}
}