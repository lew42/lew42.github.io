import Lew42 from "/modules/Lew42/Lew42.js";

const lew42 = new Lew42();

lew42.render();

export default new Lew42({}); // can just build in auto-render...

// is it better to import all the things here?

export default new Site({
	View, el, div, etc... // what does Site do?
});



Page > Layout > Content

Site > Layout > Page > Content

body > wrap > header
			  pages
			  		page
			  			content 
			  footer


simple is a site?