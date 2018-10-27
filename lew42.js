import Lew42 from "/modules/Lew42/Lew42.js";

const lew42 = new Lew42({
	content(lew42, view){
		lew42.div.c("paper1", paper => {
			lew42.h1("Hello World");
			paper.filler("1p");
			lew42.div.c("full bg-eee", "full content");
			paper.filler("2p");
		});
		lew42.div.c("paper1", paper => {
			lew42.h1("Hello World");
			paper.filler("1p");
			lew42.div.c("full bg-eee", "full content");
			paper.filler("2p");
		});
	}
});

export default lew42;