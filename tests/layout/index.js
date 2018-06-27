import simple, { el, div, p, h1, h2, h3, icon, test, assert, write } from "/simple.js";
simple.stylesheet("/tests/layout/styles.css");

test("test1", t=> {
	div(".section1.bg1", d => {
		div(".grid.two.centered", { left(){
			h1().filler("1s");
			p().filler("2-4s");
		}, right(){
			this.addClass("img-placeholder order1").css("height", "15em");
		}});
	});
});

test("centered.mw-40em", t=> {
	div(".centered.bg-white.mw-40em").filler("2-4s");
});

test("centered.w-80.mw-40em", t=> {
	div(".centered.w-80.bg-white.mw-40em").filler("2-4s");
});

test("centered.w-80", t=> {
	div(".centered.w-80.bg-white").filler("2-4s");
});

test("centered.mw-80", t=> {
	div(".centered.mw-80.bg-white").filler("2-4s");
	t.view.footer.append(p("max-width: %, by itself, acts like width: %"))
});