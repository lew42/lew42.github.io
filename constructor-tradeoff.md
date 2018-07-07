new Thing().config({}).initialize();

vs new Thing() => auto initialize();

if (this.initialize) this.initialize():
else delete this.initialize;

new Thing({
	initialize: false
})