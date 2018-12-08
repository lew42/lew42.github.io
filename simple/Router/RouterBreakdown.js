import is from "/simple/is/is.js";

/*

This might be worthwhile at another time...


*/

class Base {
	constructor(){
		return this.instantiate(...arguments);
	}

	instantiate(){
		this.assign(...arguments).initialize();
	}

	initialize(){}

	assign(){
		return Object.assign(this, ...arguments);
	}
}

// class Tree extends Base {
class Tree extends DebugBase { // toggle between std base and debug base
	// this.parent
	// this.children, this.nodes, this.items, etc


	is_descendant_of(another){
		var parent = this.parent;

		while (parent){
			if (another === parent)
				return true;
			parent = parent.parent;
		}

		return false;
	}
}

class Path extends Tree {
	// this.part
	part(){
		return this.name.replace(/_/g, "-");
	}
	
	path(){
		return "/" + this.parts().join("/") + "/";
	}

	parts(){
		var parent = this.parent;
		const parts = [this.part()];

		while (parent && parent !== this.router){
			parts.unshift(parent.part());
			parent = parent.parent;
		}

		return parts;
	}
}

class RouterBase {

}

export default class Router {

	instantiate(){
		this.assign(...arguments);

		this.routes = {};

		this.ref && this.ref(this);

		if (!this.parent)
			this.instantiate_router();
		else
			this.instantiate_route();
	}
	
	instantiate_router(){
		this.router = this;
		this.name = this.name || "router";

		// break the /#/hash/hash-parts/ into ["hash", "hash_parts"]
		this.hash = window.location.hash && window.location.hash.slice(2, -1).replace(/-/g, "_").split("/") || [];
		
		this.initialize_router();

		// console.log(this.hash);
		// activate without push
		// this.active_route = this;
		// this.activate(false);
		// setTimeout(() => this.activate(false), 0);
	}

	instantiate_route(){
		this.initialize_route();
	}

	initialize_router(){
		this.initialize();
		this.activate(false);
	}

	initialize_route(){
		this.initialize();
		this.match();
	}

	initialize(){}

	match(){
		if (this.has_hash()){
			if (this.is_match()){
				this.hash = this.parent.hash.slice(1);
				this.hash_match();
			} else {
				this.hash_no_match();
			}
		} else {
			this.no_hash();
		}
	}

	has_hash(){
		return this.parent.hash && this.parent.hash.length;
	}

	is_match(){
		return this.parent.is_active_route() && this.name === this.parent.hash[0];
	}

	hash_match(){
		this.activate(false);
	}

	hash_no_match(){
		this.no_match();
	}

	no_hash(){
		this.no_match();
	}

	no_match(){}

	activate(push = true){
		console.log("activate", this.name);
		this.activate_route(push);
		this.activated();
	}

	activated(){}

	activate_route(push = true){
		this.router.active_route && this.router.active_route.deactivate();
		this.router.active_route = this;
		push && this.push();
	}


	is_active(){
		return this.is_active_route() || this.is_active_ancestor();
	}

	is_active_route(){
		return this.router.active_route === this;
	}

	is_active_parent(){
		const active_child = this.get_active_child();
		return active_child && active_child.is_active_route();
	}

	is_active_ancestor(){
		return this.router.active_route.is_descendant_of(this);
	}


	get_active_child(){
		var next = this.router.active_route;
		while (next){
			if (next.parent === this)
				return next;
			next = next.parent;
		}
		return false;
	}

	deactivate(){
		this.deactivate_route();
		this.deactivated();
	}

	deactivate_route(){}
	deactivated(){}

	push(){
		if (this === this.router){
			// remove hash
			window.history.pushState("", document.title, window.location.pathname);
		} else {
			window.location.hash = this.path();
		}
	}

	add(name, props){
		if (is.pojo(name)){
			for (const n in name){
				this.add_route(n, name[n]);
			}
		} else {
			 return this.add_route(name, props);
		}
	}

	add_route(name, props){
		const route = new this.constructor({
			name, parent: this, router: this.router
		}, props);

		if (this.routes[name]) console.warn("route override?");
		else this.routes[name] = route;
		
		if (!this[name]) this[name] = route;
		else console.warn("prop", name, "taken");
		
		return route;
	}



	make(n){
		for (let i = 1; i < n+1; i++){
			this.add("test"+i, function(){
				console.log("activated " + this.path());
			}, function(){
				console.log("deactivated "+ this.path());
			});
		}
	}

}