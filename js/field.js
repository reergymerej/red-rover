define(function(){

	function Field(orientation){

		var element = $('#field');

		/**
		* @return {string} horizontal/vertical
		**/
		this.getOrientation = function(){
			return orientation;
		};

		/**
		* @return {object}
		**/
		this.getDimensions = function(){

			return {
				width: element.width(),
				height: element.height()
			};
		};


		/**
		* Return the width of gap between each dude.
		* @param {number} dudeWidth
		* @param {number} numDudes
		* @return {number}
		**/
		this.getInterval = function(dudeWidth, dudeHeight, numDudes){
			if(orientation === 'vertical'){
				return ( element.width() - (numDudes * dudeWidth) ) / (numDudes + 1);
			};
		};
	};

	return {
		Field: Field
	};
});