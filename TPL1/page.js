import simple, { el, div, icon, test, assert, write, Page } from "/simple.js";

// simple.stylesheet("/TPL/styles.css");

console.log("a");

const page = new Page({
	title: "First Page",
	route: "first-page",
	// content
	// content: v => "yo!@#"
	content: () => `${page.title} (${page.route})`
});

console.log("b");

export default page;

console.log("c");

function content(){
	console.log("rendering page");
	div(".class", "test");
	return "yoyo, this is page: " + page.title;
}

console.log("d");