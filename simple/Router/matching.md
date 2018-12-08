# .match() and .rematch()

## immediate initialization/matching

In the case of immediate matching, we .match() and .activate() within the constructor.

	new Route() --> initialize_route() --> match() --> if match, activate();

This means the parent is activated before we get to the children..


# rematching

How do we prevent the callback from rematching?
- window.hashchange() --> rematch?


Shouldn't the rematch just validate the current route is already active?

Sequential activation kills it.
If a /one/two/ sub route is active, when we rematch from the beginning, we re-


We could block the hashchange event when actively transitioning?


But, shouldn't it "just work"?
Do a full unnecessary rematch?

Well, this is better.  But it should probably have worked anyway.  The .rematch() could only happen if hash doesn't match...

We could try active_route.path() == window.location.hash.substring(1)

  "/one/two/three/"