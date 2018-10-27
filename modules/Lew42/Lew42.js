import Site, { el, div } from "/simple/Site/Site.js";
import responsive from "/modules/responsive/responsive.js";


export default class Lew42 extends Site {

	initialize_css(){
		this.View.stylesheet("/simple/css/base.css");
		this.View.stylesheet("/modules/Lew42/lew42.css");
	}

	prerender(){
		this.render_head();

		// this.body.append(this.content.bind(this));
		// this.body.append(body => this.content()); // captured, equivalent to:
		// this.body.append(function(body){
		// 	this.content(); // wrapped in a function, captured
		// });
		// this.body.append(this.content()); // only appends the returned value...

		// this.body.append_as("lew42", {
			// prefixes everything with lew42-
		// });

		this.body.append({
			header: el("header", this.header.bind(this, this)).addClass("lew42-header"),
			main: el("main").addClass("lew42-main"),
				// addClass(content), and sets up lew42.body.content
			footer: el("footer", this.footer.bind(this, this)).addClass("lew42-footer")
		});
	}

	render(){
		this.content && this.body.main.append(this.content.bind(this, this));
	}

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

	responsive(){
		responsive(this.body, this.html);
	}
}

Lew42.prototype.assign({
	// Post, Page, etc..?
})


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