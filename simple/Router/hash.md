# .hash = [remainder]?

vs 

# .hash = parent.hash[0]?

The problem is, you have to store the full hash, and track where you are..


The hash can change...
And could jump to anything.  So we really need to listen for changes, and rematch from the beginning.

