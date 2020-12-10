class Engine {
	constructor() {
		this.renderer = new CanvasRenderer(800, 800);
		this.input = new Input(this.renderer.c);
		this.clock = new Clock();

		this.game = new Game();
	}

	Start() {
		this.clock.Start();

		var that = this;
		this.interval = setInterval(function() {
			that.input.Update();

			that.game.Update(that.renderer, that.input);
			that.game.Render(that.renderer, that.input);
		}, 10);
	}
}