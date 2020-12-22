class Engine {
	// speed in (updates/second)
	constructor(game, speed) {
		this.clock = new Clock();
		this.accumulator = 0;

		// calculate FPS
		this.frames = 0;
		this.timer = 0;

		this.dt = (1 / speed) * 1000;

		this.render = false;

		this.game = game;
	}

	Run() {
		var elapsed = this.clock.Tick();

		this.accumulator += elapsed;
		while(this.accumulator >= this.dt) {
			this.accumulator -= this.dt;
			this.render = true;

			if(this.game != null && this.game.Update != null)
				this.game.Update(this.dt);
		}

		this.timer += elapsed;
		if(this.render == true) {
			this.render = false;

			if(this.game != null && this.game.Render != null)
				this.game.Render();

			this.frames++;
			if(this.timer >= 1000) {
				// console.log("FPS: " + this.frames);

				this.frames = 0;
				this.timer = 0;
			}
		}
	}

	Start() {
		var run = this.Run.bind(this);
		this.interval = setInterval(run, 10);
	}
}