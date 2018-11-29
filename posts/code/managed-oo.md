# UI-ify Modular OO Programming

Instead of big classes, we break things down into their minimum viable pieces

A single method.  A group of methods and properties...

And create a simple -> complex progression.  The more granular, the better?  On-demand granularity.  See the big picture (larger layers, composed into the final thing), and break down each layer into its constitutent pieces.

Each layer should be ultra simple, or composed of really simple pieces.

## Composing Classes from MVPs

Any class could be a composition of sub modules.

The interaction between these sub modules could vary greatly, and should be closely managed.

- No overlap/conflict?
	=> perfect

- Shared data, but no apparent conflicts?
	=> crowd source this to confirm

- Namespace conflict?  (separate data, same property name)
	=> remap namespace

- Functionality conflict?  (order of operations presents an issue)
	=> visualize all the events and create logical conditions (if another module is present) to switch behavior (set priority/dependency of execution)

	For example, if module X is present, run this.method42(); after x.whatever();

	These arbitrary conditions are probably a red flag that things should be orchestrated at a different level