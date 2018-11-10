import lew42, { el, div, h1 } from "/lew42.js";

// div("hello world");

div.c("r-cols",
	div.c("left pad").bg("#333").color("white").test1(),
	div.c("center pad").bg("#eee").test1(),
	div.c("right pad").bg("#555").color("white").test1()
);

div.c("r-cols", 
	div.c("left pad").bg("#333"),
	div.c("right pad").bg("#eee").test1()
);

// div() // toggleable
	// .addClass("whatever")
	// .append("...")

div.c("paper1").test1();

// div.c("flex", left => {
// 	h1("Left");
// }, right => {
// 	h1("Right");
// });

div.c("r-cols", {
	left(left){
		left.addClass("pad");
		h1("Left");
	},
	right(){
		h1("Right");
	}
});

div.c("r-cols", {
	left: div(h1("Left")),
	right: div(h1("Right"))
});


// These DONT work as I expected - I forgot these don't get their own divs
// div.c("flex", left => {
// 	left.append("left");
// }, right => {
// 	right.append("right");
// });

// div.c("flex", left => {
// 	return "left";
// }, right => {
// 	return "right";
// });


div.c("paper1", paper => {
	h1("Hello World");
	paper.filler("1p");
	div.c("full bg-eee", el("h3", "IMPORTANT"));
	paper.filler("2p");
});
div.c("paper1", paper => {
	h1("Hello World");
	paper.filler("1p");
	div.c("full bg-eee", "full content");
	paper.filler("2p");
});
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