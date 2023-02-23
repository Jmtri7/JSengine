class Engine {
	constructor(game, speed) {

		this.timeLastRun = new Date().getTime();

		// How many seconds to wait before updating. Speed in updates per second
		this.updatePeriod = (1 / speed) * 1000;

		this.game = game;

		// Timers for updating and rendering
		this.timeSinceLastUpdate = 0;
		this.timeSinceLastFrame = 0;

		// calculate FPS
		this.frameCounter = 0;

		this.render = false;
	}
	Start() {
		if(this.interval != undefined) clearInterval(this.interval);
		this.interval = setInterval(this.Run.bind(this), 10); // Tries to Run every 10 ms
	}
	Run() {
		if(this.game != null) {
			let time = new Date().getTime();
			let timeSinceLastRun = time - this.timeLastRun;
			this.timeLastRun = time;

			this.timeSinceLastUpdate += timeSinceLastRun;
			this.timeSinceLastFrame += timeSinceLastRun;

			this.render = this.timeSinceLastUpdate >= this.updatePeriod;

			this.Update();
			if(this.render) this.Render();
		} else {
			console.log("No game found!");
			clearInterval(this.interval);
		}
	}
	Update() {
		while(this.timeSinceLastUpdate >= this.updatePeriod) {

			this.timeSinceLastUpdate -= this.updatePeriod;

			if(this.game.Update != null) {
				this.game.Update(this.updatePeriod);
			} else {
				console.log("No game.Update method found!");
				clearInterval(this.interval);
				break;
			}
		}
	}
	Render() {
		if(this.game.Render != null) {

			this.game.Render();
			this.frameCounter++;

			if(this.timeSinceLastFrame >= 1000) {
				console.log("FPS: " + this.frameCounter / this.timeSinceLastFrame * 1000);
				this.frameCounter = 0;
				this.timeSinceLastFrame = 0;
			}

		} else {
			console.log("No game.Render method found!");
			clearInterval(this.interval);
		}

		this.render = false;
	}
}