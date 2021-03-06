import Site, { View as _View } from "/simple/Site/Site.js";
import responsive from "/modules/responsive/responsive.js";

class View extends _View {
	bg(css){
		this.css("background", css);
		return this;
	}

	color(css){
		this.css("color", css);
		return this;
	}
}

export const { el, div, h1, h2, h3, p } = View.elements();

View.prototype.test1 = function(){
	this.append(h1().filler("3-7w")).filler("2-5p");
	return this;
};

export default class Lew42 extends Site {

	// constructor(){
	// 	this.instantiate(...arguments);
	// }

	// instantiate(){
	// 	this.assign(...arguments);
	// 	this.initialize();
	// }

	// initialize(){
	// 	this.initialize_html();
	// 	this.initialize_head();
	// 	this.initialize_css();
	// 	this.initialize_body();
	// 	this.initialize_dev();

	// 	this.prerender();
	// }

	// initialize_css(){
	// 	super.initialize_css();
	// 	this.stylesheet("/modules/Lew42/lew42.css");
	// }

	// prerender(){
	// 	this.render_head();

		// this.body.append(this.content.bind(this));
		// this.body.append(body => this.content()); // captured, equivalent to:
		// this.body.append(function(body){
		// 	this.content(); // wrapped in a function, captured
		// });
		// this.body.append(this.content()); // only appends the returned value...

		// this.body.append_as("lew42", {
			// prefixes everything with lew42-
		// });

	// 	this.body.append({
	// 		header: el("header", this.header.bind(this, this)).addClass("lew42-header"),
	// 		main: el("main").addClass("lew42-main"),
	// 			// addClass(content), and sets up lew42.body.content
	// 		footer: el("footer", this.footer.bind(this, this)).addClass("lew42-footer")
	// 	});

	// 	View.set_captor(this.body.main);
	// }

	// render(){
	// 	this.content && this.body.main.append(this.content.bind(this, this));
	// }

	render_head(){
		// this.head.append(el("title", this.page.title))
		this.head.append(el("meta").attr("name", "viewport").attr("content", "width=device-width"));
	}

	render_body(){
		this.body.append
	}

	header(lew42, view){
		div("lew42").addClass("lew42-logo");
		el("nav", {
			one: "one",
			two: "two",
			three: "three"
		}).addClass("lew42-nav");
	}

	container(lew42, view){}

	footer(lew42, view){
		return "footer";
	}
}

Lew42.prototype.assign({
	// Post, Page, etc..?
})

export * from "/simple/Site/Site.js";
// export const { el, div, p, h1, h2, h3 } = View.elements();
export { View };
/*


Argument appending?

this.content.bind(this, this);

then when we append a function, instead of calling fn.call(this, this), we do:

fn.call(this, ...arguments, )

!!!

When you bind a function with arguments, and then call it, the new args get automatically appended.

fn1 = fn.bind(ctx, 1);

then fn1(2) ==> calls fn with 2 args, [1, 2]


In this case, forget `this`, and focus on argument order.

The argument bound with this.context.bind(this, this) will remain the first arg, so 

content(lew42, view){}

will happen by default...  perfect.
*/