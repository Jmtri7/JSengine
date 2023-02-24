class Engine {
	constructor(speed) {

		this.timeLastRun = new Date().getTime();

		// How many seconds to wait before updating. Speed in updates per second
		this.updatePeriod = (1 / speed) * 1000;

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
	Update(dt) {
		
	}
	Render() {
		
	}
}