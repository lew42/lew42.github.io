# Problems

I can't import .md.  I can't write with simple.js views quickly enough to make it a viable notetaking experience.  I can, however, keep creating these markdown files, because Sublime renders them sufficiently.

I need to document the various use cases for the Router...

- route/r.views?
	vs route/r.ctrls and route_ctrl.views?
	this adds an extra layer of referencing, but it's doable.




# TODO

Current objective: Use the router to document different layout strategies.
- If this isn't a robust, simple, grokkable solution, I don't want to invest so much time in creating content?  Forget about that.. just don't break it.

This is the Test class/system.
This is the Page class/system.
This is a Tab class/system.

I just need to clarify some of the tricky points (particularly the shortcuts).  When you use route("name", fn(){}), what are the args, what's this, etc?




# Restructuring

External rendering of router.  In fact, very little has to change.

But instead of creating standalone routers, we name the class Route.

We have 1 singleton instance of a Router, that is unopinionated, so you shouldn't need to change it.  And has enough functionality, so you don't need to extend it.


Each Route doesn't necessarily need a hash?

It's essentially just a wrapper...

new Route({ group: true });
// --> no .hash


# Active State

Tree/Branch (.parent)

Active Item {
	.is_active_item()
	etc...
}

An active item system doesn't even need a router or persistence...

But only 1 active item?  Yep.

How do we get to persisting any saved state?

/#/State-IL/City-Aurora/
/#/il/aurora/
/#/aurora/il/


Item {}
List { .items{} }

Everything is an item?  Values, etc?
- allows selections
- copy/paste
- storage
- drag and drop


# Separate Data from Functionality?

They're closely coupled, but for things like polymorphism, you can keep classes extra small, and convert between a Route and a Router..?

new Two(one.data()) // ...












view.route = route(view.name, view.activate);

view.hash = new RouteHash(view.name);
view.hash.on("load")
view.hash.on("init")
view.hash.on("match")
view.hash.on("activate")
view.hash.on("reactivate")
view.hash.on("reactivate")

or view.router = new HashRouter();
or view.route = new HashRoute();

view.route = new Route({ name: view.name });
===
route(view.name, view); // ??


"hello" --> div("hello");
div("hello") --> use it

use("hello") --> return div("hello");
use(div("hello")) --> return it;
ensure()?




route("one"); // no button displayed automatically, but could be later.

Let's say you import something that already has defined its own route, maybe automatically...

How do you add a link to that route?  And how do you add that route as a sub route of this page?

These are the tricky questions.


Let's try and get organized.

I'm not sure if I can use the router to test the router, because things work a little differently.  So let's just make separate html + js files?





# HashRouteManager
A single instance that 



# Simple Usage

simple.router.add("name", {props});
simple.router.add("name", fn(route){
	// this === route?
});

simple.router.add("name", div(fn(view){
	// this === view
})); // auto classifies the view(s)

simple.router.add("name", { views: [tabbie, page, etc] });

const route = simple.router.add("name"); // all you need, then do it functionally

route.views.push(tabbie, page, etc);
route.activated = fn(){ tabbie.something(); page.fade_out(); }




simple.router.add({
	name: {props}
})
const route = 


How do we get from simple to the need for a class?  Because this should always be a logical progression.  First, we start without the class, and see how well we can do it.  And then ask ourselves how it would work if we used a class...

So, for 1 set of tabs on a page, we can just let the router render them:

route("name", () => {
	// use this as an immediately executed content function (IECF, or ice fn?)
	// the passed in value would then be the view

	// an alternative form might be an immediately executed initializer fn (init fn)
});

route("second", "str"?)

How/when do we render this?

Nested rendering?

Change Router.add to Router.route?
Or just alias .route to .add?

route("name", name => {
	name.route("sub", sub => {
		// rendered within the parent container, in order...
	});
});

or even

route("name", name => {
	route("sub", sub => {
		// this is cleanest...
	});
});  // money


route({
	name: {
		sub1(){

		}
	},
	name2: {
		...
	}
})


route() can just be a helper...
	return Router.add(...arguments).render(); // "auto" render

site.route = Router.route.bind(Router);
	// makes debugging a little quicker 


so, route.render() --> if we're capturing the views, we sort of need to activate?

When declaring routes, it's not guaranteed that they'll render...

In fact, nested routes don't really make much sense?
Well, you have 2 options:
1)  immediately activate/render (buttons and content)
	this has the recursive consequence of rendering all subs immediately

2)  only render content upon match
	still need to render the button(s) (aka initialize?)
	where do these go, what do they look like?
	when the url/#/hash/ matches, or when the button is clicked 
		(aka activation) 



It's almost like we need different types of routes..
- auto-routes (aroute()?)
- conditional routes (croute()?)

You could think of them as active routes vs passive routes...?
Active routes must be activated before they render.
Passive routes always render?

And so you sort of have 2 steps:  initialization (render button and maybe also the content) and activation (render content (once)).


If we declare some routes, how does this initially work?

route("one", content(){
	// only displays if /#/one/
	// is there a button?
	// or, we need to manually make it?
}).btn(); // add the button in place, and render the content in place upon activation?

Can we lazy render the content "in place"?  We'd have to put an empty placeholder div there, but that's not a big problem...


route.handle(view) --> view.click(() => this.activate());
or
route.activator(view);


In order to have a button elsewhere, you'll probably want to iterate through the routes...

simple.routes(); // render a list of the routes?


RouteGroup [route, route, route]..
- could just be parallel routers
- the routers don't NEED to deactivate each other
- each could listen for hash-change events (which they need to anyway), in order to 


It's reallly just the rendering structure.

It's more convenient to define the columns and routes in a normal fashion...
But then you basically have to iterate...

tabs.list() --> render the list of tabbies
tabs.tabbies() 


Maybe it's better to just keep the structures as raw as possible (routes).

routes = [];

Well, we already have a router...

route("one", ...);
route("two", ...);
route("three", {
	buttons: [a, b, c],
	views: [breadcrumbs],
	page: el
});

simple.router will, for most cases, be the root route.
Only when we start to nest routes will this change.

simple.router.active_route?


Also, putting the content with the route is a little tricky.  It's almost like you'd need to store all of them, and iterate...

routes = [];

routes.push(route("one"));

Or...

routes = {};

routes.one = route("one");

new RouteGroup().add({
	one: ...
});

Defining the content "in place" is ok, as long as it doesn't render in place.

routes = {
	one: route("one", content),
	two: route("two", content)
};

for (const path in routes){
	const rt = routes[path];
	// render list, or pages, or breadcrumbs, or whatever...
}

If each route has its name built in, then the array is just fine...

const routes1 = [
	route("one", content),
	route("two", content)
];

const routes2 = [];

routes2.push(route("one", content));
routes2.push(route("two", content));

This is where wrapping it up becomes useful.  Don't call it Tabs, that's less useful.

It's basically a RouteGroup...

new Routes(route("one", ...), ...);
new Routes().add("one", ...);
const routes1 = new Routes();
routes1.route("name", ...);
routes1.each(route => route.something());

Can this just BE a router?

new Router({});

Ugh, if we want custom behaviors, we have to extend the router...

class Tabs extends Router {
	// add methods for each route/tab
}

Then, when we add a route, it's using itself as the constructor...
And if we can have many simultaneous Routers..
	We should be careful of conflicts...

Yet - a conflict just means 2 routes will be activated simultaneously...?

If we don't need to deactivate the active route... Every root router could listen for hash changes, and re-activate/deactivate all its routes?  On hash change, we do need to rematch...  And rematch sequentially/carefully...

Do we re-check the currently active route?  Yes.  Rematch, and either continue to sub match, or deactivate and start at the beginning.

Tabs vs VTabs?  List and MultiColumnList?



route(...).switch(); // switches the rest off
route(...).toggle(); // only toggles the current one

But, if it's a toggle, does it even need a route?  Probably not...


pymple

synple

simtax

# HashRouter + Routes

Rather than have a Route/r class that doubles as a route group...

Should we have a single Route.router instance that tracks all the routes?

Do we need the same view for the Router and for each Route?
	This was actually pretty helpful for some views...

I was able to provide a render method for the Router, and all Routes would also use that render method..

It kind of needs to be different though, right?

And, in order to have multiple tab groups, we'll want rooted /#/hash/ namespaces.  Basically, the router we're adding routes to doesn't have a path...


# Simplest Use Cases

1)  Render all with no hash (test() usage)
2)  Multiple tab groups
3)  Render 


Can each route listen for changes, and activate itself?
route.activate() --> empty cb?  can't do it...




# Tests

test("one", t => {
	test("sub", t => {
		// ...
	});
});

The tests are basically just routes, but they can
a) appear with a little chrome
b) auto run/render
c) iso mode changes this, so they don't all run
	and maybe even display a different view...

class Test extends Router?
or 
class Test has a .router = new TestRouter?
and 
TestRouter extends Router?

The TestRouter could then specify all the config stuff.
The TestRouter could even work side by side with other routers...
It's really just a matter of when you want the code to run.  Where you want the buttons.  What happens when it goes iso, etc...

load --> 3 cases
	1.  no hash
	2.  hash, no match
	3.  hash + match


# Wrapped Usage

class Tabs {
	
}

const tabs = new Tabs(); // defaults to site.router, but could take a custom router?

tabs.add("name", {
	tab, label, content, whatever
});

// just creates a new interface, and also tracks and renders these Tabs vs another set of tabs on the same page...

It's the custom rendering that's really the issue, not the classification...

BUT, it's important to track/group some tabs for rendering, so that you don't have to create a variable for each tab w/ it's contents, and manually render/route them.




#  HashRouter vs ViewSwitcher

A view switcher is roughly separate functionality from the hash router.  They need to work together to make this HashRouting work...

HashPath and ViewSwitcher (or Pager)?

HashPath {
	tree structure, push, etc
	(no active path, activation, etc) ??
}

Pager {
	.views[]
	{ aliases }
	pager.sub.activate() ?

	// the pager could handle the activation stuff?
}

Separating these is tricky - it requires a lot of back and forth.  The HashPath, if it represents the current URL, could listen for URL changes, and establish an "active_path".

Just leave it...

But, we need another layer to the Router...
We need the raw hash path events (activate/deactivate) for some things, like tests?
And we need a simple API (route("name", content(){ ... })); so we can quickly setup hash path activation for specific content/views.

1. route("name", <viewable>) => route instance
2. route.activate() --> pushes /#/hash/ and triggers view.activate()

What are the higher level structures?

left sidebar
- one
- two
- three

			right side
			content

# Paging

- .views[], .classify(), .declassify()

Multiple activation buttons --> just call route.activate().
These buttons can all have .active classes...

How do we get from route("name", () => {}); to
- breadcrumbs + sidebar + internal links --> dynamic rightside content...?

How do we structure simple tabs?
-> class Tabs vs class Tabs extends Router?

const tabs = new Tabs();
tabs.add("tab", <viewable>);
tabs.add("tab2", ...);
tabs.add({
	tab1(){ ... },
	tab2: {
		// props
	},
	tab3: new Tabs().add({
		tab3_1: "string?"
	})
});



route.render(){
	this.view = div(this.content); // pretty simple...
}

Just use the route/r as the view controller?  Then we have a simple data structure without too much extra code.  If you create a Tabs wrapper, you have to have all the .add(), nesting, etc.


The problem with this approach comes if you want 2 separate tabs on one page.  You need one router in order to deactivate the currently active tab.

Also, I think I'll have some sort of scroll spy functionality, so that the anchor (hash?) changes as you scroll..?

Can you have <a id="/something/">?  I think that should work...
	Then when you click it, it'll automatically append /path/#/something/ to the url.

And when you scroll the page, it'll automatically change the url.


So, we can't just have one router.render() method.

We could potentially give a different .render() method to each route...

So, what we really need is a class that takes a .router as an input, and uses that to register it's stuff.

new Tabs({ router: lew42.router });

tabs.add({
	name(){
		// content
	}
});

tabs2.add({
	another(){
		// content
	}
});

Now the tabs can control themselves to a degree, render themselves, etc...


BUUUT... that's not so easy for simple routing.

Can't we still have route.add("name", view<.el>) --> auto routed?  Yeerrp


## Simple Switching

### Use body as container?

This could be the default for a simple Pager...

Or, you could provide a container: view.

What's the API?

router?

const pager = new Pager();

pager.page()?
pager.add()?


page("name", pg => {
	// content
});

// or

page("name", view); // use view as page container?

Or maybe it's better to just wrap everything....  Use the .page div as a functional wrapper.  We should never build any UI that is so dependent on the nesting structure that adding a dummy wrapper will break it.  Because that needs to happen, a lot.

	Drawbacks of additional wrappers:

	When you try to move things around, the CSS can break (if your CSS selectors are hierarchy-dependent).

	If you were try to drag/drop, the targeting might be a little tricky.  We might have to have mappings?  Well, you'd usually want to visually choose container vs content...

## Call it a page?

A test might not be a bad name.  But the tests could work a little differently.

What else could work?  Page is ok, but if we wanted Page to be a little more substantial/OO, then maybe we can come up with a different name?

Or maybe they're just sections, and they're wired up as... pagelets? poj?

sections
pages
pagelets

viewports

screen
panel
pane
window
widget
thingy
post

url.hash.page()



route isn't bad...

We can have class Router and class Route
The Router is recursive, and makes the actual hash routes.
The Route is a view controller?

Or just bake them together... And let Routes have views?
Or maybe just extend a base router, 

routes?

route("name", view);


Create a default router?
Default config --> use body?

In an actual site config, you can override initialize_router in order to either configure the router, or whatever.

import simple, { route }

route("one", r => {
	r.whatever()
});