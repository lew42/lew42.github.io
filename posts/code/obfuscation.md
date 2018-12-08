How do you scramble your code, so nobody can read/understand it?

Just create so many layers of scrambling/hiding, that by the time they get through the first few levels, they'll give up.

Give them messages/false hope...  When they go down the wrong route, give them teaser messages like, "Good job fuck face, you're 1% of the way there."


Obfuscation Techniques

# Noop Code

You can have elaborate functions / conditionals that mean/do absolutely nothing.  Entire classes... 

The 'real' functionality could be started in a very odd location.

To discover a noop block might be extremely difficult.  You don't know if it's noop or not.  The best decision is to map as much as possible before digging into a function call...


# Tracking/sourcing imports, variables, references, etc

Tracing function calls should be as tricky as possible.

- use symbols, maps, and all sorts of unnecessary data structures in order to lead a dev on a wild goose chase.


# Web Assembly

Roll your own crypto:  Send all client-side code as an encrypted payload, and use a pre-cached, constantly changing wasm decryption strategy.

1)  When someone inspects the page, they don't see javascripts?  They see binary?

Noo! Give them JavaScripts!  Lot's of them!  Give them PHP!  Let them study/read code til their eyes bleed.

It's all junk code to lead them astray.

2)  Hidden somewhere in the html (maybe very deep/obscure), there's a small script that requests the binary data.  This binary data gets piped to another server?  No need to double authenticate?

Actually, using many authentication servers in many different locations is important.  This means that forging network requests is much harder.  They'd have to intercept/manipulate all data...

And authentication should work simultaneously.  If 28/29 servers authenticate, this is a problem.  What happened to the 29th request?  Try again.


# No Global Variable

This bootloader can run the code in an anonymous function, and all subsequent behavior has access to that closure.

This way, you can't access the data, without some pretty sophisticated inspection.

Maybe they've been playing this game...




# Move important logic serverside.

If there's a certain algorithm you really don't want exposed, you just keep it server side...

So let's say you have the route switching algorithm.  How do you get from /a/r/b/i/t/r/a/r/y/ path to /a/n/o/t/h/e/r/ ?  This isn't particularly sophistcated, and would slow things down a lot.  But a really secret algorithm, like an encryption/decryption, could be sent to the server, so there's no chance to every find the real code...

And you could bury the pipeline/transmitter deep within the code, to make it has difficult as possible to even discover how it works...