import simple, { el, div, icon, test, assert, write, Pager } from "/simple.js";
import layout from "./layout.js";
// simple.stylesheet("/TPL/styles.css");

const page = new simple.Page({
	title: "Tests",
	route: "tests",
	content,
	layout
});

export default page;

const tests = ["typography"];

const dynamic_tests = ["layout.js"];

const preloaded = ["layout"];


function content(page_view){
	const pager = new Pager();

	for (const test of tests)
		el("a", test).attr("href", "/tests/" + test + "/");

	// for (const dynamic_test of dynamic_tests){
	// 	div(dynamic_test).click(d => {
	// 		el("script").attr("src", "/tests/" + dynamic_test)
	// 			.attr("type", "module")
	// 			.appendTo(document.head);		
	// 	});
	// }

	for (const preloaded_test of preloaded){
		pager.add_page({
			name: preloaded_test,
			content: page[preloaded_test]
		})
	}

	pager.add({
		one: 1,
		two: true,
		three: "three",
		four(page){
			page.addClass("wrap");
			page.append("hello world");
		},
		five: div(".page.wrap", "test")
	})

}