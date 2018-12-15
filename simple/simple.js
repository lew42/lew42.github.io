import Site, { el, div } from "./Site/Site.js";

const simple = window.simple = new Site({
	page_1(){
		this.body.addClass("body-1")
		this.View.set_captor(div.c("paper bg-white"))
	}
});
simple.el = el;
simple.div = div;
export default simple;
export const route = simple.route.bind(simple);
export * from "./Site/Site.js";