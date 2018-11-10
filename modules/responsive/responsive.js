import View from "/simple/View/View.js";

View.stylesheet("/modules/responsive/responsive.css");

// const ready = new Promise((res, rej) => {
// 	if (/comp|loaded/.test(document.readyState))
// 		res(document.body);
// 	else
// 		document.addEventListener("DOMContentLoaded", () => {
// 			console.log("DOMContentLoaded");
// 			res(document.body);
// 		});
// });

export default async function(site){
	const body = site.body;
	const view = site.html;
	// console.error("init");
	window.addEventListener("resize", () => {
		// console.log("resize");
		classify(body, view)
	});

	// window.classify = () => classify(body, view);
	
	// await ready;
	// console.log("init responsive classes");
	classify(body, view);
	// setTimeout(0, () => classify(body, view));
}

function classify(body, view){
	const styles = body.styles();
	const width = parseInt(styles.width);

	console.log(width);

	if (width < 800){
		view.addClass("small").removeClass("medium large");
	} else if (width > 1400){
		view.addClass("large").removeClass("medium small");
	} else {
		view.addClass("medium").removeClass("small large");
	}
}