import simple, { el, div } from "/simple/simple.js";
import snarkdown from "https://unpkg.com/snarkdown@1.2.2/dist/snarkdown.es.js";

export default function(markdown){
	const d = div.c("markdown");
	d.el.innerHTML = snarkdown(markdown);
	return d;
}