// aka HashManager
export default class Hasher {
	constructor(){
		return this.instantiate(...arguments);
	}

	instantiate(){
		this.assign(...arguments);

		this.routes = []; // root routes

		window.addEventListener("hashchange", () => this.hashchange());
	}

	hashchange(){
		this.rehash();
	}

	rehash(){
		this.hash = window.location.hash && window.location.hash.slice(2, -1).replace(/-/g, "_").split("/") || [];

		for (const route of this.routes){
			// route.set_hash()
			// or..?
			// route.match?
		}
	}

	push(route){
		window.location.hash = route.path();
	}

	reset(){
		window.history.pushState("", document.title, window.location.pathname);
	}

	
	assign(){
		return Object.assign(this, ...arguments);
	}
}