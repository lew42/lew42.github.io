import simple, { el, div, p } from "/simple/simple.js";


if (!simple.theme)
	simple.body.addClass("body-1");

div.c("paper-1", d => {

	el("h1", "Strategy");
	
	p("Use this for notes, from now on?  Get my drawings in here too.  Organize the shit out of it.");

	p("The problem is that it's not so quick.  It takes a long time to setup a new URL, and make sure I have a link to it.");

	p("The router will help with this.  To import files without having to create entire directories.  But I'll still need some fs help to auto-dir.");

});

