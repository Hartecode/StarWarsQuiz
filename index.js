'use strict';

//this variable stores the questions and multiple choice
const questionAndChoice = [
  {
    'question': 'Pick the movies which are in the correct chronological order from oldest to most recent.',
    'a': 'The Phantom Menace, The Empire Strikes Back, A New Hope',
    'b': 'A New Hope, Rogue One, Attack of the Clones',
    'c': 'Revenge of the Sith, Return of Jedi, The Force Awakens',
    'd': 'Attack of the Clones, The Empire Strikes Back, A New Hope',
    'e': 'The Empire Strikes Back, The Phantom Menace, Return of the Jedi'
  },
  {
    'question': 'Which Star Wars movie didn’t have an opening title crawl?',
    'a': 'Rogue One',
    'b': 'The Force Awakens',
    'c': 'The Phantom Menace',
    'd': 'A New Hope',
    'e': 'Return of the Jedi'
  },
  {
    'question': 'During what Battle was the first Death Star destroyed?',
    'a': 'Battle of Endor',
    'b': 'Battle of Yavin',
    'c': 'Battle of Starkiller Base',
    'd': 'Battle of Geonosis',
    'e': 'Battle of Takodana'
  },
  {
    'question': 'Who is a Skywalker?',
    'a': 'Qui-Gon',
    'b': 'Shmi',
    'c': 'Jyn',
    'd': 'Lando',
    'e': 'Tyranus'
  },
  {
    'question': 'Darth Vador used to be known as',
    'a': 'Luke Skywalker',
    'b': 'Obi-Wan Kenobi',
    'c': 'Anakin Skywalker',
    'd': 'Count Dooku',
    'e': 'Yoda'
  },
  {
    'question': 'Who are the parents of Kylo Ren?',
    'a': 'Jar Jar Binks and Rey',
    'b': 'Anakin and Padme',
    'c': 'Ahsoka and Anakin',
    'd': 'Han and Leia',
    'e': 'Rey and Finn'
  },
  {
    'question': 'What is the main component of a lightsaber?',
    'a': 'The force',
    'b': 'Midichlorians',
    'c': 'Sith Blood',
    'd': 'Osmium',
    'e': 'Kyber crystal'
  },
  {
    'question': 'What starship is able to make the Kessel Run in 12 Parsecs?',
    'a': 'Ebon Hawk',
    'b': 'Millennium Falcon',
    'c': 'Nebulon-B Frigate',
    'd': 'Republic Assault Ship',
    'e': 'Ghost'
  },
  {
    'question': 'What is the color of the milk Luke drank in the New Hope?',
    'a': 'Blue',
    'b': 'Green',
    'c': 'White',
    'd': 'Red',
    'e': 'Yellow'
  },
  {
    'question': 'Luke and Leia were born on',
    'a': 'Tatoonie',
    'b': 'Alderaan',
    'c': 'Polis Massa',
    'd': 'Mos Espa',
    'e': 'Goroth'
  }
];

//this object holds user level of knowledge
const fanLevel = {
  40: "Trekkie",
  60: "Padawan",
  80: "Jedi Knight",
  100: "Jedi Master",
};

//this variable holds correct answers
const correctAnswers = ['c','a','b','b','c','d','e','b','a','c'];

//this variable will store the users selected answers
const usersAnswer = [];

//this function will start the game;
function startGame() {
  $('.startBn').click(function() {
    $('.start-page').fadeOut(function(){
      $('.question-page').fadeIn();
      formFunctionality();
    });
  });
}

// this function generates the quesitons html
function questionGenerator(quesitonList, questionIndex) {
  console.log('questionGenerator is runing');
  return `
    <form class="fanquestion" action="index.html" method="#" data-item-index="0">
      <fieldset>
        <legend>${quesitonList[questionIndex].question}</legend>
        <label class="quizQuestion">
          <input id="a" type="radio" name="question" value="a"></span><span class="a possibleAnswer">${quesitonList[questionIndex].a}</span>
        </label>
        <label class="quizQuestion">
          <input id="b" type="radio" name="question" value="b"></span><span class="b possibleAnswer">${quesitonList[questionIndex].b}</span>
        </label>
        <label class="quizQuestion">
          <input id="c" type="radio" name="question" value="c"></span><span class="c possibleAnswer">${quesitonList[questionIndex].c}</span>
        </label>
        <label class="quizQuestion">
          <input id="d" type="radio" name="question" value="d"></span><span class="d possibleAnswer">${quesitonList[questionIndex].d}</span>
        </label>
        <label class="quizQuestion">
          <input id="e" type="radio" name="question" value="e"></span><span class="e possibleAnswer">${quesitonList[questionIndex].e}</span>
        </label>
        <input class="button-setting" type="submit" name="Submit" value="Submit" alt="submit answer">
        <input class="button-setting next hidden" type="button" name="button" value="Next >" alt="next question">
        <div class="questionNumber">
          Q: <span class="qNumber">${++questionIndex}</span>/10
        </div>
        <div class="currentScore">
          Correct: <span class="correct"></span> / Wrong: <span class="wrong"></span> 
        </div>
      </fieldset>
    </form>`
}





//fucntion holds the question forum bottuns 
function formFunctionality(){
  //holds current postion in questioning
  let questionIndex = 0;
  //holds the number of correct
  let totalCorrect = 0;
  //holds the number of wrong
  let totalWrong = 0;
  
  //render questions in dom
  function renderQuestion(questionIndex) {
    console.log('renderQuestion is running');
    const currentQuestion = questionGenerator(questionAndChoice, questionIndex);
    $('.question-page').html(currentQuestion);
  }

  //this renders tje current score and produces the corresponding border color
  function renderScore(numberOfCorrect, numberOfWrong) {
    $('.correct').text(numberOfCorrect);
    $('.wrong').text(numberOfWrong);
    if(numberOfCorrect === numberOfWrong) {
      $('.currentScore').css('border-color', 'white');
    } else if(numberOfCorrect > numberOfWrong) {
      $('.currentScore').css('border-color', '#3d3dff');
    } else {
      $('.currentScore').css('border-color', 'red');
    }
  }
  
    //this fucntion check is the user input is correct
  function checkingAnswer(correctAnswers, userAnswer, currentQuestion) {
    if(userAnswer[currentQuestion] === correctAnswers[currentQuestion]) {
      $(`#${correctAnswers[currentQuestion]}`).closest("label").addClass('rightQuestion');
      totalCorrect++;
    } else {
      $(`#${userAnswer[currentQuestion]}`).closest("label").addClass('wrongQuestion');
      $(`#${correctAnswers[currentQuestion]}`).closest("label").addClass('thisIsTheCorrectAnswer');
      totalWrong++;
    }
    renderScore(totalCorrect, totalWrong);
  }
  
  //this function addes the userInput to userAnswer list. It will only alow one answer to be submited for a question and fade out submit button and fadein next button
  function addingTheAnswer(userInput,questionIndex) {
    if( usersAnswer.length != questionIndex + 1){
      usersAnswer.push(userInput);
      $('input[type="radio"]').prop( "disabled", true);
      //The submit button will fade out and fade in next button
      $('input[type="submit"]').fadeOut(function(){
        $('.next').fadeIn();
      });
    }
  }
  
  //this fucntion will take a sellected answer after the submit button is pressed and display the correct answer.
  function answerSubmitted() {
    $('.fanquestion').submit(event => {
      event.preventDefault();
      if ($("input:checked").val() != undefined) {
        const userInput = $("input:checked").val();
        const index = questionIndex;
        addingTheAnswer(userInput,  questionIndex);
        checkingAnswer(correctAnswers, usersAnswer,  questionIndex);
        console.log(usersAnswer);
      }
    });
  }
  
  //function will be the action which would happen after the next botton is clicked.
  function whatToDoNext(quesitonList) {
    if(questionIndex < 9) {
       questionIndex++;
       $('.quizQuestion').removeClass('rightQuestion wrongQuestion thisIsTheCorrectAnswer');
       $('fanquestion').attr('data-item-index', questionIndex);
       
       //The submit button will fade out and fade in next button
        $('legend, .next, .possibleAnswer, input[type="radio"]').fadeOut(function(){
          $('legend').text(quesitonList[questionIndex].question);
          $('.a').text(quesitonList[questionIndex].a);
          $('.b').text(quesitonList[questionIndex].b);
          $('.c').text(quesitonList[questionIndex].c);
          $('.d').text(quesitonList[questionIndex].d);
          $('.e').text(quesitonList[questionIndex].e);
          $('.qNumber').text(questionIndex + 1);
          $('input[type="radio"]').prop( "disabled", false); 
          $("input:checked").prop('checked', false);  
          $('legend, .possibleAnswer, input[type="submit"], input[type="radio"]').fadeIn();
        });
       console.log("nextButton return:"+ questionIndex);
    } else {
      questionIndex = 0;
      resultsPage();
    }
  }
  
  //the fucntion will go to the next question or the final page
  function nextButton(quesitonList) {
    $('input[type="button"]').click(function(){
      if(usersAnswer.length === questionIndex +1) {
        whatToDoNext(quesitonList);

      }
    });
  }
  
  renderQuestion(questionIndex);
  renderScore(totalCorrect, totalWrong);
  answerSubmitted();
  nextButton(questionAndChoice);
}

//this function determines the fans level of knowledge
function usersKnowlageLevel(score, fanLevel) {
  const listKeys = Object.keys(fanLevel);
  for(let i = 0; i < listKeys.length; i++) {
    if( score <= listKeys[i]){
      return fanLevel[listKeys[i]];
      break;
    }
  }
}

//this function iterates through all the users answers and adds them to the page
function addResults(correctAnswers, usersAnswer, questionAndChoice){
  const results = [];
  let totalScore = 0;
  for(let i= 0; i < usersAnswer.length; i++) {
    if(usersAnswer[i] === correctAnswers[i]) {
      totalScore++;
      results.push(`<li class='rightQuestion'>${questionAndChoice[i][usersAnswer[i]]}</li>`);
    } else {
      results.push(`<li class='wrongQuestion'>${questionAndChoice[i][usersAnswer[i]]}</li>`);
    }
  }
  
  $('.knowledgeLevel').text(usersKnowlageLevel(totalScore*10, fanLevel));
  $('.score').text(totalScore*10 +"%");
  $('.feedback ol').append(results.join(''));
}

//this function brings up the final score page
function resultsPage() {
  addResults(correctAnswers, usersAnswer, questionAndChoice);
  $('.question-page').fadeOut(function(){
    $('.feedback').fadeIn();
    $('.fanquestion').remove();
  });
}

//this function will reset the quiz and allow the user to try the quiz tryAgain
function restarte() {
  $('.tryAgain').click(function(){
    usersAnswer.splice(0, usersAnswer.length);
    $('.feedback').fadeOut(function(){
      $('.start-page').fadeIn();
      $('.feedback ol').empty();
    });
    
  });
}

//this is a call back to the other fucntion to run the games
function starWarsQuiz() {
  startGame();
  formFunctionality();
  restarte();
}

$(starWarsQuiz);
