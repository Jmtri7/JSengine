class Engine {
	constructor() {
		this.renderer = new CanvasRenderer(800, 800);
		this.input = new Input();
		this.clock = new Clock();

		this.game = new Game();
	}

	Start() {
		this.clock.Start();

		var that = this;
		this.interval = setInterval(function() {
			that.game.Update(that.input);
			that.game.Render(that.renderer);
		}, 10);
	}
}