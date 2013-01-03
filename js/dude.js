define(function(){

	var player1Dudes = [],
		player2Dudes = [],
		field;
	
	var DudeModel = Backbone.Model.extend({

		defaults: {
			active: false,
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
		},

		test: function(){
			console.log(this);
		}

	});

	var DudeView = Backbone.View.extend({
		
		initialize: function(){
			//	bind this to this instance in render
			//this.render = _.bind( this.render, this );

			this.render( this.model.attributes.side );

			this.model.on('change:active', this.toggleActive, this);
		},

		/**
		* @param {string} side player1/player2
		**/
		render: function(side){
			var template = _.template( $('#dude_template').html(), {} ),
				dudeNum = this.model.get('dudeNumber');

			this.$el.html( template ); 
			this.$el.appendTo( $('#' + side ) );

			//	set position
			this.$el.css( getStartPosition( this.$el ) );


			/**
			* @param {jquery object} el
			* @return [object] ready to pass to .css()
			**/
			function getStartPosition(el){
				
				var fieldDimensions = field.getDimensions(),
					orientation = field.getOrientation(),
					top,
					left,
					dudeWidth = el.width(),
					dudeHeight = el.height(),
					spacing;

				spacing = field.getInterval(dudeWidth, dudeHeight, 10);

				if(orientation === 'vertical'){
					if(side === 'player2'){
						top = dudeHeight;
					} else {
						top = fieldDimensions.height - dudeHeight * 2;
					};

					left = spacing * ( dudeNum + 1 ) + dudeNum * dudeWidth;
				};

				return {
					top: top,
					left: left
				};
			};
		},

		events: {
			'click': 'click'
		},

		click: function(){
			console.log(this.model);
			this.model.set( {active: !this.model.get('active')} );
			console.log(this);
		},

		toggleActive: function(){
			//	toggle active
			$('.dude', this.$el).toggleClass('active');
		}
	});

	


	/**
	* Create a new dude and put him in the player1 or player2 line.
	* @param {string} side player1/player2
	* @param {Field} f
	**/
	function Dude(side, f){

		var side = side,
			model,
			view,
			playerGroup = (side === 'player1') ? player1Dudes : player2Dudes;

		field = f;

		model = new DudeModel({
			side: side,
			dudeNumber: playerGroup.length
		});

		view = new DudeView({
			model: model,
			el: $('<div>').addClass('dude')
		});

		playerGroup.push(model);
	};

	return {
		Dude: Dude,
		DudeView: DudeView,
		DudeModel: DudeModel
	};
});