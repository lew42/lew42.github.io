import Lew42, { el, div, View } from "/modules/Lew42/Lew42.js";

const lew42 = new Lew42({
	// content(lew42, view){
	// 	div("404");
	// }
});

function a(){
	return new View({
		tag: "a",
		href(href){
			return this.attr("href", href);
		}
	}).append(...arguments);
}

export default lew42;
export * from "/modules/Lew42/Lew42.js";
export { a }