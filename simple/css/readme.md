CSS is such a stupid fucking runaround...

You can't possibly set it up to work in the long term.  But once you commit to a css class name, you're kinda screwed - because you'll probably start using it in other files, and then it's just.. fucked.

What you really need is a single source for your CSS class names.

And then it doesn't really matter what string you give it:

new Stylesheet()
	.select("selector")
		.padding() // ?

With a User Interface, this isn't a bad system.

Well, you still need to ID/export them.


Maybe what we really need are access logs.
	Whenever a CSS class is used, we record when/where?