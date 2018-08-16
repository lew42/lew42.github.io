import "/simple/dev/dev.js";
import View, { el, div, p, h1, h2, h3 } from "/simple/View/View.js";
import SVG from "/simple/SVG/SVG.js";

View.stylesheet("styles.css");

div(function(){
	this.append("hello");
});

div(function(){
	this.addClass("inner-bg flex");
	const x = 0, y = 0, r0 = 400, ri = 200;
	this.el.innerHTML = 
			`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500' width='100%' style='display: block;'>
				<g>
					<circle fill='#000000' cx='${x}' cy='${y}' r='${r0 + 5*ri}'/>
					<circle fill='#180d1c' cx='${x}' cy='${y}' r='${r0 + 4*ri}'/>
					<circle fill='#261431' cx='${x}' cy='${y}' r='${r0 + 3*ri}'/>
					<circle fill='#351947' cx='${x}' cy='${y}' r='${r0 + 2*ri}'/>
					<circle fill='#451e5e' cx='${x}' cy='${y}' r='${r0 + ri}'/>
					<circle fill='#552277' cx='${x}' cy='${y}' r='${r0}'/>
				</g>
			</svg>`;
});
