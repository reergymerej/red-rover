define(function(){
	
	var DudeModel = Backbone.Model.extend({

		defaults: {
			speed: 1,
			weight: 1,
			strength: 1,
			grip: 1,
			endurance: 1
		},
		
		initialize: function(){
			this.attributes.speed *= Math.random();
			this.attributes.weight *= Math.random();
			this.attributes.strength *= Math.random();
			this.attributes.grip *= Math.random();
			this.attributes.endurance *= Math.random();
		}

	});

	var DudeView = Backbone.View.extend({
		
		initialize: function(){
			this.render( this.model.attributes.side );
		},

		/**
		* @param {string} side left/right
		**/
		render: function(side){
			var template = _.template( $('#dude_template').html(), {} );
			this.$el.html( template ); 
			this.$el.appendTo( $('#' + side ) );
		},

		events: {
			'click': 'click'
		},

		click: function(){
			//	show details
			console.log(this.model.attributes);

			//	toggle active
			$('.dude', this.$el).toggleClass('active');
		}
	});

	


	/**
	* Create a new dude and put him in the left or right line.
	* @param {string} side left/right
	**/
	function Dude(side){

		var side = side,
			model,
			view;

		model = new DudeModel({side: side});
		view = new DudeView({model: model});
	};

	return {
		Dude: Dude,
		DudeView: DudeView,
		DudeModel: DudeModel
	};
});