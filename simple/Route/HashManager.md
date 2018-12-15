# HashManager

The hash matching needs to be dynamic.  Trying to re-assign partial hashes to each route is stupid.

So in the route.is_match() method, we iterate the whole damn thing?

Maybe going with the levels is smart.


Just blindly look at the hash[this.level()]??
Hmm.. doesn't seem as smart.  But it might work just fine.
What about `if (this.parent.is_active())` ?



Should be mostly invisible to the user and even the developer.  This is a singleton class/instance that works with the Routes to coordinate basic hash events.

hash.push(route) // ?


Should the hasher be a route?
It sort of needs the .routes{}
It might need to classify some .views[]