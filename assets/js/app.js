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
  timer: 25,
  timerOn: false,
  timerId: '',
  
  questions: {
    q1: 'Suyun kaldırma kuvvetini bulan ünlü fizikçi kimdir?',
    q2: 'Televizyonu ve ilk kayıt cihazını icat eden İskoç mucidi kimdir?',
    q3: 'Bisikletin mucidi olarak bilinen iskoç mucid kimdir?',
    q4: 'İnternet ağının web sitelerini görüntülenebilmesini sağlayan World Wide Web’i icat eden, http: // protokolünü kullanan ve dünya çapında internetin kullanılabilir duruma gelmesini sağlayan kimdir?',
    q5: "Kağıdı icat eden çinli politikacı ve yönetici kimdir?",
    q6: 'Renkli fotoğrafçılıkla ilgili ilk prosedürü icat eden iskoç fizikçi ve mucit kimdir?',
    q7: "Bir devrim açan dokuma tezgâhını bulan ingiliz sanayici kimdir?"
  },
  options: {
    q1: ['Arşimet', 'Newton', 'Jhon Harrison', 'Samuel Morse'],
    q2: ['Wright Kardeşler', 'Robert Noyce', 'John Logie Baird', 'Enrico Fermi '],
    q3: ['Thomas Edison', 'Louise Braille', 'Alexander Graham Bell', 'Kirkpatrick Macmillan'],
    q4: ['Steve Jobs', 'Enrico Fermi', 'Tim Berners Lee', 'Édouard Michelin'],
    q5: ['Cai Lun', 'Enrico Fermi', ' James Watt ', 'Robert Oppenheimer'],
    q6: ['Robert Oppenheimer', 'Alexander Fleming', 'James Clerk Maxwell', 'Rudolf Diesel'],
    q7: ['William Cullen', 'Richard Arkwright', 'James Watt', 'John Harrison']
  },
  answers: {
    q1: 'Arşimet',
    q2: 'John Logie Baird',
    q3: 'Kirkpatrick Macmillan',
    q4: 'Tim Berners Lee',
    q5: 'Cai Lun',
    q6: 'James Clerk Maxwell',
    q7: 'Richard Arkwright'
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

   
    trivia.timer = 20;
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
      $('#results').html('<h3>Süreniz Kalmadı Dikkatli Olunuz ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
    }
    
    else if (trivia.currentSet === Object.keys(trivia.questions).length) {

      $('#results')
        .html('<h3>Oynadığınız İçin Teşekkür Ederiz!</h3>' +
          '<p>Doğru Cevaplanan Sorular: ' + trivia.correct + '</p>' +
          '<p>Yanlış Cevaplanan Sorular: ' + trivia.incorrect + '</p>' +
          '<p>Cevaplanmamış Sorular: ' + trivia.unanswered + '</p>' +
          '<p>Tekrar Oynayınız!</p>');

      
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
      $('#results').html('<h3>Doğru Cevap!</h3>');
    }
    else {
      
      $(this).addClass('btn-danger').removeClass('btn-info');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Yanlış Cevap Bir Sonrakinde Dikkatli Ol! ' + currentAnswer + '</h3>');
    }

  },
  
  guessResult: function () {

    trivia.currentSet++;

    $('.option').remove();
    $('#results h3').remove();

    trivia.nextQuestion();

  }

}