class Clock {
	constructor() {
		this.time1 = new Date().getTime();
		this.deltaTime = 0;
		this.time2 = new Date().getTime();
	}

	Tick() {
		this.time2 = new Date().getTime();
		this.deltaTime = this.time2 - this.time1;
		this.time1 = this.time2;
		// console.log(this.deltaTime);
		return this.deltaTime;
	}
}