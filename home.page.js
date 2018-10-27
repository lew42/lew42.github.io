import lew42 from "/lew42.js";

lew42.responsive();

lew42.div("hello world");

// lew42.page.init(); // by default, so you can just start writing?
/*
But then, how do you configure a custom page?


Can Page import lew42?
- so page can use the initialized lew42 and its properties (body, head, etc)?

But don't we want lew42.Page?  So users can import lew42 and create a new lew42.Page?

We could instantiate the head/body earlier.
But this is a lingering problem: how do you create globals?

lew42.com/head/
lew42.com/View/
???

Let the lew42.prop mimic the lew42.com/prop/ ?
And all other urls?
No, the /modules/ can do this though

lew42.use(
	head,
	// head2,
	head3,
);

this is a great pattern for toggling
the majority of functionality can be managed like this?

You don't want too much config exposed, making it a mental monster.


*/