HashManager {}
- hashchange event
- only one instance (singleton)

Route {} (aka router or route group?)
- still has .routes{}

- track each .active_child?  this doesn't really matter so much... 



We need a root route manager.
- To listen for hash changes.
- To separate the router functionality from the Route class.

We need to organize this...

We need RouteViews?
- but we need .views[] on the Route?

Should we call these Ctrls?
- route.ctrls[]

And each RouteCtrl can have a set of .views[]?

This is a little confusing, but it sort of upgrades the concept of a dumb view to a functional controller.  And coupling an object to its controller(s) is important.





init -> new RealLogger().fn
	// this.log()
	// this.log.whatever()

