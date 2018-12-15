import is from "../is/is.js";
import View from "../View/View.js";
import Dev from "../Dev/Dev.js";
import Router from "../Router/Router.js";

// console.log("Site.js");

export default class Site {
	constructor(){
		this.instantiate(...arguments);
	}

	instantiate(){
		this.assign(...arguments);
		this.initialize();
	}

	initialize(){
		this.initialize_html();
		this.initialize_head();
		this.initialize_css();
		this.initialize_body();
		this.initialize_dev();
		this.initialize_router();

		this.prerender();
	}

	initialize_html(){
		this.html = new this.View({
			el: document.documentElement,
			capturable: false
		});
	}

	initialize_head(){
		this.head = new this.View({
			el: document.head,
			capturable: false // or capture: false, and captor: false?
		});
	}

	initialize_css(){
		this.stylesheet("/simple/css/simple.css") 
		// this might be relative to the current url,
			// and might not work for externally loaded stuff
				// fix:  ://lew42.com/simple/css/base.css
			// or, probably better:
				// fetch as text, and append dynamically
	}

	initialize_body(){
		this.body = new this.View({
			el: document.body,
			capturable: false
		});
	}

	initialize_dev(){
		this.dev = new this.Dev();
	}

	initialize_router(){
		this.router = this.Router.router;
	}

	route(){
		return this.Router.route(...arguments);
	}

	prerender(){
		this.View.set_captor(this.body);
	}


	assign(){
		return Object.assign(this, ...arguments);
	}

	use(){
		for (const arg of arguments){
			if (is.obj(arg)){
				this.assign(arg);
			} else if (is.fn(arg)){
				arg.call(this, this);
			} else {
				throw "can't use " + arg.toString();
			}
		}

		return this;
	}

	stylesheet(){
		return this.View.stylesheet(...arguments);
	}
}

Site.prototype.assign(View.elements, {	
	is,
	View,
	Dev,
	Router
});

export * from "../View/View.js";
export { is, Dev, Router };