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