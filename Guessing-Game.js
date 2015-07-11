
$(document).ready(function(){
	function genRandomInt(max, min){
	return Math.floor(Math.random()*(max - min) + min);
	}
	var randomInt = genRandomInt(1, 100);
	var guesses = [];
	var heat;

	$('#button-container').on('click', '#submit', function(){
		var guess = $(this).closest('#button-container').find('input').val();
		var diff = guess - randomInt;

		$('.direction').empty();

		if(8 <= guesses.length){
			$('.clue').text('Sorry the game is over.  Please try again!');
			return;
		}
		if((guess % 1 !== 0) || (100 < guess) || (guess < 1)){
			$('.clue').text('Please enter an integer between 1 & 100');
			return;
		}
		if(guesses.indexOf(guess) !== -1){
			$('.clue').text('You already guessed that number');
			return;
		}

		if(Math.abs(diff) === 0){
			$('.clue').text('Congratulations - ');
			heat = 'answer'
		}
		else if(Math.abs(diff) <= 2){
			$('.clue').text('You are on Fiyah -');
			heat = 'very hot';
		}
		else if(Math.abs(diff) <= 5){
			$('.clue').text('You are hot - ');
			heat = 'hot';
		}
		else if(Math.abs(diff) <= 10){
			$('.clue').text('You are warm - ');
			heat = 'warm';
		}
		else if(Math.abs(diff) <= 20){
			$('.clue').text('You are cool - ');
			heat = 'cool';
		}
		else if(Math.abs(diff) <= 30){
			$('.clue').text('You are cold - ');
			heat = 'cold';
		}
		else {
			$('.clue').text('You are so cold, you might as well build an igloo - ');
			heat = 'very cold';
		}

		if(guess - randomInt < 0){
			$('.direction').text('try guessing higher.');
		}
		else if(guess - randomInt > 0){
			$('.direction').text('try guessing lower.');
		}
		else {
			$('.direction').text('you guessed right!');
		}
		guesses.push(guess);

		$('.guess-container').find('.guess-num').append('<td>' + guesses.length + '</td>');
		$('.guess-container').find('.guess-entry').append('<td>' + guess + '</td>');
		$('.guess-container').find('.hot-or-cold').append('<td>' + heat + '</td>');
		$('.guess-container').fadeIn();
	});
	$('#button-container').on('click', '#replay', function(){
		guesses = [];
		randomInt = genRandomInt(1,100);
		$('.direction').empty();
		$('.clue').text('You started a New Game');
		$('.guess-container').fadeOut();
		$('.guess-container').find('tr').empty();
	});
	$('#button-container').on('click','#answer', function(){
		if($(this).text() === 'Show Hint'){
			//FIXME: I don't want the Try Again button to move over once the text changes from Show Hint to Hide Hint.
			$(this).text('Hide Hint');
			$('.show-answer').find('span').remove();
			$('.show-answer').append('<span>' + randomInt + '</span>');
		}
		else {
			$(this).text('Show Hint');
		}
		$('.show-answer').fadeToggle();
	});
});
