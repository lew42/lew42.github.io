import simple, { el, div, icon, test, assert, write, Page } from "/simple.js";

// simple.stylesheet("/TPL/styles.css");

const page = new Page({
	title: "Tests",
	route: "tests",
	content
});

export default page;

const tests = ["typography"];

const dynamic_tests = ["layout.js"];

function content(){
	for (const test of tests)
		el("a", test).attr("href", "/tests/" + test + "/");

	for (const dynamic_test of dynamic_tests){
		div(dynamic_test).click(d => {
			el("script").attr("src", "/tests/" + dynamic_test)
				.attr("type", "module")
				.appendTo(document.head);		
		});
	}
}