import Site from "/simple/Site/Site.js";

export default class Lew42 extends Site {

	initialize(){
		this.render(); // auto render?
	}

	render(){
		this.head();

		this.body.append(this.content.bind(this));
		this.body.append(body => this.content()); // captured, equivalent to:
		this.body.append(function(body){
			this.content(); // wrapped in a function, captured
		});
		this.body.append(this.content()); // only appends the returned value...

		this.body.append({
			content: this.content.bind(this, this),
				// addClass(content), and sets up lew42.body.content
		})
	}

	content(lew42, view){}

	View: View, // error, can't do this
}

Lew42.prototype.assign({
	View, el, div, etc,
	Post, Page, etc..?
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