import simple, { el, div, p, route } from "/simple/simple.js";
import Router from "../Router.js";

simple.View.stylesheet("/simple/Router/Router.css");
simple.page_1();

// simple.router.log = true;

div.c("item pad", "reset").click(() => simple.router.activate());

route("one");

route("two", two => {
	console.log("I'm route two.  I will run only once.  What if I want this to run on every activation?  { reactivation: true }");
});

route("three", function make(){
	this.make(3, make);
});

simple.router.make(4, function make(){
	this.make(4, make);
});