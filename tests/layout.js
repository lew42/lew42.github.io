import simple, { el, div, test, Pager } from "/simple.js";

export default function(){
	div("hello world");
	new Pager().add({
		one: 1,
		two: true,
		three: "three",
		four(){
			new Pager().add({
				a: "a",
				b: "b",
				c: "c"
			})
		}
	}).addClass("light");
}