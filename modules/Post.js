import simple from "/simple/simple.js";

export default class Post extends simple.Post {
	
}

/*

DOM -> Object Structures

el = document.createElement()

class View {}
class CustomView extends View {}

class Person { render(){} }
class PersonView extends View { }

class Thing { render(){} } // not a view, but has a .view?
Similar pattern to the Person class, only doesn't need a full blown View extension...

class Person {}
class PersonControl {} // not a view, just a control 


Really, it's just the "APIs" (property names)

view.el (DOM node)
custom_view.el (extends View, can have custom methods)

ctrl.view (Control - an object that's sole purpose is to control a view)
ctrl.views[]

obj.render() // decoupled view
obj.view // coupled view
obj.views[] // hybrid


But the only thing you really need to remember

1.  view.el, view.addClass(), etc... (element would be better, but Views can have custom methods, behaviors, etc)
2.  obj.render() => view


The rest is pretty self explanatory...



*/