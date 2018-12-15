# router.active_route  -- / -- / --> deep pointer

vs 

# each route.active_route --> either undefined, or one of its .routes{}
(this is how I used to do it, with .activeChild, see github.com/lew42/route42/.../Route4/Route4.js)
	not sure the pros/cons...


Maybe this is way better?

each route might have an .active_child?
It would make sense that a parent route should know this...
Do I have an .active_child() method right now?  Yes, not sure if it works (haven't used the method).

Let's try it...?
What's the benefit of this way?  We don't have as many pointers to deal with...
In some ways mine is currently better.  And it's done/working.


"manageability" [ 0 -- 100 ]
- easy to read?
- easy to understand?
- easy to extend, without studying?
- self evident
===> simple...


Caching the .active state, .active_child, etc...  This might not be terribly difficult to keep it in sync.  Similar to the classify() method: loop through all active ancestors and set their mode/state.

Maybe these modes/states can be standardized and pluggable?
Logging could offer one way to hook in...


When we activate any arbitrary route (or the router), and any arbitrary route might be currently active (including the router), how do we sequentially deactivate the proper routes until we get to the common base route, and then proceed forward again?

I think my algorithm worked pretty damn well...

BUT I don't need this right now... I just need a working router for tests.





ToDo:

1.  Create the simplest routers, and try to visualize all their dynamics.
2.  Reuse these visuals..
3.  Build the basic UI (toggles/expandos/tabs/pages)
4.  Add routing for persistence





Basic Structures

Tree:

item1
	item1a
	item1b
item2
	item2a
	item2b


Capabilities
- drag and drop
- selections (sequential, cherry pick, relative?)
- query (search, filter, sort)
- copy+paste
- save/embed/move/tag (organize)
- templating (choose different views (grids, etc), per list or per item)




# Shared structure?

This could be used for views, routes, items, pages, etc.

.each() => could iterate through the dynamic tree, only choosing the necessary items..

.walk() => could iterate in a deep fashion, or walk through it

root
	a
		a1
		a2
		a3
	b
		b1
		b2
		b3

Do we want to go a, b, a1, a2, a3, b1, b2, b3 (level by level)
or a, a1, a2, a3, b, b1, b2, b3 (iterate each item at its full depth)

Or a hybrid approach could make a choice for each item or level.  Do we want to iterate this item on a level-by-level basis, or do a deep dive?

.dive() vs .swim() 

route.routes === page.pages ?
// they're both just lookup tables..

But they point to different things... But they don't have to.

route.route("getset"); --> route.get()
route.route("getset", ...) --> route.set()

And route.routes --> tree pojo, where route.routes[name] --> tag pojo

Each tag pojo is basically { parent, route: ..., page: ... }

So that we can use a single hierarchical structure for multiple (related) classes.  This isn't because it's conceptually easiest.  It's because it's programmatically easiest. 


How can 2 classes use the same underlying (tree) structure?

Instead of route.routes{} and item.items{}, we could have:

route.tree and item.tree use the same tree structure...

The tree instance could mostly work like an object, but could be easily upgraded with plugins, ui, etc..

The Tree/Item system..  An item is a tree?  Or can be... 
An item could just describe an object with more functionality...


It's all about the collections...
Well, an item can be a collection...



# Parallel Structures

In some cases, we want certain functionality (like stacking order while drawing with layers) to follow the layer order.  However, what if you want most of a layer to go one way, but you want part of a layer to stack another way...

Or, you want positioning to generally follow the parent, but in some cases, you want to break free from this model, and specify an alternate procedure.

Or what if .. ugh what was that last one.  Had something to do with general organization?

Or... Defaults > Overrides?

Can't remember.

But it's basically when you have a generic nesting UI, and you have functionality that piggy backs on that structure.  And then you want to deviate from that structure.

You need to create parallel structures that are mostly the same, or follow the same rules for most of the structure, but can deviate for part of it.

I think it might have been the positioning or layer stacking stuff.

You want the majority of the document to follow the standard rules, but have some way to deviate...?

I think it'll become clearer...

It's probably mostly doable with custom conditional rules that allow you to link certain properties/features to certain items only in certain cases.