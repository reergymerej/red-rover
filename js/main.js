

$(function(){
	//	new game

	//	clear old game

	var d = [],
		dv,
		Dudes,
		dudesLeft,
		dudesRight;


	//	create dudes
	require(['dude'], function(dudeMod){

		//	not sure how to use collection
		Dudes = Backbone.Collection.extend({
			model: dudeMod.DudeModel
		});

		for(var i = 0; i < 8; i++){
			d.push( new dudeMod.Dude('left') );
		};

		dudesLeft = new Dudes(d);

		d = [];
		for(var i = 0; i < 8; i++){
			d.push( new dudeMod.Dude('right') );
		};

		dudesRight = new Dudes(d);

		console.log(dudesLeft, dudesRight);
	});
});
