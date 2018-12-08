import is from "/simple/is/is.js";
import View, { el, div } from "/simple/View/View.js";

View.stylesheet("/simple/Router/Router0/Router0.css");
console.log("Router0.js");


export default class Router0 {

	constructor(){
		return this.instantiate(...arguments);
	}

	instantiate(){
		this.assign(...arguments);

		this.routes = {};

		this.self && this.self(this);

		if (!this.parent)
			this.instantiate_router();
		else
			this.instantiate_route();
	}
	
	instantiate_router(){
		this.router = this;
		this.name = this.name || (this.constructor.name[0].toLowerCase() + this.constructor.name.substring(1));

		// break the /#/hash/hash-parts/ into ["hash", "hash_parts"]
		this.hash = window.location.hash && window.location.hash.slice(2, -1).replace(/-/g, "_").split("/") || [];

		div.c("router0", this.name).click(() => this.activate())
		
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
				console.group("matched", this.name);
				this.hash = this.parent.hash.slice(1);
				this.hash_match();
				console.groupEnd();
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
		this.activate_route(push);
	}

	render(){
		this.view = div.c("route", this.name + " content");
			this.views.push(this.view);
				this.classify();
		this.view.append(this.content.bind(this, this));
		return this.view;
	}

	content(){
		el("i", "this is some temporary content for " + this.name);
	}

	activated(){}

	activate_route(push = true){
		if (this.router.active_route !== this){
			console.log("activate", this.name);
			if (this.router.active_route){
				this.router.active_route.deactivate();
			}

			this.router.active_route = this;
			push && this.push();
			this.activated();
			console.log("activated", this.name);
		}
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

	is_descendant_of(route){
		var parent = this.parent;

		while (parent){
			if (route === parent)
				return true;
			parent = parent.parent;
		}

		return false;
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
		// what if this is called manually (route.deactivate())?  activate parent?
		this.deactivate_route();
		this.deactivated();
	}

	deactivate_route(){
		console.log("deactivate", this.name);
	}

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
		} else if (is.pojo(props)) {
			 return this.add_route(name, props);
		} else if (props) {
			return this.add_route(name, { activated: props });
		} else {
			return this.add_route(name);
		}
	}

	// just an alias for .add()
	route(){
		return this.add(...arguments);
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

	make(n){
		for (let i = 1; i < n+1; i++){
			this.add("test"+i, function(){
				console.log("activated " + this.path());
			}, function(){
				console.log("deactivated "+ this.path());
			});
		}
	}

	assign(){
		return Object.assign(this, ...arguments);
	}

	each(fn){
		for (const name in this.routes){
			fn.call(this, this.routes[name]);
		}
		return this;
	}
}

// Router0.router = new Router(); // root/default router
// Router0.set_captor(Router.router);