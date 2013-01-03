var dudesPlayer1,
	dudesPlayer2;

$(function(){
	//	load modules
	require(['dude',
			'field'], 
	function(dudeMod,
			fieldMod){

		//	new game

		//	clear old game

		var DUDES_PER_TEAM = 10,
			orientation = 'vertical',
			field;

		//	create field
		field = new fieldMod.Field(orientation);

		/*var dudesPlayer1,
			dudesPlayer2;*/

		dudesPlayer1 = createDudes('player1', DUDES_PER_TEAM);
		dudesPlayer2 = createDudes('player2', DUDES_PER_TEAM);
		
		for(var i = 0; i < dudesPlayer1.models.length; i++){
			dudesPlayer1.models[i].set({test:'woo'});
		};

		//	player 2 turn
		//	pick a dude to call over
		console.log(dudesPlayer1.models[4].set({active:true}));
		dudesPlayer1.models[4].trigger('change:active');
		console.log(dudesPlayer1.models[4].get('active'));
		

		/**
		* @param {string} side player1/player2
		* @param {number} perSide how many dudes to make
		* @return {backbone collection}
		**/
		function createDudes(side, perSide){

			var d = [],
				Dudes;

			//	not sure how to use collection
			Dudes = Backbone.Collection.extend({
				model: dudeMod.DudeModel
			});

			for(var i = 0; i < perSide; i++){
				d.push( new dudeMod.Dude( side, field ) );
			};

			return new Dudes(d);
		};
	});
});
