/*
Get something simple working, and use it to make something better.

route("hash", () => fn/content).render(); // ?

This is the simplest pattern.  But without a button..  Should we auto render a button?


The issue arises that a list of these things will produce some funny buttons...

Also, they don't really work with the preview/iso mode.

Do they reload the page?

*/


route("one");


route("one", { props });
route("one", content(){});
const one = route("one");

route("one", () => {
	div("hello world");

	route("sub", rt => {
		// nestable

		div("hi");
	});
});

/*

By default, do we hide all but the first one?
Are we trying to build tabs here?
Or test blocks?

It almost seems like default route() is useless?
- no buttons (could be added to an admin panel)
- no switching/rendering rules (could be conditional rendering)

Only render if/when the hash matches, otherwise continue...

Then, all you need to do to make a button, is to make an anchor link...

a("#/thingy/", "Thingy");


# Do we need plain old `route()`?
It's basically like a condition, based on the hash path...

route("one", () => handler/content... );

It's basically the bring-your-own navigation concept.
Rather than prebuild all the recipes, you just decide when/where you want your buttons/content. 


Ahh, yes, the VIEWPORT
Where does the content go?

1)  In place - it just toggles its visibility (don't even need a container)
2)  Wrapped - probably want a very specialized wrapper class



We need Tabs, whether they're routed or not...

*/