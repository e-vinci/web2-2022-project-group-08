import { clearPage } from '../../utils/render';

const Swal = require('sweetalert2');


let questions = [];
let questionNumber = 0;
let goodAnswerNumber = 0;
let givenAnswerNumber = 0;
let timeID ;
const delay = 15*1000;
console.log(goodAnswerNumber);
console.log(givenAnswerNumber);

const QuizPage = async () => {
  console.log(`boo : ${1}`);
    clearPage();
    const response = await fetch(`${process.env.API_BASE_URL}/questions?quiz=${1}`)
    questions = await response.json();
    console.log(`here : ${questions[0]}`);
    renderQuestion(questions);
  };
  

function renderQuestion(question){
  if(!question){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Le quizz est terminé, vous avez un score de ${goodAnswerNumber} / ${questions.length}`,
      showConfirmButton: false,
      timer: 2000
    });
  
    for (let i = 1; i < 5; i+=1) {
      const button = document.querySelector(`#button${i}`);
      button.addEventListener('click', endOfQuiz)
    }
    goodAnswerNumber = 0;
    givenAnswerNumber = 0;
    questionNumber = 0;
    questions = [];
    return;
  } 

    clearPage();

    const main = document.querySelector('main');
    const questionWrapper = document.createElement('div');
    questionWrapper.type = "questionWrapper";
    questionWrapper.innerHTML =`Question n° ${questionNumber + 1} ${question.content}`;
    const answerWrapper = document.createElement('div');
    answerWrapper.type = "answerWrapper";
    questionWrapper.appendChild(answerWrapper);
    let goodAnswer = '';
    fetch(`${process.env.API_BASE_URL}/answers?question=${question.question_id}`) 
        .then((response) => response.json())
        .then((data2) =>  {
         
            let answerNumber = 1;
            data2.forEach(answer => {
            const answerButton = document.createElement('button');
            answerButton.className = "btn btn-lg btn-primary";
            answerButton.type = 'button';
            answerButton.id = `button${answerNumber}`;
            answerButton.innerHTML =  `Réponse n° ${answerNumber} : ${answer.content}`
            if(answer.correct) goodAnswer = answer;

            answerButton.addEventListener('click', (e) => {
              chooseAnswer(e, goodAnswer, answer.content)
            } );
            answerWrapper.appendChild(answerButton);
            questionWrapper.appendChild(answerWrapper);
            answerNumber +=1;    
      });

        timeID = setTimeout(()=>{
            questionNumber +=1;
            renderQuestion(questions[questionNumber]);
            clearTimeout(timeID);     
        }, delay);

    })
    

    main.appendChild(questionWrapper);
}

async function chooseAnswer(e, goodAnswer, answer){
  e.preventDefault();
  givenAnswerNumber +=1;
  console.log(answer===goodAnswer.content)
  if(answer === goodAnswer.content){
    Swal.fire(
      'Bonne réponse !',
      'Continuez comme ça',
      'success'
    )
    goodAnswerNumber += 1;
   
  }
  else{
    await Swal.fire(
      'Mauvaise réponse :( !',
      goodAnswer.good_answer_feedback,
      'error'
    )
  
  }
    questionNumber +=1;
    renderQuestion(questions[questionNumber]);
  
}

 function endOfQuiz(e){
  e.preventDefault();
  Swal.fire(
    'Le quizz est terminé ! Vous ne pouvez plus répondre',
    ``,
    'warning'
  )
} 


export default QuizPage;