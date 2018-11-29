## OO - Multiple Inheritance?

It was so hard for me to wrap my head around this one...

We can do this:

class B extends A {}
class C extends B {}
class D extends C {}
// etc...

But, what if class A and B already exist, and we want to extend from them both?  This is just not possible...

Let's say we have class Jump and class Swim, each which provides a simple .jump() or .swim() method.  There will be creatures with all 4 combinations of jumping and swimming (don't jump and don't swim, jumps but doesn't swim, swims but doesn't jump, and both jumps and swims).