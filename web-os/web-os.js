export default new Post({

}, function(){

});
// or

const post = new Post({

});

// instead of `this`, use `post` here...

if (this || that){
	post.customInitialization();
}