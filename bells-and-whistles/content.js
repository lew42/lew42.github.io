import lew42, { el, div, h1, p, View, a } from "/lew42.js";
export default function(){
	return div.c("paper", d => {
		h1(
			el("span", "Bells")
				.addClass("color-primary")
				.style({
					// color: "var(--prim)"
				}), 
			el("span", " & ").addClass("ampersand"), 
			el("span", "Whistles").style({
				"position": "relative",
				"z-index":"-1"
			})
		).style({
			// "text-transform": "uppercase",
			"letter-spacing": "-2px",
			"position": "relative",
			"z-index": "1"
		});

		p("I need some ", el("span", "inline").style({
			// "background": "#eee",
			// "border-bottom": "2px solid var(--primary)"
		}), " styles.  And what about ", el("a", "anchor").attr("href", "#"), " styles?");
		
		const fonts = ["Times New Roman", "Trebuchet MS", "Arial", "Verdana", "Tahoma"];

		const sel = el("select");
		
		fonts.forEach(font => sel.append(el("option", font)));

		sel.on("input", function(){
			lew42.body.style("font-family", sel.el.value);
			console.log(sel.el.value);
		});

		p("Or ", el("a", "anchor").attr("href", "#").style({
			// color: "var(--primary)"
		}), " styles with primary color?");

		p().filler("3s").append("  And then we add a span.special right ", 
			el("a", "down here").style({
				// "border-bottom": "2px solid var(--primary)",
				// "cursor": "pointer",
			}), 
			" in the middle of this sentence. ").filler("2s").style({
				"line-height": "1.5em"
			});

		p().filler("1s").append(" And here's another ", a("test").href("#/unvisited/"), " anchor.");
	});
}