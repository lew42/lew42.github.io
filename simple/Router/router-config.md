# Auto initialization?
Delayed matching can be useful:  give a chance to add routes, and only THEN match.  Rather than rematch when new routes are added...

# Reload Page?
Upon activation, reload the page.  This clears the console/page memory, and is handy for some tests.

The opposite - HMR, is a little tricker.

# No hash? --> activate();
Handy for tests

# Route reactivation?
If a route is already active, and it's .activate(), does anything happen?
- A tree item might want to toggle itself...
- Maybe 1 click selects it, and 1 click minimizes?

# route.deactivate() - Standalone Deactivation?
If we call route.deactivate(), what happens?  It's sort of like toggling.  Do we just activate the parent?

# Sequential Activation/Deactivation
Currently, if a child route is activated, we deactivate the parent (and all ancestors), and then activate the child (which reactivates those ancestors).

# Leave parent activated?
This differs for complete switching vs menus.  I suppose the CSS can dictate the presentation.  But maybe other words other than just activation might be used...

# Animation?
The sequential activation/deactivation was pretty slick.  Maybe I can find that code... 


# Render 2 (and keep them synchronized?)
This is just a matter of calling the render function(s) again (prerender, render, etc)