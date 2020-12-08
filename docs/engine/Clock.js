class Clock {
	constructor() {
		this.t1 = 0;
		this.t2 = 0;
		this.dt = 0;
	}

	Tick() {
		this.t2 = new Date().getTime();
		this.delta = this.t2 - this.t1;
		this.t1 = this.t2;
	}

	Start() {
		this.t2 = new Date().getTime();
		this.t1 = this.t2;
		
		var that = this;
		this.interval = setInterval(function() {that.Tick()}, 10);
	}
}