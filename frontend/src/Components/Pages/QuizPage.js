/* eslint-disable no-unused-vars */
import { clearPage } from '../../utils/render';

const Swal = require('sweetalert2');


let questions = [];
let questionNumber = 0;
let goodAnswerNumber = 0;
let givenAnswerNumber = 0;
// let timeID ;
// const delay = 15*1000;
console.log(goodAnswerNumber);
console.log(givenAnswerNumber);


const QuizPage = async (quizID) => {
  console.log(`boo : ${quizID}`);
    clearPage();
    const response = await fetch(`${process.env.API_BASE_URL}/questions?quiz=${quizID}`)
   /*  renderStructurePage(); */
    questions = await response.json();
    console.log(`here : ${questions[0]}`);
    renderQuestion(questions);
  };
  

//   function renderStructurePage(){
//     const main = document.querySelector('main');
//     const contenu = document.createElement('section');
//     contenu.innerHTML = `
//     <div class="containerQuizzPage mt-sm-5 my-1">
//     <div class="question ml-sm-5 pl-sm-5 pt-2">
//         <div class="py-2 h5"><b>

//         <h6 class="questionM"></h6>

//         </b></div>
//         <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
//             <label class="options">
//             <h5 class="lesRepM"></h5>
//             Small Business Owner or Employee
//                 <input type="radio" name="radio">
//                 <span class="checkmark"></span>
//             </label>
            
//         </div>
//     </div>
//     <div class="d-flex align-items-center pt-3">
//         <div id="prev">
//             <button class="btn btn-primary">Previous</button>
//         </div>
//         <div class="ml-auto mr-sm-5">
//             <button class="btn btn-success">Next</button>
//         </div>
//     </div>
// </div>`

//   main.appendChild(contenu);
//   }

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
    const all = document.createElement ('section');
    all.className="containerQuizzPage "
    const questionWrapper = document.createElement('div');
    questionWrapper.type = "questionWrapper";
    questionWrapper.innerHTML =`Question n° ${questionNumber + 1} ${question.content}`;
    questionWrapper.className='questionM'
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
            answerButton.className = "options";
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


        // timeID = setTimeout(()=>{
        //     questionNumber +=1;
        //     renderQuestion(questions[questionNumber]);
        //     clearTimeout(timeID);     
        // }, delay);

    })
    
    all.appendChild(questionWrapper);
    main.appendChild(all);
   
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