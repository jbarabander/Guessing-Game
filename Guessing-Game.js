
$(document).ready(function(){
	function genRandomInt(max, min){
	return Math.floor(Math.random()*(max - min) + min);
	}
	var randomInt = genRandomInt(1, 100);
	var guesses = [];
	var heat;
	function clueHeatSpec(message, closeness){
		$('.clue').text(message);
		heat = closeness;
	}
	function submit(){
		var guess = $('input').val();
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
		clueHeatSpec('Congratulations - ', 'answer');
			$('body').css({'background-color': '#2A36A8'});
			$('img').fadeIn();
			$('.show-answer').fadeOut();
			$('#answer').text('Show Hint');
		}
		else if(Math.abs(diff) <= 2){
		clueHeatSpec('You are on Fiyah - ', 'very hot');
		}
		else if(Math.abs(diff) <= 5){
		clueHeatSpec('You are hot - ', 'hot');
		}
		else if(Math.abs(diff) <= 10){
		clueHeatSpec('You are warm - ', 'warm');
		}
		else if(Math.abs(diff) <= 20){
		clueHeatSpec('You are cool - ', 'cool');
		}
		else if(Math.abs(diff) <= 30){
		clueHeatSpec('You are cold - ', 'cold');
		}
		else {
		clueHeatSpec('You are so cold, you could build an igloo - ', 'very cold');
		}

		if(guess - randomInt < 0){
			$('.direction').text('try guessing higher.');
		}
		else if(guess - randomInt > 0){
			$('.direction').text('try guessing lower.');

		}
		else {
			$('.direction').text('you are the king of the guessing game!');
		}

		// if(guesses.length !== 0){
		// 	if(Math.abs(diff) <= Math.abs(randomInt - guesses[guesses.length - 1])){
		// 		$('.vs-last').text('You are getting closer');
		// 	}
		// 	else {
		// 		$('.vs-last').text('You are getting farther away');
		// 	}
		// }
		// if(guesses.length === 8){
		// 	$('.vs-last').empty();
		// }

		guesses.push(guess);

		$('.guess-container').find('.guess-num').append('<td>' + guesses.length + '</td>');
		$('.guess-container').find('.guess-entry').append('<td>' + guess + '</td>');
		$('.guess-container').find('.hot-or-cold').append('<td>' + heat + '</td>');
		$('.guess-container').fadeIn();
	}


	$('#button-container').on('click', '#submit', submit);
	$('input').on('keypress',function(event){
		if(event.which === 13){
			submit();
		}
	});

	$('#button-container').on('click', '#replay', function(){
		guesses = [];
		randomInt = genRandomInt(1,100);
		$('.direction').empty();
		$('.clue').text('You started a new game');
		$('.guess-container').fadeOut(function(){
			$('.guess-container').find('.guess-num td').not(':first').remove();
			$('.guess-container').find('.guess-entry td').not(':first').remove();
			$('.guess-container').find('.hot-or-cold td').not(':first').remove();
		});
		$('img').fadeOut();
		$('body').css({'background-color': '#525A7C'});
		$('.show-answer').fadeOut();
		$('#answer').text('Show Hint');
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
