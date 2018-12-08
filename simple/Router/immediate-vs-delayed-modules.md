Immediate modules are much different.

You can define views at the root of the file (no callbacks or async).

# Delayed (controllable) Modules

Instead of just exporting a function, you can export an object, configure it, and run it later.

# Linking

If (when) a URL changes, all the links would break.  Unless you import the item's meta data?
	But then if it moves, you need to keep a pointer to the new location.

	import "/old/path/"; // --> to move the module to a new path without breaking it, we have a problem...

	this is why we need an access log...
	every time someone accesses the module, it records who and from where (the requester's current path), so you know to go update it.

It might be handy to have a root sitemap that contains pointers to all items.
And then all pages load the full sitemap automatically, in order to point to any item.