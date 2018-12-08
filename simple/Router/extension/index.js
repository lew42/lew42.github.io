import simple, { el, div, p, route } from "/simple/simple.js";
import Router from "../Router.js";

class Router2 extends Router {
	initialize(){

	}

	btn(){
		this.btn = div(this.name).click(() => this.activate());
		this.views.push(this.btn);
		this.each(route => route.btn());
	}

	// render(){
	// 	this.view = div(this.name + " content");
	// }

	// activate(push = true){
	// 	this.activate_route(push);
	// }
}

const router2 = new Router2();

div("reset").click(() => router2.activate());

router2.add("one").add("oneA");
router2.add("two")//.activate();

// div().style("display", "flex").append(
// 	div().style("flex", "1 1 0").append(() => {
// 		router2.each(route => route.btn());
// 	}),
// 	div().style("flex", "1 1 0").append(() => {
// 		router2.each(route => route.render());
// 	})
// );

/*

Should route("name", fn(){}) be an activated cb or an init?

If it's a content function, it needs to run once...
If it's an activated cb, it might run once or more.
If it's an initializer, it would naturally only run once.

If you want a content function, why not call it a page?  Because I need Page as a template thing.


And so I get into these dilemmas.  There's no easy win here.

It's either expose this add(name, props) function's internals, so it can be extended...

Or...?
Or just skip the fancy unnamed function shortcut, and enforce a pojo:

route("name", {
	activated(){
		// ...
	},
	initialiize(){},
	render(){},
	etc(){}
});

And at that point, you might as well just do

new Route({
	name: "here",
	initialize(){},
	activated(){}
});





Auto Initialize/Match/Activate --> immediate rendering

1.  create router
2.  add routes
3.  render them into a custom template

If we auto-initialize, the routes might match and render immediately.  Then we need to move the element into position..

The original intention was to keep the `new Router()` api pretty clean and easy to use?

const router = new Router().add({}); //?

Do we really want to put rendering into the Router by default?

Maybe all the classify stuff is ready to go, the router is setup for .views[], and maybe we even have a .render() method, but you need to manually call it?

*/