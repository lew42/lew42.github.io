class Thing {
	get activate(){
		return this._activate;
	}

	set activate(value){
		this.on("activate", value);
	}

	_activate(){
		this.activate_route();
		this.classify();
		this.emit("activate", this);
	}
}

new Thing({
	activate(){
		// gets added to the event
	}
});

thing.activate(); // calls _activate()

/*

+ allows double-use of the .activate property:
+ allows you to add events using .assign(), AND invoke the event using the same property name as a method


- a little awkward to extend:

*/

class Thing2 extends Thing {
	// oops
	activate(){
		//...
	}

	// have to override this one:
	_activate(){
		//...
		this.emit("activate"); // and make sure not to break it
	}
}