$(document).ready(function () {

    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
})
var trivia = {

    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',
    questions: {
        q1: 'What type of farm does Dwight own?',
        q2: 'What college did Andy graduate from?',
        q3: 'Who was Oscars boyfriend?',
        q4: 'What is Dwights Middle name?',
        q5: 'Who won the paper airplane contest in season 9?',
        q6: 'What did Angela name her baby?',
        q7: 'How many seasons did the office run for?',
        q8: 'What character did michael fire in season 1?'
    },
    options: {
        q1: ['celery', 'beet', 'worm', 'apple'],
        q2: ['UCSD', 'Cornel', 'Dartmouth', 'Harvard'],
        q3: ['Doug', 'Jerry', 'Bruce', 'Gil'],
        q4: ['Kurt', 'Johann', 'Michael', 'Danger'],
        q5: ['Dwight', 'Erin', 'Helene', 'Angela'],
        q6: ['Michael Jr.', 'Philip', 'John', 'Jesus'],
        q7: ['8', '10', '9', '11'],
        q8: ['Creed', 'Meredith', 'Kevin', 'Devin'],
    },
    answers: {
        q1: 'beet',
        q2: 'Cornel',
        q3: 'Gil',
        q4: 'Kurt',
        q5: 'Angela',
        q6: 'Philip',
        q7: '9',
        q8: 'Devin',
    },

    startGame: function () {
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        $('#game').show();


        $('#results').html('');


        $('#timer').text(trivia.timer);

        $('#start').hide();

        $('#remaining-time').show();


        trivia.nextQuestion();

    },

    nextQuestion: function () {
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }


        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);


        var questionOptions = Object.values(trivia.options)[trivia.currentSet];


        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },

    timerRunning: function () {

        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        }

        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }

        else if (trivia.currentSet === Object.keys(trivia.questions).length) {


            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Please play again!</p>');


            $('#game').hide();

            $('#start').show();
        }

    },

    guessChecker: function () {


        var resultId;


        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];


        if ($(this).text() === currentAnswer) {

            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        }

        else {

            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
        }

    },

    guessResult: function () {


        trivia.currentSet++;


        $('.option').remove();
        $('#results h3').remove();


        trivia.nextQuestion();
    }
}
