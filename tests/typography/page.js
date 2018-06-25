import simple, { el, div, icon, test, assert, write, Page } from "/simple.js";

simple.stylesheet("/tests/typography/styles.css");

const page = new Page({
	title: "First Page",
	route: "first-page",
	content: content,
	test1(){
		test("this is just a test1", t => {
			assert("yes");
		});
	}
});

export default page;

function content(){
	test("h1", t => {

	});

	page.test1();
}