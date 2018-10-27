# lew42.github.io

/modules/
/templates/
/lew42.js

## Auto capture:

/some/post.js:

import lew42, { etc } from "/lew42.js"; 

lew42.render(){
	// renders some default content, sets default container (captor)
}

p(".intro", "Hello World");

The simplest case,

site.render(){ // this could be default, unless you change it...
	site.View.set_captor(document.body);
}

// now, we're simply injecting into the body.. super simple no frills

text("hello world"); // <body>hello world</body>
div("hello world"); // <body><div>hello world</div></body>
div(".hello", "world"); // <body><div class="hello">world</div></body>


/simple/Site/Site.js?

class Site {
	render(){
		this.View.set_captor(document.body);
	}
}


class Lew42 extends Site {
	render(){
		this.head(); // <title> and such
		this.header = this.header();
		this.content();
		this.footer();
	}
}

/lew42.js

import Lew42 from "/modules/Lew42/Lew42.js";

export default new Lew42(); // ?

The only problem I see here, is that there's only 1 default export.

You could export all the things manually...

const lew42 = new Lew42();

export default lew42;
export const sub = lew42.sub;




Where possible, the js obj structure can mimic the dom structure:

site.body <---> document.body
	site.body.addClass(...).on("click")...

site.body.header
site.body.container
site.body.footer


Can we promote all references all the way to the nearest... Component?

site.body.append({
	header: () => this.header(),
	header: {
		nav: div()
	}, // or
	header: div(".extra", {
		nav: ...
	})
})

this.header(){
	div({
		nav: ...
	});
}


If all Template refs are merged up...
- when you .append a child template, that might have .refs{ name: child_view },
- we can automatically promote all of these?

You could override the references() method, in order to manually promote some of them...


But this is a first step to tracking all CSS classes.
If we can strive for view properties that match CSS class names, while avoiding conflicts, we have a nice little system...

thing.header.title
thing.header.title.icon
thing.header.menu_btn


And we'll strive to avoid `this`, when possible...

View {
	content(view){

	}
}

class Button extends View {
	content(btn){

	}
}

class Thing {
	render(thing){
		return new ThingView({ thing });
	}

	content(thing, view){
		view.addClass(thing.type);
	}
}


class ThingView extends View {
	instantiate(){
		assign();
		bind();
		prerender();
		initialize();
	}

	content(view, thing){
		view.addClass(thing.type);
	}

	bind(){
		// bind all methods? (slow, and doesn't auto-bind newly added fns...)
	}
}


## Element vs View?  ElementAPI?

class ElementAPI {
	addClass(){ throw "override me"; }
	...
}

class Element extends ElementAPI {
	...
}

class View extends Element?
	- here we can add the capture stuff?
	* BE CAREFUL: if you move the capture stuff to a higher level, then div() won't work to capture...
		- unless you redefine them to use the View constructor, rather than Element class...

Maybe the API management is better for Proxies, so we can listen to everything.