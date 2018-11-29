# Versioning

0.0.0.0.0?

simple0 (first published release)
- can start with a blank folder
- will evolve over time, and represent the most stable public release until simple1

simple.js --> simple/0/simple0.js

when simple/1/simple1.js is released, we can point /simple/simple.js to simple1.

Versions can go as deep as they need to.  There's really no need to publish sub versions?

Well, yes, I suppose.

So you could clone or copy the various branches into the public repo when they're published.

Basically, it might work like this:

You have published and unpublished versions.  The unpublished versions should ideally be in the thousands.  Anyone can branch, modify, and commit these proposals.  And share them, and let them expand to the end of time.

But, we don't need to publish all of them.

We only need to publish:
- bug fixes
- useful features?
	but these sort of publishes should just be new versions?

Well, the whole major/minor releases is kinda nice.  So that you can completely nuke your api for major version changes.

That's sort of like a whole new folder/repo.  And maybe it should be treated as such.

But what if it's mostly the same?  Uses a lot of the same code?  Now you have a sync issue...

But you sort of need separate versions?  If you make a change to one, do you want to change the other?  Sometimes yes, sometimes no.  This needs to be managed.

But it goes both ways.  

Let's say you have 
	/simple0/important-code/
and 
	/simple1/important-code/

You might have the desire to make a change to either of these.  And the change might affect just the one, or both.  And this completely depends on the change, and the surrounding code.

But, you want these to be versions of each other.  You want the ability to sync these changes between each other.  And so, instead of having separate repos, you keep them together.  I'm not sure I'll ever get good enough at git to actually cherry pick commits and move them around, but who knows.