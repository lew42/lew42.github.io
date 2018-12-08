import lew42, { el, div, h1 } from "/lew42.js";

/*

Is a "tab" a set of {tabbie + page/content}, or does "tab" mean the little tabbie?

I think name-->label is a good one.  We can use the .name property religiously, and get it from a smart add (.add({ name: {props} });)

Then we don't usually need to worry about the tabbie, unless we want to.

So... a group of "tabs" is just an arbitrary set of related views that have related switching behavior (either mutually exclusive, or mutually allowable).

So, in a sense, all we need is to add these .views[] to the .route ?
But, we need a way to... deactivate the current one?  done.

route.deactivate --> for each .views[], view.deactivate() ?
	no, some .views are buttons...

route.deactivate --> for each .views[], view.declassify()...
	unless there's a .deactivate method, that's a pretty simple setup


How do we get from Router to RouterView or Tabs?

Maybe the router should just default to view functionality?
Instead of router.add("route", { activated(), deactivated() }), we just do
router.add("route", <viewable>)

1.  if name is pojo --> iterate
2.  if props is viewable --> add to .views[]
3.  if props is pojo --> use as props

limitations:  you can't use a pojo as a viewable, in this situation, but you can just wrap it in a div if that's what you want...

So, how does it work?

route.add("name", fn(){}) --> viewable?

Why not just manually upgrade like this:

route.add("name", div(fn(){
	// now it becomes clear that this is a view...
}));

Is that all we need?

How do you structure the buttons/pages in separate columns?

router.add("name", rt => {
	div("btn name").click(() => rt.activate());


});

But, we really need to iterate through the routes in separate locations?

div.c("left", () => {
	for (const rt of router.routes){
		div("btn", rt.name).click(rt.activate);
	}
});

div.c("pages", () => {
	for (const rt of router.routes){
		div.c("page", rt.content?);
	}
});

tab.name
tab.content

router.routes

route.render()
	this.view = div(this.content);

*/

class Tabs extends lew42.View {
	// initialize(){
	// 	this.prerender();
	// 	this.render();
	// }

	// render(){
	// 	this.content && this.append(this.content);
	// }

	render(){

	}

	// or render_tab() ?
	// or .tab.render() ?
	tab(){

	}

	add(name, props){
		if (is.pojo(name)){
			for (const n in name){
				this.add_tab(n, name[n]);
			}
		} else {
			 return this.add_tab(name, props);
		}
	}

	add_tab(name, props){

	}
}

new Tabs().append("my tabs!");

/*

tabs.add({
	tab_name: "tab content",
	tab_name: {
		tab: "tab-label",
		content: "str",
		content(){}
	}
})

*/

lew42.router.add("test1", {
	activated(){

	}
})

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