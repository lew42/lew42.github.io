import simple, { el, div, p, route } from "/simple/simple.js";
import Router from "../Router.js";

simple.View.stylesheet("/simple/Router/Router.css");

// simple.router.log = true;

div.c("cols", {
	left(){
		div.c("item pad", "reset").click(() => simple.router.activate());
		route("one");

		route("two", function make(){
			this.make(7, make);
		});

		simple.router.make(4, function make(){
			this.make(4, make);
		});
	},
	right(){
		simple.router.rerender_router();
	}
});
