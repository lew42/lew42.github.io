import is from "/simple/is/is.js";
import View, { el, div } from "/simple/View/View.js";
import Hasher from "./Hasher.js";
import RouteCtrl from "./RouteCtrl.js";

/*

1.  route.push() or <a href="#/route/path/">
2.  hasher.hashchange
3.  hasher.rematch
4.  route.activate()
*/
export default class Route {
	constructor(){
		return this.instantiate(...arguments);
	}

	instantiate(){
		this.ctrls = [];
		this.hasher.routes.push(this);

		this.assign(...arguments);
		this.initialize();
	}

	initialize(){
		this.prerender();
	}

	prerender(){
		this.ctrls.push(new this.Ctrl({
			route: this
		}));
	}

	push(){
		window.location.hash = this.path();
	}

	a(title = this.name){
		return el("a", title).attr("href", this.path());
	}

	activate(){
		console.log(this.path(), "activate()");
	}

	add(){

	}

	add_route(){

	}

	level(){
		var count = 0, route = this;
		while (route !== this.router){
			count++;
			route = route.parent;
		}
		return count;
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

	assign(){
		return Object.assign(this, ...arguments);
	}
}

// singleton
Route.prototype.hasher = Route.hasher = new Hasher();

Route.prototype.Ctrl = Route.Ctrl = RouteCtrl;