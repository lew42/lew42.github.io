# activate(false)
The soft push.  When loading, we need to call the activation callback (.activated()) and setup the route as the current route (.activate_route()), without actually resetting the hash (which might make a new history entry).

Actually, it seems it doesn't.  And, reactivation might not be a huge issue..

Especially if we're protecting against re-rendering.


# Router and Route vs hybrid
If we want a Router class and separate Route class, then we can't easily extend it to have custom functionality.  This might be more of a pain than a benefit...

Right not it seems to work alright.  And, the recursive nature is kind of cool.  

But, if I move towards externally rendering the Router, then a separate Route class might not be a bad idea...


# Multiple views (.views[])
Breadcrumbs, sidebars, links, etc.


# Animations?

