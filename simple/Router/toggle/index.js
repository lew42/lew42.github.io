import simple, { el, div, p, route } from "/simple/simple.js";
import Router from "../Router.js";


simple.View.stylesheet("/simple/Router/Router.css");
// console.warn("Router styles shouldn't be loaded normally - the routes don't need any default styling...  This is just for testing");

/*

The basic routing patterns are sort of the basic UI patterns:
- expandos
- tabs
- paging (complete switching)
- interactive (ToC + paging + ..?)

Expandos are basically just toggles.  Click --> toggle.



*/



// const router = new Router();

div.c("route", "reset").click(() => simple.router.activate());

route("one").route("oneA");
route("two", r_two => {
	console.log("route two!");
});


simple.router.add("four", {
	initialize(){
		this.view = div.c("route", "four").click(() => this.activate());
	},
	activated(){
		if (!this.rendered){
			this.content = div("four content");
			this.rendered = true;
		}
	}
});

/*

.render() and .content() don't really fit with this pattern

the .render() is creating a button, and the content 

I think it's better to just add an initialize() function, and do whatever you want in there...

*/
// route("toggle", {

class Toggle extends Router {
	initialize(){
		this.view = div.c("route wrap", {
			preview: div(this.name).click(() => this.activate())
		});

		this.views.push(this.view);
	}

	activated(){
		if (!this.rendered){
			this.render();
			this.rendered = true;
		} else {
			// this.view.content.show();
			this.classify();
		}
	}

	render(){
		this.views.push(this.view);
		this.classify();
		this.view.append({
			content: () => {
				this.make(3);
			}
		});
	}

	reactivate(){
		console.log(this.path(), "reactivate()");
		// this.view.content.hide();
		// this.parent && this.parent.activate();
	}

	// deactivated(){
	// 	// this.view.content.hide();
	// 	this.classify(false);
	// }
}

const toggles = new Toggle();
/*

new Router({
	name: "five",
	initialize(){
		// ...
	}
});

The problem with creating a standalone Router..
- it's more like a route than a router
- it'll act like a router if it doesn't get a parent immediately...

You could do it properly:

new Router({
	parent: simple.router
});

Or, we auto-instantiate one HashRouteManager, and only need to:

new Route({
	name: "six"
}); 

// automatically adds it as a root route to the Router.


This is sort of what we're doing.  In order to have RouteGroups, I was going to allow parallel routers, to sort of get the functionality necessary.  It's a little confusing that way, but it might work.

The idea there, is that you can create a new Router() in order to organize a new set of routes.

So you could have 2 types of Routers.  The RouterManager?

Or you just have a prototype .all_routes {} object that tracks all the routes for all Routers, so you can avoid clashes.


In order to have a RouteGroup, you just create a new Router..

router = new Router();

router.add("name", ...)

or even new Route({
	router: my_router
});


Is the Router any different than the Route class?

Is it handy to be able to extend the Router?  Let's see.


*/