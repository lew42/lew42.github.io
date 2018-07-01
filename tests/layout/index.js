import simple, { el, div, p, h1, h2, h3, icon, test, assert, write } from "/simple.js";
simple.stylesheet("/tests/layout/styles.css");

test("test5", t => {
	t.view.content.css("background-color", "#555");
	div(".grid3", grid => {
		div(".left").filler("1-3s");
		div(".right").filler("1-3s");
	})
});

test("test4", t => {
	t.view.content.css("background-color", "#555");
	div(".grid-layout", d => {
		for (var i = 0; i < 50; i++){
			div(".grid-item.grid-item-" + i, "item" + i).filler("1-4s");
		}
	});
});

test("test3", t => {
	t.view.content.css("background-color", "#555");
	div(".grid2", d => {
		for (var i = 0; i < 10; i++){
			div(".grid-item", item => {
				div(".card").filler("1-7s").click(d => d.remove());
			});
		}
	})
});

test("test2", t => {
	div(".section1.bg1.cards1", section => {
		div(".r.grid.three.pad-c.pad1-c.bg-shade1", inner => {
			for (var i = 0; i < 10; i++){
				div(".grid-item", item => {
					div(".card").filler("1-3s").click(d => d.remove());
				});
			}
		})
	});
});

test("test1", t=> {
	div(".section1.bg1", d => {
		div(".r.grid.two", { left(){
			this.addClass("box1")
			h1().filler("1s");
			p().filler("2-4s");
		}, right(){
			this.addClass("img-placeholder")
				.css("height", "15em")
				// .css("margin-bottom", "1em")
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