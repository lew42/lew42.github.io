import simple, { el, div, p } from "/simple/simple.js";
import Router from "./Router.js";

// const route = Router.route.bind(Router);

// route("one");
// route("two");

class Router1 extends Router {
	initialize(){
		this.view = div.c("route", this.name + "-" + this.level()).click(() => this.activate());
	}
}

const router1 = new Router1({
	name: "router1"
});

router1.add("one");
router1.add("two").add({
	twoA: {},
	twoB: {},
	twoC: {},
	two: {}
});
router1.add("three");
router1.add("twoA");
router1.add("test");

window.addEventListener("hashchange", function(){
	console.log(...arguments);
})

el("a", "test link").attr("href", "#/test/");
/*

We could have a HashRouter that handles the .active_node and push stuff.
This could store all the root .routes which could be routes or routers.

Basically, the current Router that morphs into a router or route, could take a slightly different role, defaulting to a RouteGroup (if instantiated with no name), and if given a name, it becomes a Route?

So now, we could extend Router and do similar things?


This is getting complicated.  I think the route groups are important.  I think having one router to manage all the routes is important...

I think it's important to be able to extend the Route/r in order to add functionality to all route/rs?

If the root route manager isn't really tangible, it might be possible to do everything without ever touching it.  Instead of rendering the router, we render the views manually, and only add route-specific code to the route group?

routegroup.activate() could be similar to router.activate()...
Or maybe you use routes.reset()

So, the "Router" hooks into a single RootRouter aka RouteManager.  And the "Router" class is a RouteGroup/Route hybrid.

new Router() --> route group
router.route("name", ...) // add route to this route group

class Tabs extends Router {
	initialize(){}
	activated(){}
}

tabs.add({
	// recursive?
	one: {
		oneA(){ ... }
	}
});

Independent root routers?

# route() fn and captor
--> just complicates things..

new Router1(), here, will create a new root router.

the Router1.route() helper will add to the Router.router instance.

We could have a { group: true } flag, in order to create a new router that tracks its own babies.

route.add(new Router())?

Also, new Router(), without a parent, will initialize itself as a root router...

It might be kinda tricky to re-organize it?  Maybe not...

And it definitely makes sense to try and organize the hashes to avoid conflicts.

So having one root RouteManager might not be a bad idea, just to track them all...

That might even be like a Sitemap or something...


Can we make the routes entirely separate from the router?

All the active path stuff, right now, is based on the router.active_route.
Each route doesn't even store an .active state...
I definitely like this, since we don't have to sync anything.

Hmm...

Maybe a Router is basically just the RouteGroup, and you can have them anywhere in the Route tree.


One objective was to be able to say, `new Router()` without any config, and start adding routes.  Also to be able to extend the Router, and render everything uniformly.



*/




class Test extends Router {
	initialize(){
		console.log("new Test");
		this.view = div.c("test", this.name).click(() => this.activate());
	}
	
	no_hash(){
		this.render();
	}

	hash_match(){ // "iso"
		this.activate(false);
	}

	activated(){
		this.view.append(() => {
			Test.set_captor(this);
			this.content();
			Test.restore_captor();
		});
	}

	render(){

	}

	/*
	route capture vs test capture vs view capture...
	are these all different layers?
		they could be, or they could all be the same..
		it's all about the hierarchy/structure
		do i want to duplicate the data/structure?
	*/

	static test(name, fn){
		// return Test.captor.add(name, {
		// 	content: fn
		// });

		return Router.captor.add

	}
}

const test = Test.test.bind(Test);

test("t1", t => {
	console.log("hurray for test('one')!");
});




class RouterWithView extends Router {

}



// function router1(){
// 	const router = window.router = new Router();

// 	router.add("test1", {
// 		activated(){
// 			console.log(this.name, "activated");
// 		}
// 	});
// }

// div("router1()").click(router1);

// router1();

class Pager extends Router {
	initialize(){
		console.log(this.name, "initialize");
		this.render();
	}

	render(){
		div(this.name).click(() => this.activate());
	}
}

function pager1(){
	const pager = window.pager = new Pager();

	pager.add("test1");
}

// pager1();
;

const views = [];

views.push(div("pager1()").click(pager1));

views.hide = function(){
	// for (const view of this){
	// 	view.hide();
	// }
	this.forEach(view => view.hide());
	return this;
};

views.hide();

// class Switcher {
// 	constructor(){
// 		this._views = [];
// 	}

// 	add(pojo){
// 		for (const prop in pojo){
// 			this._views.push(pojo[prop]);
// 			this[prop] = pojo[prop];
// 		}
// 	}
// }

// var type;
// div(type = typeof {});
// if (){
// 	div("true");
// } else {
// 	div("false");
// }
/*

// 1
div(() => {
	// 2

	// use the 1, 2 annotation to inndicate synchronous code.  There are things you can do with a guarantee of synchronous execution that you can't do without.
});

*/