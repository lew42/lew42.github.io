# matching

1. route.push or a.href
2. hasher.hashchange
3. ?rematch?
4. route.activate(); // trigger animation, show content, whatever.

Can we do the rematching entirely from the Hasher?  I don't know if this is a good idea, because then we can't override that behavior as easily.

first find the deep match (target), and just activate it?
so, activation is completely independent of the hash?
i'm ok with this.

/a/one/
/b/two/

can hashless groups be active (have the .active_node)?  probably not?

## url-first routing (hashchange then activate)
vs
## sequential activation THEN push url (can even animate url)


# .push() vs .activate() and .activated()

One issue I see, is that plain old UI elements, like tabs/expandos, might have an .activate() method, where .push() doesn't make much sense.  Ctrl.activate() --> ctrl.route.activate() makes sense.

Well, if the new workflow is different...

don't route.activate(), just route.push() --> hashchange event will trigger rematching and activating...

Or, route.activate() could just do the push.  Or if the path already matches, you could setup reactivation, if you wanted to do some funky stuff.

I don't see the problem with using route.push()..

Also, I don't see a problem with using standard anchor links.
route.a(display = this.name);

# Root Routes and RouteGroups?

Root routes don't have a hash?

Can you have routes within routes that don't have a .name/.path/.hash?
These would automatically run.  They'd basically just be packages of routes..

This is how I was going to make tabs.

tabs.render_list();  tabs.render_pages();

The tabs don't need their own /#/tabs/.
But each tab can have its own /#/anchor/

The tabs route could still have some functionality:
.reset() // deactivates currently active tab, and...?
.active // true/false, if any of its children are active?  uh oh, this is a little different...?  i suppose it would usually be true, by default (display the first tab), but could be completely deactivated...?
.on("event") // animate, or whatever..


# Sequential vs Reactive

route.activate() --> parent.deactivate() --> etc...

Instead of immediately forcing the changes, could we only push the hash, and let the hashchange event force the rematch?
- this eliminates a pathway
- instead of using hashchange --> rematch && active activation --> block hashchange, we could just 

hash.push(route); // changes the /#/hash/path/, triggers hashchange event, rematches, etc..

In fact, this is hardly different from a simple <a href="#/hash/path/">tag</a>.  But, route.activate() is a little more object oriented.

If I used route.push() as the activator, and route.activate() as the callback...

route.push() --> route.hash.push(this);

route.hasher === HashManager
route.hasher.push(this);

hasher.hashchange === window.hashchange cb
--> iterates all routes and updates their .hash to be a single string, or false

This can keep all routes in sync...


## prerender, rerender, split views, etc

Sometimes insta-render is ok.  But often we want to setup the routes, export/import, organize, create containers, etc - and we don't necessarily want them rendering right away.

So, we should allow more control over how/when it renders.

Also, the rendering process...

But I've already figured out these patterns:

new Route(); // doesn't render.

route() --> new Route().render(); // ??





## RouteCtrl vs .views[]

The RouteCtrl is just a view.  But it's a good term for a view that interacts with an instance.

route.ctrls[]  // any route could be rendered any number of times
route.render() --> renders/returns a ctrl (view)

route_ctrl.views[] // a simple way to track all the sub-views that need to be classified




## .active, .active_parent, .active_ancestor, .active_node...

These boolean states that are also CSS classes could be standardized.  You wouldn't want them to bloat the program, but they could function mostly as they do, only be a little more... object oriented?

route.active.value() ?


Or maybe it's just set of methods that work together.

route.on("active");
route.when("active");
route.off("active"); // when it's no longer active?
route.state("active");

events + state

route.state("key", value);
route.set("key", value);

route.on("key", cb);


This gets tricky...