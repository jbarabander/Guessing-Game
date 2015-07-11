
$(document).ready(function(){
	function genRandomInt(max, min){
	return Math.floor(Math.random()*(max - min) + min);
	}
	var randomInt = genRandomInt(1, 100);
	var guesses = [];
	var counter = 0;

	$('#button-container').find('#submit').on('click', function(){
		var guess = $(this).closest('#button-container').find('input').val();
		var diff = guess - randomInt;

		$('.direction').empty();

		if((guess % 1 !== 0) || (100 < guess) || (guess < 1)){
			$('.clue').text('Please enter an integer between 1 & 100');
		}
		else if(guesses.indexOf(guess) !== -1){
			$('.clue').text('You already guessed that number');
		}
		else {
			if(Math.abs(diff) === 0){
				$('.clue').text('Congratulations');
			}
			else if(Math.abs(diff) <= 2){
				$('.clue').text('You are scalding hot right now');
			}
			else if(Math.abs(diff) <= 5){
				$('.clue').text('You are really hot');
			}
			else if(Math.abs(diff) <= 10){
				$('.clue').text('You are hot');
			}
			else if(Math.abs(diff) <= 20){
				$('.clue').text('You are cold');
			}
			else if(Math.abs(diff) <= 30){
				$('.clue').text('You are very cold');
			}
			else {
				$('.clue').text('You are freezing');
			}

			if(guess - randomInt < 0){
				$('.direction').text(', try guessing higher');
			}
			else if(guess - randomInt > 0){
				$('.direction').text(', try guessing lower');
			}
			else {
				$('.direction').text(', you guessed right!');
			}
			guesses.push(guess);
		}

	});
	$('#button-container').find('#replay').on('click', function(){
		randomInt = genRandomInt(1,100);
		guesses = [];
		counter = 0;
	});

});
