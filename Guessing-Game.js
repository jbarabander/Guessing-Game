
$(document).ready(function(){
	function genRandomInt(max, min){
	return Math.floor(Math.random()*(max - min) + min);
	}
	var randomInt = genRandomInt(1, 100);

	$('#button-container').find('#submit').on('click', function(){
		var guess = $(this).closest('#button-container').find('input').val();
		var clue = $(document).find('.clue');
		var direction = $(document).find('.upOrDown');
		var diff = guess - randomInt;
		if(Math.abs(diff) === 0){
			clue.text('Congratulations');
		}
		else if(Math.abs(diff) < 10){
			clue.text('You are hot');
		}
		else {
			clue.text('You are cold');
		}

		if(guess - randomInt < 0){
			direction.text(', try guessing higher');
		}
		else if(guess - randomInt > 0){
			direction.text(', try guessing lower');
		}
		else {
			direction.text(', you guessed right!')
		}
	});
});
