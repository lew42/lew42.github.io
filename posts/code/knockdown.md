# Modularity - Knockdown Applications

Every piece of every piece of every app should be toggleable, as much as possible.

If there's a feature that is optional, make sure that it's easily toggleable.

The worst thing you can do is to bake unrelated features into the same classes, files, modules, etc.  Then you have to perform surgery in order to toggle a feature on/off.  This is extremely error prone, and so you probably won't do it.

But in general, it makes managing the code much harder.  You're not sure what everything does, why its there, etc... 