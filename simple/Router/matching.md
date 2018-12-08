# .match() and .rematch()

## immediate initialization/matching

In the case of immediate matching, we .match() and .activate() within the constructor.

	new Route() --> initialize_route() --> match() --> if match, activate();

This means the parent is activated before we get to the children..