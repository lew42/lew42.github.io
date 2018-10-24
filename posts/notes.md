Why not just keep all posts in one folder:

/posts/
	/2018/
		/oct/
			post_name.js
			another_post.js

And then load them...

a)  By making another directory?  No, then it makes sense to put the post_name.js into that directory...
b)  By dynamically loading them?

-> Make lists/sets of posts manually (import /path/to/post.js)
-> export [post_name, another_post, ...];

It's a little easier.. Maybe worth it for the short term?
- don't have to make so many directories
- but everything is just the root index?
	lew42.com/#/post-name/

Is the lazy loading acceptable?

index.js:
// initialize router/routes, request /path/to/my_post.js

my_post.js:
import page ?
import lew42, { stuff, page }


post.page = new Page(page => {
	// get reference to the new Page immediately
	But now you have a problem.  If you like assigning your constructor args, and you have functions coming in, you have the race situation.  {} then fn, or fn then {}?
	For the View class, you need to be able to assign a .tag property before prerendering.
	But, you want to prerender before initializing...
});

Also, you can achieve the same thing if you just skip auto initialization.

const page = new Page();
// now do stuff with page...

It would be nice to be able to just start writing...

import lew42, { el, div, etc }...

h2("Post Title");

p("This is my first paragraph.  I'm going to try putting the class at the end, see how it looks and feels.").addClass("intro");

p(".intro", "This is my second paragraph.  I actually like the simplicity of the .period thing.  It's an easy control, it's optional, easy to read, doesn't need an extra function call...");


But, that's a little tricky, could be prone to errors, and doesn't promote object oriented behavior.

The same thing could be achieved with a function:

export default new Page({
	title: "This is my Page Title"
}, page => {
	// put content here
If you wanted to save space, you could make an exception to the tabbing rule.

When it's a very familiar pattern, like this, it's easier to recognize/remember that you're inside a function, if it's a convention.

// end
})


class Whatever {
	constructor(){
		// preconfig
		this.use(...arguments);
		// initialize
	}

	use(){
		for (const arg of arguments){
			if (is.fn(arg)){
				arg.call(this, this);
			} else if (is.obj(arg)){
				this.assign(arg);
			}
		}
	}

	assign(){ ... }
}










instantiate(){} // manually setup everything in every class...
// this is only necessary if you're doing funny logging or other constructor stuff...
// there's no need to complicate things more than it needs to be, at the beginning...



new Fn()
	.args({ name: { config }, name: 5 (default value) })
	.add(new code.Condition(this.get("a"), code.gt, this.get("b"));
		// where this.get("a") returns this.props.a, the value object, that has its own name built in

* This can be done with proxies, and look like:  this.log.if(a > b, "a > b").then(() => ...)
* But then you wouldn't have everything automatically wrapped
* But without persistence and file templating, I can't create these things fast enough to be worthwhile.  Coding is like design - you have to move quickly and try things.  But its often very foggy.
* BUT, if you had everything automatically wrapped, you could do some cool stuff:
	 - Automatic logging, history, time travelling, etc
	 - Code gen
	 - Rename variables
	 - Fork functions
	 - Pipe data around
	 - Extend classes with UI
	 - Visualize the hierarchy/extensions







Proofreading services:
- reports, presentations, printed materials, web content, etc

Browser compatibility tests:

Design services:
- reports, presentations, copywriting, printed materials, web content, etc...



Surveys
Create a business around conducting surveys...?
Sure, but the more lucrative part might be not revealing the secret sauce...

A)  Survey Creation Service ($/survey)
B)  Business Consulting Services ($$$, premium)





simple.js
- Watch the Technical Introduction (3-5mins?) to see how simple it is.
or
- Watch the Getting Started video to jump right in
or
- Play around with the examples ---> [in the sidebar]
- You don't need to know JavaScript, the basics are easy.




Just create a super simple site, and start promoting it!